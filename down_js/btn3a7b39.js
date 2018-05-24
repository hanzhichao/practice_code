$.fn.disable=function(t){
t=t||"btn_disabled";
var s=this.hasClass("btn_input")?this.find("button"):this;
return s.attr("disabled","disabled"),this.parent().hasClass("btn_input")?this.parent().addClass(t):this.addClass(t),
this;
},$.fn.enable=function(t){
t=t||"btn_disabled";
var s=this.hasClass("btn_input")?this.find("button"):this;
return s.attr("disabled",!1),this.parent().hasClass("btn_input")?this.parent().removeClass(t):this.removeClass(t),
this;
},function(){
var t=function(t,s){
if(t=t||"btn_loading",!s||$.support.leadingWhitespace){
var i=this.hasClass("btn_input")?this.find("button"):this;
i.prepend("<i></i>");
}
return this.disable(t),this;
},s=function(t,s){
if(t=t||"btn_loading",!s||$.support.leadingWhitespace){
var i=this.hasClass("btn_input")?this.find("button"):this;
i.find("i:first-child").remove();
}
return this.enable(t),this;
};
$.fn.btn=function(i,n,a){
return i?s.call(this,n,a):t.call(this,n,a);
};
}();