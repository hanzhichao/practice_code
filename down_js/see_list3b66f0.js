define("statistics/see_list.js",["biz_web/ui/dateRange.js","biz_common/moment.js","statistics/article/top.js","common/wx/pagebar.js"],function(a){
"use strict";
var t=a("biz_web/ui/dateRange.js"),i=a("biz_common/moment.js"),e=a("statistics/article/top.js"),n=a("common/wx/pagebar.js");
e.selected("video_article");
var d={
START:i().subtract(6,"days").format("YYYY-MM-DD"),
END:i().format("YYYY-MM-DD"),
MINTIME:i().subtract(90,"days").format("YYYY-MM-DD"),
MAXTIME:i().format("YYYY-MM-DD")
};
t({
container:".js_TB_defaultDateRangeBox",
isTodayValid:!0,
startDate:cgiData.begin_date||d.START,
endDate:cgiData.end_date||d.END,
minValidDate:d.MINTIME,
maxValidDate:d.MAXTIME,
needCompare:!1,
defaultText:" 到 ",
theme:"ta",
success:function(a){
location.href=wx.url("/misc/appmsganalysis?action=video_article&begin_date="+a.startDate+"&end_date="+a.endDate);
}
});
var s=[];
if(window.cgiData.total_video_article_data){
var o=JSON.parse(window.cgiData.total_video_article_data);
s=o.list||[];
var c=o.total_count,r=cgiData.count,l=cgiData.begin;
!function(a){
{
var t=l/r+1;
new n({
container:"#js_pageNavigator",
perPage:r,
first:!1,
last:!1,
isSimple:!0,
initShowPage:t,
totalItemsNum:a,
callback:function(a){
var i=a.currentPage;
if(i!=t)return i--,location.href=wx.url("/misc/appmsganalysis?action=video_article&begin=%s&count=%s".sprintf(r*i,r)),
!1;
}
});
}
}(c);
}
$("#js_TB_body").html(template.render("js_TB_tpl",{
data:s
})),$(".js_TB_data_detail").on("click",function(){
var a=$(this),t="misc/appmsganalysis?action=video_article_detail&title="+a.data("title")+"&vid="+a.data("vid")+"&idx="+a.data("idx")+"&msgid="+a.data("msgid")+"&public_date="+a.data("public_date");
window.cgiData.begin_date&&window.cgiData.end_date&&(t+="&begin_date="+window.cgiData.begin_date+"&end_date="+window.cgiData.end_date),
window.open(wx.url(t));
});
});