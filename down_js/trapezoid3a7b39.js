define("statistics/components/trapezoid.js",[],function(){
"use strict";
$.fn.trapezoid=function(t){
for(var a=parseInt($(this).css("width")),r=parseInt($(this).css("height")),e=Math.floor(r/(t.length-1)),h=0,s=0;s<t.length;s++)h=Math.max(h,t[s]);
h=0>=h?1:h;
for(var i=[],s=0;s<t.length;s++)i[s]=Math.ceil(t[s]*a*.9/h);
var n="";
n+="M 0 0";
for(var s=0;s<t.length;s++)n+=" L "+i[s]+" "+s*e;
n+=" L 0 "+e*(t.length-1),n+=" L 0 0 z";
var o=Raphael($(this).attr("id"),a,r),l=o.path("M 0 0 z");
l.attr("fill","#92BCED"),l.attr("stroke","none"),l.animate({
path:n
},600,"<");
for(var s=0;s<t.length;s++){
var f=o.path("M 0 "+e*s+" L "+a+" "+e*s+" z");
f.attr("stroke","#DCE2F6"),f.attr("stroke-width",1),f.attr("width",1),f.attr("stroke-dasharray","- ");
}
};
});