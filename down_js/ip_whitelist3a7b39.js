define("advanced/ip_whitelist.js",["common/wx/popup.js","safe/safe_check.js","common/wx/popover.js","common/wx/Tips.js"],function(e,i,n){
"use strict";
function t(e,i,n,t,s){
b=!0,p=e,_=i,h=n,l=t,u=s;
}
function s(e,i,n,s){
b||t(e,i,n,s),m=$(p).popup({
title:"查看IP白名单",
className:"dialog_wrp align_edge ip_setting_dialog",
onShow:function(){
j=this;
},
close:function(){
this.remove();
},
buttons:[{
text:"修改",
type:"primary",
click:function(){
d();
}
},{
text:"关闭",
type:"default",
click:function(){
this.remove();
}
},{
text:"确认修改",
type:"primary",
click:function(){
$("#js_IP_error_tip").hide(),f=$.trim($("#js_IP_whitelist_input").val()).replace(/[ \f\r\t\v]/g,"").replace(/\n{2,}/g,"\n").split("\n"),
1===f.length&&""===f[0]&&(f=[]);
var e,i,n=!0,t=f.length,s=/^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;
for(e=0;n&&t>e;e++)for(i=e+1;n&&t>i;i++)f[e]===f[i]&&(n=!1);
if(n){
var o=[];
for(e=0;t>e;e++)s.test(f[e])||(n=!1,o.push(f[e]));
n?r():a(o);
}else k.err("存在重复ip，请删除后保存");
}
}]
}),0===_.length?d():o();
}
function o(){
m.find(".dialog_hd h3").text("查看IP白名单"),m.find(".js_preview_page").show().find(".js_whitelist").html("<div>"+(_.length?_.join("</div><div>"):"当前IP白名单为空，将无法调用%s获取access_token%s".sprintf('<a href="/wiki/?t=resource/res_main&id=mp1421140183&token=&lang=zh_CN" target="_blank">',"</a>"))+"</div>"),
m.find(".js_setting_page").hide(),m.find(".js_safecheck_page").hide(),m.find(".js_btn_p").show(),
m.find(".js_btn_p").eq(2).hide();
}
function d(e,i){
!e&&$("#js_IP_whitelist_input").val(_.join("\n")),e&&i&&i instanceof Array&&i.length?a(i):$("#js_IP_error_tip").hide(),
m.find(".dialog_hd h3").text("IP白名单设置"),m.find(".js_preview_page").hide(),m.find(".js_setting_page").show(),
m.find(".js_safecheck_page").hide(),m.find(".js_btn_p").hide(),m.find(".js_btn_p").eq(2).show();
}
function r(){
m.find(".dialog_hd h3").text("IP白名单设置"),m.find(".js_preview_page").hide(),m.find(".js_setting_page").hide();
var e=m.find(".js_safecheck_page").show();
m.find(".js_btn_p").hide(),l.source="bind_IP",l.msgid=u,l.distinguish=!0;
v.check(l,function(e){
e&&e.code&&"wx.pass"!=e.code&&(1==e.type||2==e.type)&&$.ajax({
url:"/advanced/advanced",
dataType:"json",
type:"post",
data:{
token:c("token"),
f:"json",
action:"reset_appsecret_ip",
uuid:e.code,
iplist:f.join(";")
},
success:function(e){
switch(e&&e.base_resp&&e.base_resp.ret){
case 280004:
k.err("无效的扫码"),d(!0);
break;

case 280005:
k.err("管理员或长期运营者，扫码确认"),d(!0);
break;

case 280006:
k.err("存在无效的ip列表"),d(!0,e.ip.invalid_ip_list);
break;

case 280007:
k.err("ip长度设置超过限制"),d(!0);
break;

case 280008:
k.err("管理员或长期运营者，未扫码确认"),d(!0);
break;

case 0:
k.suc("设置成功"),_=f,h(_),o();
break;

default:
k.err("系统错误"),d(!0);
}
},
error:function(){
k.err("操作失败，请稍候重试");
}
});
},{
dialog:j,
dialogdom:e,
autoClose:!1,
checkdom:".js_wxcheck3"
});
}
function a(e){
g&&g.remove(),$("#js_IP_error_tip_ask").unbind("mouseenter").unbind("mouseleave").hover(function(){
g=new w({
dom:this,
content:"<div>"+e.join("</div><div>")+"</div>",
isToggle:!0
});
}),$("#js_IP_error_tip").show();
}
function c(e){
var i=arguments[1]||window.location.search,n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),t=i.substr(i.indexOf("?")+1).match(n);
return null!=t?t[2]:"";
}
e("common/wx/popup.js");
var p,_,f,h,l,u,j,g,m,v=e("safe/safe_check.js"),w=e("common/wx/popover.js"),k=e("common/wx/Tips.js"),b=!1;
n.exports={
init:t,
show:s
};
});