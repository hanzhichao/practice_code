define("ad_system/promotion/ad_timeset.js",[],function(){
"use strict";
var r=function(r,t){
var e=new Array(48);
r=2*r,t=2*t;
for(var n=0;48>n;++n)e[n]=r>n||n>=t?"0":"1";
return e=e.join(""),e+e+e+e+e+e+e;
},t=function(r){
var t=-1,e=0;
r=r.substr(0,48);
for(var n=0;48>n;n+=2)"1"==r.charAt(n)&&(-1==t&&(t=n/2),e=n/2);
return{
start:t,
end:e+1
};
};
return{
createTimeSet:r,
getFromTimeset:t
};
});