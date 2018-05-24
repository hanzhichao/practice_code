define("common/wx/liveTooltip.js",["tpl/tooltip.html.js","widget/tooltip.css"],function(o,t,i){
"use strict";
function s(o){
o=$.extend(!0,{},l,o);
var t=$(o.dom);
n.toolbarsTips=$(template.compile(e)({
content:""
})),$("body").append(n.toolbarsTips),n.toolbarsTips.css("display","none"),"undefined"!=typeof o.zIndex&&null!==o.zIndex&&n.toolbarsTips.css("z-index",o.zIndex),
t.on("mouseover",".js_tooltip",function(){
var t=$(this),i=t.data("tooltip")||o.content||"";
i&&(!!n.showTimeoutid&&window.clearTimeout(n.showTimeoutid),n.showTimeoutid=setTimeout(function(){
n.toolbarsTips.find(".tooltip_inner").html(i);
var s=t.offset(),e=1*t.data("x")||1*o.position.x||0,l=1*t.data("y")||1*o.position.y||0;
n.toolbarsTips.css({
top:s.top+l-n.toolbarsTips.height(),
left:s.left+e+t.width()/2-n.toolbarsTips.width()/2
}).show();
},200));
}).on("mouseout",function(){
n.toolbarsTips.hide();
});
}
var e=o("tpl/tooltip.html.js");
o("widget/tooltip.css");
var n={},l={
dom:"",
content:"",
position:{
x:0,
y:0
},
zIndex:null
};
i.exports=s;
});