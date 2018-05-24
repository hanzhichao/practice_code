define("cardticket/overview_member.js",["common/wx/report_util.js","common/wx/Tips.js","common/wx/Cgi.js","biz_common/moment.js","biz_web/ui/dropdown.js","common/wx/top.js","cardticket/overview_enum.js","cardticket/topmenu.js","cardticket/common_template_helper.js","cardticket/common_init.js"],function(t){
"use strict";
function e(){
var t=m(u,n).unix(),o=m(w,n).unix();
$("#js_download").attr("href",wx.url("/merchant/cardstat?action=membercardoverviewstatdownload&start_time=%s&end_time=%s&sort_key=%s&sort_type=%s").sprintf(t,o,_.time,j.desc)),
i.get({
url:"/merchant/cardstat?action=membercardoverviewstat",
data:{
start_time:t,
end_time:o,
begin:(p-1)*v,
count:v,
sort_key:_.time,
sort_type:j.desc
},
mask:!1
},function(t){
if(0==t.base_resp.ret){
{
var o=$.parseJSON(t.data),i=o.list;
i.length;
}
$("#js_overview_list").html(template.render("js_overview_tpl",{
data:i
})),l=o.total_count,r.initPager({
total_count:l,
container:"#js_pagebar",
count:v,
currentPage:p,
callback:function(t){
t!=p&&(p=t,e());
}
});
}else a.err("系统繁忙，请稍后重试");
});
}
function o(){
e();
}
var r=t("common/wx/report_util.js"),a=t("common/wx/Tips.js"),i=t("common/wx/Cgi.js"),m=t("biz_common/moment.js"),n=(t("biz_web/ui/dropdown.js"),
wx.cgiData,"YYYY-MM-DD"),c=m().add("d",-7).format(n),s=m().add("d",-1).format(n),d=(t("common/wx/top.js"),
t("cardticket/overview_enum.js")),_=d.sort_key,j=d.sort_type;
t("cardticket/topmenu.js").selected("cardmgr_member"),t("cardticket/common_template_helper.js");
var l,p=1,u=c,w=s,v=10;
r.initDateRange({
begintime:u,
endtime:w,
dropDom:"#js_table_date_filter",
dateDom:"#js_dateRange2",
showUnlimit:!0,
callback:function(t,o){
u=t,w=o,e();
}
}),o(),t("cardticket/common_init.js");
});