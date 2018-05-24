define("cardticket/send_card_table.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/Step.js","common/wx/pagebar.js","cardticket/parse_data.js","biz_web/ui/dropdown.js","cardticket/store_cgi.js","cardticket/common_template_helper.js","cardticket/create_card_select.js","tpl/cardticket/card_table.html.js","tpl/cardticket/card_preview.html.js","page/cardticket/dialog_choose_card.css","biz_web/ui/checkbox.js","cardticket/card_quantity.js"],function(t){
"use strict";
function e(t){
{
var e;
t.opt;
}
e=t.$container,e.find(".js_card_list").html(k({
loading:!0
}));
}
function a(t,a){
var r=a.opt,c=$.extend(!0,{
action:"batch",
begin:t.begin,
count:t.count,
tag_filter:r.tag_filter,
filter_out_expired_card:r.filter_out_expired_card
},r.param);
1==r.view_mode&&(c.sub_merchant_id=0),w=!0,e(a),o.get({
url:r.url||"/merchant/electroniccardmgr",
data:c,
complete:function(){
w=!1;
}
},function(t){
if(0==t.base_resp.ret){
var e=t,n=t.card_dispatching_list;
t="string"==typeof t.batch_card?$.parseJSON(t.batch_card):t.batch_card,r.data=t.card_list;
var s=l.parse_cardlist(r.data);
if(b=s.card_cache,r.data=s.card_list,r.cache_data=b,r.acl={
is_can_shake:e.is_can_shake_card,
is_can_use_sns_card:e.is_can_use_sns_card,
is_intercomm_card:e.is_intercomm_card,
is_can_card_friend:e.is_can_use_sns_card
},n)try{
var _=$.parseJSON(e.card_dispatching_list);
if(_){
_=_.card_dispatching_list;
for(var d=0;d<_.length;d++){
var u=_[d],p=b[u.card_id];
p&&(p.cansend=!u.is_dispatching);
}
}
}catch(h){}
if(r.pageInfo.total_count=t.total_num,e.biz_quota_json){
var m=$.parseJSON(e.biz_quota_json);
m=f.parse_assistsend_quota(m.quota_list),a._quota=m;
}
i(r.pageInfo,a);
}else o.handleRet(t,{
id:64463,
key:33,
url:"/merchant/electroniccardmgr"
}),(new Image).src="https://badjs.weixinbridge.com/badjs?id=33&level=4&from="+encodeURIComponent(location.host)+"&msg="+encodeURIComponent("[card][sendout_err][cgi=/merchant/electroniccardmgr][data="+JSON.stringify(c)+"][ret="+(t?t.base_resp.ret:"null")+"]");
});
}
function i(t,e,a){
var i,_=e.opt;
if(_.payflag=_.param.flag,i=e.$container,a){
var o=i.find(".js_select");
return o.each(function(e){
e>=t.begin&&e<t.begin+t.count?$(this).closest("tr").show():$(this).closest("tr").hide();
}),e.pagebar=null,s(_.pageInfo,e),void(e.opt.getDataComplete&&e.opt.getDataComplete.call(e,a));
}
if(_.data&&"undefined"!=typeof _.sub_merchant_id)for(var d=0;d<_.data.length;d++)_.sub_merchant_id?_.data[d].sub_merchant_id!=_.sub_merchant_id&&(_.data[d].is_sub_merchant_disabled=!0):_.data[d].sub_merchant_id&&(_.data[d].is_sub_merchant_disabled=!0);
i.find(".js_card_list").html(k(_));
var l=_.defaultValues,o=i.find(".js_select");
l.length&&o.each(function(){
for(var t=$(this),e=0;e<l.length;e++)if(l[e]==t.attr("data-id")){
t.prop("checked",!0);
break;
}
}),e.select_card_checkbox=o.checkbox({
onChanged:function(){
if(_.multi){
var t=0;
o.each(function(){
$(this).prop("checked")&&t++;
}),$(".js_selectcount",i).text(t);
}
}
}),e.pagebar=null,s(_.pageInfo,e),c(e),n(e),1==_.no_filter||r(e);
var u,p=[];
1==_.sns_card_type?u=o.filter(".js_select_disabled_1"):2==_.sns_card_type&&(u=o.filter(".js_select_disabled_2")),
u&&(u.each(function(){
p.push($(this).val());
}),e.select_card_checkbox.disable(p)),$(".js_add_card_link",i).click(function(){
return new h({
ispay:_.payflag,
is_sns_card:window.wx_is_can_use_sns_card
}),e.opt.hidePopup&&e.opt.hidePopup(),!1;
}),e.opt.getDataComplete&&e.opt.getDataComplete.call(e,a);
}
function r(t){
var e=t.opt;
if("2"!=e.sns_card_type){
var i=[];
1==e.sns_card_type?i=[{
name:"全部卡券",
value:"friends,0"
}]:0==e.sns_card_type&&(i=[{
name:"全部卡券",
value:""
}],e.acl.is_can_card_friend&&i.push({
name:"朋友共享的券",
value:"friends,1"
})),e.acl.is_can_shake&&i.push({
name:"摇一摇",
value:"shake,1"
}),e.acl.is_intercomm_card;
var r=t.base_tag_filter?"|":"",c={};
if(c[t.base_tag_filter+r+"task,1"]="互通",c[t.base_tag_filter+r+"shake,1"]="摇一摇",c[t.base_tag_filter+r+"friends,1"]="朋友的券",
i.length>1){
new u({
container:$(".js_filter_tag",t.$container),
label:c[e.tag_filter]||"全部卡券",
data:i,
callback:function(i){
var r=t.base_tag_filter+(t.base_tag_filter&&i?"|"+i:i);
r!=e.tag_filter&&(e.tag_filter=r,a(e.pageInfo,t));
}
});
}
}
}
function c(t){
function e(e){
var i=$.trim(c.val());
(!e||e&&wx.isHotkey(e,"enter"))&&(n.param.keyword=i,a(n.pageInfo,t));
}
var i=t.$container,r=$(".js_search",i),c=$(".js_keyword",i),n=t.opt;
r.click(function(){
e();
}),c.keyup(function(t){
e(t);
}),c.val(n.param.keyword);
}
function n(t){
var e=t.$container,a=e.find(".js_modify_quantity");
a.each(function(){
var e=$(this),a=1*e.attr("data-new")||0;
new y({
container:e,
mode:"fixed",
cache_card:t.opt.cache_data,
setquantity:a?!0:!1,
max_sku_for_eachcard:t._quota&&t._quota.max_sku||1e4,
quantityChange:function(t,a){
var i=b[t];
if(i){
if(i.pay_info.is_swipe_card)return i.pay_info.swipe_card_status=1,void e.hide();
i.quantity=this.opt.setquantity?i.quantity+a:a,e.attr("data-new",1),i.isnew=!0,this.opt.setquantity=!0,
$("#js_ct_tr_"+t).find(".js_sendcard_quantity").text(i.quantity);
}
}
});
});
}
function s(t,e){
var r=t.total_count,c=e.$container;
if(t.count&&r>t.count){
var n=t.begin/t.count;
e.pagebar=new d({
container:$(".js_pager",c),
first:!1,
last:!1,
midRange:5,
initShowPage:n+1,
perPage:t.count,
totalItemsNum:r,
callback:function(r){
if(w)return!1;
var c=r.currentPage;
return c!=n+1&&(t.begin=(c-1)*t.count,e.opt.hasdata&&e.opt.data?i(t,e,!0):a(t,e)),
e.opt.pageChanged&&e.opt.pageChanged.call(e),!0;
}
});
}
}
var _=t("common/wx/Tips.js"),o=t("common/wx/Cgi.js"),d=(t("common/wx/Step.js"),t("common/wx/pagebar.js")),l=t("cardticket/parse_data.js"),u=t("biz_web/ui/dropdown.js"),p=t("cardticket/store_cgi.js"),f=t("cardticket/common_template_helper.js"),h=t("cardticket/create_card_select.js"),m={
multi:!1,
pageInfo:{
begin:0,
count:5,
total_count:0
},
param:{
keyword:"",
status:"3|6",
flag:2
},
neednew:!0,
noexpire:!0,
editquantity:!0,
onHide:$.noop,
selectComplete:$.noop,
data:null,
hasdata:!1,
maxcount:10,
sns_card_type:1,
defaultValues:[],
url:"",
removeOnHide:!0,
source:"",
has_sendout:!1,
acl:{},
view_mode:0,
sub_merchant_id:void 0,
filter_out_expired_card:1
},g=t("tpl/cardticket/card_table.html.js"),b=(template.compile(t("tpl/cardticket/card_preview.html.js")),
{});
t("page/cardticket/dialog_choose_card.css"),t("biz_web/ui/checkbox.js");
var v=function(t){
this.opt=$.extend(!0,{},m,t),this.opt.tag_filter=0==this.opt.sns_card_type?"":2==this.opt.sns_card_type?"friends,1":"friends,0",
this.init();
},k=template.compile(g),w=!1,y=t("cardticket/card_quantity.js");
return v.prototype={
_html:g,
init:function(){
var t=this.opt,e=this;
if(this.$container=$(t.container),e.base_tag_filter="",2==t.view_mode&&(e.base_tag_filter="sub_merchant,1",
t.tag_filter=t.tag_filter?e.base_tag_filter+"|"+t.tag_filter:e.base_tag_filter),
t.hasdata&&t.data){
t.pageInfo.total_count=t.data.length,b={};
for(var r=0;r<t.data.length;r++){
var c=t.data[r];
b[c.id]=c;
}
i(t.pageInfo,this);
}else a(t.pageInfo,this);
},
show:function(){
this.$container.show();
},
select:function(){
if(!w){
var t=this,e=this.opt,a=t.select_card_checkbox.values()[0],i=this.$container,r=b[a];
if(!a||!r)return void _.err("请选择卡券");
if(!e.neednew||!r.pay_info.is_swipe_card||0==r.pay_info.swipe_card_status||0!=r.quantity){
if(e.multi)for(var c=t.select_card_checkbox.values(),n=0;n<c.length;n++){
var s=b[c[n]];
if(e.neednew&&(!s.isnew||0==s.quantity))return void _.err("卡券库存不能为0，请先设置库存再投放");
}else if(e.neednew&&(!r.isnew||0==r.quantity))return _.err("卡券库存不能为0，请先设置库存再投放"),
void setTimeout(function(){
var t=i.find("input[data-id="+a+"]");
$(t.closest("tr").find(".js_modify_quantity")[0]).click();
},50);
if(!e.multi&&e.noexpire&&r.is_expire)return void _.err(r.is_sns_card?"卡券已过期":"卡券已过期，无法投放，请到卡券详情去延长有效期再投放");
if(e.multi&&e.noexpire)for(var c=t.select_card_checkbox.values(),n=0;n<c.length;n++){
var s=b[c[n]];
if(s.is_expire)return void _.err("不能选择已过期的卡券，请先到卡券详情去延长有效期");
}
var c=t.select_card_checkbox.values();
return c.length>e.maxcount?void _.err("最多只能选择%s个卡券".sprintf(e.maxcount)):2!=e.sns_card_type||r.is_sns_card?1==e.sns_card_type&&r.is_sns_card?void _.err("朋友的券只能进行社交投放, 请重新选择"):"undefined"!=typeof e.sub_merchant_id&&r.is_sub_merchant_disabled?void _.err("不支持赠送其他商户的“朋友的券”，请重新选择。"):void p.canSendCard({
card_id:a,
success:function(a){
if(a===!1)_.err("没有“审核通过”的门店。确认有至少一个“审核通过”的门店后可进行投放。");else if(a===!0){
var i=t.select_card_checkbox.values(),r=e.multi?i:i,c=[];
if(e.multi)for(var n=0;n<r.length;n++)b[r[n]].cardid=b[r[n]].id,c.push(b[r[n]]);else c=b[r],
c.cardid=b[r].id;
e.selectComplete&&e.selectComplete(c,0);
}
}
}):void _.err("朋友的券才能进行社交投放, 请重新选择");
}
switch(r.pay_info.swipe_card_status){
case 1:
_.err("添加库存暂未生效，待商户审核完成");
break;

case 3:
_.err("请先激活本券");
break;

case 2:
case 4:
_.err("卡券库存不能为0，请先设置库存再投放");
}
}
},
isLoading:function(){
return w;
},
hide:function(){
this.$container.hide();
},
destroy:function(){
this.$container.remove();
}
},v;
});