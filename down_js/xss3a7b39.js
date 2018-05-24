define("biz_common/xss.js",[],function(t,e,i){
function s(t,e,i){
if("href"===e||"src"===e){
if(p.lastIndex=0,p.test(i))return"#";
if(v.lastIndex=0,v.test(i))return"#";
}else if("style"===e){
if(m.lastIndex=0,m.test(i))return"#";
if(w.lastIndex=0,w.test(i))return"";
}
}
function r(t,e){
return n(e);
}
function n(t){
return t.replace(f,"&lt;").replace(u,"&gt;");
}
function o(t,e){
return String.fromCharCode(parseInt(e));
}
function a(t){
"use strict";
this.options=t=t||{},this.whiteList=t.whiteList||e.whiteList,this.onTagAttr=t.onTagAttr||e.onTagAttr,
this.onIgnoreTag=t.onIgnoreTag||e.onIgnoreTag;
}
function l(t,e){
var i=new a(e);
return i.process(t);
}
var c={
h1:[],
h2:[],
h3:[],
h4:[],
h5:[],
h6:[],
hr:[],
span:[],
strong:[],
b:[],
i:[],
br:[],
p:[],
pre:[],
code:[],
a:["target","href","title"],
img:["src","alt","title","class"],
div:[],
table:["width","border"],
tr:[],
td:["width","colspan"],
th:["width","colspan"],
tbody:[],
ul:[],
li:[],
ol:[],
dl:[],
dt:[],
em:[],
cite:[],
section:[],
header:[],
footer:[],
blockquote:[],
audio:["autoplay","controls","loop","preload","src"],
video:["autoplay","controls","loop","preload","src","height","width"]
},f=/</g,u=/>/g,h=/"/g,g=/[^a-zA-Z0-9_:\.\-]/gim,d=/&#([a-zA-Z0-9]*);?/gim,p=/\/\*|\*\//gm,v=/^[\s"'`]*((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi,m=/\/\*|\*\//gm,w=/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi;
a.prototype.filterAttributes=function(t,e){
"use strict";
t=t.toLowerCase();
for(var i=this,s=this.whiteList[t],r=0,n="",a=!1,l=!1,c=function(e,r){
if(e=e.trim(),!l&&"/"===e)return void(l=!0);
if(e=e.replace(g,"").toLowerCase(),!(e.length<1)&&-1!==s.indexOf(e)){
if(r){
r=r.trim().replace(h,"&quote;"),r=r.replace(d,o);
for(var a="",c=0,f=r.length;f>c;c++)a+=r.charCodeAt(c)<32?" ":r.charAt(c);
r=a.trim();
var u=i.onTagAttr(t,e,r);
"undefined"!=typeof u&&(r=u);
}
n+=e+(r?'="'+r+'"':"")+" ";
}
},f=0,u=e.length;u>f;f++){
var p=e.charAt(f);
if(a!==!1||"="!==p)if(a===!1||f!==r||'"'!==p&&"'"!==p)if(" "!==p);else{
var v=e.slice(r,f).trim();
a===!1?c(v):c(a,v),a=!1,r=f+1;
}else{
var m=e.indexOf(p,f+1);
if(-1===m)break;
var v=e.slice(r+1,m).trim();
c(a,v),a=!1,f=m,r=f+1;
}else a=e.slice(r,f),r=f+1;
}
return r<e.length&&(a===!1?c(e.slice(r)):c(a,e.slice(r))),l&&(n+="/"),n.trim();
},a.prototype.addNewTag=function(t,e,i){
"use strict";
var s="",r="</"===t.slice(0,2)?2:1,o=t.indexOf(" ");
if(-1===o)var a=t.slice(r,t.length-1).trim();else var a=t.slice(r,o+1).trim();
if(a=a.toLowerCase(),a in this.whiteList)if(-1===o)s+=t.slice(0,r)+a+">";else{
var l=this.filterAttributes(a,t.slice(o+1,t.length-1).trim());
s+=t.slice(0,r)+a+(l.length>0?" "+l:"")+">";
}else{
var c={
isClosing:2===r,
position:i,
originalPosition:e-t.length+1
},f=this.onIgnoreTag(a,t,c);
"undefined"==typeof f&&(f=n(t)),s+=f;
}
return s;
},a.prototype.process=function(t){
"use strict";
for(var e="",i=0,s=!1,r=!1,o=0,o=0,a=t.length;a>o;o++){
var l=t.charAt(o);
if(s===!1){
if("<"===l){
s=o;
continue;
}
}else if(r===!1){
if("<"===l){
e+=n(t.slice(i,o)),s=o,i=o;
continue;
}
if(">"===l){
e+=n(t.slice(i,s)),e+=this.addNewTag(t.slice(s,o+1),o,e.length),i=o+1,s=!1;
continue;
}
if('"'===l||"'"===l){
r=l;
continue;
}
}else if(l===r){
r=!1;
continue;
}
}
return i<t.length&&(e+=n(t.substr(i))),e;
},e=i.exports=l,e.FilterXSS=a,e.whiteList=c,e.onTagAttr=s,e.onIgnoreTag=r,e.utils={
tagFilter:function(t,e){
"function"!=typeof e&&(e=function(){});
var i=[],s=!1;
return{
onIgnoreTag:function(r,n,o){
if(-1!==t.indexOf(r)){
var a="[removed]";
if(s!==!1&&o.isClosing){
var l=o.position+a.length;
i.push([s,l]),s=!1;
}else s=o.position;
return a;
}
return e(r,n,o);
},
filter:function(t){
var e="",s=0;
return i.forEach(function(i){
e+=t.slice(s,i[0]),s=i[1];
}),e+=t.slice(s);
}
};
}
};
});