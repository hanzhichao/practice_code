define("biz_common/utils/url/parse.js",[],function(){
function r(r){
var e=r.length,n=r.indexOf("?"),t=r.indexOf("#");
t=-1==t?e:t,n=-1==n?t:n;
var a=r.substr(0,n),i=r.substr(n+1,t-n-1),o=r.substr(t+1);
return{
host:a,
query_str:i,
hash:o
};
}
function e(e,n){
var t=r(e),a=t.query_str,i=[];
for(var o in n)n.hasOwnProperty(o)&&i.push(o+"="+encodeURIComponent(n[o]));
return i.length>0&&(a+=(""!=a?"&":"")+i.join("&")),t.host+(""!=a?"?"+a:"")+(""!=t.hash?"#"+t.hash:"");
}
function n(r,e,n,t){
r=r||location.href;
var a=r.indexOf("&"),i=r.length,o=r.replace(/^[\w\d]+:[\/\\]+/g,"").split("").reverse();
Array.prototype.indexOf||(Array.prototype.indexOf=function(r,e){
var n;
if(null==this)throw new TypeError('"this" is null or not defined');
var t=Object(this),a=t.length>>>0;
if(0===a)return-1;
var i=+e||0;
if(1/0===Math.abs(i)&&(i=0),i>=a)return-1;
for(n=Math.max(i>=0?i:a-Math.abs(i),0);a>n;){
if(n in t&&t[n]===r)return n;
n++;
}
return-1;
});
var s=i-1-o.indexOf("/");
-1!=a&&-1==r.indexOf("?")&&a>s&&(r=r.replace("&","?"));
var u=new RegExp("([\\?&]"+e+"=)[^&#]*");
if(!r.match(u)){
var h=r.indexOf("?");
return-1==h?r+"?"+e+"="+n:h==r.length-1?r+e+"="+n:r+"&"+e+"="+n;
}
return t===!0?r.replace(u,"$1"+n):r;
}
function t(r){
var e=arguments[1]||window.location.search,n=new RegExp("(^|&)"+r+"=([^&]*)(&|$)"),t=e.substr(e.indexOf("?")+1).match(n);
return null!=t?t[2]:"";
}
return{
parseUrl:r,
join:e,
addParam:n,
getQuery:t
};
});