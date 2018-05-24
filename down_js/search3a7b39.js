define("resource/search.js",["biz_common/utils/string/html.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/pagebar.js"],function(t){
"use strict";
function e(){
s.page=window.cgiData.page||1,window.cgiData.text=(window.cgiData.text||"").html(!1).html(!1);
}
function a(t){
window.cgiData.text&&o.get({
url:"/wiki?",
data:{
action:"search",
search_query:window.cgiData.text,
page_id:t||1,
num_per_page:s.pageLimit
}
},{
done:function(e){
e&&e.base_resp?0==e.base_resp.ret&&e.search_result.doc_list?(i(e.search_result.doc_list),
r({
list:e.search_result.doc_list,
total:e.search_result.display_num,
currentPage:t
})):r(200013==e.base_resp.ret?{
list:-1,
err_text:"操作过于频繁，请稍后再试"
}:{
list:-1,
err_text:"检索错误，请重新搜索"
}):r({
list:-1,
err_text:"检索错误，请重新搜索"
});
},
fail:function(){
r({
list:-1,
err_text:"检索错误，请重新搜索"
});
}
});
}
function i(t){
for(var e=0,a=t.length;a>e;e++){
var i={},r=[],n=t[e].doc_abs_title.match(/<em>([\s\S]*?)<\/em>/g);
if(n)for(var o=0,c=n.length;c>o;o++){
var s=n[o].replace(/<em>/g,"").replace(/<\/em>/g,"");
i[s]||(i[s]=1,r.push(s));
}
if(n=t[e].doc_abs_content.match(/<em>([\s\S]*?)<\/em>/g))for(var o=0,c=n.length;c>o;o++){
var s=n[o].replace(/<em>/g,"").replace(/<\/em>/g,"");
i[s]||(i[s]=1,r.push(s));
}
t[e].key=encodeURIComponent(r.join("|&"));
}
}
function r(t){
var e=t.list,i=t.total||0,r=t.currentPage,n=t.err_text||"";
if($("#main").html(template.render("result_tpl",{
list:e,
total:i,
err_text:n,
text:window.cgiData.text.html(!0)
})),e&&-1!=e&&$("#count").text(template.render("count_tpl",{
total:i,
search_text:window.cgiData.text
})),e&&-1!=e&&e.length>0){
new c({
container:"#pagebar",
perPage:s.pageLimit,
first:!1,
last:!1,
isSimple:!0,
initShowPage:r,
totalItemsNum:i,
callback:function(t){
var e=t.currentPage;
if(e!=r)return a(e),!1;
}
});
}
setTimeout(function(){
top.window.__resFunc&&(top.window.__resFunc.setIframeH(),top.window.__resFunc.scrollTop());
},0);
}
function n(){
$("#goback").click(function(){
top.window.__resFunc.goback();
});
}
t("biz_common/utils/string/html.js");
var o=(t("common/wx/Tips.js"),t("common/wx/Cgi.js")),c=t("common/wx/pagebar.js"),s={
pageLimit:10
};
e(),n(),a(s.page);
});