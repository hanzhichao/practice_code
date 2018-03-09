class Foo:
    def __init__(self,x):
        self.x=x

    def __del__(self): #在对象资源被释放时触发
        print('-----del------')
        print(self)

f=Foo(100000)
del f
print('=======================>')