define("setting/CitySelectComponent.js",["setting/citydata.js","biz_web/ui/dropdown.js"],function(e){
"use strict";
function t(e,t,r){
var a;
a=this,this.container=$(e),this.container.find(".dropdown_menu").css("width","inherit"),
this.provinceId=t,this.cityId=r,this.dropDownForProvince=new i({
container:t,
label:"省份",
data:o.getProvinceData(n),
callback:function(e){
o.generateDropDownForCityByProvince(a,e,n,r),a.value=e,soso.maps.event.trigger(a,"selectCity",e);
}
}),this.dropDownForProvince.selected(0),this.value=this.dropDownForProvince.value;
}
var n=e("setting/citydata.js"),i=e("biz_web/ui/dropdown.js"),o={};
return o.getProvinceData=function(e){
var t,n,i;
t=[];
for(var o=0,r=e.city,a=r.length;a>o;o++)i=r[o].name,t.push({
name:i,
value:i
});
for(var o=0,c=e.province,a=c.length;a>o;o++)n=c[o].name,t.push({
name:n,
value:n
});
return t;
},o.getCityData=function(e,t){
var n,i,o;
o=[];
for(var r=0,a=t.city,c=a.length;c>r;r++)if(n=a[r].name,e===n)return o;
for(var r=0,s=t.province,c=s.length;c>r;r++)if(i=s[r].name,i===e)for(var d=0,a=s[r].cities,c=a.length;c>d;d++)n=a[d].name,
o.push({
name:n,
value:n
});
return o;
},o.findCityInfo=function(e){
var t,i,o,r,a;
return o=null,r=n,"全国"==e||"中国"==e?!1:(o||$.each(r.city,function(t,n){
return n.name==e||n.short_name==e?(o=[e],i=[t],!1):void 0;
}),a=r.city.length,o||$.each(r.province,function(t,n){
return n.name==e||n.short_name==e?(o=[e],i=[t]):$.each(n.cities,function(r,c){
return c.name==e||c.short_name==e?(o=[n.name,e],i=[a+t,r],!1):void 0;
}),o?!1:void 0;
}),t={
index:i,
name:o
});
},o.generateDropDownForCityByProvince=function(e,t,n,o){
var r,a,c=e.dropDownForCity;
c&&c.destroy&&c.destroy(),r=this.getCityData(t,n),a=!r.length,e.dropDownForCity=new i({
container:o,
label:"城市",
data:r,
index:0,
disabled:a,
callback:function(t){
soso.maps.event.trigger(e,"selectCity",t),e.value=t;
}
});
},t.prototype=new soso.maps.MVCObject,t.prototype.selectCityByName=function(e,t){
var n;
n=o.findCityInfo(t),n&&n.index&&(cityIndex=n.index[1],provinceIndex=n.index[0],provinceIndex&&this.dropDownForProvince.selected(provinceIndex),
cityIndex&&this.dropDownForCity.selected(cityIndex));
},t.prototype.updateSelect=function(e){
var t,i,r,a,c,e,s;
a=this,i=n.city,t=i.length,s=n.province,r=o.findCityInfo(e),r&&r.name&&(e=r.name[1],
c=r.name[0],c&&(this.dropDownForProvince.container.find(".jsBtLabel").text(c),this.dropDownForProvince.value=c),
e?(o.generateDropDownForCityByProvince(this,c,n,this.cityId),this.dropDownForCity.container.find(".jsBtLabel").text(e),
this.dropDownForCity.value=e):(o.generateDropDownForCityByProvince(this,c,n,this.cityId),
this.dropDownForCity.container.find(".jsBtLabel").text("请选择"),this.dropDownForCity.value=null));
},t.prototype.city_changed=function(){
var e=this.get("city");
this.updateSelect(e);
},t;
});