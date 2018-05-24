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
}(),define("biz_common/utils/load3rdimg.js",[],function(){
function t(t){
return window.getComputedStyle?window.getComputedStyle(t):t.currentStyle;
}
function e(t,e,n,i){
if(t&&n){
if(t==window&&"load"==e&&/complete|loaded/.test(document.readyState))return void n({
type:"load"
});
var r=function(t){
var e=n.call(this,t);
e===!1&&(t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault());
};
return n[e+"_handler"]=r,t.addEventListener?void t.addEventListener(e,r,!!i):t.attachEvent?void t.attachEvent("on"+e,r,!!i):void 0;
}
}
return function(n){
var i=n.img,r=n.imgurl,o=n.onload,a=n.onimgerr||function(){},d=n.style_str,s=n.need_reset,l=r||i.getAttribute("data-src"),c=/^http(s)?:\/\/mmbiz\.qpic\.cn\/|http(s)?:\/\/mmbiz\.qlogo\.cn\//;
if(l&&/^http(s)?:\/\//.test(l)){
if(l=l.replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\'/g,""),i.length&&(i=i[0]),
c.test(l))return e(i,"load",o),void i.setAttribute("src",l);
var u=t(i),h=location.protocol+"//mp.weixin.qq.com/mp/readtemplate?t=appmsg/load3rdimg",g=document.createElement("iframe");
g.setAttribute("frameBorder","0"),g.setAttribute("scrolling","no"),d?g.setAttribute("style",d):(g.style.width="60px",
g.style.width=u.width+"",0!=parseInt(u.height)&&(g.style.height=u.height),g.style.display=u.display,
g.style.borderRadius=u.borderRadius,g.style.webkitBorderRadius=u.borderRadius);
var p=function(t,e,n,i){
var r="";
return n.style.height&&(r=";height:"+n.style.height),function(){
n.contentWindow.postMessage({
imgurl:t,
style_str:e?"width:100%":"width:"+n.style.width+r,
need_reset:i
},"*");
};
};
window.addEventListener("message",function(t){
var e=t.origin||t.originalEvent.origin;
/^http(s)?:\/\/mp\.weixin\.qq\.com/.test(e)&&("imgError"==t.data.act?a():"setHeight"==t.data.act&&(g.style.height=parseInt(t.data.height)+"px"));
}),"function"==typeof o&&(g.attachEvent?g.attachEvent("onload",o):g.onload=o),g.attachEvent?g.attachEvent("onload",p(l,d,g,s)):g.onload=p(l,d,g,s),
g.className=i.className;
var m=i.parentNode;
m.insertBefore(g,i),g.src=h,m.removeChild(i);
}
};
});