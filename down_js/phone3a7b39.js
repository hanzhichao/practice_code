define("safe/phone.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js"],function(t){
"use strict";
var e=RetData||{},o={
verify_mobile_status:0,
mobile_protect:0,
verify_mobile_num:""
},i=t("common/wx/Cgi.js"),n=t("common/wx/Tips.js"),r=(t("common/wx/popup.js"),$.extend({},o,e)),s={
timer:null,
send:function(){
if(!$(this).attr("disabled")){
var t="/cgi-bin/mmbizverifysms?action=get_code_default";
i.post({
url:t,
mask:!1,
error:function(){
n.err("发送失败");
}
},function(t){
var e=t.err_code;
0==e?(n.suc("发送成功"),s.start()):n.err("-2341"==e?"操作频率过快，请稍后再试。":"发送失败");
});
}
},
start:function(){
var t="60",e=function(){
var t=$(".dialog_wrp").find(".btn_vcode"),e=+t.data("left");
if(1>=e)s.t&&window.clearInterval(s.t),t.html("重发").removeAttr("disabled").removeClass("btn_disabled").addClass("btn_default");else{
var o=--e;
t.data("left",o).html(o+"秒后可重发");
}
};
$(".dialog_wrp").find(".btn_vcode").data("left",t).html(t+"秒后可重发").attr("disabled","true").removeClass("btn_default").addClass("btn_disabled"),
s.t=window.setInterval(e,1e3);
},
stop:function(){
window.clearInterval(s.t);
}
};
r.verify_mobile_num?($(".js_hasphone").show(),$("#js_num").html(r.verify_mobile_num),
$(".disableform").find(".js_phone").html(r.verify_mobile_num),$(".enableform").find(".js_phone").html(r.verify_mobile_num),
r.mobile_protect?($("#js_status").html('<i class="icon18_msg success"></i>已开启'),
$("#js_btn").html("停用").show().on("click",function(){
$(".disableform").popup({
title:"停用手机保护",
close:function(){
s.stop(),this.remove();
},
buttons:[{
text:"确定",
click:function(){
var t=$(".dialog_wrp").find(".js_num").val().trim()||"";
if(""==t||!/^\d{6}$/.test(t))return n.err("请输入正确的手机验证码"),!0;
var e="/cgi-bin/mmbizverifysms?action=set_mobile_protect";
i.post({
url:e,
data:{
code_num:t,
value:"0"
},
mask:!1,
error:function(){
n.err("验证失败");
}
},function(t){
var e=t.err_code;
0==e?(n.suc("已停用"),location.reload()):n.err("验证失败");
});
},
type:"primary"
},{
text:"取消",
click:function(){
s.stop(),this.remove();
},
type:"default"
}]
});
$(".dialog_wrp .btn_vcode").on("click",s.send);
})):($("#js_status").html('<i class="icon18_msg info"></i>未开启'),$("#js_btn").html("启用").show().on("click",function(){
$(".enableform").popup({
title:"开启手机保护",
close:function(){
s.stop(),this.remove();
},
buttons:[{
text:"确定",
click:function(){
var t=$(".dialog_wrp").find(".js_num").val().trim()||"";
if(""==t||!/^\d{6}$/.test(t))return n.err("请输入正确的手机验证码"),!0;
var e="/cgi-bin/mmbizverifysms?action=set_mobile_protect";
i.post({
url:e,
data:{
code_num:t,
value:"1"
},
mask:!1,
error:function(){
n.err("验证失败");
}
},function(t){
var e=t.err_code;
0==e?(n.suc("成功开启"),location.reload()):n.err("验证失败");
});
},
type:"primary"
},{
text:"取消",
click:function(){
s.stop(),this.remove();
},
type:"default"
}]
});
$(".dialog_wrp .btn_vcode").on("click",s.send);
}))):$(".js_nophone").show();
});