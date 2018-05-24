define("scan/item_edit_mode.js",["common/wx/popup.js","common/wx/Tips.js"],function(e,t,o){
"use strict";
function n(){
var e,t,o=$("#tpl_edit_mode").popup({
title:"主页类型",
width:885,
className:"change_mode_dlg",
data:{
selected_mode:1*l.getData().context_info.edit_mode
},
buttons:[{
text:"确定",
type:"primary",
click:function(){
if($(this).hasClass("btn_disabled"))return!1;
var t=1*e.find(".js_btn_mode.selected").data("mode");
l.setEditMode(t),this.remove();
}
}],
mask:!0,
onHide:function(){
this.remove();
},
onShow:function(){
var o=this;
e=this.get(),e.find(".pop_closed").hide(),t=e.find(".js_btn_p"),void 0==l.getData().context_info.edit_mode&&t.disable(),
e.on("click",".js_btn_mode",function(){
1*$(this).data("mode");
e.find(".js_btn_mode").removeClass("selected"),$(this).addClass("selected"),t.enable();
}),e.on("dblclick",".js_btn_mode",function(){
$(this).click();
var e=1*$(this).data("mode");
l.setEditMode(e),o.remove();
});
}
});
setTimeout(function(){
o.popup("resetPosition");
},100);
}
function i(){
m=$("#js_btn_change_mode");
}
function d(){}
function s(){
m.on("click",function(e){
return e.preventDefault(),n(),!1;
});
}
function c(e){
var t=!0;
return"function"==typeof e&&e.call(void 0,t),t;
}
function a(e){
return e&&e.model&&(l=e.model),u?!1:(u=!0,i(),d(),void s());
}
var m,l=(template.render,e("common/wx/popup.js"),e("common/wx/Tips.js"),null),u=!1;
o.exports={
init:a,
check:c,
showModeDialog:n
};
});