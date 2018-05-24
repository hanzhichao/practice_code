def a(*args, **kwargs):
    print(args)
    print(kwargs)

b = {"a":"1","b":"2"}
t = "a={a},b={b}"
print(t.format(**b))