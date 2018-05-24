define("cardticket/overview_user_analyze.js",["common/wx/top.js","common/wx/Tips.js","common/wx/Cgi.js","biz_common/moment.js","biz_web/lib/highcharts.js","biz_web/ui/dropdown.js","biz_web/ui/dateRange.js","cardticket/overview_enum.js","cardticket/init_card_list.js","common/wx/report_util.js","cardticket/topmenu.js","cardticket/common_template_helper.js"],function(t){
"use strict";
function e(){
$("#js_download").attr("href",wx.url("/merchant/cardstat?action=%s&start_time=%s&end_time=%s&card_id=%s").sprintf(j,u,h,w));
}
function a(){
o.get({
url:"/merchant/cardstat?action=analyzestat",
data:{
start_time:u,
end_time:h,
card_id:w
},
mask:!1
},function(t){
0==t.base_resp.ret?r(t):i.err("系统繁忙，请稍后重试");
});
}
function r(t){
var a=$.parseJSON(t.gender_data),r=$.parseJSON(t.store_data);
s(a),n(r),e();
}
function n(t){
for(var e=t.list,a=e.length,r=0,n=0;a>n;n++){
var s=e[n];
r+=s.verify_cnt;
}
$("#js_store_table").html(template.render("js_store_tpl",{
report_store:e,
total:r
})),$("#js_store_chart_table").html(template.render("js_store_chart_tpl",{
report_store:e,
total:r
}));
}
function s(t){
var e=[],t=t.list,a=t.length,r=0;
if(a>0){
for(var n=0;a>n;n++){
var s=t[n],i=f.gender_map[s.gender]||"未知";
e.push({
data:[s.verify_cnt],
name:i
}),r+=s.verify_cnt;
}
b.initBarChart({
domId:"js_gender_chart",
data:e
});
}else $("#js_gender_chart").html('<p class="empty_tips">暂无数据</p>');
$("#js_gender_table").html(template.render("js_gender_tpl",{
report_gender:t,
total:r
}));
}
var i=(t("common/wx/top.js"),t("common/wx/Tips.js")),o=t("common/wx/Cgi.js"),c=t("biz_common/moment.js"),_=(t("biz_web/lib/highcharts.js"),
t("biz_web/ui/dropdown.js")),d=(t("biz_web/ui/dateRange.js"),t("cardticket/overview_enum.js")),m=(d.sort_key,
c().add("d",-7).format("YYYY-MM-DD")),l=c().add("d",-1).format("YYYY-MM-DD"),j=(d.sort_type,
"genderstatdownload"),p=t("cardticket/init_card_list.js"),b=t("common/wx/report_util.js"),u=m,h=l,w="";
t("cardticket/topmenu.js").selected("cardstat");
var f=t("cardticket/common_template_helper.js");
p({
container:"#js_all_card",
callback:function(t){
w=t,a();
}
}),b.initDateRange({
begintime:u,
endtime:h,
dropDom:"#js_date_filter",
dateDom:"#js_dateRange",
showUnlimit:!0,
callback:function(t,e){
u=t,h=e,a();
}
});
var g=$(".js_table_data_wrp");
new _({
container:"#js_table_filter",
data:[{
name:"用户性别分布",
value:"#js_gender_table"
},{
name:"核销门店分布",
value:"#js_store_table"
}],
callback:function(t){
if(g.hide(),t){
var a=$(t).show(),r=a.attr("action");
j=r,e();
}
}
}).selected(0),a();
});