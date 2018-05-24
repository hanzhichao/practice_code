define("cardticket/area_selector.js",["common/wx/multiSelector.js"],function(e){
"use strict";
var t=e("common/wx/multiSelector.js"),n={
min:1,
title:"省、直辖市、市",
tip:"至少选择%s个地区"
},r=function(e){
return e=$.extend(n,e),new t(e);
};
return r;
});