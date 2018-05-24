define("scan/product_model.js",[],function(t,n,e){
"use strict";
function i(){
var t=window.navigator.userAgent,n=t.indexOf("MSIE ");
return n>0?!0:!1;
}
function o(t){
if(p=$.extend(!0,p,t),f=$.extend(!0,y,t.data),f.action_list&&f.action_list.length>0){
for(var n=[],e=0;e<f.action_list.length;e++){
var i=f.action_list[e];
0==$.isEmptyObject(i)&&i.type>0&&n.push(i);
}
f.action_list=n;
for(var e=0;e<f.action_list.length;e++){
var i=f.action_list[e];
1==i.showtype?g.banner.push(i):$.inArray(i.type,[9,14])>-1?g.shop.push(i):$.inArray(i.type,[10])>-1?g.recommend_product.push(i):$.inArray(i.type,[6])>-1?g.product_desc.push(i):$.inArray(i.type,[13])>-1?g.entityshop.push(i):$.inArray(i.type,[1,2,8])>-1&&g.cell.push(i);
}
}
}
function r(){
return 1*f.context_info.edit_mode||0;
}
function a(t){
f.context_info||(f.context_info={}),f.context_info.edit_mode=1*t||0,p.onChangeEditMode&&p.onChangeEditMode.call(this,f);
}
function c(t){
t&&t.call(this,f),p.onChange&&p.onChange.call(this,f);
}
function s(){
return f;
}
function l(t){
t&&t.call(this,h);
}
function u(){
return h;
}
function _(t){
return t?g[t]:g;
}
function d(t,n){
g[t]=n;
var e=[];
for(var i in g)e=$.merge(e,g[i]);
f.action_list=e,p.onChange&&p.onChange.call(this,f);
}
var p={
onChange:function(){}
},f={},h={},g={
banner:[],
cell:[],
product_desc:[],
entityshop:[],
shop:[],
recommend_product:[]
},y={
key:{
keytype:0,
keystandard:0,
keystr:""
},
appuin:"",
base_info:{
thumb_url:"",
title:"",
sub_title:"",
source:"",
use_local_ext_info:"",
service_title:"",
service_iconurl:"",
tag:""
},
idx_info:{},
detail_info:{
banner_list:[],
desc_list:[]
},
action_list:[],
del_flag:0,
status:0,
qrcode_pic_url:"",
qrcode_url:"",
update_time:0,
create_time:0,
storemgrinfo:{
mgr_type:1,
vendorid_list:[]
},
context_info:{}
};
e.exports={
init:o,
getData:s,
setData:c,
getTmpData:u,
setTmpData:l,
getEditMode:r,
setEditMode:a,
getActionList:_,
setActionList:d,
isIE:i
};
});