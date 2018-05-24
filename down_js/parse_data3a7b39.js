define("cardticket/parse_data.js",["cardticket/add/member_info_flag.js"],function(e){
"use strict";
function _(e){
var _=u[e.card_type]||e.card_type;
switch(_+=""){
case"2":
e=e.discount;
break;

case"1":
e=e.groupon;
break;

case"3":
e=e.gift;
break;

case"4":
e=e.cash;
break;

case"0":
e=e.general_coupon;
break;

case"10":
e=e.member_card;
break;

case"21":
e=e.scenic_ticket;
break;

case"22":
e=e.movie_ticket;
break;

default:
e=e.general_coupon||e.coupon;
}
return e?(e.type=_,e):null;
}
function t(e,_){
return"number"!=typeof e&&(e=praseFloat(e),isNaN(e))?0:(_||(_=2),parseFloat(e.toFixed(_)));
}
function i(e){
var _=/^https?:\/\/mp.weixin.qq.com\/s/,t=/^http:\/\/mp.weixin.qq.com\/bizmall\/cardshelf/,i=/^http:\/\/mp.weixin.qq.com\/bizmall\/mallshelf/;
return _.test(e)?1:t.test(e)?2:i.test(e)?3:4;
}
function s(e){
return e?(e+"").html(!1):"";
}
function o(e){
var _=e.url||"",t=e.url_type;
return 4==t?_.replace("http://",""):s(_);
}
function n(e){
var n={},e=_(e);
if(!e)return null;
a(n,e),a(n,e.base_info),n.background_pic_url=e.background_pic_url;
var r=e.base_info.date_info||{};
n.time_type=f[r.type]||r.type,1==n.time_type&&(n.begin_time=r.begin_timestamp,n.end_time=r.end_timestamp),
n.from_day=r.fixed_begin_term||0,n.fixed_term=r.fixed_term||30,n.quantity=e.base_info.sku.quantity,
n.shop_id_list=e.base_info.shop_id_list,n.location_id_list=e.base_info.location_id_list;
var u=l[n.code_type];
if(n.code_type="undefined"!=typeof u?u:n.code_type,"undefined"==typeof n.code_type&&(n.code_type=1),
n.least_cost=e.least_cost&&e.least_cost/100,n.reduce_cost=e.reduce_cost&&e.reduce_cost/100,
"0"==n.least_cost&&(n.least_cost=""),n.discount=n.discount&&(100-n.discount)/10,
n.detail=1==n.type?n.deal_detail:n.default_detail,/^http/.test(n.logo_url)||(n.logo_url=""),
n.shop_type||(n.shop_type=n.location_id_list&&n.location_id_list.length?2:3),n.auto_update_new_location&&(n.shop_type=1),
n.isnew=n.func_flag?!!(16&n.func_flag):!1,n.ispay=n.func_flag?64&n.func_flag:!1,
n.func_flag&&(n.show_in_nearby=!1),n.ispay&&(n.can_share=!0),n.ispay&&(n.detail=n.detail?n.detail.replace(/\n微信价：.*?元$/gm,""):""),
n.price=t(e.base_info.sku.price/100),n.original_price=t(e.base_info.sku.original_price/100),
1==n.create_source&&(n.isnew=!0),1==n.time_type&&n.end_time<new Date/1e3&&(n.is_expire=!0),
n.is_intercomm=16384&n.func_flag,"undefined"!=typeof e.base_info.task_info&&(n.is_from_intercomm=!0,
n.task_info=e.base_info.task_info),n.is_from_intercomm&&(n.isnew=!0),n.status=m[n.status]||n.status,
n.discount&&(n.supply_discount=!0),10==n.type){
var d=[];
if(n.promotion_url_name){
var p={
name:n.promotion_url_name,
tips:n.promotion_url_sub_title,
url:n.promotion_url
};
p.url_type=i(p.url),p.url=o(p),d=[p];
}
e.custom_cell1&&(e.custom_cell1.url_type=i(e.custom_cell1.url),e.custom_cell1.url=o(e.custom_cell1),
d.push(e.custom_cell1)),e.custom_cell2&&(e.custom_cell2.url_type=i(e.custom_cell2.url),
e.custom_cell2.url=o(e.custom_cell2),d.push(e.custom_cell2)),n.config_url=d;
var y=e.required_info||{
info_flag:0
},g=e.optional_info||{
info_flag:0
};
n.require_keywords=c.flag2info(y.info_flag),n.option_keywords=c.flag2info(g.info_flag),
n.require_self_keywords=y.field_list,n.option_self_keywords=g.field_list,n.must_activate=!n.auto_activate,
n.supply_discount&&(n.prerogative=n.prerogative.replace(/^用卡可享受.*?折优惠\n/,"")),n.quantity="--",
n.can_modify=(e.required_info?e.required_info.can_modify:!1)||(e.optional_info?e.optional_info.can_modify:!1),
n.supply_balance=e.supply_balance;
}else{
var d=[];
if(n.custom_url_name){
var p={
name:n.custom_url_name,
tips:n.custom_url_sub_title,
url:n.custom_url
};
p.url_type=i(p.url),p.url=o(p),d=[p];
}
n.config_url=d;
}
var b=e.base_info;
if(10==n.type)var h=e.modify_msg_operation||{
_notexist:!0
};else var h=b.consume_msg_operation||{
_notexist:!0
};
n.msg_operation=h.url_cell||h.card_cell||{
_notexist:!0
},n.msg_operation._notexist||(n.msg_operation._type=n.msg_operation.card_id?5:i(n.msg_operation.url),
n.msg_operation.url&&(n.msg_operation.url=s(n.msg_operation.url))),n.msg_operation.endtime=n.msg_operation.end_time,
n.bonus_rule=e.bonus_rule||{},n.bonus_rule.init_bonus=n.bonus_rule.init_increase_bonus,
n.bonus_rule.cost_money_unit=n.bonus_rule.cost_money_unit&&n.bonus_rule.cost_money_unit/100,
n.bonus_rule.reduce_money=n.bonus_rule.reduce_money&&n.bonus_rule.reduce_money/100,
n.bonus_rule.least_money_to_use_bonus=n.bonus_rule.least_money_to_use_bonus&&n.bonus_rule.least_money_to_use_bonus/100,
b.sub_merchant_info&&(n.sub_merchant_id=b.sub_merchant_info.merchant_id);
var v=e.advanced_info;
if(n.use_hours=[],v){
n.is_sns_card=1==v.gen_type,n.orig_time_limit=v.time_limit||[],n.text_image_list=v.text_image_list||[],
n.time_limit=[];
var T={};
if(v.time_limit)for(var E=0;E<v.time_limit.length;E++){
var w=v.time_limit[E];
T[w.type]||(T[w.type]=!0,n.time_limit.push(w));
}
1!=n.create_source&&v.time_limit&&v.time_limit.length&&v.time_limit[0].end_hour&&(n.use_hours.push(v.time_limit[0]),
v.time_limit.length>1&&v.time_limit[0].type==v.time_limit[1].type&&n.use_hours.push(v.time_limit[1])),
n.consume_share_self_num=v.consume_share_self_num,n.consume_share_self_num>0?(n.consume_is_share=!0,
n.consume_share_type=1):v.consume_share_card_list&&v.consume_share_card_list.length?(n.consume_is_share=!0,
n.consume_share_type=2,n.consume_share_card_id=v.consume_share_card_list[0].card_id):n.consume_is_share=!1,
n.business_service=v.business_service;
var A=v.abstract;
A&&($(".section_card_intro").show(),n.abstract=A.abstract,n.cover_logo=A.icon_url_list?A.icon_url_list[0]:"");
}
if(n.is_quit_money=n.func_flag&1<<22,n.can_edit_quantity=!(n.is_quit_money||10==n.type||n.is_from_intercomm||(3!=n.status&&5!=n.status&&6!=n.status||!n.is_sns_card||n.is_expire)&&n.is_sns_card),
n.is_sns_card&&(n.isnew=!0),n.isnew||(n.quantity="--"),3==n.type&&n.is_sns_card){
n.gift_title=n.title;
var k=v.use_condition;
n.title=k?k.least_cost?"满%s送%s".sprintf(k.least_cost/100,n.gift_title):k.object_use_for?"买%s送%s".sprintf(k.object_use_for,n.gift_title):n.gift_title+(n.gift_num?n.gift_num:"")+(n.gift_unit?n.gift_unit:""):n.gift_title+(n.gift_num?n.gift_num:"")+(n.gift_unit?n.gift_unit:"");
}
n.pay_info=b.pay_info&&b.pay_info.swipe_card||{};
var S=65536&n.func_flag;
if(S)n.dispose_method=1;else{
var D=n.func_flag&1<<24;
n.pay_info.is_swipe_card?(n.dispose_method=4,n.code_type=1e4):D?(n.dispose_method=2,
n.code_type=1e4):n.dispose_method=3;
}
var C=n.pay_info;
if(C.auditing_info_list||(C.auditing_info_list=[]),C.is_swipe_card){
var R=C.auditing_info_list;
if(R.length){
var q=R[R.length-1];
if(C.swipe_card_status=0==q.mid_list.length?1:1==q.ret?C.is_active?0:3:2,q.trans_buff){
var I=q.trans_buff.html(!1);
try{
I=$.parseJSON(I);
}catch(x){
I="";
}
q.trans_buff=I,C.last_audit_item=q;
}
}else C.swipe_card_status=0==n.quantity?4:0;
}
!C.is_swipe_card||1!=C.swipe_card_status&&3!=C.swipe_card_status||(n.can_edit_quantity=!1),
v&&v.consume_cell_info&&(n.need_verify_code=v.consume_cell_info.need_verify_code,
n.need_remark=v.consume_cell_info.need_remark),n._can_global_edit=!n.is_from_intercomm&&(!n.is_sns_card||n.is_sns_card&&!n.is_expire&&(3==n.status||5==n.status||6==n.status)||n.is_sns_card&&(1==n.status||2==n.status));
var k=v&&v.use_condition;
return k&&(n.use_condition_least_cost=k.least_cost/100||"",n.accept_category=k.accept_category,
n.reject_category=k.reject_category,n.can_use_with_other_discount=k.can_use_with_other_discount,
n.can_use_with_membercard=k.can_use_with_membercard,n.object_use_for=k.object_use_for,
n.has_condition=k.least_cost||k.object_use_for||k.accept_category||k.reject_category||!k.can_use_with_other_discount,
3==n.type&&(n.use_condition_least_cost_type=n.object_use_for?2:1)),n.is_sns_card&&3==n.type&&(n.has_condition=!0),
n;
}
function a(e,_){
for(var t in _)_.hasOwnProperty(t)&&"object"!=typeof _[t]&&(e[t]=_[t]);
return e;
}
function r(e){
for(var _={},t=[],i=0;i<e.length;i++){
var s=n(e[i]);
s&&(_[s.id]=s,t.push(s));
}
return{
card_cache:_,
card_list:t
};
}
var c=e("cardticket/add/member_info_flag.js"),u={
DISCOUNT:"2",
MEMBER_CARD:"10",
GROUPON:"1",
GIFT:"3",
CASH:"4",
GENERAL_COUPON:"0",
SCENIC_TICKET:"21",
MOVIE_TICKET:"22"
},l={
CODE_TYPE_TEXT:0,
CODE_TYPE_BARCODE:1,
CODE_TYPE_QRCODE:2
},m={
CARD_STATUS_INIT:0,
CARD_STATUS_NOT_VERIFY:1,
CARD_STATUS_VERIFY_FAIL:2,
CARD_STATUS_VERIFY_OK:3,
CARD_STATUS_DELETE:4,
CARD_STATUS_SYS_DELETE:5,
CARD_STATUS_DISPATCH:6,
CARD_STATUS_SYS_OFF_SHELF:7,
CARD_STATUS_EXPIRED:8
},f={
DATE_TYPE_FIX_TIME_RANGE:1,
DATE_TYPE_FIX_TERM:2,
DATE_TYPE_PERMANENT:100
};
return{
parse_cardticket:n,
parse_cardlist:r,
url_type:i
};
});