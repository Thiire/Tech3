#!/usr/bin/env python3

import sys

def removeReturn(str):
    if ( str[-1] == "\n" ):
        return str[:-1]
    return str

def is_hex(str):
    try:
        int(str, 16)
    except ValueError:
        return False
    return len(str) % 2 == 0

def challenge():
    nbarg = len(sys.argv) - 1
    if ( nbarg != 1 ):
        exit(84)
    try:
        f = open(sys.argv[1])
        lines = f.readlines()
        if len(lines) != 2:
            exit(84)
        lines[0] = removeReturn(lines[0])
        lines[1] = removeReturn(lines[1])
        if len(lines[0]) != len(lines[1]):
            exit(84)
        if (is_hex(lines[0]) is False or is_hex(lines[1]) is False):
            exit(0)
        res = hex(int(lines[0], 16) ^ int(lines[1], 16))
        return res[2:]
    except IOError:
        exit(84)

def main():
    res = challenge()
    print(res.upper())

if __name__ == "__main__":
    main()