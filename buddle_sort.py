from copy import deepcopy

def buddle_sort(l, reverse=False):
    l_copy = deepcopy(l)
    for i in range(len(l_copy)-1): 
        for j in range(len(l_copy)-i-1): 
            if l_copy[j] > l_copy[j+1]: 
                l_copy[j], l_copy[j+1] = l_copy[j+1], l_copy[j] 
    return l_copy

l = [1,2,4,5,3,2,4,5,5,7,8,1,9,0,0,0,1,8]
print(buddle_sort(l))