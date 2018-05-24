define("original/qrcheck.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","tpl/original/qrcode_tpl.html.js","tpl/original/popup.html.js","original/qrcheck_msg.js"],function(t,s,i){
"use strict";
function e(t){
this._init(t);
}
function o(t){
return new e(t);
}
function n(t){
var s,i=$(wx.T(c,{
tips:t.popupTips||""
})),o=i.popup({
title:t.popupTitle||"扫码验证",
width:t.popupWidth||600,
className:t.popupClassName||"",
autoShow:!1,
onShow:function(){
o.popup("resetPosition"),t.onPopupShow&&t.onPopupShow.call(s);
},
onHide:function(){
console.log("onHide"),o.popup("remove"),t.onPopupHide&&t.onPopupHide.call(s),s.destroy();
}
});
return t.container=$(o.get()).find(".js_div_qrcheck"),s=new e(t),s.popup=o,s;
}
var a=(template.render,t("common/wx/Cgi.js")),r=t("common/wx/Tips.js"),p=(t("common/wx/popup.js"),
t("tpl/original/qrcode_tpl.html.js")),c=t("tpl/original/popup.html.js"),u=t("original/qrcheck_msg.js"),h={
container:"",
container_class:"",
scene:0,
size:165,
data:{},
msgData:{
name:"管理员"
},
askSpeed:5,
askMaxNum:60,
cgiURI:"/acct/qrcheckoper",
onSuccess:function(){},
onFail:function(){},
onTimeout:function(){},
onMsgUpdate:function(){}
};
e.prototype._init=function(t){
this.opt=$.extend(!0,{},h,t),this.renderData={
status:"loading",
infoType:"pending",
img:"",
size:t.size
},this.popup=null,this.$dom=$(t.container),t.container_class&&this.$dom.addClass(t.container_class),
this._isStopped=!0,this._askID=null,this._askNum=0,this._askLatestAjaxID=0,this._askPreview=null,
this._ticket="",this._cgiResp=null;
},e.prototype.load=function(){
var t=this;
return this._render(),this.$dom.on("click",".js_qr_reload",function(){
return t.reload(),!1;
}),this.$dom.on("click",".js_qr_refresh",function(){
return t.refresh(),!1;
}),this.popup&&(this.popup.popup("show"),this.popup.popup("resetPosition")),this._requestTicket(),
this;
},e.prototype.destroy=function(){
this._stopAsk(),this.$dom.empty(),this.$dom.off(),this.popup&&this.popup.popup("remove");
},e.prototype.reload=function(){
this._requestTicket();
},e.prototype.refresh=function(){
this._showQRCode(),this._startAsk();
},e.prototype.getTicket=function(){
return this._ticket||"";
},e.prototype._render=function(){
this.$dom.html(wx.T(p,this.renderData)),this.$msg=this.$dom.find(".js_qr_msg");
},e.prototype._showLoading=function(){
this.renderData.status="loading",this._render();
},e.prototype._showInfo=function(t){
this.renderData.status="info",this.renderData.infoType=t,this._render();
},e.prototype._requestTicket=function(){
var t=this;
t._showLoading(),t._stopAsk(),t._isStopped=!1;
var s={
size:t.opt.size,
scene:t.opt.scene
};
s=$.extend(!0,s,t.opt.data),a.post({
url:t.opt.cgiURI+"?action=get",
mask:!1,
data:s
},{
done:function(s){
1!=t._isStopped&&(0==s.base_resp.ret?(t._ticket=s.qrcheck_ticket,t._showQRCode(),
t._startAsk()):t._triggerStatus(s.base_resp.ret));
},
fail:function(){
t._triggerStatus(-1);
}
});
},e.prototype._showQRCode=function(){
var t=this.opt.cgiURI+"?action=getqrcode&qrcheck_ticket="+this._ticket+"&random="+(new Date).getTime();
window.wx&&window.wx.data&&window.wx.data.param&&(t+=window.wx.data.param),this.renderData.status="waiting",
this.renderData.img=t,this._render();
},e.prototype._doAsk=function(){
var t=this;
if(t._askNum++,t._askNum>t.opt.askMaxNum)return void t._triggerStatus(0,3);
t._askLatestAjaxID++;
var s=t._askLatestAjaxID;
a.get({
url:t.opt.cgiURI+"?action=ask",
data:{
qrcheck_ticket:t._ticket
},
mask:!1
},{
done:function(i){
1!=t._isStopped&&(s<t._askLatestAjaxID||(t._cgiResp=i,i&&0==i.base_resp.ret?t._triggerStatus(0,i.status,i.result):(t._stopAsk(),
t._triggerStatus(i.base_resp.ret))));
},
fail:function(){}
});
},e.prototype._startAsk=function(){
var t=this;
t._stopAsk(),t._isStopped=!1,t._triggerStatus(0,0),t._askID=setInterval(function(){
t._doAsk();
},1e3*t.opt.askSpeed);
},e.prototype._stopAsk=function(){
var t=this;
clearInterval(t._askID),t._isStopped=!0,t._askNum=0,t._askPreview=null,t._askLatestAjaxID=0;
},e.prototype._triggerStatus=function(t,s,i){
if(0==t){
if(s===this._askPreview)return;
this._askPreview=s,0!=s&&4!=s&&this._stopAsk(),0==s?this.renderData.status="waiting":1==s?(this.renderData.status="info",
this.renderData.infoType="success"):3==s?(this.renderData.status="info",this.renderData.infoType="fail"):4==s?(this.renderData.status="info",
this.renderData.infoType="pending"):2==s?(this.renderData.status="info",this.renderData.infoType="fail"):(this.renderData.status="info",
this.renderData.infoType=""),this._render();
}else r.err(-3==t?"登录超时，请重新登录":"二维码获取失败，请重试"),this.renderData.status="info",this.renderData.infoType="error",
this._render();
var e=void 0;
"function"==typeof this.opt.onMsgUpdate&&(e=this.opt.onMsgUpdate.call(this,t,s,i)),
void 0===e&&(e=u.get(this.opt.msgData,t,s,i)),this.$msg.html(e),0==t&&0==s||0==t&&4==s||(0==t&&1==s?"function"==typeof this.opt.onSuccess&&this.opt.onSuccess.call(this,this._ticket,this._cgiResp):0==t&&3==s?"function"==typeof this.opt.onTimeout&&this.opt.onTimeout.call(this):"function"==typeof this.opt.onFail&&this.opt.onFail.call(this,t,s,i));
},i.exports={
init:o,
initPopup:n
};
});