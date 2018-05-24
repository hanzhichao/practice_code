define("setting/owner-setting.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/Idcheck.js","common/wx/qrcheck_weapp.js","common/wx/popup.js","common/wx/pagebar.js","common/wx/top.js"],function(o){
"use strict";
var t=o("common/wx/Tips.js"),e=o("common/wx/Cgi.js"),n=o("common/wx/Idcheck.js"),c=o("common/wx/qrcheck_weapp.js"),i=(o("common/wx/popup.js"),
o("common/wx/pagebar.js")),s=o("common/wx/top.js");
new s("#topTab",s.DATA.setting).selected(0),function(){
function o(o,n){
e.get({
url:"/acct/contractorinfo?action=query_subject",
data:{
ticket:p,
page:o
},
error:function(){
t.err("系统繁忙，请稍后再试");
}
},function(o){
0===o.base_resp.ret?(console.log(o),n&&n(o)):e.show(o);
});
}
function s(t){
$("#js_bindsubject_dialog").html(template.render("js_bindsubject_tpl",t)),t.total_count>t.per_page&&t.list.length?new i({
container:$("#js_bindsubject_dialog .js_pager"),
initShowPage:u,
isSimple:!0,
perPage:t.per_page,
totalItemsNum:t.total_count,
callback:function(t){
console.log("pages",t),u=t.currentPage,o(t.currentPage,function(o){
s(o);
});
}
}):$("#js_bindsubject_dialog .js_pager").hide(),r.popup("resetPosition");
}
var a=new n({
mobile:{
number:wx.cgiData.operator_mobile
},
callback:function(){
location.href=wx.url("/acct/contractorinfo?t=setting/owner-setting-owner&action=setcontractor");
}
});
$(".js_edit").on("click",function(){
var o=$(this).attr("type");
"owner"==o&&a.show();
}),$("#js_subject_update_info").hover(function(){
$("#js_subject_update_info_popover").show();
},function(){
$("#js_subject_update_info_popover").hide();
});
var r,p="",u=1;
$("#js_bindsubject").click(function(){
var t=c.initPopup({
typeid:32,
popupTitle:"安全保护",
cgiURI:"/cgi-bin/safeqrcode",
onSuccess:function(e){
console.log("onSuccess",p),p=e,t.destroy(),r=$("#js_bindsubject_dialog_tpl").popup({
title:"主体绑定公众平台帐号查询",
className:"weui-desktop-dialog_card-profile",
buttons:[{
type:"primary",
text:"关闭",
click:function(){
this.remove();
},
autoShow:!0
}],
onHide:function(){
this.remove();
}
}),u=1,o(u,function(o){
s(o);
});
},
onFail:function(o,t,e){
console.log("onFail",o,t,e);
},
onMsgUpdate:function(){
console.log("onMsgUpdate");
}
});
return t.load(),!1;
});
}();
});