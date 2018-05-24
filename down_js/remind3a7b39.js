define("safe/remind.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(s){
"use strict";
var a=RetData||{},t={
mail_notify_status:0,
mail_status:0,
mobile_notify_status:0,
mobile_status:0,
wx_notify_status:0,
wx_status:0
},i=$.extend({},t,a),n=s("common/wx/Cgi.js"),o=s("common/wx/Tips.js"),l="disable",_="selected";
$(".js_mail").addClass(i.mail_notify_status?_:"").addClass(i.mail_status?"":l).find("span").html(i.mail_status?"邮件提醒(已绑定)":"邮件提醒(未绑定)"),
$(".js_sms").addClass(i.mobile_notify_status?_:"").addClass(i.mobile_status?"":l).find("span").html(i.mobile_status?"短信提醒(已绑定)":"短信提醒(未绑定)"),
$(".js_wx").addClass(i.wx_notify_status?_:"").addClass(i.wx_status?"":l).find("span").html(i.wx_status?"微信提醒(已绑定)":"微信提醒(未绑定)"),
!i.mail_notify_status&&!i.mobile_notify_status&&!i.wx_notify_status&&$(".js_none").addClass(_),
$(".frm_checkbox_label").on("click",function(){
var s=$(this);
s.hasClass(l)||(s.toggleClass(_),s.hasClass("js_none")?s.hasClass(_)&&s.parent().siblings(".frm_inner_controls").find(".frm_checkbox_label").removeClass(_):s.hasClass(_)&&$(".js_none").removeClass(_));
}),$(".js_save").on("click",function(){
var s="/cgi-bin/verifyuknotifyinfo?action=update";
n.post({
url:s,
data:{
mail_notify:$(".js_mail").hasClass(_)?"1":"0",
mobile_notify:$(".js_sms").hasClass(_)?"1":"0",
wx_notify:$(".js_wx").hasClass(_)?"1":"0"
},
mask:!1,
error:function(){
o.err("修改失败");
}
},function(s){
var a=s.err_code;
0==a?(o.suc("修改成功"),location.reload()):o.err("修改失败");
});
});
});