define("authorize/validate_wx.js",["common/wx/Cgi.js","safe/Scan.js","common/wx/Tips.js"],function(e){
"use strict";
var r=wx.cgiData,a=e("common/wx/Cgi.js"),c=e("safe/Scan.js"),o=e("common/wx/Tips.js");
!function(){
if(r.appinfo.redirect_url=r.appinfo.redirect_uri.html(!1),r.wxprotect){
$(".js_scan").show();
{
new c({
container:".js_scan",
type:"check",
source:"login",
auto_msgid:!0,
auth:"ticket",
wx_name:r.bindalias,
onconfirm:function(){
var e=this.msgid,c=this.code;
e&&c&&a.post({
url:"/cgi-bin/componentwxverify",
data:{
account:r.appinfo.account,
component_appid:r.appinfo.component_appid,
pre_auth_code:r.appinfo.pre_auth_code,
redirect_uri:r.appinfo.redirect_url,
func_scopeid:r.appinfo.func_scopeid,
code:c,
operation_seq:e
},
mask:!1
},function(e){
switch(+e.base_resp.ret){
case 0:
ret.redirect_url&&(location.href=ret.redirect_url);
break;

case-100:
o.err("授权Code不合法");
break;

case-101:
o.err("授权Code已过期");
break;

case-102:
o.err("授权域名不合法");
break;

case 200103:
o.err("已授权过，不能重复授权");
break;

case-104:
o.err("授权的funcscope_category不合法");
break;

case-105:
o.err("授权Ticket已过期");
break;

case-106:
o.err("授权ReqKey重复");
break;

case-107:
o.err("不能授权给多个同类型的非共享组件");
break;

case-108:
o.err("对于未审核通过的组件，非白名单公众号不可授权");
break;

case-109:
o.err("不合法的组件类型");
break;

case-110:
o.err("公众号登录成功，但授权失败，失败原因：不合法的request key");
break;

case 101:
$(".js_scan").hide(),$(".js_authother").show();
break;

default:
o.err("系统错误，请稍后再试");
}
});
}
});
}
}else $(".js_noprotect").show();
var e=function(){
a.post({
url:"/cgi-bin/componentwxverify",
data:{
action:"check_code",
account:r.appinfo.account,
component_appid:r.appinfo.component_appid,
pre_auth_code:r.appinfo.pre_auth_code,
redirect_uri:r.appinfo.redirect_url
},
mask:!1
},function(e){
if(e&&e.base_resp)switch(+e.base_resp.ret){
case 0:
break;

default:
location.href="/cgi-bin/readtemplate?t=authorize/wx_error_tmpl&lang=zh_CN";
}
});
};
setInterval(e,1e4);
}();
});