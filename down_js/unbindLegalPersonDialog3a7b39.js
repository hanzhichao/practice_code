define("setting/unbindLegalPersonDialog.js",["common/wx/popup.js","common/wx/qrcheck_weapp.js","common/wx/Cgi.js","common/wx/Tips.js","setting/tpl/unbindLegalPersonDialog.html.js"],function(t){
"use strict";
t("common/wx/popup.js");
var e=t("common/wx/qrcheck_weapp.js"),i=t("common/wx/Cgi.js"),n=t("common/wx/Tips.js"),s=t("setting/tpl/unbindLegalPersonDialog.html.js"),c=function(t){
this._qrchecker=null,this._btns=null,this._ticket=null,this.admin_name=t.admin_name,
this._init();
};
return c.prototype._init=function(){
var t=this;
$(s).popup({
title:"法定代表人解绑",
width:726,
className:"person_bind_dialog",
buttons:[{
text:"确定",
type:"primary",
click:function(){
i.post({
url:"/cgi-bin/settingpage?action=unbindlegal",
data:{
ticket:t._ticket
}
},function(t){
return t&&t.base_resp?void(0==t.base_resp.ret?(n.suc("解绑成功"),window.location.reload()):n.err("系统错误，请稍候重试")):(n.err("系统错误，请稍候重试"),
!1);
});
}
},{
text:"取消",
click:function(){
this.remove();
}
}],
onShow:function(){
t.dialog=this.get(),t.$jsStepQrcheck=this.get().find(".js_step_qrcheck"),t.$jsQrcheckDiv=this.get().find(".js_qrcheck_div"),
t.$jsStepTips=this.get().find(".js_step_tips"),t._btns=this.get().find(".js_btn_p"),
t._btns.eq(0).hide(),t._btns.eq(1).hide(),t._initQrcheck();
},
onHide:function(){
this._qrchecker&&this._qrchecker.destroy();
}
});
},c.prototype._initQrcheck=function(){
this._qrchecker&&this._qrchecker.destroy();
var t=this;
this._qrchecker=e.init({
container:t.$jsQrcheckDiv,
data:{
typeid:21
},
cgiURI:"/cgi-bin/safeqrcode",
size:165,
showImgInfo:!0,
onSuccess:function(e,i){
0==i.base_resp.ret?(t.$jsStepQrcheck.hide(),t.$jsStepTips.show(),t._ticket=e,t._btns.eq(0).show(),
t._btns.eq(1).show()):n.err("系统错误，请稍候重试");
},
onMsgUpdate:function(e,i){
return 0==e&&0==i?"请用管理员微信(%s)扫描以上二维码进行验证".sprintf(t.admin_name):void 0;
}
}),this._qrchecker.load();
},c;
});