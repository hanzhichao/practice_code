define("biz_web/ui/input/lentips.js",[],function(){
"use strict";
var n="&nbsp;<em>/</em>&nbsp;",t=function(t){
var e=t.input,i=t.tip,l=t.className,a=t.trim||!0,s=t.seg||n,m=t.maxlimit,u=function(){
var n=e.val();
a&&(n=$.trim(n)),i.html(n.length+s+m),n.length>m?i.addClass(l):i.removeClass(l),
t.callback&&t.callback(n.length>m,{
len:n.length,
maxlimit:m,
value:n
});
};
u(),e.keyup(function(){
u();
});
};
return t;
});