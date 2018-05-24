define("wxverify/confirmName_141210.js",["common/wx/dialog.js","biz_common/jquery.validate.js","common/wx/Cgi.js","common/wx/Tips.js"],function(e){
"use strict";
var i=e("common/wx/dialog.js"),t=(e("biz_common/jquery.validate.js"),wx.T,e("common/wx/Cgi.js")),r=e("common/wx/Tips.js");
$("#wxverify_confirm").html(template.render("confirm_form",{
nick_name:wx.cgiData.data.nick_name,
remark:$("#jsRemark").text()||""
})),$("#confirm_name").validate({
rules:{
nick_name:{
required:!0,
byteRangeLength:[4,32]
}
},
messages:{
nick_name:{
required:"认证后公众号名称为2到16个字",
byteRangeLength:"认证后公众号名称为2到16个字"
}
},
submitHandler:function(e){
$("#js_submit").blur();
var n=$.trim($("#nick_name").blur().val()),a=$(e).serializeObject();
a.refill_type=1,i.show({
type:"warn",
mask:!0,
msg:"你的公众号名称是“%s”|请确认已经跟认证机构沟通，一旦提交，你将消耗一次重填的机会。".sprintf(n.html()),
buttons:[{
text:"确定",
click:function(){
var e=this;
t.post({
url:"/acct/wxverify?action=submit_refill",
data:a
},function(e){
"0"!=e.base_resp.ret?"200039"==e.base_resp.ret&&r.err("认证后公众号名称为2到16个字"):location.href=wx.url("/merchant/order?action=detail&t=service/detail&order_id="+wx.cgiData.order_id);
}),e.hide();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
}
});
});