define("setting/multi_citydata.js",["common/wx/Cgi.js"],function(t){
"use strict";
function a(t,n,i){
if(!t[n]||!i.sub)return t;
var l=i.sub[t[n].index];
return t[n].data||(t[n].data={
name:l.shortName,
fullname:l.fullname,
id:l.id,
location:{
lat:l.location.lat,
lng:l.location.lng
},
end:i.end===!0?!0:!1
}),a(t,n+1,l);
}
function n(t,a,i){
function o(t,a,n,i){
if(!t[n])return a;
for(var l=0,e=i.sub.length;e>l;l++){
var u=i.sub[l];
if(u.shortName==t[n]||u.fullname==t[n]){
a[n]={
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
},o(t,a,n+1,u);
break;
}
}
return a;
}
return window.cityData.sub&&0!=window.cityData.sub.length||l(function(){
n(t,a,i);
}),t?(t===a&&(a=i||"",i=""),o([t,a,i],new Array(3),0,window.cityData)):new Array(3);
}
function i(t,a,n,o){
return n.end===!0?void("function"==typeof o&&o(null)):t[a]?(n=n.sub[t[a].index],
void i(t,a+1,n,o)):n&&n.sub&&n.sub.length>0?void("function"==typeof o&&o(n.sub)):void l(function(){
i(t,0,window.cityData,o);
});
}
function l(t){
window.cityData.sub&&window.cityData.sub.length>0&&"function"==typeof t&&t(window.cityData),
u.loading!==!0&&(u.loading=!0,u.loadId=setTimeout(function(){
u.loading=!1;
},1e4),-1==window.location.protocol.indexOf("https")?e.get({
url:u.url,
success:function(a){
if(u.loading=!1,window.clearTimeout(u.loadId),0==a.status&&a.result&&a.result.length>0){
var n=o(a.result);
"function"==typeof t&&t(n);
}
}
}):(window.citydata_callback=function(a){
if(u.loading=!1,window.clearTimeout(u.loadId),0==a.status&&a.result&&a.result.length>0){
var n=o(a.result);
"function"==typeof t&&t(n);
}
},$.ajax({
url:u.urls,
type:"get",
dataType:"jsonp",
jsonp:"citydata_callback"
})));
}
function o(t){
function a(n,i){
if(n.cidx){
n.sub=[];
for(var l=n.cidx[0];l<=n.cidx[1];l++)t[i][l].shortName=t[i][l].name||t[i][l].fullname,
t[i][l].value=t[i][l].fullname,t[i][l].name=t[i][l].fullname,n.sub.push(t[i][l]),
a(n.sub[n.sub.length-1],i+1);
}else n.end=!0;
}
window.cityData.sub=[];
for(var n=0,i=t[0].length;i>n;n++)t[0][n].shortName=t[0][n].name||t[0][n].fullname,
t[0][n].value=t[0][n].fullname,t[0][n].name=t[0][n].fullname,window.cityData.sub.push(t[0][n]),
a(window.cityData.sub[window.cityData.sub.length-1],1);
}
var e=t("common/wx/Cgi.js"),u={
urls:"https://apis.map.qq.com/ws/district/v1/list?key=4GKBZ-OD5WR-OPVWO-WU3DT-GU2O5-PFF24&output=jsonp&callback=citydata_callback",
url:"/mpres/zh_CN/htmledition/js/setting/multi_temp_data.js",
loading:!1,
loadId:null
};
window.cityData||(window.cityData={
city:",_北京,_北京市,_天津,_天津市,_上海,_上海市,_重庆,_重庆市,_台湾,_台湾省,_香港,_香港特别行政区,_澳门,_澳门特别行政区,",
sub:null
});
var c={
getNextData:i,
getCurDataByName:n,
getCurDataByIndex:a,
loadData:l
};
return c;
});