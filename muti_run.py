# coding: utf-8
import time
import threading
from urllib import request

def open(url):
    
    with request.urlopen(url) as f:
        data = f.read()
        # print(f.status)
        # print(f.status, data)


def muti(n):
    global count, mutex
    threads = []
    
    count = 1
    # 创建一个锁
    mutex = threading.Lock()
    # 先创建线程对象
    for x in range(n):
        threads.append(threading.Thread(target=open, args=('http://127.0.0.1:5000/add/?a=1&&b=2',)))
    # 启动所有线程
    start = time.time()
    for t in threads:
        t.start()
        # print(count)
        count = count + 1
    # 主线程中等待所有子线程退出
    for t in threads:
        t.join()
    print(time.time()-start)
    print("----------------------------")


def run(n):
    start = time.time()
    for i in range(n):
        open('http://127.0.0.1:5000/add/?a=1&&b=2')
    print(time.time()-start)
    print("----------------------------")


muti(500)
run(500)