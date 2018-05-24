from functools import reduce

def duplicate_remove(l):
    return reduce(lambda x,y: x+[y] if y not in x else x, l, [])


l = [1,2,4,5,3,2,4,5,5,7,8,1,9,0,0,0,1,8]
print(duplicate_remove(l))
