define("ibeacon/page_draw.js",["biz_web/ui/checkbox.js","common/wx/popup.js","common/wx/Step.js","common/wx/Cgi.js","biz_web/ui/input/lentips.js","ibeacon/cardTable.js","biz_web/utils/upload.js","common/wx/Tips.js","common/wx/time.js","biz_web/ui/dropdown.js","ibeacon/awardDialog.js","biz_web/ui/dateRange.js","biz_common/moment.js","common/wx/popover.js"],function(t){
"use strict";
t("biz_web/ui/checkbox.js"),t("common/wx/popup.js");
var e=t("common/wx/Step.js"),a=t("common/wx/Cgi.js"),i=t("biz_web/ui/input/lentips.js"),s=(t("ibeacon/cardTable.js"),
t("biz_web/utils/upload.js"),t("common/wx/Tips.js")),c=(t("common/wx/time.js"),t("biz_web/ui/dropdown.js")),r=t("ibeacon/awardDialog.js"),l=t("biz_web/ui/dateRange.js"),n=t("biz_common/moment.js"),o=t("common/wx/popover.js"),_=$("#js_title"),d=$("#js_title_tips"),m=$("#js_title_view"),u=$("#js_desc"),p=$("#js_desc_tips"),g=$("#js_desc_view"),w=$("#js_comment"),b=$("#js_comment_tips"),j=$(".js_img_select"),x=$(".js_img_view"),f=($(".js_prev"),
$(".js_submit")),v=$("#js_choose_cardticket"),h=$("#js_card"),D=($("#js_cardticket_check"),
$("#js_no_card_view"),$("#js_card_list_view"),$("#js_share")),Y=$("#js_share_tips"),k=$("#js_share_view"),y=$("#js_content"),M=$("#js_content_tips"),z=$("#js_content_view"),O=$("#js_rule_number"),T=($("#js_daterange"),
$("#js_time_view")),C=$("#js_activity_status"),N=null,S=null,L=(wx.cgiData.page.card_list||[],
{
page_id:wx.cgiData.page.page_id||0,
logo:wx.cgiData.page.logo||0,
logo_url:wx.cgiData.logo_url||"",
title:wx.cgiData.page.title||"",
comment:wx.cgiData.page.comment||"",
desc:wx.cgiData.page.desc||"",
card_list:wx.cgiData.page.card_list||[],
start_time:wx.cgiData.page.start_time||"",
end_time:wx.cgiData.page.end_time||"",
rule:{
type:wx.cgiData.rule_type||1,
content:wx.cgiData.rule_content||1,
desc:wx.cgiData.rule_desc||""
},
share_txt:wx.cgiData.share_txt
}),E=function(){
wx.cgiData.page.page_id||new e({
container:"#js_step_bar",
selected:2,
names:["1 选择页面类型","2 编辑页面"]
});
},R=function(){
new i({
input:_,
tip:d,
maxlimit:6,
trim:!0,
callback:function(t,e){
L.title=e.value.substr(0,6),m.html(L.title);
}
}),new i({
input:u,
tip:p,
maxlimit:7,
trim:!0,
callback:function(t,e){
L.desc=e.value.substr(0,7),g.html(L.desc);
}
}),j.on("click",function(){
var t=$(this);
t.hasClass("mod-edit__img-select_selected")||(L.logo=t.data("logo"),$(".mod-edit__img-select_selected").removeClass("mod-edit__img-select_selected"),
t.addClass("mod-edit__img-select_selected"),x.attr("src",t.find("img").attr("src")));
}),j.eq(wx.cgiData.page.logo||0).trigger("click");
},V=function(){
C.text(wx.cgiData.page.end_time<(new Date).valueOf()/1e3?"已结束":wx.cgiData.page.start_time>(new Date).valueOf()/1e3?"未开始":"进行中");
var t=L.start_time?n.unix(L.start_time).format("YYYY-MM-DD"):n.unix((new Date).valueOf()/1e3).format("YYYY-MM-DD"),e=L.end_time?n.unix(L.end_time).format("YYYY-MM-DD"):n.unix((new Date).valueOf()/1e3).format("YYYY-MM-DD");
S=l({
container:"#js_daterange",
startDate:t,
endDate:e,
minValidDate:n().startOf("day").valueOf()/1e3,
stopToday:!1,
timePicker:!0,
isTodayValid:!0,
theme:"ta",
success:function(t){
console.log(t);
var e=new Date(t.endDate).valueOf()/1e3,a=new Date(t.startDate).valueOf()/1e3;
return a>=e?(s.err("结束时间必须大于开始时间"),!1):(L.start_time=a,L.end_time=e,T.text(t.startDate+" -- "+t.endDate),
C.text(L.end_time<(new Date).valueOf()/1e3?"已结束":L.start_time>(new Date).valueOf()/1e3?"未开始":"进行中"),
void 0);
}
}),L.start_time&&T.text(n.unix(L.start_time).format("YYYY-MM-DD hh:mm:ss")+" -- "+n.unix(L.end_time).format("YYYY-MM-DD hh:mm:ss")),
N=new c({
container:"#js_rule_dropdown",
label:"本次活动",
data:[{
name:"本次活动",
value:1
},{
name:"每天",
value:2
}],
callback:function(t){
L.rule.type=t;
}
}),wx.cgiData.page.rule_type&&N.selected(wx.cgiData.page.rule_type-1,!1),O.on("keyup",function(){
O.val(O.val().replace(/[^0-9]/g,"")),Number(O.val())>100?O.val(100):"0"==O.val()&&O.val(1),
L.rule.content=O.val();
}),new i({
input:y,
tip:M,
maxlimit:200,
trim:!0,
callback:function(t,e){
var a=document.createElement("div");
$(a).text(e.value),L.rule.desc=$(a).html(),z.html(L.rule.desc.replace(/\n|\\n/g,"<br />"));
}
}),y.html(wx.cgiData.page.rule_desc),L.card_list&&L.card_list.length&&h.html(template.render("js_card_tpl",{
data:L.card_list
})),v.on("click",function(){
return L.card_list&&L.card_list.length>=10?(s.err("最多可添加10张卡券"),!1):void new r({
container:"#js_award_dialog",
cardList:L.card_list,
title:"配置奖品",
className:"dialog_process",
width:960,
onSubmit:function(){
console.log(this.cardList),L.card_list=this.cardList,h.html(template.render("js_card_tpl",{
data:L.card_list
}));
}
});
}),h.on("click",".js_del_card",function(){
var t=$(this);
new o({
dom:this,
hideIfBlur:!0,
content:"确定要删除此奖品？",
buttons:[{
text:"删除",
type:"primary",
click:function(){
for(var e=0;e<L.card_list.length;e++)L.card_list[e].card_id==t.data("card_id")&&L.card_list.splice(e,1);
for(var a=0,i=0,s=0,e=0;e<L.card_list.length;e++)a+=+L.card_list[e].gift_count;
for(var e=0;e<L.card_list.length;e++)L.card_list[e].probability=L.card_list[e].gift_count/a<.01?1:Math.floor(100*L.card_list[e].gift_count/a),
i+=+L.card_list[e].probability,L.card_list[e].probability>=L.card_list[s].probability&&(s=e);
100!=i&&0!=L.card_list.length&&(L.card_list[s].probability=100+ +L.card_list[s].probability-i),
h.html(template.render("js_card_tpl",{
data:L.card_list
})),this.remove();
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
}),new i({
input:w,
tip:b,
maxlimit:16,
trim:!0,
callback:function(t,e){
L.comment=e.value.substr(0,16);
}
}),new i({
input:D,
tip:Y,
maxlimit:16,
trim:!0,
className:"ui-c-red",
callback:function(t,e){
var a=document.createElement("div");
$(a).text(e.value),L.share_txt=$(a).html().substr(0,16),k.html(L.share_txt);
}
});
},q=function(){
f.on("click",function(){
return L.title?L.desc?L.start_time?L.card_list.length?L.rule.desc?L.rule.desc.length>200?(y.focus(),
s.err("活动规则不能超过200个字符"),!1):L.share_txt?$(".js_selectable").length?($(".js_selectable td").css({
color:"red"
}),window.scrollTo(0,h.offset().top/2),s.err("部分卡券状态不可用，请删除"),!1):void a.post({
url:wx.url("/merchant/beaconsavepage?action=draw"),
data:{
page:JSON.stringify(L)
},
success:function(t){
0==t.base_resp.ret?location.href=wx.url("/merchant/beaconlistpage?action=list&need_dc=1"):s.err("系统错误");
}
}):(D.focus(),s.err("请输入分享文案"),!1):(y.focus(),s.err("请输入活动规则"),!1):(s.err("请选择卡券"),
!1):(s.err("请选择抽奖时间"),!1):(u.focus(),s.err("请输入副标题"),!1):(_.focus(),s.err("请输入标题"),
!1);
});
},B=function(){
E(),R(),V(),q();
};
B();
});