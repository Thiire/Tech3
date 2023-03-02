/*
** EPITECH PROJECT, 2021
** B-AIA-500-MPL-5-1-gomoku-tom.treboulou
** File description:
** IA
*/

#include "../include/IA.hpp"

IA::IA()
{
    std::vector<std::vector<int>> tmp(20, std::vector<int>(20, 0));
    this->_map = tmp;
    this->_mapSize = 19;
    srand(time(NULL));
    this->_minY = 1000;
    this->_minX = 1000;
    this->_maxX = -1;
    this->_maxY = -1;
}

void IA::printMap()
{
    for (const auto &r: this->_map) {
        for (const auto &y: r) {
            std::cout << y;
        }
        std::cout << std::endl;
    }
}

IA::~IA()
{
}

void IA::board(void)
{

}

void IA::turn(void)
{
    this->_manager.erase(
        std::remove_if(this->_manager.begin(), this->_manager.end(), 
        [](char c) { return !std::isdigit(c) && c != ','; }),
        this->_manager.end());
    if (this->_manager.find(',') == std::string::npos)
        exit(84);
    this->_coords = std::make_pair(std::stoi(this->_manager.substr(0, this->_manager.find(','))), 
    std::stoi(this->_manager.substr(this->_manager.find(',') + 1)));
    if (this->_coords.first > 19 && this->_coords.first < 0 ||
    this->_coords.second > 19 && this->_coords.second < 0)
        exit(84);
    this->_map[this->_coords.second][this->_coords.first] = 2;
    this->brain();
}

bool IA::checkProba(direction dir, int xOffset, int yOffset, int depth, int depthlimit, int opponent, std::pair<int, int> pos)
{
    bool result = false;
    if (xOffset < 0 || xOffset > this->_mapSize || yOffset < 0 || yOffset > this->_mapSize) {
        return false;
    } else if (this->_map[yOffset][xOffset] == opponent && pos.first != 0 && pos.second != 0 && depth >= depthlimit) {
            this->_map[pos.first][pos.second] = 1;
            std::cout << pos.second << "," << pos.first << std::endl;
            return true;
    } else if (this->_map[yOffset][xOffset] != opponent) {
        if (this->_map[yOffset][xOffset] == 0 && depth >= depthlimit && pos.first == 0 && pos.second == 0) {
            this->_map[yOffset][xOffset] = 1;
            std::cout << xOffset << "," << yOffset << std::endl;
            return true;
        } else if (this->_map[yOffset][xOffset] == 0 && depth >= 2 && pos.first == 0 && pos.second == 0) {
            pos = {yOffset, xOffset};
        } else {
            return false;
        }
            
    }

    if ((dir == RIGHT || dir == NONE) && !result) {
        result = checkProba(RIGHT, xOffset + 1, yOffset, depth + 1, depthlimit, opponent, pos);
    }
    if ((dir == LEFT || dir == NONE) && !result)
        result = checkProba(LEFT, xOffset - 1, yOffset, depth + 1, depthlimit, opponent, pos);
    if ((dir == UP || dir == NONE) && !result)
        result = checkProba(UP, xOffset, yOffset - 1, depth + 1, depthlimit, opponent, pos);
    if ((dir == DOWN || dir == NONE) && !result)
        result = checkProba(DOWN, xOffset, yOffset + 1, depth + 1, depthlimit, opponent, pos);

    if ((dir == RIGHTUP || dir == NONE) && !result)
        result = checkProba(RIGHTUP, xOffset + 1, yOffset - 1, depth + 1, depthlimit, opponent, pos);
    if ((dir == RIGHTDOWN || dir == NONE) && !result)
        result = checkProba(RIGHTDOWN, xOffset + 1, yOffset + 1, depth + 1, depthlimit, opponent, pos);
    if ((dir == LEFTUP || dir == NONE) && !result)
        result = checkProba(LEFTUP, xOffset - 1, yOffset - 1, depth + 1, depthlimit, opponent, pos);
    if ((dir == LEFTDOWN || dir == NONE) && !result)
        result = checkProba(LEFTDOWN, xOffset - 1, yOffset + 1, depth + 1, depthlimit, opponent, pos);
    return result;
}

