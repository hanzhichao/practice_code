define("scan/mvp/apply_step3.js",["common/wx/Cgi.js","common/wx/Tips.js","scan/mvp/extendfile.js"],function(e,t,i){
"use strict";
var s=template.render,n=e("common/wx/Cgi.js"),o=e("common/wx/Tips.js"),r=e("scan/mvp/extendfile.js"),p={};
p.presenter=function(e){
this.model=e,this.view=null;
},p.presenter.prototype.init=function(){
this.view.init(),this.model.set("extendfile_container","#js_div_extendfile"),this.extendFilePresenter=new r.presenter(this.model),
this.extendFileView=new r.view,this.extendFilePresenter.setView(this.extendFileView),
this.extendFilePresenter.init();
},p.presenter.prototype.remove=function(){
this.view.remove(),this.model.set("result",void 0);
},p.presenter.prototype.show=function(e){
this.view.show(e);
},p.presenter.prototype.setView=function(e){
this.view=e,this.view.setPresenter(this);
},p.presenter.prototype.showPreviousStep=function(){
var e=confirm("返回上一步将清空已填写的内容");
e&&this.model.setStep(2);
},p.presenter.prototype.submitForm=function(){
var e=this;
if(0==e.extendFilePresenter.isValid())return!1;
e.view.setSubmitBtnLoading(!0);
var t=e.extendFilePresenter.getData(),i={
business_license_stuff:wx.cgiData.business_license_stuff,
data:JSON.stringify({
data:t
})
};
console.log("postData",i),n.post({
url:"/merchant/scanapply?action=submit",
data:i,
mask:!1
},function(t){
e.view.setSubmitBtnLoading(!1),0==t.base_resp.ret?(e.model.set("result",t.firm_info_add_result),
e.model.setStep(4)):o.err(14150==t.base_resp.ret?"商标名称和厂商信息不吻合":14153==t.base_resp.ret?"厂商信息已被认领，请更换":"提交失败，请重试");
});
},p.view=function(){
this.presenter=null,this.$btnSubmit=null;
},p.view.prototype.setPresenter=function(e){
this.presenter=e;
},p.view.prototype.setSubmitBtnEnabled=function(e){
e?this.$btnSubmit.enable():this.$btnSubmit.disable();
},p.view.prototype.setSubmitBtnLoading=function(e){
this.$btnSubmit.btn(!e);
},p.view.prototype.init=function(){
var e=this;
e.$dom=$(s("tpl_step3",{})),$("#js_div_result").hide(),$("#js_div_form").show(),
0==$("#js_div_step3").length&&$("#js_div_step").append(e.$dom),e.$btnSubmit=e.$dom.find(".js_btn_submit"),
e.$dom.find(".js_btn_previous").on("click",function(){
e.presenter.showPreviousStep();
}),e.$btnSubmit.on("click",function(){
return $(this).hasClass("btn_disabled")||$(this).hasClass("btn_loading")?!1:void e.presenter.submitForm();
});
},p.view.prototype.remove=function(){
this.$dom.remove();
},p.view.prototype.show=function(e){
e?this.$dom.show():this.$dom.hide();
},i.exports=p;
});