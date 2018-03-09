import hashlib
import json

data={"cmd":"order.create","timestamp":"1517805148","version":3,"ticket":"2E2BB985-B632-DAC3-EFC3-0B208F51ADDC","source":65478,"body":{"order_id":"15178051390513"},"encrypt":""}


def md5(str):
    m = hashlib.md5()
    m.update(str.encode('utf8'))
    return m.hexdigest()

secret = "5a5cdda47e233d9c"
sign="C2E657A8C3E559A2A8DC60865B210BE5"


def baidu_sign_params_md5(secret, params):

    _str=''
    if isinstance(params, list):
        params = params[0]
    params['secret'] = secret
    keys = sorted(params.keys())
    for key in keys:
        value = params[key]
        if isinstance(params[key],dict):
            value = json.dumps(value)
        else:
            value = str(value)
        _str = _str + key + '=' + value + '&'
    _str = _str[:-1]
    print("_str: %s" % _str)
    sign = md5(_str).upper()
    print("sign: %s" % sign)
    del params['secret']
    params['sign']=sign
    print(params)
    return params

str = 'body={"order_id":"15178051390513"}&cmd=order.create&encrypt=&secret=5a5cdda47e233d9c&source=65478&ticket=2E2BB985-B632-DAC3-EFC3-0B208F51ADDC&timestamp=1517805148&version=3'
# baidu_sign_params_md5(secret, data)
print(md5(str).upper())