define("setting/dev.js",["common/wx/popup.js","common/wx/Cgi.js","common/wx/top.js","common/wx/Tips.js","common/wx/verifycode.js","setting/wxverifycode.js"],function(e){
"use strict";
function t(){
var e=$.trim($("#Js_wxId").val());
return/^[0-9a-zA-Z_-]+$/.test(e)?e:(n.err("请输入正确的微信号"),$("#Js_wxname").focus(),!1);
}
function s(){
var e="warnlist"==r?$("#Js_wxCode"):c.imgcode,t="warnlist"==r?$.trim(e.val()):e.getCode(),s=new RegExp("^\\"+("warnlist"==r?"d{6":"w{4")+"}$");
return s.test(t)?t:(n.err("请输入正确的验证码"),e.focus(),!1);
}
e("common/wx/popup.js");
var i=e("common/wx/Cgi.js"),a=e("common/wx/top.js"),n=e("common/wx/Tips.js"),d=e("common/wx/verifycode.js"),o=e("setting/wxverifycode.js"),r=wx.cgiData.action;
"warnlist"==r?new a("#topTab",a.DATA.assistant).selected(1):(r="whitelist",new a("#topTab",a.DATA.business).selected(5)),
"warnlist"==r&&o({
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
});
var c={
id:"",
dialog:null,
imgcode:null,
add:function(){
$(".Js_tips").hide();
var e,a,d="/advanced/development?action=add_"+r;
(e=t())!==!1&&(a=s())!==!1&&i.post({
url:d,
data:{
wxid:e,
code:a
},
mask:!1,
beforeSend:function(){
var e=c.dialog.popup("get").find(".js_btn").eq(0);
e.attr("disable",!0).addClass("btn_disabled");
},
complete:function(){
var e=c.dialog.popup("get").find(".js_btn").eq(0);
e.attr("disable",!1).removeClass("btn_disabled");
}
},function(t){
if(!t||!t.base_resp)return void n.err("系统错误，请重试");
switch(+t.base_resp.ret){
case 0:
n.suc("添加成功"),c.id=e,c.insert();
break;

case 1:
n.err("验证号错误"),c.imgcode&&c.imgcode.refresh();
break;

case 2:
$("#Js_wxIdTips").text("个人微信号不存在").parent().show(),c.imgcode&&c.imgcode.refresh();
break;

case 3:
case 200003:
n.err("已满%s个，不能再添加".sprintf("warnlist"==r?10:20)),c.dialog.popup("hide");
break;

case 4:
case 200004:
$("#Js_wxIdTips").text("已存在于名单").parent().show(),c.imgcode&&c.imgcode.refresh();
break;

default:
$("#Js_wxIdTips").text("添加失败，请重试").parent().show();
}
});
},
insert:function(){
var e=$(".Js_item"),t=e.length+1,s=c.id,i=$("#tpl_item").html().replace("{num}",t).replace(/{id}/g,s),a="warnlist"==r?10:20;
""===s||t>a||(t==a&&($("#Js_add").addClass("btn_disabled").attr("disable",!0),$("#Js_addTips").show()),
$("#Js_emptyItem").remove(),$("#Js_list").append(i),c.dialog.popup("hide"));
},
del:function(e){
function t(){
var t=e.parents("tbody");
s.remove();
var i=t.find("tr");
0==i.length?t.html($("#tpl_empty_item").html()):i.each(function(){
var e=$(this);
e.find(".Js_num").text(e.index()+1);
}),$("#Js_add").removeClass("btn_disabled").attr("disable",!1),$("#Js_addTips").hide();
}
var s=e.parents("tr"),a="/advanced/development?action=del_"+r;
i.post({
url:a,
data:{
wxid:s.data("id")
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void n.err("系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
n.suc("删除成功"),t();
break;

default:
n.err("删除失败，请重试");
}
});
}
};
$("#Js_add").on("click",function(){
if("true"!=$(this).attr("disable")){
var e="warnlist"==r?"#tpl_warnlist_add":"#tpl_whitelist_add";
c.dialog=$(e).popup({
title:"添加微信号",
className:"simple",
buttons:[{
text:"确定",
type:"primary",
click:function(){
var e=this.get().find(".js_btn").eq(0);
"true"!=e.attr("disable")&&c.add();
}
}],
onHide:function(){
this.remove();
}
}),"warnlist"!=r&&(c.imgcode=new d("#Js_verifycode"),c.imgcode.$dom.show(),$("#Js_wxId").focus()),
c.dialog.popup("resetPosition"),c.dialog.popup("show");
}
}),$("#Js_list").on("click",".Js_del",function(){
confirm("确定删除吗？")&&c.del($(this));
});
});