define("wxverify/invoice_edit.js",["biz_web/ui/checkbox.js","wxverify/init.js","biz_web/utils/upload.js","common/wx/region.js","tpl/wxverify/increment_tax_form.html.js","common/wx/Cgi.js","common/qq/queryString.js","common/wx/dialog.js","biz_web/ui/dropdown.js","tpl/wxverify/invoice_edit.html.js","biz_common/jquery.validate.js","common/wx/Tips.js"],function(e,i,t){
"use strict";
var n=(e("biz_web/ui/checkbox.js"),e("wxverify/init.js").initUpload),r=e("biz_web/utils/upload.js"),o=e("common/wx/region.js"),a=e("tpl/wxverify/increment_tax_form.html.js"),c=wx.T,d=e("common/wx/Cgi.js"),s=e("common/qq/queryString.js"),l=e("common/wx/dialog.js"),m=(e("biz_web/ui/dropdown.js"),
e("tpl/wxverify/invoice_edit.html.js")),p=(e("biz_common/jquery.validate.js"),e("common/wx/Tips.js"));
template.helper("$preview",function(e,i){
return"bizmedia"==i?r.mediaFileUrl(e):"preview"==i?r.tmpFileUrl(e):"multimedia"==i?r.multimediaFileUrl(e):void 0;
}),$.validator.addMethod("postcode",function(e){
return e=$.trim(e),/^\d{6}$/.test(e);
},"请输入正确的邮编格式"),$.validator.addMethod("realname",function(e){
return e=$.trim(e),/^[\u4e00-\u9fa5]+$/.test(e)||/^[a-zA-Z][a-zA-Z\s]*$/.test(e);
},"人名只能是中文或者英文"),t.exports=function(e){
var i,t,r=e.data.invoice,u={
disableForm:function(e){
var n=i.find("input[type=text],input[type=hidden]");
n.prop("disabled",e),t.disabled(e),e?i.addClass("disabled"):i.removeClass("disabled");
},
transfer:function(){
"detail"==e.data.action?(p.suc("提交成功"),location.reload()):location.href=3==e.refill_type||4==e.refill_type?wx.url("/merchant/order?action=detail&t=service/detail&info=verify&order_id="+e.order_id):s.replace(location.href,"step",wx.cgiData.step+1);
},
submit:function(i){
return 3==e.refill_type||4==e.refill_type?l.show({
type:"warn",
mask:!0,
msg:"确定提交？|一旦提交，你将消耗一次重填的机会。",
buttons:[{
text:"确定",
click:function(){
i.call(this),this.hide();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
}):i.call(this),!1;
}
},f={
initPage:function(){
for(var t in e.data)"string"==typeof e.data[t]&&(e.data[t]=(e.data[t]+"").replace(/\r\n|\r|\n/g,"<br/>"));
$("#invoice_list").html(c(m,{
data:e.data,
invoice:r,
baseData:wx.data
})),i=$("#invoice_form"),f.initInvoiceType();
var n=$("#need_invoice");
n.checkbox({
onChanged:function(e){
u.disableForm(!e.prop("checked")),i.find(".frm_msg").hide();
}
}),u.disableForm(!n.prop("checked")),$("#js_prevBtn").click(function(){
return location.href=s.replace(location.href,"step",wx.cgiData.step-1),!1;
});
},
initRegion:function(){
new o({
container:"#region_area",
data:{
country:"中国",
province:r.province,
city:r.city
},
remove:{
province:[10188,10172,10180]
},
display:{
country:!1
},
onChange:function(e,i,t){
$("#"+e).val(t),"city"==e&&$("#province").parent().find(".fail").remove();
}
});
},
initInvoiceType:function(){
var e=r;
e.preview_action="multimedia",t=$(".js_invoicetype").on("click",function(){
var t=+$(this).val();
0==t?($("#js_invoice_type_tip").text("普通发票为定额发票。"),$("#js_incrementTaxForm").html().length>0&&(e=i.serializeObject()),
$("#js_incrementTaxForm").html("")):($("#js_invoice_type_tip").text("企业必须有一般纳税人资质，且提交《税务登记证》、《银行开户证明》给腾讯客服核对无误后方能开具。"),
$("#js_incrementTaxForm").html(c(a,{
data:e
})),n()),$("#invoice_type_hidden").val(t).parent().parent().find(".fail").remove();
}).checkbox({
multi:!1
}),r.invoice_type=r.invoice_type||"0",$("#invoice_type"+r.invoice_type).click();
},
initForm:function(){
i.validate({
rules:{
title:"required",
address:"required",
contact:{
required:!0,
realname:!0
},
mobile:"mobile",
postcode:"postcode",
province:"required",
city:"required",
invoice_type:"required",
tax_num:"required",
register_addr:"required",
enterprise_tel:"required",
bank_name:"required",
bank_account:"required",
open_license_stuff:"required",
tax_reg_certificate:"required"
},
ignore:[],
messages:{
title:"请输入发票抬头",
address:"请输入邮寄地址",
contact:{
required:"请输入联系人的名字",
realname:"联系人的名字只能是中文或者英文"
},
province:"请选择邮寄地址",
city:"请选择邮寄地址",
invoice_type:"请选择发票类型",
tax_num:"请输入纳税识别号",
register_addr:"请输入企业注册地址",
enterprise_tel:"请输入企业电话",
bank_name:"请输入企业的开户银行",
bank_account:"请输入企业银行帐号",
open_license_stuff:"请上传企业开户许可证扫描件",
tax_reg_certificate:"请上传《税务登记证副本》或《一般纳税人资格证书》扫描件"
},
errorPlacement:function(e,i){
var t=i.parent(),n=t.parent();
"province"==i.attr("name")||"city"==i.attr("name")?(t.find(".fail").remove(),e.insertBefore(t.find(".frm_tips"))):(n.find(".fail").remove(),
e.insertBefore(n.find(".frm_tips")));
},
submitHandler:function(i){
u.submit(function(){
var t=$(i).serializeObject(),n=$("#js_nextBtn");
t.step=e.step,t.need_invoice=t.need_invoice||0;
var r;
"detail"==e.data.action?(r="/merchant/order?action=update_invoice",t.check_id=e.check_id):r=3==e.refill_type||4==e.refill_type?"/acct/wxverify?action=submit_refill":"/acct/wxverify?action=submit_invoice",
d.post({
url:r,
data:t,
error:function(){
n.btn(!0);
}
},function(e){
return"0"!=e.base_resp.ret?(d.show(e),void n.btn(!0)):void u.transfer();
}),n.btn(!1);
});
}
});
}
};
f.initPage(),f.initRegion(),f.initForm();
};
});