define("biz_web/lib/highcharts-v4.2.1.js",[],function(t,e,i){
var n=window.Highcharts;
delete window.Highcharts,function(t,e){
"object"==typeof i&&i.exports?i.exports=t.document?e(t):e:t.Highcharts=e(t);
}("undefined"!=typeof window?window:this,function(t){
function e(e,i){
var n="Highcharts error #"+e+": www.highcharts.com/errors/"+e;
if(i)throw Error(n);
t.console&&console.log(n);
}
function i(t,e,i){
this.options=e,this.elem=t,this.prop=i;
}
function n(){
var t,e,i=arguments,n={},s=function(t,e){
var i,n;
"object"!=typeof t&&(t={});
for(n in e)e.hasOwnProperty(n)&&(i=e[n],t[n]=i&&"object"==typeof i&&"[object Array]"!==Object.prototype.toString.call(i)&&"renderTo"!==n&&"number"!=typeof i.nodeType?s(t[n]||{},i):e[n]);
return t;
};
for(i[0]===!0&&(n=i[1],i=Array.prototype.slice.call(i,2)),e=i.length,t=0;e>t;t++)n=s(n,i[t]);
return n;
}
function s(t,e){
return parseInt(t,e||10);
}
function o(t){
return"string"==typeof t;
}
function r(t){
return t&&"object"==typeof t;
}
function a(t){
return"[object Array]"===Object.prototype.toString.call(t);
}
function l(t){
return"number"==typeof t;
}
function h(t){
return le.log(t)/le.LN10;
}
function c(t){
return le.pow(10,t);
}
function d(t,e){
for(var i=t.length;i--;)if(t[i]===e){
t.splice(i,1);
break;
}
}
function p(t){
return t!==X&&null!==t;
}
function u(t,e,i){
var n,s;
if(o(e))p(i)?t.setAttribute(e,i):t&&t.getAttribute&&(s=t.getAttribute(e));else if(p(e)&&r(e))for(n in e)t.setAttribute(n,e[n]);
return s;
}
function g(t){
return a(t)?t:[t];
}
function f(t,e,i){
return e?setTimeout(t,e,i):void t.call(0,i);
}
function m(t,e){
ke&&!Le&&e&&e.opacity!==X&&(e.filter="alpha(opacity="+100*e.opacity+")"),$e(t.style,e);
}
function y(t,e,i,n,s){
return t=ae.createElement(t),e&&$e(t,e),s&&m(t,{
padding:0,
border:"none",
margin:0
}),i&&m(t,i),n&&n.appendChild(t),t;
}
function x(t,e){
var i=function(){};
return i.prototype=new t,$e(i.prototype,e),i;
}
function v(t,e){
return Array((e||2)+1-String(t).length).join(0)+t;
}
function b(t){
return 6e4*(_&&_(t)||j||0);
}
function k(t,e){
for(var i,n,s,o,r,a="{",l=!1,h=[];-1!==(a=t.indexOf(a));){
if(i=t.slice(0,a),l){
for(n=i.split(":"),s=n.shift().split("."),r=s.length,i=e,o=0;r>o;o++)i=i[s[o]];
n.length&&(n=n.join(":"),s=/\.([0-9])/,o=G.lang,r=void 0,/f$/.test(n)?(r=(r=n.match(s))?r[1]:-1,
null!==i&&(i=re.numberFormat(i,r,o.decimalPoint,n.indexOf(",")>-1?o.thousandsSep:""))):i=H(n,i));
}
h.push(i),t=t.slice(a+1),a=(l=!l)?"}":"{";
}
return h.push(t),h.join("");
}
function w(t){
return le.pow(10,ce(le.log(t)/le.LN10));
}
function A(t,e,i,n,s){
var o,r=t,i=Je(i,1);
for(o=t/i,e||(e=[1,2,2.5,5,10],n===!1&&(1===i?e=[1,2,5,10]:.1>=i&&(e=[1/i]))),n=0;n<e.length&&(r=e[n],
!(s&&r*i>=t||!s&&o<=(e[n]+(e[n+1]||e[n]))/2));n++);
return r*=i;
}
function S(t,e){
var i,n,s=t.length;
for(n=0;s>n;n++)t[n].safeI=n;
for(t.sort(function(t,n){
return i=e(t,n),0===i?t.safeI-n.safeI:i;
}),n=0;s>n;n++)delete t[n].safeI;
}
function T(t){
for(var e=t.length,i=t[0];e--;)t[e]<i&&(i=t[e]);
return i;
}
function P(t){
for(var e=t.length,i=t[0];e--;)t[e]>i&&(i=t[e]);
return i;
}
function L(t,e){
for(var i in t)t[i]&&t[i]!==e&&t[i].destroy&&t[i].destroy(),delete t[i];
}
function M(t){
W||(W=y(Be)),t&&W.appendChild(t),W.innerHTML="";
}
function C(t,e){
return parseFloat(t.toPrecision(e||14));
}
function I(t,e){
e.renderer.globalAnimation=Je(t,e.animation);
}
function O(){
var e=G.global,i=e.useUTC,n=i?"getUTC":"get",s=i?"setUTC":"set";
N=e.Date||t.Date,j=i&&e.timezoneOffset,_=i&&e.getTimezoneOffset,V=function(t,e,n,s,o,r){
var a;
return i?(a=N.UTC.apply(0,arguments),a+=b(a)):a=new N(t,e,Je(n,1),Je(s,0),Je(o,0),Je(r,0)).getTime(),
a;
},U=n+"Minutes",K=n+"Hours",Z=n+"Day",q=n+"Date",$=n+"Month",J=n+"FullYear",Q=s+"Milliseconds",
te=s+"Seconds",ee=s+"Minutes",ie=s+"Hours",ne=s+"Date",se=s+"Month",oe=s+"FullYear";
}
function z(t){
return this instanceof z?void this.init(t):new z(t);
}
function D(){}
function R(t,e,i,n){
this.axis=t,this.pos=e,this.type=i||"",this.isNew=!0,!i&&!n&&this.addLabel();
}
function B(t,e,i,n,s){
var o=t.chart.inverted;
this.axis=t,this.isNegative=i,this.options=e,this.x=n,this.total=null,this.points={},
this.stack=s,this.alignOptions={
align:e.align||(o?i?"left":"right":"center"),
verticalAlign:e.verticalAlign||(o?"middle":i?"bottom":"top"),
y:Je(e.y,o?4:i?14:-6),
x:Je(e.x,o?i?-6:6:0)
},this.textAlign=e.textAlign||(o?i?"right":"left":"center");
}
var X,Y,E,W,G,H,F,N,V,j,_,U,K,Z,q,$,J,Q,te,ee,ie,ne,se,oe,re,ae=t.document,le=Math,he=le.round,ce=le.floor,de=le.ceil,pe=le.max,ue=le.min,ge=le.abs,fe=le.cos,me=le.sin,ye=le.PI,xe=2*ye/360,ve=t.navigator&&t.navigator.userAgent||"",be=t.opera,ke=/(msie|trident|edge)/i.test(ve)&&!be,we=ae&&8===ae.documentMode,Ae=!ke&&/AppleWebKit/.test(ve),Se=/Firefox/.test(ve),Te=/(Mobile|Android|Windows Phone)/.test(ve),Pe="http://www.w3.org/2000/svg",Le=ae&&ae.createElementNS&&!!ae.createElementNS(Pe,"svg").createSVGRect,Me=Se&&parseInt(ve.split("Firefox/")[1],10)<4,Ce=ae&&!Le&&!ke&&!!ae.createElement("canvas").getContext,Ie={},Oe=0,ze=function(){},De=[],Re=0,Be="div",Xe=/^[0-9]+$/,Ye=["plotTop","marginRight","marginBottom","plotLeft"],Ee={};
re=t.Highcharts?e(16,!0):{
win:t
},re.seriesTypes=Ee;
var We,Ge,He,Fe,Ne,Ve,je,_e,Ue,Ke,Ze,qe=[];
i.prototype={
dSetter:function(){
var t,e=this.paths[0],i=this.paths[1],n=[],s=this.now,o=e.length;
if(1===s)n=this.toD;else if(o===i.length&&1>s)for(;o--;)t=parseFloat(e[o]),n[o]=isNaN(t)?e[o]:s*parseFloat(i[o]-t)+t;else n=i;
this.elem.attr("d",n);
},
update:function(){
var t=this.elem,e=this.prop,i=this.now,n=this.options.step;
this[e+"Setter"]?this[e+"Setter"]():t.attr?t.element&&t.attr(e,i):t.style[e]=i+this.unit,
n&&n.call(t,i,this);
},
run:function(t,e,i){
var n,s=this,o=function(t){
return o.stopped?!1:s.step(t);
};
this.startTime=+new N,this.start=t,this.end=e,this.unit=i,this.now=this.start,this.pos=0,
o.elem=this.elem,o()&&1===qe.push(o)&&(o.timerId=setInterval(function(){
for(n=0;n<qe.length;n++)qe[n]()||qe.splice(n--,1);
qe.length||clearInterval(o.timerId);
},13));
},
step:function(t){
var e,i=+new N,n=this.options;
e=this.elem;
var s,o=n.complete,r=n.duration,a=n.curAnim;
if(e.attr&&!e.element)e=!1;else if(t||i>=r+this.startTime){
this.now=this.end,this.pos=1,this.update(),t=a[this.prop]=!0;
for(s in a)a[s]!==!0&&(t=!1);
t&&o&&o.call(e),e=!1;
}else this.pos=n.easing((i-this.startTime)/r),this.now=this.start+(this.end-this.start)*this.pos,
this.update(),e=!0;
return e;
},
initPath:function(t,e,i){
var n,s,o,e=e||"",r=t.shift,a=e.indexOf("C")>-1,l=a?7:3,e=e.split(" "),i=[].concat(i),h=function(t){
for(n=t.length;n--;)"M"===t[n]&&t.splice(n+1,0,t[n+1],t[n+2],t[n+1],t[n+2]);
};
if(a&&(h(e),h(i)),t.isArea&&(s=e.splice(e.length-6,6),o=i.splice(i.length-6,6)),
r<=i.length/l&&e.length===i.length)for(;r--;)i=[].concat(i).splice(0,l).concat(i);
if(t.shift=0,e.length)for(t=i.length;e.length<t;)r=[].concat(e).splice(e.length-l,l),
a&&(r[l-6]=r[l-2],r[l-5]=r[l-1]),e=e.concat(r);
return s&&(e=e.concat(s),i=i.concat(o)),[e,i];
}
};
var $e=re.extend=function(t,e){
var i;
t||(t={});
for(i in e)t[i]=e[i];
return t;
},Je=re.pick=function(){
var t,e,i=arguments,n=i.length;
for(t=0;n>t;t++)if(e=i[t],e!==X&&null!==e)return e;
},Qe=re.wrap=function(t,e,i){
var n=t[e];
t[e]=function(){
var t=Array.prototype.slice.call(arguments);
return t.unshift(n),i.apply(this,t);
};
};
H=function(t,e,i){
if(!p(e)||isNaN(e))return G.lang.invalidDate||"";
var n,t=Je(t,"%Y-%m-%d %H:%M:%S"),s=new N(e-b(e)),o=s[K](),r=s[Z](),a=s[q](),l=s[$](),h=s[J](),c=G.lang,d=c.weekdays,s=$e({
a:d[r].substr(0,3),
A:d[r],
d:v(a),
e:a,
w:r,
b:c.shortMonths[l],
B:c.months[l],
m:v(l+1),
y:h.toString().substr(2,2),
Y:h,
H:v(o),
k:o,
I:v(o%12||12),
l:o%12||12,
M:v(s[U]()),
p:12>o?"AM":"PM",
P:12>o?"am":"pm",
S:v(s.getSeconds()),
L:v(he(e%1e3),3)
},re.dateFormats);
for(n in s)for(;-1!==t.indexOf("%"+n);)t=t.replace("%"+n,"function"==typeof s[n]?s[n](e):s[n]);
return i?t.substr(0,1).toUpperCase()+t.substr(1):t;
},F={
millisecond:1,
second:1e3,
minute:6e4,
hour:36e5,
day:864e5,
week:6048e5,
month:24192e5,
year:314496e5
},re.numberFormat=function(t,e,i,n){
var o=G.lang,t=+t||0,r=-1===e?Math.min((t.toString().split(".")[1]||"").length,20):isNaN(e=Math.abs(e))?2:e,e=void 0===i?o.decimalPoint:i,n=void 0===n?o.thousandsSep:n,o=0>t?"-":"",i=String(s(t=ge(t).toFixed(r))),a=i.length>3?i.length%3:0;
return o+(a?i.substr(0,a)+n:"")+i.substr(a).replace(/(\d{3})(?=\d)/g,"$1"+n)+(r?e+ge(t-i).toFixed(r).slice(2):"");
},Math.easeInOutSine=function(t){
return-.5*(Math.cos(Math.PI*t)-1);
},We=function(e,i){
var n=t.getComputedStyle(e,void 0);
return n&&s(n.getPropertyValue(i));
},Ge=function(t,e){
return e.indexOf?e.indexOf(t):[].indexOf.call(e,t);
},Fe=function(t,e){
return[].filter.call(t,e);
},Ve=function(t,e){
for(var i=[],n=0,s=t.length;s>n;n++)i[n]=e.call(t[n],t[n],n,t);
return i;
},Ne=function(e){
var i=ae.documentElement,e=e.getBoundingClientRect();
return{
top:e.top+(t.pageYOffset||i.scrollTop)-(i.clientTop||0),
left:e.left+(t.pageXOffset||i.scrollLeft)-(i.clientLeft||0)
};
},Ze=function(t){
for(var e=qe.length;e--;)qe[e].elem===t&&(qe[e].stopped=!0);
},He=function(t,e){
return Array.prototype.forEach.call(t,e);
},je=function(e,i,n){
function s(i){
i.target=i.srcElement||t,n.call(e,i);
}
var o=e.hcEvents=e.hcEvents||{};
e.addEventListener?e.addEventListener(i,n,!1):e.attachEvent&&(e.hcEventsIE||(e.hcEventsIE={}),
e.hcEventsIE[n.toString()]=s,e.attachEvent("on"+i,s)),o[i]||(o[i]=[]),o[i].push(n);
},_e=function(t,e,i){
function n(e,i){
t.removeEventListener?t.removeEventListener(e,i,!1):t.attachEvent&&(i=t.hcEventsIE[i.toString()],
t.detachEvent("on"+e,i));
}
function s(){
var i,s,o;
if(t.nodeName)for(o in e?(i={},i[e]=!0):i=a,i)if(a[o])for(s=a[o].length;s--;)n(o,a[o][s]);
}
var o,r,a=t.hcEvents;
a&&(e?(o=a[e]||[],i?(r=Ge(i,o),r>-1&&(o.splice(r,1),a[e]=o),n(e,i)):(s(),a[e]=[])):(s(),
t.hcEvents={}));
},Ue=function(t,e,i,n){
var s;
s=t.hcEvents;
var o,r,a,l,i=i||{};
if(ae.createEvent&&(t.dispatchEvent||t.fireEvent))s=ae.createEvent("Events"),s.initEvent(e,!0,!0),
s.target=t,$e(s,i),t.dispatchEvent?t.dispatchEvent(s):t.fireEvent(e,s);else if(s)for(s=s[e]||[],
o=s.length,a=function(){
i.defaultPrevented=!0;
},r=0;o>r;r++){
if(l=s[r],i.stopped)return;
i.preventDefault=a,i.target=t,i.type||(i.type=e),l.call(t,i)===!1&&i.preventDefault();
}
n&&!i.defaultPrevented&&n(i);
},Ke=function(t,e,s){
var o,a,h,c,d="";
r(s)||(o=arguments,s={
duration:o[2],
easing:o[3],
complete:o[4]
}),l(s.duration)||(s.duration=400),s.easing=Math[s.easing]||Math.easeInOutSine,s.curAnim=n(e);
for(c in e)h=new i(t,s,c),a=null,"d"===c?(h.paths=h.initPath(t,t.d,e.d),h.toD=e.d,
o=0,a=1):t.attr?o=t.attr(c):(o=parseFloat(We(t,c))||0,"opacity"!==c&&(d="px")),a||(a=e[c]),
a.match&&a.match("px")&&(a=a.replace(/px/g,"")),h.run(o,a,d);
},t.jQuery&&(t.jQuery.fn.highcharts=function(){
var t=[].slice.call(arguments);
return this[0]?t[0]?(new(re[o(t[0])?t.shift():"Chart"])(this[0],t[0],t[1]),this):De[u(this[0],"data-highcharts-chart")]:void 0;
}),ae&&!ae.defaultView&&(We=function(t,e){
var i;
return i={
width:"clientWidth",
height:"clientHeight"
}[e],t.style[e]?s(t.style[e]):("opacity"===e&&(e="filter"),i?(t.style.zoom=1,t[i]-2*We(t,"padding")):(i=t.currentStyle[e.replace(/\-(\w)/g,function(t,e){
return e.toUpperCase();
})],"filter"===e&&(i=i.replace(/alpha\(opacity=([0-9]+)\)/,function(t,e){
return e/100;
})),""===i?1:s(i)));
}),Array.prototype.forEach||(He=function(t,e){
for(var i=0,n=t.length;n>i;i++)if(e.call(t[i],t[i],i,t)===!1)return i;
}),Array.prototype.indexOf||(Ge=function(t,e){
var i,n=0;
if(e)for(i=e.length;i>n;n++)if(e[n]===t)return n;
return-1;
}),Array.prototype.filter||(Fe=function(t,e){
for(var i=[],n=0,s=t.length;s>n;n++)e(t[n],n)&&i.push(t[n]);
return i;
}),re.Fx=i,re.inArray=Ge,re.each=He,re.grep=Fe,re.offset=Ne,re.map=Ve,re.addEvent=je,
re.removeEvent=_e,re.fireEvent=Ue,re.animate=Ke,re.stop=Ze,G={
colors:"#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#2b908f,#f45b5b,#91e8e1".split(","),
symbols:["circle","diamond","square","triangle","triangle-down"],
lang:{
loading:"Loading...",
months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),
shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
decimalPoint:".",
numericSymbols:"k,M,G,T,P,E".split(","),
resetZoom:"Reset zoom",
resetZoomTitle:"Reset zoom level 1:1",
thousandsSep:" "
},
global:{
useUTC:!0,
canvasToolsURL:"http://code.highcharts.com/modules/canvas-tools.js",
VMLRadialGradientURL:"http://code.highcharts.com/4.2.1/gfx/vml-radial-gradient.png"
},
chart:{
borderColor:"#4572A7",
borderRadius:0,
defaultSeriesType:"line",
ignoreHiddenSeries:!0,
spacing:[10,10,15,10],
backgroundColor:"#FFFFFF",
plotBorderColor:"#C0C0C0",
resetZoomButton:{
theme:{
zIndex:20
},
position:{
align:"right",
x:-10,
y:10
}
}
},
title:{
text:"Chart title",
align:"center",
margin:15,
style:{
color:"#333333",
fontSize:"18px"
}
},
subtitle:{
text:"",
align:"center",
style:{
color:"#555555"
}
},
plotOptions:{
line:{
allowPointSelect:!1,
showCheckbox:!1,
animation:{
duration:1e3
},
events:{},
lineWidth:2,
marker:{
lineWidth:0,
radius:4,
lineColor:"#FFFFFF",
states:{
hover:{
enabled:!0,
lineWidthPlus:1,
radiusPlus:2
},
select:{
fillColor:"#FFFFFF",
lineColor:"#000000",
lineWidth:2
}
}
},
point:{
events:{}
},
dataLabels:{
align:"center",
formatter:function(){
return null===this.y?"":re.numberFormat(this.y,-1);
},
style:{
color:"contrast",
fontSize:"11px",
fontWeight:"bold",
textShadow:"0 0 6px contrast, 0 0 3px contrast"
},
verticalAlign:"bottom",
x:0,
y:0,
padding:5
},
cropThreshold:300,
pointRange:0,
softThreshold:!0,
states:{
hover:{
lineWidthPlus:1,
marker:{},
halo:{
size:10,
opacity:.25
}
},
select:{
marker:{}
}
},
stickyTracking:!0,
turboThreshold:1e3
}
},
labels:{
style:{
position:"absolute",
color:"#3E576F"
}
},
legend:{
enabled:!0,
align:"center",
layout:"horizontal",
labelFormatter:function(){
return this.name;
},
borderColor:"#909090",
borderRadius:0,
navigation:{
activeColor:"#274b6d",
inactiveColor:"#CCC"
},
shadow:!1,
itemStyle:{
color:"#333333",
fontSize:"12px",
fontWeight:"bold"
},
itemHoverStyle:{
color:"#000"
},
itemHiddenStyle:{
color:"#CCC"
},
itemCheckboxStyle:{
position:"absolute",
width:"13px",
height:"13px"
},
symbolPadding:5,
verticalAlign:"bottom",
x:0,
y:0,
title:{
style:{
fontWeight:"bold"
}
}
},
loading:{
labelStyle:{
fontWeight:"bold",
position:"relative",
top:"45%"
},
style:{
position:"absolute",
backgroundColor:"white",
opacity:.5,
textAlign:"center"
}
},
tooltip:{
enabled:!0,
animation:Le,
backgroundColor:"rgba(249, 249, 249, .85)",
borderWidth:1,
borderRadius:3,
dateTimeLabelFormats:{
millisecond:"%A, %b %e, %H:%M:%S.%L",
second:"%A, %b %e, %H:%M:%S",
minute:"%A, %b %e, %H:%M",
hour:"%A, %b %e, %H:%M",
day:"%A, %b %e, %Y",
week:"Week from %A, %b %e, %Y",
month:"%B %Y",
year:"%Y"
},
footerFormat:"",
headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',
pointFormat:'<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
shadow:!0,
snap:Te?25:10,
style:{
color:"#333333",
cursor:"default",
fontSize:"12px",
padding:"8px",
pointerEvents:"none",
whiteSpace:"nowrap"
}
},
credits:{
enabled:!0,
text:"Highcharts.com",
href:"http://www.highcharts.com",
position:{
align:"right",
x:-10,
verticalAlign:"bottom",
y:-5
},
style:{
cursor:"pointer",
color:"#909090",
fontSize:"9px"
}
}
};
var ti=G.plotOptions,ei=ti.line;
O(),z.prototype={
parsers:[{
regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
parse:function(t){
return[s(t[1]),s(t[2]),s(t[3]),parseFloat(t[4],10)];
}
},{
regex:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
parse:function(t){
return[s(t[1],16),s(t[2],16),s(t[3],16),1];
}
},{
regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
parse:function(t){
return[s(t[1]),s(t[2]),s(t[3]),1];
}
}],
init:function(t){
var e,i,n,s;
if((this.input=t)&&t.stops)this.stops=Ve(t.stops,function(t){
return new z(t[1]);
});else for(n=this.parsers.length;n--&&!i;)s=this.parsers[n],(e=s.regex.exec(t))&&(i=s.parse(e));
this.rgba=i||[];
},
get:function(t){
var e,i=this.input,s=this.rgba;
return this.stops?(e=n(i),e.stops=[].concat(e.stops),He(this.stops,function(i,n){
e.stops[n]=[e.stops[n][0],i.get(t)];
})):e=s&&!isNaN(s[0])?"rgb"===t||!t&&1===s[3]?"rgb("+s[0]+","+s[1]+","+s[2]+")":"a"===t?s[3]:"rgba("+s.join(",")+")":i,
e;
},
brighten:function(t){
var e,i=this.rgba;
if(this.stops)He(this.stops,function(e){
e.brighten(t);
});else if(l(t)&&0!==t)for(e=0;3>e;e++)i[e]+=s(255*t),i[e]<0&&(i[e]=0),i[e]>255&&(i[e]=255);
return this;
},
setOpacity:function(t){
return this.rgba[3]=t,this;
}
},D.prototype={
opacity:1,
textProps:"direction,fontSize,fontWeight,fontFamily,fontStyle,color,lineHeight,width,textDecoration,textOverflow,textShadow".split(","),
init:function(t,e){
this.element="span"===e?y(e):ae.createElementNS(Pe,e),this.renderer=t;
},
animate:function(t,e,i){
return e=Je(e,this.renderer.globalAnimation,!0),Ze(this),e?(e=n(e,{}),i&&(e.complete=i),
Ke(this,t,e)):this.attr(t,null,i),this;
},
colorGradient:function(t,e,i){
var s,o,r,l,h,c,d,u,g,f,m,y,x=this.renderer,v=[];
if(t.linearGradient?o="linearGradient":t.radialGradient&&(o="radialGradient"),o){
r=t[o],h=x.gradients,d=t.stops,f=i.radialReference,a(r)&&(t[o]=r={
x1:r[0],
y1:r[1],
x2:r[2],
y2:r[3],
gradientUnits:"userSpaceOnUse"
}),"radialGradient"===o&&f&&!p(r.gradientUnits)&&(l=r,r=n(r,x.getRadialAttr(f,l),{
gradientUnits:"userSpaceOnUse"
}));
for(m in r)"id"!==m&&v.push(m,r[m]);
for(m in d)v.push(d[m]);
v=v.join(","),h[v]?f=h[v].attr("id"):(r.id=f="highcharts-"+Oe++,h[v]=c=x.createElement(o).attr(r).add(x.defs),
c.radAttr=l,c.stops=[],He(d,function(t){
0===t[1].indexOf("rgba")?(s=z(t[1]),u=s.get("rgb"),g=s.get("a")):(u=t[1],g=1),t=x.createElement("stop").attr({
offset:t[0],
"stop-color":u,
"stop-opacity":g
}).add(c),c.stops.push(t);
})),y="url("+x.url+"#"+f+")",i.setAttribute(e,y),i.gradient=v,t.toString=function(){
return y;
};
}
},
applyTextShadow:function(t){
var e,i=this.element,n=-1!==t.indexOf("contrast"),o={},r=this.renderer.forExport,a=r||i.style.textShadow!==X&&!ke;
n&&(o.textShadow=t=t.replace(/contrast/g,this.renderer.getContrast(i.style.fill))),
(Ae||r)&&(o.textRendering="geometricPrecision"),a?this.css(o):(this.fakeTS=!0,this.ySetter=this.xSetter,
e=[].slice.call(i.getElementsByTagName("tspan")),He(t.split(/\s?,\s?/g),function(t){
var n,o,r=i.firstChild,t=t.split(" ");
n=t[t.length-1],(o=t[t.length-2])&&He(e,function(t,e){
var a;
0===e&&(t.setAttribute("x",i.getAttribute("x")),e=i.getAttribute("y"),t.setAttribute("y",e||0),
null===e&&i.setAttribute("y",0)),a=t.cloneNode(1),u(a,{
"class":"highcharts-text-shadow",
fill:n,
stroke:n,
"stroke-opacity":1/pe(s(o),3),
"stroke-width":o,
"stroke-linejoin":"round"
}),i.insertBefore(a,r);
});
}));
},
attr:function(t,e,i){
var n,s,o,r=this.element,a=this;
if("string"==typeof t&&e!==X&&(n=t,t={},t[n]=e),"string"==typeof t)a=(this[t+"Getter"]||this._defaultGetter).call(this,t,r);else{
for(n in t)e=t[n],o=!1,this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(n)&&(s||(this.symbolAttr(t),
s=!0),o=!0),!this.rotation||"x"!==n&&"y"!==n||(this.doTransform=!0),o||(this[n+"Setter"]||this._defaultSetter).call(this,e,n,r),
this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(n)&&this.updateShadows(n,e);
this.doTransform&&(this.updateTransform(),this.doTransform=!1);
}
return i&&i(),a;
},
updateShadows:function(t,e){
for(var i=this.shadows,n=i.length;n--;)i[n].setAttribute(t,"height"===t?Math.max(e-(i[n].cutHeight||0),0):"d"===t?this.d:e);
},
addClass:function(t){
var e=this.element,i=u(e,"class")||"";
return-1===i.indexOf(t)&&u(e,"class",i+" "+t),this;
},
symbolAttr:function(t){
var e=this;
He("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","),function(i){
e[i]=Je(t[i],e[i]);
}),e.attr({
d:e.renderer.symbols[e.symbolName](e.x,e.y,e.width,e.height,e)
});
},
clip:function(t){
return this.attr("clip-path",t?"url("+this.renderer.url+"#"+t.id+")":"none");
},
crisp:function(t){
var e,i,n={},s=t.strokeWidth||this.strokeWidth||0;
i=he(s)%2/2,t.x=ce(t.x||this.x||0)+i,t.y=ce(t.y||this.y||0)+i,t.width=ce((t.width||this.width||0)-2*i),
t.height=ce((t.height||this.height||0)-2*i),t.strokeWidth=s;
for(e in t)this[e]!==t[e]&&(this[e]=n[e]=t[e]);
return n;
},
css:function(t){
var e,i,n=this.styles,o={},r=this.element,a="";
if(e=!n,t&&t.color&&(t.fill=t.color),n)for(i in t)t[i]!==n[i]&&(o[i]=t[i],e=!0);
if(e){
if(e=this.textWidth=t&&t.width&&"text"===r.nodeName.toLowerCase()&&s(t.width)||this.textWidth,
n&&(t=$e(n,o)),this.styles=t,e&&(Ce||!Le&&this.renderer.forExport)&&delete t.width,
ke&&!Le)m(this.element,t);else{
n=function(t,e){
return"-"+e.toLowerCase();
};
for(i in t)a+=i.replace(/([A-Z])/g,n)+":"+t[i]+";";
u(r,"style",a);
}
e&&this.added&&this.renderer.buildText(this);
}
return this;
},
on:function(t,e){
var i=this,n=i.element;
return E&&"click"===t?(n.ontouchstart=function(t){
i.touchEventFired=N.now(),t.preventDefault(),e.call(n,t);
},n.onclick=function(t){
(-1===ve.indexOf("Android")||N.now()-(i.touchEventFired||0)>1100)&&e.call(n,t);
}):n["on"+t]=e,this;
},
setRadialReference:function(t){
var e=this.renderer.gradients[this.element.gradient];
return this.element.radialReference=t,e&&e.radAttr&&e.animate(this.renderer.getRadialAttr(t,e.radAttr)),
this;
},
translate:function(t,e){
return this.attr({
translateX:t,
translateY:e
});
},
invert:function(){
return this.inverted=!0,this.updateTransform(),this;
},
updateTransform:function(){
var t=this.translateX||0,e=this.translateY||0,i=this.scaleX,n=this.scaleY,s=this.inverted,o=this.rotation,r=this.element;
s&&(t+=this.attr("width"),e+=this.attr("height")),t=["translate("+t+","+e+")"],s?t.push("rotate(90) scale(-1,1)"):o&&t.push("rotate("+o+" "+(r.getAttribute("x")||0)+" "+(r.getAttribute("y")||0)+")"),
(p(i)||p(n))&&t.push("scale("+Je(i,1)+" "+Je(n,1)+")"),t.length&&r.setAttribute("transform",t.join(" "));
},
toFront:function(){
var t=this.element;
return t.parentNode.appendChild(t),this;
},
align:function(t,e,i){
var n,s,r,a,l={};
return s=this.renderer,r=s.alignedObjects,t?(this.alignOptions=t,this.alignByTranslate=e,
(!i||o(i))&&(this.alignTo=n=i||"renderer",d(r,this),r.push(this),i=null)):(t=this.alignOptions,
e=this.alignByTranslate,n=this.alignTo),i=Je(i,s[n],s),n=t.align,s=t.verticalAlign,
r=(i.x||0)+(t.x||0),a=(i.y||0)+(t.y||0),("right"===n||"center"===n)&&(r+=(i.width-(t.width||0))/{
right:1,
center:2
}[n]),l[e?"translateX":"x"]=he(r),("bottom"===s||"middle"===s)&&(a+=(i.height-(t.height||0))/({
bottom:1,
middle:2
}[s]||1)),l[e?"translateY":"y"]=he(a),this[this.placed?"animate":"attr"](l),this.placed=!0,
this.alignAttr=l,this;
},
getBBox:function(t,e){
var i,n,s,o,r=this.renderer,a=this.element,l=this.styles;
n=this.textStr;
var h,c,d,p=a.style,u=r.cache,g=r.cacheKeys;
if(s=Je(e,this.rotation),o=s*xe,n!==X&&(d=["",s||0,l&&l.fontSize,a.style.width].join(","),
d=""===n||Xe.test(n)?"num:"+n.toString().length+d:n+d),d&&!t&&(i=u[d]),!i){
if(a.namespaceURI===Pe||r.forExport){
try{
c=this.fakeTS&&function(t){
He(a.querySelectorAll(".highcharts-text-shadow"),function(e){
e.style.display=t;
});
},Se&&p.textShadow?(h=p.textShadow,p.textShadow=""):c&&c("none"),i=a.getBBox?$e({},a.getBBox()):{
width:a.offsetWidth,
height:a.offsetHeight
},h?p.textShadow=h:c&&c("");
}catch(f){}
(!i||i.width<0)&&(i={
width:0,
height:0
});
}else i=this.htmlGetBBox();
if(r.isSVG&&(r=i.width,n=i.height,ke&&l&&"11px"===l.fontSize&&"16.9"===n.toPrecision(3)&&(i.height=n=14),
s&&(i.width=ge(n*me(o))+ge(r*fe(o)),i.height=ge(n*fe(o))+ge(r*me(o)))),d){
for(;g.length>250;)delete u[g.shift()];
u[d]||g.push(d),u[d]=i;
}
}
return i;
},
show:function(t){
return this.attr({
visibility:t?"inherit":"visible"
});
},
hide:function(){
return this.attr({
visibility:"hidden"
});
},
fadeOut:function(t){
var e=this;
e.animate({
opacity:0
},{
duration:t||150,
complete:function(){
e.attr({
y:-9999
});
}
});
},
add:function(t){
var e,i=this.renderer,n=this.element;
return t&&(this.parentGroup=t),this.parentInverted=t&&t.inverted,void 0!==this.textStr&&i.buildText(this),
this.added=!0,(!t||t.handleZ||this.zIndex)&&(e=this.zIndexSetter()),e||(t?t.element:i.box).appendChild(n),
this.onAdd&&this.onAdd(),this;
},
safeRemoveChild:function(t){
var e=t.parentNode;
e&&e.removeChild(t);
},
destroy:function(){
var t,e,i=this,n=i.element||{},s=i.shadows,o=i.renderer.isSVG&&"SPAN"===n.nodeName&&i.parentGroup;
if(n.onclick=n.onmouseout=n.onmouseover=n.onmousemove=n.point=null,Ze(i),i.clipPath&&(i.clipPath=i.clipPath.destroy()),
i.stops){
for(e=0;e<i.stops.length;e++)i.stops[e]=i.stops[e].destroy();
i.stops=null;
}
for(i.safeRemoveChild(n),s&&He(s,function(t){
i.safeRemoveChild(t);
});o&&o.div&&0===o.div.childNodes.length;)n=o.parentGroup,i.safeRemoveChild(o.div),
delete o.div,o=n;
i.alignTo&&d(i.renderer.alignedObjects,i);
for(t in i)delete i[t];
return null;
},
shadow:function(t,e,i){
var n,s,o,r,a,l,h=[],c=this.element;
if(t){
for(r=Je(t.width,3),a=(t.opacity||.15)/r,l=this.parentInverted?"(-1,-1)":"("+Je(t.offsetX,1)+", "+Je(t.offsetY,1)+")",
n=1;r>=n;n++)s=c.cloneNode(0),o=2*r+1-2*n,u(s,{
isShadow:"true",
stroke:t.color||"black",
"stroke-opacity":a*n,
"stroke-width":o,
transform:"translate"+l,
fill:"none"
}),i&&(u(s,"height",pe(u(s,"height")-o,0)),s.cutHeight=o),e?e.element.appendChild(s):c.parentNode.insertBefore(s,c),
h.push(s);
this.shadows=h;
}
return this;
},
xGetter:function(t){
return"circle"===this.element.nodeName&&(t={
x:"cx",
y:"cy"
}[t]||t),this._defaultGetter(t);
},
_defaultGetter:function(t){
return t=Je(this[t],this.element?this.element.getAttribute(t):null,0),/^[\-0-9\.]+$/.test(t)&&(t=parseFloat(t)),
t;
},
dSetter:function(t,e,i){
t&&t.join&&(t=t.join(" ")),/(NaN| {2}|^$)/.test(t)&&(t="M 0 0"),i.setAttribute(e,t),
this[e]=t;
},
dashstyleSetter:function(t){
var e;
if(t=t&&t.toLowerCase()){
for(t=t.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(","),
e=t.length;e--;)t[e]=s(t[e])*this["stroke-width"];
t=t.join(",").replace("NaN","none"),this.element.setAttribute("stroke-dasharray",t);
}
},
alignSetter:function(t){
this.element.setAttribute("text-anchor",{
left:"start",
center:"middle",
right:"end"
}[t]);
},
opacitySetter:function(t,e,i){
this[e]=t,i.setAttribute(e,t);
},
titleSetter:function(t){
var e=this.element.getElementsByTagName("title")[0];
e||(e=ae.createElementNS(Pe,"title"),this.element.appendChild(e)),e.appendChild(ae.createTextNode(String(Je(t),"").replace(/<[^>]*>/g,"")));
},
textSetter:function(t){
t!==this.textStr&&(delete this.bBox,this.textStr=t,this.added&&this.renderer.buildText(this));
},
fillSetter:function(t,e,i){
"string"==typeof t?i.setAttribute(e,t):t&&this.colorGradient(t,e,i);
},
visibilitySetter:function(t,e,i){
"inherit"===t?i.removeAttribute(e):i.setAttribute(e,t);
},
zIndexSetter:function(t,e){
var i,n,o,r=this.renderer,a=this.parentGroup,r=(a||r).element||r.box,l=this.element;
i=this.added;
var h;
if(p(t)&&(l.setAttribute(e,t),t=+t,this[e]===t&&(i=!1),this[e]=t),i){
for((t=this.zIndex)&&a&&(a.handleZ=!0),a=r.childNodes,h=0;h<a.length&&!o;h++)i=a[h],
n=u(i,"zIndex"),i!==l&&(s(n)>t||!p(t)&&p(n))&&(r.insertBefore(l,i),o=!0);
o||r.appendChild(l);
}
return o;
},
_defaultSetter:function(t,e,i){
i.setAttribute(e,t);
}
},D.prototype.yGetter=D.prototype.xGetter,D.prototype.translateXSetter=D.prototype.translateYSetter=D.prototype.rotationSetter=D.prototype.verticalAlignSetter=D.prototype.scaleXSetter=D.prototype.scaleYSetter=function(t,e){
this[e]=t,this.doTransform=!0;
},D.prototype["stroke-widthSetter"]=D.prototype.strokeSetter=function(t,e,i){
this[e]=t,this.stroke&&this["stroke-width"]?(this.strokeWidth=this["stroke-width"],
D.prototype.fillSetter.call(this,this.stroke,"stroke",i),i.setAttribute("stroke-width",this["stroke-width"]),
this.hasStroke=!0):"stroke-width"===e&&0===t&&this.hasStroke&&(i.removeAttribute("stroke"),
this.hasStroke=!1);
};
var ii=function(){
this.init.apply(this,arguments);
};
ii.prototype={
Element:D,
init:function(e,i,n,s,o,r){
var a,s=this.createElement("svg").attr({
version:"1.1"
}).css(this.getStyle(s));
a=s.element,e.appendChild(a),-1===e.innerHTML.indexOf("xmlns")&&u(a,"xmlns",Pe),
this.isSVG=!0,this.box=a,this.boxWrapper=s,this.alignedObjects=[],this.url=(Se||Ae)&&ae.getElementsByTagName("base").length?t.location.href.replace(/#.*?$/,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"",
this.createElement("desc").add().element.appendChild(ae.createTextNode("Created with Highcharts 4.2.1")),
this.defs=this.createElement("defs").add(),this.allowHTML=r,this.forExport=o,this.gradients={},
this.cache={},this.cacheKeys=[],this.setSize(i,n,!1);
var l;
Se&&e.getBoundingClientRect&&(this.subPixelFix=i=function(){
m(e,{
left:0,
top:0
}),l=e.getBoundingClientRect(),m(e,{
left:de(l.left)-l.left+"px",
top:de(l.top)-l.top+"px"
});
},i(),je(t,"resize",i));
},
getStyle:function(t){
return this.style=$e({
fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
fontSize:"12px"
},t);
},
isHidden:function(){
return!this.boxWrapper.getBBox().width;
},
destroy:function(){
var e=this.defs;
return this.box=null,this.boxWrapper=this.boxWrapper.destroy(),L(this.gradients||{}),
this.gradients=null,e&&(this.defs=e.destroy()),this.subPixelFix&&_e(t,"resize",this.subPixelFix),
this.alignedObjects=null;
},
createElement:function(t){
var e=new this.Element;
return e.init(this,t),e;
},
draw:function(){},
getRadialAttr:function(t,e){
return{
cx:t[0]-t[2]/2+e.cx*t[2],
cy:t[1]-t[2]/2+e.cy*t[2],
r:e.r*t[2]
};
},
buildText:function(t){
for(var e,i,n=t.element,o=this,r=o.forExport,a=Je(t.textStr,"").toString(),l=-1!==a.indexOf("<"),h=n.childNodes,c=u(n,"x"),d=t.styles,p=t.textWidth,g=d&&d.lineHeight,f=d&&d.textShadow,y=d&&"ellipsis"===d.textOverflow,x=h.length,v=p&&!t.added&&this.box,b=function(t){
return g?s(g):o.fontMetrics(/(px|em)$/.test(t&&t.style.fontSize)?t.style.fontSize:d&&d.fontSize||o.style.fontSize||12,t).h;
},k=function(t){
return t.replace(/&lt;/g,"<").replace(/&gt;/g,">");
};x--;)n.removeChild(h[x]);
l||f||y||-1!==a.indexOf(" ")?(e=/<.*style="([^"]+)".*>/,i=/<.*href="(http[^"]+)".*>/,
v&&v.appendChild(n),a=l?a.replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g):[a],
""===a[a.length-1]&&a.pop(),He(a,function(s,a){
var l,h=0,s=s.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");
l=s.split("|||"),He(l,function(s){
if(""!==s||1===l.length){
var g,f={},x=ae.createElementNS(Pe,"tspan");
if(e.test(s)&&(g=s.match(e)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),u(x,"style",g)),
i.test(s)&&!r&&(u(x,"onclick",'location.href="'+s.match(i)[1]+'"'),m(x,{
cursor:"pointer"
})),s=k(s.replace(/<(.|\n)*?>/g,"")||" ")," "!==s){
if(x.appendChild(ae.createTextNode(s)),h?f.dx=0:a&&null!==c&&(f.x=c),u(x,f),n.appendChild(x),
!h&&a&&(!Le&&r&&m(x,{
display:"block"
}),u(x,"dy",b(x))),p){
for(var v,w,A,f=s.replace(/([^\^])-/g,"$1- ").split(" "),S=l.length>1||a||f.length>1&&"nowrap"!==d.whiteSpace,T=[],P=b(x),L=1,M=t.rotation,C=s,I=C.length;(S||y)&&(f.length||T.length);)t.rotation=0,
v=t.getBBox(!0),A=v.width,!Le&&o.forExport&&(A=o.measureSpanWidth(x.firstChild.data,t.styles)),
v=A>p,void 0===w&&(w=v),y&&w?(I/=2,""===C||!v&&.5>I?f=[]:(v&&(w=!0),C=s.substring(0,C.length+(v?-1:1)*de(I)),
f=[C+(p>3?"…":"")],x.removeChild(x.firstChild))):v&&1!==f.length?(x.removeChild(x.firstChild),
T.unshift(f.pop())):(f=T,T=[],f.length&&(L++,x=ae.createElementNS(Pe,"tspan"),u(x,{
dy:P,
x:c
}),g&&u(x,"style",g),n.appendChild(x)),A>p&&(p=A)),f.length&&x.appendChild(ae.createTextNode(f.join(" ").replace(/- /g,"-")));
w&&t.attr("title",t.textStr),t.rotation=M;
}
h++;
}
}
});
}),v&&v.removeChild(n),f&&t.applyTextShadow&&t.applyTextShadow(f)):n.appendChild(ae.createTextNode(k(a)));
},
getContrast:function(t){
return t=z(t).rgba,t[0]+t[1]+t[2]>384?"#000000":"#FFFFFF";
},
button:function(t,e,i,s,o,r,a,l,h){
var c,d,p,u,g,f,m=this.label(t,e,i,h,null,null,null,null,"button"),y=0,t={
x1:0,
y1:0,
x2:0,
y2:1
},o=n({
"stroke-width":1,
stroke:"#CCCCCC",
fill:{
linearGradient:t,
stops:[[0,"#FEFEFE"],[1,"#F6F6F6"]]
},
r:2,
padding:5,
style:{
color:"black"
}
},o);
return p=o.style,delete o.style,r=n(o,{
stroke:"#68A",
fill:{
linearGradient:t,
stops:[[0,"#FFF"],[1,"#ACF"]]
}
},r),u=r.style,delete r.style,a=n(o,{
stroke:"#68A",
fill:{
linearGradient:t,
stops:[[0,"#9BD"],[1,"#CDF"]]
}
},a),g=a.style,delete a.style,l=n(o,{
style:{
color:"#CCC"
}
},l),f=l.style,delete l.style,je(m.element,ke?"mouseover":"mouseenter",function(){
3!==y&&m.attr(r).css(u);
}),je(m.element,ke?"mouseout":"mouseleave",function(){
3!==y&&(c=[o,r,a][y],d=[p,u,g][y],m.attr(c).css(d));
}),m.setState=function(t){
(m.state=y=t)?2===t?m.attr(a).css(g):3===t&&m.attr(l).css(f):m.attr(o).css(p);
},m.on("click",function(t){
3!==y&&s.call(m,t);
}).attr(o).css($e({
cursor:"default"
},p));
},
crispLine:function(t,e){
return t[1]===t[4]&&(t[1]=t[4]=he(t[1])-e%2/2),t[2]===t[5]&&(t[2]=t[5]=he(t[2])+e%2/2),
t;
},
path:function(t){
var e={
fill:"none"
};
return a(t)?e.d=t:r(t)&&$e(e,t),this.createElement("path").attr(e);
},
circle:function(t,e,i){
return t=r(t)?t:{
x:t,
y:e,
r:i
},e=this.createElement("circle"),e.xSetter=function(t){
this.element.setAttribute("cx",t);
},e.ySetter=function(t){
this.element.setAttribute("cy",t);
},e.attr(t);
},
arc:function(t,e,i,n,s,o){
return r(t)&&(e=t.y,i=t.r,n=t.innerR,s=t.start,o=t.end,t=t.x),t=this.symbol("arc",t||0,e||0,i||0,i||0,{
innerR:n||0,
start:s||0,
end:o||0
}),t.r=i,t;
},
rect:function(t,e,i,n,s,o){
var s=r(t)?t.r:s,a=this.createElement("rect"),t=r(t)?t:t===X?{}:{
x:t,
y:e,
width:pe(i,0),
height:pe(n,0)
};
return o!==X&&(t.strokeWidth=o,t=a.crisp(t)),s&&(t.r=s),a.rSetter=function(t){
u(this.element,{
rx:t,
ry:t
});
},a.attr(t);
},
setSize:function(t,e,i){
var n=this.alignedObjects,s=n.length;
for(this.width=t,this.height=e,this.boxWrapper[Je(i,!0)?"animate":"attr"]({
width:t,
height:e
});s--;)n[s].align();
},
g:function(t){
var e=this.createElement("g");
return p(t)?e.attr({
"class":"highcharts-"+t
}):e;
},
image:function(t,e,i,n,s){
var o={
preserveAspectRatio:"none"
};
return arguments.length>1&&$e(o,{
x:e,
y:i,
width:n,
height:s
}),o=this.createElement("image").attr(o),o.element.setAttributeNS?o.element.setAttributeNS("http://www.w3.org/1999/xlink","href",t):o.element.setAttribute("hc-svg-href",t),
o;
},
symbol:function(t,e,i,n,s,o){
var r,a,l,h=this.symbols[t],h=h&&h(he(e),he(i),n,s,o),c=/^url\((.*?)\)$/;
return h?(r=this.path(h),$e(r,{
symbolName:t,
x:e,
y:i,
width:n,
height:s
}),o&&$e(r,o)):c.test(t)&&(l=function(t,e){
t.element&&(t.attr({
width:e[0],
height:e[1]
}),t.alignByTranslate||t.translate(he((n-e[0])/2),he((s-e[1])/2)));
},a=t.match(c)[1],t=Ie[a]||o&&o.width&&o.height&&[o.width,o.height],r=this.image(a).attr({
x:e,
y:i
}),r.isImg=!0,t?l(r,t):(r.attr({
width:0,
height:0
}),y("img",{
onload:function(){
0===this.width&&(m(this,{
position:"absolute",
top:"-999em"
}),ae.body.appendChild(this)),l(r,Ie[a]=[this.width,this.height]),this.parentNode&&this.parentNode.removeChild(this);
},
src:a
}))),r;
},
symbols:{
circle:function(t,e,i,n){
var s=.166*i;
return["M",t+i/2,e,"C",t+i+s,e,t+i+s,e+n,t+i/2,e+n,"C",t-s,e+n,t-s,e,t+i/2,e,"Z"];
},
square:function(t,e,i,n){
return["M",t,e,"L",t+i,e,t+i,e+n,t,e+n,"Z"];
},
triangle:function(t,e,i,n){
return["M",t+i/2,e,"L",t+i,e+n,t,e+n,"Z"];
},
"triangle-down":function(t,e,i,n){
return["M",t,e,"L",t+i,e,t+i/2,e+n,"Z"];
},
diamond:function(t,e,i,n){
return["M",t+i/2,e,"L",t+i,e+n/2,t+i/2,e+n,t,e+n/2,"Z"];
},
arc:function(t,e,i,n,s){
var o=s.start,i=s.r||i||n,r=s.end-.001,n=s.innerR,a=s.open,l=fe(o),h=me(o),c=fe(r),r=me(r),s=s.end-o<ye?0:1;
return["M",t+i*l,e+i*h,"A",i,i,0,s,1,t+i*c,e+i*r,a?"M":"L",t+n*c,e+n*r,"A",n,n,0,s,0,t+n*l,e+n*h,a?"":"Z"];
},
callout:function(t,e,i,n,s){
var o,r=ue(s&&s.r||0,i,n),a=r+6,l=s&&s.anchorX,s=s&&s.anchorY;
return o=["M",t+r,e,"L",t+i-r,e,"C",t+i,e,t+i,e,t+i,e+r,"L",t+i,e+n-r,"C",t+i,e+n,t+i,e+n,t+i-r,e+n,"L",t+r,e+n,"C",t,e+n,t,e+n,t,e+n-r,"L",t,e+r,"C",t,e,t,e,t+r,e],
l&&l>i&&s>e+a&&e+n-a>s?o.splice(13,3,"L",t+i,s-6,t+i+6,s,t+i,s+6,t+i,e+n-r):l&&0>l&&s>e+a&&e+n-a>s?o.splice(33,3,"L",t,s+6,t-6,s,t,s-6,t,e+r):s&&s>n&&l>t+a&&t+i-a>l?o.splice(23,3,"L",l+6,e+n,l,e+n+6,l-6,e+n,t+r,e+n):s&&0>s&&l>t+a&&t+i-a>l&&o.splice(3,3,"L",l-6,e,l,e-6,l+6,e,i-r,e),
o;
}
},
clipRect:function(t,e,i,n){
var s="highcharts-"+Oe++,o=this.createElement("clipPath").attr({
id:s
}).add(this.defs),t=this.rect(t,e,i,n,0).add(o);
return t.id=s,t.clipPath=o,t.count=0,t;
},
text:function(t,e,i,n){
var s=Ce||!Le&&this.forExport,o={};
return!n||!this.allowHTML&&this.forExport?(o.x=Math.round(e||0),i&&(o.y=Math.round(i)),
(t||0===t)&&(o.text=t),t=this.createElement("text").attr(o),s&&t.css({
position:"absolute"
}),n||(t.xSetter=function(t,e,i){
var n,s,o=i.getElementsByTagName("tspan"),r=i.getAttribute(e);
for(s=0;s<o.length;s++)n=o[s],n.getAttribute(e)===r&&n.setAttribute(e,t);
i.setAttribute(e,t);
}),t):this.html(t,e,i);
},
fontMetrics:function(e,i){
var n,o,e=e||this.style.fontSize;
return!e&&i&&t.getComputedStyle&&(i=i.element||i,e=(n=t.getComputedStyle(i,""))&&n.fontSize),
e=/px/.test(e)?s(e):/em/.test(e)?12*parseFloat(e):12,n=24>e?e+3:he(1.2*e),o=he(.8*n),
{
h:n,
b:o,
f:e
};
},
rotCorr:function(t,e,i){
var n=t;
return e&&i&&(n=pe(n*fe(e*xe),4)),{
x:-t/3*me(e*xe),
y:n
};
},
label:function(t,e,i,s,o,r,a,l,h){
var c,d,u,g,f,m,y,x,v,b,k,w=this,A=w.g(h),S=w.text("",0,0,a).attr({
zIndex:1
}),T=0,P=3,L=0,M=0,C={};
v=function(){
var t,e;
t=S.element.style,d=(void 0===u||void 0===g||A.styles.textAlign)&&p(S.textStr)&&S.getBBox(),
A.width=(u||d.width||0)+2*P+L,A.height=(g||d.height||0)+2*P,y=P+w.fontMetrics(t&&t.fontSize,S).b,
x&&(c||(t=M,e=(l?-y:0)+M,A.box=c=s?w.symbol(s,t,e,A.width,A.height,C):w.rect(t,e,A.width,A.height,0,C["stroke-width"]),
c.isImg||c.attr("fill","none"),c.add(A)),c.isImg||c.attr($e({
width:he(A.width),
height:he(A.height)
},C)),C=null);
},b=function(){
var t,e=A.styles,e=e&&e.textAlign,i=L+P;
t=l?0:y,p(u)&&d&&("center"===e||"right"===e)&&(i+={
center:.5,
right:1
}[e]*(u-d.width)),(i!==S.x||t!==S.y)&&(S.attr("x",i),t!==X&&S.attr("y",t)),S.x=i,
S.y=t;
},k=function(t,e){
c?c.attr(t,e):C[t]=e;
},A.onAdd=function(){
S.add(A),A.attr({
text:t||0===t?t:"",
x:e,
y:i
}),c&&p(o)&&A.attr({
anchorX:o,
anchorY:r
});
},A.widthSetter=function(t){
u=t;
},A.heightSetter=function(t){
g=t;
},A.paddingSetter=function(t){
p(t)&&t!==P&&(P=A.padding=t,b());
},A.paddingLeftSetter=function(t){
p(t)&&t!==L&&(L=t,b());
},A.alignSetter=function(t){
t={
left:0,
center:.5,
right:1
}[t],t!==T&&(T=t,d&&A.attr({
x:e
}));
},A.textSetter=function(t){
t!==X&&S.textSetter(t),v(),b();
},A["stroke-widthSetter"]=function(t,e){
t&&(x=!0),M=t%2/2,k(e,t);
},A.strokeSetter=A.fillSetter=A.rSetter=function(t,e){
"fill"===e&&t&&(x=!0),k(e,t);
},A.anchorXSetter=function(t,e){
o=t,k(e,he(t)-M-f);
},A.anchorYSetter=function(t,e){
r=t,k(e,t-m);
},A.xSetter=function(t){
A.x=t,T&&(t-=T*((u||d.width)+2*P)),f=he(t),A.attr("translateX",f);
},A.ySetter=function(t){
m=A.y=he(t),A.attr("translateY",m);
};
var I=A.css;
return $e(A,{
css:function(t){
if(t){
var e={},t=n(t);
He(A.textProps,function(i){
t[i]!==X&&(e[i]=t[i],delete t[i]);
}),S.css(e);
}
return I.call(A,t);
},
getBBox:function(){
return{
width:d.width+2*P,
height:d.height+2*P,
x:d.x-P,
y:d.y-P
};
},
shadow:function(t){
return c&&c.shadow(t),A;
},
destroy:function(){
_e(A.element,"mouseenter"),_e(A.element,"mouseleave"),S&&(S=S.destroy()),c&&(c=c.destroy()),
D.prototype.destroy.call(A),A=w=v=b=k=null;
}
});
}
},Y=ii,$e(D.prototype,{
htmlCss:function(t){
var e=this.element;
return(e=t&&"SPAN"===e.tagName&&t.width)&&(delete t.width,this.textWidth=e,this.updateTransform()),
t&&"ellipsis"===t.textOverflow&&(t.whiteSpace="nowrap",t.overflow="hidden"),this.styles=$e(this.styles,t),
m(this.element,t),this;
},
htmlGetBBox:function(){
var t=this.element;
return"text"===t.nodeName&&(t.style.position="absolute"),{
x:t.offsetLeft,
y:t.offsetTop,
width:t.offsetWidth,
height:t.offsetHeight
};
},
htmlUpdateTransform:function(){
if(this.added){
var t=this.renderer,e=this.element,i=this.translateX||0,n=this.translateY||0,o=this.x||0,r=this.y||0,a=this.textAlign||"left",l={
left:0,
center:.5,
right:1
}[a],h=this.shadows,c=this.styles;
if(m(e,{
marginLeft:i,
marginTop:n
}),h&&He(h,function(t){
m(t,{
marginLeft:i+1,
marginTop:n+1
});
}),this.inverted&&He(e.childNodes,function(i){
t.invertChild(i,e);
}),"SPAN"===e.tagName){
var d,u=this.rotation,g=s(this.textWidth),f=[u,a,e.innerHTML,this.textWidth,this.textAlign].join(",");
f!==this.cTT&&(d=t.fontMetrics(e.style.fontSize).b,p(u)&&this.setSpanRotation(u,l,d),
h=Je(this.elemWidth,e.offsetWidth),h>g&&/[ \-]/.test(e.textContent||e.innerText)&&(m(e,{
width:g+"px",
display:"block",
whiteSpace:c&&c.whiteSpace||"normal"
}),h=g),this.getSpanCorrection(h,d,l,u,a)),m(e,{
left:o+(this.xCorr||0)+"px",
top:r+(this.yCorr||0)+"px"
}),Ae&&(d=e.offsetHeight),this.cTT=f;
}
}else this.alignOnAdd=!0;
},
setSpanRotation:function(t,e,i){
var n={},s=ke?"-ms-transform":Ae?"-webkit-transform":Se?"MozTransform":be?"-o-transform":"";
n[s]=n.transform="rotate("+t+"deg)",n[s+(Se?"Origin":"-origin")]=n.transformOrigin=100*e+"% "+i+"px",
m(this.element,n);
},
getSpanCorrection:function(t,e,i){
this.xCorr=-t*i,this.yCorr=-e;
}
}),$e(ii.prototype,{
html:function(t,e,i){
var n=this.createElement("span"),s=n.element,o=n.renderer;
return n.textSetter=function(t){
t!==s.innerHTML&&delete this.bBox,s.innerHTML=this.textStr=t,n.htmlUpdateTransform();
},n.xSetter=n.ySetter=n.alignSetter=n.rotationSetter=function(t,e){
"align"===e&&(e="textAlign"),n[e]=t,n.htmlUpdateTransform();
},n.attr({
text:t,
x:he(e),
y:he(i)
}).css({
position:"absolute",
fontFamily:this.style.fontFamily,
fontSize:this.style.fontSize
}),s.style.whiteSpace="nowrap",n.css=n.htmlCss,o.isSVG&&(n.add=function(t){
var e,i=o.box.parentNode,r=[];
if(this.parentGroup=t){
if(e=t.div,!e){
for(;t;)r.push(t),t=t.parentGroup;
He(r.reverse(),function(t){
var n,s=u(t.element,"class");
s&&(s={
className:s
}),e=t.div=t.div||y(Be,s,{
position:"absolute",
left:(t.translateX||0)+"px",
top:(t.translateY||0)+"px"
},e||i),n=e.style,$e(t,{
translateXSetter:function(e,i){
n.left=e+"px",t[i]=e,t.doTransform=!0;
},
translateYSetter:function(e,i){
n.top=e+"px",t[i]=e,t.doTransform=!0;
}
}),He(["opacity","visibility"],function(e){
Qe(t,e+"Setter",function(t,e,i,s){
t.call(this,e,i,s),n[i]=e;
});
});
});
}
}else e=i;
return e.appendChild(s),n.added=!0,n.alignOnAdd&&n.htmlUpdateTransform(),n;
}),n;
}
});
var ni;
if(!Le&&!Ce){
ni={
init:function(t,e){
var i=["<",e,' filled="f" stroked="f"'],n=["position: ","absolute",";"],s=e===Be;
("shape"===e||s)&&n.push("left:0;top:0;width:1px;height:1px;"),n.push("visibility: ",s?"hidden":"visible"),
i.push(' style="',n.join(""),'"/>'),e&&(i=s||"span"===e||"img"===e?i.join(""):t.prepVML(i),
this.element=y(i)),this.renderer=t;
},
add:function(t){
var e=this.renderer,i=this.element,n=e.box,s=t&&t.inverted,n=t?t.element||t:n;
return t&&(this.parentGroup=t),s&&e.invertChild(i,n),n.appendChild(i),this.added=!0,
this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform(),this.onAdd&&this.onAdd(),
this;
},
updateTransform:D.prototype.htmlUpdateTransform,
setSpanRotation:function(){
var t=this.rotation,e=fe(t*xe),i=me(t*xe);
m(this.element,{
filter:t?["progid:DXImageTransform.Microsoft.Matrix(M11=",e,", M12=",-i,", M21=",i,", M22=",e,", sizingMethod='auto expand')"].join(""):"none"
});
},
getSpanCorrection:function(t,e,i,n,s){
var o,r=n?fe(n*xe):1,a=n?me(n*xe):0,l=Je(this.elemHeight,this.element.offsetHeight);
this.xCorr=0>r&&-t,this.yCorr=0>a&&-l,o=0>r*a,this.xCorr+=a*e*(o?1-i:i),this.yCorr-=r*e*(n?o?i:1-i:1),
s&&"left"!==s&&(this.xCorr-=t*i*(0>r?-1:1),n&&(this.yCorr-=l*i*(0>a?-1:1)),m(this.element,{
textAlign:s
}));
},
pathToVML:function(t){
for(var e=t.length,i=[];e--;)l(t[e])?i[e]=he(10*t[e])-5:"Z"===t[e]?i[e]="x":(i[e]=t[e],
!t.isArc||"wa"!==t[e]&&"at"!==t[e]||(i[e+5]===i[e+7]&&(i[e+7]+=t[e+7]>t[e+5]?1:-1),
i[e+6]===i[e+8]&&(i[e+8]+=t[e+8]>t[e+6]?1:-1)));
return i.join(" ")||"x";
},
clip:function(t){
var e,i=this;
return t?(e=t.members,d(e,i),e.push(i),i.destroyClip=function(){
d(e,i);
},t=t.getCSS(i)):(i.destroyClip&&i.destroyClip(),t={
clip:we?"inherit":"rect(auto)"
}),i.css(t);
},
css:D.prototype.htmlCss,
safeRemoveChild:function(t){
t.parentNode&&M(t);
},
destroy:function(){
return this.destroyClip&&this.destroyClip(),D.prototype.destroy.apply(this);
},
on:function(e,i){
return this.element["on"+e]=function(){
var e=t.event;
e.target=e.srcElement,i(e);
},this;
},
cutOffPath:function(t,e){
var i,t=t.split(/[ ,]/);
return i=t.length,(9===i||11===i)&&(t[i-4]=t[i-2]=s(t[i-2])-10*e),t.join(" ");
},
shadow:function(t,e,i){
var n,o,r,a,l,h,c,d=[],p=this.element,u=this.renderer,g=p.style,f=p.path;
if(f&&"string"!=typeof f.value&&(f="x"),l=f,t){
for(h=Je(t.width,3),c=(t.opacity||.15)/h,n=1;3>=n;n++)a=2*h+1-2*n,i&&(l=this.cutOffPath(f.value,a+.5)),
r=['<shape isShadow="true" strokeweight="',a,'" filled="false" path="',l,'" coordsize="10 10" style="',p.style.cssText,'" />'],
o=y(u.prepVML(r),null,{
left:s(g.left)+Je(t.offsetX,1),
top:s(g.top)+Je(t.offsetY,1)
}),i&&(o.cutOff=a+1),r=['<stroke color="',t.color||"black",'" opacity="',c*n,'"/>'],
y(u.prepVML(r),null,null,o),e?e.element.appendChild(o):p.parentNode.insertBefore(o,p),
d.push(o);
this.shadows=d;
}
return this;
},
updateShadows:ze,
setAttr:function(t,e){
we?this.element[t]=e:this.element.setAttribute(t,e);
},
classSetter:function(t){
this.element.className=t;
},
dashstyleSetter:function(t,e,i){
(i.getElementsByTagName("stroke")[0]||y(this.renderer.prepVML(["<stroke/>"]),null,null,i))[e]=t||"solid",
this[e]=t;
},
dSetter:function(t,e,i){
var n=this.shadows,t=t||[];
if(this.d=t.join&&t.join(" "),i.path=t=this.pathToVML(t),n)for(i=n.length;i--;)n[i].path=n[i].cutOff?this.cutOffPath(t,n[i].cutOff):t;
this.setAttr(e,t);
},
fillSetter:function(t,e,i){
var n=i.nodeName;
"SPAN"===n?i.style.color=t:"IMG"!==n&&(i.filled="none"!==t,this.setAttr("fillcolor",this.renderer.color(t,i,e,this)));
},
"fill-opacitySetter":function(t,e,i){
y(this.renderer.prepVML(["<",e.split("-")[0],' opacity="',t,'"/>']),null,null,i);
},
opacitySetter:ze,
rotationSetter:function(t,e,i){
i=i.style,this[e]=i[e]=t,i.left=-he(me(t*xe)+1)+"px",i.top=he(fe(t*xe))+"px";
},
strokeSetter:function(t,e,i){
this.setAttr("strokecolor",this.renderer.color(t,i,e,this));
},
"stroke-widthSetter":function(t,e,i){
i.stroked=!!t,this[e]=t,l(t)&&(t+="px"),this.setAttr("strokeweight",t);
},
titleSetter:function(t,e){
this.setAttr(e,t);
},
visibilitySetter:function(t,e,i){
"inherit"===t&&(t="visible"),this.shadows&&He(this.shadows,function(i){
i.style[e]=t;
}),"DIV"===i.nodeName&&(t="hidden"===t?"-999em":0,we||(i.style[e]=t?"visible":"hidden"),
e="top"),i.style[e]=t;
},
xSetter:function(t,e,i){
this[e]=t,"x"===e?e="left":"y"===e&&(e="top"),this.updateClipping?(this[e]=t,this.updateClipping()):i.style[e]=t;
},
zIndexSetter:function(t,e,i){
i.style[e]=t;
}
},ni["stroke-opacitySetter"]=ni["fill-opacitySetter"],re.VMLElement=ni=x(D,ni),ni.prototype.ySetter=ni.prototype.widthSetter=ni.prototype.heightSetter=ni.prototype.xSetter;
var si={
Element:ni,
isIE8:ve.indexOf("MSIE 8.0")>-1,
init:function(t,e,i,n){
var s;
if(this.alignedObjects=[],n=this.createElement(Be).css($e(this.getStyle(n),{
position:"relative"
})),s=n.element,t.appendChild(n.element),this.isVML=!0,this.box=s,this.boxWrapper=n,
this.gradients={},this.cache={},this.cacheKeys=[],this.setSize(e,i,!1),!ae.namespaces.hcv){
ae.namespaces.add("hcv","urn:schemas-microsoft-com:vml");
try{
ae.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
}catch(o){
ae.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
}
}
},
isHidden:function(){
return!this.box.offsetWidth;
},
clipRect:function(t,e,i,n){
var s=this.createElement(),o=r(t);
return $e(s,{
members:[],
count:0,
left:(o?t.x:t)+1,
top:(o?t.y:e)+1,
width:(o?t.width:i)-1,
height:(o?t.height:n)-1,
getCSS:function(t){
var e=t.element,i=e.nodeName,t=t.inverted,n=this.top-("shape"===i?e.offsetTop:0),s=this.left,e=s+this.width,o=n+this.height,n={
clip:"rect("+he(t?s:n)+"px,"+he(t?o:e)+"px,"+he(t?e:o)+"px,"+he(t?n:s)+"px)"
};
return!t&&we&&"DIV"===i&&$e(n,{
width:e+"px",
height:o+"px"
}),n;
},
updateClipping:function(){
He(s.members,function(t){
t.element&&t.css(s.getCSS(t));
});
}
});
},
color:function(t,e,i,n){
var s,o,r,a=this,l=/^rgba/,h="none";
if(t&&t.linearGradient?r="gradient":t&&t.radialGradient&&(r="pattern"),r){
var c,d,p,u,g,f,m,x,v=t.linearGradient||t.radialGradient,b="",t=t.stops,k=[],w=function(){
o=['<fill colors="'+k.join(",")+'" opacity="',g,'" o:opacity2="',u,'" type="',r,'" ',b,'focus="100%" method="any" />'],
y(a.prepVML(o),null,null,e);
};
if(p=t[0],x=t[t.length-1],p[0]>0&&t.unshift([0,p[1]]),x[0]<1&&t.push([1,x[1]]),He(t,function(t,e){
l.test(t[1])?(s=z(t[1]),c=s.get("rgb"),d=s.get("a")):(c=t[1],d=1),k.push(100*t[0]+"% "+c),
e?(g=d,f=c):(u=d,m=c);
}),"fill"===i)if("gradient"===r)i=v.x1||v[0]||0,t=v.y1||v[1]||0,p=v.x2||v[2]||0,
v=v.y2||v[3]||0,b='angle="'+(90-180*le.atan((v-t)/(p-i))/ye)+'"',w();else{
var A,h=v.r,S=2*h,T=2*h,P=v.cx,L=v.cy,M=e.radialReference,h=function(){
M&&(A=n.getBBox(),P+=(M[0]-A.x)/A.width-.5,L+=(M[1]-A.y)/A.height-.5,S*=M[2]/A.width,
T*=M[2]/A.height),b='src="'+G.global.VMLRadialGradientURL+'" size="'+S+","+T+'" origin="0.5,0.5" position="'+P+","+L+'" color2="'+m+'" ',
w();
};
n.added?h():n.onAdd=h,h=f;
}else h=c;
}else l.test(t)&&"IMG"!==e.tagName?(s=z(t),n[i+"-opacitySetter"](s.get("a"),i,e),
h=s.get("rgb")):(h=e.getElementsByTagName(i),h.length&&(h[0].opacity=1,h[0].type="solid"),
h=t);
return h;
},
prepVML:function(t){
var e=this.isIE8,t=t.join("");
return e?(t=t.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),t=-1===t.indexOf('style="')?t.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):t.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):t=t.replace("<","<hcv:"),
t;
},
text:ii.prototype.html,
path:function(t){
var e={
coordsize:"10 10"
};
return a(t)?e.d=t:r(t)&&$e(e,t),this.createElement("shape").attr(e);
},
circle:function(t,e,i){
var n=this.symbol("circle");
return r(t)&&(i=t.r,e=t.y,t=t.x),n.isCircle=!0,n.r=i,n.attr({
x:t,
y:e
});
},
g:function(t){
var e;
return t&&(e={
className:"highcharts-"+t,
"class":"highcharts-"+t
}),this.createElement(Be).attr(e);
},
image:function(t,e,i,n,s){
var o=this.createElement("img").attr({
src:t
});
return arguments.length>1&&o.attr({
x:e,
y:i,
width:n,
height:s
}),o;
},
createElement:function(t){
return"rect"===t?this.symbol(t):ii.prototype.createElement.call(this,t);
},
invertChild:function(t,e){
var i=this,n=e.style,o="IMG"===t.tagName&&t.style;
m(t,{
flip:"x",
left:s(n.width)-(o?s(o.top):1),
top:s(n.height)-(o?s(o.left):1),
rotation:-90
}),He(t.childNodes,function(e){
i.invertChild(e,t);
});
},
symbols:{
arc:function(t,e,i,n,s){
var o=s.start,r=s.end,a=s.r||i||n,i=s.innerR,n=fe(o),l=me(o),h=fe(r),c=me(r);
return r-o===0?["x"]:(o=["wa",t-a,e-a,t+a,e+a,t+a*n,e+a*l,t+a*h,e+a*c],s.open&&!i&&o.push("e","M",t,e),
o.push("at",t-i,e-i,t+i,e+i,t+i*h,e+i*c,t+i*n,e+i*l,"x","e"),o.isArc=!0,o);
},
circle:function(t,e,i,n,s){
return s&&(i=n=2*s.r),s&&s.isCircle&&(t-=i/2,e-=n/2),["wa",t,e,t+i,e+n,t+i,e+n/2,t+i,e+n/2,"e"];
},
rect:function(t,e,i,n,s){
return ii.prototype.symbols[p(s)&&s.r?"callout":"square"].call(0,t,e,i,n,s);
}
}
};
re.VMLRenderer=ni=function(){
this.init.apply(this,arguments);
},ni.prototype=n(ii.prototype,si),Y=ni;
}
ii.prototype.measureSpanWidth=function(t,e){
var i,n=ae.createElement("span");
return i=ae.createTextNode(t),n.appendChild(i),m(n,e),this.box.appendChild(n),i=n.offsetWidth,
M(n),i;
};
var oi;
Ce&&(re.CanVGRenderer=ni=function(){
Pe="http://www.w3.org/1999/xhtml";
},ni.prototype.symbols={},oi=function(){
function t(){
var t,i=e.length;
for(t=0;i>t;t++)e[t]();
e=[];
}
var e=[];
return{
push:function(i,n){
if(0===e.length){
var s=ae.getElementsByTagName("head")[0],o=ae.createElement("script");
o.type="text/javascript",o.src=n,o.onload=t,s.appendChild(o);
}
e.push(i);
}
};
}(),Y=ni),R.prototype={
addLabel:function(){
var t,e=this.axis,i=e.options,s=e.chart,o=e.categories,r=e.names,a=this.pos,l=i.labels,h=e.tickPositions,d=a===h[0],u=a===h[h.length-1],r=o?Je(o[a],r[a],a):a,o=this.label,h=h.info;
e.isDatetimeAxis&&h&&(t=i.dateTimeLabelFormats[h.higherRanks[a]||h.unitName]),this.isFirst=d,
this.isLast=u,i=e.labelFormatter.call({
axis:e,
chart:s,
isFirst:d,
isLast:u,
dateTimeLabelFormat:t,
value:e.isLog?C(c(r)):r
}),p(o)?o&&o.attr({
text:i
}):(this.labelLength=(this.label=o=p(i)&&l.enabled?s.renderer.text(i,0,0,l.useHTML).css(n(l.style)).add(e.labelGroup):null)&&o.getBBox().width,
this.rotation=0);
},
getLabelSize:function(){
return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0;
},
handleOverflow:function(t){
var e,i=this.axis,n=t.x,s=i.chart.chartWidth,o=i.chart.spacing,r=Je(i.labelLeft,ue(i.pos,o[3])),o=Je(i.labelRight,pe(i.pos+i.len,s-o[1])),a=this.label,l=this.rotation,h={
left:0,
center:.5,
right:1
}[i.labelAlign],c=a.getBBox().width,d=i.slotWidth,p=1,u={};
l?0>l&&r>n-h*c?e=he(n/fe(l*xe)-r):l>0&&n+h*c>o&&(e=he((s-n)/fe(l*xe))):(s=n+(1-h)*c,
r>n-h*c?d=t.x+d*(1-h)-r:s>o&&(d=o-t.x+d*h,p=-1),d=ue(i.slotWidth,d),d<i.slotWidth&&"center"===i.labelAlign&&(t.x+=p*(i.slotWidth-d-h*(i.slotWidth-ue(c,d)))),
(c>d||i.autoRotation&&a.styles.width)&&(e=d)),e&&(u.width=e,i.options.labels.style.textOverflow||(u.textOverflow="ellipsis"),
a.css(u));
},
getPosition:function(t,e,i,n){
var s=this.axis,o=s.chart,r=n&&o.oldChartHeight||o.chartHeight;
return{
x:t?s.translate(e+i,null,null,n)+s.transB:s.left+s.offset+(s.opposite?(n&&o.oldChartWidth||o.chartWidth)-s.right-s.left:0),
y:t?r-s.bottom+s.offset-(s.opposite?s.height:0):r-s.translate(e+i,null,null,n)-s.transB
};
},
getLabelPosition:function(t,e,i,n,s,o,r,a){
var l=this.axis,h=l.transA,c=l.reversed,d=l.staggerLines,u=l.tickRotCorr||{
x:0,
y:0
},g=s.y;
return p(g)||(g=2===l.side?u.y+8:g=fe(i.rotation*xe)*(u.y-i.getBBox(!1,0).height/2)),
t=t+s.x+u.x-(o&&n?o*h*(c?-1:1):0),e=e+g-(o&&!n?o*h*(c?1:-1):0),d&&(i=r/(a||1)%d,
l.opposite&&(i=d-i-1),e+=i*(l.labelOffset/d)),{
x:t,
y:he(e)
};
},
getMarkPath:function(t,e,i,n,s,o){
return o.crispLine(["M",t,e,"L",t+(s?0:-i),e+(s?i:0)],n);
},
render:function(t,e,i){
var n=this.axis,s=n.options,o=n.chart.renderer,r=n.horiz,a=this.type,l=this.label,h=this.pos,c=s.labels,d=this.gridLine,p=a?a+"Grid":"grid",u=a?a+"Tick":"tick",g=s[p+"LineWidth"],f=s[p+"LineColor"],m=s[p+"LineDashStyle"],y=s[u+"Length"],p=Je(s[u+"Width"],!a&&n.isXAxis?1:0),x=s[u+"Color"],v=s[u+"Position"],u=this.mark,b=c.step,k=!0,w=n.tickmarkOffset,A=this.getPosition(r,h,w,e),S=A.x,A=A.y,T=r&&S===n.pos+n.len||!r&&A===n.pos?-1:1,i=Je(i,1);
this.isActive=!0,g&&(h=n.getPlotLinePath(h+w,g*T,e,!0),d===X&&(d={
stroke:f,
"stroke-width":g
},m&&(d.dashstyle=m),a||(d.zIndex=1),e&&(d.opacity=0),this.gridLine=d=g?o.path(h).attr(d).add(n.gridGroup):null),
!e&&d&&h&&d[this.isNew?"attr":"animate"]({
d:h,
opacity:i
})),p&&y&&("inside"===v&&(y=-y),n.opposite&&(y=-y),a=this.getMarkPath(S,A,y,p*T,r,o),
u?u.animate({
d:a,
opacity:i
}):this.mark=o.path(a).attr({
stroke:x,
"stroke-width":p,
opacity:i
}).add(n.axisGroup)),l&&!isNaN(S)&&(l.xy=A=this.getLabelPosition(S,A,l,r,c,w,t,b),
this.isFirst&&!this.isLast&&!Je(s.showFirstLabel,1)||this.isLast&&!this.isFirst&&!Je(s.showLastLabel,1)?k=!1:r&&!n.isRadial&&!c.step&&!c.rotation&&!e&&0!==i&&this.handleOverflow(A),
b&&t%b&&(k=!1),k&&!isNaN(A.y)?(A.opacity=i,l[this.isNew?"attr":"animate"](A),this.isNew=!1):l.attr("y",-9999));
},
destroy:function(){
L(this,this.axis);
}
},re.PlotLineOrBand=function(t,e){
this.axis=t,e&&(this.options=e,this.id=e.id);
},re.PlotLineOrBand.prototype={
render:function(){
var t,e=this,i=e.axis,s=i.horiz,o=e.options,r=o.label,a=e.label,l=o.width,c=o.to,d=o.from,u=p(d)&&p(c),g=o.value,f=o.dashStyle,m=e.svgElem,y=[],x=o.color,v=o.zIndex,b=o.events,k={},w=i.chart.renderer;
if(i.isLog&&(d=h(d),c=h(c),g=h(g)),l)y=i.getPlotLinePath(g,l),k={
stroke:x,
"stroke-width":l
},f&&(k.dashstyle=f);else{
if(!u)return;
y=i.getPlotBandPath(d,c,o),x&&(k.fill=x),o.borderWidth&&(k.stroke=o.borderColor,
k["stroke-width"]=o.borderWidth);
}
if(p(v)&&(k.zIndex=v),m)y?(m.show(),m.animate({
d:y
})):(m.hide(),a&&(e.label=a=a.destroy()));else if(y&&y.length&&(e.svgElem=m=w.path(y).attr(k).add(),
b))for(t in o=function(t){
m.on(t,function(i){
b[t].apply(e,[i]);
});
},b)o(t);
return r&&p(r.text)&&y&&y.length&&i.width>0&&i.height>0&&!y.flat?(r=n({
align:s&&u&&"center",
x:s?!u&&4:10,
verticalAlign:!s&&u&&"middle",
y:s?u?16:10:u?6:-4,
rotation:s&&!u&&90
},r),a||(k={
align:r.textAlign||r.align,
rotation:r.rotation
},p(v)&&(k.zIndex=v),e.label=a=w.text(r.text,0,0,r.useHTML).attr(k).css(r.style).add()),
i=[y[1],y[4],u?y[6]:y[1]],u=[y[2],y[5],u?y[7]:y[2]],y=T(i),s=T(u),a.align(r,!1,{
x:y,
y:s,
width:P(i)-y,
height:P(u)-s
}),a.show()):a&&a.hide(),e;
},
destroy:function(){
d(this.axis.plotLinesAndBands,this),delete this.axis,L(this);
}
};
var ri=re.Axis=function(){
this.init.apply(this,arguments);
};
ri.prototype={
defaultOptions:{
dateTimeLabelFormats:{
millisecond:"%H:%M:%S.%L",
second:"%H:%M:%S",
minute:"%H:%M",
hour:"%H:%M",
day:"%e. %b",
week:"%e. %b",
month:"%b '%y",
year:"%Y"
},
endOnTick:!1,
gridLineColor:"#D8D8D8",
labels:{
enabled:!0,
style:{
color:"#606060",
cursor:"default",
fontSize:"11px"
},
x:0,
y:15
},
lineColor:"#C0D0E0",
lineWidth:1,
minPadding:.01,
maxPadding:.01,
minorGridLineColor:"#E0E0E0",
minorGridLineWidth:1,
minorTickColor:"#A0A0A0",
minorTickLength:2,
minorTickPosition:"outside",
startOfWeek:1,
startOnTick:!1,
tickColor:"#C0D0E0",
tickLength:10,
tickmarkPlacement:"between",
tickPixelInterval:100,
tickPosition:"outside",
title:{
align:"middle",
style:{
color:"#707070"
}
},
type:"linear"
},
defaultYAxisOptions:{
endOnTick:!0,
gridLineWidth:1,
tickPixelInterval:72,
showLastLabel:!0,
labels:{
x:-8,
y:3
},
lineWidth:0,
maxPadding:.05,
minPadding:.05,
startOnTick:!0,
title:{
rotation:270,
text:"Values"
},
stackLabels:{
enabled:!1,
formatter:function(){
return re.numberFormat(this.total,-1);
},
style:n(ti.line.dataLabels.style,{
color:"#000000"
})
}
},
defaultLeftAxisOptions:{
labels:{
x:-15,
y:null
},
title:{
rotation:270
}
},
defaultRightAxisOptions:{
labels:{
x:15,
y:null
},
title:{
rotation:90
}
},
defaultBottomAxisOptions:{
labels:{
autoRotation:[-45],
x:0,
y:null
},
title:{
rotation:0
}
},
defaultTopAxisOptions:{
labels:{
autoRotation:[-45],
x:0,
y:-15
},
title:{
rotation:0
}
},
init:function(t,e){
var i=e.isX;
this.chart=t,this.horiz=t.inverted?!i:i,this.coll=(this.isXAxis=i)?"xAxis":"yAxis",
this.opposite=e.opposite,this.side=e.side||(this.horiz?this.opposite?0:2:this.opposite?1:3),
this.setOptions(e);
var n=this.options,s=n.type;
this.labelFormatter=n.labels.formatter||this.defaultLabelFormatter,this.userOptions=e,
this.minPixelPadding=0,this.reversed=n.reversed,this.visible=n.visible!==!1,this.zoomEnabled=n.zoomEnabled!==!1,
this.categories=n.categories||"category"===s,this.names=this.names||[],this.isLog="logarithmic"===s,
this.isDatetimeAxis="datetime"===s,this.isLinked=p(n.linkedTo),this.ticks={},this.labelEdge=[],
this.minorTicks={},this.plotLinesAndBands=[],this.alternateBands={},this.len=0,this.minRange=this.userMinRange=n.minRange||n.maxZoom,
this.range=n.range,this.offset=n.offset||0,this.stacks={},this.oldStacks={},this.stacksTouched=0,
this.min=this.max=null,this.crosshair=Je(n.crosshair,g(t.options.tooltip.crosshairs)[i?0:1],!1);
var o,n=this.options.events;
-1===Ge(this,t.axes)&&(i&&!this.isColorAxis?t.axes.splice(t.xAxis.length,0,this):t.axes.push(this),
t[this.coll].push(this)),this.series=this.series||[],t.inverted&&i&&this.reversed===X&&(this.reversed=!0),
this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;
for(o in n)je(this,o,n[o]);
this.isLog&&(this.val2lin=h,this.lin2val=c);
},
setOptions:function(t){
this.options=n(this.defaultOptions,this.isXAxis?{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],n(G[this.coll],t));
},
defaultLabelFormatter:function(){
var t,e=this.axis,i=this.value,n=e.categories,s=this.dateTimeLabelFormat,o=G.lang.numericSymbols,r=o&&o.length,a=e.options.labels.format,e=e.isLog?i:e.tickInterval;
if(a)t=k(a,this);else if(n)t=i;else if(s)t=H(s,i);else if(r&&e>=1e3)for(;r--&&t===X;)n=Math.pow(1e3,r+1),
e>=n&&10*i%n===0&&null!==o[r]&&(t=re.numberFormat(i/n,-1)+o[r]);
return t===X&&(t=ge(i)>=1e4?re.numberFormat(i,-1):re.numberFormat(i,-1,X,"")),t;
},
getSeriesExtremes:function(){
var t=this,e=t.chart;
t.hasVisibleSeries=!1,t.dataMin=t.dataMax=t.threshold=null,t.softThreshold=!t.isXAxis,
t.buildStacks&&t.buildStacks(),He(t.series,function(i){
if(i.visible||!e.options.chart.ignoreHiddenSeries){
var n,s=i.options,o=s.threshold;
t.hasVisibleSeries=!0,t.isLog&&0>=o&&(o=null),t.isXAxis?(s=i.xData,s.length&&(t.dataMin=ue(Je(t.dataMin,s[0]),T(s)),
t.dataMax=pe(Je(t.dataMax,s[0]),P(s)))):(i.getExtremes(),n=i.dataMax,i=i.dataMin,
p(i)&&p(n)&&(t.dataMin=ue(Je(t.dataMin,i),i),t.dataMax=pe(Je(t.dataMax,n),n)),p(o)&&(t.threshold=o),
(!s.softThreshold||t.isLog)&&(t.softThreshold=!1));
}
});
},
translate:function(t,e,i,n,s,o){
var r=this.linkedParent||this,a=1,h=0,c=n?r.oldTransA:r.transA,n=n?r.oldMin:r.min,d=r.minPixelPadding,s=(r.doPostTranslate||r.isLog&&s)&&r.lin2val;
return c||(c=r.transA),i&&(a*=-1,h=r.len),r.reversed&&(a*=-1,h-=a*(r.sector||r.len)),
e?(t=t*a+h,t-=d,t=t/c+n,s&&(t=r.lin2val(t))):(s&&(t=r.val2lin(t)),"between"===o&&(o=.5),
t=a*(t-n)*c+h+a*d+(l(o)?c*o*r.pointRange:0)),t;
},
toPixels:function(t,e){
return this.translate(t,!1,!this.horiz,null,!0)+(e?0:this.pos);
},
toValue:function(t,e){
return this.translate(t-(e?0:this.pos),!0,!this.horiz,null,!0);
},
getPlotLinePath:function(t,e,i,n,s){
var o,r,a,l=this.chart,h=this.left,c=this.top,d=i&&l.oldChartHeight||l.chartHeight,p=i&&l.oldChartWidth||l.chartWidth;
o=this.transB;
var u=function(t,e,i){
return(e>t||t>i)&&(n?t=ue(pe(e,t),i):a=!0),t;
},s=Je(s,this.translate(t,null,null,i)),t=i=he(s+o);
return o=r=he(d-s-o),isNaN(s)?a=!0:this.horiz?(o=c,r=d-this.bottom,t=i=u(t,h,h+this.width)):(t=h,
i=p-this.right,o=r=u(o,c,c+this.height)),a&&!n?null:l.renderer.crispLine(["M",t,o,"L",i,r],e||1);
},
getLinearTickPositions:function(t,e,i){
var n,s=C(ce(e/t)*t),o=C(de(i/t)*t),r=[];
if(e===i&&l(e))return[e];
for(e=s;o>=e&&(r.push(e),e=C(e+t),e!==n);)n=e;
return r;
},
getMinorTickPositions:function(){
var t,e=this.options,i=this.tickPositions,n=this.minorTickInterval,s=[],o=this.pointRangePadding||0;
t=this.min-o;
var o=this.max+o,r=o-t;
if(r&&r/n<this.len/3)if(this.isLog)for(o=i.length,t=1;o>t;t++)s=s.concat(this.getLogTickPositions(n,i[t-1],i[t],!0));else if(this.isDatetimeAxis&&"auto"===e.minorTickInterval)s=s.concat(this.getTimeTicks(this.normalizeTimeTickInterval(n),t,o,e.startOfWeek));else for(i=t+(i[0]-t)%n;o>=i;i+=n)s.push(i);
return 0!==s.length&&this.trimTicks(s,e.startOnTick,e.endOnTick),s;
},
adjustForMinRange:function(){
var t,e,i,n,s,o,r,a=this.options,l=this.min,h=this.max,c=this.dataMax-this.dataMin>=this.minRange;
this.isXAxis&&this.minRange===X&&!this.isLog&&(p(a.min)||p(a.max)?this.minRange=null:(He(this.series,function(t){
for(s=t.xData,i=o=t.xIncrement?1:s.length-1;i>0;i--)n=s[i]-s[i-1],(e===X||e>n)&&(e=n);
}),this.minRange=ue(5*e,this.dataMax-this.dataMin))),h-l<this.minRange&&(r=this.minRange,
t=(r-h+l)/2,t=[l-t,Je(a.min,l-t)],c&&(t[2]=this.dataMin),l=P(t),h=[l+r,Je(a.max,l+r)],
c&&(h[2]=this.dataMax),h=T(h),r>h-l&&(t[0]=h-r,t[1]=Je(a.min,h-r),l=P(t))),this.min=l,
this.max=h;
},
setAxisTranslation:function(t){
var e,i=this,n=i.max-i.min,s=i.axisPointRange||0,r=0,a=0,l=i.linkedParent,h=!!i.categories,c=i.transA,d=i.isXAxis;
(d||h||s)&&(l?(r=l.minPointOffset,a=l.pointRangePadding):(He(i.series,function(t){
var i=t.closestPointRange;
!t.noSharedTooltip&&p(i)&&(e=p(e)?ue(e,i):i);
}),He(i.series,function(t){
var n=h?1:d?Je(t.options.pointRange,e,0):i.axisPointRange||0,t=t.options.pointPlacement;
s=pe(s,n),i.single||(r=pe(r,o(t)?0:n/2),a=pe(a,"on"===t?0:n));
})),l=i.ordinalSlope&&e?i.ordinalSlope/e:1,i.minPointOffset=r*=l,i.pointRangePadding=a*=l,
i.pointRange=ue(s,n),d&&(i.closestPointRange=e)),t&&(i.oldTransA=c),i.translationSlope=i.transA=c=i.len/(n+a||1),
i.transB=i.horiz?i.left:i.bottom,i.minPixelPadding=c*r;
},
minFromRange:function(){
return this.max-this.range;
},
setTickInterval:function(t){
var i,n,s,o,r=this,a=r.chart,c=r.options,d=r.isLog,u=r.isDatetimeAxis,g=r.isXAxis,f=r.isLinked,m=c.maxPadding,y=c.minPadding,x=c.tickInterval,v=c.tickPixelInterval,b=r.categories,k=r.threshold,S=r.softThreshold;
!u&&!b&&!f&&this.getTickAmount(),s=Je(r.userMin,c.min),o=Je(r.userMax,c.max),f?(r.linkedParent=a[r.coll][c.linkedTo],
a=r.linkedParent.getExtremes(),r.min=Je(a.min,a.dataMin),r.max=Je(a.max,a.dataMax),
c.type!==r.linkedParent.options.type&&e(11,1)):(!S&&p(k)&&(r.dataMin>=k?(i=k,y=0):r.dataMax<=k&&(n=k,
m=0)),r.min=Je(s,i,r.dataMin),r.max=Je(o,n,r.dataMax)),d&&(!t&&ue(r.min,Je(r.dataMin,r.min))<=0&&e(10,1),
r.min=C(h(r.min),15),r.max=C(h(r.max),15)),r.range&&p(r.max)&&(r.userMin=r.min=s=pe(r.min,r.minFromRange()),
r.userMax=o=r.max,r.range=null),r.beforePadding&&r.beforePadding(),r.adjustForMinRange(),
b||r.axisPointRange||r.usePercentage||f||!p(r.min)||!p(r.max)||!(a=r.max-r.min)||(!p(s)&&y&&(r.min-=a*y),
!p(o)&&m&&(r.max+=a*m)),l(c.floor)&&(r.min=pe(r.min,c.floor)),l(c.ceiling)&&(r.max=ue(r.max,c.ceiling)),
S&&p(r.dataMin)&&(k=k||0,!p(s)&&r.min<k&&r.dataMin>=k?r.min=k:!p(o)&&r.max>k&&r.dataMax<=k&&(r.max=k)),
r.tickInterval=r.min===r.max||void 0===r.min||void 0===r.max?1:f&&!x&&v===r.linkedParent.options.tickPixelInterval?x=r.linkedParent.tickInterval:Je(x,this.tickAmount?(r.max-r.min)/pe(this.tickAmount-1,1):void 0,b?1:(r.max-r.min)*v/pe(r.len,v)),
g&&!t&&He(r.series,function(t){
t.processData(r.min!==r.oldMin||r.max!==r.oldMax);
}),r.setAxisTranslation(!0),r.beforeSetTickPositions&&r.beforeSetTickPositions(),
r.postProcessTickInterval&&(r.tickInterval=r.postProcessTickInterval(r.tickInterval)),
r.pointRange&&!x&&(r.tickInterval=pe(r.pointRange,r.tickInterval)),t=Je(c.minTickInterval,r.isDatetimeAxis&&r.closestPointRange),
!x&&r.tickInterval<t&&(r.tickInterval=t),u||d||x||(r.tickInterval=A(r.tickInterval,null,w(r.tickInterval),Je(c.allowDecimals,!(r.tickInterval>.5&&r.tickInterval<5&&r.max>1e3&&r.max<9999)),!!this.tickAmount)),
!this.tickAmount&&this.len&&(r.tickInterval=r.unsquish()),this.setTickPositions();
},
setTickPositions:function(){
var t,e,i=this.options,n=i.tickPositions,s=i.tickPositioner,o=i.startOnTick,r=i.endOnTick;
this.tickmarkOffset=this.categories&&"between"===i.tickmarkPlacement&&1===this.tickInterval?.5:0,
this.minorTickInterval="auto"===i.minorTickInterval&&this.tickInterval?this.tickInterval/5:i.minorTickInterval,
this.tickPositions=t=n&&n.slice(),!t&&(t=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,i.units),this.min,this.max,i.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),
t.length>this.len&&(t=[t[0],t.pop()]),this.tickPositions=t,s&&(s=s.apply(this,[this.min,this.max])))&&(this.tickPositions=t=s),
this.isLinked||(this.trimTicks(t,o,r),this.min===this.max&&p(this.min)&&!this.tickAmount&&(e=!0,
this.min-=.5,this.max+=.5),this.single=e,!n&&!s&&this.adjustTickAmount());
},
trimTicks:function(t,e,i){
var n=t[0],s=t[t.length-1],o=this.minPointOffset||0;
e?this.min=n:this.min-o>n&&t.shift(),i?this.max=s:this.max+o<s&&t.pop(),0===t.length&&p(n)&&t.push((s+n)/2);
},
alignToOthers:function(){
var t,e={},i=this.options;
return this.chart.options.chart.alignTicks!==!1&&i.alignTicks!==!1&&He(this.chart[this.coll],function(i){
var n=i.options,n=[i.horiz?n.left:n.top,n.width,n.height,n.pane].join(",");
i.series.length&&(e[n]?t=!0:e[n]=1);
}),t;
},
getTickAmount:function(){
var t=this.options,e=t.tickAmount,i=t.tickPixelInterval;
!p(t.tickInterval)&&this.len<i&&!this.isRadial&&!this.isLog&&t.startOnTick&&t.endOnTick&&(e=2),
!e&&this.alignToOthers()&&(e=de(this.len/i)+1),4>e&&(this.finalTickAmt=e,e=5),this.tickAmount=e;
},
adjustTickAmount:function(){
var t=this.tickInterval,e=this.tickPositions,i=this.tickAmount,n=this.finalTickAmt,s=e&&e.length;
if(i>s){
for(;e.length<i;)e.push(C(e[e.length-1]+t));
this.transA*=(s-1)/(i-1),this.max=e[e.length-1];
}else s>i&&(this.tickInterval*=2,this.setTickPositions());
if(p(n)){
for(t=i=e.length;t--;)(3===n&&t%2===1||2>=n&&t>0&&i-1>t)&&e.splice(t,1);
this.finalTickAmt=X;
}
},
setScale:function(){
var t,e;
this.oldMin=this.min,this.oldMax=this.max,this.oldAxisLength=this.len,this.setAxisSize(),
e=this.len!==this.oldAxisLength,He(this.series,function(e){
(e.isDirtyData||e.isDirty||e.xAxis.isDirty)&&(t=!0);
}),e||t||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),
this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,
this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=e||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks();
},
setExtremes:function(t,e,i,n,s){
var o=this,r=o.chart,i=Je(i,!0);
He(o.series,function(t){
delete t.kdTree;
}),s=$e(s,{
min:t,
max:e
}),Ue(o,"setExtremes",s,function(){
o.userMin=t,o.userMax=e,o.eventArgs=s,i&&r.redraw(n);
});
},
zoom:function(t,e){
var i=this.dataMin,n=this.dataMax,s=this.options,o=ue(i,Je(s.min,i)),s=pe(n,Je(s.max,n));
return this.allowZoomOutside||(p(i)&&o>=t&&(t=o),p(n)&&e>=s&&(e=s)),this.displayBtn=t!==X||e!==X,
this.setExtremes(t,e,!1,X,{
trigger:"zoom"
}),!0;
},
setAxisSize:function(){
var t=this.chart,e=this.options,i=e.offsetLeft||0,n=this.horiz,s=Je(e.width,t.plotWidth-i+(e.offsetRight||0)),o=Je(e.height,t.plotHeight),r=Je(e.top,t.plotTop),e=Je(e.left,t.plotLeft+i),i=/%$/;
i.test(o)&&(o=parseFloat(o)/100*t.plotHeight),i.test(r)&&(r=parseFloat(r)/100*t.plotHeight+t.plotTop),
this.left=e,this.top=r,this.width=s,this.height=o,this.bottom=t.chartHeight-o-r,
this.right=t.chartWidth-s-e,this.len=pe(n?s:o,0),this.pos=n?e:r;
},
getExtremes:function(){
var t=this.isLog;
return{
min:t?C(c(this.min)):this.min,
max:t?C(c(this.max)):this.max,
dataMin:this.dataMin,
dataMax:this.dataMax,
userMin:this.userMin,
userMax:this.userMax
};
},
getThreshold:function(t){
var e=this.isLog,i=e?c(this.min):this.min,e=e?c(this.max):this.max;
return null===t?t=0>e?e:i:i>t?t=i:t>e&&(t=e),this.translate(t,0,1,0,1);
},
autoLabelAlign:function(t){
return t=(Je(t,0)-90*this.side+720)%360,t>15&&165>t?"right":t>195&&345>t?"left":"center";
},
unsquish:function(){
var t,e,i,n=this.ticks,s=this.options.labels,o=this.horiz,r=this.tickInterval,a=r,l=this.len/(((this.categories?1:0)+this.max-this.min)/r),h=s.rotation,c=this.chart.renderer.fontMetrics(s.style.fontSize,n[0]&&n[0].label),d=Number.MAX_VALUE,u=function(t){
return t/=l||1,t=t>1?de(t):1,t*r;
};
return o?(i=!s.staggerLines&&!s.step&&(p(h)?[h]:l<Je(s.autoRotationLimit,80)&&s.autoRotation))&&He(i,function(i){
var n;
(i===h||i&&i>=-90&&90>=i)&&(e=u(ge(c.h/me(xe*i))),n=e+ge(i/360),d>n&&(d=n,t=i,a=e));
}):s.step||(a=u(c.h)),this.autoRotation=i,this.labelRotation=Je(t,h),a;
},
renderUnsquish:function(){
var t,e,i,s=this.chart,r=s.renderer,a=this.tickPositions,l=this.ticks,h=this.options.labels,c=this.horiz,d=s.margin,p=this.categories?a.length:a.length-1,d=this.slotWidth=c&&(h.step||0)<2&&!h.rotation&&(this.staggerLines||1)*s.plotWidth/p||!c&&(d[3]&&d[3]-s.spacing[3]||.33*s.chartWidth),u=pe(1,he(d-2*(h.padding||5))),g={},p=r.fontMetrics(h.style.fontSize,l[0]&&l[0].label),f=h.style.textOverflow,m=0;
if(o(h.rotation)||(g.rotation=h.rotation||0),this.autoRotation)He(a,function(t){
(t=l[t])&&t.labelLength>m&&(m=t.labelLength);
}),m>u&&m>p.h?g.rotation=this.labelRotation:this.labelRotation=0;else if(d&&(t={
width:u+"px"
},!f))for(t.textOverflow="clip",e=a.length;!c&&e--;)i=a[e],(u=l[i].label)&&("ellipsis"===u.styles.textOverflow&&u.css({
textOverflow:"clip"
}),(u.getBBox().height>this.len/a.length-(p.h-p.f)||l[i].labelLength>d)&&(u.specCss={
textOverflow:"ellipsis"
}));
g.rotation&&(t={
width:(m>.5*s.chartHeight?.33*s.chartHeight:s.chartHeight)+"px"
},!f)&&(t.textOverflow="ellipsis"),this.labelAlign=g.align=h.align||this.autoLabelAlign(this.labelRotation),
He(a,function(e){
var i=(e=l[e])&&e.label;
i&&(i.attr(g),t&&i.css(n(t,i.specCss)),delete i.specCss,e.rotation=g.rotation);
}),this.tickRotCorr=r.rotCorr(p.b,this.labelRotation||0,0!==this.side);
},
hasData:function(){
return this.hasVisibleSeries||p(this.min)&&p(this.max)&&!!this.tickPositions;
},
getOffset:function(){
var t,e,i,n,s=this,o=s.chart,r=o.renderer,a=s.options,l=s.tickPositions,h=s.ticks,c=s.horiz,d=s.side,u=o.inverted?[1,0,3,2][d]:d,g=0,f=0,m=a.title,y=a.labels,x=0,v=s.opposite,b=o.axisOffset,o=o.clipOffset,k=[-1,1,1,-1][d],w=s.axisParent;
if(t=s.hasData(),s.showAxis=e=t||Je(a.showEmpty,!0),s.staggerLines=s.horiz&&y.staggerLines,
s.axisGroup||(s.gridGroup=r.g("grid").attr({
zIndex:a.gridZIndex||1
}).add(w),s.axisGroup=r.g("axis").attr({
zIndex:a.zIndex||2
}).add(w),s.labelGroup=r.g("axis-labels").attr({
zIndex:y.zIndex||7
}).addClass("highcharts-"+s.coll.toLowerCase()+"-labels").add(w)),t||s.isLinked)He(l,function(t){
h[t]?h[t].addLabel():h[t]=new R(s,t);
}),s.renderUnsquish(),y.reserveSpace!==!1&&(0===d||2===d||{
1:"left",
3:"right"
}[d]===s.labelAlign||"center"===s.labelAlign)&&He(l,function(t){
x=pe(h[t].getLabelSize(),x);
}),s.staggerLines&&(x*=s.staggerLines,s.labelOffset=x*(s.opposite?-1:1));else for(n in h)h[n].destroy(),
delete h[n];
m&&m.text&&m.enabled!==!1&&(s.axisTitle||(s.axisTitle=r.text(m.text,0,0,m.useHTML).attr({
zIndex:7,
rotation:m.rotation||0,
align:m.textAlign||{
low:v?"right":"left",
middle:"center",
high:v?"left":"right"
}[m.align]
}).addClass("highcharts-"+this.coll.toLowerCase()+"-title").css(m.style).add(s.axisGroup),
s.axisTitle.isNew=!0),e&&(g=s.axisTitle.getBBox()[c?"height":"width"],i=m.offset,
f=p(i)?0:Je(m.margin,c?5:10)),s.axisTitle[e?"show":"hide"](!0)),s.offset=k*Je(a.offset,b[d]),
s.tickRotCorr=s.tickRotCorr||{
x:0,
y:0
},r=2===d?s.tickRotCorr.y:0,c=Math.abs(x)+f+(x&&k*(c?Je(y.y,s.tickRotCorr.y+8):y.x)-r),
s.axisTitleMargin=Je(i,c),b[d]=pe(b[d],s.axisTitleMargin+g+k*s.offset,c),a=a.offset?0:2*ce(a.lineWidth/2),
o[u]=pe(o[u],a);
},
getLinePath:function(t){
var e=this.chart,i=this.opposite,n=this.offset,s=this.horiz,o=this.left+(i?this.width:0)+n,n=e.chartHeight-this.bottom-(i?this.height:0)+n;
return i&&(t*=-1),e.renderer.crispLine(["M",s?this.left:o,s?n:this.top,"L",s?e.chartWidth-this.right:o,s?n:e.chartHeight-this.bottom],t);
},
getTitlePosition:function(){
var t=this.horiz,e=this.left,i=this.top,n=this.len,o=this.options.title,r=t?e:i,a=this.opposite,l=this.offset,h=o.x||0,c=o.y||0,d=s(o.style.fontSize||12),n={
low:r+(t?0:n),
middle:r+n/2,
high:r+(t?n:0)
}[o.align],e=(t?i+this.height:e)+(t?1:-1)*(a?-1:1)*this.axisTitleMargin+(2===this.side?d:0);
return{
x:t?n+h:e+(a?this.width:0)+l+h,
y:t?e+c-(a?this.height:0)+l:n+c
};
},
render:function(){
var t,e,i,n=this,s=n.chart,o=s.renderer,r=n.options,a=n.isLog,l=n.isLinked,h=n.tickPositions,d=n.axisTitle,u=n.ticks,g=n.minorTicks,m=n.alternateBands,y=r.stackLabels,x=r.alternateGridColor,v=n.tickmarkOffset,b=r.lineWidth,k=s.hasRendered&&p(n.oldMin)&&!isNaN(n.oldMin),w=n.showAxis,A=o.globalAnimation;
n.labelEdge.length=0,n.overlap=!1,He([u,g,m],function(t){
for(var e in t)t[e].isActive=!1;
}),(n.hasData()||l)&&(n.minorTickInterval&&!n.categories&&He(n.getMinorTickPositions(),function(t){
g[t]||(g[t]=new R(n,t,"minor")),k&&g[t].isNew&&g[t].render(null,!0),g[t].render(null,!1,1);
}),h.length&&(He(h,function(t,e){
(!l||t>=n.min&&t<=n.max)&&(u[t]||(u[t]=new R(n,t)),k&&u[t].isNew&&u[t].render(e,!0,.1),
u[t].render(e));
}),v&&(0===n.min||n.single))&&(u[-1]||(u[-1]=new R(n,-1,null,!0)),u[-1].render(-1)),
x&&He(h,function(t,o){
i=h[o+1]!==X?h[o+1]+v:n.max-v,o%2===0&&t<n.max&&i<=n.max+(s.polar?-v:v)&&(m[t]||(m[t]=new re.PlotLineOrBand(n)),
e=t+v,m[t].options={
from:a?c(e):e,
to:a?c(i):i,
color:x
},m[t].render(),m[t].isActive=!0);
}),n._addedPlotLB||(He((r.plotLines||[]).concat(r.plotBands||[]),function(t){
n.addPlotBandOrLine(t);
}),n._addedPlotLB=!0)),He([u,g,m],function(t){
var e,i,n=[],o=A?A.duration||500:0;
for(e in t)t[e].isActive||(t[e].render(e,!1,0),t[e].isActive=!1,n.push(e));
f(function(){
for(i=n.length;i--;)t[n[i]]&&!t[n[i]].isActive&&(t[n[i]].destroy(),delete t[n[i]]);
},t!==m&&s.hasRendered&&o?o:0);
}),b&&(t=n.getLinePath(b),n.axisLine?n.axisLine.animate({
d:t
}):n.axisLine=o.path(t).attr({
stroke:r.lineColor,
"stroke-width":b,
zIndex:7
}).add(n.axisGroup),n.axisLine[w?"show":"hide"](!0)),d&&w&&(d[d.isNew?"attr":"animate"](n.getTitlePosition()),
d.isNew=!1),y&&y.enabled&&n.renderStackTotals(),n.isDirty=!1;
},
redraw:function(){
this.visible&&(this.render(),He(this.plotLinesAndBands,function(t){
t.render();
})),He(this.series,function(t){
t.isDirty=!0;
});
},
destroy:function(t){
var e,i=this,n=i.stacks,s=i.plotLinesAndBands;
t||_e(i);
for(e in n)L(n[e]),n[e]=null;
for(He([i.ticks,i.minorTicks,i.alternateBands],function(t){
L(t);
}),t=s.length;t--;)s[t].destroy();
He("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","),function(t){
i[t]&&(i[t]=i[t].destroy());
}),this.cross&&this.cross.destroy();
},
drawCrosshair:function(t,e){
var i,n,s,o=this.crosshair;
!this.crosshair||(p(e)||!Je(o.snap,!0))===!1||e&&e.series&&e.series[this.coll]!==this?this.hideCrosshair():(Je(o.snap,!0)?p(e)&&(i=this.isXAxis?e.plotX:this.len-e.plotY):i=this.horiz?t.chartX-this.pos:this.len-t.chartY+this.pos,
i=this.isRadial?this.getPlotLinePath(this.isXAxis?e.x:Je(e.stackY,e.y))||null:this.getPlotLinePath(null,null,null,null,i)||null,
null===i?this.hideCrosshair():(n=this.categories&&!this.isRadial,s=Je(o.width,n?this.transA:1),
this.cross?this.cross.attr({
d:i,
visibility:"visible",
"stroke-width":s
}):(n={
"stroke-width":s,
stroke:o.color||(n?"rgba(155,200,255,0.2)":"#C0C0C0"),
zIndex:Je(o.zIndex,2)
},o.dashStyle&&(n.dashstyle=o.dashStyle),this.cross=this.chart.renderer.path(i).attr(n).add())));
},
hideCrosshair:function(){
this.cross&&this.cross.hide();
}
},$e(ri.prototype,{
getPlotBandPath:function(t,e){
var i=this.getPlotLinePath(e,null,null,!0),n=this.getPlotLinePath(t,null,null,!0);
return n&&i?(n.flat=n.toString()===i.toString(),n.push(i[4],i[5],i[1],i[2])):n=null,
n;
},
addPlotBand:function(t){
return this.addPlotBandOrLine(t,"plotBands");
},
addPlotLine:function(t){
return this.addPlotBandOrLine(t,"plotLines");
},
addPlotBandOrLine:function(t,e){
var i=new re.PlotLineOrBand(this,t).render(),n=this.userOptions;
return i&&(e&&(n[e]=n[e]||[],n[e].push(t)),this.plotLinesAndBands.push(i)),i;
},
removePlotBandOrLine:function(t){
for(var e=this.plotLinesAndBands,i=this.options,n=this.userOptions,s=e.length;s--;)e[s].id===t&&e[s].destroy();
He([i.plotLines||[],n.plotLines||[],i.plotBands||[],n.plotBands||[]],function(e){
for(s=e.length;s--;)e[s].id===t&&d(e,e[s]);
});
}
}),ri.prototype.getTimeTicks=function(t,e,i,n){
var s,o=[],r={},a=G.global.useUTC,l=new N(e-b(e)),h=t.unitRange,c=t.count;
if(p(e)){
l[Q](h>=F.second?0:c*ce(l.getMilliseconds()/c)),h>=F.second&&l[te](h>=F.minute?0:c*ce(l.getSeconds()/c)),
h>=F.minute&&l[ee](h>=F.hour?0:c*ce(l[U]()/c)),h>=F.hour&&l[ie](h>=F.day?0:c*ce(l[K]()/c)),
h>=F.day&&l[ne](h>=F.month?1:c*ce(l[q]()/c)),h>=F.month&&(l[se](h>=F.year?0:c*ce(l[$]()/c)),
s=l[J]()),h>=F.year&&(s-=s%c,l[oe](s)),h===F.week&&l[ne](l[q]()-l[Z]()+Je(n,1)),
e=1,(j||_)&&(l=l.getTime(),l=new N(l+b(l))),s=l[J]();
for(var n=l.getTime(),d=l[$](),u=l[q](),g=(F.day+(a?b(l):6e4*l.getTimezoneOffset()))%F.day;i>n;)o.push(n),
h===F.year?n=V(s+e*c,0):h===F.month?n=V(s,d+e*c):a||h!==F.day&&h!==F.week?n+=h*c:n=V(s,d,u+e*c*(h===F.day?1:7)),
e++;
o.push(n),He(Fe(o,function(t){
return h<=F.hour&&t%F.day===g;
}),function(t){
r[t]="day";
});
}
return o.info=$e(t,{
higherRanks:r,
totalRange:h*c
}),o;
},ri.prototype.normalizeTimeTickInterval=function(t,e){
var i,n=e||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]],s=n[n.length-1],o=F[s[0]],r=s[1];
for(i=0;i<n.length&&(s=n[i],o=F[s[0]],r=s[1],!(n[i+1]&&t<=(o*r[r.length-1]+F[n[i+1][0]])/2));i++);
return o===F.year&&5*o>t&&(r=[1,2,5]),n=A(t/o,r,"year"===s[0]?pe(w(t/o),1):1),{
unitRange:o,
count:n,
unitName:s[0]
};
},ri.prototype.getLogTickPositions=function(t,e,i,n){
var s=this.options,o=this.len,r=[];
if(n||(this._minorAutoInterval=null),t>=.5)t=he(t),r=this.getLinearTickPositions(t,e,i);else if(t>=.08)for(var a,l,d,p,u,o=ce(e),s=t>.3?[1,2,4]:t>.15?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];i+1>o&&!u;o++)for(l=s.length,
a=0;l>a&&!u;a++)d=h(c(o)*s[a]),d>e&&(!n||i>=p)&&p!==X&&r.push(p),p>i&&(u=!0),p=d;else e=c(e),
i=c(i),t=s[n?"minorTickInterval":"tickInterval"],t=Je("auto"===t?null:t,this._minorAutoInterval,(i-e)*(s.tickPixelInterval/(n?5:1))/((n?o/this.tickPositions.length:o)||1)),
t=A(t,null,w(t)),r=Ve(this.getLinearTickPositions(t,e,i),h),n||(this._minorAutoInterval=t/5);
return n||(this.tickInterval=t),r;
};
var ai=re.Tooltip=function(){
this.init.apply(this,arguments);
};
ai.prototype={
init:function(t,e){
var i=e.borderWidth,n=e.style,o=s(n.padding);
this.chart=t,this.options=e,this.crosshairs=[],this.now={
x:0,
y:0
},this.isHidden=!0,this.label=t.renderer.label("",0,0,e.shape||"callout",null,null,e.useHTML,null,"tooltip").attr({
padding:o,
fill:e.backgroundColor,
"stroke-width":i,
r:e.borderRadius,
zIndex:8
}).css(n).css({
padding:0
}).add().attr({
y:-9999
}),Ce||this.label.shadow(e.shadow),this.shared=e.shared;
},
destroy:function(){
this.label&&(this.label=this.label.destroy()),clearTimeout(this.hideTimer),clearTimeout(this.tooltipTimeout);
},
move:function(t,e,i,n){
var s=this,o=s.now,r=s.options.animation!==!1&&!s.isHidden&&(ge(t-o.x)>1||ge(e-o.y)>1),a=s.followPointer||s.len>1;
$e(o,{
x:r?(2*o.x+t)/3:t,
y:r?(o.y+e)/2:e,
anchorX:a?X:r?(2*o.anchorX+i)/3:i,
anchorY:a?X:r?(o.anchorY+n)/2:n
}),s.label.attr(o),r&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){
s&&s.move(t,e,i,n);
},32));
},
hide:function(t){
var e=this;
clearTimeout(this.hideTimer),t=Je(t,this.options.hideDelay,500),this.isHidden||(this.hideTimer=f(function(){
e.label[t?"fadeOut":"hide"](),e.isHidden=!0;
},t));
},
getAnchor:function(t,e){
var i,n,s,o=this.chart,r=o.inverted,a=o.plotTop,l=o.plotLeft,h=0,c=0,t=g(t);
return i=t[0].tooltipPos,this.followPointer&&e&&(e.chartX===X&&(e=o.pointer.normalize(e)),
i=[e.chartX-o.plotLeft,e.chartY-a]),i||(He(t,function(t){
n=t.series.yAxis,s=t.series.xAxis,h+=t.plotX+(!r&&s?s.left-l:0),c+=(t.plotLow?(t.plotLow+t.plotHigh)/2:t.plotY)+(!r&&n?n.top-a:0);
}),h/=t.length,c/=t.length,i=[r?o.plotWidth-c:h,this.shared&&!r&&t.length>1&&e?e.chartY-a:r?o.plotHeight-h:c]),
Ve(i,he);
},
getPosition:function(t,e,i){
var n,s=this.chart,o=this.distance,r={},a=i.h||0,l=["y",s.chartHeight,e,i.plotY+s.plotTop,s.plotTop,s.plotTop+s.plotHeight],h=["x",s.chartWidth,t,i.plotX+s.plotLeft,s.plotLeft,s.plotLeft+s.plotWidth],c=Je(i.ttBelow,s.inverted&&!i.negative||!s.inverted&&i.negative),d=function(t,e,i,n,s,l){
var h=n-o>i,d=e>n+o+i,p=n-o-i;
if(n+=o,c&&d)r[t]=n;else if(!c&&h)r[t]=p;else if(h)r[t]=ue(l-i,0>p-a?p:p-a);else{
if(!d)return!1;
r[t]=pe(s,n+a+i>e?n:n+a);
}
},p=function(t,e,i,n){
var s;
return o>n||n>e-o?s=!1:r[t]=i/2>n?1:n>e-i/2?e-i-2:n-i/2,s;
},u=function(t){
var e=l;
l=h,h=e,n=t;
},g=function(){
d.apply(0,l)!==!1?p.apply(0,h)===!1&&!n&&(u(!0),g()):n?r.x=r.y=0:(u(!0),g());
};
return(s.inverted||this.len>1)&&u(),g(),r;
},
defaultFormatter:function(t){
var e,i=this.points||g(this);
return e=[t.tooltipFooterHeaderFormatter(i[0])],e=e.concat(t.bodyFormatter(i)),e.push(t.tooltipFooterHeaderFormatter(i[0],!0)),
e.join("");
},
refresh:function(t,e){
var i,n,s,o,r=this.chart,a=this.label,l=this.options,h={},c=[];
o=l.formatter||this.defaultFormatter;
var d,h=r.hoverPoints,p=this.shared;
clearTimeout(this.hideTimer),this.followPointer=g(t)[0].series.tooltipOptions.followPointer,
s=this.getAnchor(t,e),i=s[0],n=s[1],!p||t.series&&t.series.noSharedTooltip?h=t.getLabelConfig():(r.hoverPoints=t,
h&&He(h,function(t){
t.setState();
}),He(t,function(t){
t.setState("hover"),c.push(t.getLabelConfig());
}),h={
x:t[0].category,
y:t[0].y
},h.points=c,this.len=c.length,t=t[0]),o=o.call(h,this),h=t.series,this.distance=Je(h.tooltipOptions.distance,16),
o===!1?this.hide():(this.isHidden&&(Ze(a),a.attr("opacity",1).show()),a.attr({
text:o
}),d=l.borderColor||t.color||h.color||"#606060",a.attr({
stroke:d
}),this.updatePosition({
plotX:i,
plotY:n,
negative:t.negative,
ttBelow:t.ttBelow,
h:s[2]||0
}),this.isHidden=!1),Ue(r,"tooltipRefresh",{
text:o,
x:i+r.plotLeft,
y:n+r.plotTop,
borderColor:d
});
},
updatePosition:function(t){
var e=this.chart,i=this.label,i=(this.options.positioner||this.getPosition).call(this,i.width,i.height,t);
this.move(he(i.x),he(i.y||0),t.plotX+e.plotLeft,t.plotY+e.plotTop);
},
getXDateFormat:function(t,e,i){
var n,s,o,e=e.dateTimeLabelFormats,r=i&&i.closestPointRange,a={
millisecond:15,
second:12,
minute:9,
hour:6,
day:3
},l="millisecond";
if(r){
o=H("%m-%d %H:%M:%S.%L",t.x);
for(s in F){
if(r===F.week&&+H("%w",t.x)===i.options.startOfWeek&&"00:00:00.000"===o.substr(6)){
s="week";
break;
}
if(F[s]>r){
s=l;
break;
}
if(a[s]&&o.substr(a[s])!=="01-01 00:00:00.000".substr(a[s]))break;
"week"!==s&&(l=s);
}
s&&(n=e[s]);
}else n=e.day;
return n||e.year;
},
tooltipFooterHeaderFormatter:function(t,e){
var i=e?"footer":"header",n=t.series,s=n.tooltipOptions,o=s.xDateFormat,r=n.xAxis,a=r&&"datetime"===r.options.type&&l(t.key),i=s[i+"Format"];
return a&&!o&&(o=this.getXDateFormat(t,s,r)),a&&o&&(i=i.replace("{point.key}","{point.key:"+o+"}")),
k(i,{
point:t,
series:n
});
},
bodyFormatter:function(t){
return Ve(t,function(t){
var e=t.series.tooltipOptions;
return(e.pointFormatter||t.point.tooltipFormatter).call(t.point,e.pointFormat);
});
}
};
var li;
E=ae&&ae.documentElement.ontouchstart!==X;
var hi=re.Pointer=function(t,e){
this.init(t,e);
};
if(hi.prototype={
init:function(t,e){
var i,n=e.chart,s=n.events,o=Ce?"":n.zoomType,n=t.inverted;
this.options=e,this.chart=t,this.zoomX=i=/x/.test(o),this.zoomY=o=/y/.test(o),this.zoomHor=i&&!n||o&&n,
this.zoomVert=o&&!n||i&&n,this.hasZoom=i||o,this.runChartClick=s&&!!s.click,this.pinchDown=[],
this.lastValidTouch={},re.Tooltip&&e.tooltip.enabled&&(t.tooltip=new ai(t,e.tooltip),
this.followTouchMove=Je(e.tooltip.followTouchMove,!0)),this.setDOMEvents();
},
normalize:function(e,i){
var n,s,e=e||t.event;
return e.target||(e.target=e.srcElement),s=e.touches?e.touches.length?e.touches.item(0):e.changedTouches[0]:e,
i||(this.chartPosition=i=Ne(this.chart.container)),s.pageX===X?(n=pe(e.x,e.clientX-i.left),
s=e.y):(n=s.pageX-i.left,s=s.pageY-i.top),$e(e,{
chartX:he(n),
chartY:he(s)
});
},
getCoordinates:function(t){
var e={
xAxis:[],
yAxis:[]
};
return He(this.chart.axes,function(i){
e[i.isXAxis?"xAxis":"yAxis"].push({
axis:i,
value:i.toValue(t[i.horiz?"chartX":"chartY"])
});
}),e;
},
runPointActions:function(t){
var e,i,n,s,o,r,a=this.chart,l=a.series,h=a.tooltip,c=h?h.shared:!1,d=a.hoverPoint,p=a.hoverSeries,u=Number.MAX_VALUE,g=[];
if(!c&&!p)for(e=0;e<l.length;e++)(l[e].directTouch||!l[e].options.stickyTracking)&&(l=[]);
if(p&&(c?p.noSharedTooltip:p.directTouch)&&d?o=d:(He(l,function(e){
i=e.noSharedTooltip&&c,n=!c&&e.directTouch,e.visible&&!i&&!n&&Je(e.options.enableMouseTracking,!0)&&(r=e.searchPoint(t,!i&&1===e.kdDimensions))&&g.push(r);
}),He(g,function(t){
s=c||1!==t.series.kdDimensions?t.distX:t.dist,t&&"number"==typeof s&&u>s&&(u=s,o=t);
})),o&&(o!==this.prevKDPoint||h&&h.isHidden)){
if(c&&!o.series.noSharedTooltip){
for(e=g.length;e--;)(g[e].clientX!==o.clientX||g[e].series.noSharedTooltip)&&g.splice(e,1);
g.length&&h&&h.refresh(g,t),He(g,function(e){
e.onMouseOver(t,e!==(p&&p.directTouch&&d||o));
});
}else h&&h.refresh(o,t),p&&p.directTouch||o.onMouseOver(t);
this.prevKDPoint=o;
}else l=p&&p.tooltipOptions.followPointer,h&&l&&!h.isHidden&&(l=h.getAnchor([{}],t),
h.updatePosition({
plotX:l[0],
plotY:l[1]
}));
this._onDocumentMouseMove||(this._onDocumentMouseMove=function(t){
De[li]&&De[li].pointer.onDocumentMouseMove(t);
},je(ae,"mousemove",this._onDocumentMouseMove)),He(a.axes,function(e){
e.drawCrosshair(t,Je(o,d));
});
},
reset:function(t,e){
var i=this.chart,n=i.hoverSeries,s=i.hoverPoint,o=i.hoverPoints,r=i.tooltip,a=r&&r.shared?o:s;
(t=t&&r&&a)&&He(g(a),function(e){
void 0===e.plotX&&(t=!1);
}),t?(r.refresh(a),s&&(s.setState(s.state,!0),He(i.axes,function(t){
Je(t.options.crosshair&&t.options.crosshair.snap,!0)?t.drawCrosshair(null,s):t.hideCrosshair();
}))):(s&&s.onMouseOut(),o&&He(o,function(t){
t.setState();
}),n&&n.onMouseOut(),r&&r.hide(e),this._onDocumentMouseMove&&(_e(ae,"mousemove",this._onDocumentMouseMove),
this._onDocumentMouseMove=null),He(i.axes,function(t){
t.hideCrosshair();
}),this.hoverX=i.hoverPoints=i.hoverPoint=null);
},
scaleGroups:function(t,e){
var i,n=this.chart;
He(n.series,function(s){
i=t||s.getPlotBox(),s.xAxis&&s.xAxis.zoomEnabled&&(s.group.attr(i),s.markerGroup&&(s.markerGroup.attr(i),
s.markerGroup.clip(e?n.clipRect:null)),s.dataLabelsGroup&&s.dataLabelsGroup.attr(i));
}),n.clipRect.attr(e||n.clipBox);
},
dragStart:function(t){
var e=this.chart;
e.mouseIsDown=t.type,e.cancelClick=!1,e.mouseDownX=this.mouseDownX=t.chartX,e.mouseDownY=this.mouseDownY=t.chartY;
},
drag:function(t){
var e,i=this.chart,n=i.options.chart,s=t.chartX,o=t.chartY,r=this.zoomHor,a=this.zoomVert,l=i.plotLeft,h=i.plotTop,c=i.plotWidth,d=i.plotHeight,p=this.selectionMarker,u=this.mouseDownX,g=this.mouseDownY,f=n.panKey&&t[n.panKey+"Key"];
p&&p.touch||(l>s?s=l:s>l+c&&(s=l+c),h>o?o=h:o>h+d&&(o=h+d),this.hasDragged=Math.sqrt(Math.pow(u-s,2)+Math.pow(g-o,2)),
this.hasDragged>10&&(e=i.isInsidePlot(u-l,g-h),i.hasCartesianSeries&&(this.zoomX||this.zoomY)&&e&&!f&&!p&&(this.selectionMarker=p=i.renderer.rect(l,h,r?1:c,a?1:d,0).attr({
fill:n.selectionMarkerFill||"rgba(69,114,167,0.25)",
zIndex:7
}).add()),p&&r&&(s-=u,p.attr({
width:ge(s),
x:(s>0?0:s)+u
})),p&&a&&(s=o-g,p.attr({
height:ge(s),
y:(s>0?0:s)+g
})),e&&!p&&n.panning&&i.pan(t,n.panning)));
},
drop:function(t){
var e=this,i=this.chart,n=this.hasPinched;
if(this.selectionMarker){
var s,o={
xAxis:[],
yAxis:[]
},r=this.selectionMarker,a=r.attr?r.attr("x"):r.x,l=r.attr?r.attr("y"):r.y,h=r.attr?r.attr("width"):r.width,c=r.attr?r.attr("height"):r.height;
(this.hasDragged||n)&&(He(i.axes,function(i){
if(i.zoomEnabled&&p(i.min)&&(n||e[{
xAxis:"zoomX",
yAxis:"zoomY"
}[i.coll]])){
var r=i.horiz,d="touchend"===t.type?i.minPixelPadding:0,u=i.toValue((r?a:l)+d),r=i.toValue((r?a+h:l+c)-d);
o[i.coll].push({
axis:i,
min:ue(u,r),
max:pe(u,r)
}),s=!0;
}
}),s&&Ue(i,"selection",o,function(t){
i.zoom($e(t,n?{
animation:!1
}:null));
})),this.selectionMarker=this.selectionMarker.destroy(),n&&this.scaleGroups();
}
i&&(m(i.container,{
cursor:i._cursor
}),i.cancelClick=this.hasDragged>10,i.mouseIsDown=this.hasDragged=this.hasPinched=!1,
this.pinchDown=[]);
},
onContainerMouseDown:function(t){
t=this.normalize(t),t.preventDefault&&t.preventDefault(),this.dragStart(t);
},
onDocumentMouseUp:function(t){
De[li]&&De[li].pointer.drop(t);
},
onDocumentMouseMove:function(t){
var e=this.chart,i=this.chartPosition,t=this.normalize(t,i);
i&&!this.inClass(t.target,"highcharts-tracker")&&!e.isInsidePlot(t.chartX-e.plotLeft,t.chartY-e.plotTop)&&this.reset();
},
onContainerMouseLeave:function(){
var t=De[li];
t&&(t.pointer.reset(),t.pointer.chartPosition=null);
},
onContainerMouseMove:function(t){
var e=this.chart;
li=e.index,t=this.normalize(t),t.returnValue=!1,"mousedown"===e.mouseIsDown&&this.drag(t),
(this.inClass(t.target,"highcharts-tracker")||e.isInsidePlot(t.chartX-e.plotLeft,t.chartY-e.plotTop))&&!e.openMenu&&this.runPointActions(t);
},
inClass:function(t,e){
for(var i;t;){
if(i=u(t,"class")){
if(-1!==i.indexOf(e))return!0;
if(-1!==i.indexOf("highcharts-container"))return!1;
}
t=t.parentNode;
}
},
onTrackerMouseOut:function(t){
var e=this.chart.hoverSeries,t=t.relatedTarget||t.toElement;
!e||e.options.stickyTracking||this.inClass(t,"highcharts-tooltip")||this.inClass(t,"highcharts-series-"+e.index)||e.onMouseOut();
},
onContainerClick:function(t){
var e=this.chart,i=e.hoverPoint,n=e.plotLeft,s=e.plotTop,t=this.normalize(t);
e.cancelClick||(i&&this.inClass(t.target,"highcharts-tracker")?(Ue(i.series,"click",$e(t,{
point:i
})),e.hoverPoint&&i.firePointEvent("click",t)):($e(t,this.getCoordinates(t)),e.isInsidePlot(t.chartX-n,t.chartY-s)&&Ue(e,"click",t)));
},
setDOMEvents:function(){
var t=this,e=t.chart.container;
e.onmousedown=function(e){
t.onContainerMouseDown(e);
},e.onmousemove=function(e){
t.onContainerMouseMove(e);
},e.onclick=function(e){
t.onContainerClick(e);
},je(e,"mouseleave",t.onContainerMouseLeave),1===Re&&je(ae,"mouseup",t.onDocumentMouseUp),
E&&(e.ontouchstart=function(e){
t.onContainerTouchStart(e);
},e.ontouchmove=function(e){
t.onContainerTouchMove(e);
},1===Re&&je(ae,"touchend",t.onDocumentTouchEnd));
},
destroy:function(){
var t;
_e(this.chart.container,"mouseleave",this.onContainerMouseLeave),Re||(_e(ae,"mouseup",this.onDocumentMouseUp),
_e(ae,"touchend",this.onDocumentTouchEnd)),clearInterval(this.tooltipTimeout);
for(t in this)this[t]=null;
}
},$e(re.Pointer.prototype,{
pinchTranslate:function(t,e,i,n,s,o){
(this.zoomHor||this.pinchHor)&&this.pinchTranslateDirection(!0,t,e,i,n,s,o),(this.zoomVert||this.pinchVert)&&this.pinchTranslateDirection(!1,t,e,i,n,s,o);
},
pinchTranslateDirection:function(t,e,i,n,s,o,r,a){
var l,h,c,d=this.chart,p=t?"x":"y",u=t?"X":"Y",g="chart"+u,f=t?"width":"height",m=d["plot"+(t?"Left":"Top")],y=a||1,x=d.inverted,v=d.bounds[t?"h":"v"],b=1===e.length,k=e[0][g],w=i[0][g],A=!b&&e[1][g],S=!b&&i[1][g],i=function(){
!b&&ge(k-A)>20&&(y=a||ge(w-S)/ge(k-A)),h=(m-w)/y+k,l=d["plot"+(t?"Width":"Height")]/y;
};
i(),e=h,e<v.min?(e=v.min,c=!0):e+l>v.max&&(e=v.max-l,c=!0),c?(w-=.8*(w-r[p][0]),
b||(S-=.8*(S-r[p][1])),i()):r[p]=[w,S],x||(o[p]=h-m,o[f]=l),o=x?1/y:y,s[f]=l,s[p]=e,
n[x?t?"scaleY":"scaleX":"scale"+u]=y,n["translate"+u]=o*m+(w-o*k);
},
pinch:function(t){
var e=this,i=e.chart,n=e.pinchDown,s=t.touches,o=s.length,r=e.lastValidTouch,a=e.hasZoom,l=e.selectionMarker,h={},c=1===o&&(e.inClass(t.target,"highcharts-tracker")&&i.runTrackerClick||e.runChartClick),d={};
o>1&&(e.initiated=!0),a&&e.initiated&&!c&&t.preventDefault(),Ve(s,function(t){
return e.normalize(t);
}),"touchstart"===t.type?(He(s,function(t,e){
n[e]={
chartX:t.chartX,
chartY:t.chartY
};
}),r.x=[n[0].chartX,n[1]&&n[1].chartX],r.y=[n[0].chartY,n[1]&&n[1].chartY],He(i.axes,function(t){
if(t.zoomEnabled){
var e=i.bounds[t.horiz?"h":"v"],n=t.minPixelPadding,s=t.toPixels(Je(t.options.min,t.dataMin)),o=t.toPixels(Je(t.options.max,t.dataMax)),r=ue(s,o),s=pe(s,o);
e.min=ue(t.pos,r-n),e.max=pe(t.pos+t.len,s+n);
}
}),e.res=!0):n.length&&(l||(e.selectionMarker=l=$e({
destroy:ze,
touch:!0
},i.plotBox)),e.pinchTranslate(n,s,h,l,d,r),e.hasPinched=a,e.scaleGroups(h,d),!a&&e.followTouchMove&&1===o?this.runPointActions(e.normalize(t)):e.res&&(e.res=!1,
this.reset(!1,0)));
},
touch:function(t,e){
var i=this.chart;
li=i.index,1===t.touches.length?(t=this.normalize(t),i.isInsidePlot(t.chartX-i.plotLeft,t.chartY-i.plotTop)&&!i.openMenu?(e&&this.runPointActions(t),
this.pinch(t)):e&&this.reset()):2===t.touches.length&&this.pinch(t);
},
onContainerTouchStart:function(t){
this.touch(t,!0);
},
onContainerTouchMove:function(t){
this.touch(t);
},
onDocumentTouchEnd:function(t){
De[li]&&De[li].pointer.drop(t);
}
}),t.PointerEvent||t.MSPointerEvent){
var ci={},di=!!t.PointerEvent,pi=function(){
var t,e=[];
e.item=function(t){
return this[t];
};
for(t in ci)ci.hasOwnProperty(t)&&e.push({
pageX:ci[t].pageX,
pageY:ci[t].pageY,
target:ci[t].target
});
return e;
},ui=function(t,e,i,n){
"touch"!==t.pointerType&&t.pointerType!==t.MSPOINTER_TYPE_TOUCH||!De[li]||(n(t),
n=De[li].pointer,n[e]({
type:i,
target:t.currentTarget,
preventDefault:ze,
touches:pi()
}));
};
$e(hi.prototype,{
onContainerPointerDown:function(t){
ui(t,"onContainerTouchStart","touchstart",function(t){
ci[t.pointerId]={
pageX:t.pageX,
pageY:t.pageY,
target:t.currentTarget
};
});
},
onContainerPointerMove:function(t){
ui(t,"onContainerTouchMove","touchmove",function(t){
ci[t.pointerId]={
pageX:t.pageX,
pageY:t.pageY
},ci[t.pointerId].target||(ci[t.pointerId].target=t.currentTarget);
});
},
onDocumentPointerUp:function(t){
ui(t,"onDocumentTouchEnd","touchend",function(t){
delete ci[t.pointerId];
});
},
batchMSEvents:function(t){
t(this.chart.container,di?"pointerdown":"MSPointerDown",this.onContainerPointerDown),
t(this.chart.container,di?"pointermove":"MSPointerMove",this.onContainerPointerMove),
t(ae,di?"pointerup":"MSPointerUp",this.onDocumentPointerUp);
}
}),Qe(hi.prototype,"init",function(t,e,i){
t.call(this,e,i),this.hasZoom&&m(e.container,{
"-ms-touch-action":"none",
"touch-action":"none"
});
}),Qe(hi.prototype,"setDOMEvents",function(t){
t.apply(this),(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(je);
}),Qe(hi.prototype,"destroy",function(t){
this.batchMSEvents(_e),t.call(this);
});
}
var gi=re.Legend=function(t,e){
this.init(t,e);
};
gi.prototype={
init:function(t,e){
var i=this,s=e.itemStyle,o=e.itemMarginTop||0;
this.options=e,e.enabled&&(i.itemStyle=s,i.itemHiddenStyle=n(s,e.itemHiddenStyle),
i.itemMarginTop=o,i.padding=s=Je(e.padding,8),i.initialItemX=s,i.initialItemY=s-5,
i.maxItemWidth=0,i.chart=t,i.itemHeight=0,i.symbolWidth=Je(e.symbolWidth,16),i.pages=[],
i.render(),je(i.chart,"endResize",function(){
i.positionCheckboxes();
}));
},
colorizeItem:function(t,e){
var i,n=this.options,s=t.legendItem,o=t.legendLine,r=t.legendSymbol,a=this.itemHiddenStyle.color,n=e?n.itemStyle.color:a,l=e?t.legendColor||t.color||"#CCC":a,a=t.options&&t.options.marker,h={
fill:l
};
if(s&&s.css({
fill:n,
color:n
}),o&&o.attr({
stroke:l
}),r){
if(a&&r.isMarker)for(i in h.stroke=l,a=t.convertAttribs(a))s=a[i],s!==X&&(h[i]=s);
r.attr(h);
}
},
positionItem:function(t){
var e=this.options,i=e.symbolPadding,e=!e.rtl,n=t._legendItemPos,s=n[0],n=n[1],o=t.checkbox;
(t=t.legendGroup)&&t.element&&t.translate(e?s:this.legendWidth-s-2*i-4,n),o&&(o.x=s,
o.y=n);
},
destroyItem:function(t){
var e=t.checkbox;
He(["legendItem","legendLine","legendSymbol","legendGroup"],function(e){
t[e]&&(t[e]=t[e].destroy());
}),e&&M(t.checkbox);
},
destroy:function(){
var t=this.group,e=this.box;
e&&(this.box=e.destroy()),t&&(this.group=t.destroy());
},
positionCheckboxes:function(t){
var e,i=this.group.alignAttr,n=this.clipHeight||this.legendHeight,s=this.titleHeight;
i&&(e=i.translateY,He(this.allItems,function(o){
var r,a=o.checkbox;
a&&(r=e+s+a.y+(t||0)+3,m(a,{
left:i.translateX+o.checkboxOffset+a.x-20+"px",
top:r+"px",
display:r>e-6&&e+n-6>r?"":"none"
}));
}));
},
renderTitle:function(){
var t=this.padding,e=this.options.title,i=0;
e.text&&(this.title||(this.title=this.chart.renderer.label(e.text,t-3,t-4,null,null,null,null,null,"legend-title").attr({
zIndex:1
}).css(e.style).add(this.group)),t=this.title.getBBox(),i=t.height,this.offsetWidth=t.width,
this.contentGroup.attr({
translateY:i
})),this.titleHeight=i;
},
setText:function(t){
var e=this.options;
t.legendItem.attr({
text:e.labelFormat?k(e.labelFormat,t):e.labelFormatter.call(t)
});
},
renderItem:function(t){
var e=this.chart,i=e.renderer,s=this.options,o="horizontal"===s.layout,r=this.symbolWidth,a=s.symbolPadding,l=this.itemStyle,h=this.itemHiddenStyle,c=this.padding,d=o?Je(s.itemDistance,20):0,p=!s.rtl,u=s.width,g=s.itemMarginBottom||0,f=this.itemMarginTop,m=this.initialItemX,y=t.legendItem,x=t.series&&t.series.drawLegendSymbol?t.series:t,v=x.options,v=this.createCheckboxForItem&&v&&v.showCheckbox,b=s.useHTML;
y||(t.legendGroup=i.g("legend-item").attr({
zIndex:1
}).add(this.scrollGroup),t.legendItem=y=i.text("",p?r+a:-a,this.baseline||0,b).css(n(t.visible?l:h)).attr({
align:p?"left":"right",
zIndex:2
}).add(t.legendGroup),this.baseline||(this.fontMetrics=i.fontMetrics(l.fontSize,y),
this.baseline=this.fontMetrics.f+3+f,y.attr("y",this.baseline)),x.drawLegendSymbol(this,t),
this.setItemEvents&&this.setItemEvents(t,y,b,l,h),this.colorizeItem(t,t.visible),
v&&this.createCheckboxForItem(t)),this.setText(t),i=y.getBBox(),r=t.checkboxOffset=s.itemWidth||t.legendItemWidth||r+a+i.width+d+(v?20:0),
this.itemHeight=a=he(t.legendItemHeight||i.height),o&&this.itemX-m+r>(u||e.chartWidth-2*c-m-s.x)&&(this.itemX=m,
this.itemY+=f+this.lastLineHeight+g,this.lastLineHeight=0),this.maxItemWidth=pe(this.maxItemWidth,r),
this.lastItemY=f+this.itemY+g,this.lastLineHeight=pe(a,this.lastLineHeight),t._legendItemPos=[this.itemX,this.itemY],
o?this.itemX+=r:(this.itemY+=f+a+g,this.lastLineHeight=a),this.offsetWidth=u||pe((o?this.itemX-m-d:r)+c,this.offsetWidth);
},
getAllItems:function(){
var t=[];
return He(this.chart.series,function(e){
var i=e.options;
Je(i.showInLegend,p(i.linkedTo)?!1:X,!0)&&(t=t.concat(e.legendItems||("point"===i.legendType?e.data:e)));
}),t;
},
adjustMargins:function(t,e){
var i=this.chart,n=this.options,s=n.align.charAt(0)+n.verticalAlign.charAt(0)+n.layout.charAt(0);
this.display&&!n.floating&&He([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(o,r){
o.test(s)&&!p(t[r])&&(i[Ye[r]]=pe(i[Ye[r]],i.legend[(r+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][r]*n[r%2?"x":"y"]+Je(n.margin,12)+e[r]));
});
},
render:function(){
var t,e,i,n,s=this,o=s.chart,r=o.renderer,a=s.group,l=s.box,h=s.options,c=s.padding,d=h.borderWidth,p=h.backgroundColor;
s.itemX=s.initialItemX,s.itemY=s.initialItemY,s.offsetWidth=0,s.lastItemY=0,a||(s.group=a=r.g("legend").attr({
zIndex:7
}).add(),s.contentGroup=r.g().attr({
zIndex:1
}).add(a),s.scrollGroup=r.g().add(s.contentGroup)),s.renderTitle(),t=s.getAllItems(),
S(t,function(t,e){
return(t.options&&t.options.legendIndex||0)-(e.options&&e.options.legendIndex||0);
}),h.reversed&&t.reverse(),s.allItems=t,s.display=e=!!t.length,s.lastLineHeight=0,
He(t,function(t){
s.renderItem(t);
}),i=(h.width||s.offsetWidth)+c,n=s.lastItemY+s.lastLineHeight+s.titleHeight,n=s.handleOverflow(n),
n+=c,(d||p)&&(l?i>0&&n>0&&(l[l.isNew?"attr":"animate"](l.crisp({
width:i,
height:n
})),l.isNew=!1):(s.box=l=r.rect(0,0,i,n,h.borderRadius,d||0).attr({
stroke:h.borderColor,
"stroke-width":d||0,
fill:p||"none"
}).add(a).shadow(h.shadow),l.isNew=!0),l[e?"show":"hide"]()),s.legendWidth=i,s.legendHeight=n,
He(t,function(t){
s.positionItem(t);
}),e&&a.align($e({
width:i,
height:n
},h),!0,"spacingBox"),o.isResizing||this.positionCheckboxes();
},
handleOverflow:function(t){
var e,i,n=this,s=this.chart,o=s.renderer,r=this.options,a=r.y,a=s.spacingBox.height+("top"===r.verticalAlign?-a:a)-this.padding,l=r.maxHeight,h=this.clipRect,c=r.navigation,d=Je(c.animation,!0),p=c.arrowSize||12,u=this.nav,g=this.pages,f=this.padding,m=this.allItems,y=function(t){
h.attr({
height:t
}),n.contentGroup.div&&(n.contentGroup.div.style.clip="rect("+f+"px,9999px,"+(f+t)+"px,0)");
};
return"horizontal"===r.layout&&(a/=2),l&&(a=ue(a,l)),g.length=0,t>a?(this.clipHeight=e=pe(a-20-this.titleHeight-f,0),
this.currentPage=Je(this.currentPage,1),this.fullHeight=t,He(m,function(t,n){
var s=t._legendItemPos[1],o=he(t.legendItem.getBBox().height),r=g.length;
(!r||s-g[r-1]>e&&(i||s)!==g[r-1])&&(g.push(i||s),r++),n===m.length-1&&s+o-g[r-1]>e&&g.push(s),
s!==i&&(i=s);
}),h||(h=n.clipRect=o.clipRect(0,f,9999,0),n.contentGroup.clip(h)),y(e),u||(this.nav=u=o.g().attr({
zIndex:1
}).add(this.group),this.up=o.symbol("triangle",0,0,p,p).on("click",function(){
n.scroll(-1,d);
}).add(u),this.pager=o.text("",15,10).css(c.style).add(u),this.down=o.symbol("triangle-down",0,0,p,p).on("click",function(){
n.scroll(1,d);
}).add(u)),n.scroll(0),t=a):u&&(y(s.chartHeight),u.hide(),this.scrollGroup.attr({
translateY:1
}),this.clipHeight=0),t;
},
scroll:function(t,e){
var i=this.pages,n=i.length,s=this.currentPage+t,o=this.clipHeight,r=this.options.navigation,a=r.activeColor,r=r.inactiveColor,l=this.pager,h=this.padding;
s>n&&(s=n),s>0&&(e!==X&&I(e,this.chart),this.nav.attr({
translateX:h,
translateY:o+this.padding+7+this.titleHeight,
visibility:"visible"
}),this.up.attr({
fill:1===s?r:a
}).css({
cursor:1===s?"default":"pointer"
}),l.attr({
text:s+"/"+n
}),this.down.attr({
x:18+this.pager.getBBox().width,
fill:s===n?r:a
}).css({
cursor:s===n?"default":"pointer"
}),i=-i[s-1]+this.initialItemY,this.scrollGroup.animate({
translateY:i
}),this.currentPage=s,this.positionCheckboxes(i));
}
},ni=re.LegendSymbolMixin={
drawRectangle:function(t,e){
var i=t.options.symbolHeight||t.fontMetrics.f;
e.legendSymbol=this.chart.renderer.rect(0,t.baseline-i+1,t.symbolWidth,i,t.options.symbolRadius||0).attr({
zIndex:3
}).add(e.legendGroup);
},
drawLineMarker:function(t){
var e,i=this.options,n=i.marker,s=t.symbolWidth,o=this.chart.renderer,r=this.legendGroup,t=t.baseline-he(.3*t.fontMetrics.b);
i.lineWidth&&(e={
"stroke-width":i.lineWidth
},i.dashStyle&&(e.dashstyle=i.dashStyle),this.legendLine=o.path(["M",0,t,"L",s,t]).attr(e).add(r)),
n&&n.enabled!==!1&&(i=n.radius,this.legendSymbol=n=o.symbol(this.symbol,s/2-i,t-i,2*i,2*i,n).add(r),
n.isMarker=!0);
}
},(/Trident\/7\.0/.test(ve)||Se)&&Qe(gi.prototype,"positionItem",function(t,e){
var i=this,n=function(){
e._legendItemPos&&t.call(i,e);
};
n(),setTimeout(n);
});
var fi=re.Chart=function(){
this.getArgs.apply(this,arguments);
};
re.chart=function(t,e,i){
return new fi(t,e,i);
},fi.prototype={
callbacks:[],
getArgs:function(){
var t=[].slice.call(arguments);
(o(t[0])||t[0].nodeName)&&(this.renderTo=t.shift()),this.init(t[0],t[1]);
},
init:function(t,e){
var i,s=t.series;
t.series=null,i=n(G,t),i.series=t.series=s,this.userOptions=t,s=i.chart,this.margin=this.splashArray("margin",s),
this.spacing=this.splashArray("spacing",s);
var o=s.events;
this.bounds={
h:{},
v:{}
},this.callback=e,this.isResizing=0,this.options=i,this.axes=[],this.series=[],this.hasCartesianSeries=s.showAxes;
var r,a=this;
if(a.index=De.length,De.push(a),Re++,s.reflow!==!1&&je(a,"load",function(){
a.initReflow();
}),o)for(r in o)je(a,r,o[r]);
a.xAxis=[],a.yAxis=[],a.animation=Ce?!1:Je(s.animation,!0),a.pointCount=a.colorCounter=a.symbolCounter=0,
a.firstRender();
},
initSeries:function(t){
var i=this.options.chart;
return(i=Ee[t.type||i.type||i.defaultSeriesType])||e(17,!0),i=new i,i.init(this,t),
i;
},
isInsidePlot:function(t,e,i){
var n=i?e:t,t=i?t:e;
return n>=0&&n<=this.plotWidth&&t>=0&&t<=this.plotHeight;
},
redraw:function(t){
var e,i,n=this.axes,s=this.series,o=this.pointer,r=this.legend,a=this.isDirtyLegend,l=this.hasCartesianSeries,h=this.isDirtyBox,c=s.length,d=c,p=this.renderer,u=p.isHidden(),g=[];
for(I(t,this),u&&this.cloneRenderTo(),this.layOutTitles();d--;)if(t=s[d],t.options.stacking&&(e=!0,
t.isDirty)){
i=!0;
break;
}
if(i)for(d=c;d--;)t=s[d],t.options.stacking&&(t.isDirty=!0);
He(s,function(t){
t.isDirty&&"point"===t.options.legendType&&(t.updateTotals&&t.updateTotals(),a=!0);
}),a&&r.options.enabled&&(r.render(),this.isDirtyLegend=!1),e&&this.getStacks(),
l&&!this.isResizing&&(this.maxTicks=null,He(n,function(t){
t.setScale();
})),this.getMargins(),l&&(He(n,function(t){
t.isDirty&&(h=!0);
}),He(n,function(t){
var i=t.min+","+t.max;
t.extKey!==i&&(t.extKey=i,g.push(function(){
Ue(t,"afterSetExtremes",$e(t.eventArgs,t.getExtremes())),delete t.eventArgs;
})),(h||e)&&t.redraw();
})),h&&this.drawChartBox(),He(s,function(t){
t.isDirty&&t.visible&&(!t.isCartesian||t.xAxis)&&t.redraw();
}),o&&o.reset(!0),p.draw(),Ue(this,"redraw"),u&&this.cloneRenderTo(!0),He(g,function(t){
t.call();
});
},
get:function(t){
var e,i,n=this.axes,s=this.series;
for(e=0;e<n.length;e++)if(n[e].options.id===t)return n[e];
for(e=0;e<s.length;e++)if(s[e].options.id===t)return s[e];
for(e=0;e<s.length;e++)for(i=s[e].points||[],n=0;n<i.length;n++)if(i[n].id===t)return i[n];
return null;
},
getAxes:function(){
var t=this,e=this.options,i=e.xAxis=g(e.xAxis||{}),e=e.yAxis=g(e.yAxis||{});
He(i,function(t,e){
t.index=e,t.isX=!0;
}),He(e,function(t,e){
t.index=e;
}),i=i.concat(e),He(i,function(e){
new ri(t,e);
});
},
getSelectedPoints:function(){
var t=[];
return He(this.series,function(e){
t=t.concat(Fe(e.points||[],function(t){
return t.selected;
}));
}),t;
},
getSelectedSeries:function(){
return Fe(this.series,function(t){
return t.selected;
});
},
setTitle:function(t,e,i){
var s,o,r=this,a=r.options;
o=a.title=n(a.title,t),s=a.subtitle=n(a.subtitle,e),a=s,He([["title",t,o],["subtitle",e,a]],function(t){
var e=t[0],i=r[e],n=t[1],t=t[2];
i&&n&&(r[e]=i=i.destroy()),t&&t.text&&!i&&(r[e]=r.renderer.text(t.text,0,0,t.useHTML).attr({
align:t.align,
"class":"highcharts-"+e,
zIndex:t.zIndex||4
}).css(t.style).add());
}),r.layOutTitles(i);
},
layOutTitles:function(t){
var e=0,i=this.title,n=this.subtitle,s=this.options,o=s.title,s=s.subtitle,r=this.renderer,a=this.spacingBox.width-44;
!i||(i.css({
width:(o.width||a)+"px"
}).align($e({
y:r.fontMetrics(o.style.fontSize,i).b-3
},o),!1,"spacingBox"),o.floating||o.verticalAlign)||(e=i.getBBox().height),n&&(n.css({
width:(s.width||a)+"px"
}).align($e({
y:e+(o.margin-13)+r.fontMetrics(s.style.fontSize,i).b
},s),!1,"spacingBox"),!s.floating&&!s.verticalAlign&&(e=de(e+n.getBBox().height))),
i=this.titleOffset!==e,this.titleOffset=e,!this.isDirtyBox&&i&&(this.isDirtyBox=i,
this.hasRendered&&Je(t,!0)&&this.isDirtyBox&&this.redraw());
},
getChartSize:function(){
var t=this.options.chart,e=t.width,t=t.height,i=this.renderToClone||this.renderTo;
p(e)||(this.containerWidth=We(i,"width")),p(t)||(this.containerHeight=We(i,"height")),
this.chartWidth=pe(0,e||this.containerWidth||600),this.chartHeight=pe(0,Je(t,this.containerHeight>19?this.containerHeight:400));
},
cloneRenderTo:function(t){
var e=this.renderToClone,i=this.container;
t?e&&(this.renderTo.appendChild(i),M(e),delete this.renderToClone):(i&&i.parentNode===this.renderTo&&this.renderTo.removeChild(i),
this.renderToClone=e=this.renderTo.cloneNode(0),m(e,{
position:"absolute",
top:"-9999px",
display:"block"
}),e.style.setProperty&&e.style.setProperty("display","block","important"),ae.body.appendChild(e),
i&&e.appendChild(i));
},
getContainer:function(){
var t,i,n,r=this.options,a=r.chart;
t=this.renderTo;
var l="highcharts-"+Oe++;
t||(this.renderTo=t=a.renderTo),o(t)&&(this.renderTo=t=ae.getElementById(t)),t||e(13,!0),
i=s(u(t,"data-highcharts-chart")),!isNaN(i)&&De[i]&&De[i].hasRendered&&De[i].destroy(),
u(t,"data-highcharts-chart",this.index),t.innerHTML="",!a.skipClone&&!t.offsetWidth&&this.cloneRenderTo(),
this.getChartSize(),i=this.chartWidth,n=this.chartHeight,this.container=t=y(Be,{
className:"highcharts-container"+(a.className?" "+a.className:""),
id:l
},$e({
position:"relative",
overflow:"hidden",
width:i+"px",
height:n+"px",
textAlign:"left",
lineHeight:"normal",
zIndex:0,
"-webkit-tap-highlight-color":"rgba(0,0,0,0)"
},a.style),this.renderToClone||t),this._cursor=t.style.cursor,this.renderer=new(re[a.renderer]||Y)(t,i,n,a.style,a.forExport,r.exporting&&r.exporting.allowHTML),
Ce&&this.renderer.create(this,t,i,n),this.renderer.chartIndex=this.index;
},
getMargins:function(t){
var e=this.spacing,i=this.margin,n=this.titleOffset;
this.resetMargins(),n&&!p(i[0])&&(this.plotTop=pe(this.plotTop,n+this.options.title.margin+e[0])),
this.legend.adjustMargins(i,e),this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin),
this.extraTopMargin&&(this.plotTop+=this.extraTopMargin),t||this.getAxisMargins();
},
getAxisMargins:function(){
var t=this,e=t.axisOffset=[0,0,0,0],i=t.margin;
t.hasCartesianSeries&&He(t.axes,function(t){
t.visible&&t.getOffset();
}),He(Ye,function(n,s){
p(i[s])||(t[n]+=e[s]);
}),t.setChartSize();
},
reflow:function(e){
var i=this,n=i.options.chart,s=i.renderTo,o=n.width||We(s,"width"),r=n.height||We(s,"height"),n=e?e.target:t;
i.hasUserSize||i.isPrinting||!o||!r||n!==t&&n!==ae||((o!==i.containerWidth||r!==i.containerHeight)&&(clearTimeout(i.reflowTimeout),
i.reflowTimeout=f(function(){
i.container&&(i.setSize(o,r,!1),i.hasUserSize=null);
},e?100:0)),i.containerWidth=o,i.containerHeight=r);
},
initReflow:function(){
var e=this,i=function(t){
e.reflow(t);
};
je(t,"resize",i),je(e,"destroy",function(){
_e(t,"resize",i);
});
},
setSize:function(t,e,i){
var n,s,o=this,r=o.renderer;
o.isResizing+=1,I(i,o),o.oldChartHeight=o.chartHeight,o.oldChartWidth=o.chartWidth,
p(t)&&(o.chartWidth=n=pe(0,he(t)),o.hasUserSize=!!n),p(e)&&(o.chartHeight=s=pe(0,he(e))),
t=r.globalAnimation,(t?Ke:m)(o.container,{
width:n+"px",
height:s+"px"
},t),o.setChartSize(!0),r.setSize(n,s,i),o.maxTicks=null,He(o.axes,function(t){
t.isDirty=!0,t.setScale();
}),He(o.series,function(t){
t.isDirty=!0;
}),o.isDirtyLegend=!0,o.isDirtyBox=!0,o.layOutTitles(),o.getMargins(),o.redraw(i),
o.oldChartHeight=null,Ue(o,"resize"),t=r.globalAnimation,f(function(){
o&&Ue(o,"endResize",null,function(){
o.isResizing-=1;
});
},t===!1?0:t&&t.duration||500);
},
setChartSize:function(t){
var e,i,n,s,o=this.inverted,r=this.renderer,a=this.chartWidth,l=this.chartHeight,h=this.options.chart,c=this.spacing,d=this.clipOffset;
this.plotLeft=e=he(this.plotLeft),this.plotTop=i=he(this.plotTop),this.plotWidth=n=pe(0,he(a-e-this.marginRight)),
this.plotHeight=s=pe(0,he(l-i-this.marginBottom)),this.plotSizeX=o?s:n,this.plotSizeY=o?n:s,
this.plotBorderWidth=h.plotBorderWidth||0,this.spacingBox=r.spacingBox={
x:c[3],
y:c[0],
width:a-c[3]-c[1],
height:l-c[0]-c[2]
},this.plotBox=r.plotBox={
x:e,
y:i,
width:n,
height:s
},a=2*ce(this.plotBorderWidth/2),o=de(pe(a,d[3])/2),r=de(pe(a,d[0])/2),this.clipBox={
x:o,
y:r,
width:ce(this.plotSizeX-pe(a,d[1])/2-o),
height:pe(0,ce(this.plotSizeY-pe(a,d[2])/2-r))
},t||He(this.axes,function(t){
t.setAxisSize(),t.setAxisTranslation();
});
},
resetMargins:function(){
var t=this;
He(Ye,function(e,i){
t[e]=Je(t.margin[i],t.spacing[i]);
}),t.axisOffset=[0,0,0,0],t.clipOffset=[0,0,0,0];
},
drawChartBox:function(){
var t,e=this.options.chart,i=this.renderer,n=this.chartWidth,s=this.chartHeight,o=this.chartBackground,r=this.plotBackground,a=this.plotBorder,l=this.plotBGImage,h=e.borderWidth||0,c=e.backgroundColor,d=e.plotBackgroundColor,p=e.plotBackgroundImage,u=e.plotBorderWidth||0,g=this.plotLeft,f=this.plotTop,m=this.plotWidth,y=this.plotHeight,x=this.plotBox,v=this.clipRect,b=this.clipBox;
t=h+(e.shadow?8:0),(h||c)&&(o?o.animate(o.crisp({
width:n-t,
height:s-t
})):(o={
fill:c||"none"
},h&&(o.stroke=e.borderColor,o["stroke-width"]=h),this.chartBackground=i.rect(t/2,t/2,n-t,s-t,e.borderRadius,h).attr(o).addClass("highcharts-background").add().shadow(e.shadow))),
d&&(r?r.animate(x):this.plotBackground=i.rect(g,f,m,y,0).attr({
fill:d
}).add().shadow(e.plotShadow)),p&&(l?l.animate(x):this.plotBGImage=i.image(p,g,f,m,y).add()),
v?v.animate({
width:b.width,
height:b.height
}):this.clipRect=i.clipRect(b),u&&(a?a.animate(a.crisp({
x:g,
y:f,
width:m,
height:y,
strokeWidth:-u
})):this.plotBorder=i.rect(g,f,m,y,0,-u).attr({
stroke:e.plotBorderColor,
"stroke-width":u,
fill:"none",
zIndex:1
}).add()),this.isDirtyBox=!1;
},
propFromSeries:function(){
var t,e,i,n=this,s=n.options.chart,o=n.options.series;
He(["inverted","angular","polar"],function(r){
for(t=Ee[s.type||s.defaultSeriesType],i=n[r]||s[r]||t&&t.prototype[r],e=o&&o.length;!i&&e--;)(t=Ee[o[e].type])&&t.prototype[r]&&(i=!0);
n[r]=i;
});
},
linkSeries:function(){
var t=this,e=t.series;
He(e,function(t){
t.linkedSeries.length=0;
}),He(e,function(e){
var i=e.options.linkedTo;
o(i)&&(i=":previous"===i?t.series[e.index-1]:t.get(i))&&(i.linkedSeries.push(e),
e.linkedParent=i,e.visible=Je(e.options.visible,i.options.visible,e.visible));
});
},
renderSeries:function(){
He(this.series,function(t){
t.translate(),t.render();
});
},
renderLabels:function(){
var t=this,e=t.options.labels;
e.items&&He(e.items,function(i){
var n=$e(e.style,i.style),o=s(n.left)+t.plotLeft,r=s(n.top)+t.plotTop+12;
delete n.left,delete n.top,t.renderer.text(i.html,o,r).attr({
zIndex:2
}).css(n).add();
});
},
render:function(){
var t,e,i,n,s=this.axes,o=this.renderer,r=this.options;
this.setTitle(),this.legend=new gi(this,r.legend),this.getStacks&&this.getStacks(),
this.getMargins(!0),this.setChartSize(),t=this.plotWidth,e=this.plotHeight-=21,He(s,function(t){
t.setScale();
}),this.getAxisMargins(),i=t/this.plotWidth>1.1,n=e/this.plotHeight>1.05,(i||n)&&(this.maxTicks=null,
He(s,function(t){
(t.horiz&&i||!t.horiz&&n)&&t.setTickInterval(!0);
}),this.getMargins()),this.drawChartBox(),this.hasCartesianSeries&&He(s,function(t){
t.visible&&t.render();
}),this.seriesGroup||(this.seriesGroup=o.g("series-group").attr({
zIndex:3
}).add()),this.renderSeries(),this.renderLabels(),this.showCredits(r.credits),this.hasRendered=!0;
},
showCredits:function(e){
e.enabled&&!this.credits&&(this.credits=this.renderer.text(e.text,0,0).on("click",function(){
e.href&&(t.location.href=e.href);
}).attr({
align:e.position.align,
zIndex:8
}).css(e.style).add().align(e.position));
},
destroy:function(){
var t,e=this,i=e.axes,n=e.series,s=e.container,o=s&&s.parentNode;
for(Ue(e,"destroy"),De[e.index]=X,Re--,e.renderTo.removeAttribute("data-highcharts-chart"),
_e(e),t=i.length;t--;)i[t]=i[t].destroy();
for(t=n.length;t--;)n[t]=n[t].destroy();
He("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","),function(t){
var i=e[t];
i&&i.destroy&&(e[t]=i.destroy());
}),s&&(s.innerHTML="",_e(s),o&&M(s));
for(t in e)delete e[t];
},
isReadyToRender:function(){
var e=this;
return!Le&&t==t.top&&"complete"!==ae.readyState||Ce&&!t.canvg?(Ce?oi.push(function(){
e.firstRender();
},e.options.global.canvasToolsURL):ae.attachEvent("onreadystatechange",function(){
ae.detachEvent("onreadystatechange",e.firstRender),"complete"===ae.readyState&&e.firstRender();
}),!1):!0;
},
firstRender:function(){
var t=this,e=t.options,i=t.callback;
t.isReadyToRender()&&(t.getContainer(),Ue(t,"init"),t.resetMargins(),t.setChartSize(),
t.propFromSeries(),t.getAxes(),He(e.series||[],function(e){
t.initSeries(e);
}),t.linkSeries(),Ue(t,"beforeRender"),re.Pointer&&(t.pointer=new hi(t,e)),t.render(),
t.renderer.draw(),i&&i.apply(t,[t]),He(t.callbacks,function(e){
t.index!==X&&e.apply(t,[t]);
}),Ue(t,"load"),t.cloneRenderTo(!0));
},
splashArray:function(t,e){
var i=e[t],i=r(i)?i:[i,i,i,i];
return[Je(e[t+"Top"],i[0]),Je(e[t+"Right"],i[1]),Je(e[t+"Bottom"],i[2]),Je(e[t+"Left"],i[3])];
}
};
var si=re.CenteredSeriesMixin={
getCenter:function(){
var t,e,i=this.options,n=this.chart,s=2*(i.slicedOffset||0),o=n.plotWidth-2*s,n=n.plotHeight-2*s,r=i.center,r=[Je(r[0],"50%"),Je(r[1],"50%"),i.size||"100%",i.innerSize||0],a=ue(o,n);
for(t=0;4>t;++t)e=r[t],i=2>t||2===t&&/%$/.test(e),r[t]=(/%$/.test(e)?[o,n,a,r[2]][t]*parseFloat(e)/100:parseFloat(e))+(i?s:0);
return r[3]>r[2]&&(r[3]=r[2]),r;
}
},mi=function(){};
mi.prototype={
init:function(t,e,i){
return this.series=t,this.color=t.color,this.applyOptions(e,i),this.pointAttr={},
t.options.colorByPoint&&(e=t.options.colors||t.chart.options.colors,this.color=this.color||e[t.colorCounter++],
t.colorCounter===e.length)&&(t.colorCounter=0),t.chart.pointCount++,this;
},
applyOptions:function(t,e){
var i=this.series,n=i.options.pointValKey||i.pointValKey,t=mi.prototype.optionsToObject.call(this,t);
return $e(this,t),this.options=this.options?$e(this.options,t):t,n&&(this.y=this[n]),
this.x===X&&i&&(this.x=e===X?i.autoIncrement():e),this;
},
optionsToObject:function(t){
var e={},i=this.series,n=i.options.keys,s=n||i.pointArrayMap||["y"],o=s.length,r=0,l=0;
if("number"==typeof t||null===t)e[s[0]]=t;else if(a(t))for(!n&&t.length>o&&(i=typeof t[0],
"string"===i?e.name=t[0]:"number"===i&&(e.x=t[0]),r++);o>l;)n&&void 0===t[r]||(e[s[l]]=t[r]),
r++,l++;else"object"==typeof t&&(e=t,t.dataLabels&&(i._hasPointLabels=!0),t.marker&&(i._hasPointMarkers=!0));
return e;
},
destroy:function(){
var t,e=this.series.chart,i=e.hoverPoints;
e.pointCount--,i&&(this.setState(),d(i,this),!i.length)&&(e.hoverPoints=null),this===e.hoverPoint&&this.onMouseOut(),
(this.graphic||this.dataLabel)&&(_e(this),this.destroyElements()),this.legendItem&&e.legend.destroyItem(this);
for(t in this)this[t]=null;
},
destroyElements:function(){
for(var t,e=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],i=6;i--;)t=e[i],
this[t]&&(this[t]=this[t].destroy());
},
getLabelConfig:function(){
return{
x:this.category,
y:this.y,
color:this.color,
key:this.name||this.category,
series:this.series,
point:this,
percentage:this.percentage,
total:this.total||this.stackTotal
};
},
tooltipFormatter:function(t){
var e=this.series,i=e.tooltipOptions,n=Je(i.valueDecimals,""),s=i.valuePrefix||"",o=i.valueSuffix||"";
return He(e.pointArrayMap||["y"],function(e){
e="{point."+e,(s||o)&&(t=t.replace(e+"}",s+e+"}"+o)),t=t.replace(e+"}",e+":,."+n+"f}");
}),k(t,{
point:this,
series:this.series
});
},
firePointEvent:function(t,e,i){
var n=this,s=this.series.options;
(s.point.events[t]||n.options&&n.options.events&&n.options.events[t])&&this.importEvents(),
"click"===t&&s.allowPointSelect&&(i=function(t){
n.select&&n.select(null,t.ctrlKey||t.metaKey||t.shiftKey);
}),Ue(this,t,e,i);
},
visible:!0
};
var yi=re.Series=function(){};
yi.prototype={
isCartesian:!0,
type:"line",
pointClass:mi,
sorted:!0,
requireSorting:!0,
pointAttrToOptions:{
stroke:"lineColor",
"stroke-width":"lineWidth",
fill:"fillColor",
r:"radius"
},
directTouch:!1,
axisTypes:["xAxis","yAxis"],
colorCounter:0,
parallelArrays:["x","y"],
init:function(t,e){
var i,n,s=this,o=t.series,r=function(t,e){
return Je(t.options.index,t._i)-Je(e.options.index,e._i);
};
s.chart=t,s.options=e=s.setOptions(e),s.linkedSeries=[],s.bindAxes(),$e(s,{
name:e.name,
state:"",
pointAttr:{},
visible:e.visible!==!1,
selected:e.selected===!0
}),Ce&&(e.animation=!1),n=e.events;
for(i in n)je(s,i,n[i]);
(n&&n.click||e.point&&e.point.events&&e.point.events.click||e.allowPointSelect)&&(t.runTrackerClick=!0),
s.getColor(),s.getSymbol(),He(s.parallelArrays,function(t){
s[t+"Data"]=[];
}),s.setData(e.data,!1),s.isCartesian&&(t.hasCartesianSeries=!0),o.push(s),s._i=o.length-1,
S(o,r),this.yAxis&&S(this.yAxis.series,r),He(o,function(t,e){
t.index=e,t.name=t.name||"Series "+(e+1);
});
},
bindAxes:function(){
var t,i=this,n=i.options,s=i.chart;
He(i.axisTypes||[],function(o){
He(s[o],function(e){
t=e.options,(n[o]===t.index||n[o]!==X&&n[o]===t.id||n[o]===X&&0===t.index)&&(e.series.push(i),
i[o]=e,e.isDirty=!0);
}),!i[o]&&i.optionalAxis!==o&&e(18,!0);
});
},
updateParallelArrays:function(t,e){
var i=t.series,n=arguments;
He(i.parallelArrays,"number"==typeof e?function(n){
var s="y"===n&&i.toYData?i.toYData(t):t[n];
i[n+"Data"][e]=s;
}:function(t){
Array.prototype[e].apply(i[t+"Data"],Array.prototype.slice.call(n,2));
});
},
autoIncrement:function(){
var t,e=this.options,i=this.xIncrement,n=e.pointIntervalUnit,i=Je(i,e.pointStart,0);
return this.pointInterval=t=Je(this.pointInterval,e.pointInterval,1),("month"===n||"year"===n)&&(e=new N(i),
e="month"===n?+e[se](e[$]()+t):+e[oe](e[J]()+t),t=e-i),this.xIncrement=i+t,i;
},
getSegments:function(){
var t,e=-1,i=[],n=this.points,s=n.length;
if(s)if(this.options.connectNulls){
for(t=s;t--;)null===n[t].y&&n.splice(t,1);
n.length&&(i=[n]);
}else He(n,function(t,o){
null===t.y?(o>e+1&&i.push(n.slice(e+1,o)),e=o):o===s-1&&i.push(n.slice(e+1,o+1));
});
this.segments=i;
},
setOptions:function(t){
var e=this.chart,i=e.options.plotOptions,e=e.userOptions||{},s=e.plotOptions||{},o=i[this.type];
return this.userOptions=t,i=n(o,i.series,t),this.tooltipOptions=n(G.tooltip,G.plotOptions[this.type].tooltip,e.tooltip,s.series&&s.series.tooltip,s[this.type]&&s[this.type].tooltip,t.tooltip),
null===o.marker&&delete i.marker,this.zoneAxis=i.zoneAxis,t=this.zones=(i.zones||[]).slice(),
!i.negativeColor&&!i.negativeFillColor||i.zones||t.push({
value:i[this.zoneAxis+"Threshold"]||i.threshold||0,
color:i.negativeColor,
fillColor:i.negativeFillColor
}),t.length&&p(t[t.length-1].value)&&t.push({
color:this.color,
fillColor:this.fillColor
}),i;
},
getCyclic:function(t,e,i){
var n=this.userOptions,s="_"+t+"Index",o=t+"Counter";
e||(p(n[s])?e=n[s]:(n[s]=e=this.chart[o]%i.length,this.chart[o]+=1),e=i[e]),this[t]=e;
},
getColor:function(){
this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||ti[this.type].color,this.chart.options.colors);
},
getSymbol:function(){
var t=this.options.marker;
this.getCyclic("symbol",t.symbol,this.chart.options.symbols),/^url/.test(this.symbol)&&(t.radius=0);
},
drawLegendSymbol:ni.drawLineMarker,
setData:function(t,i,n,s){
var r,h=this,c=h.points,d=c&&c.length||0,u=h.options,g=h.chart,f=null,m=h.xAxis,y=m&&!!m.categories,x=u.turboThreshold,v=this.xData,b=this.yData,k=(r=h.pointArrayMap)&&r.length,t=t||[];
if(r=t.length,i=Je(i,!0),s!==!1&&r&&d===r&&!h.cropped&&!h.hasGroupedData&&h.visible)He(t,function(t,e){
c[e].update&&t!==u.data[e]&&c[e].update(t,!1,null,!1);
});else{
if(h.xIncrement=null,h.colorCounter=0,He(this.parallelArrays,function(t){
h[t+"Data"].length=0;
}),x&&r>x){
for(n=0;null===f&&r>n;)f=t[n],n++;
if(l(f)){
for(y=Je(u.pointStart,0),f=Je(u.pointInterval,1),n=0;r>n;n++)v[n]=y,b[n]=t[n],y+=f;
h.xIncrement=y;
}else if(a(f))if(k)for(n=0;r>n;n++)f=t[n],v[n]=f[0],b[n]=f.slice(1,k+1);else for(n=0;r>n;n++)f=t[n],
v[n]=f[0],b[n]=f[1];else e(12);
}else for(n=0;r>n;n++)t[n]!==X&&(f={
series:h
},h.pointClass.prototype.applyOptions.apply(f,[t[n]]),h.updateParallelArrays(f,n),
y&&p(f.name))&&(m.names[f.x]=f.name);
for(o(b[0])&&e(14,!0),h.data=[],h.options.data=t,n=d;n--;)c[n]&&c[n].destroy&&c[n].destroy();
m&&(m.minRange=m.userMinRange),h.isDirty=h.isDirtyData=g.isDirtyBox=!0,n=!1;
}
"point"===u.legendType&&(this.processData(),this.generatePoints()),i&&g.redraw(n);
},
processData:function(t){
var i,n=this.xData,s=this.yData,o=n.length;
i=0;
var r,a,l,h=this.xAxis,c=this.options;
l=c.cropThreshold;
var d,p,c=this.getExtremesFromAll||c.getExtremesFromAll,u=this.isCartesian;
if(u&&!this.isDirty&&!h.isDirty&&!this.yAxis.isDirty&&!t)return!1;
for(h&&(t=h.getExtremes(),d=t.min,p=t.max),u&&this.sorted&&!c&&(!l||o>l||this.forceCrop)&&(n[o-1]<d||n[0]>p?(n=[],
s=[]):(n[0]<d||n[o-1]>p)&&(i=this.cropData(this.xData,this.yData,d,p),n=i.xData,
s=i.yData,i=i.start,r=!0)),l=n.length-1;l>=0;l--)o=n[l]-n[l-1],o>0&&(a===X||a>o)?a=o:0>o&&this.requireSorting&&e(15);
this.cropped=r,this.cropStart=i,this.processedXData=n,this.processedYData=s,this.closestPointRange=a;
},
cropData:function(t,e,i,n){
var s,o=t.length,r=0,a=o,l=Je(this.cropShoulder,1);
for(s=0;o>s;s++)if(t[s]>=i){
r=pe(0,s-l);
break;
}
for(i=s;o>i;i++)if(t[i]>n){
a=i+l;
break;
}
return{
xData:t.slice(r,a),
yData:e.slice(r,a),
start:r,
end:a
};
},
generatePoints:function(){
var t,e,i,n,s=this.options.data,o=this.data,r=this.processedXData,a=this.processedYData,l=this.pointClass,h=r.length,c=this.cropStart||0,d=this.hasGroupedData,p=[];
for(o||d||(o=[],o.length=s.length,o=this.data=o),n=0;h>n;n++)e=c+n,d?p[n]=(new l).init(this,[r[n]].concat(g(a[n]))):(o[e]?i=o[e]:s[e]!==X&&(o[e]=i=(new l).init(this,s[e],r[n])),
p[n]=i),p[n].index=e;
if(o&&(h!==(t=o.length)||d))for(n=0;t>n;n++)n===c&&!d&&(n+=h),o[n]&&(o[n].destroyElements(),
o[n].plotX=X);
this.data=o,this.points=p;
},
getExtremes:function(t){
var e,i=this.yAxis,n=this.processedXData,s=[],o=0;
e=this.xAxis.getExtremes();
var r,a,l,h,c=e.min,d=e.max,t=t||this.stackedYData||this.processedYData;
for(e=t.length,h=0;e>h;h++)if(a=n[h],l=t[h],r=null!==l&&l!==X&&(!i.isLog||l.length||l>0),
a=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(n[h+1]||a)>=c&&(n[h-1]||a)<=d,
r&&a)if(r=l.length)for(;r--;)null!==l[r]&&(s[o++]=l[r]);else s[o++]=l;
this.dataMin=T(s),this.dataMax=P(s);
},
translate:function(){
this.processedXData||this.processData(),this.generatePoints();
for(var t,i,n,s,o=this.options,r=o.stacking,a=this.xAxis,h=a.categories,c=this.yAxis,d=this.points,u=d.length,g=!!this.modifyValue,f=o.pointPlacement,m="between"===f||l(f),y=o.threshold,x=o.startFromThreshold?y:0,v=Number.MAX_VALUE,o=0;u>o;o++){
var b=d[o],k=b.x,w=b.y;
i=b.low;
var A=r&&c.stacks[(this.negStacks&&(x?0:y)>w?"-":"")+this.stackKey];
c.isLog&&null!==w&&0>=w&&(b.y=w=null,e(10)),b.plotX=t=ue(pe(-1e5,a.translate(k,0,0,0,1,f,"flags"===this.type)),1e5),
r&&this.visible&&A&&A[k]&&(s=this.getStackIndicator(s,k,this.index),A=A[k],w=A.points[s.key],
i=w[0],w=w[1],i===x&&(i=Je(y,c.min)),c.isLog&&0>=i&&(i=null),b.total=b.stackTotal=A.total,
b.percentage=A.total&&b.y/A.total*100,b.stackY=w,A.setOffset(this.pointXOffset||0,this.barW||0)),
b.yBottom=p(i)?c.translate(i,0,1,0,1):null,g&&(w=this.modifyValue(w,b)),b.plotY=i="number"==typeof w&&1/0!==w?ue(pe(-1e5,c.translate(w,0,1,0,1)),1e5):X,
b.isInside=i!==X&&i>=0&&i<=c.len&&t>=0&&t<=a.len,b.clientX=m?a.translate(k,0,0,0,1):t,
b.negative=b.y<(y||0),b.category=h&&h[b.x]!==X?h[b.x]:b.x,o&&(v=ue(v,ge(t-n))),n=t;
}
this.closestPointRangePx=v,this.getSegments();
},
setClip:function(t){
var e=this.chart,i=this.options,n=e.renderer,s=e.inverted,o=this.clipBox,r=o||e.clipBox,a=this.sharedClipKey||["_sharedClip",t&&t.duration,t&&t.easing,r.height,i.xAxis,i.yAxis].join(","),l=e[a],h=e[a+"m"];
l||(t&&(r.width=0,e[a+"m"]=h=n.clipRect(-99,s?-e.plotLeft:-e.plotTop,99,s?e.chartWidth:e.chartHeight)),
e[a]=l=n.clipRect(r)),t&&(l.count+=1),i.clip!==!1&&(this.group.clip(t||o?l:e.clipRect),
this.markerGroup.clip(h),this.sharedClipKey=a),t||(l.count-=1,l.count<=0&&a&&e[a]&&(o||(e[a]=e[a].destroy()),
e[a+"m"]&&(e[a+"m"]=e[a+"m"].destroy())));
},
animate:function(t){
var e,i=this.chart,n=this.options.animation;
n&&!r(n)&&(n=ti[this.type].animation),t?this.setClip(n):(e=this.sharedClipKey,(t=i[e])&&t.animate({
width:i.plotSizeX
},n),i[e+"m"]&&i[e+"m"].animate({
width:i.plotSizeX+99
},n),this.animate=null);
},
afterAnimate:function(){
this.setClip(),Ue(this,"afterAnimate");
},
drawPoints:function(){
var t,e,i,n,s,o,r,a,l,h,c,d,p=this.points,u=this.chart,g=this.options.marker,f=this.pointAttr[""],m=this.markerGroup,y=Je(g.enabled,this.xAxis.isRadial,this.closestPointRangePx>2*g.radius);
if(g.enabled!==!1||this._hasPointMarkers)for(n=p.length;n--;)s=p[n],e=ce(s.plotX),
i=s.plotY,l=s.graphic,h=s.marker||{},c=!!s.marker,t=y&&h.enabled===X||h.enabled,
d=s.isInside,t&&i!==X&&!isNaN(i)&&null!==s.y?(t=s.pointAttr[s.selected?"select":""]||f,
o=t.r,r=Je(h.symbol,this.symbol),a=0===r.indexOf("url"),l?l[d?"show":"hide"](!0).animate($e({
x:e-o,
y:i-o
},l.symbolName?{
width:2*o,
height:2*o
}:{})):d&&(o>0||a)&&(s.graphic=u.renderer.symbol(r,e-o,i-o,2*o,2*o,c?h:g).attr(t).add(m))):l&&(s.graphic=l.destroy());
},
convertAttribs:function(t,e,i,n){
var s,o,r=this.pointAttrToOptions,a={},t=t||{},e=e||{},i=i||{},n=n||{};
for(s in r)o=r[s],a[s]=Je(t[o],e[s],i[s],n[s]);
return a;
},
getAttribs:function(){
var t,e=this,i=e.options,n=ti[e.type].marker?i.marker:i,s=n.states,o=s.hover,r=e.color,a=e.options.negativeColor;
t={
stroke:r,
fill:r
};
var l,h,c=e.points||[],d=[],u=e.pointAttrToOptions;
l=e.hasPointSpecificOptions;
var g=n.lineColor,f=n.fillColor;
h=i.turboThreshold;
var m,y=e.zones,x=e.zoneAxis||"y";
if(i.marker?(o.radius=o.radius||n.radius+o.radiusPlus,o.lineWidth=o.lineWidth||n.lineWidth+o.lineWidthPlus):(o.color=o.color||z(o.color||r).brighten(o.brightness).get(),
o.negativeColor=o.negativeColor||z(o.negativeColor||a).brighten(o.brightness).get()),
d[""]=e.convertAttribs(n,t),He(["hover","select"],function(t){
d[t]=e.convertAttribs(s[t],d[""]);
}),e.pointAttr=d,r=c.length,!h||h>r||l)for(;r--;){
if(h=c[r],(n=h.options&&h.options.marker||h.options)&&n.enabled===!1&&(n.radius=0),
y.length){
for(l=0,t=y[l];h[x]>=t.value;)t=y[++l];
h.color=h.fillColor=Je(t.color,e.color);
}
if(l=i.colorByPoint||h.color,h.options)for(m in u)p(n[u[m]])&&(l=!0);
l?(n=n||{},l=[],s=n.states||{},t=s.hover=s.hover||{},(!i.marker||h.negative&&!t.fillColor&&!o.fillColor)&&(t[e.pointAttrToOptions.fill]=t.color||!h.options.color&&o[h.negative&&a?"negativeColor":"color"]||z(h.color).brighten(t.brightness||o.brightness).get()),
t={
color:h.color
},f||(t.fillColor=h.color),g||(t.lineColor=h.color),n.hasOwnProperty("color")&&!n.color&&delete n.color,
l[""]=e.convertAttribs($e(t,n),d[""]),l.hover=e.convertAttribs(s.hover,d.hover,l[""]),
l.select=e.convertAttribs(s.select,d.select,l[""])):l=d,h.pointAttr=l;
}
},
destroy:function(){
var t,e,i,n,s=this,o=s.chart,r=/AppleWebKit\/533/.test(ve),a=s.data||[];
for(Ue(s,"destroy"),_e(s),He(s.axisTypes||[],function(t){
(n=s[t])&&(d(n.series,s),n.isDirty=n.forceRedraw=!0);
}),s.legendItem&&s.chart.legend.destroyItem(s),t=a.length;t--;)(e=a[t])&&e.destroy&&e.destroy();
s.points=null,clearTimeout(s.animationTimeout);
for(i in s)s[i]instanceof D&&!s[i].survive&&(t=r&&"group"===i?"hide":"destroy",s[i][t]());
o.hoverSeries===s&&(o.hoverSeries=null),d(o.series,s);
for(i in s)delete s[i];
},
getSegmentPath:function(t){
var e=this,i=[],n=e.options.step;
return He(t,function(s,o){
var r,a=s.plotX,l=s.plotY;
e.getPointSpline?i.push.apply(i,e.getPointSpline(t,s,o)):(i.push(o?"L":"M"),n&&o&&(r=t[o-1],
"right"===n?i.push(r.plotX,l,"L"):"center"===n?i.push((r.plotX+a)/2,r.plotY,"L",(r.plotX+a)/2,l,"L"):i.push(a,r.plotY,"L")),
i.push(s.plotX,s.plotY));
}),i;
},
getGraphPath:function(){
var t,e=this,i=[],n=[];
return He(e.segments,function(s){
t=e.getSegmentPath(s),s.length>1?i=i.concat(t):n.push(s[0]);
}),e.singlePoints=n,e.graphPath=i;
},
drawGraph:function(){
var t=this,e=this.options,i=[["graph",e.lineColor||this.color,e.dashStyle]],n=e.lineWidth,s="square"!==e.linecap,o=this.getGraphPath(),r=this.fillGraph&&this.color||"none";
He(this.zones,function(n,s){
i.push(["zoneGraph"+s,n.color||t.color,n.dashStyle||e.dashStyle]);
}),He(i,function(i,a){
var l=i[0],h=t[l];
h?h.animate({
d:o
}):(n||r)&&o.length&&(h={
stroke:i[1],
"stroke-width":n,
fill:r,
zIndex:1
},i[2]?h.dashstyle=i[2]:s&&(h["stroke-linecap"]=h["stroke-linejoin"]="round"),t[l]=t.chart.renderer.path(o).attr(h).add(t.group).shadow(2>a&&e.shadow));
});
},
applyZones:function(){
var t,e,i,n,s,o,r,a=this,l=this.chart,h=l.renderer,c=this.zones,d=this.clips||[],p=this.graph,u=this.area,g=pe(l.chartWidth,l.chartHeight),f=this[(this.zoneAxis||"y")+"Axis"],m=f.reversed,y=l.inverted,x=f.horiz,v=!1;
c.length&&(p||u)&&f.min!==X&&(p&&p.hide(),u&&u.hide(),n=f.getExtremes(),He(c,function(c,b){
t=m?x?l.plotWidth:0:x?0:f.toPixels(n.min),t=ue(pe(Je(e,t),0),g),e=ue(pe(he(f.toPixels(Je(c.value,n.max),!0)),0),g),
v&&(t=e=f.toPixels(n.max)),s=Math.abs(t-e),o=ue(t,e),r=pe(t,e),f.isXAxis?(i={
x:y?r:o,
y:0,
width:s,
height:g
},x||(i.x=l.plotHeight-i.x)):(i={
x:0,
y:y?r:o,
width:g,
height:s
},x&&(i.y=l.plotWidth-i.y)),l.inverted&&h.isVML&&(i=f.isXAxis?{
x:0,
y:m?o:r,
height:i.width,
width:l.chartWidth
}:{
x:i.y-l.plotLeft-l.spacingBox.x,
y:0,
width:i.height,
height:l.chartHeight
}),d[b]?d[b].animate(i):(d[b]=h.clipRect(i),p&&a["zoneGraph"+b].clip(d[b]),u&&a["zoneArea"+b].clip(d[b])),
v=c.value>n.max;
}),this.clips=d);
},
invertGroups:function(){
function t(){
var t={
width:e.yAxis.len,
height:e.xAxis.len
};
He(["group","markerGroup"],function(i){
e[i]&&e[i].attr(t).invert();
});
}
var e=this,i=e.chart;
e.xAxis&&(je(i,"resize",t),je(e,"destroy",function(){
_e(i,"resize",t);
}),t(),e.invertGroups=t);
},
plotGroup:function(t,e,i,n,s){
var o=this[t],r=!o;
return r&&(this[t]=o=this.chart.renderer.g(e).attr({
zIndex:n||.1
}).add(s),o.addClass("highcharts-series-"+this.index)),o.attr({
visibility:i
})[r?"attr":"animate"](this.getPlotBox()),o;
},
getPlotBox:function(){
var t=this.chart,e=this.xAxis,i=this.yAxis;
return t.inverted&&(e=i,i=this.xAxis),{
translateX:e?e.left:t.plotLeft,
translateY:i?i.top:t.plotTop,
scaleX:1,
scaleY:1
};
},
render:function(){
var t,e=this,i=e.chart,n=e.options,s=(t=n.animation)&&!!e.animate&&i.renderer.isSVG&&Je(t.duration,500)||0,o=e.visible?"inherit":"hidden",r=n.zIndex,a=e.hasRendered,l=i.seriesGroup;
t=e.plotGroup("group","series",o,r,l),e.markerGroup=e.plotGroup("markerGroup","markers",o,r,l),
s&&e.animate(!0),e.getAttribs(),t.inverted=e.isCartesian?i.inverted:!1,e.drawGraph&&(e.drawGraph(),
e.applyZones()),He(e.points,function(t){
t.redraw&&t.redraw();
}),e.drawDataLabels&&e.drawDataLabels(),e.visible&&e.drawPoints(),e.drawTracker&&e.options.enableMouseTracking!==!1&&e.drawTracker(),
i.inverted&&e.invertGroups(),n.clip!==!1&&!e.sharedClipKey&&!a&&t.clip(i.clipRect),
s&&e.animate(),a||(e.animationTimeout=f(function(){
e.afterAnimate();
},s)),e.isDirty=e.isDirtyData=!1,e.hasRendered=!0;
},
redraw:function(){
var t=this.chart,e=this.isDirtyData,i=this.isDirty,n=this.group,s=this.xAxis,o=this.yAxis;
n&&(t.inverted&&n.attr({
width:t.plotWidth,
height:t.plotHeight
}),n.animate({
translateX:Je(s&&s.left,t.plotLeft),
translateY:Je(o&&o.top,t.plotTop)
})),this.translate(),this.render(),e&&Ue(this,"updatedData"),(i||e)&&delete this.kdTree;
},
kdDimensions:1,
kdAxisArray:["clientX","plotY"],
searchPoint:function(t,e){
var i=this.xAxis,n=this.yAxis,s=this.chart.inverted;
return this.searchKDTree({
clientX:s?i.len-t.chartY+i.pos:t.chartX-i.pos,
plotY:s?n.len-t.chartX+n.pos:t.chartY-n.pos
},e);
},
buildKDTree:function(){
function t(i,n,s){
var o,r;
return(r=i&&i.length)?(o=e.kdAxisArray[n%s],i.sort(function(t,e){
return t[o]-e[o];
}),r=Math.floor(r/2),{
point:i[r],
left:t(i.slice(0,r),n+1,s),
right:t(i.slice(r+1),n+1,s)
}):void 0;
}
var e=this,i=e.kdDimensions;
delete e.kdTree,f(function(){
var n=Fe(e.points||[],function(t){
return null!==t.y;
});
e.kdTree=t(n,i,i);
},e.options.kdNow?0:1);
},
searchKDTree:function(t,e){
function i(t,e,a,l){
var h,c,d=e.point,u=n.kdAxisArray[a%l],g=d;
return c=p(t[s])&&p(d[s])?Math.pow(t[s]-d[s],2):null,h=p(t[o])&&p(d[o])?Math.pow(t[o]-d[o],2):null,
h=(c||0)+(h||0),d.dist=p(h)?Math.sqrt(h):Number.MAX_VALUE,d.distX=p(c)?Math.sqrt(c):Number.MAX_VALUE,
u=t[u]-d[u],h=0>u?"left":"right",c=0>u?"right":"left",e[h]&&(h=i(t,e[h],a+1,l),g=h[r]<g[r]?h:d),
e[c]&&Math.sqrt(u*u)<g[r]&&(t=i(t,e[c],a+1,l),g=t[r]<g[r]?t:g),g;
}
var n=this,s=this.kdAxisArray[0],o=this.kdAxisArray[1],r=e?"distX":"dist";
return this.kdTree||this.buildKDTree(),this.kdTree?i(t,this.kdTree,this.kdDimensions,this.kdDimensions):void 0;
}
},B.prototype={
destroy:function(){
L(this,this.axis);
},
render:function(t){
var e=this.options,i=e.format,i=i?k(i,this):e.formatter.call(this);
this.label?this.label.attr({
text:i,
visibility:"hidden"
}):this.label=this.axis.chart.renderer.text(i,null,null,e.useHTML).css(e.style).attr({
align:this.textAlign,
rotation:e.rotation,
visibility:"hidden"
}).add(t);
},
setOffset:function(t,e){
var i=this.axis,n=i.chart,s=n.inverted,o=i.reversed,o=this.isNegative&&!o||!this.isNegative&&o,r=i.translate(i.usePercentage?100:this.total,0,0,0,1),i=i.translate(0),i=ge(r-i),a=n.xAxis[0].translate(this.x)+t,l=n.plotHeight,o={
x:s?o?r:r-i:a,
y:s?l-a-e:o?l-r-i:l-r,
width:s?i:e,
height:s?e:i
};
(s=this.label)&&(s.align(this.alignOptions,null,o),o=s.alignAttr,s[this.options.crop===!1||n.isInsidePlot(o.x,o.y)?"show":"hide"](!0));
}
},fi.prototype.getStacks=function(){
var t=this;
He(t.yAxis,function(t){
t.stacks&&t.hasVisibleSeries&&(t.oldStacks=t.stacks);
}),He(t.series,function(e){
!e.options.stacking||e.visible!==!0&&t.options.chart.ignoreHiddenSeries!==!1||(e.stackKey=e.type+Je(e.options.stack,""));
});
},ri.prototype.buildStacks=function(){
var t=this.series,e=Je(this.options.reversedStacks,!0),i=t.length;
if(!this.isXAxis){
for(this.usePercentage=!1;i--;)t[e?i:t.length-i-1].setStackedPoints();
if(this.usePercentage)for(i=0;i<t.length;i++)t[i].setPercentStacks();
}
},ri.prototype.renderStackTotals=function(){
var t,e,i=this.chart,n=i.renderer,s=this.stacks,o=this.stackTotalGroup;
o||(this.stackTotalGroup=o=n.g("stack-labels").attr({
visibility:"visible",
zIndex:6
}).add()),o.translate(i.plotLeft,i.plotTop);
for(t in s)for(e in i=s[t])i[e].render(o);
},ri.prototype.resetStacks=function(){
var t,e,i=this.stacks;
if(!this.isXAxis)for(t in i)for(e in i[t])i[t][e].touched<this.stacksTouched?(i[t][e].destroy(),
delete i[t][e]):(i[t][e].total=null,i[t][e].cum=0);
},ri.prototype.cleanStacks=function(){
var t,e,i;
if(!this.isXAxis){
this.oldStacks&&(t=this.stacks=this.oldStacks);
for(e in t)for(i in t[e])t[e][i].cum=t[e][i].total;
}
},yi.prototype.setStackedPoints=function(){
if(this.options.stacking&&(this.visible===!0||this.chart.options.chart.ignoreHiddenSeries===!1)){
var t,e,i,n,s,o,r,a=this.processedXData,l=this.processedYData,h=[],c=l.length,d=this.options,p=d.threshold,u=d.startFromThreshold?p:0,g=d.stack,d=d.stacking,f=this.stackKey,m="-"+f,y=this.negStacks,x=this.yAxis,v=x.stacks,b=x.oldStacks;
for(x.stacksTouched+=1,s=0;c>s;s++)o=a[s],r=l[s],t=this.getStackIndicator(t,o,this.index),
n=t.key,i=(e=y&&(u?0:p)>r)?m:f,v[i]||(v[i]={}),v[i][o]||(b[i]&&b[i][o]?(v[i][o]=b[i][o],
v[i][o].total=null):v[i][o]=new B(x,x.options.stackLabels,e,o,g)),i=v[i][o],i.points[n]=[Je(i.cum,u)],
i.touched=x.stacksTouched,t.index>0&&this.singleStacks===!1&&(i.points[n][0]=i.points[this.index+","+o+",0"][0]),
"percent"===d?(e=e?f:m,y&&v[e]&&v[e][o]?(e=v[e][o],i.total=e.total=pe(e.total,i.total)+ge(r)||0):i.total=C(i.total+(ge(r)||0))):i.total=C(i.total+(r||0)),
i.cum=Je(i.cum,u)+(r||0),i.points[n].push(i.cum),h[s]=i.cum;
"percent"===d&&(x.usePercentage=!0),this.stackedYData=h,x.oldStacks={};
}
},yi.prototype.setPercentStacks=function(){
var t,e=this,i=e.stackKey,n=e.yAxis.stacks,s=e.processedXData;
He([i,"-"+i],function(i){
for(var o,r,a,l=s.length;l--;)r=s[l],t=e.getStackIndicator(t,r,e.index),o=(a=n[i]&&n[i][r])&&a.points[t.key],
(r=o)&&(a=a.total?100/a.total:0,r[0]=C(r[0]*a),r[1]=C(r[1]*a),e.stackedYData[l]=r[1]);
});
},yi.prototype.getStackIndicator=function(t,e,i){
return p(t)&&t.x===e?t.index++:t={
x:e,
index:0
},t.key=[i,e,t.index].join(","),t;
},$e(fi.prototype,{
addSeries:function(t,e,i){
var n,s=this;
return t&&(e=Je(e,!0),Ue(s,"addSeries",{
options:t
},function(){
n=s.initSeries(t),s.isDirtyLegend=!0,s.linkSeries(),e&&s.redraw(i);
})),n;
},
addAxis:function(t,e,i,s){
var o=e?"xAxis":"yAxis",r=this.options;
new ri(this,n(t,{
index:this[o].length,
isX:e
})),r[o]=g(r[o]||{}),r[o].push(t),Je(i,!0)&&this.redraw(s);
},
showLoading:function(t){
var e=this,i=e.options,n=e.loadingDiv,s=i.loading,o=function(){
n&&m(n,{
left:e.plotLeft+"px",
top:e.plotTop+"px",
width:e.plotWidth+"px",
height:e.plotHeight+"px"
});
};
n||(e.loadingDiv=n=y(Be,{
className:"highcharts-loading"
},$e(s.style,{
zIndex:10,
display:"none"
}),e.container),e.loadingSpan=y("span",null,s.labelStyle,n),je(e,"redraw",o)),e.loadingSpan.innerHTML=t||i.lang.loading,
e.loadingShown||(m(n,{
opacity:0,
display:""
}),Ke(n,{
opacity:s.style.opacity
},{
duration:s.showDuration||0
}),e.loadingShown=!0),o();
},
hideLoading:function(){
var t=this.options,e=this.loadingDiv;
e&&Ke(e,{
opacity:0
},{
duration:t.loading.hideDuration||100,
complete:function(){
m(e,{
display:"none"
});
}
}),this.loadingShown=!1;
}
}),$e(mi.prototype,{
update:function(t,e,i,n){
function s(){
l.applyOptions(t),null===l.y&&c&&(l.graphic=c.destroy()),r(t)&&!a(t)&&(l.redraw=function(){
c&&c.element&&t&&t.marker&&t.marker.symbol&&(l.graphic=c.destroy()),t&&t.dataLabels&&l.dataLabel&&(l.dataLabel=l.dataLabel.destroy()),
l.redraw=null;
}),o=l.index,h.updateParallelArrays(l,o),u&&l.name&&(u[l.x]=l.name),p.data[o]=r(p.data[o])?l.options:t,
h.isDirty=h.isDirtyData=!0,!h.fixedBox&&h.hasCartesianSeries&&(d.isDirtyBox=!0),
"point"===p.legendType&&(d.isDirtyLegend=!0),e&&d.redraw(i);
}
var o,l=this,h=l.series,c=l.graphic,d=h.chart,p=h.options,u=h.xAxis&&h.xAxis.names,e=Je(e,!0);
n===!1?s():l.firePointEvent("update",{
options:t
},s);
},
remove:function(t,e){
this.series.removePoint(Ge(this,this.series.data),t,e);
}
}),$e(yi.prototype,{
addPoint:function(t,e,i,n){
var s,o=this,r=o.options,a=o.data,l=o.graph,h=o.area,c=o.chart,d=o.xAxis&&o.xAxis.names,p=l&&l.shift||0,u=["graph","area"],l=r.data,g=o.xData;
if(I(n,c),i){
for(n=o.zones.length;n--;)u.push("zoneGraph"+n,"zoneArea"+n);
He(u,function(t){
o[t]&&(o[t].shift=p+(r.step?2:1));
});
}
if(h&&(h.isArea=!0),e=Je(e,!0),h={
series:o
},o.pointClass.prototype.applyOptions.apply(h,[t]),u=h.x,n=g.length,o.requireSorting&&u<g[n-1])for(s=!0;n&&g[n-1]>u;)n--;
o.updateParallelArrays(h,"splice",n,0,0),o.updateParallelArrays(h,n),d&&h.name&&(d[u]=h.name),
l.splice(n,0,t),s&&(o.data.splice(n,0,null),o.processData()),"point"===r.legendType&&o.generatePoints(),
i&&(a[0]&&a[0].remove?a[0].remove(!1):(a.shift(),o.updateParallelArrays(h,"shift"),
l.shift())),o.isDirty=!0,o.isDirtyData=!0,e&&(o.getAttribs(),c.redraw());
},
removePoint:function(t,e,i){
var n=this,s=n.data,o=s[t],r=n.points,a=n.chart,l=function(){
s.length===r.length&&r.splice(t,1),s.splice(t,1),n.options.data.splice(t,1),n.updateParallelArrays(o||{
series:n
},"splice",t,1),o&&o.destroy(),n.isDirty=!0,n.isDirtyData=!0,e&&a.redraw();
};
I(i,a),e=Je(e,!0),o?o.firePointEvent("remove",null,l):l();
},
remove:function(t,e){
var i=this,n=i.chart;
Ue(i,"remove",null,function(){
i.destroy(),n.isDirtyLegend=n.isDirtyBox=!0,n.linkSeries(),Je(t,!0)&&n.redraw(e);
});
},
update:function(t,e){
var i,s=this,o=this.chart,r=this.userOptions,a=this.type,l=Ee[a].prototype,h=["group","markerGroup","dataLabelsGroup"];
(t.type&&t.type!==a||void 0!==t.zIndex)&&(h.length=0),He(h,function(t){
h[t]=s[t],delete s[t];
}),t=n(r,{
animation:!1,
index:this.index,
pointStart:this.xData[0]
},{
data:this.options.data
},t),this.remove(!1);
for(i in l)this[i]=X;
$e(this,Ee[t.type||a].prototype),He(h,function(t){
s[t]=h[t];
}),this.init(o,t),o.linkSeries(),Je(e,!0)&&o.redraw(!1);
}
}),$e(ri.prototype,{
update:function(t,e){
var i=this.chart,t=i.options[this.coll][this.options.index]=n(this.userOptions,t);
this.destroy(!0),this._addedPlotLB=this.chart._labelPanes=X,this.init(i,$e(t,{
events:X
})),i.isDirtyBox=!0,Je(e,!0)&&i.redraw();
},
remove:function(t){
for(var e=this.chart,i=this.coll,n=this.series,s=n.length;s--;)n[s]&&n[s].remove(!1);
d(e.axes,this),d(e[i],this),e.options[i].splice(this.options.index,1),He(e[i],function(t,e){
t.options.index=e;
}),this.destroy(),e.isDirtyBox=!0,Je(t,!0)&&e.redraw();
},
setTitle:function(t,e){
this.update({
title:t
},e);
},
setCategories:function(t,e){
this.update({
categories:t
},e);
}
});
var xi=x(yi);
Ee.line=xi,ti.area=n(ei,{
softThreshold:!1,
threshold:0
});
var vi=x(yi,{
type:"area",
singleStacks:!1,
getSegments:function(){
var t,e,i,n,s,o=this,r=[],a=[],l=[],h=this.xAxis,c=this.yAxis,d=c.stacks[this.stackKey],p={},u=this.points,g=this.options.connectNulls;
if(this.options.stacking&&!this.cropped){
for(n=0;n<u.length;n++)p[u[n].x]=u[n];
for(s in d)null!==d[s].total&&l.push(+s);
l.sort(function(t,e){
return t-e;
}),He(l,function(s){
var r,l=null;
if(!g||p[s]&&null!==p[s].y)if(p[s])a.push(p[s]);else{
for(n=o.index;n<=c.series.length;n++)if(i=o.getStackIndicator(null,s,n),r=d[s].points[i.key]){
l=r[1];
break;
}
t=h.translate(s),e=c.getThreshold(l),a.push({
y:null,
plotX:t,
clientX:t,
plotY:e,
yBottom:e,
onMouseOver:ze
});
}
}),a.length&&r.push(a);
}else yi.prototype.getSegments.call(this),r=this.segments;
this.segments=r;
},
getSegmentPath:function(t){
var e,i=yi.prototype.getSegmentPath.call(this,t),n=[].concat(i),s=this.options;
e=i.length;
var o,r=this.yAxis.getThreshold(s.threshold);
if(3===e&&n.push("L",i[1],i[2]),s.stacking&&!this.closedStacks)for(e=t.length-1;e>=0;e--)o=Je(t[e].yBottom,r),
e<t.length-1&&s.step&&n.push(t[e+1].plotX,o),n.push(t[e].plotX,o);else this.closeSegment(n,t,r);
return this.areaPath=this.areaPath.concat(n),i;
},
closeSegment:function(t,e,i){
t.push("L",e[e.length-1].plotX,i,"L",e[0].plotX,i);
},
drawGraph:function(){
this.areaPath=[],yi.prototype.drawGraph.apply(this);
var t=this,e=this.areaPath,i=this.options,n=[["area",this.color,i.fillColor]];
He(this.zones,function(e,s){
n.push(["zoneArea"+s,e.color||t.color,e.fillColor||i.fillColor]);
}),He(n,function(n){
var s=n[0],o=t[s];
o?o.animate({
d:e
}):(o={
fill:n[2]||n[1],
zIndex:0
},n[2]||(o["fill-opacity"]=i.fillOpacity||.75),t[s]=t.chart.renderer.path(e).attr(o).add(t.group));
});
},
drawLegendSymbol:ni.drawRectangle
});
return Ee.area=vi,ti.spline=n(ei),xi=x(yi,{
type:"spline",
getPointSpline:function(t,e,i){
var n,s,o,r,a=e.plotX,l=e.plotY,h=t[i-1],c=t[i+1];
if(h&&c){
t=h.plotY,o=c.plotX;
var d,c=c.plotY;
n=(1.5*a+h.plotX)/2.5,s=(1.5*l+t)/2.5,o=(1.5*a+o)/2.5,r=(1.5*l+c)/2.5,d=(r-s)*(o-a)/(o-n)+l-r,
s+=d,r+=d,s>t&&s>l?(s=pe(t,l),r=2*l-s):t>s&&l>s&&(s=ue(t,l),r=2*l-s),r>c&&r>l?(r=pe(c,l),
s=2*l-r):c>r&&l>r&&(r=ue(c,l),s=2*l-r),e.rightContX=o,e.rightContY=r;
}
return i?(e=["C",h.rightContX||h.plotX,h.rightContY||h.plotY,n||a,s||l,a,l],h.rightContX=h.rightContY=null):e=["M",a,l],
e;
}
}),Ee.spline=xi,ti.areaspline=n(ti.area),vi=vi.prototype,xi=x(xi,{
type:"areaspline",
closedStacks:!0,
getSegmentPath:vi.getSegmentPath,
closeSegment:vi.closeSegment,
drawGraph:vi.drawGraph,
drawLegendSymbol:ni.drawRectangle
}),Ee.areaspline=xi,ti.column=n(ei,{
borderColor:"#FFFFFF",
borderRadius:0,
groupPadding:.2,
marker:null,
pointPadding:.1,
minPointLength:0,
cropThreshold:50,
pointRange:null,
states:{
hover:{
brightness:.1,
shadow:!1,
halo:!1
},
select:{
color:"#C0C0C0",
borderColor:"#000000",
shadow:!1
}
},
dataLabels:{
align:null,
verticalAlign:null,
y:null
},
softThreshold:!1,
startFromThreshold:!0,
stickyTracking:!1,
tooltip:{
distance:6
},
threshold:0
}),xi=x(yi,{
type:"column",
pointAttrToOptions:{
stroke:"borderColor",
fill:"color",
r:"borderRadius"
},
cropShoulder:0,
directTouch:!0,
trackerGroups:["group","dataLabelsGroup"],
negStacks:!0,
init:function(){
yi.prototype.init.apply(this,arguments);
var t=this,e=t.chart;
e.hasRendered&&He(e.series,function(e){
e.type===t.type&&(e.isDirty=!0);
});
},
getColumnMetrics:function(){
var t,e=this,i=e.options,n=e.xAxis,s=e.yAxis,o=n.reversed,r={},a=0;
i.grouping===!1?a=1:He(e.chart.series,function(i){
var n,o=i.options,l=i.yAxis;
i.type===e.type&&i.visible&&s.len===l.len&&s.pos===l.pos&&(o.stacking?(t=i.stackKey,
r[t]===X&&(r[t]=a++),n=r[t]):o.grouping!==!1&&(n=a++),i.columnIndex=n);
});
var l=ue(ge(n.transA)*(n.ordinalSlope||i.pointRange||n.closestPointRange||n.tickInterval||1),n.len),h=l*i.groupPadding,c=(l-2*h)/a,i=ue(i.maxPointWidth||n.len,Je(i.pointWidth,c*(1-2*i.pointPadding)));
return e.columnMetrics={
width:i,
offset:(c-i)/2+(h+((e.columnIndex||0)+(o?1:0))*c-l/2)*(o?-1:1)
},e.columnMetrics;
},
crispCol:function(t,e,i,n){
var s=this.chart,o=this.borderWidth,r=-(o%2?.5:0),o=o%2?.5:1;
return s.inverted&&s.renderer.isVML&&(o+=1),i=Math.round(t+i)+r,t=Math.round(t)+r,
i-=t,n=Math.round(e+n)+o,r=ge(e)<=.5&&n>.5,e=Math.round(e)+o,n-=e,r&&(e-=1,n+=1),
{
x:t,
y:e,
width:i,
height:n
};
},
translate:function(){
var t=this,e=t.chart,i=t.options,n=t.borderWidth=Je(i.borderWidth,t.closestPointRange*t.xAxis.transA<2?0:1),s=t.yAxis,o=t.translatedThreshold=s.getThreshold(i.threshold),r=Je(i.minPointLength,5),a=t.getColumnMetrics(),l=a.width,h=t.barW=pe(l,1+2*n),c=t.pointXOffset=a.offset;
e.inverted&&(o-=.5),i.pointPadding&&(h=de(h)),yi.prototype.translate.apply(t),He(t.points,function(i){
var n,a=ue(Je(i.yBottom,o),9e4),d=999+ge(a),d=ue(pe(-d,i.plotY),s.len+d),p=i.plotX+c,u=h,g=ue(d,a),f=pe(d,a)-g;
ge(f)<r&&r&&(f=r,n=!s.reversed&&!i.negative||s.reversed&&i.negative,g=ge(g-o)>r?a-r:o-(n?r:0)),
i.barX=p,i.pointWidth=l,i.tooltipPos=e.inverted?[s.len+s.pos-e.plotLeft-d,t.xAxis.len-p-u/2,f]:[p+u/2,d+s.pos-e.plotTop,f],
i.shapeType="rect",i.shapeArgs=t.crispCol(p,g,u,f);
});
},
getSymbol:ze,
drawLegendSymbol:ni.drawRectangle,
drawGraph:ze,
drawPoints:function(){
var t,e,i=this,s=this.chart,o=i.options,r=s.renderer,a=o.animationLimit||250;
He(i.points,function(l){
var h=l.plotY,c=l.graphic;
h===X||isNaN(h)||null===l.y?c&&(l.graphic=c.destroy()):(t=l.shapeArgs,h=p(i.borderWidth)?{
"stroke-width":i.borderWidth
}:{},e=l.pointAttr[l.selected?"select":""]||i.pointAttr[""],c?(Ze(c),c.attr(h).attr(e)[s.pointCount<a?"animate":"attr"](n(t))):l.graphic=r[l.shapeType](t).attr(h).attr(e).add(l.group||i.group).shadow(o.shadow,null,o.stacking&&!o.borderRadius));
});
},
animate:function(t){
var e=this.yAxis,i=this.options,n=this.chart.inverted,s={};
Le&&(t?(s.scaleY=.001,t=ue(e.pos+e.len,pe(e.pos,e.toPixels(i.threshold))),n?s.translateX=t-e.len:s.translateY=t,
this.group.attr(s)):(s.scaleY=1,s[n?"translateX":"translateY"]=e.pos,this.group.animate(s,this.options.animation),
this.animate=null));
},
remove:function(){
var t=this,e=t.chart;
e.hasRendered&&He(e.series,function(e){
e.type===t.type&&(e.isDirty=!0);
}),yi.prototype.remove.apply(t,arguments);
}
}),Ee.column=xi,ti.bar=n(ti.column),vi=x(xi,{
type:"bar",
inverted:!0
}),Ee.bar=vi,ti.scatter=n(ei,{
lineWidth:0,
marker:{
enabled:!0
},
tooltip:{
headerFormat:'<span style="color:{point.color}">●</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
}
}),vi=x(yi,{
type:"scatter",
sorted:!1,
requireSorting:!1,
noSharedTooltip:!0,
trackerGroups:["group","markerGroup","dataLabelsGroup"],
takeOrdinalPosition:!1,
kdDimensions:2,
drawGraph:function(){
this.options.lineWidth&&yi.prototype.drawGraph.call(this);
}
}),Ee.scatter=vi,ti.pie=n(ei,{
borderColor:"#FFFFFF",
borderWidth:1,
center:[null,null],
clip:!1,
colorByPoint:!0,
dataLabels:{
distance:30,
enabled:!0,
formatter:function(){
return null===this.y?void 0:this.point.name;
},
x:0
},
ignoreHiddenPoint:!0,
legendType:"point",
marker:null,
size:null,
showInLegend:!1,
slicedOffset:10,
states:{
hover:{
brightness:.1,
shadow:!1
}
},
stickyTracking:!1,
tooltip:{
followPointer:!0
}
}),ei={
type:"pie",
isCartesian:!1,
pointClass:x(mi,{
init:function(){
mi.prototype.init.apply(this,arguments);
var t,e=this;
return e.name=Je(e.name,"Slice"),t=function(t){
e.slice("select"===t.type);
},je(e,"select",t),je(e,"unselect",t),e;
},
setVisible:function(t,e){
var i=this,n=i.series,s=n.chart,o=n.options.ignoreHiddenPoint,e=Je(e,o);
t!==i.visible&&(i.visible=i.options.visible=t=t===X?!i.visible:t,n.options.data[Ge(i,n.data)]=i.options,
He(["graphic","dataLabel","connector","shadowGroup"],function(e){
i[e]&&i[e][t?"show":"hide"](!0);
}),i.legendItem&&s.legend.colorizeItem(i,t),!t&&"hover"===i.state&&i.setState(""),
o&&(n.isDirty=!0),e&&s.redraw());
},
slice:function(t,e,i){
var n=this.series;
I(i,n.chart),Je(e,!0),this.sliced=this.options.sliced=t=p(t)?t:!this.sliced,n.options.data[Ge(this,n.data)]=this.options,
t=t?this.slicedTranslation:{
translateX:0,
translateY:0
},this.graphic.animate(t),this.shadowGroup&&this.shadowGroup.animate(t);
},
haloPath:function(t){
var e=this.shapeArgs,i=this.series.chart;
return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(i.plotLeft+e.x,i.plotTop+e.y,e.r+t,e.r+t,{
innerR:this.shapeArgs.r,
start:e.start,
end:e.end
});
}
}),
requireSorting:!1,
directTouch:!0,
noSharedTooltip:!0,
trackerGroups:["group","dataLabelsGroup"],
axisTypes:[],
pointAttrToOptions:{
stroke:"borderColor",
"stroke-width":"borderWidth",
fill:"color"
},
animate:function(t){
var e=this,i=e.points,n=e.startAngleRad;
t||(He(i,function(t){
var i=t.graphic,s=t.shapeArgs;
i&&(i.attr({
r:t.startR||e.center[3]/2,
start:n,
end:n
}),i.animate({
r:s.r,
start:s.start,
end:s.end
},e.options.animation));
}),e.animate=null);
},
updateTotals:function(){
var t,e,i=0,n=this.points,s=n.length,o=this.options.ignoreHiddenPoint;
for(t=0;s>t;t++)e=n[t],i+=o&&!e.visible?0:e.y;
for(this.total=i,t=0;s>t;t++)e=n[t],e.percentage=i>0&&(e.visible||!o)?e.y/i*100:0,
e.total=i;
},
generatePoints:function(){
yi.prototype.generatePoints.call(this),this.updateTotals();
},
translate:function(t){
this.generatePoints();
var e,i,n,s,o,r=0,a=this.options,l=a.slicedOffset,h=l+a.borderWidth,c=a.startAngle||0,d=this.startAngleRad=ye/180*(c-90),c=(this.endAngleRad=ye/180*(Je(a.endAngle,c+360)-90))-d,p=this.points,u=a.dataLabels.distance,a=a.ignoreHiddenPoint,g=p.length;
for(t||(this.center=t=this.getCenter()),this.getX=function(e,i){
return n=le.asin(ue((e-t[1])/(t[2]/2+u),1)),t[0]+(i?-1:1)*fe(n)*(t[2]/2+u);
},s=0;g>s;s++)o=p[s],e=d+r*c,(!a||o.visible)&&(r+=o.percentage/100),i=d+r*c,o.shapeType="arc",
o.shapeArgs={
x:t[0],
y:t[1],
r:t[2]/2,
innerR:t[3]/2,
start:he(1e3*e)/1e3,
end:he(1e3*i)/1e3
},n=(i+e)/2,n>1.5*ye?n-=2*ye:-ye/2>n&&(n+=2*ye),o.slicedTranslation={
translateX:he(fe(n)*l),
translateY:he(me(n)*l)
},e=fe(n)*t[2]/2,i=me(n)*t[2]/2,o.tooltipPos=[t[0]+.7*e,t[1]+.7*i],o.half=-ye/2>n||n>ye/2?1:0,
o.angle=n,h=ue(h,u/2),o.labelPos=[t[0]+e+fe(n)*u,t[1]+i+me(n)*u,t[0]+e+fe(n)*h,t[1]+i+me(n)*h,t[0]+e,t[1]+i,0>u?"center":o.half?"right":"left",n];
},
drawGraph:null,
drawPoints:function(){
var t,e,i,n,s,o,r=this,a=r.chart.renderer,l=r.options.shadow;
l&&!r.shadowGroup&&(r.shadowGroup=a.g("shadow").add(r.group)),He(r.points,function(h){
null!==h.y&&(e=h.graphic,s=h.shapeArgs,i=h.shadowGroup,n=h.pointAttr[h.selected?"select":""],
n.stroke||(n.stroke=n.fill),l&&!i&&(i=h.shadowGroup=a.g("shadow").add(r.shadowGroup)),
t=h.sliced?h.slicedTranslation:{
translateX:0,
translateY:0
},i&&i.attr(t),e?e.setRadialReference(r.center).attr(n).animate($e(s,t)):(o={
"stroke-linejoin":"round"
},h.visible||(o.visibility="hidden"),h.graphic=e=a[h.shapeType](s).setRadialReference(r.center).attr(n).attr(o).attr(t).add(r.group).shadow(l,i)));
});
},
searchPoint:ze,
sortByAngle:function(t,e){
t.sort(function(t,i){
return void 0!==t.angle&&(i.angle-t.angle)*e;
});
},
drawLegendSymbol:ni.drawRectangle,
getCenter:si.getCenter,
getSymbol:ze
},ei=x(yi,ei),Ee.pie=ei,yi.prototype.drawDataLabels=function(){
var t,e,i,s,o=this,r=o.options,a=r.cursor,l=r.dataLabels,h=o.points,c=o.hasRendered||0,d=o.chart.renderer;
(l.enabled||o._hasPointLabels)&&(o.dlProcessOptions&&o.dlProcessOptions(l),s=o.plotGroup("dataLabelsGroup","data-labels",l.defer?"hidden":"visible",l.zIndex||6),
Je(l.defer,!0)&&(s.attr({
opacity:+c
}),c||je(o,"afterAnimate",function(){
o.visible&&s.show(),s[r.animation?"animate":"attr"]({
opacity:1
},{
duration:200
});
})),e=l,He(h,function(h){
var c,u,g,f,m=h.dataLabel,y=h.connector,x=!0,v={};
if(t=h.dlOptions||h.options&&h.options.dataLabels,c=Je(t&&t.enabled,e.enabled)&&null!==h.y,
m&&!c)h.dataLabel=m.destroy();else if(c){
if(l=n(e,t),f=l.style,c=l.rotation,u=h.getLabelConfig(),i=l.format?k(l.format,u):l.formatter.call(u,l),
f.color=Je(l.color,f.color,o.color,"black"),m)p(i)?(m.attr({
text:i
}),x=!1):(h.dataLabel=m=m.destroy(),y&&(h.connector=y.destroy()));else if(p(i)){
m={
fill:l.backgroundColor,
stroke:l.borderColor,
"stroke-width":l.borderWidth,
r:l.borderRadius||0,
rotation:c,
padding:l.padding,
zIndex:1
},"contrast"===f.color&&(v.color=l.inside||l.distance<0||r.stacking?d.getContrast(h.color||o.color):"#000000"),
a&&(v.cursor=a);
for(g in m)m[g]===X&&delete m[g];
m=h.dataLabel=d[c?"text":"label"](i,0,-9999,l.shape,null,null,l.useHTML).attr(m).css($e(f,v)).add(s).shadow(l.shadow);
}
m&&o.alignDataLabel(h,m,l,null,x);
}
}));
},yi.prototype.alignDataLabel=function(t,e,i,n,s){
var o=this.chart,r=o.inverted,a=Je(t.plotX,-9999),l=Je(t.plotY,-9999),h=e.getBBox(),c=o.renderer.fontMetrics(i.style.fontSize).b,d=this.visible&&(t.series.forceDL||o.isInsidePlot(a,he(l),r)||n&&o.isInsidePlot(a,r?n.x+1:n.y+n.height-1,r));
d&&(n=$e({
x:r?o.plotWidth-l:a,
y:he(r?o.plotHeight-a:l),
width:0,
height:0
},n),$e(i,{
width:h.width,
height:h.height
}),i.rotation?(t=o.renderer.rotCorr(c,i.rotation),e[s?"attr":"animate"]({
x:n.x+i.x+n.width/2+t.x,
y:n.y+i.y+n.height/2
}).attr({
align:i.align
})):(e.align(i,null,n),r=e.alignAttr,"justify"===Je(i.overflow,"justify")?this.justifyDataLabel(e,i,r,h,n,s):Je(i.crop,!0)&&(d=o.isInsidePlot(r.x,r.y)&&o.isInsidePlot(r.x+h.width,r.y+h.height)),
i.shape&&e.attr({
anchorX:t.plotX,
anchorY:t.plotY
}))),d||(Ze(e),e.attr({
y:-9999
}),e.placed=!1);
},yi.prototype.justifyDataLabel=function(t,e,i,n,s,o){
var r,a,l=this.chart,h=e.align,c=e.verticalAlign,d=t.box?0:t.padding||0;
r=i.x+d,0>r&&("right"===h?e.align="left":e.x=-r,a=!0),r=i.x+n.width-d,r>l.plotWidth&&("left"===h?e.align="right":e.x=l.plotWidth-r,
a=!0),r=i.y+d,0>r&&("bottom"===c?e.verticalAlign="top":e.y=-r,a=!0),r=i.y+n.height-d,
r>l.plotHeight&&("top"===c?e.verticalAlign="bottom":e.y=l.plotHeight-r,a=!0),a&&(t.placed=!o,
t.align(e,null,s));
},Ee.pie&&(Ee.pie.prototype.drawDataLabels=function(){
var t,e,i,n,s,o,r,a,l,h,c,d=this,p=d.data,u=d.chart,g=d.options.dataLabels,f=Je(g.connectorPadding,10),m=Je(g.connectorWidth,1),y=u.plotWidth,x=u.plotHeight,v=Je(g.softConnector,!0),b=g.distance,k=d.center,w=k[2]/2,A=k[1],S=b>0,T=[[],[]],L=[0,0,0,0],M=function(t,e){
return e.y-t.y;
};
if(d.visible&&(g.enabled||d._hasPointLabels)){
for(yi.prototype.drawDataLabels.apply(d),He(p,function(t){
t.dataLabel&&t.visible&&T[t.half].push(t);
}),h=2;h--;){
var C,I=[],O=[],z=T[h],D=z.length;
if(D){
for(d.sortByAngle(z,h-.5),c=p=0;!p&&z[c];)p=z[c]&&z[c].dataLabel&&(z[c].dataLabel.getBBox().height||21),
c++;
if(b>0){
for(s=ue(A+w+b,u.plotHeight),c=pe(0,A-w-b);s>=c;c+=p)I.push(c);
if(s=I.length,D>s){
for(t=[].concat(z),t.sort(M),c=D;c--;)t[c].rank=c;
for(c=D;c--;)z[c].rank>=s&&z.splice(c,1);
D=z.length;
}
for(c=0;D>c;c++){
t=z[c],o=t.labelPos,t=9999;
var R,B;
for(B=0;s>B;B++)R=ge(I[B]-o[1]),t>R&&(t=R,C=B);
if(c>C&&null!==I[c])C=c;else for(D-c+C>s&&null!==I[c]&&(C=s-D+c);null===I[C];)C++;
O.push({
i:C,
y:I[C]
}),I[C]=null;
}
O.sort(M);
}
for(c=0;D>c;c++)t=z[c],o=t.labelPos,n=t.dataLabel,l=t.visible===!1?"hidden":"inherit",
t=o[1],b>0?(s=O.pop(),C=s.i,a=s.y,(t>a&&null!==I[C+1]||a>t&&null!==I[C-1])&&(a=ue(pe(0,t),u.plotHeight))):a=t,
r=g.justify?k[0]+(h?-1:1)*(w+b):d.getX(a===A-w-b||a===A+w+b?t:a,h),n._attr={
visibility:l,
align:o[6]
},n._pos={
x:r+g.x+({
left:f,
right:-f
}[o[6]]||0),
y:a+g.y-10
},n.connX=r,n.connY=a,null===this.options.size&&(s=n.width,f>r-s?L[3]=pe(he(s-r+f),L[3]):r+s>y-f&&(L[1]=pe(he(r+s-y+f),L[1])),
0>a-p/2?L[0]=pe(he(-a+p/2),L[0]):a+p/2>x&&(L[2]=pe(he(a+p/2-x),L[2])));
}
}
(0===P(L)||this.verifyDataLabelOverflow(L))&&(this.placeDataLabels(),S&&m&&He(this.points,function(t){
e=t.connector,o=t.labelPos,(n=t.dataLabel)&&n._pos&&t.visible?(l=n._attr.visibility,
r=n.connX,a=n.connY,i=v?["M",r+("left"===o[6]?5:-5),a,"C",r,a,2*o[2]-o[4],2*o[3]-o[5],o[2],o[3],"L",o[4],o[5]]:["M",r+("left"===o[6]?5:-5),a,"L",o[2],o[3],"L",o[4],o[5]],
e?(e.animate({
d:i
}),e.attr("visibility",l)):t.connector=e=d.chart.renderer.path(i).attr({
"stroke-width":m,
stroke:g.connectorColor||t.color||"#606060",
visibility:l
}).add(d.dataLabelsGroup)):e&&(t.connector=e.destroy());
}));
}
},Ee.pie.prototype.placeDataLabels=function(){
He(this.points,function(t){
var e=t.dataLabel;
e&&t.visible&&((t=e._pos)?(e.attr(e._attr),e[e.moved?"animate":"attr"](t),e.moved=!0):e&&e.attr({
y:-9999
}));
});
},Ee.pie.prototype.alignDataLabel=ze,Ee.pie.prototype.verifyDataLabelOverflow=function(t){
var e,i=this.center,n=this.options,s=n.center,o=n.minSize||80,r=o;
return null!==s[0]?r=pe(i[2]-pe(t[1],t[3]),o):(r=pe(i[2]-t[1]-t[3],o),i[0]+=(t[3]-t[1])/2),
null!==s[1]?r=pe(ue(r,i[2]-pe(t[0],t[2])),o):(r=pe(ue(r,i[2]-t[0]-t[2]),o),i[1]+=(t[0]-t[2])/2),
r<i[2]?(i[2]=r,i[3]=Math.min(/%$/.test(n.innerSize||0)?r*parseFloat(n.innerSize||0)/100:parseFloat(n.innerSize||0),r),
this.translate(i),He(this.points,function(t){
t.dataLabel&&(t.dataLabel._pos=null);
}),this.drawDataLabels&&this.drawDataLabels()):e=!0,e;
}),Ee.column&&(Ee.column.prototype.alignDataLabel=function(t,e,i,s,o){
var r=this.chart.inverted,a=t.series,l=t.dlBox||t.shapeArgs,h=Je(t.below,t.plotY>Je(this.translatedThreshold,a.yAxis.len)),c=Je(i.inside,!!this.options.stacking);
l&&(s=n(l),s.y<0&&(s.height+=s.y,s.y=0),l=s.y+s.height-a.yAxis.len,l>0&&(s.height-=l),
r&&(s={
x:a.yAxis.len-s.y-s.height,
y:a.xAxis.len-s.x-s.width,
width:s.height,
height:s.width
}),c||(r?(s.x+=h?0:s.width,s.width=0):(s.y+=h?s.height:0,s.height=0))),i.align=Je(i.align,!r||c?"center":h?"right":"left"),
i.verticalAlign=Je(i.verticalAlign,r||c?"middle":h?"top":"bottom"),yi.prototype.alignDataLabel.call(this,t,e,i,s,o);
}),function(t){
var e=t.Chart,i=t.each,n=t.pick,s=t.addEvent;
e.prototype.callbacks.push(function(t){
function e(){
var e=[];
i(t.series,function(t){
var s=t.options.dataLabels,o=t.dataLabelCollections||["dataLabel"];
(s.enabled||t._hasPointLabels)&&!s.allowOverlap&&t.visible&&i(o,function(s){
i(t.points,function(t){
t[s]&&(t[s].labelrank=n(t.labelrank,t.shapeArgs&&t.shapeArgs.height),e.push(t[s]));
});
});
}),t.hideOverlappingLabels(e);
}
e(),s(t,"redraw",e);
}),e.prototype.hideOverlappingLabels=function(t){
var e,n,s,o,r,a,l,h=t.length;
for(n=0;h>n;n++)(e=t[n])&&(e.oldOpacity=e.opacity,e.newOpacity=1);
for(t.sort(function(t,e){
return(e.labelrank||0)-(t.labelrank||0);
}),n=0;h>n;n++)for(s=t[n],e=n+1;h>e;++e)o=t[e],s&&o&&s.placed&&o.placed&&0!==s.newOpacity&&0!==o.newOpacity&&(r=s.alignAttr,
a=o.alignAttr,l=2*(s.box?0:s.padding),r=!(a.x>r.x+(s.width-l)||a.x+(o.width-l)<r.x||a.y>r.y+(s.height-l)||a.y+(o.height-l)<r.y))&&((s.labelrank<o.labelrank?s:o).newOpacity=0);
i(t,function(t){
var e,i;
t&&(i=t.newOpacity,t.oldOpacity!==i&&t.placed&&(i?t.show(!0):e=function(){
t.hide();
},t.alignAttr.opacity=i,t[t.isOld?"animate":"attr"](t.alignAttr,null,e)),t.isOld=!0);
});
};
}(re),ei=re.TrackerMixin={
drawTrackerPoint:function(){
var t=this,e=t.chart,i=e.pointer,n=t.options.cursor,s=n&&{
cursor:n
},o=function(t){
for(var i,n=t.target;n&&!i;)i=n.point,n=n.parentNode;
i!==X&&i!==e.hoverPoint&&i.onMouseOver(t);
};
He(t.points,function(t){
t.graphic&&(t.graphic.element.point=t),t.dataLabel&&(t.dataLabel.element.point=t);
}),t._hasTracking||(He(t.trackerGroups,function(e){
t[e]&&(t[e].addClass("highcharts-tracker").on("mouseover",o).on("mouseout",function(t){
i.onTrackerMouseOut(t);
}).css(s),E)&&t[e].on("touchstart",o);
}),t._hasTracking=!0);
},
drawTrackerGraph:function(){
var t,e=this,i=e.options,n=i.trackByArea,s=[].concat(n?e.areaPath:e.graphPath),o=s.length,r=e.chart,a=r.pointer,l=r.renderer,h=r.options.tooltip.snap,c=e.tracker,d=i.cursor,p=d&&{
cursor:d
},d=e.singlePoints,u=function(){
r.hoverSeries!==e&&e.onMouseOver();
},g="rgba(192,192,192,"+(Le?1e-4:.002)+")";
if(o&&!n)for(t=o+1;t--;)"M"===s[t]&&s.splice(t+1,0,s[t+1]-h,s[t+2],"L"),(t&&"M"===s[t]||t===o)&&s.splice(t,0,"L",s[t-2]+h,s[t-1]);
for(t=0;t<d.length;t++)o=d[t],s.push("M",o.plotX-h,o.plotY,"L",o.plotX+h,o.plotY);
c?c.attr({
d:s
}):(e.tracker=l.path(s).attr({
"stroke-linejoin":"round",
visibility:e.visible?"visible":"hidden",
stroke:g,
fill:n?g:"none",
"stroke-width":i.lineWidth+(n?0:2*h),
zIndex:2
}).add(e.group),He([e.tracker,e.markerGroup],function(t){
t.addClass("highcharts-tracker").on("mouseover",u).on("mouseout",function(t){
a.onTrackerMouseOut(t);
}).css(p),E&&t.on("touchstart",u);
}));
}
},Ee.column&&(xi.prototype.drawTracker=ei.drawTrackerPoint),Ee.pie&&(Ee.pie.prototype.drawTracker=ei.drawTrackerPoint),
Ee.scatter&&(vi.prototype.drawTracker=ei.drawTrackerPoint),$e(gi.prototype,{
setItemEvents:function(t,e,i,n,s){
var o=this;
(i?e:t.legendGroup).on("mouseover",function(){
t.setState("hover"),e.css(o.options.itemHoverStyle);
}).on("mouseout",function(){
e.css(t.visible?n:s),t.setState();
}).on("click",function(e){
var i=function(){
t.setVisible&&t.setVisible();
},e={
browserEvent:e
};
t.firePointEvent?t.firePointEvent("legendItemClick",e,i):Ue(t,"legendItemClick",e,i);
});
},
createCheckboxForItem:function(t){
t.checkbox=y("input",{
type:"checkbox",
checked:t.selected,
defaultChecked:t.selected
},this.options.itemCheckboxStyle,this.chart.container),je(t.checkbox,"click",function(e){
Ue(t.series||t,"checkboxClick",{
checked:e.target.checked,
item:t
},function(){
t.select();
});
});
}
}),G.legend.itemStyle.cursor="pointer",$e(fi.prototype,{
showResetZoom:function(){
var t=this,e=G.lang,i=t.options.chart.resetZoomButton,n=i.theme,s=n.states,o="chart"===i.relativeTo?null:"plotBox";
this.resetZoomButton=t.renderer.button(e.resetZoom,null,null,function(){
t.zoomOut();
},n,s&&s.hover).attr({
align:i.position.align,
title:e.resetZoomTitle
}).add().align(i.position,!1,o);
},
zoomOut:function(){
var t=this;
Ue(t,"selection",{
resetSelection:!0
},function(){
t.zoom();
});
},
zoom:function(t){
var e,i,n=this.pointer,s=!1;
!t||t.resetSelection?He(this.axes,function(t){
e=t.zoom();
}):He(t.xAxis.concat(t.yAxis),function(t){
var i=t.axis,o=i.isXAxis;
(n[o?"zoomX":"zoomY"]||n[o?"pinchX":"pinchY"])&&(e=i.zoom(t.min,t.max),i.displayBtn&&(s=!0));
}),i=this.resetZoomButton,s&&!i?this.showResetZoom():!s&&r(i)&&(this.resetZoomButton=i.destroy()),
e&&this.redraw(Je(this.options.chart.animation,t&&t.animation,this.pointCount<100));
},
pan:function(t,e){
var i,n=this,s=n.hoverPoints;
s&&He(s,function(t){
t.setState();
}),He("xy"===e?[1,0]:[1],function(e){
var s=t[e?"chartX":"chartY"],o=n[e?"xAxis":"yAxis"][0],r=n[e?"mouseDownX":"mouseDownY"],a=(o.pointRange||0)/2,l=o.getExtremes(),h=o.toValue(r-s,!0)+a,a=o.toValue(r+n[e?"plotWidth":"plotHeight"]-s,!0)-a,r=r>s;
o.series.length&&(r||h>ue(l.dataMin,l.min))&&(!r||a<pe(l.dataMax,l.max))&&(o.setExtremes(h,a,!1,!1,{
trigger:"pan"
}),i=!0),n[e?"mouseDownX":"mouseDownY"]=s;
}),i&&n.redraw(!1),m(n.container,{
cursor:"move"
});
}
}),$e(mi.prototype,{
select:function(t,e){
var i=this,n=i.series,s=n.chart,t=Je(t,!i.selected);
i.firePointEvent(t?"select":"unselect",{
accumulate:e
},function(){
i.selected=i.options.selected=t,n.options.data[Ge(i,n.data)]=i.options,i.setState(t&&"select"),
e||He(s.getSelectedPoints(),function(t){
t.selected&&t!==i&&(t.selected=t.options.selected=!1,n.options.data[Ge(t,n.data)]=t.options,
t.setState(""),t.firePointEvent("unselect"));
});
});
},
onMouseOver:function(t,e){
var i=this.series,n=i.chart,s=n.tooltip,o=n.hoverPoint;
n.hoverSeries!==i&&i.onMouseOver(),o&&o!==this&&o.onMouseOut(),this.series&&(this.firePointEvent("mouseOver"),
s&&(!s.shared||i.noSharedTooltip)&&s.refresh(this,t),this.setState("hover"),!e)&&(n.hoverPoint=this);
},
onMouseOut:function(){
var t=this.series.chart,e=t.hoverPoints;
this.firePointEvent("mouseOut"),e&&-1!==Ge(this,e)||(this.setState(),t.hoverPoint=null);
},
importEvents:function(){
if(!this.hasImportedEvents){
var t,e=n(this.series.options.point,this.options).events;
this.events=e;
for(t in e)je(this,t,e[t]);
this.hasImportedEvents=!0;
}
},
setState:function(t,e){
var i,s=ce(this.plotX),o=this.plotY,r=this.series,a=r.options.states,l=ti[r.type].marker&&r.options.marker,h=l&&!l.enabled,c=l&&l.states[t],d=c&&c.enabled===!1,p=r.stateMarkerGraphic,u=this.marker||{},g=r.chart,f=r.halo,t=t||"";
i=this.pointAttr[t]||r.pointAttr[t],t===this.state&&!e||this.selected&&"select"!==t||a[t]&&a[t].enabled===!1||t&&(d||h&&c.enabled===!1)||t&&u.states&&u.states[t]&&u.states[t].enabled===!1||(this.graphic?(l=l&&this.graphic.symbolName&&i.r,
this.graphic.attr(n(i,l?{
x:s-l,
y:o-l,
width:2*l,
height:2*l
}:{})),p&&p.hide()):(t&&c&&(l=c.radius,u=u.symbol||r.symbol,p&&p.currentSymbol!==u&&(p=p.destroy()),
p?p[e?"animate":"attr"]({
x:s-l,
y:o-l
}):u&&(r.stateMarkerGraphic=p=g.renderer.symbol(u,s-l,o-l,2*l,2*l).attr(i).add(r.markerGroup),
p.currentSymbol=u)),p&&(p[t&&g.isInsidePlot(s,o,g.inverted)?"show":"hide"](),p.element.point=this)),
(s=a[t]&&a[t].halo)&&s.size?(f||(r.halo=f=g.renderer.path().add(g.seriesGroup)),
f.attr($e({
fill:this.color||r.color,
"fill-opacity":s.opacity
},s.attributes))[e?"animate":"attr"]({
d:this.haloPath(s.size)
})):f&&f.attr({
d:[]
}),this.state=t);
},
haloPath:function(t){
var e=this.series,i=e.chart,n=e.getPlotBox(),s=i.inverted,o=Math.floor(this.plotX);
return i.renderer.symbols.circle(n.translateX+(s?e.yAxis.len-this.plotY:o)-t,n.translateY+(s?e.xAxis.len-o:this.plotY)-t,2*t,2*t);
}
}),$e(yi.prototype,{
onMouseOver:function(){
var t=this.chart,e=t.hoverSeries;
e&&e!==this&&e.onMouseOut(),this.options.events.mouseOver&&Ue(this,"mouseOver"),
this.setState("hover"),t.hoverSeries=this;
},
onMouseOut:function(){
var t=this.options,e=this.chart,i=e.tooltip,n=e.hoverPoint;
e.hoverSeries=null,n&&n.onMouseOut(),this&&t.events.mouseOut&&Ue(this,"mouseOut"),
i&&!t.stickyTracking&&(!i.shared||this.noSharedTooltip)&&i.hide(),this.setState();
},
setState:function(t){
var e=this.options,i=this.graph,n=e.states,s=e.lineWidth,e=0,t=t||"";
if(this.state!==t&&(this.state=t,!(n[t]&&n[t].enabled===!1)&&(t&&(s=n[t].lineWidth||s+(n[t].lineWidthPlus||0)),
i&&!i.dashstyle)))for(t={
"stroke-width":s
},i.attr(t);this["zoneGraph"+e];)this["zoneGraph"+e].attr(t),e+=1;
},
setVisible:function(t,e){
var i,n=this,s=n.chart,o=n.legendItem,r=s.options.chart.ignoreHiddenSeries,a=n.visible;
i=(n.visible=t=n.userOptions.visible=t===X?!a:t)?"show":"hide",He(["group","dataLabelsGroup","markerGroup","tracker"],function(t){
n[t]&&n[t][i]();
}),(s.hoverSeries===n||(s.hoverPoint&&s.hoverPoint.series)===n)&&n.onMouseOut(),
o&&s.legend.colorizeItem(n,t),n.isDirty=!0,n.options.stacking&&He(s.series,function(t){
t.options.stacking&&t.visible&&(t.isDirty=!0);
}),He(n.linkedSeries,function(e){
e.setVisible(t,!1);
}),r&&(s.isDirtyBox=!0),e!==!1&&s.redraw(),Ue(n,i);
},
show:function(){
this.setVisible(!0);
},
hide:function(){
this.setVisible(!1);
},
select:function(t){
this.selected=t=t===X?!this.selected:t,this.checkbox&&(this.checkbox.checked=t),
Ue(this,t?"select":"unselect");
},
drawTracker:ei.drawTrackerGraph
}),$e(re,{
Color:z,
Point:mi,
Tick:R,
Renderer:Y,
SVGElement:D,
SVGRenderer:ii,
arrayMin:T,
arrayMax:P,
charts:De,
dateFormat:H,
error:e,
format:k,
pathAnim:void 0,
getOptions:function(){
return G;
},
hasBidiBug:Me,
isTouchDevice:Te,
setOptions:function(t){
return G=n(!0,G,t),O(),G;
},
addEvent:je,
removeEvent:_e,
createElement:y,
discardElement:M,
css:m,
each:He,
map:Ve,
merge:n,
splat:g,
stableSort:S,
extendClass:x,
pInt:s,
svg:Le,
canvas:Ce,
vml:!Le&&!Ce,
product:"Highcharts",
version:"4.2.1"
}),re;
});
var s=i.exports;
return i=void 0,e=void 0,function(t){
"object"==typeof i&&i.exports?i.exports=t:t(s);
}(function(t){
function e(t,e,i){
this.init(t,e,i);
}
var i=t.arrayMin,n=t.arrayMax,s=t.each,o=t.extend,r=t.merge,a=t.map,l=t.pick,h=t.pInt,c=t.getOptions().plotOptions,d=t.seriesTypes,p=t.extendClass,u=t.splat,g=t.wrap,f=t.Axis,m=t.Tick,y=t.Point,x=t.Pointer,v=t.CenteredSeriesMixin,b=t.TrackerMixin,k=t.Series,w=Math,A=w.round,S=w.floor,T=w.max,P=t.Color,L=function(){};
o(e.prototype,{
init:function(t,e,i){
var n=this,o=n.defaultOptions;
n.chart=e,n.options=t=r(o,e.angular?{
background:{}
}:void 0,t),(t=t.background)&&s([].concat(u(t)).reverse(),function(t){
var e=t.backgroundColor,s=i.userOptions,t=r(n.defaultBackgroundOptions,t);
e&&(t.backgroundColor=e),t.color=t.backgroundColor,i.options.plotBands.unshift(t),
s.plotBands=s.plotBands||[],s.plotBands!==i.options.plotBands&&s.plotBands.unshift(t);
});
},
defaultOptions:{
center:["50%","50%"],
size:"85%",
startAngle:0
},
defaultBackgroundOptions:{
shape:"circle",
borderWidth:1,
borderColor:"silver",
backgroundColor:{
linearGradient:{
x1:0,
y1:0,
x2:0,
y2:1
},
stops:[[0,"#FFF"],[1,"#DDD"]]
},
from:-Number.MAX_VALUE,
innerRadius:0,
to:Number.MAX_VALUE,
outerRadius:"105%"
}
});
var M=f.prototype,m=m.prototype,C={
getOffset:L,
redraw:function(){
this.isDirty=!1;
},
render:function(){
this.isDirty=!1;
},
setScale:L,
setCategories:L,
setTitle:L
},I={
isRadial:!0,
defaultRadialGaugeOptions:{
labels:{
align:"center",
x:0,
y:null
},
minorGridLineWidth:0,
minorTickInterval:"auto",
minorTickLength:10,
minorTickPosition:"inside",
minorTickWidth:1,
tickLength:10,
tickPosition:"inside",
tickWidth:2,
title:{
rotation:0
},
zIndex:2
},
defaultRadialXOptions:{
gridLineWidth:1,
labels:{
align:null,
distance:15,
x:0,
y:null
},
maxPadding:0,
minPadding:0,
showLastLabel:!1,
tickLength:0
},
defaultRadialYOptions:{
gridLineInterpolation:"circle",
labels:{
align:"right",
x:-3,
y:-2
},
showLastLabel:!1,
title:{
x:4,
text:null,
rotation:90
}
},
setOptions:function(t){
t=this.options=r(this.defaultOptions,this.defaultRadialOptions,t),t.plotBands||(t.plotBands=[]);
},
getOffset:function(){
M.getOffset.call(this),this.chart.axisOffset[this.side]=0,this.center=this.pane.center=v.getCenter.call(this.pane);
},
getLinePath:function(t,e){
var i=this.center,e=l(e,i[2]/2-this.offset);
return this.chart.renderer.symbols.arc(this.left+i[0],this.top+i[1],e,e,{
start:this.startAngleRad,
end:this.endAngleRad,
open:!0,
innerR:0
});
},
setAxisTranslation:function(){
M.setAxisTranslation.call(this),this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),
this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0);
},
beforeSetTickPositions:function(){
this.autoConnect&&(this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0);
},
setAxisSize:function(){
M.setAxisSize.call(this),this.isRadial&&(this.center=this.pane.center=t.CenteredSeriesMixin.getCenter.call(this.pane),
this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*l(this.sector,1)/2);
},
getPosition:function(t,e){
return this.postTranslate(this.isCircular?this.translate(t):0,l(this.isCircular?e:this.translate(t),this.center[2]/2)-this.offset);
},
postTranslate:function(t,e){
var i=this.chart,n=this.center,t=this.startAngleRad+t;
return{
x:i.plotLeft+n[0]+Math.cos(t)*e,
y:i.plotTop+n[1]+Math.sin(t)*e
};
},
getPlotBandPath:function(t,e,i){
var n,s=this.center,o=this.startAngleRad,r=s[2]/2,c=[l(i.outerRadius,"100%"),i.innerRadius,l(i.thickness,10)],d=/%$/,p=this.isCircular;
return"polygon"===this.options.gridLineInterpolation?s=this.getPlotLinePath(t).concat(this.getPlotLinePath(e,!0)):(t=Math.max(t,this.min),
e=Math.min(e,this.max),p||(c[0]=this.translate(t),c[1]=this.translate(e)),c=a(c,function(t){
return d.test(t)&&(t=h(t,10)*r/100),t;
}),"circle"!==i.shape&&p?(t=o+this.translate(t),e=o+this.translate(e)):(t=-Math.PI/2,
e=1.5*Math.PI,n=!0),s=this.chart.renderer.symbols.arc(this.left+s[0],this.top+s[1],c[0],c[0],{
start:Math.min(t,e),
end:Math.max(t,e),
innerR:l(c[1],c[0]-c[2]),
open:n
})),s;
},
getPlotLinePath:function(t,e){
var i,n,o,r=this,a=r.center,l=r.chart,h=r.getPosition(t);
return r.isCircular?o=["M",a[0]+l.plotLeft,a[1]+l.plotTop,"L",h.x,h.y]:"circle"===r.options.gridLineInterpolation?(t=r.translate(t))&&(o=r.getLinePath(0,t)):(s(l.xAxis,function(t){
t.pane===r.pane&&(i=t);
}),o=[],t=r.translate(t),a=i.tickPositions,i.autoConnect&&(a=a.concat([a[0]])),e&&(a=[].concat(a).reverse()),
s(a,function(e,s){
n=i.getPosition(e,t),o.push(s?"L":"M",n.x,n.y);
})),o;
},
getTitlePosition:function(){
var t=this.center,e=this.chart,i=this.options.title;
return{
x:e.plotLeft+t[0]+(i.x||0),
y:e.plotTop+t[1]-{
high:.5,
middle:.25,
low:0
}[i.align]*t[2]+(i.y||0)
};
}
};
g(M,"init",function(t,i,n){
var s,a,h,c=i.angular,d=i.polar,p=n.isX,g=c&&p;
h=i.options;
var f=n.pane||0;
c?(o(this,g?C:I),(a=!p)&&(this.defaultRadialOptions=this.defaultRadialGaugeOptions)):d&&(o(this,I),
this.defaultRadialOptions=(a=p)?this.defaultRadialXOptions:r(this.defaultYAxisOptions,this.defaultRadialYOptions)),
t.call(this,i,n),g||!c&&!d||(t=this.options,i.panes||(i.panes=[]),this.pane=(s=i.panes[f]=i.panes[f]||new e(u(h.pane)[f],i,this),
f=s),f=f.options,i.inverted=!1,h.chart.zoomType=null,this.startAngleRad=i=(f.startAngle-90)*Math.PI/180,
this.endAngleRad=h=(l(f.endAngle,f.startAngle+360)-90)*Math.PI/180,this.offset=t.offset||0,
(this.isCircular=a)&&void 0===n.max&&h-i===2*Math.PI&&(this.autoConnect=!0));
}),g(M,"autoLabelAlign",function(t){
return this.isRadial?void 0:t.apply(this,[].slice.call(arguments,1));
}),g(m,"getPosition",function(t,e,i,n,s){
var o=this.axis;
return o.getPosition?o.getPosition(i):t.call(this,e,i,n,s);
}),g(m,"getLabelPosition",function(t,e,i,n,s,o,r,a,h){
var c=this.axis,d=o.y,p=20,u=o.align,g=(c.translate(this.pos)+c.startAngleRad+Math.PI/2)/Math.PI*180%360;
return c.isRadial?(t=c.getPosition(this.pos,c.center[2]/2+l(o.distance,-25)),"auto"===o.rotation?n.attr({
rotation:g
}):null===d&&(d=c.chart.renderer.fontMetrics(n.styles.fontSize).b-n.getBBox().height/2),
null===u&&(c.isCircular?(this.label.getBBox().width>c.len*c.tickInterval/(c.max-c.min)&&(p=0),
u=g>p&&180-p>g?"left":g>180+p&&360-p>g?"right":"center"):u="center",n.attr({
align:u
})),t.x+=o.x,t.y+=d):t=t.call(this,e,i,n,s,o,r,a,h),t;
}),g(m,"getMarkPath",function(t,e,i,n,s,o,r){
var a=this.axis;
return a.isRadial?(t=a.getPosition(this.pos,a.center[2]/2+n),e=["M",e,i,"L",t.x,t.y]):e=t.call(this,e,i,n,s,o,r),
e;
}),c.arearange=r(c.area,{
lineWidth:1,
marker:null,
threshold:null,
tooltip:{
pointFormat:'<span style="color:{series.color}">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
},
trackByArea:!0,
dataLabels:{
align:null,
verticalAlign:null,
xLow:0,
xHigh:0,
yLow:0,
yHigh:0
},
states:{
hover:{
halo:!1
}
}
}),d.arearange=p(d.area,{
type:"arearange",
pointArrayMap:["low","high"],
dataLabelCollections:["dataLabel","dataLabelUpper"],
toYData:function(t){
return[t.low,t.high];
},
pointValKey:"low",
deferTranslatePolar:!0,
highToXY:function(t){
var e=this.chart,i=this.xAxis.postTranslate(t.rectPlotX,this.yAxis.len-t.plotHigh);
t.plotHighX=i.x-e.plotLeft,t.plotHigh=i.y-e.plotTop;
},
translate:function(){
var t=this,e=t.yAxis;
d.area.prototype.translate.apply(t),s(t.points,function(t){
var i=t.low,n=t.high,s=t.plotY;
null===n||null===i?t.isNull=!0:(t.plotLow=s,t.plotHigh=e.translate(n,0,1,0,1));
}),this.chart.polar&&s(this.points,function(e){
t.highToXY(e);
});
},
getGraphPath:function(){
var t,e,i,n=this.points,s=[],o=[],r=n.length,a=k.prototype.getGraphPath;
i=this.options;
for(var l=i.step,r=n.length;r--;)t=n[r],!t.isNull&&(!n[r+1]||n[r+1].isNull)&&o.push({
plotX:t.plotX,
plotY:t.plotLow
}),e={
plotX:t.plotX,
plotY:t.plotHigh,
isNull:t.isNull
},o.push(e),s.push(e),!t.isNull&&(!n[r-1]||n[r-1].isNull)&&o.push({
plotX:t.plotX,
plotY:t.plotLow
});
return n=a.call(this,n),l&&(l===!0&&(l="left"),i.step={
left:"right",
center:"center",
right:"left"
}[l]),s=a.call(this,s),o=a.call(this,o),i.step=l,i=[].concat(n,s),!this.chart.polar&&"M"===o[0]&&(o[0]="L"),
this.areaPath=this.areaPath.concat(n,o),i;
},
drawDataLabels:function(){
var t,e,i,n=this.data,s=n.length,o=[],r=k.prototype,a=this.options.dataLabels,l=a.align,h=a.verticalAlign,c=a.inside,d=this.chart.inverted;
if(a.enabled||this._hasPointLabels){
for(t=s;t--;)(e=n[t])&&(i=c?e.plotHigh<e.plotLow:e.plotHigh>e.plotLow,e.y=e.high,
e._plotY=e.plotY,e.plotY=e.plotHigh,o[t]=e.dataLabel,e.dataLabel=e.dataLabelUpper,
e.below=i,d?l||(a.align=i?"right":"left"):h||(a.verticalAlign=i?"top":"bottom"),
a.x=a.xHigh,a.y=a.yHigh);
for(r.drawDataLabels&&r.drawDataLabels.apply(this,arguments),t=s;t--;)(e=n[t])&&(i=c?e.plotHigh<e.plotLow:e.plotHigh>e.plotLow,
e.dataLabelUpper=e.dataLabel,e.dataLabel=o[t],e.y=e.low,e.plotY=e._plotY,e.below=!i,
d?l||(a.align=i?"left":"right"):h||(a.verticalAlign=i?"bottom":"top"),a.x=a.xLow,
a.y=a.yLow);
r.drawDataLabels&&r.drawDataLabels.apply(this,arguments);
}
a.align=l,a.verticalAlign=h;
},
alignDataLabel:function(){
d.column.prototype.alignDataLabel.apply(this,arguments);
},
setStackedPoints:L,
getSymbol:L,
drawPoints:L
}),c.areasplinerange=r(c.arearange),d.areasplinerange=p(d.arearange,{
type:"areasplinerange",
getPointSpline:d.spline.prototype.getPointSpline
}),function(){
var t=d.column.prototype;
c.columnrange=r(c.column,c.arearange,{
lineWidth:1,
pointRange:null
}),d.columnrange=p(d.arearange,{
type:"columnrange",
translate:function(){
var e,i=this,n=i.yAxis,o=i.xAxis,r=i.chart;
t.translate.apply(i),s(i.points,function(t){
var s,a,l=t.shapeArgs,h=i.options.minPointLength;
t.plotHigh=e=n.translate(t.high,0,1,0,1),t.plotLow=t.plotY,a=e,s=t.plotY-e,Math.abs(s)<h?(h-=s,
s+=h,a-=h/2):0>s&&(s*=-1,a-=s),l.height=s,l.y=a,t.tooltipPos=r.inverted?[n.len+n.pos-r.plotLeft-a-s/2,o.len+o.pos-r.plotTop-l.x-l.width/2,s]:[o.left-r.plotLeft+l.x+l.width/2,n.pos-r.plotTop+a+s/2,s];
});
},
directTouch:!0,
trackerGroups:["group","dataLabelsGroup"],
drawGraph:L,
crispCol:t.crispCol,
pointAttrToOptions:t.pointAttrToOptions,
drawPoints:t.drawPoints,
drawTracker:t.drawTracker,
animate:t.animate,
getColumnMetrics:t.getColumnMetrics
});
}(),c.gauge=r(c.line,{
dataLabels:{
enabled:!0,
defer:!1,
y:15,
borderWidth:1,
borderColor:"silver",
borderRadius:3,
crop:!1,
verticalAlign:"top",
zIndex:2
},
dial:{},
pivot:{},
tooltip:{
headerFormat:""
},
showInLegend:!1
}),b={
type:"gauge",
pointClass:p(y,{
setState:function(t){
this.state=t;
}
}),
angular:!0,
drawGraph:L,
fixedBox:!0,
forceDL:!0,
trackerGroups:["group","dataLabelsGroup"],
translate:function(){
var t=this.yAxis,e=this.options,i=t.center;
this.generatePoints(),s(this.points,function(n){
var s=r(e.dial,n.dial),o=h(l(s.radius,80))*i[2]/200,a=h(l(s.baseLength,70))*o/100,c=h(l(s.rearLength,10))*o/100,d=s.baseWidth||3,p=s.topWidth||1,u=e.overshoot,g=t.startAngleRad+t.translate(n.y,null,null,null,!0);
u&&"number"==typeof u?(u=u/180*Math.PI,g=Math.max(t.startAngleRad-u,Math.min(t.endAngleRad+u,g))):e.wrap===!1&&(g=Math.max(t.startAngleRad,Math.min(t.endAngleRad,g))),
g=180*g/Math.PI,n.shapeType="path",n.shapeArgs={
d:s.path||["M",-c,-d/2,"L",a,-d/2,o,-p/2,o,p/2,a,d/2,-c,d/2,"z"],
translateX:i[0],
translateY:i[1],
rotation:g
},n.plotX=i[0],n.plotY=i[1];
});
},
drawPoints:function(){
var t=this,e=t.yAxis.center,i=t.pivot,n=t.options,o=n.pivot,a=t.chart.renderer;
s(t.points,function(e){
var i=e.graphic,s=e.shapeArgs,o=s.d,l=r(n.dial,e.dial);
i?(i.animate(s),s.d=o):e.graphic=a[e.shapeType](s).attr({
stroke:l.borderColor||"none",
"stroke-width":l.borderWidth||0,
fill:l.backgroundColor||"black",
rotation:s.rotation,
zIndex:1
}).add(t.group);
}),i?i.animate({
translateX:e[0],
translateY:e[1]
}):t.pivot=a.circle(0,0,l(o.radius,5)).attr({
"stroke-width":o.borderWidth||0,
stroke:o.borderColor||"silver",
fill:o.backgroundColor||"black",
zIndex:2
}).translate(e[0],e[1]).add(t.group);
},
animate:function(t){
var e=this;
t||(s(e.points,function(t){
var i=t.graphic;
i&&(i.attr({
rotation:180*e.yAxis.startAngleRad/Math.PI
}),i.animate({
rotation:t.shapeArgs.rotation
},e.options.animation));
}),e.animate=null);
},
render:function(){
this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup),
k.prototype.render.call(this),this.group.clip(this.chart.clipRect);
},
setData:function(t,e){
k.prototype.setData.call(this,t,!1),this.processData(),this.generatePoints(),l(e,!0)&&this.chart.redraw();
},
drawTracker:b&&b.drawTrackerPoint
},d.gauge=p(d.line,b),c.boxplot=r(c.column,{
fillColor:"#FFFFFF",
lineWidth:1,
medianWidth:2,
states:{
hover:{
brightness:-.3
}
},
threshold:null,
tooltip:{
pointFormat:'<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'
},
whiskerLength:"50%",
whiskerWidth:2
}),d.boxplot=p(d.column,{
type:"boxplot",
pointArrayMap:["low","q1","median","q3","high"],
toYData:function(t){
return[t.low,t.q1,t.median,t.q3,t.high];
},
pointValKey:"high",
pointAttrToOptions:{
fill:"fillColor",
stroke:"color",
"stroke-width":"lineWidth"
},
drawDataLabels:L,
translate:function(){
var t=this.yAxis,e=this.pointArrayMap;
d.column.prototype.translate.apply(this),s(this.points,function(i){
s(e,function(e){
null!==i[e]&&(i[e+"Plot"]=t.translate(i[e],0,1,0,1));
});
});
},
drawPoints:function(){
var t,e,i,n,o,r,a,h,c,d,p,u,g,f,m,y,x,v,b,k,w,T,P,L=this,M=L.options,C=L.chart.renderer,I=L.doQuartiles!==!1,O=L.options.whiskerLength;
s(L.points,function(s){
c=s.graphic,w=s.shapeArgs,p={},f={},y={},T=s.color||L.color,void 0!==s.plotY&&(t=s.pointAttr[s.selected?"selected":""],
x=w.width,v=S(w.x),b=v+x,k=A(x/2),e=S(I?s.q1Plot:s.lowPlot),i=S(I?s.q3Plot:s.lowPlot),
n=S(s.highPlot),o=S(s.lowPlot),p.stroke=s.stemColor||M.stemColor||T,p["stroke-width"]=l(s.stemWidth,M.stemWidth,M.lineWidth),
p.dashstyle=s.stemDashStyle||M.stemDashStyle,f.stroke=s.whiskerColor||M.whiskerColor||T,
f["stroke-width"]=l(s.whiskerWidth,M.whiskerWidth,M.lineWidth),y.stroke=s.medianColor||M.medianColor||T,
y["stroke-width"]=l(s.medianWidth,M.medianWidth,M.lineWidth),a=p["stroke-width"]%2/2,
h=v+k+a,d=["M",h,i,"L",h,n,"M",h,e,"L",h,o],I&&(a=t["stroke-width"]%2/2,h=S(h)+a,
e=S(e)+a,i=S(i)+a,v+=a,b+=a,u=["M",v,i,"L",v,e,"L",b,e,"L",b,i,"L",v,i,"z"]),O&&(a=f["stroke-width"]%2/2,
n+=a,o+=a,P=/%$/.test(O)?k*parseFloat(O)/100:O/2,g=["M",h-P,n,"L",h+P,n,"M",h-P,o,"L",h+P,o]),
a=y["stroke-width"]%2/2,r=A(s.medianPlot)+a,m=["M",v,r,"L",b,r],c?(s.stem.animate({
d:d
}),O&&s.whiskers.animate({
d:g
}),I&&s.box.animate({
d:u
}),s.medianShape.animate({
d:m
})):(s.graphic=c=C.g().add(L.group),s.stem=C.path(d).attr(p).add(c),O&&(s.whiskers=C.path(g).attr(f).add(c)),
I&&(s.box=C.path(u).attr(t).add(c)),s.medianShape=C.path(m).attr(y).add(c)));
});
},
setStackedPoints:L
}),c.errorbar=r(c.boxplot,{
color:"#000000",
grouping:!1,
linkedTo:":previous",
tooltip:{
pointFormat:'<span style="color:{point.color}">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
},
whiskerWidth:null
}),d.errorbar=p(d.boxplot,{
type:"errorbar",
pointArrayMap:["low","high"],
toYData:function(t){
return[t.low,t.high];
},
pointValKey:"high",
doQuartiles:!1,
drawDataLabels:d.arearange?d.arearange.prototype.drawDataLabels:L,
getColumnMetrics:function(){
return this.linkedParent&&this.linkedParent.columnMetrics||d.column.prototype.getColumnMetrics.call(this);
}
}),c.waterfall=r(c.column,{
lineWidth:1,
lineColor:"#333",
dashStyle:"dot",
borderColor:"#333",
dataLabels:{
inside:!0
},
states:{
hover:{
lineWidthPlus:0
}
}
}),d.waterfall=p(d.column,{
type:"waterfall",
upColorProp:"fill",
pointValKey:"y",
translate:function(){
var t,e,i,n,s,o,r,a,h,c=this.options,p=this.yAxis,u=l(c.minPointLength,5),g=c.threshold,f=c.stacking;
for(d.column.prototype.translate.apply(this),this.minPointLengthOffset=0,r=a=g,e=this.points,
t=0,c=e.length;c>t;t++)i=e[t],o=this.processedYData[t],n=i.shapeArgs,h=(s=f&&p.stacks[(this.negStacks&&g>o?"-":"")+this.stackKey])?s[i.x].points[this.index+","+t]:[0,o],
i.isSum?i.y=o:i.isIntermediateSum&&(i.y=o-a),s=T(r,r+i.y)+h[0],n.y=p.translate(s,0,1),
i.isSum?(n.y=p.translate(h[1],0,1),n.height=Math.min(p.translate(h[0],0,1),p.len)-n.y+this.minPointLengthOffset):i.isIntermediateSum?(n.y=p.translate(h[1],0,1),
n.height=Math.min(p.translate(a,0,1),p.len)-n.y+this.minPointLengthOffset,a=h[1]):(0!==r&&(n.height=o>0?p.translate(r,0,1)-n.y:p.translate(r,0,1)-p.translate(r-o,0,1)),
r+=o),n.height<0&&(n.y+=n.height,n.height*=-1),i.plotY=n.y=A(n.y)-this.borderWidth%2/2,
n.height=T(A(n.height),.001),i.yBottom=n.y+n.height,n.height<=u&&(n.height=u,this.minPointLengthOffset+=u),
n.y-=this.minPointLengthOffset,n=i.plotY+(i.negative?n.height:0)-this.minPointLengthOffset,
this.chart.inverted?i.tooltipPos[0]=p.len-n:i.tooltipPos[1]=n;
},
processData:function(t){
var e,i,n,s,o,r,a,l=this.yData,h=this.options.data,c=l.length;
for(n=i=s=o=this.options.threshold||0,a=0;c>a;a++)r=l[a],e=h&&h[a]?h[a]:{},"sum"===r||e.isSum?l[a]=n:"intermediateSum"===r||e.isIntermediateSum?l[a]=i:(n+=r,
i+=r),s=Math.min(n,s),o=Math.max(n,o);
k.prototype.processData.call(this,t),this.dataMin=s,this.dataMax=o;
},
toYData:function(t){
return t.isSum?0===t.x?null:"sum":t.isIntermediateSum?0===t.x?null:"intermediateSum":t.y;
},
getAttribs:function(){
d.column.prototype.getAttribs.apply(this,arguments);
var e=this,i=e.options,n=i.states,o=i.upColor||e.color,i=t.Color(o).brighten(.1).get(),a=r(e.pointAttr),l=e.upColorProp;
a[""][l]=o,a.hover[l]=n.hover.upColor||i,a.select[l]=n.select.upColor||o,s(e.points,function(t){
t.options.color||(t.y>0?(t.pointAttr=a,t.color=o):t.pointAttr=e.pointAttr);
});
},
getGraphPath:function(){
var t,e,i,n=this.data,s=n.length,o=A(this.options.lineWidth+this.borderWidth)%2/2,r=[];
for(i=1;s>i;i++)e=n[i].shapeArgs,t=n[i-1].shapeArgs,e=["M",t.x+t.width,t.y+o,"L",e.x,t.y+o],
n[i-1].y<0&&(e[2]+=t.height,e[5]+=t.height),r=r.concat(e);
return r;
},
getExtremes:L,
drawGraph:k.prototype.drawGraph
}),c.polygon=r(c.scatter,{
marker:{
enabled:!1
}
}),d.polygon=p(d.scatter,{
type:"polygon",
fillGraph:!0,
getSegmentPath:function(t){
return k.prototype.getSegmentPath.call(this,t).concat("z");
},
drawGraph:k.prototype.drawGraph,
drawLegendSymbol:t.LegendSymbolMixin.drawRectangle
}),c.bubble=r(c.scatter,{
dataLabels:{
formatter:function(){
return this.point.z;
},
inside:!0,
verticalAlign:"middle"
},
marker:{
lineColor:null,
lineWidth:1
},
minSize:8,
maxSize:"20%",
softThreshold:!1,
states:{
hover:{
halo:{
size:5
}
}
},
tooltip:{
pointFormat:"({point.x}, {point.y}), Size: {point.z}"
},
turboThreshold:0,
zThreshold:0,
zoneAxis:"z"
}),b=p(y,{
haloPath:function(){
return y.prototype.haloPath.call(this,this.shapeArgs.r+this.series.options.states.hover.halo.size);
},
ttBelow:!1
}),d.bubble=p(d.scatter,{
type:"bubble",
pointClass:b,
pointArrayMap:["y","z"],
parallelArrays:["x","y","z"],
trackerGroups:["group","dataLabelsGroup"],
bubblePadding:!0,
zoneAxis:"z",
pointAttrToOptions:{
stroke:"lineColor",
"stroke-width":"lineWidth",
fill:"fillColor"
},
applyOpacity:function(t){
var e=this.options.marker,i=l(e.fillOpacity,.5),t=t||e.fillColor||this.color;
return 1!==i&&(t=P(t).setOpacity(i).get("rgba")),t;
},
convertAttribs:function(){
var t=k.prototype.convertAttribs.apply(this,arguments);
return t.fill=this.applyOpacity(t.fill),t;
},
getRadii:function(t,e,i,n){
var s,o,r,a=this.zData,l=[],h=this.options,c="width"!==h.sizeBy,d=h.zThreshold,p=e-t;
for(o=0,s=a.length;s>o;o++)r=a[o],h.sizeByAbsoluteValue&&null!==r&&(r=Math.abs(r-d),
e=Math.max(e-d,Math.abs(t-d)),t=0),null===r?r=null:t>r?r=i/2-1:(r=p>0?(r-t)/p:.5,
c&&r>=0&&(r=Math.sqrt(r)),r=w.ceil(i+r*(n-i))/2),l.push(r);
this.radii=l;
},
animate:function(t){
var e=this.options.animation;
t||(s(this.points,function(t){
var i=t.graphic,t=t.shapeArgs;
i&&t&&(i.attr("r",1),i.animate({
r:t.r
},e));
}),this.animate=null);
},
translate:function(){
var t,e,i,n=this.data,s=this.radii;
for(d.scatter.prototype.translate.call(this),t=n.length;t--;)e=n[t],i=s?s[t]:0,"number"==typeof i&&i>=this.minPxSize/2?(e.shapeType="circle",
e.shapeArgs={
x:e.plotX,
y:e.plotY,
r:i
},e.dlBox={
x:e.plotX-i,
y:e.plotY-i,
width:2*i,
height:2*i
}):e.shapeArgs=e.plotY=e.dlBox=void 0;
},
drawLegendSymbol:function(t,e){
var i=this.chart.renderer,n=i.fontMetrics(t.itemStyle.fontSize).f/2;
e.legendSymbol=i.circle(n,t.baseline-n,n).attr({
zIndex:3
}).add(e.legendGroup),e.legendSymbol.isMarker=!0;
},
drawPoints:d.column.prototype.drawPoints,
alignDataLabel:d.column.prototype.alignDataLabel,
buildKDTree:L,
applyZones:L
}),f.prototype.beforePadding=function(){
var t=this,e=this.len,o=this.chart,r=0,a=e,c=this.isXAxis,d=c?"xData":"yData",p=this.min,u={},g=w.min(o.plotWidth,o.plotHeight),f=Number.MAX_VALUE,m=-Number.MAX_VALUE,y=this.max-p,x=e/y,v=[];
s(this.series,function(e){
var r=e.options;
!e.bubblePadding||!e.visible&&o.options.chart.ignoreHiddenSeries||(t.allowZoomOutside=!0,
v.push(e),c&&(s(["minSize","maxSize"],function(t){
var e=r[t],i=/%$/.test(e),e=h(e);
u[t]=i?g*e/100:e;
}),e.minPxSize=u.minSize,e.maxPxSize=u.maxSize,e=e.zData,e.length&&(f=l(r.zMin,w.min(f,w.max(i(e),r.displayNegative===!1?r.zThreshold:-Number.MAX_VALUE))),
m=l(r.zMax,w.max(m,n(e))))));
}),s(v,function(t){
var e,i=t[d],n=i.length;
if(c&&t.getRadii(f,m,t.minPxSize,t.maxPxSize),y>0)for(;n--;)"number"==typeof i[n]&&(e=t.radii[n],
r=Math.min((i[n]-p)*x-e,r),a=Math.max((i[n]-p)*x+e,a));
}),v.length&&y>0&&!this.isLog&&(a-=e,x*=(e+r-a)/e,s([["min","userMin",r],["max","userMax",a]],function(e){
void 0===l(t.options[e[0]],t[e[1]])&&(t[e[0]]+=e[2]/x);
}));
},function(){
function t(t,e){
var i=this.chart,n=this.options.animation,s=this.group,o=this.markerGroup,r=this.xAxis.center,a=i.plotLeft,l=i.plotTop;
i.polar?i.renderer.isSVG&&(n===!0&&(n={}),e?(i={
translateX:r[0]+a,
translateY:r[1]+l,
scaleX:.001,
scaleY:.001
},s.attr(i),o&&o.attr(i)):(i={
translateX:a,
translateY:l,
scaleX:1,
scaleY:1
},s.animate(i,n),o&&o.animate(i,n),this.animate=null)):t.call(this,e);
}
var e,i=k.prototype,n=x.prototype;
i.searchPointByAngle=function(t){
var e=this.chart,i=this.xAxis.pane.center;
return this.searchKDTree({
clientX:180+Math.atan2(t.chartX-i[0]-e.plotLeft,t.chartY-i[1]-e.plotTop)*(-180/Math.PI)
});
},g(i,"buildKDTree",function(t){
this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.kdDimensions=2),
t.apply(this);
}),i.toXY=function(t){
var e,i=this.chart,n=t.plotX;
e=t.plotY,t.rectPlotX=n,t.rectPlotY=e,e=this.xAxis.postTranslate(t.plotX,this.yAxis.len-e),
t.plotX=t.polarPlotX=e.x-i.plotLeft,t.plotY=t.polarPlotY=e.y-i.plotTop,this.kdByAngle?(i=(n/Math.PI*180+this.xAxis.pane.options.startAngle)%360,
0>i&&(i+=360),t.clientX=i):t.clientX=t.plotX;
},d.spline&&g(d.spline.prototype,"getPointSpline",function(t,e,i,n){
var s,o,r,a,l,h,c;
return this.chart.polar?(s=i.plotX,o=i.plotY,t=e[n-1],r=e[n+1],this.connectEnds&&(t||(t=e[e.length-2]),
r||(r=e[1])),t&&r&&(a=t.plotX,l=t.plotY,e=r.plotX,h=r.plotY,a=(1.5*s+a)/2.5,l=(1.5*o+l)/2.5,
r=(1.5*s+e)/2.5,c=(1.5*o+h)/2.5,e=Math.sqrt(Math.pow(a-s,2)+Math.pow(l-o,2)),h=Math.sqrt(Math.pow(r-s,2)+Math.pow(c-o,2)),
a=Math.atan2(l-o,a-s),l=Math.atan2(c-o,r-s),c=Math.PI/2+(a+l)/2,Math.abs(a-c)>Math.PI/2&&(c-=Math.PI),
a=s+Math.cos(c)*e,l=o+Math.sin(c)*e,r=s+Math.cos(Math.PI+c)*h,c=o+Math.sin(Math.PI+c)*h,
i.rightContX=r,i.rightContY=c),n?(i=["C",t.rightContX||t.plotX,t.rightContY||t.plotY,a||s,l||o,s,o],
t.rightContX=t.rightContY=null):i=["M",s,o]):i=t.call(this,e,i,n),i;
}),g(i,"translate",function(t){
var e=this.chart;
if(t.call(this),e.polar&&(this.kdByAngle=e.tooltip&&e.tooltip.shared,!this.preventPostTranslate))for(t=this.points,
e=t.length;e--;)this.toXY(t[e]);
}),g(i,"getGraphPath",function(t,e){
var i=this;
return this.chart.polar&&(e=e||this.points,this.options.connectEnds!==!1&&null!==e[0].y&&(this.connectEnds=!0,
e.splice(e.length,0,e[0])),s(e,function(t){
void 0===t.polarPlotY&&i.toXY(t);
})),t.apply(this,[].slice.call(arguments,1));
}),g(i,"animate",t),d.column&&(e=d.column.prototype,g(e,"animate",t),g(e,"translate",function(t){
var e,i,n=this.xAxis,s=this.yAxis.len,o=n.center,r=n.startAngleRad,a=this.chart.renderer;
if(this.preventPostTranslate=!0,t.call(this),n.isRadial)for(n=this.points,i=n.length;i--;)e=n[i],
t=e.barX+r,e.shapeType="path",e.shapeArgs={
d:a.symbols.arc(o[0],o[1],s-e.plotY,null,{
start:t,
end:t+e.pointWidth,
innerR:s-l(e.yBottom,s)
})
},this.toXY(e),e.tooltipPos=[e.plotX,e.plotY],e.ttBelow=e.plotY>o[1];
}),g(e,"alignDataLabel",function(t,e,n,s,o,r){
this.chart.polar?(t=e.rectPlotX/Math.PI*180,null===s.align&&(s.align=t>20&&160>t?"left":t>200&&340>t?"right":"center"),
null===s.verticalAlign&&(s.verticalAlign=45>t||t>315?"bottom":t>135&&225>t?"top":"middle"),
i.alignDataLabel.call(this,e,n,s,o,r)):t.call(this,e,n,s,o,r);
})),g(n,"getCoordinates",function(t,e){
var i=this.chart,n={
xAxis:[],
yAxis:[]
};
return i.polar?s(i.axes,function(t){
var s=t.isXAxis,o=t.center,r=e.chartX-o[0]-i.plotLeft,o=e.chartY-o[1]-i.plotTop;
n[s?"xAxis":"yAxis"].push({
axis:t,
value:t.translate(s?Math.PI-Math.atan2(r,o):Math.sqrt(Math.pow(r,2)+Math.pow(o,2)),!0)
});
}):n=t.call(this,e),n;
});
}();
}),window.Highcharts=n,s;
});