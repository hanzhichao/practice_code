define("advanced/edit.js",["common/qq/mask.js","common/wx/Tips.js","biz_common/moment.js","common/wx/top.js","common/wx/dialog.js"],function(t){
"use strict";
var e=(t("common/qq/mask.js"),t("common/wx/Tips.js")),i=t("biz_common/moment.js"),s=t("common/wx/top.js"),n=t("common/wx/dialog.js"),a=wx,o=function(){
function t(){
new s("#topTab",s.DATA.advanced).selected(0),c.init(),u.init(),l.init(),f.init(),
$("#pageMain").show();
}
function i(){
c.refresh(),u.refresh(),l.refresh(),f.refresh();
}
function o(t,s,o){
var c={
type:"POST",
url:"/misc/skeyform?form=advancedswitchform&lang=zh_CN",
dataType:"json"
};
s=s?1:0;
var u,l;
switch(t){
case"all":
s?(o=o||1,l=$.extend(!0,{},c,{
data:{
flag:s,
type:o,
token:a.data.t
},
success:function(t){
0==t.base_resp.ret?(e.suc("操作成功"),cgiData.is.isOpen=s,cgiData.is.isOpen||(cgiData.is.autoReply=!1,
cgiData.is.selfMenu=!1,cgiData.is.custom=!1),i()):e.err("系统发生错误，请稍后重试");
}
}),$.ajax(l)):n.show({
type:"warn",
msg:"操作确认|关闭编辑模式，将停用相关功能。",
buttons:[{
text:"确定",
click:function(){
o=o||1,l=$.extend(!0,{},c,{
data:{
flag:s,
type:o,
token:a.data.t
},
success:function(t){
0==t.base_resp.ret?(e.suc("操作成功"),cgiData.is.isOpen=s,cgiData.is.isOpen||(cgiData.is.autoReply=!1,
cgiData.is.selfMenu=!1,cgiData.is.custom=!1),i()):e.err("系统发生错误，请稍后重试");
}
}),$.ajax(l),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
break;

case"autoReply":
o=o||4,u=["关闭自动回复之后，将立即对所有用户生效。确认关闭？","开启自动回复之后，将立即对所有用户生效。确认开启？"],n.show({
type:"warn",
msg:"操作确认|"+u[s?1:0],
buttons:[{
text:"确定",
click:function(){
l=$.extend(!0,{},c,{
data:{
flag:s,
type:o,
token:a.data.t
},
success:function(t){
0==t.base_resp.ret?(e.suc("操作成功"),cgiData.is.autoReply=s,i()):e.err("系统发生错误，请稍后重试");
}
}),$.ajax(l),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
break;

case"selfMenu":
o=o||3;
var u=["关闭自定义菜单之后，将在24小时内对所有用户生效。确认关闭？","开启自定义菜单之后，将在24小时内对所有用户生效。确认开启？"];
n.show({
type:"warn",
msg:"操作确认|"+u[s?1:0],
buttons:[{
text:"确定",
click:function(){
l=$.extend(!0,{},c,{
data:{
flag:s,
type:o,
token:a.data.t
},
success:function(t){
0==t.base_resp.ret?(e.suc("操作成功"),cgiData.is.selfMenu=s,i()):e.err("系统发生错误，请稍后重试");
}
}),$.ajax(l),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
break;

case"custom":
o=o||6,l=$.extend(!0,{},c,{
data:{
flag:s,
type:o,
token:a.data.t
},
success:function(t){
0==t.base_resp.ret?(e.suc("操作成功"),cgiData.is.custom=s,i()):e.err("系统发生错误，请稍后重试");
}
}),$.ajax(l);
break;

default:
return;
}
}
return{
init:t,
cgiRequest:o
};
}(),c=function(){
function t(){
i(),e();
}
function e(){
$("#openBt").click(function(){
return cgiData.is.isDevOpen?void n.show({
type:"warn",
msg:"错误提示|开发模式已启用，无法同时开启编辑模式。请关闭开发模式后，再重试。",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
}):void o.cgiRequest("all",!0);
}),$("#closeBt").click(function(){
o.cgiRequest("all",!1);
});
}
function i(){
cgiData.is.isOpen?($("#headOpen").show(),$("#headClose").hide()):($("#headOpen").hide(),
$("#headClose").show());
}
return{
init:t,
refresh:i
};
}(),u=function(){
function t(){
i(),e();
}
function e(){
$("#autoReplyDiv .setting").click(function(){
window.open(wx.url("/advanced/autoreply?t=ivr/reply&action=beadded"),"_self");
}),$("#autoReplyDiv .start").click(function(){
o.cgiRequest("autoReply",!0);
}),$("#autoReplyDiv .stop").click(function(){
o.cgiRequest("autoReply",!1);
});
}
function i(){
cgiData.can.autoReply?(cgiData.is.isOpen?$("#autoReplyDiv .controlDiv").show():$("#autoReplyDiv .controlDiv").hide(),
cgiData.is.autoReply?($("#autoReplyDiv .start").hide(),$("#autoReplyDiv .stop").show(),
cgiData.modify.autoReplyModify?$("#autoReplyDiv .setting").show():$("#autoReplyDiv .setting").hide()):($("#autoReplyDiv .start").show(),
$("#autoReplyDiv .stop").hide(),$("#autoReplyDiv .setting").hide()),$("#autoReplyDiv").show()):$("#autoReplyDiv").hide();
}
return{
init:t,
refresh:i
};
}(),l=function(){
function t(){
c(),e();
}
function e(){
$("#selfMenuDiv .setting").click(function(){
window.open("/advanced/selfmenu?action=index&t=advanced/menu-setting&version="+cgiData.selfMenu.version+a.data.param,"_self");
}),$("#selfMenuDiv .start").click(function(){
o.cgiRequest("selfMenu",!0);
}),$("#selfMenuDiv .stop").click(function(){
o.cgiRequest("selfMenu",!1);
});
}
function s(){
if(cgiData.selfMenu.hasMenu)if($("#menuStatus").show(),"0"==cgiData.selfMenu.status)$("#menuStatus").html("<p>当前菜单未发布</p>");else if("1"==cgiData.selfMenu.status){
var t=i.unix(cgiData.selfMenu.lastTime);
i().diff(t,"hours")<12?$("#menuStatus").html("<p>最后一次发布："+t.format("YYYY年MM月DD日 hh时:mm分")+"</p>"):$("#menuStatus").hide();
}else"2"==cgiData.selfMenu.status?$("#menuStatus").hide():"3"==cgiData.selfMenu.status&&$("#menuStatus").html("<p>发布中：还剩%s小时</p>".sprintf(cgiData.selfMenu.leftTime));else $("#menuStatus").hide();
}
function n(){
"2"==cgiData.selfMenu.applyStatus&&cgiData.is.isOpen?(cgiData.is.selfMenu?($("#selfMenuDiv .start").hide(),
$("#selfMenuDiv .stop").show(),cgiData.modify.selfMenuModify?$("#selfMenuDiv .setting").show():$("#selfMenuDiv .setting").hide()):($("#selfMenuDiv .start").show(),
$("#selfMenuDiv .stop").hide(),$("#selfMenuDiv .setting").hide()),$("#selfMenuDiv .controlDiv").show()):$("#selfMenuDiv .controlDiv").hide();
}
function c(){
cgiData.can.selfMenu?(n(),cgiData.is.isOpen&&cgiData.is.selfMenu?s():$("#menuStatus").hide(),
$("#selfMenuDiv").show()):$("#selfMenuDiv").hide();
}
return{
init:t,
refresh:c
};
}(),f=function(){
function t(){
i(),e();
}
function e(){
$("#customDiv .setting").click(function(){
window.open("/misc/pluginloginpage?t=advanced/verify&action=custom&op=outerlogin&pluginid=duokefu"+a.data.param,"_self");
}),$("#customDiv .start").click(function(){
o.cgiRequest("custom",!0);
}),$("#customDiv .stop").click(function(){
o.cgiRequest("custom",!1);
});
}
function i(){
cgiData.can.custom?(cgiData.is.isOpen?$("#customDiv .controlDiv").show():$("#customDiv .controlDiv").hide(),
cgiData.is.custom?($("#customDiv .start").hide(),$("#customDiv .stop").show(),$("#customDiv .setting").show()):($("#customDiv .start").show(),
$("#customDiv .stop").hide(),$("#customDiv .setting").hide()),$("#customDiv").show()):$("#customDiv").hide();
}
return{
init:t,
refresh:i
};
}();
o.init();
});