define("cardticket/tools_send_coupon_detail.js",["common/wx/Cgi.js","common/wx/pagebar.js","common/wx/Tips.js","common/wx/dialog.js","biz_common/moment.js","cardticket/topmenu.js","cardticket/tools/tools_cgi.js"],function(t){
"use strict";
var e=(t("common/wx/Cgi.js"),t("common/wx/pagebar.js"),t("common/wx/Tips.js")),n=t("common/wx/dialog.js"),o=t("biz_common/moment.js");
t("cardticket/topmenu.js").selected("cardtools");
var i=t("cardticket/tools/tools_cgi.js");
template.helper("formatTime",function(t){
return o(1e3*t).format("YYYY-MM-DD HH:mm");
}),template.helper("formatPrice",function(t){
return(t/100).toFixed(2);
}),template.helper("formatDate",function(t){
return o(1e3*t).format("YYYY-MM-DD");
}),template.helper("makeModifyUrl",function(t){
return wx.url("/merchant/paygiftcard?action=get_update_rule_page&rule_id=%s&type=4".sprintf(t));
}),template.helper("getTips",function(t){
var e={
RULE_STATUS_DELETE:"本规则已删除",
RULE_STATUS_EXPIRED:"本规则已过期",
RULE_STATUS_INVALID_CARD:"本规则配置的卡券失效",
RULE_STATUS_SAME_AMOUNT:"本规则与其他规则冲突"
};
return e[t];
}),template.helper("joinMchid",function(t){
return"string"==typeof t?t:t.join(",");
});
var r=function(t){
function r(){
var e=$.extend(!0,{},t);
e.rule_str="消费满%s元".sprintf((t.single_pay.amount/100).toFixed(2)),$(".js_container").html(template.render("tpl_container",e));
}
function c(){
$(".js_remove").click(function(){
n.show({
title:"删除规则",
msg:"删除规则|确定要删除这条规则？",
type:"warn",
buttons:[{
text:"确定",
type:"normal",
click:function(){
var n=this.dom.find(".js_btn:eq(0)");
n.btn(!1),i.deleteRule({
rule_id:t.base_info.rule_id,
type:4,
success:function(){
e.suc("删除成功"),setTimeout(function(){
location.href=wx.url("/merchant/paygiftcard?action=authority&type=4");
},500);
},
error:function(){
e.err("删除失败");
},
complete:function(){
n.btn(!0);
}
});
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
});
}
function m(){
r(),c(),$(".js_create_time").text(o(1e3*t.create_time).format("YYYY-MM-DD HH:mm")),
$(".js_begin_end_time").text(o(1e3*t.begin_time).format("YYYY-MM-DD")+"至"+o(1e3*t.end_time).format("YYYY-MM-DD")),
$(".js_least_cost_num").text(t.least_cost/100);
}
return{
init:m
};
}(wx.cgiData);
r.init();
});