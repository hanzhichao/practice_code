define("shop/shop_guide.js",["common/wx/top.js","shop/feedback.js"],function(o){
"use strict";
var s=o("common/wx/top.js"),e=o("shop/feedback.js");
new s("#topTab",s.DATA.shop).selected(0),e();
});