define("shop/goods_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(o,n,s){
"use strict";
var t=o("common/wx/Tips.js"),i=o("common/wx/Cgi.js");
s.exports={
onshelf:function(o,n){
o=$.isArray(o)?o.join("|"):o,i.post({
url:"/merchant/goods?action=onshelf",
data:{
product_id:o
},
mask:!1
},function(o){
"function"==typeof n&&n(o),t.suc("商品上架成功");
});
},
offshelf:function(o,n){
o=$.isArray(o)?o.join("|"):o,i.post({
url:"/merchant/goods?action=offshelf",
data:{
product_id:o
},
mask:!1
},function(o){
"function"==typeof n&&n(o),t.suc("商品下架成功");
});
},
del:function(o,n){
o=$.isArray(o)?o.join("|"):o,i.post({
url:"/merchant/goods?action=del",
data:{
product_id:o
},
mask:!1
},function(o){
"function"==typeof n&&n(o),t.suc("商品删除成功");
});
}
};
});