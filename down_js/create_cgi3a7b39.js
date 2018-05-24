define("shop/create_cgi.js",["common/wx/Tips.js","biz_web/lib/json.js","common/wx/Cgi.js"],function(e,t,r){
"use strict";
var o=e("common/wx/Tips.js"),n=e("biz_web/lib/json.js"),s=e("common/wx/Cgi.js");
r.exports={
add:function(e,t){
s.post({
url:wx.url("/merchant/goodsgroup?action=add_group"),
data:{
group_name:e
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void o.err("添加分组:系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
o.suc("添加成功"),"function"==typeof t&&t(e);
break;

default:
o.err("添加失败，请重试");
}
});
},
addgood:function(e,t,r,n,a,u){
s.post({
url:wx.url("/merchant/goods?action="+e),
data:{
goods_data:t,
status:r,
group_ids:n
},
mask:!1
},function(t){
var r="update"==e?"编辑":"添加";
if(!t||!t.base_resp)return o.err(r+"商品:系统错误，请重试"),void("function"==typeof u&&u(t));
switch(+t.base_resp.ret){
case 0:
o.suc(r+"成功"),"function"==typeof a&&a(t);
break;

default:
290011!=+t.base_resp.ret&&(o.err(r+"失败，请重试"),s.handleRet(t,{
id:64462,
key:95,
url:"/merchant/goods?action="+e
})),"function"==typeof u&&u(t);
}
});
},
usersku:function(e,t,r,n,a,u){
var c=1==e?"addskuorprop":"delskuorprop";
s.post({
url:wx.url("/merchant/goods"),
data:{
cate:r,
action:c,
type:t,
key:n,
value:a
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void o.err("系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
o.suc("操作成功"),"function"==typeof u&&u(e);
break;

default:
o.err("操作失败，请重试");
}
});
},
get_subcategory:function(e,t){
var r=wx.url("/merchant/goods?type=7&cate_id="+e);
s.get({
url:r,
mask:!1
},function(e){
e?"function"==typeof t&&t(e):o.err("获取分类:系统错误，请重试");
});
},
get_subcategory2:function(e,t){
var r=wx.url("/merchant/goods?type=7&cate_id="+e);
s.get({
url:r,
mask:!1
},function(r){
r?"function"==typeof t&&t(r,e):o.err("获取分类:系统错误，请重试");
});
},
get_catesku:function(e,t){
var r=wx.url("/merchant/goods?type=8&cate_id="+e);
s.get({
url:r,
mask:!1
},function(r){
r?"function"==typeof t&&t(r,e):o.err("获取sku:系统错误，请重试");
});
},
get_subcolor:function(e,t){
var r=wx.url("/merchant/goods?type=8&cate_id="+e);
s.get({
url:r,
mask:!1
},function(e){
e?"function"==typeof t&&t(e):o.err("获取sku:系统错误，请重试");
});
},
get_property:function(e,t){
var r=wx.url("/merchant/goods?type=10&f=json&cate_id="+e);
s.get({
url:r,
mask:!1
},function(e){
e&&e.property_table?"function"==typeof t&&t(e.property_table):!e.base_resp||200003!=+e.base_resp.ret&&210003!=+e.base_resp.ret&&3!=+e.base_resp.ret?o.err("获取属性：系统错误，请重试"):"function"==typeof t&&t([]);
});
},
get_deliveries:function(e){
var t=wx.url("/merchant/delivery?action=getlist&f=json");
s.get({
url:t,
mask:!1
},function(t){
t?t.base_resp&&0!=t.base_resp.ret||!t.data?(o.err("获取运费模版失败，请重试"),"function"==typeof e&&e(null)):"function"==typeof e&&e(n.parse(t.data)):(o.err("获取邮费模版:系统错误，请重试"),
"function"==typeof e&&e(null));
});
},
get_imgs:function(e,t,r){
var a="/merchant/goodsimage?action=getimage&f=json&count=%s&offset=%s".sprintf(t,e);
s.get({
url:a,
mask:!1
},function(e){
e?e.base_resp&&0!=e.base_resp.ret||!e.data?o.err("图片库:系统错误，请重试"):"function"==typeof r&&r(n.parse(e.data)):o.err("图片库:系统错误，请重试");
});
}
};
});