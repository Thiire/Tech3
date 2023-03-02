#!/usr/bin/env python3

import sys

def is_hex(str):
    try:
        int(str, 16)
    except ValueError:
        return False
    return len(str) % 2 == 0

def removeReturn(str):
    if ( str[-1] == "\n" ):
        return str[:-1]
    return str

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
        if is_hex(lines[0]) == 0 or is_hex(lines[1]) == 0:
            exit(84)
        key = bytes.fromhex(lines[0])
        message = bytes.fromhex(lines[1])
        res = b''
        i = 0
        for char in message:
            res += bytes([char ^ key[i]])
            if (i + 1) == len(key):
                i = 0
            else:
                i += 1
        return res.hex().upper()
    except IOError:
        exit(84)

def main():
    res = challenge()
    print(res)

if __name__ == "__main__":
    main()