define("advanced/verify.js",["common/wx/messenger.method.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/top.js","common/wx/dialog.js"],function(n){
"use strict";
function o(n,o){
return n?!1:/^gh_/.test(o)?!0:!1;
}
function r(){
m.hide(),c.attr("class","btn btn_primary");
}
function e(){
m.show(),c.attr("class","btn btn_disabled");
}
function s(){
var n=a.val().trim();
return/^[a-zA-Z][\da-zA-z_-]{5,19}$/g.test(n)?n:"";
}
n("common/wx/messenger.method.js");
var t=n("common/wx/Tips.js"),i=n("common/wx/Cgi.js"),a=$("#nameInput"),m=$("#nameWarning"),c=$("#nextBt"),u=(n("common/wx/top.js"),
wx.cgiData),p=n("common/wx/dialog.js");
if(!wx.cgiData.can_use_customer)return $("#aliasForm").remove(),void p.show("温馨提示|系统错误");
o(u.alias,u.user_name)?($("#aliasForm").show(),$("#mpIFrame").remove()):$("#mpIFrame").show(),
a.focus(),a.blur(function(){
var n=s();
n?r():e();
}),a.keyup(function(){
var n=s();
n.length>=6?r():e();
}).keydown(function(n){
return 13==n.keyCode?(c.click(),!1):void 0;
}),c.click(function(){
var n=s();
n?i.get({
mask:!1,
url:"/cgi-bin/formbyskey?form=aliasform&alias="+n
},function(n){
return n&&n.base_resp?void(0==n.base_resp.ret?location.reload():200030==n.base_resp.ret||30==n.base_resp.ret?t.err("此别名已经被使用，请重新输入"):t.err()):void t.err();
}):(t.err("微信别名规则不合法"),a.val(""));
});
var l=$("#mpIFrame");
if(l.length){
"/"==u.jsurl.substring(0,1)&&(u.jsurl="https://res.wx.qq.com/mpres/zh_CN/htmledition/js/common/wx/messenger.js");
var d="https://crm1.dkf.qq.com/php/index.php/mpjumpcontrl/mpjump/index?virsion=20140501&pluginid=duokefu&token=%s&appid=%s&jsurl=%s".sprintf(u.pluginToken,u.appid,u.jsurl);
l.on("load",function(){
Iframe.init(this.contentWindow);
}),l.attr("src",d);
}
$(".jsUpBt").click(function(){
$(this).btn(!1),i.post({
url:wx.url("/misc/kf?action=transferacctdata"),
data:{},
mask:!1
},function(){
location.href=wx.url("/misc/kf?action=upgradepage");
});
});
});