define("cardticket/tools_send_coupon_rule.js",["common/wx/Cgi.js","common/wx/pagebar.js","common/wx/popup.js","common/wx/Tips.js","common/wx/inputCounter.js","common/wx/dialog.js","biz_web/ui/checkbox.js","biz_web/ui/dateRange.js","biz_common/moment.js","cardticket/topmenu.js","cardticket/tools/tools_cgi.js","cardticket/send_card.js"],function(i){
"use strict";
var t=i("common/wx/Cgi.js"),e=(i("common/wx/pagebar.js"),i("common/wx/popup.js"),
i("common/wx/Tips.js")),n=(i("common/wx/inputCounter.js"),i("common/wx/dialog.js")),o=(i("biz_web/ui/checkbox.js"),
i("biz_web/ui/dateRange.js")),d=i("biz_common/moment.js");
i("cardticket/topmenu.js").selected("cardtools");
var c=i("cardticket/tools/tools_cgi.js"),s=i("cardticket/send_card.js"),a="get_add_rule_page"===wx.cgiData.action;
template.helper("formatPrice",function(i){
return(i/100).toFixed(2);
});
var r={};
r.mchid={
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
m.show(),_.hide(),u.hide(),l.hide();
}
function e(){
m.hide(),_.show(),u.show(),l.hide();
}
function n(){
m.hide(),_.hide(),u.hide(),l.show();
}
function o(i){
i?(r.hide(),s.show(),a.val("").focus(),h.hide(),e()):(r.show(),s.hide());
}
var d=this,s=$(".js_mchid_bind_wrap"),a=$(".js_mchid_bind_input"),r=$(".js_mchid_bind"),_=$(".js_mchid_bind_add"),u=$(".js_mchid_bind_cancel"),h=$(".js_mchid_bind_err"),m=$(".js_mchid_bind_loading"),l=$(".js_mchid_bind_success");
r.click(function(){
o(!0);
}),u.click(function(){
o(!1);
}),_.click(function(){
var s=a.val();
return 0===s.length?void h.text("请输入商户号").show():-1!==d._list.indexOf(s)?void h.text("请勿添加重复商户号").show():/^\d+$/.test(s)?(t(),
void c.addMchid({
mchid:s,
success:function(){
n(),setTimeout(function(){
l.fadeOut(300,function(){
i(s),o(!1);
});
},700);
},
error:function(){
e();
}
})):void h.text("请输入正确格式").show();
}),a.on("input",function(){
h.hide();
});
},
init:function(i){
var t=$(".js_mchid_list");
this.$err=t.closest(".js_frm").find(".js_err");
var e=this,n=[],o=[],d=[];
this._list=[],$.each(i.mchid_list,function(t,c){
e._list.push(c.mchid),a?c.bind_rule_id?o.push(c):n.push(c):c.bind_rule_id?c.bind_rule_id&&c.bind_rule_id!=i.base_info.rule_id?o.push(c):d.push(c):n.push(c);
}),t.html(template.render("tpl_mchid_list",{
available_mchid_list:n,
unavailable_mchid_list:o,
checked_mchid_list:d
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
var t=this._wording.valid;
return 0==i.length?t.required:/^\d+(\.\d{1,2})?$/.test(i)&&0!=parseFloat(i)?void 0:t.format;
},
init:function(){
function i(){
$(".js_condition_item").length<=1?$(".js_condition_remove_item").hide():$(".js_condition_remove_item").show();
}
var t=this;
this._wording={
err:{
noCard:"请选择要赠送的卡券",
duplicatedData:"规则满赠金额不能重复"
},
valid:{
required:"请输入金额",
format:"请输入大于0的金额，小数点后最多两位"
}
},$(".js_condition_add").click(function(){
$($.trim(template.render("tpl_condition_item",{}))).appendTo($(".js_condition_list")),
i();
}),$(".js_condition_list").on("click",".js_condition_remove_item",function(){
$(this).parents(".js_condition_item").remove(),i();
}),$(".js_condition_list").on("click",".js_condition_choose_init, .js_condition_choose_redo",function(){
var i=$(this).parents(".js_condition_item"),n=i.find(".js_err"),o=new s({
multi:!1,
data:null,
filter_out_expired_card:1,
neednew:!1,
noexpire:!0,
sns_card_type:0,
param:{
status:"1|2|3|6|8",
is_filter_out_apicard:1,
flag:wx.cgiData.ispay
},
selectComplete:function(o){
o?o.quantity<=0?e.err("卡券库存为0，请添加库存"):(i.data("cardid",o.cardid),i.find(".js_condition_card_title").text(o.title).show(),
i.find(".js_condition_choose_init").hide(),i.find(".js_condition_choose_redo").show(),
n.text()==t._wording.err.noCard&&n.hide(),this.hide()):e.err("请选择卡券");
}
});
o.show();
}),$(".js_condition_list").on("focus input",".js_condition_amount",function(){
var i=$(this).parents(".js_condition_item").find(".js_err");
i.text()!=t._wording.err.noCard&&i.hide();
}),$(".js_condition_add").click();
},
getData:function(){
var i=this,t=[],e=!0,n={};
return $(".js_condition_item").each(function(o,d){
var c=$(d).data("cardid"),s=$(d).find(".js_condition_amount").val(),a=i._valid(s),r=$(this).find(".js_err");
a||!c?(e=!1,r.show().text(c?a:i._wording.err.noCard)):t.push({
card_id:$(d).data("cardid"),
amount:Math.round(100*parseFloat(s))
}),n[s]?n[s].isShowErr||(r.text(i._wording.err.duplicatedData).show(),e=!1,n[s].isShowErr=!0):n[s]={
isShowErr:!1
};
}),e?t:void 0;
}
},r.date={
init:function(){
var i=(new Date,this);
this.$err=$(".js_begin_time").closest(".js_frm").find(".js_err"),o({
isTodayValid:!0,
minValidDate:Math.floor(d().subtract(1,"d").valueOf()/1e3),
maxValidDate:d("2038-1-1").valueOf()/1e3,
monthRangeMax:300,
calendars:2,
stopToday:!1,
theme:"ta",
container:".js_begin_time",
startDate:this.begin_time,
endDate:this.end_time,
success:function(t){
i.$err.hide(),i.begin_time=t.startDate,i.end_time=t.endDate;
}
}),$("#js_dateRangeTitle0").text("选择时间");
},
getData:function(){
return this.begin_time&&this.end_time?{
begin_time:d(this.begin_time).unix(),
end_time:d(this.end_time).add(86399,"s").unix()
}:void this.$err.text("请选择有效期").show();
}
};
var _=function(i){
function o(){
var o={
100005:"规则已过期",
100006:"该券已过期，请重新选择",
100007:"规则已被删除",
100008:"规则失效",
100009:"规则id非法",
100010:"商户号未与该appid绑定"
};
$.each(r,function(t,e){
a||"mchid"==t?e.init(i):delete r[t];
}),a||($(".js_begin_time_show").text(d(1e3*i.base_info.begin_time).format("YYYY-MM-DD")+"至"+d(1e3*i.base_info.end_time).format("YYYY-MM-DD")),
$(".js_detail").html(template.render("tpl_detail",i))),$(".js_submit").click(function(){
function d(){
t.post({
url:"/merchant/paygiftcard?action="+("get_add_rule_page"==i.action?"add_rule":"update_rule"),
data:{
data:JSON.stringify(u)
}
},function(i){
if(!i)return void e.err("系统错误，请稍后重试");
var t=i.base_resp.ret;
if(0!=t)return void e.err(o[t]||"系统错误，请稍后重试");
if(!i.succ_list||0===i.succ_list.length)return e.err("商户号不可用，请重新选择"),void setTimeout(function(){
location.reload();
},500);
if(e.suc(a?"创建成功":"修改成功"),i.fail_list&&i.fail_list.length>0){
var d=[];
$.each(i.fail_list,function(i,t){
d.push(t.mchid);
}),n.show({
type:"info",
title:"提示",
msg:"以下商户号配置失效|"+d.join("、"),
buttons:[{
text:"关闭",
type:"normal",
click:function(){
this.hide(),location.href=wx.url("/merchant/paygiftcard?action=authority&type=4");
}
},{
text:"查看",
type:"primary",
click:function(){
this.hide(),location.href=wx.url("/merchant/paygiftcard?action=get_rule_info&rule_id=%s&type=4".sprintf(i.rule_id));
}
}]
});
}else setTimeout(function(){
location.href=wx.url("/merchant/paygiftcard?action=authority&type=4");
},500);
});
}
if(!wx.cgiData.is_can_use_pay_gift_card)return void e.err("当前不允许修改规则");
var c={},s=!0;
$(".js_err").hide();
for(var _ in r)s=(c[_]=r[_].getData())&&s;
if(s){
var u={
type:4,
base_info:{
mchid_list:c.mchid,
begin_time:a?c.date.begin_time:i.base_info.begin_time,
end_time:a?c.date.end_time:i.base_info.end_time
},
single_pay:{
info_list:a?c.condition:i.single_pay.info_list.map(function(i){
return{
card_id:i.card_id,
amount:i.amount
};
})
}
};
a||(u.base_info.rule_id=i.base_info.rule_id);
a?n.show({
type:"info",
title:"提示",
msg:"提交后，除商户号外不可修改其他信息，是否确认提交？",
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.hide(),d();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
}):d();
}
});
}
return{
init:o
};
}(wx.cgiData);
_.init();
});