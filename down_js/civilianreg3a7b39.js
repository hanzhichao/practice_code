define("wxverify/civilianreg.js",["common/wx/Cgi.js","wxverify/commonreg.js"],function(i,e,n){
"use strict";
function r(){
$("#civilianreg").validate($.extend(!0,{},o,{
rules:{
email:"trimemail",
parent_organization:"required",
civilian_reg_stuff:"required",
organization_code:"required",
organization_code_stuff:"required",
introduction:{
maxlength:500
}
},
messages:{
name:"机构名称不能为空",
email:"请输入正确的邮箱格式",
parent_organization:"主管机构名称不能为空",
civilian_reg_stuff:"民办非企业登记证书不能为空",
introduction:{
maxlength:"机构简介不能超过500字"
}
}
}));
}
{
var o=(i("common/wx/Cgi.js"),i("wxverify/commonreg.js"));
o.commonMsgs;
}
n.exports=function(){
r();
};
});