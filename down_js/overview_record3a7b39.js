define("cardticket/overview_record.js",["common/wx/top.js","common/wx/Tips.js","common/wx/Cgi.js","biz_common/moment.js","biz_web/ui/dropdown.js","common/wx/report_util.js","cardticket/overview_enum.js","cardticket/topmenu.js","cardticket/common_template_helper.js"],function(t){
"use strict";
function e(){
$("#js_download").attr("href",wx.url("/merchant/ecardreport?action=channeldownload&start_time=%s&end_time=%s&sort_key=%s&sort_type=%s").sprintf(d,_,j.time,u.desc)),
r.get({
url:"/merchant/ecardreport?action=channel",
data:{
start_time:d,
end_time:_,
begin:(a-1)*c,
count:c,
sort_key:w,
sort_type:k
},
mask:!1
},function(t){
if(0==t.base_resp.ret){
{
var r=$.parseJSON(t.report_comm),n=r.report_list;
n.length;
}
$("#js_record_list").html(template.render("js_record_tpl",{
data:n
})),i=r.total_count,l.initPager({
total_count:i,
currentPage:a,
count:c,
callback:function(t){
t!=a&&(a=t,e());
}
});
}else o.err("系统繁忙，请稍后重试");
});
}
var o=(t("common/wx/top.js"),t("common/wx/Tips.js")),r=t("common/wx/Cgi.js"),n=t("biz_common/moment.js"),c=(t("biz_web/ui/dropdown.js"),
10),a=1,i=0,s=n().add("d",-7).format("YYYY-MM-DD"),m=n().add("d",-1).format("YYYY-MM-DD"),d=s,_=m,l=t("common/wx/report_util.js"),p=t("cardticket/overview_enum.js"),j=p.sort_key,u=p.sort_type,w=j.time,k=j.desc;
t("cardticket/topmenu.js").selected("cardstat"),t("cardticket/common_template_helper.js"),
l.initDateRange({
begintime:d,
endtime:_,
dropDom:"#js_date_filter",
dateDom:"#js_dateRange",
showUnlimit:!0,
callback:function(t,o){
d=t,_=o,a=1,e();
}
}),l.initRankOnce({
callback:function(t){
w=t.sortkey,k=t.sorttype,a=1,e();
}
}),e();
});