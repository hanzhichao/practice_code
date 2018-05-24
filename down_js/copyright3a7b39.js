define("original/copyright.js",["common/wx/Cgi.js","common/wx/pagebar.js","biz_common/moment.js"],function(t){
"use strict";
function n(){
$("#list_tmpl").html(template.render("list",{
list:wx.cgiData.list
}));
}
function i(t){
var n=arguments[1]||window.location.search,i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),o=n.substr(n.indexOf("?")+1).match(i);
return null!=o?o[2]:"";
}
function o(){
{
var t=wx.cgiData.totalcount,n=i("count")?i("count"):10,o=i("begin")>0?parseInt(i("begin"))+1:1;
new a({
container:".pagination_wrp",
perPage:n,
first:!1,
last:!1,
isSimple:!0,
initShowPage:o,
totalItemsNum:t,
callback:function(t){
var i=t.currentPage;
if(i!=o)return i--,location.href=wx.url("appmsgcopyright?action=orignal&begin=%s&count=%s&type=1".sprintf(i,n)),
!1;
}
});
}
}
function e(){
wx.cgiData.list.each(function(t){
t.update_time=s.unix(t.update_time).format("YYYY-MM-DD");
}),n(),o(),$(".jsOver").hover(function(){
$(this).siblings(".jsPop").show();
},function(){
$(this).siblings(".jsPop").hide();
});
}
var a=(t("common/wx/Cgi.js"),t("common/wx/pagebar.js")),s=(wx.T,t("biz_common/moment.js"));
e();
});