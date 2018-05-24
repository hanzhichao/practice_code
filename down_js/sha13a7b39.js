define("biz_common/utils/sha1.js",[],function(){
function r(r){
var e,o,t,a,n,c,h,f,s,u=function(r,e){
var o=r<<e|r>>>32-e;
return o;
},d=function(r){
var e,o,t="";
for(e=7;e>=0;e--)o=r>>>4*e&15,t+=o.toString(16);
return t;
},C=new Array(80),A=1732584193,i=4023233417,p=2562383102,b=271733878,g=3285377520;
r=unescape(encodeURIComponent(r));
var l=r.length,v=[];
for(o=0;l-3>o;o+=4)t=r.charCodeAt(o)<<24|r.charCodeAt(o+1)<<16|r.charCodeAt(o+2)<<8|r.charCodeAt(o+3),
v.push(t);
switch(l%4){
case 0:
o=2147483648;
break;

case 1:
o=r.charCodeAt(l-1)<<24|8388608;
break;

case 2:
o=r.charCodeAt(l-2)<<24|r.charCodeAt(l-1)<<16|32768;
break;

case 3:
o=r.charCodeAt(l-3)<<24|r.charCodeAt(l-2)<<16|r.charCodeAt(l-1)<<8|128;
}
for(v.push(o);v.length%16!=14;)v.push(0);
for(v.push(l>>>29),v.push(l<<3&4294967295),e=0;e<v.length;e+=16){
for(o=0;16>o;o++)C[o]=v[e+o];
for(o=16;79>=o;o++)C[o]=u(C[o-3]^C[o-8]^C[o-14]^C[o-16],1);
for(a=A,n=i,c=p,h=b,f=g,o=0;19>=o;o++)s=u(a,5)+(n&c|~n&h)+f+C[o]+1518500249&4294967295,
f=h,h=c,c=u(n,30),n=a,a=s;
for(o=20;39>=o;o++)s=u(a,5)+(n^c^h)+f+C[o]+1859775393&4294967295,f=h,h=c,c=u(n,30),
n=a,a=s;
for(o=40;59>=o;o++)s=u(a,5)+(n&c|n&h|c&h)+f+C[o]+2400959708&4294967295,f=h,h=c,c=u(n,30),
n=a,a=s;
for(o=60;79>=o;o++)s=u(a,5)+(n^c^h)+f+C[o]+3395469782&4294967295,f=h,h=c,c=u(n,30),
n=a,a=s;
A=A+a&4294967295,i=i+n&4294967295,p=p+c&4294967295,b=b+h&4294967295,g=g+f&4294967295;
}
return s=d(A)+d(i)+d(p)+d(b)+d(g),s.toLowerCase();
}
return r;
});