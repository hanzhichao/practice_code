define("cardticket/tools_send_membercard_rule.js",["common/wx/Cgi.js","common/wx/pagebar.js","common/wx/popup.js","common/wx/Tips.js","common/wx/inputCounter.js","common/wx/dialog.js","biz_web/ui/checkbox.js","biz_web/ui/dateRange.js","biz_common/moment.js","cardticket/topmenu.js","cardticket/tools/tools_cgi.js","cardticket/send_card.js"],function(i){
"use strict";
var t=i("common/wx/Cgi.js"),e=(i("common/wx/pagebar.js"),i("common/wx/popup.js"),
i("common/wx/Tips.js")),n=(i("common/wx/inputCounter.js"),i("common/wx/dialog.js")),d=(i("biz_web/ui/checkbox.js"),
i("biz_web/ui/dateRange.js")),c=i("biz_common/moment.js");
i("cardticket/topmenu.js").selected("cardsend");
var o=i("cardticket/tools/tools_cgi.js"),s=i("cardticket/send_card.js"),r={};
r.membercard={
init:function(i){
function t(i){
i?(n.show(),d.hide(),c.text(i),r.$err.hide()):(n.hide(),d.show());
}
var n=$(".js_has_membercard"),d=$(".js_no_membercard"),c=$(".js_has_membercard_title"),o=$(".js_choose_card");
this.$err=n.closest(".js_frm").find(".js_err");
var r=this;
t(i.title),i.card_id&&(this._card_id=i.card_id),o.click(function(){
var i=new s({
multi:!1,
data:null,
hide_tips:!0,
hide_valid_date:!0,
param:{
only_need_member_card:1
},
selectComplete:function(i){
return i?(r._card_id=i.cardid,t(i.title),void this.hide()):void e.err("请选择会员卡");
}
});
i.show();
});
},
getData:function(){
return this._card_id?this._card_id:void this.$err.text("请选择会员卡").show();
}
},r.mchid={
_initBind:function(){
function i(i){
$($.trim(template.render("tpl_mchid_item",{
mchid:i,
is_checked:!0
}))).insertBefore($(".js_mchid_bind")).find("input").checkbox({
multi:!0
});
}
function t(){
m.show(),_.hide(),h.hide(),l.hide();
}
function e(){
m.hide(),_.show(),h.show(),l.hide();
}
function n(){
m.hide(),_.hide(),h.hide(),l.show();
}
function d(i){
i?(a.hide(),s.show(),r.val("").focus(),u.hide(),e()):(a.show(),s.hide());
}
var c=this,s=$(".js_mchid_bind_wrap"),r=$(".js_mchid_bind_input"),a=$(".js_mchid_bind"),_=$(".js_mchid_bind_add"),h=$(".js_mchid_bind_cancel"),u=$(".js_mchid_bind_err"),m=$(".js_mchid_bind_loading"),l=$(".js_mchid_bind_success");
a.click(function(){
d(!0);
}),h.click(function(){
d(!1);
}),_.click(function(){
var s=r.val();
return 0===s.length?void u.text("请输入商户号").show():-1!==c._list.indexOf(s)?void u.text("请勿添加重复商户号").show():/^\d+$/.test(s)?(t(),
void o.addMchid({
mchid:s,
success:function(){
n(),setTimeout(function(){
l.fadeOut(300,function(){
i(s),d(!1);
});
},700);
},
error:function(){
e();
}
})):void u.text("请输入正确格式").show();
}),r.on("input",function(){
u.hide();
});
},
init:function(i){
var t=$(".js_mchid_list");
this.$err=t.closest(".js_frm").find(".js_err");
var e=this,n=[],d=[],c=[];
this._list=[],$.each(i.mchid_list,function(t,o){
e._list.push(o.mchid),i.rule_id?o.bind_rule_id?o.bind_rule_id&&o.bind_rule_id!=i.rule_id?d.push(o):c.push(o):n.push(o):o.bind_rule_id?d.push(o):n.push(o);
}),t.html(template.render("tpl_mchid_list",{
available_mchid_list:n,
unavailable_mchid_list:d,
checked_mchid_list:c
})).find('input[type="checkbox"]').on("change",function(){
e.$err.hide();
}).checkbox({
multi:!0
}),this._initBind();
},
getData:function(){
var i=$(".js_mchid_input:checked").checkbox("values");
return i.length>0?i:void this.$err.text("请选择商户号").show();
}
},r.condition={
_valid:function(i){
return 0==i.length?"请输入数字":/^\d+(\.\d{1,2})?$/.test(i)?0==parseFloat(i)?"请输入一个大于0的数字":void 0:"请输入正确的数字，小数点后最多两位";
},
init:function(i){
var t=$(".js_condition_radio"),e=$(".js_condition_limit_wrap"),n=$(".js_condition_limit_num"),d=this.$inputErr=$(".js_condition_limit_err"),c=this.$err=t.closest(".js_frm").find(".js_err"),o=this;
t.checkbox({
multi:!1
}),t.click(function(){
c.hide(),"has-limit"==$(this).data("type")?(e.show(),n.focus()):e.hide();
}),n.on("blur",function(){
var i=o._valid($(this).val());
i?d.text(i).show():d.hide();
}).on("focus input",function(){
d.hide();
}),i.rule_id&&(i.least_cost>0?($('.js_condition_radio[data-type="has-limit"]').click(),
n.val(i.least_cost/100).blur()):$('.js_condition_radio[data-type="no-limit"]').click());
},
getData:function(){
var i=$(".js_condition_radio:checked");
if(0==i.length)this.$err.text("请选择消费条件").show();else{
if("no-limit"==$(".js_condition_radio:checked").data("type"))return{
num:0
};
if("has-limit"==$(".js_condition_radio:checked").data("type")){
var t=$(".js_condition_limit_num").val(),e=this._valid(t);
if(!e)return this.$inputErr.hide(),{
num:Math.round(100*parseFloat(t))
};
this.$inputErr.text(e).show();
}
}
}
},r.date={
init:function(i){
var t=(new Date,this);
this.$err=$(".js_begin_time").closest(".js_frm").find(".js_err"),i.rule_id&&(this.begin_time=c(i.begin_time).format("YYYY-MM-DD"),
this.end_time=c(i.end_time).format("YYYY-MM-DD")),d({
isTodayValid:!0,
minValidDate:Math.floor(c().subtract(1,"d").valueOf()/1e3),
maxValidDate:c("2038-1-1").valueOf()/1e3,
monthRangeMax:300,
calendars:2,
stopToday:!1,
theme:"ta",
container:".js_begin_time",
startDate:this.begin_time,
endDate:this.end_time,
success:function(i){
t.$err.hide(),t.begin_time=i.startDate,t.end_time=i.endDate;
}
}),i.rule_id||$("#js_dateRangeTitle0").text("选择时间");
},
getData:function(){
return this.begin_time&&this.end_time?{
begin_time:c(this.begin_time).unix(),
end_time:c(this.end_time).add(86399,"s").unix()
}:void this.$err.text("请选择有效期").show();
}
};
var a=function(i){
function d(){
var d={
100005:"规则已过期",
100006:"卡券非法",
100007:"规则已被删除",
100008:"规则失效",
100009:"规则id非法",
100010:"商户号未与该appid绑定"
};
$.each(r,function(t,e){
e.init(i);
}),$(".js_submit").click(function(){
var c=this,o={},s=!0;
for(var a in r)o[a]=r[a].getData(),o[a]||(s=!1);
if(s){
var _={
type:1,
base_info:{
mchid_list:o.mchid,
begin_time:o.date.begin_time,
end_time:o.date.end_time
},
member_rule:{
card_id:o.membercard,
least_cost:o.condition.num
}
};
i.rule_id&&(_.base_info.rule_id=i.rule_id),$(this).btn(!1),t.post({
url:"/merchant/paygiftcard?action="+("get_add_rule_page"==i.action?"add_rule":"update_rule"),
data:{
data:JSON.stringify(_)
}
},function(i){
if($(c).btn(!0),!i)return void e.err("系统错误，请稍后重试");
var t=i.base_resp.ret;
if(0!=t)return void e.err(d[t]||"系统错误，请稍后重试");
if(!i.succ_list||0===i.succ_list.length)return e.err("商户号不可用，请重新选择"),void setTimeout(function(){
location.reload();
},500);
if(e.suc("已创建模版"),i.fail_list&&i.fail_list.length>0){
var o=[];
$.each(i.fail_list,function(i,t){
o.push(t.mchid);
}),n.show({
type:"info",
title:"提示",
msg:"以下商户号配置失效|"+o.join("、"),
buttons:[{
text:"关闭",
type:"normal",
click:function(){
this.hide(),location.href=wx.url("/merchant/paygiftcard?action=authority&type=1");
}
},{
text:"查看",
type:"primary",
click:function(){
this.hide(),location.href=wx.url("/merchant/paygiftcard?action=get_rule_info&rule_id=%s&type=1".sprintf(i.rule_id));
}
}]
});
}else setTimeout(function(){
location.href=wx.url("/merchant/paygiftcard?action=authority&type=1");
},500);
});
}
});
}
return{
init:d
};
}(wx.cgiData);
a.init();
});