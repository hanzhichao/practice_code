define("safe/safe_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(e,s,r){
"use strict";
var a=e("common/wx/Tips.js"),i=e("common/wx/Cgi.js");
r.exports={
resend:function(e,s,r){
var n={
action:"send_mail",
safeaction:e
};
s&&(n.auth=s),i.post({
url:wx.url("/misc/rebindverify"),
data:n,
mask:!1
},function(e){
if(!e||!e.base_resp)return void a.err("重发邮件系统错误");
switch(+e.base_resp.ret){
case 0:
"function"==typeof r&&r(e),a.suc("发送成功");
break;

default:
a.err("重发邮件失败");
}
});
},
force_resend:function(e,s){
var r={
action:"send_assistant_mail",
ajax:1
};
e&&(r.auth=e),i.post({
url:wx.url("/misc/rebindverify"),
data:r,
mask:!1
},function(e){
if(!e||!e.base_resp)return void a.err("重发邮件系统错误");
switch(+e.base_resp.ret){
case 0:
"function"==typeof s&&s(e),a.suc("发送成功");
break;

default:
a.err("重发邮件失败");
}
});
}
};
});