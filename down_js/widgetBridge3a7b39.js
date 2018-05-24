define("common/wx/widgetBridge.js",[],function(){
"use strict";
$.widgetBridge||($.widgetBridge=function(t,e){
var i=t,n=i.split("."),t=n.length>1?n[1]:n[0];
$.fn[t]=function(n){
var o="string"==typeof n,r=[].slice.call(arguments,1),a=this;
if(n=n||{},o){
var s;
return 0!==n.indexOf("_")&&this.each(function(){
var e=$.data(this,i);
return e?"instance"===n?(s=e,!1):"option"===n?(s=e.options,!1):(s||(s=(e[n]||jQuery.noop).apply(e,r)),
void("destroy"===n&&(e.elements=null))):$.error("cannot call methods on "+t+" prior to initialization; attempted to call method '"+n+"'");
}),s;
}
var d=this;
return this.each(function(){
var t=this,o=$.data(this,i);
if(!o){
o=$.extend(!0,{},e),o.destroy||(o.destroy=function(){
$.removeData(t,i);
}),o.options=$.extend(!0,o.options||{},n),o.element=$(this),o.elements=d,o._create&&(a=o._create.call(o,n));
var r=a&&a.length&&a.get(0)||this;
$.data(r,i,o);
}
}),a;
};
});
});