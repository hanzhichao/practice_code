def fib(max):
    n, a, b = 0, 0, 1
    while  n<max:
        print(b),
        a, b = b, a+b
        n = n + 1
    return 'done'

def gfib(max):
    n, a, b = 0, 0, 1
    while n<max:
        yield b
        a, b = b, a+b
        n = n + 1
    return 'done'

g = gfrib(10)
print(g)
for n in g:
    print(n)