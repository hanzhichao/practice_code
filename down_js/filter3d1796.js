define("common/wx/mpEditor/plugin/filter.js",[],function(){
"use strict";
function e(e){
for(var t=["noscript","iframe"],r=0;r<t.length;r++){
var a="(<#targetName#\\s*[^<>]*?>)[^<\\/]+?<\\/#targetName#>".replace(/#targetName#/g,t[r]),n="$1</#targetName#>".replace(/#targetName#/g,t[r]),l=new RegExp(a,"g");
e=e.replace(l,n);
}
return e;
}
var t=function(e,t){
if(t){
e=$(e);
var r=e.attr("style");
if(r){
var a="(^|;|\\b)[^;]*#attr#\\s*:[^;]*[$;]";
"[object String]"==Object.prototype.toString.call(t)&&(t=[t]);
for(var n=0,l=t.length;l>n;n++){
var c=new RegExp(a.replace("#attr#",t[n]),"g");
r=r.replace(c,"$1");
}
e.attr("style",r);
}
}
},r=function(e){
var t="(<[^<>]*?)\\sstyle=(?:(?:\"([^\"]*?)\")|(?:'([^']*?)')|([^'\"\\s=<>]*?))([\\s\\/>])",r=new RegExp(t,"g");
return e=e.replace(r,function(e,t,r,a,n,l){
var c=r||a||n||"";
if(c){
for(var c=c.split(";"),g=[],i=0,o=c.length;o>i;i++){
var p=c[i].replace(/^\s+/,"").replace(/\s+$/,"");
p&&g.push(p);
}
return t+' style="'+g.join(";")+';"'+l||"";
}
return e;
});
},a=function(e,t){
for(var r="(<#tagName#[^<>]*?)\\s#attribute#=(?:(?:\"([^\"]*?)\")|(?:'([^']*?)')|([^'\"\\s=<>]*?))([\\s\\/>])",a="$1$5",n=0,l=t.length;l>n;n++){
var c=t[n],g=c[0],i=c[1],o="";
o="*"===g?r.replace("#tagName#",""):r.replace("#tagName#",g);
for(var p=new RegExp(o.replace("#attribute#",i),"g");p.test(e);)e=e.replace(p,a);
}
return e;
};
return{
formatRedundancyStr:e,
formatStyle:r,
filterStyleAttr:t,
removeAttribute:a
};
});