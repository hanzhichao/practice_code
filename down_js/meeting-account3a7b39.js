define("setting/temp/meeting-account.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(e){
"use strict";
function i(e){
t.attr("disabled",e),$("#bind_verify_to_remark").attr("disabled",e),e?($("#isntNeed").removeClass("c-gA"),
$("#isNeed").addClass("c-gA"),$("#isNeedDetail *").addClass("c-gA")):($("#isntNeed").addClass("c-gA"),
$("#isNeed").removeClass("c-gA"),$("#isNeedDetail *").removeClass("c-gA"));
}
var r=e("common/wx/Cgi.js"),a=e("common/wx/Tips.js"),t=$("#verify_ques"),s="请输入你的真实姓名，通过验证后才能加入此会议。";
t.focus(function(){
t.val()==s&&t.val("");
}).blur(function(){
""==t.val()&&t.val(s);
}),$('#meetingForm :radio[name="need_verify"]').change(function(){
var e=$('#meetingForm :radio[name="need_verify"]:checked').val();
i("1"!=e);
}),$("#need_verify_0").attr("checked","1"!=cgiData.isNeedVerify),$("#need_verify_1").attr("checked","1"==cgiData.isNeedVerify),
i("1"!=cgiData.isNeedVerify),$("#bind_verify_to_remark").attr("checked","1"==cgiData.verifyRemark),
$("#is_show_members").attr("checked","1"==cgiData.isShowMembers),$("#saveSetting").click(function(){
var e="/cgi-bin/setuserinfo?action=meetingsettings&t=ajax-response",i={
need_verify:$('#meetingForm :radio[name="need_verify"]:checked').val(),
is_show_members:$("#is_show_members").attr("checked")?"1":"0",
verify_question:"",
bind_verifymsg_to_remark:"0"
};
if("1"==i.need_verify){
var s=$.trim(t.val());
if(0==s.length||s.length>32)return a.err("验证问题必须为1到32个字"),!1;
i.verify_question=s,i.bind_verifymsg_to_remark=$("#bind_verify_to_remark").attr("checked")?"1":"0";
}
r.post({
url:e,
data:i,
debug:!0
},function(e){
return e&&e.base_resp?void(0==e.base_resp.ret?a.suc("保存成功"):a.err("保存失败，请刷新页面后重试")):void a.err("保存失败，请刷新页面后重试");
});
}),$("body").addClass("settingPage");
});