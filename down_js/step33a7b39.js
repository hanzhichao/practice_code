define("register/step3.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","common/wx/dialog.js"],function(t,e,o){
"use strict";
function n(t){
var e,o=$("#tpl_popup_service_type").popup({
data:{
service_type:t
},
buttons:[{
text:"确定",
type:"primary",
click:function(){
var o=this;
return e.hasClass("btn_loading")?!1:(e.btn(!1),void r.post({
url:"/acct/registerpage",
data:{
action:"savetype",
type:t
}
},function(n){
n&&0==n.base_resp.ret?(c.setData(function(e){
e.service_type=t;
}),c.setStep(4)):(r.handleRet(n,{
id:"64430",
key:"3",
msg:"系统错误，请重试"
}),e.btn(!0)),o.remove();
}));
}
},{
text:"取消",
type:"default",
click:function(){
this.remove();
}
}],
mask:!0,
onHide:function(){
this.remove();
},
onShow:function(){
var t=this.get();
e=t.find(".js_btn_p").eq(0);
}
});
o.popup("resetPosition");
}
function i(){}
function s(){}
function p(){
$(".js_btn_service_type").on("click",function(t){
var e=$(this).data("type"),o=t&&(t.srcElement||t.target);
"A"!=o.nodeName&&(0==c.getData().is_overseas?4==e?window.location.href="https://work.weixin.qq.com/wework_admin/register_wx?from=wxmp_register_step3":n(e):r.post({
url:"/acct/registerpage",
data:{
action:"savetype",
type:e
}
},function(t){
t&&0==t.base_resp.ret?(c.setData(function(t){
t.service_type=e;
}),c.setStep(4)):r.handleRet(t,{
id:"64430",
key:"3",
msg:"系统错误，请重试"
});
}));
});
}
function a(t){
m||(c=t.model,m=!0,i(),s(),p());
}
var c,r=t("common/wx/Cgi.js"),m=(t("common/wx/Tips.js"),t("common/wx/popup.js"),
t("common/wx/dialog.js"),!1);
o.exports={
init:a
};
});