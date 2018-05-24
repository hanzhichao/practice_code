define("wxverify/socialreg.js",["common/wx/Cgi.js","wxverify/commonreg.js"],function(e,o,i){
"use strict";
function r(){
$("#socialreg").validate($.extend(!0,{},n,{
rules:{
parent_organization:"required",
organization_code:"required",
social_org_reg_stuff:"required",
organization_code_stuff:"required",
introduction:{
maxlength:500
}
},
messages:{
name:"团体名称不能为空",
parent_organization:"主管机构名称不能为空",
social_org_reg_stuff:"社会团体登记证书不能为空",
introduction:{
maxlength:"机构简介不能超过500字"
}
}
}));
}
{
var n=(e("common/wx/Cgi.js"),e("wxverify/commonreg.js"));
n.commonMsgs;
}
i.exports=function(){
r();
};
});