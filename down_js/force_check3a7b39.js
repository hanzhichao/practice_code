define("home/force_check.js",["common/wx/Cgi.js","common/wx/popup.js","common/wx/Tips.js","common/wx/upload.js","common/wx/dialog.js","tpl/home/force_check.html.js","tpl/home/force_check_edit.html.js"],function(e,t,c){
"use strict";
function i(e){
var t=new Date(1e3*e);
return t.getFullYear()+"年"+(t.getMonth()+1)+"月"+t.getDate()+"日";
}
function o(e){
function t(e){
var t=0;
"x"==e[17].toLowerCase()&&(e[17]=10);
for(var c=0;17>c;c++)t+=n[c]*e[c];
return o=t%11,e[17]==r[o]?!0:!1;
}
function c(e){
var t=e.substring(6,10),c=e.substring(10,12),i=e.substring(12,14),o=new Date(t,parseFloat(c)-1,parseFloat(i));
return o.getFullYear()!=parseFloat(t)||o.getMonth()!=parseFloat(c)-1||o.getDate()!=parseFloat(i)?!1:!0;
}
function i(e){
if(e=$.trim(e.replace(/ /g,"")),18==e.length){
var i=e.split("");
return c(e)&&t(i)?!0:!1;
}
return!1;
}
var o,n=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1],r=[1,0,10,9,8,7,6,5,4,3,2];
return i(e);
}
function n(e){
_=e,_.expire_time_str=i(_.expire_time);
}
function r(){
function e(){
$(".js_force_check_loading").show(),$(".js_force_check_scanning").hide(),$(".js_force_check_done").hide();
}
function t(){
$(".js_force_check_loading").hide(),$(".js_force_check_scanning").show(),$(".js_force_check_done").hide();
}
function c(){
$(".js_force_check_loading").hide(),$(".js_force_check_scanning").hide(),$(".js_force_check_done").show();
}
function i(){
var e={};
"frozen"==_.page&&(e.auth="ticket",e.ticket=_.ticket,e.ticket_id=_.ticket_id,e.from_ban=1),
l.post({
url:wx.url("/misc/safeassistant?action=get_ticket"),
data:e
},function(e){
return e&&e.base_resp&&0==e.base_resp.ret?void n(e.ticket):void p.err("系统错误，请稍后重试");
});
}
function n(e){
l.post({
url:"/safe/safeqrconnect",
mask:!1,
data:{
action:"check",
type:"force_check",
ticket:e,
state:0
}
},function(t){
return t&&t.uuid?void a(e,t.uuid):void p.err("系统错误，请稍后重试");
});
}
function a(e,c){
var i="https://mp.weixin.qq.com/safe/safeqrcode?action=check&type=force_check&auth=ticket&ticket=%s&uuid=%s".sprintf(e,c);
$(".js_force_check_qrcode").attr("src",i).show(),t(),u=setInterval(function(){
l.get({
url:"/safe/safeuuid?timespam="+(new Date).valueOf()+"&uuid="+c,
mask:!1
},function(e){
if(!e||!e.errcode)return void clearInterval(u);
switch(1*e.errcode){
case 401:
break;

case 403:
s();
break;

case 404:
600==e.check_status?k():601==e.check_status?g():602==e.check_status&&b();
break;

case 405:
v();
break;

default:
p.err("扫码超时，请刷新重试"),clearInterval(u);
}
});
},1e3);
}
function s(){}
function k(){}
function g(){
c(),$(".js_force_check_before").hide(),$(".js_force_check_continue").show(),clearInterval(u),
$(".js_force_check_edit_btn").off().on("click",function(){
"home"==_.page&&f&&f.popup("hide"),d=$($.trim(j)).popup({
title:"验证注册主体身份",
width:960,
className:"index_confirm_dialog",
buttons:[{
text:"确定",
type:"primary",
click:function(){
var e=this.$dialogWrp.find(".js_btn"),t=this.$dialogWrp.find(".js_id_name").val().trim(),c=this.$dialogWrp.find(".js_id_card").val().trim(),i=e.data("front"),n=e.data("end");
if(!t)return p.err("请输入注册主体名称"),!1;
if(!c)return p.err("请输入注册主体身份证号"),!1;
if(!o(c))return p.err("请输入正确的注册主体身份证号"),!1;
if(!i||!n)return p.err("请上传身份证照片"),!1;
var r={
idpic_frontmediaid:i,
idpic_backmediaid:n,
id_name:t,
id_number:c,
action:"force_check"
},a="home"==_.page?"/cgi-bin/home":"/acct/ban";
"frozen"==_.page&&(r.ticket=_.ticket,r.ticket_id=_.ticket_id),l.post({
url:a,
data:r,
mask:!1
},function(e){
switch(+e.base_resp.ret){
case 0:
d.popup("hide"),m.show({
type:"info",
title:"提交成功",
msg:"你的信息已提交成功|将在七个工作日内审核，审核成功“通知中心”会说明。若审核失败，页面会提示重新提交。",
buttons:[{
text:"确定",
type:"primary",
click:function(){
setTimeout(function(){
location.reload();
},500);
}
}]
});
break;

case 215001:
p.err("请勿重复提交");
break;

default:
cgi.handleRet(e,{
id:64462,
key:22,
url:"/cgi-bin/home?action=force_check"
}),p.err("系统错误，请稍后重试");
}
});
}
}]
}),h.uploadTmpFile({
container:".js_uploader",
multi:!1,
timeout:15e3,
type:2,
onComplete:function(e,t,c,i){
var o=i.content||"";
if(0==i.base_resp.ret&&o){
var n=$(".js_uploader"),r=d.find(".js_btn"),a=h.tmpFileUrl(o),s=n.parent().siblings(".js_upload_preview").find("img");
s.attr("src",a),r.data("front",o),n.text("重新上传");
}
}
}),h.uploadTmpFile({
container:".js_uploader2",
multi:!1,
timeout:15e3,
type:2,
onComplete:function(e,t,c,i){
var o=i.content||"";
if(0==i.base_resp.ret&&o){
var n=$(".js_uploader2"),r=d.find(".js_btn"),a=h.tmpFileUrl(o),s=n.parent().siblings(".js_upload_preview").find("img");
s.attr("src",a),r.data("end",o),n.text("重新上传");
}
}
});
}),_.onGetMore&&_.onGetMore();
}
function b(){
$(".js_force_check_before").hide(),$(".js_force_check_fail").show(),r(),_.onFail&&_.onFail();
}
function v(){
c(),$(".js_force_check_before").hide(),$(".js_force_check_success").show(),clearInterval(u),
_.onSuccess&&_.onSuccess(),"home"==_.page&&f.find(".js_btn").click(function(){
$(this).btn(!1),setTimeout(function(){
location.reload();
},500);
});
}
e(),clearInterval(u),i();
}
function a(){
f=$($.trim(k)).popup({
title:"验证主体身份",
width:960,
data:$.extend(!0,{},_,{
status:!0
}),
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.hide();
}
}],
onShow:function(){
this.$dialogWrp.addClass("index_confirm_dialog"),r();
},
onHide:function(){
clearInterval(u),this.remove();
}
});
}
function s(){
var e=$(_.dom);
e.html(wx.T($.trim(k),_)),r();
}
var u,f,d,_,l=e("common/wx/Cgi.js"),p=(e("common/wx/popup.js"),e("common/wx/Tips.js")),h=e("common/wx/upload.js"),m=e("common/wx/dialog.js"),k=e("tpl/home/force_check.html.js"),j=e("tpl/home/force_check_edit.html.js");
c.exports={
init:n,
renderIndexPopup:a,
renderPage:s,
toDateStr:i
};
});