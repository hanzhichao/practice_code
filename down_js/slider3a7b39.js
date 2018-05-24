define("common/wx/slider.js",["widget/slider.css","common/wx/dragHelper.js","tpl/slider.html.js"],function(e){
"use strict";
e("widget/slider.css");
var t=e("common/wx/dragHelper.js"),n={
min:0,
max:100,
value:0,
disable:!1,
step:1,
direction:"horizontal",
container:null,
onChange:$.noop,
onSlide:$.noop,
onStart:$.noop,
onStop:$.noop
},i=template.compile(e("tpl/slider.html.js")),s=function(e){
this.options=$.extend(!0,{},n,e),this._init();
};
return s.prototype={
diabled:!1,
_init:function(){
var e=this,t=this.options;
$.isArray(this.options.value)||(this.options.value=[this.options.value]),this.$container=$(t.container),
this.$dom=$(i({
len:t.value.length,
min:t.min,
max:t.max
})).appendTo(this.$container),this.$element=this.$dom.find(".js_handle"),this.$show_num=this.$dom.find(".js_show_num"),
this.$handle=this.$element.find(".btn_gap"),this.$scale_bar=this.$dom.find(".js_scale_bar"),
this.$now_scale=this.$scale_bar.find(".now_scale"),this.$select_ages=this.$dom.find(".seleceted_ages"),
this._initDrag(),this.$handle.on("mousedown",function(n){
if(!t.disable){
var i=e.$handle.index(this);
e.dragHelpers[i].drag(n);
}
}),this.$scale_bar.on("click",function(n){
if(e.dragstop)return void(e.dragstop=!1);
var i,s=e.event2value(n);
i=s<t.value[0]?0:s>t.value[1]?1:s>(t.max-t.min)/2?1:0,e.value(i,s);
}),this.values(this.options.value,!0);
},
_initDrag:function(){
var e=this,n=(this.options,[]);
this.$handle.each(function(i,s){
var a=e.options,o=new t({
element:$(s).parent(),
handle:s,
offsetParent:$(s).closest(".slider"),
direction:a.direction,
onDragMove:function(t){
var n=e.percent2value(t.left),i=e.$handle.index(this.handle);
e.value(i,n),a.onSlide.call(e);
},
onDragStart:function(){
e.$handle.css("z-index",0),this.handle.css("z-index",1),a.onStart.call(e);
},
onDragStop:function(){
e.dragstop=!0,a.onStop.call(e);
},
onBeforeDragMove:function(t){
{
var n=e.options;
e.percent2value(t.left);
}
if(n.value.length>=2){
var i=e.$handle.index(this.handle),s=parseFloat(e.$handle[0].style.left),a=parseFloat(e.$handle[1].style.left);
0==i&&t.left>=a&&(t.left=a),1==i&&t.left<=s&&(t.left=s);
}
}
});
n.push(o);
}),this.dragHelpers=n;
},
event2value:function(e){
var t=this.dragHelpers[0].parentBound,n=Math.max(0,Math.min((e.pageX-t.x)/t.w*100,100));
return this.percent2value(n);
},
percent2value:function(e){
return e*(this.options.max-this.options.min)/100+this.options.min;
},
value2percent:function(e){
var t=this.options;
return(e-t.min)/(t.max-t.min)*100;
},
value:function(e,t,n){
if("undefined"==typeof e)return this.options.value;
if("number"==typeof e){
if("undefined"==typeof t)return this.options.value[e];
var i=!0,s=this.options,a=s.value[e],o=s.value.length;
if(e>=0&&o>e&&t<=this.options.max&&t>=this.options.min){
if(!n&&s.step){
{
var l=Math.round(Math.abs(t-a)/s.step);
Math.abs(t-a)-l*s.step;
}
t>a&&l>=1?t=a+l*s.step:a>t&&l>=1?t=a-l*s.step:i=!1;
}
var h=this.value2percent(t)+"%",r=this.values()[1-e],d=4;
if((1==e&&t-r>=d*s.step||0==e&&r-t>=d*s.step)&&$(this.$show_num[e]).css("left",h),
$(this.$handle[e]).css("left",h),i){
if(s.value[e]=t,s.onChange&&s.onChange.call(this,a,t,e),this.$handle.length>1){
var u=this.$handle[0].style.left,p=parseFloat(this.$handle[1].style.left)-parseFloat(this.$handle[0].style.left);
this.$now_scale.css({
left:u,
width:p+"%"
});
}
for(var f=this.values(),c=0;c<f.length;c++)$(this.$show_num[c]).text(f[c]);
this.$select_ages.text(f[0]+"-"+f[1]+"岁");
}
}
}
},
values:function(e,t){
if($.isArray(e))for(var n=0;n<e.length;n++)this.value(n,e[n],t);
return this.options.value;
},
disable:function(){
this.options.disable=!0;
},
enable:function(){
this.options.disable=!1;
},
remove:function(){
this.$handle.off("mousedown"),this.$dom.remove();
}
},s;
});