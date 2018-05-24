import getopt
import sys

opts, args = getopt.getopt(sys.argv[1:], "t:s:h", ["time=", "service=", "help"])

for a, o in opts:
    if a in ('-t', "--time"):
        print(o)
    elif a in ('-s', "--service"):
        print(o)
    else:
        help = True