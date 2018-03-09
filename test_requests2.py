#-*- coding:utf8 -*-
import requests
import json

headers="application/x-www-form-urlencoded"
url='http://192.168.100.238:8086/gateway/Synchronize/entrance' 
body={"appCode":"YjZhZTJiZDkxZmI5NjUwODE2MTlmYTVhZDQ4ZWY1NjA=","timeCode":"1511946653","sFormId":"approval","sContent":json.dumps({"k3_id":"1234","k3_code":"cg123","status":"1","id":"25","code":"20171119002","detail":[{"operator":"张三","status":"2","remark":"同意"},{"operator":"张三","status":"2","remark":"同意"}]})}

def request(url,body):
    response=requests.post(url,params=body)
    print(response.json())

if __name__=='__main__':
    request(url,body)