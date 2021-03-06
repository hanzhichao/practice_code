define("wxverify/commonreg.js",["common/wx/Cgi.js","common/wx/dialog.js","biz_web/lib/store.js","common/wx/Tips.js","common/wx/overseasList.js","common/qq/queryString.js"],function(e,r,i){
"use strict";
function t(e){
var r=$(e).serializeObject(),i={};
for(var t in r)if(t.endsWith("_telephone1")||t.endsWith("_telephone2")){
var a=t.indexOf("_telephone1");
if(0>a&&(a=t.indexOf("_telephone2")),a){
var o=t.substring(0,a);
i[o]=r[o+"_telephone1"]&&r[o+"_telephone2"]?r[o+"_telephone1"]+"-"+r[o+"_telephone2"]:"";
}
}else i[t]=$.trim(r[t]);
return i.mp_operator_phone&&(/^\+/.test(i.mp_operator_phone)||0!=wx.cgiData.is_overseas?/^\+/.test(i.mp_operator_phone)||1!=wx.cgiData.is_overseas||(i.mp_operator_phone=p[$("#js_input_country").val()]+i.mp_operator_phone):i.mp_operator_phone="+86"+i.mp_operator_phone),
i;
}
var a=e("common/wx/Cgi.js"),o=e("common/wx/dialog.js"),_=e("biz_web/lib/store.js"),s="__draft__"+wx.data.uin,n="__draft__time__"+wx.data.uin,c=e("common/wx/Tips.js"),d=e("common/wx/overseasList.js"),u=e("common/qq/queryString.js"),p=d.mobilePrefix;
$.validator.addMethod("scale_verify",function(){
var e=!1;
return $("input[type='checkbox'][scale_proof='1']").each(function(){
$(this).is(":checked")&&(e=!0);
}),e;
},"请上传相应证明资料"),$.validator.addMethod("qrcheck",function(){
return"1"==$("#js_input_qrcheck_status").val()?!0:!1;
});
var f={
telephone:"请输入正确的电话号码，例如：020 - XXXXXXX",
email:"请输入正确的邮箱格式",
idcard:"身份证格式不正确，或者年龄未满18周岁，请重新填写。",
mobile:"请输入正确的手机号码",
file:"未选择文件",
name:"名字为1到20个中英文"
};
i.exports={
rules:{
name:{
required:!0
},
scale:{
required:function(){
return"4"==wx.cgiData.tmp_service_type?!0:!1;
},
number:!0
},
extra_scale:{
number:!0,
required:"#has_extra_scale:checked"
},
organization_code:{
required:!0
},
relation_proof_stuff_check:{
scale_verify:!0
},
internal_scale_stuff_check:{
scale_verify:!0
},
branch_scale_stuff_check:{
scale_verify:!0
},
social_insure_scale_stuff:{
required:"#social_insure_scale_stuff_check:checked"
},
earnings_scale_stuff:{
required:"#earnings_scale_stuff_check:checked"
},
individual_tax_scale_stuff:{
required:"#individual_tax_scale_stuff_check:checked"
},
working_place_scale_stuff:{
required:"#working_place_scale_stuff_check:checked"
},
biz_tel_scale_stuff:{
required:"#biz_tel_scale_stuff_check:checked"
},
wages_paying_scale_stuff:{
required:"#wages_paying_scale_stuff_check:checked"
},
relation_proof_stuff:{
required:"#relation_proof_stuff_check:checked"
},
internal_scale_stuff:{
required:"#internal_scale_stuff_check:checked"
},
branch_scale_stuff:{
required:"#branch_scale_stuff_check:checked"
},
partner_scale_proof_stuff:{
required:"#has_extra_scale:checked"
},
email:{
trimemail:!0
},
registered_id:{
required:!0
},
legal_person:{
required:!0
},
bank_name:{
required:!0
},
account_name:{
required:!0
},
bank_account:{
required:!0
},
mp_operator_name:{
required:!0
},
mp_operator_position:{
required:!0
},
nick_name:{
required:!0,
byteRangeLength:[4,32]
},
keywords:{
required:!0
},
registered_address:{
required:!0
},
mp_operator_phone:{
mobile:!0
},
mp_operator_tel:{
required:!0
},
mp_operator_email:{
required:!0,
trimemail:!0
},
mp_operator_idcard_name:{
required:!0
},
mp_operator_idcard_number:{
required:!0
},
business_license_stuff:{
required:!0
},
application_letter:{
required:!0
},
qy_operator_corp_id:{
required:"#qy_operator_type_2:checked"
},
verify_code:{
verifycode:!0
},
soso_map_pos:{
required:!0
},
office_address:{
required:!0
},
office_phone:{
required:!0
},
qrcheck_ticket:{
required:!0
},
qrcheck_status:{
qrcheck:!0
}
},
messages:{
name:{
required:"机构名称不能为空"
},
email:{
trimemail:"请输入正确的邮箱格式"
},
organization_code:{
required:"组织机构代码/统一社会信用代码不能为空"
},
legal_person:{
required:"法定代表人/负责人姓名不能为空"
},
registered_id:{
required:"工商执照注册号不能为空"
},
keywords:{
required:"相关关键词不能为空"
},
bank_name:{
required:"机构开户银行不能为空"
},
account_name:{
required:"开户名称不能为空"
},
bank_account:{
required:"机构银行账号不能为空"
},
mp_operator_name:{
required:"联系人姓名不能为空"
},
mp_operator_position:{
required:"申请者部门与职位不能为空"
},
nick_name:"认证后公众号名称为2到16个字",
mp_operator_idcard_name:{
required:"帐号申请者身份证件类型不能为空"
},
mp_operator_idcard_number:{
required:"联系人身份证号码不能为空"
},
mp_operator_phone:{
mobile:"请输入正确的手机号码"
},
mp_operator_tel:"联系人座机不能为空",
mp_operator_email:{
required:"请输入正确的邮箱格式",
trimemail:"请输入正确的邮箱格式"
},
business_license_stuff:{
required:"企业工商营业执照不能为空"
},
application_letter:{
required:"未选择文件"
},
qy_operator_corp_id:{
required:"代办服务商企业号corpID不能为空"
},
verify_code:{
verifycode:"验证码应为6位数字"
},
soso_map_pos:{
required:"SOSO地图坐标URL不能为空"
},
office_address:{
required:"机构地址不能为空"
},
registered_address:{
required:"注册地址不能为空"
},
office_phone:{
required:"办公电话不能为空"
},
organization_code_stuff:{
required:"组织机构代码证不能为空"
},
scale:{
required:"请输入企业规模",
number:"企业规模必须是数字，请输入正确的数字格式"
},
extra_scale:{
required:"请输入上下游成员规模",
number:"上下游成员必须是数字，请输入正确的数字格式"
},
partner_scale_proof_stuff:{
required:"未选择文件"
},
social_insure_scale_stuff:{
required:"请上传相应证明资料"
},
earnings_scale_stuff:{
required:"请上传相应证明资料"
},
individual_tax_scale_stuff:{
required:"请上传相应证明资料"
},
working_place_scale_stuff:{
required:"请上传相应证明资料"
},
biz_tel_scale_stuff:{
required:"请上传相应证明资料"
},
wages_paying_scale_stuff:{
required:"请上传相应证明资料"
},
relation_proof_stuff:{
required:"请上传相应证明资料"
},
branch_scale_stuff:{
required:"请上传相应证明资料"
},
qrcheck_ticket:{
required:"请刷新并重新扫描二维码"
},
qrcheck_status:{
qrcheck:"请扫描二维码验证联系人身份"
}
},
errorPlacement:function(e,r){
var i=r.parent().parent();
i.find(".fail").remove(),1==r.attr("scale_proof")?r.is(".file_field")?e.insertBefore(i.find(".upload_preview")):$("#js_div_scale_proof_msg").html(e):r.is(".file_field")?e.insertBefore(i.find(".upload_preview")):r.is(":hidden")?c.err(e.text()):e.insertBefore(i.find(".frm_tips"));
},
ignore:".js_input_ignore",
commonMsgs:f,
telephoneFilter:t,
submitHandler:function(e){
function r(){
a.post({
url:"/acct/wxverify?action="+i,
data:d,
timeout:6e4,
error:function(){
$("#submit_info").btn(!0);
}
},function(e){
function r(e,r){
var i=$(e).parents("form"),t={};
$(e).focus();
var a=i.validate();
t[$(e).attr("name")]=r,a.showErrors(t);
}
if("0"!=e.base_resp.ret){
if("10306"==e.base_resp.ret)c.err("验证码不正确，请重新输入"),$("#verify_code").focus();else if("202100"==e.base_resp.ret)wx.cgiData.checkAdminPopup.load();else if("210001"==e.base_resp.ret){
c.err("该组织机构代码已被认证，请重新填写。");
var i="根据公众平台的规则，一个组织机构代码只能认证一个企业号。";
i+=e.operator_name&&e.operator_name[0]?"该组织机构代码已被认证其他企业号：%s。申请者：%s**，电话：%s。".sprintf(e.entity_name,e.operator_name[0],e.operator_phone[0]):"该组织机构代码已被认证其他企业号。",
i+="建议贵司内部协调使用同一企业号。如有其他问题，请咨询腾讯客服。",r("#organization_code",i);
}else"210006"==e.base_resp.ret?(c.err("该corpID对应的企业号未认证，不可代其他企业申请认证。"),r("#qy_operator_corp_id","该corpID对应的企业号未认证，不可代其他企业申请认证。")):"210007"==e.base_resp.ret?r("#name","该主体的认证帐号数量已超过上限"):"210008"==e.base_resp.ret?c.err("扫码验证失败，请刷新二维码重新扫描"):"210009"==e.base_resp.ret?r("#mp_operator_idcard_number","该运营者身份证已登记过5次，请更换运营者"):"210010"==e.base_resp.ret?r("#mp_operator_phone","该运营者手机号已登记过5次，请更换运营者"):a.handleRet(e,{
id:"64430",
key:"15"
});
return void $("#submit_info").btn(!0);
}
_.remove(s),_.remove(n);
var t=location.href;
p&&2==p?location.href=wx.url("/merchant/order?action=index&t=service/order"):(-1==location.search.indexOf("&step=")&&(t+="&step=naming"),
location.href=u.replace(t,"step","naming"));
}),$("#submit_info").btn(!1);
}
var i,d=t(e),p=wx.cgiData.refill_type;
d.refill_type=p,""==d.extra_scale&&(d.extra_scale=0),d.step=wx.cgiData.step,i=p?"submit_refill":"submit_info",
document.activeElement&&"INPUT"===document.activeElement.tagName&&document.activeElement.blur(),
p&&2==p?o.show({
type:"warn",
mask:!0,
msg:"确定提交？|一旦提交，你将消耗一次重填的机会。",
buttons:[{
text:"确定",
click:function(){
var e=this;
r(),e.hide();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
}):r();
},
invalidHandler:function(e,r){
var i=r.errorList[0];
if(i&&$(i.element).is("input[type=hidden]")){
{
var t=$(i.element),a=t.parent(),o=a.offset().top-$(window).height()/2,_=$(window).scrollLeft();
$(window).scrollTop();
}
window.scrollTo(_,o);
}
}
};
});