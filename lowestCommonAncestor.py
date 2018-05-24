root = [6,2,8,0,4,7,9,None,None,3,5]

import math
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution(object):
    def lowestCommonAncestor(self, root, p, q):
        for i in range(0, math.floor(math.sqrt(len(root)))):
            pass


if __name__ == '__main__':
    print(len(root))