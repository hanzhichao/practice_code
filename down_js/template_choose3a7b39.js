define("shop/template_choose.js",["common/wx/top.js","shop/feedback.js"],function(e){
"use strict";
var o=e("common/wx/top.js"),s=e("shop/feedback.js");
new o("#topTab",o.DATA.shop).selected(3),s();
});