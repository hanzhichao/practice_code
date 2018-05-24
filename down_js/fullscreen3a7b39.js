define("common/wx/mpEditor/plugin/fullscreen.js",["common/qq/mask.js"],function(t){
"use strict";
function e(){
this.editor=null,this.__g={};
}
var o=t("common/qq/mask.js");
return e.prototype={
getName:function(){
return"fullscreen2";
},
getExecCommand:function(){
var t=this,e=this.__g;
return function(){
var o=t.editor;
o&&(e.isFull!==!0?t.__fullScreen():t.__fullScreenOut());
};
},
getType:function(){
return 1;
},
getTitle:function(){
return"全屏模式";
},
__showMask:function(){
var t=this.__g;
t.mask||(t.mask=o.show({
parent:$("#js_appmsg_editor .appmsg_editor"),
spin:!1
})),t.mask.mask.css("z-index",800),t.mask.show();
},
__hideMask:function(){
var t=this.__g;
t.mask&&t.mask.hide();
},
__fullScreen:function(){
var t=this,e=t.editor,o=this.__g;
e.fireEvent("beforefullscreen2");
var i=$("#js_ueditor");
i.addClass("zoom_edit").css({
marginTop:-(i.outerHeight()/2),
marginLeft:-(i.outerWidth()/2)
}),document.body.style.overflow=document.documentElement.style.overflow="hidden",
t.__showMask(),t.__getTipsDom().data("tooltip","缩小"),t.__getTipsDom().attr("data-tooltip","缩小"),
o.isFull=!0,e.fireEvent("fullscreen2");
},
__fullScreenOut:function(){
var t=this.__g,e=this.editor,o=$("#js_ueditor");
e.fireEvent("beforefullscreen2out"),o.removeClass("zoom_edit").css({
marginTop:0,
marginLeft:0
}),document.body.style.overflow=document.documentElement.style.overflow="auto",this.__hideMask(),
this.__getTipsDom().data("tooltip","全屏模式"),this.__getTipsDom().attr("data-tooltip","全屏模式"),
t.isFull=!1,e.fireEvent("fullscreen2out");
},
__getTipsDom:function(){
var t=this.__g;
return t.tipsDom||(t.tipsDom=$("#js_ueditor").find(".edui-for-fullscreen2").find("[data-tooltip]")),
t.tipsDom;
}
},e;
});