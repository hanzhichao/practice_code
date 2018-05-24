define("scan/item_banner_list.js",["common/wx/Tips.js","common/wx/media/imageDialog.js","biz_web/utils/upload.js"],function(n,t,i){
"use strict";
function e(n,t){
D.push({
link:n,
desc:t||""
}),c(),d();
}
function o(n){
D.splice(n,1),c(),d();
}
function s(n,t){
D[n].desc=$.trim(t)||"",d();
}
function a(n,t){
var i=D[n],e=D[t];
return i&&e?(D[n]=e,D[t]=i,c(),d(),!0):!1;
}
function c(){
var n=[];
n=D,h.html(b("tpl_banner_list",{
list:n
}));
}
function d(){
w.setData(function(n){
n.detail_info||(n.detail_info={}),n.detail_info.banner_list=D;
});
}
function l(){
D=w.getData().detail_info.banner_list||[],j=$("#form_banner_list"),p=j.find(".js_frm_msg"),
h=j.find("#js_div_banner_list"),v=j.find("#js_btn_add_banner");
}
function u(){
D.length>0&&c(),p.hide();
}
function r(){
$("#js_btn_add_banner").on("click",function(n){
n.preventDefault();
g({
title:"选择图片",
scene:"cdn",
maxSelect:1,
onOK:function(n){
console.log(n),e(n[0].url,""),this.destroy();
},
onHide:function(){
this.destroy();
}
});
}),h.on("keyup",".js_input_desc",function(){
var n=1*$(this).parents(".js_item").data("index"),t=$(this).val();
s(n,t);
}),h.on("click",".js_btn_delete",function(n){
n.preventDefault();
var t=1*$(this).parents(".js_item").data("index");
o(t);
}),h.on("click",".js_btn_up",function(n){
n.preventDefault();
var t=1*$(this).parents(".js_item").data("index");
a(t,t-1);
}),h.on("click",".js_btn_down",function(n){
n.preventDefault();
var t=1*$(this).parents(".js_item").data("index");
a(t,t+1);
}),h.on("mouseover",".js_item",function(){
$(this).find(".js_item_opt").addClass("show");
}),h.on("mouseout",".js_item",function(){
$(this).find(".js_item_opt").removeClass("show");
});
}
function _(){}
function f(n){
var t=!0;
return D&&0!=D.length?p.hide():(t=!1,p.show()),"function"==typeof n&&n.call(void 0,t),
t;
}
function m(n){
return n&&n.model&&(w=n.model),x?!1:(x=!0,l(),u(),void r());
}
var j,p,h,v,b=template.render,g=(n("common/wx/Tips.js"),n("common/wx/media/imageDialog.js")),w=(n("biz_web/utils/upload.js"),
null),x=!1,D=[];
i.exports={
init:m,
check:f,
triggerEditMode:_
};
});