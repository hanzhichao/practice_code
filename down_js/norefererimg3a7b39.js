!function(){
if(!window.define){
var t={};
window.define=function(e,n,i){
t[e]=i;
},window.seajs={
use:function(e){
function n(e){
return t[e]&&t[e](n);
}
return t[e]&&t[e](n);
}
};
}
}(),define("biz_common/utils/norefererimg.js",[],function(){
function t(t){
return window.getComputedStyle?window.getComputedStyle(t):t.currentStyle;
}
function e(t,e,n,i){
if(t&&n){
if(t==window&&"load"==e&&/complete|loaded/.test(document.readyState))return void n({
type:"load"
});
var o=function(t){
var e=n.call(this,t);
e===!1&&(t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault());
};
return n[e+"_handler"]=o,t.addEventListener?void t.addEventListener(e,o,!!i):t.attachEvent?void t.attachEvent("on"+e,o,!!i):void 0;
}
}
return function(n){
var i=n.img,o=n.imgurl,r=n.onload,a=n.onimgerr||function(){},d=n.style_str,l=n.need_reset,s=o||i.getAttribute("data-src"),c=/^http:\/\/mmbiz\.qpic\.cn\/|https:\/\/mmbiz\.qlogo\.cn\//;
if(s&&/^http(s)?:\/\//.test(s)){
if(s=s.replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\'/g,""),i.length&&(i=i[0]),
c.test(s))return e(i,"load",r),void i.setAttribute("src",s);
var u=t(i),m=["javascript:\"<html><body style='margin:0;padding:0;'><img onerror='onimgerr()' onload='onimgload()' style='width:",n.style_str?"100%":u.width,"' src='",s,"' /></body></html>\""].join(" "),g=document.createElement("iframe");
g.setAttribute("frameBorder","0"),g.setAttribute("scrolling","no"),d?g.setAttribute("style",d):(g.style.width="60px",
g.style.width=u.width+"",g.style.height=u.height,g.style.display=u.display,g.style.borderRadius=u.borderRadius,
g.style.webkitBorderRadius=u.borderRadius),"function"==typeof r&&(g.attachEvent?g.attachEvent("onload",r):g.onload=r),
g.className=i.className;
var f=i.parentNode;
f.insertBefore(g,i),g.src=m,g.contentWindow.onimgerr=a,l?(g.contentWindow.onimgload=function(){
var t=this;
return function(){
var e=t.document.getElementsByTagName("img")[0];
if(e){
{
t.getComputedStyle(e);
}
g.style.height=e.height+"px";
}
};
}.call(g.contentWindow),setTimeout(function(){
var t=g.contentWindow.document.getElementsByTagName("img")[0];
t&&(g.style.height=t.height+"px");
},10)):g.contentWindow.onimgload=function(){},f.removeChild(i);
}
};
});