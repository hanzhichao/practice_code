import turtle
from time import sleep
from random import random
from numpy import random as rd

def init(width, height,l,n):
    turtle.setup(width,height,0,0)
    turtle.pensize(10)
    # turtle.pencolor("red")
    
    turtle.speed(0)
    turtle.Turtle().screen.delay(0)
    turtle.hideturtle()
    go(l, n)

def go(l,n):
    for i in range(n):
        for j in range(n):
            if l[i,j] >0:
                live((i-n/2)*10, (j-n/2)*10)
            else:
                die((i-n/2)*10, (j-n/2)*10)

def dot(x, y):
    turtle.up()
    turtle.goto(x, y)
    turtle.down()
    turtle.goto(x, y)
    turtle.up()
    # sleep(0.5)

def live(x, y):
    turtle.pencolor("green")
    dot(x, y)

def die(x, y):
    # turtle.pencolor("red")
    turtle.pencolor("black")
    dot(x, y)

def update(l, n):
    for i in range(n):
        for j in range(n):
            # print(i,j)
            count = 0
            t = 0
            for k in range(i-1,i+2):
                for k2 in range(j-1,j+2):
                    t += 1
                    # print(i,j,k,k2)
                    # t = t+1
                    # print(i,j,k,k2)
                    if 0 <= k < n and 0 <= k2 < n:
                        # print("-----",l[k,k2])
                        if k != i or k2 !=j:
                            if l[k, k2] > 0:
                                # print("**************")
                                count += 1
                    # else:
                    #     break
            # print(t)
            # print(count)
            if law(count):
                l[i,j] = 1
            else:
                l[i,j] = 0
    go(l, n)

def law(count):
    if 2 < count < 5:
        return True
    else:
        return False

def start(n):
    l = rd.randint(0,2,size=(n,n))
    # l = [[1,1,1,1][1,1,1,1][1,1,1,1][1,1,1,1]]

    init(600, 600, l, n)
    # l=[round(random()) for x in range(80)]

    # print(type(l))
    # print(l[1,0])
    # print(l)

    for i in range(100):
        update(l,n)


start(40)