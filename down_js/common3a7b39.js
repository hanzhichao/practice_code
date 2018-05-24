define("statistics/user_stat/common.js",["biz_common/moment.js","common/wx/Cgi.js"],function(o,t){
"use strict";
function n(){
console.log.apply(console,arguments);
}
function e(o,t,n,e){
if(e)for(var r=t,m=+s(t).format("X"),i=+s(o).format("X");m>=i;)n(r),r=s(r).subtract(1,"days").format(a),
m=+s(r).format("X");else for(var r=o,m=+s(o).format("X"),i=+s(t).format("X");i>=m;)n(r),
r=s(r).add(1,"days").format(a),m=+s(r).format("X");
}
function r(o,t){
var n=$(t),e=null,r=[o,t].join(", ");
i(r).mouseover(function(){
n.show(),clearTimeout(e);
}),i(r).mouseout(function(){
clearTimeout(e),e=setTimeout(function(){
n.hide();
},300);
});
}
function m(o,t,n){
for(var e=1-o.length,r=[],m=!1,s=0,a=o.length;a>s;s++)!function(s,a){
u.get({
url:o[a],
success:function(o){
if(!m){
if(n&&n(s,a,o),0!==o.base_resp.ret)return void(m=!0);
e++,r[a]=o,1===e&&t&&t.apply(t,r);
}
}
});
}(+new Date,s);
}
var s=o("biz_common/moment.js"),t={},a="YYYY-MM-DD",i=jQuery,u=o("common/wx/Cgi.js");
return t.help=r,t.log=n,t.loopDay=e,t.mGet=m,t;
});