#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
for root, dirs, files in os.walk("D:/Projects/postboy/api", topdown=False):
    for name in files:
        print(os.path.join(root, name))
    # for name in dirs:
    #     print(os.path.join(root, name))