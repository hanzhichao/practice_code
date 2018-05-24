define("wxverify/overseas_entreg.js",["common/wx/Cgi.js","wxverify/commonreg.js","biz_common/jquery.validate.js"],function(e,r,n){
"use strict";
function o(){
$("#overseas_entreg").validate($.extend(!0,{},s,{
rules:{
organization_code:"required",
parent_company:"required",
registered_address:"required",
organization_code_stuff:"required",
generic_business_type:"required",
mp_operator_phone_bill_stuff:"required"
},
messages:{
name:"企业全称不能为空",
parent_company:"隶属企业不能为空",
registered_address:"企业注册地址不能为空",
office_address:"企业办公地址不能为空",
generic_business_type:"经营范围不能为空",
legal_person:"法定代表人/企业负责人姓名不能为空",
account_name:"企业开户名称不能为空",
bank_name:"企业开户银行不能为空",
bank_account:"企业银行账号不能为空",
mp_operator_phone_bill_stuff:"未选择文件"
}
})),i.addMethod("mobile",function(e){
return e=$.trim(e),/^\d+$/.test(e);
},"请输入正确的手机号码"),t.mobile=function(e){
return e=$.trim(e),/^\d+$/.test(e);
};
}
var s=(e("common/wx/Cgi.js"),e("wxverify/commonreg.js")),i=e("biz_common/jquery.validate.js"),t=(s.commonMsgs,
i.rules);
n.exports=function(){
o();
};
});