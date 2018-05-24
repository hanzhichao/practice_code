define("common/wx/mpEditor/plugin/cropimg.js",["common/lib/jquery.Jcrop.js","common/wx/mpEditor/utils.js","common/wx/dialog.js","common/wx/media/imageDialog.js","common/wx/Tips.js","common/wx/mpEditor/common/cropImgCgi.js","common/wx/mpEditor/plugin/wheelEventAdapter.js","common/wx/media/cropimg.js","tpl/mpEditor/plugin/crop_img.html.js"],function(t){
"use strict";
function e(t){
this._o={
coverWheelScroll:!1,
ratio:1,
selectRatio:0,
wheelStep:.2,
toolbarOffsetTop:10
},this._extend(t),this.uiUtils=null,this.ueditor=null,this.editor=null,this.domUtils=null,
this.event={};
}
t("common/lib/jquery.Jcrop.js");
var o=t("common/wx/mpEditor/utils.js"),i=t("common/wx/dialog.js"),r=t("common/wx/media/imageDialog.js"),n=t("common/wx/Tips.js"),a=t("common/wx/mpEditor/common/cropImgCgi.js"),s=t("common/wx/mpEditor/plugin/wheelEventAdapter.js"),c=(t("common/wx/media/cropimg.js"),
t("tpl/mpEditor/plugin/crop_img.html.js"));
return e.prototype={
_extend:function(t){
for(var e in t)this._o[e]=t[e];
},
getName:function(){
return"cropimg";
},
beforeEditorDestory:function(){
this.destory();
},
beforeDefineCommand:function(t,e){
this.editor=e,this.ueditor=t,this.uiUtils=UE.ui.uiUtils,this.domUtils=e.getDomUtils(),
this.initCacheData(),this.defineEvent();
},
initCacheData:function(){
this._g={
fireAdjustHeight:!1,
replaceOpt:{},
type:"crop_img",
targetUrl:"",
minZoomPx:20,
maxZoomPx:3e3,
minZoom:1,
maxZoom:1,
unchangeableRatio:!1,
commiting:!1,
resizerDragId:-1,
resizerMouseStartPos:{
x:0,
y:0
},
trackMouseStartPos:{
x:0,
y:0
},
curSelectionPos:{},
bodyPaddingLeft:0,
curZoom:1,
target:null,
_ImgCropper:null,
$cropWrp:null,
$cancelBtn:null,
$okBtn:null,
hasRecoverTarget:!1,
oriImgW:0,
oriImgH:0
};
},
defineEvent:function(){
var t=this,e=this._o,o=(this.domUtils,100);
this.editor.getBrowser().mac&&(o=30),this.event={
cancelCrop:function(){
var e=t._g.replaceOpt,o=t.uiUtils.getClientRect(t._g.target);
t.recoverTarget({
copyright_status:e.copyright_status,
url:e.oriSrc,
scaledW:t.px(e.startW),
scaledH:t.px(e.startH),
selectionX1:e.selectionX1,
selectionY1:e.selectionY1,
selectionX2:e.selectionX2,
selectionY2:e.selectionY2
});
var i=t.uiUtils.getClientRect(t._g.targetClone),r=Math.max(o.left-i.left,0),n=Math.max(o.top-i.top,0),a=e.selectionX2-e.selectionX1+r,s=e.selectionY2-e.selectionY1+n;
t._g.targetClone.setAttribute("data-cropselx1",t.px(r)),t._g.targetClone.setAttribute("data-cropselx2",t.px(a)),
t._g.targetClone.setAttribute("data-cropsely1",t.px(n)),t._g.targetClone.setAttribute("data-cropsely2",t.px(s)),
t.destory();
},
destory:function(e){
t.destory(e);
},
mousewheelEvent:function(o){
var i=s.eventAdapter(o);
return i&&i.myWheel?(t.setZoom(t._g.curZoom-e.wheelStep*i.myWheel),o.stopPropagation?(o.stopPropagation(),
o.preventDefault()):o.cancelBubble=!0,!1):void 0;
},
updateCoverPos:function(){
t.showCover();
},
dragBarEvent:function(e){
switch(e.type){
case"mousedown":
t.updateDotPos(e.pageX),t.bindEventInterface({
type:"domUtils",
dom:document,
eventName:"mousemove",
fun:t.event.dragBarMoveEvent
}),t.bindEventInterface({
type:"domUtils",
dom:document,
eventName:"mouseup",
fun:t.event.dragBarEvent
});
break;

case"mouseup":
t.updateDotPos(e.pageX),t.unbindSpecifyEvent({
type:"domUtils",
dom:document,
eventName:"mousemove",
fun:t.event.dragBarMoveEvent
}),t.unbindSpecifyEvent({
type:"domUtils",
dom:document,
eventName:"mouseup",
fun:t.event.dragBarEvent
});
}
},
dragBarMoveEvent:function(e){
t.updateDotPos(e.pageX),t.removeDocRange();
},
updateCropWrpPos:function(){
t.attachTo();
},
trackEvent:function(e){
switch(e.type){
case"mousedown":
var o=t._g,i=e.target||e.srcElement;
-1==o.resizerDragId&&-1==i.className.indexOf("edui-editor-imagescale-hand")&&(o.trackMouseStartPos.x=e.pageX,
o.trackMouseStartPos.y=e.pageY,t.bindEventInterface({
type:"domUtils",
dom:document,
eventName:"mousemove",
fun:t.event.trackMoveEvent
}),t.bindEventInterface({
type:"domUtils",
dom:document,
eventName:"mouseup",
fun:t.event.trackEvent
}));
break;

case"mouseup":
var o=t._g;
-1==o.resizerDragId&&t.updateCropImgPos({
x:e.pageX-o.trackMouseStartPos.x,
y:e.pageY-o.trackMouseStartPos.y
}),t.unbindSpecifyEvent({
type:"domUtils",
dom:document,
eventName:"mousemove",
fun:t.event.trackMoveEvent
}),t.unbindSpecifyEvent({
type:"domUtils",
dom:document,
eventName:"mouseup",
fun:t.event.trackEvent
});
}
},
trackMoveEvent:function(e){
var o=t._g;
-1==o.resizerDragId&&(t.updateCropImgPos({
x:e.pageX-o.trackMouseStartPos.x,
y:e.pageY-o.trackMouseStartPos.y
}),o.trackMouseStartPos.x=e.pageX,o.trackMouseStartPos.y=e.pageY,t.removeDocRange());
},
stopEvent:function(t){
return t.stopPropagation?(t.stopPropagation(),t.preventDefault()):t.cancelBubble=!0,
!1;
},
editorScrollEvent:function(){
t.attachTo();
},
coverWheelEvent:function(e){
var i=s.eventAdapter(e);
if(i&&i.myWheel){
var r=t.ueditor.window;
r.scrollTo(0,r.scrollY+i.myWheel*o),t.attachTo();
}
},
resizerEvent:function(e){
switch(e.type){
case"mousedown":
var o=t._g,i=e.target||e.srcElement;
-1==o.resizerDragId&&-1!=i.className.indexOf("edui-editor-imagescale-hand")&&(o.resizerDragId=i.className.slice(-1),
o.resizerMouseStartPos.x=e.pageX,o.resizerMouseStartPos.y=e.pageY,t.bindEventInterface({
type:"domUtils",
dom:document,
eventName:"mousemove",
fun:t.event.resizerMoveEvent
}),t.bindEventInterface({
type:"domUtils",
dom:document,
eventName:"mouseup",
fun:t.event.resizerEvent
}));
break;

case"mouseup":
var o=t._g;
-1!=o.resizerDragId&&(t.updateContainerStyle(o.resizerDragId,{
x:e.pageX-o.resizerMouseStartPos.x,
y:e.pageY-o.resizerMouseStartPos.y
}),o.resizerDragId=-1),t.unbindSpecifyEvent({
type:"domUtils",
dom:document,
eventName:"mousemove",
fun:t.event.resizerMoveEvent
}),t.unbindSpecifyEvent({
type:"domUtils",
dom:document,
eventName:"mouseup",
fun:t.event.resizerEvent
});
}
},
resizerMoveEvent:function(e){
var o=t._g;
-1!=o.resizerDragId&&(t.updateContainerStyle(o.resizerDragId,{
x:e.pageX-o.resizerMouseStartPos.x,
y:e.pageY-o.resizerMouseStartPos.y
}),t.removeDocRange(),o.resizerMouseStartPos.x=e.pageX,o.resizerMouseStartPos.y=e.pageY);
},
complete:function(e){
if(t._g.commiting!==!0){
t._g.commiting=!0,t._g.$okBtn.btn(!1);
var o=t._g._ImgCropper.tellSelect(),i=t._g._ImgCropper.getScaleFactor(),r=t._g.cropUi.botImg.width()*i[0],s=t._g.cropUi.botImg.height()*i[1];
if(a.getUrl({
imgurl:t._g.targetUrl,
x1:o.x/r,
y1:o.y/s,
x2:o.x2/r,
y2:o.y2/s,
onerror:function(){
t._g._ImgCropper&&(n.err("系统繁忙，请稍后再试"),t._g.commiting=!1,t._g.$okBtn.btn(!0));
},
onsuccess:function(e){
if(t._g._ImgCropper){
t._g.commiting=!1,t._g.$okBtn.btn(!0);
var n=o.x2-o.x,a=o.y2-o.y;
t.recoverTarget({
oriSrc:t._g.targetUrl,
url:e.url,
w:t.px(r),
h:t.px(s),
x1:o.x,
x2:o.x2,
y1:o.y,
y2:o.y2,
scaledW:t.px(n/i[0]),
scaledH:t.px(a/i[1])
}),t.destory();
}
}
}),e&&e.preventDefault){
var c=e.target||e.srcElement;
c&&c.ownerDocument===document&&e.preventDefault();
}
}
}
};
},
initCropFromReplace:function(t,e,o){
var i=this,r=t.getAttribute("data-cropselx2");
if(r){
i._g.type="img_replace";
var n=t.getAttribute("data-cropselx1"),a=t.getAttribute("data-cropsely1"),s=t.getAttribute("data-cropsely2");
i.getStartWH({
targetW:r-n,
targetH:s-a,
url:t.src,
onSuccess:function(e){
var o=$(t).height(),c=i.domUtils.getXY(t),p=i.ueditor.body.lastChild,l=i.domUtils.getXY(p),m=$(p).height(),d=e.startH-o-(l.y+m-(c.y+o))+100;
if(d>0){
var g=$(i.ueditor.body).height();
i.ueditor.setHeight(g+d,!0),i._g.fireAdjustHeight=!0;
}
i.initCropOptions(t,{
oriSrc:t.src,
startW:e.startW,
startH:e.startH,
selectionX1:n,
selectionY1:a,
selectionX2:r,
selectionY2:s
});
}
});
}else i.initCropOptions(t,e,o);
},
initCropOptions:function(t,e,o){
var i=this,r=this.editor;
r.fireEvent("start_crop_img"),$(document.body).addClass("img_editing"),r.disableToolbar();
try{
i.ueditor.selection.getNative().removeAllRanges();
}catch(n){}
if(o)for(var a in o)"undefined"!=typeof i._g[a]&&(i._g[a]=o[a]);
var s,c,p,l,m,d,g,h,u,x,f;
if(e&&e.oriSrc?(i._g.replaceOpt=e,s=e.oriSrc,d=i.px(e.selectionX1),g=i.px(e.selectionX2),
h=i.px(e.selectionY1),u=i.px(e.selectionY2),x=i.px(e.startW),f=i.px(e.startH)):(s=t.getAttribute("data-croporisrc"),
c=t.getAttribute("data-cropx1"),p=t.getAttribute("data-cropy1"),l=t.getAttribute("data-cropx2"),
m=t.getAttribute("data-cropy2")),s){
var v=new Image;
v.onload=function(){
this.onload=null,this.onerror=null,i.init(t,{
oriSrc:s,
trueW:this.naturalWidth||this.width,
trueH:this.naturalHeight||this.height,
x1:c,
x2:l,
y1:p,
y2:m,
selectionX1:d,
selectionX2:g,
selectionY1:h,
selectionY2:u,
startW:x,
startH:f
});
},v.onerror=function(){
this.onload=null,this.onerror=null,i.init(t);
},v.src=s;
}else i.init(t);
},
addListener:function(t){
var e=this;
t.addListener("crop_img",function(t,o,r,n){
o&&o.ownerDocument&&(o.ownerDocument.defaultView||o.ownerDocument.parentWindow)&&("2"==o.getAttribute("data-copyright")?i.show({
title:"温馨提示",
type:"info",
msg:"裁剪原创图片会使原创标志失效，确定裁剪？",
buttons:[{
text:"确定",
click:function(){
e.initCropFromReplace(o,r,n),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
}):e.initCropFromReplace(o,r,n));
}),t.addListener("img_replace",function(t,o){
e.showImgDialog(o);
});
},
init:function(t,e){
{
var o=this._g;
this._o;
}
o.target=t,o.targetClone=t.cloneNode(!0),o.targetUrl=e&&e.oriSrc?e.oriSrc:o.target.src,
this.setOriWh(e),this.setMinMaxZoom(),o.bodyPaddingLeft=parseInt(this.domUtils.getComputedStyle(this.ueditor.document.body,"padding-left"))||0,
o.$cropWrp=$("<div>").html(wx.T(c,{
url:o.target.src,
zIndex:this.ueditor.options.zIndex,
type:o.type
})).find(".js_crop_img_wrap"),this.ueditor.ui.getDom().appendChild(o.$cropWrp[0]),
o.$cropArea=o.$cropWrp.find(".js_crop_area"),this.initCrop(e),this.hideTarget();
},
hideTarget:function(){
$(this._g.target).css({
visibility:"hidden"
});
},
getStartWH:function(t){
var e=t.url,o=t.targetW,i=t.targetH,r=new Image;
r.onload=function(){
this.onload=null,this.onerror=null;
var e=this.naturalWidth||this.width,r=this.naturalHeight||this.height,n=o,a=r/e*n;
i>a&&(a=i,n=e/r*a),"function"==typeof t.onSuccess&&t.onSuccess({
startH:a,
startW:n
});
},r.onerror=function(){
this.onload=null,this.onerror=null,"function"==typeof t.onError&&t.onError();
},r.src=e;
},
showImgDialog:function(t){
var e=this;
this.editor.fireEvent("handleWinScroll",!1),this.editor.fireEvent("before_show_img_replace_dialog"),
r({
maxSelect:1,
doselected:!0,
uploadGroupId:3,
completeUploadMinSelectNum:1,
onOK:function(o){
var i=this,r=$(t),a=r.width(),s=r.height();
e.getStartWH({
targetW:a,
targetH:s,
url:o[0].url,
onError:function(){
n.err("图片加载失败，请稍后再试");
},
onSuccess:function(r){
i.destroy(),e.editor.fireEvent("handleWinScroll",!0),e.editor.fireEvent("after_close_show_img_replace_dialog"),
e._g.target=t,e._g.targetClone=e._g.target.cloneNode(!0),e._g.replaceOpt={
copyright_status:o[0].copyright_status,
oriSrc:o[0].url,
startW:e.px(r.startW),
startH:e.px(r.startH),
selectionX1:0,
selectionY1:0,
selectionX2:a,
selectionY2:s
},e.event.cancelCrop();
}
});
},
onHide:function(){
this.destroy(),e.editor.fireEvent("handleWinScroll",!0),e.editor.fireEvent("after_close_show_img_replace_dialog");
}
});
},
updateContainerStyle:function(t,e){
var o=this._g,i=(this._o,o.cropUi.botImg),r=i.width(),n=i.height(),a=this.px(parseFloat(i[0].style.left||0)),s=this.px(parseFloat(i[0].style.top||0)),c=a,p=s,l=c+r,m=p+n,d=c,g=p,h=l,u=m,x=1,f=0,v=0,y=this._g.curSelectionPos;
switch(1*t){
case 0:
d=this.px(c+e.x),d>y.x&&(d=y.x),x=Math.max(Math.min(o.maxZoom,(h-d)/o.oriImgW),o.minZoom),
d=this.px(h-x*o.oriImgW),g=this.px(u-o.oriImgH/o.oriImgW*(h-d)),g>y.y&&(g=y.y),x=Math.max(Math.min(o.maxZoom,(u-g)/o.oriImgH),o.minZoom),
g=this.px(u-x*o.oriImgH),d=this.px(h-o.oriImgW/o.oriImgH*(u-g));
break;

case 2:
h=this.px(l+e.x),h<y.x2&&(h=y.x2),x=Math.max(Math.min(o.maxZoom,(h-d)/o.oriImgW),o.minZoom),
h=this.px(d+x*o.oriImgW),g=this.px(u-o.oriImgH/o.oriImgW*(h-d)),g>y.y&&(g=y.y),x=Math.max(Math.min(o.maxZoom,(u-g)/o.oriImgH),o.minZoom),
g=this.px(u-x*o.oriImgH),h=this.px(d+o.oriImgW/o.oriImgH*(u-g));
break;

case 5:
d=this.px(c+e.x),d>y.x&&(d=y.x),x=Math.max(Math.min(o.maxZoom,(h-d)/o.oriImgW),o.minZoom),
d=this.px(h-x*o.oriImgW),u=this.px(g+o.oriImgH/o.oriImgW*(h-d)),u<y.y2&&(u=y.y2),
x=Math.max(Math.min(o.maxZoom,(u-g)/o.oriImgH),o.minZoom),u=this.px(g+x*o.oriImgH),
d=this.px(h-o.oriImgW/o.oriImgH*(u-g));
break;

case 7:
h=this.px(l+e.x),h<y.x2&&(h=y.x2),x=Math.max(Math.min(o.maxZoom,(h-d)/o.oriImgW),o.minZoom),
h=this.px(d+x*o.oriImgW),u=this.px(g+o.oriImgH/o.oriImgW*(h-d)),u<y.y2&&(u=y.y2),
x=Math.max(Math.min(o.maxZoom,(u-g)/o.oriImgH),o.minZoom),u=this.px(g+x*o.oriImgH),
h=this.px(d+o.oriImgW/o.oriImgH*(u-g));
}
f=d-c,v=g-p;
this.updateCropStyle({
h:u-g,
w:h-d,
offsetX:f,
offsetY:v
});
},
updateCropStyle:function(t){
var e=this._g,o=e.cropUi,i=o.holder,r=t.w,n=t.h,a=t.offsetX,s=t.offsetY,c=i.width(),p=i.height(),l=this.px(parseFloat(i[0].style.left||0)),m=this.px(parseFloat(i[0].style.top||0)),d=this.px(parseFloat(o.selection[0].style.left||0)),g=this.px(parseFloat(o.selection[0].style.top||0)),h=d-a,u=g-s,x=l+a,f=m+s,v=e._ImgCropper.getScaleFactor(),y=c*v[0]/r,_=p*v[1]/n,I=e._ImgCropper.getOptions(),b=I.boundary;
e.curZoom=r/e.oriImgW,i.css({
width:r+"px",
height:n+"px",
left:x+"px",
top:f+"px"
}),e.curSelectionPos.x-=a,e.curSelectionPos.x2-=a,e.curSelectionPos.y-=s,e.curSelectionPos.y2-=s,
o.selection.css({
left:e.curSelectionPos.x+"px",
top:e.curSelectionPos.y+"px"
}),o.topImg.css({
width:r+"px",
height:n+"px",
left:-h+"px",
top:-u+"px"
}),o.botImg.width(r).height(n),o.trk.width(r+2*b).height(n+2*b),this.updateImgScaleStyle();
var S=e.$cropArea.width(),E=e.$cropArea.height();
e._ImgCropper.setOptions({
maxBound:[-x,-f,-x+S,-f+E]
},!0),e._ImgCropper.changeImgScale({
selectionPos:[e.curSelectionPos.x,e.curSelectionPos.y,e.curSelectionPos.x2,e.curSelectionPos.y2],
xscale:y,
yscale:_
}),this.changeProgess(e.curZoom);
},
updateImgScaleStyle:function(){
var t=this._g,e=t.cropUi.holder,o=t.cropUi.botImg,i=this.px(parseFloat(e[0].style.left||0)),r=this.px(parseFloat(e[0].style.top||0)),n=this.px(parseFloat(o[0].style.left||0)),a=this.px(parseFloat(o[0].style.top||0));
t.$imgScale.css({
height:o.height()+"px",
width:o.width()+"px",
left:i+n+"px",
top:r+a+"px"
}),t.$imgScaleCover.css({
height:o.height()+"px",
width:o.width()+"px",
left:i+n+"px",
top:r+a+"px"
});
},
removeDocRange:function(){
try{
new UE.dom.Selection(document).getNative().removeAllRanges();
}catch(t){}
},
recoverTarget:function(t){
var e=this,o=this._g;
if(o.target&&!o.hasRecoverTarget){
o.hasRecoverTarget=!0;
var i=o.target.parentNode;
if(i&&(i.insertBefore(o.targetClone,o.target),i.removeChild(o.target)),t&&t.url){
o.fireAdjustHeight=!1,o.targetClone.src=t.url;
for(var r=$(o.targetClone),n=[{
key:"data-croporisrc",
val:t.oriSrc
},{
key:"data-cropx1",
val:t.x1
},{
key:"data-cropx2",
val:t.x2
},{
key:"data-cropy1",
val:t.y1
},{
key:"data-cropy2",
val:t.y2
},{
key:"data-cropselx1",
val:"undefined"!=typeof t.selectionX1?this.px(t.selectionX1):void 0
},{
key:"data-cropselx2",
val:"undefined"!=typeof t.selectionX2?this.px(t.selectionX2):void 0
},{
key:"data-cropsely1",
val:"undefined"!=typeof t.selectionY1?this.px(t.selectionY1):void 0
},{
key:"data-cropsely2",
val:"undefined"!=typeof t.selectionY2?this.px(t.selectionY2):void 0
},{
key:"data-copyright",
val:t.copyright_status
}],a=0,s=n.length;s>a;a++){
var c=n[a];
"undefined"!=typeof c.val?r.attr(c.key,c.val):o.targetClone.removeAttribute(c.key);
}
var p=t.scaledW,l=t.scaledH;
"undefined"!=t.scaledW&&(p=Math.min($(e.ueditor.body).width(),t.scaledW),l=e.px(t.scaledH/t.scaledW*p),
o.targetClone.style.width=p+"px"),"undefined"!=t.scaledH&&(o.targetClone.style.height=l+"px"),
o.targetClone.removeAttribute("data-ratio"),o.targetClone.removeAttribute("data-w"),
o.targetClone.removeAttribute("width"),o.targetClone.removeAttribute("height"),e.ueditor.fireEvent("draft_force_save"),
this.editor.fireEvent("saveScene");
}
setTimeout(function(t,e,o,i){
return function(){
try{
e.focus(),t.focus(),e.selection.getRange().selectNode(t).collapse().select(!0),$(document.body).removeClass("img_editing"),
o.enableToolbar(),i&&(e.fireEvent("afterCropImg","",[t]),e.fireEvent("end_crop_img contentchange"));
}catch(r){}
};
}(o.targetClone,e.ueditor,e.editor,t),0);
}
},
updateToolbarPos:function(){
if(this._g.$toolbar){
var t=this._g.curSelectionPos,e=parseFloat(this._g.cropUi.holder[0].style.top||0),o=this.px(t.y+t.h+e+this._o.toolbarOffsetTop);
this._g.$toolbar[0].style.top=o+"px";
}
},
setMinMaxZoom:function(){
var t=this._g,e=Math.max(t.oriImgH,t.oriImgW),o=Math.min(t.oriImgH,t.oriImgW);
t.minZoomPx=Math.min(o,t.minZoomPx),t.maxZoomPx=Math.max(e,t.maxZoomPx),t.minZoom=t.minZoomPx/o,
t.maxZoom=t.maxZoomPx/e;
},
setOriWh:function(t){
var e=this._g,o=$(e.target),i=e.target.style.width||"",r=e.target.style.height||"";
if(i="auto"==i||i.indexOf("%")>=0||!parseFloat(i)?o.width():parseFloat(i),r="auto"==r||r.indexOf("%")>=0||!parseFloat(r)?o.height():parseFloat(r),
r=this.px(r),i=this.px(i),t){
var n,a;
"undefined"!=typeof t.startW&&"undefined"!=typeof t.startH?(n=t.trueW/t.startW,a=t.trueH/t.startH,
t.x1=t.selectionX1*n,t.x2=t.selectionX2*n,t.y1=t.selectionY1*a,t.y2=t.selectionY2*a):(n=(t.x2-t.x1)/i,
a=(t.y2-t.y1)/r,t.startW=this.px(t.trueW/n),t.startH=this.px(t.trueH/t.trueW*(t.trueW/n)),
t.selectionX1=this.px(t.x1/n),t.selectionX2=this.px(t.x2/n),t.selectionY1=this.px(t.y1/a),
t.selectionY2=this.px(t.y2/a)),e.oriImgW=t.startW,e.oriImgH=t.startH;
}else e.oriImgW=i,e.oriImgH=r;
},
initCrop:function(t){
var e,o=this,i=this._g,r=this._o,n=$(i.target);
i.unchangeableRatio&&(e=n.data("ratio"),e=e?1/e:r.ratio),i.$cropWrp.find("img").Jcrop({
allowSelect:!1,
createHandles:["nw","ne","se","sw"],
keySupport:!1,
aspectRatio:i.unchangeableRatio?e:null,
boxWidth:i.oriImgW,
boxHeight:i.oriImgH,
minSize:[10,10],
onChange:function(t,e){
i.curSelectionPos=e,o.updateToolbarPos();
}
},function(){
i._ImgCropper=this,i._ImgCropper.setImage(i.targetUrl,function(){
if(t)i._ImgCropper.setSelect("img_replace"==i.type?[t.x1,t.y1,t.x2,t.y2]:[0,0,t.x2-t.x1,t.y2-t.y1]);else{
var e=i._ImgCropper.getBounds();
i._ImgCropper.setSelect([e[0]*r.selectRatio,e[1]*r.selectRatio,e[0]*(1-r.selectRatio),e[1]*(1-r.selectRatio)]);
}
o.cacheDom(),i.cropUi.selection.find(".jcrop-handle").css({
width:"7px",
height:"7px"
}),o.initEvent(),o.attachTo({
changeHolder:!0
}),o.changeProgess(i.curZoom),t&&"crop_img"==i.type&&o.updateCropImgPos({
x:-t.selectionX1,
y:-t.selectionY1
}),o.updateToolbarPos();
});
});
},
isInBotImgVisibleArea:function(t,e){
var o=this._g.cropUi.botImg,i=o.width(),r=o.height(),n=this.domUtils.getXY(o[0]),a=this._g.$cropArea,s=a.width(),c=a.height(),p=this.domUtils.getXY(a[0]),l=Math.max(n.x,p.x),m=Math.max(n.y,p.y),d=Math.min(n.x+i,p.x+s),g=Math.min(n.y+r,p.y+c);
return t>=l&&e>=m&&d>=t&&g>=e?!0:!1;
},
updateCropImgPos:function(t){
var e=this._g,o=e.cropUi.botImg,i=e.cropUi.topImg,r=o.width(),n=o.height(),a=this.px(parseFloat(o[0].style.left||0)),s=this.px(parseFloat(i[0].style.left||0)),c=this.px(parseFloat(o[0].style.top||0)),p=this.px(parseFloat(i[0].style.top||0)),l=this.fixCoorBycurSelectionPos({
x1:a+t.x,
y1:c+t.y,
x2:a+t.x+r,
y2:c+t.y+n
}),m=l.x1-a,d=l.y1-c;
o[0].style.left=l.x1+"px",o[0].style.top=l.y1+"px",i[0].style.left=s+m+"px",i[0].style.top=p+d+"px",
this.updateImgScaleStyle(),e._ImgCropper.updateOffset({
offsetX:l.x1,
offsetY:l.y1
});
},
fixCoorBycurSelectionPos:function(t){
var e=this._g.curSelectionPos,o=this.px(t.x1),i=this.px(t.x2),r=this.px(t.y1),n=this.px(t.y2);
return o>e.x?(i-=o-e.x,o=e.x):i<e.x2&&(o+=e.x2-i,i=e.x2),r>e.y?(n-=r-e.y,r=e.y):n<e.y2&&(r+=e.y2-n,
n=e.y2),{
x1:o,
x2:i,
y1:r,
y2:n
};
},
px:function(t){
return Math.round(t);
},
setZoom:function(t){
var e=this._g,o=(this._o,e.cropUi);
t=Math.max(t,e.minZoom),t=Math.min(t,e.maxZoom);
var i=this.px(e.oriImgW*t),r=this.px(e.oriImgH*t),n=o.holder,a=n.width(),s=n.height(),c=this.px((a-i)/2),p=this.px((s-r)/2);
if(i=a-2*c,r=s-2*p,t<e.curZoom){
var l=e.curSelectionPos,m=o.botImg,d=this.px(parseFloat(m[0].style.left||0)),g=this.px(parseFloat(m[0].style.top||0)),h=d+c,u=g+p,x=h+i,f=u+r;
if(h>l.x){
x+=h-l.x,h=l.x;
var v=this.px((e.oriImgH/e.oriImgW*(x-h)-(f-u))/2);
u-=v,f+=v;
}
if(x<l.x2){
h-=l.x2-x,x=l.x2;
var v=this.px((e.oriImgH/e.oriImgW*(x-h)-(f-u))/2);
u-=v,f+=v;
}
if(u>l.y){
f+=u-l.y,u=l.y;
var v=this.px((e.oriImgW/e.oriImgH*(f-u)-(x-h))/2);
h-=v,x+=v;
}
if(f<l.y2){
u-=l.y2-f,f=l.y2;
var v=this.px((e.oriImgW/e.oriImgH*(f-u)-(x-h))/2);
h-=v,x+=v;
}
i=x-h,r=f-u,c=this.px((a-i)/2),p=this.px((s-r)/2),i=a-2*c,r=s-2*p,e.curZoom=i/e.oriImgW;
}else e.curZoom=t;
this.updateCropStyle({
w:i,
h:r,
offsetX:c,
offsetY:p
});
},
changeProgess:function(t){
var e=this._g,o=(t-e.minZoom)/(e.maxZoom-e.minZoom)*100;
this.updateDragBarStyle(o);
},
updateDragBarStyle:function(t){
this._g.$progress[0].style.width=t+"%",this._g.$dot[0].style.left=t+"%";
},
updateDotPos:function(t){
var e=(this._o,this._g),o=e.$dragBar.width(),i=this.domUtils.getXY(e.$dragBar[0]).x,r=Math.max(0,Math.min(t-i,o)),n=r/o*100;
this.updateDragBarStyle(n);
var a=n/100*(e.maxZoom-e.minZoom)+e.minZoom;
this.setZoom(a);
},
attachTo:function(t){
var e=this,o=this._g,i=this.domUtils,r=i.getXY(o.target),n=i.getXY(e.ueditor.iframe),a=i.getXY(o.$cropWrp[0].parentNode),s=$(this.ueditor.document.body),c=s.width(),p=10,l=n.y+r.y-e.ueditor.document.body.scrollTop-a.y-p;
if(o.$cropWrp.css({
height:"auto",
width:c,
left:n.x+this._g.bodyPaddingLeft-e.ueditor.document.body.scrollLeft-a.x+"px",
top:l+"px"
}),o.$cropArea.css({
height:$(e.ueditor.body).height()-r.y+"px",
width:c
}),t&&t.changeHolder){
var m=r.x-this._g.bodyPaddingLeft,d=p;
o.cropUi.holder.css({
left:m+"px",
top:d+"px"
}),this.updateImgScaleStyle(),o._ImgCropper.setOptions({
maxBound:[-m,-d,-m+o.$cropArea.width(),-d+o.$cropArea.height()]
},!0);
}
},
cacheDom:function(){
var t=this._g;
t.$cancelBtn=t.$cropWrp.find(".js_cancel"),t.$imgScale=t.$cropWrp.find(".js_img_scale"),
t.$imgScaleCover=t.$cropWrp.find(".js_img_scale_cover"),t.$okBtn=t.$cropWrp.find(".js_ok"),
t.$progress=t.$cropWrp.find(".js_progress"),t.$dot=t.$cropWrp.find(".js_dot"),t.$dragBar=t.$cropWrp.find(".js_drag_bar"),
t.$toolbar=t.$cropWrp.find(".js_tool_bar"),t.cropUi=t._ImgCropper.ui;
},
initEvent:function(){
var t=(this.domUtils,this._g),e=(this.editor,this.event);
this.bindEventInterface({
type:"domUtils",
dom:t.$imgScale[0],
eventName:s.supportEvent,
fun:e.mousewheelEvent
}),this.bindEventInterface({
type:"domUtils",
dom:t.$imgScale[0],
eventName:"mousedown",
fun:e.resizerEvent
}),this.bindEventInterface({
type:"domUtils",
dom:t.$imgScale[0],
eventName:"mousedown",
fun:e.trackEvent
}),this._o.coverWheelScroll&&(this.bindEventInterface({
type:"domUtils",
dom:t.$cropWrp[0],
eventName:s.supportEvent,
fun:e.coverWheelEvent
}),this.bindEventInterface({
type:"domUtils",
dom:t.$cropWrp[0].parentNode,
eventName:s.supportEvent,
fun:e.coverWheelEvent
})),this.bindEventInterface({
type:"editor",
eventName:"scroll",
fun:e.editorScrollEvent
}),this.bindEventInterface({
type:"domUtils",
dom:t.$cancelBtn[0],
eventName:"click",
fun:e.destory
}),this.bindEventInterface({
type:"domUtils",
dom:t.$okBtn[0],
eventName:"click",
fun:e.complete
}),this.bindEventInterface({
type:"editor",
eventName:"heightChanged",
fun:e.updateCoverPos
}),this.bindEventInterface({
type:"domUtils",
dom:this.ueditor.window,
eventName:"scroll",
fun:e.updateCropWrpPos
}),this.bindEventInterface({
type:"domUtils",
dom:window,
eventName:"scroll",
fun:e.updateCropWrpPos
}),this.bindEventInterface({
type:"domUtils",
dom:t.cropUi.holder[0],
eventName:s.supportEvent,
fun:e.mousewheelEvent
}),this.bindEventInterface({
type:"domUtils",
dom:t.$dragBar[0],
eventName:"mousedown",
fun:e.dragBarEvent
}),this.bindEventInterface({
type:"domUtils",
dom:t.cropUi.botImg[0],
eventName:"dragstart",
fun:e.stopEvent
});
},
destory:function(){
{
var t=(this.domUtils,this._g);
this.editor,this.event;
}
t.$cropWrp&&t.$cropWrp.remove(),this.unbindEventInterface(),this.recoverTarget(),
this.initCacheData(),t.fireAdjustHeight&&this.editor.fireEvent("adjustheight");
}
},o.initEventInterface(e),e;
});