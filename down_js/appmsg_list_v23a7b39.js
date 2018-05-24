define("media/appmsg_list_v2.js",["common/wx/media/appmsg.js","common/wx/pagebar.js","common/wx/top.js","common/wx/tooltip.js","common/wx/popover.js","common/wx/time.js","common/wx/Tips.js","media/media_cgi.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","common/wx/dialog.js","common/wx/Cgi.js","common/wx/progress.js","media/appmsg_temp_url.js","common/qq/jquery.plugin/btn.js","common/wx/popup.js","biz_common/moment.js","common/wx/searchInput.js"],function(i){
"use strict";
function t(t){
for(var e=[],n={
2:"原创功能",
3:"赞赏功能"
},a=0,o=t.length;o>a;a++){
var c=t[a].func_id;
if(n[c]){
var s=t[a].unlock_time,p=t[a].ban_time,m=i("biz_common/moment.js"),r=s?s==p?"永久屏蔽"+n[c]:"屏蔽"+n[c]+"至"+m.unix(s).format("YYYY年MM月DD日 HH:mm"):"";
r&&e.push({
info:r
});
}
}
e.length>0&&$("#js_forbit_warn").html(template.render("tpl_forbit",{
list:e
}));
}
function e(i){
if(z.length<=0)return $("#js_empty").show(),void p();
switch(i){
case"card":
a();
break;

case"list":
n();
break;

default:
a();
}
c(),o(),s();
}
function n(){
T=$("#js_list");
var i="";
template.helper("timeFormat",function(i){
return g.timeFormat(i);
}),i=template.render("tpl_list",{
list:z
}),T.html(i).show(),x(T,".js_title");
}
function a(){
T=$("#js_card");
var i=[$("#js_col1"),$("#js_col2"),$("#js_col3")];
$.each(z,function(t,e){
var e=z[t],n=e.app_id||"";
if(i[t%3].append('<div id="appmsg%s" class="js_appmsgitem"></div>'.sprintf(n)),wx.cgiData.key)for(var t=0,a=e.multi_item.length;a>t;t++)e.multi_item[t].title=e.multi_item[t].title.html(!1);
new r({
highlight:wx.cgiData.key?!0:!1,
container:"#appmsg"+n,
data:e,
showEdit:!0,
type:k,
useUpdateTime:!0
});
}),T.show();
}
function o(){
new d({
dom:T.find(".js_tooltip"),
position:{
x:0,
y:-4
}
});
}
function c(){
var i=new Date;
i.setYear(2016),i.setMonth(7),i.setDate(28),(new Date).getTime()<i.getTime()&&$("#js_preview_tips").show();
}
function s(){
T.on("click",".js_del",function(){
var i=$(this),t=i.data("id");
$(".popover").hide(),new _({
dom:this,
content:"删除后不会影响已群发的图文消息，确定删除该素材？",
place:"bottom",
margin:"center",
buttons:[{
text:"确定",
click:function(){
{
var e=this;
e.$pop.find(".jsPopoverBt").eq(0).btn(!1);
}
w.appmsg.del(t,function(){
i.closest(".js_appmsgitem").slideUp(function(){
$(this).remove(),e.remove();
});
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}]
});
}),p();
}
function p(){
var i=$("#add_article_btn"),t=$("#add_article_list");
i.on("click",function(){
return t.show(),!1;
}),t.on("click",function(){
$(this).hide();
}),$(document).on("click",function(){
t.hide();
});
}
function m(){
if(10==wx.cgiData.type){
$("#searchDiv").show();
var t=i("common/wx/searchInput.js");
new t({
id:"#searchDiv",
value:wx.cgiData.key,
placeholder:"标题",
click:function(i){
i.length>0?window.location=wx.url("/cgi-bin/appmsg?begin=0&count=10&t=media/appmsg_list2&action=list_%s&type=10&query=%s".sprintf(wx.cgiData.view,encodeURIComponent(i))):f.err("请输入搜索关键词");
}
}),$("#reload").click(function(){
window.location=wx.url("/cgi-bin/appmsg?begin=0&count=10&t=media/appmsg_list2&action=list_%s&type=10".sprintf(wx.cgiData.view));
});
}
}
var r=i("common/wx/media/appmsg.js"),l=i("common/wx/pagebar.js"),u=i("common/wx/top.js"),d=i("common/wx/tooltip.js"),_=i("common/wx/popover.js"),g=i("common/wx/time.js"),f=i("common/wx/Tips.js"),w=i("media/media_cgi.js"),h=(i("biz_web/ui/checkbox.js"),
i("biz_web/ui/dropdown.js")),j=i("common/wx/dialog.js"),b=i("common/wx/Cgi.js"),x=(i("common/wx/progress.js"),
i("media/appmsg_temp_url.js"));
i("common/qq/jquery.plugin/btn.js"),i("common/wx/popup.js");
var v=wx.cgiData,k=v.type,y=wx.cgiData.view,D=v.file_cnt,q=$("#query_tips").html(),z=v.item||[];
new u("#topTab",u.DATA.media).selected("media"+k);
var T;
e(wx.cgiData.view),t(wx.cgiData.forbit),$("#js_cardview").on("click",function(){
var i="/cgi-bin/appmsg?begin=%s&count=10&t=media/appmsg_list2&type=10&action=list_card".sprintf(wx.cgiData.begin);
i=wx.cgiData.key?i+"&query="+wx.cgiData.key:i,location.href=wx.url(i);
}),$("#js_listview").on("click",function(){
var i="/cgi-bin/appmsg?begin=%s&count=10&t=media/appmsg_list2&type=10&action=list_list".sprintf(wx.cgiData.begin);
i=wx.cgiData.key?i+"&query="+wx.cgiData.key:i,location.href=wx.url(i);
});
var P=0;
if(wx.cgiData.key?(P=wx.cgiData.search_cnt,0==P&&($("#js_list").hide(),$("#js_card").hide(),
$("#js_empty").hide(),$("#js_search_empty").show())):P=D.app_msg_cnt,$("#js_count").html(P),
$("#page_title").css("zoom",1).css("zoom",""),$("#query_tips").html(wx.cgiData.key?"在所有素材":q),
P>0){
var Y=v.count,I=v.begin,C=I/Y+1;
new l({
container:"#js_pagebar",
perPage:Y,
first:!1,
last:!1,
isSimple:!0,
initShowPage:C,
totalItemsNum:P,
callback:function(i){
var t=i.currentPage;
if(t!=C)return t--,location.href=wx.url(wx.cgiData.key?"/cgi-bin/appmsg?begin=%s&count=%s&t=media/appmsg_list2&type=10&action=list_%s&query=%s".sprintf(Y*t,Y,y,wx.cgiData.key):"/cgi-bin/appmsg?begin=%s&count=%s&t=media/appmsg_list2&type=10&action=list_%s".sprintf(Y*t,Y,y)),
!1;
}
});
}
m(),function(){
function i(){
var i=[];
a.find("input:checked").each(function(){
i.push($(this).data("id"));
}),b.post({
url:"/cgi-bin/modifyfile",
data:{
oper:"cleanimg",
monthago:o.value,
groupidlist:i.join(",")
},
mask:!1
},function(i){
if(!i||!i.base_resp)return f.err("系统错误，请稍后重试"),void n.popup("remove");
var t=1*i.base_resp.ret;
switch(t){
case 0:
n.popup("remove"),j.show({
title:"清理图片",
type:"succ",
msg:"已清理%s的图片，合计%s张|当前图库图片总数：%s张".sprintf(o.name,s,i.new_total_count),
buttons:[{
text:"确定",
click:function(){
this.hide(),location.reload();
}
}]
});
break;

default:
n.popup("remove"),f.err("系统错误，请稍后重试");
}
});
}
function t(i){
i?(n.find("button[data-index=0]").parent().enable(),c&&c.setall(!0),o&&o.enable()):(n.find("button[data-index=0]").parent().disable(),
c&&c.setall(!1),o&&o.disable(),$(".js_pic_clear_num").text("-"));
}
function e(){
s=0,a.find("input:checked").each(function(){
s+=$(this).data("cnt");
}),n.find(".js_pic_clear_num").text(s),0==s?n.find(".js_btn_p").eq(0).disable():n.find(".js_btn_p").eq(0).enable();
}
var n=null,a=null,o=null,c=null,s=0,p=null;
$("#js_pic_clear_a").click(function(){
var m=1;
n=$("#js_pic_clear_tpl").popup({
title:"清理图片",
className:"clear_dialog_wrp",
width:566,
buttons:[{
text:"开始清理",
click:function(){
o.name?0===a.find("input:checked").length?f.err("请至少选择一个分组"):(this.$dialogWrp.find(".js_btn_p").eq(0).btn(!1),
c.disabled("disabled"),o.disable(),i()):f.err("请选择一个时间段");
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}],
onHide:function(){
this.remove();
}
}),o=new h({
container:".js_pic_clear_drop",
data:[{
name:"一个月以前上传",
value:1
},{
name:"三个月以前上传",
value:3
},{
name:"六个月以前上传",
value:6
},{
name:"一年以前上传",
value:12
}],
search:!1,
callback:function(i){
t(!1),b.get({
url:"/cgi-bin/filepage?action=getimggroups&monthago="+i+"&click="+m,
mask:!1
},function(i){
if(!i||!i.base_resp)return void f.err("系统错误，请稍后重试");
var o=1*i.base_resp.ret;
switch(o){
case 0:
p=i.file_group,a=n.find(".js_pic_clear_list").empty();
for(var m=0;m<p.length;m++)p[m].name&&p[m].name.length>0&&$(template.render("js_pic_clear_checkbox_tpl",{
name:p[m].name,
cnt:p[m].count,
id:p[m].id
})).appendTo(a);
c=a.find("input").checkbox(),a.find("input").click(e),n.popup("resetPosition"),t(!0),
n.find(".js_pic_clear_num").text(0),a.find('input[data-id="1"]').length>0?(a.find('input[data-id="1"]').trigger("click"),
n.find(".js_btn_p").eq(0).enable()):(s=0,n.find(".js_btn_p").eq(0).disable());
break;

default:
f.err("系统错误，请稍后重试"),t(!0),n.find(".js_pic_clear_num").text(0);
}
}),m=0;
}
}),o.selected(1);
}),v.file_cnt.img_cnt>=3e3&&$("#js_pic_clear").show();
}();
});