#!/usr/bin/env python3

from Crypto.Cipher import AES
import sys
import base64

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
        if len(lines) != 3:
            exit(84) 
        return 0   
    except IOError:
        exit(84)

def main():
    res = challenge()

if __name__ == "__main__":
    main()