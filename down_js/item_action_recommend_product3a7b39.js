define("scan/item_action_recommend_product.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","common/wx/Tips.js","common/wx/popup.js","common/wx/pagebar.js","biz_common/jquery.validate.js"],function(t,e,n){
"use strict";
function i(){
var t=g.getEditMode();
return 0==t?!0:!1;
}
function r(t,e){
v.get({
url:"/merchant/scanproductlist?action=json_list&status=0",
data:{
page:t
}
},function(n){
if(console.log(n),0!=n.base_resp.ret)return void e(null);
for(var i,o,a=n.item_list,s=0;s<a.length;s++){
var d=a[s].keystandard+"_"+a[s].keystr;
void 0!==D[d]&&(a[s].selected=!0);
}
i=$(k("tpl_recommend_product_popup",{
list:a
})),o=i.find(".js_chexkbox_product"),o.checkbox({
multi:!0,
onChanged:function(t){
var e={
keystandard:t.data("keystandard"),
keystr:t.data("keystr"),
title:t.data("title"),
thumb_url:t.data("thumb")
},n=e.keystandard+"_"+e.keystr;
t.is(":checked")?w>=3?(y.err("最多选择3项相关商品"),t.checkbox("checked",!1)):(D[n]=e,w++):(D[n]=void 0,
w--);
}
}),o.each(function(){
var t=$(this).data("keystandard"),e=$(this).data("keystr");
e==wx.cgiData.keystr&&t==wx.cgiData.keystandard&&$(this).checkbox("disabled",!0);
});
new b({
container:i.find(".js_div_pagebar"),
perPage:10,
initShowPage:t,
totalItemsNum:n.paging_info.total,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var e=t.currentPage;
return r(e,function(t){
null!=t&&i.parent().html(t);
}),!1;
}
});
e(i);
});
}
function o(){
var t=[];
for(var e in D)void 0!=D[e]&&t.push(D[e]);
h.html(k("tpl_recomend_product",{
list:t
})),t.length>=3?p.disable():p.enable(),a(t,function(t,e,n){
t&&t.title&&t.thumb_url&&(h.find(".js_item_"+e+" .js_title").html(t.title),D[n].title=t.title,
D[n].thumb_url=t.thumb_url,s());
});
}
function a(t,e){
for(var n=0;n<t.length;n++)t[n].title&&t[n].thumb_url||!function(n){
var i=t[n].keystandard+"_"+t[n].keystr;
v.get({
url:"/merchant/scanproductinfo?action=baseinfo",
data:{
keystr:t[n].keystr,
keystandard:t[n].keystandard
}
},function(t){
e(t,n,i);
});
}(n);
}
function s(){
if(!i())return void g.setActionList("recommend_product",[]);
var t=[];
for(var e in D)void 0!=D[e]&&t.push({
keytype:1,
keystandard:D[e].keystandard,
keystr:D[e].keystr,
title:D[e].title,
thumb_url:D[e].thumb_url
});
x=t.length>0?[{
type:10,
extinfo:{
recommend:{
recommend_type:3,
recommend_key_list:t
}
}
}]:[],g.setActionList("recommend_product",x);
}
function d(){
if(f=$("#js_form_recommend_product"),p=f.find(".js_btn_select"),h=f.find(".js_div_list"),
x=g.getActionList("recommend_product"),x.length>0)for(var t=0;t<x[0].extinfo.recommend.recommend_key_list.length;t++){
var e=x[0].extinfo.recommend.recommend_key_list[t];
if(e.keystandard&&e.keystr){
var n=e.keystandard+"_"+e.keystr;
D[n]=e,w++;
}
}
template.helper("dateToString",function(t){
var e=new Date(t),n="%s.%s.%s".sprintf(e.getFullYear(),e.getMonth()+1,e.getDate());
return n;
});
}
function c(){
x&&o();
}
function u(){
h.on("click",".js_btn_delete",function(t){
t.preventDefault();
var e=$(this).data("keystandard"),n=$(this).data("keystr"),i=e+"_"+n;
void 0!==D[i]&&(D[i]=void 0,w--),o(),s();
});
var t;
p.on("click",function(e){
if(e.preventDefault(),$(this).hasClass("btn_loading"))return!1;
if($(this).hasClass("btn_disabled"))return!1;
var n=$.extend({},D),i=w;
p.btn(!1),r(1,function(e){
if(p.btn(!0),null==e)return void y.err("系统错误，请重试");
var r=$('<div class="js_product_list"/>').popup({
title:"选择3个相关商品",
className:"product_list_dlg",
data:{},
buttons:[{
text:"确定",
click:function(){
0==w?y.err("请至少选择1个商品"):(o(),s(),this.remove());
},
type:"primary"
}],
onHide:function(){
D=n,w=i,this.remove();
},
onShow:function(){
var n=this.get();
t=n.find(".js_btn_p"),n.find(".js_product_list").html(e);
}
});
r.popup("resetPosition");
});
});
}
function l(){
i()?f.show():f.hide(),s();
}
function m(t){
var e=!0;
return"function"==typeof t&&t.call(void 0,e),e;
}
function _(t){
return t&&t.model&&(g=t.model),j?!1:(j=!0,d(),c(),void u());
}
var f,p,h,k=template.render,v=t("common/wx/Cgi.js"),y=(t("biz_web/ui/checkbox.js"),
t("common/wx/Tips.js")),b=(t("common/wx/popup.js"),t("common/wx/pagebar.js")),g=(t("biz_common/jquery.validate.js"),
null),j=!1,x=[],w=0,D={};
n.exports={
init:_,
check:m,
triggerEditMode:l,
loadEmptyProductList:a
};
});