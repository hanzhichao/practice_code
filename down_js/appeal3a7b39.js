define("scan/appeal.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/utils/upload.js"],function(e){
"use strict";
function i(e){
m.uploadTmpFile({
container:e,
multi:!1,
type:2,
onComplete:function(i,n,s,r){
var a=r.content||"";
switch(+r.base_resp.ret){
case 0:
t(e,a),p.suc("上传成功");
break;

case 200034:
p.err("图片尺寸错误");
break;

case 1:
p.err("图片太大");
break;

case 200011:
p.err("请上传合法的图片格式");
break;

default:
p.err("上传失败");
}
}
});
}
function t(e,i){
var t=$(e),n=t.parents(".js_select_file_group"),s=n.find(".js_frm_msg"),r=(n.find(".js_uploaded_msg"),
n.find(".js_div_preview")),a=n.find(".js_input_file");
a.val(i),r.find("img").prop("src",m.tmpFileUrl(i)),r.show(),s.hide(),t.html("重新上传");
}
function n(){
var e=!0;
return _.find(".js_input_file").each(function(){
"1"==$(this).data("required")&&(""==$(this).val()?(e=!1,$(this).parents(".js_select_file_group").find(".js_frm_msg").html("请上传文件").show()):$(this).parents(".js_select_file_group").find(".js_frm_msg").hide());
}),e;
}
function s(){
f=$("#js_div_result"),_=$("#js_form"),u=$("#js_btn_submit"),c=$("#js_div_submit");
}
function r(){
_.html(1==wx.cgiData.barcode_country_type?d("tpl_form_country_type_1"):d("tpl_form_country_type_0")),
_.show(),c.show(),f.hide();
}
function a(){
_.find(".js_select_file").each(function(){
var e="#"+$(this).attr("id");
i(e);
}),u.on("click",function(){
if(0==n())return!1;
var e={
keystr:wx.cgiData.keystr,
keystandard:wx.cgiData.keystandard,
business_file:_.find('input[name="business_file"]').val(),
barcode_file:_.find('input[name="barcode_file"]').val(),
other_file:_.find('input[name="other_file"]').val()
};
return u.btn(!1),l.post({
url:"/merchant/scanproductadd?action=appeal_submit",
data:e
},function(e){
u.btn(!0),0==e.base_resp.ret?(_.hide(),c.hide(),f.show()):p.err("提交失败，请重试");
}),!1;
});
}
function o(){
s(),r(),a();
}
var _,c,f,u,l=e("common/wx/Cgi.js"),d=template.render,p=e("common/wx/Tips.js"),m=e("biz_web/utils/upload.js");
o();
});