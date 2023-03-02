#!/usr/bin/env python3

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
        best_scores = []
        index = 0
        for line in lines:
            text = base64.b64decode(removeReturn(line)).hex()
            chunks = [text[i:i+16] for i in range(0, len(text), 16)]
            score = 0
            for x in range(0, len(chunks)):
                tmp = 0
                for y in range(x + 1, len(chunks)):
                    if chunks[x] == chunks[y]:
                        tmp += 1
                if tmp >= score:
                    score = tmp
            best_scores.append({"score": score, "index": index, "line": line})
            index += 1
        return sorted(best_scores, key=lambda x: x['score'], reverse=True)[0]
    except IOError:
        exit(84)

def main():
    res = challenge()
    print(res['index'] + 1)

if __name__ == "__main__":
    main()