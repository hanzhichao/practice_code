define("wxverify/step1.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","tpl/wxverify/step1.html.js","common/wx/subjectAppealDialog.js","common/wx/dialog.js","common/qq/queryString.js"],function(e,t,a){
"use strict";
var i=e("common/wx/Cgi.js"),o=(e("biz_web/ui/checkbox.js"),e("tpl/wxverify/step1.html.js")),n=e("common/wx/subjectAppealDialog.js"),s=wx.T,c=e("common/wx/dialog.js"),r=wx.cgiData.limit_1000,l=e("common/qq/queryString.js");
a.exports=function(){
return r?(c.show({
msg:"|由于申请认证帐号数已超过最大限额，请明天上午9点再尝试提交微信认证。",
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove(),location.href=wx.url("/cgi-bin/home?t=home/index");
}
}],
close:function(){
location.href=wx.url("/cgi-bin/home?t=home/index");
}
}),!1):($("#wxverify").html(s(o,{
data:wx.cgiData.data||{}
})),$("#js_agree").checkbox({
onChanged:function(e){
e.prop("checked")?$("#js_nextBtn").attr("disabled",!1).removeClass("btn_disabled").addClass("btn_primary"):$("#js_nextBtn").attr("disabled",!0).addClass("btn_disabled").removeClass("btn_primary");
}
}),void $("#js_nextBtn").click(function(){
return"disabled"!=$(this).attr("disabled")&&i.post({
url:"/acct/wxverify",
mask:!1,
data:{
f:"json",
action:"agree_contract",
agree:1
}
},function(e){
return"0"!=e.base_resp.ret?void(200700==e.base_resp.ret?new n({
reason:e.reason,
canAppeal:!e.ban_appeal,
jumpUrl:wx.url("/cgi-bin/contractorappeal?action=index"),
appealTicket:e.appeal_ticket
}):202100==e.base_resp.ret?wx.cgiData.checkAdminPopup.load():i.handleRet(e,{
id:"64430",
key:"11"
})):void(location.href=l.replace(location.href,"step","stuff"));
}),!1;
}));
};
});