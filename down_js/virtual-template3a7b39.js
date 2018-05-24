define("biz_common/virtual-template.js",[],function(){
return function e(t,n,r){
function i(s,a){
if(!n[s]){
if(!t[s]){
var u="function"==typeof require2&&require2;
if(!a&&u)return u(s,!0);
if(o)return o(s,!0);
var c=new Error("Cannot find module '"+s+"'");
throw c.code="MODULE_NOT_FOUND",c;
}
var l=n[s]={
exports:{}
};
t[s][0].call(l.exports,function(e){
var n=t[s][1][e];
return i(n?n:e);
},l,l.exports,e,t,n,r);
}
return n[s].exports;
}
for(var o="function"==typeof require2&&require2,s=0;s<r.length;s++)i(r[s]);
return i;
}({
1:[function(e,t){
function n(){
c=!1,s.length?u=s.concat(u):l=-1,u.length&&r();
}
function r(){
if(!c){
var e=setTimeout(n);
c=!0;
for(var t=u.length;t;){
for(s=u,u=[];++l<t;)s&&s[l].run();
l=-1,t=u.length;
}
s=null,c=!1,clearTimeout(e);
}
}
function i(e,t){
this.fun=e,this.array=t;
}
function o(){}
var s,a=t.exports={},u=[],c=!1,l=-1;
a.nextTick=function(e){
var t=new Array(arguments.length-1);
if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];
u.push(new i(e,t)),1!==u.length||c||setTimeout(r,0);
},i.prototype.run=function(){
this.fun.apply(null,this.array);
},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=o,
a.addListener=o,a.once=o,a.off=o,a.removeListener=o,a.removeAllListeners=o,a.emit=o,
a.binding=function(){
throw new Error("process.binding is not supported");
},a.cwd=function(){
return"/";
},a.chdir=function(){
throw new Error("process.chdir is not supported");
},a.umask=function(){
return 0;
};
},{}],
2:[function(e){
window.vTemplate=e("./lib/virtual-template");
},{
"./lib/virtual-template":5
}],
3:[function(e,t){
(function(n){
function r(e){
var t=document.createElement("div");
return t.innerHTML=e,t=1===t.childNodes.length?t.childNodes[0]:t,{
vdom:i(t),
dom:t
};
}
function i(e){
for(var t=e.tagName.toLowerCase(),n=o(e),r=[],s=0,u=e.childNodes.length;u>s;s++){
var c=e.childNodes[s];
r.push(3===c.nodeType?c.nodeValue?c.nodeValue:c.textContent:i(c));
}
return a(t,n,r);
}
function o(e){
for(var t=e.attributes,n={},r=0,i=t.length;i>r;r++){
var o=t[r].name,s=t[r].value;
s&&"null"!==s&&(n[o]=s);
}
return e.style.cssText&&(n.style=e.style.cssText),n;
}
var s=e("simple-virtual-dom"),a=s.el;
n.env.NODE_ENV&&(r.toVirtualDOM=i),t.exports=r;
}).call(this,e("_process"));
},{
_process:1,
"simple-virtual-dom":6
}],
4:[function(e,t){
(function(e){
var n={};
if(n.extend=function(e,t){
for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);
return e;
},e.env.NODE_ENV)n.nextTick=e.nextTick;else{
var r=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;
n.nextTick=r?function(){
r.apply(window,arguments);
}:function(e){
setTimeout(e);
};
}
t.exports=n;
}).call(this,e("_process"));
},{
_process:1
}],
5:[function(e,t){
function n(e){
function t(e){
this.data=e;
var t=this.makeVirtualDOM();
this.vdom=t.vdom,this.dom=t.dom,this.isDirty=!1,this.flushCallbacks=[];
}
return s.extend(t.prototype,{
compileFn:e,
setData:r,
makeVirtualDOM:o,
flush:i
}),t;
}
function r(e,t){
if(s.extend(this.data,e),"boolean"==typeof t&&t)this.flush();else if(!this.isDirty){
this.isDirty=!0;
var n=this;
s.nextTick(function(){
n.flush();
});
}
if("function"==typeof t){
var r=t;
this.flushCallbacks.push(r);
}
}
function i(){
var e=this.makeVirtualDOM().vdom,t=c(this.vdom,e);
l(this.dom,t),this.vdom=e,this.isDirty=!1;
for(var n=this.flushCallbacks,r=0,i=n.length;i>r;r++)n[r]&&n[r]();
this.flushCallbacks=[];
}
function o(){
var e=this.compileFn(this.data);
return a(e);
}
var s=e("./utils"),a=e("./h2v"),u=e("simple-virtual-dom"),c=u.diff,l=u.patch;
t.exports=function(e,t){
var r=n(e);
return t?new r(t):r;
};
},{
"./h2v":3,
"./utils":4,
"simple-virtual-dom":6
}],
6:[function(e,t,n){
n.el=e("./lib/element"),n.diff=e("./lib/diff"),n.patch=e("./lib/patch");
},{
"./lib/diff":7,
"./lib/element":8,
"./lib/patch":9
}],
7:[function(e,t){
function n(e,t){
var n=0,i={};
return r(e,t,n,i),i;
}
function r(e,t,n,r){
var c=[];
if(null===t);else if(a.isString(e)&&a.isString(t))t!==e&&c.push({
type:u.TEXT,
content:t
});else if(e.tagName===t.tagName&&e.key===t.key){
var l=o(e,t);
l&&c.push({
type:u.PROPS,
props:l
}),s(t)||i(e.children,t.children,n,r,c);
}else c.push({
type:u.REPLACE,
node:t
});
c.length&&(r[n]=c);
}
function i(e,t,n,i,o){
var s=c(e,t,"key");
if(t=s.children,s.moves.length){
var l={
type:u.REORDER,
moves:s.moves
};
o.push(l);
}
var f=null,h=n;
a.each(e,function(e,n){
var o=t[n];
h=f&&f.count?h+f.count+1:h+1,r(e,o,h,i),f=e;
});
}
function o(e,t){
var n,r,i=0,o=e.props,s=t.props,a={};
for(n in o)r=o[n],s[n]!==r&&(i++,a[n]=s[n]);
for(n in s)r=s[n],o.hasOwnProperty(n)||(i++,a[n]=s[n]);
return 0===i?null:a;
}
function s(e){
return e.props&&e.props.hasOwnProperty("ignore");
}
var a=e("./util"),u=e("./patch"),c=e("list-diff2");
t.exports=n;
},{
"./patch":9,
"./util":10,
"list-diff2":11
}],
8:[function(e,t){
function n(e,t,i){
if(!(this instanceof n))return new n(e,t,i);
r.isArray(t)&&(i=t,t={}),this.tagName=e,this.props=t||{},this.children=i||[],this.key=t?t.key:void 0;
var o=0;
r.each(this.children,function(e,t){
e instanceof n?o+=e.count:i[t]=""+e,o++;
}),this.count=o;
}
var r=e("./util");
n.prototype.render=function(){
var e=document.createElement(this.tagName),t=this.props;
for(var i in t){
var o=t[i];
r.setAttr(e,i,o);
}
return r.each(this.children,function(t){
var r=t instanceof n?t.render():document.createTextNode(t);
e.appendChild(r);
}),e;
},t.exports=n;
},{
"./util":10
}],
9:[function(e,t){
function n(e,t){
var n={
index:0
};
r(e,n,t);
}
function r(e,t,n){
for(var o=n[t.index],s=e.childNodes?e.childNodes.length:0,a=0;s>a;a++){
var u=e.childNodes[a];
t.index++,r(u,t,n);
}
o&&i(e,o);
}
function i(e,t){
a.each(t,function(t){
switch(t.type){
case u:
var n="string"==typeof t.node?document.createTextNode(t.node):t.node.render();
e.parentNode.replaceChild(n,e);
break;

case c:
s(e,t.moves);
break;

case l:
o(e,t.props);
break;

case f:
e.textContent?e.textContent=t.content:e.nodeValue=t.content;
break;

default:
throw new Error("Unknown patch type "+t.type);
}
});
}
function o(e,t){
for(var n in t)if(void 0===t[n])e.removeAttribute(n);else{
var r=t[n];
a.setAttr(e,n,r);
}
}
function s(e,t){
var n=a.toArray(e.childNodes),r={};
a.each(n,function(e){
if(1===e.nodeType){
var t=e.getAttribute("key");
t&&(r[t]=e);
}
}),a.each(t,function(t){
var i=t.index;
if(0===t.type)n[i]===e.childNodes[i]&&e.removeChild(e.childNodes[i]),n.splice(i,1);else if(1===t.type){
var o=r[t.item.key]?r[t.item.key]:"object"==typeof t.item?t.item.render():document.createTextNode(t.item);
n.splice(i,0,o),e.insertBefore(o,e.childNodes[i]||null);
}
});
}
var a=e("./util"),u=0,c=1,l=2,f=3;
n.REPLACE=u,n.REORDER=c,n.PROPS=l,n.TEXT=f,t.exports=n;
},{
"./util":10
}],
10:[function(e,t,n){
var r=n;
r.type=function(e){
return Object.prototype.toString.call(e).replace(/\[object\s|\]/g,"");
},r.isArray=function(e){
return"Array"===r.type(e);
},r.isString=function(e){
return"String"===r.type(e);
},r.each=function(e,t){
for(var n=0,r=e.length;r>n;n++)t(e[n],n);
},r.toArray=function(e){
if(!e)return[];
for(var t=[],n=0,r=e.length;r>n;n++)t.push(e[n]);
return t;
},r.setAttr=function(e,t,n){
switch(t){
case"style":
e.style.cssText=n;
break;

case"value":
var r=e.tagName||"";
r=r.toLowerCase(),"input"===r||"textarea"===r?e.value=n:e.setAttribute(t,n);
break;

default:
e.setAttribute(t,n);
}
};
},{}],
11:[function(e,t){
t.exports=e("./lib/diff").diff;
},{
"./lib/diff":12
}],
12:[function(e,t,n){
function r(e,t,n){
function r(e){
var t={
index:e,
type:0
};
v.push(t);
}
function s(e,t){
var n={
index:e,
item:t,
type:1
};
v.push(n);
}
function a(e){
b.splice(e,1);
}
for(var u,c,l=i(e,n),f=i(t,n),h=f.free,d=l.keyIndex,p=f.keyIndex,v=[],m=[],y=0,g=0;y<e.length;){
if(u=e[y],c=o(u,n))if(p.hasOwnProperty(c)){
var w=p[c];
m.push(t[w]);
}else m.push(null);else{
var x=h[g++];
m.push(x||null);
}
y++;
}
var b=m.slice(0);
for(y=0;y<b.length;)null===b[y]?(r(y),a(y)):y++;
for(var k=y=0;y<t.length;){
u=t[y],c=o(u,n);
var N=b[k],T=o(N,n);
if(N)if(c===T)k++;else if(d.hasOwnProperty(c)){
var A=o(b[k+1],n);
A===c?(r(y),a(k),k++):s(y,u);
}else s(y,u);else s(y,u);
y++;
}
return{
moves:v,
children:m
};
}
function i(e,t){
for(var n={},r=[],i=0,s=e.length;s>i;i++){
var a=e[i],u=o(a,t);
u?n[u]=i:r.push(a);
}
return{
keyIndex:n,
free:r
};
}
function o(e,t){
return e&&t?"string"==typeof t?e[t]:t(e):void 0;
}
n.makeKeyIndexAndFree=i,n.diff=r;
},{}]
},{},[2]),vTemplate;
});