define("scan/mvp/apply_model.js",["common/wx/Step.js"],function(t,e,n){
"use strict";
var i=t("common/wx/Step.js"),l=function(){
this.data={},this.listenCallback={},this.eventCallback={},this.step=null,this.currentStep=0,
this.preStep=0,this.stepCallback=null;
};
l.prototype.set=function(t,e){
var n=this.data[t];
if(this.data[t]=e,"undefined"!=typeof this.listenCallback[t])for(var i=0;i<this.listenCallback[t].length;i++)this.listenCallback[t][i].call(this,e,n);
},l.prototype.get=function(t){
return this.data[t];
},l.prototype.initStep=function(t){
this.step=new i(t),this.stepCallback=t.stepCallback;
},l.prototype.setStep=function(t){
this.preStep=this.currentStep,this.currentStep=t,this.step.setStep(t),this.stepCallback[t].call();
},l.prototype.getCurrentStep=function(){
return this.currentStep;
},l.prototype.getPreStep=function(){
return this.preStep;
},l.prototype.listenData=function(t,e){
this.listenCallback[t]||(this.listenCallback[t]=[]),this.listenCallback[t].push(e);
},l.prototype.unlistenData=function(t){
this.listenCallback[t]=[];
},l.prototype.triggerEvent=function(t,e){
if("undefined"!=typeof this.eventCallback)for(var n=0;n<this.eventCallback[t].length;n++)this.eventCallback[t][n].call(this,e);
},l.prototype.listenEvent=function(t,e){
this.eventCallback[t]||(this.eventCallback[t]=[]),this.eventCallback[t].push(e);
},l.prototype.unlistenEvent=function(t){
this.eventCallback[t]=[];
},n.exports=l;
});