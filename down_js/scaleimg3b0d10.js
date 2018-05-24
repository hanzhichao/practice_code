define("common/wx/mpEditor/plugin/scaleimg.js",["common/wx/mpEditor/plugin/wheelEventAdapter.js"],function(e){
"use strict";
function t(e){
this._o={
wheelScroll:!1
},this._extend(e),this.uiUtils=null,this.editor=null,this.ueditor=null,this.resizer=null,
this.cover=null,this.doc=document,this.prePos={
x:0,
y:0
},this.startPos={
x:0,
y:0
},this.hasInit=!1,this.domUtils=null,this.hasShow=!1,this._g={
hasChange:!1,
minPx:20
};
}
var i=e("common/wx/mpEditor/plugin/wheelEventAdapter.js"),o=[[0,0,-1,-1],[0,0,0,-1],[0,0,1,-1],[0,0,-1,0],[0,0,1,0],[0,0,-1,1],[0,0,0,1],[0,0,1,1]],s=[0,2,5,7],r=!1;
return t.prototype={
_extend:function(e){
if(e)for(var t in e)this._o[t]=e[t];
},
getName:function(){
return"scaleimg";
},
beforeDefineCommand:function(e,t){
var i=e,o=(t.getDomUtils(),t.getBrowser()),s=(UE.dom,this);
this.uiUtils=UE.ui.uiUtils,this.editor=t,o.ie||i.addListener("img_selected",function(e,o,r){
if(!r){
var n=i.selection.getRange();
r=n.getClosedNode();
}
r&&"IMG"==r.tagName&&(s.hasInit||s.init(i,t),s._g.hasChange=!1,s.show(r));
});
},
init:function(e,t){
if(!this.hasInit){
this.hasInit=!0,this.domUtils=t.getDomUtils();
var i=this,o=this.domUtils;
i.ueditor=e,i.startPos=this.prePos={
x:0,
y:0
},i.dragId=-1;
var r=[],n=i.cover=document.createElement("div"),a=i.resizer=document.createElement("div");
n.id=i.ueditor.ui.id+"_imagescale_cover",n.setAttribute("draggable","false"),n.style.cssText="position:absolute;display:none;z-index:"+i.ueditor.options.zIndex+";filter:alpha(opacity=0.01); opacity:0.01;background:#CCC;",
o.on(n,["mousedown","click"],function(e){
i.hide(e);
});
for(var d=0,l=s.length;l>d;d++)r.push('<span draggable="false" class="edui-editor-imagescale-hand'+s[d]+'"></span>');
a.id=i.ueditor.ui.id+"_imagescale",a.className="edui-editor-imagescale",a.setAttribute("draggable","false"),
a.innerHTML=r.join(""),a.style.cssText+=";display:none;border:1px solid #43B548;z-index:"+i.ueditor.options.zIndex+";",
i.ueditor.ui.getDom().appendChild(n),i.ueditor.ui.getDom().appendChild(a),i.initStyle(),
i.initEvents();
}
},
initStyle:function(){
var e=this.editor.getUtils();
e.cssRule("imagescale",".edui-editor-imagescale{display:none;position:absolute;border:1px solid #43B548;cursor:hand;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;}.edui-editor-imagescale span{position:absolute;width:6px;height:6px;overflow:hidden;font-size:0px;display:block;background-color:#43B548;}.edui-editor-imagescale .edui-editor-imagescale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}");
},
initEvents:function(){
var e=this._o,t=this,o=this.ueditor,s=this.domUtils;
t.startPos.x=t.startPos.y=0,t.isDraging=!1;
var n=100;
this.editor.getBrowser().mac&&(n=30);
var a=function(){
var e=arguments[0]||window.event;
if(e&&e.type||(e=arguments[1]||window.event),e&&e.type){
var i=e.keyCode||e.which;
8!=i&&46!=i||!t.target||($(t.target).remove(),t.resetPopup());
}
t.hide(e);
},d=function(e,t){
if("beforemousedown"===e)return void a(t);
var i=e.target||e.srcElement;
!i||void 0!==i.className&&-1!=i.className.indexOf("edui-editor-imagescale")||a(e);
},l=function(e){
switch(e.type){
case"mousedown":
t._g.hasChange=!0;
var i=e.target||e.srcElement;
-1!=i.className.indexOf("edui-editor-imagescale-hand")&&-1==t.dragId&&(t.hidePopup(),
t.dragId=i.className.slice(-1),t.startPos.x=t.prePos.x=e.pageX,t.startPos.y=t.prePos.y=e.pageY,
t.showCover(),s.on(t.doc,"mousemove",p));
break;

case"mouseup":
-1!=t.dragId&&(t.updateContainerStyle(t.dragId,{
x:e.pageX-t.prePos.x,
y:e.pageY-t.prePos.y
}),t.updateTargetElement(),t.target.parentNode&&t.attachTo(t.target),t.dragId=-1),
s.un(t.doc,"mousemove",p),t.hideCover(),r&&(r=!1,t.ueditor.fireEvent("contentchange")),
t.popupAttachTo();
}
},p=function(e){
if(-1!=t.dragId){
t.updateContainerStyle(t.dragId,{
x:e.pageX-t.prePos.x,
y:e.pageY-t.prePos.y
}),t.prePos.x=e.pageX,t.prePos.y=e.pageY,r=!0,t.updateTargetElement(),t.hidePopup();
try{
new UE.dom.Selection(t.doc).getNative().removeAllRanges();
}catch(e){}
}
},u=function(e){
-1!=t.dragId&&e.preventDefault();
},h=function(){
t.hasShow&&t.target&&t.attachTo(t.target);
},c=function(){},g=function(e){
var s=i.eventAdapter(e);
if(s&&s.myWheel){
var r=o.window;
r.scrollTo(0,r.scrollY+s.myWheel*n),t.attachTo(t.target);
}
};
o.addListener("afterscaleshow",function(){
this.fireEvent("afterscalehide"),t.setMinPx(),o.addListener("beforekeydown",a),o.addListener("beforemousedown",d),
o.addListener("iframeSelected",a),s.on(o.window,"scroll",h),s.on(window,"scroll",h),
o.addListener("heightChanged",c),s.on(document,"keydown",a),s.on(document,"mousedown",d),
s.on(document,"dragstart",u),s.on(t.resizer,"mousedown",l),s.on(t.doc,"mouseup",l),
e.wheelScroll&&(s.on(t.resizer,i.supportEvent,g),s.on(t.cover,i.supportEvent,g));
}),o.addListener("afterscalehide",function(){
o.removeListener("beforekeydown",a),o.removeListener("beforemousedown",d),o.removeListener("iframeSelected",a),
s.un(o.window,"scroll",h),s.un(window,"scroll",h),o.removeListener("heightChanged",c),
s.un(document,"keydown",a),s.un(document,"mousedown",d),s.un(document,"dragstart",u),
s.un(t.resizer,"mousedown",l),s.un(t.doc,"mouseup",l),e.wheelScroll&&(s.un(t.resizer,i.supportEvent,g),
s.un(t.cover,i.supportEvent,g));
});
},
setMinPx:function(){
var e=$(this.target);
this._g.minPx=Math.min(e.height(),e.width(),this._g.minPx);
},
updateTargetElement:function(){
var e=this,t=this.domUtils;
t.setStyles(e.target,{
width:e.resizer.style.width,
height:e.resizer.style.height
}),e.attachTo(e.target);
},
resetPopup:function(){
this.popupCloseId&&(this.ueditor.fireEvent("reset_common_popup",this.popupCloseId),
this.popupCloseId=null);
},
createPopup:function(){
var e=this.target;
if(e){
this.resetPopup();
var t=this.editor.fireEvent("get_img_popup_html",e);
if(t){
var i={
html:t,
node:e
};
this.editor.fireEvent("handle_common_popup",i),this.popupCloseId=Math.random(),this.editor.fireEvent("show_common_popup",e,i.html,this.popupCloseId);
}
}
},
hidePopup:function(){
this.editor.fireEvent("hide_common_popup",this.popupCloseId);
},
popupAttachTo:function(){
var e=1/0,t=0,i=0,o=this.uiUtils.getClientRect(this.target),s=$("#bottom_main"),r=this.editor.getDom("toolbarbox");
if(s&&s[0]&&(e=this.uiUtils.getClientRect(s[0]).top),r){
var n=this.uiUtils.getClientRect(r);
t=n.top+n.height;
}
i=this.uiUtils.getClientRect(this.ueditor.iframe).bottom,o.bottom<t||o.top>e||100>i?this.editor.fireEvent("hide_common_popup",this.popupCloseId):this.editor.fireEvent("update_common_popup",this.popupCloseId,!0);
},
updateContainerStyle:function(e,t){
var i,s=this,r=s.resizer;
0!=o[e][0]&&(i=parseInt(r.style.left)+t.x,r.style.left=s._validScaledProp("left",i)+"px"),
0!=o[e][1]&&(i=parseInt(r.style.top)+t.y,r.style.top=s._validScaledProp("top",i)+"px"),
0!=o[e][2]&&(i=r.clientWidth+o[e][2]*t.x,r.style.width=s._validScaledProp("width",i)+"px"),
0!=o[e][3]&&(i=r.clientHeight+o[e][3]*t.y,r.style.height=s._validScaledProp("height",i)+"px");
},
_validScaledProp:function(e,t){
var i=this.resizer,o=document,s=this._g.minPx;
switch(t=isNaN(t)?0:t,e){
case"left":
return 0>t?0:t+i.clientWidth>o.clientWidth?o.clientWidth-i.clientWidth:t;

case"top":
return 0>t?0:t+i.clientHeight>o.clientHeight?o.clientHeight-i.clientHeight:t;

case"width":
return s>=t?s:t+i.offsetLeft>o.clientWidth?o.clientWidth-i.offsetLeft:t;

case"height":
return s>=t?s:t+i.offsetTop>o.clientHeight?o.clientHeight-i.offsetTop:t;
}
},
hideCover:function(){
this.cover.style.display="none";
},
showCover:function(){
var e=this,t=this.domUtils,i=t.getXY(e.ueditor.ui.getDom()),o=t.getXY(e.ueditor.iframe);
t.setStyles(e.cover,{
width:e.ueditor.document.body.offsetWidth+"px",
height:e.ueditor.document.body.offsetHeight+"px",
top:o.y-i.y+"px",
left:o.x-i.x+"px",
position:"absolute",
display:""
});
},
show:function(e){
if(e&&(!this.hasShow||this.target!=e)){
this._g.resetPopupId&&(clearTimeout(this._g.resetPopupId),this._g.resetPopupId=null),
this.hasShow=!0;
{
var t=this;
this.domUtils;
}
this.target=e,t.resizer.style.display="block",t.ueditor.fireEvent("cancel_common_popup_mouseover_event cancel_selectionchange_popup"),
this.createPopup(),t.attachTo(),t.ueditor.fireEvent("afterscaleshow",t);
}
},
hide:function(e){
if(-1==this.dragId){
this.hasShow=!1;
{
var t=this;
this.domUtils;
}
if(t.hideCover(),t.resizer.style.display="none",t.ueditor.fireEvent("afterscalehide",t),
t.ueditor.fireEvent("set_common_popup_mouseover_event set_selectionchange_popup"),
t._g.hasChange===!0&&t.ueditor.fireEvent("saveScene"),e&&e.preventDefault){
var i=e.target||e.srcElement;
i&&i.ownerDocument===document&&e.preventDefault(),"keydown"==e.type||i&&i.ownerDocument===document||setTimeout(function(){
t.ueditor.focus(),t.target&&(t.target.focus(),t.ueditor.selection.getRange().selectNode(t.target).collapse().select(!0));
},0);
}
this._g.resetPopupId=setTimeout(function(){
t.resetPopup();
},600);
}
},
attachTo:function(){
var e=this,t=this.domUtils,i=this.resizer,o=this.target,s=t.getXY(o),r=t.getXY(e.ueditor.iframe),n=t.getXY(i.parentNode);
t.setStyles(i,{
width:o.width+"px",
height:o.height+"px",
left:r.x+s.x-e.ueditor.document.body.scrollLeft-n.x-parseInt(i.style.borderLeftWidth)+"px",
top:r.y+s.y-e.ueditor.document.body.scrollTop-n.y-parseInt(i.style.borderTopWidth)+"px"
}),this.popupAttachTo();
}
},t;
});