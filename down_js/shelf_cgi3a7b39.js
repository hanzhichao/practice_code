define("shop/shelf_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(n,o,s){
"use strict";
var t=(n("common/wx/Tips.js"),n("common/wx/Cgi.js"));
s.exports={
onshelf:function(n,o){
t.post({
url:"/merchant/shelf?action=publish",
data:{
shelf_id:n
},
mask:!1
},function(n){
"function"==typeof o&&o(n);
});
},
offshelf:function(n,o){
t.post({
url:"/merchant/shelf?action=unpublish",
data:{
shelf_id:n
},
mask:!1
},function(n){
"function"==typeof o&&o(n);
});
},
del:function(n,o){
t.post({
url:"/merchant/shelf?action=del",
data:{
shelf_id:n
},
mask:!1
},function(n){
"function"==typeof o&&o(n);
});
}
};
});