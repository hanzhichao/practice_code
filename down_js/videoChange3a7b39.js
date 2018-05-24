define("common/wx/videoChange.js",[],function(){
"use strict";
var t=function(t,e,i,a){
var n="";
if(!t)return n;
if(t=t.replace(/^\s+|\s+$/g,""),t=t.replace(/^http:/,"https:"),t=t.replace(/^v\.qq\.com/,"https://v.qq.com"),
-1!=t.indexOf("http://v.qq.com")||-1!=t.indexOf("https://v.qq.com")){
var d,o="";
if(d=t.match(new RegExp("(^|&|\\\\?)vid=([^&]*)(&|$|#)")))o=encodeURIComponent(d[2]),
-1!=o.indexOf("_")&&(o=o.split("_")[0]),/[a-zA-Z0-9]{11}/.test(o)||BJ_REPORT.monitor(94,"vid:"+o,39),
n="https://v.qq.com/iframe/preview.html?vid="+o+"&width="+e+"&height="+i+"&auto=0";else if(d=t.match(new RegExp("(http://)?v\\.qq\\.com/cover[^/]*/\\w+/([^/]*)\\.html"))){
var h=encodeURIComponent(d[2]),s="http://data.video.qq.com/fcgi-bin/data?tid=554&appid=20001184&appkey=85a707e3a07cc44d&otype=json&idlist="+h,c=document.getElementsByTagName("head")[0],m=document.createElement("script");
m.type="text/javascript",m.src=s,m.async=!0,void 0!==m.onreadystatechange?m.onreadystatechange=function(){
if("loaded"==m.readyState)try{
o=QZOutputJson.results[0].fields.video_ids[0],-1!=o.indexOf("_")&&(o=o.split("_")[0]),
/[a-zA-Z0-9]{11}/.test(o)||BJ_REPORT.monitor(94,"vid:"+o,39),n="https://v.qq.com/iframe/preview.html?vid="+o+"&width="+e+"&height="+i+"&auto=0";
}catch(t){}
}:m.onload=function(){
try{
o=QZOutputJson.results[0].fields.video_ids[0],-1!=o.indexOf("_")&&(o=o.split("_")[0]),
/[a-zA-Z0-9]{11}/.test(o)||BJ_REPORT.monitor(94,"vid:"+o,39),n="https://v.qq.com/iframe/preview.html?vid="+o+"&width="+e+"&height="+i+"&auto=0";
}catch(t){}
},c.appendChild(m);
}else{
var p=t.indexOf("vid=");
if(-1!=p){
var r=t.indexOf("&",p),v=t.indexOf("?",p);
-1!=v&&(-1==r||r>v)&&(r=v),v=t.indexOf("#",p),-1!=v&&(-1==r||r>v)&&(r=v),o=-1==r?t.substring(p+"vid=".length):t.substring(p+"vid=".length,r);
}else o="";
o||(d=t.match(/\/\w{15}\/(\w+)\.html/))&&(o=d[1]),o||((d=t.match(/\/page\/\w{1}\/\w{1}\/\w{1}\/(\w+)\.html/))?o=d[1]:(d=t.match(/\/(page|play)\/+(\w{11})\.html/))&&(o=d[2])),
o||(d=t.match(/\/boke\/gplay\/\w+_\w+_(\w+)\.html/))&&(o=d[1]),o=encodeURIComponent(o),
""!=o&&(-1!=o.indexOf("_")&&(o=o.split("_")[0]),/[a-zA-Z0-9]{11}/.test(o)||BJ_REPORT.monitor(94,"vid:"+o,39),
n="https://v.qq.com/iframe/preview.html?vid="+o+"&width="+e+"&height="+i+"&auto=0");
}
}else n="";
a(n);
};
return t;
});