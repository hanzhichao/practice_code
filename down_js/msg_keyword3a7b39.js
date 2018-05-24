define("statistics/msg_keyword.js",["statistics/tab-bar/msg-keyword-tab.js","statistics/msg_top.js","statistics/tooltip.js","biz_common/moment.js","common/wx/Cgi.js","common/wx/report_util.js","statistics/common.js"],function(t){
"use strict";
function e(){
D.show();
}
function a(){
D.hide();
}
function s(t,e){
for(var a=[],s=[],n=0,o=(E.page-1)*E.pagesize,i=o+E.pagesize,d=0;d<t.length;d++)(!e||t[d].keyword.indexOf(e)>=0)&&(a.push(t[d]),
n+=t[d].exp_count);
for(var d=o;i>d&&d<a.length;d++)s.push(a[d]);
return{
render_data:s,
count:n,
filter_data:a
};
}
function n(){
var t=s(x,E.keyword);
$("#js_keyword").html(template.render("js_keyword_tpl",{
data:t.render_data,
total_count:t.count
}));
var e=t.filter_data.length;
g.initPager({
total_count:e,
container:"#js_pagebar",
count:E.pagesize,
currentPage:E.page,
callback:function(t){
t!=E.page&&(E.page=t,n());
}
});
}
function o(){
$("#js_download_detail").attr("href",wx.url("/misc/messageanalysis?action=keyword&download=1"+"&type=%s&begin_date=%s&end_date=%s".sprintf(E.type,E.begin_date,E.end_date)));
}
function i(){
m||(m=!1,e(),j("load keyword data"),_.get({
url:wx.url("/misc/messageanalysis?type=%s&action=keyword&begin_date=%s&end_date=%s".sprintf(E.type,E.begin_date,E.end_date)),
success:function(t){
var e=b("load keyword data");
f(y,e,k),0==t.base_resp.ret?(x=t.list,n(),o()):_.handleRet(t,{
id:"64527",
key:"10"
}),a();
}
}));
}
var d=t("statistics/tab-bar/msg-keyword-tab.js"),r=t("statistics/msg_top.js");
t("statistics/tooltip.js"),r.selected("msg_keyword");
var c=t("biz_common/moment.js"),_=t("common/wx/Cgi.js"),g=t("common/wx/report_util.js"),l="YYYY-MM-DD",p=c().add("d",-1).format(l),m=!1,u=c().add("d",-30).format(l),w=t("statistics/common.js"),y=w.reportKeys.LOAD_KEYWORD_DATA_AJAX_KEY,f=w.ajaxReport,j=w.time,b=w.timeEnd,k=wx.data.uin,h=wx.cgiData,v={
type:"-1",
begin_date:u,
end_date:p,
keyword:"",
page:1,
pagesize:10
},E=$.extend(!0,{},v,h.filter),x=h.keyword_list;
d.init(E),d.tabBar.on("tab-selected",function(t,e){
E.type=e.type,i();
}),d.dateEvent.on("date-change",function(t){
E.begin_date=t.startDate,E.end_date=t.endDate,i();
}),d.dateEvent.on("search-change",function(t){
E.keyword=t,n();
});
var D=$("div.wrp_overview div.wrp_loading");
n(),o(),function(){
"0"===wx.cgiData.load_done?$(".js_delay_info").show():$(".js_delay_info").hide();
}(),seajs.use("statistics/report.js",function(t){
t(w.logKeys.MSG_KEYWORD_NETWORK_OVERTIME,w.logKeys.MSG_KEYWORD_JS_OVERTIME,w.reportKeys.MSG_KEYWORD_PAGE);
});
});