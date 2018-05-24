define("media/productCategory.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/dialog.js","tpl/media/product_category_frame.html.js","media/productDropdown.js"],function(e){
"use strict";
function t(e){
this._o={
container:"",
category_loading_img:"",
defaultLabel:"请选择",
initCategoryName:[],
formObj:null,
search:!0,
canadd:!0,
candel:!0,
onChange:function(){}
},this._g={
hasInitCategory:!1
},this._extend(e),this.initData(),this.render();
}
function n(e){
m.data&&e.callback(m.data),m.getting!==!0&&(m.getting=!0,u.post({
url:"/cgi-bin/productmaterial?action=get_all_category"
},{
done:function(t){
m.getting=!1,t&&t.base_resp&&0==t.base_resp.ret&&t.category_list&&t.category_list.length>=1&&t.category_list[0].children_node&&t.category_list[0].children_node.length>=0&&(m.data={
isNew:!1,
canDel:!1,
isRoot:!0,
children_node:t.category_list[0].children_node
},a(m.data.children_node,1,"","")),e.callback(m.data);
},
fail:function(){
m.getting=!1,e.callback(m.data);
}
}));
}
function a(e,t,n,o){
for(var r=0,i=e.length;i>r;r++){
var c=e[r];
m.dataMap["c"+t]||(m.dataMap["c"+t]={});
var d=n?n+c.category_name:c.category_name,l=o?o+r:r+"";
m.dataMap["c"+t][d]={
index:l,
name:c.category_name
},c.children_node&&c.children_node.length>0&&a(c.children_node,t+1,d+m.splitKey,l+",");
}
}
function o(e,t){
var n,a=[{
name:t,
value:"",
canDel:!1
}];
if(!e)return a;
if(n="[object Array]"===Object.prototype.toString.call(e)?e:e.children_node,!n)return a;
for(var o=0,r=n.length;r>o;o++)a.push({
value:n[o].category_name,
name:n[o].category_name,
canDel:n[o].canDel===!0?!0:!1
});
return a;
}
function r(e,t){
if(0==e||!t)return m.data;
if(e="c"+e,m.dataMap&&m.dataMap[e]&&m.dataMap[e][t]){
for(var n=m.data.children_node,a=(m.dataMap[e][t].index+"").split(","),o=0,r=a.length;r>o;o++){
var c=1*a[o];
if(o==r-1)n=n&&n[c]?n[c]:null;else{
if(!n||!i(n[c])){
n=null;
break;
}
n=n[c].children_node;
}
}
return n;
}
return null;
}
function i(e){
return e&&e.children_node&&e.children_node.length>0?!0:!1;
}
function c(e){
var t=e.categoryIndex,n=e.key,a=e.callback,o=t+m.splitKey+n;
if(m.checkCategoryDel[o]!==!0){
var i=r(t,n);
if("undefined"!=typeof i.canDel)return void a(i.canDel);
m.checkCategoryDel[o]=!0;
for(var c={},d=n.split(m.splitKey),l=0,g=d.length;g>l;l++)c["category_name"+(l+1)]=d[l];
u.post({
url:"/cgi-bin/productmaterial?action=check_delete_category",
data:c
},{
done:function(e){
if(m.checkCategoryDel[o]=!1,e&&e.base_resp&&0==e.base_resp.ret){
var i=r(t,n);
i.canDel=1*e.can_delete===1?!0:!1,a(i.canDel);
}else a(-1);
},
fail:function(){
m.checkCategoryDel[o]=!1,a(-1);
}
});
}
}
function d(e,t){
if(m.dataMap["c"+e]&&m.dataMap["c"+e][t]){
var n=m.dataMap["c"+e][t].index.split(",");
if(0!=n.length){
n=n[n.length-1];
var o;
if(1==e)o=m.data;else{
var i=t.split(m.splitKey);
i=i.splice(0,i.length-1).join(m.splitKey),o=r(e-1,i);
}
o&&o.children_node&&o.children_node[n]&&(o.children_node.splice(n,1),m.dataMap={},
a(m.data.children_node,1,"",""));
}
}
}
function l(e){
var t=r(e.categoryIndex,e.key);
if(t&&t.isNew===!0)return d(e.categoryIndex,e.key),void("function"==typeof e.onSuccess&&e.onSuccess({
base_resp:{
ret:0
}
},"删除类目成功"));
if(m.delCategory[e.key]!==!0){
m.delCategory[e.key]=!0;
for(var t={},n=e.key.split(m.splitKey),a=0,o=n.length;o>a;a++)t["category_name"+(a+1)]=n[a];
u.post({
url:"/cgi-bin/productmaterial?action=delete_category",
data:t
},{
done:function(t){
m.delCategory[e.key]=!1,t&&t.base_resp&&0==t.base_resp.ret?"function"==typeof e.onSuccess&&(d(e.categoryIndex,e.key),
e.onSuccess(t,"删除类目成功")):"function"==typeof e.onError&&e.onError(t,"删除类目失败");
},
fail:function(){
m.delCategory[e.key]=!1,"function"==typeof e.onError&&e.onError(null,"系统繁忙，请稍后再试");
}
});
}
}
function g(e,t){
if(!e||!t)return!1;
for(var n=0,a=e.length;a>n;n++)if(e[n].category_name===t)return!0;
return!1;
}
function f(e,t,n){
var a=r(e-1,t);
if(a=a.children_node,g(a,n))return-1;
a.push({
category_name:n,
isNew:!0,
canDel:!0,
children_node:[]
});
var o=a.length,i=t?t+m.splitKey+n:n,c="";
if(t&&e>=2){
var d=m.dataMap["c"+(e-1)][t];
if(!d)return!1;
c=d.index;
}
return m.dataMap["c"+e]||(m.dataMap["c"+e]={}),m.dataMap["c"+e][i]={
name:n,
index:c?c+","+(o-1):o-1+""
},a[o-1];
}
function y(e,t){
if(!t||!e||0==e.length)return void 0;
for(var n=void 0,a=0,o=e.length;o>a;a++)if(e[a].value==t){
n=a;
break;
}
return n;
}
var s=e("common/wx/Tips.js"),u=e("common/wx/Cgi.js"),_=e("common/wx/dialog.js"),h=e("tpl/media/product_category_frame.html.js"),p=e("media/productDropdown.js"),m={
categoryLimit:5,
checkCategoryDel:{},
delCategory:{},
data:null,
dataMap:{},
getting:!1,
splitKey:"#$%^"
};
return t.prototype={
_extend:function(e){
if(e)for(var t in e)this._o[t]=e[t];
},
initData:function(){
for(var e=this._g,t=this._o,a=this,r=1;r<=m.categoryLimit;r++)e["category_name"+r]=t.initCategoryName[r-1]||"";
n({
callback:function(n){
if(n)if(n.children_node&&0!=n.children_node.length){
e.categoryData=n;
var r=o(e.categoryData,t.defaultLabel),i=void 0;
e.category_name1&&(i=y(r,e.category_name1),e.category_name1=""),a.initCategory(1,"",r,i),
e.hasInitCategory=!0,"function"==typeof t.afterInitCategory&&t.afterInitCategory();
}else;else s.err("获取类目数据失败");
}
});
},
render:function(){
for(var e=1;e<=m.categoryLimit;e++)this._o.container.append(wx.T(h,{
index:e
}));
},
delSubCategoryDropdown:function(e){
for(var t=e;t<=m.categoryLimit;t++)this.delCategoryDropdown(t);
},
delCategoryDropdown:function(e){
var t=this._g,n=this.getDropdownKeyByIndex(e);
t[n]&&"function"==typeof t[n].destroy&&(t[n].destroy(),t[n]=null);
var a=$("#category_"+e+"_hidden").val("");
t.hasInitCategory&&this._o.formObj&&this._o.formObj.element(a);
},
initCategory:function(e,t,n,a){
var i=this._g,d=this._o,g=this;
if(this.delSubCategoryDropdown(e),d.canadd||n&&!(n.length<=1)){
var u=$("#category_"+e);
if(u&&u.length>0){
var h=this.getDropdownKeyByIndex(e);
i[h]=new p({
loading_img:d.category_loading_img,
container:u,
label:d.defaultLabel,
data:n,
callback:function(n,a){
var i=e+1;
if(""===n){
g.delSubCategoryDropdown(i);
var c=$("#category_"+e+"_hidden").val("");
return g._o.formObj&&g._o.formObj.element(c),void("function"==typeof g._o.onChange&&g._o.onChange(g));
}
var c=$("#category_"+e+"_hidden").val(a),d=t?t+m.splitKey+a:a;
g._o.formObj&&g._o.formObj.element(c);
var l=r(e,d),f=o(l,g._o.defaultLabel),s=void 0;
g._g["category_name"+i]&&(s=y(f,g._g["category_name"+i]),g._g["category_name"+i]=""),
g.initCategory(e+1,d,f,s),"function"==typeof g._o.onChange&&g._o.onChange(g);
},
search:d.search,
canadd:d.canadd,
add:function(n,a){
if(n){
var r=f(e,t,n);
return-1===r?void s.err("同一级类目不能重名"):(r&&(a.add(o([r],g._o.defaultLabel)[1]),a.selected(a.opt.data.length-1)),
!0);
}
},
del:function(n,a){
n&&_.show({
type:"info",
width:600,
msg:"确定删除类目？",
className:"dialog-delete-confirm",
buttons:[{
text:"确定",
click:function(){
if(g._g.delingCategory!==!0){
var n=this,i=n.dom.find(".js_btn").eq(0);
i.btn(!1),g._g.delingCategory=!0,l({
categoryIndex:e,
key:t?t+m.splitKey+a:a,
onSuccess:function(){
i.btn(!0),g._g.delingCategory=!1,g.delSubCategoryDropdown(e);
var a=r(e-1,t);
g.initCategory(e,t,o(a,g._o.defaultLabel),0),s.suc("删除类目成功"),n.remove();
},
onError:function(e,t){
i.btn(!0),g._g.delingCategory=!1,s.err(t||"系统繁忙，请稍后再试");
}
});
}
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
}
}),d.candel&&u.find("ul").on("mouseover","li.js_dropdown_item_li",function(){
var n=$(this),a=n.find("a.jsDropdownItem");
if(a&&a.length>0){
var o=a.attr("data-name"),r=a.attr("data-value");
if(!r)return;
var i=n.find(".js_loading").show(),d=n.find(".js_del");
c({
categoryIndex:e,
key:t?t+m.splitKey+o:o,
callback:function(e){
e===!0?(d.show(),i.hide()):e===!1&&i.hide();
}
});
}
}),"undefined"!=typeof a&&i[h].selected(a);
}
}
},
getData:function(){
for(var e={},t=1;t<=m.categoryLimit;t++){
var n=($("#category_"+t+"_hidden").val()||"").trim();
e["category_name"+t]=n||"";
}
return e;
},
handle:function(e){
for(var t=this._g,n=1;n<=m.categoryLimit;n++){
var a=this.getDropdownKeyByIndex(n);
t[a]&&"function"==typeof t[a][e]&&t[a][e]();
}
},
select:function(e,t){
var n=this._g[this.getDropdownKeyByIndex(e)];
n&&"function"==typeof n.selected&&n.selected(t);
},
getDropdownKeyByIndex:function(e){
return"category_"+e+"_dropdown";
}
},{
myconstructor:t,
categoryLimit:m.categoryLimit
};
});