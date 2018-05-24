class Solution(object):
    def numSimilarGroups(self, A):
        """
        :type A: List[str]
        :rtype: int
        """
        count = 0
        for i in range(len(A)-1):
            for j in range(i, len(A)):
                f = False
                if self.isSimilar(A[i], A[j]):
                    count += 1
                    f = True

        return count
        
    def isSimilar(self, str1, str2):
        count = 0
        for i in str1:
            if str1.index(i) != str2.index(i):
                count += 1
        return False if count > 1 else True

if __name__ == '__main__':
    s = Solution()
    print(s.numSimilarGroups(["tars","rats","arts","star"]))
    print(s.isSimilar("tars", "rats"))

