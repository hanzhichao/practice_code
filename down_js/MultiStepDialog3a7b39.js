define("original/MultiStepDialog.js",["common/wx/Step.js","common/wx/popup.js","original/tpl/MultiStepDialog.html.js"],function(t){
"use strict";
function n(t){
var n=this;
n.opt=$.extend(!0,{},s,t),n.stepCount=0,n.currentStep=0,n.btnsConfig=[],n.btnCountMap={
0:0
},n.steps=[],n.initer=[],n.dialog=null,n.$dialog=null,n.$step=null,n.$stepDom=[],
n.$btns=[];
}
var e=t("common/wx/Step.js"),o=(t("common/wx/popup.js"),t("original/tpl/MultiStepDialog.html.js")),s={
title:"",
className:""
};
return n.prototype={
register:function(t){
var n=this;
n.steps.push(t.stepName||"Step"+(n.stepCount+1));
for(var e=t.buttons.length,o=0;e>o;o++)n.btnsConfig.push(t.buttons[o]);
return n.btnCountMap[n.stepCount+1]=n.btnCountMap[n.stepCount]+e,n.initer.push(t.init),
n.stepCount++,n;
},
show:function(){
for(var t=this,n=[],s=0,i=t.btnsConfig.length;i>s;s++){
var r={},p=t.btnsConfig[s];
for(var u in p)p.hasOwnProperty(u)&&"click"!=u&&(r[u]=p[u]);
r.click=function(n){
return function(){
n&&n.call(t);
};
}(p.click),n.push(r),t.$btns.push({
click:p.click
});
}
var a=template.compile(o)({
steps:t.steps
});
t.dialog=$(a).popup({
title:t.opt.title,
className:t.opt.className,
onShow:function(){
t.$dialog=this;
},
close:function(){
this.remove();
},
buttons:n
});
for(var l=[],s=0;s<t.stepCount;s++)l.push(s+1+" "+t.steps[s]),t.$stepDom.push(t.dialog.find(".js_step"+s));
t.$step=l.length>1?new e({
container:t.dialog.find(".js_process"),
selected:1,
names:l
}):null;
var c=t.dialog.find(".js_btn_p");
c.hide();
for(var s=0,i=t.$btns.length;i>s;s++)t.$btns[s].dom=c.eq(s),s<t.btnCountMap[1]&&t.$btns[s].dom.show();
return t.initer[0](t.$stepDom[0]),t.$stepDom[0].data("inited",!0),t.$dialog.resetPosition(),
t;
},
next:function(){
var t=this;
if(t.stepCount>t.currentStep+1){
t.$step.go(t.currentStep+2),t.$stepDom[t.currentStep].hide(),t.$stepDom[t.currentStep+1].show();
for(var n=0,e=t.$btns.length;e>n;n++)n>=t.btnCountMap[t.currentStep+1]&&n<t.btnCountMap[t.currentStep+2]?t.$btns[n].dom.show():t.$btns[n].dom.hide();
t.$stepDom[t.currentStep+1].data("inited")||(t.initer[t.currentStep+1](t.$stepDom[t.currentStep+1]),
t.$stepDom[t.currentStep+1].data("inited",!0),t.$dialog.resetPosition()),t.currentStep++;
}
return this;
},
pre:function(){
var t=this;
if(t.currentStep>0){
t.$step.go(t.currentStep),t.$stepDom[t.currentStep].hide(),t.$stepDom[t.currentStep-1].show();
for(var n=0,e=t.$btns.length;e>n;n++)n>=t.btnCountMap[t.currentStep-1]&&n<t.btnCountMap[t.currentStep]?t.$btns[n].dom.show():t.$btns[n].dom.hide();
t.currentStep--;
}
return this;
},
enableBtn:function(t,n){
var e=this,o=e.btnCountMap[t]+n;
return e.$btns[o].dom.removeClass("btn_disabled").addClass("btn_primary"),e;
},
disableBtn:function(t,n){
var e=this,o=e.btnCountMap[t]+n;
return e.$btns[o].dom.removeClass("btn_primary").addClass("btn_disabled"),e;
},
hide:function(){
return this.$dialog&&this.$dialog.hide(),!1;
},
remove:function(){
this.dialog&&(this.dialog.popup("remove"),this.dialog=null);
}
},n;
});