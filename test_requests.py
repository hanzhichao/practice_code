import requests
import json
# from requests_toolbelt import MultipartEncoder

# fields=json.dumps({"appCode":"YjZhZTJiZDkxZmI5NjUwODE2MTlmYTVhZDQ4ZWY1NjA=","timeCode":"1511946653","sFormId":"approval","sContent":{"k3_id":"1234","k3_code":"cg123","status":"1","id":"25","code":"20171119002","detail":[{"operator":"张三","status":"2","remark":"同意"},{"operator":"张三","status":"2","remark":"同意"}]}})


# requests.post(url=url, data=data, headers=headers)

url='http://192.168.100.238:8086/gateway/Synchronize/entrance'
# body={"appCode":(None,"YjZhZTJiZDkxZmI5NjUwODE2MTlmYTVhZDQ4ZWY1NjA="),"timeCode":(None,"1511946653"),"sFormId":(None,"approval"),"sContent":{"k3_id":"1234","k3_code":"cg123","status":"1","id":"25","code":"20171119002","detail":[{"operator":"张三","status":"2","remark":"同意"},{"operator":"张三","status":"2","remark":"同意"}]}}

data=json.dumps({"k3_id":"1234","k3_code":"cg123","status":"1","id":"25","code":"20171119002","detail":[{"operator":"张三","status":"2","remark":"同意"},{"operator":"张三","status":"2","remark":"同意"}]})
# print(body)
body='appCode=YjZhZTJiZDkxZmI5NjUwODE2MTlmYTVhZDQ4ZWY1NjA=&timeCode=1511946653&sFormId=approval&sContent=' + data
# print(body)
# appCode=&timeCode=&sFormId=approval&sContent=
def request(url,data):
    response=requests.get(url=url, data=data)
    print(response.json())

if __name__=='__main__':
    request(url,data)
