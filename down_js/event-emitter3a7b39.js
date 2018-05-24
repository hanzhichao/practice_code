define("statistics/components/event-emitter.js",[],function(){
"use strict";
function t(){
this.emitter=$(this);
}
var e=t.prototype;
return e.on=function(t,e){
this.emitter.on(t,function(){
e.apply(e,[].slice.call(arguments,1));
});
},e.off=function(){
this.emitter.off.apply(this.emitter,arguments);
},e.emit=function(){
var t=[].slice.call(arguments,1),e=arguments[0];
this.emitter.trigger.call(this.emitter,e,t);
},e.once=function(){
this.emitter.one.apply(this.emitter,arguments);
},t;
});