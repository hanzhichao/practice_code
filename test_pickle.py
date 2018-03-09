# coding: utf-8
import pickle

def pickling():
    data = {'foo': [1,2,3],
    'bar': ('hello', 'world!'),
    'sex': 'male'}
    with open('data.jar','wb') as jar:
        pickle.dump(data, jar)

def unpickling():
    with open('data.jar','rb') as jar:
        data = pickle.load(jar)
        print(data)

pickling()
unpickling()
