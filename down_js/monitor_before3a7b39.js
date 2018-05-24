define("advanced/monitor_before.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(o){
"use strict";
var n=o("common/wx/Cgi.js"),e=o("common/wx/Tips.js");
$("#js_open").click(function(){
$(this).btn(!1),n.post({
url:"/advanced/diagram?action=index",
data:{
open:1
}
},function(o){
o&&o.base_resp&&0===o.base_resp.ret?(e.suc("开通成功"),location.reload()):e.err("系统错误，请稍后重试");
});
});
});