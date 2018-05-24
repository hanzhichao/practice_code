define("scan/mvp/codecat_category.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/tooltips.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","biz_web/utils/upload.js","common/wx/preview.js","scan/biz_category.js","tpl/scan/category.html.js"],function(e,t,i){
"use strict";
var o=template.render,r=(e("common/wx/Cgi.js"),e("common/wx/Tips.js")),n=e("common/wx/tooltips.js"),a=(e("biz_web/ui/checkbox.js"),
e("biz_web/ui/dropdown.js")),s=e("biz_web/utils/upload.js"),c=(e("common/wx/preview.js"),
e("scan/biz_category.js")),d=c.category,p=e("tpl/scan/category.html.js"),l={};
l.presenter=function(e){
this.model=e,this.view=null,this.addedFiles=[],this.cats={},this.model.set("categories",this.cats);
},l.presenter.prototype.init=function(){
var e=this;
e.view.init(),e.model.listenData("barcodes",function(){
console.log("barcodes changed"),e.updateCategoryGroups();
});
},l.presenter.prototype.remove=function(){
this.model.unlistenData("barcodes"),this.model.set("categories",{});
},l.presenter.prototype.setView=function(e){
this.view=e,this.view.setPresenter(this);
},l.presenter.prototype.getContainerName=function(){
return this.model.get("codecat_container");
},l.presenter.prototype.getRandomID=function(){
return Math.random().toString(36).substr(2,5);
},l.presenter.prototype.getAddedFiles=function(){
return this.addedFiles;
},l.presenter.prototype.getBarcodeByCode=function(e){
for(var t=this.model.get("barcodes"),i=0;i<t.length;i++)if(e==t[i].barcode)return t[i];
return null;
},l.presenter.prototype.getBarcodesByFirm=function(e){
for(var t=this.model.get("barcodes"),i=[],o=0;o<t.length;o++)e==t[o].firm&&i.push(t[o].barcode);
return i;
},l.presenter.prototype.updateCategoryGroups=function(){
for(var e=this.model.get("barcodes"),t=[],i=[],o={},r=0;r<e.length;r++){
var n=e[r].firm;
"undefined"==typeof this.cats[n]&&-1==t.indexOf(n)&&t.push(n);
}
for(var n in this.cats){
for(var a=!1,r=0;r<e.length;r++)if(n==e[r].firm){
a=!0;
break;
}
0==a&&(this.cats[n]=void 0,i.push(n));
}
console.log("add",t),console.log("del",i);
for(var r=0;r<t.length;r++)this.addCategoryGroup(t[r]);
for(var r=0;r<i.length;r++)this.removeCategoryGroup(i[r]);
for(var r=0;r<e.length;r++){
var n=e[r].firm;
"undefined"==typeof o[n]&&(o[n]=[]),o[n].push(e[r].barcode);
}
for(var n in o)this.view.updateCategoryGroupBarcodes(n,o[n]);
},l.presenter.prototype.addCategoryGroup=function(e){
this.cats[e]=[],this.view.addCategoryGroup(e);
},l.presenter.prototype.removeCategoryGroup=function(e){
this.cats[e]=void 0,this.view.removeCategoryGroup(e),this.model.triggerEvent("remove_firm",{
firm:e
});
},l.presenter.prototype.isValid=function(){
return this.view.isValid();
},l.presenter.prototype.getCategoriesByFirm=function(e){
return this.view.getCategoriesByFirm(e);
},l.view=function(){
this.presenter=null,this.$catGroups={};
},l.view.prototype.setPresenter=function(e){
this.presenter=e;
},l.view.prototype.init=function(){
var e=this,t=e.presenter.getContainerName();
$(t).append(p),e.$catGroup=$("#js_div_category_group"),wx.cgiData.business_license_stuff&&$("#js_btn_license_file").attr("href",s.mediaFileUrl(wx.cgiData.business_license_stuff)),
$.validator.addMethod("category_exist",function(t,i){
for(var o=$(i).parents(".js_category_item").data("firm"),r=e.getCategoriesByFirm(o),n=0,a=0;a<r.length;a++)r[a].bc_info2.id==t&&n++;
return 1>=n?!0:!1;
}),e.$catGroup.on("click",".js_category_remove",function(){
$(this).parents(".js_category_item").remove(),$(".js_input_category_2").each(function(){
$(this).valid();
});
});
},l.view.prototype.addCategoryItem=function(e){
var t=this,i=t.presenter.getRandomID(),r=t.$catGroups[e],n=$(o("tpl_category_add",{
randID:i,
firm:e
}));
n.appendTo(r.find(".js_div_firm_category")),t.initFormValidation(n),r.find(".js_category_item").length<=1&&n.find(".js_category_remove").hide();
var s,c,p="#js_dropdown_"+i+"_category_1",l="#js_dropdown_"+i+"_category_2";
s=new a({
container:p,
label:"请选择",
data:d,
callback:function(e,r,s){
$(p).data("index",s),$(p).data("id",e),$(p).data("name",r),n.find(".js_input_category_1").val(e),
c&&c.destroy(),c=new a({
container:l,
data:d[s].sub,
callback:function(e,r,a){
$(l).data("index",a),$(l).data("id",e),$(l).data("name",r),n.find(".js_input_category_2").val(e);
var c=[s,a],p=[],f="";
0==d[c[0]].sub[c[1]].file.length&&(n.find(".js_div_category_file").html(o("tpl_category_file_empty")),
n.find(".js_div_category_file_checkbox").html(""));
for(var _=0;_<d[c[0]].sub[c[1]].file.length;_++){
var u=d[c[0]].sub[c[1]].file[_];
null!=u.menu&&p.push({
name:u.menu,
fileItemID:i+_,
parentRandID:i
});
for(var h=0;h<u.file.length;h++)f+=o("tpl_category_file",{
file:(u.menu?u.menu+"：":"")+u.file[h].name,
fileOptional:u.file[h].optional,
fileDesc:u.file[h].desc,
fileSample:u.file[h].sample,
fileSampleName:u.file[h].sampleName||"",
fileItemID:i+_,
randID:i+_+"_"+h,
parentRandID:i
});
n.find(".js_div_category_file").html(f),n.find(".js_div_category_file_checkbox").html(o("tpl_category_file_checkbox",{
list:p,
randID:i,
parentRandID:i
}));
var m=n.find(".js_div_category_file_checkbox input[type=checkbox]");
m.checkbox({
multi:!0,
onChanged:function(e){
m.checkbox("setall",!0),1==m.filter(":checked").length&&m.filter(":checked").checkbox().disabled(!0);
var t=".js_category_item_file_"+e.data("fileitemid");
""==e.checkbox("value")?n.find(t).addClass("js_hide").hide():n.find(t).removeClass("js_hide").show();
}
}).adjust("1");
}
t.initUploadForContainer(n),t.initFormValidation(n),$(".js_input_category_2").each(function(){
$(this).valid();
});
}
}),setTimeout(function(){
c.bt.find(".jsBtLabel").trigger("click");
},0);
}
}),c=new a({
container:l,
label:"请选择",
data:[],
callback:function(){}
}),setTimeout(function(){
$(".dropdown_wrp").css("zoom",0);
},10);
},l.view.prototype.updateCategoryGroupBarcodes=function(e,t){
var i=this.$catGroups[e];
i.find(".js_div_firm_barcodes").html(t.join("、"));
},l.view.prototype.removeCategoryGroup=function(e){
this.$catGroups[e].remove();
},l.view.prototype.addCategoryGroup=function(e){
var t=this,i=t.presenter.getBarcodesByFirm(e),r=$(o("tpl_category_group",{
firm:e,
barcode_list:i.join("、")
}));
t.$catGroups[e]=r,t.$catGroup.append(r),t.addCategoryItem(e),r.find(".js_btn_remove_group").on("click",function(){
var i=new n({
container:$(this),
content:"删除后，你将无法进一步获得这些条码编辑操作权限，是否确认删除？",
type:"click",
position:{
top:0,
left:-130
},
onclose:function(){},
buttons:[{
text:"删除",
type:"btn_primary",
click:function(){
t.presenter.removeCategoryGroup(e),this.hide();
}
},{
text:"取消",
type:"btn_default",
click:function(){
this.hide();
}
}]
});
return i.show(),!1;
}),r.find(".js_btn_add_category").on("click",function(){
t.addCategoryItem(e);
});
},l.view.prototype.initUploadForContainer=function(e){
var t=this;
$(e).find(".js_select_file").each(function(){
t.initUpload($(this));
});
},l.view.prototype.initUpload=function(e){
var t=$(e),i=t.parents(".js_select_file_group"),o=t.data("type")||2,n=i.find(".upload_preview"),a=i.find(".js_file_uploaded"),c=i.find(".upload_msg");
n.hide(),a.hide(),c.hide(),s.uploadTmpFile({
container:t,
multi:!1,
type:o,
onComplete:function(e,d,p,l){
var f=l.content||"";
if(0==l.base_resp.ret){
var _=s.tmpFileUrl(f);
2==o&&n.show().find("img").prop("src",_),a.show().html('已上传：{name} <a href="{url}" target="_blank">查看</a>'.format({
name:p.name,
url:_
})),c.hide(),t.html("重新上传"),i.find(".js_file_id").val(f),r.suc("上传成功");
}else r.err("上传失败");
}
});
},l.view.prototype.initFormValidation=function(e){
function t(e,t){
var i=t.parent().parent();
i.find(".js_frm_msg").html(e.html()).show();
}
var i={
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
errorPlacement:t
};
e.validate(i),e.find(".js_file_id").each(function(){
$(this).rules("add",{
required:function(e){
return $(e).parents(".js_select_file_group").is(":visible")&&"0"==$(e).data("optional")?!0:!1;
},
messages:{
required:"请上传文件"
}
});
});
},l.view.prototype.getCategoriesByFirm=function(e){
var t=[];
return this.$catGroups[e].find(".js_category_item").each(function(){
var e={
bc_info1:{
name:$(this).find(".js_dropdown_category_1").data("name"),
id:$(this).find(".js_dropdown_category_1").data("id")
},
bc_info2:{
name:$(this).find(".js_dropdown_category_2").data("name"),
id:$(this).find(".js_dropdown_category_2").data("id")
},
file_category:[],
file:[]
};
$(this).find(".js_section_category_file_checkbox input[type=checkbox]:checked").each(function(){
e.file_category.push($(this).data("name"));
}),$(this).find(".js_category_item_file").each(function(){
if(!$(this).hasClass("js_hide")){
var t=$(this).find(".js_input_category_file").val(),i=$(this).find(".js_input_category_name").val();
""!=t&&e.file.push({
id:t,
name:i
});
}
}),t.push(e);
}),t;
},l.view.prototype.isValid=function(){
var e=!0;
return $(".js_category_item").each(function(){
e=$(this).valid()&e;
}),e;
},i.exports=l;
});