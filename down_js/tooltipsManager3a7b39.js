define("common/wx/tooltipsManager.js",["common/wx/tooltips.js"],function(t){
"use strict";
var o=t("common/wx/tooltips.js"),i={
tooltips:[],
init:function(t,i){
var n=this;
$(t).each(function(){
i.container=this,n.add(new o(i));
});
},
add:function(t){
this.tooltips.push(t);
},
hideAll:function(){
for(var t=0;t<this.tooltips.length;t++)this.tooltips[t].hide();
},
removeItem:function(t){
for(var o=0;o<this.tooltips.length;o++)if(this.tooltips[o]===t)return this.tooltips.splice(o,1),
t.$dom.remove(),!0;
return!1;
},
removeIndex:function(t){
if(!(t>=this.tooltips.length||0>t)){
var o=this.tooltips[t];
this.tooltips.splice(t,1),o.$dom.remove();
}
},
current:function(){},
hide:function(){},
removeAll:function(){
for(var t=0;t<this.tooltips.length;t++)this.tooltips[t].$dom.remove();
this.tooltips=[];
}
};
return i;
});