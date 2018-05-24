define("biz_web/ui/jquery.scrollbar.js",["biz_web/widget/jquery.scrollbar.css"],function(l){
"use strict";
function e(l){
if(t.webkit&&!l)return{
height:0,
width:0
};
if(!t.data.outer){
var e={
border:"none",
"box-sizing":"content-box",
height:"200px",
margin:"0",
padding:"0",
width:"200px"
};
t.data.inner=$("<div>").css($.extend({},e)),t.data.outer=$("<div>").css($.extend({
left:"-1000px",
overflow:"scroll",
position:"absolute",
top:"-1000px"
},e)).append(t.data.inner).appendTo("body");
}
return t.data.outer.scrollLeft(1e3).scrollTop(1e3),{
height:Math.ceil(t.data.outer.offset().top-t.data.inner.offset().top||0),
width:Math.ceil(t.data.outer.offset().left-t.data.inner.offset().left||0)
};
}
function s(){
var l=e(!0);
return!(l.height||l.width);
}
function o(l){
var e=l.originalEvent;
return e.axis&&e.axis===e.HORIZONTAL_AXIS?!1:e.wheelDeltaX?!1:!0;
}
l("biz_web/widget/jquery.scrollbar.css");
var r=!1,t={
data:{
index:0,
name:"scrollbar"
},
macosx:/mac/i.test(navigator.platform),
mobile:/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),
overlay:null,
scroll:null,
scrolls:[],
webkit:/webkit/i.test(navigator.userAgent)&&!/edge\/\d+/i.test(navigator.userAgent)
};
t.scrolls.add=function(l){
this.remove(l).push(l);
},t.scrolls.remove=function(l){
for(;$.inArray(l,this)>=0;)this.splice($.inArray(l,this),1);
return this;
};
var i={
autoScrollSize:!0,
autoUpdate:!0,
debug:!1,
disableBodyScroll:!1,
duration:200,
ignoreMobile:!1,
ignoreOverlay:!1,
scrollStep:30,
showArrows:!1,
stepScrolling:!0,
scrollx:null,
scrolly:null,
onDestroy:null,
onInit:null,
onScroll:null,
onUpdate:null
},n=function(l){
t.scroll||(t.overlay=s(),t.scroll=e(),a(),$(window).resize(function(){
var l=!1;
if(t.scroll&&(t.scroll.height||t.scroll.width)){
var s=e();
(s.height!==t.scroll.height||s.width!==t.scroll.width)&&(t.scroll=s,l=!0);
}
a(l);
})),this.container=l,this.namespace=".scrollbar_"+t.data.index++,this.options=$.extend({},i,window.jQueryScrollbarOptions||{}),
this.scrollTo=null,this.scrollx={},this.scrolly={},l.data(t.data.name,this),t.scrolls.add(this);
};
n.prototype={
destroy:function(){
if(this.wrapper){
this.container.removeData(t.data.name),t.scrolls.remove(this);
var l=this.container.scrollLeft(),e=this.container.scrollTop();
this.container.insertBefore(this.wrapper).css({
height:"",
margin:"",
"max-height":""
}).removeClass("scroll-content scroll-scrollx_visible scroll-scrolly_visible").off(this.namespace).scrollLeft(l).scrollTop(e),
this.scrollx.scroll.removeClass("scroll-scrollx_visible").find("div").andSelf().off(this.namespace),
this.scrolly.scroll.removeClass("scroll-scrolly_visible").find("div").andSelf().off(this.namespace),
this.wrapper.remove(),$(document).add("body").off(this.namespace),$.isFunction(this.options.onDestroy)&&this.options.onDestroy.apply(this,[this.container]);
}
},
init:function(l){
var e=this,s=this.container,r=this.containerWrapper||s,i=this.namespace,n=$.extend(this.options,l||{}),c={
x:this.scrollx,
y:this.scrolly
},a=this.wrapper,d={
scrollLeft:s.scrollLeft(),
scrollTop:s.scrollTop()
};
if(t.mobile&&n.ignoreMobile||t.overlay&&n.ignoreOverlay||t.macosx&&!t.webkit)return!1;
if(a)r.css({
height:"auto",
"margin-bottom":-1*t.scroll.height+"px",
"margin-right":-1*t.scroll.width+"px",
"max-height":""
});else{
if(this.wrapper=a=$("<div>").addClass("scroll-wrapper").addClass(s.attr("class")).css("position","absolute"==s.css("position")?"absolute":"relative").insertBefore(s).append(s),
s.is("textarea")&&(this.containerWrapper=r=$("<div>").insertBefore(s).append(s),
a.addClass("scroll-textarea")),r.addClass("scroll-content").css({
height:"auto",
"margin-bottom":-1*t.scroll.height+"px",
"margin-right":-1*t.scroll.width+"px",
"max-height":""
}),s.on("scroll"+i,function(){
$.isFunction(n.onScroll)&&n.onScroll.call(e,{
maxScroll:c.y.maxScrollOffset,
scroll:s.scrollTop(),
size:c.y.size,
visible:c.y.visible
},{
maxScroll:c.x.maxScrollOffset,
scroll:s.scrollLeft(),
size:c.x.size,
visible:c.x.visible
}),c.x.isVisible&&c.x.scroll.bar.css("left",s.scrollLeft()*c.x.kx+"px"),c.y.isVisible&&c.y.scroll.bar.css("top",s.scrollTop()*c.y.kx+"px");
}),a.on("scroll"+i,function(){
a.scrollTop(0).scrollLeft(0);
}),n.disableBodyScroll){
var h=function(l){
o(l)?c.y.isVisible&&c.y.mousewheel(l):c.x.isVisible&&c.x.mousewheel(l);
};
a.on("MozMousePixelScroll"+i,h),a.on("mousewheel"+i,h),t.mobile&&a.on("touchstart"+i,function(l){
var e=l.originalEvent.touches&&l.originalEvent.touches[0]||l,o={
pageX:e.pageX,
pageY:e.pageY
},r={
left:s.scrollLeft(),
top:s.scrollTop()
};
$(document).on("touchmove"+i,function(l){
var e=l.originalEvent.targetTouches&&l.originalEvent.targetTouches[0]||l;
s.scrollLeft(r.left+o.pageX-e.pageX),s.scrollTop(r.top+o.pageY-e.pageY),l.preventDefault();
}),$(document).on("touchend"+i,function(){
$(document).off(i);
});
});
}
$.isFunction(n.onInit)&&n.onInit.apply(this,[s]);
}
$.each(c,function(l,r){
var t=null,a=1,d="x"===l?"scrollLeft":"scrollTop",h=n.scrollStep,p=function(){
var l=s[d]();
s[d](l+h),1==a&&l+h>=u&&(l=s[d]()),-1==a&&u>=l+h&&(l=s[d]()),s[d]()==l&&t&&t();
},u=0;
r.scroll||(r.scroll=e._getScroll(n["scroll"+l]).addClass("scroll-"+l),n.showArrows&&r.scroll.addClass("scroll-element_arrows_visible"),
r.mousewheel=function(t){
if(!r.isVisible||"x"===l&&o(t))return!0;
if("y"===l&&!o(t))return c.x.mousewheel(t),!0;
var i=-1*t.originalEvent.wheelDelta||t.originalEvent.detail,n=r.size-r.visible-r.offset;
return(i>0&&n>u||0>i&&u>0)&&(u+=i,0>u&&(u=0),u>n&&(u=n),e.scrollTo=e.scrollTo||{},
e.scrollTo[d]=u,setTimeout(function(){
e.scrollTo&&(s.stop().animate(e.scrollTo,240,"linear",function(){
u=s[d]();
}),e.scrollTo=null);
},1)),t.preventDefault(),!1;
},r.scroll.on("MozMousePixelScroll"+i,r.mousewheel).on("mousewheel"+i,r.mousewheel).on("mouseenter"+i,function(){
u=s[d]();
}),r.scroll.find(".scroll-arrow, .scroll-element_track").on("mousedown"+i,function(o){
if(1!=o.which)return!0;
a=1;
var i={
eventOffset:o["x"===l?"pageX":"pageY"],
maxScrollValue:r.size-r.visible-r.offset,
scrollbarOffset:r.scroll.bar.offset()["x"===l?"left":"top"],
scrollbarSize:r.scroll.bar["x"===l?"outerWidth":"outerHeight"]()
},c=0,f=0;
return $(this).hasClass("scroll-arrow")?(a=$(this).hasClass("scroll-arrow_more")?1:-1,
h=n.scrollStep*a,u=a>0?i.maxScrollValue:0):(a=i.eventOffset>i.scrollbarOffset+i.scrollbarSize?1:i.eventOffset<i.scrollbarOffset?-1:0,
h=Math.round(.75*r.visible)*a,u=i.eventOffset-i.scrollbarOffset-(n.stepScrolling?1==a?i.scrollbarSize:0:Math.round(i.scrollbarSize/2)),
u=s[d]()+u/r.kx),e.scrollTo=e.scrollTo||{},e.scrollTo[d]=n.stepScrolling?s[d]()+h:u,
n.stepScrolling&&(t=function(){
u=s[d](),clearInterval(f),clearTimeout(c),c=0,f=0;
},c=setTimeout(function(){
f=setInterval(p,40);
},n.duration+100)),setTimeout(function(){
e.scrollTo&&(s.animate(e.scrollTo,n.duration),e.scrollTo=null);
},1),e._handleMouseDown(t,o);
}),r.scroll.bar.on("mousedown"+i,function(o){
if(1!=o.which)return!0;
var t=o["x"===l?"pageX":"pageY"],n=s[d]();
return r.scroll.addClass("scroll-draggable"),$(document).on("mousemove"+i,function(e){
var o=parseInt((e["x"===l?"pageX":"pageY"]-t)/r.kx,10);
s[d](n+o);
}),e._handleMouseDown(function(){
r.scroll.removeClass("scroll-draggable"),u=s[d]();
},o);
}));
}),$.each(c,function(l,e){
var s="scroll-scroll"+l+"_visible",o="x"==l?c.y:c.x;
e.scroll.removeClass(s),o.scroll.removeClass(s),r.removeClass(s);
}),$.each(c,function(l,e){
$.extend(e,"x"==l?{
offset:parseInt(s.css("left"),10)||0,
size:s.prop("scrollWidth"),
visible:a.width()
}:{
offset:parseInt(s.css("top"),10)||0,
size:s.prop("scrollHeight"),
visible:a.height()
});
}),this._updateScroll("x",this.scrollx),this._updateScroll("y",this.scrolly),$.isFunction(n.onUpdate)&&n.onUpdate.apply(this,[s]),
$.each(c,function(l,e){
var o="x"===l?"left":"top",r="x"===l?"outerWidth":"outerHeight",t="x"===l?"width":"height",i=parseInt(s.css(o),10)||0,c=e.size,a=e.visible+i,d=e.scroll.size[r]()+(parseInt(e.scroll.size.css(o),10)||0);
n.autoScrollSize&&(e.scrollbarSize=parseInt(d*a/c,10),e.scroll.bar.css(t,e.scrollbarSize+"px")),
e.scrollbarSize=e.scroll.bar[r](),e.kx=(d-e.scrollbarSize)/(c-a)||1,e.maxScrollOffset=c-a;
}),s.scrollLeft(d.scrollLeft).scrollTop(d.scrollTop);
},
_getScroll:function(l){
var e={
advanced:['<div class="scroll-element">','<div class="scroll-element_corner"></div>','<div class="scroll-arrow scroll-arrow_less"></div>','<div class="scroll-arrow scroll-arrow_more"></div>','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_inner-wrapper">','<div class="scroll-element_inner scroll-element_track">','<div class="scroll-element_inner-bottom"></div>',"</div>","</div>",'<div class="scroll-bar">','<div class="scroll-bar_body">','<div class="scroll-bar_body-inner"></div>',"</div>",'<div class="scroll-bar_bottom"></div>','<div class="scroll-bar_center"></div>',"</div>","</div>","</div>"].join(""),
simple:['<div class="scroll-element">','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_track"></div>','<div class="scroll-bar"></div>',"</div>","</div>"].join("")
};
return e[l]&&(l=e[l]),l||(l=e.simple),l="string"==typeof l?$(l).appendTo(this.wrapper):$(l),
$.extend(l,{
bar:l.find(".scroll-bar"),
size:l.find(".scroll-element_size"),
track:l.find(".scroll-element_track")
}),l;
},
_handleMouseDown:function(l,e){
var s=this.namespace;
return $(document).on("blur"+s,function(){
$(document).add("body").off(s),l&&l();
}),$(document).on("dragstart"+s,function(l){
return l.preventDefault(),!1;
}),$(document).on("mouseup"+s,function(){
$(document).add("body").off(s),l&&l();
}),$("body").on("selectstart"+s,function(l){
return l.preventDefault(),!1;
}),e&&e.preventDefault(),!1;
},
_updateScroll:function(l,e){
var s=this.container,o=this.containerWrapper||s,r="scroll-scroll"+l+"_visible",i="x"===l?this.scrolly:this.scrollx,n=parseInt(this.container.css("x"===l?"left":"top"),10)||0,c=this.wrapper,a=e.size,d=e.visible+n;
e.isVisible=a-d>1,e.isVisible?(e.scroll.addClass(r),i.scroll.addClass(r),o.addClass(r)):(e.scroll.removeClass(r),
i.scroll.removeClass(r),o.removeClass(r)),"y"===l&&o.css(s.is("textarea")||d>a?{
height:d+t.scroll.height+"px",
"max-height":"none"
}:{
"max-height":d+t.scroll.height+"px"
}),(e.size!=s.prop("scrollWidth")||i.size!=s.prop("scrollHeight")||e.visible!=c.width()||i.visible!=c.height()||e.offset!=(parseInt(s.css("left"),10)||0)||i.offset!=(parseInt(s.css("top"),10)||0))&&($.extend(this.scrollx,{
offset:parseInt(s.css("left"),10)||0,
size:s.prop("scrollWidth"),
visible:c.width()
}),$.extend(this.scrolly,{
offset:parseInt(s.css("top"),10)||0,
size:this.container.prop("scrollHeight"),
visible:c.height()
}),this._updateScroll("x"===l?"y":"x",i));
}
};
var c=n;
$.fn.scrollbar=function(l,e){
return"string"!=typeof l&&(e=l,l="init"),"undefined"==typeof e&&(e=[]),$.isArray(e)||(e=[e]),
this.not("body, .scroll-wrapper").each(function(){
var s=$(this),o=s.data(t.data.name);
(o||"init"===l)&&(o||(o=new c(s)),o[l]&&o[l].apply(o,e));
}),this;
},$.fn.scrollbar.options=i;
var a=$.fn.scrollbar.updateScrollbars=function(){
var l=0,e=0;
return function(s){
var o,i,n,c,d,h,p;
for(o=0;o<t.scrolls.length;o++)c=t.scrolls[o],i=c.container,n=c.options,d=c.wrapper,
h=c.scrollx,p=c.scrolly,(s||n.autoUpdate&&d&&d.is(":visible")&&(i.prop("scrollWidth")!=h.size||i.prop("scrollHeight")!=p.size||d.width()!=h.visible||d.height()!=p.visible))&&(c.init(),
r&&(window.console&&console.log({
scrollHeight:i.prop("scrollHeight")+":"+c.scrolly.size,
scrollWidth:i.prop("scrollWidth")+":"+c.scrollx.size,
visibleHeight:d.height()+":"+c.scrolly.visible,
visibleWidth:d.width()+":"+c.scrollx.visible
},!0),e++));
r&&e>10?(window.console&&console.log("Scroll updates exceed 10"),a=function(){}):(clearTimeout(l),
l=setTimeout(a,300));
};
}();
});