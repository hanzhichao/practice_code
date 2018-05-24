define("ibeacon/data_detail.js",["common/wx/Cgi.js","biz_common/moment.js","common/wx/pagebar.js","common/wx/Tips.js","common/wx/top.js"],function(e){
"use strict";
var t=(e("common/wx/Cgi.js"),e("biz_common/moment.js"),e("common/wx/pagebar.js")),o=e("common/wx/Tips.js"),a=e("common/wx/top.js"),i=$("#js_tbody"),c=($(".pagination_wrp"),
$("#js_download"));
new a("#js_div_toptab",a.DATA.ibeacon).selected("dataReport");
var n=[],s=function(e){
var t=-1;
e.each(function(e){
n[t]&&n[t].date==e.date?(n[t].click_pv.push(e.click_pv),n[t].click_uv.push(e.click_uv),
n[t].page_title.push(e.page_info.page_title),n[t].shake_pv.push(e.shake_pv),n[t].shake_uv.push(e.shake_uv)):(n.push({
date:e.date,
click_pv:[e.click_pv],
click_uv:[e.click_uv],
page_title:[e.page_info.page_title],
shake_uv:[e.shake_uv],
shake_pv:[e.shake_pv]
}),t++);
});
},p=function(e){
e>15&&new t({
container:".pagination_wrp",
perPage:15,
first:!1,
last:!1,
isSimple:!0,
initShowPage:1,
totalItemsNum:e,
callback:function(e){
window.scrollTo(0,0),i.html(template.render("js_tbody_tpl",{
list:wx.cgiData.records.slice(15*(e.currentPage-1),15)
}));
}
});
},l=function(){
s(wx.cgiData.records),i.html(template.render("js_tbody_tpl",{
list:n.slice(0,15)
})),p(n.length),c.on("click",function(){
var e=$(this);
return 0==n.length?void o.err("暂无数据"):void window.open(e.data("url"));
});
};
l();
});