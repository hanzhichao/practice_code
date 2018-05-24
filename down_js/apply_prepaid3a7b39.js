define("cardticket/apply_prepaid.js",["common/wx/Step.js","common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js","biz_web/utils/upload.js","biz_common/jquery.validate.js","common/wx/stopMultiRequest.js","cardticket/common_template_helper.js"],function(e){
"use strict";
function t(e){
e.each(function(){
var e=$(this),t=e.attr("id");
!function(t){
o.uploadTmpFile({
container:"#"+t,
multi:!1,
type:2,
onComplete:function(t,i,s,a){
var r=a.content||"",n=e.closest(".js_upload_box");
if(0==a.base_resp.ret){
$(".js_upload_preview",n).html('<img style="width:260px;" src="%s">'.sprintf(o.tmpFileUrl(r)));
var m=$(".js_input_field",n).val("temp_"+r);
m.parent().parent().find(".fail").remove(),c.suc("上传成功");
}
}
});
}(t);
});
}
function i(){
var e=wx.cgiData.data;
$("#js_body").html(template.render("js_prepay_tpl",{
data:e
})),t($(".js_select_file")),$("#js_submit_form").validate({
rules:{
prepaid_card_record_id:{
required:!0
},
prepaid_card_record_bizmedia_id:{
required:!0
}
},
messages:{
prepaid_card_record_id:{
required:"预付卡备案编号不能为空"
},
prepaid_card_record_bizmedia_id:{
required:"请选择文件"
}
},
ignore:[],
submitHandler:function(e){
var t=$(e).serializeObject();
wx.cgiData.data=t,s();
}
}),$("#js_next1").click(function(){
$("#js_submit_form").submit();
});
}
function s(){
var e=wx.cgiData.data;
$("#js_body").html(template.render("js_preview_tpl",{
data:e
})),$("#js_step1").click(function(){
i();
}),$("#js_submit").click(function(){
r.post({
url:"/merchant/cardapply",
data:e,
success:function(e){
0==e.base_resp.ret?($("#stepItems").html(""),$("#js_body").html(template.render("js_suc_tpl"))):r.show(e);
}
});
});
}
var a=e("common/wx/Step.js"),r=e("common/wx/Cgi.js"),c=e("common/wx/Tips.js"),o=(e("biz_web/ui/checkbox.js"),
e("biz_web/utils/upload.js"));
e("biz_common/jquery.validate.js"),e("common/wx/stopMultiRequest.js"),e("cardticket/common_template_helper.js");
new a({
container:"#stepItems",
selected:1,
names:["1 填写资料","2 预览提交"]
});
i();
});