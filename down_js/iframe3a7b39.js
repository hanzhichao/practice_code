!function(){
var e={},n={},t="about:blank",o={
parse:function(e){
for(var n,t,o,a={},i=e.split("&"),r=0,p=i.length;p>r;r++)n=i[r].split("="),2==n.length&&(t=n[0],
o=n[1],-1==t.indexOf("[]")?a[t]=o:(t=t.replace("[]",""),a[t]=a[t]||[],a[t].push(o)));
return a;
},
serialize:function(e){
var n,t,o,a=[];
for(n in e)if(e.hasOwnProperty(n))if(t=e[n],t instanceof Array){
o=t;
for(var i=0,r=o.length;r>i;i++)t=encodeURIComponent(o[i]),a.push(n+"[]="+t);
}else t=encodeURIComponent(t),a.push(n+"="+t);
return a.join("&");
}
};
if(window.addEventListener?window.addEventListener("message",function(e){
i(e.data,e.origin,e.source);
}):window.attachEvent&&window.attachEvent("onmessage",function(e){
i(e.data,e.origin,e.source);
}),-1==location.href.indexOf("mp.weixin.qq.com")){
t="https://mp.weixin.qq.com/cgi-bin/readtemplate?t=proxy_tmpl&lang=zh_CN";
var a=document.createElement("iframe");
document.body.appendChild(a),a.style.display="none",a.src="about:blank",n.frame=a,
n.proxy=a.contentWindow;
}
var i=function(n,t,a){
var i;
"string"==typeof n&&(n=o.parse(n)),(i=n.type)&&e[i]&&e[i](n,t,a);
};
n.communicateWith=function(e){
n.target=e,n.proxy=null;
},n.post=function(e){
var a=n.target||window.top;
if("string"!=typeof e&&(e=o.serialize(e)),window.addEventListener)a.postMessage(e,"*");else try{
n.proxy.name=e,n.proxy.location.replace(t);
}catch(i){
setTimeout(function(){
n.post(e);
},0);
}finally{
var r=n.frame;
setTimeout(function(){
r&&r.parentNode.removeChild(r);
},3e3);
var p=document.createElement("iframe");
document.body.appendChild(p),p.style.display="none",p.src="about:blank",n.frame=p,
n.proxy=p.contentWindow;
}
},n.transport=function(e){
n.proxy=e.win;
var a=o.parse(e.message);
t=a.proxyUrl||t,t=decodeURIComponent(t),i(a);
},n.on=function(n,t){
e[n]=t;
},window.Iframe=n;
}();