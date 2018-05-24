define("infringement/video_origin.js",["biz_common/jquery.validate.js","biz_common/moment.js","common/wx/top.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/Cgi.js","biz_web/utils/upload.js"],function(n){
"use strict";
function o(){
var n=window.cgiData;
l.original_certificate_url=decodeURIComponent(n.original_certificate_url);
}
function e(){
var n=$("#form1"),o=($("#step1"),window.cgiData.proof_url),e=window.cgiData.create_time;
o&&n.find(".js_proof_url_img").attr("src",o),!!e&&$("#js_time").text(a.unix(e).format("YYYY-MM-DD"));
var i=n.find(".js_upload");
i.length>0&&c.uploadCdnFile({
container:i,
multi:!1,
type:2,
onComplete:function(n,o,e,t){
if(t&&t.base_resp&&0==t.base_resp.ret){
var r=i.parent().find("input[type=hidden]"),a=i.parent().parent().find(".js_upload_preview").show();
i.text("重新上传"),r.val(t.content),a.html('<img src="%s" />'.sprintf(t.content)),l.form.element(r);
}
}
});
}
function i(){
l.form=$("#form1").validate({
rules:{
complain_reason:{
required:!0,
maxlength:200
},
complain_proof:{
required:!0
}
},
messages:{
complain_reason:{
required:"请填写申诉原因",
maxlength:"最多输入200个字符"
},
complain_proof:{
required:"请上传申诉证明材料"
}
},
ignore:[],
submitHandler:function(){
return!1;
}
}),$("#submit_btn").click(function(){
t()===!0&&r($(this));
}),$("#reason").on("keyup",function(){
var n=$(this),o=n.val().length;
$("#reason_len").text(o),o>200?n.parent(".js_reason_parent").addClass("warn"):n.parent(".js_reason_parent").removeClass("warn");
});
}
function t(){
return l.form.form();
}
function r(n){
if(!n.hasClass("btn_loading")){
n.btn(0);
var o=$("#form1").serializeObject();
o.vid=window.cgiData.vid,""!=o.complain_url&&-1==o.complain_url.indexOf("://")&&(o.complain_url="http://"+o.complain_url),
m.post({
url:"/cgi-bin/ori_video?action=complain",
data:o,
mask:!1
},function(o){
n.btn(1),o&&o.base_resp&&0==o.base_resp.ret?(s.suc("提交申诉成功"),$("#msg_box").hide(),
$("#step1").hide(),$("#step2").removeClass("dn")):s.err("系统繁忙，请稍后再试");
});
}
}
n("biz_common/jquery.validate.js");
var a=n("biz_common/moment.js"),s=(n("common/wx/top.js"),n("common/wx/Tips.js")),m=(n("common/wx/dialog.js"),
n("common/wx/Cgi.js")),c=n("biz_web/utils/upload.js"),l={
submited:0
};
o(),e(),i();
});