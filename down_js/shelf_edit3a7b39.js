define("shop/shelf_edit.js",["common/wx/Cgi.js"],function(t,e,s){
"use strict";
function n(t,e){
var s=css.split("/").pop();
"undefined"==typeof window.tmplCSS&&(window.tmplCss={}),window.tmplCss[s]||(window.tmplCss[s]=1,
$("head").append('<link href="'+e+'" rel="stylesheet" >')),$("#js_shop_header").html(template.render(t,{
data:o
})),$("#js_shop_content").html(template.render(t));
}
var d=t("common/wx/Cgi.js"),o=wx.cgiData.data;
s.exports=function(t){
var e="";
d.get({
url:e,
mask:!1,
data:{
shelf_id:t
}
},function(t){
var e=t.tmpl,s=t.cssUrl,d=t.editTmpl;
dom=n(e,s),addEvent(d);
});
};
});