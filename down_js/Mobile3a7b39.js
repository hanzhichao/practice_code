define("safe/Mobile.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/overseasList.js"],function(e){
"use strict";
function t(e){
e=$.extend(!0,{},a,e);
var t="click",i=this;
i.container="object"==typeof e.container?e.container:$(e.container),e.mobile_num?(i.container.find(e.old_num).text(e.mobile_num),
i.container.find(e.old_btn).on(t,function(){
if(!$(this).attr("disabled")){
var t=e.old_sendurl,a={};
e.auth&&(a.auth=e.auth),o.post({
url:t,
mask:!1,
data:a,
error:function(){
n.err("发送失败");
}
},function(t){
var o=t.err_code;
if(0==o){
n.suc("发送成功"),e.send_msg&&e.send_msg_txt&&i.container.find(e.send_msg).text(e.send_msg_txt).show();
var a=null,d=function(){
var t=i.container.find(e.old_btn),n=+t.data("left");
if(1>=n)a&&window.clearInterval(a),t.html("重发").removeAttr("disabled").removeClass("btn_disabled").addClass("btn_default"),
e.send_msg&&e.send_msg_txt&&i.container.find(e.send_msg).text("");else{
var o=--n;
t.data("left",o).html(o+"秒后可重发");
}
};
i.container.find(e.old_btn).data("left",e.timeout).html(e.timeout+"秒后可重发").attr("disabled","true").removeClass("btn_default").addClass("btn_disabled"),
a=window.setInterval(d,1e3);
}else n.err("-2341"==o?"操作频率过快，请稍后再试。":"发送失败");
});
}
}),i.container.find(e.old_submit).on(t,function(){
var t=i.container.find(e.old_code).val().trim()||"";
return""!=t&&/^\d{6}$/.test(t)?e.before_check&&"function"==typeof e.before_check&&!e.before_check.apply(this)?!1:void o.post({
url:e.old_checkurl,
data:e.old_checkparam(t),
mask:!1,
error:e.old_callback
},e.old_callback):(n.err("请输入正确的手机验证码"),!1);
}),e.auto_send&&setTimeout(function(){
i.container.find(e.old_btn).click();
},300)):(i.container.find(e.old_btn).on(t,function(){
if(!$(this).attr("disabled")){
var t=i.container.find(e.old_num).val().trim()||"";
if(""!=t&&/^\d+$/.test(t)){
var a={
mobile_num:t
};
e.is_overseas&&(a.mobile_num=d[i.container.find(e.mobile_country).val()]+a.mobile_num),
e.auth&&(a.auth=e.auth),o.post({
url:e.get_code_new,
data:a,
mask:!1,
error:function(){
n.err("发送失败");
}
},function(t){
var o=t.err_code;
if(0==o){
n.suc("发送成功");
var a=null,d=i.container.find(e.old_num),r=i.container.find(e.old_btn),l=function(){
var t=i.container.find(e.old_btn),n=+t.data("left");
if(1>=n)a&&window.clearInterval(a),t.html("重发").removeAttr("disabled").removeClass("btn_disabled").addClass("btn_default"),
i.container.find(e.old_num).removeAttr("disabled");else{
var o=--n;
t.data("left",o).html(o+"秒后可重发");
}
};
r.data("left",e.timeout).html(e.timeout+"秒后可重发").attr("disabled","true").removeClass("btn_default").addClass("btn_disabled"),
d.attr("disabled","true"),a=window.setInterval(l,1e3);
}else n.err("-2341"==o?"操作频率过快，请稍后再试。":"发送失败");
});
}else n.err("请输入正确的手机号");
}
}),i.container.find(e.old_submit).on(t,function(){
var t=i.container.find(e.old_code).val().trim()||"",a=i.container.find(e.old_num).val().trim()||"";
return e.is_overseas&&(a=d[i.container.find(e.mobile_country).val()]+a),""!=t&&/^\d{6}$/.test(t)?void o.post({
url:e.check_code_new,
data:e.old_checkparam(a,t),
mask:!1,
error:function(){
n.err("验证失败");
}
},e.old_callback):(n.err("请输入正确的手机验证码"),!0);
}));
}
var n=e("common/wx/Tips.js"),o=e("common/wx/Cgi.js"),i=e("common/wx/overseasList.js"),a={
container:"",
timeout:"60",
mobile_num:"",
old_num:".js_old",
old_code:".js_num",
old_btn:".js_oldsend",
old_submit:".js_oldsubmit",
send_msg:"",
send_msg_txt:"",
old_callback:$.noop,
old_sendurl:"/cgi-bin/mmbizverifysms?action=get_code_default",
old_checkurl:"/cgi-bin/mmbizverifysms?action=check_code_default",
get_code_new:"/cgi-bin/mmbizverifysms?action=get_code_new",
check_code_new:"/cgi-bin/mmbizverifysms?action=check_code_new",
old_checkparam:$.noop,
before_check:null,
auto_send:!1,
auth:"",
is_overseas:!1,
mobile_country:""
},d=i.mobilePrefix;
return t.prototype={
destroy:function(){}
},t;
});