define("cardticket/card_fee_invoice_info_form.js",["biz_web/ui/checkbox.js","common/wx/Tips.js","biz_common/jquery.validate.js","common/wx/Cgi.js","biz_common/moment.js","biz_web/utils/upload.js","common/wx/stopMultiRequest.js","cardticket/common_validate.js","cardticket/common_template_helper.js","cardticket/parse_invoice_data.js"],function(e){
"use strict";
function t(){
a=e("cardticket/parse_invoice_data.js")(a),a.receipt_type&&(c.receipt_type=a.receipt_type),
a.commodity_type&&(c.commodity_type=a.commodity_type),1==c.receipt_type?$("#js_receipt_type input[value="+o.INC_TAX+"]").prop("checked",!0):($("#js_receipt_type input[value=2]").prop("checked",!0),
1==c.commodity_type?$("#js_common_tax_content input[value=js_personal_tax_tpl]").prop("checked",!0):$("#js_common_tax_content input[value=js_company_tax_tpl]").prop("checked",!0)),
$("#js_receipt_type input").checkbox({
onChanged:function(e){
var t=$(e).val();
2==t?(c.receipt_type=2,1==c.commodity_type?$("#js_common_tax_content input[value=js_personal_tax_tpl]").prop("checked",!0):$("#js_common_tax_content input[value=js_company_tax_tpl]").prop("checked",!0),
$("#js_common_tax_content input:checked").click(),$("#js_common_tax_content").show()):(c.receipt_type=1,
i(o.INC_TAX),$("#js_common_tax_content").hide());
}
}),$("#js_common_tax_content input").checkbox({
onChanged:function(e){
var t=$(e).val();
i(t),c.commodity_type=t==o.PERSONAL_TAX?1:2;
}
}),$("#js_receipt_type").find("input:checked").click();
var t=$(".js_fee_account"),n="YYYY-MM-DD",r=p(p().add("d",-7).format(n),n).unix(),_=p(p().format(n),n).add("d",1).unix()-1;
t.attr("href",wx.url(t.attr("href")+"&begin_time=%s&end_time=%s".sprintf(r,_)));
}
function i(e){
$("#js_invoice").html(template.render(e,a)),$("#js_invoice").validate({
rules:{
enterprise_name:{
required:!0
},
personal_name:{
required:!0
},
licence:{
required:!0
},
licence_address:{
required:!0
},
tax_register_scan:{
required:!0
},
taxpayer_unique_id:{
required:!0
},
tel:{
required:!0,
service_phone:!0
},
bank_acct_open_scan:{
required:!0
},
bank_name:{
required:!0
},
bank_acct:{
required:!0
},
recipient_name:{
required:!0
},
recipient_tel:{
required:!0,
service_phone:!0
},
recipient_address:{
required:!0
},
recipient_post_code:{
required:!0
}
},
messages:{
recipient_name:{
required:"请输入收件人"
},
personal_name:{
required:"请输入个人姓名"
},
recipient_tel:{
required:"请输入收件人电话",
service_phone:"请输入11位手机号或带区号座机号"
},
recipient_address:{
required:"请输入收件地址"
},
recipient_post_code:{
required:"请输入邮编"
},
licence_address:{
required:"请输入营业执照登记地址"
},
tax_register_scan:{
required:"请选择文件"
},
taxpayer_unique_id:{
required:"请输入纳税人识别号"
},
tel:{
required:"请输入发票打印电话",
service_phone:"请输入11位手机号或带区号座机号（区号和座机号之间带横杆）"
},
bank_acct_open_scan:{
required:"请选择文件"
},
bank_name:{
required:"请输入开户银行"
},
bank_acct:{
required:"请输入银行账号"
},
enterprise_name:{
required:"请输入抬头"
},
licence:{
required:"请选择文件"
}
},
ignore:[],
errorPlacement:function(e,t){
var i=t.closest(".frm_control_group");
i.find(".fail").remove(),i.append(e);
},
submitHandler:function(e){
var t=$(e).serializeObject();
t=$.extend(!0,t,c),s||(1==t.receipt_type&&(t.commodity_type=2),$("#js_submit").btn(!0),
s=!1,_.post({
url:"/merchant/cardmoneyinvoicemgr",
data:t,
success:function(e){
0==e.base_resp.ret?(r.suc("已提交"),location.href=wx.url("/merchant/cardmoneyinvoicemgr?action=get_invoice_tmpl_detail_info")):11111==e.base_resp.ret?(r.suc("已提交审核"),
location.href=wx.url("/merchant/cardmoneyinvoicemgr?action=get_invoice_tmpl_detail_info")):_.show(e);
},
complete:function(){
$("#js_submit").btn(!1),s=!1;
}
}));
},
invalidHandler:function(e,t){
var i=t.errorList[0],n=($(i.element).closest(".frm_control_group"),$(i.element).parent().offset());
window.scrollTo(0,n.top);
}
}),n();
}
function n(){
$(".js_select_file").each(function(){
var e=$(this),t=e.attr("id"),i=e.attr("inited");
if(!i){
e.attr("inited",1);
var n=m.uploadTmpFile;
!function(t){
n({
container:"#"+t,
multi:!1,
type:2,
onComplete:function(t,i,n,c){
var o,_=c.content||"";
if(0==c.base_resp.ret){
o=m.tmpFileUrl(_),_="temp_"+_;
var a=e.closest(".upload_box");
$(".upload_preview",a).html('<img style="width:260px;" src="%s">'.sprintf(o)),$("input[type=hidden]",a).val(_).closest(".js_control_item").find(".fail").remove(),
r.suc("上传成功");
}
}
});
}(t);
}
});
}
var r=(e("biz_web/ui/checkbox.js"),e("common/wx/Tips.js")),c={
receipt_type:1,
commodity_type:1
},o={
INC_TAX:"js_inc_tax_tpl",
PERSONAL_TAX:"js_personal_tax_tpl",
ENTERPRISE_TAX:"js_company_tax_tpl"
},_=(e("biz_common/jquery.validate.js"),e("common/wx/Cgi.js")),a=wx.cgiData.data,s=!1,p=e("biz_common/moment.js"),m=e("biz_web/utils/upload.js");
e("common/wx/stopMultiRequest.js"),e("cardticket/common_validate.js"),e("cardticket/common_template_helper.js"),
setInterval(function(){
a=$.extend(!0,a,$("#js_invoice").serializeObject());
},3e3),t();
});