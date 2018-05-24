define("common/wx/media/previewDialog.js",["common/wx/popup.js","media/template_common.js","media/media_cgi.js","tpl/media/appmsg_edit/previewDialog.html.js","common/wx/Tips.js","biz_web/lib/store.js"],function(e){
"use strict";
e("common/wx/popup.js");
var t=e("media/template_common.js"),i=e("media/media_cgi.js"),n=e("tpl/media/appmsg_edit/previewDialog.html.js"),s=e("common/wx/Tips.js"),c=e("biz_web/lib/store.js"),o={
cacheKey:"previewAccounts",
uin:window.wx&&window.wx.data&&window.wx.data.uin?window.wx.data.uin:""
},r=function(e){
this._o={
appmsgid:"",
AppMsgId:"",
tpl:n,
type:1,
hasConfirmed:!1,
selectFun:null,
uin:"",
token:"",
nickname:"",
isModify:!1
},this._g={
rememberAccounts:[],
original_type:0,
word:"",
vObj:null,
vArea:null
},this._extend(e),this._init();
};
return r.prototype={
_extend:function(e){
for(var t in e)this._o[t]=e[t];
},
_init:function(){
var e=this._o,t=this._g;
1==e.type?t.word="图文模版":2==e.type&&(t.word="图文消息"),e.appmsgid||(e.appmsgid=e.AppMsgId),
e.AppMsgId||(e.AppMsgId=e.appmsgid),this._initCache(),this._initDialog();
},
_initCache:function(){
var e=this,t=c.get(o.uin+o.cacheKey);
if(t)try{
e._g.rememberAccounts=t.split("|");
}catch(i){
e._g.rememberAccounts=[];
}
},
_cache:function(e){
var t=this._g,i=[];
t.rememberAccounts.each(function(t){
t!=e&&i.push(t);
}),t.rememberAccounts=i,t.rememberAccounts.length<3?t.rememberAccounts.push(e):(t.rememberAccounts.shift(),
t.rememberAccounts[2]=e),c.set(o.uin+o.cacheKey,t.rememberAccounts.join("|"));
},
_initDialog:function(){
var e=this,n=this._o,c=this._g,o={
appmsgid:n.appmsgid,
AppMsgId:n.AppMsgId
};
c.$popup=$(wx.T(n.tpl,{
label:"请输入微信号，此%s将发送至该微信号预览。".sprintf(c.word),
accounts:c.rememberAccounts,
uin:n.uin,
token:n.token,
nickname:n.nickname
})).popup({
title:"发送预览",
className:"simple label_block",
onHide:function(){
e.destory(this);
},
onOK:function(){
var r=this,a=r.get(),u=a.find(".frm_input"),p=a.find(".js_preview_dialog_content"),m=u.val().trim();
if(p.removeClass("with_qrcheck"),a.find(".jsAccountFail").html("").hide(),o.preusername=m,
0==m.length)return $(".jsAccountFail").text("请输入预览的账号").show(),!0;
if(null!=c.vObj&&c.vObj.getCode().trim().length<=0)return s.err("请输入验证码"),c.vObj.focus(),
!0;
var l=a.find(".btn_primary>.js_btn").btn(!1);
o.imgcode=c.vObj&&c.vObj.getCode().trim(),n.hasConfirmed&&(o.confirm=1),s.remove(),
o.is_preview=1;
var d=function(){
e.checkDialogAlive()&&(s.suc("发送预览成功，请留意你的手机微信"),setTimeout(function(){
l.btn(!0);
},500),e._cache(m),e.destory(r));
},h=function(t){
if(e.checkDialogAlive()&&(l.btn(!0),u.focus(),t))switch("undefined"==typeof t.ret&&t.base_resp&&"undefined"!=typeof t.base_resp.ret&&(t.ret=t.base_resp.ret),
!t||"-6"!=t.ret&&"-8"!=t.ret||(c.vArea=a.find(".js_verifycode"),c.vObj=c.vArea.html("").removeClass("dn").verifycode().data("verifycode"),
c.vObj.focus()),t&&t.antispam!==!1&&"function"==typeof n.selectFun&&n.selectFun(1*t.msg),
+t.ret){
case 15801:
case 15802:
case 15803:
case 15804:
case 15805:
case 15806:
Dialog.show({
type:"warn",
msg:t.remind_wording||"你所编辑的图文消息可能含有违反微信公众平台平台协议、相关法律法规和政策的内容|你可以继续保存或发布该图文消息，若保存或发布后，经核实涉嫌含有上述相关内容的，将可能被作删除、屏蔽等处理。<br/>                                <a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN&token=2056316619' target='_blank'>对应规则</a>",
buttons:[{
text:"继续发送",
click:function(){
this.remove(),n.hasConfirmed=!0,l.trigger("click");
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
break;

case 64503:
p.addClass("with_qrcheck"),a.find(".jsAccountFail").html(t.word||"").show();
break;

default:
a.find(".jsAccountFail").html(t.word||"").show();
}
};
return 2==n.type?i.appmsg.preview(!0,10,o,d,h):t.preview({
postData:o,
onSuccess:d,
onError:h
}),!0;
}
}),this._initEvent();
},
_initEvent:function(){
var e=this._g,t=this._g.$popup;
t.find(".jsAccount").click(function(){
$(this).hasClass("selected")?($(this).removeClass("selected"),$(".jsAccountInput").val("")):($(this).addClass("selected"),
$(".jsAccountInput").val($(this).data("value")));
}),t.find(".jsAccountInput").keyup(function(e){
$(".jsAccountFail").hide(),$(".jsAccount").removeClass("selected");
var t="which"in e?e.which:e.keyCode;
13==t&&$(this).parents(".dialog").find("button.js_btn:eq(0)").trigger("click");
}).placeholder(),t.find(".jsAccountDel").click(function(){
var t=$(this).data("index");
return e.rememberAccounts.length>t&&e.rememberAccounts.splice(t,1),$(this).parent().remove(),
c.set(o.uin+o.cacheKey,e.rememberAccounts.join("|")),!1;
}),e.rememberAccounts.length>0&&t.find(".jsAccount").last().click();
},
checkDialogAlive:function(){
return this._g.$popup?!0:!1;
},
destory:function(e){
e&&e.remove(),this._g.$popup=null,this._g.$vObj=null,this._g.$vArea=null,this._o.selectFun=null;
}
},r;
});