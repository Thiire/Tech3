#!/usr/bin/env python3

import sys

def challenge():
    nbarg = len(sys.argv) - 1
    if ( nbarg != 1 ):
        exit(84)
    try:
        f = open(sys.argv[1])
    except IOError:
        exit(84)

def main():
    challenge()

if __name__ == "__main__":
    main()