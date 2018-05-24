define("city/service_new.js",["common/wx/top.js","common/wx/city/base.js","common/wx/city/citys.js","biz_web/ui/dropdown.js","biz_web/utils/upload.js","common/wx/Cgi.js","common/wx/Tips.js"],function(e){
"use strict";
function i(){
o(),n(u.class_list),t(),_(),s();
}
function o(){
var e=[{
id:"servie_manage",
name:"服务管理",
url:"/city/servicemanage?action=getlist"
},{
id:"biztemplate",
name:"接口能力",
url:"/city/biztemplate?action=index"
}],i=new r("#js_topTab",e);
i.selected("servie_manage");
}
function n(e){
for(var i=[],o=0,n=e.length;n>o;o++)e[o]&&i.push(e[o]);
d=new l({
container:"#js_service_type_drop",
label:"请选择",
data:i,
callback:function(e){
w.class_index=e;
}
});
}
function t(){
v=citys({
container:"#tv_cover_html_area",
cover:!0,
over_top:!1,
callback:function(e){
for(var i="",o="",n=0,t=e.length;t>n;n++)0!=n&&(i+="、",o+=";"),o+=e[n].id,i+=e[n].name;
e.length>0&&$("#js_btn_edit_cover_area").html("修改"),$("#js_cover_area_ids").val(o),
$("#js_cover_area_names").html(i),$("#float_cover").css("display","none");
}
});
}
function _(){
j=m.uploadFile({
container:"#js_btn_file_upload",
url:"/city/fileupload?action=upload_file",
multi:!0,
accept:{
extensions:"bmp,png,jpeg,jpg,gif,pdf,doc,zip,docx",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif,application/pdf,application/msword,application/x-zip-compressed,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
},
fileSingleSizeLimit:10485760,
onComplete:function(e,i,o,n,t){
if(!n.base_resp||0==n.base_resp.ret){
console.log("response: "+JSON.stringify(n));
var _="";
for(var s in o)_+=s+": "+o[s]+", ";
console.log("fileObj: "+_),console.log("data: "+JSON.stringify(t));
var a=n.url;
$("#js_authorize_preview").attr("href",a),o&&o.name&&$("#js_authorize_preview").text(o.name),
$("#js_btn_file_upload").text("重新上传"),w.doc[0].file_name=o&&o.name?o.name:"",w.doc[0].url=a,
w.doc[0].last_modified=parseInt((new Date).getTime()/1e3),w.doc[0].category="1";
}
}
});
}
function s(){
$("#js_btn_edit_cover_area").on("click",function(){
v.init($("#js_cover_area_ids").val());
}),$("#js_btn_add_service").on("click",function(){
a();
});
}
function a(){
var e=c();
e&&(w.doc&&w.doc[0]&&w.doc[0].url&&(e.doc=JSON.stringify(w.doc)),p.post({
url:wx.url("/city/servicemanage?action=add"),
data:e,
error:function(){
common.showErrWnd("提交基础信息申请，网络请求失败！");
}
},function(e){
if(e&&e.base_resp){
var i=e.base_resp.ret;
if(0==i)return void common.showErrWnd("已提交基础信息申请！",function(){
location.href="/city/servicemanage?action=getlist&lang="+u.lang+"&token="+u.token;
});
}
common.showErrWnd("提交基础信息申请，请求失败！");
}));
}
function c(){
var e=!0,i={};
i.service_name=$.trim($("#js_service_name").val()),i.service_name&&"将作为线上名称参考"!=i.service_name?$("#js_service_name_tip").hide():($("#js_service_name").focus(),
$("#js_service_name_tip").show(),e=!1),i.service_url=$.trim($("#js_service_url").val());
var o=/^http[s]?:\/\/.+$/;
i.service_url&&"服务推荐使用https协议"!=i.service_url?o.test(i.service_url)?$("#js_service_url_tip").hide():($("#js_service_url").focus(),
$("#js_service_url_tip").show(),$("#js_service_url_tip").html("服务链接填写请以http://或https://开头"),
e=!1):($("#js_service_url").focus(),$("#js_service_url_tip").show(),e=!1);
var n=[],t=$("#js_cover_area_ids").val();
if(t&&t.trim().length>0){
for(var _=t.split(";"),s=0,a=_.length;a>s;s++){
var c=_[s].split(":");
n.push(parseInt(c[1]));
}
i.district_ids=JSON.stringify(n),$("#js_cover_area_tip").hide();
}else $("#js_cover_area_tip").show(),e=!1;
return w.class_index?($("#js_service_type_tip").hide(),i.class_index=w.class_index):($("#js_service_type_tip").show(),
e=!1),i.owner_company=$.trim($("#js_owner_company").val()),i.owner_company&&"请填写服务所属单位名称"!=i.owner_company?$("#js_contact_owner_tip").hide():($("#js_contact_owner_tip").show(),
e=!1),i.owner_name=$.trim($("#js_owner_name").val()),i.owner_name&&"请填写服务所属单位接口人"!=i.owner_name?$("#js_contact_owner_tip").hide():($("#js_contact_owner_tip").show(),
e=!1),i.owner_phone=$.trim($("#js_owner_phone").val()),i.owner_phone&&"请填写上述接口人手机号"!=i.owner_phone?$("#js_contact_owner_tip").hide():($("#js_contact_owner_tip").show(),
e=!1),i.owner_email=$.trim($("#js_owner_email").val()),i.owner_email&&"请填写上述接口人邮箱地址"!=i.owner_email?$("#js_contact_owner_tip").hide():($("#js_contact_owner_tip").show(),
e=!1),i.dev_company=$.trim($("#js_dev_company").val()),i.dev_company&&"请填写服务所属单位名称"!=i.dev_company?$("#js_contact_dev_tip").hide():($("#js_contact_dev_tip").show(),
e=!1),i.dev_name=$.trim($("#js_dev_name").val()),i.dev_name&&"请填写服务所属单位接口人"!=i.dev_name?$("#js_contact_dev_tip").hide():($("#js_contact_dev_tip").show(),
e=!1),i.dev_phone=$.trim($("#js_dev_phone").val()),i.dev_phone&&"请填写上述接口人手机号"!=i.dev_phone?$("#js_contact_dev_tip").hide():($("#js_contact_dev_tip").show(),
e=!1),i.dev_email=$.trim($("#js_dev_email").val()),i.dev_email&&"请填写上述接口人邮箱地址"!=i.dev_email?$("#js_contact_dev_tip").hide():($("#js_contact_dev_tip").show(),
e=!1),e?i:!1;
}
var r=e("common/wx/top.js");
e("common/wx/city/base.js"),e("common/wx/city/citys.js");
var l=e("biz_web/ui/dropdown.js"),m=e("biz_web/utils/upload.js"),p=e("common/wx/Cgi.js"),d=(e("common/wx/Tips.js"),
null),v=null,j=null,w={
class_index:0,
doc:[{
file_name:"",
url:"",
last_modified:0,
category:""
}]
},u=window.cgiData;
i();
});