define("statistics/article/detail/detail/multimedia/data-process.js",["statistics/common.js"],function(n,t){
"use strict";
var r=n("statistics/common.js"),u=r.map,i=function(n){
return function(t){
return r.map(t,n);
};
},e="all",o="fans",c="non-fans",s=[e,o,c],a=function(n){
return 1*n;
},f=function(n){
return function(t){
return t.split(n);
};
},p=function(n){
return function(t){
return t.join(n);
};
},d=function(n){
return(n[0]+n[1])/2;
},v=function(n){
return function(t){
var r={};
return n.each(function(n){
"string"==typeof n?r[n]=t[n]:r[n[1]]=t[n[0]];
}),r;
};
},l=function(n){
return v([["all",e],["attention",o],["unattention",c]])(n);
},m=function(n){
return function(t){
return u(n,function(n){
return t[n];
});
};
},x=function(n){
return function(t){
var r={};
return n.each(function(n,u){
r[n]=t[u];
}),r;
};
},h=function(n){
return function(t){
return t.sort(function(t,r){
return t[n]-r[n];
}),t;
};
},_=function(n){
return 10>n?"0"+n:""+n;
},g=function(n,t){
for(var r=n.length/2,i=[],e=0;r>e;e++){
var o=2*e;
i.push(n.slice(o,o+2));
}
return u(i,t);
},j=function(n,t){
return 0===t?n+"分":n+"秒";
},y=function(n){
var t=r.compose(n,a);
return function(n){
return/\+$/.test(n)?t(n.replace("+",""))+"+":t(n);
};
},k=function(n){
var t=Math.floor(n/60),r=n-60*t;
return[_(t),":",_(r)].join("");
},w=y(k),z=y(r.compose(p(""),i(j),f(":"),k)),B=function(n){
for(var t=[],r=0;24>r;r++){
var i="%s:%s".sprintf(_(r),"00"),e="%s:%s".sprintf(_(r),"29");
t.push({
duration:"%s~%s".sprintf(i,e),
current:i,
next:e,
uv:0,
pv:0
});
var i="%s:%s".sprintf(_(r),"30"),e="%s:%s".sprintf(_(r),"59");
t.push({
duration:"%s~%s".sprintf(i,e),
current:i,
next:e,
uv:0,
pv:0
});
}
if(!n)return[];
if(!n.length)return t;
var o=0;
return u(t,function(r,u){
var i=n[o];
if(i)return r.duration===i.duration?(o++,i):t[u];
});
},D=function(n){
return g(n,function(n){
var t=n[0];
if(t){
var r=n[1]||n[0],u=t.duration.split("~")[0],i=r.duration.split("~")[1];
return{
duration:"%s - %s".sprintf(u,i),
current:u,
next:i,
pv:t.pv+r.pv,
uv:t.uv+r.uv
};
}
});
},M=function(n){
var t=n.duration.split(","),r=(t[0],t[1].split("-")),u=r[0],i=r[1],e=i?u:u.replace("+","");
i=i?i:u;
var o=w(e),c=w(i),s=z(e),a=z(i);
return t?$.extend({},n,{
index:1*t[0],
duration:"%s - %s".sprintf(s,a),
current:o,
next:c
}):n;
},b=function(n){
return function(t){
if(!t.length)return t;
var r=$.extend({},t[0]);
t=t.slice(1);
var u=[];
return t.each(function(t){
r[n]===t[n]?(r.pv+=t.pv,r.uv+=t.uv):(u.push(r),r=$.extend({},t));
}),u;
};
},q=function(n){
return $.extend({},n,{
duration:n.duration.split(",").slice(2).join(",")
});
},A=r.compose(d,i(a),f("-")),C=r.compose(m(s),l),E=(r.compose(i,i,v),function(n){
return function(t){
var u=n?r.compose(x(s),i(n),C):l;
return t?u(t):{};
};
}),F=function(n){
return u(n,function(n){
var t=n.duration.split(",");
return{
x:A(t[1]),
y:A(t[3]),
z:n.pv,
xy:[t[1],t[3]]
};
});
},G=r.compose(h("index"),i(M)),H=r.compose(b("index"),G),I=r.compose(M,q),J=r.compose(b("index"),h("index"),i(I)),K=E(),L=E(G),N=E(r.compose(D,B)),O=(E(F),
E(H)),P=E(J);
t.getBlocksData=function(n){
return n?[K(n.play_num_trend),L(n.play_duration_distri),N(n.watch_duration_distri),O(n.drag_duration_distri),P(n.drag_duration_distri)]:[{},{},{},{},{},{}];
};
});