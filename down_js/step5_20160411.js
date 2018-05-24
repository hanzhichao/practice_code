define("wxverify/step5_20160411.js",["tpl/wxverify/step5.html.js","common/wx/dialog.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/tooltips.js","common/qq/jquery.plugin/zclip.js"],function(t,a,e){
"use strict";
{
var i=wx.T,s=t("tpl/wxverify/step5.html.js"),o=wx.cgiData.limit_1000,c=t("common/wx/dialog.js"),r=t("common/wx/Cgi.js"),n=t("common/wx/Tips.js");
t("common/wx/tooltips.js");
}
t("common/qq/jquery.plugin/zclip.js"),e.exports=function(){
wx.cgiData.tx_bank="755901658210115",1==wx.cgiData.is_overseas&&(wx.cgiData.tx_bank="755901658232501"),
wx.cgiData.is_pay_code_right=/^\d{10}$/.test(wx.cgiData.data.pay_code),$("#wxverify").html(i(s,wx.cgiData)),
$("#js_copy").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
return 0==wx.cgiData.is_overseas?wx.cgiData.tx_bank+wx.cgiData.data.pay_code:1==wx.cgiData.is_overseas?wx.cgiData.tx_bank:void 0;
},
afterCopy:function(){
n.suc("复制成功");
}
}),$("#jsTab").delegate(".tab_nav","click",function(){
var t=$(this),a=t.attr("data-tab"),e=+t.data("pay_method");
1==e&&2==wx.cgiData.data.pay_method?c.show({
title:"提示",
msg:"请确认是否已经付款|请再次确认是否已经使用对公账户打款支付了认证审核服务费用！<br/>如果已经支付过，请不要再选择微信支付来支付费用，以免重复付费。<br><br>请耐心等待1~3个工作日，一旦我们的银行账户收到你的付款，<br/>就会对你的认证订单进行审核。",
className:"dialog_confirm_payment",
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove(),t.addClass("selected").siblings("li").removeClass("selected"),$(a).addClass("selected").siblings("div").removeClass("selected");
}
}]
}):(t.addClass("selected").siblings("li").removeClass("selected"),$(a).addClass("selected").siblings("div").removeClass("selected"));
}),1==wx.cgiData.data.pay_method&&wx.cgiData.is_pay_code_right&&$("#jsTab").find(".tab_nav").eq(1).click(),
1==wx.cgiData.is_overseas?($(".pay_box>p:first-child").remove(),$("#jsTab").find(".js_tab_bank").addClass("no_extra").click(),
$("#jsTab").find(".js_tab_wepay").remove()):1==wx.cgiData.register_type&&($(".pay_box>p:first-child").remove(),
$(".pay_process_box.pay_process_wx .default_box_arrow_wrp").css({
left:"47px"
}),$("#jsTab").find(".js_tab_wepay").click(),$("#jsTab").find(".js_tab_bank").remove()),
$(".js_pay").click(function(){
var t=$(this),a=+t.data("pay_method");
return t.btn(!1),o?(c.show({
msg:"|由于申请认证帐号数已超过最大限额，请明天上午9点再尝试提交微信认证。",
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
}),t.btn(!0),!1):(r.post({
url:"/acct/wxverify?action=select_pay_method",
data:{
order_id:wx.cgiData.order_id,
pay_method:a
}
},function(e){
0==e.base_resp.ret?1==a?location.href=wx.url("/merchant/store?action=pay&t=service/pay&info=verify&order_id="+wx.cgiData.order_id):2==a&&(c.show({
title:"提示",
msg:'请尽快进行支付|微信团队收到款项之后，你会收到公众平台通知中心的确认消息，请注意查收。由于不同银行到账时间不同，可能需要1~3个工作日不等。<br><br>请在【设置】-【账号信息】-认证详情里查看或更改支付方式<br><span class="warning">每个公众账号对应的收款银行账号是不同的，请勿向其他收款账号打款，请勿将多笔认证费用转入同一个银行账户，否则会导致无法认证。</span>',
mask:!0,
type:"warn",
buttons:[{
text:"确定",
click:function(){
location.href=wx.url("/merchant/order?action=index&t=service/order");
}
}]
}),t.btn(!0)):(n.err("系统繁忙，请稍后再试"),t.btn(!0));
}),!1);
}),$(".js_prev").click(function(){
location.href=wx.url("/acct/wxverify?action=step&step=invoice");
}),$(".js_submit").click(function(){
var t=$(this);
return t.btn(!1),r.post({
url:"/acct/wxverify?action=select_pay_method",
data:{
order_id:wx.cgiData.order_id,
pay_method:0
}
},function(a){
0==a.base_resp.ret?location.href=wx.url("/merchant/order?action=detail&t=service/detail&order_id="+wx.cgiData.order_id):(n.err("系统繁忙，请稍后再试"),
t.btn(!0));
}),!1;
});
};
});