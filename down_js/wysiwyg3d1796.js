define("common/wx/richEditor/wysiwyg.js",["common/wx/richEditor/editorRange.js","common/qq/Class.js"],function(e,t,n){
"use strict";
var i=/msie/.test(navigator.userAgent.toLowerCase()),a="Wysiwyg",r=e("common/wx/richEditor/editorRange.js"),o="​",s=new RegExp(o,"g"),l=e("common/qq/Class.js"),c=l.declare({
init:function(e,t){
var n=e,i=$('<div class="edit_area"></div>');
this._dom$=n,this._val="",this._lastRange=null,this._editArea$=i,$.extend(this,t),
this._initEditArea(),this._initEvent();
},
_initEvent:function(){
var e=this,t=function(){
e.__tid&&clearTimeout(e.__tid),e.__tid=setTimeout(function(){
e._filterNode();
},10);
};
e._editArea$.bind({
keydown:function(t){
e._keydown(t);
},
keyup:function(t){
e._keyup(t);
},
compositionend:function(t){
e._compositionend(t);
},
mouseup:function(t){
e._mouseup(t);
},
drop:t,
paste:t
});
},
_keydown:function(e){
var t=this,n=wx.isHotkey;
if(n(e,"backspace")){
"<br>"==$.trim(t._editArea$.html()).replace(s,"")&&t._editArea$.html(o);
var i=r.getSelection();
i.type&&"control"===i.type.toLowerCase()&&(e.preventDefault(),i.clear());
}
(n(e,"ctrlenter")||n(e,"altenter")||n(e,"enter"))&&(e.preventDefault(),t.insertHTML("<br/>")._saveRang()),
t.keydown&&t.keydown(e);
},
_keyup:function(e){
var t=this,n=$.trim(t._editArea$.html()).replace(s,"");
n||t._editArea$.html(o),t._saveRang(),t.keyup&&t.keyup(e),t.save();
},
_compositionend:function(e){
var t=this;
t._saveRang(),t.keyup&&t.keyup(e),t.save();
},
_mouseup:function(e){
var t=this;
setTimeout(function(){
t._saveRang();
},0),t.mouseup&&t.mouseup(e);
},
focus:function(){
this._editArea$.focus(),this._resotreRange();
},
_setCursorToEnd:function(e){
if(i&&e){
var t=r.getSelection();
t.extend&&(t.extend(e,e.length),t.collapseToEnd&&t.collapseToEnd());
}
},
insertHTML:function(e){
var t=this;
t.focus();
var n=r.getRange();
if(!n)return t;
if(n.createContextualFragment){
e+='<img style="width:1px;height:1px;"></img>';
var a=n.createContextualFragment(e),o=a.lastChild;
n.deleteContents(),n.insertNode(a),n.setEndAfter(o),n.setStartAfter(o);
var s=r.getSelection();
s.removeAllRanges(),s.addRange(n),document.execCommand("Delete",!1,null);
}else i&&/>$/.test(e),!!e&&n.pasteHTML&&n.pasteHTML(e),n.collapse&&n.collapse(!1),
n.select();
return t._saveRang().save(),t;
},
save:function(e){
var t=this,e=e||this.textFilter,n=t._editArea$.html();
return n=n.replace(s,""),t.val="function"==typeof e?e(n):n,t.change&&t.change(),
t;
},
_filterNode:function(e){
for(var t,n=this,e=e||this.nodeFilter,i=n._editArea$.get(0),a=i.childNodes,r=a.length-1;r>=0;r--){
var o=a[r];
switch(o.nodeType){
case 1:
if("BR"!==o.nodeName.toUpperCase()){
var s,l=!1;
if((s=e&&e(o))||(s=o.textContent||o.innerText||"",l=!0),s){
var c=l?document.createTextNode(s):s;
!t&&(t=c),i.replaceChild(c,o);
}else i.removeChild(o);
}
break;

case 3:
break;

default:
i.removeChild(o);
}
}
return n._setCursorToEnd(t),n._saveRang().save();
},
getHTML:function(){
return this._editArea$.html();
},
getText:function(){
return this.getHTML().text();
},
getContent:function(){
var e=this,t=this.textFilter,n=e._editArea$.html();
return n=n.replace(s,""),e.val="function"==typeof t?t(n):n,this.val;
},
setContent:function(e,t){
if(this.clear(),e=e||o,this._editArea$.html(e),!t)if("function"==typeof this.textFilter){
var n=this._editArea$.html().replace(s,"");
t=this.textFilter(n);
}else t=e;
this.val=t,this.change&&this.change();
},
clear:function(){
this.val="",this._editArea$.html(o);
},
_initEditArea:function(){
var e=this;
e._editArea$.attr("class",e._dom$.attr("class")).attr("placeholder",e._dom$.attr("placeholder")).attr("contentEditable",!0).css({
"overflow-y":"auto",
"overflow-x":"hidden"
}),e._dom$.after(e._editArea$).hide().data(a,e),e.init&&e.init();
},
_saveRang:function(){
return this._lastRange=r.getRange(),this;
},
_resotreRange:function(){
var e=this._lastRange;
if(e){
var t=r.getSelection();
if(t.addRange)t.removeAllRanges(),t.addRange(e);else{
var n=r.getRange();
n.setEndPoint&&(n.setEndPoint("EndToEnd",e),n.setEndPoint("StartToStart",e)),n.select();
}
}
return this;
}
}),d=function(e,t){
return e.data(a)||new c(e,t);
};
n.exports=d;
});