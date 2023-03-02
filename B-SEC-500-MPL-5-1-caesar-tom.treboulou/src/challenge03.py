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

def char_xor(input, value):
    output = b''
    for byte in input:
        output += bytes([byte ^ value])
    return output

def get_score(input):
    charFrequencies = {
        'a': .08167, 'b': .01492, 'c': .02782, 'd': .04253, 'e': .12702,
        'f': .02228, 'g': .02015, 'h': .06094, 'i': .06094, 'j': .00153,
        'k': .00772, 'l': .04025, 'm': .02406, 'n': .06749, 'o': .07507,
        'p': .01929, 'q': .00095, 'r': .05987, 's': .06327, 't': .09056,
        'u': .02758, 'v': .00978, 'w': .02360, 'x': .00150, 'y': .01974,
        'z': .00074, ' ': .13000
    }
    return sum([charFrequencies.get(chr(byte), 0) for byte in input.lower()])

def challenge():
    nbarg = len(sys.argv) - 1
    messages = []
    if ( nbarg != 1 ):
        exit(84)
    try:
        f = open(sys.argv[1])
        lines = f.readlines()
        cipher = ''
        if len(lines) != 1:
            exit(84)
        if is_hex(removeReturn(lines[0])) == 0:
            cipher = bytes(removeReturn(lines[0]), 'utf-8')
        else:
            cipher = bytes.fromhex(removeReturn(lines[0]))
        for key in range(256):
            message = char_xor(cipher, key)
            score = get_score(message)
            data = {
                'key': key,
                'message': message,
                'score': score
            }
            messages.append(data)
        res = sorted(messages, key=lambda x: x['score'], reverse=True)[0]
        return hex(res['key'])[2:]
    except IOError:
        exit(84)

def main():
    res = challenge()
    print(res.upper())

if __name__ == "__main__":
    main()