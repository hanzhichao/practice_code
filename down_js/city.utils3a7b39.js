function getBeginDateFormat(t){
var e=new Date;
return e.setTime(t),e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate();
}
function getEndDateFormat(t,e){
var r=new Date;
r.setTime(t);
var n=new Date;
return n.setTime(e),r.getDate()!=n.getDate()?"次日":"";
}
function getTimeFormat(t,e){
return __getTimeFormat(t)+"-"+getEndDateFormat(t,e)+__getTimeFormat(e);
}
function __getTimeFormat(t){
var e=new Date;
return e.setTime(t),__getTimeStringFormat(e.getHours())+":"+__getTimeStringFormat(e.getMinutes())+":"+__getTimeStringFormat(e.getSeconds());
}
function __getTimeStringFormat(t){
return 10>t?"0"+new Number(t):""+t;
}
function getRelativeTimeSpanFormat(t,e){
return __getRelativeTimeSpanFormat(t)+"-"+__getRelativeTimeSpanFormat(e);
}
function __getRelativeTimeSpanFormat(t){
return Math.floor(t/60)+"'"+t%60+"''";
}
function getTimeSpan(t,e){
var r=(e-t)/1e3,n=Math.floor(r/60),a=r%60;
return 0==n?a+"''":n+"'"+r%60+"''";
}
function getDateFormat(t){
var e=new Date(Date.parse(new Date)+t);
return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate();
}
function getUrlDomain(){
var t=$parseUrl(document.URL);
return t.protocol+"://"+t.host+(""!=t.port?":"+t.port:"");
}
function getUrlPrefix(){
for(var t=$parseUrl(document.URL),e="/",r=0;r<t.segments.length-1;r++)e+=t.segments[r]+"/";
return t.protocol+"://"+t.host+(""!=t.port?":"+t.port:"")+e;
}
function str2Date(t){
var e=t.split("-");
return new Date(e[0],e[1]-1,e[2]);
}
function onDisplayElement(t,e){
for(var r=0;r<t.length;r++)$(t[r]).css("display","");
for(var r=0;r<e.length;r++)$(e[r]).hide();
}
function commafy(t){
t+="";
for(var e=/(-?\d+)(\d{3})/;e.test(t);)t=t.replace(e,"$1,$2");
return t;
}
function splitNumber(t){
return"undefined"!=typeof t?parseFloat(t).toLocaleString():void 0;
}
Date.prototype.formate=function(t){
var e={
"M+":this.getMonth()+1,
"d+":this.getDate(),
"h+":this.getHours(),
"m+":this.getMinutes(),
"s+":this.getSeconds(),
"q+":Math.floor((this.getMonth()+3)/3),
S:this.getMilliseconds()
};
/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));
for(var r in e)new RegExp("("+r+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[r]:("00"+e[r]).substr((""+e[r]).length)));
return t;
},Date.prototype.dateDiff=function(t,e){
switch(t){
case"s":
return parseInt((e-this)/1e3);

case"n":
return parseInt((e-this)/6e4);

case"h":
return parseInt((e-this)/36e5);

case"d":
return parseInt((e-this)/864e5);

case"w":
return parseInt((e-this)/6048e5);

case"m":
return e.getMonth()+1+12*(e.getFullYear()-this.getFullYear())-(this.getMonth()+1);

case"y":
return e.getFullYear()-this.getFullYear();

default:
return void 0;
}
};