!function(e,t,r,o){
var n=e(t,r,o);
r.tvu=n;
}(function(e,t,r,o){
function n(e,t){
var r=new Uint8Array(e);
if("function"==typeof TextDecoder){
var o=new TextDecoder(t||"utf-8").decode(r);
return o;
}
for(var n=new Array(r.length),i=0,a=r.length;a>i;i++)n[i]=String.fromCharCode(r[i]);
return n.join("");
}
function i(e){
for(var t=e.toString(),r=[],o=0;o<t.length;o+=2)r.push(parseInt(t.substr(o,2),16));
return new Uint8Array(r).buffer;
}
function a(e,t){
if("function"==typeof TextEncoder){
var r=new TextEncoder(t||"utf-8").encode(e);
return r.buffer;
}
for(var o=new Array(e.length),n=0,i=e.length;i>n;n++)o[n]=e.charCodeAt(n);
var a=new Uint8Array(o);
return a.buffer;
}
var s={
debug:!1
};
return s.util={
log:function(e){
s.debug&&t.console&&t.console.log&&t.console.log!=t.alert&&t.console.log("[tvu] "+e);
},
extend:function(e,t){
var r=function(){};
r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e;
},
getGUID:function(){
for(var e="",t=1;16>=t;t++)e+=Math.floor(16*Math.random()).toString(16);
return e;
},
getRealLen:function(e){
return e.replace(/[^\x00-\xFF]/g,"**").length;
},
param:function(e,t){
var r=[],o="",n="";
t=t||"";
for(var i in e)e.hasOwnProperty(i)&&r.push(i+"="+encodeURIComponent(e[i]));
return o=r.join("&"),t&&o&&(n=-1!=t.indexOf("?")?"&":"?"),t+n+o;
},
getSubParam:function(e,t){
var r,n,i={};
t||(t=[]);
for(var a=0,s=t.length;s>a;a++)r=t[a],n=e[r],i[r]=n===o||null===n?"":n;
return i;
},
getFileName:function(e,t){
var r=e.lastIndexOf("\\");
0>r&&(r=e.lastIndexOf("/"));
var o=e.lastIndexOf(".");
return!t||0>o?e.substring(r+1):e.substr(r+1,o-r-1);
},
getSizeString:function(e,t){
var r=1024,o=1024*r,n=1024*o;
return t||(t=1),r>e?e+"B":o>e?(e/r).toFixed(t)+"KB":n>e?(e/o).toFixed(t)+"MB":(e/n).toFixed(t)+"GB";
},
ajax:function(e){
!e&&(e={}),"string"==typeof e.type&&"POST"==e.type.toUpperCase()?s.util.ajax.post(e):s.util.ajax.get(e);
}
},function(){
var e,n,i,a,l,p,u,d;
n=function(e,r){
r.parentNode.removeChild(r),t[e]=o;
try{
delete t[e];
}catch(n){}
},i=function(e,t){
var r,o,n="";
for(r in e)e.hasOwnProperty(r)&&(r=t?encodeURIComponent(r):r,o=t?encodeURIComponent(e[r]):e[r],
n+=r+"="+o+"&");
return n.replace(/&$/,"");
},a=function(){
return"cb_"+s.util.getGUID();
},l=function(e,t){
"undefined"!=typeof e&&e(t);
},p=function(e,t){
"undefined"!=typeof e&&e(t);
},u=function(e){
"undefined"!=typeof e&&e();
},d=function(e){
"undefined"!=typeof e&&e();
},e={},e.init=function(t){
var r;
for(r in t)t.hasOwnProperty(r)&&(e.options[r]=t[r]);
return!0;
},e.get=function(e){
e=e||{};
var o=e.url,s=e.callbackParameter||"callback",c=e.data||{},f=r.createElement("script"),g=a(),h="?";
o&&(c[s]=g,o.indexOf("?")>=0&&(h="&"),o+=h+i(c,!0),o=o.replace(/=\?/,"="+g),t[g]=function(t){
"undefined"==typeof t?l(e.error,"Invalid JSON data returned"):p(e.success,t),n(g,f),
u(e.complete);
},f.onerror=function(){
n(g,f),u(e.complete),l(e.error,"Error while trying to access the URL");
},d(e.beforeSend),f.setAttribute("src",o),r.getElementsByTagName("head")[0].appendChild(f));
},s.util.ajax.get=e.get;
}(),function(){
FormSender=function(e,t,r,o){
this.name="_fpInstence_"+FormSender.counter,FormSender.instance[this.name]=this,
FormSender.counter++;
var n=String(o).toLowerCase();
"object"==typeof e&&1==e.nodeType&&"FORM"==e.tagName?this.instanceForm=e:(this.method=t||"POST",
this.uri=e,this.charset="utf-8"==n||"gbk"==n||"gb2312"==n||"gb18030"==n?n:"gb2312",
this.data="object"==typeof r||"string"==typeof r?r:null),this._sender=null,this.onSuccess=function(){},
this.onError=function(){},this.startTime=0,this.endTime=0,this.postTime=0;
},FormSender.instance={},FormSender.counter=0,FormSender._errCodeMap={
999:{
msg:"Connection or Server error"
}
},FormSender.pluginsPool={
formHandler:[],
onErrorHandler:[]
},FormSender._pluginsRunner=function(e,t){
var r,o=FormSender,n=o.pluginsPool[e],i=t;
if(n&&(r=n.length))for(var a=0;r>a;++a)"function"==typeof n[a]&&(i=n[a](i)||t);
return i;
},FormSender._clear=function(t){
t._sender=t._sender.callback=t._sender.errorCallback=null,s.util.userAgent.safari||s.util.userAgent.opera?setTimeout('$("#_fp_frm_'+t.name+'").remove()',50):e("#_fp_frm_"+t.name).remove(),
t.endTime=+new Date,FormSender._pluginsRunner("onRequestComplete",t),t.instanceForm=null;
},FormSender.prototype.send=function(){
if(this.startTime=+new Date,null===this._sender||void 0===this._sender){
var e=r.createElement("iframe");
e.id=e.name="_fp_frm_"+this.name,e.style.cssText="width:0;height:0;border-width:0;display:none;",
e.callback=function(e){
return function(){
e.resultArgs=arguments,e.msg="ok",e.onSuccess.apply(e,arguments),FormSender._clear(e);
};
}(this);
var t=function(e){
var t=function(){
e.resultArgs=arguments,e.msg=FormSender._errCodeMap[999].msg,FormSender._pluginsRunner("onErrorHandler",e),
FormSender._clear(e),e.onError();
};
return function(){
"object"!=typeof e.resultArgs&&("complete"==this.readyState||"undefined"==typeof this.readyState)&&"sended".indexOf(this.state)>-1&&(this.onload=this.onreadystatechange=null,
t());
};
}(this);
r.body.appendChild(e),e.errorCallback=t,e.onload=e.onreadystatechange=t,e.state="initing",
this._sender=e;
}
if(this.instanceForm)this.instanceForm.target=e.name=e.id,this._sender.submited=!0,
this.instanceForm.submit();else{
var o,n,i=this,a=s.util.userAgent.ie,l=i.data;
if(n='<!DOCTYPE html><html lang="zh-cn"><head><meta http-equiv="content-type" content="text/html; charset='+i.charset+'" /><meta charset="'+i.charset+'" />',
a&&(o='javascript:document.open();document.domain="'+r.domain+'";var me=parent.FormSender.instance["'+i.name+'"];document.write(me.ifrHTML);document.close();'),
n=n+'<script type="text/javascript">'+(a&&'document.charset="'+i.charset+'"'||"")+';document.domain="'+r.domain+'";frameElement.submited=void(0);frameElement.state="sending";</script></head><body>',
n=n+'<form action="'+i.uri+'" accept-charset="'+i.charset+'" id="p" enctype="application/x-www-form-urlencoded;charset='+i.charset+'" method="post">',
n+='<input type="hidden" name="qzreferrer" id="qzreferrer" />',n=n+'</form><script type="text/javascript">var me=parent.FormSender.instance["'+i.name+'"],doc=document,f=doc.getElementById("p"),d=me.jsonData,fg=doc.createDocumentFragment();if(typeof d=="string"){var l=d.split("&");for(var i=0;i<l.length;i++){var kv=l[i].split("=");var ipt=doc.createElement("input");ipt.type="hidden";ipt.name=kv[0];ipt.value=decodeURIComponent(kv[1]);fg.appendChild(ipt);}}else{for(var i in d){var ipt=doc.createElement("input");ipt.type="hidden";ipt.name=i;ipt.value=d[i];fg.appendChild(ipt);}}f.appendChild(fg);doc.getElementById("qzreferrer").value=parent.location.href;f.submit();me.postTime=+new Date;frameElement.submited=true;frameElement.state="sended";</script></body></html>',
i.ifrHTML=n,i.ifrurl=o,i.jsonData=l,a?setTimeout(function(e){
return function(){
e._sender.state="inited",e._sender.src=e.ifrurl;
};
}(i),10):e.src="javascript:;",!a){
var p=e.contentDocument||e.contentWindow.document;
p&&(p.open(),p.write(i.ifrHTML),p.close());
}
}
return!0;
},FormSender.prototype.destroy=function(){
var e=this.name;
return delete FormSender.instance[e]._sender,FormSender.instance[e]._sender=null,
delete FormSender.instance[e],FormSender.counter--,null;
},s.util.ajax.post=function(e){
var t,r,o,n,i=success=error=complete=function(){};
r=e.url,o=e.data,n=e.charset||"utf-8",i=e.beforeSend||i,success=e.success||success,
error=e.error||error,complete=e.complete||complete,t=new FormSender(r,"POST",o,n),
t.onSuccess=function(){
success.apply(null,arguments),complete();
},t.onError=function(){
error.apply(null,arguments),complete();
},i(),t.send();
};
}(),function(){
var e,o,n=s.util.userAgent={},i=navigator.userAgent;
navigator.appVersion,t.ActiveXObject?(n.ie=6,(t.XMLHttpRequest||i.indexOf("MSIE 7.0")>-1)&&(n.ie=7),
(t.XDomainRequest||i.indexOf("Trident/4.0")>-1)&&(n.ie=8),i.indexOf("Trident/5.0")>-1&&(n.ie=9),
i.indexOf("Trident/6.0")>-1&&(n.ie=10),n.isBeta=navigator.appMinorVersion&&navigator.appMinorVersion.toLowerCase().indexOf("beta")>-1):r.getBoxObjectFor||"undefined"!=typeof t.mozInnerScreenX?(e=/(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i,
n.firefox=parseFloat((e.exec(i)||e.exec("Firefox/3.3"))[1],10)):navigator.taintEnabled?t.opera?n.opera=parseFloat(t.opera.version(),10):n.ie=/Trident\/\d+.+rv:(\d+\.\d+?)/i.test(i)?RegExp.$1:6:(o=/AppleWebKit.(\d+\.\d+)/i.exec(i),
n.webkit=o?parseFloat(o[1],10):r.evaluate?r.querySelector?525:420:419,(o=/(?:Chrome|CriOS).(\d+\.\d+)/i.exec(i))||t.chrome?n.chrome=o?parseFloat(o[1],10):"2.0":((o=/Version.(\d+\.\d+)/i.exec(i))||t.safariHandler)&&(n.safari=o?parseFloat(o[1],10):"3.3"),
n.air=i.indexOf("AdobeAIR")>-1?1:0,n.isiPod=i.indexOf("iPod")>-1,n.isiPad=i.indexOf("iPad")>-1,
n.isiPhone=i.indexOf("iPhone")>-1),(n.macs=i.indexOf("Mac OS X")>-1)||(n.windows=(o=/Windows.+?(\d+\.\d+)/i.exec(i),
o&&parseFloat(o[1],10)),n.linux=i.indexOf("Linux")>-1,n.android=i.indexOf("Android")>-1),
n.iOS=i.indexOf("iPhone OS")>-1,!n.iOS&&(o=/OS (\d+(?:_\d+)*) like Mac OS X/i.exec(i),
n.iOS=o&&o[1]?!0:!1);
}(),s.global={
fios:{},
BusinessType:{
COMMON:"common",
BOKE:"boke",
QZONE:"qzone",
WEIBO:"weibo",
CLASS:"class",
WEIXIN:"weixin"
},
UploadType:{
FTN:2,
HTML5:3,
FLASH:1,
FTN_HTML5:4
},
UploadStatus:{
READY:0,
SCAN:1,
UPLOAD:2,
SUCCESS:3,
CANCEL:4,
FAIL:5,
INVALID:6
},
ErrorCode:{
1001:"未登录",
1791:"Flash正在上传不能选择文件",
7e3:"暂不支持该格式",
7001:"文件没有扩展名",
7002:"文件名超长",
7003:"文件超过限制大小",
7004:"文件大小为0",
8001:"文件发送时出现错误",
8002:"上传CGI返回未知错误",
8003:"上传CGI返回超时",
9002:"申请上传返回值为空",
9003:"申请上传调用失败"
},
errorCodeMap:{
"":""
},
getUploaderName:function(e){
var t="";
switch(e){
case s.global.UploadType.FTN:
t="ftn";
break;

case s.global.UploadType.FTN_HTML5:
t="ftnhtml5";
break;

case s.global.UploadType.HTML5:
t="html5";
break;

case s.global.UploadType.FLASH:
t="flash";
}
return t;
},
getUploader:function(e){
var t=this.getUploaderName(e),r=null;
return t&&(r=s[t+"Uploader"]),r;
},
addFio:function(e){
e&&!this.fios[e.uid]&&(this.fios[e.uid]=e);
},
getFio:function(e){
return this.fios[e]||null;
},
getErrorMsg:function(e){
return this.ErrorCode[e]||"";
}
},s.config={
event:{
onSelect:e.noop,
onStart:e.noop,
onUploadStart:e.noop,
onScanProgress:e.noop,
onUploadProgress:e.noop,
onSuccess:e.noop,
onError:e.noop,
onDragEnterPage:e.noop,
onDragLeavePage:e.noop,
onDragEnterTarget:e.noop,
onDragLeaveTarget:e.noop,
onDropTarget:e.noop
},
common:{
uin:0,
encuin:"",
g_tk:"",
businessID:"",
selectButton:null,
useMultiSelect:!1,
maxFileNameLength:255,
timeout:120,
reportCgi:"http://rcgi.video.qq.com/report/upload",
installFtnUrl:"http://mail.qq.com/cgi-bin/readtemplate?t=browser_addon&check=false&s=install&returnto=",
fileType:"*.mp4;*.flv;*.f4v;*.webm;*.m4v;*.mov;*.3gp;*.3g2;*.rm;*.rmvb;*.wmv;*.avi;*.asf;*.mpg;*.mpeg;*.mpe;*.ts;*.div;*.dv;*.divx;*.vob;*.dat;*.mkv;*.swf;*.lavf;*.cpk;*.dirac;*.ram;*.qt;*.fli;*.flc;*.mod;*.mp3;*.aac;*.ac3;*.wav;*.m4a;*.ogg;*.wma;*.ape;",
sort:400,
uploadInfo:{
bid:"",
cid:"",
title:"",
tags:"",
cat:"",
desc:"",
platform:"",
appid:"",
pluginsession:"",
username:""
}
}
},s.reporter={
Step:{
BEFORE:1,
START:2,
PAUSE:3,
SENT:4,
FINISHED:5,
CANCEL:6,
UPLOADING:7,
RETRY:21
},
ErrorType:{
NO:0,
HTTP:1,
CGI:2,
PLUGIN:3
},
report:function(r,o){
function n(o){
var n,i,a,l,p=s.global.getFio(o),u=s.global.getUploader(p.uploadType).config,d={
step:r,
sort:s.config.common.sort,
upid:p.uid,
uptype:p.uploadType,
vid:p.vid,
curl:encodeURIComponent(t.location.href),
fsize:p.size,
upsize:p.processedSize,
speed:p.averageSpeed,
duration:p.startTime?e.now()-p.startTime:0,
errcode:p.errorCode,
errtype:0,
upcgi:""
};
switch(p.uploadType){
case s.global.UploadType.FTN:
e.extend(d,{
exists:p.exists,
serip:p.serverip,
fstep:p.fstep
});
break;

case s.global.UploadType.HTML5:
break;

case s.global.UploadType.FLASH:
e.extend(d,{
surl:u.src,
pfversion:u.version
});
}
if(d.errcode){
var c="";
r==s.reporter.Step.BEFORE?(n=u.tcgi,i=u.tcgiParamKeys):(n=u.upcgi,i=u.upcgiParamKeys),
n&&(a=e.extend({},p),a=s.util.getSubParam(a,i),a.uin=s.config.common.uin,a.g_tk=s.config.common.g_tk,
c=s.util.param(a,n)),e.extend(d,{
errtype:p.errorType,
upcgi:c
});
}
return l=s.util.param(d,s.config.common.reportCgi);
}
function i(e){
var t=n(e);
s.util.log("report: "+t),(new Image).src=t;
}
r==s.reporter.Step.UPLOADING?null==o.reportTimer&&(i(o.uid),o.reportTimer=setInterval(function(e){
return function(){
i(e);
};
}(o.uid),6e4)):(i(o.uid),null==o.reportTimer||r!=s.reporter.Step.SENT&&r!=s.reporter.Step.FINISHED&&r!=s.reporter.Step.CANCEL||(clearInterval(o.reportTimer),
o.reportTimer=null));
}
},s.bossReporter={
STEP:{
SELECT:"select file",
BEFORE:"before upload",
SCANSTART:"scan start",
SCANNING:"scanning",
SCANERROR:"scan error ",
UPLOADSTART:"upload start",
UPLOADING:"uploading",
PAUSE:"upload pause",
SENT:"upload 100% percent",
SENDERROR:"send error ",
FINISHED:"upload finished",
CANCEL:"upload cancel",
RETRY:"upload retry"
},
LOG_LEVEL:{
LOG:1,
WARN:2,
ERROR:3,
UNCAUGHTERROR:4,
SPECIAL:5
},
DEFAULT_REPORT_URL:"http://btrace.qq.com/kvcollect?BossId=3221&Pwd=957851803",
ua:function(){
function e(){
return o.windows?"windows "+o.windows:o.macs?"macs "+o.macs:o.linux?"linux "+o.linux:void 0;
}
function t(){
return o.chrome?"chrome":o.ie?"ie":o.safari?"safari":o.firefox?"firefox":void 0;
}
function r(){
var e=t();
return o[e];
}
var o=s.util.userAgent;
return{
os:e(),
navigator:t(),
navigatorVersion:r()
};
},
queueMap:{
_dc:Math.random()
},
count:0,
savedCount:0,
maxCount:128,
defaultReportTimes:30,
reportTimesMap:{},
doReport:function(e){
var t=this;
t.count++;
for(var r in e)e.hasOwnProperty(r)&&e[r]&&(t.queueMap[r]?t.queueMap[r]+="$"+e[r]:t.queueMap[r]=e[r]);
e.isRightNow?(t.sendReport(),t.savedCount=t.count):(setTimeout(function(){
t.count>t.savedCount&&s.config.common.isReportBoss&&(t.sendReport(),t.savedCount=t.count);
},5e3),t.count>=t.maxCount&&s.config.common.isReportBoss&&t.sendReport());
},
sendReport:function(){
var e=this,t=new Image,r=s.util.param(e.queueMap,e.DEFAULT_REPORT_URL);
t.src=r,e.reset();
},
reset:function(){
var e=this;
e.queueMap={
_dc:Math.random()
},e.count=0,e.savedCount=0;
},
report:function(e){
var t=this;
e=e||{};
var o=e.step||e.errorMsg||"-",n=t.ua(),i=n.navigatorVersion||"-",a=n.navigator||"-",l=n.os||"-",p=s.config.common.uploadInfo&&s.config.common.uploadInfo.username||"-",u=e.url||location.href,d=e.refer||r.referrer,c=e.vid||"-",f=e.isRightNow||!1;
t.doReport({
log_content:o,
ua_navigator_version:i,
ua_navigator:a,
ua_os:l,
uin:p,
vid:c,
url:u,
refer:d,
log_level:e.log_level||t.LOG_LEVEL.LOG,
isRightNow:f
});
},
reportLog:function(e){
var t=this;
e.log_level=t.LOG_LEVEL.LOG,t.report(e);
},
reportWarn:function(e){
var t=this;
e.log_level=t.LOG_LEVEL.WARN,t.report(e);
},
reportError:function(e){
var t=this;
e.log_level=t.LOG_LEVEL.ERROR,t.report(e);
},
reportUncaughtError:function(e){
var t=this,r=e.rkey||"-";
t.reportTimesMap[r]?t.reportTimesMap[r]++:t.reportTimesMap[r]=1,t.reportTimesMap[r]>t.defaultReportTimes||(e.log_level=t.LOG_LEVEL.UNCAUGHTERROR,
t.report(e));
},
reportChangeOldVersionClick:function(){
var e=this,t={};
t.log_level=e.LOG_LEVEL.SPECIAL,t.isRightNow=!0,e.report(t);
}
},s.FileInfo=function(e,t,r,o,n){
this.uploadType=e,this.uid=s.util.getGUID(),this.uploadKey="",this.uploadStatus=s.global.UploadStatus.READY,
this.size=t,this.name=r,this.path=o||"",this.vid="",this.fid="",this.type=s.config.common.businessID,
this.folder="",this.act="",this.uptype=e,this.fsize=t,this.orifname=r,this.title=n?n.title:s.util.getFileName(r,!0),
this.tags=n?n.tags:"",this.desc=n?n.desc:"",this.cat=n?n.cat:"",this.platform=n?n.platform:"",
this.bid=n?n.bid:"",this.cid=n?n.cid:"",this.cgi=n?n.cgi:"",this.appid=n?n.appid:"",
this.pluginsession=n?n.pluginsession:"",this.username=n?n.username:"",this.key="",
this.from="",this.autoRetryNum=0,this.exists="",this.checkkey="",this.serverip="",
this.serverport="",this.sha="",this.sha3="",this.md5="",this.fstep=0,this.upsize=0,
this.upid=this.uid,this.percent=0,this.averageSpeed=0,this.instantSpeed=0,this.processedSize=0,
this.startSize=0,this.errorCode=0,this.errorMsg="",this.errorType=s.reporter.ErrorType.NO,
this.reportTimer=null,this.firstReport=!1,this.startTime=0,this.lastTime=0,this.stopNum=0;
},s.FileInfo.reset=function(e){
e&&e instanceof s.FileInfo&&e.uploadStatus!=s.global.UploadStatus.READY&&(e.uploadStatus=s.global.UploadStatus.READY,
e.autoRetryNum=0,e.fstep=0,e.upsize=0,e.upid=s.util.getGUID(),e.percent=0,e.averageSpeed=0,
e.instantSpeed=0,e.processedSize=0,e.startSize=0,e.errorCode=0,e.errorMsg="",e.errorType=s.reporter.ErrorType.NO,
e.reportTimer=null,e.firstReport=!1,e.startTime=0,e.lastTime=0,e.stopNum=0);
},s.baseUploader=function(){
function t(){}
return t.prototype={
getFio:function(e){
var t=this,r=t.keyToUidMap[e],o=s.global.getFio(r);
return o;
},
setSelectButton:function(t){
var r,o,n,i,a,s,l=this;
l.inited&&(t&&0!=t.length||(t=e(l.config.selectButton),0!=t.length))&&(a=l.getSelectButtonOverlay(),
a?(i=e(a),s="none"==t.css("display"),s&&t.css({
visibility:"hidden",
display:""
}),r=t.offset(),o=t.outerWidth(),n=t.outerHeight(),s&&t.css({
display:"none",
visibility:""
}),i.css({
left:r.left+"px",
top:r.top+"px",
width:o+"px",
height:n+"px",
"z-index":"8888"
}).attr({
width:o,
height:n
})):(e(l.config.selectButton).unbind("click"),t.bind("click",function(){
l.openSelectFileWindow();
})),l.config.selectButton=t);
},
checkFile:function(e){
var t,r,o=this,n=0;
t=e.name.lastIndexOf("."),1790==e.errorCode?(n=7003,e.size=-1):1791==e.errorCode||(0==e.size?n=7004:e.size>=1024*o.config.maxFileSize*1024||e.size<0?n=7003:s.util.getRealLen(e.name)>s.config.common.maxFileNameLength?n=7002:t>0?(r=e.name.substr(t).toLowerCase(),
(-1==s.config.common.fileType.indexOf(r+";")||".dat"==r&&e.size<512e3)&&(n=7e3)):n=7001),
0!=n&&(e.errorCode=n);
},
getVid:function(t,r,o){
var n=this,i=n.config.tcgiParamKeys,a=e.extend({},t),l=n.config.tcgiHttpMethod,p=s.util.param({
g_tk:s.config.common.g_tk
},n.config.tcgi);
a=s.util.getSubParam(a,i),e.extend(a,{
uin:s.config.common.uin,
encuin:s.config.common.encuin,
g_tk:s.config.common.g_tk,
otype:"json"
}),s.util.ajax({
url:p,
type:l,
data:a,
success:function(e){
e&&"o"==e.s?r(e):(e||(e={
em:9002,
msg:"申请上传返回值为空"
}),o(e));
},
error:function(){
o({
em:9003,
msg:"申请上传调用失败"
});
}
});
},
handleProgressData:function(t,r,o){
if(null!=t.lastTime&&null!=t.startTime){
var n,i=e.now(),a=i-t.lastTime,s=i-t.startTime,l=r.bytesProcessed;
if(0==a&&(a=.01),0==s&&(s=.01),l>t.size&&(l=t.size),o){
if(262144==l)return 0;
n=0==t.startSize,n&&(t.startSize=l);
}
return t.instantSpeed=Math.round(1e3*(l-(o&&n?t.startSize:0)-t.processedSize)/a),
t.instantSpeed<0&&(t.instantSpeed=0),t.averageSpeed=Math.round(1e3*(l-(o?t.startSize:0))/s),
t.averageSpeed<0&&(t.averageSpeed=0),t.percent=(l/t.size*100).toFixed(1),t.processedSize=l,
t.lastTime=i,a;
}
},
inited:!1,
config:{},
keyToUidMap:{},
init:e.noop,
start:e.noop,
cancel:e.noop,
isSupport:function(){
return!1;
},
selectFile:e.noop,
openSelectFileWindow:e.noop,
getSelectButtonOverlay:e.noop
},t;
}(),s.config.ftn={
id:"tvu_ftnuploader_obj",
maxFileSize:s.util.userAgent.ie?4096:2048,
selectButton:null,
tcgi:"http://c.v.qq.com/openfvupready",
tcgiParamKeys:["vid","type","tags","cid","bid","platform","cat","desc","act","title","folder","orifname","size","uptype","sha","sha3","md5","key"],
tcgiHttpMethod:"post",
blockSize:262144,
autoRetry:!1,
maxAutoRetryNum:3,
style:"height:0;width:0;margin:0;padding:0;",
containerStyle:"height:0;width:0;margin:0;padding:0;visibility:hidden;overflow:hidden;"
},s.ftnUploader=function(){
function o(){
function o(){
var t=[];
if(!U)if(s.util.userAgent.ie)try{
U=new ActiveXObject("TXFTNActiveX.FTNUpload");
}catch(o){
s.util.log("ftn activex init fail");
}else navigator.mimeTypes&&navigator.mimeTypes["application/txftn-webkit"]?(t.push('<div style="',R.containerStyle,'"><embed id="',R.id,'" type="application/txftn-webkit" style="',R.style,'"></embed></div>'),
e(r.body).append(t.join("")),U=r.getElementById(R.id)):s.util.log("ftn webkit init fail");
return!!U;
}
function n(){
U.OnEvent=b,U.BlockSize=R.blockSize;
try{
U.TimeOut=1e3*T.common.timeout;
}catch(t){
s.util.log("ftn set timeout fail");
}
e(R.selectButton).bind("click",function(e){
i(),e.preventDefault();
});
}
function i(){
try{
var e,r,o=[];
if(!E.inited)return;
if(s.util.userAgent.firefox&&U.focus(),T.useMultiSelect||"undefined"==typeof U.SelectFile?s.util.userAgent.firefox&&U.SelectFilesAsync?U.SelectFilesAsync(t,function(t){
if(e=t){
e=e.replace(/^\r\n/,"").replace(/\r\n$/,"").split("\r\n");
for(var n=0,i=e.length;i>n;n++)r=e[n],r&&o.push(a(r));
l(o);
}
}):U.SelectFiles?e=U.SelectFiles(t):alert("为保障您稳定优质的上传体验，建议您按照浏览器顶部提示安装控件，并选择允许长期运行\n如果已经安装，则直接选择允许长期运行，最后刷新页面即可"):e=U.SelectFile(t),
!e)return;
e=e.replace(/^\r\n/,"").replace(/\r\n$/,"").split("\r\n");
for(var n=0,i=e.length;i>n;n++)r=e[n],r&&o.push(a(r));
l(o);
}catch(p){
s.bossReporter.reportUncaughtError({
errorMsg:p.message+" at function selectFile in file tvu.ftnuploader.js"
});
}
}
function a(e){
var t,r,o;
return t="undefined"!=typeof U.GetFileSizeString?U.GetFileSizeString(e):U.GetFileSize(e),
t=Math.abs(t||0),r=s.util.getFileName(e),o=new s.FileInfo(s.global.UploadType.FTN,t,r,e,T.common.uploadInfo);
}
function l(e){
T.event.onSelect(e),s.bossReporter.report({
step:"use ftn"
}),s.bossReporter.report({
step:s.bossReporter.STEP.SELECT
});
}
function p(t){
var r=E.getFio(t.uploadKey);
r.md5=t.md5,r.sha=t.sha,r.sha3=t.sha3,r.percent=0,r.averageSpeed=0,r.instantSpeed=0,
r.processedSize=0,r.startSize=0,E.getVid(r,function(t){
r.exists=t.exists,r.checkkey=t.checkkey,r.vid=t.vid,r.fid=t.fid,r.serverip=t.serverip,
r.serverport=t.serverport,s.reporter.report(s.reporter.Step.BEFORE,r),s.bossReporter.report({
step:s.bossReporter.STEP.BEFORE,
vid:r.vid
}),T.event.onUploadStart(r),s.reporter.report(s.reporter.Step.UPLOADING,r),s.bossReporter.report({
step:s.bossReporter.STEP.UPLOADING,
vid:r.vid
}),r.uploadStatus=s.global.UploadStatus.UPLOAD,r.startTime=r.lastTime=e.now(),y(r);
},function(e){
r.errorCode=e.em,r.errorMsg=e.msg,r.errorType=s.reporter.ErrorType.CGI,s.reporter.report(s.reporter.Step.BEFORE,r),
s.bossReporter.report({
step:s.bossReporter.STEP.BEFORE+r.errorMsg,
vid:r.vid
}),v(r);
});
}
function u(e){
try{
var t,r=E.getFio(e.uploadKey);
e.uploadKey||s.bossReporter.reportUncaughtError({
rkey:"ftnuploader-onScanProgress",
errorMsg:"no uploadKey"
}),t=E.handleProgressData(r,e),T.event.onScanProgress(r),r.firstBossReportScanning||(s.bossReporter.report({
step:s.bossReporter.STEP.SCANNING,
vid:r.vid
}),r.firstBossReportScanning=1);
}catch(o){
s.bossReporter.reportUncaughtError({
rkey:"ftnuploader-onScanProgress",
errorMsg:o.message+" at function onScanProgress in file tvu.ftnuploader.js "
});
}
}
function d(e){
try{
var t,r=E.getFio(e.uploadKey);
if(t=E.handleProgressData(r,e,!0),0==t)return;
0==r.firstReport&&(r.firstReport=1,s.reporter.report(s.reporter.Step.START,r),s.bossReporter.report({
step:s.bossReporter.STEP.UPLOADSTART,
vid:r.vid
})),1e3>t||t>1e4&&r.stopNum<60&&(r.fstep=e.fstep,s.reporter.report(s.reporter.Step.PAUSE,r),
s.bossReporter.report({
step:s.bossReporter.STEP.PAUSE,
vid:r.vid
}),r.stopNum++),T.event.onUploadProgress(r);
}catch(o){
s.bossReporter.reportUncaughtError({
rkey:"ftnuploader-onSendProgress",
errorMsg:o.message+" at function onSendProgress in file tvu.ftnuploader.js "
});
}
}
function c(e){
var t=E.getFio(e.uploadKey);
t.fstep=e.fstep,s.reporter.report(s.reporter.Step.SENT,t),s.bossReporter.report({
step:s.bossReporter.STEP.SENT,
vid:t.vid
});
}
function f(e){
var t=E.getFio(e.uploadKey);
t.percent="100.0",t.fstep=e.fstep,s.reporter.report(s.reporter.Step.FINISHED,t),
s.bossReporter.report({
step:s.bossReporter.STEP.FINISHED,
vid:t.vid
}),t.uploadStatus=s.global.UploadStatus.SUCCESS,T.event.onSuccess(t);
}
function g(e){
var t=E.getFio(e.uploadKey);
t.errorCode=e.errorCode,t.errorType=s.reporter.ErrorType.PLUGIN,t.fstep=e.fstep,
s.reporter.report(s.reporter.Step.PAUSE,t),s.bossReporter.report({
step:s.bossReporter.STEP.SCANERROR+t.errorMsg,
vid:t.vid
}),v(t);
}
function h(e){
var t=E.getFio(e.uploadKey);
t.errorCode=e.errorCode,t.errorType=s.reporter.ErrorType.PLUGIN,t.fstep=e.fstep,
R.autoRetry&&t.autoRetryNum<R.maxAutoRetryNum?(t.autoRetryNum++,s.reporter.report(s.reporter.Step.RETRY,t),
s.bossReporter.report({
step:s.bossReporter.STEP.RETRY,
vid:t.vid
}),y(t)):(s.reporter.report(s.reporter.Step.FINISHED,t),s.bossReporter.reportError({
step:s.bossReporter.STEP.SENDERROR+", errorCode: "+t.errorCode+", errorMsg: "+t.errorMsg,
vid:t.vid
}),v(t));
}
function v(e){
e.uploadStatus=s.global.UploadStatus.FAIL,T.event.onError(e),s.bossReporter.reportError({
errorMsg:"error, errorCode: "+e.errorCode+", errorMsg: "+e.errorMsg,
vid:e.vid
});
}
function m(e){
T.event.onStart(e),S(e);
}
function S(t){
t.uploadStatus=s.global.UploadStatus.SCAN,t.startTime=t.lastTime=e.now(),t.uploadKey=U.FileSign(t.path,t.uid),
F[t.uploadKey]=t.uid;
}
function y(e){
e.uploadStatus!=s.global.UploadStatus.CANCEL&&(delete F[e.uploadKey],e.uploadKey=U.UploadFile(e.serverip,80,e.checkkey,e.sha,"/"+e.vid,e.path,e.uid),
F[e.uploadKey]=e.uid);
}
function b(e){
var t;
if(e&&e.LocalID)switch(t=e.LocalID,e.EventType){
case 1:
0==e.ErrorCode&&0==e.Step?p({
uploadKey:t,
md5:e.Md5,
sha:e.SHA,
sha3:e.SHA3,
fstep:e.Step
}):g({
uploadKey:t,
errorCode:e.ErrorCode,
fstep:e.Step
});
break;

case 2:
u({
uploadKey:t,
bytesProcessed:e.Processed>>>0,
bytesTotal:e.FileSize>>>0,
fstep:e.Step
});
break;

case 3:
0==e.ErrorCode&&0==e.Step?(c({
uploadKey:t,
fstep:e.Step
}),f({
uploadKey:t,
fstep:e.Step
})):h({
uploadKey:t,
errorCode:e.ErrorCode,
fstep:e.Step
});
break;

case 4:
d({
uploadKey:t,
bytesProcessed:e.Processed>>>0,
bytesTotal:e.FileSize>>>0,
fstep:e.Step
});
}
}
var E=this,T=s.config,R=T.ftn,U=null,F={};
this.inited=!1,this.keyToUidMap=F,this.config=R,this.init=function(){
if(!E.inited){
if(!o())return;
n(),E.inited=!0;
}
},this.start=function(e){
E.inited&&m(e);
},this.cancel=function(e){
E.inited&&(s.reporter.report(s.reporter.Step.CANCEL,e),s.bossReporter.report({
step:s.bossReporter.STEP.CANCEL,
vid:e.vid
}),e.uploadStatus==s.global.UploadStatus.SCAN?"undefined"!=typeof U.StopFileSign&&U.StopFileSign(e.uploadKey):e.uploadStatus==s.global.UploadStatus.UPLOAD&&U.StopUpload(e.uploadKey));
},this.isSupport=function(){
return o();
},this.selectFile=function(e,t){
var r=null;
return E.inited&&e&&(r=a(e,t),t&&(r.vid=t),l([r])),r;
},this.openSelectFileWindow=function(){
E.inited&&i();
};
}
return s.util.extend(o,s.baseUploader),new o;
}(),s.config.ftnhtml5={
id:"tvu_ftnhtml5uploader_obj",
maxFileSize:4096,
selectButton:null,
dropTarget:null,
tcgi:"http://c.v.qq.com/vupready",
tcgiParamKeys:["vid","type","tags","cid","bid","platform","cat","desc","act","title","folder","orifname","size","uptype","sha","sha3","md5","key"],
tcgiHttpMethod:"post",
width:"0",
height:"0",
style:"height:0;width:0;margin:0;padding:0;",
containerStyle:"height:0;width:0;margin:0;padding:0;visibility:hidden;overflow:hidden;",
workerPath:(location.protocol?location.protocol:"http:")+"//imgcache.qq.com/tencentvideo_v1/tvu/js/ftnh5_weixin/tvu.uploader.worker.js?v=20160120"
},s.ftnhtml5=s.ftnhtml5||{},function(e,t){
s.ftnhtml5=s.ftnhtml5||{},s.ftnhtml5.Emitter=t();
}(t,function(){
function e(e){
return e?t(e):void 0;
}
function t(t){
for(var r in e.prototype)t[r]=e.prototype[r];
return t;
}
return e.prototype.on=e.prototype.addEventListener=function(e,t){
return this._callbacks=this._callbacks||{},(this._callbacks["$"+e]=this._callbacks["$"+e]||[]).push(t),
this;
},e.prototype.one=function(e,t){
function r(){
this.off(e,r),t.apply(this,arguments);
}
return r.fn=t,this.on(e,r),this;
},e.prototype.off=e.prototype.removeListener=e.prototype.removeAllListeners=e.prototype.removeEventListener=function(e,t){
if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},
this;
var r=this._callbacks["$"+e];
if(!r)return this;
if(1==arguments.length)return delete this._callbacks["$"+e],this;
for(var o,n=0;n<r.length;n++)if(o=r[n],o===t||o.fn===t){
r.splice(n,1);
break;
}
return this;
},e.prototype.emit=function(e){
this._callbacks=this._callbacks||{};
var t=[].slice.call(arguments,1),r=this._callbacks["$"+e];
if(r){
r=r.slice(0);
for(var o=0,n=r.length;n>o;++o)r[o].apply(this,t);
}
return this;
},e.prototype.listeners=function(e){
return this._callbacks=this._callbacks||{},this._callbacks["$"+e]||[];
},e.prototype.hasListeners=function(e){
return!!this.listeners(e).length;
},e;
}),function(e,t){
s.ftnhtml5=s.ftnhtml5||{},s.ftnhtml5.CONST_DEF=t();
}(self||t,function(){
var e={
EventType:{
SEND:{
FILE_SCAN:11,
FILE_SCAN_CANCEL:12,
BUF_SCAN:21,
FILE_UPLOAD:31,
FILE_UPLOAD_CANCEL:32
},
REPLY:{
SCAN_START:11,
SCAN_ING:12,
SCAN_SUCCESS:13,
SCAN_CANCEL:14,
SCAN_ERROR:15,
UPLOAD_START:21,
UPLOAD_ING:22,
UPLOAD_SUCCESS:23,
UPLOAD_CANCEL:24,
UPLOAD_ERROR:25,
SET_FIOSTARTTIME_FIOLASTTIME:100
}
},
AlgType:{
MD5:1,
SHA1:2
}
};
return e;
}),function(e,t){
s.ftnhtml5=s.ftnhtml5||{},s.ftnhtml5.DataDict=t();
}(self||t,function(){
function e(){
this.buffer=null,this.byteTotalLength=0,this.fieldNum=0,this.fieldMap={},this.fieldArr=[];
}
return e.prototype={
add:function(e){
for(var t=this,r="[object Array]"===Object.prototype.toString.call(e)?e:[e],o=0,n=r.length;n>o;o++){
var i=r[o],a=t.fieldNum++;
i.name||(i.name="Field_"+a),i.index=a,t.fieldMap[i.name]=i;
}
t.fieldArr=t.getFieldArray();
},
update:function(e,t){
var r=this,o=r.fieldMap[e];
if(o)for(var n in t)t.hasOwnProperty(n)&&(o[n]=t[n]);
},
get:function(e){
var t=this,r=t.fieldMap;
return r[e];
},
getItemValue:function(e){
var t=this,r=t.fieldMap;
return r[e]?r[e].value:0;
},
getItemOffset:function(e){
var t=this,r=t.fieldMap;
return r[e]?r[e].offset:0;
},
remove:function(){},
setBuffer:function(e){
this.buffer=e,this.byteTotalLength=this.buffer.byteLength;
},
fixEncodeField:function(){
var e=this,t=e.fieldMap;
for(var r in t)if(t.hasOwnProperty(r)){
var o=t[r];
if("string"==o.type){
var n=null;
n=1==o.hex?i(o.value):a(o.value,o.encoding),o.type="arraybuffer",o.length=n.byteLength,
o.value=n;
}
"arraybuffer"==o.type&&(o.length=o.value.byteLength);
}
for(var r in t)if(t.hasOwnProperty(r)){
var o=t[r];
if(o.calFieldName){
var s=o.calFieldName;
if(t[s]){
var l=t[s];
o.value=l.length;
}
}
}
for(var p=0,u=e.fieldArr,d=0,c=u.length;c>d;d++){
var o=u[d];
o.offset=p,p+=o.length;
}
},
calTotalLength:function(){
var e=this,t=e.fieldMap,r=0;
for(var o in t)if(t.hasOwnProperty(o)){
var n=t[o];
r+=n.length;
}
e.byteTotalLength=r;
},
encode:function(){
var e=this;
e.fixEncodeField(),e.calTotalLength();
for(var t=e.getFieldArray(),r=e.byteTotalLength,o=new ArrayBuffer(r),n=new DataView(o),i=0,a=0,s=t.length;s>a;a++){
var l=t[a];
if(!(l.length<=0))switch(l.type){
case"int":
i=e.encodeIntField(n,l,i);
break;

case"arraybuffer":
i=e.encodeArrayBufferField(n,l,i);
break;

case"string":
i=e.encodeStringField(n,l,i);
}
}
return e.buffer=o,o;
},
encodeIntField:function(e,t,r){
var o=t.length;
return 1==o?e.setUint8(r,t.value,t.littleEndian):2==o?e.setUint16(r,t.value,t.littleEndian):4==o&&e.setUint32(r,t.value,t.littleEndian),
r+o;
},
encodeArrayBufferField:function(e,t,r){
var o=t.length,n=new Uint8Array(e.buffer),i=new Uint8Array(t.value);
return n.set(i,r),r+o;
},
encodeStringField:function(e,t,r){
var o=t.length,n=new Uint8Array(e.buffer),i=a(t.value),s=new Uint8Array(i);
return n.set(s,r),r+o;
},
decode:function(){
var e=this,t=e.buffer,r=e.getFieldArray();
if(!t||r.length<=0)return null;
for(var o=new DataView(t),n=(new Uint8Array(t),0),i=0,a=r.length;a>i;i++){
var s=r[i];
switch(s.type){
case"int":
n=e.decodeIntField(o,s,n);
break;

case"arraybuffer":
n=e.decodeArrayBufferField(o,s,n);
break;

case"string":
n=e.decodeStringField(o,s,n);
}
}
return e.fieldMap;
},
decodeIntField:function(e,t,r){
var o=this,n=t.length,i=0,a=r+n;
return e.byteLength<a||(1==n?i=e.getUint8(r,t.littleEndian):2==n?i=e.getUint16(r,t.littleEndian):4==n&&(i=e.getUint32(r,t.littleEndian))),
t.value=i,o.fixDecodeField(t),a;
},
decodeArrayBufferField:function(e,t,r){
var o=t.length,n=r+o;
if(e.byteLength<n)t.value=null;else{
var i=new Uint8Array(e.buffer,r,o);
t.value=i.buffer;
}
return n;
},
decodeStringField:function(e,t,r){
var o=t.length,i=r+o;
if(e.byteLength<i)t.value="";else{
var a=new Uint8Array(e.buffer,r,o);
t.value=n(a.buffer,t.encoding);
}
return i;
},
fixDecodeField:function(e){
var t=this,r=t.fieldMap;
if(e.calFieldName){
var o=e.calFieldName;
if(r[o]){
var n=r[o];
n.length=e.value;
}
}
},
getFieldArray:function(){
var e=this,t=e.fieldMap,r=[];
for(var o in t)if(t.hasOwnProperty(o)){
var n=t[o];
r.push(n);
}
return r.sort(function(e,t){
return e.index-t.index;
}),r;
}
},e;
}),function(e,t){
s.ftnhtml5=s.ftnhtml5||{},s.ftnhtml5.WorkerAdapter=t(e);
}(t,function(){
function e(e,r,o){
var n=new XMLHttpRequest,i=(new Date).getTime();
n.addEventListener("load",function(){
var e=this,n=new Worker(t.URL.createObjectURL(new Blob([e.responseText],{
type:"text/javascript"
})));
r&&r.call(o,n);
},!1),n.addEventListener("error",function(e){
r&&r.call(o,null,e,i);
},!1),n.open("get",e,!0),n.send();
}
function r(e){
n.call(this),this.worker=null,e=e||{},this.options=e,this.inited=!1,this.init();
}
var o=s.ftnhtml5,n=o.Emitter,i=o.CONST_DEF,a=i.EventType,l=i.AlgType;
s.util.extend(r,n);
var p={
retryGetWorkerTimes:0,
maxRetryGetWorkerTimes:1,
init:function(){
var t=this,r=t.options,o=r.path;
e(o,function(e,r,o){
if(e){
var n=t.worker=e;
n.addEventListener("message",function(e){
var r=e.data;
t._HandleMessage(r);
},!1),t.inited=!0,t.emit("init");
}else if(t.retryGetWorkerTimes<t.maxRetryGetWorkerTimes)t.retryGetWorkerTimes++,
t.init();else{
t.emit("message",{
eventType:a.REPLY.UPLOAD_ERROR,
result:{
code:1987,
msg:"获取worker内容失败，请刷新后重试",
errorType:s.reporter.ErrorType.PLUGIN
}
});
var i=r.target.status,l=r.timeStamp-o,p=r.target.readyState;
s.bossReporter.reportError({
errorMsg:"获取worker内容失败，status: "+i+", readyState: "+p+", timeStamp: "+l
});
}
},t);
},
_HandleMessage:function(e){
var t=this,r=e.eventType;
switch(e.uniqueKey,r){
case a.REPLY.SCAN_START:
break;

case a.REPLY.SCAN_ING:
e.result.processed;
break;

case a.REPLY.SCAN_SUCCESS:
break;

case a.REPLY.SCAN_CANCEL:
break;

case a.REPLY.UPLOAD_START:
break;

case a.REPLY.UPLOAD_ING:
break;

case a.REPLY.UPLOAD_SUCCESS:
break;

case a.REPLY.UPLOAD_CANCEL:
break;

case a.REPLY.UPLOAD_ERROR:}
t.emit("message",e);
},
postMessage:function(e){
var t=this;
t.inited?t.worker.postMessage(e):t.one("init",function(){
t.worker.postMessage(e);
});
},
calFileMd5:function(e,t){
var r={
uniqueKey:e.uniqueKey,
eventType:a.SEND.FILE_SCAN,
algType:l.MD5,
fileInfo:e
};
this.postMessage(r,t);
},
calFileSha1:function(e,t){
var r={
uniqueKey:e.uniqueKey,
eventType:a.SEND.FILE_SCAN,
algType:l.SHA1,
fileInfo:e
};
this.postMessage(r,t);
},
calBufferMd5:function(e,t){
var r={
uniqueKey:e.uniqueKey,
eventType:a.SEND.BUF_SCAN,
algType:l.MD5,
bufferInfo:e
};
this.postMessage(r,t);
},
cancelCal:function(e,t,r){
var o={
uniqueKey:e,
eventType:a.SEND.FILE_SCAN_CANCEL,
algType:t
};
this.postMessage(o,r);
},
uploadFile:function(e,t){
var r={
uniqueKey:e.uploadKey,
eventType:a.SEND.FILE_UPLOAD,
fileInfo:e,
file:t
};
this.postMessage(r);
},
cancelUpload:function(e){
var t={
uniqueKey:e,
eventType:a.SEND.FILE_UPLOAD_CANCEL
};
this.postMessage(t);
},
terminate:function(){
this.worker&&(this.worker.terminate(),this.worker=null);
}
};
for(var u in p)p.hasOwnProperty(u)&&(r.prototype[u]=p[u]);
return r;
}),function(e,t){
s.ftnhtml5=s.ftnhtml5||{},s.ftnhtml5.UploadCore=t();
}(t,function(){
function e(e,t){
i.call(this),this.fio=e||{},this.file=t;
for(var r=0,o=d.length;o>r;r++){
var n=d[r];
this[n]=c;
}
this._init();
}
var r=s.config,o=r.ftnhtml5,n=s.ftnhtml5,i=n.Emitter,a=n.WorkerAdapter,l=n.CONST_DEF,p=l.EventType,u=l.AlgType,d=(t.jQuery,
["onStart","onScanStart","onScanProgress","onUploadStart","onUploadProgress","onSuccess","onCancel","onError"]),c=function(){};
s.util.extend(e,i);
var f={
_init:function(){
var e=this;
e.on("uploadevent",function(t){
var r=t.name,o=t.extData,n=e.fio;
e[r]&&e[r](n,o);
}),e.on("algfinish",function(t){
e._onAlgFinish(t);
}),e.on("getvid",function(){
var t=e.fio;
t.uploadStatus!=s.global.UploadStatus.UPLOAD&&e.uploadFile();
});
},
start:function(){
var e=this;
e.fio.uploadStatus=s.global.UploadStatus.READY,e.createWorkerAdapter(),e.emit("uploadevent",{
name:"onStart"
}),e.scanFile();
},
cancel:function(){
var e=this.fio;
e.uploadStatus==s.global.UploadStatus.SCAN?this.cancelScan():e.uploadStatus==s.global.UploadStatus.UPLOAD&&this.cancelUpload();
},
getVid:function(){},
_onAlgFinish:function(e){
var t=this,r=t.fio,o=e.algType,n=e.result.hash;
o==u.SHA1?(r.sha=n,t.waAlgSha.terminate(),t.waAlgSha=null):(r.md5=n,t.waAlgMd5.terminate(),
t.waAlgMd5=null),t._checkAlgHashReady();
},
_checkAlgHashReady:function(){
var e=this,t=e.fio;
t.sha&&t.md5&&e.getVid();
},
_handleMessage:function(e){
var t=this,r=t.fio,o=e.eventType;
switch(e.uniqueKey,o){
case p.REPLY.SCAN_START:
t.emit("uploadevent",{
name:"onScanStart"
});
break;

case p.REPLY.SCAN_ING:
var n=e.algType,i=e.result.processed;
n==u.SHA1?r.processedSizeSha=i:r.processedSizeMd5=i,r.processedSize=Math.min(r.processedSizeSha,r.processedSizeMd5),
isNaN(r.processedSize)&&(r.processedSize=0),r.percent=(r.processedSize/r.size*100).toFixed(2),
t.emit("uploadevent",{
name:"onScanProgress",
extData:{
bytesProcessed:r.processedSize,
bytesTotal:r.size
}
});
break;

case p.REPLY.SCAN_SUCCESS:
t.emit("algfinish",e);
break;

case p.REPLY.SCAN_CANCEL:
t.emit("uploadevent",{
name:"onCancel"
});
break;

case p.REPLY.UPLOAD_START:
t.emit("uploadevent",{
name:"onUploadStart"
});
break;

case p.REPLY.UPLOAD_ING:
var i=e.result.processed;
r.percent=(i/r.size*100).toFixed(2),t.emit("uploadevent",{
name:"onUploadProgress",
extData:{
bytesProcessed:i,
bytesTotal:r.size
}
});
break;

case p.REPLY.UPLOAD_SUCCESS:
t.emit("uploadevent",{
name:"onSuccess"
}),t.waUpload.terminate(),t.waUpload=null;
break;

case p.REPLY.UPLOAD_CANCEL:
t.emit("uploadevent",{
name:"onCancel"
});
break;

case p.REPLY.UPLOAD_ERROR:
r.errorCode=e.result.code,r.errorMsg=e.result.msg,r.errorType=e.result.errorType,
t.emit("uploadevent",{
name:"onError"
});
break;

case p.REPLY.SET_FIOSTARTTIME_FIOLASTTIME:
r.lastTime=r.startTime=e.result.now;
}
},
createWorkerAdapter:function(){
try{
var e=this;
e.waAlgMd5||(e.waAlgMd5=new a({
path:o.workerPath
}),e.waAlgMd5.on("message",function(t){
e._handleMessage(t);
})),e.waAlgSha||(e.waAlgSha=new a({
path:o.workerPath
}),e.waAlgSha.on("message",function(t){
e._handleMessage(t);
})),e.waUpload||(e.waUpload=new a({
path:o.workerPath
}),e.waUpload.on("message",function(t){
e._handleMessage(t);
}));
}catch(t){
s.bossReporter.reportUncaughtError({
errorMsg:t.message+" at function createWorkerAdapter in file upload.core.js "
});
}
},
scanFile:function(){
try{
var e=this,t=e.fio;
t.uploadStatus=s.global.UploadStatus.SCAN,t.md5?e._checkAlgHashReady():e.waAlgMd5.calFileMd5({
file:e.file,
uniqueKey:t.uploadKey
}),t.sha?e._checkAlgHashReady():e.waAlgSha.calFileSha1({
file:e.file,
uniqueKey:t.uploadKey
});
}catch(r){
s.bossReporter.reportUncaughtError({
errorMsg:r.message+" at function scanFile in file upload.core.js "
});
}
},
cancelScan:function(){
var e=this,t=e.fio,r=t.uploadKey;
e.waAlgMd5&&e.waAlgMd5.cancelCal(r,u.MD5),e.waAlgSha&&e.waAlgSha.cancelCal(r,u.SHA1);
},
uploadFile:function(){
try{
var e=this,t=e.fio;
t.uploadStatus=s.global.UploadStatus.UPLOAD,e.waUpload.uploadFile(t,e.file);
}catch(r){
s.bossReporter.reportUncaughtError({
errorMsg:r.message+" at function uploadFile in file upload.core.js"
});
}
},
cancelUpload:function(){
var e=this,t=e.fio,r=t.uploadKey;
e.waUpload.cancelUpload(r);
}
};
for(var g in f)f.hasOwnProperty(g)&&(e.prototype[g]=f[g]);
return e;
}),s.ftnhtml5Uploader=function(){
function n(){
function n(){
t.console&&console.log;
}
function i(){
var t='<div style="'+T.containerStyle+'"><input name="Filedata" type="file" id="'+T.id+'" style="'+T.style+'" width="'+T.width+'" height="'+T.height+'"'+(E.common.useMultiSelect?' multiple="multiple"':"")+" /></div>";
return e(r.body).append(t),inputObj=r.getElementById(T.id),!!inputObj;
}
function a(e){
var t;
return t=new s.FileInfo(s.global.UploadType.FTN_HTML5,e.size,e.name,"",E.common.uploadInfo),
t.uploadKey=s.util.getGUID(),t;
}
function l(e){
var t=a(e),r=new R.UploadCore(t,e);
return r.onStart=d,r.onScanStart=c,r.onScanProgress=f,r.onUploadStart=g,r.onUploadProgress=h,
r.onSuccess=v,r.onCancel=m,r.onError=S,r.getVid=function(){
var e=this,t=e.fio;
b.getVid(t,function(r){
t.exists=r.exists,t.checkkey=r.checkkey,t.vid=r.vid,t.fid=r.fid,t.serverip=r.serverip,
t.serverport=r.serverport,s.bossReporter.report({
step:s.bossReporter.STEP.BEFORE,
vid:t.vid
}),e.emit("getvid");
},function(e){
t.errorCode=e.em,t.errorMsg=e.msg,t.errorType=s.reporter.ErrorType.CGI,s.reporter.report(s.reporter.Step.BEFORE,t),
s.bossReporter.report({
step:s.bossReporter.STEP.BEFORE,
vid:t.vid
}),S(t);
});
},U[t.uploadKey]=r,t;
}
function p(){
var t,o,n=r.body,i=10;
!T.dropTarget&&(T.dropTarget=r.body),n.addEventListener("dragenter",function(r){
r.preventDefault(),r.stopPropagation(),t=e.now(),E.event.onDragEnterPage();
},!1),n.addEventListener("dragleave",function(r){
r.stopPropagation(),r.preventDefault(),e.now()-t>i&&E.event.onDragLeavePage();
},!1),n.addEventListener("dragover",function(e){
e.preventDefault(),e.stopPropagation();
},!1),n.addEventListener("drop",function(e){
e.preventDefault(),e.stopPropagation(),E.event.onDragLeavePage();
},!1),T.dropTarget.addEventListener("dragenter",function(){
o=e.now(),E.event.onDragEnterTarget();
},!1),T.dropTarget.addEventListener("dragleave",function(){
e.now()-o>i&&E.event.onDragLeaveTarget();
},!1),T.dropTarget.addEventListener("drop",function(e){
var t;
E.event.onDragLeaveTarget(),E.event.onDropTarget(),t=e.dataTransfer.files,0!=t.length&&u(t);
},!1),inputObj.addEventListener("change",function(){
var e=this.files;
0!=e.length&&(u(e),inputObj.value="");
},!1),s.bossReporter.report({
step:"use ftnhtml5"
});
}
function u(e){
for(var t,r=[],o=0,n=e.length;n>o;o++){
t=e[o];
var i=l(t);
r.push(i);
}
E.event.onSelect(r),s.bossReporter.report({
step:s.bossReporter.STEP.SELECT
});
}
function d(e){
n("onStart "+e.name),E.event.onStart(e),s.bossReporter.report({
step:s.bossReporter.STEP.SCANSTART,
vid:e.vid
});
}
function c(e){
s.bossReporter.report({
step:s.bossReporter.STEP.SCANSTART,
vid:e.vid
});
}
function f(e,t){
try{
b.handleProgressData(e,t),E.event.onScanProgress(e),e.firstBossReportScanning||(s.bossReporter.report({
step:s.bossReporter.STEP.SCANNING,
vid:e.vid
}),e.firstBossReportScanning=1);
}catch(r){
s.bossReporter.reportUncaughtError({
rkey:"ftnhtml5uploader-onScanProgress",
errorMsg:r.message+" at function onScanProgress in file tvu.ftnhtml5uploader.js "
});
}
}
function g(e){
n("onUploadStart "+e.name),E.event.onUploadStart(e),s.bossReporter.report({
step:s.bossReporter.STEP.UPLOADSTART,
vid:e.vid
});
}
function h(e,t){
try{
var r=!0;
b.handleProgressData(e,t,r),E.event.onUploadProgress(e),e.firstBossReportUploading||(s.bossReporter.report({
step:s.bossReporter.STEP.UPLOADING,
vid:e.vid
}),e.firstBossReportUploading=1);
}catch(o){
s.bossReporter.reportUncaughtError({
rkey:"ftnhtml5uploader-onUploadProgress",
errorMsg:o.message+" at function onUploadProgress in file tvu.ftnhtml5uploader.js "
});
}
}
function v(e){
n("onSuccess "+e.name),e.uploadStatus=s.global.UploadStatus.SUCCESS,E.event.onSuccess(e),
s.bossReporter.report({
step:s.bossReporter.STEP.FINISHED,
vid:e.vid
});
}
function m(e){
s.bossReporter.report({
step:s.bossReporter.STEP.CANCEL,
vid:e.vid
});
}
function S(e){
n("onError "+e.name),e.uploadStatus=s.global.UploadStatus.FAIL,E.event.onError(e),
s.bossReporter.reportError({
vid:e.vid,
errorMsg:"error, errorCode: "+e.errorCode+", errorMsg: "+e.errorMsg
});
}
function y(){
try{
inputObj.click();
}catch(e){
s.bossReporter.reportUncaughtError({
errorMsg:e+" at function openSelectFileWindow in file tvu.ftnhtml5uploader.js"
});
}
}
var b=this,E=s.config,T=E.ftnhtml5,R=s.ftnhtml5,U={};
this.inited=!1,this.config=T,this.init=function(){
try{
if(!b.inited){
if(!i())return;
p(),b.inited=!0;
}
}catch(e){
s.bossReporter.reportUncaughtError({
errorMsg:e+" at function this.init in file tvu.ftnhtml5uploader.js"
});
}
},this.start=function(e){
try{
var t=e.uploadKey,r=U[t];
r&&r.start();
}catch(o){
s.bossReporter.reportUncaughtError({
errorMsg:o+" at function this.start in file tvu.ftnhtml5uploader.js"
});
}
},this.cancel=function(e){
try{
var t=e.uploadKey,r=U[t];
r&&r.cancel();
}catch(o){
s.bossReporter.reportUncaughtError({
errorMsg:o+" at function this.cancel in file tvu.ftnhtml5uploader.js"
});
}
},this.isSupport=function(){
return s.util.userAgent.firefox?!1:t.File!=o&&t.FileReader!=o&&t.Worker!=o&&(new t.XMLHttpRequest).upload!=o;
},this.openSelectFileWindow=function(){
try{
y();
}catch(e){
s.bossReporter.reportUncaughtError({
errorMsg:e+" at function this.openSelectFileWindow in file tvu.ftnhtml5uploader.js"
});
}
};
}
return s.util.extend(n,s.baseUploader),new n;
}(),s.config.html5={
id:"tvu_html5uploader_obj",
maxFileSize:200,
selectButton:null,
dropTarget:null,
tcgi:"http://c.v.qq.com/vupready",
tcgiParamKeys:["vid","bid","type","tags","cat","act","title","folder","orifname","size","uptype","key"],
tcgiHttpMethod:"get",
upcgi:"http://uu.video.qq.com/v1/vupvideo",
upcgiParamKeys:["fid","vid","bid","type","tags","cat","act","title","folder","fsize"],
width:"0",
height:"0",
style:"height:0;width:0;margin:0;padding:0;",
containerStyle:"height:0;width:0;margin:0;padding:0;visibility:hidden;overflow:hidden;"
},s.html5Uploader=function(){
function r(){
function r(){
return y=s.html5Uploader.core,y.init();
}
function n(){
y.onSelect=a,y.onProgress=l,y.onSent=p,y.onSuccess=u,y.onSendError=d,y.onCgiError=c,
e(S.selectButton).bind("click",function(){
y.openSelectFileWindow();
}),s.bossReporter.report({
step:"use html5"
});
}
function i(e){
var t;
return t=new s.FileInfo(s.global.UploadType.HTML5,e.size,e.name,"",m.common.uploadInfo),
t.uploadKey=e.uploadKey,t;
}
function a(e){
for(var t,r=[],o=0,n=e.length;n>o;o++)t=i(e[o]),b[t.uploadKey]=t.uid,r.push(t);
m.event.onSelect(r),s.bossReporter.report({
step:s.bossReporter.STEP.SELECT,
vid:t.vid
});
}
function l(e){
try{
var t,r=v.getFio(e.uploadKey);
t=v.handleProgressData(r,e),0==r.firstReport&&(r.firstReport=1,s.reporter.report(s.reporter.Step.START,r),
s.bossReporter.report({
step:s.bossReporter.STEP.UPLOADSTART,
vid:r.vid
})),1e3>t||t>1e4&&r.stopNum<60&&(s.reporter.report(s.reporter.Step.PAUSE,r),s.bossReporter.report({
step:s.bossReporter.STEP.PAUSE,
vid:r.vid
}),r.stopNum++),m.event.onUploadProgress(r);
}catch(o){
s.bossReporter.reportUncaughtError({
rkey:"html5uploader-onProgress",
errorMsg:o.message+" at function onProgress in file tvu.html5uploader.js "
});
}
}
function p(e){
var t=v.getFio(e.uploadKey);
s.reporter.report(s.reporter.Step.SENT,t),s.bossReporter.report({
step:s.bossReporter.STEP.SENT,
vid:t.vid
});
}
function u(e){
var t=v.getFio(e.uploadKey);
t.percent="100.0",s.reporter.report(s.reporter.Step.FINISHED,t),s.bossReporter.report({
step:s.bossReporter.STEP.FINISHED,
vid:t.vid
}),t.uploadStatus=s.global.UploadStatus.SUCCESS,m.event.onSuccess(t);
}
function d(e){
var t=v.getFio(e.uploadKey);
t.errorCode=e.errorCode,t.errorType=s.reporter.ErrorType.PLUGIN,s.reporter.report(s.reporter.Step.FINISHED,t),
s.bossReporter.reportError({
step:"send error, errorCode: "+t.errorCode+" errorMsg: "+t.errorMsg,
vid:t.vid
}),f(t);
}
function c(e){
var t=v.getFio(e.uploadKey);
t.errorCode=e.errorCode,t.errorMsg=e.errorMsg,t.errorType=s.reporter.ErrorType.CGI,
s.reporter.report(s.reporter.Step.FINISHED,t),s.bossReporter.reportError({
step:"cgi error, errorCode: "+t.errorCode+" errorMsg: "+t.errorMsg,
vid:t.vid
}),f(t);
}
function f(e){
e.uploadStatus=s.global.UploadStatus.FAIL,m.event.onError(e),s.bossReporter.reportError({
step:"error, errorCode: "+e.errorCode+" errorMsg: "+e.errorMsg,
vid:e.vid
});
}
function g(e){
m.event.onStart(e),v.getVid(e,function(t){
e.vid=t.vid,e.fid=t.fid,s.reporter.report(s.reporter.Step.BEFORE,e),s.bossReporter.report({
step:s.bossReporter.STEP.BEFORE,
vid:e.vid
}),m.event.onUploadStart(e),h(e);
},function(t){
e.errorCode=t.em,e.errorMsg=t.msg,e.errorType=s.reporter.ErrorType.CGI,s.reporter.report(s.reporter.Step.BEFORE,e),
s.bossReporter.report({
step:s.bossReporter.STEP.BEFORE+e.errorMsg,
vid:e.vid
}),f(e);
});
}
function h(t){
t.uploadStatus!=s.global.UploadStatus.CANCEL&&(s.reporter.report(s.reporter.Step.UPLOADING,t),
s.bossReporter.report({
step:s.bossReporter.STEP.UPLOADING,
vid:t.vid
}),t.startTime=t.lastTime=e.now(),t.uploadStatus=s.global.UploadStatus.UPLOAD,y.start(t));
}
var v=this,m=s.config,S=m.html5,y=null,b={};
this.inited=!1,this.keyToUidMap=b,this.config=S,this.init=function(){
this.inited||(r(),n(),this.inited=!0);
},this.start=function(e){
v.inited&&g(e);
},this.cancel=function(e){
v.inited&&(s.reporter.report(s.reporter.Step.CANCEL,e),s.bossReporter.report({
step:s.bossReporter.STEP.CANCEL,
vid:e.vid
}),y.cancel(e));
},this.openSelectFileWindow=function(){
v.inited&&y.openSelectFileWindow();
},this.isSupport=function(){
return t.File!=o&&t.FormData!=o&&(new t.XMLHttpRequest).upload!=o;
};
}
return s.util.extend(r,s.baseUploader),new r;
}(),s.html5Uploader.core=function(){
function t(){
function t(){
var t='<div style="'+d.containerStyle+'"><input name="Filedata" type="file" id="'+d.id+'" style="'+d.style+'" width="'+d.width+'" height="'+d.height+'"'+(u.common.useMultiSelect?' multiple="multiple"':"")+" /></div>";
return e(r.body).append(t),l=r.getElementById(d.id),!!l;
}
function o(){
var t,o,i=r.body,a=10;
!d.dropTarget&&(d.dropTarget=r.body),i.addEventListener("dragenter",function(r){
r.preventDefault(),r.stopPropagation(),t=e.now(),u.event.onDragEnterPage();
},!1),i.addEventListener("dragleave",function(r){
r.stopPropagation(),r.preventDefault(),e.now()-t>a&&u.event.onDragLeavePage();
},!1),i.addEventListener("dragover",function(e){
e.preventDefault(),e.stopPropagation();
},!1),i.addEventListener("drop",function(e){
e.preventDefault(),e.stopPropagation(),u.event.onDragLeavePage();
},!1),d.dropTarget.addEventListener("dragenter",function(){
o=e.now(),u.event.onDragEnterTarget();
},!1),d.dropTarget.addEventListener("dragleave",function(){
e.now()-o>a&&u.event.onDragLeaveTarget();
},!1),d.dropTarget.addEventListener("drop",function(e){
var t;
u.event.onDragLeaveTarget(),u.event.onDropTarget(),t=e.dataTransfer.files,0!=t.length&&n(t);
},!1),l.addEventListener("change",function(){
var e=this.files;
0!=e.length&&(n(e),l.value="");
},!1);
}
function n(e){
try{
for(var t,r,o,n,i=[],a=0,l=e.length;l>a;a++)t=e[a],n=s.util.getGUID(),r=t.fileSize||t.size,
o=t.fileName||t.name,o=s.util.getFileName(o),i.push({
uploadKey:n,
name:o,
size:r
}),c[n]={
file:t,
xhr:null
};
p.onSelect(i);
}catch(u){
s.bossReporter.reportUncaughtError({
errorMsg:u.message+" at function onSelect in file tvu.html5uploader.core.js"
});
}
}
function i(t){
try{
var r,o,n=new XMLHttpRequest,i=new FormData,a=c[t.uploadKey].file,l=t.uploadKey,u=d.upcgiParamKeys,f=e.extend({},t);
f=s.util.getSubParam(f,u),e.extend(f,{
uin:s.config.common.uin,
g_tk:s.config.common.g_tk,
Filename:t.name,
fsize:t.size
});
for(var g in f)f.hasOwnProperty(g)&&i.append(g,f[g]);
i.append("Filedata",a),c[l].xhr=n,o=s.util.param({
g_tk:s.config.common.g_tk
},d.upcgi),n.open("post",o,!0),n.upload.addEventListener("progress",function(e){
e.lengthComputable&&p.onProgress({
uploadKey:l,
bytesProcessed:e.loaded,
bytesTotal:e.total
});
},!1),n.upload.addEventListener("load",function(){
p.onSent({
uploadKey:l
}),r=setTimeout(function(){
n.abort(),p.onCgiError({
uploadKey:l,
errorCode:8003
});
},1e3*s.config.common.timeout);
},!1),n.upload.addEventListener("error",function(){
p.onSendError({
uploadKey:l,
errorCode:8001
});
},!1),n.addEventListener("load",function(){
clearTimeout(r);
var e,t,o,i,a=n.responseXML,s=a.getElementsByTagName("s");
s.length>0&&"o"==s[0].textContent?(c[l].xhr=null,n=null,p.onSuccess({
uploadKey:l
})):(e=a.getElementsByTagName("em"),o=e&&e.length>0?e[0].textContent:8002,t=a.getElementsByTagName("msg"),
i=t&&t.length>0?t[0].textContent:"",p.onCgiError({
uploadKey:l,
errorCode:o,
errorMsg:i
}));
},!1),n.addEventListener("error",function(){
clearTimeout(r),p.onCgiError({
uploadKey:l,
errorCode:n.status||8002
});
},!1),n.send(i);
}catch(h){
s.bossReporter.reportUncaughtError({
errorMsg:h.message+" at function startUpload in file tvu.html5uploader.core.js"
});
}
}
function a(){
l.click();
}
var l,p=this,u=s.config,d=u.html5,c={};
this.inited=!1,this.init=function(){
return p.inited?void 0:(t(),o(),p.inited=!0,!!l);
},this.start=function(e){
p.inited&&i(e);
},this.cancel=function(e){
var t;
p.inited&&(t=c[e.uploadKey].xhr,null!=t&&(t.abort(),t=null));
},this.openSelectFileWindow=function(){
p.inited&&a();
},this.onSelect=e.noop,this.onProgress=e.noop,this.onSent=e.noop,this.onSuccess=e.noop,
this.onSendError=e.noop,this.onCgiError=e.noop;
}
return new t;
}(),s.config.flash={
id:"tvu_flashuploader_obj",
maxFileSize:200,
selectButton:null,
tcgi:"http://c.v.qq.com/openvupready",
tcgiParamKeys:["vid","bid","type","tags","cat","act","title","folder","orifname","size","uptype","key"],
tcgiHttpMethod:"get",
upcgi:"http://uu.video.qq.com/v1/openvupvideo",
upcgiParamKeys:["fid","vid","bid","type","tags","cat","act","title","folder","fsize"],
src:(location.protocol?location.protocol:"http:")+"//imgcache.qq.com/tencentvideo_v1/tvu/swf/tvu.flashuploader.swf",
version:"",
show:0,
width:"1",
height:"1",
style:"position:absolute;top:0;left:0;margin:0;padding:0;"
},s.flashUploader=function(){
function o(){
function o(){
var t=i(),o=[],n=S.id,a=S.src,l=S.width,p=S.height,u=S.style;
return s.util.userAgent.ie?o.push('<object id="',n,'" ','classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ','codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" ','width="',l,'" height="',p,'" style="',u,'">','<param name="scale" value="showall" /><param name="wmode" value="transparent" />','<param name="movie" value="',a,'" />','<param name="flashvars" value="',s.util.param(t),'" />','<param name="allowScriptAccess" value="always" /></object>'):o.push('<embed type="application/x-shockwave-flash" id="',n,'" src="',a,'" ','width="',l,'" height="',p,'" style="',u,'" ','allowScriptAccess="always" scale="showall" wmode="transparent" flashvars="',s.util.param(t),'"></embed>'),
e(r.body).append(o.join("")),y=r.getElementById(S.id),!!y;
}
function n(){
t.txvFlashCallback={},t.txvFlashCallback.flashInit=function(e){
S.version=e.pfversion,y.setTypeFilter([{
name:"视频音频文件",
type:m.common.fileType
}]);
},t.txvFlashCallback.onSelect=a,t.txvFlashCallback.onProgress=l,t.txvFlashCallback.onSent=p,
t.txvFlashCallback.onSuccess=u,t.txvFlashCallback.onError=d;
}
function i(){
var e,t,r=m.common;
return t=s.util.param({
g_tk:m.common.g_tk
},S.upcgi),e={
upcgi:t,
timeout:r.timeout,
show:S.show,
g_tk:m.common.g_tk
};
}
function a(e,t,r){
var o,n=[];
e=decodeURIComponent(e),o=new s.FileInfo(s.global.UploadType.FLASH,t,e,"",m.common.uploadInfo),
o.errorCode=r,o.uploadKey=o.uid,n.push(o),m.event.onSelect(n),s.bossReporter.report({
step:"use flash"
}),s.bossReporter.report({
step:s.bossReporter.STEP.SELECT,
vid:o.vid
});
}
function l(e,t){
try{
var r,o=v.getFio(h),n={
bytesProcessed:e,
bytesTotal:t
};
r=v.handleProgressData(o,n),0==o.firstReport&&(o.firstReport=1,s.reporter.report(s.reporter.Step.START,o),
s.bossReporter.report({
step:s.bossReporter.STEP.UPLOADSTART,
vid:o.vid
})),1e3>r||r>1e4&&o.stopNum<60&&(s.reporter.report(s.reporter.Step.PAUSE,o),s.bossReporter.report({
step:s.bossReporter.STEP.PAUSE,
vid:o.vid
}),o.stopNum++),m.event.onUploadProgress(o);
}catch(i){
s.bossReporter.reportUncaughtError({
rkey:"flashuploader-onProgress",
errorMsg:i.message+" at function onProgress in file tvu.flashuploader.js "
});
}
}
function p(){
var e=v.getFio(h);
s.reporter.report(s.reporter.Step.SENT,e),s.bossReporter.report({
step:s.bossReporter.STEP.SENT,
vid:e.vid
});
}
function u(){
var e=v.getFio(h);
e.percent="100.0",s.reporter.report(s.reporter.Step.FINISHED,e),s.bossReporter.report({
step:s.bossReporter.STEP.FINISHED,
vid:e.vid
}),e.uploadStatus=s.global.UploadStatus.SUCCESS,m.event.onSuccess(e);
}
function d(e,t){
var r=v.getFio(h);
t=decodeURIComponent(t),0!=e&&(r.errorCode=e,r.errorMsg=t,r.errorType=s.reporter.ErrorType.PLUGIN,
s.reporter.report(s.reporter.Step.FINISHED,r),s.bossReporter.reportError({
vid:r.vid,
errorMsg:"flash error, errorCode: "+r.errorCode+", errorMsg: "+r.errorMsg
}),c(r));
}
function c(e){
e.uploadStatus=s.global.UploadStatus.FAIL,s.bossReporter.reportError({
errorMsg:"error, errorCode: "+e.errorCode+", errorMsg: "+e.errorMsg,
vid:e.vid
}),m.event.onError(e);
}
function f(e){
m.event.onStart(e),v.getVid(e,function(t){
e.vid=t.vid,e.fid=t.fid,s.reporter.report(s.reporter.Step.BEFORE,e),s.bossReporter.report({
step:s.bossReporter.STEP.BEFORE,
vid:e.vid
}),s.bossReporter.report({
step:s.bossReporter.STEP.UPLOADSTART,
vid:e.vid
}),m.event.onUploadStart(e),g(e);
},function(t){
e.errorCode=t.em,e.errorMsg=t.msg,e.errorType=s.reporter.ErrorType.CGI,s.reporter.report(s.reporter.Step.BEFORE,e),
s.bossReporter.report({
step:s.bossReporter.STEP.BEFORE,
vid:e.vid
}),c(e);
});
}
function g(t){
var r,o;
if(t.uploadStatus!=s.global.UploadStatus.CANCEL){
r=S.upcgiParamKeys,o=e.extend({},t),o=s.util.getSubParam(o,r),o.uin=m.common.uin,
o.g_tk=m.common.g_tk,b[t.uploadKey]=t.uid,h=t.uploadKey,s.reporter.report(s.reporter.Step.UPLOADING,t),
s.bossReporter.report({
step:s.bossReporter.STEP.UPLOADING,
vid:t.vid
}),t.uploadStatus=s.global.UploadStatus.UPLOAD,t.startTime=t.lastTime=e.now();
try{
y.upload(o);
}catch(n){
s.bossReporter.reportUncaughtError({
errorMsg:n.message+" at function uploadFile in file tvu.flashupload.js "
});
}
}
}
var h,v=this,m=s.config,S=m.flash,y=null,b={};
this.inited=!1,this.keyToUidMap=b,this.config=S,this.init=function(){
v.inited||(o(),n(),v.inited=!0);
},this.start=function(e){
v.inited&&f(e);
},this.cancel=function(e){
v.inited&&(s.reporter.report(s.reporter.Step.CANCEL,e),s.bossReporter.report({
step:s.bossReporter.STEP.CANCEL,
vid:e.vid
}),y.cancel());
},this.isSupport=function(){
return!0;
},this.getSelectButtonOverlay=function(){
return y;
};
}
return s.util.extend(o,s.baseUploader),new o;
}(),s.queue={
maxParallelNum:1,
uidWaitQueue:[],
uidUploadQueue:[],
getUploadSize:function(){
var e=this;
return e.uidUploadQueue.length;
},
getWaitSize:function(){
var e=this;
return e.uidWaitQueue.length;
},
getTotalSize:function(){
var e=this;
return e.getUploadSize()+e.getWaitSize();
},
isUploading:function(){
var e=this;
return e.uidUploadQueue.length>0;
},
add:function(t,r){
var o,n,i=this;
return t?(o=i.uidWaitQueue,n=e.inArray(t,o),-1==n&&(o=i.uidUploadQueue,n=e.inArray(t,o)),
-1!=n?"":(r?i.uidWaitQueue.unshift(t):i.uidWaitQueue.push(t),t)):"";
},
remove:function(t){
var r,o,n=this;
return t?(r=n.uidWaitQueue,o=e.inArray(t,r),-1==o&&(r=n.uidUploadQueue,o=e.inArray(t,r)),
-1==o?"":(r.splice(o,1),t)):"";
},
start:function(t){
var r,n,i,a=this,s=[];
if(r=a.maxParallelNum-a.uidUploadQueue.length,t==o){
if(!r||0==a.uidWaitQueue.length)return s;
for(;r&&(n=a.uidWaitQueue.shift());)s.push(n),a.uidUploadQueue.push(n),r--;
return s;
}
return r?(i=e.inArray(t,a.uidUploadQueue),-1!=i?"":(a.remove(t),a.uidUploadQueue.push(t),
t)):"";
},
cancel:function(e){
var t,r,n=this,i=[];
if(e==o){
t=n.uidUploadQueue.concat(n.uidWaitQueue);
for(var a=0,s=t.length;s>a;a++)r=t[a],i.push(r);
return n.uidUploadQueue.length=0,n.uidWaitQueue.length=0,i;
}
return n.remove(e)?e:"";
}
},s.uploader=function(){
function t(e){
switch(e){
case s.global.BusinessType.BOKE:
b.common.sort=100,b.ftn&&(b.ftn.autoRetry=!0,b.ftn.tcgi="http://c.v.qq.com/fvupready"),
b.ftnhtml5&&(b.ftnhtml5.autoRetry=!0,b.ftnhtml5.tcgi="http://c.v.qq.com/fvupready"),
b.flash&&(b.flash.tcgi="http://c.v.qq.com/vupready",b.flash.upcgi="http://uu.video.qq.com/v1/vupvideo");
break;

case s.global.BusinessType.QZONE:
b.common.sort=200,b.ftn&&(b.ftn.tcgi="http://c.v.qq.com/fqzupready"),b.flash&&(b.flash.tcgi="http://c.v.qq.com/qzupready",
b.flash.tcgiHttpMethod="post",b.flash.upcgi="http://uz.video.qq.com/v1/qzone/qzupvideo");
break;

case s.global.BusinessType.CLASS:
b.common.sort=204,b.ftn&&(b.ftn.tcgi="http://ke.qq.com/cgi-bin/manager/video/ftn_request"),
b.ftnhtml5&&(b.ftnhtml5.autoRetry=!0,b.ftnhtml5.tcgi="http:"==location.protocol?"http://c.v.qq.com/openfvupready":"https://sec.video.qq.com/p/c.v/openfvupready"),
b.flash&&(b.flash.tcgi="http://c.v.qq.com/openvupready",b.flash.tcgiHttpMethod="post",
b.flash.upcgi="http://uu.video.qq.com/v1/openvupvideo"),b.html5&&(b.html5.tcgi="http://c.v.qq.com/openvupready",
b.html5.tcgiHttpMethod="post",b.html5.upcgi="http://uu.video.qq.com/v1/openvupvideo");
break;

case s.global.BusinessType.WEIBO:
b.common.sort=300,b.ftn&&(b.ftn.tcgi="http://c.v.qq.com/ftupready",b.ftn.tcgiHttpMethod="get"),
b.flash&&(b.flash.tcgi="http://c.video.qq.com/cgi-bin/tupready",b.flash.upcgi="http://ut.video.qq.com/v1/tupvideo");
break;

case s.global.BusinessType.WEIXIN:
b.common.sort=400,b.ftn&&(b.ftn.autoRetry=!0,b.ftn.tcgi="http:"==location.protocol?"http://c.v.qq.com/wxfvupready":"https://sec.video.qq.com/p/c.v/wxfvupready",
b.ftn.tcgiParamKeys=["bid","appid","pluginsession","username","size","sha","md5"],
b.ftn.upcgiParamKeys=["bid","vid","fid","fsize","appid","pluginsession","username","size","sha","md5"]),
b.ftnhtml5&&(b.ftnhtml5.autoRetry=!0,b.ftnhtml5.tcgi="http:"==location.protocol?"http://c.v.qq.com/wxfvupready":"https://sec.video.qq.com/p/c.v/wxfvupready",
b.ftnhtml5.tcgiParamKeys=["bid","appid","pluginsession","username","size","sha","md5"],
b.ftnhtml5.upcgiParamKeys=["bid","vid","fid","fsize","appid","pluginsession","username","size","sha","md5"]),
b.flash&&("https:"==location.protocol?(b.flash.tcgi="https://sec.video.qq.com/p/c.v/wxvupready",
b.flash.upcgi="http://uu.video.qq.com/v1/wxvupvideo",b.flash.src="https://imgcache.qq.com/tencentvideo_v1/tvu/swf/tvu.flashuploader.swf"):(b.flash.tcgi="http://c.v.qq.com/wxvupready",
b.flash.upcgi="http://uu.video.qq.com/v1/wxvupvideo",b.flash.src="http://imgcache.qq.com/tencentvideo_v1/tvu/swf/tvu.flashuploader.swf"),
b.flash.tcgiHttpMethod="get",b.flash.tcgiParamKeys=["bid","appid","pluginsession","username"],
b.flash.upcgiParamKeys=["bid","vid","fid","fsize","appid","pluginsession","username"]),
b.html5&&("https:"==location.protocol?(b.html5.tcgi="https://sec.video.qq.com/p/c.v/wxvupready",
b.html5.upcgi="https://sec.video.qq.com/p/uu.video/v1/wxvupvideo"):(b.html5.tcgi="http://c.v.qq.com/wxvupready",
b.html5.upcgi="http://uu.video.qq.com/v1/wxvupvideo"),b.html5.tcgiHttpMethod="get",
b.html5.tcgiParamKeys=["bid","appid","pluginsession","username"],b.html5.upcgiParamKeys=["bid","vid","fid","fsize","appid","pluginsession","username"]);
break;

case s.global.BusinessType.COMMON:
default:
b.common.sort=400,b.ftn&&(b.ftn.tcgi="http://c.v.qq.com/openfvupready"),b.ftnhtml5&&(b.ftnhtml5.autoRetry=!0,
b.ftnhtml5.tcgi="http://c.v.qq.com/openfvupready"),b.flash&&(b.flash.tcgi="http://c.v.qq.com/openvupready",
b.flash.tcgiHttpMethod="post",b.flash.upcgi="http://uu.video.qq.com/v1/openvupvideo"),
b.html5&&(b.html5.tcgi="http://c.v.qq.com/openvupready",b.html5.tcgiHttpMethod="post",
b.html5.upcgi="http://uu.video.qq.com/v1/openvupvideo");
}
}
function r(t){
e.extend(E,t),s.debug=!!E.debug,b.common.uin=E.uin,b.common.encuin=E.encuin,b.common.g_tk=E.g_tk,
b.common.businessID=E.businessID,b.common.useMultiSelect=E.useMultiSelect,b.common.isReportBoss=E.isReportBoss,
E.uploadInfo&&e.extend(b.common.uploadInfo,E.uploadInfo),s.global.getUploader(E.uploadType)||(E.uploadType=0),
s.queue.maxParallelNum=E.maxQueueParallelNum,b.html5&&(b.html5.dropTarget=E.dropTarget);
}
function o(){
b.event.onSelect=a,b.event.onStart=l,b.event.onScanProgress=p,b.event.onUploadStart=u,
b.event.onUploadProgress=d,b.event.onSuccess=c,b.event.onError=f,b.event.onDragEnterPage=E.onDragEnterPage,
b.event.onDragLeavePage=E.onDragLeavePage,b.event.onDragEnterTarget=E.onDragEnterTarget,
b.event.onDragLeaveTarget=E.onDragLeaveTarget,b.event.onDropTarget=E.onDropTarget;
}
function n(){
var e,t,r=E.useMultiUploadType,o=[s.global.UploadType.FTN,s.global.UploadType.FTN_HTML5,s.global.UploadType.HTML5,s.global.UploadType.FLASH];
if(E.uploadType)t=s.global.getUploader(E.uploadType),t&&t.isSupport()?(t.init(),
s.util.log(s.global.getUploaderName(E.uploadType)+"Uploader inited")):E.uploadType=0;else for(var n=0,i=o.length;i>n&&(e=o[n],
t=s.global.getUploader(e),!t||!t.isSupport()||(E.uploadType||(E.uploadType=e),t.init(),
s.util.log(s.global.getUploaderName(e)+"Uploader inited"),r));n++);
}
function i(t,r){
var o=e(t).eq(0),n=s.global.getUploader(r);
r||(r=E.uploadType),n&&r&&n.setSelectButton(o);
}
function a(e){
for(var t,r=0,o=e.length;o>r;r++)t=e[r],s.global.getUploader(t.uploadType).checkFile(t),
0!=t.errorCode&&(t.uploadStatus=s.global.UploadStatus.INVALID,t.errorMsg=s.global.getErrorMsg(t.errorCode)||t.errorMsg,
t.errorType=s.reporter.ErrorType.PLUGIN),s.global.addFio(t),s.util.log("onFileSelect: "+t.uploadType+", "+t.uid+", "+t.name+", "+t.size+", "+t.errorCode+", "+s.global.getErrorMsg(t.errorCode)||t.errorMsg);
E.onFileSelect(e);
}
function l(e){
s.util.log("onFileStart: "+e.uploadType+", "+e.uid+", "+e.name),E.onFileStart(e);
}
function p(e){
E.onFileScanProgress(e);
}
function u(e){
s.util.log("onFileUploadStart: "+e.uploadType+", "+e.uid+", ["+e.vid+"], "+e.name),
E.onFileUploadStart(e);
}
function d(e){
E.onFileUploadProgress(e);
}
function c(e){
s.util.log("onFileSuccess: "+e.uploadType+", "+e.uid+", ["+e.vid+"], "+e.name),s.queue.remove(e.uid),
E.onFileSuccess(e),g();
}
function f(e){
s.util.log("onFileError: "+e.uploadType+", "+e.uid+", ["+(e.vid||"no vid")+"], "+e.name+" Error: "+e.errorCode+", "+s.global.getErrorMsg(e.errorCode)||e.errorMsg),
e.errorMsg=s.global.getErrorMsg(e.errorCode)||e.errorMsg,s.queue.remove(e.uid),E.onFileError(e),
g();
}
function g(){
0==s.queue.getTotalSize()?E.onQueueEmpty():v();
}
function h(e,t){
var r="";
return e&&e instanceof s.FileInfo&&(e.uploadStatus==s.global.UploadStatus.READY||e.uploadStatus==s.global.UploadStatus.FAIL||e.uploadStatus==s.global.UploadStatus.CANCEL)&&(r=s.queue.add(e.uid,t),
r&&s.FileInfo.reset(e)),!!r;
}
function v(){
for(var e,t,r=s.queue.start(),o=0,n=r.length;n>o;o++)e=r[o],t=s.global.getFio(e),
s.FileInfo.reset(t),s.global.getUploader(t.uploadType).start(t);
}
function m(e){
var t="";
return e&&e instanceof s.FileInfo&&(e.uploadStatus==s.global.UploadStatus.READY||e.uploadStatus==s.global.UploadStatus.FAIL||e.uploadStatus==s.global.UploadStatus.CANCEL)&&(t=s.queue.start(e.uid),
t&&(s.FileInfo.reset(e),s.global.getUploader(e.uploadType).start(e))),!!t;
}
function S(){
for(var e,t,r=s.queue.cancel(),o=0,n=r.length;n>o;o++)e=r[o],t=s.global.getFio(e),
t.uploadStatus!=s.global.UploadStatus.READY&&s.global.getUploader(t.uploadType).cancel(t),
t.uploadStatus=s.global.UploadStatus.CANCEL;
g();
}
function y(e){
var t="";
return e&&e instanceof s.FileInfo&&(e.uploadStatus==s.global.UploadStatus.READY||e.uploadStatus==s.global.UploadStatus.SCAN||e.uploadStatus==s.global.UploadStatus.UPLOAD)&&(t=s.queue.cancel(e.uid),
t&&(e.uploadStatus!=s.global.UploadStatus.READY&&s.global.getUploader(e.uploadType).cancel(e),
e.uploadStatus=s.global.UploadStatus.CANCEL)),g(),!!t;
}
var b=s.config,E={
uin:0,
encuin:"",
g_tk:"",
businessID:"",
businessType:s.global.BusinessType.COMMON,
uploadType:0,
useMultiUploadType:!1,
maxQueueParallelNum:1,
useMultiSelect:!1,
selectButton:null,
dropTarget:null,
uploadInfo:null,
onDragEnterPage:e.noop,
onDragLeavePage:e.noop,
onDragEnterTarget:e.noop,
onDragLeaveTarget:e.noop,
onDropTarget:e.noop,
onFileSelect:e.noop,
onFileStart:e.noop,
onFileScanProgress:e.noop,
onFileUploadStart:e.noop,
onFileUploadProgress:e.noop,
onFileSuccess:e.noop,
onFileError:e.noop,
onQueueEmpty:e.noop,
debug:!1
},T=!1;
return{
core:s,
BusinessType:s.global.BusinessType,
UploadType:s.global.UploadType,
init:function(e){
return T||(!e&&(e={}),t(e.businessType),r(e),o(),n(),i(E.selectButton),T=!0),E.uploadType||s.util.log("no uploader inited"),
E.uploadType;
},
hasFtn:function(){
var e=s.global.getUploader(s.global.UploadType.FTN);
return e&&e.isSupport();
},
hasHtml5:function(){
var e=s.global.getUploader(s.global.UploadType.HTML5);
return e&&e.isSupport();
},
hasFtnHtml5:function(){
var e=s.global.getUploader(s.global.UploadType.FTN_HTML5);
return e&&e.isSupport();
},
selectFile:function(e,t){
var r=s.global.getUploader(s.global.UploadType.FTN);
r&&r.selectFile(e,t);
},
openSelectFileWindow:function(e){
e||(e=E.uploadType),s.global.getUploader(e).openSelectFileWindow();
},
setSelectButton:function(e,t){
i(e,t);
},
addToQueue:function(e,t){
return h(e,t);
},
startQueue:function(){
v();
},
start:function(e){
return m(e);
},
cancelQueue:function(){
S();
},
cancel:function(e){
return y(e);
},
getQueueTotalSize:function(){
return s.queue.getTotalSize();
},
getQueueUploadSize:function(){
return s.queue.getUploadSize();
},
getQueueWaitSize:function(){
return s.queue.getWaitSize();
},
getUploadType:function(){
return E.uploadType;
},
getInstallFtnUrl:function(e){
return b.common.installFtnUrl+encodeURIComponent(e);
},
getSizeString:function(e){
return s.util.getSizeString(e);
}
};
}(),t.onerror=function(e,t,r,o,n){
var i=/tvu\.upload/;
if(n){
var a=n;
i.test(a)&&s.bossReporter.reportError({
errorMsg:a
});
}else{
var a=e+" at [ "+t+" ] in line: "+r+", col: "+o;
i.test(a)&&s.bossReporter.reportError({
errorMsg:a
});
}
},s.uploader;
},jQuery,window,document);