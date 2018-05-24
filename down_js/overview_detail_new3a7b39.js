define("cardticket/overview_detail_new.js",["common/wx/top.js","common/wx/Tips.js","common/wx/Cgi.js","biz_common/moment.js","biz_web/ui/dropdown.js","common/wx/report_util.js","common/qq/queryString.js","cardticket/parse_data.js","cardticket/overview_enum.js","cardticket/init_card_list.js","cardticket/topmenu.js","cardticket/common_template_helper.js","cardticket/common_init.js"],function(t){
"use strict";
function a(){
var t=parseInt((o(J,"YYYY-MM-DD").unix()-o(I,"YYYY-MM-DD").unix())/86400)+10;
d.get({
url:C,
data:{
start_time:I,
end_time:J,
begin:0,
count:t||100,
sort_key:y.time,
sort_type:D.asc,
card_id:Y,
task_id:wx.cgiData.task_id,
provide_card_id:h,
channel_id:k,
ispay:wx.cgiData.ispay
},
mask:!1
},function(t){
if(0==t.base_resp.ret){
var a=$.parseJSON(t.data);
e(a.list);
}else s.err("系统繁忙，请稍后重试");
});
}
function e(t){
t||(t=N);
var a=[],e=t.length;
if(e>0){
N=t;
for(var i=0;e>i;i++)a.push({
y:t[i][S],
name:t[i].stat_date,
date:t[i].stat_date
});
m.initChart({
domId:"chartContain",
data:a
});
}else $("#chartContain").html('<p class="empty_tips">暂无数据</p>');
}
function i(){
$("#js_download").attr("href",wx.url(z+"&start_time=%s&end_time=%s&sort_key=%s&sort_type=%s&card_id=%s&channel_id=%s&provide_card_id=%s&ispay=%s&task_id=%s").sprintf(T,U,y.time,D.desc,Y,k,h,wx.cgiData.ispay,wx.cgiData.task_id)),
d.get({
url:C,
data:{
start_time:T,
end_time:U,
begin:(P-1)*g,
count:g,
card_id:Y,
task_id:wx.cgiData.task_id,
provide_card_id:h,
channel_id:k,
sort_key:y.time,
sort_type:D.desc,
ispay:wx.cgiData.ispay
},
mask:!1
},function(t){
if(0==t.base_resp.ret){
{
var a=$.parseJSON(t.data),e=a.list;
e.length;
}
O=a.total_count||e.length,A=e,n(),c();
}else s.err("系统繁忙，请稍后重试");
});
}
function n(){
for(var t=[],a=g*(P-1),e=a+g,i=a;e>i&&i<A.length;i++)t.push(A[i]);
$("#js_overview_list").html(template.render("js_overview_tpl",{
data:t
}));
}
function c(){
m.initPager({
total_count:O,
container:"#js_pagebar",
count:g,
currentPage:P,
callback:function(t){
t!=P&&(P=t,n());
}
});
}
function r(){
a(),i();
}
var s=(t("common/wx/top.js"),t("common/wx/Tips.js")),d=t("common/wx/Cgi.js"),o=t("biz_common/moment.js"),_=t("biz_web/ui/dropdown.js"),m=t("common/wx/report_util.js"),l=wx.cgiData,p=o().add("d",-7).format("YYYY-MM-DD"),u=o().add("d",-1).format("YYYY-MM-DD"),v=(t("common/wx/top.js"),
t("common/qq/queryString.js")),j=new v,w=l.card,g=10,f=t("cardticket/parse_data.js"),k="",h="",x=t("cardticket/overview_enum.js"),y=x.sort_key,D=x.sort_type,b="",Y="",M=t("cardticket/init_card_list.js"),q=!!wx.cgiData.task_id,C="",z="",R=t("cardticket/topmenu.js");
R.selected(q?"cardsend":"cardmgr"),q?(C="/merchant/card_intercomm?action=getstat",
z="/merchant/card_intercomm?action=carddetailstatdownload"):(C="/merchant/cardstat?action=carddetailstat",
z="/merchant/cardstat?action=carddetailstatdownload");
t("cardticket/common_template_helper.js");
w.card_type&&(w=f.parse_cardticket(w),b=w.title,Y=w.id),wx.cgiData.task_id?$("#js_all_card").text(w.title):M({
container:"#js_all_card",
card_name:b,
card_id:Y,
ispay:wx.cgiData.ispay,
callback:function(t){
location.href=j.replace("card_id",t).getUrl();
},
initComplete:function(){
$("#js_all_card").find("li.dropdown_data_item").first().hide();
}
});
{
var S="verify_cnt",I=p,J=u,N=[];
new _({
container:"#js_chart_filter",
label:"使用次数趋势图",
data:[{
name:"使用次数趋势图",
value:"verify_cnt"
},{
name:"使用人数趋势图",
value:"verify_user"
},{
name:"领取次数趋势图",
value:"receive_cnt"
},{
name:"领取人数趋势图",
value:"receive_user"
},{
name:"浏览次数趋势图",
value:"view_cnt"
},{
name:"浏览人数趋势图",
value:"view_user"
},{
name:"转赠次数趋势图",
value:"given_cnt"
},{
name:"转赠人数趋势图",
value:"given_user"
},{
name:"过期次数趋势图",
value:"expire_cnt"
},{
name:"过期人数趋势图",
value:"expire_user"
}],
callback:function(t){
S=t,e();
}
});
}
m.initDateRange({
begintime:I,
endtime:J,
dropDom:"#js_chart_date_filter",
dateDom:"#js_dateRange",
showUnlimit:!0,
callback:function(t,e){
I=t,J=e,a();
}
});
var O,P=1,T=p,U=u,g=10,A=[];
m.initDateRange({
begintime:I,
endtime:J,
dropDom:"#js_table_date_filter",
dateDom:"#js_dateRange2",
callback:function(t,a){
T=t,U=a,i();
}
}),r(),t("cardticket/common_init.js");
});