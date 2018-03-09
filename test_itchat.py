# coding=utf-8
import itchat
import requests
import json
from itchat.content import *
from echarts import Echart, Legend, Pie
import random
import time

# itchat.login()
itchat.auto_login(hotReload=True)
def tuling(info):
    appkey = 'ec961279f453459b9248f0aeb6600bbe'
    url = 'http://www.tuling123.com/openapi/api?key=%s&info=%s' % (appkey, info)
    req = requests.get(url)
    return json.loads(req.text)['text']

@itchat.msg_register([TEXT,MAP,CARD,NOTE,SHARING])
def test_reply(msg):
    time.sleep(random.random()*10)
    itchat.send('%s' % tuling(msg['Text']), msg['FromUserName'])

@itchat.msg_register(TEXT, isGroupChat=True)
def group_text_reply(msg):
    item = '麻小吃货群'
    if msg['ToUserName'] == item:
        itchat.send(u'%s' % tuling(msg['Text']), item)

# itchat.send("hello", toUserName='filehelper')
# itchat.run()

def get_friends():
    friends = itchat.get_friends(update=True)[0:]
    male = female = other =0
    for i in friends[1:]:
        sex = i['Sex']
        if sex == 1:
            male += 1
        elif sex == 2:
            female += 1
        else:
            other += 1
    total = len(friends[1:])

    chart = Echart('friends' , 'from WeChat')
    chart.use(Pie('WeChat',[
        {'value': male, 'name': 'male: %.2f%%' % (float(male)/total * 100)},
        {'value': female, 'name': 'male: %.2f%%' % (float(female)/total * 100)},
        {'value': other, 'name': 'male: %.2f%%' % (float(other)/total * 100)}],
        radius=["%50", "%70"]))
    chart.use(Legend(['male','female','other']))
    del chart.json['xAxis']
    del chart.json['yAxis']
    chart.plot()
    # print("male: %.2f%%" % (float(male)/total * 100) )
    # print("female: %.2f%%" % (float(female)/total * 100))
    # print("other: %.2f%%" % (float(other)/total * 100) )

# if __name__ == '__main__':
#     print(tuling("你好"))

get_friends()