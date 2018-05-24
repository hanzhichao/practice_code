define("setting/rename_invade.js",["common/wx/popup.js","common/wx/Cgi.js","common/wx/Tips.js","biz_web/utils/upload.js","biz_web/utils/multiupload.js","biz_common/jquery.validate.js"],function(i){
"use strict";
function e(){
s=$("#js_form"),o=$("#js_div_result"),r=$("#js_btn_submit");
}
function n(){}
function t(){
$("#js_btn_idcard_help").click(function(){
$("#tpl_idcard_help").popup({
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
}),s.find(".js_select_file").each(function(){
var i=$(this).parents(".js_div_upload"),e=$(this),n=i.find(".js_div_preview"),t=i.find(".js_input_invade_file");
m.uploadTmpFile({
container:$(this),
multi:!1,
type:2,
accept:{
extensions:"bmp,jpeg,jpg,png,gif",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif"
},
onComplete:function(a,s,o,r){
var l=r.content||"";
if(0==r.base_resp.ret){
var m=e.data("file");
e.html("重新上传"),t.val(l),i.find(".fail").remove(),n.html(""),n.append("<p>"+o.name+"</p>"),
m={
filename:o.name,
file:l
},e.data("file",m),c.suc("上传成功");
}else c.err(1==r.base_resp.ret?"图片太大":-11==r.base_resp.ret?"请上传合法的图片格式":-34==r.base_resp.ret?"图片尺寸错误":"上传失败");
}
});
}),u.init({
container:$("#js_div_other_file"),
title:"补充材料",
desc:window.cgiData.wording,
name:"naming_other_stuff_",
range:[1,5],
minUploadNum:0,
noPreview:!0,
files:[]
}),r.on("click",function(){
return r.hasClass("btn_disabled")?!1:(s.submit(),!1);
}),s.on("submit",function(){
if(!s.valid())return!1;
var i={
nick_name:window.cgiData.nickname
};
return s.find(".js_select_file").each(function(){
var e=(1*$(this).data("multi"),$(this).data("name")),n=$(this).data("file");
n&&(i[e]=n.file);
}),s.find(".js_input_multiupload").each(function(){
$(this).val()&&(i[$(this).attr("name")]=$(this).val());
}),console.log("postData:",i),r.btn(0),l.post({
url:"/cgi-bin/setuserinfo?action=nickname",
data:i
},function(i){
if(r.btn(1),!i||!i.base_resp)return void c.err("系统错误，请稍后重试");
var e=i.base_resp.ret;
0==e?(s.hide(),o.show()):c.err("系统错误，请稍后重试");
}),!1;
}),s.validate({
ignore:"",
rules:{
id_card:{
required:!0
},
license:{
required:!0
}
},
messages:{
id_card:{
required:"请上传文件"
},
license:{
required:"请上传文件"
}
}
});
}
function a(){
e(),n(),t();
}
i("common/wx/popup.js");
{
var s,o,r,l=i("common/wx/Cgi.js"),c=i("common/wx/Tips.js"),m=i("biz_web/utils/upload.js"),u=i("biz_web/utils/multiupload.js");
i("common/wx/popup.js"),i("biz_common/jquery.validate.js");
}
a();
});