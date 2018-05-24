
# demo1
name='张三'
age=12
aaa = 'aaa'
print("My name is %(name)s and %(age)d and weight is %(aaa)s" % locals())

# demo2
print("My name is %(name)s and %(age)d and weight is %(aaa)s" % {"name": "zhangsan", "age": 23, "aaa":aaa})

# demo3
print("My name is {name} and {age} and weight is {aaa}".format(name="zhangsan", age=12, aaa="aaa"))