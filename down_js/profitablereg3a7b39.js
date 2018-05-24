define("wxverify/profitablereg.js",["common/wx/Cgi.js","wxverify/commonreg.js"],function(e,o,n){
"use strict";
function i(){
$("#profitablereg").validate($.extend(!0,{},r,{
rules:{
parent_organization:"required",
organization_code:"required",
organization_code_stuff:"required",
introduction:{
maxlength:500
}
},
messages:{
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
n.exports=function(){
i();
};
});