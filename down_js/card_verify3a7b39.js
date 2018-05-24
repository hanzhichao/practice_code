define("mall/card_verify.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(a){
"use strict";
var s=(wx.cgiData,a("common/wx/Cgi.js")),e=a("common/wx/Tips.js");
$("body").on("click","#js_back",function(){
$("#js_card_info").hide(),$("#js_serial_panel").show();
}),$("#js_verify_card").click(function(){
var a=$.trim($("#js_serial").val());
return""==a?void e.err("请输入序列号"):void s.get({
url:wx.url("/merchant/card?action=get_serial"),
data:{
serial:a
}
},function(s){
s&&s.base_resp&&0==s.base_resp.ret?($("#js_card_info").html(template.render("t_card_info",{
serial_info:s.serial_info,
serial_num:a
})).show(),$("#js_serial_panel").hide()):$("#js_verify_msg_box").show();
});
}),$("body").on("click",".js_card_used",function(){
var a=$(this),r=a.data("openid"),i=a.data("serial");
s.post({
url:wx.url("/merchant/card?action=del_serial"),
data:{
open_id:r,
serial:i
}
},function(s){
console.log(s),0==s.ret?(a.addClass("btn_disabled").removeClass("js_card_used").html("已使用"),
e.suc("销券成功")):e.err("销券失败");
});
});
});