define("search/authorized_list.js",["common/wx/top.js","common/wx/Tips.js","common/wx/pagebar.js","common/wx/searchInput.js"],function(t){
"use strict";
var e=t("common/wx/top.js"),n=(t("common/wx/Tips.js"),t("common/wx/pagebar.js")),a=(t("common/wx/searchInput.js"),
wx.cgiData),o=function(){
function t(){
new e("#js_top_tab",e.DATA.search).selected(1);
var t=(new n({
container:"#js_pagebar",
perPage:10,
totalItemsNum:a.total,
initShowPage:a.begin/10+1,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
location.href=location.href.replace(/([\?&])begin=\d*/,"$1begin="+(t.currentPage-1)*t.perPage);
}
}),$(".js_item"));
0===t.length?$(".js_item_noresult").show():t.click(function(){
location.href=wx.url("/advanced/componentsearch?action=search_detail&componentuin="+$(this).attr("data-uin"));
}),$(".js_item:last").addClass("no_extra");
}
return{
init:t
};
}();
o.init();
});