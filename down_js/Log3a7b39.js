define("common/wx/Log.js",["common/qq/events.js"],function(e){
"use strict";
function t(e){
var t=[];
for(var a in e)e.hasOwnProperty(a)&&e[a]&&t.push(a+":"+(e[a]+"").replace(/\s/g,"_").replace(/[\:,;]/g,"|").slice(0,500));
t=["https://mp.weixin.qq.com/mp/speedreport?data_type=5&net=wifi&os=pc&ua=",wxError.data.ua,"&ext_data=",encodeURIComponent(t.join(";"))].join(""),
console.log(decodeURIComponent(t));
var n=new Image;
n.src=t;
}
var a=e("common/qq/events.js")(!0);
a.on("xhrError",function(e,a,n,o){
var r=Math.floor((new Date).getTime()/1e3);
t({
path:wxError.data.path,
url:o.url.replace(/&?f=json/,""),
textStatus:a||"",
statusText:e.statusText,
errorThrown:n||"",
status:e.status,
uin:wx.data.uin||0,
time:r,
ua:window.navigator.userAgent,
size:JSON.stringify2(o.data).length,
from:"mpAjax1",
responseText:e&&e.responseText&&(e.responseText+"").replace(/\s/g,"_")
}),delete o.data.lang,delete o.data.random,delete o.data.f,delete o.data.ajax,delete o.data.token,
t({
uin:wx.data.uin||0,
time:r,
from:"mpAjax2",
data:JSON.stringify2(o.data||{})
});
});
});