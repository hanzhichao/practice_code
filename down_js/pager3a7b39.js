define("common/wx/pager.js",["common/wx/pagebar.js"],function(t){
"use strict";
function n(t){
if(t=$.extend(!0,{
count:10,
container:"#js_pagebar",
currentPage:1,
total_count:0
},t),t.total_count>t.count){
new a({
container:t.container,
perPage:t.count,
initShowPage:t.currentPage,
totalItemsNum:t.total_count,
first:!1,
last:!1,
isSimple:!0,
callback:function(n){
var a=n.currentPage;
t.callback&&t.callback(a);
}
});
}else $(t.container).html("");
}
var a=t("common/wx/pagebar.js");
return{
init:n
};
});