define("advanced/customer_apply.js",["common/wx/Cgi.js","common/wx/stopMultiRequest.js","common/wx/Tips.js"],function(s){
"use strict";
var o=s("common/wx/Cgi.js");
s("common/wx/stopMultiRequest.js");
var c=s("common/wx/Tips.js");
$(".js_apply_customer").click(function(){
var s=this;
o.post({
url:"/misc/skeyform?form=advancedswitchform",
btn:s,
data:{
flag:1,
type:6
},
success:function(s){
0==s.base_resp.ret?(c.suc("操作成功"),location.reload()):c.err("系统发生错误，请稍后重试");
}
});
});
});