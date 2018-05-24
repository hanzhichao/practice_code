define("wxverify/step5.js",["common/qq/jquery.plugin/zclip.js","common/wx/Cgi.js","common/wx/dialog.js","common/wx/Tips.js","biz_common/moment.js","tpl/wxverify/step5_wxpay.html.js","tpl/wxverify/step5_remit.html.js","tpl/wxverify/step5_nopay.html.js"],function(e,t,r){
"use strict";
function o(){
var e={
cny:"元",
usd:"美元"
};
j={
pay_method:v.data.pay_method,
can_use_wxpay:v.data.can_use_wxpay,
can_use_remit:v.data.can_use_remit,
is_overseas:v.is_overseas,
limit:v.limit_1000,
order_id:v.order_id,
order:v.order,
user_name:v.user_name,
user_id:v.user_id
},j.order.price=(j.order.price/100).toFixed(2),j.order.currency=e[j.order.currency.toLowerCase()]||"",
j.order.create_time=y.unix(j.order.create_time).format("YYYY-MM-DD H:mm"),console.log(j);
}
function i(){
var e=wx.cgiData.type;
3==e||4==e?n():j.can_use_wxpay&&2!=j.pay_method?a():c();
}
function n(){
$("#wxverify").html(p(w,j)),$(".js_btn_pre").on("click",function(){
location.href=wx.url("/acct/wxverify?action=step&step=invoice");
}),$(".js_btn_submit").on("click",function(){
var e=$(this);
return e.btn(!1),l.post({
url:"/acct/wxverify?action=select_pay_method",
data:{
order_id:j.order_id,
pay_method:0
}
},function(t){
t&&0==t.base_resp.ret?location.href=wx.url("/merchant/order?action=index&t=service/order"):(e.btn(!0),
l.handleRet(t,{
id:"64430",
key:"19",
msg:"系统繁忙，请稍后再试"
}));
}),!1;
});
}
function a(){
b=1,$.extend(j,{
qrcode_url:wx.url("/merchant/order?action=get_qrcode&order_id="+j.order_id+wx.data.param),
order_url:wx.url("/merchant/order?action=index&t=service/order")
}),$("#wxverify").html(p(h,j)),$(".js_btn_show_remit").on("click",function(){
return c(),!1;
}),$(".js_btn_pre").on("click",function(){
location.href=wx.url("/acct/wxverify?action=step&step=invoice");
}),$(".js_btn_refresh").on("click",function(){
s();
}),s();
}
function c(){
d(),b=2,$.extend(j,{
tx_bank:1==v.is_overseas?"755901658232501":"755901658210115",
bank_name:v.data.bank_name||"",
bank_account:v.data.bank_account||"",
account_name:v.data.account_name||"",
pay_method:1*v.data.pay_method,
pay_code:v.data.pay_code||"",
is_pay_code_right:/^\d{10}$/.test(j.pay_code),
order_url:wx.url("/merchant/order?action=index&t=service/order"),
is_submitted:0
}),$("#wxverify").html(p(x,j)),$("#js_copy").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
return 0==j.is_overseas?j.tx_bank+wx.cgiData.data.pay_code:1==j.is_overseas?j.tx_bank:void 0;
},
afterCopy:function(){
f.suc("复制成功");
}
}),$(".js_btn_pre").on("click",function(){
location.href=wx.url("/acct/wxverify?action=step&step=invoice");
}),$(".js_btn_show_wxpay").on("click",function(){
return a(),!1;
}),$(".js_btn_submit_remirt").on("click",function(){
var e=$(this);
return e.btn(!1),l.post({
url:"/acct/wxverify?action=select_pay_method",
data:{
order_id:j.order_id,
pay_method:2
}
},function(t){
t&&0==t.base_resp.ret?(j.is_submitted=1,$("#wxverify").html(p(x,j))):(l.handleRet(t,{
id:"64430",
key:"19",
msg:"系统繁忙，请稍后再试"
}),e.btn(!0));
}),!1;
});
}
function s(){
$(".js_div_loading").show(),$(".js_btn_refresh").hide(),l.post({
url:"/acct/wxverify?action=select_pay_method",
data:{
order_id:wx.cgiData.order_id,
pay_method:1
}
},function(e){
e&&0==e.base_resp.ret?($(".js_div_mask").hide(),$(".js_img_qrcode").show(),_()):($(".js_div_loading").hide(),
$(".js_btn_refresh").show(),l.handleRet(e,{
id:"64430",
key:"19",
showMsg:!1
}));
});
}
function _(){
u=setTimeout(function(){
l.get({
url:"/merchant/order?action=query&order_id="+j.order_id,
mask:!1,
error:function(){
_();
}
},function(e){
0!=e.base_resp.ret||1!=e.order_info.status&&3!=e.order_info.status&&6!=e.order_info.status?(_(),
0!=e.base_resp.ret&&l.handleRet(e,{
id:"64430",
key:"20",
showMsg:!1
})):(j.order.status=e.order_info.status,$("#wxverify").html(p(h,j)));
});
},3e3);
}
function d(){
u&&clearTimeout(u);
}
function m(){
o(),i();
}
e("common/qq/jquery.plugin/zclip.js");
var u,p=wx.T,l=(template.render,e("common/wx/Cgi.js")),f=(e("common/wx/dialog.js"),
e("common/wx/Tips.js")),y=e("biz_common/moment.js"),h=e("tpl/wxverify/step5_wxpay.html.js"),x=e("tpl/wxverify/step5_remit.html.js"),w=e("tpl/wxverify/step5_nopay.html.js"),v=wx.cgiData,b=0,j={};
r.exports=m;
});