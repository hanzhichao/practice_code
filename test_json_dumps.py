import json

a = {"code":100000,"message":"\u6210\u529f","data":{"id":"51","username":"\u5218\u6d69","phone":"18613853503","birthday":"","sex":"1","nation":"\u672a\u9009\u62e9","id_card":"","hobby":"","source":"1","status":"3","remark":"","seo_department":"","seo_people":"","gmt_created":"1473587760","gmt_modified":"1473587760","integral":"0","mail":"null","seo_station":None}}

print(json.dumps(a, ensure_ascii=False, indent=2))