/*
** EPITECH PROJECT, 2021
** B-AIA-500-MPL-5-1-gomoku-tom.treboulou
** File description:
** Error
*/

#ifndef ERROR_HPP_
#define ERROR_HPP_

#include <exception>
#include <iostream>

class Error : std::exception {
    public:
        Error(std::string const &error = "", std::string const &details = "");
        ~Error();
        const char* what() const throw();
    private:
        std::string _error;
        std::string _details;
};


#endif /* !ERROR_HPP_ */
