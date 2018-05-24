define("common/wx/inputCounter.js",[],function(t,n,e){
"use strict";
function o(t,n){
this.$input=$(t),this.opts=$.extend(!0,{},i,n),this._init();
}
var i={
minLength:0,
maxLength:20,
showCounter:!0,
useGBKLength:!1,
GBKBased:!1
};
o.prototype._init=function(){
var t=this;
t.$input&&t.$input.length>0?(t.$inputBox=t.$input.parent("textarea"==t.$input.prop("tagName").toLowerCase()?".frm_textarea_box":".frm_input_box"),
t.count=t._getLen(t.getValue()),t.$counter=t.$inputBox.find(".frm_counter"),t.counterExist=!0,
0==t.$counter.length&&(t.counterExist=!1,t.$counter=$('<em class="frm_input_append frm_counter"></em>'),
t.$inputBox.append(t.$counter)),1==t.opts.showCounter?t.show():t.hide(),t.setCount(t.count),
t.inputEvent=function(){
t.setCount(t._getLen(t.getValue()));
},t.$input.on("keydown keyup",t.inputEvent)):console.log("inputCounter Err: input does not exist.");
},o.prototype.getValue=function(){
var t="";
switch(this.$input.prop("tagName")){
case"INPUT":
case"TEXTAREA":
t=this.$input.val();
break;

default:
t=this.$input.text();
}
return t;
},o.prototype._getLen=function(t){
var n=0;
return t=t||"",n=this.opts.useGBKLength?t.replace(/[^\x00-\xff]/g,"**").length:t.length,
this.opts.GBKBased&&(n=Math.ceil(n/2)),n;
},o.prototype.getCount=function(){
return this.count||0;
},o.prototype.setCount=function(t){
this.count=t,this.$counter.html(this.count+"&#47;"+this.opts.maxLength),this.count>this.opts.maxLength?(this.overflowed=!0,
this.$inputBox.addClass("warn")):this.count>0&&this.count<this.opts.minLength?(this.overflowed=!0,
this.$inputBox.addClass("warn")):(this.overflowed=!1,this.$inputBox.removeClass("warn"));
},o.prototype.hasOverflowed=function(){
return this.overflowed;
},o.prototype.show=function(){
this.$inputBox.addClass("with_counter counter_in append count"),this.$counter.show();
},o.prototype.hide=function(){
this.$inputBox.removeClass("with_counter counter_in append count warn"),this.$counter.hide();
},o.prototype.destroy=function(){
this.$input.off("keydown keyup",this.inputEvent),0==this.counterExist&&(this.hide(),
this.$counter.remove());
},e.exports=o;
});