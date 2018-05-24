define("wxverify/publicservice.js",["common/wx/Cgi.js","wxverify/commonreg.js"],function(e,i,r){
"use strict";
function n(){
$("#publicservice").validate($.extend(!0,{},o,{
rules:{
parent_organization:"required",
organization_code:"required",
organization_code_stuff:"required",
legal_person_stuff:"required",
office_address:"required",
introduction:{
maxlength:500
}
},
messages:{
name:"机构名称不能为空",
parent_organization:"主管机构名称不能为空",
office_address:"机构地址不能为空",
legal_person_stuff:"事业单位法人证书不能为空",
introduction:{
maxlength:"机构简介不能超过500字"
}
}
}));
}
{
var o=(e("common/wx/Cgi.js"),e("wxverify/commonreg.js"));
o.commonMsgs;
}
r.exports=function(){
n();
};
});