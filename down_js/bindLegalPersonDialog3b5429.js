define("setting/bindLegalPersonDialog.js",["common/wx/popup.js","common/wx/qrcheck.js","common/wx/Cgi.js","common/wx/Tips.js","safe/Scan.js","setting/tpl/bindLegalPersonDialog.html.js"],function(e){
"use strict";
e("common/wx/popup.js");
var t=e("common/wx/qrcheck.js"),s=e("common/wx/Cgi.js"),n=e("common/wx/Tips.js"),i=e("safe/Scan.js"),r=e("setting/tpl/bindLegalPersonDialog.html.js"),a=function(e){
function t(e){
var t,s=0;
"x"==e[17].toLowerCase()&&(e[17]=10);
for(var r=0;17>r;r++)s+=n[r]*e[r];
return t=s%11,e[17]==i[t]?!0:!1;
}
function s(e){
var t=e.substring(6,10),s=e.substring(10,12),n=e.substring(12,14),i=new Date(t,parseFloat(s)-1,parseFloat(n));
return(new Date).getFullYear()-parseInt(t)<18?!1:i.getFullYear()!=parseFloat(t)||i.getMonth()!=parseFloat(s)-1||i.getDate()!=parseFloat(n)?!1:!0;
}
var n=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1],i=[1,0,10,9,8,7,6,5,4,3,2];
if(e=$.trim(e.replace(/ /g,"")),15==e.length)return!1;
if(18==e.length){
var r=e.split("");
return s(e)&&t(r)?!0:!1;
}
return!1;
},c=function(){
this._scanner=null,this._qrchecker=null,this._timer=null,this._btns=null,this.legalPersonIdcard=null,
this.legalPersonName=null,this.legalPersonTicket=null,this.code=null,this._init();
};
return c.prototype._init=function(){
var e=this;
$(r).popup({
title:"法定代表人绑定",
width:726,
className:"person_bind_dialog",
buttons:[{
text:"申请绑定",
click:function(){
return e._btns.eq(0).hasClass("btn_disabled")?!1:void s.post({
url:"/cgi-bin/settingpage?action=bindlegal",
data:{
name:e.legalPersonName,
idcard:e.legalPersonIdcard,
adminticket:e.code,
legalticket:e.legalPersonTicket
}
},function(t){
return t&&t.base_resp?void(0==t.base_resp.ret?(e._btns.eq(0).hide(),e._btns.eq(1).show(),
e.$jsStepQrcheck.hide(),e.$jsStepTips.show()):n.err(-1==t.base_resp.ret?"系统错误，请稍候重试":402==t.base_resp.ret?"二维码过期":500==t.base_resp.ret?"错误的二维码":"系统错误，请稍候重试")):(n.err("系统错误，请稍候重试"),
!1);
});
}
},{
text:"我知道了",
click:function(){
this.remove(),window.location.reload();
}
}],
onShow:function(){
e.dialog=this.get(),e.$jsNameInput=this.get().find(".js_name_input"),e.$jsNameInputError=this.get().find(".js_name_input_error"),
e.$jsIdcardInput=this.get().find(".js_idcard_input"),e.$jsIdcardInputError=this.get().find(".js_idcard_input_error"),
e.$jsStepScan=this.get().find(".js_step_scan"),e.$jsStepQrcheck=this.get().find(".js_step_qrcheck"),
e.$jsStepTips=this.get().find(".js_step_tips"),e.$jsNotQrcheckDiv=this.get().find(".js_not_qrcheck_div"),
e.$jsQrcheckDiv=this.get().find(".js_qrcheck_div"),e._btns=this.get().find(".js_btn_p"),
e._btns.eq(0).hide(),e._btns.eq(1).hide(),e.$jsStepScan.show(),e.$jsStepQrcheck.hide(),
e.$jsStepTips.hide(),e._bindEvent(),e._initScan();
},
onHide:function(){
this._scanner&&this._scanner.destroy(),this._qrchecker&&this._qrchecker.destroy();
}
});
},c.prototype._initScan=function(){
var e=this;
this._scanner&&this._scanner.destroy(),this._scanner=new i({
container:this.dialog.find(".js_scan_div"),
type:"check",
source:"bind_legal_person",
wx_name:cgiData.wx_alias,
onconfirm:function(){
e.code=this.code,e.$jsStepScan.hide(),e.$jsStepQrcheck.show(),e.$jsNotQrcheckDiv.show(),
e.$jsQrcheckDiv.hide(),e._btns.eq(0).show(),e._btns.eq(0).removeClass("btn_primary").addClass("btn_disabled");
}
});
},c.prototype._initQrcheck=function(){
if(this._qrchecker&&this._qrchecker.destroy(),!this.legalPersonName||!this.legalPersonIdcard)return this.$jsNotQrcheckDiv.show(),
this.$jsQrcheckDiv.hide(),!1;
this.$jsNotQrcheckDiv.hide(),this.$jsQrcheckDiv.show();
var e=this;
this._qrchecker=new t({
container:this.dialog.find(".js_qrcheck_div"),
cgiURI:"/acct/slaveqrcheckoper",
size:120,
scene:19,
idCard:this.legalPersonIdcard,
name:this.legalPersonName,
renderData:{
name_title:"法定代表人"
},
extra:{
admincode:e.code
},
askSpeed:5,
askMaxNum:60,
onTicketChange:function(t){
e.legalPersonTicket=t;
},
onStatusChange:function(t){
1==t?e._btns.eq(0).removeClass("btn_disabled").addClass("btn_primary"):e._btns.eq(0).removeClass("btn_primary").addClass("btn_disabled");
},
onTipsChange:function(t,s){
var n="";
return n="1"==t?template.render("tpl_qrcheck_tips_1",{
name:this.legalPersonName
}):wx.T(e.dialog.find(".js_qrcheck_div").find(".js_qrcheck_ret_"+t).show()[0].outerHTML,s);
}
}),$.trim(this.legalPersonName)&&$.trim(this.legalPersonIdcard)&&this._qrchecker.updateUser(this.legalPersonIdcard,this.legalPersonName);
},c.prototype._bindEvent=function(){
var e=this;
this.$jsNameInput.on("input propertychange",function(){
return $.trim(e.$jsNameInput.val())?(e.$jsNameInputError.hide(),e.legalPersonName=$.trim(e.$jsNameInput.val()),
e._timer?(clearTimeout(e._timer),e._timer=setTimeout(function(){
e._initQrcheck();
},500)):e._initQrcheck(),void 0):(e.$jsQrcheckDiv.hide(),e.$jsNotQrcheckDiv.show(),
!1);
}),this.$jsIdcardInput.on("input propertychange",function(){
return $.trim(e.$jsIdcardInput.val())&&a($.trim(e.$jsIdcardInput.val()))?(e.$jsIdcardInputError.hide(),
e.legalPersonIdcard=$.trim(e.$jsIdcardInput.val()),e._timer?(clearTimeout(e._timer),
e._timer=setTimeout(function(){
e._initQrcheck();
},500)):e._initQrcheck(),void 0):(e.$jsQrcheckDiv.hide(),e.$jsNotQrcheckDiv.show(),
!1);
}),this.$jsNameInput.on("blur",function(){
$.trim(e.$jsNameInput.val())?e.$jsNameInputError.hide():e.$jsNameInputError.show();
}),this.$jsIdcardInput.on("blur",function(){
$.trim(e.$jsIdcardInput.val())&&a($.trim(e.$jsIdcardInput.val()))?e.$jsIdcardInputError.hide():e.$jsIdcardInputError.show();
});
},c;
});