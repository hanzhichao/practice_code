define("wxverify/mediareg.js",["common/wx/Cgi.js","wxverify/commonreg.js","biz_web/ui/dropdown.js"],function(e,a,i){
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
i.exports=function(e){
function a(e,a){
var i=-1;
return $.each(e,function(e,n){
return n.name==a?(i=e,!1):void 0;
}),i;
}
var i=e.data;
if($("#ent_type_wrap").length){
new t({
container:"#ent_type_wrap",
label:"单位类型",
data:d,
callback:function(e,a){
var i=$("#media_unit_type").val(a);
i.closest(".frm_control_group").find(".fail").hide();
}
}).selected(a(d,i.media_unit_type));
}
if($("#media_type_wrap").length){
new t({
container:"#media_type_wrap",
label:"媒体类型",
data:m,
callback:function(e,a){
var i=$("#media_type").val(a);
i.closest(".frm_control_group").find(".fail").hide();
}
}).selected(a(m,i.media_type));
}
$("#mediareg").validate($.extend(!0,{},n,{
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
legal_person_stuff:"required"
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
legal_person:"媒体单位法人代表/负责人姓名不能为空",
account_name:"机构开户名称不能为空",
bank_name:"机构开户银行不能为空",
bank_account:"机构银行账号不能为空",
legal_person_stuff:"事业单位法人证书不能为空"
}
}));
};
});