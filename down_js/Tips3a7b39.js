define("common/wx/Tips.js",[],function(e,n){
"use strict";
function t(e,n,t){
$(".JS_TIPS").remove();
var i=$(template.compile('<div class="JS_TIPS page_tips {type}" id="wxTips_'+(new Date).getTime()+'"><div class="inner">{msg}</div></div>')({
type:e||"error",
msg:n
})).appendTo("body").fadeIn();
setTimeout(function(){
o(i),i=null;
},1e3*(t||s.delay));
}
function o(e){
e&&e.length>0&&"function"==typeof e.fadeOut&&e.fadeOut({
complete:function(){
e&&"function"==typeof e.remove&&e.remove(),e=null;
}
});
}
var i=n,s={
errMsg:"系统发生错误，请稍后重试",
sucMsg:"操作成功",
delay:2
};
i.err=function(e,n){
t("error",e||s.errMsg,n);
},i.suc=function(e,n){
t("success",e||s.sucMsg,n);
},i.remove=function(){
$(".JS_TIPS").remove();
};
});