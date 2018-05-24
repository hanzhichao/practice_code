define("cardticket/card_fee_invoice_info_detail.js",["cardticket/parse_invoice_data.js","common/wx/Cgi.js","common/wx/popover.js","cardticket/common_template_helper.js","cardticket/common_validate.js","biz_common/moment.js"],function(e){
"use strict";
function n(){
var e=0;
jQuery(".js_ask_icon").each(function(){
var n=jQuery(this);
e++;
var t="js_ask_"+e;
n.attr("id",t);
var i=new _({
dom:"#"+t,
isToggle:!0,
content:n.attr("data-content")||"无"
});
i.hide();
});
}
function t(){
function e(){
var e=r();
j.form=e.form,j.html(e);
}
var n=!1;
j.on("click","a.js_change_info",null,function(e){
e.preventDefault(),n=!0,j.find(".js_send_info").hide(),j.find(".js_send_info_form").show();
}),j.on("click","a.js_change_cancel",null,function(t){
t.preventDefault(),x||(n=!1,e());
}),j.on("click","a.js_change_sure",null,function(t){
t.preventDefault();
var r=j.find("form").serialize(),c=i(r);
j.form.valid()&&a(c,function(){
n=!1,jQuery.extend(v,c),e();
},function(){});
}),e();
}
function i(e){
var n=e.split("&"),t={};
return n.each(function(e){
var e=e.split("=");
t[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);
}),t;
}
function r(){
var e=jQuery.extend({},v),n=jQuery(template.render("js_send_info_tpl",e)),t=n.find("form");
return n.form=t,t.validate({
rules:{
recipient_name:"required",
recipient_address:"required",
recipient_post_code:{
required:!0,
posnum:!0
},
recipient_tel:{
required:!0,
service_phone:!0
}
},
messages:{
recipient_name:"姓名不能为空",
recipient_address:"地址不能为空",
recipient_tel:"请输入11位手机号或带区号座机号",
recipient_post_code:"请输入正确的邮编"
}
}),n;
}
function a(e,n,t){
x||(x=!0,e=jQuery.extend({},e),e.recipient_phone=e.recipient_tel,delete e.recipient_tel,
c(),s.post({
url:wx.url("/merchant/cardmoneyinvoicemgr?action=update_recipient_info"),
data:e,
success:function(e){
0!=e.base_resp.ret?(s.show(e),t(e)):n(e);
},
complete:function(){
x=!1,c();
}
}));
}
function c(){
x?j.find(".js_change_sure").text("保存中...").addClass("btn_disabled"):j.find(".js_change_sure").text("确认").removeClass("btn_disabled");
}
var o=e("cardticket/parse_invoice_data.js"),s=e("common/wx/Cgi.js"),d=o(wx.cgiData.data),_=e("common/wx/popover.js");
e("cardticket/common_template_helper.js"),e("cardticket/common_validate.js"),$("#js_main_content").html(template.render("js_invoice_detail_tpl",d)),
n();
var m=e("biz_common/moment.js"),f=$(".js_fee_account"),u="YYYY-MM-DD",l=m(m().add("d",-7).format(u),u).unix(),p=m(m().format(u),u).add("d",1).unix()-1;
f.attr("href",wx.url(f.attr("href")+"&begin_time=%s&end_time=%s".sprintf(l,p)));
var j=jQuery("#js_send_info"),v={};
for(var h in wx.cgiData.data.recipient_info)v["recipient_"+h]=wx.cgiData.data.recipient_info[h];
var x=!1;
t();
});