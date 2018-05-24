define("scan/item_action_entityshop.js",["common/wx/Tips.js","biz_web/ui/checkbox.js"],function(t,n,e){
"use strict";
function i(){
a=r.is(":checked")?[{
type:13,
name:"附近的门店",
desc:"",
showtype:0,
extinfo:{}
}]:[],p.setActionList("entityshop",a);
}
function o(){}
function c(){
f=$("#js_form_action_entityshop"),r=f.find(".js_checkbox_entityshop"),a=p.getActionList("entityshop");
}
function s(){
return void f.hide();
}
function u(){
r.checkbox({
multi:!0,
onChanged:function(){
i();
}
}),a&&a.length>0&&r.checkbox("checked",!0);
}
function h(t){
var n=!0;
return"function"==typeof t&&t.call(void 0,n),n;
}
function d(t){
return t&&t.model&&(p=t.model),m?!1:(m=!0,c(),s(),void u());
}
var f,r,p=(template.render,t("common/wx/Tips.js"),t("biz_web/ui/checkbox.js"),null),m=!1,a=[];
e.exports={
init:d,
check:h,
triggerEditMode:o
};
});