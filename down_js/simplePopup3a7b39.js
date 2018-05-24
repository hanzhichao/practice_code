define("common/wx/simplePopup.js",["tpl/simplePopup.html.js","common/wx/popup.js","biz_common/jquery.validate.js"],function(e,t,o){
"use strict";
function i(e){
var t=$.Deferred(),o=this;
o.$dom=$(template.compile(r)(e)).popup({
title:e.title||"输入提示框",
buttons:[{
text:"确认",
click:function(){
var i=this;
if(u.form()){
var r=o.$dom.find("input").val().trim();
if(e.callback){
var p=e.callback.call(i,r);
p!==!1&&this.remove();
}else this.remove();
t.resolve(r);
}
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
},
type:"default"
}],
className:"simple label_block"
}),o.$dom.find("input").val(e.value).focus();
var i=e&&"undefined"!=typeof e.inputrequire&&e.inputrequire===!1?!1:!0;
if(e.rule&&e.msg){
var p={
required:i,
_popupMethod:!0
};
$.validator.addMethod("_popupMethod",function(t,o,i){
return e&&e.rule&&e.rule(t.trim(),o,i);
},e.msg);
}
if(e.validator){
var p={
required:i
};
$.each(e.validator,function(t,o){
$.validator.addMethod("_popupMethod"+t,function(t,i,r){
return e&&e.validator&&o&&o.rule(t.trim(),i,r);
},o.msg),p["_popupMethod"+t]=!0;
});
}
var u=o.$dom.find("form").validate({
rules:{
popInput:p
},
messages:{
popInput:{
required:"输入框内容不能为空"
}
},
onfocusout:!1
});
return t.callback=t.done,t;
}
var r=e("tpl/simplePopup.html.js");
e("common/wx/popup.js"),e("biz_common/jquery.validate.js"),o.exports=i;
});