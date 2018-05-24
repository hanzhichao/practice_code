define("cardticket/add/shop.js",["common/wx/pagebar.js","biz_web/ui/checkbox.js","common/wx/dialog.js","common/qq/events.js","cardticket/select_shop_popup.js","tpl/cardticket/create_card_shop_tips.html.js"],function(e){
"use strict";
function s(s){
function o(){
w.length?$("#js_shop_table").show():$("#js_shop_table").hide();
}
function _(e,o){
for(var n=[],_=0;_<w.length;_++)n.push(w[_].id);
r.shop_select=new y({
autoShow:"undefined"!=typeof o?o:!0,
multi:!0,
pageCapacity:5,
selectedValues:n,
help_top:-15,
nostore:!1,
show_pay:2==s.data.type||4==s.data.type||10==s.data.type,
audit_state:"2|3",
selectComplete:function(e){
k=1,p(e);
},
initComplete:function(){
j=this.getCacheData();
for(var e=x,s=[],o=0;o<e.length;o++)j[e[o]]&&s.push(j[e[o]]);
g&&(p(s),t(r),g=!1);
},
data:e
});
}
function p(e){
function s(){
for(var t=[],o=(k-1)*C,n=k*C,_=o;_<e.length&&n>_;_++)t.push(e[_]);
if(v.html(template.render("js_add_shop_tpl",{
shop_data:t
})),e.length>C){
new a({
container:"#js_shop_pager",
perPage:C,
initShowPage:k,
totalItemsNum:e.length,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
k=e.currentPage,s();
}
});
}else $("#js_shop_pager").html("");
}
e||(e=w);
for(var t=[],n=0;n<e.length;n++)t.push(e[n].wx_poi_uid);
w=e,x=t,b.val(t.join("|")),r.current_shop=w,s(),o(),c(!0);
}
function c(){
for(var e=(d.val(),r.shop_select.getData()),s=!1,t=0,o=0;o<e.length;o++)e[o].card_pay_money&&(s=!0,
t++);
r.has_store=s,r._wepay_shop_count=t,r._all_shop_count=e.length,r._shopinit=!0,h.trigger("shop:initComplete",s,e.length>0,e);
}
s=$.extend(!0,{
data:{}
},s);
{
var r=this,d=$("#js_hidden_shop_type"),l=$(".js_shop_type"),u=$("#js_hidden_noshop_reason"),m=$("#js_fix_shop").hide(),f=$("#js_nofix_shop").hide();
l.checkbox({
onChanged:function(e){
var s=e.val();
d.val(s),2==s||1==s?(m.show(),o(),$("#js_nearby").prop("checked")):($("#js_nearby_container").hide(),
m.hide(),$("#js_poi_pic_url").hide(),$("#js_near_tips").html(template.render("js_neartips_tpl",{}))),
3==s?f.show():f.hide(),(1==s||3==s)&&m.hide(),h.trigger("shop:type_change",s),t(r);
}
}),f.find(".js_noshop_type").checkbox({
onChanged:function(e){
var s=e.val();
switch(+s){
case 1:
u.val("网上经营，无需到店消费"),f.find(".js_noshop_sub").hide();
break;

case 2:
u.val("门店审核中"),f.find(".js_noshop_sub").hide();
break;

case 3:
f.find(".js_noshop_sub").show();
}
$("#js_hidden_noshop_reason_type").val(s);
}
});
}
f.find(".js_noshop_input").on("keyup propertychange",function(){
var e=$(this),s=e.val().trim(),t=s.bytes(),o=(t+t%2)/2,n=e.closest(".js_noshop_sub").find(".js_noshop_num");
n.text(o+"/50"),o>50?n.addClass("error"):(n.removeClass("error"),u.val(s));
});
var j={},w=[],g=!0;
2==s.data.shop_type?$(l[1]).click():3==s.data.shop_type?$(l[2]).click():1==s.data.shop_type;
var y=e("cardticket/select_shop_popup.js"),v=$("#js_shop_list"),b=$("#js_hidden_shop_id_list"),x=s.data.location_id_list||[],k=1,C=5;
_(null,!1),v.on("click",".js_delete_shop",function(){
var e=$(this).closest("tr"),s=e.data("id");
if(s){
e.remove();
for(var t=0;t<w.length;t++)if(w[t].wx_poi_uid==s||w[t].id==s){
w.splice(t,1),x.splice(t,1),w.length%C==0&&w.length==t&&k>1&&k--;
break;
}
p();
}
return!1;
}),$("#js_add_shop,#js_add_shop1").click(function(){
return _(),!1;
}),$("#js_change_consume_type").click(function(){
var e=$("#js_adv_dispose_method").offset().top;
return window.scrollTo(0,e),!1;
}),function(){
h.on("dispose_method:change",function(e){
$(".js_shop_nosupport_wepay").hide(),r.current_dispose_method=e;
}),h.on("submit:sub_merchant_change",function(e){
r.sub_merchant_id=e;
}),s.data._is_global_editting&&h.trigger("dispose_method:change",s.data.dispose_method),
r.current_dispose_method=s.data.dispose_method;
}(),r.$container=$("#js_add_shop_top_container").on("click",".js_add_shop1,.js_add_consumer",function(){
var e=$(this).hasClass("js_add_consumer"),s="",t=$(this).data("info");
return e?(window.open(wx.url("/merchant/carduse?action=listchecker")),s="配置完核销员后，请点刷新按钮，并选择带核销员的门店"):"access_deny"==t?(window.open(wx.url("/merchant/newentityshop?action=apply")),
s="开通完门店后，请点刷新按钮，并选择门店"):"from_wxapoi"==t?(window.open(wx.url("/merchant/newentityshop?action=list")),
s="新建完门店后，请点刷新按钮，并选择门店"):(window.open(wx.url("/merchant/entityshop?action=list")),
s="新建完门店后，请点刷新按钮，并选择门店"),i.show({
title:"提示",
msg:s,
buttons:[{
text:"刷新",
click:function(){
g=!0,_(null,!1),this.hide();
},
type:"primary"
}],
type:"info"
}),!1;
}).on("click",".js_reselect_shop",function(){
n(r.$container);
}),r.opt=s;
}
function t(e){
return e.shop_select?($(".js_shop_nosupport_wepay").hide(),o(e)):void 0;
}
function o(e){
if(e.shop_select){
var s=$("#js_hidden_shop_type"),t=e.current_shop,o=s.val(),n=e.shop_select.getData(),_=t.length;
if(n){
var a=0,i=0;
1==o?(a=n.length,_=n):3==o?_=[]:(a=t.length,_=t);
for(var p=0;p<_.length;p++)_[p].card_pay_money&&i++;
$("#js_hidden_card_pay_store").val(i);
var h=e.current_dispose_method;
$(".js_notall_consumer").hide(),$(".js_dispose_method_2_notall_consumer").hide(),
$(".js_dispose_method_1_notall_consumer").hide(),$(".js_notall_consumer_count").text(a-i),
1==h?a>i&&($(".js_dispose_method_1_notall_consumer").show(),$(".js_notall_consumer").show()):2==h&&a>i&&($(".js_dispose_method_2_notall_consumer").show(),
$(".js_notall_consumer").show()),e._selected_wepay_count=i,e._selected_shop_count=a;
}
}
}
function n(e){
var s=e.offset();
window.scrollTo(0,s.top);
}
function _(e){
return e.replace(/<!--.*?-->/gm,"");
}
var a=e("common/wx/pagebar.js"),i=(e("biz_web/ui/checkbox.js"),e("common/wx/dialog.js")),p=e("common/qq/events.js"),h=p(!0),c=e("tpl/cardticket/create_card_shop_tips.html.js");
return c=template.compile(c),s.prototype.validate=function(){
if(!this._shopinit)return!1;
t(this);
var e=c({
dispose_method:this.current_dispose_method,
selected_shop_count:this._selected_shop_count,
selected_wepay_shop_count:this._selected_wepay_count,
wepay_shop_count:this._wepay_shop_count,
all_shop_count:this._all_shop_count,
is_from_wxapoi:(wx.cgiData._store_data||{}).is_from_wxapoi,
access_deny:(wx.cgiData._store_data||{}).access_deny
});
return $(".js_shop_nosupport_wepay").html(e).show(),e=$.trim(e),e=_(e),e?n(this.$container):this.opt.data.is_sns_card&&0==this._all_shop_count&&($(".js_shop_nosupport_wepay").html("%s尚未新建门店，朋友的券必须添加门店，你可以：%s1. 去门店管理，%s新建门店%s".sprintf('<p class="fail">',"</p><p>",'<a href="javascript:void(0);" class="js_add_shop1">',"</a></p>")).show(),
$(".js_shop_nosupport_wepay").html("%s尚未选择门店，朋友的券必须添加门店，你可以：%s1. 选择“全部门店适用”%s2. 或选择“指定门店适用”并“添加适用门店”").sprintf('<p class="fail">',"</p><p>","</p><p></p>").show()),
!e;
},s;
});