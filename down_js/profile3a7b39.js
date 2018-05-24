define("cardticket/profile.js",["common/wx/dialog.js","common/wx/popup.js","common/wx/Tips.js","common/wx/Cgi.js","cardticket/common_template_helper.js","cardticket/topmenu.js","cardticket/common_init.js","cardticket/apply_cardpay.js","cardticket/fee_account_activate.js"],function(a){
"use strict";
var t=a("common/wx/dialog.js"),e=(a("common/wx/popup.js"),a("common/wx/Tips.js")),c=a("common/wx/Cgi.js");
a("cardticket/common_template_helper.js");
$("#js_paycard_open").click(function(){
var a=$(this).attr("data-action"),e=$(this).attr("data-can");
if(0==e){
var c=[{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}];
t.show({
title:"提示",
type:"info",
msg:template.render("js_"+a),
buttons:c
});
}else window.open(wx.url("/merchant/paymentcardapply?action=check&t=cardticket/info"));
}),$("#js_money_quota_permonth").text(parseInt(wx.cgiData.money_quota_permonth/1e4/100)),
1!=wx.cgiData.from&&a("cardticket/topmenu.js").selected("overviewpage"),a("cardticket/common_init.js");
for(var o=!1,r=[],n=wx.cgiData.category_info.primary_category,i=wx.cgiData.info.merchant_info,_=!1,s=0;s<n.length;s++){
if(n[s].primary_category_id==i.primary_category_id)for(var p=n[s].secondary_category,d=0;d<p.length;d++)if(p[d].secondary_category_id==i.secondary_category_id){
i.primary_category_str=n[s].category_name,i.secondary_category_str=p[d].category_name,
r=p[d].need_qualification_stuffs,_=p[d].is_open_for_member_card,o=!0;
break;
}
if(o)break;
}
var m=+new Date/1e3,l=!1;
l=i.next_modify_time&&i.next_modify_time>m?!1:!0;
var y={
stuffs:r,
category:(i.primary_category_str||"")+" "+(i.secondary_category_str||""),
can_modify:l,
next_modify_time:i.next_modify_time
};
$.extend(!0,y,wx.cgiData.info.qualification_stuff),$("#js_merchant_info").html(template.render("js_merchant_info_tpl",{
data:y,
card_pay_mch_id:window.card_pay_mch_id
}));
var f=$("#js_logo").attr("data-src");
if($("#js_logo").attr("src",(f+"").http2https()),1!=wx.cgiData.from){
var u=a("cardticket/apply_cardpay.js");
u({
apply_dom:"#js_apply_cardpay",
is_wxpay_open:wx.cgiData.is_wxpay_open
});
}
var h=!1;
$(".js_apply_assistsend_card").click(function(){
var a=$(this).attr("data-mode"),t=$(this).attr("data-open");
$(template.render("js_apply_assistsend_tpl",{
mode:a,
brand_name:window.merchant_brand_name
})).popup({
title:"切换模式",
buttons:[{
text:"确定",
type:"primary",
click:function(){
h||(h=!0,"0"==t?c.post({
url:"/merchant/cardapply",
data:{
action:"apply_help_make_and_send"
},
complete:function(){
h=!1;
}
},function(t){
0==t.base_resp.ret?c.post({
url:"/merchant/cardapply",
data:{
action:"switch_view_mode",
view_mode:a
},
complete:function(){
h=!1;
}
},function(a){
0==a.base_resp.ret?(e.suc("已升级到代制模式"),location.reload()):c.handleRet(a,{
id:64463,
key:25,
url:"/merchant/cardapply?action=apply_help_make_and_send"
});
}):c.show(t);
}):c.post({
url:"/merchant/cardapply",
data:{
action:"switch_view_mode",
view_mode:a
},
complete:function(){
h=!1;
}
},function(t){
0==t.base_resp.ret?(e.suc(1==a?"已切换到自制模式":"已切换到代制模式"),location.reload()):c.handleRet(t,{
id:64463,
key:25,
url:"/merchant/cardapply?action=switch_view_mode"
});
}));
}
},{
text:"取消",
click:function(){
this.hide();
}
}],
autoShow:!0,
onHide:function(){
h=!1,this.remove();
}
}),$("#js_agree_apply_assistsend").checkbox();
}),$(".js_membercard_open").click(function(){
c.post({
url:"/merchant/cardapply",
data:{
action:"apply_membercard"
}
},function(a){
0==a.base_resp.ret?(e.suc("已开通"),location.reload()):c.handleRet(a,{
id:64463,
key:26,
url:"/merchant/cardapply?action=apply_membercard"
});
});
});
var w=a("cardticket/fee_account_activate.js");
new w({
container:"#js_activate_fee_acct",
success:function(a){
location.href=wx.url("/merchant/cardmoneymgr?action=get_order_flow&reward="+a);
}
});
});