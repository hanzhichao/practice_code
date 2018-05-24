define("services/searchWx.js",["services/tpl/searchWx.html.js","common/wx/Tips.js","common/wx/Cgi.js"],function(e){
"use strict";
function s(e){
var s=this;
s.opt=$.extend(!0,{},c,e);
var i=s.opt.dom;
i.html(template.compile(t)({
loadingimg:s.opt.loadingimg
}));
var o,n,r,h,d,l,p=!1;
n=i.find(".js_keyword"),r=i.find(".js_search_loading"),l=i.find(".js_search"),h=i.find(".js_no_user"),
d=i.find(".js_search_result"),l.click(function(){
if(p)return!1;
h.hide(),d.hide(),s.opt.bad();
var e=n.val();
return e?(p=!0,r.show(),o=null,void a.post({
url:"/misc/kf",
data:{
action:"checkuser",
username:e
},
complete:function(){
p=!1;
}
},function(t){
switch(r.hide(),t.base_resp&&"undefined"!=typeof t.base_resp.ret||h.text("系统错误，请稍候再试").show(),
+t.base_resp.ret){
case 0:
d.show();
var c=t.headimgurl||"";
c=c?c.endsWith("/0")?c:c+"/0":"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0",
d.find("img").attr("src",c),t.nickname&&d.find(".js_nickname").text(t.nickname),
o=t.openid||e,s.opt.done(o);
break;

case 157011:
h.text("你当前操作次数太频繁，请稍后再试。").show();
break;

case 157012:
case 200101:
case-101:
h.html('<p style="line-height:1.5;padding:10px 0 0">该微信用户无法绑定该公众号</p><p style="color:red;line-height:1.5;text-align:left;padding:10px 0">1、该微信号不存在，请先注册微信号。<br>2、若已注册，请打开手机微信中的“我->设置->隐私->添加我的方式”中，将手机号、微信号、QQ号搜索开启，否则无法操作。</p>').show();
break;

case 200102:
case-102:
h.text("该微信号未开通手机保护，无法绑定为客服").show();
break;

case-103:
case 200103:
h.html('<p style="color:red">该微信用户未关注当前公众号，请先关注后再绑定</p>').show();
break;

case 200104:
case-104:
h.text("该公众号已经绑定了4个运营者微信号，无法绑定更多微信号").show();
break;

case 157006:
case 157001:
case 200105:
case-105:
h.text("该微信号已经绑定的公众号超过上限，无法绑定成为客服").show();
break;

case 157002:
case 200106:
case-106:
h.text("该微信号已经成功绑定了该公众号，请勿重复绑定").show();
break;

case 157003:
case 157004:
case 157005:
h.text("已经邀请该微信号绑定公众号，请勿重复邀请").show();
break;

case 200107:
case-107:
h.text("该公众号还未绑主管理员帐号，请绑定后再添加运营者微信号").show();
break;

case 200108:
case-108:
h.text("该公众号已经绑定或邀请满4个运营者微信号，请尽快联系个人微信号进行确认").show();
break;

default:
h.text("系统错误，请稍候再试").show(),a.handleRet(t,{
id:64462,
key:11,
url:"/misc/kf?action=checkuser",
showMsg:!1
});
}
})):(h.text("请输入微信号").show(),void n.focus());
}),n.on("keyup",function(e){
wx.isHotkey(e,"enter")&&l.click();
}).on("change",function(){
l.click();
}).focus();
}
var t=e("services/tpl/searchWx.html.js"),a=(e("common/wx/Tips.js"),e("common/wx/Cgi.js")),c={
dom:null,
loadingimg:"",
done:$.noop,
bad:$.noop
};
return s;
});