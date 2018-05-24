define("setting/invade.js",["common/wx/popup.js","common/wx/Cgi.js","common/wx/Tips.js","biz_web/utils/upload.js","biz_common/jquery.validate.js"],function(e){
"use strict";
e("common/wx/popup.js");
var i=e("common/wx/Cgi.js"),t=e("common/wx/Tips.js"),n=e("biz_web/utils/upload.js"),r=(e("biz_common/jquery.validate.js"),
{
submitting:!1
});
!function(){
function e(){
r.cgiData=window.cgiData,window.cgiData=null;
}
function a(){
$("#form1").find(".js_select_file").each(function(){
var e=$(this).attr("id");
n.uploadTmpFile({
container:"#"+e,
multi:!1,
type:2,
onComplete:function(i,r,a,s){
var d=s.content||"";
0==s.base_resp.ret&&($("#"+e+"_preview").html('<img style="width:200px;" src="%s">'.sprintf(n.tmpFileUrl(d))),
$("#"+e+"_hidden").val(d).parent().parent().find(".fail").remove(),t.suc("上传成功"));
}
});
}),d(),$("#idcardHelp").click(s);
}
function s(){
r.idcardHelp=$("#idcard_help_tpl").popup({
title:"手持身份证详细要求",
width:960,
className:"idcard_wrp",
buttons:[{
text:"我知道了",
click:function(){
this.remove();
},
type:"primary"
}],
onHide:function(){
this.remove();
}
});
}
function d(){
$("#form1").validate({
ignore:[],
rules:{
idcard:{
required:!0
},
license:{
required:!0
},
register:{
required:{
depends:function(){
return 3==r.cgiData.invade_type&&!$("#registerFile_hidden").val();
}
}
}
},
messages:{
idcard:"请上传相关文件",
license:"请上传相关文件",
register:"请上传相关文件"
},
errorPlacement:function(e,i){
var t=i.parent().parent(),n=t.find(".frm_tips");
t.find(".fail").remove(),n.length?e.insertBefore(n):t.append(e);
},
submitHandler:l
});
}
function l(){
if(r.submitting!==!0){
var e=r.cgiData,n={
f:"xml",
nick_name:e.nickname,
invade_type:e.invade_type
};
2==n.invade_type?n.id_card=$("#idcardFile_hidden").val():4==n.invade_type?(n.license=$("#licenseFile_hidden").val(),
n.register_file=$("#registerFile_hidden").val(),!n.register_file&&delete n.register_file):3==n.invade_type&&(n.license=$("#licenseFile_hidden").val(),
n.register_file=$("#registerFile_hidden").val(),n.auth_file=$("#authFile_hidden").val(),
!n.auth_file&&delete n.auth_file),r.submitting=!0;
var a=$("#submitBtn");
a.btn(!1),i.post({
url:"/cgi-bin/setuserinfo?action=nickname",
data:n,
complete:function(){
r.submitting=!1,a.btn(!0);
}
},function(e){
if(!e||!e.base_resp)return void t.err("系统错误，请稍后重试");
var i=e.base_resp.ret;
0==i?($("#form1").hide(),$("#success").show()):t.err("系统错误，请稍后重试");
});
}
}
e(),a();
}();
});