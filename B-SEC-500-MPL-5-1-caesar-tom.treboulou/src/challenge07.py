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
        if len(lines) != 2:
            exit(84)
        key = bytes.fromhex(removeReturn(lines[0]))
        message = base64.b64decode(removeReturn(lines[1]))
        tmp = AES.new(key, AES.MODE_ECB).decrypt(message)[:-3]
        return base64.b64encode(tmp).decode('utf-8')
    except IOError:
        exit(84)

def main():
    res = challenge()
    print(res)

if __name__ == "__main__":
    main()