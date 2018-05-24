define("statistics/tab-bar/msg-tab.js",["statistics/tab-bar/index.js","statistics/tab-bar/tab-date.js"],function(t,a){
"use strict";
function e(t){
var e=i(n,t);
n.activate(0),a.dateEvent=e;
}
var s=t("statistics/tab-bar/index.js"),i=t("statistics/tab-bar/tab-date.js"),a={},n=new s({
name:"关键指标详解",
tabs:[{
text:"消息发送人数",
submenu:"date",
type:"user"
},{
text:"消息发送次数",
submenu:"date",
type:"count"
},{
text:"人均发送次数",
submenu:"date",
type:"average"
}]
});
return n.init(),$(".drop_hd_right .inner").eq(0).prepend(n.$el),a.tabBar=n,a.dateRanger=i.dateRanger,
a.init=e,a;
});