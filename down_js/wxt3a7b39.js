define("common/wx/wxt.js",["biz_web/lib/json.js"],function(e){
"use strict";
e("biz_web/lib/json.js");
var n=function(e,r){
return n["object"==typeof r?"render":"compile"].apply(n,arguments);
};
return function(e,n){
e.version="2.0.1",e.openTag="<#",e.closeTag="#>",e.isEscape=!1,e.isCompress=!1,e.parser=null,
e.render=function(e,n){
var r=t(e);
return void 0===r?o({
id:e,
name:"Render Error",
message:"No Template"
}):r(n);
},e.compile=function(n,t){
function a(r){
try{
return new l(r)+"";
}catch(i){
return u?(i.id=n||t,i.name="Render Error",i.source=t,o(i)):e.compile(n,t,!0)(r);
}
}
var c=arguments,u=c[2],s="anonymous";
"string"!=typeof t&&(u=c[1],t=c[0],n=s);
try{
var l=i(t,u);
}catch(p){
return p.id=n||t,p.name="Syntax Error",o(p);
}
return a.prototype=l.prototype,a.toString=function(){
return l.toString();
},n!==s&&(r[n]=a),a;
},e.helper=function(n,r){
e.prototype[n]=r;
},e.onerror=function(e){
var r="[template]:\n"+e.id+"\n\n[name]:\n"+e.name;
e.message&&(r+="\n\n[message]:\n"+e.message),e.line&&(r+="\n\n[line]:\n"+e.line,
r+="\n\n[source]:\n"+e.source.split(/\n/)[e.line-1].replace(/^[\s\t]+/,"")),e.temp&&(r+="\n\n[temp]:\n"+e.temp),
n.console&&console.error(r);
};
var r={},t=function(t){
var o=r[t];
if(void 0===o&&"document"in n){
var i=document.getElementById(t);
if(i){
var a=i.value||i.innerHTML;
return e.compile(t,a.replace(/^\s*|\s*$/g,""));
}
}else if(r.hasOwnProperty(t))return o;
},o=function(n){
function r(){
return r+"";
}
return e.onerror(n),r.toString=function(){
return"{Template Error}";
},r;
},i=function(){
e.prototype={
$render:e.render,
$escape:function(e){
return"string"==typeof e?e.replace(/&(?![\w#]+;)|[<>"']/g,function(e){
return{
"<":"&#60;",
">":"&#62;",
'"':"&#34;",
"'":"&#39;",
"&":"&#38;"
}[e];
}):e;
},
$string:function(e){
return"string"==typeof e||"number"==typeof e||"boolean"==typeof e?e:"function"==typeof e?e():JSON.stringify2(e);
}
};
var n=Array.prototype.forEach||function(e,n){
for(var r=this.length>>>0,t=0;r>t;t++)t in this&&e.call(n,this[t],t,this);
},r=function(e,r){
n.call(e,r);
},t="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",o=/\/\*(?:.|\n)*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|'[^']*'|"[^"]*"|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,i=/[^\w$\u4e00-\u9fa5]+/g,a=new RegExp(["\\b"+t.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),c=/\b\d[^,]*/g,u=/^,+|,+$/g,s=function(e){
return e=e.replace(o,"").replace(i,",").replace(a,"").replace(c,"").replace(u,""),
e=e?e.split(/,+/):[];
};
return function(n,t){
function o(n){
return d+=n.split(/\n/).length-1,e.isCompress&&(n=n.replace(/[\n\r\t\s]+/g," ")),
n=n.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n"),n=w[1]+"'"+n+"'"+w[2],
n+"\n";
}
function i(n){
var r=d;
if(p?n=p(n):t&&(n=n.replace(/\n/g,function(){
return d++,"$line="+d+";";
})),0===n.indexOf("=")){
var o=0!==n.indexOf("==");
if(n=n.replace(/^=*|[\s;]*$/g,""),o&&e.isEscape){
var i=n.replace(/\s*\([^\)]+\)/,"");
$.hasOwnProperty(i)||/^(include|print)$/.test(i)||(n="$escape($string("+n+"))");
}else n="$string("+n+")";
n=w[1]+n+w[2];
}
return t&&(n="$line="+r+";"+n),a(n),n+"\n";
}
function a(e){
e=s(e),r(e,function(e){
g.hasOwnProperty(e)||(c(e),g[e]=!0);
});
}
function c(e){
var n;
"print"===e?n=j:"include"===e?(m.$render=$.$render,n=O):(n="$data."+e,$.hasOwnProperty(e)&&(m[e]=$[e],
n=0===e.indexOf("$")?"$helpers."+e:n+"===undefined?$helpers."+e+":"+n)),y+=e+"="+n+",";
}
var u=e.openTag,l=e.closeTag,p=e.parser,f=n,h="",d=1,g={
$data:!0,
$helpers:!0,
$out:!0,
$line:!0
},$=e.prototype,m={},y="var $helpers=this,"+(t?"$line=0,":""),v="".trim,w=v?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],b=v?"if(content!==undefined){$out+=content;return content}":"$out.push(content);",j="function(content){"+b+"}",O="function(id,data){if(data===undefined){data=$data}var content=$helpers.$render(id,data);"+b+"}";
r(f.split(u),function(e){
e=e.split(l);
var n=e[0],r=e[1];
1===e.length?h+=o(n):(h+=i(n),r&&(h+=o(r)));
}),f=h,t&&(f="try{"+f+"}catch(e){e.line=$line;throw e}"),f="'use strict';"+y+w[0]+f+"return new String("+w[3]+")";
try{
var x=new Function("$data",f);
return x.prototype=m,x;
}catch(E){
throw E.temp="function anonymous($data) {"+f+"}",E;
}
};
}();
e.openTag="{{",e.closeTag="}}",e.parser=function(n){
n=n.replace(/\s*\(\s*/g," (").replace(/\s*\)\s*/g,") ").replace(/^\s/,"");
var r=n.split(" "),t=r.shift(),o=e.keywords,i=o[t];
return i&&o.hasOwnProperty(t)?(r=r.join(" "),n=i.call(n,r)):e.prototype.hasOwnProperty(t)?(r=r.join(" "),
n="=="+t+r+";"):(n=n.replace(/[\s;]*$/,""),n="="+n),n;
},e.keywords={
"if":function(e){
return"if("+e+"){";
},
"else":function(e){
return e=e.split(" "),e="if"===e.shift()?" if("+e.join(" ")+")":"","}else"+e+"{";
},
elseif:function(e){
return"}else if("+e+"){";
},
"/if":function(){
return"}";
},
each:function(e){
e=e.replace(/^\s*\(|\)\s*$/g,"").replace(/\s*\(\s*/g,"("),e=e.split(" ");
var n=e[0]||"$data",r=e[1]||"as",t=e[2]||"$index",o=e[3]||"$value",i=o+","+t;
return"as"!==r&&(n="[]"),"$each("+n+",function(){"+t+"=arguments[0];"+o+"=arguments[1]},function("+i+"){";
},
"/each":function(){
return"});";
},
echo:function(e){
return"print("+e+");";
},
"break":function(){
return"return true";
},
"continue":function(){
return"return false";
}
},e.helper("$each",function(e,n,r){
var t,o=Array.isArray||function(e){
return"[object Array]"===Object.prototype.toString.call(e);
};
if(o(e)){
for(var i=0,a=e.length;a>i&&!r.call(e,e[i],i,e);i++);
i--;
}else{
if(Object.keys)t=Object.keys(e);else for(i in e)t.push(i);
t=t.sort();
for(var c=0,a=t.length;a>c&&(i=t[c],!r.call(e,e[i],i));c++);
}
n(i,e[i]);
}),e.helper("json_encode",JSON.stringify2),e.helper("json_decode",$.parseJSON),e.helper("strlen",function(e){
return e.length;
}),e.helper("str_replace",function(e,n,r){
return r.replace(e,n);
}),e.helper("substr",function(e,n,r){
return e.substr(n,r);
}),e.helper("trim",function(e){
return $.trim(e);
}),e.helper("strpos",function(e,n){
return e.indexOf(n);
}),e.helper("explode",function(e,n){
return n.split(e);
}),e.helper("join",function(e,n){
return n.join(e);
}),e.helper("html_decode",function(e){
return e.html(!1);
}),e.helper("html_encode",function(e){
return e.html(!0);
}),e.helper("getresfullname",function(e){
return e;
});
}(n,window),n;
});