define("common/wx/sosomap/city_select.js",["common/wx/sosomap/citydata.js","biz_web/ui/dropdown.js","common/wx/sosomap/event.js"],function(t){
"use strict";
function e(t){
this.opt=$.extend(!0,{
province:".js_province",
city:".js_city",
district:".js_district",
autoUpdate:!1,
plsSelect:!0,
area:[]
},t);
var t=this.opt;
this.container=$(t.container),this.menuDomId=[t.province,t.city,t.district],this.area=new Array(3);
for(var e=0,a=this.menuDomId.length;a>e;e++)$(this.menuDomId[e],this.container).html("");
t.area&&(this.area=t.area),t.cityData||this.cityData.sub?this.initData(t.cityData||this.cityData.sub):this.loadData(),
this.initCityService();
}
var a=t("common/wx/sosomap/citydata.js"),i=t("biz_web/ui/dropdown.js"),n=t("common/wx/sosomap/event.js");
return e.prototype=new soso.maps.MVCObject,$.extend(e.prototype,n),$.extend(e.prototype,{
inited:!1,
area:null,
container:null,
menuDomId:null,
currentIndex:0,
cityData:{
sub:null
},
initCityService:function(){
var t=this;
this.cityService=new soso.maps.CityService({
complete:function(e){
t.trigger("city:changed",e);
}
});
},
initData:function(t){
this.inited=!0,this.cityData.sub=t,this.trigger("city:datainit"),this.updateSelect(this.area);
},
loadData:function(t){
var e=this;
return e.inited?void("function"==typeof t&&t(e.cityData)):void a.loadData(function(a){
e.cityData.sub=a.sub,e.inited=!0,e.trigger("city:datainit"),setTimeout(function(){
e.updateSelect(e.area),"function"==typeof t&&t(e.cityData);
},0);
});
},
update:function(t,e,i){
if("object"==typeof t){
var n=t;
t=n.province,e=n.city,i=n.district;
}
var r=this.area[0]&&this.area[0].data?this.area[0].data.fullname:"",o=this.area[1]&&this.area[1].data?this.area[1].data.fullname:"",c=this.area[2]&&this.area[2].data?this.area[2].data.fullname:"";
(r!=t||o!=e||c!=i)&&(this.area=a.getCurDataByName({
province:t,
city:e,
district:i,
cityData:this.cityData
}),this.updateSelect(this.area));
},
getSelectedValue:function(){
for(var t={},e=["province","city","district"],a=0;a<this.menuDomId.length;a++){
var i=this.menuDomId[a],n=this[i];
t[e[a]]=n&&n.value;
}
return t;
},
getAreaData:function(t,e,i){
return"undefined"==typeof t?this.area:("object"==typeof t&&(opt=t,t=opt.province,
e=opt.city,i=opt.district),a.getCurDataByName({
province:t,
city:e,
district:i,
cityData:this.cityData
}));
},
disabled:function(){
for(var t=this,e=0;e<this.menuDomId.length;e++){
var a=this.menuDomId[e];
t[a]&&t[a].disable();
}
},
enable:function(){
for(var t=this,e=0;e<this.menuDomId.length;e++){
var a=this.menuDomId[e];
t[a]&&t[a].enable();
}
},
createMenu:function(t,e,n){
var r=this,o=r.opt,c=r.menuDomId[e],s=r.area[e]&&r.area[e].data&&r.area[e].data.fullname;
if(r[c]&&"function"==typeof r[c].destroy&&r[c].destroy(),t&&t.length){
if(o.plsSelect&&!t.addSelect){
for(var d=[],u=0;u<t.length;u++)d.push({
name:t[u].name,
value:t[u].value
});
t=d,t.unshift({
name:"请选择",
value:""
}),t.addSelect=!0;
}
r[c]=new i({
container:$(c,r.container),
label:s||t[0].fullname||"请选择",
data:t||[],
disabled:t?!1:!0,
callback:function(t,i,c){
for(var s=e+1,d=r.menuDomId.length;d>s;s++){
var u=r.menuDomId[s];
r[u]&&"function"==typeof r[u].destroy&&r[u].destroy(),r.area[s]=null,$(u).hide();
}
if($(r.menuDomId[e]).show(),o.plsSelect&&0==c)return void(r.area.length=e);
r.area[e]={
index:o.plsSelect?c-1:c
},r.area=a.getCurDataByIndex(r.area,0,r.cityData),e!=r.menuDomId.length-1&&r.updateSelect(r.area,e+1);
var l=r.area[e].data.location;
r.currentIndex=e,r.opt.autoUpdate||r.trigger("city:changed",l),"function"==typeof n&&n.call(r,e);
}
}),s||o.plsSelect||(r.area[e]={
index:0
},r.area=a.getCurDataByIndex(r.area,0,r.cityData)),r.area[e]&&r.area[e].data&&(r[c].value=r[c].name=r.area[e].data.fullname);
}else r[c]=null,r.area.length=e;
},
updateSelect:function(t,e){
e||(e=0);
var a=this,i=a.opt;
if(!a.inited)return void this.loadData(function(){
a.updateSelect(t,e);
});
a.area=t;
for(var n=a.cityData,r=0,o=r,c=a.menuDomId.length;c>o;o++){
var s=a.menuDomId[o];
n.end!==!0&&n.sub&&n.sub.length>0?(o>=e&&this.createMenu(n.sub,o),$(s,a.container).show(),
n=i.plsSelect&&!t[o]?{
end:!0
}:n.sub[t[o]&&t[o].index||0]||{
end:!0
}):(o>=e&&this.createMenu(null,o),$(s,a.container).hide(),n={});
}
}
}),e;
});