define("wxverify/nonprofitreg.js",["common/wx/Cgi.js","wxverify/commonreg.js"],function(e,n,o){
"use strict";
function i(){
$("#nonprofitreg").validate($.extend(!0,{},r,{
rules:{
email:"trimemail",
not_profit_type:"required",
parent_organization:"required",
organization_code:"required",
introduction:{
maxlength:500
}
},
messages:{
name:"企业名字不能为空",
email:"请输入正确的邮箱格式",
not_profit_type:"组织类型不能为空",
parent_organization:"主管机构名称不能为空",
introduction:{
maxlength:"机构简介不能超过500字"
}
}
}));
}
{
var r=(e("common/wx/Cgi.js"),e("wxverify/commonreg.js"));
r.commonMsgs;
}
o.exports=function(){
i();
};
});