define("news/news_list.js",["common/wx/popup.js","common/wx/pagebar.js"],function(a){
"use strict";
a("common/wx/popup.js");
{
var n=a("common/wx/pagebar.js");
wx.cgiData;
}
!function(){
{
var a=wx.cgiData.total_count,t=wx.cgiData.count,o=wx.cgiData.begin;
new n({
container:".pageNavigator",
perPage:t,
first:!1,
last:!1,
isSimple:!0,
initShowPage:o,
totalItemsNum:a,
callback:function(a){
var n=a.currentPage;
if(n!=o)return n--,location.href=wx.url("/cgi-bin/announce?action=getannouncementlist&start="+(n+1)),
!1;
}
});
}
}();
});