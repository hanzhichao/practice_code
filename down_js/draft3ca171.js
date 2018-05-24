define("media/draft.js",["biz_common/jquery.md5.js","media/common.js","common/qq/Class.js","biz_web/lib/store.js","biz_common/moment.js","media/report.js"],function(t){
"use strict";
function e(t,e){
return"draft_ls|%s|bizuin:%s|appid:%s|ua:%s|start_write:%s|start_read:%s|start_write_err_STK:%s|start_read_err_STK:%s".sprintf(t||"",wx.data.uin||"",e||0,window.navigator.userAgent,h.lsStartWriteEnable,h.lsStartReadEnable,h.lsStartWriteErrLog,h.lsStartReadErrLog);
}
function a(t){
var e=t.stack||t.toString()||"";
try{
e=e.replace(/http(s)?:\/\/res\.wx\.qq\.com/g,"");
for(var a=/\/([^.]+)\/js\/(\S+?)\.js(\,|:)?/g;a.test(e);)e=e.replace(a,"$2$3");
}catch(t){
e=t.stack?t.stack:"";
}
return e.replace(/\n/g,"");
}
function r(){
if(!u.isLocalStorageNameSupported()){
var t=e("notsupport");
return v.logReport("65080_44_1;65080_45_1",t,"img"),void(h.lsSupport=!1);
}
v.logReport("65080_44_1","","img"),h.lsSupport=!0;
var r=+new Date+"";
try{
window.localStorage.setItem(h.namespace,r);
}catch(i){
h.lsStartWriteEnable=0,h.lsStartWriteErrLog=a(i);
}
var s="";
try{
s=window.localStorage.getItem(h.namespace);
}catch(i){
h.lsStartReadEnable=0,h.lsStartReadErrLog=a(i);
}
window.localStorage.removeItem(h.namespace),s==r&&(h.lsStartWriteEnable=1,h.lsStartWriteErrLog="",
h.lsStartReadEnable=1,h.lsStartReadErrLog="");
}
function i(t,e,a,r){
return d(t,e,a,3,0,r);
}
function s(t,e,a){
return d(t,e,a,4);
}
function n(t){
var e=c(t);
e.appKey+=h.readOnlyDraftName;
var a=_(e.appKey);
return a&&a.list?a.list||!1:!1;
}
function o(t){
var e=c(t);
e.appKey+=h.readOnlyDraftName,u.remove(e.appKey);
}
function _(t){
var e=!1,a=!1;
if(e=u.get(t,function(){
a=!0;
}),a===!0||!e||"v2"!=e.v)return!1;
if(e.md5===$.md5(e.data)){
try{
e=JSON.parse(e.data);
}catch(r){
return!1;
}
return e?(e.seq=(e.seq||"0")+"",e):!1;
}
return!1;
}
function d(t,r,i,s,n,o){
if(h.lsSupport!==!0||!t)return!1;
i=i+""||"0",o=o+""||"0";
var _=c(r);
3==s&&(_.appKey+=h.conflictName),4==s&&(_.appKey+=h.readOnlyDraftName);
var d=1,l=[],p="65080_31_1",f="",m={
data:"",
md5:"",
v:g
},S=+new Date,y={
list:t,
seq:i,
write_t:S,
active_id:n
};
3==s&&(y.ls_seq=o);
try{
m.data=JSON.stringify(y),m.md5=$.md5(m.data);
}catch(q){
d=-6,p+=";65080_86_1",l.push("serialize_err_STK:"+a(q));
}
if(1==d&&u.set(_.appKey,m,function(t){
d=-1,p+=";65080_34_1",l.push("write_err_STK:"+a(t));
}),1==d&&(f=u.get(_.appKey,function(t){
d=-2,p+=";65080_36_1",l.push("read_err_STK:"+a(t));
})),1==d&&m.md5!=f.md5&&(p+=";65080_38_1",d=-3),1==d)return 2==s&&(p+=";65080_47_1"),
3==s?(p+=";65080_88_1",v.logReport(p,e("conflict_data",r)+("|data:"+m.data),"ajax")):v.logReport(p,"","img"),
$("#js_autosave").attr("title"," 已自动保存").fadeIn(500),!0;
var K=e("writeerr",r)+"|handle_type："+d+"|"+l.join("|");
return p+=";65080_32_1",p+=h.lsStartWriteEnable&&h.lsStartReadEnable?";65080_40_1":";65080_42_1",
2==s?(p+=";65080_48_1",K+="|leave_data:"+m.data):3==s&&(p+=";65080_88_1",K+="|conflict_data:"+m.data),
v.logReport(p,K,"ajax"),!1;
}
function l(t){
if(h.lsSupport!==!0)return!1;
var r=c(t);
u.remove(r.timeKey);
var i=1,s=[],n="65080_63_1";
u.remove(r.appKey,function(t){
n+=";65080_70_1",i=-4,s.push("clear_err_STK:"+a(t));
});
var o="";
if(1==i&&(o=u.get(r.appKey,function(t){
n+=";65080_72_1",i=-2,s.push("read_err_STK:"+a(t));
})),1==i&&o&&(n+=";65080_74_1",i=-3),1==i)return v.logReport(n,"","img"),!0;
n+=";65080_64_1",n+=h.lsStartWriteEnable&&h.lsStartReadEnable?";65080_66_1":";65080_68_1";
var _=e("clearerr",t)+"|handle_type："+i+"|"+s.join("|");
return v.logReport(n,_,"ajax"),!1;
}
function c(t){
var e={
draftId:wx.data.uin+(t?t:"")
};
return e.timeKey="Time"+e.draftId,e.appKey="App"+e.draftId,e;
}
t("biz_common/jquery.md5.js");
var p=t("media/common.js"),f=t("common/qq/Class.js"),u=t("biz_web/lib/store.js"),m=t("biz_common/moment.js"),v=t("media/report.js"),g="v2",h={
lsStartWriteEnable:0,
lsStartReadEnable:0,
lsStartWriteErrLog:"",
lsStartReadErrLog:"",
namespace:"__editordraft__",
conflictName:"__conflict",
readOnlyDraftName:"__readonlydraft",
lsSupport:!1,
diffTime:Math.floor(wx.cgiData.svr_time-new Date/1e3)
};
r();
var S=f.declare({
init:function(t,e,a){
var r=this;
r.app_id=t;
var i=c(t);
r.draftId=i.draftId,r.timeKey=i.timeKey,r.appKey=i.appKey,r.seq=e+"",r.editor=a,
r.isDropped=!1,r.conflict=!1,r.activeId=0,r.data=r.get();
},
_updateAppid:function(t,e){
this.app_id=t;
var a=c(t);
this.draftId=a.draftId,this.timeKey=a.timeKey,this.appKey=a.appKey,this.seq=e;
},
_supportUserData:function(){
try{
var t=document.createElement("input");
t.addBehavior("#default#userData");
}catch(e){
return!1;
}
return!0;
},
_getSaveTime:function(){
return u.get(this.timeKey);
},
_showTips:function(t){
$("#js_autosave").attr("title",t+" 已自动保存").show(),$("#js_draft_tips").show().find(".js_msg_content").html("已从本地读取' + time + '的草稿");
},
_getDefaultLog:function(t){
return e(t,this.app_id);
},
_getErrorMessage:function(t){
return a(t);
},
_validateMutilWin:function(t,e){
"undefined"==typeof e&&(e=this.activeId);
var a=this,r=_(this.appKey);
return a.editor.fireEvent("reportAddNum",65080,104,1),r&&r.list?"gt"==p.dataSeqCompare(this.seq,r.seq)?!0:"lt"==!p.dataSeqCompare(this.seq,r.seq)?(this.data=r.list||!1,
this.seq=r.seq+"",t!==!0&&a.editor.fireEvent("syn_draft"),!1):!r.active_id||1*r.active_id<1*e?!0:1*r.active_id>1*e?(this.data=r.list||!1,
this.seq=r.seq+"",t!==!0&&a.editor.fireEvent("syn_draft"),!1):!0:!0;
},
showTips:function(){
$("#js_draft_tips").show().find(".js_msg_content").html('<span class="js_msg_content">点击<span class="link_global" id="js_draft_cancel">撤消</span>刚刚的导入操作。</span>');
},
active:function(t){
var e=this;
return this.activeId>0?!0:(this.activeId=+new Date,this.editor.fireEvent("active_state_change"),
setTimeout(function(){
e._validateMutilWin(t,0);
},1e3),!0);
},
silent:function(){
this.activeId=0,this.editor.fireEvent("active_state_change");
},
clear:function(){
return l(this.app_id);
},
save:function(t,e){
var a=this._validateMutilWin();
return a===!1?(this.silent(),!1):d(t,this.app_id,this.seq,e,this.activeId);
},
forceSave:function(t,e){
return d(t,this.app_id,this.seq,1,e||+new Date);
},
get:function(){
if(h.lsSupport!==!0)return!1;
var t=this,e=1,a=[],r="65080_50_1",i=!1,s="",n="";
if(s=u.get(t.appKey,function(i){
e=-2,r+=";65080_76_1",a.push("read_err_STK:"+t._getErrorMessage(i));
}),1==e&&s)if(r+=";65080_57_1","v2"==s.v)if(r+=";65080_82_1",n="",s.md5===$.md5(s.data)){
try{
s=JSON.parse(s.data);
}catch(o){
r+=";65080_80_1",e=-5;
}
1==e&&("gt"==p.dataSeqCompare(s.seq,t.seq)?(i=!1,e=-8,r+=";65080_90_1"):"gt"==p.dataSeqCompare(t.seq,s.seq)?(t.conflict=!0,
t.conflict_ls_seq=s.seq+"",i=s.list||!1):(t.conflict_ls_seq=s.seq+"",i=s.list||!1));
}else e=-3,r+=";65080_78_1";else"v1"==s.v?(r+=";65080_59_1",n=s.t||"",i=s.list||!1,
t.conflict_ls_seq="0"):(n=u.get(t.timeKey),r+=";65080_61_1",i=s||!1,t.conflict_ls_seq="0");
if(1==e&&n)try{
Number(wx.cgiData.updateTime)>m(n,"YYYY-MM-DD HH:mm:ss").unix()+h.diffTime&&(t.conflict=!0);
}catch(o){}
if(t.conflict===!0&&(r+=";65080_84_1"),1==e)return v.logReport(r,"","img"),i||!1;
r+=";65080_51_1",r+=h.lsStartWriteEnable&&h.lsStartReadEnable?";65080_53_1":";65080_55_1";
var _=t._getDefaultLog("readerr")+"|handle_type："+e+"|"+a.join("|");
return v.logReport(r,_,"ajax"),!1;
}
});
return{
constructor:S,
clear:l,
saveConflict:i,
saveReadOnlyDraft:s,
getReadOnlyDraft:n,
clearReadOnlyDraft:o
};
});