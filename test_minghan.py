class Solution(object):
    def hammingDistance(self, x, y):
        """
        :type x: int
        :type y: int
        :rtype: int
        """
        count = 0
        x_bin = bin(x)[2:]
        y_bin = bin(y)[2:]
        max_len = max(len(x_bin), len(y_bin))
        if len(y_bin) < max_len:
            y_bin = '0'*(max_len - len(y_bin)) + y_bin
        if len(x_bin) < max_len:
            x_bin = '0'*(max_len - len(x_bin)) + x_bin

        for i in range(max_len):
            if x_bin[i] != y_bin[i]:
                count += 1
        return count
        
if __name__ == '__main__':
    s = Solution()
    print(s.hammingDistance(1, 4))