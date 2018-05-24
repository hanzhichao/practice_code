define("cardticket/detail/edit_detail.js",["cardticket/add/member_detail.js","cardticket/add/member_time.js","biz_common/jquery.validate.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/stopMultiRequest.js","cardticket/common_validate.js"],function(e){
"use strict";
function t(e){
for(var t in e)e[t]=$.trim(e[t]);
return e;
}
function i(e){
var i=e.data;
this.opt=e,this.$dom=$(e.container);
{
var s=this;
new r({
data:i
}),new o({
data:i
});
}
$(".js_edit_detail_cancel",this.$dom).click(function(){
s.hide();
}),this.$dom.validate({
rules:{
service_phone:{
required:!0
},
discount:{
discount:!0
},
prerogative:{
required:!0
},
description:{
required:!0,
byteMaxLength:600
},
bonus_rules:{
bonus_rules:!0,
byteMaxLength:600
}
},
messages:{
description:{
required:"使用须知不能为空且长度不超过300个汉字",
byteMaxLength:"使用须知不能为空且长度不超过300个汉字"
},
service_phone:{
required:"客服电话不能为空",
byteMaxLength:"客服电话长度不超过15个汉字或30个英文字母/数字"
},
discount:"折扣额度只能是大于0.1且小于10的数字",
prerogative:{
required:"特权说明不能为空"
},
bonus_rules:"积分规则不能为空且长度不超过300个汉字"
},
errorPlacement:function(e,t){
if("code_type"==t.attr("name")){
var i=t.parent();
return void i.append(e);
}
var r=t.closest(".frm_control_group");
r.find(".fail").remove();
var o=r.find(".frm_tips");
t.is(".file_field")?e.insertBefore(r.find(".upload_preview")):o.length?e.insertBefore(o):r.append(e);
},
ignore:[],
submitHandler:function(){}
}),$("#js_hidden_begintime").closest(".frm_control_group").remove(),$(".js_edit_detail_submit",this.$dom).click(function(){
var e=s.$dom;
if(!e.valid())return!1;
var i=e.serializeObject();
return i=t(i),10!=s.opt.data.type||i.supply_bonus||i.supply_discount?(i.discount&&(i.discount=10*i.discount),
void d.post({
url:"/merchant/electroniccardmgr",
data:i,
btn:this
},function(e){
0==e.base_resp.ret?(n.suc("会员卡详情修改成功"),location.reload()):d.handleRet(e,{
id:64463,
key:31,
url:"/merchant/electroniccardmgr"
});
})):void n.err("请至少选择一种会员卡优惠类型");
});
}
var r=e("cardticket/add/member_detail.js"),o=e("cardticket/add/member_time.js"),n=(e("biz_common/jquery.validate.js"),
e("common/wx/Tips.js")),d=e("common/wx/Cgi.js");
return e("common/wx/stopMultiRequest.js"),e("cardticket/common_validate.js"),i.prototype.show=function(){
var e=this.opt.onshow;
this.$dom.show(),e&&e();
},i.prototype.hide=function(){
var e=this.opt.onhide;
this.$dom.hide(),e&&e();
},i;
});