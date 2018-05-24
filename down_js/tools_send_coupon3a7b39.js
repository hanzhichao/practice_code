define("cardticket/tools_send_coupon.js",["common/wx/Cgi.js","common/wx/pagebar.js","common/wx/Tips.js","common/wx/dialog.js","biz_common/moment.js","common/wx/popover.js","common/wx/popup.js","cardticket/clickreport.js","cardticket/topmenu.js","cardticket/tools/tools_cgi.js"],function(t){
"use strict";
function e(t,n,c){
a.getRuleList({
effective:t,
page:n,
type:4,
success:function(i){
new o({
container:".js_page",
perPage:s,
totalItemsNum:i.total_count,
initShowPage:n,
first:!1,
last:!1,
isSimple:!0,
callback:function(o){
e(t,o.currentPage,c);
}
});
c&&c(i,t);
}
});
}
{
var o=(t("common/wx/Cgi.js"),t("common/wx/pagebar.js")),n=t("common/wx/Tips.js"),c=t("common/wx/dialog.js"),i=t("biz_common/moment.js"),r=t("common/wx/popover.js");
t("common/wx/popup.js"),t("cardticket/clickreport.js");
}
t("cardticket/topmenu.js").selected("cardtools");
var a=t("cardticket/tools/tools_cgi.js"),s=10;
template.helper("joinArray",function(t){
return"string"==typeof t?t:t.join(",");
}),template.helper("getRowspan",function(t){
var e=t.single_pay.info_list;
return e&&e.length>1?e.length:1;
}),template.helper("formatTime",function(t){
return i(1e3*t).format("YYYY-MM-DD");
}),template.helper("makeDetailUrl",function(t){
return wx.url("/merchant/paygiftcard?action=get_rule_info&rule_id=%s&type=4".sprintf(t));
}),template.helper("formatPrice",function(t){
return(t/100).toFixed(2);
}),template.helper("getTips",function(t){
var e={
RULE_STATUS_DELETE:"已删除",
RULE_STATUS_EXPIRED:"已过期",
RULE_STATUS_INVALID_CARD:"卡券失效",
RULE_STATUS_SAME_AMOUNT:"冲突"
};
return e[t];
});
var l=function(){
function t(t,e){
t.effective=e,$(".js_list").html(template.render("tpl_rule_list",t));
}
function o(){
$(".js_add").click(function(){
return wx.cgiData.is_can_use_pay_gift_card?void(location.href=wx.url("/merchant/paygiftcard?action=get_add_rule_page&type=4")):(n.err("当前不允许新增规则"),
!1);
}),$(".js_list").on("click",".js_add",function(){
return wx.cgiData.is_can_use_pay_gift_card?void(location.href=wx.url("/merchant/paygiftcard?action=get_add_rule_page&type=4")):(n.err("当前不允许新增规则"),
!1);
}),$(".js_tab_toggle").click(function(){
$(".js_tab_toggle").parent().removeClass("selected"),$(this).parent().addClass("selected");
var o=$(this).data("effective");
e(o,1,t);
}),$(".js_list").on("click",".js_remove",function(){
var t=$(this).data("id");
c.show({
title:"删除规则",
msg:"删除规则|删除后规则将立即失效，确定要删除本条规则？",
type:"warn",
buttons:[{
text:"确定",
type:"normal",
click:function(){
var e=this.dom.find(".js_btn:eq(0)");
e.btn(!1),a.deleteRule({
rule_id:t,
type:4,
success:function(){
n.suc("删除成功"),setTimeout(function(){
location.href=wx.url("/merchant/paygiftcard?action=authority&type=4");
},500);
},
error:function(){
n.err("删除失败");
},
complete:function(){
e.btn(!0);
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
function i(){
$(".js_check_mchid").on("click",function(){
$("#tpl_check_mchid").popup({
title:"商户号验证",
className:"popup_check_mchid",
buttons:[{
text:"确定",
type:"primary",
click:function(){
var t=this.$dialogWrp.find(".js_check_mchid_input").val();
if(0===t.length)return void n.err("请输入商户号");
if(!/^\d+$/.test(t))return void n.err("请输入正确格式").show();
var e=this.$dialogWrp.find(".js_btn").eq(0);
e.btn(!1),a.addMchid({
mchid:t,
success:function(){
n.suc("验证成功"),setTimeout(function(){
location.reload();
},500);
},
complete:function(){
e.btn(!0);
}
});
}
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}],
onShow:function(){
this.$dialogWrp.find(".js_check_mchid_input").val("").focus();
}
});
});
}
function s(){
$("#js_coupon_demo").hover(function(){
new r({
content:$("#js_coupon_demo_tpl").html(),
dom:$("#js_coupon_demo"),
hover:!0,
addCls:"qr_popover"
});
}),$(".js_check_mchid")&&i(),e(1,1,t),o();
}
return{
init:s
};
}(wx.cgiData);
l.init();
});