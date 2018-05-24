define("wxopen/authorize_register.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/qrcheck_weapp.js"],function(e){
"use strict";
var i=(e("common/wx/Cgi.js"),e("common/wx/Tips.js")),o=e("common/wx/qrcheck_weapp.js");
if(0==wx.cgiData.retcode){
wx.cgiData.redirect_uri=window.location.search.match(/(^|&)redirect_uri=([^&]*)(&|$)/)[2];
var c={
appid:wx.cgiData.appid,
component_appid:wx.cgiData.component_appid,
redirect_uri:wx.cgiData.redirect_uri,
copy_wx_verify:wx.cgiData.copy_wx_verify,
corpid:wx.cgiData.corpid
},a=o.init({
container:".js_qrcheck_div",
container_class:"",
scene:0,
data:{
typeid:11,
appid:wx.cgiData.appid,
extra:JSON.stringify(c)
},
size:165,
cgiURI:"/cgi-bin/basesafeqrcode",
showImgInfo:!0,
onSuccess:function(e,o){
if(console.log("onSuccess"),console.log(o),0==o.base_resp.ret){
var c=window.decodeURIComponent(wx.cgiData.redirect_uri);
c=-1==c.indexOf("?")?c+"?ticket="+e:c+"&ticket="+e,window.location.href=c;
}else i.err(1e3==o.base_resp?"缺少参数":1001==o.base_resp?"第三方不合法":1002==o.base_resp?"跳转URI不合法":"系统错误，请稍后重试");
},
onFail:function(e,i,o){
console.log("onFail",e,i,o);
},
onMsgUpdate:function(){
console.log("onMsgUpdate");
}
});
a.load();
}
});