define("common/qq/mask.js",["biz_web/lib/spin.js"],function(s,i){
"use strict";
function n(s){
if(this.mask)this.mask.show();else{
var i="body";
s&&s.parent&&(i=$(s.parent)),this.mask=$(t).appendTo(i),this.mask.id="wxMask_"+ ++e,
this.mask.spin("flower");
}
if(s){
if(s.spin===!1)return this;
this.mask.spin(s.spin||"flower");
}
return this;
}
s("biz_web/lib/spin.js");
var e=0,t='<div class="mask"></div>';
n.prototype={
show:function(){
this.mask.show();
},
hide:function(){
this.mask.hide();
},
remove:function(){
this.mask.remove();
}
},i.show=function(s){
return new n(s);
},i.hide=function(){
$(".mask").hide();
},i.remove=function(){
$(".mask").remove();
};
});