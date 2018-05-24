define("common/wx/mpEditor/plugin/popup.js",["common/wx/mpEditor/utils.js"],function(e){
"use strict";
function t(e){
this.mpeditor=e,this.editor=e.getUeditor(),this.uiUtils=baidu.editor.ui.uiUtils,
this.domUtils=UE.dom.domUtils,this._g={
selectionchangePopup:!0,
mouseoutObj:{},
event:{},
popupMouseoutId:null
},this.init(),this.addEvent();
}
var o=e("common/wx/mpEditor/utils.js");
return t.prototype.init=function(){
var e=this,t=e.editor,o=e.mpeditor;
this.popup=new baidu.editor.ui.Popup({
editor:t,
content:"",
className:"edui-bubble",
_execCommand:function(){
for(var e=[],o=0,n=arguments.length;n>o;o++)e.push(arguments[o]);
e.push(this._anchorEl),t.execCommand.apply(t,e);
},
_execCommandAndHide:function(){
for(var e=[],o=0,n=arguments.length;n>o;o++)e.push(arguments[o]);
e.push(this._anchorEl),t.execCommand.apply(t,e),this.hide(this._closeId);
},
_fireEvent:function(){
for(var e=[],o=0,n=arguments.length;n>o;o++)e.push(arguments[o]);
e.push(this._anchorEl),t.fireEvent.apply(t,e);
},
_fireEventAndHide:function(){
for(var e=[],o=0,n=arguments.length;n>o;o++)e.push(arguments[o]);
e.push(this._anchorEl),t.fireEvent.apply(t,e),this.hide(this._closeId);
},
_delRange:function(){
t.fireEvent("saveScene");
var e=$(this._anchorEl),n=e.parent("a");
n.length>0&&(e=n),t.selection.getRange().collapse(!1),e.remove(),this.hide(this._closeId),
t.focus(),t.fireEvent("saveScene"),o.funcPvUvReport("del_img");
},
_cropImg:function(){
this.hide(this._closeId),o.fireEvent("crop_img",this._anchorEl);
},
_imgReplace:function(){
this.hide(this._closeId),o.fireEvent("img_replace",this._anchorEl);
},
_imgAutoWidth:function(e){
t.fireEvent("saveScene");
var n=$(this.getDom("content")),i=n.find(".js_adapt"),u=n.find(".js_canceladapt");
if(e===!0){
var s=$(this._anchorEl),p=s.width(),r=s.height();
this._anchorEl.style.width="100%",s.attr("data-backw",p),s.attr("data-backh",r),
i.hide(),u.show(),o.funcPvUvReport("autowidth");
}else{
var p=this._anchorEl.getAttribute("data-backw"),r=this._anchorEl.getAttribute("data-backh");
p&&r?(this._anchorEl.style.width=p+"px",this._anchorEl.style.height=r+"px"):this._anchorEl.style.width="auto",
this._anchorEl.removeAttribute("data-backw"),this._anchorEl.removeAttribute("data-backh"),
i.show(),u.hide(),o.funcPvUvReport("cancel_autowidth");
}
this._anchorEl.style.height="auto",t.focus(),t.fireEvent("saveScene");
},
_mouseover:function(o){
var n=e._g.mouseoutObj[this._closeId];
n&&n.timeoutId&&(clearTimeout(n.timeoutId),n.timeoutId=null),e._g.popupMouseoutId&&(clearTimeout(e._g.popupMouseoutId),
e._g.popupMouseoutId=null),t.fireEvent("common_popup_mouseover",o,this.getDom(),this._anchorEl);
},
_mouseout:function(o){
var n=this.getDom();
if(n){
var i=n.getBoundingClientRect();
if(o.clientX<=parseInt(i.left)||o.clientX>=parseInt(i.right)||o.clientY<=parseInt(i.top)||o.clientY>=parseInt(i.bottom)){
var u=e._g.mouseoutObj[this._closeId];
u&&u.func.call(u.target),e._g.popupMouseoutId&&(clearTimeout(e._g.popupMouseoutId),
e._g.popupMouseoutId=null),e._g.popupMouseoutId=setTimeout(function(){
t.fireEvent("common_popup_mouseout",o,n,e.popup._anchorEl);
},100);
}
}
},
getHtmlTpl:function(){
return'<div id="##" onmouseover="$$._mouseover(event);" onmouseout="$$._mouseout(event);" class="edui-popup edui_mask_edit_bar %%"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="javascript:"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">'+this.getContentHtmlTpl()+"  </div> </div></div>";
},
showAnchorRect:function(t){
this._doAutoRender();
e.uiUtils.getViewportRect();
this._show();
var o,n,i=this.fitSize(),u=e.uiUtils.getClientRect(this._anchorEl);
o=u.left,n=u.top-i.height;
var s=this.getDom();
if(s){
if(t){
var p=e.uiUtils.getClientRect($(".edui-editor-toolbarbox")[0]);
n=Math.max(n,p.bottom-i.height),this._adjStatus=!0;
}else this._adjStatus=!1;
e.uiUtils.setViewportOffset(s,{
left:o,
top:n
}),this.editor&&(s.style.zIndex=1*this.editor.container.style.zIndex+10,e.uiUtils.getFixedLayer().style.zIndex=s.style.zIndex-1);
}
e.unbindSpecifyEvent({
type:"editor",
eventName:"afterkeyup",
fun:e._g.event.afterkeyupEvent
}),e.bindEventInterface({
type:"editor",
eventName:"afterkeyup",
fun:e._g.event.afterkeyupEvent
});
},
queryAutoHide:function(o){
return o&&o.ownerDocument==t.document&&("img"==o.tagName.toLowerCase()||e.domUtils.findParentByTagName(o,"a",!0))?o!==e.popup.anchorEl:baidu.editor.ui.Popup.prototype.queryAutoHide.call(this,o);
},
justShow:function(t,o){
(!this._closeId||this._closeId&&this._closeId===t)&&this.getDom()&&e.popup.showAnchorRect(o);
},
hide:function(t){
(!this._closeId||this._closeId&&this._closeId===t)&&!this._hidden&&this.getDom()&&(this.getDom().style.display="none",
this._hidden=!0,e.unbindSpecifyEvent({
type:"editor",
eventName:"afterkeyup",
fun:e._g.event.afterkeyupEvent
}));
},
reset:function(t){
(!this._closeId||this._closeId&&this._closeId===t)&&!this._hidden&&this.getDom()&&(this.getDom().style.display="none",
this._hidden=!0,this._closeId=null,e.unbindSpecifyEvent({
type:"editor",
eventName:"afterkeyup",
fun:e._g.event.afterkeyupEvent
}));
}
}),this.popup.render(),this.initEvent();
},t.prototype.initEvent=function(){
var e=this;
this._g.event={
scrollEvent:function(){
e.popup._hidden!==!0&&e.popup.justShow(e.popup._closeId,e.popup._adjStatus);
},
mouseoverEvent:function(t,n){
var i={
html:"",
node:null,
adjust:!1
};
if(this.fireEvent("mouseover_common_popup",i,n),i.html&&i.node){
var u=o.getuid();
e.popup._closeId=u;
{
e.cacheMouseoutEvent({
closeId:u,
target:i.node
});
}
e.showpopup({
target:i.node,
html:i.html,
adjust:i.adjust
});
}
},
afterkeyupEvent:function(t,o){
o=o||window.event,o&&o.type&&e.popup._anchorEl&&!e.popup._anchorEl.parentNode&&e.popup._hidden!==!0&&e.popup.hide(e.popup._closeId);
}
};
},t.prototype.beforeEditorDestory=function(){
this.unbindEventInterface();
},t.prototype.addEvent=function(){
var e=this,t=e.editor;
e.bindEventInterface({
type:"domUtils",
dom:window,
eventName:"scroll",
fun:this._g.event.scrollEvent
}),t.addListener("set_common_popup_mouseover_event",function(){
this.fireEvent("cancel_common_popup_mouseover_event"),e.bindEventInterface({
type:"editor",
eventName:"mouseover",
fun:e._g.event.mouseoverEvent
});
}),t.addListener("cancel_common_popup_mouseover_event",function(){
e.unbindSpecifyEvent({
type:"editor",
eventName:"mouseover",
fun:e._g.event.mouseoverEvent
});
}),t.fireEvent("set_common_popup_mouseover_event"),t.addListener("cancel_selectionchange_popup",function(){
e._g.selectionchangePopup=!1;
}),t.addListener("set_selectionchange_popup",function(){
e._g.selectionchangePopup=!0;
}),t.addListener("selectionchange",function(t,o){
if(o&&e._g.selectionchangePopup===!0){
var n={
html:"",
node:null
};
this.fireEvent("handle_common_popup",n),n.html&&n.node&&e.showpopup({
target:n.node,
html:n.html
});
}
}),t.addListener("hide_common_popup",function(t,o){
e.popup.hide(o);
}),t.addListener("update_common_popup",function(t,o,n){
e.popup.justShow(o,n);
}),t.addListener("reset_common_popup",function(t,o){
e.popup.reset(o);
}),t.addListener("show_common_popup",function(t,o,n,i){
i&&(e.popup._closeId=i),e.showpopup({
target:o,
html:n,
closeId:i
});
});
},t.prototype.resetMouseoutEvent=function(){
for(var e in this._g.mouseoutObj){
var t=this._g.mouseoutObj[e];
this.unbindSpecifyEvent({
type:"domUtils",
dom:t.target,
eventName:"mouseout",
fun:t.func
});
}
this._g.mouseoutObj={};
},t.prototype.cacheMouseoutEvent=function(e){
this.resetMouseoutEvent(),this._g.mouseoutObj[e.closeId]={
timeoutId:null,
target:e.target,
func:function(e,t){
return function(){
var o=this;
e._g.mouseoutObj[t]&&(e._g.mouseoutObj[t].timeoutId&&(clearTimeout(e._g.mouseoutObj[t].timeoutId),
e._g.mouseoutObj[t].timeoutId=null),e._g.mouseoutObj[t].timeoutId=setTimeout(function(){
e.popup.hide(t);
try{
e.domUtils.un(o,"mouseout",e._g.mouseoutObj[t].func),delete e._g.mouseoutObj[t];
}catch(n){}
},100));
};
}(this,e.closeId)
},this.bindEventInterface({
type:"domUtils",
dom:e.target,
eventName:"mouseout",
fun:this._g.mouseoutObj[e.closeId].func
});
},t.prototype.showpopup=function(e){
var t=e||{},o={
html:t.html||"",
node:t.target||null,
adjust:e.adjust===!0?!0:!1
},n=this,i=n.editor;
if(o.html&&o.node){
n.popup.getDom("content").innerHTML=n.popup.formatHtml(o.html);
var u=$(o.node).find("img");
u.length>0&&(o.node=u[0]),n.popup._anchorEl=o.node,/^img$/i.test(o.node.tagName)||o.adjust===!0?n.popup.showAnchorRect(!0):n.popup.showAnchorRect(),
/js_img_popup/i.test(o.html)&&i.fireEvent("funcPvUvReport","img_popup"),/js_link_popup/i.test(o.html)&&i.fireEvent("funcPvUvReport","link_popup");
}
},o.initEventInterface(t),t;
});