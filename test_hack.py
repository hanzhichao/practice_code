import sys
lista = ["test_a", "test_b","test_c"]
T = '''
def {func}():
    print(sys._getframe().f_code.co_name)
    print('hello')
'''

for fn in lista:
    exec(T.format(func=fn))

local_vars = dict(locals().items())
# print(local_vars)
funcs = [local_vars[f] for f in lista]