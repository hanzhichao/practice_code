define("scan/mvp/apply_step2.js",["common/wx/Cgi.js","common/wx/Tips.js","scan/mvp/codecat.js"],function(e,t,i){
"use strict";
var s=template.render,o=(e("common/wx/Cgi.js"),e("common/wx/Tips.js"),e("scan/mvp/codecat.js")),n={};
n.presenter=function(e){
this.model=e,this.view=null;
},n.presenter.prototype.init=function(){
this.view.init(),this.model.set("codecat_container","#js_div_codecat"),this.codeCatPresenter=new o.presenter(this.model),
this.codeCatView=new o.view,this.codeCatPresenter.setView(this.codeCatView),this.codeCatPresenter.init();
},n.presenter.prototype.remove=function(){
this.view.remove(),this.codeCatPresenter.remove(),this.model.set("codecat",void 0);
},n.presenter.prototype.show=function(e){
this.view.show(e);
},n.presenter.prototype.setView=function(e){
this.view=e,this.view.setPresenter(this);
},n.presenter.prototype.showPreviousStep=function(){
var e=confirm("返回上一步将清空已填写的内容");
e&&this.model.setStep(1);
},n.presenter.prototype.showNextStep=function(){
var e=this;
if(0==e.codeCatPresenter.isValid())return!1;
var t=e.codeCatPresenter.getData();
console.log(JSON.stringify(t)),e.model.set("codecat",t),e.model.setStep(3);
},n.view=function(){
this.presenter=null,this.$btnSubmit=null;
},n.view.prototype.setPresenter=function(e){
this.presenter=e;
},n.view.prototype.setSubmitBtnEnabled=function(e){
e?this.$btnSubmit.enable():this.$btnSubmit.disable();
},n.view.prototype.setSubmitBtnLoading=function(e){
this.$btnSubmit.btn(!e);
},n.view.prototype.init=function(){
var e=this;
e.$dom=$(s("tpl_step2",{})),$("#js_div_result").hide(),$("#js_div_form").show(),
$(".js_div_step").hide(),0==$("#js_div_step2").length&&$("#js_div_step").append(e.$dom),
e.$btnSubmit=e.$dom.find(".js_btn_submit"),e.$dom.find(".js_btn_previous").on("click",function(){
e.presenter.showPreviousStep();
}),e.$btnSubmit.on("click",function(){
return $(this).hasClass("btn_disabled")||$(this).hasClass("btn_loading")?!1:void e.presenter.showNextStep();
});
},n.view.prototype.remove=function(){
this.$dom.remove();
},n.view.prototype.show=function(e){
e?this.$dom.show():this.$dom.hide();
},i.exports=n;
});