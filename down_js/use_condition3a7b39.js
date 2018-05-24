define("cardticket/add/use_condition.js",["biz_web/ui/checkbox.js","cardticket/common_template_helper.js","common/wx/Tips.js","biz_web/ui/dropdown.js","common/qq/events.js","common/wx/tooltips.js"],function(t){
"use strict";
function e(t){
function e(t){
var e=$(t).closest(".js_use_condition_check_label");
$(t).prop("checked")?(e.find(".js_use_condition_append").show(),e.find(".js_use_condition_append_unchecked").hide()):(e.find(".js_use_condition_append").hide(),
e.find(".js_use_condition_append_unchecked").show(),e.find("input[type=text]").val(""));
var s=.2;
p.each(function(){
$(this).attr("name");
"js_use_condition_least_cost_checkbox"==this.id&&a.trigger("use_condition:use_condition_least_cost_checked_changed",$(this).prop("checked")),
$(this).prop("checked")&&("js_use_condition_least_cost_checkbox"==this.id?s=.4:"js_use_condition_category_checkbox"==this.id&&(s=.4));
}),$(".js_card_price").text(s);
}
function s(t){
$("#js_use_condition_least_cost_type_hidden").val(t),1==t?(u.find(".js_use_condition_least_cost").show(),
u.find(".js_object_use_for").hide().find("input[type=text]").val("")):(u.find(".js_use_condition_least_cost").hide().find("input[type=text]").val(""),
u.find(".js_object_use_for").show());
}
function _(t){
return/^[0-9\.]+$/.test(t);
}
function c(t){
return 3==t.type?t.title?t.use_condition_least_cost?"满%s送%s".sprintf(t.use_condition_least_cost,t.title):t.object_use_for?"买%s送%s".sprintf(t.object_use_for,t.title):t.title+(t.gift_num?t.gift_num:"")+(t.gift_unit?t.gift_unit:""):"":4==t.type||2==t.type?t.reduce_cost?t.use_condition_least_cost&&_(t.use_condition_least_cost)?t.accept_category||t.reject_category?t.accept_category?t.accept_category.length>5?"满%s减%s".sprintf(t.use_condition_least_cost,t.reduce_cost):"%s满%s减%s".sprintf(t.accept_category,t.use_condition_least_cost,t.reduce_cost):"满%s减%s".sprintf(t.use_condition_least_cost,t.reduce_cost):"全场满%s减%s".sprintf(t.use_condition_least_cost,t.reduce_cost):(t.accept_category||t.reject_category)&&t.accept_category?t.accept_category.length>5?"%s元代金券".sprintf(t.reduce_cost):"%s减%s元".sprintf(t.accept_category,t.reduce_cost):"%s元代金券".sprintf(t.reduce_cost):"":void 0;
}
function d(e){
if(4==t.data.type&&t.data.is_sns_card&&"0"==t.data.has_condition&&"0"!=e.uncheckcount)return"（本行是非自定义内容，无需填写）";
var s="";
if(2==e.type&&e.discount&&(s&&(s+="；"),s="凭此券消费打%s折".sprintf(e.discount)),3==e.type||2==e.type||4==e.type){
var _=i.fix_abstract4friendcard(e);
_&&(s&&(s+="；"),s+=_);
}
return 1==e.can_use_with_other_discount?(s&&(s+="；"),s+="可与其他优惠共享",(2==e.type||4==e.type)&&(1==e.can_use_with_membercard?(s&&(s+="；"),
s+="可与会员卡优惠共用"):"0"==e.can_use_with_membercard&&(s&&(s+="；"),s+="不可与会员卡优惠共用"))):"0"==e.can_use_with_other_discount&&(s&&(s+="；"),
s+="不可与其他优惠共享"),s||(s="（本行是非自定义内容，无需填写）"),s;
}
var r=t.data;
this.opt=t;
var u=$(t.container),p=u.find("input[type=checkbox]");
setTimeout(function(){
a.trigger("use_condition:use_condition_least_cost_checked_changed",$("#js_use_condition_least_cost_checkbox").is(":checked"));
},0);
var h=p.checkbox({
onChanged:function(t){
e(t);
}
});
if(p.filter("input:checked").each(function(){
e(this);
}),3==r.type){
var l=new n({
container:u.find(".js_use_condition_least_cost_type"),
data:[{
name:"金额",
value:1
},{
name:"指定商品",
value:2
}],
label:2==r.use_condition_least_cost_type?"指定商品":"金额",
callback:function(t){
s(t);
}
});
s(r.use_condition_least_cost_type),t.data._is_global_editting&&2!=t.data.status&&1!=t.data.status&&8!=t.data.status&&l.disable();
}
if(this.$conditions=p,this.$container=u,setInterval(function(){
var e=$("#js_editform_step1").serializeObject();
e.type=t.data.type;
var s=i.fix_abstract4friendcard(e,!1);
$("#js_use_condition_preview").text(s),s?$("#js_use_condition_preview_p").show():$("#js_use_condition_preview_p").hide(),
$("#js_title_preview_new").text(c(e));
var _=$.trim($("#js_get_limit").val());
$("#js_description_add_msg").text(_&&/^\d+$/.test(_)?"每人限领%s张".sprintf(_):""),$("#js_detail_msg").html(d(e));
},500),$("#js_use_condition_accept_category_input,#js_use_condition_reject_category_input").keyup(function(){
$(this).valid()&&$(this).closest(".js_use_condition_fix_product").find(".fail").hide();
}),t.data._is_global_editting&&2!=t.data.status&&1!=t.data.status&&8!=t.data.status&&h.disabled(!0),
$(".js_can_use_with_other_drop").length){
var f=new n({
container:$(".js_can_use_with_other_drop"),
data:[{
name:"请选择",
value:""
},{
name:"不与其它优惠共享",
value:0
},{
name:"可与其它优惠共享",
value:1
}],
callback:function(t){
1==t?$(".js_can_use_with_member_container").show():($(".js_can_use_with_member_container").hide(),
$("#js_can_use_with_membercard_hidden").val("")),$("#js_can_use_with_other_discount_hidden").val(t),
console.log(arguments);
}
});
t.data.id&&f.selected(t.data.can_use_with_other_discount?"1":"0"),t.data._is_global_editting&&2!=t.data.status&&1!=t.data.status&&8!=t.data.status&&f.disable(!0);
}
if(t.data.can_use_with_other_discount&&$(".js_can_use_with_member_container").show(),
$(".js_can_use_with_member_drop").length){
var m=new n({
container:$(".js_can_use_with_member_drop"),
data:[{
name:"请选择",
value:""
},{
name:"与会员卡优惠共用",
value:1
},{
name:"不与会员卡优惠共用",
value:0
}],
callback:function(t){
$("#js_can_use_with_membercard_hidden").val(t),console.log(arguments);
}
});
t.data.id&&m.selected(t.data.can_use_with_membercard?"1":"0"),t.data._is_global_editting&&2!=t.data.status&&1!=t.data.status&&8!=t.data.status&&m.disable(!0),
new o({
container:$(".js_can_use_with_member_question"),
reposition:!0,
content:"“与会员卡优惠共用”代表该券在买单时可以叠加会员卡折扣，积分抵扣共同使用<br><br>“不与会员卡优惠共用”则代表该券在买单时不可叠加会员卡折扣，积分抵扣，但积分赠送依旧享受<br><br>“不可与其他优惠共享”则也包含“不与会员卡优惠共用”",
type:"hover"
});
}
}
function s(t){
var e=t.offset();
e&&window.scrollTo(0,e.top);
}
var i=(t("biz_web/ui/checkbox.js"),t("cardticket/common_template_helper.js")),_=t("common/wx/Tips.js"),n=t("biz_web/ui/dropdown.js"),c=t("common/qq/events.js"),o=t("common/wx/tooltips.js"),a=c(!0);
return e.prototype.isValid=function(){
if(4==this.opt.data.type&&this.opt.data.has_condition){
var t=0;
if(this.$conditions.each(function(){
$(this).prop("checked")&&t++;
}),0==t)return _.err("请选择使用条件"),s(this.$container),!1;
}
return!0;
},e;
});