void IA::brain(void)
{
    for (int y = 0; y < this->_map.size(); y += 1) {
        for (int x = 0; x < this->_map[y].size(); x += 1) {
            if (this->_map[y][x] == 1) {
                if (this->checkProba(NONE, x, y, 0, 4, 1, {0, 0})) {
                    return;
                }
            }
        }
    }
    for (int y = 0; y < this->_map.size(); y += 1) {
        for (int x = 0; x < this->_map[y].size(); x += 1) {
            if (this->_map[y][x] == 2) {
                if (this->checkProba(NONE, x, y, 0, 4, 2, {0, 0})) {
                    return;
                }
            }
        }
    }
    for (int y = 0; y < this->_map.size(); y += 1) {
        for (int x = 0; x < this->_map[y].size(); x += 1) {
            if (this->_map[y][x] == 2) {
                if (this->checkProba(NONE, x, y, 0, 3, 2, {0, 0})) {
                    return;
                }
            }
        }
    }
    for (int y = 0; y < this->_map.size(); y += 1) {
        for (int x = 0; x < this->_map[y].size(); x += 1) {
            if (this->_map[y][x] == 1) {
                if (this->checkProba(NONE, x, y, 0, 3, 1, {0, 0})) {
                    return;
                }
            }
        }
    }
    this->defineArea();
    while (1) {
        int tmpX = rand() % (this->_maxX - this->_minX + 1) + this->_minX;
        int tmpY = rand() % (this->_maxY - this->_minY + 1) + this->_minY;
        if (this->_map[tmpY][tmpX] == 0) {
            this->_map[tmpY][tmpX] = 1;
            std::cout << tmpX << "," << tmpY << std::endl;
            return;
        }
    }
    return;
}

void IA::defineArea(void)
{
    this->_minY = 1000;
    this->_minX = 1000;
    this->_maxX = -1;
    this->_maxY = -1;
    
    //Define native zone
    for (int y = 0; y < this->_map.size(); y += 1) {
        for (int x = 0; x < this->_map[y].size(); x += 1) {
            if (this->_map[y][x] == 1) {
                this->_minX = (this->_minX > x) ? x : this->_minX;
                this->_minY = (this->_minY > y) ? y : this->_minY;
                this->_maxX = (this->_maxX < x) ? x : this->_maxX;
                this->_maxY = (this->_maxY < y) ? y : this->_maxY;
            }
        }
    }
    
    //Define zone if no one played so far
    this->_minX = (this->_minX == 1000) ? this->_mapSize / 2 : this->_minX;
    this->_minY = (this->_minY == 1000) ? this->_mapSize / 2 : this->_minY;
    this->_maxX = (this->_maxX == -1) ? this->_mapSize / 2 : this->_maxX;
    this->_maxY = (this->_maxY == -1) ? this->_mapSize / 2 : this->_maxY;

    //Enlarge zone
    this->_minX = (this->_minX <= 0) ? 0 : this->_minX - 1;
    this->_minY = (this->_minY <= 0) ? 0 : this->_minY - 1;
    this->_maxX = (this->_maxX >= this->_mapSize) ? this->_mapSize : this->_maxX + 1;
    this->_maxY = (this->_maxY >= this->_mapSize) ? this->_mapSize : this->_maxY + 1;
}

void IA::manageBoard(void)
{
    int pos;
    std::vector<std::string> tmp;
    while (this->_manager.find("DONE") == std::string::npos) {
        std::getline(std::cin, this->_manager);
        while ((pos = this->_manager.find(",")) != std::string::npos) {
            tmp.push_back(this->_manager.substr(0, pos));
            this->_manager.erase(0, pos + 1);
        }
        if (pos == std::string::npos && tmp.size() == 2) {
            tmp.push_back(this->_manager.substr(0, pos));
            this->_map[std::stoi(tmp[1])][std::stoi(tmp[0])] = std::stoi(tmp[2]);
            tmp.clear();
        }
    }
    this->brain();
}

void IA::start(void)
{
	while (std::getline(std::cin, this->_manager)) {
        try {
          
            if (this->_manager.compare(0, 5, "START") == 0) {
                if (this->_manager.find(" ") == std::string::npos || this->_manager.compare(6, 1, "0") == 0) {
                    std::cout << "ERROR Invalid Size" << std::endl;
                } else {
                    this->_mapSize = std::stoi(this->_manager.substr(this->_manager.find(" "), this->_manager.size()));
                    std::vector<std::vector<int>> tmp(this->_mapSize, std::vector<int>(this->_mapSize, 0));
                    this->_map = tmp;
                    this->_mapSize -= 1;
                }
                std::cout << "OK" << std::endl;
            } else if (this->_manager.find("TURN") != std::string::npos) {
                this->turn();
            } else if (this->_manager.find("BOARD") != std::string::npos) {
                this->manageBoard();
                // this->printMap();
            } else if (this->_manager.find("BEGIN") != std::string::npos) {
                this->brain();
            } else if (this->_manager == "ABOUT")
                std::cout << "name=\"tom\", version=\"1.0\", author=\"Gomme au cou Company\", country=\"France\"" << std::endl;
            else if (this->_manager == "END")
                break;
            else if (this->_manager.find("INFO") != std::string::npos)
                std::cout << std::endl;
            else
                std::cout << "UNKNOWN" << std::endl;
        } catch(std::exception const &e) {
            std::cerr << e.what() << std::endl;
            exit(84);
        }
    }
}
