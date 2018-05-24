define("home/realname_verify.js",["register/mod/mod_onecentbank.js","biz_common/jquery.validate.js","common/wx/Cgi.js","common/wx/Tips.js","register/model.js"],function(e){
"use strict";
var r=e("register/mod/mod_onecentbank.js"),t=(e("biz_common/jquery.validate.js"),
e("common/wx/Cgi.js")),i=e("common/wx/Tips.js"),s=e("register/model.js");
s.init({
data:wx.cgiData
}),$("#js_mod_onecentbank").html(template.render("js_mod_onecentbank_tpl",s.getData())),
$("#js_form").validate({
rules:{},
messages:{},
ignore:"#js_ignore_name",
errorPlacement:function(e,r){
var t=r.parent().parent(),i=t.find(".frm_tips");
t.find(".fail").remove(),e.addClass("mini_tips"),i.length?e.insertBefore(i):e.appendTo(t);
},
submitHandler:function(e){
callback&&callback(e);
},
invalidHandler:function(e,r){
var t=$(r.errorList[0].element);
t.focus();
}
}),r.init({
model:s,
form:$("#js_form")
}),r.showSelectType(),r.selectType(2),3==wx.cgiData.realname_type&&$(".js_div_register_type_select_2").hide();
var n=!1;
$("#js_submit").click(function(){
if(n||$(this).hasClass("btn_disabled"))return!1;
if(console.log($("#js_form").serializeObject()),!$("#js_form").valid())return!1;
n=!0;
var e=$("#js_form").serializeObject();
if(console.log(e),1==e.register_type_select)return location.href=wx.url("/acct/wxverifyorder?action=index"),
!1;
var r=$(this).btn(!1);
return t.post({
url:"/acct/orgrealname?action="+(1==e.register_type_select?"submit_wxverify":"submit_remit"),
data:e,
complete:function(){
n=!1,r.btn(!0);
},
success:function(r){
0==r.base_resp.ret?1==e.register_type_select?location.href=wx.url("/acct/wxverifyorder?action=index"):(i.suc("提交主体资质成功"),
location.href=wx.url("/acct/orgrealname?action=get_remit_verify_page")):13001==r.base_resp.ret?i.err("开户名称错误"):13002==r.base_resp.ret?i.err("对公账户错误"):13003==r.base_resp.ret?i.err("省份信息错误"):13004==r.base_resp.ret?i.err("城市信息错误"):t.show(r);
}
}),!1;
});
var a=$("#js_form").find('input[name="register_type_select"]');
a.checkbox({
onChanged:function(e){
$("#js_submit").text(1==$(e).val()?"下一步":"确认提交");
}
}),3==wx.cgiData.realname_type&&$(".js_div_register_type_select_1 input[name=register_type_select]").click();
});