define("wxopen/addr_list.js",["common/wx/Tips.js","common/wx/Cgi.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","common/qq/queryString.js","biz_common/utils/string/html.js","common/wx/popup.js","common/wx/pagebar.js","common/wx/popover.js"],function(t){
"use strict";
function i(){
return(new p).remove("from").getUrl();
}
function e(){
$("#js_div_header").html(s("tpl_header",{
left_apply_num:wx.cgiData.left_apply_num
})),$("#js_div_list").html(s("tpl_list",{
list:wx.cgiData.list
}));
var t=wx.cgiData.count||50;
wx.cgiData.total_count>t?new l({
container:$("#js_pagebar"),
perPage:t,
initShowPage:wx.cgiData.page,
totalItemsNum:wx.cgiData.total_count,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var i=t.currentPage;
location.href=(new p).replace("page",i).remove("from").getUrl();
}
}):$("#js_pagebar").hide();
}
function n(){
$("#js_btn_add").on("click",function(){
if(0==wx.cgiData.left_apply_num){
var t=$("#tpl_no_add").popup({
title:"无法添加更多地点",
data:{
max_apply_num:wx.cgiData.max_apply_num
},
buttons:[{
text:"我知道了",
type:"primary",
click:function(){
this.remove();
}
}],
mask:!0,
autoShow:!0,
onHide:function(){
this.remove();
}
});
return t.popup("show"),t.popup("resetPosition"),!1;
}
window.open(wx.url("/cgi-bin/entityshopv2?action=add_page"));
});
var t=!1,e=!0;
$("#js_import_store").click(function(){
if(t||$(this).hasClass("btn_disabled"))return!1;
t=!0;
var n=!1,o=[];
c.get({
url:"/cgi-bin/entityshopv2?action=check_store_import",
success:function(t){
if(0==t.base_resp.ret){
if(t.total_num>0)if(t.can_import_num>0&&t.allow_import){
if(e&&!wx.cgiData.from_entityshop)return;
o=[{
text:"导入",
type:"primary",
click:function(){
if(!n){
n=!0;
var e=this;
c.post({
url:"/cgi-bin/entityshopv2?action=batch_import_store",
success:function(n){
if(0==n.base_resp.ret){
a.suc("导入成功"),e.remove();
{
$($.trim(template.render("js_import_store_suc_tpl",t))).popup({
autoShow:!0,
title:"导入门店",
buttons:[{
text:"完成",
type:"primary",
click:function(){
this.hide(),location.href=i();
}
}],
onHide:function(){
this.remove();
}
});
}
}else c.show(n);
},
complete:function(){
n=!1;
}
});
}
}
}];
}else{
if(e)return;
o=[{
text:"关闭",
type:"primary",
click:function(){
this.hide();
}
}];
}else o=[{
text:"新建门店",
type:"primary",
click:function(){
location.href=wx.url("/merchant/newentityshop?action=add_page");
}
},{
text:"取消",
click:function(){
this.hide();
}
}];
{
$($.trim(template.render("js_import_store_tpl",t))).popup({
autoShow:!0,
title:"导入门店",
buttons:o,
onHide:function(){
this.remove();
}
});
}
}else c.show(t);
},
complete:function(){
t=!1,e=!1;
}
});
}).click(),$("#js_div_list").find(".js_btn_reason").each(function(){
var t=1*$(this).data("index"),i=wx.cgiData.list[t],e=new u({
dom:$(this),
content:r.htmlEncode(i.refuse_reason),
addCls:"",
isToggle:!0,
defaultOpen:!1
});
e.hide();
}),$("#js_div_list").find(".js_btn_delete").on("click",function(){
{
var t=1*$(this).data("index"),e=wx.cgiData.list[t];
new u({
dom:$(this),
content:"删除后，无法再展示小程序，重新添加需要再次审核。",
addCls:"",
isToggle:!1,
defaultOpen:!0,
buttons:[{
text:"删除",
type:"primary",
click:function(){
c.post({
url:"/cgi-bin/entityshopv2?action=delete",
data:{
poi_id:e.poi_id
}
},function(t){
t&&0==t.base_resp.ret?(a.suc("删除成功"),location.href=i()):a.err("删除失败，请重试");
});
}
},{
text:"取消",
type:"default",
click:function(){
this.remove();
}
}]
});
}
return!1;
}),$("#js_div_list").find(".js_btn_unpublish").on("click",function(){
var t=1*$(this).data("index"),e=wx.cgiData.list[t];
c.post({
url:"/cgi-bin/entityshopv2?action=unpublish",
data:{
poi_id:e.poi_id
}
},function(t){
t&&0==t.base_resp.ret?(a.suc("取消展示成功"),location.href=i()):a.err("取消展示失败，请重试");
});
}),$("#js_div_list").find(".js_btn_publish").on("click",function(){
function t(t){
c.get({
url:"/cgi-bin/entityshopv2?action=bind_list"
},function(i){
return console.log("bind_list:",i.list),i&&i.base_resp&&0==i.base_resp.ret?void t(i.list||[]):(a.err("系统错误，请重试"),
void p.popup("remove"));
});
}
var e=1*$(this).data("index"),n=wx.cgiData.list[e],o="",p=null;
p=$("#tpl_loading").popup({
title:"展示小程序",
className:"show_weapp_dialog",
width:726,
data:{},
buttons:[{
text:"展示",
type:"primary",
click:function(){
if(!o)return a.err("请选择一个小程序"),!1;
var t=$(p.get()).find(".js_btn_p").eq(0);
t.btn(0),c.post({
url:"/cgi-bin/entityshopv2?action=publish",
data:{
poi_id:n.poi_id,
appid:o
}
},function(e){
t.btn(1),e&&0==e.base_resp.ret?(a.suc("展示成功"),location.href=i()):e&&240003==e.base_resp.ret?(a.err("该地点已有小程序展示"),
p.popup("remove"),$("#tpl_ret_240003").popup({
title:"地点已被使用",
className:"show_weapp_dialog",
data:{
show_weapp:e.show_weapp
},
buttons:[{
text:"我知道了",
type:"primary",
click:function(){
this.remove();
}
}]
})):a.err("系统错误，请重试");
});
}
},{
text:"取消",
type:"default",
click:function(){
this.remove();
}
}],
mask:!0,
autoShow:!0,
onHide:function(){
this.remove();
}
}),p.popup("show"),p.popup("resetPosition"),t(function(t){
var i=$(p.get());
i.find(".dialog_bd").html(s("tpl_bind_list",{
list:t
})),i.find('input[name="appid"]').checkbox({
multi:!1,
onChanged:function(t){
console.log("check change:",t.val()),t.is(":checked")&&(o=t.val());
}
}),i.find(".js_disabled_reason").each(function(){
var t=$(this).attr("data-reason"),i="";
1==t?i="因“未发布”而不可选择，请发布后再选择。":2==t?i="因“已暂停服务”而不可选择，请恢复服务后再选择。":3==t?i="因“违反运营规则”而不可选择，请恢复后再选择。 ":4==t&&(i="因“小程序主体与公众号不同”而不可选择。"),
new u({
dom:$(this),
content:i,
isToggle:!0,
defaultOpen:!1
}).hide();
});
});
}),$("#js_div_list").find(".js_show_offshelf_state").each(function(){
new u({
dom:$(this),
content:"未上架或不可见的小程序暂不支持展示在”附近的小程序“内",
isToggle:!0,
defaultOpen:!1
}).hide();
}),$("#js_div_list").find(".js_show_display_state2").each(function(){
new u({
dom:$(this),
content:"确认中。校验是否该地址有对应门店页",
isToggle:!0,
defaultOpen:!1
}).hide();
}),$("#js_div_list").find(".js_show_display_state3").each(function(){
new u({
dom:$(this),
content:"展示失败。该门店小程序内无门店页与该地址对应",
isToggle:!0,
defaultOpen:!1
}).hide();
});
}
function o(){
e(),n();
}
var s=template.render,a=t("common/wx/Tips.js"),c=t("common/wx/Cgi.js"),p=(t("biz_web/ui/checkbox.js"),
t("biz_web/ui/dropdown.js"),t("common/qq/queryString.js")),r=t("biz_common/utils/string/html.js"),l=(t("common/wx/popup.js"),
t("common/wx/pagebar.js")),u=t("common/wx/popover.js");
o();
});