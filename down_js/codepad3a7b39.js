define("cardticket/codepad.js",[],function(){
"use strict";
function e(e){
var t=0;
if(document.selection){
e.focus();
var r=document.selection.createRange();
r.moveStart("character",-e.value.length),t=r.text.length;
}else(e.selectionStart||"0"==e.selectionStart)&&(t=e.selectionStart);
return t;
}
function t(e,t){
if(e.setSelectionRange)e.focus(),e.setSelectionRange(t,t);else if(e.createTextRange){
var r=e.createTextRange();
r.collapse(!0),r.moveEnd("character",t),r.moveStart("character",t),r.select();
}
}
$.getSelectPosition=e,$.setSelectPosition=t,$.fn.codepad=function(r){
r||(r={});
var a=r.max||14;
$(this).keydown(function(e){
var t=$.trim($(this).val());
return"-"==String.fromCharCode(e.keyCode)||32==e.keyCode?!1:/^[0-9]$/.test(String.fromCharCode(e.keyCode))&&t.length>=a?!1:void 0;
}).keypress(function(){
var e=$.trim($(this).val());
return e.length>=a?!1:void 0;
}).keyup(function(r){
13==r.which;
var n=$.trim($(this).val());
n.length?$("#js_clear").show():$("#js_clear").hide();
var i=$(this).attr("cursn");
if(i!=n){
i=n,$(this).attr("cursn",i),n=n.replace(/\s+|-+/g,"");
var c=new RegExp("([^s]{4})(?=([^s])+$)","ig");
n=n.replace(c,"$1-").substr(0,a);
var s=e(this),o=s==this.value.length,l=(s-s/4+1)%4==0;
$(this).val(n),o||t(this,s),!o&&l&&t(this,s+1);
}
});
};
});