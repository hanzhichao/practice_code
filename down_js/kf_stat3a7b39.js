define("services/kf_stat.js",["common/wx/popup.js","common/wx/top.js","common/wx/popover.js","biz_common/moment.js","biz_web/ui/dateRange.js","common/wx/Cgi.js","common/wx/Tips.js","biz_common/virtual-template.js"],function(t){
"use strict";
function e(t){
var e=0;
return $.each(t,function(t,a){
e+=a.stat_data.msg_send||0;
}),e;
}
function a(t){
var e=0;
return $.each(t,function(t,a){
e+=a.stat_data.session_count||0;
}),e;
}
function n(){
var t={};
t.start_time=d(m.getCurrentDate().startDate,"YYYY-MM-DD").unix(),t.end_time=d(m.getCurrentDate().endDate,"YYYY-MM-DD").unix(),
f&&(t.kf_openid=f),r.get({
url:"/misc/kf?action=getstat",
mask:!0,
data:t
},function(t){
if(0==t.base_resp.ret){
var n=t.kf_stat_list_by_date&&t.kf_stat_list_by_date.stat_list||[];
u.setData({
tab:"day",
accept_cnt:a(n),
reply_cnt:e(n),
stat_day:n,
stat_kf:t.kf_stat_list_by_kf&&t.kf_stat_list_by_kf.stat_list||[]
});
}else r.handleRet(t,{
id:64462,
key:6,
url:"/misc/kf?action=getstat"
});
});
}
function s(){
var t=this;
t.fragments=["page_nav","kf_info","main"],$.each(this.fragments,function(n,s){
var i=$("#tpl_"+s).html(),o=l(template.compile(i));
_.accept_cnt=a(_.stat_day),_.reply_cnt=e(_.stat_day),t[s]=new o(_),$("#js_"+s).html(t[s].dom);
});
}
t("common/wx/popup.js");
var i=t("common/wx/top.js"),o=t("common/wx/popover.js"),d=t("biz_common/moment.js"),c=t("biz_web/ui/dateRange.js"),r=t("common/wx/Cgi.js"),l=(t("common/wx/Tips.js"),
t("biz_common/virtual-template.js"));
new i("#js_tab",i.DATA.kf).selected(1);
var m,_=wx.cgiData,f=_.kf_openid;
template.helper("formatDate",function(t){
return d.unix(t).format("YYYY-MM-DD");
}),$(".jsDay").click(function(t){
$(this).addClass("selected").siblings().removeClass("selected");
var e=$(this).data("start"),a=$(this).data("end");
e=d().add(e,"days").format("YYYY-MM-DD"),a=d().add(a,"days").format("YYYY-MM-DD"),
m=c({
container:"#dateRange",
startDate:e,
endDate:a,
theme:"ta",
stopToday:!1,
dayRangeMax:60,
isTodayValid:!0,
monthRangeMax:0,
success:function(){
$(".jsDay").removeClass("selected"),n();
}
}),t.isTrigger||n();
}).eq(0).trigger("click"),s.prototype.setData=function(t){
var e=this;
$.each(e.fragments,function(a,n){
e[n].setData(t);
});
};
var u=window.vt=new s;
new o({
dom:"#tips",
content:$("#tpl_tips").html(),
hideIfBlur:!0,
isToggle:!0,
hover:!0
}).hide(),$("#js_switcher").on("click","li",function(){
var t=$(this).find("a").data("tab");
u.setData({
tab:t
});
}),$("#js_page_nav").on("click",".js_prev",function(){
location.href=wx.url("/misc/kf?action=getstatpage");
}),$("#js_download").on("click",function(){
function t(){
o=!0,r.get({
url:"/misc/kfdownload?action=checkmsgcount",
data:{
kf_openid:f||"",
start_time:d(a.getCurrentDate().startDate,"YYYY-MM-DD").unix(),
end_time:d(a.getCurrentDate().endDate,"YYYY-MM-DD").add(1,"days").unix()
}
},function(t){
o=!0;
var e=t.base_resp&&t.base_resp.ret;
0==e?i.enable():158e3==e?(i.disable(),f?s.find(".js_warn").text("数据过于庞大无法下载，请修改数据时间。").show():s.find(".js_warn").text("数据过于庞大无法下载，请修改数据时间或下载单个客服的数据。").show()):158001==e?(i.disable(),
s.find(".js_warn").text("下载过于频繁，请稍后再试。").show()):r.handleRet(t,{
id:64462,
key:7,
url:"/misc/kfdownload?action=checkmsgcount"
});
});
}
function e(){
var t=d(a.getCurrentDate().startDate,"YYYY-MM-DD").unix(),e=d(a.getCurrentDate().endDate,"YYYY-MM-DD").add(1,"days").unix(),n=wx.url("/misc/kfdownload?action=download&start_time=%s&end_time=%s".sprintf(t,e));
f&&(n+="&kf_openid="+f),window.open(n);
}
var a,n=$("#tpl_download").popup({
title:"选择下载内容",
className:"download_dialog",
buttons:[{
text:"下载",
type:"primary",
click:function(){
i.hasClass("btn_disabled")||e();
}
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}],
onHide:function(){
this.remove();
}
}),s=n.popup("get"),i=s.find(".js_btn_p").eq(0).disable(),o=!1;
s.find(".js_day").on("click",function(){
s.find(".js_warn").hide(),$(this).addClass("selected").siblings().removeClass("selected");
var e=$(this).data("start"),n=$(this).data("end")||0;
e=d().add(e,"days").format("YYYY-MM-DD"),n=d().add(n,"days").format("YYYY-MM-DD"),
a=c({
container:s.find(".js_datepicker"),
startDate:e,
endDate:n,
theme:"ta",
stopToday:!0,
dayRangeMax:30,
minValidDate:(new Date).getTime()/1e3-2592e3,
isTodayValid:!0,
monthRangeMax:0,
success:function(){
s.find(".js_day").removeClass("selected"),s.find(".js_warn").hide(),i.disable(),
t();
}
}),i.disable(),t();
}).eq(0).trigger("click");
});
});