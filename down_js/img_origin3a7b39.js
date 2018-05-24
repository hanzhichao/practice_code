define("infringement/img_origin.js",["biz_common/jquery.validate.js","biz_common/moment.js","common/wx/top.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/Cgi.js","biz_web/utils/upload.js"],function(e){
"use strict";
function n(){
var e=window.cgiData;
d.original_certificate_url=decodeURIComponent(e.original_certificate_url),d.demandant_img_url=decodeURIComponent(e.demandant_img_url),
d.defendant_img_url=decodeURIComponent(e.defendant_img_url);
}
function i(){
var e=$("#form1"),n=$("#step1"),i=window.cgiData.proof_url,t=window.cgiData.create_time;
i&&e.find(".js_proof_url_img").attr("src",l.mediaFileUrl(i)),n.find("a[data-demandantimgurl]").attr("href",d.demandant_img_url),
n.find("input[name=demandant_img_url]").val(d.demandant_img_url),n.find("input[name=defendant_img_url]").val(d.defendant_img_url),
n.find("span[data-originalcertificateurl]").text(d.original_certificate_url||"无"),
!!t&&$("#create_time").text(o.unix(t).format("YYYY-MM-DD"));
var r=e.find(".js_upload");
r.length>0&&l.uploadTmpFile({
container:r,
multi:!1,
type:2,
onComplete:function(e,n,i,t){
if(t&&t.base_resp&&0==t.base_resp.ret){
var a=r.parent().find("input[type=hidden]"),o=r.parent().parent().find(".js_upload_preview").show();
r.text("重新上传"),a.val(t.content),o.html('<img src="%s" />'.sprintf(l.tmpFileUrl(t.content))),
d.form.element(a);
}
}
});
}
function t(){
d.form=$("#form1").validate({
rules:{
reason:{
required:!0,
maxlength:200
},
proof_url:{
required:!0
}
},
messages:{
reason:{
required:"请填写申诉原因",
maxlength:"最多输入200个字符"
},
proof_url:{
required:"请上传申诉证明材料"
}
},
ignore:[],
submitHandler:function(){
return!1;
}
}),$("#submit_btn").click(function(){
r()===!0&&a($(this));
}),$("#reason").on("keyup",function(){
var e=$(this),n=e.val().length;
$("#reason_len").text(n),n>200?e.parent(".js_reason_parent").addClass("warn"):e.parent(".js_reason_parent").removeClass("warn");
});
}
function r(){
return d.form.form();
}
function a(e){
if(!e.hasClass("btn_loading")){
e.btn(0);
var n=$("#form1").serializeObject();
n.action="add_appeal",""!=n.original_certificate_url&&-1==n.original_certificate_url.indexOf("://")&&(n.original_certificate_url="http://"+n.original_certificate_url),
s.post({
url:"/cgi-bin/imgcopyright?",
data:n,
mask:!1
},function(n){
e.btn(1),n&&n.base_resp&&0==n.base_resp.ret?(m.suc("提交申诉成功"),$("#msg_box").hide(),
$("#step1").hide(),$("#step2").removeClass("dn")):m.err("系统繁忙，请稍后再试");
});
}
}
e("biz_common/jquery.validate.js");
var o=e("biz_common/moment.js"),m=(e("common/wx/top.js"),e("common/wx/Tips.js")),s=(e("common/wx/dialog.js"),
e("common/wx/Cgi.js")),l=e("biz_web/utils/upload.js"),d={
submited:0
};
n(),i(),t();
});