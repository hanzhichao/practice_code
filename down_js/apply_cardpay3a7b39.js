define("cardticket/apply_cardpay.js",["cardticket/store_cgi.js","common/wx/dialog.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js"],function(e){
"use strict";
function t(e){
e=$.extend(!0,{},e),$(e.apply_dom).click(function(){
if(!e.is_wxpay_open)return void r.show({
type:"info",
msg:"尚未开通微信支付，无法开通微信买单功能",
buttons:[{
text:"去开通",
click:function(){
location.href=wx.url("/cgi-bin/frame?nav=10010&t=business/index_frame&iframe=%2Fpaymch%2Fbusiness%3Faction%3Dfirstentry"),
this.hide();
},
type:"primary"
}]
});
if(n){
if(!s)return void r.show({
type:"info",
msg:"暂无有效门店|使用微信买单功能仅对有有效门店的商户开放，请前往设置门店",
buttons:[{
text:"设置门店",
click:function(){
location.href=wx.url("/merchant/entityshop?action=list"),this.hide();
},
type:"primary"
}]
});
$(a).popup({
onHide:function(){
this.remove();
},
title:"提示",
buttons:[{
text:"开通",
click:function(){
var e=$("#js_agree_paycard").prop("checked");
if(!e)return void o.err("请同意并遵守协议");
var t=this;
c.post({
url:"/merchant/cardmerchantprofile?action=setcardpaymoney"
},function(e){
return 14013==e.base_resp.ret?(t.remove(),void r.show({
type:"info",
msg:"你的支付商户号目前为旧商户号，需要升级新权限才可开通买单，"+"<a href='%s' target=\"_blank\">现在去升级</a>".sprintf(wx.url("/cgi-bin/frame?nav=10010&t=business/index_frame&iframe=%2Fpaymch%2Fbusiness%3Faction%3Dfirstentry")),
buttons:[{
text:"取消",
click:function(){
this.remove();
},
type:"normal"
}]
})):213002==e.base_resp.ret||213003==e.base_resp.ret?(t.remove(),void r.show({
type:"info",
msg:213002==e.base_resp.ret?"微信支付服务商户号不支持开通买单":"当前微信支付商户号不支持开通买单",
buttons:[{
text:"取消",
click:function(){
this.remove();
},
type:"normal"
}]
})):0!=e.base_resp.ret?void c.show(e):(t.remove(),void r.show(e.all_store_have_checker?{
type:"info",
msg:"已开启微信买单功能|你的门店全部配备收款员/核销员，收款员/核销员仅在指定的门店下进行收款/接受指定门店的买单通知<br/><br/>你可在<a href='"+wx.url("/merchant/carduse?action=listchecker")+"'>权限管理</a>修改管理",
buttons:[{
text:"完成",
click:function(){
location.reload(),this.hide();
},
type:"primary"
}]
}:{
type:"info",
msg:"已开启微信买单功能，请设置收款员/核销员|必须为适用门店配置收款员/核销员，消费者方可在指定门店进行买单。收款员/核销员仅在指定的门店下进行收款/接受指定门店的买单通知<br/><br/>你的门店尚没/部分配置收款员/核销员，请前往设置。",
buttons:[{
text:"配置核销员",
click:function(){
location.href=wx.url("/merchant/carduse?action=listchecker"),this.hide();
},
type:"primary"
},{
text:"取消",
click:function(){
location.reload(),this.hide();
},
type:"normal"
}]
}));
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
},
type:"default"
}]
}),$("#js_agree_paycard").checkbox();
}
});
}
var i=e("cardticket/store_cgi.js"),r=e("common/wx/dialog.js"),c=(e("common/wx/popup.js"),
e("common/wx/Cgi.js")),o=e("common/wx/Tips.js"),n=!1,a='<div>开通微信买单功能后，消费者在门店主动发起的付款，最终抵扣优惠券后的实际资金则结算到申请微信支付时填写的银行帐号里，结算周期以微信支付各类目结算周期为准。<br/><br/><label class="frm_checkbox_label">             <i class="icon_checkbox"></i>             <input type="checkbox" class="frm_checkbox" id="js_agree_paycard">我同意并遵守<a href="'+wx.url("/cgi-bin/frame?t=cardticket/faq_apply_card_pay_frame&amp;type=info")+"\" target='_blank'>《微信公众平台卡券买单功能服务协议》</a></label></div>')",s=!1;
return e("biz_web/ui/checkbox.js"),i.listStore({
getDataExtra:{
count:1
},
success:function(e){
n=!0,s=e.total_num>0;
}
}),t;
});