# coding=utf-8
from util.common import *
from util import xls
import requests
import json

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

def new_quote():
    env_url = "http://w-beta-1000.chemanman.com:7815"
    api_res = "/api/Basic/PriceSystemV2/priceOpV2/"
    uri = env_url+api_res

    headers = get_json("headers.json")
    cookies = get_json("cookies.json")
    req = get_json("new_quote.json")

    # 参数化
    lists = xls.load("util/new_quote.xls")
    for dic in lists:
        req["obj_info"]["pm_id"]=dic["pm_id"]
        req["obj_info"]["price_name"]=dic["price_name"]
        req["obj_info"]["fee_name"]=dic["fee_name"]
        
        data ='req='+ json.dumps(req)
        r=requests.post(uri, data=data, headers=headers, cookies=cookies)
        #print r.text
        if r.json()['errno'] != 0:
            print "fail " + r.json()['errmsg']
        else:
            print "New Quote--- %s ---Success!" % req["obj_info"]["price_name"]


if __name__ == "__main__":
    new_quote()
