define("business/rightlist.js",["common/wx/dialog.js","common/wx/top.js","common/wx/Cgi.js","biz_common/moment.js","common/wx/pagebar.js","biz_web/ui/dropdown.js","biz_web/utils/upload.js","common/wx/Tips.js"],function(t){
"use strict";
var e=wx.cgiData,s=t("common/wx/dialog.js"),a=t("common/wx/top.js"),i=t("common/wx/Cgi.js"),r=t("biz_common/moment.js"),o=t("common/wx/pagebar.js"),n=t("biz_web/ui/dropdown.js"),c=t("biz_web/utils/upload.js"),l=t("common/wx/Tips.js"),d=function(){
function t(){
f||new a("#topTab",a.DATA.business).selected("rights"),$("#js_setting").attr("href",wx.url("/merchant/business?t=business/right&action=right&type=reason"+h)),
$("#js_rightlist").attr("href",wx.url("/merchant/shop_rights?t=business/rights_list&action=batchgetpayfeedback"+h)),
$("#js_arbist").attr("href",wx.url("/merchant/shop_rights?t=business/court_list&action=batchgetarbitration"+h)),
u();
}
function d(){
$("#js_list .tbody").find("dt").on("click",function(){
var t=$(this).parent().parent(),e="open",s="dd",a="js_imgload";
t.hasClass(e)?(t.removeClass(e),t.find(s).hide()):(t.hasClass(a)||(t.find("img").each(function(){
var t=$(this);
t.attr("src",t.data("src"));
}),t.addClass(a)),t.siblings(".open").removeClass(e).find(s).hide(),t.addClass(e),
t.find(s).show());
}),$("#js_list").find(".js_confirm").on("click",function(){
{
var t=$(this);
s.show({
title:"确认维权单",
type:"warn",
msg:"确认维权单已处理完毕？|请确认已完成退款或退货等操作，对结果不满意的维权单，用户可要求再次维权。",
buttons:[{
text:"确定",
click:function(){
var e="/merchant/shop_rights?action=updatefeedbackstatus",s=t.data("id"),a=t.data("status"),r=this;
i.post({
url:e,
data:{
record_id:s,
old_status:a
},
mask:!1,
error:function(){
l.err("确认失败");
}
},function(e){
if(!e)return void l.err("系统错误，请重试");
switch(+e.ret){
case 0:
l.suc("确认成功"),t.parent().siblings(".state").html("客户待确认"),t.remove(),r.remove();
break;

default:
l.err("添加失败，请重试");
}
});
}
},{
text:"取消",
type:"normal",
click:function(){
setTimeout(function(){
location.reload();
},300);
}
}]
});
}
return!1;
});
var t=e.count>0?e.count:10,a=e.totalcount,r=e.offset;
if(a>t){
var n=r>0?Math.floor(r/t)+1:1;
new o({
container:".jsPageBar",
perPage:t,
initShowPage:n,
totalItemsNum:a,
first:!1,
last:!1,
startRange:4,
midRange:0,
endRange:1,
isSimple:!0,
callback:function(t){
var e=""+t.perPage*(t.currentPage-1),s=location.href;
return location.href=/([\?&])offset=\d*/.test(s)?s.replace(/([\?&])offset=\d*/,"$1offset="+e):s+"&offset=%s&count=%s".sprintf(e,t.perPage),
!1;
}
});
}
}
function m(){
var t=e.list.length;
if(t>0){
for(var s=0;t>s;s++){
e.list[s].statusname=p[e.list[s].status]||"正在处理",e.list[s].create_times=e.list[s].create_time>0?r.unix(e.list[s].create_time).format("YYYY-M-D HH:mm"):"未知时间";
for(var a=[],i=e.list[s].media_id,o=i.length,n=0;o>n;n++)a.push({
raw_id:i[n].raw_media_id,
raw_url:c.mediaFileUrl(i[n].raw_media_id),
media_id:i[n].processed_media_id,
media_url:c.mediaFileUrl(i[n].processed_media_id)
});
e.list[s].fee=e.list[s].fee/100,e.list[s].imgs=a,e.list[s].imgscount=o;
}
$("#js_list").append(template.render("tpl",{
data:e.list
})),d();
}else $("#js_list").append('<li class="tbody"><dl><dt class="group"><div class="empty tc">暂无数据</div></dt></dl></li>');
}
function u(){
var t=$("#msgSearchInput"),s=$("#msgSearchBtn");
if(e.keyword){
$(".jsPageBar").hide();
var a=e.keyword.html(!1).html(!1);
t.val(a);
}
s.on("click",function(){
var e=$.trim(t.val());
return e&&e!=t.attr("placeholder")?void(location.href=wx.url("/merchant/shop_rights?action=batchgetpayfeedback&t=business/rights_list&record_id="+encodeURIComponent(e)+h)):(l.err("请输入搜索关键词"),
t.focus(),!1);
}),t.keypress(function(t){
wx.isHotkey(t,"enter")&&s.click();
}),new n({
container:"#js_ddorder",
label:""!=e.status?p[e.status]||"全部状态":"全部状态",
data:[{
name:"全部状态",
value:6
},{
name:"商户待处理",
value:0
},{
name:"商户超时未处理",
value:3
},{
name:"客户待确认",
value:1
},{
name:"已解决",
value:2
}],
callback:function(t){
var e=(location.href,encodeURIComponent(t)||"0");
return location.href=wx.url("/merchant/shop_rights?action=batchgetpayfeedback&t=business/rights_list&status="+e+h),
!1;
}
}),$(".js_order").addClass("0"==e.sort_type?"down":"up"),$(".js_order").on("click",function(){
var t=$(this),e=location.href,s=t.hasClass("up")?"0":"1";
/([\?&])offset=\d*/.test(e)&&(e=e.replace(/([\?&])offset=\d*/,"$1offset=0")),location.href=/([\?&])sort_type=\d*/.test(e)?e.replace(/([\?&])sort_type=\d*/,"$1sort_type="+s):e+"&sort_type=%s".sprintf(s);
}),m();
}
var f=e.flag>0?!0:!1,h=f?"&flag=1":"",p={
0:"商户待处理",
1:"客户待确认",
2:"已解决",
3:"商户超时未处理",
4:"微信加入仲裁",
5:"仲裁已解决"
};
return{
init:t
};
}();
d.init();
});