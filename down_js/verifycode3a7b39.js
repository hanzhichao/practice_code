define("common/wx/verifycode.js",["widget/verifycode.css","tpl/verifycode.html.js","common/qq/events.js"],function(t,i,e){
"use strict";
function n(t){
var i=this;
this.$dom=$(o),this.$img=this.$dom.find("img"),this.$input=this.$dom.find("input"),
this.$img.on("load",function(){
r.trigger("VerifyCode:load",i);
}),this.$dom.find("a").click(function(){
i.$img.attr("src",s+ +new Date);
}).click(),this.$container="string"==typeof t?$(t):t,this.$container.append(this.$dom);
}
t("widget/verifycode.css");
var o=t("tpl/verifycode.html.js"),s="/cgi-bin/verifycode?r=",c=t("common/qq/events.js"),r=c(!0);
n.prototype.getCode=function(){
return this.$input.val();
},n.prototype.focus=function(){
this.$input.focus();
},n.prototype.getInput=function(){
return this.$input;
},n.prototype.refresh=function(){
this.$img.attr("src",s+ +new Date);
},$.fn.verifycode=function(){
return this.each(function(){
$.data(this,"verifycode",new n($(this)));
});
},e.exports=n;
});