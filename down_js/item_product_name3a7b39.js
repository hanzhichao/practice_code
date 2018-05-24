define("scan/item_product_name.js",["common/wx/Tips.js","common/wx/inputCounter.js","biz_common/jquery.validate.js"],function(n,t,e){
"use strict";
function o(){
s=$("input[name=product_name]"),c=s.parents("form");
}
function i(){
l.getData().base_info.title&&s.val(l.getData().base_info.title);
}
function a(){
c.on("keyup","input",function(){
l.setData(function(n){
n.base_info.title=s.val();
});
}),c.validate({
ignore:".js_input_ignore",
rules:{
product_name:{
required:!0,
maxlength:50
}
},
messages:{
product_name:{
required:"请填写商品名称",
maxlength:"商品名称最多{0}个字符"
}
},
errorPlacement:function(n,t){
var e=t.parent().parent();
e.find(".js_frm_msg").html(n.html()).show();
}
});
}
function r(){}
function u(n){
var t=c.valid();
return"function"==typeof n&&n.call(void 0,t),t;
}
function m(n){
return n&&n.model&&(l=n.model),d?!1:(d=!0,o(),i(),void a());
}
var c,s,l=(template.render,n("common/wx/Tips.js"),n("common/wx/inputCounter.js"),
n("biz_common/jquery.validate.js"),null),d=!1;
e.exports={
init:m,
check:u,
triggerEditMode:r
};
});