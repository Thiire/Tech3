/*
** EPITECH PROJECT, 2021
** B-AIA-500-MPL-5-1-gomoku-tom.treboulou
** File description:
** IA
*/

#ifndef IA_HPP_
#define IA_HPP_

#include <iostream>
#include <string>
#include <vector>
#include <regex>
#include <sstream>
#include <algorithm>
#include <array>
#include <stdlib.h>

class IA {
    public:
        IA();
        ~IA();
        enum direction {
            RIGHT,
            LEFT,
            UP,
            DOWN,
            RIGHTUP,
            RIGHTDOWN,
            LEFTUP,
            LEFTDOWN,
            NONE,
        };
        void start(void);
        void board(void);
        void brain(void);
        void turn(void);
        void printMap(void);
        bool checkProba(direction direction, int xOffset, int yOffset, int depth, int depthlimit, int opponent, std::pair<int, int> pos);
        void defineArea(void);
        void manageBoard(void);
    protected:
    private:
        int _minX;
        int _minY;
        int _maxX;
        int _maxY;
        std::string _manager;
        std::pair<int, int> _coords;
        int _mapSize;
        std::vector<std::vector<int>> _map;
};

#endif /* !IA_HPP_ */
