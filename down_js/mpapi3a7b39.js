define("common/wx/city/mpapi.js",["common/wx/city/base.js"],function(e,i){
"use strict";
function o(){
a.apiLoaded=!0,getUrlDomain().indexOf("city.weixin.oa.com")>=0&&Iframe.init(window.parent),
setTimeout(function(){
a.recalculateHeight();
},100);
for(var e=0;e<a.waitingQueue.length;e++){
var t=a.waitingQueue[e];
if(t.method in a&&"function"==typeof a[t.method]){
var i=a[t.method];
setTimeout(function(){
$log("apply:"+t.method),i.apply(null,t.param);
},100);
}
}
a.waitingQueue.splice(0,a.waitingQueue.length);
}
e("common/wx/city/base.js");
var a=i;
i.initPlugin=function(){
var e=$param();
if(e&&e.jsurl){
var t=decodeURIComponent(e.jsurl);
0==t.indexOf("https://res.wx.qq.com/mpres/zh_CN/htmledition/js/common/wx/")||0==t.indexOf("https://wximg.gtimg.com/")?($asyncLoadJS(t,o),
$setCookie("jsurl",t)):$log("初始化mp插件接口失败！"+t);
}else{
var t=$getCookie("jsurl");
t=decodeURIComponent(t),!t||0!=t.indexOf("https://res.wx.qq.com/mpres/zh_CN/htmledition/js/common/wx/")&&0!=t.indexOf("https://wximg.gtimg.com/")?$log("初始化mp插件接口失败！未找到对应的js"):$asyncLoadJS(t,o);
}
},i.setScrollTop=function(e){
window.Iframe&&t.apiLoaded?Iframe.post({
type:"setScrollTop",
scrollTop:e
}):a.waitingQueue.push({
method:"setScrollTop",
param:[e]
});
},i.recalculateHeight=function(e,o){
var s,n,d=navigator.userAgent.toLowerCase(),l=/(chrome)[ \/]([\w.]+)/.exec(d)||/(webkit)[ \/]([\w.]+)/.exec(d)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(d)||/(msie) ([\w.]+)/.exec(d)||d.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(d)||[];
if(n=l[1]||"","number"==typeof e)s=e;else if("mozilla"==n)s=document.documentElement.offsetHeight;else if("msie"==n){
var r=document.body;
s=document.body.scrollHeight+parseInt(r.currentStyle.marginTop)+parseInt(r.currentStyle.marginTop);
}else s=document.documentElement.scrollHeight;
s=1100>s?1100:s,"number"==typeof e&&o&&(s=e),i.iframeHeight=s,window.Iframe&&t.apiLoaded?Iframe.post({
type:"setHeight",
height:s
}):a.waitingQueue.push({
method:"recalculateHeight",
param:[e]
});
},i.showMask=function(){
window.Iframe&&t.apiLoaded?($log("do showMask"),Iframe.post({
type:"showMask"
})):a.waitingQueue.push({
method:"showMask",
param:[]
});
},i.hideMask=function(){
window.Iframe&&t.apiLoaded?Iframe.post({
type:"hideMask"
}):a.waitingQueue.push({
method:"hideMask",
param:[]
});
},i.showTips=function(e){
window.Iframe&&t.apiLoaded?Iframe.post({
type:"showTips",
msg:e
}):a.waitingQueue.push({
method:"showTips",
param:[e]
});
},i.reloadParent=function(){
window.Iframe&&t.apiLoaded?Iframe.post({
type:"reload"
}):a.waitingQueue.push({
method:"reloadParent",
param:[]
});
},i.getParentSize=function(e){
window.Iframe&&t.apiLoaded?(Iframe.post({
type:"getSize",
proxyUrl:"https://crm1.dkf.qq.com/cgi-bin/mcs/php/static/js/proxypage.html"
}),Iframe.on("size",e)):a.waitingQueue.push({
method:"getParentSize",
param:[e]
});
},i.tokenExpire=function(){
window.Iframe&&t.apiLoaded?Iframe.post({
type:"expire"
}):a.waitingQueue.push({
method:"tokenExpire",
param:[]
});
},i.floatWnd=function(e){
function t(){
h.onClose(h)&&(h.closeOther(),h.destruct(),a.recalculateHeight());
}
function i(){
var e=this;
e.cover?p.data.closeCover():"",e.sizeTimer&&clearInterval(e.sizeTimer),e.fixTimer&&clearInterval(e.fixTimer),
e.boxHandle?document.body.removeChild(e.boxHandle):"",e.boxHandel=e.boxHandle=null;
for(var t=0,i=p.data.list.length;i>t;t++)p.data.list[t]&&e.id==p.data.list[t].id&&(p.data.list[t]=null);
if(e.closeId)for(var o=e.closeId.split(","),i=o.length;i--;){
var a=$id(o[i]);
a&&(a.onclick=null,a=null);
}
}
function o(){
for(var e=0,t=p.data.list.length;t>e;e++)p.data.list[e]&&p.data.list[e].leaver>=this.leaver&&this.id!=p.data.list[e].id&&p.data.list[e].destruct();
}
function s(){
this.cover?p.data.showCover():"";
var e=document.createElement("div"),t="",i=h.contentStyle?' style="'+h.contentStyle+'" ':"";
switch(e.id=this.boxId="float_box_"+this.id,e.style.position="absolute",$isBrowser("ie6")&&(t='<iframe frameBorder="0" style="position:absolute;left:'+h.bgframeLeft+"px;top:"+h.bgframeTop+'px;z-index:-1;border:none;" id="float_iframe_'+this.id+'"></iframe>'),
h.style+""){
case"stand":
e.className=h.cName,e.innerHTML=t+'<div class="box_title" id="float_title_'+this.id+'"><a href="javascript:;" style="display:'+(this.showClose?"":"none")+';"  class="bt_close" id="float_closer_'+this.id+'">×</a><h4>'+this.title+'</h4></div><div class="box_content" '+i+">"+this.html+"</div>";
break;

case"":
e.className=h.cName,e.innerHTML=t+'<div class="box_content" '+i+' id="float_title_'+this.id+'">'+this.html+"</div>";
break;

case"none":
e.className="",e.innerHTML=t+'<div class="box_content" '+i+' id="float_title_'+this.id+'">'+this.html+"</div>";
break;

case"new":
e.className=h.cName,e.innerHTML=t+'<div class="layer_inner"><div class="layer_hd" '+i+' id="float_title_'+this.id+'"><div class="layer_hd_title">'+this.title+'</div><a href="javascript:void(0);" class="layer_hd_close" id="float_closer_'+this.id+'">close</a> </div> <div class="layer_bd">'+this.html+"</div></div></div>";
}
document.body.appendChild(e),e=null,this.boxHandel=this.boxHandle=$id("float_box_"+this.id),
$isBrowser("ie6")&&(this.boxIframeHandle=$id("float_iframe_"+this.id)),this.boxTitleHandle=$id(h.titleId||"float_title_"+this.id),
this.boxCloseHandle=$id("float_closer_"+this.id),this.height?this.boxHandle.style.height="auto"==h.height?h.height:h.height+"px":"",
this.width?this.boxHandle.style.width="auto"==h.width?h.width:h.width+"px":"",this.boxHandle.style.zIndex=p.data.zIndex,
this.sw=parseInt(this.boxTitleHandle.offsetWidth),this.sh=parseInt(this.boxTitleHandle.offsetHeight),
a.iframeHeight<this.sh&&a.recalculateHeight(this.sh),this.setPos();
var o=this;
if(o.boxCloseHandle?o.boxCloseHandle.onclick=function(){
return o.close(),!1;
}:"",o.closeId)for(var s=o.closeId.split(","),n=s.length;n--;){
var d=$id(s[n]);
d&&(d.onclick=function(){
return o.close(),!1;
},d=null);
}
o.keepBoxFix(),!o.onInit(h);
}
function n(e,t){
var i=this;
e&&(i.left=e),t&&(i.top=t),i.keepBoxFix();
}
function d(e,t){
e&&e.constructor===Number&&(this.sw=e,this.boxHandle.style.width=this.sw+"px",$isBrowser("ie6")&&(this.boxIframeHandle.width=this.sw-2+"px")),
t&&t.constructor===Number&&(this.sh=t,this.boxHandle.style.height=this.sh+"px",$isBrowser("ie6")&&(this.boxIframeHandle.height=this.sh-2+"px")),
this.setPos();
}
function l(){
a.getParentSize(this.onKeepfixCallback);
}
function r(e){
var t=h;
if($isBrowser("ie"))!t.fixTimer&&(t.fixTimer=setInterval(function(){
t.boxHandle.style.left=(t.left?t.left:getParentPageScrollWidth()+(getParentWindowWidth()-t.sw)/2)+"px";
var i=t.top?t.top:parseInt(e.scrollTop)-parseInt(e.offsetTop)+(parseInt(e.windowHeight)-t.sh)/2;
i=0>i?0:i,i=i+this.sh>a.iframeHeight?a.iframeHeight-this.sh:i,t.boxHandle.style.top=i+"px";
},30));else{
t.boxHandle.style.left=(t.left?t.left:getParentPageScrollWidth()+(getParentWindowWidth()-t.sw)/2)+"px";
var i=t.top?t.top:parseInt(e.scrollTop)-parseInt(e.offsetTop)+(parseInt(e.windowHeight)-t.sh)/2;
i=0>i?0:i,i=i+this.sh>a.iframeHeight?a.iframeHeight-this.sh:i,t.boxHandle.style.top=i+"px";
}
}
function c(e){
function t(){
var e=document.createElement("div");
e.id="float_cover",e.style.display="none",e.style.width="0px",e.style.height="0px",
e.style.backgroundColor="#000000",e.style.zIndex=250,e.style.position="fixed",e.style.hasLayout=-1,
e.style.left="0px",e.style.top="0px",e.style.filter="alpha(opacity=50);",e.style.opacity="0.5",
document.body.appendChild(e),$isBrowser("ie6")&&(e.innerHTML='<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;border:none;" id="float_cover_iframe"></iframe>',
e.style.position="absolute"),p.data.cover=$id("float_cover"),p.data.coverIframe=$id("float_cover_iframe"),
p.data.coverIsShow=!1,p.data.coverSize=[0,0],e=null;
}
function i(){
function e(){
var e=p.data;
if(e.coverIsShow){
var t=($getContentHeight(),$getWindowHeight()),i=($getContentWidth(),$getWindowWidth()),o=[t,i];
$isBrowser("ie6")&&(e.cover.style.top=$getPageScrollHeight()+"px"),o.toString()!=p.data.coverSize.toString()&&(e.coverSize=o,
e.cover.style.height=o[0].toFixed(0)+"px",e.cover.style.width=o[1].toFixed(0)+"px",
e.coverIframe&&(e.coverIframe.style.height=o[0].toFixed(0)+"px",e.coverIframe.style.width=o[1].toFixed(0)+"px"));
}
}
p.data.cover.style.display="block",p.data.coverIsShow=!0,e(),a.showMask(),p.data.coverTimer=setInterval(function(){
e();
},50);
}
function o(){
p.data.cover.style.display="none",p.data.coverIsShow=!1,a.hideMask(),clearInterval(p.data.coverTimer);
}
e&&$loadCss(e),p.data={},p.data.zIndex=h.zindex,p.data.list=[],t(),p.data.showCover=i,
p.data.closeCover=o;
}
if(!window.Iframe||!a.apiLoaded)return void a.waitingQueue.push({
method:"floatWnd",
param:[e]
});
var h={
id:"",
left:0,
top:0,
width:400,
height:0,
title:"",
html:"",
leaver:2,
zindex:255,
autoResize:!1,
cover:!0,
dragble:!1,
fix:!1,
titleId:"",
showClose:!0,
closeId:"",
bgframeLeft:-2,
bgframeTop:-2,
cName:"module_box_normal vt_float",
style:"stand",
contentStyle:"",
cssUrl:e.cssUrl,
onInit:$empty(),
onClose:$empty()
};
for(var m in e)h[m]=e[m];
var p=arguments.callee,f=window.location.hostname,u=(-1!=f.indexOf("qq.com"),-1!=f.indexOf("buy.qq.com"),
-1!=f.indexOf("paipai.com"));
return u&&(h.bgframeLeft=0,h.bgframeTop=0),p.data?"":c(h.cssUrl),h.id=h.id?h.id:++p.data.zIndex,
h.close=t,h.destruct=i,h.closeOther=o,h.keepBoxFix=l,h.resize=d,h.show=s,h.setPos=n,
h.onKeepfixCallback=r,h.closeOther(),h.show(),p.data.list.push(h),h.dragble&&$initDragItem({
barDom:h.boxTitleHandle,
targetDom:h.boxHandle
}),h;
};
var s={
errTemplate:'<div class="mod-dialog" style="width: 720px;position: static;"><div class="mod-dialog__head"><h3>提示</h3><a href="javascript:;" class="mod-dialog__close" id="btnEmployeeCancel2">关闭</a></div><div class="mod-dialog__body"><div class="mod-page-msg"><div class="mod-page-msg__inner"><div class="mod-page-msg__icon mod-page-msg__icon_warn"></div><div class="mod-page-msg__content"><div class="msg-page-msg__title msg-page-msg__title_only">{#word#}</div></div></div></div></div><div class="mod-dialog__footer"><a href="javascript:;" class="button button_primary" id="btnEmployeeCancel">确定</a></div></div>',
tipTemplate:'<div class="mod-dialog" style="width: 720px;position: static;"><div class="mod-dialog__head"><h3>提示</h3><a href="javascript:;" class="mod-dialog__close" id="btnErrorClose">关闭</a></div><div class="mod-dialog__body"><div class="mod-page-msg"><div class="mod-page-msg__inner"><div class="mod-page-msg__icon mod-page-msg__icon_warn"></div><div class="mod-page-msg__content"><div class="msg-page-msg__title msg-page-msg__title_only">{#word#}</div></div></div></div></div><div class="mod-dialog__footer"><a href="javascript:;" class="button button_primary" id="btnErrorYes">确定</a><a href="javascript:;" class="button button_default" style="margin-left: 20px;" id="btnErrorNo">取消</a></div></div>'
},n={
errWnd:null,
tipWnd:null
};
i.showErrWnd=function(e,t){
return window.Iframe&&a.apiLoaded?(n.errWnd&&(n.errWnd.close(),n.errWnd=null),n.errWnd=a.floatWnd({
id:"errorAlert",
title:"",
html:s.errTemplate.replace(/{#word#}/g,e),
width:720,
left:(document.documentElement.clientWidth-720)/2,
fix:!0,
style:"none",
leaver:100,
cover:!0,
onInit:function(){
return!0;
},
onClose:function(){
return!0;
}
}),void $("#btnEmployeeCancel,#btnEmployeeCancel2").on("click",function(){
n.errWnd&&(n.errWnd.close(),n.errWnd=null,null!=t&&t());
})):($log('plugin.waitingQueue.push({method:"showErrWnd",param:[word,callback]});'),
void a.waitingQueue.push({
method:"showErrWnd",
param:[e,t]
}));
},i.showTipWnd=function(e,t,i){
return window.Iframe&&a.apiLoaded?(n.tipWnd&&(n.tipWnd.close(),n.tipWnd=null),n.tipWnd=a.floatWnd({
id:"tipAlert",
title:"",
html:s.tipTemplate.replace(/{#word#}/g,e),
width:720,
left:(document.documentElement.clientWidth-720)/2,
fix:!0,
style:"none",
leaver:100,
cover:!0,
onInit:function(){
return!0;
},
onClose:function(){
return!0;
}
}),$("#btnErrorClose,#btnErrorNo").on("click",function(){
n.tipWnd&&(n.tipWnd.close(),n.tipWnd=null),"function"==typeof i&&i();
}),void $("#btnErrorYes").on("click",function(){
n.tipWnd&&(n.tipWnd.close(),n.tipWnd=null),"function"==typeof t&&t();
})):void a.waitingQueue.push({
method:"showTipWnd",
param:[e,t,i]
});
},i.errorHandler=function(e,t){
return window.Iframe&&a.apiLoaded?0==e?!0:(i.showErrWnd(e+":"+t),!1):($log('plugin.waitingQueue.push({method:"errorHandler",param:[ret,msg]});'),
void a.waitingQueue.push({
method:"errorHandler",
param:[e,t]
}));
},i.waitingQueue=[],i.iframeHeight=646,i.apiLoaded=!1,i.initPlugin();
});