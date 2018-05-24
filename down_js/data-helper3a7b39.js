define("statistics/menu_stat/summary/data-helper.js",["statistics/common.js","statistics/menu_stat/summary/version-tree.js"],function(t){
"use strict";
var e={},n=t("statistics/common.js"),a=n.loopDay,r=t("statistics/menu_stat/summary/version-tree.js"),s=r.isParent;
return e.construct=function(t,e,n,s){
var u={},i=new r;
a(e,n,function(t){
var e=u[t]=new r;
e.clk_av=0;
}),t.each(function(t){
if("0"!=t.version){
t.rawVersion=t.version,t.version=t.version.toString().replace(/(\d{2})$/,".$1版"),
t.id=t.button_id+t.button_key,t.clk_av=0==t.clk_uv?0:t.clk_pv/t.clk_uv,t.parent_id=r.isParent(t)?"0":t.parent_button_id+t.parent_button_key;
var e=u[t.ref_date];
e&&(e.build(t),e.clk_av=e.clk_pv/e.clk_uv),t.ref_date!==s&&i.build(t);
}
});
var v={
timeSliceData:u,
totalData:i
};
return v;
},e.flattenVersionMenus=function(t){
var e=[];
if(!t)return e;
for(var n in t.menus){
var a=t.menus[n];
e.push({
name:a.primary_menu_name,
value:a
});
}
return e.each(function(t){
var n=t.value;
for(var a in n.menus){
var r=n.menus[a];
e.push({
name:r.secondary_menu_name,
value:r
});
}
}),e.sort(function(t,e){
var n=t.value.clk_pv*(s(t.value)?100:1),a=e.value.clk_pv*(s(e.value)?100:1);
return a-n;
}),e;
},e;
});