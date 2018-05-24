define("common/wx/Cgi.js",["common/qq/mask.js","common/wx/dialog.js","common/wx/Tips.js","common/wx/cgiReport.js","common/lib/MockJax.js","common/qq/events.js"],function(e,o){
"use strict";
function r(e,o,r){
var t,s;
r&&"object"==typeof r?(t=r.done,s=r.fail):t=r,"string"==typeof o&&o.length>0&&(o={
url:o
}),o=$.extend(!0,{},m,{
type:e,
data:{
random:Math.random().toString()
}
},o),o.mock&&(o.mock===!0?o.mock={
responseText:{
ret:0,
data:{},
url:o.url,
param:o.data
}
}:!o.mock||o.mock.responseText||o.mock.response||(o.mock={
responseText:o.mock
}),o.mock.url=o.mock.url||o.url,$.mockjax(o.mock)),o.mask&&($.isPlainObject(o.mask)?n.show(o.mask):n.show());
var c=$.ajax(o);
return c.callback=c.done,c.done(function(e){
try{
var o=t.toString(),r={
uin:wx.uin||"0",
id:"64430",
key:"0",
url:"",
location:encodeURIComponent(window.location.href)||"",
ret:e.base_resp.ret
};
e&&e.base_resp&&0!==e.base_resp.ret&&o.indexOf("handleRet")<0&&o.indexOf(e.base_resp.ret)<0&&((new Image).src="https://badjs.weixinbridge.com/badjs?level=4&uin={uin}&id={id}&msg={msg}&from={url}".format({
uin:r.uin,
url:r.url||r.location,
id:138,
msg:encodeURIComponent("ret="+r.ret+"|idkey="+r.id+":"+r.key)
}));
}catch(n){
console.error(n);
}
t&&t(e);
}).fail(function(e,r,n){
s&&s(r),a.error(r,o,e),i.trigger("xhrError",e,r,n,o);
}).always(function(){
o.mask&&n.hide();
}),c;
}
var n=e("common/qq/mask.js"),t=e("common/wx/dialog.js"),s=e("common/wx/Tips.js"),a=e("common/wx/cgiReport.js");
e("common/lib/MockJax.js");
var i=e("common/qq/events.js")(!0),m={
dataType:"json",
mask:!1,
timeout:45e3,
error:$.noop,
mock:!1,
data:{
token:wx.data.t,
lang:wx.data.lang,
f:"json",
ajax:"1"
}
};
o.get=function(e,o){
return r("get",e,o);
},o.post=function(e,o){
return r("post",e,o);
};
var c={
0:"恭喜你，操作成功！",
"-1":"系统错误，请稍后尝试。",
200002:"参数错误，请核对参数后重试。",
200003:"登录超时，请重新登录。",
200004:"请求页面的域名没有授权。",
200005:"请求方式错误，请确认请求方式后重试。",
200006:"表单名称验证出错，请核对表单名称后重试。",
200007:"对不起，你没有权限访问目标请求。"
};
o.show=function(e,o){
var r=c[e.base_resp.ret]||"系统繁忙，请稍后尝试！";
return 0==e.base_resp.ret?void(o?t.show({
type:"succ",
msg:"系统提示|"+r
}):s.suc(r)):void(o?t.show("系统错误|"+r):s.err(r));
},o.handleRet=function(e,o){
if(e&&e.base_resp&&e.base_resp.ret){
o=$.extend(!0,{},{
uin:wx.uin||"0",
id:"64430",
key:"0",
url:"",
location:encodeURIComponent(window.location.href)||"",
ret:e.base_resp.ret,
showMsg:!0,
msg:"系统繁忙，请稍后尝试"
},o),o.url=encodeURIComponent(o.url);
var r,n=c[o.ret];
n?o.showMsg&&s.err(n):(r=new Image,r.src="/mp/unknow_ret_report?uin={uin}&id={id}&key={key}&url={url}&location={location}&ret={ret}&method=get&action=report".format(o),
o.showMsg&&s.err(o.msg),(new Image).src="/mp/unknow_ret_report?uin={uin}&id=64430&key=126&url={url}&location={location}&ret={ret}&method=get&action=report".format(o),
(new Image).src="https://badjs.weixinbridge.com/badjs?level=4&uin={uin}&id={id}&msg={msg}&from={url}".format({
uin:o.uin,
url:o.url||o.location,
id:138,
msg:encodeURIComponent("ret="+o.ret+"|idkey="+o.id+":"+o.key)
}));
}
};
});