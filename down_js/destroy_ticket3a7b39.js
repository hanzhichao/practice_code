define("cardticket/destroy_ticket.js",["common/wx/Tips.js","common/wx/Cgi.js","biz_common/moment.js","cardticket/parse_data.js","biz_web/ui/checkbox.js","common/wx/stopMultiRequest.js","cardticket/common_template_helper.js","cardticket/codepad.js","common/wx/pagebar.js","cardticket/member_manage/member_detail.js","cardticket/common_init.js"],function(e){
"use strict";
function a(e){
e||(e=u),u=e;
for(var r=(l-1)*b,s=r+b,t=0,t=e.length,c=[],n=r;s>n&&t>n;n++)c.push(e[n]);
if($("#js_shoplist").html(template.render("js_shop_tpl",{
card_shop:c
})),t>b){
var o=new m({
container:"#js_pagerbar",
perPage:b,
initShowPage:l,
totalItemsNum:t,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var r=e.currentPage;
l=r,a();
}
});
$("#"+o.uid).addClass("turn_page");
}else $("#js_pagerbar").html("");
}
function r(){
$("#js_expand_detail").click(function(){
$("#js_card_detail_p").toggle();
var e=$(this),a=e.attr("isshow");
1==a?($(this).parent().find(".js_rank").addClass("rank_down").removeClass("rank_up"),
e.attr("isshow",0)):($(this).parent().find(".js_rank").addClass("rank_up").removeClass("rank_down"),
e.attr("isshow",1));
}),$(".container_box").addClass("page_outcome");
}
function s(){
function e(){
var e=$("#js_add_bonus"),r=e.prop("checked"),s=$("#js_minus_bonus"),t=3,c=s.prop("checked");
r&&($(".js_bonus_label",a).text("增加积分"),$(".js_bonus_tips",a).text("请输入增加的积分"),$("#js_bonus_p").show(),
t=1),c&&($(".js_bonus_label",a).text("扣除积分"),$(".js_bonus_tips",a).text("请输入扣除的积分"),
$("#js_bonus_p").show(),t=2),r||c||$("#js_bonus_p").hide(),$("#js_bonus_type_hidden").val(t);
}
var a=$("#js_member_info_p"),r=$("#js_add_bonus").checkbox({
onChanged:function(a){
a.prop("checked")&&s.checked(!1),e();
}
}),s=$("#js_minus_bonus").checkbox({
onChanged:function(a){
a.prop("checked")&&r.checked(!1),e();
}
});
e();
}
var t=e("common/wx/Tips.js"),c=$("#js_cardid"),n=e("common/wx/Cgi.js"),o=$("#js_search_result"),i=e("biz_common/moment.js"),_="YYYY.MM.DD",d=e("cardticket/parse_data.js");
e("biz_web/ui/checkbox.js"),e("common/wx/stopMultiRequest.js"),e("cardticket/common_template_helper.js"),
e("cardticket/codepad.js"),$("#remarkInput").keydown(function(){}),template.helper("unixFormat",function(e,a){
return i.unix(e).format(a||_);
}),template.helper("limited_time",function(e){
return 1==e.type?"%s:00-%s:00".sprintf(e.begin_hour,e.end_hour):2==e.type?"%s:00-%s:00".sprintf(e.begin_hour,e.end_hour):void 0;
});
var u,p=$("#js_search").click(function(){
var e=$.trim(c.val()).replace(/-/g,"");
return e?void n.post({
url:"/merchant/carduse",
data:{
action:"searchcardbycode",
code:e
},
error:function(e,a){
t.err("%s:%s".sprintf(e.status,a));
}
},function(e){
if(0==e.base_resp.ret){
var t=e.openid;
e=$.parseJSON(e.data),e.app_card=d.parse_cardticket(e.app_card),e.user_data.status||(e.user_data.status=0);
var c="YYYY-MM-DD",_=i(i.unix(e.user_data.begin_time).format(c),c).unix();
0==e.user_data.status&&i().unix()>_&&(e.user_data.datevalid=!0),0==e.user_data.status&&i().unix()>e.user_data.end_time&&(e.user_data.status=-2),
e.app_card.cur_time=i.unix(),o.html(template.render("js_search_result_tpl",{
card:e.app_card,
user_data:e.user_data,
member_user_data:e.member_user_data,
card_shop:e.card_shop,
user_info:e.user_info,
openid:t
})),window.current_card=e,l=1,a(e.card_shop),r(),10==e.app_card.type&&s();
}else switch(e.base_resp.ret){
case-204:
case 200204:
case-204:
case 213004:
o.html(template.render("js_search_result_tpl",{}));
break;

default:
n.handleRet(e,{
id:64463,
key:35,
url:"/merchant/carduse?action=searchcardbycode"
});
}
}):(t.err("请输入序列号"),c.focus(),!1);
}),m=e("common/wx/pagebar.js"),l=1,b=5;
o.on("click",".js_destroy_card",function(){
var e,a,r=$(this).attr("data-code"),s=$("#js_change_bonus"),c=s.length,i=$("#remarkInput").val();
if(c){
if(a=$("#js_bonus_type_hidden").val(),2==a&&(s=$("#js_change_bonus_minus")),e=$.trim(s.val()),
3==a&&(e=0),!/^[0-9]+$/.test(e)||isNaN(e=parseInt(e)))return t.err("积分只能是整数"),s.focus(),
!1;
var _=window.current_card.app_card.bonus_rule,d=_&&_.max_increase_bonus?_.max_increase_bonus:1e5;
if(e>0&&e>d)return t.err("单次积分增加上限为"+d),s.focus(),!1;
if(2==a&&(e=-e),e+window.current_card.member_user_data.bonus<0)return t.err("扣除的积分不能小于当前积分"),
!1;
}
n.post({
url:"/merchant/carduse",
data:{
action:"usecard",
code:r,
bonus:e,
remark:i
},
btn:this,
error:function(e,a){
t.err("%s:%s".sprintf(e.status,a));
}
},function(e){
if(0==e.base_resp.ret){
var a=e.member_card&&e.member_card.result_bonus;
o.html(template.render("js_destroy_suc_tpl",{
ismem:10==window.current_card.app_card.type,
result_bonus:a
})),$("#js_search_box").hide();
}else switch(e.base_resp.ret){
case 200204:
t.err("无法查到相关信息，请仔细核对并重新输入");
break;

case-205:
t.err("此券已经过期，请重新输入");
break;

case-206:
t.err("此券已经使用，请重新输入");
break;

case-207:
t.err("积分不足，请重新输入扣除积分");
break;

case 50004:
t.err("核销失败，顾客的二维码未展开或已展开超过五分钟");
break;

case 50003:
t.err("核销失败，用户使用次数已达到上限");
break;

case 10030:
t.err("已达使用上限");
break;

case 10072:
t.err("已达使用上限");
break;

default:
n.handleRet(e,{
id:64463,
key:35,
url:"/merchant/carduse?action=usecard"
}),n.show(e);
}
});
});
var h=e("cardticket/member_manage/member_detail.js"),j={};
if(o.on("click",".js_show_member_detail",function(){
var e=$(this).attr("data-code");
e&&!j[e]&&(j[e]=!0,new h({
id:e,
onRemove:function(){
j[e]=!1;
}
}));
}),c.on("keyup",function(e){
wx.isHotkey(e,"enter")&&p.click();
}).focus(),wx.cgiData.code){
var k=new RegExp("([^s]{4})(?=([^s])+$)","ig"),f=wx.cgiData.code;
f=f.replace(k,"$1-").substr(0,14),c.val(f),p.click();
}
c.codepad(),e("cardticket/common_init.js");
});