define("cardticket/add/consume_share.js",["biz_web/ui/dropdown.js","biz_web/ui/checkbox.js","common/qq/events.js","cardticket/send_card.js"],function(e){
"use strict";
function s(e){
function s(e){
c(e),d.consume_share_card_id=e.id,$(".js_consume_share_card_id").val(e.id),$(".js_consume_share_card_name").text("赠送"+e.title),
$($(".js_consume_share_card input")[1]).click(),$(".js_consume_share_type").val(2);
}
function c(e){
var s=$(".js_view_consume_share_card").show();
e&&s.attr("href",wx.url("/merchant/electroniccardmgr?action=detail&cardid="+e.id)),
$(".js_change_consume_share_card").show();
}
function r(){
$(".js_view_consume_share_card").hide(),$(".js_change_consume_share_card").hide();
}
var n=e.data,d=this;
$(".js_consume_share_self_num").checkbox({
onChanged:function(e){
var s=$(e).prop("checked");
$(".js_consume_share_type").val(s?d.consume_share_card_id?2:1:0),s?$(".js_consume_share_card").show():$(".js_consume_share_card").hide();
}
});
var i=n.sub_merchant_id||0;
$(".js_consume_share_card input").checkbox({
onChanged:function(e){
var _=$(e).val();
if(2==_)if(d.consume_share_card_id)c();else{
r();
var n=new a({
multi:!1,
param:{
need_member_card:0
},
use_scene:2,
sns_card_type:2,
selectComplete:s,
sub_merchant_id:i
});
$($(".js_consume_share_card input")[0]).click(),n.show();
}else $(".js_consume_share_type").val(_);
}
}),_.on("submit:sub_merchant_change",function(e){
i=e||0;
}),n.consume_share_card_id||r(),d.consume_share_card_id=n.consume_share_card_id,
$(".js_change_consume_share_card").click(function(){
var e=new a({
multi:!1,
param:{
need_member_card:0
},
sns_card_type:2,
selectComplete:s,
sub_merchant_id:i
});
e.show();
});
}
var c=(e("biz_web/ui/dropdown.js"),e("biz_web/ui/checkbox.js"),e("common/qq/events.js")),_=c(!0),a=e("cardticket/send_card.js");
return s;
});