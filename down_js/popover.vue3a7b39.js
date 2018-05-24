"use strict";
function _typeof(t){
return t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t;
}
define("components/popover.vue.js",[],function(){
Vue.component("mp-popover",{
template:'\n    <span ref="main">\n      <slot name="dom"></slot>\n      <div :class="[\'popover\', className, \'pos_\' + margin]" :style="style" ref="popover">\n        <div class="popover_inner">\n            <div class="popover_content" v-html="content"></div>\n            <a v-if="hide && showclose" @click.prevent="hide" href="javascript:;" class="popover_close icon16_common close_flat">关闭</a>\n            <slot name="popover_bar"></slot>\n        </div>\n        <i class="popover_arrow popover_arrow_out"></i>\n        <i class="popover_arrow popover_arrow_in"></i>\n      </div>\n    </span>\n  ',
props:{
className:{
type:String,
"default":""
},
content:{
type:String,
"default":""
},
place:{
type:String,
"default":"bottom"
},
margin:{
type:String,
"default":"center"
},
width:{
type:String,
"default":""
},
showclose:{
type:Boolean,
"default":!1
},
hover:{
type:Boolean,
"default":!1
}
},
data:function(){
return{
showState:!1,
top$$:0,
left$$:0
};
},
computed:{
style:function(){
var t={};
return this.width&&(t.width=this.width+"px"),t.display=this.showState?"block":"none",
t.top=this.top$$+"px",t.left=this.left$$+"px",t;
}
},
mounted:function(){
var t=this;
if(this._updatePosition(),window.addEventListener&&(window.addEventListener("resize",function(){
t._updatePosition();
}),this.hover)){
var e=this.$refs.main,o=this.$refs.popover;
e.addEventListener("mouseover",function(){
t.$emit("EVT_MOUSEOVER");
}),e.addEventListener("mouseout",function(){
t.$emit("EVT_MOUSEOUT");
}),o.addEventListener("mouseover",function(){
t.$emit("EVT_MOUSEOVER");
}),o.addEventListener("mouseout",function(){
t.$emit("EVT_MOUSEOUT");
});
}
},
created:function(){
var t=this;
this.$on("EVT_MOUSEOVER",function(){
t.show(),t._hoverTime&&clearTimeout(t._hoverTime);
}),this.$on("EVT_MOUSEOUT",function(){
t._hoverTime&&clearTimeout(t._hoverTime),t._hoverTime=t.delayHide(1e3);
});
},
updated:function(){
this._updatePosition();
},
methods:{
delayHide:function(t){
var e=this;
return setTimeout(function(){
e.showState=!1;
},t);
},
hide:function(){
this.showState=!1;
},
show:function(){
this.showState=!0;
},
_isWindow:function(t){
return null!==t&&t===t.window;
},
_getWindow:function(t){
return this._isWindow(t)?t:9===t.nodeType&&t.defaultView;
},
_offset:function(t){
var e=void 0,o=void 0,i={
top:0,
left:0
},n=t&&t.ownerDocument;
return e=n.documentElement,"undefined"!==_typeof(t.getBoundingClientRect)&&(i=t.getBoundingClientRect()),
o=this._getWindow(n),{
top:i.top+o.pageYOffset-e.clientTop,
left:i.left+o.pageXOffset-e.clientLeft
};
},
_width:function(t){
var e=window.getComputedStyle(t);
return t.offsetWidth-parseFloat(e.paddingLeft)-parseFloat(e.paddingRight)-parseFloat(e.borderLeftWidth)||0-parseFloat(e.borderRightWidth)||0;
},
_height:function(t){
var e=window.getComputedStyle(t);
return t.offsetHeight-parseFloat(e.paddingTop)-parseFloat(e.paddingBottom)-parseFloat(e.borderTopWidth)||0-parseFloat(e.borderBottomWidth)||0;
},
_updatePosition:function(){
var t=this.$refs.main,e=this.$refs.popover;
if(this.$refs.popover){
for(var o=null,i=0,n=0,s=t.parentNode;s&&"html"!==s.tagName.toLowerCase();){
var r=window.getComputedStyle(s);
if("static"!==r.position){
o=s;
break;
}
s=s.parentNode;
}
o&&(i=this._offset(o).left,n=this._offset(o).top);
var a=this._offset(t).top-n,d=t.offsetWidth,p=this._offset(t).left-i,f=this._width(t),h=this._height(t),l=this._width(e),u=this.margin;
this.top$$=a+h,this.left$$="left"===u?p:"right"===u?p+f-l:p+d/2-l/2;
}
}
}
});
});