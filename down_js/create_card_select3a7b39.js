define("cardticket/create_card_select.js",["biz_web/ui/checkbox.js","common/wx/Tips.js","common/wx/popup.js","common/wx/dialog.js","cardticket/select_sub_merchant_table.js","cardticket/common_template_helper.js","tpl/cardticket/choose_card_type.html.js","common/wx/Step.js"],function(e){
"use strict";
function t(e){
return 1==window.view_mode&&(1==c||2==c)||2==window.view_mode&&e&&h.can_category_use_sns_card(e.PrimaryCategoryId,e.SecondaryCategoryId);
}
function i(e,t){
var i=$(e.step2container).html(f({
flag:e.ispay,
is_sns_card:e.is_sns_card,
show_all_card:e.show_all_card,
view_mode:window.view_mode
})),n=$(".frm_tab").height();
$(".js_is_friend_type_1 .js_card_type",i).checkbox({
onChanged:function(e){
t.card_type1=$(e).val();
var s=$(e).attr("data-not_has_condition");
t.has_condition=1==s?!1:!0;
var o=$(".frm_tab .selected",i).index(),_=0-o*n;
$(".tab_items",i).css("top",_);
}
}),$(".js_is_friend_type_2 .js_card_type",i).checkbox({
onChanged:function(e){
t.card_type2=$(e).val();
var i=$(e).attr("data-not_has_condition");
t.has_condition=1==i?!1:!0;
}
}),i.find(".js_is_friend").checkbox({
onChanged:function(e){
$(".js_is_friend_type",i).hide(),$(".js_is_friend_type_"+$(e).val(),i).show(),1==$(e).val()?(t.is_friend=!0,
setTimeout(function(){
n=$(".frm_tab",i).height();
var e=$(".js_is_friend_type_1 .frm_radio_label",i).length;
$(".choose_card_type,.frm_tab_item",i).css("height",n),$(".tab_items",i).css("height",n*e);
})):t.is_friend=!1,$(".js_is_friend_type_"+$(e).val(),i).find(".js_card_type:checked").click(),
t.$popup.popup("resetPosition");
}
}),"undefined"!=typeof c&&_(e,t,i);
}
function n(e,i){
var n=$(m()).popup({
title:"创建优惠券",
autoShow:!1,
width:956,
buttons:[{
text:"取消",
type:"default",
click:function(){
this.hide();
}
},{
text:"下一步",
type:"primary",
click:function(){
var e=i.merchantSelector.selectedValue();
e&&(i.merchant_data=e,o(i));
}
},{
text:"上一步",
type:"default",
click:function(){
s(i);
}
},{
text:"确定",
type:"primary",
click:function(){
return i.is_friend&&"undefined"==typeof c?!0:(i.is_friend&&!t(i.merchant_data)&&(p.show({
msg:'本公众号子商户类目不支持制作朋友的券|<a href="https://mp.weixin.qq.com/cgi-bin/readtemplate?t=cardticket/faq_tmpl&type=info&lang=zh_CN#1dot1" target="_blank">查看朋友的券类目开放范围</a>',
type:"info",
buttons:[{
text:"取消",
click:function(e){
this.remove(e);
},
type:"normal"
},{
text:"配置子商户",
click:function(e){
window.open(wx.url("/merchant/cardhelpmakesend?action=list")),this.remove(e);
},
type:"primary"
}]
}),this.hide()),i.is_friend&&i.card_type1||!i.is_friend&&i.card_type2?(window.open(wx.url("/merchant/electroniccardmgr?action=%s&type=%s&flag=%s&is_sns_card=%s&has_condition=%s%s".sprintf(i.is_friend?"addsnspage":"addpage",i.is_friend?i.card_type1:i.card_type2,1==e.ispay?1:"0",i.is_friend?1:"0",i.has_condition?1:"0",i.merchant_data?"&sub_merchant_id="+i.merchant_data.Id:""))),
void this.hide()):void d.err("请选择卡券类型"));
}
}],
onHide:function(){
e.onHide&&e.onHide.call(i),this.remove();
},
className:"align_edge"
});
i.$popup=n,i.step=new l({
container:n.find(".js_step_container"),
names:["1 选择代制的子商户","2 选择券类型"]
}),i.$popup.popup("show");
var _=n.popup("get").find(".js_step_content");
i.opt.step2container=_[1],i.opt.container=$(_[0]).find(".js_sub_merchant_list");
}
function s(e){
var t=e.$popup,i=t.popup("get").find(".js_step_content"),n=t.popup("get").find(".js_btn_p");
$(n[0]).show(),$(n[1]).show(),$(n[2]).hide(),$(n[3]).hide(),e.step.go(1),$(i[0]).show(),
$(i[1]).hide(),t.popup("resetPosition");
}
function o(e){
var t=e.$popup,n=t.popup("get").find(".js_step_content"),s=t.popup("get").find(".js_btn_p");
$(s[0]).hide(),$(s[1]).hide(),$(s[2]).show(),$(s[3]).show(),$(n[0]).hide(),$(n[1]).show(),
e.step.go(2),e.opt.merchant_data=e.merchant_data,i(e.opt,e),t.popup("resetPosition");
}
function _(e,i,n){
$(".js_is_friend_tips",n).hide(),!t(i.merchant_data)&&e.show_all_card?($(n.find(".js_is_friend")[1]).click(),
$(n.find(".js_is_friend")[0]).checkbox().disabled(!0),$(".js_is_friend_view_mode"+(window.view_mode||1)+"_tips",n).show()):($(n.find(".js_is_friend")[0]).checkbox().disabled(!1),
$(n.find(".js_is_friend")[0]).click(),$(".js_is_friend_support_tips",n).show());
}
function a(e){
var t=this;
this.opt=e,n(e,t);
var i=t.$popup.popup("get");
if(1==window.view_mode){
o(t);
var i=t.$popup.popup("get");
i.find(".js_step_container").hide();
var a=i.find(".js_btn_p");
$(a[2]).hide();
}else s(t);
var d={
resetPosition:function(){
t.$popup.popup("resetPosition");
},
getDataComplete:function(e){
var i=t.$popup.popup("get");
e&&e.length?$(i.find(".js_btn_p")[0]).removeClass("btn_disabled"):$(i.find(".js_btn_p")[0]).addClass("btn_disabled");
},
container:e.container,
is_sns_card:!1,
max_card:e.max_card
};
t.merchantSelector=new r(d),"undefined"==typeof c&&h.check_assist_brand_name_type(function(n){
c=n,_(e,t,i);
});
}
var c,d=(e("biz_web/ui/checkbox.js"),e("common/wx/Tips.js")),p=(e("common/wx/popup.js"),
e("common/wx/dialog.js")),r=e("cardticket/select_sub_merchant_table.js"),h=e("cardticket/common_template_helper.js"),f=template.compile(e("tpl/cardticket/choose_card_type.html.js")),m=template.compile('<div>			<div class="wrp_processor js_step_container"></div>			<div class="first_step js_step_content js_step1">				<div class="js_sub_merchant_list select_subshop"></div>			</div>			<div class="second_step js_step_content js_step2"></div>			</div>'),l=e("common/wx/Step.js");
return window.view_mode||(window.view_mode=1),a;
});