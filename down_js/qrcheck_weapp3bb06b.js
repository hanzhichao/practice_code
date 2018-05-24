define("common/wx/qrcheck_weapp.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","widget/qrcheck.css","tpl/qrcheck/qrcode.html.js","tpl/qrcheck/popup.html.js","common/wx/qrcheck_msg.js"],function(t,s,e){
"use strict";
function i(t){
this._init(t);
}
function o(t){
return new i(t);
}
function a(t){
var s,e=$(wx.T(c,{
tips:t.popupTips||""
})),o=e.popup({
title:t.popupTitle||"扫码验证",
width:t.popupWidth||600,
className:t.popupClassName||"",
autoShow:!1,
onShow:function(){
o.popup("resetPosition"),t.onPopupShow&&t.onPopupShow.call(s);
},
onHide:function(){
console.log("onHide"),o.popup("remove"),t.onPopupHide&&t.onPopupHide.call(s),s.popup=null,
s.destroy();
}
});
return t.container=$(o.get()).find(".js_div_qrcheck"),s=new i(t),s.popup=o,s;
}
var n=(template.render,t("common/wx/Cgi.js")),p=t("common/wx/Tips.js"),r=(t("common/wx/popup.js"),
t("widget/qrcheck.css"),t("tpl/qrcheck/qrcode.html.js")),c=t("tpl/qrcheck/popup.html.js"),h=t("common/wx/qrcheck_msg.js"),d={
container:"",
container_class:"",
scene:0,
typeid:0,
size:165,
data:{},
extra:{},
askExtra:{},
msgData:{
name:"管理员"
},
showImgInfo:!0,
askSpeed:5,
askMaxNum:60,
cgiURI:"",
onSuccess:function(){},
onFail:function(){},
onTimeout:function(){},
onMsgUpdate:function(){}
};
i.prototype._init=function(t){
this.opt=$.extend(!0,{},d,t),this.renderData={
status:"loading",
infoType:"pending",
img:"",
size:t.size,
showImgInfo:this.opt.showImgInfo
},this.popup=null,this.$dom=$(t.container),t.container_class&&this.$dom.addClass(t.container_class),
this._isStopped=!0,this._askID=null,this._askNum=0,this._askLatestAjaxID=0,this._askPreview=null,
this._ticket="",this._cgiResp=null;
},i.prototype.load=function(){
var t=this;
return this._render(),this.$dom.off("click",".js_qr_reload, .js_qrcheck_reloading","**"),
this.$dom.on("click",".js_qr_reload, .js_qrcheck_reloading",function(){
return t.reload(),!1;
}),this.$dom.off("click",".js_qr_refresh, .js_qrcheck_refresh","**"),this.$dom.on("click",".js_qr_refresh, .js_qrcheck_refresh",function(){
return t.refresh(),!1;
}),this.popup&&(this.popup.popup("show"),this.popup.popup("resetPosition")),this._requestTicket(),
this;
},i.prototype.destroy=function(){
this._stopAsk(),this.$dom.off("click","**"),this.$dom.empty(),this.popup&&this.popup.popup("remove");
},i.prototype.reload=function(){
this._requestTicket();
},i.prototype.refresh=function(){
this._showQRCode(),this._startAsk();
},i.prototype.getTicket=function(){
return this._ticket||"";
},i.prototype._render=function(){
this.$dom.html(wx.T(r,this.renderData)),this.$msg=this.$dom.find(".js_qr_msg");
},i.prototype._showLoading=function(){
this.renderData.status="loading",this._render();
},i.prototype._showInfo=function(t){
this.renderData.status="info",this.renderData.infoType=t,this._render();
},i.prototype._requestTicket=function(){
var t=this;
t._showLoading(),t._stopAsk(),t._isStopped=!1;
var s={
action:"getticket",
size:t.opt.size,
scene:t.opt.scene,
typeid:t.opt.typeid,
data:JSON.stringify(t.opt.data),
extra:JSON.stringify(t.opt.extra)
};
s=$.extend(!0,s,t.opt.data),n.post({
url:t.opt.cgiURI+"?action=getticket",
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
},i.prototype._showQRCode=function(){
var t=this.opt.cgiURI+"?action=getqrcode&qrcheck_ticket="+this._ticket+"&random="+(new Date).getTime();
t+="&size="+this.opt.size,this.opt.data&&this.opt.data.appid&&(t+="&appid="+this.opt.data.appid),
this.opt.data&&this.opt.data.__biz&&(t+="&__biz="+this.opt.data.__biz),window.wx&&window.wx.data&&window.wx.data.param&&(t+=window.wx.data.param),
this.renderData.status="waiting",this.renderData.img=t,this._render();
},i.prototype._doAsk=function(){
var t=this;
if(t._askNum++,t._askNum>t.opt.askMaxNum)return void t._triggerStatus(0,3);
t._askLatestAjaxID++;
var s=t._askLatestAjaxID,e={
qrcheck_ticket:t._ticket
};
if(t.opt.data&&t.opt.data.appid&&(e.appid=t.opt.data.appid),t.opt.data&&t.opt.data.__biz&&(e.__biz=t.opt.data.__biz),
t.opt.askExtra)for(var i in t.opt.askExtra)t.opt.askExtra[i]&&(e[i]=t.opt.askExtra[i]);
n.get({
url:t.opt.cgiURI+"?action=ask",
data:e,
mask:!1
},{
done:function(e){
1!=t._isStopped&&(s<t._askLatestAjaxID||(t._cgiResp=e,e&&0==e.base_resp.ret?t._triggerStatus(0,e.status,e.result,e.self_check_err_code):(t._stopAsk(),
t._triggerStatus(e.base_resp.ret))));
},
fail:function(){}
});
},i.prototype._startAsk=function(){
var t=this;
t._stopAsk(),t._isStopped=!1,t._triggerStatus(0,0),t._askID=setInterval(function(){
t._doAsk();
},1e3*t.opt.askSpeed);
},i.prototype._stopAsk=function(){
var t=this;
clearInterval(t._askID),t._isStopped=!0,t._askNum=0,t._askPreview=null,t._askLatestAjaxID=0;
},i.prototype._triggerStatus=function(t,s,e,i){
if(0==t){
if(s===this._askPreview)return;
this._askPreview=s,0!=s&&4!=s&&this._stopAsk(),0==s?this.renderData.status="waiting":1==s?(this.renderData.status="info",
this.renderData.infoType="success"):3==s?(this.renderData.status="info",this.renderData.infoType="fail"):4==s?(this.renderData.status="info",
this.renderData.infoType="pending"):2==s?(this.renderData.status="info",this.renderData.infoType="fail"):(this.renderData.status="info",
this.renderData.infoType=""),this._render();
}else p.err(-3==t?"登录超时，请重新登录":"二维码获取失败，请重试"),this.renderData.status="info",this.renderData.infoType="error",
this._render();
var o=void 0;
if("function"==typeof this.opt.onMsgUpdate){
var a=60411==e?i:e;
o=this.opt.onMsgUpdate.call(this,t,s,a);
}
void 0===o&&(o=h.get(this.opt.msgData,t,s,e)),this.$msg.html(o),0==t&&0==s||0==t&&4==s||(0==t&&1==s?"function"==typeof this.opt.onSuccess&&this.opt.onSuccess.call(this,this._ticket,this._cgiResp):0==t&&3==s?"function"==typeof this.opt.onTimeout&&this.opt.onTimeout.call(this):"function"==typeof this.opt.onFail&&this.opt.onFail.call(this,t,s,e));
},e.exports={
init:o,
initPopup:a
};
});