define("biz_web/lib/swfobject.js",[],function(){
var e=function(){
function t(){
if(!G){
try{
var e=V.getElementsByTagName("body")[0].appendChild(m("span"));
e.parentNode.removeChild(e);
}catch(t){
return;
}
G=!0;
for(var n=D.length,a=0;n>a;a++)D[a]();
}
}
function n(e){
G?e():D[D.length]=e;
}
function a(e){
if(typeof M.addEventListener!=k)M.addEventListener("load",e,!1);else if(typeof V.addEventListener!=k)V.addEventListener("load",e,!1);else if(typeof M.attachEvent!=k)g(M,"onload",e);else if("function"==typeof M.onload){
var t=M.onload;
M.onload=function(){
t(),e();
};
}else M.onload=e;
}
function i(){
R?r():o();
}
function r(){
var e=V.getElementsByTagName("body")[0],t=m(B);
t.setAttribute("type",F);
var n=e.appendChild(t);
if(n){
var a=0;
!function(){
if(typeof n.GetVariable!=k){
var i=n.GetVariable("$version");
i&&(i=i.split(" ")[1].split(","),X.pv=[parseInt(i[0],10),parseInt(i[1],10),parseInt(i[2],10)]);
}else if(10>a)return a++,void setTimeout(arguments.callee,10);
e.removeChild(t),n=null,o();
}();
}else o();
}
function o(){
var e=W.length;
if(e>0)for(var t=0;e>t;t++){
var n=W[t].id,a=W[t].callbackFn,i={
success:!1,
id:n
};
if(X.pv[0]>0){
var r=h(n);
if(r)if(!w(W[t].swfVersion)||X.wk&&X.wk<312)if(W[t].expressInstall&&s()){
var o={};
o.data=W[t].expressInstall,o.width=r.getAttribute("width")||"0",o.height=r.getAttribute("height")||"0",
r.getAttribute("class")&&(o.styleclass=r.getAttribute("class")),r.getAttribute("align")&&(o.align=r.getAttribute("align"));
for(var f={},u=r.getElementsByTagName("param"),p=u.length,v=0;p>v;v++)"movie"!=u[v].getAttribute("name").toLowerCase()&&(f[u[v].getAttribute("name")]=u[v].getAttribute("value"));
c(o,f,n,a);
}else d(r),a&&a(i);else C(n,!0),a&&(i.success=!0,i.ref=l(n),a(i));
}else if(C(n,!0),a){
var y=l(n);
y&&typeof y.SetVariable!=k&&(i.success=!0,i.ref=y),a(i);
}
}
}
function l(e){
var t=null,n=h(e);
if(n&&"OBJECT"==n.nodeName)if(typeof n.SetVariable!=k)t=n;else{
var a=n.getElementsByTagName(B)[0];
a&&(t=a);
}
return t;
}
function s(){
return!J&&w("6.0.65")&&(X.win||X.mac)&&!(X.wk&&X.wk<312);
}
function c(e,t,n,a){
J=!0,N=a||null,T={
success:!1,
id:n
};
var i=h(n);
if(i){
"OBJECT"==i.nodeName?(S=f(i),A=null):(S=i,A=n),e.id=$,(typeof e.width==k||!/%$/.test(e.width)&&parseInt(e.width,10)<310)&&(e.width="310"),
(typeof e.height==k||!/%$/.test(e.height)&&parseInt(e.height,10)<137)&&(e.height="137"),
V.title=V.title.slice(0,47)+" - Flash Player Installation";
var r=X.ie&&X.win?"ActiveX":"PlugIn",o="MMredirectURL="+M.location.toString().replace(/&/g,"%26")+"&MMplayerType="+r+"&MMdoctitle="+V.title;
if(typeof t.flashvars!=k?t.flashvars+="&"+o:t.flashvars=o,X.ie&&X.win&&4!=i.readyState){
var l=m("div");
n+="SWFObjectNew",l.setAttribute("id",n),i.parentNode.insertBefore(l,i),i.style.display="none",
function(){
4==i.readyState?i.parentNode.removeChild(i):setTimeout(arguments.callee,10);
}();
}
u(e,t,n);
}
}
function d(e){
if(X.ie&&X.win&&4!=e.readyState){
var t=m("div");
e.parentNode.insertBefore(t,e),t.parentNode.replaceChild(f(e),t),e.style.display="none",
function(){
4==e.readyState?e.parentNode.removeChild(e):setTimeout(arguments.callee,10);
}();
}else e.parentNode.replaceChild(f(e),e);
}
function f(e){
var t=m("div");
if(X.win&&X.ie)t.innerHTML=e.innerHTML;else{
var n=e.getElementsByTagName(B)[0];
if(n){
var a=n.childNodes;
if(a)for(var i=a.length,r=0;i>r;r++)1==a[r].nodeType&&"PARAM"==a[r].nodeName||8==a[r].nodeType||t.appendChild(a[r].cloneNode(!0));
}
}
return t;
}
function u(e,t,n){
var a,i=h(n);
if(X.wk&&X.wk<312)return a;
if(i)if(typeof e.id==k&&(e.id=n),X.ie&&X.win){
var r="";
for(var o in e)e[o]!=Object.prototype[o]&&("data"==o.toLowerCase()?t.movie=e[o]:"styleclass"==o.toLowerCase()?r+=' class="'+e[o]+'"':"classid"!=o.toLowerCase()&&(r+=" "+o+'="'+e[o]+'"'));
var l="";
for(var s in t)t[s]!=Object.prototype[s]&&(l+='<param name="'+s+'" value="'+t[s]+'" />');
i.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+r+">"+l+"</object>",
H[H.length]=e.id,a=h(e.id);
}else{
var c=m(B);
c.setAttribute("type",F);
for(var d in e)e[d]!=Object.prototype[d]&&("styleclass"==d.toLowerCase()?c.setAttribute("class",e[d]):"classid"!=d.toLowerCase()&&c.setAttribute(d,e[d]));
for(var f in t)t[f]!=Object.prototype[f]&&"movie"!=f.toLowerCase()&&p(c,f,t[f]);
i.parentNode.replaceChild(c,i),a=c;
}
return a;
}
function p(e,t,n){
var a=m("param");
a.setAttribute("name",t),a.setAttribute("value",n),e.appendChild(a);
}
function v(e){
var t=h(e);
t&&"OBJECT"==t.nodeName&&(X.ie&&X.win?(t.style.display="none",function(){
4==t.readyState?y(e):setTimeout(arguments.callee,10);
}()):t.parentNode.removeChild(t));
}
function y(e){
var t=h(e);
if(t){
for(var n in t)"function"==typeof t[n]&&(t[n]=null);
t.parentNode.removeChild(t);
}
}
function h(e){
var t=null;
try{
t=V.getElementById(e);
}catch(n){}
return t;
}
function m(e){
return V.createElement(e);
}
function g(e,t,n){
e.attachEvent(t,n),z[z.length]=[e,t,n];
}
function w(e){
var t=X.pv,n=e.split(".");
return n[0]=parseInt(n[0],10),n[1]=parseInt(n[1],10)||0,n[2]=parseInt(n[2],10)||0,
t[0]>n[0]||t[0]==n[0]&&t[1]>n[1]||t[0]==n[0]&&t[1]==n[1]&&t[2]>=n[2]?!0:!1;
}
function b(e,t,n,a){
if(!X.ie||!X.mac){
var i=V.getElementsByTagName("head")[0];
if(i){
var r=n&&"string"==typeof n?n:"screen";
if(a&&(I=null,L=null),!I||L!=r){
var o=m("style");
o.setAttribute("type","text/css"),o.setAttribute("media",r),I=i.appendChild(o),X.ie&&X.win&&typeof V.styleSheets!=k&&V.styleSheets.length>0&&(I=V.styleSheets[V.styleSheets.length-1]),
L=r;
}
X.ie&&X.win?I&&typeof I.addRule==B&&I.addRule(e,t):I&&typeof V.createTextNode!=k&&I.appendChild(V.createTextNode(e+" {"+t+"}"));
}
}
}
function C(e,t){
if(U){
var n=t?"visible":"hidden";
G&&h(e)?h(e).style.visibility=n:b("#"+e,"visibility:"+n);
}
}
function E(e){
var t=/[\\\"<>\.;]/,n=null!=t.exec(e);
return n&&typeof encodeURIComponent!=k?encodeURIComponent(e):e;
}
{
var S,A,N,T,I,L,k="undefined",B="object",O="Shockwave Flash",j="ShockwaveFlash.ShockwaveFlash",F="application/x-shockwave-flash",$="SWFObjectExprInst",x="onreadystatechange",M=window,V=document,P=navigator,R=!1,D=[i],W=[],H=[],z=[],G=!1,J=!1,U=!0,X=function(){
var e=typeof V.getElementById!=k&&typeof V.getElementsByTagName!=k&&typeof V.createElement!=k,t=P.userAgent.toLowerCase(),n=P.platform.toLowerCase(),a=/win/.test(n?n:t),i=/mac/.test(n?n:t),r=/webkit/.test(t)?parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,o=!1,l=[0,0,0],s=null;
if(typeof P.plugins!=k&&typeof P.plugins[O]==B)s=P.plugins[O].description,!s||typeof P.mimeTypes!=k&&P.mimeTypes[F]&&!P.mimeTypes[F].enabledPlugin||(R=!0,
o=!1,s=s.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),l[0]=parseInt(s.replace(/^(.*)\..*$/,"$1"),10),
l[1]=parseInt(s.replace(/^.*\.(.*)\s.*$/,"$1"),10),l[2]=/[a-zA-Z]/.test(s)?parseInt(s.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if(typeof M.ActiveXObject!=k)try{
var c=new ActiveXObject(j);
c&&(s=c.GetVariable("$version"),s&&(o=!0,s=s.split(" ")[1].split(","),l=[parseInt(s[0],10),parseInt(s[1],10),parseInt(s[2],10)]));
}catch(d){}
return{
w3:e,
pv:l,
wk:r,
ie:o,
win:a,
mac:i
};
}();
!function(){
X.w3&&((typeof V.readyState!=k&&"complete"==V.readyState||typeof V.readyState==k&&(V.getElementsByTagName("body")[0]||V.body))&&t(),
G||(typeof V.addEventListener!=k&&V.addEventListener("DOMContentLoaded",t,!1),X.ie&&X.win&&(V.attachEvent(x,function(){
"complete"==V.readyState&&(V.detachEvent(x,arguments.callee),t());
}),M==top&&!function(){
if(!G){
try{
V.documentElement.doScroll("left");
}catch(e){
return void setTimeout(arguments.callee,0);
}
t();
}
}()),X.wk&&!function(){
return G?void 0:/loaded|complete/.test(V.readyState)?void t():void setTimeout(arguments.callee,0);
}(),a(t)));
}(),function(){
X.ie&&X.win&&window.attachEvent("onunload",function(){
for(var t=z.length,n=0;t>n;n++)z[n][0].detachEvent(z[n][1],z[n][2]);
for(var a=H.length,i=0;a>i;i++)v(H[i]);
for(var r in X)X[r]=null;
X=null;
for(var o in e)e[o]=null;
e=null;
});
}();
}
return{
registerObject:function(e,t,n,a){
if(X.w3&&e&&t){
var i={};
i.id=e,i.swfVersion=t,i.expressInstall=n,i.callbackFn=a,W[W.length]=i,C(e,!1);
}else a&&a({
success:!1,
id:e
});
},
getObjectById:function(e){
return X.w3?l(e):void 0;
},
embedSWF:function(e,t,a,i,r,o,l,d,f,p){
var v={
success:!1,
id:t
};
X.w3&&!(X.wk&&X.wk<312)&&e&&t&&a&&i&&r?(C(t,!1),n(function(){
a+="",i+="";
var n={};
if(f&&typeof f===B)for(var y in f)n[y]=f[y];
n.data=e,n.width=a,n.height=i;
var h={};
if(d&&typeof d===B)for(var m in d)h[m]=d[m];
if(l&&typeof l===B)for(var g in l)typeof h.flashvars!=k?h.flashvars+="&"+g+"="+l[g]:h.flashvars=g+"="+l[g];
if(w(r)){
var b=u(n,h,t);
n.id==t&&C(t,!0),v.success=!0,v.ref=b;
}else{
if(o&&s())return n.data=o,void c(n,h,t,p);
C(t,!0);
}
p&&p(v);
})):p&&p(v);
},
switchOffAutoHideShow:function(){
U=!1;
},
ua:X,
getFlashPlayerVersion:function(){
return{
major:X.pv[0],
minor:X.pv[1],
release:X.pv[2]
};
},
hasFlashPlayerVersion:w,
createSWF:function(e,t,n){
return X.w3?u(e,t,n):void 0;
},
showExpressInstall:function(e,t,n,a){
X.w3&&s()&&c(e,t,n,a);
},
removeSWF:function(e){
X.w3&&v(e);
},
createCSS:function(e,t,n,a){
X.w3&&b(e,t,n,a);
},
addDomLoadEvent:n,
addLoadEvent:a,
getQueryParamValue:function(e){
var t=V.location.search||V.location.hash;
if(t){
if(/\?/.test(t)&&(t=t.split("?")[1]),null==e)return E(t);
for(var n=t.split("&"),a=0;a<n.length;a++)if(n[a].substring(0,n[a].indexOf("="))==e)return E(n[a].substring(n[a].indexOf("=")+1));
}
return"";
},
expressInstallCallback:function(){
if(J){
var e=h($);
e&&S&&(e.parentNode.replaceChild(S,e),A&&(C(A,!0),X.ie&&X.win&&(S.style.display="block")),
N&&N(T)),J=!1;
}
}
};
}();
return e;
});