define("cardticket/tools_send_membercard.js",["common/wx/Cgi.js","common/wx/pagebar.js","common/wx/Tips.js","common/wx/dialog.js","biz_common/moment.js","common/wx/popover.js","common/wx/popup.js","cardticket/clickreport.js","cardticket/topmenu.js","cardticket/tools/tools_cgi.js"],function(t){
"use strict";
function e(t,i,o){
a.getRuleList({
effective:t,
page:i,
type:1,
success:function(n){
new c({
container:".js_page",
perPage:s,
totalItemsNum:n.total_count,
initShowPage:i,
first:!1,
last:!1,
isSimple:!0,
callback:function(c){
e(t,c.currentPage,o);
}
});
o&&o(n,t);
}
});
}
var c=(t("common/wx/Cgi.js"),t("common/wx/pagebar.js")),i=t("common/wx/Tips.js"),o=t("common/wx/dialog.js"),n=t("biz_common/moment.js"),r=t("common/wx/popover.js"),s=(t("common/wx/popup.js"),
t("cardticket/clickreport.js"),10);
t("cardticket/topmenu.js").selected("cardsend");
var a=t("cardticket/tools/tools_cgi.js");
template.helper("joinMchid",function(t){
return"string"==typeof t?t:t.join(",");
}),template.helper("formatTime",function(t){
return n(1e3*t).format("YYYY-MM-DD");
}),template.helper("makeModifyUrl",function(t){
return wx.url("/merchant/paygiftcard?action=get_update_rule_page&rule_id=%s&type=1".sprintf(t));
}),template.helper("makeDetailUrl",function(t){
return wx.url("/merchant/paygiftcard?action=get_rule_info&rule_id=%s&type=1".sprintf(t));
});
var l=function(){
function t(t,e){
t.effective=e,$(".js_list").html(template.render("tpl_rule_list",t));
}
function c(){
$(".js_add").click(function(){
$(this).hasClass("btn_disabled")||(location.href=wx.url("/merchant/paygiftcard?action=get_add_rule_page&type=1"));
}),$(".js_tab_toggle").click(function(){
$(".js_tab_toggle").parent().removeClass("selected"),$(this).parent().addClass("selected");
var c=$(this).data("effective");
e(c,1,t),1==c?$(".js_add").addClass("btn_primary").removeClass("btn_disabled"):$(".js_add").removeClass("btn_primary").addClass("btn_disabled");
}),$(".js_list").on("click",".js_remove",function(){
var t=$(this).data("id");
o.show({
title:"删除规则",
msg:"删除规则|确定要删除这条规则？",
type:"warn",
buttons:[{
text:"确定",
type:"normal",
click:function(){
var e=this.dom.find(".js_btn:eq(0)");
e.btn(!1),a.deleteRule({
rule_id:t,
type:1,
success:function(){
i.suc("删除成功"),setTimeout(function(){
location.href=wx.url("/merchant/paygiftcard?action=authority&type=1");
},500);
},
error:function(){
i.err("删除失败");
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
function n(){
$(".js_check_mchid").on("click",function(){
$("#tpl_check_mchid").popup({
title:"商户号验证",
className:"popup_check_mchid",
buttons:[{
text:"确定",
type:"primary",
click:function(){
var t=this.$dialogWrp.find(".js_check_mchid_input").val();
if(0===t.length)return void i.err("请输入商户号");
if(!/^\d+$/.test(t))return void i.err("请输入正确格式").show();
var e=this.$dialogWrp.find(".js_btn").eq(0);
e.btn(!1),a.addMchid({
mchid:t,
success:function(){
i.suc("验证成功"),setTimeout(function(){
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
$("#js_membercard_demo").hover(function(){
new r({
content:$("#js_membercard_demo_tpl").html(),
dom:$("#js_membercard_demo"),
hover:!0,
addCls:"qr_popover"
});
}),$(".js_check_mchid")&&n(),e(1,1,t),c();
}
return{
init:s
};
}(wx.cgiData);
l.init();
});