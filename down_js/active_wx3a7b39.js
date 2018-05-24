define("user/active_wx.js",["common/wx/Cgi.js","safe/Scan.js","common/wx/Step.js","common/wx/upload.js","biz_common/cookie.js","common/wx/Tips.js"],function(e){
"use strict";
var i=wx.cgiData,a=e("common/wx/Cgi.js"),r=e("safe/Scan.js"),n=(e("common/wx/Step.js"),
e("common/wx/upload.js")),s=(e("biz_common/cookie.js"),e("common/wx/Tips.js")),c=function(){
function e(){
new r({
container:".js_scan",
type:"check",
source:"force_check",
auth:"ticket",
dom_init:"请用绑定了%s本人银行卡的微信扫描".sprintf(i.identity_name),
onshow:$.noop,
onconfirm:function(){
var e=this.code,r=this.json&&this.json.card_name?this.json.card_name:"",c=this.json&&this.json.check_status?+this.json.check_status:602;
switch(c){
case 600:
if(i.bindalias)$(".js_status").html('<div class="status"><i class="icon_qrcode_scan succ"></i><div class="status_txt"><h4>身份验证成功</h4></div></div>').find("span").text(r),
a.post({
url:"/cgi-bin/securewxverify",
data:{
code:e,
action:"force_check_bind"
},
mask:!1
},function(e){
switch(+e.base_resp.ret){
case 0:
location.href=e.redirect_url;
break;

case 11004:
s.err("验证错误");
break;

case-101:
s.err("该微信号不存在请重新输入");
break;

case-102:
case-109:
s.err("该微信号未开通手机保护，无法绑定为运营微信号");
break;

case-103:
case 200103:
s.err("该微信用户未关注当前公众号，请先关注后再绑定");
break;

case-104:
s.err("该公众号已经绑定了4个运营者微信号，无法绑定更多微信号");
break;

case-105:
s.err("该微信号已经绑定了5个公众号，无法绑定成为运营者");
break;

case-106:
s.err("该微信号已经成功绑定了该公众号，请勿重复绑定");
break;

case-107:
s.err("该公众号还未绑主管理员帐号，请绑定后再添加运营者微信号");
break;

case-108:
s.err("该公众号已经绑定或邀请满4个运营者微信号，请尽快联系个人微信号进行确认");
break;

default:
a.handleRet(e,{
id:64462,
key:59,
url:"/cgi-bin/securewxverify?action=force_check_bind",
msg:"系统繁忙，请稍后再试"
});
}
});else{
$(".js_initial").hide();
var t=$(".js_noadmin");
t.show(),a.get({
url:"/cgi-bin/securewxverify",
data:{
code:e
},
mask:!1
},function(e){
switch(+e.base_resp.ret){
case 0:
t.find(".js_wx_name").text(e.user_nickname),t.find(".js_mp_name").text(i.mp_nickname),
e.user_headimg_url&&-1==e.user_headimg_url.indexOf("/0")&&t.find(".js_wx_img").attr("src",e.user_headimg_url+"/0"),
e.biz_headimg_url&&-1==e.biz_headimg_url.indexOf("/0")&&t.find(".js_mp_img").attr("src",e.biz_headimg_url+"/0");
break;

default:
a.handleRet(e,{
id:64462,
key:60,
url:"/cgi-bin/securewxverify",
showMsg:!1
});
}
}),t.find(".js_btn").on("click",function(){
a.post({
url:"/cgi-bin/securewxverify",
data:{
code:e,
action:"force_check_bind"
},
mask:!1
},function(e){
switch(+e.base_resp.ret){
case 0:
location.href=e.redirect_url;
break;

case 11004:
s.err("验证错误");
break;

case-101:
s.err("该微信号不存在请重新输入");
break;

case-102:
case-109:
s.err("该微信号未开通手机保护，无法绑定为运营微信号");
break;

case-13:
case 200103:
s.err("该微信用户未关注当前公众号，请先关注后再绑定");
break;

case-104:
s.err("该公众号已经绑定了4个运营者微信号，无法绑定更多微信号");
break;

case-105:
s.err("该微信号已经绑定了5个公众号，无法绑定成为运营者");
break;

case-106:
s.err("该微信号已经成功绑定了该公众号，请勿重复绑定");
break;

case-107:
s.err("该公众号还未绑主管理员帐号，请绑定后再添加运营者微信号");
break;

case-108:
s.err("该公众号已经绑定或邀请满4个运营者微信号，请尽快联系个人微信号进行确认");
break;

default:
a.handleRet(e,{
id:64462,
key:59,
url:"/cgi-bin/securewxverify?action=force_check_bind",
msg:"系统繁忙，请稍后再试"
});
}
});
});
}
break;

case 601:
$(".js_initial").hide();
var o=$(".js_upload");
o.show(),n.uploadTmpFile({
container:"#js_uploader",
multi:!1,
timeout:300,
type:2,
onComplete:function(e,i,a,r){
var s=r.content||"";
if(0==r.base_resp.ret&&s){
var c=$("#js_uploader"),t=$("#js_finish"),o=n.tmpFileUrl(s),d=c.parent().siblings(".upload_preview").find("img");
d.attr("src",o),t.data("front",s),t.data("end")&&t.removeClass("btn_disabled").addClass("btn_primary"),
c.text("重新上传");
}
}
}),n.uploadTmpFile({
container:"#js_uploader2",
multi:!1,
timeout:300,
type:2,
onComplete:function(e,i,a,r){
var s=r.content||"";
if(0==r.base_resp.ret&&s){
var c=$("#js_uploader2"),t=$("#js_finish"),o=n.tmpFileUrl(s),d=c.parent().siblings(".upload_preview").find("img");
d.attr("src",o),t.data("end",s),t.data("front")&&t.removeClass("btn_disabled").addClass("btn_primary"),
c.text("重新上传");
}
}
}),$("#js_finish").on("click",function(){
var i=$(this),r=$("#js_idname").val().trim(),n=$("#js_idnumber").val().trim(),c=i.data("front"),t=i.data("end");
return!i.hasClass("btn_disabled")&&c&&t?r?n?c&&t?void a.post({
url:"/cgi-bin/securewxverify",
data:{
code:e,
idpic_frontmediaid:c,
idpic_backmediaid:t,
id_name:r,
id_number:n,
action:"force_check"
},
mask:!1
},function(e){
switch(+e.base_resp.ret){
case 0:
$(".js_upload").hide(),$(".js_wait").show().find(".js_btn").on("click",function(){
location.href="/";
});
break;

case 11004:
s.err("验证错误");
break;

default:
a.handleRet(e,{
id:64462,
key:61,
url:"/cgi-bin/securewxverify?action=force_check",
msg:"系统繁忙，请稍后再试"
});
}
}):(s.err("请上传身份证照片正面"),!1):(s.err("请输入运营者身份证号"),!1):(s.err("请输入运营者名称"),!1):!1;
}),o.find(".js_return").on("click",function(){
location.reload();
});
break;

default:
var d=$(".js_status");
d.html('<div class="status"><i class="icon_qrcode_scan warn"></i><div class="status_txt"><h4>姓名不匹配</h4><p>请用绑定有<span></span>的银行卡微信扫描此二维码。<a href="javascript:;">刷新</a></p></div></div>'),
d.find("span").text(i.identity_name),d.find("a").on("click",function(){
location.reload();
});
}
}
});
}
function c(){
$(".js_initial").show().find(".js_realname").text(i.identity_name),e();
}
return{
init:c
};
}(),t=function(){
function e(){
$(".js_wait").show().find(".js_btn").on("click",function(){
location.href="/";
});
}
return{
init:e
};
}(),o=(function(){
function e(){
var e=$(".js_noadmin");
e.find(".js_wx_name").text(i.user_nickname),e.find(".js_mp_name").text(i.mp_nickname),
i.user_headimg_url&&-1==i.user_headimg_url.indexOf("/0")&&e.find(".js_wx_img").attr("src",i.user_headimg_url+"/0"),
i.biz_headimg_url&&-1==i.biz_headimg_url.indexOf("/0")&&e.find(".js_mp_img").attr("src",i.biz_headimg_url+"/0"),
e.show(),e.find(".js_btn").on("click",function(){
a.post({
url:"/cgi-bin/securewxverify",
data:{
action:"noadmin_checked"
},
mask:!1
},function(e){
switch(+e.base_resp.ret){
case 0:
s.suc("绑定成功"),location.href=e.redirect_url;
break;

case 11004:
s.err("验证错误");
break;

case-101:
s.err("该微信号不存在请重新输入");
break;

case-102:
s.err("该微信号未开通手机保护，无法绑定为运营微信号");
break;

case-103:
case 200103:
s.err("该微信用户未关注当前公众号，请先关注后再绑定");
break;

case-104:
s.err("该公众号已经绑定了4个运营者微信号，无法绑定更多微信号");
break;

case-105:
s.err("该微信号已经绑定了5个公众号，无法绑定成为运营者");
break;

case-106:
s.err("该微信号已经成功绑定了该公众号，请勿重复绑定");
break;

case-107:
s.err("该公众号还未绑主管理员帐号，请绑定后再添加运营者微信号");
break;

case-108:
s.err("该公众号已经绑定或邀请满4个运营者微信号，请尽快联系个人微信号进行确认");
break;

default:
a.handleRet(e,{
id:64462,
key:62,
url:"/cgi-bin/securewxverify?action=noadmin_checked",
msg:"系统繁忙，请稍后再试"
});
}
});
});
}
return{
init:e
};
}(),function(){
function e(){
var e=$(".js_fail");
e.show(),e.find(".js_reapply").on("click",function(){
$(".js_fail").hide(),c.init();
}),e.find(".js_failfinish").on("click",function(){
location.href="/";
});
}
return{
init:e
};
}()),d=function(){
function e(){
switch(+i.check_status){
case 1:
t.init();
break;

case 3:
o.init();
break;

default:
c.init();
}
}
return{
init:e
};
}();
d.init();
});