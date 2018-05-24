define("cardticket/overview_detail.js",["common/wx/top.js","common/wx/Tips.js","common/wx/Cgi.js","biz_common/moment.js","biz_web/ui/dropdown.js","common/wx/report_util.js","common/qq/queryString.js","cardticket/parse_data.js","cardticket/overview_enum.js","cardticket/init_card_list.js","cardticket/topmenu.js","cardticket/common_template_helper.js","cardticket/common_init.js"],function(t){
"use strict";
function e(){
var t=parseInt((_(M,"YYYY-MM-DD").unix()-_(Y,"YYYY-MM-DD").unix())/86400)+10;
return C?void c.get({
url:"/merchant/cardstat?action=get_membercard_detail_stat",
data:{
begin_date:Y,
end_date:M,
begin:0,
count:t||1e3,
sort_key:j.time,
sort_type:k.asc,
card_id:x,
task_id:wx.cgiData.task_id,
ispay:wx.cgiData.ispay
},
mask:!1
},function(t){
if(0==t.base_resp.ret){
var e=$.parseJSON(t.data);
i(e.record);
}else s.err("系统繁忙，请稍后重试");
}):void c.get({
url:"/merchant/cardstat?action=carddetailstat",
data:{
start_time:Y,
end_time:M,
begin:0,
count:t||1e3,
sort_key:j.time,
sort_type:k.asc,
card_id:x,
task_id:wx.cgiData.task_id,
ispay:wx.cgiData.ispay
},
mask:!1
},function(t){
if(0==t.base_resp.ret){
var e=$.parseJSON(t.data);
i(e.list);
}else s.err("系统繁忙，请稍后重试");
});
}
function a(t){
for(var e=0;e<R.length;e++)if(t==R[e])return!0;
}
function i(t){
t||(t=q);
var e=[],i=t.length;
if(i>0){
q=t;
for(var r=0;i>r;r++){
var n=t[r];
e.push({
y:a(D)?n[D]/100:"verify_noself_cnt"==D?n.verify_cnt>0?parseFloat(((n.verify_cnt-n.verify_friends_cnt)/n.verify_cnt*100).toFixed(2)):0:n[D],
name:C?n.ref_date:n.stat_date,
date:C?n.ref_date:n.stat_date
});
}
o.initChart({
domId:"chartContain",
data:e,
isFee:a(D),
isPercent:"verify_noself_cnt"==D
});
}else $("#chartContain").html('<p class="empty_tips">暂无数据</p>');
}
function r(){
return C?($("#js_download").attr("href",wx.url("/merchant/cardstat?action=download_membercard_detail_stat&begin_date=%s&end_date=%s&sort_key=%s&sort_type=%s&card_id=%s&ispay=%s&task_id=%s").sprintf(F,J,j.time,k.desc,x,wx.cgiData.ispay,wx.cgiData.task_id)),
void c.get({
url:"/merchant/cardstat?action=get_membercard_detail_stat",
data:{
begin_date:F,
end_date:J,
begin:(z-1)*w,
count:w,
card_id:x,
task_id:wx.cgiData.task_id,
sort_key:j.time,
sort_type:k.desc,
ispay:wx.cgiData.ispay
},
mask:!1
},function(t){
if(0==t.base_resp.ret){
{
var e=$.parseJSON(t.data),a=e.record;
a.length;
}
$("#js_overview_list").html(template.render("js_overview_tpl",{
data:a,
is_sns_card:f.is_sns_card,
is_member:C
})),P=e.total_count,o.initPager({
total_count:P,
container:"#js_pagebar",
count:w,
currentPage:z,
callback:function(t){
t!=z&&(z=t,r());
}
});
}else s.err("系统繁忙，请稍后重试");
})):($("#js_download").attr("href",wx.url("/merchant/cardstat?action=carddetailstatdownload&start_time=%s&end_time=%s&sort_key=%s&sort_type=%s&card_id=%s&ispay=%s&task_id=%s").sprintf(F,J,j.time,k.desc,x,wx.cgiData.ispay,wx.cgiData.task_id)),
void c.get({
url:"/merchant/cardstat?action=carddetailstat",
data:{
start_time:F,
end_time:J,
begin:(z-1)*w,
count:w,
card_id:x,
task_id:wx.cgiData.task_id,
sort_key:j.time,
sort_type:k.desc,
ispay:wx.cgiData.ispay
},
mask:!1
},function(t){
if(0==t.base_resp.ret){
{
var e=$.parseJSON(t.data),a=e.list;
a.length;
}
$("#js_overview_list").html(template.render("js_overview_tpl",{
data:a,
is_sns_card:f.is_sns_card,
is_member:C
})),P=e.total_count,o.initPager({
total_count:P,
container:"#js_pagebar",
count:w,
currentPage:z,
callback:function(t){
t!=z&&(z=t,r());
}
});
}else s.err("系统繁忙，请稍后重试");
}));
}
function n(){
e(),r();
}
var s=(t("common/wx/top.js"),t("common/wx/Tips.js")),c=t("common/wx/Cgi.js"),_=t("biz_common/moment.js"),d=t("biz_web/ui/dropdown.js"),o=t("common/wx/report_util.js"),m=wx.cgiData,l=_().add("d",-7).format("YYYY-MM-DD"),u=_().add("d",-1).format("YYYY-MM-DD"),p=(t("common/wx/top.js"),
t("common/qq/queryString.js")),v=new p,f=m.card,w=10,g=t("cardticket/parse_data.js"),y=t("cardticket/overview_enum.js"),j=y.sort_key,k=y.sort_type,b="",x="",h=t("cardticket/init_card_list.js");
t("cardticket/topmenu.js").selected("card_data"),template.helper("$tofix",function(t,e){
if(!t.verify_cnt)return 0;
var a=t.verify_friends_cnt/t.verify_cnt*100,i=new RegExp("\\.[\\d]{"+e+",}");
return i.test(a+"")?a.toFixed(e):a;
});
t("cardticket/common_template_helper.js");
f.card_type&&(f=g.parse_cardticket(f),b=f.title,x=f.id),wx.cgiData.task_id?$("#js_all_card").text(f.title):h({
container:"#js_all_card",
card_name:b,
card_id:x,
ispay:wx.cgiData.ispay,
callback:function(t){
location.href=v.replace("card_id",t).getUrl();
},
initComplete:function(){
$("#js_all_card").find("li.dropdown_data_item").first().hide();
}
});
var D="verify_cnt",Y=l,M=u,q=[],C=10==f.type,S=[{
name:"使用人数趋势图",
value:"verify_user"
},{
name:"使用次数趋势图",
value:"verify_cnt"
},{
name:"领取人数趋势图",
value:"receive_user"
},{
name:"领取次数趋势图",
value:"receive_cnt"
}];
C?S=[{
name:"使用人数趋势图",
value:"verify_user"
},{
name:"使用次数趋势图",
value:"verify_cnt"
},{
name:"领取人数趋势图",
value:"receive_user"
},{
name:"领取次数趋势图",
value:"receive_cnt"
},{
name:"浏览人数趋势图",
value:"view_user"
},{
name:"浏览次数趋势图",
value:"view_cnt"
},{
name:"新增会员趋势图",
value:"new_user"
},{
name:"总会员数趋势图",
value:"total_user"
},{
name:"实收金额趋势图",
value:"fee"
}]:(f.is_sns_card&&S.push({
name:"他销占比趋势图",
value:"verify_noself_cnt"
}),S.push({
name:"浏览人数趋势图",
value:"view_user"
}),S.push({
name:"浏览次数趋势图",
value:"view_cnt"
}));
new d({
container:"#js_chart_filter",
label:"使用人数趋势图",
data:S,
callback:function(t){
D=t,e();
}
});
o.initDateRange({
begintime:Y,
endtime:M,
dropDom:"#js_chart_date_filter",
dateDom:"#js_dateRange",
showUnlimit:!0,
callback:function(t,a){
Y=t,M=a,e();
}
});
var P,R=["fee"],z=1,F=l,J=u,w=10;
o.initDateRange({
begintime:F,
endtime:J,
dropDom:"#js_table_date_filter",
dateDom:"#js_dateRange2",
callback:function(t,e){
F=t,J=e,r();
}
}),n(),t("cardticket/common_init.js");
});