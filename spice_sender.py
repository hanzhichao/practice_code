import requests



cookies = {"PHPSESSID":"fd34e161b19433fb1cb39150cb5f17dc"}

headers = {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}


uri = "http://test.spicespirit.com/api/ITakeaway/w"

data = {"params": '{"address_id":"64948","delivery_date":"2018-01-18","start_time":"10:42:25","end_time":"11:42:25","is_reserve":"2","invoice_id":"0","money":"22.00","discount":"0","freight":"20.00","received":"42.00","is_invoice":"2","is_activity":"2","activity":"nothing","red_envelope":"nothing","pay_way":"2","pay_channel":"4","products":[{"id":"23","num":"1"}],"remark":"","user_scope":"1","channel":"14","card_amount":"0","card_id":"","user_id":"83","station_id":"53"}'}
print(data,type(data))
res = requests.post(uri, headers=headers, cookies=cookies, data=data)
print(res.text)
uri = "http://test.spicespirit.com/index/index/login"
data = {"nickname": "hanzhichao", "password": "hanzhichao"}


# res = requests.post(uri, headers=headers, data=data)
# print(res.text)
# print(res.cookies._cookies)

