define("cardticket/social_send.js",["cardticket/common_template_helper.js","common/wx/popup.js","common/wx/Step.js","biz_common/moment.js","tpl/cardticket/sendout.html.js","cardticket/send_card_table.js","cardticket/sendout_util.js","tpl/cardticket/send_card.html.js"],function(e){
"use strict";
e("cardticket/common_template_helper.js");
var t=(e("common/wx/popup.js"),e("common/wx/Step.js")),o=e("biz_common/moment.js"),n={
removeOnHide:!0,
view_mode:window.view_mode||1
},i=template.compile(e("tpl/cardticket/sendout.html.js")),s=function(e){
this.opt=$.extend(!0,{},n,e),this.init();
},p=e("cardticket/send_card_table.js"),d=e("cardticket/sendout_util.js");
return s.prototype={
_html:e("tpl/cardticket/send_card.html.js"),
init:function(){
function e(){
var e=a.popup("get").find(".js_btn_p");
$(e[0]).show(),$(e[1]).show(),$(e[2]).hide(),$(e[3]).hide(),c.step.go(1),$(r[0]).show(),
$(r[1]).hide(),a.popup("resetPosition");
}
function n(){
var e=a.popup("get").find(".js_btn_p");
$(e[0]).hide(),$(e[1]).hide(),$(e[2]).show(),$(e[3]).show(),$(e[3]).find("button").text(c.selectedCard.is_sns_card?"下载":"投放"),
$(r[0]).hide(),$(r[1]).show(),c.step.go(2);
var t=$.extend(!0,{
wx_is_intercomm_card:window.wx_is_intercomm_card,
view_mode:window.view_mode||1
},c.selectedCard);
t.__code_valid_time=o().add("d",365).format("YYYY年MM月DD日"),$(r[1]).html($(i(t))),
c.sendoutUtil=new d({
data:c.selectedCard,
container:r[1],
selectComplete:function(e){
s.onSendSubmit&&s.onSendSubmit.call(c,c.selectedCard,e),c.hide();
},
onprev:function(){
c.show();
},
onclose:function(){
c.destroy();
},
card_data:c.selectedCard
}),a.popup("resetPosition");
}
var s=this.opt,c=this,a=$(template.compile(this._html)()).popup({
title:"投放卡券",
autoShow:!1,
buttons:[{
text:"取消",
type:"default",
click:function(){
c.sendCardTable.isLoading()||c.destroy();
}
},{
text:"下一步",
type:"primary",
click:function(){
c.sendCardTable.select();
}
},{
text:"上一步",
type:"default",
click:function(){
e();
}
},{
text:"投放",
type:"primary",
click:function(){
c.sendoutUtil.send();
}
}],
onHide:function(){
s.onHide&&s.onHide.call(c),s.removeOnHide&&this.remove();
},
onClose:function(){
c.destroy();
},
className:"send_card align_edge",
width:960
}),r=a.popup("get").find(".js_step_content");
this.$send_popup=a,this.step=new t({
container:this.$send_popup.find(".js_step_container"),
names:["1 选择优惠券","2 投放方式"]
}),e(),s.container=this.$send_popup,s.pageChanged=function(){
c.$send_popup.popup("resetPosition");
},s.getDataComplete=function(){
c.$send_popup.popup("resetPosition");
},s.selectComplete=function(e){
c.selectedCard=e,n();
},s.hidePopup=function(){
c.$send_popup.popup("hide");
},this.sendCardTable=new p(s);
},
show:function(){
this.$send_popup.popup("show"),this.$send_popup.popup("resetPosition");
},
hide:function(){
this.$send_popup.popup("hide");
},
destroy:function(){
this.$send_popup.popup("remove");
}
},s;
});