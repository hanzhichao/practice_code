define("cardticket/apply_mp_highlevel.js",["common/wx/dialog.js","common/wx/Tips.js","common/wx/Cgi.js","cardticket/common_init.js","cardticket/fee_account_activate.js"],function(t){
"use strict";
var e=t("common/wx/dialog.js"),a=t("common/wx/Tips.js"),c=t("common/wx/Cgi.js");
$("#js_paycard_open").click(function(){
var t=$(this).attr("data-action"),a=$(this).attr("data-can");
if(0==a){
var c=[{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}];
e.show({
title:"提示",
type:"info",
msg:template.render("js_"+t),
buttons:c
});
}else location.href=wx.url("/merchant/paymentcardapply?action=check&t=cardticket/info");
}),$("#js_money_quota_permonth").text(parseInt(wx.cgiData.money_quota_permonth/1e4/100)),
t("cardticket/common_init.js"),$(".js_apply_assistsend_card").click(function(){
$("#js_apply_assistsend_tpl").popup({
title:"开通权限",
buttons:[{
text:"开通",
type:"primary",
click:function(){
var t=$("#js_agree_apply_assistsend").prop("checked");
return t?void c.post({
url:"/merchant/cardapply",
data:{
action:"apply_help_make_and_send"
}
},function(t){
0==t.base_resp.ret?(a.suc("已开通"),location.reload()):c.show(t);
}):void a.err("请先同意并遵守《微信公众平台卡券功能开发者服务协议》");
}
},{
text:"取消",
click:function(){
this.hide();
}
}],
autoShow:!0,
onHide:function(){
this.remove();
}
}),$("#js_agree_apply_assistsend").checkbox();
}),$(".js_membercard_open").click(function(){
c.post({
url:"/merchant/cardapply",
data:{
action:"apply_membercard"
}
},function(t){
0==t.base_resp.ret?(a.suc("已开通"),location.reload()):c.show(t);
});
}),function(){
var e=t("cardticket/fee_account_activate.js");
new e({
container:"#js_activate_fee_acct",
success:function(t){
location.href=wx.url("/merchant/cardmoneymgr?action=get_order_flow&reward="+t);
}
});
}();
});