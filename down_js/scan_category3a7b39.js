define("scan/scan_category.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","common/wx/inputCounter.js","common/wx/Tips.js","common/wx/tooltips.js","biz_web/utils/upload.js","common/wx/popup.js","common/wx/preview.js","common/wx/multiSelector.js","biz_common/jquery.validate.js","scan/biz_category.js","tpl/scan/category.html.js"],function(e){
"use strict";
function i(){
return Math.random().toString(36).substr(2,5);
}
function t(e){
var i=$(e),t=i.parents(".js_select_file_group"),a=i.data("type")||2,n=t.find(".upload_preview"),o=t.find(".js_file_uploaded"),c=t.find(".upload_msg");
n.hide(),o.hide(),c.hide(),u.uploadTmpFile({
container:i,
multi:!1,
type:a,
onComplete:function(e,s,r,d){
var l=d.content||"";
if(0==d.base_resp.ret){
var _=u.tmpFileUrl(l);
2==a&&n.show().find("img").prop("src",_),o.show().html('已上传：{name} <a href="{url}" target="_blank">查看</a>'.format({
name:r.name,
url:_
})),c.hide(),i.html("重新上传"),t.find(".js_file_id").val(l),f.suc("上传成功");
}else f.err("上传失败");
}
});
}
function a(e){
$(e).find(".js_select_file").each(function(){
t($(this));
});
}
function n(){
var e=[];
return j.find(".js_category_item").each(function(){
var i={
cat1:{
name:$(this).find(".js_dropdown_category_1").data("name"),
id:$(this).find(".js_dropdown_category_1").data("id")
},
cat2:{
name:$(this).find(".js_dropdown_category_2").data("name"),
id:$(this).find(".js_dropdown_category_2").data("id")
},
file_category:[],
file:[]
};
$(this).find(".js_section_category_file_checkbox input[type=checkbox]:checked").each(function(){
i.file_category.push($(this).data("name"));
}),$(this).find(".js_category_item_file").each(function(){
$(this).hasClass("js_hide")||i.file.push({
id:$(this).find(".js_input_category_file").val(),
name:$(this).find(".js_input_category_name").val()
});
}),e.push(i);
}),e;
}
function o(e){
function i(e,i){
var t=i.parent().parent();
t.find(".js_frm_msg").html(e.html()).show();
}
var t={
ignore:".js_input_ignore",
rules:{
category_id_1:{
required:!0
},
category_id_2:{
required:!0,
category_exist:!0
}
},
messages:{
category_id_1:{
required:"请选择经营类目"
},
category_id_2:{
required:"请选择经营类目",
category_exist:"经营类目重复"
}
},
errorPlacement:i
};
e.validate(t),e.find(".js_file_id").each(function(){
$(this).rules("add",{
required:function(e){
return $(e).parents(".js_select_file_group").is(":visible")&&"0"==$(e).data("optional")?!0:!1;
},
messages:{
required:"请上传文件"
}
});
});
}
function c(){
var e=i(),t=$(l("tpl_category_add",{
randID:e
}));
t.appendTo(j),o(t),j.find(".js_category_item").length<=1&&t.find(".js_category_remove").hide();
var n,c,s="#js_dropdown_"+e+"_category_1",r="#js_dropdown_"+e+"_category_2";
n=new _({
container:s,
label:"请选择",
data:p,
callback:function(i,n,d){
$(s).data("index",d),$(s).data("id",i),$(s).data("name",n),t.find(".js_input_category_1").val(i),
c&&c.destroy(),c=new _({
container:r,
data:p[d].sub,
callback:function(i,n,c){
$(r).data("index",c),$(r).data("id",i),$(r).data("name",n),t.find(".js_input_category_2").val(i);
var s=[d,c],_=[],f="";
0==p[s[0]].sub[s[1]].file.length&&(t.find(".js_div_category_file").html(l("tpl_category_file_empty")),
t.find(".js_div_category_file_checkbox").html(""));
for(var u=0;u<p[s[0]].sub[s[1]].file.length;u++){
var m=p[s[0]].sub[s[1]].file[u];
null!=m.menu&&_.push({
name:m.menu,
fileItemID:e+u,
parentRandID:e
});
for(var h=0;h<m.file.length;h++)f+=l("tpl_category_file",{
file:(m.menu?m.menu+"：":"")+m.file[h].name,
fileOptional:m.file[h].optional,
fileDesc:m.file[h].desc,
fileSample:m.file[h].sample,
fileSampleName:m.file[h].sampleName||"",
fileItemID:e+u,
randID:e+u+"_"+h,
parentRandID:e
});
t.find(".js_div_category_file").html(f),t.find(".js_div_category_file_checkbox").html(l("tpl_category_file_checkbox",{
list:_,
randID:e,
parentRandID:e
}));
var g=t.find(".js_div_category_file_checkbox input[type=checkbox]");
g.checkbox({
multi:!0,
onChanged:function(e){
g.checkbox("setall",!0),1==g.filter(":checked").length&&g.filter(":checked").checkbox().disabled(!0);
var i=".js_category_item_file_"+e.data("fileitemid");
""==e.checkbox("value")?t.find(i).addClass("js_hide").hide():t.find(i).removeClass("js_hide").show();
}
}).adjust("1");
}
a(t),o(t),$(".js_input_category_2").each(function(){
$(this).valid();
});
}
}),setTimeout(function(){
c.bt.find(".jsBtLabel").trigger("click");
},0);
}
}),c=new _({
container:r,
label:"请选择",
data:[],
callback:function(){}
}),setTimeout(function(){
$(".dropdown_wrp").css("zoom",0);
},10);
}
function s(){
if($(g).html(h),j=$("#js_div_added_category"),y=$("#js_div_added_category_file"),
wx.cgiData.business_license_stuff){
var e={
name:"营业执照",
type:"business_license_stuff",
file:wx.cgiData.business_license_stuff,
img:"",
desc:"该公众号认证的营业执照如下，不支持更改和删除。"
};
e.img=u.mediaFileUrl(e.file),b.push(e);
}
$.validator.addMethod("category_exist",function(e){
for(var i=n(),t=0,a=0;a<i.length;a++)i[a].cat2.id==e&&t++;
return 1>=t?!0:!1;
});
}
function r(){
c(),y.html(l("tpl_category_file_added",{
list:b,
urlParam:wx.data.param
}));
}
function d(){
$("#js_btn_add_category").on("click",c),j.on("click",".js_category_remove",function(){
$(this).parents(".js_category_item").remove(),$(".js_input_category_2").each(function(){
$(this).valid();
});
}),y.on("click",".js_img",function(){
var e=$(this).attr("src");
m.show({
imgdata:[{
imgsrc:e,
downsrc:e
}],
current:0
});
});
}
var l=(wx.T,e("common/wx/Cgi.js"),template.render),_=(e("biz_web/ui/checkbox.js"),
e("biz_web/ui/dropdown.js")),f=(e("common/wx/inputCounter.js"),e("common/wx/Tips.js")),u=(e("common/wx/tooltips.js"),
e("biz_web/utils/upload.js")),m=(e("common/wx/popup.js"),e("common/wx/preview.js")),p=(e("common/wx/multiSelector.js"),
e("biz_common/jquery.validate.js"),e("scan/biz_category.js")),h=e("tpl/scan/category.html.js"),g=null,j=null,y=null,b=[];
return{
init:function(e){
g=e,s(),r(),d();
},
valid:function(){
var e=!0;
return $(".js_category_item").each(function(){
e=$(this).valid()&e;
}),e;
},
getCategories:n
};
});