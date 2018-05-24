define("cardticket/friend_card_add.js",["biz_web/ui/checkbox.js","common/wx/top.js","cardticket/common_template_helper.js","cardticket/topmenu.js","cardticket/add/business_service.js","cardticket/add/discount_time.js","cardticket/add/section_mgr.js","cardticket/add/step_mgr.js","cardticket/add/color.js","cardticket/add/validtime.js","cardticket/add/consume_share.js","cardticket/add/use_condition.js","cardticket/add/dispose_method.js","cardticket/add/msg_operate.js","cardticket/add/nearby.js","cardticket/add/shop.js","cardticket/add/share_type.js","cardticket/add/config_url.js","cardticket/add/card_desc.js","cardticket/add/preview.js","cardticket/add/disabled_field.js","cardticket/add/submit.js","cardticket/add/maxlength.js","cardticket/add/editor_collapse.js","common/wx/tooltips.js","cardticket/add/logo.js","cardticket/add/init.js","cardticket/common_init.js","cardticket/affix.js"],function(a){
"use strict";
function t(t){
function s(){
L.is_max()?$("#js_add_config_url").addClass("btn_disabled"):$("#js_add_config_url").removeClass("btn_disabled");
}
t&&(d.data=t),d.data.consume_validate_code=d.consume_validate_code,d.data._can_use_self_consume=!0,
d.data._can_use_paycard_apply=10==d.data.type||2==d.data.type||4==d.data.type,d.data._can_use_swipe_card=window.is_can_use_swipe_card_consume&&4==d.data.type&&d.data.has_condition,
d.data._is_global_editting=d.is_global_editting,d.data._support_can_use_with_membercard=2==d.data.type||4==d.data.type,
d.data.has_condition||$(".js_type_tips"+d.data.type).show();
var i=e.parse_assistsend_quota(wx.cgiData.quota.quota_list);
d.data.time_type=1;
var _=a("cardticket/add/business_service.js"),n=a("cardticket/add/discount_time.js");
$("#js_edit_area").html(template.render("js_edit_tpl1",{
data:d.data,
is_can_use_help_make_and_send:window.wx_is_can_use_help_make_and_send&&!wx.cgiData.ispay&&!d.is_global_editting
})),$("#js_edit_area2").html(template.render("js_edit_tpl2",{
data:d.data,
is_can_use_help_make_and_send:window.wx_is_can_use_help_make_and_send&&!wx.cgiData.ispay&&!d.is_global_editting,
consume_validate_code:d.consume_validate_code
})),$("#js_preview_area").html(template.render("js_preview_tpl",{
data:d.data
})),$("#js_reduce_cost").keyup(function(){
var a=$(this).val();
$("#js_title_preview").text(a?"%s元代金券".sprintf(a):"");
});
var r=a("cardticket/add/section_mgr.js"),o=new r,j=a("cardticket/add/step_mgr.js"),m=new j({
container:"#js_add_step_head",
contents:".js_tab_content"
}),p=a("cardticket/add/color.js"),u=(new p({
data:d.data
}),a("cardticket/add/validtime.js")),k=(u({
data:d.data,
sectionmgr:o
}),new n({
container:"#js_discount_time",
data:d.data,
is_sns_card:wx.cgiData.is_friend_card
})),l=new _({
container:"#js_business_service",
data:d.data
}),w=a("cardticket/add/consume_share.js"),h=(new w({
container:"#js_consume_share_self_num",
data:d.data
}),a("cardticket/add/use_condition.js")),b=new h({
container:"#js_use_condition",
data:d.data
}),g=a("cardticket/add/dispose_method.js"),v=new g({
data:d.data
}),f=a("cardticket/add/msg_operate.js"),x=new f({
data:d.data,
sectionmgr:o,
biz:wx.cgiData.biz,
is_sns_card:!0
}),y=a("cardticket/add/nearby.js"),D=(new y({
data:d.data
}),a("cardticket/add/shop.js")),z=new D({
data:d.data
}),q=a("cardticket/add/share_type.js"),C=(new q({
data:d.data
}),a("cardticket/add/config_url.js")),L=new C({
data:d.data,
container:"#js_config_url_p",
onchanged:function(){
s();
},
can_merchant:d.can_merchant,
biz:d.biz,
max:1
});
s();
var I=a("cardticket/add/card_desc.js"),M=new I({
uploadDom:"#js_upload_cover",
data:d.data,
is_sns_card:1
}),S=a("cardticket/add/preview.js");
new S({
data:d.data
});
var T=a("cardticket/add/disabled_field.js");
new T({
data:d.data
});
var A=a("cardticket/add/submit.js");
new A({
data:d.data,
max_sku:i.max_sku,
max_card:i.max_card,
sectionmgr:o,
msg_operate:x,
config_url:L,
mod_shop:z,
stepmgr:m,
discountTime:k,
cardDesc:M,
businessService:l,
useCondition:b,
disposeMethod:v
}),window.onbeforeunload=function(){
return"确定不提交卡券，离开此页？";
};
var B=a("cardticket/add/maxlength.js");
B();
var E=a("cardticket/add/editor_collapse.js");
E();
{
var F=($("#js_friend_desc_tips input[type=checkbox]").checkbox({
onChanged:function(a){
var t=parseInt($("#js_uncheckcount").val());
t+=$(a).prop("checked")?-1:1,0>t&&(t=0),t>0||$("#js_friend_desc_tips .js_description_tips").hide(),
$("#js_uncheckcount").val(t),"can_use_with_other_discount"==$(a).attr("data-name")&&($(a).prop("checked")?$(".js_can_use_with_member_container").show():$(".js_can_use_with_member_container").hide());
}
}),a("common/wx/tooltips.js"));
new F({
container:$(".js_freq_err_tips"),
reposition:!0,
content:"常见审核不通过原因：<br>1. 要求最低消费才可抵用<br>2. 限定仅能用于场内某些品类、品牌 、类型的商品/服务<br>3. 不能与店内其他优惠同享 <br>4. 适用门店是其他合作商户经营，不属于该公众号商户<br>5. 券所兑换的商品/服务由合作商户提供，不由本公众号直接提供",
type:"hover"
});
}
c.initLogo({
data:d.data,
max_card:i.max_card
});
}
var d=wx.cgiData,e=(a("biz_web/ui/checkbox.js"),a("common/wx/top.js"),a("cardticket/common_template_helper.js"));
a("cardticket/topmenu.js").selected("cardmgr");
var c=a("cardticket/add/logo.js");
if(!c.checkLogo({
data:d.data
}))return!1;
e.check_assist_brand_name_type();
var s=a("cardticket/add/init.js");
s({
init:t,
cardid:d.cardid
}),a("cardticket/common_init.js"),a("cardticket/affix.js");
});