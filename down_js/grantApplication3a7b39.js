define("original/grantApplication.js",["common/wx/top.js","biz_common/moment.js","common/wx/Tips.js","common/wx/pagebar.js"],function(a){
"use strict";
var t=template.render,n=a("common/wx/top.js"),e=a("biz_common/moment.js"),i=a("common/wx/Tips.js"),o=a("common/wx/pagebar.js");
cgiData.data=JSON.parse(cgiData.data.html(!1));
!function c(){
var a=cgiData.data.list;
if(new n("#topTab",n.DATA.mass).selected("jurisdiction"),$(".js_highlight_box").html(t("tpl_highlight_box",{
token:cgiData.token,
selected:3
})),cgiData.data){
if($(".js_allApplyBtn").append("("+cgiData.data.total_num+")"),$(".js_getApplicationBtn").append("("+cgiData.data.auth_num+")"),
a.length)for(var m=0;a[m];m++)a[m].apply_time=e.unix(a[m].apply_time).format("YYYY-MM-DD HH:mm");
$(".js_table_content").html(t("tpl_table_content",{
list:a
}));
{
var s=0==cgiData.auth_status?cgiData.data.total_num:cgiData.data.auth_num;
new o({
container:".js_pageNavigator",
perPage:parseInt(cgiData.count),
initShowPage:parseInt(cgiData.begin)+1,
totalItemsNum:s,
first:!1,
last:!1,
isSimple:!0,
callback:function(a){
var t=a.currentPage;
return t!=parseInt(cgiData.begin)+1?location.href=location.href.replace(/([\?&])begin=\d*/,"$1begin="+(t-1)):i.err("输入的页码为当前页"),
!1;
}
});
}
return c;
}
}();
});