define("cardticket/fee_recharge.js",["common/wx/popup.js","common/wx/Step.js","common/wx/Cgi.js","cardticket/common_template_helper.js","tpl/cardticket/card_recharge.html.js","page/cardticket/dialog_invoice_recharge.css"],function(e){
"use strict";
function t(){
function e(e){
var t=e.container;
this.step=new r({
container:t,
names:["1 选择充值券点数量","2 扫码支付"]
});
}
function t(e){
return/^[0-9]+$/.test(e)&&parseInt(e)>=100&&parseInt(e)<1e5;
}
var n=this;
e.prototype.next=function(){
this.step.go(2),n.rechargePopup.find(".js_btn_p").hide();
var e=n.rechargePopup.popup("get");
e.find(".js_step1").hide(),e.find(".js_step2").show(),n.rechargePopup.popup("resetPosition");
},e.prototype.first=function(){
this.step.go(1),n.rechargePopup.find(".js_btn_p").show();
var e=n.rechargePopup.popup("get");
e.find(".js_step1").show(),e.find(".js_step2").hide(),n.rechargePopup.popup("resetPosition");
},this.rechargePopup=$(i()).popup({
title:"充值",
buttons:[{
text:"下一步",
type:"primary",
click:function(){
var e=n.rechargeCount;
return 0!=e||(e=d.val(),t(e))?(e=o.fix_money(e),p.text(e),n.rechargePopup.find(".js_btn_p").btn(!1),
void s.get({
url:"/merchant/cardmoneymgr?action=get_recharge_pay_package",
data:{
coin_count:Math.ceil(100*e)
}
}).success(function(e){
if(0==e.base_resp.ret){
_.attr("src",wx.url("/merchant/cardmoneymgr?action=get_recharge_qrcode&qrcode_url=%s".sprintf(encodeURIComponent(e.qrcode_url)))),
n.step.next();
var t=setInterval(function(){
s.get({
url:"/merchant/cardmoneymgr?action=check_is_order_pay",
data:{
order_id:e.order_id
}
}).success(function(e){
if(0==e.base_resp.ret){
if(1==e.is_pay){
var r=n.rechargePopup.popup("get");
r.find(".dialog_bd").html(c()),r.find(".dialog_ft").hide(),n.rechargePopup.popup("resetPosition"),
clearInterval(t),n.is_pay_finish=!0,t=null,r.find(".js_btn_back").click(function(){
location.reload();
});
}
}else s.show(e);
});
},3e3);
}else s.show(e);
}).complete(function(){
n.rechargePopup.find(".js_btn_p").btn(!0);
})):void h.show();
}
}],
className:"align_edge",
onHide:function(){
n.is_pay_finish&&location.reload();
}
}),this.$dom=this.rechargePopup.popup("get"),this.step=new e({
container:$(".js_step",this.$dom)
}),this.rechargeCount=1;
var a=$(".js_typeSelect",this.$dom),p=$(".js_paymoney",this.$dom),d=$(".js_other_money",this.$dom),h=$(".js_error",this.$dom).hide(),_=$(".js_img",this.$dom),l=$(".js_other_moneycontainer",this.$dom);
a.click(function(){
a.removeClass("selected"),$(this).addClass("selected"),n.rechargeCount=parseFloat($(this).attr("val")),
p.text(n.rechargeCount),0==n.rechargeCount?(l.show(),d.val("")):l.hide();
}),a.filter(".selected").click(),this.step.first();
}
var r=(e("common/wx/popup.js"),e("common/wx/Step.js")),s=e("common/wx/Cgi.js"),o=e("cardticket/common_template_helper.js"),i=template.compile(e("tpl/cardticket/card_recharge.html.js")),c=template.compile('<div class="page_msg small msg_center default">			    <div class="inner group">			        <span class="msg_icon_wrp">			            <i class="icon_msg success"></i>			        </span>			        <div class="msg_content">			            <h4> 支付成功 </h4>			        </div>			        <div><a href="javascript:;" class="btn btn_primary js_btn_back">——("返回")</a></div>			    </div>			</div>');
return e("page/cardticket/dialog_invoice_recharge.css"),t;
});