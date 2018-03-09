import requests
import hashlib
import json

r = "lat39.975377lng116.334223BMLYkAKNcAthZbW7kQDUe8i4PmLoek"

appId = "CORE0002"
accessKey = "BMLYkAKNcAthZbW7kQDUe8i4PmLoek"

data = [{"appid":"CORE0002","sign":"D4A013BD61598079A2F932B9A18849478BC81CBF","auth-type":0},{"lng":"116.334223","lat":"39.975377"}]

# params = {"lng":"116.334223","lat":"39.975377"}


def sha1(str):
    m = hashlib.sha1()
    m.update(str.encode('utf8'))
    return m.hexdigest()




def get_session():
    session = requests.Session()
    headers = {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
    login_uri = "http://test.spicespirit.com/index/index/login"
    login_data = {"nickname": "hanzhichao", "password": "hanzhichao"}

    res = session.post(login_uri, headers=headers, data=login_data)
    return session


def sign_params(appId, accessKey, params):

    str=''
    for key in sorted(params.keys()):
        str = str + key + params[key]
    str += accessKey
    sign = sha1(str).upper()
    return [{"appid": appId, "sign": sign, "auth-type":0}, params]




def matchStation(params):
    # cookies = {"PHPSESSID":"fd34e161b19433fb1cb39150cb5f17dc"}
    session = get_session()
    headers={"Content-Type": "application/json"}
    uri = "http://192.168.100.238:8089/api/Istation/matchStation"

    # res = requests.post(uri, headers=headers, cookies = cookies, data=json.dumps(data))
    data = sign_params(appId,accessKey,params)
    res = session.post(uri, headers=headers, data=json.dumps(data))
    print(res.text)

matchStation({"lng":"116.334223","lat":"39.975377"}) 

