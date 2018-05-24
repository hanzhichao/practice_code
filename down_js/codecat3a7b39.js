define("scan/mvp/codecat.js",["common/wx/Cgi.js","scan/mvp/codecat_barcode.js","scan/mvp/codecat_category.js"],function(e,t,r){
"use strict";
var i=(template.render,e("common/wx/Cgi.js"),e("scan/mvp/codecat_barcode.js")),n=e("scan/mvp/codecat_category.js"),s={};
s.presenter=function(e){
this.model=e,this.view=null;
},s.presenter.prototype.init=function(){
var e=this;
this.view.init(),this.barcodePresenter=new i.presenter(this.model),this.barcodeView=new i.view,
this.barcodePresenter.setView(this.barcodeView),this.barcodePresenter.init(),this.categoryPresenter=new n.presenter(this.model),
this.categoryView=new n.view,this.categoryPresenter.setView(this.categoryView),this.categoryPresenter.init(),
this.model.listenData("barcodes",function(){
e.view.setSubmitBtnEnable(!0);
});
},s.presenter.prototype.remove=function(){
this.barcodePresenter.remove(),this.categoryPresenter.remove();
},s.presenter.prototype.show=function(e){
this.view.show(e);
},s.presenter.prototype.setView=function(e){
this.view=e,this.view.setPresenter(this);
},s.presenter.prototype.getContainerName=function(){
return this.model.get("codecat_container");
},s.presenter.prototype.isValid=function(){
return 0==this.barcodePresenter.isValid()?!1:0==this.categoryPresenter.isValid()?!1:!0;
},s.presenter.prototype.getData=function(){
for(var e=this.barcodePresenter.getBarcodes(),t=[],r={},i={},n=[],s=0;s<e.length;s++)-1==t.indexOf(e[s].firm)&&t.push(e[s].firm);
for(var s=0;s<t.length;s++){
var o=t[s];
r[o]||(r[o]=[]);
for(var a=0;a<e.length;a++)e[a].firm==o&&r[o].push({
section_num:e[a].barcode
});
}
for(var s=0;s<t.length;s++){
var o=t[s];
i[o]||(i[o]=this.categoryPresenter.getCategoriesByFirm(o));
}
for(var s=0;s<t.length;s++){
var o=t[s];
n.push({
firm_info:{
firm_name:t[s]
},
sections:{
section_infos:r[o],
cats:i[o]
}
});
}
return console.log(n),n;
},s.view=function(){
this.presenter=null;
},s.view.prototype.setPresenter=function(e){
this.presenter=e;
},s.view.prototype.init=function(){
this.$btnSubmit=$("#js_btn_submit");
},s.view.prototype.show=function(e){
var t=$(this.presenter.getContainerName());
e?t.show():t.hide();
},s.view.prototype.setSubmitBtnEnable=function(e){
e?this.$btnSubmit.enable():this.$btnSubmit.disable();
},r.exports=s;
});