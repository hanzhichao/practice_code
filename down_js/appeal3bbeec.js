define("register/appeal.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(i){
"use strict";
var t=i("common/wx/Cgi.js"),e=i("common/wx/Tips.js");
$(".js_input").keyup(function(){
var i=$(this);
i.next(".js_inputLen").text(i.val().length+"/200");
}),$("#bt").click(function(){
{
var i=$("#js_input");
$(this);
}
return 0==i.val().length?void e.err("原因不能为空"):i.val().length>200?void e.err("原因长度超限"):void t.post({
url:"/acct/principallimitappeal",
data:{
action:"submit",
appeal_reason:i.val().trim()
}
},function(i){
i&&i.base_resp&&0==i.base_resp.ret?$("#okDiv").show().siblings().hide():e.err("系统错误，请稍后重试");
});
});
});