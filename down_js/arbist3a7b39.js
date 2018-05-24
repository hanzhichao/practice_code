define("business/arbist.js",["common/wx/popup.js","common/wx/top.js","common/wx/Cgi.js","biz_common/moment.js","common/wx/pagebar.js","biz_web/ui/dropdown.js","biz_web/utils/upload.js","common/wx/Tips.js"],function(t){
"use strict";
var e=wx.cgiData,s=(t("common/wx/popup.js"),t("common/wx/top.js")),a=t("common/wx/Cgi.js"),i=t("biz_common/moment.js"),n=t("common/wx/pagebar.js"),o=t("biz_web/ui/dropdown.js"),r=t("biz_web/utils/upload.js"),l=t("common/wx/Tips.js"),c=function(){
function t(){
new s("#topTab",s.DATA.business).selected("rights"),$("#js_setting").attr("href",wx.url("/merchant/business?t=business/right&action=right&type=reason")),
$("#js_rightlist").attr("href",wx.url("/merchant/shop_rights?t=business/rights_list&action=batchgetpayfeedback")),
$("#js_arbist").attr("href",wx.url("/merchant/shop_rights?t=business/court_list&action=batchgetarbitration")),
u();
}
function c(){
$("#js_list .tbody").find("dt").on("click",function(){
var t=$(this).parent().parent(),e="open",s="dd",a="js_imgload";
t.hasClass(e)?(t.removeClass(e),t.find(s).hide()):(t.hasClass(a)||(t.find("img").each(function(){
var t=$(this);
t.attr("src",t.data("src"));
}),t.addClass(a)),t.siblings(".open").removeClass(e).find(s).hide(),t.addClass(e),
t.find(s).show());
}),$("#js_list").find(".js_proof").on("click",function(){
{
var t=$(this);
$(".pop_proof").popup({
title:"举证",
close:function(){
this.remove();
},
buttons:[{
text:"确定",
click:function(){
var e="/merchant/shop_rights?action=uploadbizarbitration",s=this,i=s.$dialogWrp,n=t.data("id"),o=i.find("textarea").val().trim(),r=i.find("img"),c=[];
r.each(function(){
c.push($(this).data("id"));
}),a.post({
url:e,
data:{
record_id:n,
ext_info:o,
medialist:c.join(",")
},
mask:!1,
error:function(){
l.err("举证失败");
}
},function(t){
0==t.base_resp.ret?(l.suc("举证成功"),setTimeout(function(){
location.reload();
},300)):l.err("举证失败");
});
},
type:"primary"
},{
text:"取消",
click:function(){
setTimeout(function(){
location.reload();
},300);
},
type:"default"
}]
});
}
$(".dialog_wrp .js_upload").attr("id","js_upload");
var e=function(){
$(this).closest("span").remove();
var t=$(".dialog_wrp .imgs_panel"),e=+(t.data("count")||0);
t.data("count",e-1);
};
return r.uploadTmpFile({
container:"#js_upload",
multi:!0,
type:2,
canContinueUpload:function(){
var t=$(".dialog_wrp .imgs_panel"),e=+(t.data("count")||0),s=+(t.data("queue")||0);
return e+s>=5?(l.err("最多可上传5张什么的"),!1):(t.data("queue",s+1),!0);
},
onComplete:function(t,s,a,i){
var n=i.content||"";
0==i.base_resp.ret?($(".dialog_wrp .imgs_panel").append('<span class="item l"><img src="%s" style="width:80px;height:72px;" data-id="%s"><p><a href="javascript:;" class="js_del js_thumb">%s</a></p></span>'.sprintf(r.tmpFileUrl(n),n,"删除")),
$(".dialog_wrp .js_thumb").on("click",e).removeClass("js_thumb"),l.suc("上传成功")):l.err("上传失败");
},
onAllComplete:function(){
var t=$(".dialog_wrp .imgs_panel"),e=t.find("img").length;
t.data("count",e).data("queue",0);
}
}),!1;
}),$("#js_list").find(".js_detail").on("click",function(){
return $("#js_main").addClass("dn"),$("#js_detailpage").html($(this).closest("li").find(".hidedetail").html()).removeClass("dn").find(".js_return").on("click",function(){
return $("#js_detailpage").addClass("dn"),$("#js_main").removeClass("dn"),!1;
}),!1;
});
var t=e.count>0?e.count:10,s=e.totalcount,i=e.offset;
if(s>t){
var o=i>0?Math.floor(i/t)+1:1;
new n({
container:".jsPageBar",
perPage:t,
initShowPage:o,
totalItemsNum:s,
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
function d(){
var t=e.list.length;
if(t>0){
for(var s=0;t>s;s++){
e.list[s].statusname=p[e.list[s].status]||"正在处理",e.list[s].create_times=e.list[s].create_time>0?i.unix(e.list[s].create_time).format("YYYY-M-D HH:mm"):"未知时间";
for(var a=[],n=e.list[s].media_id,o=n.length,l=0;o>l;l++)a.push({
raw_id:n[l].raw_media_id,
raw_url:r.mediaFileUrl(n[l].raw_media_id),
media_id:n[l].processed_media_id,
media_url:r.mediaFileUrl(n[l].processed_media_id)
});
e.list[s].fee=e.list[s].fee/100,e.list[s].imgs=a,e.list[s].imgscount=o;
}
$("#js_list").append(template.render("tpl",{
data:e.list
})),c();
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
return e&&e!=t.attr("placeholder")?void(location.href=wx.url("/merchant/shop_rights?action=batchgetarbitration&t=business/court_list&record_id="+encodeURIComponent(e))):(l.err("请输入搜索关键词"),
t.focus(),!1);
}),t.keypress(function(t){
wx.isHotkey(t,"enter")&&s.click();
}),new o({
container:"#js_ddorder",
label:""!=e.status?p[e.status]||"全部状态":"全部状态",
data:[{
name:"全部状态",
value:6
},{
name:"待举证",
value:0
},{
name:"超时未举证",
value:1
},{
name:"已举证，仲裁中",
value:2
},{
name:"已仲裁",
value:8
}],
callback:function(t){
var e=(location.href,encodeURIComponent(t));
return location.href=wx.url("/merchant/shop_rights?action=batchgetarbitration&t=business/court_list&status="+e),
!1;
}
}),$(".js_order").addClass("0"==e.sort_type?"down":"up"),$(".js_order").on("click",function(){
var t=$(this),e=location.href,s=t.hasClass("up")?"0":"1";
/([\?&])offset=\d*/.test(e)&&(e=e.replace(/([\?&])offset=\d*/,"$1offset=0")),location.href=/([\?&])sort_type=\d*/.test(e)?e.replace(/([\?&])sort_type=\d*/,"$1sort_type="+s):e+"&sort_type=%s".sprintf(s);
}),d();
}
var p={
0:"待举证",
1:"超时未举证",
2:"已举证，仲裁中",
3:"已仲裁",
4:"已仲裁"
};
return{
init:t
};
}();
c.init();
});