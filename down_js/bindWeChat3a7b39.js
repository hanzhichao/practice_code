define("common/wx/bindWeChat.js",["tpl/advanced/bindWeChat.html.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/Cgi.js","common/wx/popup.js"],function(e,t,s){
"use strict";
var a=(wx.T,e("tpl/advanced/bindWeChat.html.js")),n=e("common/wx/Tips.js"),i=(template.render,
e("common/wx/dialog.js"),e("common/wx/Cgi.js")),o=(e("common/wx/popup.js"),154013),r=154014,c=154015,d=154016,l=-2,p=-1,b=0,h=function(e){
var t=$("<div></div>");
return t.html(e),t.text();
},m=function(e){
$(e.container).on("click",function(){
var t,s,m,u,f,w,x,k=!1,_=$(a).popup({
title:e.title,
width:960,
close:function(){
this.remove();
},
buttons:[{
text:"邀请绑定",
type:"disabled",
click:function(){
return w.hasClass("btn_disabled")?!1:void(t?(w.btn(!1).addClass("btn_disabled").removeClass("btn_primary"),
i.post({
url:"/cgi-bin/safecenterstatus",
data:{
action:"devbind",
openid:t
}
},function(e){
switch(+e.base_resp.ret){
case o:
n.err("该公众号已经绑定了10个开发者微信号，无法绑定更多微信号");
break;

case r:
n.err("该微信号已经绑定了50个公众号，无法绑定成为开发者");
break;

case c:
n.err("该微信号已经成功绑定了该公众号，请勿重复绑定");
break;

case d:
n.err("该公众号当天进行了20次邀请绑定操作，无法进行操作");
break;

case p:
case l:
n.err("系统错误，请稍候再试");
break;

case b:
n.suc("发送邀请成功"),setTimeout(function(){
location.reload();
},300);
}
w.btn(!0).removeClass("btn_disabled").addClass("btn_primary");
})):(n.err("没有搜索结果时不能开始邀请绑定"),s.focus()));
}
},{
text:"取消",
type:"default",
click:function(){
this.remove();
}
}]
});
s=_.find(".js_keyword"),m=_.find(".js_search_loading"),x=_.find(".js_search"),u=_.find(".js_no_user"),
f=_.find(".js_search_result"),w=_.find(".js_btn_p").eq(0),x.click(function(){
if(k)return!1;
u.hide();
var e=s.val();
return e?(f.hide(),k=!0,w.removeClass("btn_primary").addClass("btn_disabled"),m.show(),
t=null,_.popup("resetPosition"),void i.post({
url:"/cgi-bin/safecenterstatus",
data:{
action:"checkdev",
username:e
},
complete:function(){
k=!1;
}
},function(e){
switch(m.hide(),e.base_resp&&"undefined"!=typeof e.base_resp.ret||u.text("系统错误，请稍候再试").show(),
+e.base_resp.ret){
case 0:
if(e.openid){
f.show();
var s=e.headimgurl||"";
s=s?s.endsWith("/0")?s:s+"/0":"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0",
f.find("img").attr("src",s),e.nickname&&f.find(".js_nickname").text(h(e.nickname)),
t=e.openid,w.removeClass("btn_disabled").addClass("btn_primary"),_.popup("resetPosition");
}else u.text("系统错误，请稍候再试").show();
break;

case-101:
u.html('<p style="line-height:1.5;padding:10px 0 0">该微信用户无法绑定该公众号</p><p style="color:red;line-height:1.5;text-align:left;padding:10px 274px">1、该微信号不存在，请先注册微信号。<br>2、若已注册，请打开手机微信中的“我->设置->隐私->添加我的方式”中，将手机号、微信号、QQ号搜索开启，否则无法操作。</p>').show();
break;

case-102:
u.text("该微信号未开通手机保护，无法绑定为运营微信号").show();
break;

case-103:
u.html('<p style="color:red">该微信用户未关注当前公众号，请先关注后再绑定</p>').show();
break;

case-104:
u.text("该公众号已经绑定了10个运营者微信号，无法绑定更多微信号").show();
break;

case-105:
u.text("该微信号已经绑定了5个公众号，无法绑定成为开发者").show();
break;

case-106:
u.text("等待该微信号处理邀请中，或该微信号已接受，无需再次邀请").show();
break;

case-107:
u.text("该公众号还未绑主管理员帐号，请绑定后再添加开发者微信号").show();
break;

case-108:
u.text("该公众号已经绑定或邀请满10个运营者微信号，请尽快联系个人微信号进行确认").show();
break;

case-109:
u.text("该公众号当天已经执行了30次邀请").show();
break;

case-111:
u.text("该微信用户未关注“公众号安全助手”，无法接收邀请，请先关注后再绑定").show();
break;

case-112:
u.text("该微信用户未开启“公众号安全助手”的消息接收功能，请先开启后再绑定").show();
break;

case-117:
u.text("该微信号无法进行绑定，请更换其他微信号").show();
break;

default:
u.text("系统错误，请稍候再试").show();
}
})):(u.text("请输入微信号").show(),void s.focus());
}),s.on("keyup",function(e){
wx.isHotkey(e,"enter")&&x.click();
}).on("change",function(){
x.click();
}).focus();
});
};
s.exports={
init:m
};
});