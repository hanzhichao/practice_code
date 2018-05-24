define("shop/order_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(o,n,t){
"use strict";
var e=(o("common/wx/Tips.js"),o("common/wx/Cgi.js"));
t.exports={
delivery:function(o,n){
e.post({
url:"/merchant/productorder?action=setdelivery",
data:{
delivery:o
},
mask:!1
},function(o){
"function"==typeof n&&n(o);
});
},
closeAndRefund:function(o,n,t,r){
"string"!=typeof o&&(o=o.join("_")),e.post({
url:"/merchant/productorder?action=close",
data:{
orderidstr:o,
reason:n,
comment:t
},
mask:!1
},function(o){
"function"==typeof r&&r(o);
});
}
};
});