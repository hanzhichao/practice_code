from random import random
import time
from random import random


def buddle_sort(under_sort_list):
    l = under_sort_list
    for j in range(len(l)):
        for i in range(len(l)-j-1):
            # print(i,j)`
            if l[i] > l[i+1]:
                l[i], l[i+1] = l[i+1], l[i]
    return l


def select_sort(under_sort_list):
    l = under_sort_list
    for j in range(len(l)):
        max_index = 0
        for i in range(1,len(l)-j):
            if l[i] > l[max_index]:
                max_index = i
        l[max_index], l[len(l)-j-1] = l[len(l)-j-1], l[max_index]
    return l
 
def quick_sort(under_sort_list):
    l = under_sort_list
    
    if len(l) > 1:
        # pivot = l[0]
        pivot = l[len(l)//2]
        left = []
        right = []
        
        for i in l[1:]:
            # print(i, pivot)
            if i > pivot:
                right.append(i)
            else:
                left.append(i)
        
        left = quick_sort(left)
        right = quick_sort(right)

        l = left + [pivot] + right
    return l

# --------------------------------------------------------------------
def gen_list(n):
    l = []
    for i in range(n):
        l.append(int(random()*n))
    return l

def test_sort_time(n):
    l = gen_list(n)
    t0 = time.time()
    # l = sorted(l)
    l.sort()
    t1 = time.time()
    # buddle_sort(l)
    # t2 = time.time()
    # select_sort(l)
    # t3 = time.time()
    # quick_sort(l)
    # t4 = time.time()
    print("系统排序", t1-t0)
    # print("冒泡排序", t2-t1)
    # print("选择排序", t3-t2)
    # print("快速排序", t4-t3)

test_sort_time(100000)