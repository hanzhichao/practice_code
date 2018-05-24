define("safe/Scan.js",["widget/qrcode_scan.css","common/wx/Tips.js","common/wx/Cgi.js"],function(t){
"use strict";
function e(t){
t=$.extend(!0,{},n,t);
var e={
OK:0,
ERR_SYS:-1,
ERR_ARGS:-2,
ERR_APP_BLOCK:-10,
UUID_SCANNING:401,
UUID_EXPIRED:402,
UUID_CANCELED:403,
UUID_SCANED:404,
UUID_CONFIRM:405,
UUID_INIT:406,
UUID_REQUEST:407,
UUID_AUTHORIZE:408,
UUID_ERROR:500
},s={
init:'<div class="status tips"><p>请用管理员微信扫描以上二维码进行验证</p></div>'.sprintf(t.wx_name),
multi_init:'<div class="status tips"><p>扫码后，请联系管理员进行验证</p></div>'.sprintf(t.wx_name),
suc:'<div class="status"><i class="icon_qrcode_scan succ"></i><div class="status_txt"><h4>扫描成功</h4><p>请在微信上点击确认即可</p></div></div>',
adm:'<div class="status"><i class="icon_qrcode_scan warn"></i><div class="status_txt"><h4>检测到非管理员已扫描</h4><p>请联系管理员使用管理员微信重新扫描验证，或关闭窗口</p></div></div>',
cannel:'<div class="status"><i class="icon_qrcode_scan warn"></i><div class="status_txt"><h4>您已取消此次操作</h4><p>您可以重新扫描验证，或关闭窗口</p></div></div>',
ok:'<div class="status"><i class="icon_qrcode_scan succ"></i><div class="status_txt"><h4>确认成功</h4></div></div>',
request:"<h2>已发送操作申请，请耐心等待</h2><p>等待公众号助手%s审核您的申请，您也可主动联系ta，请ta通过您的申请</p>".sprintf(t.wx_name),
authorize:'<div class="status"><i class="icon_qrcode_scan succ"></i><div class="status_txt"><h4>新微信号扫描成功，已发送授权请求给到法定代表人微信，请联系法定代表人在微信上进行授权，或关闭窗口</h4></div></div>'
},a=this;
a.container="object"==typeof t.container?t.container:$(t.container),a.status_container="null"==t.status_container?null:a.container.find(t.status_container),
a.qrcode_container=a.container.find(t.qrcode_container),a.opt=t,a.opt.onshow&&"function"==typeof a.opt.onshow?a.opt.onshow.apply(a):a.status_container&&a.status_container.html(a.opt.dom_init?a.opt.dom_init:a.opt.distinguish&&!a.opt.default_initdom?s.multi_init:s.init),
a.timer=null,a.ctimer=null,a.json={},a.retcode=e.UUID_SCANNING,a.retcodes={
0:!0
},a.usedTimes=0,a.uselessTimes=0,a.repeatTimes=0,a.firstChange=0,a.speedy=1,a.longWait=0;
var c=function(t){
var e=t>20?t-20:0,i=t>10?e>0?10:t-10:0,o=i>0?10:t;
return 4*e+2*i+o;
},r=function(t){
var e=20;
return t>=40?e=11:t>=30?e=10:t>=20?e=9:t>=16?e=8:t>=12?e=7:t>=10?e=6:t>=7?e=5:t>=4&&(e=4),
e;
},d=function(){},u=function(){
var t=[];
t.push("&1="+100*a.usedTimes),t.push("&2="+100*a.uselessTimes),t.push("&3="+100*a.firstChange);
var e=c(a.firstChange),o=r(e);
o>0&&t.push("&"+o+"="+100*e),0==a.longWait&&t.push("&19=1000"),setTimeout(function(){
a.opt.onconfirm&&"function"==typeof a.opt.onconfirm?a.opt.onconfirm.apply(a):i.suc("已确认成功");
},150);
},p=function(){
a.timer&&window.clearInterval(a.timer),a.timer=setInterval(m,a.opt.timeout*a.speedy),
a.ctimer&&window.clearInterval(a.ctimer),a.ctimer=setInterval(l,a.opt.checktimeout*a.speedy);
},m=function(){
a.opt.uuid?o.post({
url:wx.url("/safe/safeuuid?timespam="+(new Date).getTime()),
data:{
uuid:a.opt.uuid,
action:"json",
type:"json"
},
mask:!1
},function(t){
a.json=t;
var e=t&&t.errcode?+t.errcode:0;
if(a.retcode==e){
a.uselessTimes++,a.repeatTimes++;
var i=!1;
a.repeatTimes>=20&&4!=a.speedy?(a.speedy=4,i=!0):a.repeatTimes>=10&&2!=a.speedy&&(a.speedy=2,
i=!0),i&&p();
}else a.retcode=e,a.usedTimes++,0==a.firstChange&&a.repeatTimes>0&&(a.firstChange=a.repeatTimes),
a.repeatTimes=0,a.speedy=1,p();
}):(a.timer&&window.clearInterval(a.timer),a.ctimer&&window.clearInterval(a.ctimer),
_());
},l=function(){
if(a.json&&a.json.errcode==e.UUID_SCANED&&602==+a.json.check_status&&(a.retcode=e.UUID_CONFIRM),
!a.retcodes[a.retcode]){
a.retcodes[a.retcode]=!0;
var t=function(){
var e={
action:"get_uuid",
uuid:a.opt.uuid
};
a.opt.auth&&(e.auth=a.opt.auth),o.post({
url:wx.url("/misc/safeassistant"),
data:e,
mask:!1
},{
done:function(t){
t&&0==t.isadmin?(a.isadmin=!1,a.distinguish=!0):(a.issubadmin=!(1==t.isadmin),a.isadmin=!0,
a.distinguish=!0),u();
},
fail:function(){
setTimeout(t,300);
}
});
};
switch(a.retcode){
case e.UUID_ERROR:
return a.timer&&window.clearInterval(a.timer),a.ctimer&&window.clearInterval(a.ctimer),
void _();

case e.UUID_EXPIRED:
return a.timer&&window.clearInterval(a.timer),a.ctimer&&window.clearInterval(a.ctimer),
void _();

case e.UUID_SCANED:
a.retcodes[e.UUID_CANCELED]=!1,a.opt.onscaned&&"function"==typeof a.opt.onscaned?a.opt.onscaned.apply(a):a.status_container&&a.status_container.html(s.suc);
break;

case e.UUID_CANCELED:
a.retcodes[e.UUID_SCANED]=!1,a.opt.oncancel&&"function"==typeof a.opt.oncancel?a.opt.oncancel.apply(a):a.status_container&&a.status_container.html(s.cannel);
break;

case e.UUID_CONFIRM:
a.timer&&window.clearInterval(a.timer),a.ctimer&&window.clearInterval(a.ctimer),
a.json.code&&(a.code=a.json.code),a.opt.auto_msgid&&(a.msgid=a.opt.msgid),a.opt.distinguish?setTimeout(t,0):(a.status_container&&a.status_container.html(s.ok),
u());
break;

case e.UUID_REQUEST:
a.json.code&&(a.code=a.json.code),a.timer&&window.clearInterval(a.timer),a.ctimer&&window.clearInterval(a.ctimer),
a.container.html(s.request),a.opt.onrequest&&"function"==typeof a.opt.onrequest?a.opt.onrequest.apply(a):i.suc("已申请成功");
break;

case e.UUID_AUTHORIZE:
a.json.code&&(a.code=a.json.code),a.timer&&window.clearInterval(a.timer),a.ctimer&&window.clearInterval(a.ctimer),
a.status_container.html(s.authorize),a.opt.onauthorize&&"function"==typeof a.opt.onauthorize?a.opt.onauthorize.apply(a):i.suc("已发起授权申请");
}
}
},_=function(){
function t(){
var t={
state:"0",
login_type:"safe_center",
f:"json",
type:a.opt.uuid_type||"json",
ticket:a.opt.ticket
};
a.opt.getUuidExtra&&"object"==typeof a.opt.getUuidExtra&&(t=$.extend(!0,{},a.opt.getUuidExtra,t)),
a.opt.kicked_openid&&(t.kicked_openid=a.opt.kicked_openid),a.opt.kicked_pttype&&(t.kicked_pttype=a.opt.kicked_pttype),
o.post({
url:wx.url("/safe/safeqrconnect"),
data:t,
mask:!1
},function(t){
if(t&&t.uuid){
a.opt.uuid=t.uuid;
var e="/safe/safeqrcode?ticket=%s&uuid=%s&action=%s".sprintf(a.opt.ticket,a.opt.uuid,a.opt.type);
a.opt.expire_time_type&&(e=e+"&expire_time_type="+a.opt.expire_time_type),a.opt.code&&(e=e+"&code="+a.opt.code),
a.opt.source&&(e=e+"&type="+a.opt.source),a.opt.auth&&(e=e+"&auth="+a.opt.auth),
a.opt.msgid&&(e=e+"&msgid="+a.opt.msgid),a.opt.second_openid&&(e=e+"&second_openid="+a.opt.second_openid),
a.opt.scene&&(e=e+"&scene="+a.opt.scene),a.qrcode_container.attr("src",e),a.opt.onloadedimg&&"function"==typeof a.opt.onloadedimg&&a.opt.onloadedimg.apply(a),
p(),a.json={},a.retcode=0,a.retcodes={
0:!0
};
}
});
}
if(a.opt.ticket)t();else{
var e={
action:"get_ticket"
};
a.opt.auth&&(e.auth=a.opt.auth),o.post({
url:wx.url("/misc/safeassistant"),
data:e,
mask:!1
},{
done:function(e){
e&&e.base_resp&&e.ticket&&0==e.base_resp.ret?(a.opt.ticket=e.ticket,a.opt.auto_msgid&&e.operation_seq&&(a.opt.msgid=e.operation_seq),
t()):setTimeout(function(){
_();
},1e3);
},
fail:function(){
setTimeout(function(){
_();
},1e3);
}
});
}
};
_(!0),setInterval(d,3e5);
}
t("widget/qrcode_scan.css");
var i=t("common/wx/Tips.js"),o=t("common/wx/Cgi.js"),n={
wx_name:"",
container:"",
type:"",
ticket:"",
source:"",
second_openid:"",
code:"",
msgid:"",
auto_msgid:!1,
auth:"",
uuid_type:"",
status_container:".js_status",
qrcode_container:".js_qrcode",
timeout:1e3,
checktimeout:1200,
onshow:null,
onscaned:null,
oncancel:null,
onconfirm:null,
onrequest:null,
onloadedimg:null,
dom_init:"",
distinguish:!1,
default_initdom:!1,
getUuidExtra:null,
mustAdmin:!1
};
return e.prototype={
destroy:function(){
return this.timer&&window.clearInterval(this.timer),this.ctimer&&window.clearInterval(this.ctimer),
this;
}
},e;
});