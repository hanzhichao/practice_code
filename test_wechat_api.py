import requests


appID="wx3f561cf58bafaaf8"
appsecret="ebac048c73549c7312ef285a5b91a380"

uri = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s" % (appID,appsecret)

req = requests.get(uri)

print(req.json()["access_token"])