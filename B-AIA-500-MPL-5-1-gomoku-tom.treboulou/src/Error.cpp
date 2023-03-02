/*
** EPITECH PROJECT, 2021
** B-AIA-500-MPL-5-1-gomoku-tom.treboulou
** File description:
** Error
*/

#include "../include/Error.hpp"

Error::Error(std::string const &error, std::string const &details)
{
    this->_error = error;
    this->_details = details;
}

Error::~Error()
{
} 

const char *Error::what() const throw()
{
    return std::string(this->_error + this->_details).c_str();
}

