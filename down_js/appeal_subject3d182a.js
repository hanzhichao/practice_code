define("home/appeal_subject.js",["biz_web/utils/upload.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/qrcheck_weapp.js"],function(e){
"use strict";
function o(e){
var o=arguments[1]||window.location.search,a=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=o.substr(o.indexOf("?")+1).match(a);
return null!=n?n[2]:"";
}
var a=e("biz_web/utils/upload.js"),n=e("common/wx/Cgi.js"),r=e("common/wx/Tips.js"),s=e("common/wx/qrcheck_weapp.js"),t="",i="",c=0;
a.uploadTmpFile({
container:".js_upload",
type:2,
multi:!1,
onAllComplete:function(){
c=1,$(".js_upload").text("重新上传");
},
onComplete:function(e,o,n,s){
switch(c&&($(".upload_preview").hide().children().remove(),c=0),+s.base_resp.ret){
case 0:
r.suc("上传成功"),$(".upload_preview").show().append('<a href="{href}" target="_blank"><img src="{src}"></a>'.format({
href:a.tmpFileUrl(s.content),
src:a.tmpFileUrl(s.content)
})),i=s.content;
break;

case 1:
r.err("图片太大");
break;

case-11:
r.err("请上传合法的图片格式");
break;

default:
r.err("上传图片失败");
}
}
});
var l=s.init({
container:".js_qrcheck_div",
data:{
typeid:31,
__biz:wx.cgiData.biz
},
msgData:{
name:"接收通知的"
},
size:165,
cgiURI:"/cgi-bin/basesafeqrcode",
showImgInfo:!0,
onSuccess:function(e){
console.log("onSuccess"),t=e;
},
onFail:function(e,o,a){
console.log("onFail",e,o,a);
},
onMsgUpdate:function(){
console.log("onMsgUpdate");
}
});
l.load(),$(".js_close").click(function(){
window.close();
}),$(".js_submit").click(function(){
return $(".js_reason").val()?i?t?void n.post({
url:wx.url(window.location.pathname+"?action=submit"),
data:{
appeal_ticket:wx.cgiData.appeal_ticket,
operator_idcard_stuff:i,
appeal_reason:$(".js_reason").val(),
scan_ticket:t,
appid:o("appid")
}
},function(e){
e&&e.base_resp?0==e.base_resp.ret?window.location.reload():16010==e.base_resp.ret?r.err("已提交成功，请勿重复提交"):200019==e.base_resp.ret?r.err("页面链接已经失效"):200044==e.base_resp.ret&&r.err("扫码凭证已失效，需要重新扫码"):r.err("系统错误，请稍候重试");
}):void r.err("请用通知账户微信号扫码"):void r.err("请上传身份证照片"):void r.err("请输入申诉原因");
});
});