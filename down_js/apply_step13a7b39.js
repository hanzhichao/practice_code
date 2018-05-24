define("scan/mvp/apply_step1.js",["biz_web/ui/checkbox.js"],function(e,t,i){
"use strict";
var s=template.render,n=(e("biz_web/ui/checkbox.js"),{});
n.presenter=function(e){
this.model=e,this.view=null,this.isAgreed=!1;
},n.presenter.prototype.init=function(){
this.view.init();
},n.presenter.prototype.remove=function(){
this.view.remove();
},n.presenter.prototype.show=function(e){
this.view.show(e);
},n.presenter.prototype.setView=function(e){
this.view=e,this.view.setPresenter(this);
},n.presenter.prototype.setIsAgreed=function(e){
this.isAgreed=e;
},n.presenter.prototype.isValid=function(){
return this.isAgreed;
},n.presenter.prototype.showNextStep=function(){
this.model.setStep(2);
},n.view=function(){
this.presenter=null;
},n.view.prototype.setPresenter=function(e){
this.presenter=e;
},n.view.prototype.init=function(){
var e=this;
e.$dom=$(s("tpl_step1",{})),$("#js_div_result").hide(),$("#js_div_form").show(),
0==$("#js_div_step1").length&&$("#js_div_step").append(e.$dom);
var t=$("#js_input_agree"),i=e.$dom.find(".js_btn_agree");
t.checkbox({
onChanged:function(t){
e.presenter.setIsAgreed(t.is(":checked")),e.presenter.isValid()?i.enable():i.disable();
}
}),i.disable(),i.on("click",function(){
return e.presenter.isValid()&&e.presenter.showNextStep(),!1;
});
},n.view.prototype.remove=function(){
this.$dom.remove();
},n.view.prototype.show=function(e){
e?this.$dom.show():this.$dom.hide();
},i.exports=n;
});