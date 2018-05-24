define("common/wx/cgiReport.js",["common/wx/Tips.js"],function(e,a){
"use strict";
var r=e("common/wx/Tips.js");
a.error=function(e,a,t){
t.responseText=t.responseText||"";
var s=-1!==location.href.indexOf("/cgi-bin/home")&&(-1!==a.url.indexOf("/misc/safeassistant")||-1!==a.url.indexOf("/safe/safeuuid")),n=11;
switch(e){
case"timeout":
n=7;
break;

case"error":
n=8;
break;

case"notmodified":
n=9;
break;

case"parsererror":
n=10;
}
a.data.lang&&delete a.data.lang,a.data.random&&delete a.data.random,a.data.f&&delete a.data.f,
a.data.ajax&&delete a.data.ajax,a.data.token&&delete a.data.token,n+=s?100:0,$.ajax({
url:"/misc/jslog?1=1",
data:{
content:"[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}] [text={responseText}] [headers={headers}] [status={status}]".format({
uin:wx.data.uin,
useragent:window.navigator.userAgent,
page:location.href,
url:a.url,
param:$.param(a.data).substr(0,50),
info:e,
responseText:t.responseText.substr(0,500),
headers:(t.getAllResponseHeaders()||"").replace(/\s/g,""),
status:t.status
}),
id:n,
level:"error"
},
type:"POST"
}),$.ajax({
url:"/misc/jslog?1=1",
data:{
content:"[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}]".format({
uin:wx.data.uin,
useragent:window.navigator.userAgent,
page:location.href,
url:a.url,
param:$.param(a.data).substr(0,50),
info:e
}),
id:6+(s?100:0),
level:"error"
},
type:"POST"
}),"timeout"==e&&r.err("你的网络环境较差，请稍后重试");
};
});