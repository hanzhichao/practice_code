define("common/wx/getVinfo.js",["common/wx/Cgi.js","common/wx/loadscript.js"],function(e){
"use strict";
function a(e,a){
var t="视频加载失败",r="";
switch(1*e){
case-4:
r="因版权限制，该视频不支持添加";
break;

case-5:
r="因版权限制，该视频不支持添加";
break;

case-3:
r="因版权限制，该视频不支持添加";
break;

case 61:
r="该视频不存在";
break;

case 62:
r="该视频已下架";
break;

case 63:
r="视频加载失败";
break;

case 65:
r="视频加载失败";
break;

case 67:
r="视频加载失败";
break;

case 69:
r="视频格式不支持移动端观看";
break;

case 71:
r="视频加载失败";
break;

case 73:
r="视频加载失败";
break;

case 74:
r="视频加载失败";
break;

case 80:
switch(1*a){
case 1:
r="IP地址所在地区暂不支持播放";
break;

case 2:
r="因版权限制，该视频不支持添加";
break;

default:
r="因版权限制，该视频不支持添加";
}
break;

case 81:
r="视频加载失败";
break;

case 82:
r="视频加载失败";
break;

case 83:
switch(1*a){
case-1:
r=t;
break;

case-2:
r="因版权限制，该视频不支持添加";
break;

default:
r="因版权限制，该视频不支持添加";
}
break;

case 84:
r="视频加载失败";
break;

default:
r=t;
}
return r;
}
function t(e){
document.domain="qq.com";
var a="",t=encodeURIComponent(top.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),r=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=1009&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=","&val=","undefined"!=typeof e.val?e.val:"","&val1=","undefined"!=typeof e.val1?e.val1:"","&vurl=",encodeURIComponent(e.vurl),"&t=",Math.random(),"&url=",t,"&wx_openid=",a].join(""),c=new Image;
c.src=r.substr(0,1024);
}
function r(e){
var a,t;
a="function"==typeof e.onSuccess?e.onSuccess:function(){},t="function"==typeof e.onError?e.onError:function(){},
o.post({
url:wx.url("/cgi-bin/getvideockey?"),
data:{
vid:e.vid
}
},{
done:function(r){
r&&r.base_resp&&0==r.base_resp.ret&&r.ckey?n({
vid:e.vid,
ckey:r.ckey,
onSuc:function(t){
t=t||{},t.data||(t.data={}),t.data.p4_3=c(e.vid,4/3),t.data.p16_9=c(e.vid,16/9),
a(t);
},
onError:function(){
t({
code:3
});
}
}):t({
code:2,
ckeyResp:r
});
},
fail:function(){
t({
code:1
});
}
});
}
function c(e,a){
return a&&a!=16/9?"http://shp.qpic.cn/qqvideo/0/"+e+"/400":"http://shp.qpic.cn/qqvideo_ori/0/"+e+"_496_280/0";
}
var o=e("common/wx/Cgi.js"),i=e("common/wx/loadscript.js"),n=function(e){
var r="https://h5vv.video.qq.com/getvinfo?vid=#vid#&dtype=1&otype=json&callback=video_dynamic_callback&appVer=1&encryptVer=6.3&platform=61001&cKey=#ckey#&sdtfrom=v3060";
r=r.replace("#vid#",e.vid).replace("#ckey#",e.ckey),r+="&device=60401&use_proxy_sdk=0";
var c=+new Date;
i({
url:r,
timeout:1e4,
callbackName:"video_dynamic_callback",
callback:function(r){
var o=+new Date,i=o-c;
r=r||{},"undefined"==typeof r.em&&(r.em=0);
var n,v="",l=r.em;
if(0==r.em){
if(r.exem>0?l=-4:0==r.exem&&r.vl&&r.vl.vi&&r.vl.vi[0]&&8==r.vl.vi[0].st&&(l=r.preview>0?-5:-3),
0!=l||r.vl&&r.vl.vi&&r.vl.vi[0]||(l=-2),0!=l&&(v=a(1*l,1*r.exem)),r.vl&&r.vl.vi&&r.vl.vi[0]){
var d=r.vl.vi[0];
if(n={
newVid:d.lnk,
time:d.td,
title:d.ti,
width:d.vw,
height:d.vh,
file_size:d.fs,
rate:Math.round(d.fs/1024*8/d.td)
},d.ul&&d.ul.ui&&d.ul.ui[0]){
var s=d.ul.ui[0],f=s.url+d.fn,u=r.fl,m="";
if(u&&u.cnt>0)for(var p=u.fi,k=0,b=p.length;b>k;k++)if(1*p[k].sl===1){
m=p[k].name,n.resolution=(p[k].cname||"").replace(/^.*;\((:?.*)P\)$/,"$1")||0;
break;
}
n.format=m,n.vt=s.vt,n.totalUrl=[f,-1!=f.indexOf("?")?"&":"?","vkey=",d.fvkey,"&sdtfrom=","&type=",1==s.dt?"tflv":2==s.dt||0==s.dt?"mp4":"","&platform=","&fmt=",m,"&level=",d.level,"&br=",d.br,"&sp=",d.sp].join("");
}
}
}else v=a(1*l,1*r.exem);
t({
vid:e.vid,
val:i,
val1:r.em,
vurl:n&&n.totalUrl?n.totalUrl:""
}),e.onSuc({
data:n,
oriData:r,
c_time:i,
err_msg:v||"",
ret_code:l
});
},
onerror:function(a){
var r,o=+new Date,i=o-c;
switch(1*a){
case 400:
r=-22;
break;

case 500:
r=-21;
break;

default:
r=-23;
}
"function"==typeof e.onError&&e.onError(r,{
ret_code:r,
c_time:i,
err_msg:""
}),t({
vid:e.vid,
val:i,
val1:r,
vurl:""
});
}
});
};
return{
get:n,
getInfoByVid:r
};
});