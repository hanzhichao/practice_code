define("entityshop/update_list.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/dropdown.js","common/qq/queryString.js","biz_common/utils/string/html.js","biz_web/ui/checkbox.js","common/wx/popover.js","common/wx/pagebar.js"],function(t){
"use strict";
function i(){
s=$("#js_div_list"),c=$("#js_div_pagebar");
}
function n(){
s.html(a("tpl_list",{
list:_.list
}));
}
function e(){
var t=_.pageInfo.count,i=_.pageInfo.begin/t+1;
_.total_count>t?new p({
container:c,
perPage:t,
initShowPage:i,
totalItemsNum:_.total_count,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
var n=i.currentPage-1,e=n*t;
location.href=(new m).replace("begin",e).getUrl();
}
}):c.hide(),$("#js_div_list").find(".js_btn_reason").each(function(){
var t=1*$(this).data("index"),i=_.list[t],n=new u({
dom:$(this),
content:d.htmlEncode(i.upgrade_comment||""),
addCls:"",
isToggle:!0,
defaultOpen:!1
});
n.hide();
}),$(".js_btn_delete").on("click",function(){
{
var t=1*$(this).data("index"),i=_.list[t];
new u({
dom:$(this),
content:"删除将影响在用此门店的卡券功能、微信连Wi-Fi、摇一摇周边、LBS广告等相关业务。你确定要删除吗？",
addCls:"",
isToggle:!0,
defaultOpen:!1,
buttons:[{
text:"确定",
type:"primary",
click:function(){
l.post({
url:"/merchant/entityshop?action=delete",
data:{
id:i.wx_poi_uid
}
},function(t){
t&&0==t.base_resp.ret?(r.suc("删除成功"),location.reload()):r.err("系统错误，请重试");
});
}
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}]
});
}
});
}
function o(){
i(),n(),e();
}
var s,c,a=template.render,l=t("common/wx/Cgi.js"),r=t("common/wx/Tips.js"),m=(t("biz_web/ui/dropdown.js"),
t("common/qq/queryString.js")),d=t("biz_common/utils/string/html.js"),u=(t("biz_web/ui/checkbox.js"),
t("common/wx/popover.js")),p=t("common/wx/pagebar.js"),_=wx.cgiData;
o();
});