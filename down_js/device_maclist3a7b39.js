define("wifi/device_maclist.js",["common/wx/Cgi.js","common/wx/pagebar.js","wifi/top.js"],function(i){
"use strict";
var t=(i("common/wx/Cgi.js"),i("common/wx/pagebar.js"));
i("wifi/top.js");
var a=function(i){
function a(){
new t({
container:".js_page",
perPage:20,
totalItemsNum:i.total,
initShowPage:i.page_idx,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
location.href=location.href.replace(/([\?&])page_idx=\d*/,"$1page_idx="+i.currentPage);
}
});
}
function e(){
a();
}
return{
init:e
};
}(wx.cgiData);
a.init();
});