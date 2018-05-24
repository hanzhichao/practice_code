define("home/notice.js",["common/wx/pagebar.js"],function(t){
"use strict";
{
var a=t("common/wx/pagebar.js"),e=wx.cgiData.total_count,n=wx.cgiData.count,i=wx.cgiData.begin;
new a({
container:".pageNavigator",
perPage:n,
first:!1,
last:!1,
isSimple:!0,
initShowPage:i,
totalItemsNum:e,
callback:function(t){
var a=t.currentPage;
if(a!=i)return a--,location.href=wx.url("/cgi-bin/announcement?t=home/notice&start="+(a+1)),
!1;
}
});
}
});