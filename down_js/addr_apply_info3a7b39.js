define("wxopen/addr_apply_info.js",["common/wx/dialog.js","common/wx/Cgi.js","common/wx/Tips.js"],function(o){
"use strict";
var n=o("common/wx/dialog.js"),s=o("common/wx/Cgi.js"),i=o("common/wx/Tips.js");
$("#js_open_entityshop").click(function(){
return"0"==realname_type?n.show({
msg:"帐号未符合开通条件，无法开通此功能"
}):s.get({
url:"/cgi-bin/entityshopv2?action=apply",
success:function(o){
0==o.base_resp.ret?(i.suc("开通成功"),location.href=wx.url("/cgi-bin/entityshopv2?action=list")):s.show(o);
}
}),!1;
});
});