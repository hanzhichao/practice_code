define("setting/temp/bind-account.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(e){
"use strict";
var t=e("common/wx/Tips.js"),n=e("common/wx/Cgi.js");
$("#saveSetting").click(function(){
var e=$.trim($("#binduser").val());
return e.match(/[^0-9a-zA-Z_-]/)?(t.err("帐号格式错误"),void $("#binduser").focus()):void n.get({
url:"/misc/binduser?cgi=binduser&t=ajax-response&binduser="+decodeURIComponent(e),
debug:!0,
beforeSend:function(){
$("#saveSetting").attr("disable",!0).addClass("btnDisable");
},
complete:function(){
$("#saveSetting").attr("disable",!1).removeClass("btnDisable");
}
},function(e){
e&&"0"==e.ret?t.suc("保存设置成功"):t.err(e&&"2"==e.ret?"小号已经绑定过其它号码":e&&"4"==e.ret?"绑定帐号不存在":e&&"64901"==e.ret?"该帐号已被其他公众号绑定，请先解除绑定":"保存设置失败");
});
}),$("body").addClass("settingPage");
});