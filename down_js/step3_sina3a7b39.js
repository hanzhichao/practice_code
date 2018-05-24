define("wbverify/step3_sina.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(e,r,c){
"use strict";
var t=e("common/wx/Tips.js"),o=e("common/wx/Cgi.js"),s=wx.cgiData;
c.exports=function(e){
$("#js_confirm").click(function(){
var r=/^(http:\/\/)?(t.sina.com.cn|\w+.weibo.com|weibo.com|weibo.com\/u)\/[^\/]+$/g,c=s.wburl||"";
"http://"!=c.substr(0,7)&&(c="http://"+c),r.test(c)?o.post({
url:"/acct/connectwb?t=ajax-weibo-info",
data:{
type:"sina",
wburl:c
},
mask:!1,
error:function(){
t.err("系统错误，请稍后再试。");
}
},function(r){
if("0"==r.ret)e(4);else switch(r.ret){
case"-402":
t.err("连接新浪微博失败，请稍后再试");
break;

case"-403":
t.err("分享的内容无法检测到，请重新发送完整的分享内容到微博。");
break;

case"-404":
t.err("你的微博未认证，无法完成微信公众平台的认证。");
break;

case"-406":
t.err("你的微博已经认证过一个公众帐号，无法再认证。");
break;

case"-407":
t.err("你的微博昵称和公众号名称不一致，认证失败。若有疑问，请发送标题为“申请人工审核（名称不一致）”的邮件到weixinmp@qq.com");
break;

case"-408":
t.err("该微博存在异常，认证失败");
break;

default:
t.err("系统错误，请稍后再试。");
}
}):(e(2),t.err("请填写正确的微博地址"));
});
};
});