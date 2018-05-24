define("scan/mvp/extendfile.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/tooltips.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","biz_web/utils/upload.js","common/wx/preview.js","tpl/scan/extendfile.html.js"],function(e,t,i){
"use strict";
var n=template.render,s=(e("common/wx/Cgi.js"),e("common/wx/Tips.js")),o=(e("common/wx/tooltips.js"),
e("biz_web/ui/checkbox.js"),e("biz_web/ui/dropdown.js"),e("biz_web/utils/upload.js")),r=(e("common/wx/preview.js"),
e("tpl/scan/extendfile.html.js")),a={};
a.presenter=function(e){
this.model=e,this.view=null;
},a.presenter.prototype.init=function(){
var e=this;
e.view.init();
},a.presenter.prototype.show=function(e){
this.view.show(e);
},a.presenter.prototype.setView=function(e){
this.view=e,this.view.setPresenter(this);
},a.presenter.prototype.getContainerName=function(){
return this.model.get("extendfile_container");
},a.presenter.prototype.isValid=function(){
return this.view.isValid();
},a.presenter.prototype.getCodeCatData=function(){
for(var e=$.extend(!0,[],this.model.get("codecat")),t=/\(|\)| |（|）|\_|\-|—/g,i=wx.cgiData.stuff_name.replace(t,""),n=0;n<e.length;n++){
var s=e[n].firm_info.firm_name.replace(t,"");
e[n].firm_info.is_firm_stuff_same=s===i;
for(var r=[],a=0;a<e[n].sections.section_infos.length;a++)r.push(e[n].sections.section_infos[a].section_num);
e[n].sections.section_text=r.join("、");
for(var a=0;a<e[n].sections.cats.length;a++){
e[n].sections.cats[a].has_file=!1;
for(var f=0;f<e[n].sections.cats[a].file.length;f++){
var l=e[n].sections.cats[a].file[f];
l.id&&(e[n].sections.cats[a].has_file=!0,l.url=o.tmpFileUrl(l.id));
}
}
}
return console.log("getCodeCatData",e),e;
},a.presenter.prototype.getData=function(){
for(var e=this.model.get("codecat"),t=this.view.getFiles(),i=0;i<e.length;i++)if(t[i])for(var n=0;n<e[i].sections.cats.length;n++)if(t[i][n])for(var s=e[i].sections.cats[n],o=0;o<t[i][n].length;o++)s.file.push(t[i][n][o]);
return console.log("getData",e),e;
},a.view=function(){
this.presenter=null,this.$dom=null;
},a.view.prototype.setPresenter=function(e){
this.presenter=e;
},a.view.prototype.init=function(){
var e=this,t=e.presenter.getContainerName();
$(t).append(r),e.$dom=$("#js_div_extendfile_list");
var i=e.presenter.getCodeCatData();
e.$dom.html(n("tpl_extendfile_list",{
codecat:i,
stuff_name:wx.cgiData.stuff_name
})),e.$dom.find(".js_select_file").each(function(){
e.initUpload(this);
}),e.$dom.find(".js_div_extendfile_cat").each(function(){
var t=$(this);
t.find(".js_radio_stuff_same").checkbox({
multi:!1,
onChanged:function(s){
if("0"==s.checkbox("value")){
var o=$(n("tpl_stuff_same",{
codecat:i,
stuff_name:wx.cgiData.stuff_name
}));
o.find(".js_select_file").each(function(){
e.initUpload(this);
}),t.find(".js_div_stuff_same").html(o);
}else t.find(".js_div_stuff_same").empty();
}
}),t.find(".js_form_stuff_same").validate({
ignore:".js_input_ignore",
rules:{
stuff_same:{
required:!0
}
},
messages:{
stuff_same:{
required:"请确认主体"
}
},
errorPlacement:function(e,t){
$(t).parents("form").find(".js_frm_msg").html(e.html()).show();
}
});
});
},a.view.prototype.initUpload=function(e){
var t=$(e),i=t.parents(".js_select_file_group"),n=i.find(".upload_preview"),r=i.find(".js_file_uploaded"),a=i.find(".upload_msg");
n.hide(),r.hide(),a.hide(),o.uploadTmpFile({
container:t,
multi:!1,
type:2,
onComplete:function(e,f,l,c){
var d=c.content||"";
if(0==c.base_resp.ret){
var p=o.tmpFileUrl(d);
n.show().find("img").prop("src",p),r.show().html('已上传：{name} <a href="{url}" target="_blank">查看</a>'.format({
name:l.name,
url:p
})),a.hide(),t.html("重新上传"),i.find(".js_input_file_id").val(d),s.suc("上传成功");
}else s.err("上传失败");
}
});
var f={
ignore:".js_input_ignore",
rules:{
file_id:{
required:function(e){
return"1"==$(e).data("optional")?!1:!0;
}
}
},
messages:{
file_id:{
required:"请上传文件"
}
},
errorPlacement:function(e){
a.html(e.html()).show();
}
};
i.validate(f);
},a.view.prototype.getFiles=function(){
var e=this,t={};
return e.$dom.find(".js_div_extendfile_group").each(function(){
var e=1*$(this).data("index");
t[e]={},$(this).find(".js_div_extendfile_cat").each(function(){
var i=1*$(this).data("index"),n=[];
$(this).find(".js_select_file_group").each(function(){
var e=$(this).find(".js_input_file_id").val(),t=$(this).find(".js_input_file_name").val();
""!=e&&n.push({
id:e,
name:t
});
}),t[e][i]=n;
});
}),console.log("getFiles",t),t;
},a.view.prototype.isValid=function(){
var e=!0;
return this.$dom.find("form").each(function(){
e=$(this).valid()&e;
}),e;
},a.view.prototype.show=function(e){
e?this.$dom.show():this.$dom.hide();
},i.exports=a;
});