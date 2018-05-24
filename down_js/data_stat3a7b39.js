define("services/data_stat.js",["biz_common/moment.js","biz_web/ui/dateRange.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/popover.js"],function(t){
"use strict";
function a(t){
var a=0,e=0;
if(t&&t.length>0){
var n=[];
t.each(function(t){
n.push({
time:s.unix(t.date).format("YYYY-MM-DD"),
msg_send:t.stat_data.msg_send,
session_count:t.stat_data.session_count
}),a+=t.stat_data.msg_send,e+=t.stat_data.session_count;
}),$("#list").html(template.render("tpl",{
data:n
})),$("#t_session_count").text(e),$("#t_msg_send").text(a);
}
}
function e(){
var t={};
t.start_time=s(m.getCurrentDate().startDate,"YYYY-MM-DD").unix(),t.end_time=s(m.getCurrentDate().endDate,"YYYY-MM-DD").unix(),
i.get({
url:"/misc/kf?action=getstat&kf_openid="+wx.cgiData.kf_openid,
mask:!0,
data:t
},function(t){
0==t.base_resp.ret?(wx.cgiData.data.stat_list=t.kf_stat_list.stat_list,a(wx.cgiData.data.stat_list)):o.err();
});
}
var s=t("biz_common/moment.js"),n=t("biz_web/ui/dateRange.js"),i=t("common/wx/Cgi.js"),o=t("common/wx/Tips.js"),d=t("common/wx/popover.js"),m=n({
container:"#dateRange",
startDate:s().format("YYYY-MM-DD"),
endDate:s().format("YYYY-MM-DD"),
theme:"ta",
dayRangeMax:60,
monthRangeMax:0,
isTodayValid:!0,
success:function(){
$(".jsDay").removeClass("selected"),e();
}
});
new d({
dom:$("#ask"),
content:$("#ask_tpl").html(),
hideIfBlur:!0,
isToggle:!0,
hover:!0
}).hide(),$(".jsDay").click(function(){
$(this).addClass("selected").siblings().removeClass("selected");
var t=$(this).data("start"),a=$(this).data("end");
t=s().add("days",t).format("YYYY-MM-DD"),a=s().add("days",a).format("YYYY-MM-DD"),
m=n({
container:"#dateRange",
startDate:t,
endDate:a,
theme:"ta",
stopToday:!1,
dayRangeMax:60,
isTodayValid:!0,
monthRangeMax:0,
success:function(){
$(".jsDay").removeClass("selected"),e();
}
}),e();
}),a(wx.cgiData.data.stat_list);
});