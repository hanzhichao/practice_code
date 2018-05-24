!function(){
var n={},t={},e={
parse:function(n){
for(var t,e,o,i={},r=n.split("&"),a=0,s=r.length;s>a;a++)t=r[a].split("="),2==t.length&&(e=t[0],
o=t[1],-1==e.indexOf("[]")?i[e]=decodeURIComponent(o):(e=e.replace("[]",""),i[e]=i[e]||[],
i[e].push(o)));
return i;
},
serialize:function(n){
var t,e,o,i=[];
for(t in n)if(n.hasOwnProperty(t))if(e=n[t],e instanceof Array){
o=e;
for(var r=0,a=o.length;a>r;r++)e=encodeURIComponent(o[r]),i.push(t+"[]="+e);
}else e=encodeURIComponent(e),i.push(t+"="+e);
return i.join("&");
}
},o=function(t,o,i){
var r;
"string"==typeof t&&(t=e.parse(t)),(r=t.type)&&n[r]&&n[r](t,o,i);
},i=function(){
function n(n,t){
var e="";
if(arguments.length<2?e="target error - target and name are both requied":"object"!=typeof n?e="target error - target itself must be window object":"string"!=typeof t&&(e="target error - target name must be string type"),
e)throw new Error(e);
this.target=n,this.name=t;
}
function t(n,t){
this.targets={},this.name=n,this.listenFunc=[],e=t||e,this.initListen();
}
var e="mp_mmbizweb",o="postMessage"in window;
return n.prototype.send=o?function(n){
this.target.postMessage(n,"*");
}:function(n){
var t=window.navigator[e+this.name];
if("function"!=typeof t)throw new Error("target callback function is not defined");
t(n,window);
},t.prototype.addTarget=function(t,e){
var o=new n(t,e);
this.targets[e]=o;
},t.prototype.initListen=function(){
var n=this,t=function(t){
"object"==typeof t&&t.data&&(t=t.data);
for(var e=0;e<n.listenFunc.length;e++)n.listenFunc[e](t);
};
o?"addEventListener"in document?window.addEventListener("message",t,!1):"attachEvent"in document&&window.attachEvent("onmessage",t):window.navigator[e+this.name]=t;
},t.prototype.listen=function(n){
this.listenFunc.push(n);
},t.prototype.clear=function(){
this.listenFunc=[];
},t.prototype.send=function(n){
var t,e=this.targets;
for(t in e)e.hasOwnProperty(t)&&e[t].send(n);
},t;
}();
if(t.init=function(n){
window.parent!=window?(t.messenger=new i("iframe1"),t.messenger.addTarget(n,"parent")):(t.messenger=new i("parent"),
t.messenger.addTarget(n,"iframe1")),t.messenger.listen(function(n){
n=e.parse(n),o(n);
});
},-1==location.href.indexOf("mp.weixin.qq.com")&&t.init(window.parent),t.on=function(t,e){
n[t]=e;
},t.post=function(n){
t.messenger.send(e.serialize(n));
},window.Iframe=t,"wifi.weixin.qq.com"==location.host){
var r=window.performance||window.msPerformance||window.webkitPerformance;
if(r&&r.timing)var a=r.timing,s=setInterval(function(){
if(a.loadEventEnd){
var n=new Image;
n.src="//mp.weixin.qq.com/mp/jsmonitor?idkey=27822_80_1;27822_81_"+(a.domainLookupEnd-a.domainLookupStart)+";27822_82_1;27822_83_"+(0==a.secureConnectionStart?0:a.connectEnd-a.secureConnectionStart)+";27822_84_1;27822_85_"+(a.connectEnd-a.connectStart)+";27822_86_1;27822_87_"+(a.responseStart-a.requestStart)+";27822_88_1;27822_89_"+(a.responseEnd-a.responseStart)+";27822_90_1;27822_91_"+(a.domContentLoadedEventStart-a.domLoading)+";27822_92_1;27822_93_"+(a.domComplete-a.domLoading)+";27822_94_1;27822_95_"+(a.loadEventEnd-a.loadEventStart),
clearTimeout(s);
}
},500);
}
}();