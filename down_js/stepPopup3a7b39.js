define("common/wx/stepPopup.js",["common/wx/Step.js","common/wx/popup.js"],function(t){
"use strict";
var o=t("common/wx/Step.js"),p=(t("common/wx/popup.js"),template.compile('<div><div class="js_step_container"></div><div class="js_step_contents processor_panel">{each names as item i}<div class="js_step_content_{i} js_step_content"></div>{/each}</div></div>')),s=function(t){
t.autoShow="undefined"==typeof t.autoShow?!1:t.autoShow,this.popup=$(p({
names:t.stepNames
})).popup(t),this.$dom=this.popup.popup("get"),this.opt=t;
var s=this.$dom.find(".js_btn_p"),e=this.$dom.find(".js_step_content").toArray();
if(s.length==t.buttons.length)for(var n=0;n<t.buttons.length;n++){
var i=t.buttons[n].step||0;
e[i]?$.isArray(e[i])?e[i].push(s[n]):e[i]=[e[i],s[n]]:e[i]=s[n];
}
this.stepContents=e,this.step=new o({
container:this.$dom.find(".js_step_container"),
names:t.stepNames,
contents:e
}),this.go(0);
};
return s.prototype.show=function(){
this.popup.popup("show");
},s.prototype.hide=function(){
this.popup.popup("hide");
},s.prototype.go=function(t,o){
var p=this.opt.stepNames.length;
t=0>t?0:t>p-1?p-1:t,this.step.go(t+1),this.currentStep=t,o&&this.initContent(t,o),
this.popup.popup("resetPosition");
},s.prototype.initContent=function(t,o){
var p=$(this.$dom.find(".js_step_content")[t]).html(o);
return this.popup.popup("resetPosition"),p;
},s.prototype.getContent=function(t){
return $(this.$dom.find(".js_step_content")[t]);
},s.prototype.prev=function(){
var t=this.currentStep-1;
this.go(t);
},s.prototype.next=function(){
var t=this.currentStep+1;
this.go(t);
},s;
});