#!/usr/bin/env python3

import sys
from base64 import b64encode, b64decode

def challenge():
    nbarg = len(sys.argv) - 1
    if ( nbarg != 1 ):
        exit(84)
    try:
        f = open(sys.argv[1])
        hx = f.readlines()
        if len(hx) != 1:
            exit(84)
        if not hx[0]:
            exit(84)
        try:
            r = b64encode(bytes.fromhex(hx[0])).decode()
            return(r)
        except ValueError:
            exit(84)
    except IOError:
        exit(84)

def main():
    res = challenge()
    print(res)
if __name__ == "__main__":
    main()