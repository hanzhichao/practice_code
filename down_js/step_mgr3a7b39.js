define("cardticket/add/step_mgr.js",["common/wx/Step.js"],function(e){
"use strict";
var s=e("common/wx/Step.js"),t=function(e){
this.step=new s({
container:e.container,
names:[e.isMem?"1 填写会员卡信息":"1 填写优惠券信息","2 功能设置"]
}),this.$contents=$(e.contents);
};
return t.prototype={
prev:function(){
this.step.go(1);
var e=this.step.$dom.find("li.step");
$(e[0]).addClass("current").removeClass("prev").removeClass("next"),$(e[1]).addClass("next").removeClass("nnext"),
this.$contents.hide(),$(this.$contents[0]).show();
},
next:function(){
this.step.go(2),this.$contents.hide(),$(this.$contents[1]).show();
var e=this.step.$dom.find("li.step");
$(e[1]).addClass("current").removeClass("prev").removeClass("next"),$(e[0]).removeClass("current").addClass("prev").removeClass("next");
var s=$("#body").offset().top;
window.scrollTo(0,s);
}
},t;
});