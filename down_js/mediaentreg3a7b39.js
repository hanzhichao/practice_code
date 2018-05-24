define("wxverify/mediaentreg.js",["common/wx/Cgi.js","wxverify/commonreg.js","biz_web/ui/dropdown.js"],function(e,i,a){
"use strict";
{
var n=(e("common/wx/Cgi.js"),e("wxverify/commonreg.js")),r=n.commonMsgs,t=e("biz_web/ui/dropdown.js"),d=[{
name:"出版单位",
value:0
},{
name:"主办单位",
value:0
},{
name:"主管单位",
value:0
}],m=[{
name:"电视广播",
value:0
},{
name:"报刊",
value:0
},{
name:"杂志",
value:0
},{
name:"网络媒体",
value:0
}];
wx.cgiData.refill_type;
}
a.exports=function(e){
function i(e,i){
var a=-1;
return $.each(e,function(e,n){
return n.name==i?(a=e,!1):void 0;
}),a;
}
var a=e.data;
if($("#ent_type_wrap").length){
new t({
container:"#ent_type_wrap",
label:"单位类型",
data:d,
callback:function(e,i){
var a=$("#media_unit_type").val(i);
a.closest(".frm_control_group").find(".fail").hide();
}
}).selected(i(d,a.media_unit_type));
}
if($("#media_type_wrap").length){
new t({
container:"#media_type_wrap",
label:"媒体类型",
data:m,
callback:function(e,i){
var a=$("#media_type").val(i);
a.closest(".frm_control_group").find(".fail").hide();
}
}).selected(i(m,a.media_type));
}
$("#mediaentreg").validate($.extend(!0,{},n,{
rules:{
introduction:{
required:!0,
maxlength:500
},
media_type:"required",
media_name:"required",
media_unit_type:"required",
media_license:"required",
office_address:"required",
email:{
trimemail:!0,
required:!0
},
organization_code:"required",
organization_code_stuff:"required",
media_register_id:"required"
},
messages:{
name:"媒体名称不能为空",
introduction:{
required:"媒体简介不能为空",
maxlength:"媒体简介不能超过500字"
},
media_license:r.file,
media_type:"请选择媒体类型",
media_unit_type:"请选择单位类型",
media_name:"媒体单位名字不能为空",
office_address:"办公地址不能为空",
email:{
trimemail:r.email,
required:"单位公共邮箱不能为空"
},
office_phone:"媒体单位办公电话不能为空",
media_register_id:"工商执照注册号不能为空",
legal_person:"媒体单位法人代表/负责人姓名不能为空",
account_name:"机构开户名称不能为空",
bank_name:"机构开户银行不能为空",
bank_account:"机构银行账号不能为空"
}
}));
};
});