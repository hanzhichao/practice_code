define("common/wx/anchor.js",[],function(){
"use strict";
!function(n){
function c(c){
var a=n.extend(!0,{},c);
n(this).click(function(){
a.callback&&"function"==typeof a.callback&&a.callback.call(this);
var c=a.to||n(this).data("anchor")||n(this).find("a").data("anchor"),o=n(c).offset().top;
t(o);
});
}
function t(c){
n("html, body").animate({
scrollTop:c
},300);
}
n.fn.extend({
anchor:c
});
}(jQuery);
});