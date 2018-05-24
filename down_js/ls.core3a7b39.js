function $strReplace(t,e,n){
function o(e,n){
var o=t.split(e);
t=o.join(n);
}
if(void 0!=n)o(e,n);else for(var i in e)o(i,e[i]);
return t;
}
function $parseUrl(t){
var e=document.createElement("a");
return e.href=t,{
source:t,
protocol:e.protocol.replace(":",""),
host:e.hostname,
port:e.port,
query:e.search,
params:function(){
for(var t,n={},o=e.search.replace(/^\?/,"").split("&"),i=o.length,s=0;i>s;s++)o[s]&&(t=o[s].split("="),
n[t[0]]=t[1]);
return n;
}(),
file:(e.pathname.match(/([^\/?#]+)$/i)||[,""])[1],
hash:e.hash.replace("#",""),
path:e.pathname.replace(/^([^\/])/,"/$1"),
relative:(e.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],
segments:e.pathname.replace(/^\//,"").split("/")
};
}
function $getParams(t){
var e={
pNames:[],
url:location.href,
se:"&|#",
con:"=",
ext:".html"
};
for(var n in t)e[n]=t[n];
for(var o,i=e.pNames,s=[],a=0,r=i.length;r>a;a++){
var l=new RegExp("(^"+e.se+"|)"+i[a]+e.con+"([^"+e.se+"]*)(|"+e.se+"$)"),u=e.url.match(l);
u=null!=u?u[2]:"",o=u.indexOf(e.ext),u=-1!=o?u.substr(0,o):u,s.push(u);
}
return s;
}
function $addClass(t,e){
$setClass(t,e,"add");
}
function $hasClass(t,e){
if(!t||!e)return null;
for(var n=("object"==typeof t?t.className:t).split(" "),o=0,i=n.length;i>o;o++)if(e==n[o])return e;
return null;
}
function $setClass(t,e,n){
if(t){
var o=function(t,e,n){
if(t){
var o=t.className,i=o?o.split(" "):[];
if("add"==n)$hasClass(o,e)||(i.push(e),t.className=i.join(" "));else if("remove"==n){
for(var s=[],a=0,r=i.length;r>a;a++)e!=i[a]&&" "!=i[a]&&s.push(i[a]);
t.className=s.join(" ");
}
}
};
if("string"==typeof t)for(var i=t.split(","),s=0,a=i.length;a>s;s++)i[s]&&o($id(i[s]),e,n);else if(t instanceof Array)for(var s=0,a=t.length;a>s;s++)t[s]&&o(t[s],e,n);else o(t,e,n);
}
}
function $delClass(t,e){
$setClass(t,e,"remove");
}
function $attr(t,e,n){
function o(t,e){
for(e(t),t=t.firstChild;t;)o(t,e),t=t.nextSibling;
}
var i=[],n=n||document.body;
return o(n,function(n){
if(window.__skipHidden&&"hidden"==n.type&&"INPUT"==n.tagName)return!1;
var o=1===n.nodeType&&("class"===t?n.className:"unknown"!=typeof n.getAttribute&&n.getAttribute(t));
"string"!=typeof o||o!==e&&"string"==typeof e||i.push(n);
}),i;
}
function $getTarget(t,e,n){
var t=window.event||t,o=t.srcElement||t.target;
if(e&&n&&o.nodeName.toLowerCase()!=n)for(;o=o.parentNode;){
if(o==e||o==document.body||o==document)return null;
if(o.nodeName.toLowerCase()==n)break;
}
return o;
}
function $addEvent(t,e,n){
function o(t,e,n,o){
t.__hids=t.__hids||[];
var i="h"+window.__Hcounter++;
t.__hids.push(i),window.__allHandlers[i]={
type:e,
handler:n,
wrapper:o
};
}
function i(t,e){
return function(){
return t.apply(e,arguments);
};
}
if(t&&e&&n)if(t instanceof Array)for(var s=0,a=t.length;a>s;s++)$addEvent(t[s],e,n);else if(e instanceof Array)for(var s=0,a=e.length;a>s;s++)$addEvent(t,e[s],n);else if(window.__allHandlers=window.__allHandlers||{},
window.__Hcounter=window.__Hcounter||1,window.addEventListener){
var r=i(n,t);
o(t,e,n,r),t.addEventListener(e,r,!1);
}else if(window.attachEvent){
var r=i(n,t);
o(t,e,n,r),t.attachEvent("on"+e,r);
}else t["on"+e]=n;
}
function $loadScript(t){
$loadScript.counter||($loadScript.counter=1);
var e="object"==typeof t,n=e?t.url:arguments[0],o=e?t.id:arguments[1],t=e?t:arguments[2],i=document.head||document.getElementsByTagName("head")[0]||document.documentElement,s=document.createElement("script"),a=new Date,r=a.getTime(),l=!1,u=null,d=t||{},c=d.data||"",p=d.charset||"gb2312",h=d.isToken,f=d.skey,m=d.timeout,g=d.isAutoReport||!1,_=d.reportOptions||{},v=d.reportType||"current",y=d.reportRetCodeName,S="undefined"==typeof d.reportSuccessCode?200:d.reportSuccessCode,x="undefined"==typeof d.reportErrorCode?500:d.reportErrorCode,w="undefined"==typeof d.reportTimeoutCode?600:d.reportTimeoutCode,b=d.onload,F=d.onsucc,U=d.callbackName||"",C=d.callback,E=d.errorback,$="uninitialized",I=function(t){
if(s&&!l){
if(l=!0,u&&(clearTimeout(u),u=null),s.onload=s.onreadystatechange=s.onerror=null,
i&&s.parentNode&&i.removeChild(s),s=null,U)if(-1==U.indexOf(".")){
window[U]=null;
try{
delete window[U];
}catch(e){}
}else for(var n=U.split("."),o={},a=0,r=n.length;r>a;a++){
var d=n[a];
if(0==a)o=window[d];else if(a==r-1)try{
delete o[d];
}catch(e){}else o=o[d];
}
"loaded"!=$&&"function"==typeof E&&E(t),g&&"cross"!=v&&W.report("loaded"==$,t);
}
},T=function(t){
var e=[];
for(var n in t)e.push(n+"="+t[n]);
return e.join("&");
};
if(g&&_)if("cross"==v)$returnCode(_).reg();else{
_.url=_.url||n.substr(0,-1==n.indexOf("?")?n.length:n.indexOf("?"));
var W=$returnCode(_);
}
if(c&&(n+=(-1!=n.indexOf("?")?"&":"?")+("string"==typeof c?c:T(c))),U&&"function"==typeof C){
var D=U;
if(-1==U.indexOf("."))U=window[U]?U+$loadScript.counter++:U,window[U]=function(t){
$="loaded",g&&y&&(S=t[y]),C.apply(null,arguments),F&&F();
};else{
for(var O=U.split("."),L={},P=[],R=0,k=O.length;k>R;R++){
var N=O[R];
0==R?L=window[N]:R==k-1?(L[N]?N+=$loadScript.counter++:"",L[N]=function(t){
$="loaded",g&&y&&(S=t[y]),C.apply(null,arguments),F&&F();
}):L=L[N],P.push(N);
}
U=P.join(".");
}
n=n.replace("="+D,"="+U);
}
$="loading",o=o?o+r:r,n=h!==!1?$addToken(n,"ls",f):n,s.charset=p,s.id=o,s.onload=s.onreadystatechange=function(){
var t=navigator.userAgent.toLowerCase();
(-1!=t.indexOf("opera")||-1==t.indexOf("msie")||/loaded|complete/i.test(this.readyState))&&("function"==typeof b&&b(),
I("loaded"==$?S:x));
},s.onerror=function(){
I(x);
},m&&(u=setTimeout(function(){
I(w);
},parseInt(m,10))),setTimeout(function(){
s.src=n;
try{
i.insertBefore(s,i.lastChild);
}catch(t){}
},0);
}
function $addToken(t,e,n){
var o=$getToken(n);
if(""==t||0!=(t.indexOf("://")<0?location.href:t).indexOf("http"))return t;
if(-1!=t.indexOf("#")){
var i=t.match(/\?.+\#/);
if(i){
var s=i[0].split("#"),a=[s[0],"&g_tk=",o,"&g_ty=",e,"#",s[1]].join("");
return t.replace(i[0],a);
}
var s=t.split("#");
return[s[0],"?g_tk=",o,"&g_ty=",e,"#",s[1]].join("");
}
return""==o?t+(-1!=t.indexOf("?")?"&":"?")+"g_ty="+e:t+(-1!=t.indexOf("?")?"&":"?")+"g_tk="+o+"&g_ty="+e;
}
function $getCookie(t){
var e=new RegExp("(^| )"+t+"(?:=([^;]*))?(;|$)"),n=document.cookie.match(e);
return n?n[2]?unescape(n[2]):"":null;
}
function $getToken(t){
var t=t?t:$getCookie("skey");
return t?$time33(t):"";
}
function $loadUrl(t){
function e(){
n&&(n.onload=n.onreadystatechange=n.onerror=null,n.parentNode&&n.parentNode.removeChild(n),
n=null);
}
t.element=t.element||"script";
var n=document.createElement(t.element);
n.charset=t.charset||"utf-8",t.onBeforeSend&&t.onBeforeSend(n),n.onload=n.onreadystatechange=function(){
(/loaded|complete/i.test(this.readyState)||-1==navigator.userAgent.toLowerCase().indexOf("msie"))&&(t.onLoad&&t.onLoad(),
e());
},n.onerror=function(){
e();
},n.src=t.url,document.getElementsByTagName("head")[0].appendChild(n);
}
function $report(t){
$loadUrl({
url:t+(-1==t.indexOf("?")?"?":"&")+Math.random(),
element:"img"
});
}
function $returnCode(t){
function e(){
if(this.sTime=new Date,this.action){
var t=$getCookie("retcode"),e=[];
t=t?t.split("|"):[];
for(var n=0;n<t.length;n++)t[n].split(",")[0]!=this.action&&e.push(t[n]);
e.push(this.action+","+this.sTime.getTime()),$setCookie("retcode",e.join("|"),60,"/",this.domain);
}
}
function n(t,e){
if(1!=this.isReport){
if(this.isReport=!0,this.eTime=new Date,this.retCode=t?1:2,this.errCode=isNaN(parseInt(e))?"0":parseInt(e),
this.action){
this.url="http://retcode.paipai.com/"+this.action;
var n=$getCookie("retcode"),t="",o=[];
n=n?n.split("|"):[];
for(var i=0;i<n.length;i++)n[i].split(",")[0]==this.action?t=n[i].split(","):o.push(n[i]);
if($setCookie("retcode",o.join("|"),60,"/",this.domain),!t)return;
this.sTime=new Date(parseInt(t[1]));
}
if(this.url){
var s=this.url.replace(/^.*\/\//,"").replace(/\/.*/,""),a=this.eTime-this.sTime,r=encodeURIComponent(this.formatUrl?this.url.match(/^[\w|\/|.|:|-]*/)[0]:this.url);
this.reportUrl="http://c.isdspeed.qq.com/code.cgi?domain="+s+"&cgi="+r+"&type="+this.retCode+"&code="+this.errCode+"&time="+a+"&rate="+this.frequence+(this.uin?"&uin="+this.uin:""),
this.reportUrl&&Math.random()<1/this.frequence&&this.url&&$report(this.reportUrl);
}
}
}
var o={
url:"",
action:"",
sTime:"",
eTime:"",
retCode:"",
errCode:"",
frequence:1,
refer:"",
uin:"",
domain:"paipai.com",
from:1,
report:n,
isReport:!1,
timeout:3e3,
timeoutCode:444,
formatUrl:!0,
reg:e
};
try{
o.refer=location.href;
}catch(i){}
for(var s in t)o[s]=t[s];
return o.url&&(o.sTime=new Date),o.timeout&&setTimeout(function(){
o.isReport||o.report(!1,o.timeoutCode);
},o.timeout),o;
}
function $setCookie(t,e,n,o,i,s){
var a=new Date,n=arguments[2]||null,o=arguments[3]||"/",i=arguments[4]||null,s=arguments[5]||!1;
n?a.setMinutes(a.getMinutes()+parseInt(n)):"",document.cookie=t+"="+escape(e)+(n?";expires="+a.toGMTString():"")+(o?";path="+o:"")+(i?";domain="+i:"")+(s?";secure":"");
}
function $time33(t){
for(var e=0,n=t.length,o=5381;n>e;++e)o+=(o<<5)+t.charAt(e).charCodeAt();
return 2147483647&o;
}
function $namespace(name){
for(var arr=name.split(","),r=0,len=arr.length;len>r;r++)for(var i=0,k,name=arr[r].split("."),parent={};k=name[i];i++)0===i?eval("(typeof "+k+')==="undefined"?('+k+'={}):"";parent='+k):parent=parent[k]=parent[k]||{};
}
function $addToken(t,e,n){
var o=$getToken(n);
if(""==t||0!=(t.indexOf("://")<0?location.href:t).indexOf("http"))return t;
if(-1!=t.indexOf("#")){
var i=t.match(/\?.+\#/);
if(i){
var s=i[0].split("#"),a=[s[0],"&g_tk=",o,"&g_ty=",e,"#",s[1]].join("");
return t.replace(i[0],a);
}
var s=t.split("#");
return[s[0],"?g_tk=",o,"&g_ty=",e,"#",s[1]].join("");
}
return""==o?t+(-1!=t.indexOf("?")?"&":"?")+"g_ty="+e:t+(-1!=t.indexOf("?")?"&":"?")+"g_tk="+o+"&g_ty="+e;
}
function $empty(){
return function(){
return!0;
};
}
function $getCookie(t){
var e=new RegExp("(^| )"+t+"(?:=([^;]*))?(;|$)"),n=document.cookie.match(e);
return n?n[2]?unescape(n[2]):"":null;
}
function $getToken(t){
var t=t?t:$getCookie("skey");
return t?$time33(t):"";
}
function $makeUrl(t){
var e=[];
for(var n in t)e.push(n+"="+t[n]);
return e.join("&");
}
function $time33(t){
for(var e=0,n=t.length,o=5381;n>e;++e)o+=(o<<5)+t.charAt(e).charCodeAt();
return 2147483647&o;
}
function $xhrMaker(){
var t;
try{
t=new XMLHttpRequest;
}catch(e){
try{
t=new ActiveXObject("Msxml2.XMLHTTP");
}catch(e){
try{
t=new ActiveXObject("Microsoft.XMLHTTP");
}catch(e){
t=null;
}
}
}
return t;
}
function $xss(t,e){
if(!t)return 0===t?"0":"";
switch(e){
case"none":
return t+"";

case"html":
return t.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g,function(t){
return"&#"+t.charCodeAt(0)+";";
}).replace(/ /g," ").replace(/\r\n/g,"<br />").replace(/\n/g,"<br />").replace(/\r/g,"<br />");

case"htmlEp":
return t.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g,function(t){
return"&#"+t.charCodeAt(0)+";";
});

case"url":
return escape(t).replace(/\+/g,"%2B");

case"miniUrl":
return t.replace(/%/g,"%25");

case"script":
return t.replace(/[\\"']/g,function(t){
return"\\"+t;
}).replace(/%/g,"\\x25").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\x01/g,"\\x01");

case"reg":
return t.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g,function(t){
return"\\"+t;
});

default:
return escape(t).replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g,function(t){
return"&#"+t.charCodeAt(0)+";";
}).replace(/ /g," ").replace(/\r\n/g,"<br />").replace(/\n/g,"<br />").replace(/\r/g,"<br />");
}
}
function $float(t){
function e(){
u.onClose(u)&&(u.closeOther(),u.destruct());
}
function n(){
var t=this,e=0;
for(var n in c.data.list)c.data.list[n]&&e++;
t.cover&&1>=e?c.data.closeCover():"",t.sizeTimer&&clearInterval(t.sizeTimer),t.fixTimer&&clearInterval(t.fixTimer),
t.boxHandle?document.body.removeChild(t.boxHandle):"",t.boxHandel=t.boxHandle=null;
for(var n=0,o=c.data.list.length;o>n;n++)c.data.list[n]&&t.id==c.data.list[n].id&&(c.data.list[n]=null);
if(t.closeId)for(var i=t.closeId.split(","),o=i.length;o--;){
var s=$id(i[o]);
s&&(s.onclick=null,s=null);
}
}
function o(){
for(var t=0,e=c.data.list.length;e>t;t++)c.data.list[t]&&c.data.list[t].leaver>=this.leaver&&this.id!=c.data.list[t].id&&c.data.list[t].destruct();
}
function i(){
this.cover?c.data.showCover():"";
var t=document.createElement("div"),e="",n=u.contentStyle?' style="'+u.contentStyle+'" ':"";
switch(t.id=this.boxId="float_box_"+this.id,t.style.position="absolute",$isBrowser("ie6")&&(e='<iframe frameBorder="0" style="position:absolute;left:'+u.bgframeLeft+"px;top:"+u.bgframeTop+'px;z-index:-1;border:none;" id="float_iframe_'+this.id+'"></iframe>'),
u.style+""){
case"stand":
t.className=u.cName,t.innerHTML=e+'<div class="box_title" id="float_title_'+this.id+'"><a href="javascript:;" style="display:'+(this.showClose?"":"none")+';"  class="bt_close" id="float_closer_'+this.id+'">×</a><h4>'+this.title+'</h4></div><div class="box_content" '+n+">"+this.html+"</div>";
break;

case"":
t.className=u.cName,t.innerHTML=e+'<div class="box_content" '+n+' id="float_title_'+this.id+'">'+this.html+"</div>";
break;

case"none":
t.className="",t.innerHTML=e+'<div class="box_content" '+n+' id="float_title_'+this.id+'">'+this.html+"</div>";
break;

case"new":
t.className=u.cName,t.innerHTML=e+'<div class="layer_inner"><div class="layer_hd" '+n+' id="float_title_'+this.id+'"><div class="layer_hd_title">'+this.title+'</div><a href="javascript:void(0);" class="layer_hd_close" id="float_closer_'+this.id+'">close</a></div><div class="layer_bd">'+this.html+"</div></div></div>";
}
document.body.appendChild(t),t=null,this.boxHandel=this.boxHandle=$id("float_box_"+this.id),
$isBrowser("ie6")&&(this.boxIframeHandle=$id("float_iframe_"+this.id)),this.boxTitleHandle=$id(u.titleId||"float_title_"+this.id),
this.boxCloseHandle=$id("float_closer_"+this.id),this.isCoverClose?this.closeId+=",float_cover":"",
this.height?this.boxHandle.style.height="auto"==u.height?u.height:u.height+"px":"",
this.width?this.boxHandle.style.width="auto"==u.width?u.width:u.width+"px":"",this.boxHandle.style.zIndex=c.data.zIndex,
this.sw=parseInt(this.boxHandle.offsetWidth),this.sh=parseInt(this.boxHandle.offsetHeight),
this.setPos();
var o=this;
if(o.boxCloseHandle?o.boxCloseHandle.onclick=function(){
return o.close(),!1;
}:"",o.closeId)for(var i=o.closeId.split(","),s=i.length;s--;){
var a=$id(i[s]);
a&&(a.onclick=function(){
return o.close(),!1;
},a=null);
}
o.keepBoxFix(),!o.onInit(u);
}
function s(t,e){
var n=$getPageScrollWidth(),o=$getWindowWidth(),i=$getPageScrollHeight(),s=$getWindowHeight(),a=[0,0];
t&&(this.left=t),e&&(this.top=e),a[0]=parseInt(this.left?this.left:n+(o-this.sw)/2),
a[1]=parseInt(this.top?this.top:i+(s-this.sh)/2),a[0]+this.sw>n+o?a[0]=n+o-this.sw-10:"",
a[1]+this.sh>i+s?a[1]=i+s-this.sh-10:"",a[1]<i?a[1]=i:"",a[0]<n?a[0]=n:"",$isBrowser("ie6")&&(this.boxIframeHandle.height=this.sh-2+"px",
this.boxIframeHandle.width=this.sw-2+"px"),this.boxHandle.style.left=a[0]+"px",this.boxHandle.style.top=a[1]+"px",
this.keepBoxFix();
}
function a(t,e){
t&&t.constructor===Number&&(this.sw=t,this.boxHandle.style.width=this.sw+"px",$isBrowser("ie6")&&(this.boxIframeHandle.width=this.sw-2+"px")),
e&&e.constructor===Number&&(this.sh=e,this.boxHandle.style.height=this.sh+"px",$isBrowser("ie6")&&(this.boxIframeHandle.height=this.sh-2+"px")),
this.setPos();
}
function r(){
if(this.fix){
var t=this;
$isBrowser("ie6")?!t.fixTimer&&(t.fixTimer=setInterval(function(){
t.boxHandle.style.left=(t.left?t.left:$getPageScrollWidth()+($getWindowWidth()-t.sw)/2)+"px",
t.boxHandle.style.top=(t.top?t.top:$getPageScrollHeight()+($getWindowHeight()-t.sh)/2)+"px";
},30)):(t.boxHandle.style.position="fixed",t.boxHandle.style.left=(t.left?t.left:($getWindowWidth()-t.sw)/2)+"px",
t.boxHandle.style.top=(t.top?t.top:($getWindowHeight()-t.sh)/2)+"px");
}
}
function l(t,e){
function n(){
var t=document.createElement("div");
t.id="float_cover",t.style.display="none",t.style.width="0px",t.style.height="0px",
t.style.backgroundColor="rgb(0, 0, 0)",t.style.zIndex=250,t.style.position="fixed",
t.style.hasLayout=-1,t.style.left="0px",t.style.top="0px",t.style.filter="alpha(opacity="+100*u.opacity+");",
t.style.opacity=u.opacity,document.body.appendChild(t),$isBrowser("ie6")&&(t.innerHTML='<iframe frameBorder="0" style="position:absolute;left:0;top:0;width:100%;z-index:-1;border:none;" id="float_cover_iframe"></iframe>',
t.style.position="absolute"),c.data.cover=$id("float_cover"),c.data.coverIframe=$id("float_cover_iframe"),
c.data.coverIsShow=!1,c.data.coverSize=[0,0],t=null;
}
function o(){
function t(){
var t=c.data;
if(t.coverIsShow){
var e=($getContentHeight(),$getWindowHeight()),n=($getContentWidth(),$getWindowWidth()),o=[e,n];
$isBrowser("ie6")&&(t.cover.style.top=$getPageScrollHeight()+"px"),o.toString()!=c.data.coverSize.toString()&&(t.coverSize=o,
t.cover.style.height=o[0].toFixed(0)+"px",t.cover.style.width=o[1].toFixed(0)+"px",
t.coverIframe&&(t.coverIframe.style.height=o[0].toFixed(0)+"px",t.coverIframe.style.width=o[1].toFixed(0)+"px"));
}
}
c.data.cover.style.display="block",c.data.coverIsShow=!0,t(),c.data.coverTimer=setInterval(function(){
t();
},50);
}
function i(){
c.data.cover.style.display="none",c.data.coverIsShow=!1,clearInterval(c.data.coverTimer);
}
t&&e&&$loadCss(t),c.data={},c.data.zIndex=u.zindex,c.data.list=[],n(),c.data.showCover=o,
c.data.closeCover=i;
}
var u={
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
opacity:.7,
cover:!0,
isCoverClose:!1,
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
needOutCss:0,
cssUrl:window.config_float_css,
onInit:$empty(),
onClose:$empty()
};
for(var d in t)u[d]=t[d];
var c=arguments.callee,p=window.location.hostname,h=(-1!=p.indexOf("qq.com"),-1!=p.indexOf("buy.qq.com"),
-1!=p.indexOf("paipai.com"));
return h&&(u.bgframeLeft=0,u.bgframeTop=0),c.data?"":l(u.cssUrl,u.needOutCss),u.id=u.id?u.id:++c.data.zIndex,
u.close=e,u.destruct=n,u.closeOther=o,u.keepBoxFix=r,u.resize=a,u.show=i,u.setPos=s,
u.closeOther(),u.show(),c.data.list.push(u),u.dragble&&$initDragItem({
barDom:u.boxTitleHandle,
targetDom:u.boxHandle
}),u;
}
function $empty(){
return function(){
return!0;
};
}
function $getContentHeight(){
var t=document.body,e="BackCompat"==document.compatMode?t:document.documentElement;
return window.MessageEvent&&-1==navigator.userAgent.toLowerCase().indexOf("firefox")?t.scrollHeight:e.scrollHeight;
}
function $getContentWidth(){
var t=document.body,e="BackCompat"==document.compatMode?t:document.documentElement;
return window.MessageEvent&&-1==navigator.userAgent.toLowerCase().indexOf("firefox")?t.scrollWidth:e.scrollWidth;
}
function $getMousePosition(t){
var t=window.event?window.event:t;
t.evt&&(t=t.evt);
var e=[];
return"undefined"!=typeof t.pageX?e=[t.pageX,t.pageY]:"undefined"!=typeof t.clientX&&(e=[t.clientX+$getScrollPosition()[0],t.clientY+$getScrollPosition()[1]]),
e;
}
function $getPageScrollHeight(){
var t=document.body,e="BackCompat"==document.compatMode?t:document.documentElement,n=navigator.userAgent.toLowerCase();
return window.MessageEvent&&-1==n.indexOf("firefox")&&-1==n.indexOf("opera")&&-1==n.indexOf("msie")?t.scrollTop:e.scrollTop;
}
function $getPageScrollWidth(){
var t=document.body,e="BackCompat"==document.compatMode?t:document.documentElement;
return window.MessageEvent&&-1==navigator.userAgent.toLowerCase().indexOf("firefox")?t.scrollLeft:e.scrollLeft;
}
function $getScrollPosition(){
var t=document.documentElement,e=document.body,n=t&&t.scrollLeft||e&&e.scrollLeft||window.pageXOffset||0,o=t&&t.scrollTop||e&&e.scrollTop||window.pageYOffset||0;
return[n,o];
}
function $getWindowHeight(){
var t=document.body;
return("BackCompat"==document.compatMode?t:document.documentElement).clientHeight;
}
function $getWindowWidth(){
var t=document.body;
return("BackCompat"==document.compatMode?t:document.documentElement).clientWidth;
}
function $id(t){
return"string"==typeof t?document.getElementById(t):t;
}
function $initDragItem(t){
var e={
barDom:"",
targetDom:""
};
for(var n in t)e[n]=t[n];
var o=arguments.callee;
o.option?"":o.option={},e.barDom.style.cursor="move",e.targetDom.style.position="absolute",
e.barDom.onmousedown=function(t){
var t=window.event||t;
o.option.barDom=this,o.option.targetDom=e.targetDom;
var n=[parseInt(e.targetDom.style.left)?parseInt(e.targetDom.style.left):0,parseInt(e.targetDom.style.top)?parseInt(e.targetDom.style.top):0];
return o.option.diffPostion=[$getMousePosition({
evt:t
})[0]-n[0],$getMousePosition({
evt:t
})[1]-n[1]],document.onselectstart=function(){
return!1;
},window.onblur=window.onfocus=function(){
document.onmouseup();
},!1;
},e.targetDom.onmouseup=document.onmouseup=function(){
o.option.barDom&&(o.option={},document.onselectstart=window.onblur=window.onfocus=null);
},e.targetDom.onmousemove=document.onmousemove=function(t){
try{
var t=window.event||t;
o.option.barDom&&o.option.targetDom&&(o.option.targetDom.style.left=$getMousePosition({
evt:t
})[0]-o.option.diffPostion[0]+"px",o.option.targetDom.style.top=$getMousePosition({
evt:t
})[1]-o.option.diffPostion[1]+"px");
}catch(t){}
};
}
function $isBrowser(t){
t=t.toLowerCase();
var e=navigator.userAgent.toLowerCase(),n=[];
return n.firefox=-1!=e.indexOf("firefox"),n.opera=-1!=e.indexOf("opera"),n.safari=-1!=e.indexOf("safari"),
n.chrome=-1!=e.indexOf("chrome"),n.gecko=!n.opera&&!n.safari&&e.indexOf("gecko")>-1,
n.ie=!n.opera&&-1!=e.indexOf("msie"),n.ie6=!n.opera&&-1!=e.indexOf("msie 6"),n.ie7=!n.opera&&-1!=e.indexOf("msie 7"),
n.ie8=!n.opera&&-1!=e.indexOf("msie 8"),n.ie9=!n.opera&&-1!=e.indexOf("msie 9"),
n.ie10=!n.opera&&-1!=e.indexOf("msie 10"),n[t];
}
function $loadCss(t,e){
if(t){
var n;
return(!window._loadCss||window._loadCss.indexOf(t)<0)&&(n=document.createElement("link"),
n.setAttribute("type","text/css"),n.setAttribute("rel","stylesheet"),n.setAttribute("href",t),
n.setAttribute("id","loadCss"+Math.random()),document.getElementsByTagName("head")[0].appendChild(n),
window._loadCss?window._loadCss+="|"+t:window._loadCss="|"+t),n&&"function"==typeof e&&(n.onload=e),
!0;
}
}
function $md5(){
function t(t){
return e(n(d(t),t.length*f.chrsz));
}
function e(t){
for(var e=f.hexcase?"0123456789ABCDEF":"0123456789abcdef",n="",o=0;o<4*t.length;o++)n+=e.charAt(t[o>>2]>>o%4*8+4&15)+e.charAt(t[o>>2]>>o%4*8&15);
return n;
}
function n(t,e){
t[e>>5]|=128<<e%32,t[(e+64>>>9<<4)+14]=e;
for(var n=1732584193,o=-271733879,u=-1732584194,d=271733878,c=0;c<t.length;c+=16){
var p=n,h=o,f=u,m=d;
n=i(n,o,u,d,t[c+0],7,-680876936),d=i(d,n,o,u,t[c+1],12,-389564586),u=i(u,d,n,o,t[c+2],17,606105819),
o=i(o,u,d,n,t[c+3],22,-1044525330),n=i(n,o,u,d,t[c+4],7,-176418897),d=i(d,n,o,u,t[c+5],12,1200080426),
u=i(u,d,n,o,t[c+6],17,-1473231341),o=i(o,u,d,n,t[c+7],22,-45705983),n=i(n,o,u,d,t[c+8],7,1770035416),
d=i(d,n,o,u,t[c+9],12,-1958414417),u=i(u,d,n,o,t[c+10],17,-42063),o=i(o,u,d,n,t[c+11],22,-1990404162),
n=i(n,o,u,d,t[c+12],7,1804603682),d=i(d,n,o,u,t[c+13],12,-40341101),u=i(u,d,n,o,t[c+14],17,-1502002290),
o=i(o,u,d,n,t[c+15],22,1236535329),n=s(n,o,u,d,t[c+1],5,-165796510),d=s(d,n,o,u,t[c+6],9,-1069501632),
u=s(u,d,n,o,t[c+11],14,643717713),o=s(o,u,d,n,t[c+0],20,-373897302),n=s(n,o,u,d,t[c+5],5,-701558691),
d=s(d,n,o,u,t[c+10],9,38016083),u=s(u,d,n,o,t[c+15],14,-660478335),o=s(o,u,d,n,t[c+4],20,-405537848),
n=s(n,o,u,d,t[c+9],5,568446438),d=s(d,n,o,u,t[c+14],9,-1019803690),u=s(u,d,n,o,t[c+3],14,-187363961),
o=s(o,u,d,n,t[c+8],20,1163531501),n=s(n,o,u,d,t[c+13],5,-1444681467),d=s(d,n,o,u,t[c+2],9,-51403784),
u=s(u,d,n,o,t[c+7],14,1735328473),o=s(o,u,d,n,t[c+12],20,-1926607734),n=a(n,o,u,d,t[c+5],4,-378558),
d=a(d,n,o,u,t[c+8],11,-2022574463),u=a(u,d,n,o,t[c+11],16,1839030562),o=a(o,u,d,n,t[c+14],23,-35309556),
n=a(n,o,u,d,t[c+1],4,-1530992060),d=a(d,n,o,u,t[c+4],11,1272893353),u=a(u,d,n,o,t[c+7],16,-155497632),
o=a(o,u,d,n,t[c+10],23,-1094730640),n=a(n,o,u,d,t[c+13],4,681279174),d=a(d,n,o,u,t[c+0],11,-358537222),
u=a(u,d,n,o,t[c+3],16,-722521979),o=a(o,u,d,n,t[c+6],23,76029189),n=a(n,o,u,d,t[c+9],4,-640364487),
d=a(d,n,o,u,t[c+12],11,-421815835),u=a(u,d,n,o,t[c+15],16,530742520),o=a(o,u,d,n,t[c+2],23,-995338651),
n=r(n,o,u,d,t[c+0],6,-198630844),d=r(d,n,o,u,t[c+7],10,1126891415),u=r(u,d,n,o,t[c+14],15,-1416354905),
o=r(o,u,d,n,t[c+5],21,-57434055),n=r(n,o,u,d,t[c+12],6,1700485571),d=r(d,n,o,u,t[c+3],10,-1894986606),
u=r(u,d,n,o,t[c+10],15,-1051523),o=r(o,u,d,n,t[c+1],21,-2054922799),n=r(n,o,u,d,t[c+8],6,1873313359),
d=r(d,n,o,u,t[c+15],10,-30611744),u=r(u,d,n,o,t[c+6],15,-1560198380),o=r(o,u,d,n,t[c+13],21,1309151649),
n=r(n,o,u,d,t[c+4],6,-145523070),d=r(d,n,o,u,t[c+11],10,-1120210379),u=r(u,d,n,o,t[c+2],15,718787259),
o=r(o,u,d,n,t[c+9],21,-343485551),n=l(n,p),o=l(o,h),u=l(u,f),d=l(d,m);
}
return Array(n,o,u,d);
}
function o(t,e,n,o,i,s){
return l(u(l(l(e,t),l(o,s)),i),n);
}
function i(t,e,n,i,s,a,r){
return o(e&n|~e&i,t,e,s,a,r);
}
function s(t,e,n,i,s,a,r){
return o(e&i|n&~i,t,e,s,a,r);
}
function a(t,e,n,i,s,a,r){
return o(e^n^i,t,e,s,a,r);
}
function r(t,e,n,i,s,a,r){
return o(n^(e|~i),t,e,s,a,r);
}
function l(t,e){
var n=(65535&t)+(65535&e),o=(t>>16)+(e>>16)+(n>>16);
return o<<16|65535&n;
}
function u(t,e){
return t<<e|t>>>32-e;
}
function d(t){
for(var e=Array(),n=(1<<f.chrsz)-1,o=0;o<t.length*f.chrsz;o+=f.chrsz)e[o>>5]|=(t.charCodeAt(o/f.chrsz)&n)<<o%32;
return e;
}
var c=0,p="",h=8,f={};
return f.hexcase=c,f.b64pad=p,f.chrsz=h,f.hex_md5=t,f.binl2hex=e,f.core_md5=n,f;
}
function $param(){
return $strToJson(location.search,"?","&");
}
function $strToJson(t,e,n){
for(var o=t.replace(e,"").split(n),i={},s=0,a=o.length;a>s;s++){
var r=o[s].split("=");
i[r[0]]=r[1];
}
return i;
}
function $str2Json(t){
try{
var e=new Function("return "+t)();
return e;
}catch(n){
return{};
}
}
function $transJson2str(t){
if(null===t)return"null";
if(void 0==t)return"";
var e=[];
if("string"==typeof t)return'"'+t.replace(/([\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+'"';
if("object"==typeof t){
if(t.nodeName)e.push(["document node","nodeName:"+t.nodeName,"id:"+t.id,"class:"+t.className].join("-")),
e="{"+e.join()+"}";else if(t.sort){
for(var n=0;n<t.length;n++)e.push($transJson2str(t[n]));
e="["+e.join()+"]";
}else{
for(var n in t)e.push('"'+n+'":'+$transJson2str(t[n]));
document.all&&!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(t.toString)&&e.push("toString:"+t.toString.toString()),
e="{"+e.join()+"}";
}
return e;
}
return t.toString().replace(/\"\:/g,'":""');
}
function $htmlEncode(t){
return"string"!=typeof t?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/\'/g,"&apos;").replace(/ /g,"&nbsp;");
}
function $htmlDecode(t){
return"string"!=typeof t?"":t.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&nbsp;/g," ").replace(/&#39;/g,"'").replace(/&amp;/g,"&").replace(/&#47;/g,"/");
}
function $SWFUpload(option){
if(alert("SWFUpload start."),window.SWFUpload)return new window.SWFUpload(option);
var SWFUpload;
return void 0==SWFUpload&&(SWFUpload=function(t){
this.initSWFUpload(t);
}),alert("initSWFUpload start."),SWFUpload.prototype.initSWFUpload=function(t){
try{
this.customSettings={},this.settings=t,this.eventQueue=[],this.movieName="SWFUpload_"+SWFUpload.movieCount++,
this.movieElement=null,SWFUpload.instances[this.movieName]=this,this.initSettings(),
this.loadFlash(),this.displayDebugInfo();
}catch(e){
throw delete SWFUpload.instances[this.movieName],e;
}
},SWFUpload.copyRight=["SWFUpload: http://www.swfupload.org, http://swfupload.googlecode.com","SWFUpload is (c) 2006-2007 Lars Huring, Olov Nilz? and Mammon Media and is released under the MIT License:","http://www.opensource.org/licenses/mit-license.php","SWFUpload is (c) 2006-2007 Lars Huring, Olov Nilz? and Mammon Media and is released under the MIT License:","http://www.opensource.org/licenses/mit-license.php","SWFUpload 2 is (c) 2007-2008 Jake Roberts and is released under the MIT License:","http://www.opensource.org/licenses/mit-license.php"],
SWFUpload.instances={},SWFUpload.movieCount=0,SWFUpload.version="2.2.0 2009-03-25",
SWFUpload.QUEUE_ERROR={
QUEUE_LIMIT_EXCEEDED:-100,
FILE_EXCEEDS_SIZE_LIMIT:-110,
ZERO_BYTE_FILE:-120,
INVALID_FILETYPE:-130
},SWFUpload.UPLOAD_ERROR={
HTTP_ERROR:-200,
MISSING_UPLOAD_URL:-210,
IO_ERROR:-220,
SECURITY_ERROR:-230,
UPLOAD_LIMIT_EXCEEDED:-240,
UPLOAD_FAILED:-250,
SPECIFIED_FILE_ID_NOT_FOUND:-260,
FILE_VALIDATION_FAILED:-270,
FILE_CANCELLED:-280,
UPLOAD_STOPPED:-290
},SWFUpload.FILE_STATUS={
QUEUED:-1,
IN_PROGRESS:-2,
ERROR:-3,
COMPLETE:-4,
CANCELLED:-5
},SWFUpload.BUTTON_ACTION={
SELECT_FILE:-100,
SELECT_FILES:-110,
START_UPLOAD:-120
},SWFUpload.CURSOR={
ARROW:-1,
HAND:-2
},SWFUpload.WINDOW_MODE={
WINDOW:"window",
TRANSPARENT:"transparent",
OPAQUE:"opaque"
},SWFUpload.completeURL=function(t){
if("string"!=typeof t||t.match(/^https?:\/\//i)||t.match(/^\//))return t;
var e=(window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:""),
window.location.pathname.lastIndexOf("/"));
return path=0>=e?"/":window.location.pathname.substr(0,e)+"/",path+t;
},SWFUpload.prototype.initSettings=function(){
this.ensureDefault=function(t,e){
this.settings[t]=void 0==this.settings[t]?e:this.settings[t];
},this.ensureDefault("upload_url",""),this.ensureDefault("preserve_relative_urls",!1),
this.ensureDefault("file_post_name","Filedata"),this.ensureDefault("post_params",{}),
this.ensureDefault("use_query_string",!1),this.ensureDefault("requeue_on_error",!1),
this.ensureDefault("http_success",[]),this.ensureDefault("assume_success_timeout",0),
this.ensureDefault("file_types","*.*"),this.ensureDefault("file_types_description","All Files"),
this.ensureDefault("file_size_limit",0),this.ensureDefault("file_upload_limit",0),
this.ensureDefault("file_queue_limit",0),this.ensureDefault("flash_url","swfupload.swf"),
this.ensureDefault("prevent_swf_caching",!0),this.ensureDefault("button_image_url",""),
this.ensureDefault("button_width",1),this.ensureDefault("button_height",1),this.ensureDefault("button_text",""),
this.ensureDefault("button_text_style","color: #000000; font-size: 16pt;"),this.ensureDefault("button_text_top_padding",0),
this.ensureDefault("button_text_left_padding",0),this.ensureDefault("button_action",SWFUpload.BUTTON_ACTION.SELECT_FILES),
this.ensureDefault("button_disabled",!1),this.ensureDefault("button_placeholder_id",""),
this.ensureDefault("button_placeholder",null),this.ensureDefault("button_cursor",SWFUpload.CURSOR.ARROW),
this.ensureDefault("button_window_mode",SWFUpload.WINDOW_MODE.WINDOW),this.ensureDefault("debug",!1),
this.settings.debug_enabled=this.settings.debug,this.settings.return_upload_start_handler=this.returnUploadStart,
this.ensureDefault("swfupload_loaded_handler",null),this.ensureDefault("file_dialog_start_handler",null),
this.ensureDefault("file_queued_handler",null),this.ensureDefault("file_queue_error_handler",null),
this.ensureDefault("file_dialog_complete_handler",null),this.ensureDefault("upload_start_handler",null),
this.ensureDefault("upload_progress_handler",null),this.ensureDefault("upload_error_handler",null),
this.ensureDefault("upload_success_handler",null),this.ensureDefault("upload_complete_handler",null),
this.ensureDefault("debug_handler",this.debugMessage),this.ensureDefault("custom_settings",{}),
this.ensureDefault("object_class","swfupload"),this.customSettings=this.settings.custom_settings,
this.settings.prevent_swf_caching&&(this.settings.flash_url=this.settings.flash_url+(this.settings.flash_url.indexOf("?")<0?"?":"&")+"preventswfcaching="+(new Date).getTime()),
this.settings.preserve_relative_urls||(this.settings.upload_url=SWFUpload.completeURL(this.settings.upload_url),
this.settings.button_image_url=SWFUpload.completeURL(this.settings.button_image_url)),
delete this.ensureDefault;
},SWFUpload.prototype.loadFlash=function(){
var t,e;
if(null!==document.getElementById(this.movieName))throw"ID "+this.movieName+" is already in use. The Flash Object could not be added";
if(t=document.getElementById(this.settings.button_placeholder_id)||this.settings.button_placeholder,
void 0==t)throw"Could not find the placeholder element: "+this.settings.button_placeholder_id;
e=document.createElement("div"),e.innerHTML=this.getFlashHTML(),t.parentNode.replaceChild(e.firstChild,t),
void 0==window[this.movieName]&&(window[this.movieName]=this.getMovieElement());
},SWFUpload.prototype.getFlashHTML=function(){
return['<object id="',this.movieName,'" type="application/x-shockwave-flash" data="',this.settings.flash_url,'" width="',this.settings.button_width,'" height="',this.settings.button_height,'" class="',this.settings.object_class,'">','<param name="wmode" value="',this.settings.button_window_mode,'" />','<param name="movie" value="',this.settings.flash_url,'" />','<param name="quality" value="high" />','<param name="menu" value="false" />','<param name="allowScriptAccess" value="always" />','<param name="flashvars" value="'+this.getFlashVars()+'" />',"</object>"].join("");
},SWFUpload.prototype.getFlashVars=function(){
var t=this.buildParamString(),e=this.settings.http_success.join(",");
return["movieName=",encodeURIComponent(this.movieName),"&amp;uploadURL=",encodeURIComponent(this.settings.upload_url),"&amp;useQueryString=",encodeURIComponent(this.settings.use_query_string),"&amp;requeueOnError=",encodeURIComponent(this.settings.requeue_on_error),"&amp;httpSuccess=",encodeURIComponent(e),"&amp;assumeSuccessTimeout=",encodeURIComponent(this.settings.assume_success_timeout),"&amp;params=",encodeURIComponent(t),"&amp;filePostName=",encodeURIComponent(this.settings.file_post_name),"&amp;fileTypes=",encodeURIComponent(this.settings.file_types),"&amp;fileTypesDescription=",encodeURIComponent(this.settings.file_types_description),"&amp;fileSizeLimit=",encodeURIComponent(this.settings.file_size_limit),"&amp;fileUploadLimit=",encodeURIComponent(this.settings.file_upload_limit),"&amp;fileQueueLimit=",encodeURIComponent(this.settings.file_queue_limit),"&amp;debugEnabled=",encodeURIComponent(this.settings.debug_enabled),"&amp;buttonImageURL=",encodeURIComponent(this.settings.button_image_url),"&amp;buttonWidth=",encodeURIComponent(this.settings.button_width),"&amp;buttonHeight=",encodeURIComponent(this.settings.button_height),"&amp;buttonText=",encodeURIComponent(this.settings.button_text),"&amp;buttonTextTopPadding=",encodeURIComponent(this.settings.button_text_top_padding),"&amp;buttonTextLeftPadding=",encodeURIComponent(this.settings.button_text_left_padding),"&amp;buttonTextStyle=",encodeURIComponent(this.settings.button_text_style),"&amp;buttonAction=",encodeURIComponent(this.settings.button_action),"&amp;buttonDisabled=",encodeURIComponent(this.settings.button_disabled),"&amp;buttonCursor=",encodeURIComponent(this.settings.button_cursor)].join("");
},SWFUpload.prototype.getMovieElement=function(){
if(void 0==this.movieElement&&(this.movieElement=document.getElementById(this.movieName)),
null===this.movieElement)throw"Could not find Flash element";
return this.movieElement;
},SWFUpload.prototype.buildParamString=function(){
var t=this.settings.post_params,e=[];
if("object"==typeof t)for(var n in t)t.hasOwnProperty(n)&&e.push(encodeURIComponent(n.toString())+"="+encodeURIComponent(t[n].toString()));
return e.join("&amp;");
},SWFUpload.prototype.destroy=function(){
try{
this.cancelUpload(null,!1);
var t=null;
if(t=this.getMovieElement(),t&&"unknown"==typeof t.CallFunction){
for(var e in t)try{
"function"==typeof t[e]&&(t[e]=null);
}catch(n){}
try{
t.parentNode.removeChild(t);
}catch(o){}
}
return window[this.movieName]=null,SWFUpload.instances[this.movieName]=null,delete SWFUpload.instances[this.movieName],
this.movieElement=null,this.settings=null,this.customSettings=null,this.eventQueue=null,
this.movieName=null,!0;
}catch(i){
return!1;
}
},SWFUpload.prototype.displayDebugInfo=function(){
this.debug(["---SWFUpload Instance Info---\n","Version: ",SWFUpload.version,"\n","Movie Name: ",this.movieName,"\n","Settings:\n","	","upload_url:               ",this.settings.upload_url,"\n","	","flash_url:                ",this.settings.flash_url,"\n","	","use_query_string:         ",this.settings.use_query_string.toString(),"\n","	","requeue_on_error:         ",this.settings.requeue_on_error.toString(),"\n","	","http_success:             ",this.settings.http_success.join(", "),"\n","	","assume_success_timeout:   ",this.settings.assume_success_timeout,"\n","	","file_post_name:           ",this.settings.file_post_name,"\n","	","post_params:              ",this.settings.post_params.toString(),"\n","	","file_types:               ",this.settings.file_types,"\n","	","file_types_description:   ",this.settings.file_types_description,"\n","	","file_size_limit:          ",this.settings.file_size_limit,"\n","	","file_upload_limit:        ",this.settings.file_upload_limit,"\n","	","file_queue_limit:         ",this.settings.file_queue_limit,"\n","	","debug:                    ",this.settings.debug.toString(),"\n","	","prevent_swf_caching:      ",this.settings.prevent_swf_caching.toString(),"\n","	","button_placeholder_id:    ",this.settings.button_placeholder_id.toString(),"\n","	","button_placeholder:       ",this.settings.button_placeholder?"Set":"Not Set","\n","	","button_image_url:         ",this.settings.button_image_url.toString(),"\n","	","button_width:             ",this.settings.button_width.toString(),"\n","	","button_height:            ",this.settings.button_height.toString(),"\n","	","button_text:              ",this.settings.button_text.toString(),"\n","	","button_text_style:        ",this.settings.button_text_style.toString(),"\n","	","button_text_top_padding:  ",this.settings.button_text_top_padding.toString(),"\n","	","button_text_left_padding: ",this.settings.button_text_left_padding.toString(),"\n","	","button_action:            ",this.settings.button_action.toString(),"\n","	","button_disabled:          ",this.settings.button_disabled.toString(),"\n","	","custom_settings:          ",this.settings.custom_settings.toString(),"\n","Event Handlers:\n","	","swfupload_loaded_handler assigned:  ",("function"==typeof this.settings.swfupload_loaded_handler).toString(),"\n","	","file_dialog_start_handler assigned: ",("function"==typeof this.settings.file_dialog_start_handler).toString(),"\n","	","file_queued_handler assigned:       ",("function"==typeof this.settings.file_queued_handler).toString(),"\n","	","file_queue_error_handler assigned:  ",("function"==typeof this.settings.file_queue_error_handler).toString(),"\n","	","upload_start_handler assigned:      ",("function"==typeof this.settings.upload_start_handler).toString(),"\n","	","upload_progress_handler assigned:   ",("function"==typeof this.settings.upload_progress_handler).toString(),"\n","	","upload_error_handler assigned:      ",("function"==typeof this.settings.upload_error_handler).toString(),"\n","	","upload_success_handler assigned:    ",("function"==typeof this.settings.upload_success_handler).toString(),"\n","	","upload_complete_handler assigned:   ",("function"==typeof this.settings.upload_complete_handler).toString(),"\n","	","debug_handler assigned:             ",("function"==typeof this.settings.debug_handler).toString(),"\n"].join(""));
},SWFUpload.prototype.addSetting=function(t,e,n){
return this.settings[t]=void 0==e?n:e;
},SWFUpload.prototype.getSetting=function(t){
return void 0!=this.settings[t]?this.settings[t]:"";
},SWFUpload.prototype.callFlash=function(functionName,argumentArray){
argumentArray=argumentArray||[];
var movieElement=this.getMovieElement(),returnValue,returnString;
try{
returnString=movieElement.CallFunction('<invoke name="'+functionName+'" returntype="javascript">'+__flash__argumentsToXML(argumentArray,0)+"</invoke>"),
returnValue=eval(returnString);
}catch(ex){
throw"Call to "+functionName+" failed";
}
return void 0!=returnValue&&"object"==typeof returnValue.post&&(returnValue=this.unescapeFilePostParams(returnValue)),
returnValue;
},SWFUpload.prototype.selectFile=function(){
this.callFlash("SelectFile");
},SWFUpload.prototype.selectFiles=function(){
this.callFlash("SelectFiles");
},SWFUpload.prototype.startUpload=function(t){
alert("startUpload fileID: "+t),this.callFlash("StartUpload",[t]);
},SWFUpload.prototype.cancelUpload=function(t,e){
e!==!1&&(e=!0),this.callFlash("CancelUpload",[t,e]);
},SWFUpload.prototype.stopUpload=function(){
this.callFlash("StopUpload");
},SWFUpload.prototype.getStats=function(){
return this.callFlash("GetStats");
},SWFUpload.prototype.setStats=function(t){
this.callFlash("SetStats",[t]);
},SWFUpload.prototype.getFile=function(t){
return"number"==typeof t?this.callFlash("GetFileByIndex",[t]):this.callFlash("GetFile",[t]);
},SWFUpload.prototype.addFileParam=function(t,e,n){
return this.callFlash("AddFileParam",[t,e,n]);
},SWFUpload.prototype.removeFileParam=function(t,e){
this.callFlash("RemoveFileParam",[t,e]);
},SWFUpload.prototype.setUploadURL=function(t){
this.settings.upload_url=t.toString(),this.callFlash("SetUploadURL",[t]);
},SWFUpload.prototype.setPostParams=function(t){
this.settings.post_params=t,this.callFlash("SetPostParams",[t]);
},SWFUpload.prototype.addPostParam=function(t,e){
this.settings.post_params[t]=e,this.callFlash("SetPostParams",[this.settings.post_params]);
},SWFUpload.prototype.removePostParam=function(t){
delete this.settings.post_params[t],this.callFlash("SetPostParams",[this.settings.post_params]);
},SWFUpload.prototype.setFileTypes=function(t,e){
this.settings.file_types=t,this.settings.file_types_description=e,this.callFlash("SetFileTypes",[t,e]);
},SWFUpload.prototype.setFileSizeLimit=function(t){
this.settings.file_size_limit=t,this.callFlash("SetFileSizeLimit",[t]);
},SWFUpload.prototype.setFileUploadLimit=function(t){
this.settings.file_upload_limit=t,this.callFlash("SetFileUploadLimit",[t]);
},SWFUpload.prototype.setFileQueueLimit=function(t){
this.settings.file_queue_limit=t,this.callFlash("SetFileQueueLimit",[t]);
},SWFUpload.prototype.setFilePostName=function(t){
this.settings.file_post_name=t,this.callFlash("SetFilePostName",[t]);
},SWFUpload.prototype.setUseQueryString=function(t){
this.settings.use_query_string=t,this.callFlash("SetUseQueryString",[t]);
},SWFUpload.prototype.setRequeueOnError=function(t){
this.settings.requeue_on_error=t,this.callFlash("SetRequeueOnError",[t]);
},SWFUpload.prototype.setHTTPSuccess=function(t){
"string"==typeof t&&(t=t.replace(" ","").split(",")),this.settings.http_success=t,
this.callFlash("SetHTTPSuccess",[t]);
},SWFUpload.prototype.setAssumeSuccessTimeout=function(t){
this.settings.assume_success_timeout=t,this.callFlash("SetAssumeSuccessTimeout",[t]);
},SWFUpload.prototype.setDebugEnabled=function(t){
this.settings.debug_enabled=t,this.callFlash("SetDebugEnabled",[t]);
},SWFUpload.prototype.setButtonImageURL=function(t){
void 0==t&&(t=""),this.settings.button_image_url=t,this.callFlash("SetButtonImageURL",[t]);
},SWFUpload.prototype.setButtonDimensions=function(t,e){
this.settings.button_width=t,this.settings.button_height=e;
var n=this.getMovieElement();
void 0!=n&&(n.style.width=t+"px",n.style.height=e+"px"),this.callFlash("SetButtonDimensions",[t,e]);
},SWFUpload.prototype.setButtonText=function(t){
this.settings.button_text=t,this.callFlash("SetButtonText",[t]);
},SWFUpload.prototype.setButtonTextPadding=function(t,e){
this.settings.button_text_top_padding=e,this.settings.button_text_left_padding=t,
this.callFlash("SetButtonTextPadding",[t,e]);
},SWFUpload.prototype.setButtonTextStyle=function(t){
this.settings.button_text_style=t,this.callFlash("SetButtonTextStyle",[t]);
},SWFUpload.prototype.setButtonDisabled=function(t){
this.settings.button_disabled=t,this.callFlash("SetButtonDisabled",[t]);
},SWFUpload.prototype.setButtonAction=function(t){
this.settings.button_action=t,this.callFlash("SetButtonAction",[t]);
},SWFUpload.prototype.setButtonCursor=function(t){
this.settings.button_cursor=t,this.callFlash("SetButtonCursor",[t]);
},SWFUpload.prototype.queueEvent=function(t,e){
void 0==e?e=[]:e instanceof Array||(e=[e]);
var n=this;
if("function"==typeof this.settings[t])this.eventQueue.push(function(){
this.settings[t].apply(this,e);
}),setTimeout(function(){
n.executeNextEvent();
},0);else if(null!==this.settings[t])throw"Event handler "+t+" is unknown or is not a function";
},SWFUpload.prototype.executeNextEvent=function(){
var t=this.eventQueue?this.eventQueue.shift():null;
"function"==typeof t&&t.apply(this);
},SWFUpload.prototype.unescapeFilePostParams=function(t){
var e,n=/[$]([0-9a-f]{4})/i,o={};
if(void 0!=t){
for(var i in t.post)if(t.post.hasOwnProperty(i)){
e=i;
for(var s;null!==(s=n.exec(e));)e=e.replace(s[0],String.fromCharCode(parseInt("0x"+s[1],16)));
o[e]=t.post[i];
}
t.post=o;
}
return t;
},SWFUpload.prototype.testExternalInterface=function(){
try{
return this.callFlash("TestExternalInterface");
}catch(t){
return!1;
}
},SWFUpload.prototype.flashReady=function(){
var t=this.getMovieElement();
return t?(this.cleanUp(t),void this.queueEvent("swfupload_loaded_handler")):void this.debug("Flash called back ready but the flash movie can't be found.");
},SWFUpload.prototype.cleanUp=function(t){
try{
if(this.movieElement&&"unknown"==typeof t.CallFunction){
this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
for(var e in t)try{
"function"==typeof t[e]&&(t[e]=null);
}catch(n){}
}
}catch(o){}
window.__flash__removeCallback=function(t,e){
try{
t&&(t[e]=null);
}catch(n){}
};
},SWFUpload.prototype.fileDialogStart=function(){
this.queueEvent("file_dialog_start_handler");
},SWFUpload.prototype.fileQueued=function(t){
t=this.unescapeFilePostParams(t),this.queueEvent("file_queued_handler",t);
},SWFUpload.prototype.fileQueueError=function(t,e,n){
t=this.unescapeFilePostParams(t),this.queueEvent("file_queue_error_handler",[t,e,n]);
},SWFUpload.prototype.fileDialogComplete=function(t,e,n){
this.queueEvent("file_dialog_complete_handler",[t,e,n]);
},SWFUpload.prototype.uploadStart=function(t){
t=this.unescapeFilePostParams(t),this.queueEvent("return_upload_start_handler",t);
},SWFUpload.prototype.returnUploadStart=function(t){
var e;
if("function"==typeof this.settings.upload_start_handler)t=this.unescapeFilePostParams(t),
e=this.settings.upload_start_handler.call(this,t);else if(void 0!=this.settings.upload_start_handler)throw"upload_start_handler must be a function";
void 0===e&&(e=!0),e=!!e,this.callFlash("ReturnUploadStart",[e]);
},SWFUpload.prototype.uploadProgress=function(t,e,n){
t=this.unescapeFilePostParams(t),this.queueEvent("upload_progress_handler",[t,e,n]);
},SWFUpload.prototype.uploadError=function(t,e,n){
t=this.unescapeFilePostParams(t),this.queueEvent("upload_error_handler",[t,e,n]);
},SWFUpload.prototype.uploadSuccess=function(t,e,n){
t=this.unescapeFilePostParams(t),this.queueEvent("upload_success_handler",[t,e,n]);
},SWFUpload.prototype.uploadComplete=function(t){
t=this.unescapeFilePostParams(t),this.queueEvent("upload_complete_handler",t);
},SWFUpload.prototype.debug=function(t){
this.queueEvent("debug_handler",t);
},SWFUpload.prototype.debugMessage=function(t){
if(this.settings.debug){
var e,n=[];
if("object"==typeof t&&"string"==typeof t.name&&"string"==typeof t.message){
for(var o in t)t.hasOwnProperty(o)&&n.push(o+": "+t[o]);
e=n.join("\n")||"",n=e.split("\n"),e="EXCEPTION: "+n.join("\nEXCEPTION: "),SWFUpload.Console.writeLine(e);
}else SWFUpload.Console.writeLine(t);
}
},SWFUpload.Console={},SWFUpload.Console.writeLine=function(t){
var e,n;
try{
e=document.getElementById("SWFUpload_Console"),e||(n=document.createElement("form"),
document.getElementsByTagName("body")[0].appendChild(n),e=document.createElement("textarea"),
e.id="SWFUpload_Console",e.style.fontFamily="monospace",e.setAttribute("wrap","off"),
e.wrap="off",e.style.overflow="auto",e.style.width="700px",e.style.height="350px",
e.style.margin="5px",n.appendChild(e)),e.value+=t+"\n",e.scrollTop=e.scrollHeight-e.clientHeight;
}catch(o){
alert("Exception: "+o.name+" Message: "+o.message);
}
},window.SWFUpload=SWFUpload,new window.SWFUpload(option);
}
function $formatDate(t,e){
var n=["日","一","二","三","四","五","六"],o=e.replace(/yyyy|YYYY/,t.getFullYear()).replace(/yy|YY/,$addZero(t.getFullYear()%100,2)).replace(/mm|MM/,$addZero(t.getMonth()+1,2)).replace(/m|M/g,t.getMonth()+1).replace(/dd|DD/,$addZero(t.getDate(),2)).replace(/d|D/g,t.getDate()).replace(/hh|HH/,$addZero(t.getHours(),2)).replace(/h|H/g,t.getHours()).replace(/ii|II/,$addZero(t.getMinutes(),2)).replace(/i|I/g,t.getMinutes()).replace(/ss|SS/,$addZero(t.getSeconds(),2)).replace(/s|S/g,t.getSeconds()).replace(/w/g,t.getDay()).replace(/W/g,n[t.getDay()]);
return o;
}
function $addZero(t,e){
for(var n=0,o=e-(t+"").length;o>n;n++)t="0"+t;
return t+"";
}
function $flashChecker(){
var t=0,e=0;
if(document.all)try{
var n=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.9");
n&&(t=1,VSwf=n.GetVariable("$version"),e=parseInt(VSwf.split(" ")[1].split(",")[0]));
}catch(o){
t=0;
}else if(navigator.plugins&&navigator.plugins.length>0)try{
var n=navigator.plugins["Shockwave Flash"];
if(n){
t=1;
for(var i=n.description.split(" "),s=0;s<i.length;++s)isNaN(parseInt(i[s]))||(e=parseInt(i[s]));
}
}catch(o){
t=0;
}
return{
f:t,
v:e
};
}
function $log(t){
try{
console.log(t);
}catch(e){}
}
function $asyncLoadJS(t,e){
function n(){
if(!this.readyState||"loaded"==this.readyState||"complete"==this.readyState)for(var t=this.callback,e=0;e<t.length;e++){
var n=t[e];
"function"==typeof n&&n();
}
}
for(var o=document.getElementsByTagName("script"),i=0;i<o.length;i++)if(o[i].src==t)return o[i].onload=o[i].onreadystatechange=n,
o[i].callback||(o[i].callback=[]),void o[i].callback.push(e);
var s=document.createElement("script");
s.type="text/javascript",s.src=t,document.getElementsByTagName("head")[0].appendChild(s),
s.onload=s.onreadystatechange=n,s.callback||(s.callback=[]),s.callback.push(e);
}
var $ajax=function(t,e){
var n,o=0,i=t.ActiveXObject?function(){
for(var t in n)n[t](0,1);
}:!1;
return function(s){
var a={
url:"",
method:"GET",
data:null,
type:"text",
async:!0,
cache:!1,
timeout:0,
autoToken:!0,
username:"",
password:"",
beforeSend:$empty(),
onSuccess:$empty(),
onError:$empty(),
onComplete:$empty()
};
for(var r in s)a[r]=s[r];
var l,u,d,c,p;
try{
c=location.href;
}catch(h){
c=document.createElement("a"),c.href="",c=c.href;
}
if(p=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/.exec(c.toLowerCase())||[],
a.isLocal=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(p[1]),
a.method="string"!=typeof a.method||"POST"!=a.method.toUpperCase()?"GET":"POST",
a.data="string"==typeof a.data?a.data:$makeUrl(a.data),"GET"==a.method&&a.data&&(a.url+=(a.url.indexOf("?")<0?"?":"&")+a.data),
a.autoToken&&(a.url=$addToken(a.url,"ajax")),a.xhr=$xhrMaker(),null===a.xhr)return!1;
try{
a.username?a.xhr.open(a.method,a.url,a.async,a.username,a.password):a.xhr.open(a.method,a.url,a.async);
}catch(h){
return a.onError(-2,h),!1;
}
"POST"==a.method&&a.xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),
a.cache||(a.xhr.setRequestHeader("If-Modified-Since","Thu, 1 Jan 1970 00:00:00 GMT"),
a.xhr.setRequestHeader("Cache-Control","no-cache")),a.beforeSend(a.xhr),a.async&&a.timeout>0&&(a.xhr.timeout===e?u=setTimeout(function(){
a.xhr&&l&&l(0,1),a.onError(0,null,"timeout");
},a.timeout):(a.xhr.timeout=a.timeout,a.xhr.ontimeout=function(){
a.xhr&&l&&l(0,1),a.onError(0,null,"timeout");
})),a.xhr.send("POST"==a.method?a.data:null),l=function(t,o){
if(u&&(clearTimeout(u),u=e),l&&(o||4===a.xhr.readyState)){
if(l=e,d&&(a.xhr.onreadystatechange=$empty(),i))try{
delete n[d];
}catch(t){}
if(o)4!==a.xhr.readyState&&a.xhr.abort();else{
var s,r,c;
c={
headers:a.xhr.getAllResponseHeaders()
},s=a.xhr.status;
try{
r=a.xhr.statusText;
}catch(t){
r="";
}
try{
c.text=a.xhr.responseText;
}catch(t){
c.text="";
}
if(!s&&a.isLocal?s=c.text?200:404:1223===s&&(s=204),s>=200&&300>s)switch(c.text=c.text.replace(/<!--\[if !IE\]>[\w\|]+<!\[endif\]-->/g,""),
a.type){
case"text":
a.onSuccess(c.text);
break;

case"json":
var p;
try{
p=new Function("return ("+c.text+")")();
}catch(t){
a.onError(s,t,c.text);
}
p&&a.onSuccess(p);
break;

case"xml":
a.onSuccess(a.xhr.responseXML);
}else 0===s&&a.timeout>0?a.onError(s,null,"timeout"):a.onError(s,null,r);
a.onComplete(s,r,c);
}
delete a.xhr;
}
},a.async?4===a.xhr.readyState?setTimeout(l,0):(d=++o,i&&(n||(n={},t.attachEvent?t.attachEvent("onunload",i):t.onunload=i),
n[d]=l),a.xhr.onreadystatechange=l):l();
};
}(window,void 0);