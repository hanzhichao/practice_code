define("cardticket/create_task.js",["common/wx/Cgi.js","common/wx/Tips.js","cardticket/common_template_helper.js","tpl/cardticket/create_task.html.js","biz_web/ui/checkbox.js","common/wx/popup.js","page/cardticket/dialog_choose_card.css"],function(t){
"use strict";
function e(t){
function e(e){
var n=$.trim(a.val()),r=$.trim(_.val()),c=o.card,p=c.id;
return!/^\d+$/.test(n)||0>=n?(i.err("库存只能是大于0的整数"),void a.focus()):n>c.quantity?(i.err("发券量不能超过库存"),
void a.focus()):r?(o.cgi_loading=!0,void s.post({
url:"/merchant/card_intercomm",
data:{
to_user_name:r,
quantity:n,
card_id:p,
action:"create_task",
force:e?1:0,
switch_showuser:d.prop("checked")?0:1
},
complete:function(){
o.cgi_loading=!1;
}
},function(e){
"undefined"==typeof e.base_resp&&(e.base_resp={
ret:e.ret
}),0==e.base_resp.ret?(i.suc("创建任务成功"),t.onclose&&t.onclose(),location.href=wx.url("/merchant/card_intercomm?action=send_list&t=cardticket/intercomm_list")):"14021"==e.base_resp.ret?(i.err("发券量不能超过库存"),
a.focus()):"14024"==e.base_resp.ret?(i.err("该公众号不存在，请检查重新填写"),_.focus()):"14026"==e.base_resp.ret?(i.err("该公众号没有开通卡券功能，不能接收卡券,请检查重新填写"),
_.focus()):"14025"==e.base_resp.ret?(i.err("不能填写当前公众号，请检查重新填写"),_.focus()):"14022"==e.base_resp.ret?i.err("该公众号没有开通互通卡券功能，不能接收卡券，请检查重新填写"):"14023"==e.base_resp.ret?(t.onnodev&&t.onnodev(e.nickname),
o.shownodev(e.nickname)):"14028"==e.base_resp.ret?i.err("非有效卡券状态，请检查后重试"):s.handleRet(e,{
id:64463,
key:37,
url:"/merchant/card_intercomm?action=create_task"
});
})):(i.err("请输入接收商户"),void _.focus());
}
this.cgi_loading=!1;
var o=this;
this.opt=t=$.extend(!0,{},r,t),this.$setting_dialog=$(n).popup({
title:"设置",
autoShow:!1,
buttons:[{
text:"上一步",
click:function(){
this._hidefrom=1,this.hide(),t.onprev&&t.onprev();
}
},{
text:"确定",
click:function(){
e(!1);
},
type:"primary"
},{
text:"继续发送",
click:function(){
e(!0);
}
},{
text:"取消",
click:function(){
t.oncancel&&t.oncancel(),o.showfirst();
}
}],
onHide:function(){
1!=this._hidefrom?t.onhide&&t.onhide():this._hidefrom=0;
},
onClose:function(){
o.destroy(),t.onclose&&t.onclose();
}
}),this.$setting_dialog.popup("resetPosition");
var c=this.$setting_dialog.popup("get"),a=c.find(".js_quantity_input"),d=c.find(".js_switch_showuser");
d.checkbox();
var _=c.find(".js_username");
this.$setting_btns=this.$setting_dialog.popup("get").find(".js_btn_p");
}
{
var s=t("common/wx/Cgi.js"),i=t("common/wx/Tips.js"),o=t("cardticket/common_template_helper.js"),n=t("tpl/cardticket/create_task.html.js");
t("biz_web/ui/checkbox.js");
}
t("common/wx/popup.js");
var r={
onprev:null
};
return t("page/cardticket/dialog_choose_card.css"),e.prototype={
show:function(t){
function e(){
$(s.$setting_btns[0]).show(),$(s.$setting_btns[1]).show(),$(s.$setting_btns[2]).hide(),
$(s.$setting_btns[3]).hide();
}
var s=this;
if($("#js_step1").show(),$("#js_step_nocard").hide(),$("#js_step_nocarddev").hide(),
s.$setting_dialog.popup("resetPosition"),s.$setting_dialog.popup("show"),e(),t){
var i=s.$setting_dialog.popup("get");
i.find(".js_card_title").text(t.title),i.find(".js_card_type").text(o.type_map[t.type]),
i.find(".js_quantity").text(t.quantity),s.card=t;
}
},
shownodev:function(t){
$("#js_step1").hide(),$("#js_step_nocard").hide(),$("#js_step_nocarddev").show();
var e=this;
$(e.$setting_btns[0]).hide(),$(e.$setting_btns[1]).hide(),$(e.$setting_btns[2]).show(),
$(e.$setting_btns[3]).show(),e.$setting_dialog.popup("resetPosition");
var s=e.$setting_dialog.popup("get");
s.find(".js_nickname").text(t);
},
destroy:function(){
this.$setting_dialog.popup("remove");
}
},e;
});