define("wbverify/step2_sina.js",["common/wx/dialog.js","common/wx/Tips.js","common/wx/Cgi.js"],function(e,t,o){
"use strict";
var r=e("common/wx/dialog.js"),i=e("common/wx/Tips.js"),s=e("common/wx/Cgi.js"),a=wx.cgiData;
o.exports=function(e){
$("#js_ToSinaMicroblog").click(function(){
var t=/^(http:\/\/)?(t.sina.com.cn|\w+.weibo.com|weibo.com|weibo.com)(\/u)?\/[^\/]+$/g,o=$.trim($("#wbUrl").val());
if(a.wburl=o,"http://"!=o.substr(0,7)&&(o="http://"+o),t.test(o)&&!/^(http:\/\/)?weibo\.com\/\d+[\?#]?$/g.test(o)){
var c="http://service.weibo.com/share/share.php?",n="&title="+a.userName+" "+a.verifyCode+"&pic="+encodeURIComponent("https://open.weixin.qq.com/qr/code/?username="+a.userName);
if(!window.open([c,n].join(""),"wx",["toolbar=0,status=0,resizable=1,width=620,height=450,left=200,top=200"].join("")))return alert("浏览器阻止了弹出窗口，请检查浏览器配置并重试。"),
!1;
if(1==a.manualReview)$("#wburl").html(o),e(3);else{
r.show({
type:"warn",
msg:"提醒|在弹出的窗口中分享微博，分享成功后请点击下一步。",
buttons:[{
text:"确定",
click:function(){
s.post({
url:"/acct/connectwb?t=ajax-weibo-info",
data:{
type:"sina",
wburl:o
},
mask:!1,
error:function(){
i.err("系统错误，请稍后再试。");
}
},function(t){
if("0"==t.ret)i.suc("分享成功"),$("#headImgUrl").attr("src",t.headImgUrl),$("#wbNickName").html(t.wbNickName),
$("#verifyInfo").html(t.verifyInfo),e(3);else switch($(".fail").css("display","none"),
t.ret){
case"-402":
i.err("连接新浪微博失败，请稍后再试");
break;

case"-403":
i.err("分享的内容无法检测到，请重新发送完整的分享内容到微博。");
break;

case"-404":
i.err("你的微博未认证，无法完成微信公众平台的认证。");
break;

case"-406":
i.err("你的微博已经认证过一个公众帐号，无法再认证。");
break;

case"-407":
$(".fail .frm_msg_content").text("你的微博昵称和公众号名称不一致，认证失败。若有疑问，请发送标题为“申请人工审核（名称不一致）”的邮件到weixinmp@qq.com"),
$(".fail").css("display","block");
break;

case"-408":
i.err("该微博存在异常，认证失败");
break;

default:
i.err("系统错误，请稍后再试。");
}
});
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
}
}else i.err("请填写正确的微博地址");
});
};
});