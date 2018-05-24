define("authorize/confirm.js",["common/wx/Cgi.js","common/wx/dialog.js","common/wx/Step.js","common/wx/messenger.method.js","common/wx/popup.js","common/wx/Tips.js","common/wx/browserVersion.js","common/wx/checkTenpayCtrl.js"],function(e){
"use strict";
var n=e("common/wx/Cgi.js"),t=e("common/wx/dialog.js"),o=e("common/wx/Step.js"),i=e("common/wx/messenger.method.js"),r=(e("common/wx/popup.js"),
e("common/wx/Tips.js"),null),a=template.render,s=function(s){
function c(e){
var n="";
return $.each(e,function(e,t){
""!==n&&(n+="&"),n+=e,n+="=",n+=t;
}),n;
}
function p(e){
t.show({
type:"err",
hideClose:!0,
msg:"错误|"+(e||"系统错误，请稍后重试"),
mask:!0
});
}
function u(e){
$(".js_qrcode_wrp").hide(),$(".js_msg").empty().html(a("tpl_msg",e)).show();
}
function m(r,a){
var s=function(){
var n=e("common/wx/browserVersion.js"),o=e("common/wx/checkTenpayCtrl.js");
if(o.isInstalled)return!0;
if("Chrome"==n.name&&n.version>"42"){
var i;
switch(n.os){
case"windows":
i="IE";
break;

case"linux":
i="Firefox";
break;

case"mac":
i="Safari";
break;

default:
i="其他";
}
t.show({
title:"请更换浏览器",
msg:"当前浏览器不支持财付通控件|Chrome最新版暂时不支持部分财付通控件，请更换%s或其他浏览器".sprintf(i),
type:"info",
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.hide();
}
}]
});
}else t.show({
title:"下载财付通控件",
msg:"由于当前电脑未安装财付通安全控件无法授权|请下载并安装“财付通安全控件”，然后回到%s重新开始授权。<br>安装后可能需要重新启动浏览器。".sprintf(html_decode(ops.plugin_info.name)),
type:"info",
buttons:[{
text:"下载控件",
type:"primary",
click:function(){
window.open(o.downloadPath,"_blank");
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
return!1;
},m=function(e){
i.init(e);
var t={
preAuthCode:r.component_pre_auth_code,
platfromMMAppId:r.component_appid,
platfromMMAppUin:r.open_component_uin,
mpMMAppId:r.open_mp_appid,
mpMMAppUin:r.open_mp_uin,
primaryMerchantId:r.open_biz_mp_mchid,
mMAppId:r.biz_mp_appid,
mMAppUin:r.biz_mp_uin,
sourceMerchantId:r.biz_mp_mchid
},o="https://pay.weixin.qq.com/index.php/auth_apply?"+c(t);
e.attr("src",o),e.on("load",function(){
Iframe.init(this.contentWindow);
}),Iframe.on("step1_cancel",function(){
d.popup("hide");
}),Iframe.on("step1_next",function(){
f.setStep(2);
}),Iframe.on("step2_cancel",function(){
d.popup("hide");
}),Iframe.on("step2_next",function(){
n.post({
url:"/cgi-bin/componentloginpage",
data:{
action:"bind_payauth",
uuid:a
},
mask:!1
},function(e){
if(!e||!e.base_resp||void 0===e.base_resp.ret)return void p("系统错误，请稍后重试");
var t=1*e.base_resp.ret;
switch(t){
case 0:
$(".js_pay_step1_2").hide(),$(".js_pay_step3").show(),n.get({
url:"/safe/safeuuid?timespam="+(new Date).valueOf()+"&uuid="+a,
mask:!1
},function(e){
return e&&e.confirm_resp&&e.confirm_resp.redirect_uri?void setTimeout(function(){
location.href=e.confirm_resp.redirect_uri;
},500):void p("跳转至第三方平台时发生错误");
});
break;

default:
p(h[t]);
}
});
}),$(".js_pay_step3").hide(),$(".js_pay_steps_wrp").parent().css("padding",0);
};
if(s()){
u({
title:"请继续授权",
desc:"请继续完成微信支付权限的授权"
});
var d=$("#tpl_pay").popup({
title:"微信支付授权"
}),f=new o({
container:".js_pay_nav",
selected:1,
names:["1 验证商户身份","2 授权流程确认","3 授权成功"]
});
m($("#payIframe")),$(".js_pay_step1_2").show(),$(".js_pay_step3").hide(),d.popup("resetPosition"),
$(".js_pay_wrp").parent().css("padding",0);
}
}
function d(){
$(".js_box").html(a("tpl_content",s));
}
function f(){
var e;
n.post({
url:"/safe/safeqrconnect",
mask:!1,
data:{
action:"bindcomponent",
state:0,
component_appid:s.component_appid,
component_pre_auth_code:s.pre_auth_code,
component_redirect_uri:s.redirect_uri
}
},function(t){
if(!t||!t.uuid)return void p("系统错误，请稍后重试");
e=t.uuid;
var o="/safe/safeqrcode?action=bindcomponent&uuid="+e+"&auth_type="+s.auth_type;
s.username&&(o+="&username="+s.username),$(".js_qrcode").attr("src",o);
var i=setInterval(function(){
n.get({
url:"/safe/safeuuid?timespam="+(new Date).valueOf()+"&uuid="+e,
mask:!1
},function(n){
if(!n||!n.errcode)return void clearInterval(i);
switch(1*n.errcode){
case 401:
break;

case 402:
clearInterval(i),f();
break;

case 404:
u({
title:"扫描成功",
desc:"请在手机上进行授权"
});
break;

case 405:
clearInterval(i);
var t=n.confirm_resp.component_status;
switch(t){
case 0:
u({
title:"授权成功",
desc:"正在跳转至第三方平台页面……"
}),setTimeout(function(){
location.href=n.confirm_resp.redirect_uri;
},500),console.log(n);
break;

case 1:
m(n.confirm_resp,e);
break;

case 2:
p("授权错误，请稍后重试");
break;

case 3:
p("系统错误，请稍后重试");
}
break;

case 500:
clearInterval(i);
break;

default:
clearInterval(i),console.log("default:"),console.log(n);
}
});
},1e3);
});
}
function _(){
var e=$(".js_vendor"),n=$(".js_detail"),t=200,o=1e3;
e.hover(function(){
clearTimeout(r),r=null,n.fadeIn(t);
},function(){
r||(r=setTimeout(function(){
clearTimeout(r),r=null,n.fadeOut(t);
},o));
}),n.hover(function(){
clearTimeout(r),r=null;
},function(){
r||(r=setTimeout(function(){
clearTimeout(r),r=null,n.fadeOut(t);
},o));
});
}
function l(){
0!=s.ret?p(h[s.ret]):(d(),f(),_());
}
var h={
"-1":"系统错误",
"-11":"PreAuthCode无效",
"-12":"二维码失效",
"-13":"参数错误",
"-14":"请确认授权入口页所在域名，与授权后回调页所在域名相同，并且，此两者都必须与申请第三方平台时填写的授权发起页域名相同。授权入口页所在域名：%s".sprintf(s.refer_host||"空"),
"-15":"请求过于频繁",
"-16":"跳转url命中黑名单",
"-19":"获取授权信息失败",
"-20":"权限集未发生变化",
"-21":"没有绑定管理员",
"-22":"没有绑定关系",
"-23":"授权失败",
"-24":"第三方平台已停止服务",
"-25":"公众号已达到最大授权上限",
"-26":"二维码已被授权",
"-27":"二维码未授权",
"-28":"预授权码已经被授权过，不能重复使用，请重新从源头页面进入授权页"
};
return{
init:l
};
}(wx.cgiData);
s.init();
});