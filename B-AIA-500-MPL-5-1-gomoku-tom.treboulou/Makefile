##
## EPITECH PROJECT, 2021
## B-AIA-500-MPL-5-1-gomoku-tom.treboulou
## File description:
## Makefile
##

CC = g++

SRCS =	src/Error.cpp \
		src/IA.cpp \
		src/main.cpp

OBJS = $(SRCS:.cpp=.o)

CFLAGS =	-W -Wall -Wextra -g3

NAME = pbrain-gomoku-ai

all: $(NAME)

$(NAME): $(OBJS)
	$(CC) -o $@ $^ $(CFLAGS)

clean:
	rm -rf $(OBJS)

fclean: clean
	rm -rf $(NAME)

re: fclean all

.PHONY: clean fclean all re