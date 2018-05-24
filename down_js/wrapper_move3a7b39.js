define("shop/wrapper_move.js",[],function(e,a,t){
"use strict";
function s(){
var e=[],a=$(o.container),t=a.find(o.elementClass);
t.each(function(){
var a=$(this),t=a.attr("name"),s=t?t.lastIndexOf("_"):-1,n=s>-1&&t?t.substr(s+1,t.length-s-1):"";
n&&e.push({
nameidx:n,
element:a
});
});
for(var s=e.length,n=0;s>n;n++){
var r=['<span class="vm_box"></span>'];
n>0&&s>1&&r.push('<a href="javascript:;" class="icon18_common up_gray js_up"></a>'),
n!=s-1&&s>1&&r.push('<a href="javascript:;" class="icon18_common down_gray js_down"></a>'),
r.push('<a href="javascript:;" class="icon18_common edit_gray js_edit"></a><a href="javascript:;" class="icon18_common del_gray js_delete"></a>'),
e[n].element.find(".shop_modele_mask").html(r.join(""));
}
}
function n(){
var e=$(o.container);
e.delegate(".js_up","click",function(){
var e=$(this).closest(o.elementClass),a=e.prev(o.elementClass);
if(a){
var t="name",n=e.attr(t),r=a.attr(t);
e.attr(t,r),a.attr(t,n),o.afterMove&&o.afterMove(),e.insertBefore(a),s();
}
}),e.delegate(".js_down","click",function(){
var e=$(this).closest(o.elementClass),a=e.next(o.elementClass);
if(a){
var t="name",n=e.attr(t),r=a.attr(t);
e.attr(t,r),a.attr(t,n),o.afterMove&&o.afterMove(),e.insertAfter(a),s();
}
});
}
function r(e){
o=$.extend(!0,{},c,e),s(o),n(o);
}
var o,c={
container:"body",
elementClass:".js_shopModuleWrapper",
afterMove:$.noop
};
r.prototype={
refresh:function(){
s();
}
},t.exports=r;
});