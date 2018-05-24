define("device/setting.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/editit.js"],function(t){
"use strict";
var e=wx.cgiData||{},i={
status:0,
intr_url:""
},n=t("common/wx/Cgi.js"),s=t("common/wx/Tips.js"),o=t("common/wx/editit.js"),a=$.extend({},i,e);
$("#js_status").html(a.status?"已发布":"开发中"),$("#js_note").text(a.intr_url),new o({
container:"#js_note",
enabletip:!1,
enablefail:!1,
editBtnClass:"modify_btn",
editBtnTxt:"修改",
editBtnTitle:"修改",
helpTxt:"请填写使用说明地址链接，如www.shuoming.com",
callback:function(t,e){
n.post({
url:wx.url("/device/updateintr"),
data:{
intr_url:e
},
mask:!1
},function(t){
if(!t)return void s.err("系统错误，请重试");
switch(+t.ret){
case 0:
s.suc("修改成功"),setTimeout(function(){
location.reload();
},300);
break;

case 12001:
s.suc("提交了不合法的URL");
break;

case 12002:
s.suc("URL存在安全风险");
break;

default:
s.err("修改失败，请重试");
}
});
}
});
});