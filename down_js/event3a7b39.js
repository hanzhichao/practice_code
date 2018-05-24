define("common/wx/sosomap/event.js",[],function(){
"use strict";
var e={};
return e.once=e.addListenerOnce=function(e,s){
return soso.maps.event.addListenerOnce(this,e,s),this;
},e.on=e.addListener=function(e,s){
return soso.maps.event.addListener(this,e,s),this;
},e.off=e.clearListeners=function(){
return soso.maps.event.clearListeners(this),this;
},e.trigger=function(e,s,t,n,r){
return soso.maps.event.trigger(this,e,s,t,n,r),this;
},e;
});