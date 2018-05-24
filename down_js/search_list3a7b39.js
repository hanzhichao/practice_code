define("search/search_list.js",["common/wx/top.js","common/wx/Tips.js","common/wx/pagebar.js","common/wx/searchInput.js"],function(e){
"use strict";
var t=e("common/wx/top.js"),n=e("common/wx/Tips.js"),i=e("common/wx/pagebar.js"),a=e("common/wx/searchInput.js"),c=wx.cgiData,o=function(){
function e(e){
return $("<div></div>").html(e).text();
}
function o(){
var o=(new t("#js_top_tab",t.DATA.search).selected(0),new a({
id:"#js_search",
value:e(c.keyword),
placeholder:"搜索第三方功能",
click:function(e){
e=encodeURIComponent(e.replace(/^\s+/,"").replace(/\s+$/,"").replace(/\s+/g," ")),
e.length>0?location.href=wx.url("/advanced/componentsearch?action=search_list&begin=0&limit=10&keyword="+e):n.err("请输入关键词");
}
}),new i({
container:"#js_pagebar",
perPage:10,
totalItemsNum:c.total,
initShowPage:c.begin/10+1,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
location.href=location.href.replace(/([\?&])begin=\d*/,"$1begin="+(e.currentPage-1)*e.perPage);
}
}),$(".js_item"));
0===o.length?$(".js_item_noresult").show():o.click(function(){
location.href=wx.url("/advanced/componentsearch?action=search_detail&componentuin="+$(this).attr("data-uin"));
}),$(".js_item:last").addClass("no_extra"),o.each(function(){
for(var e=$(this),t=c.highlightList[e.attr("data-uin")],n=0,i=t.length;i>n;n++){
var a=template.render("tpl_highlight",{
hlword:t[n]
}),o=e.find(".js_item_title"),r=e.find(".js_item_tag"),s=e.find(".js_item_desc");
-1!=o.text().indexOf(t[n])?o.html(o.html().replace(t[n],a)):r.text()&&-1!=r.text().indexOf(t[n])?r.each(function(){
$(this).html($(this).html().replace(t[n],a));
}):s.html(s.html().replace(t[n],a));
}
});
}
return{
init:o
};
}();
o.init();
});