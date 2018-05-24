define("cardticket/add.js",["common/wx/top.js","cardticket/common_template_helper.js","cardticket/topmenu.js","cardticket/add/business_service.js","cardticket/add/discount_time.js","cardticket/add/section_mgr.js","cardticket/add/step_mgr.js","cardticket/add/color.js","cardticket/add/validtime.js","cardticket/add/use_condition.js","cardticket/add/dispose_method.js","cardticket/add/card_desc.js","cardticket/add/msg_operate.js","cardticket/add/nearby.js","cardticket/add/shop.js","cardticket/add/share_type.js","cardticket/add/config_url.js","cardticket/add/preview.js","cardticket/add/disabled_field.js","cardticket/add/submit.js","cardticket/add/maxlength.js","cardticket/add/editor_collapse.js","cardticket/add/logo.js","cardticket/add/init.js","cardticket/common_init.js","cardticket/affix.js"],function(a){
"use strict";
function d(d){
function e(){
C.is_max()?$("#js_add_config_url").addClass("btn_disabled"):$("#js_add_config_url").removeClass("btn_disabled");
}
d&&(t.data=d),t.data.consume_validate_code=t.consume_validate_code,t.data._can_use_self_consume=!wx.cgiData.is_friend_card&&10!=t.data.type,
t.data._can_use_paycard_apply=10==t.data.type||2==t.data.type||4==t.data.type,t.data._is_global_editting=t.is_global_editting,
t.data._support_can_use_with_membercard=2==t.data.type||4==t.data.type,t.data._can_use_swipe_card=window.is_can_use_swipe_card_consume&&4==t.data.type&&t.data.has_condition;
var s=a("cardticket/add/business_service.js"),_=a("cardticket/add/discount_time.js");
$("#js_edit_area").html(template.render("js_edit_tpl1",{
data:t.data,
is_can_use_help_make_and_send:window.wx_is_can_use_help_make_and_send&&!wx.cgiData.ispay&&!t.is_global_editting
})),$("#js_edit_area2").html(template.render("js_edit_tpl2",{
data:t.data,
is_can_use_help_make_and_send:window.wx_is_can_use_help_make_and_send&&!wx.cgiData.ispay&&!t.is_global_editting,
consume_validate_code:t.consume_validate_code
})),$("#js_preview_area").html(template.render("js_preview_tpl",{
data:t.data
}));
var r=a("cardticket/add/section_mgr.js"),n=new r,o=a("cardticket/add/step_mgr.js"),m=new o({
container:"#js_add_step_head",
contents:".js_tab_content"
}),j=a("cardticket/add/color.js"),l=(new j({
data:t.data
}),a("cardticket/add/validtime.js")),p=(l({
data:t.data,
sectionmgr:n
}),a("cardticket/add/use_condition.js")),k=(new p({
container:"#js_use_condition",
data:t.data
}),a("cardticket/add/dispose_method.js")),u=new k({
data:t.data
}),w=new _({
container:"#js_discount_time",
data:t.data
}),g=new s({
container:"#js_business_service",
data:t.data
}),h=a("cardticket/add/card_desc.js"),v=new h({
uploadDom:"#js_upload_cover",
data:t.data
}),b=a("cardticket/add/msg_operate.js"),f=new b({
data:t.data,
sectionmgr:n,
biz:wx.cgiData.biz
}),x=a("cardticket/add/nearby.js"),y=(new x({
data:t.data
}),a("cardticket/add/shop.js")),D=new y({
data:t.data
}),q=a("cardticket/add/share_type.js"),z=(new q({
data:t.data
}),a("cardticket/add/config_url.js")),C=new z({
data:t.data,
container:"#js_config_url_p",
onchanged:function(){
e();
},
can_merchant:t.can_merchant,
biz:t.biz,
max:1
});
e();
var L=a("cardticket/add/preview.js");
new L({
data:t.data
});
var M=a("cardticket/add/disabled_field.js");
new M({
data:t.data
});
var S=a("cardticket/add/submit.js");
new S({
data:t.data,
max_sku:c.max_sku,
max_card:c.max_card,
sectionmgr:n,
msg_operate:f,
config_url:C,
mod_shop:D,
stepmgr:m,
discountTime:w,
cardDesc:v,
businessService:g,
disposeMethod:u
}),window.onbeforeunload=function(){
return"确定不提交卡券，离开此页？";
};
var T=a("cardticket/add/maxlength.js");
T();
var A=a("cardticket/add/editor_collapse.js");
A(),i.initLogo({
data:t.data,
max_card:c.max_card
});
}
var t=wx.cgiData,e=(a("common/wx/top.js"),a("cardticket/common_template_helper.js"));
a("cardticket/topmenu.js").selected("cardmgr");
var c=e.parse_assistsend_quota(wx.cgiData.quota.quota_list),i=(e.parse_assistsend_quota(wx.cgiData.quota.quota_list,"self_create_card"),
a("cardticket/add/logo.js"));
if(!i.checkLogo({
data:t.data
}))return!1;
var s=a("cardticket/add/init.js");
s({
init:d,
cardid:t.cardid,
data:t.data
}),a("cardticket/common_init.js"),a("cardticket/affix.js");
});