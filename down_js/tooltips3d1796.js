define("common/wx/tooltips.js",["tpl/tooltips.html.js"],function(o,t,n){
"use strict";
var i={
position:{},
container:"",
type:"hover",
buttons:[],
delay:300,
disabled:!1,
reposition:!1,
container_close:!1,
parentClass:"",
container_mode:"absolute"
},s=wx.T,e=o("tpl/tooltips.html.js"),c="btn_disabled",p="hover",h="show",l=function(o){
if(this.options=o=$.extend(!0,{},i,o),this.$container=$(this.options.container),
this.$container&&0!=this.$container.length){
var t=this.$container.offset(),n=this.$container.height(),l=this.options.position.left||this.$container.data("x")||0,d=n+(this.options.position.top||this.$container.data("y")||0);
this.options.offset={
left:t.left+l,
top:t.top+d,
left_x:l,
top_y:d
},!o.content&&(o.content=this.$container.data("tips")||""),this.$dom=$(s(e,o)).appendTo("body"),
this.options.disabled&&this.$container.addClass(c);
var a=this,f=this.options.type===p||"click"===this.options.type?this.options.type:p;
if(f==p){
var r=null;
this.$container.hover(function(){
a.options.onshow&&"function"==typeof a.options.onshow?a.options.onshow.apply(a):!a.options.disabled&&a.show();
},function(){
r=window.setTimeout(function(){
a.hide();
},a.options.delay);
}),this.$dom.hover(function(){
r&&window.clearTimeout(r);
},function(){
a.hide();
});
}else this.$container.click(function(){
return a.options.disabled||a.options.onbeforeclick&&"function"==typeof a.options.onbeforeclick&&a.options.onbeforeclick.apply(a)===!1?void 0:(a.$dom.data(h)?a.options.onclose&&"function"==typeof a.options.onclose?a.options.onclose.apply(a):a.hide():a.options.onshow&&"function"==typeof a.options.onshow?a.options.onshow.apply(a):a.show(),
!1);
});
a.documentClickEvent=function(o){
a.$dom.find(o.target).length||(a.options.onclose&&"function"==typeof a.options.onclose?a.options.onclose.apply(a,[o]):a.hide());
},$(document).on("click",a.documentClickEvent),a.$dom.find(".js_popover_close").on("click",function(o){
return a.options.onclose&&"function"==typeof a.options.onclose?a.options.onclose.apply(a,[o]):a.hide(),
!1;
}),this.$dom.hide(),function(){
$.each(a.$dom.find(".js_btn"),function(o,t){
a.options.buttons[o].click&&$(t).on("click",function(){
a.options.buttons[o].click.apply(a);
});
});
}();
}
};
l.prototype={
constructor:l,
show:function(){
if(this.options.reposition){
var o=this.$container.offset(),t=o.left+this.options.offset.left_x,n=o.top+this.options.offset.top_y;
this.$dom.css({
left:t,
top:n
}).show();
}else this.$dom.show();
this.$dom.data(h,!0);
},
hide:function(){
this.$dom.hide(),this.$dom.data(h,!1);
},
enable:function(){
return this.options.disabled=!1,this.$container.removeClass(c),this;
},
disable:function(){
return this.options.disabled=!0,this.$container.addClass(c),this;
},
destroy:function(){
this.$dom.remove(),$(document).off("click",this.documentClickEvent);
},
changeContent:function(o){
this.$dom.find(".js_content").html(o);
}
},n.exports=l;
});