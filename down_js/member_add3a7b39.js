define("cardticket/member_add.js",["common/wx/Cgi.js","cardticket/parse_data.js","cardticket/common_template_helper.js","cardticket/topmenu.js","cardticket/add/business_service.js","cardticket/add/discount_time.js","cardticket/add/section_mgr.js","cardticket/add/step_mgr.js","cardticket/add/color.js","cardticket/add/dispose_method.js","cardticket/add/card_desc.js","cardticket/add/msg_operate.js","cardticket/add/shop.js","cardticket/add/share_type.js","cardticket/add/member_active.js","cardticket/add/member_detail.js","cardticket/add/member_time.js","cardticket/add/config_url.js","cardticket/add/preview.js","cardticket/add/submit.js","cardticket/add/maxlength.js","cardticket/add/editor_collapse.js","cardticket/add/logo.js","cardticket/common_init.js","cardticket/affix.js"],function(a){
"use strict";
function t(){
function t(){
R.is_max()?$("#js_add_config_url").addClass("btn_disabled"):$("#js_add_config_url").removeClass("btn_disabled");
}
e.data&&"MEMBER_CARD"===e.data.card_type&&(e.data=c.parse_cardticket(e.data)),e.data.brand_name=e.brand_name,
e.data.logo_url=e.logo,e.data.MEMBER_TYPE=e.MEMBER_TYPE,e.data._can_use_self_consume=!1,
e.data._can_use_paycard_apply=10==e.data.type||2==e.data.type||4==e.data.type,e.data._is_global_editting=!!e.data.id;
var d=a("cardticket/add/business_service.js"),r=a("cardticket/add/discount_time.js");
$("#js_edit_area").html(template.render("js_edit_tpl1",{
data:e.data
})),$("#js_edit_area2").html(template.render("js_edit_tpl2",{
data:e.data
})),$("#js_preview_area").html(template.render("js_preview_tpl",{
data:e.data
}));
var i=a("cardticket/add/section_mgr.js"),s=new i({
is_mem:!0
}),n=a("cardticket/add/step_mgr.js"),_=new n({
container:"#js_add_step_head",
contents:".js_tab_content",
isMem:!0
}),o=a("cardticket/add/color.js"),m=(new o({
data:e.data
}),a("cardticket/add/dispose_method.js")),j=new m({
data:e.data
}),l=new r({
container:"#js_discount_time",
data:e.data
}),k=new d({
container:"#js_business_service",
data:e.data
}),p=a("cardticket/add/card_desc.js"),u=new p({
uploadDom:"#js_upload_cover",
data:e.data
}),g=a("cardticket/add/msg_operate.js"),w=new g({
data:e.data,
sectionmgr:s,
biz:wx.cgiData._biz
}),b=a("cardticket/add/shop.js"),h=new b({
data:e.data
}),f=a("cardticket/add/share_type.js"),v=(new f({
data:e.data
}),a("cardticket/add/member_active.js")),y=new v({
data:e.data,
container:"#js_active_container",
selectComplete:function(){}
});
1==e.data.create_source?($("#js_select_keywords").hide(),$(".js_create_source_1").show()):$("#js_select_keywords").click(function(){
return y.show(),!1;
});
var x=e.data.status,E=3==x||5==x||6==x||8==x,M=a("cardticket/add/member_detail.js"),C=(new M({
data:e.data
}),a("cardticket/add/member_time.js")),D=(new C({
data:e.data,
is_edit:E
}),a("cardticket/add/config_url.js")),R=new D({
data:e.data,
container:"#js_config_url_p",
onchanged:function(){
t();
},
can_merchant:e.can_merchant,
biz:e._biz,
max:3
});
t();
var z=a("cardticket/add/preview.js");
new z({
data:e.data
});
var B=a("cardticket/add/submit.js");
new B({
sectionmgr:s,
mod_shop:h,
member_active:y,
config_url:R,
data:e.data,
msg_operate:w,
stepmgr:_,
discountTime:l,
cardDesc:u,
businessService:k,
disposeMethod:j
}),window.onbeforeunload=function(){
return"确定不提交会员卡，离开此页？";
};
var T=a("cardticket/add/maxlength.js");
T();
var P=a("cardticket/add/editor_collapse.js");
P();
}
var e=wx.cgiData,d=a("common/wx/Cgi.js"),c=a("cardticket/parse_data.js");
a("cardticket/common_template_helper.js"),a("cardticket/topmenu.js").selected("cardmgr_member");
var r=a("cardticket/add/logo.js");
return r.checkLogo({
data:e.data
})?(e.cardid?d.get({
url:"/merchant/electroniccardmgr?action=get&card_id=%s".sprintf(e.cardid),
error:function(){}
},function(a){
if(0==a.base_resp.ret){
var r=$.parseJSON(a.card_detail);
r=c.parse_cardticket(r),e.data=r,t();
}else d.handleRet(a,{
id:64463,
key:31,
url:"/merchant/electroniccardmgr?action=get"
});
}):(e.card_not_found=!0,t()),a("cardticket/common_init.js"),void a("cardticket/affix.js")):!1;
});