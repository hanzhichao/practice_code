define("scan/apply_v3.js",["scan/mvp/apply_step1.js","scan/mvp/apply_step2.js","scan/mvp/apply_step3.js","scan/mvp/apply_model.js"],function(e){
"use strict";
function p(e,p){
console.log(c);
var s,n;
if(o.getPreStep()<e)for(var t=0;e-1>t;t++)c[t]&&c[t].show(!1);
if(o.getPreStep()>e)for(var t=c.length-1;t>e-1;t--)s=c.pop(),n=r.pop(),s&&s.remove();
if(c[e-1])c[e-1].show(!0);else{
var s=new p.presenter(o),n=new p.view;
s.setView(n),s.init(),c.push(s),r.push(n);
}
}
function s(){
p(1,v);
}
function n(){
p(2,_);
}
function t(){
p(3,m);
}
function a(){
$("#js_div_form").hide(),$("#js_div_result").html(i("tpl_result",{})).show();
}
function l(){
o=new f,o.initStep({
container:"#js_div_stepbar",
selected:1,
names:["1 同意协议","2 上传资质","3 确认主体"],
stepCallback:{
1:s,
2:n,
3:t,
4:a
}
}),o.setStep(1);
}
var i=template.render,o=null,c=[],r=[],v=e("scan/mvp/apply_step1.js"),_=e("scan/mvp/apply_step2.js"),m=e("scan/mvp/apply_step3.js"),f=e("scan/mvp/apply_model.js");
l();
});