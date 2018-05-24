define("wxverify/govreg.js",["common/wx/Cgi.js","wxverify/commonreg.js"],function(e,n,o){
"use strict";
function i(){
$("#govreg").validate($.extend(!0,{},r,{
rules:{
parent_organization:"required",
office_address:"required",
introduction:{
maxlength:500
}
},
messages:{
name:"机构名称不能为空",
parent_organization:"主管机构名称不能为空",
office_address:"机构地址不能为空",
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