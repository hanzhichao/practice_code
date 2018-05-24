define("ad_system/host_manage.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/dialog.js","biz_common/moment.js","common/wx/popover.js","ad_system/helper.js","common/wx/popup.js","common/wx/top.js"],function(t){
"use strict";
function e(t,e){
c.post({
url:"/merchant/ad_host_manage?action=op",
data:{
host_status:t
}
},function(t){
0==t.base_resp.ret?(l.suc("操作成功"),e&&e.hide(),function(){
window.location.reload();
}.delay(1)):l.err();
});
}
function i(t){
if(1!=f){
var e="",i=[];
p.list.find("li").each(function(t,o){
$(o).is(".selected")&&(e+=$(o).data("id")+",",i.push({
alias:$(o).data("uin"),
icon:$(o).data("icon"),
nick_name:$(o).data("name")
}));
}),f=!0,c.post({
url:"/merchant/ad_host_manage?action=setblack&alias_list="+e.slice(0,-1)
},function(o){
f=!1,u+=e.replace(/,/g,"|"),0==o.base_resp.ret?($("#list").append(tpl.render("tpl",{
list:i
})),t.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto"):l.err();
});
}
}
function o(t){
return t.each(function(t){
t.icon||(t.icon="/htmledition/images/icon/page-setting/avatar/icon80_avatar_default.png");
}),t;
}
function n(t){
p={
search:t.find("#search"),
key:t.find("#key"),
clear:t.find("#clear"),
list:t.find("#popList"),
info:t.find("#info"),
num1:t.find("#num1"),
num2:t.find("#num2"),
okBt:t.find(".dialog_ft>span:eq(0)"),
blank:t.find("#blank")
},p.num2.text(100-u.split("|").slice(1,-1).length),p.search.placeholder(),p.list.on("click","#more",function(){
var t=[];
$("#popList .jsLi").each(function(e,i){
$(i).data("id")&&t.push($(i).data("id"));
});
var e=t.length;
t=t.join(","),$("#loading").show(),$("#more").remove(),c.get({
data:{
begin:e
},
url:"/merchant/ad_host_manage?action=search&key="+p.key.val()+"&alias_list="+t+u.replace(/\|/g,",")
},function(t){
$("#loading").hide(),0==t.base_resp.ret?t.ad_client_list.ad_client.length>0?(p.list.append(tpl.render("tpl",{
list:o(t.ad_client_list.ad_client),
hide:!0
})),t.ad_client_list.ad_client.length<20&&$("#more").remove(),p.blank.hide(),p.info.show()):0==e&&p.blank.show():l.err();
});
}),p.clear.click(function(){
p.list.html(""),p.num1.text(u.split("|").slice(1,-1).length),p.num2.text(100-u.split("|").slice(1,-1).length),
p.info.hide(),p.okBt.removeClass("btn_primary").addClass("btn_disabled"),p.blank.hide();
}),p.key.keydown(function(t){
var e="which"in t?t.which:t.keyCode;
13==e&&p.search.trigger("click");
}),p.search.click(function(){
p.clear.trigger("click"),p.key.val().trim().length>0&&(p.list.html(""),$("#loading").show(),
c.get({
url:"/merchant/ad_host_manage?action=search&key="+p.key.val()+"&alias_list="+u.replace(/\|/g,",").slice(1,-1)
},function(t){
$("#loading").hide(),0==t.base_resp.ret?t.ad_client_list.ad_client.length>0?(p.clear.show(),
p.list.html(tpl.render("tpl",{
list:o(t.ad_client_list.ad_client),
hide:!0
})),p.list.css({
zoom:"1"
}),p.blank.hide(),p.info.show(),t.ad_client_list.ad_client.length<20&&$("#more").remove()):p.blank.show():l.err();
}));
}),p.list.on("click","li",function(){
if($(this).hasClass("selected"))$(this).removeClass("selected"),$(this).find("a").remove();else{
if(100-u.split("|").slice(1,-1).length-p.list.find(".selected").length/2==0)return;
$(this).addClass("selected"),$(this).append('<a class="selected"></a>');
}
var t=p.list.find(".selected").length/2;
p.num1.text(t),p.num2.text(100-u.split("|").slice(1,-1).length-t),t>0?p.okBt.removeClass("btn_disabled").addClass("btn_primary"):p.okBt.removeClass("btn_primary").addClass("btn_disabled");
});
}
function a(t,e){
if(0==t){
if(1==e&&wx.data.time<wx.cgiData.closeTime)return;
c.post({
url:"/merchant/ad_host_manage?action=op",
data:{
host_status:e
}
},function(t){
0==t.base_resp.ret?(l.suc("操作成功"),window.location.reload()):l.err();
});
}else if(1==t){
if(1==e&&wx.data.time<wx.cgiData.close_time_top)return;
c.post({
url:"/merchant/ad_host_manage?action=open_top",
data:{
host_status_top:e
}
},function(t){
0==t.base_resp.ret?(l.suc("操作成功"),window.location.reload()):l.err();
});
}
}
function s(e){
for(var i=[],o=0,n=e.length;n>o;o++){
var a=e[o].func_id,s={
4:"流量主功能"
};
if(s[a]){
var c=e[o].unlock_time,l=e[o].ban_time,d=t("biz_common/moment.js"),r=c?c==l?"永久屏蔽"+s[a]:"屏蔽"+s[a]+"至"+d.unix(c).format("YYYY年MM月DD日 HH:mm"):"";
r&&i.push({
info:r
}),c!=l?c>=wx.data.time?$("#buttomOpen").hide():$("#buttomOpen").show():$("#buttomOpen").hide();
}
}
i.length>0&&$("#js_forbit_warn").html(template.render("tpl_forbit",{
list:i
}));
}
{
var c=t("common/wx/Cgi.js"),l=t("common/wx/Tips.js"),d=t("common/wx/dialog.js"),r=t("biz_common/moment.js"),m=t("common/wx/popover.js");
t("ad_system/helper.js");
}
t("common/wx/popup.js");
var p,m=t("common/wx/popover.js"),h=t("common/wx/top.js");
new h("#topTab",h.DATA.adHost).selected("adhostmanage"),wx.cgiData.hostStatus<wx.data.time?$("#openBt").show():$("#openBt").hide();
var u="|";
wx.cgiData.list.each(function(t){
u+=t.alias+"|",t.icon||(t.icon="/htmledition/images/icon/page-setting/avatar/icon80_avatar_default.png");
}),$("#closeBt").click(function(){
d.show({
type:"warn",
msg:'确定要关闭流量开关吗? | <p> 关闭流量开关后 </p><p><i class="icon_dot">&#9679;</i> 你的公众账号中不会再出现广告 </p><p><i class="icon_dot">&#9679;</i> 你在1天之内不能重新打开流量开关 </p><p><i class="icon_dot">&#9679;</i> 你的账户中未结算的金额将在下一个结算日进行结算 </p><p><i class="icon_dot">&#9679;</i> 你仍然可以查看流量主功能的历史数据 </p>',
buttons:[{
text:"确定关闭",
click:function(){
var t=this;
e(2,t);
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
}),1==wx.cgiData.can_host_top&&wx.cgiData.host_status_top>1&&(wx.data.time<wx.cgiData.close_time_top&&$("#topOpen").addClass("disabled"),
$("#topOpenTime").text(r.unix(wx.cgiData.close_time_top).format("YYYY年MM月DD日")+"后再次开启")),
wx.cgiData.hostStatus>1&&(wx.data.time<wx.cgiData.closeTime&&$("#buttomOpen").addClass("disabled"),
$("#bottomOpenTime").text(r.unix(wx.cgiData.closeTime).format("YYYY年MM月DD日")+"后可再次手动开启"),
wx.data.time>wx.cgiData.closeTime&&$("#openBt").show().click(function(){
d.show({
type:"warn",
msg:"开启广告位确认|你确定要开启广告位?",
buttons:[{
text:"确认开启",
click:function(){
var t=this;
e(1,t);
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
})),$("#list").append(tpl.render("tpl",{
list:wx.cgiData.list
})),$("body").on("click",".jsDelete",function(){
var t=$(this).parents("li");
new m({
dom:$(this),
content:"您确定要删除吗？",
buttons:[{
text:"删除",
click:function(){
var e=this;
c.post({
url:"/merchant/ad_host_manage?action=delblack&del_alias="+t.data("id")
},function(i){
e.hide(),0==i.base_resp.ret?(u=u.replace(t.data("id")+"|",""),t.remove()):l.err();
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
}),$("#add").click(function(){
if(u.split("|").slice(1,-1).length>=100)return void d.show({
type:"warn",
msg:"黑名单上限|你最多可以添加100个黑名单用户。",
buttons:[{
text:"返回",
click:function(){
this.hide();
}
}]
});
var t=$("#popTpl").popup({
title:"添加广告主黑名单",
className:"lists_pop",
width:960,
buttons:[{
text:"添加黑名单",
click:function(){
p.okBt.hasClass("btn_primary")&&i(this);
},
type:"disabled"
},{
text:"取消",
click:function(){
this.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto";
}
}],
close:function(){
this.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto";
}
});
document.body.style.overflow=document.documentElement.style.overflow="hidden",$("#info").hide(),
n(t);
});
var f=!1;
$(".jsClose").click(function(){
var t=$(this).data("pos");
new m({
dom:$(this),
content:"关闭广告位后，24小时候才能再次开启，是否确认关闭",
buttons:[{
text:"关闭",
click:function(){
this.remove(),"bottom"==t?a(0,2):"top"==t&&a(1,2);
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
});
var _;
$("#ask").mouseover(function(){
_&&_.show?_.show():_=new m({
dom:$("#ask"),
content:"该广告位暂时处于内测阶段，当前账号暂时无权限开启，敬请关注后续通知",
hover:!0
});
}),$("#buttomOpen").click(function(){
a(0,1);
}),$("#topOpen").click(function(){
a(1,1);
}),$("#topView").click(function(){
jQuery("#topPop").popup({
className:"host_preview_pop",
title:"广告位位置",
buttons:[{
text:"确定",
click:function(){
this.hide();
},
type:"primary"
}]
});
}),$("#bottomView").click(function(){
jQuery("#bottomPop").popup({
className:"host_preview_pop",
title:"广告位位置",
buttons:[{
text:"确定",
click:function(){
this.hide();
},
type:"primary"
}]
});
}),s(wx.cgiData.forbit);
});