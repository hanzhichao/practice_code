define("advanced/warning.js",["common/wx/popup.js","common/wx/Cgi.js","common/wx/top.js","common/wx/Tips.js","common/wx/verifycode.js","setting/wxverifycode.js"],function(e){
"use strict";
function s(){
var e=$.trim($("#Js_wxId").val());
return/^[0-9a-zA-Z_-]+$/.test(e)?e:(n.err("请输入正确的微信号"),$("#Js_wxname").focus(),!1);
}
function t(){
var e=$("#Js_wxCode"),s=$.trim(e.val());
return/^\d{6}$/.test(s)?s:(n.err("请输入正确的验证码"),e.focus(),!1);
}
e("common/wx/popup.js");
{
var a=e("common/wx/Cgi.js"),i=e("common/wx/top.js"),n=e("common/wx/Tips.js"),r=e("common/wx/verifycode.js"),d=e("setting/wxverifycode.js");
wx.cgiData.action;
}
new i("#topTab",i.DATA.advanced).selected(1);
var r=d({
url:"/misc/assistant?action=send",
button:"#Js_wxCodeBtn",
input:"#Js_wxId",
success:function(){
$("#Js_wxCode").removeAttr("disabled").parent().removeClass("disabled"),$("#Js_sent").show();
},
error:function(){
$("#Js_wxIdTips").text("个人微信号不存在").parent().show();
},
complete:function(){
$("#Js_sent").hide();
}
}),o={
id:"",
dialog:null,
add:function(){
$(".Js_tips").hide();
var e,i,d="/misc/assistant?action=add";
(e=s())!==!1&&(i=t())!==!1&&a.post({
url:d,
data:{
wxid:e,
code:i
},
mask:!1,
beforeSend:function(){
var e=o.dialog.popup("get").find(".js_btn").eq(0);
e.attr("disable",!0).removeClass("btn_primary").addClass("btn_disabled");
},
complete:function(){
var e=o.dialog.popup("get").find(".js_btn").eq(0);
e.attr("disable",!1).removeClass("btn_disabled").addClass("btn_primary");
}
},function(s){
if(!s||!s.base_resp)return void n.err("系统错误，请重试");
switch(+s.base_resp.ret){
case 0:
n.suc("添加成功"),o.id=e,o.insert();
break;

case 1:
n.err("验证号错误");
break;

case 2:
$("#Js_wxIdTips").text("个人微信号不存在").parent().show();
break;

case 200003:
n.err("已满%s个，不能再添加".sprintf(10)),o.dialog.popup("hide");
break;

case 200004:
$("#Js_wxIdTips").text("已存在于名单").parent().show(),r.clear();
break;

default:
$("#Js_wxIdTips").text("添加失败，请重试").parent().show();
}
});
},
insert:function(){
var e=$(".Js_item"),s=e.length+1,t=o.id,a=$("#tpl_item").html().replace("{num}",s).replace(/{id}/g,t),i=10;
""===t||s>i||(s==i&&($("#Js_add").removeClass("btn_primary").addClass("btn_disabled").attr("disable",!0),
$("#Js_addTips").show()),$("#Js_emptyItem").remove(),$("#Js_list").append(a),o.dialog.popup("hide"));
},
del:function(e){
function s(){
var s=e.parents("tbody");
t.remove();
var a=s.find("tr");
0==a.length?s.html($("#tpl_empty_item").html()):a.each(function(){
var e=$(this);
e.find(".Js_num").text(e.index()+1);
}),$("#Js_add").removeClass("btn_disabled").addClass("btn_primary").attr("disable",!1),
$("#Js_addTips").hide();
}
var t=e.parents("tr"),i="/misc/assistant?action=del";
a.post({
url:i,
data:{
wxid:t.data("id")
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void n.err("系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
n.suc("删除成功"),s();
break;

default:
n.err("删除失败，请重试");
}
});
}
};
$("#Js_add").on("click",function(){
if("true"!=$(this).attr("disable")){
var e="#tpl_warnlist_add";
o.dialog=$(e).popup({
title:"添加微信号",
className:"simple warning",
buttons:[{
text:"确定",
type:"primary",
click:function(){
var e=this.get().find(".js_btn").eq(0);
"true"!=e.attr("disable")&&o.add();
}
}],
onHide:function(){
this.remove();
}
}),o.dialog.popup("resetPosition"),o.dialog.popup("show");
}
}),$("#Js_list").on("click",".Js_del",function(){
confirm("确定删除吗？")&&o.del($(this));
});
});