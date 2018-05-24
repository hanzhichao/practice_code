define("cardticket/apply_index.js",["common/wx/tooltips.js","biz_web/ui/checkbox.js","common/wx/Tips.js","biz_common/moment.js","common/wx/dialog.js","tpl/cardticket/select_role.html.js","common/wx/popup.js","cardticket/common_init.js","cardticket/clickreport.js"],function(e){
"use strict";
{
var t=wx.cgiData.apply_data,o=e("common/wx/tooltips.js"),n=(e("biz_web/ui/checkbox.js"),
e("common/wx/Tips.js"));
e("biz_common/moment.js");
}
t&&"string"==typeof t.refuse_reason&&(t.refuse_reason=t.refuse_reason.replace(/&lt;br\s*\/?&gt;/g,"<br/>")),
$("#js_status").html(template.render("js_status_tpl",t)),$("#js_apply_btn").prepend(template.render("js_apply_btn_tpl",t));
{
var c=(new o({
container:$("#js_refuse_reason"),
content:t.refuse_reason,
type:"hover"
}),e("common/wx/dialog.js")),p=e("tpl/cardticket/select_role.html.js");
e("common/wx/popup.js");
}
$(".js_apply").click(function(){
if(!t.can_apply)return c.show({
msg:"注意：你未达到申请条件，无法申请该功能|请参考该功能的申请条件，满足条件后可以申请功能",
title:"提示",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}],
type:"info"
}),!1;
{
var e=$(p).popup({
title:"选择角色",
autoShow:!0,
onHide:function(){
this.remove();
},
width:960
}),o=e.popup("get"),s=o.find(".js_agree_deal");
o.find(".js_agree_deal").checkbox();
}
return o.on("click",".js_apply_assistsend",function(){
return s.prop("checked")?(window.open(wx.url("/merchant/cardapply?action=listapply&view_mode=2")),
void e.popup("hide")):(n.err("请同意卡券功能开发者服务协议"),!1);
}).on("click",".js_apply_normal",function(){
window.open(wx.url("/merchant/cardapply?action=listapply&view_mode=1")),e.popup("hide");
}),!1;
}),e("cardticket/common_init.js");
e("cardticket/clickreport.js");
});