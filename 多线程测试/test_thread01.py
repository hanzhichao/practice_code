import threading

b = 0
def ch(n):
    global b
    b = b + n
    b = b - n

def run(n):
    for i in range(1000):
        ch(n)


t1 = threading.Thread(target=run, args=(5,))
t2 = threading.Thread(target=run, args=(5,))

t1.start()
t2.start()
t1.join()
t2.join()
print(b)