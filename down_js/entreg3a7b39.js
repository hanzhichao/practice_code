define("wxverify/entreg.js",["common/wx/Cgi.js","wxverify/commonreg.js"],function(e,r,i){
"use strict";
function n(){
$("#entreg").validate($.extend(!0,{},s,{
rules:{
email:"trimemail",
organization_code:"required",
parent_company:"required",
registered_address:"required",
generic_business_type:{
required:!0,
maxlength:1e3
},
front_business_type:{
required:!0,
maxlength:1e3
},
registered_capital:"required",
organization_code_stuff:"required"
},
messages:{
name:"企业全称不能为空",
email:"请输入正确的邮箱格式",
parent_company:"隶属企业不能为空",
registered_address:"企业注册地址不能为空",
office_address:"企业办公地址不能为空",
generic_business_type:{
required:"一般经营范围不能为空",
maxlength:"一般经营范围不超过1000字"
},
front_business_type:{
required:"前置许可经营范围不能为空",
maxlength:"前置许可经营范围不能超过1000字"
},
registered_capital:"注册资本金不能为空",
artist_idcard_num:a.idcard,
legal_person:"法定代表人/企业负责人姓名不能为空",
account_name:"企业开户名称不能为空",
bank_name:"企业开户银行不能为空",
bank_account:"企业银行账号不能为空"
}
}));
}
var s=(e("common/wx/Cgi.js"),e("wxverify/commonreg.js")),a=s.commonMsgs;
i.exports=function(){
n();
};
});