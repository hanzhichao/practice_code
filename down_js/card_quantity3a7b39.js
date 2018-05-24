define("cardticket/card_quantity.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js","cardticket/common_template_helper.js","tpl/cardticket/card_quantity.html.js","common/wx/tooltips.js","common/wx/tooltipsManager.js"],function(t){
"use strict";
var e=t("common/wx/Cgi.js"),a=t("common/wx/Tips.js"),i=(t("biz_web/ui/checkbox.js"),
t("cardticket/common_template_helper.js")),o=template.compile(t("tpl/cardticket/card_quantity.html.js")),s={
container:"",
quantityChange:$.noop,
max_sku_for_eachcard:1e4,
setquantity:!0
},n=t("common/wx/tooltips.js"),r=t("common/wx/tooltipsManager.js"),c=function(t){
t=$.extend(!0,{},s,t),this.opt=t;
var c=this;
t.data||(t.data={}),$(t.container).on("click",function(s){
function l(i,o){
$(".js_state_quantity",c.tooltip.$dom).hide();
var s=$(".js_state_"+i,c.tooltip.$dom).show(),n=s.attr("isinit");
if(0==i)e.get({
url:"/merchant/cardmoneymgr?action=get_card_price",
data:{
card_id:_
},
success:function(t){
if(0==t.base_resp.ret){
var a=$.parseJSON(t.result_json);
a.items[0].total_coin_balance=t.total_coin_balance,l(1,a.items[0]);
}else e.show(t);
}
});else if(1==i){
var d=o.price,m=o.total_coin_balance;
if(!n){
var p=$(".js_error",s),f=$(".js_total_price",s),h=$(".js_total_price_container",s),y=$(".js_value",s).keyup(function(){
var t=$(this),e=$.trim($(this).val());
if(!/^[0-9]+$/.test(e)||isNaN(e)||0>=e)return p.text("库存必须是不小于1的整数").show().addClass("fail"),
t.focus(),h.hide(),!1;
var a=1e9;
return e>=a?(p.text("库存不能大于10亿").show().addClass("fail"),t.focus(),!1):d*e>m?(p.html('券点余额：%s 余额不足，<a target="_blank" href="%s">去充值</a>'.sprintf(m/100,wx.url("/merchant/cardmoneymgr?action=get_order_flow"))).show().addClass("fail"),
t.focus(),h.show(),f.text(d*e/100),!1):(p.text("券点余额：%s，优先使用免费券点".sprintf(m/100)).show().removeClass("fail"),
h.show(),void f.text(d*e/100));
});
$(".js_confirm",s).click(function(){
var t=$.trim(y.val());
if(!/^[0-9]+$/.test(t)||isNaN(t)||0>=t)return p.text("库存必须是不小于1的整数").show().addClass("fail"),
y.focus(),h.hide(),!1;
var a=1e9;
return t>=a?(p.text("库存不能大于10亿").show().addClass("fail"),y.focus(),!1):d*t>m?(p.html('券点余额：%s 余额不足，<a target="_blank" href="%s">去充值</a>'.sprintf(m/100,wx.url("/merchant/cardmoneymgr?action=get_order_flow"))).show().addClass("fail"),
y.focus(),!1):($(this).btn(!1),t=parseInt(t),void e.get({
url:"/merchant/cardmoneymgr?action=get_card_pay_price",
data:{
card_id:_,
quantity:t
},
success:function(a){
0==a.base_resp.ret?(a.quantity=t,l(2,a)):e.show(a);
}
}));
}),$(".js_cancel",s).click(function(){
c.tooltip.hide(),r.removeAll(),c.tooltip=null;
});
}
s.find(".js_price").text(o.price/100);
}else if(2==i){
if(!n){
var v=!1;
$(".js_confirm",s).click(function(){
v||($(this).btn(!1),v=!0,e.post({
url:"/merchant/cardmoneymgr?action=confirm_card_coin_pay",
data:{
card_id:_,
quantity:o.quantity,
free_coin:o.free_coin,
pay_coin:o.pay_coin,
order_id:o.order_id,
price:o.price
},
complete:function(){
v=!1;
},
success:function(t){
$(this).btn(!0),0==t.base_resp.ret?(t.addquantity=o.quantity,u.pay_info.is_swipe_card?l(9,t):l(3,t)):26==t.base_resp.ret?(t.is_fail=!1,
l(4,t)):10039==t.base_resp.ret||76==t.base_resp.ret?l(8,t):(t.is_fail=!0,l(4,t));
}
}));
}),$(".js_cancel",s).click(function(){
c.tooltip.hide(),r.removeAll(),c.tooltip=null;
});
}
s.find(".js_price").text(o.price/100),s.find(".js_quantity").text(o.quantity),s.find(".js_freecoin").text(o.free_coin/100),
s.find(".js_paycoin").text(o.pay_coin/100);
}else if(3==i||9==i){
n||$(".js_close_quantity",s).click(function(){
r.removeAll();
});
var w=o.addquantity;
s.find(".js_quantity").text(w),$(t.container).data("isswipe")||a.suc("设置库存成功"),setTimeout(function(){
3==i&&r.removeAll();
},1500),t.quantityChange&&t.quantityChange.call(c,_,w);
}else 4==i||7==i||8==i?(n||$(".js_close_quantity",s).click(function(){
r.removeAll();
}),8==i&&$(".js_quantity_exceed_msg h4",s).text(t.max_sku_for_eachcard>0?" 子商户每张券累计只可发放%s份 ".sprintf(t.max_sku_for_eachcard):" 账号违规，不能改动库存，详请查看通知中心 ")):5==i?n||$(".js_go_activate",s).click(function(){
r.removeAll(),location.href=wx.url("/merchant/cardstat?action=overviewpage");
}):6==i&&e.get({
url:"/merchant/cardmoneymgr?action=check_is_card_money_acct_open"
},function(t){
0==t.base_resp.ret?l(1==t.is_acct_open?0:5):e.handleRet(t,{
id:64463,
key:25,
url:"/merchant/cardmoneymgr?action=check_is_card_money_acct_open"
});
});
s.attr("isinit",1);
}
var d,_=$(this).data("cid");
if(t.before&&t.before(_)===!1)return!1;
var u=t.data;
if(t.cache_card&&(u=t.cache_card[_]),u.is_sns_card&&3!=u.status&&5!=u.status&&6!=u.status)return a.err("审核中的朋友的券无法修改库存"),
!1;
if(u.is_sns_card){
if(c.tooltip=new n({
container:this,
content:o({
setquantity:t.setquantity,
data:u
}),
container_mode:t.mode||"absolute",
reposition:!0,
type:"click",
onclose:function(t){
if(t){
for(var e=this.$dom.get(0),a=t.target,i=!1;a&&a!==document.body;){
if(a==e){
i=!0;
break;
}
a=a.parentNode;
}
i?this.show():this.hide();
}
}
}),l(6),c.tooltip.show(),r.removeAll(),r.add(c.tooltip),$(".popover").css({
"z-index":"10000",
width:"326px"
}),"fixed"==t.mode){
var m=parseInt(c.tooltip.$dom.css("top"))||0;
c.tooltip.$dom.css("top",m-($(document.body).scrollTop()||0));
}
s.stopPropagation();
}else{
var p=new n({
container:this,
content:o({
setquantity:t.setquantity,
data:u
}),
container_mode:t.mode||"absolute",
type:"click",
reposition:!0,
onclose:function(t){
if(t){
for(var e=this.$dom.get(0),a=t.target,i=!1;a&&a!==document.body;){
if(a==e){
i=!0;
break;
}
a=a.parentNode;
}
i?this.show():this.hide();
}
},
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
var o=p.$dom,s=o.find(".js_value"),n=parseInt($.trim(s.val()));
if(isNaN(n)||0>=n)return a.err("库存必须是不能小于1的整数"),!1;
var l=1e9;
return n>=l?(a.err("库存不能大于10亿"),s.focus(),!1):void e.post({
url:"/merchant/electroniccardmgr",
data:{
action:t.setquantity?"modifyquantity":"setquantity",
card_id:_,
value:n,
isadd:d.value()
}
},function(o){
if(0==o.base_resp.ret)$(t.container).data("isswipe")||a.suc("设置库存成功"),r.removeAll(),
t.quantityChange&&t.quantityChange.call(c,_,!t.setquantity||d.value()?n:-n);else if(10039==o.base_resp.ret||76==o.base_resp.ret){
var s=$.parseJSON(o.biz_quota_json),l=i.parse_assistsend_quota(s.quota_list);
a.err(l.max_sku>0?"子商户每张券累计只可发放%s份".sprintf(l.max_sku):"账号违规，不能改动库存，详请查看通知中心");
}else 1e4==o.base_resp.ret?a.err("库存不能小于0"):e.show(o);
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
r.removeAll();
}
}]
});
if(p.show(),r.removeAll(),r.add(p),$(".popover").css({
"z-index":"10000",
width:"326px"
}),d=p.$dom.find(".js_quantity_type").checkbox(),p.$dom.find(".js_value").focus(),
"fixed"==t.mode){
var m=parseInt(p.$dom.css("top"))||0;
p.$dom.css("top",m-($(document.documentElement||document.body).scrollTop()||0));
}
s.stopPropagation();
}
window.report_click_ele&&window.report_click_ele(this);
});
};
return c;
});