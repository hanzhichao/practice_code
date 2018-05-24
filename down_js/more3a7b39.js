define("common/wx/mpEditor/plugin/more.js",[],function(){
"use strict";
function e(){
this.editor=null,this.__g={};
}
return e.prototype={
getName:function(){
return"more";
},
getExecCommand:function(){
var e=this;
return function(){
if(e.editor){
var t=e.editor,o=t.getDomUtils(),r=t.getUeditor().ui.getDom("toolbarbox");
o.hasClass(r,"show-edui-more")?o.removeClasses(r,"show-edui-more"):o.addClass(r,"show-edui-more"),
r=document.getElementById("js_toolbar_1"),o.setStyle(r,"zoom",1);
}
};
},
getType:function(){
return 1;
},
getTitle:function(){
return"更多";
}
},e;
});