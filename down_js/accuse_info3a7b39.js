define("accusation/accuse_info.js",["biz_common/jquery.validate.js","biz_web/ui/dropdown.js","biz_web/utils/upload.js","common/wx/Tips.js","common/wx/Cgi.js"],function(e){
"use strict";
e("biz_common/jquery.validate.js");
var a=e("biz_web/ui/dropdown.js"),r=e("biz_web/utils/upload.js"),i=e("common/wx/Tips.js"),n=e("common/wx/Cgi.js"),t={
menuData:[{
name:"色情",
value:1
},{
name:"欺诈",
value:2
},{
name:"诱导分享",
value:3
},{
name:"造谣",
value:5
},{
name:"垃圾广告",
value:6
},{
name:"骚扰",
value:7
},{
name:"违反法律法规",
value:8
},{
name:"其他",
value:9
}],
menuObject:{},
data:{
img:[]
}
};
!function(){
function e(){
l(),s(),d();
}
function u(){
$("#submitInfo").click(o);
}
function o(){
if(m()===!0){
var e={
fake_id:window.wx.data.user_name,
biz_user_name:$("#uin").val().trim(),
type:t.data.type,
url:$("#url").val().trim()||"",
reason:$("#reason").val().trim(),
stuff_id:t.data.img[0]?t.data.img[0].id:"",
email:$("#email").val().trim()
},a=$(this);
a.btn(0),n.post({
url:"/cgi-bin/impeach?",
dataType:"json",
data:e,
mask:!1
},function(r){
return a.btn(1),r.base_resp?1*r.base_resp.ret===2?void i.err("举报的公众账号不存在，请检查"):1*r.base_resp.ret!==0?void i.err():($("#form1").hide(),
void $("#success").html(template.render("success_tpl",{
data:e,
g:t
})).show()):void i.err();
});
}
}
function m(){
{
var e=!0;
t.data;
}
return t.form.form()||(e=!1),t.data.type||($("#jubao_err").show().find(":hidden").show(),
e=!1),e===!1&&i.err("请完善表单信息"),e;
}
function l(){
t.menuObject=new a({
container:"#jubao",
label:"请选择",
data:t.menuData,
callback:function(e,a){
t.data.type=e,t.data.typeName=a,$("#jubao_err").hide(),5===e?$("#rumor_filter").show():$("#rumor_filter").hide();
}
});
}
function s(){
r.uploadTmpFile({
container:"#upload_0",
multi:!1,
type:2,
onComplete:function(e,a,n,u){
var o=$("#upload_preview_0");
if(0==u.base_resp.ret){
i.suc("上传成功");
var m=r.tmpFileUrl(u.content);
t.data.img[0]={
id:u.content,
url:m
},o.html('<a href="'+m+'" target="_blank"><img src="'+m+'" ></a>').show();
}else t.data.img[0]=null,o.html("").show(),i.err();
}
});
}
function d(){
t.form=$("#form1").validate({
rules:{
url:{
required:!0,
url:!0
},
uin:{
required:!0
},
email:{
required:!0,
email:!0
},
reason:{
required:!0,
maxlength:150
}
},
messages:{
url:{
required:"请填写举报的文章链接",
url:"请填写合法的举报的文章链接"
},
email:{
required:"请填写联系邮箱",
email:"请填写合法的邮箱地址"
},
uin:{
required:"请填写举报的公众账号"
},
reason:{
required:"请填写举报原因",
maxlength:"不能超过150字"
}
},
errorPlacement:function(e,a){
var r=a.data("err");
r=r?$("#"+r):a.parent(),e.appendTo(r);
}
});
}
e(),u();
}();
});