define("common/wx/mpEditor/plugin/unlink.js",[],function(){
"use strict";
function t(){
this.editor=null,this.__g={
name:"unlink",
title:"取消超链接"
};
}
return t.beforeSetContent=function(t){
return t.html;
},t.prototype={
getName:function(){
return this.__g.name;
},
getExecCommand:function(){
var t=this;
return function(){
if(t.editor){
var e,n=t.editor,i=n.getSelectionRange(),r=n.getDomUtils();
(!i.collapsed||r.findParentByTagName(i.startContainer,"a",!0))&&(e=i.createBookmark(),
n.fireEvent("link_optimize",i),i.removeInlineStyle("a").moveToBookmark(e).select());
}
};
},
beforeSetContent:function(e){
return t.beforeSetContent({
html:e
});
},
getType:function(){
return 1;
},
getTitle:function(){
return this.__g.title;
},
getQueryCommandState:function(){
var t=this;
return function(){
var e=t.editor;
return e&&!e.isHighlight()&&e.queryCommandValue("link")?0:-1;
};
},
getContextMenu:function(){
var t=this.__g,e={
label:t.title,
cmdName:t.name
};
return e;
}
},t;
});