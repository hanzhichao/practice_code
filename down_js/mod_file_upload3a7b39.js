define("register/mod/mod_file_upload.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/upload.js"],function(e,i,n){
"use strict";
function t(){
c.find(".js_select_file").each(function(){
var e=$(this).attr("id"),i=l[e];
i||(i={
width:0,
min_width:0,
height:0,
min_height:0,
size:0,
min_size:0
});
var n=_.uploadTmpFileWithCheck(i);
!function(e){
n({
container:"#"+e,
multi:!1,
type:2,
accept:{
extensions:"bmp,jpeg,jpg,png",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg"
},
width:106,
onComplete:function(i,n,t,o){
var r=o.content||"";
0==o.base_resp.ret?($("#"+e+"_preview").html('<img style="width:200px;" src="%s">'.sprintf(_.tmpFileUrl(r))),
$("#"+e+"_hidden").val("temp_"+r),$("#"+e+"_hidden").parent().parent().find(".fail").remove(),
s.suc("上传成功")):s.err(200010==o.base_resp.ret?"图片太大":200011==o.base_resp.ret?"请上传合法的图片格式":200034==o.base_resp.ret?"图片尺寸错误":"上传失败");
}
});
}(e);
});
}
function o(){
l={
operator_idcard_copy:{
width:0,
min_width:256,
height:0,
min_height:256,
size:0,
min_size:0
},
operator_idcard_copy_back:{
width:0,
min_width:256,
height:0,
min_height:256,
size:0,
min_size:0
}
};
}
function r(){}
function a(){}
function d(){
var e={
required:!0,
messages:{
required:"未选择文件"
}
};
c.find('input[name="credential_copy"]').length>0&&c.find('input[name="credential_copy"]').rules("add",e),
c.find('input[name="operator_idcard_copy"]').length>0&&c.find('input[name="operator_idcard_copy"]').rules("add",e),
c.find('input[name="operator_idcard_copy_back"]').length>0&&c.find('input[name="operator_idcard_copy_back"]').rules("add",e);
}
function p(e){
m=e.model,c=$(e.form),u=$.extend(!1,u,e),h=!0,o(),r(),a(),d();
}
var m,c,s=(template.render,e("common/wx/Cgi.js"),e("common/wx/Tips.js")),_=e("common/wx/upload.js"),h=!1,u={},l={};
n.exports={
init:p,
initUpload:t
};
});