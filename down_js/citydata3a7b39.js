define("common/wx/sosomap/citydata.js",["common/wx/Cgi.js","cardticket/sosomap_province_data.js"],function(a){
"use strict";
function t(a,n,o){
if(!a[n]||!o.sub)return a;
var e=o.sub[a[n].index];
return a[n].data||(a[n].data={
name:e.shortName,
fullname:e.fullname,
id:e.id,
location:{
lat:e.location.lat,
lng:e.location.lng
},
end:o.end===!0?!0:!1
}),t(a,n+1,e);
}
function n(a){
function t(a,n,o,e){
if(!a[o])return n;
for(var l=0,i=e.sub.length;i>l;l++){
var u=e.sub[l];
if(u.shortName==a[o]||u.fullname==a[o]){
n[o]={
index:l,
data:{
name:u.shortName,
fullname:u.fullname,
id:u.id,
location:{
lat:u.location.lat,
lng:u.location.lng
}
}
},t(a,n,o+1,u);
break;
}
}
return n;
}
var o=a.province,l=a.city,i=a.district,u=a.cityData;
return u.sub&&0!=u.sub.length||e(function(){
n(o,l,i,u);
}),o?(o===l&&(l=i||"",i=""),t([o,l,i],new Array(3),0,u)):new Array(3);
}
function o(a,t,n,l){
return n.end===!0?void("function"==typeof l&&l(null)):a[t]?(n=n.sub[a[t].index],
void o(a,t+1,n,l)):n&&n.sub&&n.sub.length>0?void("function"==typeof l&&l(n.sub)):void e(function(){
var t={
sub:[]
};
o(a,0,t,l);
});
}
function e(a){
u.loading!==!0&&(u.loading=!0,u.loadId=setTimeout(function(){
u.loading=!1;
},1e4),window.citydata_callback=function(t){
if(u.loading=!1,window.clearTimeout(u.loadId),0==t.status&&t.result&&t.result.length>0){
var n=l(t.result);
"function"==typeof a&&a(n);
}
},-1==window.location.protocol.indexOf("https")?i.get({
url:u.url,
success:function(){
window.citydata_callback(c);
},
error:function(){
window.citydata_callback(c);
}
}):$.ajax({
url:u.urls,
type:"get",
dataType:"jsonp",
jsonp:"citydata_callback",
error:function(a,t){
200!=a.status&&(window.citydata_callback(c),jQuery.ajax({
url:"/misc/jslog?1=1"+wx.data.param,
type:"GET",
data:{
content:t,
id:58,
level:"error"
}
}));
}
}));
}
function l(a){
function t(n,o){
if(n.cidx){
n.sub=[];
for(var e=n.cidx[0];e<=n.cidx[1];e++)a[o][e].shortName=a[o][e].name||a[o][e].fullname,
a[o][e].value=a[o][e].fullname,a[o][e].name=a[o][e].fullname,n.sub.push(a[o][e]),
t(n.sub[n.sub.length-1],o+1);
}else n.end=!0;
}
for(var n={
sub:[]
},o=0,e=a[0].length;e>o;o++)a[0][o].shortName=a[0][o].name||a[0][o].fullname,a[0][o].value=a[0][o].fullname,
a[0][o].name=a[0][o].fullname,n.sub.push(a[0][o]),t(n.sub[n.sub.length-1],1);
return n;
}
var i=a("common/wx/Cgi.js"),u={
urls:"https://apis.map.qq.com/ws/district/v1/list?key=4GKBZ-OD5WR-OPVWO-WU3DT-GU2O5-PFF24&output=jsonp&callback=citydata_callback",
url:"/mpres/zh_CN/htmledition/js/common/wx/sosomap/temp_data.js",
loading:!1,
loadId:null
},c=a("cardticket/sosomap_province_data.js"),r={
getNextData:o,
getCurDataByName:n,
getCurDataByIndex:t,
loadData:e
};
return r;
});