define("common/wx/popover.js",["tpl/popover.html.js"],function(o,t,e){
"use strict";
function i(o){
if(o=$.extend(!0,{},h,o),this.opt=o,this.$dom=$(o.dom),this.$dom.data("popover")){
var t=this.$dom.data("popover");
return p(o,t),t.$pop.show(),t.opt.defaultOpen?t.$pop.show():t.$pop.hide(),t;
}
return o.buttons&&o.buttons&&o.buttons.each(function(o){
o.type=o.type||"default";
}),this.$pop=$(template.compile(s)(o)),o.addCls&&this.$pop.addClass(o.addCls),$("body").append(this.$pop),
n(this,o),p(o,this),this.opt.defaultOpen?this.$pop.show():this.$pop.hide(),this.$dom.data("popover",this),
this.clickIn=!0,this;
}
function n(o,t){
function e(){
clearTimeout(n),o.show();
}
function i(){
n=setTimeout(function(){
o.hide();
},p);
}
if(t.buttons&&t.buttons.length>0&&o.$pop.find(".jsPopoverBt").each(function(e,i){
t.buttons[e]&&"function"==typeof t.buttons[e].click&&$(i).click(function(i){
t.buttons[e].click.call(o,i);
});
}),o.$pop.find(".jsPopoverClose").click(function(){
t.close===!0?o.hide():"function"==typeof t.close&&t.close.call(o);
}),t.hover&&(o.$dom.hover(function(){
o.hoverTime&&clearTimeout(o.hoverTime);
},function(){
o.hoverTime=o.hide.delay(1,o);
}),o.$pop.hover(function(){
o.hoverTime&&clearTimeout(o.hoverTime);
},function(){
o.hoverTime&&clearTimeout(o.hoverTime),o.hoverTime=o.hide.delay(1,o);
})),t.isToggle){
var n=null,p=300;
o.$dom.hover(e,i),o.$pop.hover(e,i);
}
t.hideIfBlur&&(o._onBlur=function(o){
var t=o.data.context,e=o.target,i=t.$dom.get(0),n=t.$pop.get(0);
t.clickIn?t.clickIn=!1:$.contains(i,e)||i===e||$.contains(n,e)||n===e||o.data.context.hide();
},$(document).on("click",{
context:o
},o._onBlur)),o._onResize=function(o){
o.data.context.resetPosition();
},$(window).on("resize",{
context:o
},o._onResize);
}
function p(o,t){
var e=t.$dom.offset();
"left"==o.margin?(console.log(e.top),console.log(t.$dom.height()),t.$pop.css({
top:e.top+t.$dom.height(),
left:e.left-28
}).addClass("pos_left")):"right"==o.margin?t.$pop.css({
top:e.top+t.$dom.height(),
left:e.left+t.$dom.width()-t.$pop.width()+28
}).addClass("pos_right"):t.$pop.css({
top:e.top+t.$dom.height(),
left:e.left+t.$dom.outerWidth()/2-t.$pop.width()/2
}).addClass("pos_center");
}
var s=o("tpl/popover.html.js"),h={
dom:"",
content:"",
place:"bottom",
margin:"center",
hideIfBlur:!1,
hover:!1,
addCls:"",
width:"",
isToggle:!1,
defaultOpen:!0,
onHide:!1,
onShow:!1,
onRemove:!1
};
i.prototype={
remove:function(){
this.$pop.remove(),this.$dom.removeData("popover"),this._onBlur&&$(document).off("click",this._onBlur),
$(window).off("resize",this._onResize),"function"==typeof this.opt.onRemove&&this.opt.onRemove.call(this);
},
hide:function(){
this.$pop.hide(),"function"==typeof this.opt.onHide&&this.opt.onHide.call(this);
},
show:function(){
this.$pop.show(),"function"==typeof this.opt.onShow&&this.opt.onShow.call(this);
},
resetPosition:function(){
return p(this.opt,this);
}
},e.exports=i;
});