define("common/wx/sosomap/util.js",[],function(){
"use strict";
var t=",北京,北京市,天津,天津市,上海,上海市,重庆,重庆市,台湾,台湾省,香港,香港特别行政区,澳门,澳门特别行政区,",e={
formatAddress:function(t){
if(!t||!t.addressComponents)return{};
var e=t.addressComponents,r={
country:e.country||"",
province:e.province||"",
city:e.city||"",
district:e.district||"",
street:e.streetNumber||e.street||e.town+e.village||""
};
return r.district==r.street&&(r.street=""),r.province===r.city&&(r.city=r.district,
r.district=""),r.finalAddress=r.street,r;
},
fixaddr:function(t){
t.address?t.street=t.finalAddress=t.address.replace(t.province+t.city+t.district,"").replace("中国",""):t.province&&(t.address=t.province+t.city+t.district+(t.street||t.finalAddress));
},
area2addr:function(t){
var e,r,i;
return 2==t.length?e=r=t[0].data.fullname:(e=t[0].data.fullname,r=t[1].data.fullname),
i=t[t.length-1]&&t[t.length-1].data.fullname,{
province:e,
city:r,
district:i
};
},
area2scope:function(t){
var r="";
return t[0]&&t[0].data&&t[0].data.fullname&&(r=t[0].data.fullname),e.isTerritory(r)||t[1]&&t[1].data&&t[1].data.fullname&&(r=t[1].data.fullname),
r;
},
isTerritory:function(e){
return t.indexOf(","+e+",")>=0;
},
getLocation:function(t,e){
if("string"==typeof e)return void t.getLocation(e);
var r=e.finalAddress;
r=e.province==e.city?(e.city||"")+(e.district||"")+(r||""):(e.province||"")+(e.city||"")+(e.district||"")+(r||""),
t.getLocation(r);
}
};
return e;
});