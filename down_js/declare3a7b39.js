define("dispute/declare.js",["common/wx/Step.js","common/wx/Cgi.js","common/wx/dialog.js","common/wx/popup.js","homepage/appmsgdialog.js","common/wx/Tips.js"],function(t){
"use strict";
function e(){
$("#js_content").html(template.render("js_step1_tpl")),m.go(1),$(".js_go_next",$("#js_content")).click(function(){
i();
});
}
function i(){
function t(e,i){
c||(c=!0,s.post({
url:"/acct/dispute?action=add_declaration",
data:{
id:l.id,
url:n,
force_submit:i?1:0,
scene:wx.cgiData.scene
},
complete:function(){
c=!1;
},
success:function(i){
0==i.base_resp.ret?(p.suc("声明已提交"),o()):31e4==i.base_resp.ret?r.show({
msg:"你的声明次数已达上限，请明天重新尝试。",
type:"info",
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove();
}
}]
}):310001==i.base_resp.ret?r.show({
msg:"部分文章因达到当日声明次数上限无法提交，可继续针对剩余文章提交声明。",
type:"info",
buttons:[{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
},{
text:"继续发表声明",
type:"primary",
click:function(){
var e=this;
t(function(){
e.remove();
},!0);
}
}]
}):310003==i.base_resp.ret?r.show({
msg:"部分文章争议流程已被终止，暂无法提交，你可以继续对剩余文章发表声明。",
type:"info",
buttons:[{
type:"normal",
text:"取消",
click:function(){
this.remove();
}
},{
text:"继续发表声明",
type:"primary",
click:function(){
var e=this;
t(function(){
e.remove();
},!0);
}
}]
}):310005==i.base_resp.ret?r.show({
msg:"部分文章争议流程已达上限无法提交，你可以继续对剩余文章发表声明。",
type:"info",
buttons:[{
type:"normal",
text:"取消",
click:function(){
this.remove();
}
},{
text:"继续发表声明",
type:"primary",
click:function(){
var e=this;
t(function(){
e.remove();
},!0);
}
}]
}):310006==i.base_resp.ret?$("#js_force_submit_tpl").popup({
title:"温馨提示",
autoShow:!0,
buttons:[{
type:"default",
text:"取消",
click:function(){
this.remove();
}
},{
text:"继续发表声明",
type:"primary",
click:function(){
var e=this;
t(function(){
e.remove();
},!0);
}
}]
}):s.show(i),e&&e();
}
}));
}
var i=$("#js_content").html(template.render("js_step2_tpl",wx.cgiData.dispute));
m.go(2);
var c=!1,u=$(".js_submit",i).click(function(){
return $(this).hasClass("btn_disabled")||!n||c?!1:(c=!1,r.show({
title:"确定提交",
msg:"可从素材库/群发列表中选择声明文章。<br/>提交后，可在声明记录再次找到原文，原文不支持修改、撤销，请谨慎操作。",
type:"info",
buttons:[{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
},{
text:"确定提交",
type:"primary",
click:function(){
var e=this;
t(function(){
e.remove();
},!1);
}
}]
}),!1);
});
$(".js_go_prev",i).click(function(){
return e(),!1;
}),$(".js_select_appmsg").click(function(){
var t=$(this);
return new a({
ids:[],
multi:!1,
maxNum:1,
link:1,
callback:function(e){
if(e.length>0){
console.log("select appmsg",e);
var i=e[0];
$("#js_appmsg_list").html(template.render("js_appmsg_cell_tpl",{
article_list:[{
pic_cdn_url:i.cover,
title:i.title,
url:i.url
}]
})),n=i.link.replace("&amp;","&"),u.removeClass("btn_disabled"),t.text("重新选择");
}
}
}),!1;
});
}
function o(){
$("#js_content").html(template.render("js_result_tpl"));
$("#js_step_bar").html("");
}
var n,c=t("common/wx/Step.js"),s=t("common/wx/Cgi.js"),r=t("common/wx/dialog.js"),l=(t("common/wx/popup.js"),
wx.cgiData),a=t("homepage/appmsgdialog.js"),p=(wx.cgiData.dispute.declare_cnt_per_article_per_day,
t("common/wx/Tips.js")),m=new c({
container:"#js_step_bar",
selected:1,
names:["1 阅读须知","2 选择声明内容"]
});
wx.cgiData.is_whitelist?(r.show({
msg:"争议流程已被终止，暂无法提交。",
type:"info",
buttons:[{
type:"primary",
text:"返回首页",
click:function(){
location.href=wx.url("/cgi-bin/home"),this.remove();
}
}],
onHide:function(){
location.href=wx.url("/cgi-bin/home");
}
}),$(".pop_closed").click(function(){
location.href=wx.url("/cgi-bin/home");
})):wx.cgiData.is_limit_1000?(r.show({
msg:"无法添加声明|文章声明已经到达上限，无法添加更多声明",
type:"info",
buttons:[{
type:"primary",
text:"返回首页",
click:function(){
location.href=wx.url("/cgi-bin/home"),this.remove();
}
}],
onHide:function(){
location.href=wx.url("/cgi-bin/home"),this.remove();
}
}),$(".pop_closed").click(function(){
location.href=wx.url("/cgi-bin/home");
})):e();
});