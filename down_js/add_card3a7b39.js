define("entityshop/add_card.js",["biz_web/ui/checkbox.js","cardticket/send_card.js","common/wx/dialog.js"],function(a){
"use strict";
function e(){
if(wx.cgiData.can_use_card)c();else{
var a=i.show({
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
a.dom.find(".page_msg").css("margin-top",0);
}
}
function t(a){
$("#js_card1_bt").click(function(){
e(a);
}),a&&a.card_id?($("#card_area").show().html(template.render("card_tpl",a)),$("#card_area").data("card_id",a.card_id),
$("#js_card1_bt").hide()):($("#js_card1_bt").show(),$("#card_area").hide()),$("#card_area").on("click",".js_updatecard",function(){
e(a);
}),$("#card_area").on("click",".js_delete_card",function(){
$("#card_area").data("card_id",""),$("#card_area").html("").hide(),$("#js_card1_bt").show();
});
}
function c(){
d=new r({
no_filter:!0,
removeOnHide:!1,
multi:!1,
data:null,
sns_card_type:0,
tips_wording:'门店小程序可发放会员卡、买单券和支付代金券 <a href="https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1494312475&version=1&lang=zh_CN&platform=2" target="_blank">查看详情</a>',
param:{
is_filter_out_apicard:1,
need_member_card:0
},
defaultValues:$("#card_area").data("card_id")?[$("#card_area").data("card_id")]:[],
selectComplete:function(a){
$("#card_area").show().html(template.render("card_tpl",a)),$("#card_area").data("card_id",a.id),
$("#js_card1_bt").hide();
},
onHide:function(){}
}),d.show();
}
var d,r=(a("biz_web/ui/checkbox.js"),a("cardticket/send_card.js")),i=a("common/wx/dialog.js");
return{
init:t
};
});