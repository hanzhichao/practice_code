define("common/wx/progress.js",["tpl/progress.html.js"],function(t,e,r){
"use strict";
var s={
minValue:0,
maxValue:100,
currentValue:0,
format:"none",
type:"default",
animateTime:500
},a=null,n=function(e){
if(!e.container)return null;
var r=t("tpl/progress.html.js"),s=$(e.container);
s.html(r),a=s.find(".progressbar"),e.type&&"warn"==e.type&&a.find(".progressbar_bar").css("background","#f24d4d"),
e.optClass&&a.addClass(e.optClass);
},o=function(t){
return null===a?!1:(t.width&&a.css("width",parseFloat(t.width)+"px"),void a.find(".progressbar_bar").stop().animate({
width:(t.currentValue-t.minValue)/(t.maxValue-t.minValue)*100+"%"
},{
speed:t.animateTime,
step:function(){
var e=a.find(".progressbar_text"),r=parseFloat($(this).width())/a.width(),s="";
r=r>1?1:0>r?0:r,"current-only"==t.format?s=t.currentValue:"current-max"==t.format?s=t.currentValue+"/"+t.maxValue:"percentage"==t.format&&(s=parseInt(100*r,10)+"%"),
e.text(s).css("left",(a.width()-e.width())/2+"px"),$(this).width()>parseFloat(e.css("left"))+e.width()?e.css("color","#fff"):e.css("color","#333");
}
}));
},i=function(t){
this.opt=$.extend(s,t),n(this.opt),o(this.opt);
};
i.prototype.setValue=function(t){
this.opt.currentValue=t,o(this.opt);
},r.exports=i;
});