define("common/wx/date_hm.js",["biz_web/ui/dropdown.js"],function(n,i,e){
"use strict";
function a(n){
var i=this,e="string"==typeof n.container?$(n.container):n.container;
n=$.extend(!0,{},o,n),e.html(template.compile(t)({
span:n.span,
span_end:n.span_end
}));
for(var a=[],d=[],u=0;60>u;u++){
var r=10>u?"0"+u:""+u;
24>u&&a.push({
name:r,
value:u
}),d.push({
name:r,
value:u
});
}
i.hour=i.min=0,new s({
container:e.find(".js_child_hour"),
index:n.defaultHour,
data:a,
callback:function(n){
i.hour=n;
}
}),new s({
container:e.find(".js_child_min"),
index:n.defaultMin,
data:d,
callback:function(n){
i.min=n;
}
}),"undefined"!=typeof n.defaultHour&&(i.hour=n.defaultHour),"undefined"!=typeof n.defaultMin&&(i.min=n.defaultMin);
}
var t='<div class="dropdown_menu hm_item js_child_hour"></div><span class="hm_sep">{span}</span><div class="dropdown_menu hm_item js_child_min"></div><span  class="hm_sep">{span_end}</span>',s=n("biz_web/ui/dropdown.js"),o={
callback:$.noop,
span:":",
span_end:"",
defaultHour:0,
defaultMin:0
};
a.prototype={
value:function(){
return{
hour:this.hour,
min:this.min,
desc:(this.hour<10?"0"+this.hour:""+this.hour)+":"+(this.min<10?"0"+this.min:""+this.min)
};
},
set:function(){}
},e.exports=a;
});