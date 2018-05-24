define("common/wx/mpEditor/common/base_class.js",["common/qq/Class.js"],function(e){
"use strict";
var t=e("common/qq/Class.js"),n=t.declare({
extend:function(e){
for(var t=1,n=arguments.length;n>t;t++)for(var i in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],i)&&(e[i]=arguments[t][i]);
return e;
},
bindEventInterface:function(e){
return this.domUtils&&this.editor?("domUtils"==e.type?this.domUtils.on(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.addListener(e.eventName,e.fun),
this.__EventInterfaceCache||(this.__EventInterfaceCache=[]),void this.__EventInterfaceCache.push(e)):!1;
},
unbindEventInterface:function(){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache)for(;this.__EventInterfaceCache.length>0;){
var e=this.__EventInterfaceCache[0];
"domUtils"==e.type?this.domUtils.un(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.removeListener(e.eventName,e.fun),
this.__EventInterfaceCache.shift();
}
this.__EventInterfaceCache=[];
},
unbindSpecifyEvent:function(e){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache&&e)for(var t=0,n=this.__EventInterfaceCache.length;n>t;t++){
var i=this.__EventInterfaceCache[t];
if(i.type===e.type&&i.eventName===e.eventName&&i.fun===e.fun&&(!e.dom||e.dom&&i.dom===e.dom)){
"domUtils"==i.type?this.domUtils.un(i.dom,i.eventName,i.fun):"editor"==i.type&&this.editor.removeListener(i.eventName,i.fun),
this.__EventInterfaceCache.splice(t,1);
break;
}
}
}
});
return n;
});