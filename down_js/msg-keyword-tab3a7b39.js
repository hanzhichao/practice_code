define("statistics/tab-bar/msg-keyword-tab.js",["statistics/tab-bar/index.js","statistics/tab-bar/tab-keyword-date.js"],function(t,e){
"use strict";
function a(t){
var a=i(n,t);
n.activate(0),e.dateEvent=a;
}
var s=t("statistics/tab-bar/index.js"),i=t("statistics/tab-bar/tab-keyword-date.js"),e={},n=new s({
name:"消息关键词 TOP200",
tabs:[{
text:"全部",
submenu:"date",
type:"-1"
},{
text:"自定义关键词",
submenu:"date",
type:"1"
},{
text:"非自定义关键词",
submenu:"date",
type:"0"
}]
});
return n.init(),$(".drop_hd_right .inner").eq(0).prepend(n.$el),e.tabBar=n,e.dateRanger=i.dateRanger,
e.init=a,e;
});