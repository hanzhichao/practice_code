define("common/wx/mpEditor/plugin/templateList.js",["common/wx/media/templateListDialog.js"],function(t){
"use strict";
function n(t){
this._o={
token:""
},this._extend(t),this.editor=null;
}
var e=t("common/wx/media/templateListDialog.js");
return n.prototype={
_extend:function(t){
if(t)for(var n in t)this._o[n]=t[n];
},
getName:function(){
return"templatelist";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this,n=this._o;
return function(){
var o=t.editor;
if(o){
new e({
token:n.token,
onSuccess:function(t){
t&&t.content&&o.insertTemplate(t.content,!0);
}
});
}
};
},
getType:function(){
return 1;
},
getTitle:function(){
return"插入图文模版";
}
},n;
});