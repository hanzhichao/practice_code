define("biz_common/tmpl.js",[],function(){
var e=function(e,r,n){
var t="";
t=e.replace(/[\r\t\n]/g," ").split("<#").join("	").replace(/((^|#>)[^\t]*)'/g,"$1\r"),
t=n?t.replace(/\t==(.*?)#>/g,"',$1,'").replace(/\t=(.*?)#>/g,"', String($1).replace(/&/g,'&amp;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;') ,'"):t.replace(/\t=(.*?)#>/g,"',$1,'"),
t=t.split("	").join("');").split("#>").join("p.push('").split("\r").join("\\'");
var p=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t+"');}return p.join('');");
return p(r);
},r=function(r,n,t){
var p=document.getElementById(r);
return p?e(p.innerHTML,n,t):"";
};
return{
render:r,
tmpl:e
};
});