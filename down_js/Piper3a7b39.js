define("biz_web/utils/Piper.js",[],function(){
"use strict";
function e(){
this.events={},this.orders=[];
}
return e.prototype={
delegate:function(e,t){
t="undefined"==typeof t?this.events.length:+t,this.events[t]&&t++,this.orders.push(t),
this.events[t]=e;
},
fire:function(e){
if(0!=this.orders.length){
this.orders.sort(function(e,t){
return e>t?1:-1;
});
for(var t=!0,s=0,r=this.orders.length;r>s&&t;s++){
var i=this.events[this.orders[s]].call(e);
t=!i;
}
return t;
}
},
clear:function(){
this.events={},this.orders=[];
}
},e;
});