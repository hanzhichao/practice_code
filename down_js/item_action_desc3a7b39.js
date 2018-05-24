define("scan/item_action_desc.js",["common/wx/Tips.js","common/wx/inputCounter.js","biz_common/jquery.validate.js"],function(t,e,n){
"use strict";
function o(){
var t=x.getEditMode();
return 1==t?!1:!0;
}
function i(){
var t=[];
o()&&v&&t.push({
type:6,
name:"商品简介",
extinfo:{
text:v
},
showtype:0
}),x.setActionList("product_desc",t);
}
function r(){
l=$('textarea[name="product_desc"]'),f=l.parents("form");
var t=x.getActionList("product_desc");
t&&t.length>0&&(v=t[0].extinfo.text);
}
function c(){
v&&l.val(v);
}
function s(){
f.on("keyup","textarea",function(){
v=$(this).val(),i();
}),new p(l,{
maxLength:80,
showCounter:!0
}),f.validate({
ignore:".js_input_ignore",
rules:{
product_desc:{
maxlength:function(){
return o()?80:!1;
}
}
},
messages:{
product_desc:{
maxlength:"商品简介最多{0}个字符"
}
},
errorPlacement:function(t,e){
var n=e.parent().parent();
n.find(".js_frm_msg").html(t.html()).show(),g=t.text();
}
});
}
function u(){
o()?f.show():f.hide(),i();
}
function a(t){
var e=!0;
return o()&&(e=f.valid()),"function"==typeof t&&t.call(void 0,e),e;
}
function m(){
return g;
}
function d(t){
return t&&t.model&&(x=t.model),h?!1:(h=!0,r(),c(),s(),void u());
}
var f,l,p=(template.render,t("common/wx/Tips.js"),t("common/wx/inputCounter.js")),x=(t("biz_common/jquery.validate.js"),
null),g="",h=!1,v="";
n.exports={
init:d,
check:a,
getErrMsg:m,
triggerEditMode:u
};
});