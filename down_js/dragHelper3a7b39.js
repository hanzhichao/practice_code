define("common/wx/dragHelper.js",[],function(){
"use strict";
var t=function(t){
this.initOptions(t);
};
return t.prototype={
constructor:t,
position:null,
eventPosition:null,
dragEventNameSpace:"draggable",
handle:null,
element:null,
options:{
direction:"both",
cursor:"move",
handle:null,
element:null,
onDragStart:$.noop,
onDragMove:$.noop,
onDragStop:$.noop,
onBeforeDragMove:$.noop
},
offsetParent:null,
initOptions:function(t){
this.element=$(t.element),this.handle=$(t.handle||this.element),this.offsetParent=$(t.offsetParent)||this.handle.offsetParent();
var o=this.offsetParent.offset();
this.parentBound={
x:o.left,
y:o.top,
w:this.offsetParent.width(),
h:this.offsetParent.height()
},this.options=$.extend(!0,this.options,t);
},
drag:function(t){
if($(t.target).closest(this.handle).length){
var o=this;
this.options.cursor&&this.handle.css("cursor",this.options.cursor),this._dragStarted=!0,
$(document).bind("mousemove."+this.dragEventNameSpace,function(t){
o.dragMove(t);
}).bind("mouseup."+this.dragEventNameSpace,function(t){
o.dragStop(t);
}),this.options.onDragStart&&this.options.onDragStart.call(this),t.preventDefault();
}
},
dragMove:function(t){
if(this._dragStarted){
var o=this,n={
left:Math.max(0,Math.min((t.pageX-o.parentBound.x)/o.parentBound.w*100,100)),
top:Math.min(100,Math.max((t.pageY-o.parentBound.y)/o.parentBound.h*100,0))
};
return this.options.onBeforeDragMove&&this.options.onBeforeDragMove.call(this,n)===!1?!1:(this.options.onDragMove&&this.options.onDragMove.call(this,n),
!0);
}
},
dragStop:function(t){
this._dragStarted&&(this._dragStarted=!1,this.options.cursor="",this.handle.css("cursor",""),
$(document).unbind("."+this.dragEventNameSpace),this.options.onDragStop&&this.options.onDragStop.call(this),
t.preventDefault());
}
},t;
});