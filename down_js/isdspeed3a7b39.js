define("common/wx/isdspeed.js",[],function(){
"use strict";
var e={},t="__default__",n={
begin:function(n){
return n||(n=t),e[n]||(e[n]={}),e[n].begin=+new Date,this;
},
end:function(n){
return n||(n=t),e[n]&&(e[n].end=+new Date),this;
},
set:function(n,i){
return n||(n=t),e[n]||(e[n]={}),e[n].begin=i,this;
},
report:function(n,i,r,s){
n||(n=t);
var o=e[n];
if(!o||o.isreport)return this;
o.isreport=!0;
var u=(o.end-o.begin)/1e3;
delete e[n];
setTimeout(function(){
var e="https://huatuospeed.weiyun.com/cgi-bin/r.cgi?flag1=7839&flag2="+i+"&flag3="+r+"&"+s+"="+u;
console.log(n+" use time:"+u+"s");
var t=new Image(1,1);
t.src=e;
},2e3);
return this;
},
endreport:function(e,t,n,i){
this.end(e),this.report(e,t,n,i);
}
};
return n;
});