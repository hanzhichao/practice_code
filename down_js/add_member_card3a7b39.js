define("entityshop/add_member_card.js",["biz_web/ui/checkbox.js","cardticket/send_card.js","common/wx/dialog.js"],function(e){
"use strict";
function a(){
if(wx.cgiData.can_use_card)r();else{
var e=d.show({
type:"info",
title:"提示",
msg:"未开通卡券功能，先申请卡券权限并配置",
mask:!0,
buttons:[{
text:"开通",
type:"primary",
click:function(){
location.href=wx.url("https://mp.weixin.qq.com/merchant/cardapply?action=listintro"),
this.hide();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
e.dom.find(".page_msg").css("margin-top",0);
}
}
function t(e){
$("#js_member_card_bt").click(function(){
a(e);
}),e&&e.card_id?($("#js_member_card_show").show().html(template.render("card_tpl",e)),
$("#js_member_card_show").data("card_id",e.card_id),$("#js_member_card_bt").hide()):($("#js_member_card_bt").show(),
$("#js_member_card_show").hide()),$("#js_member_card_show").on("click",".js_updatecard",function(){
a(e);
}),$("#js_member_card_show").on("click",".js_delete_card",function(){
$("#js_member_card_show").data("card_id",""),$("#js_member_card_show").html("").hide(),
$("#js_member_card_bt").show();
});
}
function r(){
_=new c({
no_filter:!0,
removeOnHide:!1,
multi:!1,
data:null,
sns_card_type:0,
tips_wording:'门店小程序可发放会员卡、买单券和支付代金券 <a href="https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1494312475&version=1&lang=zh_CN&platform=2" target="_blank">查看详情</a>',
param:{
is_filter_out_apicard:1,
only_need_member_card:1
},
defaultValues:$("#js_member_card_show").data("card_id")?[$("#js_member_card_show").data("card_id")]:[],
selectComplete:function(e){
$("#js_member_card_show").show().html(template.render("card_tpl",e)),$("#js_member_card_show").data("card_id",e.id),
$("#js_member_card_bt").hide();
},
onHide:function(){}
}),_.show();
}
var _,c=(e("biz_web/ui/checkbox.js"),e("cardticket/send_card.js")),d=e("common/wx/dialog.js");
return{
init:t
};
});