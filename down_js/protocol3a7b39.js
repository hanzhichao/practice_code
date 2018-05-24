define("wifi/protocol.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(i){
"use strict";
function o(){
e.text("同意%s".sprintf(n?"（%s秒）".sprintf(n):"")),n--,n>=0?setTimeout(o,1e3):e.removeClass("btn_disabled").addClass("btn_default").click(function(){
s.post({
url:"/wifi/wifiapply?action=protocol",
data:{
agree:1
}
},function(i){
return i&&0==i.base_resp.ret?($(".js_protocol").hide(),void $(".js_success").show()):void t.err("开通失败，请稍后重试");
});
});
}
var s=i("common/wx/Cgi.js"),t=i("common/wx/Tips.js"),n=10,e=$(".js_submit");
o(),$(".js_close").click(function(){
location.href=wx.url("/cgi-bin/plugindetails?t=service/profile&pluginid=10034&action=intro");
});
});