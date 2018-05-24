define("resource/res_doc.js",["biz_common/utils/string/html.js"],function(n){
"use strict";
function o(){
s.highline=(window.cgiData.highline||"").html(!1).html(!1);
}
function t(){
$("#content").html($("#content_tpl").html()),top.window.__resFunc&&setTimeout(function(){
top.window.__resFunc.setIframeH();
},0);
}
function e(){
if(s.highline){
for(var n=s.highline.split("|&"),o=0,t=n.length;t>o;o++)!function(n){
setTimeout(function(){
i(n);
},0);
}(n[o]);
top.window.__resFunc&&"function"==typeof top.window.__resFunc.showCloseHighlineBtn&&top.window.__resFunc.showCloseHighlineBtn();
}
}
function i(n){
if(window.find&&window.getSelection){
document.designMode="on";
var o=window.getSelection();
for(o.collapse(document.body,0);window.find(n);){
if(!s.hadFindFirstDom){
for(var t=o.anchorNode;!t.tagName&&(t=t.parentElement,t!==document&&t!==document.body););
var e=$(t).offset();
e&&e.top&&(s.hadFindFirstDom=!0,c(e.top));
}
document.execCommand("foreColor",!1,"#44B549"),o.collapseToEnd();
}
document.designMode="off";
}else if(document.body.createTextRange)for(var i=document.body.createTextRange();i.findText(n);){
if(!s.hadFindFirstDom){
var d=i.getBoundingClientRect();
d&&d.top&&(s.hadFindFirstDom=!0,c(d.top));
}
i.execCommand("foreColor",!1,"#44B549"),i.collapse(!1);
}
}
function c(n){
top.window.__resFunc&&"function"==typeof top.window.__resFunc.scrollHeight&&top.window.__resFunc.scrollHeight(n-100,!0);
}
function d(){
t(),$("#title").html($("#title_tpl").html());
}
function l(){
e();
}
n("biz_common/utils/string/html.js");
var s={
hadFindFirstDom:!1
};
o(),t(),e(),window.__subFunc={
closeHighline:d,
openHighline:l
};
});