define("cardticket/add/submit.js",["biz_common/jquery.validate.js","common/wx/Cgi.js","biz_common/moment.js","cardticket/clickreport.js","common/wx/dialog.js","common/wx/Tips.js","biz_web/lib/json.js","common/qq/events.js","common/wx/stopMultiRequest.js","cardticket/common_template_helper.js","cardticket/common_validate.js","common/wx/popup.js","tpl/simplePopup.html.js","biz_web/lib/store.js"],function(e){
"use strict";
function t(t){
function r(){
return t.data.MEMBER_TYPE==t.data.type;
}
function a(){
return 1==t.data.is_sns_card;
}
function u(){
return a()&&3==t.data.type;
}
function d(e){
return/^[0-9]+$/.test(e)&&!isNaN(parseInt(e))&&parseInt(e)>0?parseInt(e)>y?!1:!0:!1;
}
function p(e,i,s){
function o(){
r()?x.go(2):x.gofirst();
}
if(100==s)return!0;
if(!(e||s&&1!=s))return _.err("请选择生效时间"),o(),!1;
if(!(i||s&&2!=s))return _.err("请选择失效时间"),o(),!1;
if(!t.data._is_global_editting){
if(!r()&&e&&n.unix(e).add("d",1).unix()<n().unix())return _.err("生效时间不能是今天之前的时间"),
o(),!1;
if(e&&i&&n.unix(e).unix()>n.unix(i).unix())return _.err("生效时间不能小于失效时间"),o(),!1;
}
return i&&i<n().unix()?(_.err("生效时间不能是今天之前的时间"),o(),!1):!0;
}
function l(){
var e=$("#js_card_article").offset();
window.scrollTo(0,e.top);
}
function m(e){
if(e=$(e),e&&e.length){
var t=e.offset();
t&&window.scrollTo(0,t.top);
}
}
function f(e){
for(var t in e)e[t]=$.trim(e[t]);
return e;
}
function b(e){
var i={};
F.each(function(){
var e=$(this).serializeObject();
$.extend(!0,i,e);
});
var s=$(e).attr("id"),o="js_editform_step1"===s;
if(f(i),!i.color)return _.err("请选择%s颜色".sprintf(j)),void x.go(0);
if(!o&&!i.code_type)return _.err("请选择销券方式"),void x.go(1);
if(!o){
if(z){
var a=z.val();
if(!a)return;
if($.extend(i,a),1==i.card_pay_money&&!window.wx_is_paycard)return _.err("尚未配置商户号，无法使用自助买单"),
void z.showOpenPaycard();
}
if(!w.validate())return;
if("1"==i.shop_type){
for(var c=[],u=w.shop_select.getData(),d=0;d<u.length;d++)c.push(u[d].wx_poi_uid);
if(i.location_id_list=c.join("|"),1==i.is_sns_card&&!i.location_id_list)return void _.err("共享券必须添加门店");
}
if("2"==i.shop_type&&(i.no_store_reason="",!i.location_id_list&&2==i.shop_type))return _.err("请添加适用门店"),
void x.go(3);
if("3"==i.shop_type){
if(i.location_id_list="",i.show_in_nearby="0",3==i.no_store_reason_type&&(i.no_store_reason=$(".js_noshop_input").val()),
!i.no_store_reason)return _.err("请添加适用门店"),void x.go(3);
if(i.no_store_reason.len()>100)return _.err("无指定门店原因不能超过50个字"),void x.go(3);
}
if(1==i.show_in_nearby&&!i.poi_pic_url)return _.err("请上传卡券缩略图"),void x.go(3);
"0"==i.show_in_nearby&&(i.poi_pic_url="");
}
if(1==i.time_type){
if(i.end_time=parseInt(i.end_time)+86400-1,!p(i.begin_time,i.end_time))return;
if(i.is_swipe_card&&!i.is_global_editting){
var b=parseInt(i.begin_time),h="YYYYMMDD";
n.unix(b).format(h)==n().format(h)&&(i.begin_time=n().unix()+300);
}
}
if(i.card_type=i.type,1!=i.is_sns_card&&4==i.type&&(i.title=i.use_condition_least_cost?"满%s减%s代金券".sprintf(i.use_condition_least_cost,i.reduce_cost):"%s元代金券".sprintf(i.reduce_cost)),
wx.cgiData.ispay){
var g=parseFloat(parseFloat(i.price).toFixed(2));
i.detail=i.detail+"\n微信价："+g+"元";
}
for(var v=/(\.\d{2}).+$/,y=["reduce_cost","least_cost","use_condition_least_cost"],d=0;d<y.length;d++)if(i[y[d]]){
var L=i[y[d]];
L=(L+"").replace(v,"$1"),i[y[d]]=/(\.\d{0,2})$/.test(L)?L.replace(".","")+(1==RegExp.$1.length?"00":2==RegExp.$1.length?"0":""):L+"00";
}
if(1==i.is_sns_card&&4==i.type,i.price&&(i.price=100*i.price),i.ori_price&&(i.ori_price=100*i.ori_price),
i.reduce_money&&(i.reduce_money=100*i.reduce_money),i.least_money_to_use_bonus&&(i.least_money_to_use_bonus=100*i.least_money_to_use_bonus),
i.discount&&(i.discount=10*i.discount),r()){
if(!i.supply_bonus&&!i.supply_discount)return _.err("请至少选择一种会员卡优惠类型"),void x.go(2);
if(!o){
var R=k.val("1"==i.must_activate);
$.extend(i,R),1!=i.must_activate&&(i.activate_prompt="");
}
i.cost_money_unit=i.supply_bonus?100*i.cost_money_unit:i.init_bonus=i.increase_bonus=i.max_increase_bonus=0,
i.supply_discount?i.prerogative="用卡可享受%s折优惠\n".sprintf(i.discount/10)+i.prerogative:i.discount=0;
}
if(!o){
var B=M.getData();
if(!B)return void x.go(1);
$.extend(i,B);
}
var E=q.val();
if(!E)return void x.go(4);
if($.extend(i,E),I){
var P=I.val();
if(i.discount_day=P.discount_day,i.discount_time_span=P.discount_time_span,i.discount_time_span===!1)return!1;
}
if(i.business_service=D&&D.val(),T){
var Y=T&&T.val();
if(1==i.is_sns_card&&!Y.text_image_item_count)return void l();
$.extend(!0,i,Y);
}
"undefined"!=typeof i.consume_share_self_num&&1==i.card_pay_money&&(i.consume_share_self_num=parseInt(i.consume_share_self_num)+2);
var G={
0:"使用时请出示该号码",
1:"使用时请出示该条码或号码",
2:"使用时请出示该二维码或号码",
1e4:"请点击立即使用进行自助核销"
};
if(i.notice||(i.notice=G[i.code_type]||""),o&&i.is_sns_card&&!i.has_condition&&i.uncheckcount>0){
var O=$("#js_friend_desc_tips").offset();
return window.scrollTo(0,O.top),$("#js_friend_desc_tips .js_description_tips").show(),
!1;
}
if($("#js_friend_desc_tips .js_description_tips").hide(),o&&i.is_sns_card&&4==i.type&&C&&!C.isValid())return!1;
if(!t.data._is_global_editting&&10!=t.data.type){
if(!i.can_use_with_other_discount)return _.err("请选择优惠共享"),m("#js_use_condition"),
m("#js_friend_desc_tips"),!1;
if(t.data._support_can_use_with_membercard&&1==i.can_use_with_other_discount&&""===i.can_use_with_membercard)return _.err("请选择是否与会员卡优惠共享"),
m("#js_use_condition"),m("#js_friend_desc_tips"),!1;
}
return"0"==i.open_self_consume&&(i.need_verify_code=0,i.need_remark=0),i.supply_balance=t.data.supply_balance?1:0,
i;
}
function h(e){
$(e).on("submit",function(){
return!1;
}).validate({
rules:{
brand_name:{
required:!0,
utf8byteMaxLength:24
},
title:{
required:!0,
byteMaxLength:u()?12:18
},
gift_num:{
posnum:!0,
byteMaxLength:2
},
gift_unit:{
byteMaxLength:4
},
sub_title:{
byteMaxLength:36
},
logo_url:{
required:!0
},
description:{
byteMaxLength:600,
check_friend_card_word:a()
},
"abstract":{
required:!0,
byteMaxLength:24,
check_friend_card_word:a()
},
get_limit:{
digits:!0
},
service_phone:{
customer_phone:!0
},
reduce_cost:{
required:!0,
posnum:!0,
reduce_cost:a(),
maxprice:1e5
},
price:{
required:!0,
posnum:!0,
maxprice:1e3
},
ori_price:{
required:!0,
posnum:!0,
price:!0,
maxprice:1e4
},
least_cost:{
posnum:!0,
maxprice:1e5
},
discount:{
discount:!0
},
code_type:{},
gift:{
required:!0,
byteMaxLength:600,
check_friend_card_word:a()
},
quantity:{
required:!t.data._is_global_editting,
digits:!t.data._is_global_editting,
posnum:!t.data._is_global_editting,
maxQuantity:!t.data._is_global_editting
},
notice:{
required:!0,
byteMaxLength:32
},
activate_prompt:{
required:function(){
return"1"==$("#js_hidden_must_activate").val();
},
byteMaxLength:32
},
use_limit:{
required:!0,
digits:!0
},
detail:{
required:!0,
byteMaxLength:600,
check_friend_card_word:a()
},
prerogative:{
required:!0
},
bonus_rules:{
bonus_rules:!0,
byteMaxLength:600
},
url:{
required:!0,
url:!0
},
cover_logo:{
required:!0
},
cost_money_unit:{
required:function(){
return r()&&$("#js_supply_bonus").prop("checked");
},
member_bonus:!0
},
increase_bonus:{
required:function(){
return r()&&$("#js_supply_bonus").prop("checked");
},
member_bonus:!0
},
max_increase_bonus:{
member_bonus:!0,
largerthanincrease_bonus:!0
},
init_bonus:{
member_bonus:!0
},
cost_bonus_unit:{
required:function(){
return r()&&$("#js_supply_bonus").prop("checked");
},
member_bonus:!0
},
reduce_money:{
required:function(){
return r()&&$("#js_supply_bonus").prop("checked");
},
money:!0
},
least_money_to_use_bonus:{
money:!0
},
max_reduce_bonus:{
member_bonus:!0,
min_reduce_bonus:!0
},
msg_operation_url:{
required:function(){
return 4==M.content_type;
}
},
msg_operation_url_text:{
required:function(){
return 1==M.content_type||4==M.content_type||2==M.content_type;
},
byteMaxLength:32
},
use_condition_least_cost:{
required:function(){
return 3==t.data.type?$("#js_use_condition_least_cost_checkbox").prop("checked")&&1==$("#js_use_condition_least_cost_type_hidden").val():$("#js_use_condition_least_cost_checkbox").prop("checked");
},
money:!0,
maxthanleastcost:4==t.data.type,
maxprice:1e5
},
accept_category:{
required:function(){
return $("#js_use_condition_category_checkbox").prop("checked")&&!$("#js_use_condition_reject_category_input").val();
},
byteMaxLength:30
},
reject_category:{
required:function(){
return $("#js_use_condition_category_checkbox").prop("checked")&&!$("#js_use_condition_accept_category_input").val();
},
byteMaxLength:30
},
object_use_for:{
required:function(){
return $("#js_use_condition_least_cost_checkbox").prop("checked")&&2==$("#js_use_condition_least_cost_type_hidden").val();
},
byteMaxLength:30
},
background_pic_url:{
required:function(){
return 1==$("#js_background_type").val();
}
}
},
messages:{
brand_name:{
required:"请选择子商户",
utf8byteMaxLength:"商户名称长度不能超过12个汉字或24个英文字母，请重新修改商户名称"
},
logo_url:{
required:"请选择子商户"
},
title:{
required:u()?"兑换内容不能为空且长度不超过6个汉字或12个英文字母":"%s名称不能为空且长度不超过9个汉字或18个英文字母".sprintf(j),
byteMaxLength:u()?"兑换内容不能为空且长度不超过6个汉字或12个英文字母":"%s名称不能为空且长度不超过9个汉字或18个英文字母".sprintf(j)
},
gift_num:{
posnum:"兑换数量只能是整数且最多2位",
byteMaxLength:"兑换数量只能是整数且最多2位"
},
gift_unit:{
byteMaxLength:"兑换单位长度不超过2个汉字或4个英文字母"
},
sub_title:{
byteMaxLength:"副标题长度不超过18个汉字或36个英文字母"
},
code_type:{
required:"请选择销券方式"
},
description:{
required:"使用须知不能为空且长度不超过300个汉字",
byteMaxLength:"使用须知长度不超过300个汉字"
},
"abstract":{
required:"简介不能为空且长度不超过12个汉字",
byteMaxLength:"简介须知不能为空且长度不超过12个汉字",
check_friend_card_word:"测试文案"
},
get_limit:{
digits:"领券限制只能是数字"
},
service_phone:{
required:"客服电话不能为空",
customer_phone:"请输入座机号或手机号，可加区号（如：020-88888888，最长不超过15位）",
byteMaxLength:"客服电话长度不超过15个汉字或30个英文字母/数字"
},
price:{
required:"微信价只能是大于0.01的数字",
posnum:"微信价只能是大于0.01的数字",
price:"微信价必须小于原价",
maxprice:"微信价不能大于1000元"
},
ori_price:{
required:"原价只能是大于0.01的数字",
posnum:"原价只能是大于0.01的数字",
price:"原价必须大于微信价",
maxprice:"原价不能大于1万元"
},
cover_logo:{
required:"请上传封面图片"
},
reduce_cost:{
required:function(){
return 1==$("#js_is_sns_card").val()?"减免金额不小于1元":"减免金额只能是大于0.01的数字";
},
posnum:function(){
return 1==$("#js_is_sns_card").val()?"减免金额不小于1元":"减免金额只能是大于0.01的数字";
},
reduce_cost:"减免金额不小于1元",
maxprice:"金额不能大于100000"
},
least_cost:"抵扣条件只能是大于0.01的数字",
discount:"折扣额度只能是大于1且小于10的数字",
gift:{
required:"自定义优惠说明不能为空且长度不超过300个汉字",
byteMaxLength:"自定义优惠说明不能为空且长度不超过300个汉字",
check_friend_card_word:"测试文案"
},
quantity:{
required:"库存只能是大于0的数字",
digits:"库存只能是大于0的数字",
posnum:"库存只能是大于0的数字",
maxQuantity:function(){
return"商户每张券库存不超过%s".sprintf(y);
}
},
notice:"操作提示不能为空且长度不超过16个汉字或32个英文字母",
activate_prompt:"激活提示不能为空且长度不超过16个汉字或32个英文字母",
use_limit:"使用次数只能是数字",
detail:{
required:"自定义优惠说明不能为空且长度不超过300个汉字",
byteMaxLength:"自定义优惠说明不能为空且长度不超过300个汉字",
check_friend_card_word:"测试文案"
},
prerogative:{
required:"特权说明不能为空"
},
bonus_rules:"积分规则不能为空且长度不超过300个汉字",
url:"请输入正确的图文详情网址",
cost_money_unit:"消费金额和赠送积分只能大于0的整数",
increase_bonus:"消费金额和赠送积分只能大于0的整数",
max_increase_bonus:"单次送积分上限只能是大于消费赠送积分",
init_bonus:"激活送积分只能是大于0的整数",
cost_bonus_unit:"积分只能填大于0的整数，金额大于0且只能到百分位",
reduce_money:"积分只能填大于0的整数，金额大于0且只能到百分位",
least_money_to_use_bonus:"积分只能填大于0的整数，金额大于0且只能到百分位",
max_reduce_bonus:{
member_bonus:"积分只能填大于0的整数，金额大于0且只能到百分位",
min_reduce_bonus:"单笔上限积分必须大于等于每使用积分"
},
msg_operation_url_text:"介绍文字不能为空且长度不超过16个汉字或32个英文字母",
msg_operation_url:"网页链接不能为空",
use_condition_least_cost:{
required:"消费金额大于0且只能到百分位",
money:"消费金额大于0且只能到百分位",
maxthanleastcost:"消费金额必须大于"+(a()?"代金券金额":"减免金额"),
maxprice:"金额不能大于100000"
},
accept_category:"适用商品不能为空且长度不能超过15个汉字或30个英文字母",
reject_category:"不适用商品不能为空且长度不能超过15个汉字或30个英文字母",
object_use_for:"消费条件不能为空且长度不能超过15个汉字或30个英文字母",
background_pic_url:"请上传背景图片"
},
errorPlacement:function(e,t){
if("code_type"==t.attr("name")){
var r=t.parent();
return void r.append(e);
}
var i=t.closest(".js_card_input_item");
i.find(".fail").remove();
var n=i.find(".frm_tips");
t.is(".file_field")?e.insertBefore(i.find(".upload_preview")):n.length?e.insertBefore(n):i.append(e);
},
ignore:[],
submitHandler:function(e){
var t=b(e);
t&&g(t);
},
invalidHandler:function(e,t){
var r=t.errorList[0],i=($(r.element).closest(".js_edit_content"),$(r.element).parent().offset());
window.scrollTo(0,i.top);
}
});
}
function g(e){
i.post({
url:"/merchant/electroniccardmgr?CGIDB=1",
data:e,
btn:R
},function(n){
if(n.need_check)return o.show({
msg:"check_mod_member_detail"==e.action?"本次修改预计3个工作日完成审核。审核前会员卡仍为原有信息，会员可用。若审核通过，会员卡更新，若审核不通过，则继续保持修改前的信息。":"本次修改需要审核后才能生效。审核期间，已被用户领取的优惠券可正常使用。是否确认提交？",
buttons:[{
text:"确定",
click:function(){
e.action="check_mod_member_detail"==e.action?"mod_member_detail":"update_card",g(e),
this.hide();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
}),!1;
if("check_mod_member_detail"==e.action)return e.action="mod_member_detail",g(e),
!1;
if("check_if_update_card_need_check"==e.action)return e.action="update_card",g(e),
!1;
if(0==n.base_resp.ret||1==n.base_resp.ret){
if(window.onbeforeunload=null,r())_.suc("check_mod_member_detail"==e.action||"mod_member_detail"==e.action?"修改会员卡成功":"添加会员卡成功");else{
if(e.is_global_editting)return _.suc("修改卡券成功"),void(location.href=wx.url("/merchant/electroniccardmgr?action=batch&nodelay=1"+(2==window.view_mode?"&tag_filter=sub_merchant,1":"&sub_merchant_id=0")));
var a=$(".js_addtypeclickreport_suc").get(0);
a&&s.clickele(a,!0),_.suc("创建卡券成功");
}
s.timeonpage({
actionid:15
}),r()?setTimeout(function(){
location.href=wx.url("/merchant/membercardmgr?action=overview");
},1e3):($("#js_main_content").html("").append($("#js_add_suc").show()),1==e.is_swipe_card?($("#js_add_suc .js_swipe_card_tips").show(),
$("#js_add_suc .js_notall_consumer").hide()):$("#js_add_suc .js_not_swipe_card_tips").show(),
$("#js_add_step_head").hide(),window.scrollTo(0,100));
}else 10039==n.base_resp.ret?_.err("子商户每张券库存不超过%s份".sprintf(t.max_sku)):10036==n.base_resp.ret?_.err(2==window.view_mode?"每月仅可代该子商户制券%s张，请下月继续代制。".sprintf(t.max_card):"你的账号因违规，暂被关闭制券权限，请查看通知中心"):10047==n.base_resp.ret?_.err("共享券必须添加门店"):14018==n.base_resp.ret?_.err("创建失败，请先设置自助核销验证码"):10060==n.base_resp.ret?_.err("你的类目不在会员卡开放范围，部分功能受到限制"):10013==n.base_resp.ret?_.err("有效期开始时间不能是1年后的时间"):10040==n.base_resp.ret?_.err("子商户无效不能制券"):10075==n.base_resp.ret?_.err("请勿添加其它公众号的主页链接"):10078==n.base_resp.ret?_.err("链接已失效，请在手机端重新复制链接"):50105==n.base_resp.ret?_.err("卡券生效时间需大于当前时间"):50107==n.base_resp.ret?_.err("请确认微信支付制券商户号与微信支付适用商户号一致"):(v(n),
i.handleRet(n,{
id:64463,
key:29,
showMsg:!1,
url:"/merchant/electroniccardmgr?CGIDB=1"
}));
});
}
function v(e){
var t={},r=[];
if(e.unpass_list){
if($.isArray(e.unpass_list))for(var n=0;n<e.unpass_list.length;n++){
var s=e.unpass_list[n];
t[s.ret_code]||(t[s.ret_code]=[]),t[s.ret_code].push("商户号"+s.mch_id);
}else if(e.unpass_list.ret_code){
var s=e.unpass_list;
t[s.ret_code]||(t[s.ret_code]=[]),t[s.ret_code].push("商户号"+s.mch_id);
}
for(var _ in t)t.hasOwnProperty(_)&&r.push(t[_].join("、")+(B[_]||""));
r.length&&o.show({
msg:r.join("<br>"),
buttons:[{
text:"确定",
click:function(e){
this.remove(e);
}
}]
});
}else 0!=e.base_resp.ret&&i.show(e);
}
$.validator.addMethod("member_bonus",function(e,t){
return this.optional(t)||($("#js_supply_bonus").prop("checked")?/^[0-9]+$/.test(e)&&parseInt(e)>0:!0);
}),$.validator.addMethod("largerthanincrease_bonus",function(e,t){
return this.optional(t)||($("#js_supply_bonus").prop("checked")?parseInt($("#js_increase_bonus").val())<=e:!0);
});
var y=t.data.sub_merchant_id?t.max_sku:1e9;
c.on("submit:sub_merchant_change",function(e){
y=e?t.max_sku:1e9;
}),$.validator.addMethod("maxQuantity",function(e,t){
var r=$.trim(e);
return this.optional(t)||d(r);
}),$.validator.addMethod("min_reduce_bonus",function(e,t){
var r=parseInt($("#js_cost_bonus_unit").val());
return this.optional(t)||!r||e>=r;
});
var j=r()?"会员卡":"卡券",x=t.sectionmgr,w=t.mod_shop,k=t.member_active,q=t.config_url,M=t.msg_operate,L=t.stepmgr,I=t.discountTime,D=t.businessService,T=t.cardDesc,C=t.useCondition,z=t.disposeMethod;
$.validator.addMethod("price",function(){
var e=parseFloat($.trim($("#js_ori_price").val())),t=parseFloat($.trim($("#js_price").val()));
return e&&t?parseFloat(t)<e:!0;
}),$.validator.addMethod("maxthanleastcost",function(e,t){
return this.optional(t)||this.optional($("#js_reduce_cost").get(0))||parseFloat(e)>parseFloat($("#js_reduce_cost").val());
});
$.validator.addMethod("maxprice",function(e,t,r){
var i=$.trim(e);
return this.optional(t)||parseFloat(i)<=r;
});
var F=$("#js_editform_step1,#js_editform_step2");
F.each(function(){
h(this);
});
var R=$("#js_submit").click(function(){
$("#js_editform_step2").submit();
});
$("#js_nextstep").click(function(){
var e=$("#js_editform_step1");
if(e.valid()){
var t=b(e);
t&&L.next();
}
}),$("#js_prevstep").click(function(){
L.prev();
});
var B={
3145728:"制券商户号非法",
3145729:"商户号来源非法",
3145730:"场景非法",
3145731:"appid非法",
3145732:"适用商户列表非法",
3145733:"适用商户数超出上限",
3145734:"商户号不合法",
3145735:"商户号转换商户ID失败",
3145736:"查询商户信息失败",
3145737:"appid不属于制券商户号",
3145738:"该商户未在支付开启本权限",
3145739:"系统繁忙，请稍后重试",
3145740:"无权限使用",
3145741:"查询商户类型失败",
3145742:"商户号与商户ID转换失败",
3145743:"提交支付审核失败",
3145744:"适用商户不能为受理商户",
3145745:"制券商户与适用商户无关联",
3145746:"适用商户不是该制券商户号子商户",
3145747:"未开启非充值代金券跨商户审核，请登录微信支付后台，在账户中心-审核配置中，开通非充值券跨商户审核",
3145748:"尚未完成非充值券验收，请登录微信支付后台，打开开发文档-代金券或立减优惠，参照非充值代金券验收流程操作",
3145749:"校验失败",
3145750:"尚未开启支付代金券，请登录微信支付后台，打开营销中心，申请代金券权限",
3145751:"校验商户关系失败"
};
e("common/wx/popup.js");
var E=e("tpl/simplePopup.html.js"),P=e("biz_web/lib/store.js");
$("#js_preview").click(function(){
var e=$("#js_editform_step2");
if(e.valid()){
var t=b(e);
if(!t)return;
var r=!1,n=P.get("CARDTICKET_previewusername"),s=$(template.compile(E)({
label:"请输入微信号，此卡券将发送至该微信号预览。",
value:n
})).popup({
title:"发送预览",
className:"simple label_block",
onOK:function(){
var e=this.get(),n=e.find(".frm_input"),o=n.val().trim();
return r?!0:o?(r=!0,t.action="preview",t.username=o,i.post({
url:"/merchant/electroniccardmgr?CGIDB=1",
data:t,
complete:function(){
r=!1;
}
},function(e){
if(0==e.base_resp.ret)_.suc("发送预览成功，请留意你的手机微信"),P.set("CARDTICKET_previewusername",o),
s.popup("hide");else switch(e.base_resp.ret){
case 14006:
_.err("输入的微信号需先关注公众号");
break;

case 14007:
_.err("你输入是非法的微信号，请重新输入");
break;

case 14008:
_.err("你输入的微信号不存在，请重新输入");
break;

case 14009:
_.err("用户已被加入黑名单，无法向其发送消息");
break;

case 14010:
_.err("对方关闭了接收消息");
break;

case 10013:
_.err("有效期开始时间不能是1年后的时间");
break;

case 10060:
_.err("你的类目不在会员卡开放范围，部分功能受到限制");
break;

case 10040:
_.err("子商户无效不能制券");
break;

case 10075:
_.err("请勿添加其它公众号的主页链接");
break;

case 10078:
_.err("链接已失效，请在手机端重新复制链接");
break;

case 50107:
_.err("请确认微信支付制券商户号与微信支付适用商户号一致");
break;

default:
v(e),i.handleRet(e,{
id:64463,
key:29,
showMsg:!1,
url:"/merchant/electroniccardmgr?CGIDB=1"
});
}
}),!0):(_.err("请输入微信号"),n.focus(),!0);
},
onHide:function(){
this.remove();
}
});
s.popup("get").find(".frm_input").focus();
}else e.submit();
});
}
var r=e("biz_common/jquery.validate.js"),i=e("common/wx/Cgi.js"),n=e("biz_common/moment.js"),s=e("cardticket/clickreport.js"),o=e("common/wx/dialog.js"),_=e("common/wx/Tips.js"),a=(e("biz_web/lib/json.js"),
r.rules,e("common/qq/events.js")),c=a(!0);
e("common/wx/stopMultiRequest.js"),e("cardticket/common_template_helper.js"),e("cardticket/common_validate.js");
var a=e("common/qq/events.js"),c=a(!0);
return t;
});