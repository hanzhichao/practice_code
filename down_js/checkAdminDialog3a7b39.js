define("wxverify/checkAdminDialog.js",["common/wx/popup.js","safe/Scan.js","common/wx/Cgi.js","common/wx/Tips.js","tpl/wxverify/checkAdminDialog.html.js","common/wx/qrcheck_weapp.js"],function(c){
"use strict";
c("common/wx/popup.js");
var i=(c("safe/Scan.js"),c("common/wx/Cgi.js")),n=c("common/wx/Tips.js"),o=c("tpl/wxverify/checkAdminDialog.html.js"),e=c("common/wx/qrcheck_weapp.js"),s=function(c){
this.name=c.name,this._scanner=null,this._qrchecker=null;
};
return s.prototype.show=function(){
var c=this;
$(o).popup({
title:"验证管理员",
width:726,
onShow:function(){
c.dialog=this.get();
var o=this;
this._qrchecker=e.init({
container:c.dialog.find(".js_scan_div"),
data:{
typeid:14
},
size:165,
cgiURI:"/cgi-bin/basesafeqrcode",
showImgInfo:!0,
onSuccess:function(c){
i.post({
url:"/acct/wxverify",
data:{
action:"report_admin_scan",
ticket:c
}
},function(c){
n.suc(0==c.base_resp.ret?"验证成功，请继续下一步":"系统错误，请稍候重试"),o.remove();
});
},
onFail:function(){},
onMsgUpdate:function(){}
}),this._qrchecker.load();
},
onHide:function(){
this._qrchecker&&this._qrchecker.destroy();
}
});
},s;
});