define("scan/item_action_shop.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js","common/wx/hash.js","common/wx/inputCounter.js","common/wx/popup.js","common/wx/popover.js","biz_common/jquery.validate.js"],function(e,t,i){
"use strict";
function n(){
return!0;
}
function o(){
if(!n())return C.setData(function(e){
e.storemgrinfo||(e.storemgrinfo={
mgr_type:1
}),e.storemgrinfo.vendorid_list=[],e.base_info.retail_price="";
}),void C.setActionList("shop",[]);
for(var e=[],t=[],i="",o=0;o<R.length;o++){
var r=R[o];
if(0!=r.selected){
if(""!==r.price){
var c=new Number(r.price);
r.price=c.toFixed(2)+"";
}
switch(r.type){
case"vendor":
e.push(r.id);
break;

case"weshop":
t.push({
type:9,
name:"微信小店",
extinfo:{
price:r.price||"",
link:r.extinfo.link||"",
productid:r.extinfo.productid||""
}
});
break;

case"custom_shop":
t.push({
type:14,
name:r.title||"",
desc:r.price||"",
extinfo:{
link:r.extinfo.link||""
}
});
break;

case"recommend_price":
i=r.price;
}
}
}
C.setActionList("shop",t),C.setData(function(t){
t.storemgrinfo||(t.storemgrinfo={}),t.storemgrinfo.mgr_type=1,t.storemgrinfo.vendorid_list=e;
}),C.setData(function(e){
e.base_info.retail_price=i;
}),v();
}
function r(e){
var t={
pid:"",
biz:""
};
return e&&(t.pid=D.getUrlParam("pid",e),t.biz=D.getUrlParam("biz",e)),t;
}
function c(e,t){
y.get({
url:"/merchant/scanproductinfo?action=shop_price&biz="+e.biz+"&productid="+e.pid
},t);
}
function s(e){
var t,i,n,s=e.find(".js_btn_edit"),p=e.find('input[type="checkbox"]'),d=R[1*e.data("index")];
s.show();
var a=new z({
dom:s,
content:w("tpl_weshop_form",{
id:d.extinfo.productid||"",
title:d.title||"",
price:d.price||"",
url:d.extinfo.link||""
}),
place:"bottom",
margin:"right",
className:"recommend_price_form",
addCls:"",
hideIfBlur:!0,
onHide:function(){
this.remove();
},
onRemove:function(){
d.extinfo.productid||(d.selected=!1,p.checkbox("checked",!1));
},
buttons:[{
text:"确定",
type:"primary",
click:function(){
if(i.hasClass("btn_loading"))return!1;
if(t.valid()){
i.btn(!1),n.disable();
var s=t.find('input[name="shop_url"]').val(),p=r(s),a=this;
c(p,function(r){
if(i.btn(!0),n.enable(),0==r.base_resp.ret){
var c=r.ext_info.shop_info.price,s=r.ext_info.shop_info.product_id,p=t.find('input[name="shop_url"]').val();
d.price=c,d.extinfo.price=c,d.extinfo.link=p,d.extinfo.productid=s,d.selected=!0,
e.find(".js_btn_edit").show(),e.find('input[type="checkbox"]').checkbox("checked",!0),
o(),a.remove();
}else q.err("获取商品信息失败");
});
}
}
},{
text:"取消",
type:"default",
click:function(){
return n.hasClass("btn_disabled")?!1:void this.remove();
}
}]
});
a.show(),i=a.$pop.find(".jsPopoverBt").eq(0),n=a.$pop.find(".jsPopoverBt").eq(1),
t=a.$pop.find("form"),t.validate({
ignore:".js_input_ignore",
rules:{
shop_url:{
required:!0,
url:!0,
isWeShopURL:!0
}
},
messages:{
shop_url:{
required:"请填写商品链接",
url:"请填写商品链接",
isWeShopURL:"请正确填写商品链接"
}
},
errorPlacement:function(e,t){
var i=t.parent().parent();
i.find(".js_frm_msg").html(e.html()).show();
}
});
}
function p(e){
var t,i=e.find(".js_btn_edit"),n=e.find('input[type="checkbox"]'),r=R[1*e.data("index")];
i.show();
var c=new z({
dom:i,
content:w("tpl_custom_shop_form",{
title:r.title||"",
price:r.price||"",
url:r.extinfo.link||""
}),
place:"bottom",
margin:"right",
className:"recommend_price_form",
addCls:"",
hideIfBlur:!0,
onHide:function(){
this.remove();
},
onRemove:function(){
r.title||(r.selected=!1,n.checkbox("checked",!1));
},
buttons:[{
text:"确定",
type:"primary",
click:function(){
if(t.valid()){
var i=t.find('input[name="shop_title"]').val(),n=t.find('input[name="shop_price"]').val(),c=t.find('input[name="shop_url"]').val();
r.title=i,r.price=n,r.extinfo.link=c,r.selected=!0,e.find(".js_txt_shop_title").html(i),
e.find(".js_btn_edit").show(),e.find('input[type="checkbox"]').checkbox("checked",!0),
o(),this.remove();
}
}
},{
text:"取消",
type:"default",
click:function(){
this.remove();
}
}]
});
c.show(),t=c.$pop.find("form"),t.validate({
ignore:".js_input_ignore",
rules:{
shop_title:{
required:!0,
maxlength:12
},
shop_url:{
required:!0,
url:!0
},
shop_price:{
required:!0,
number:!0
}
},
messages:{
shop_title:{
required:"请填写商城名称",
maxlength:$.validator.format("商城名称最多{0}个字符")
},
shop_url:{
required:"请填写商城地址",
url:"请填写商城地址"
},
shop_price:{
required:"请填写商品价格",
number:"商品价格应为数字"
}
},
errorPlacement:function(e,t){
var i=t.parent().parent();
i.find(".js_frm_msg").html(e.html()).show();
}
});
}
function d(e){
var t,i=e.find(".js_btn_edit"),n=e.find('input[type="checkbox"]'),r=R[1*e.data("index")],c=new z({
dom:i,
content:w("tpl_recommend_price_form",{
price:r.price
}),
place:"bottom",
margin:"right",
className:"recommend_price_form",
addCls:"",
hideIfBlur:!0,
onHide:function(){
this.remove();
},
onRemove:function(){
""===r.price&&(r.selected=!1,n.checkbox("checked",!1));
},
buttons:[{
text:"确定",
type:"primary",
click:function(){
if(t.valid()){
var e=t.find('input[name="recommend_price"]').val();
r.price=e,r.selected=!0,n.checkbox("checked",!0),o(),this.remove();
}
}
},{
text:"取消",
type:"default",
click:function(){
this.remove();
}
}]
});
c.show(),t=c.$pop.find("form"),t.validate({
ignore:".js_input_ignore",
rules:{
recommend_price:{
required:!0,
number:!0
}
},
messages:{
recommend_price:{
required:"请填写建议零售价",
number:"建议零售价应为数字"
}
},
errorPlacement:function(e,t){
var i=t.parent().parent();
i.find(".js_frm_msg").html(e.html()).show();
}
});
}
function a(){
var e=wx.cgiData.default_vendorid_list.vendorid_list;
if(e&&e.length>0)for(var t=0;t<e.length;t++){
var i={
type:"vendor",
id:e[t].vendorid,
title:e[t].vendorname,
price:e[t].price?e[t].price.toFixed(1):0,
selected:!1
};
B[e[t].vendorid]=i;
}
}
function l(){
j.html("");
for(var e=0,t=0;t<R.length;t++){
var i=R[t];
"custom_shop"==i.type&&e++,j.append(w("tpl_shop_"+i.type,{
index:t,
item:i
}));
}
j.find(".js_item_custom_shop").length<3&&j.append(w("tpl_shop_add_custom_shop",{})),
j.find('input[type="checkbox"]').checkbox({
multi:!0,
onChanged:function(e){
var t=e.parents(".js_item"),i=t.data("type"),n=1*t.data("index"),r=R[n];
e.is(":checked")?(r.selected=!0,"weshop"==i?r.extinfo.link?o():(s(t),e.checkbox("checked",!1),
r.selected=!1):"custom_shop"==i?r.extinfo.link?o():(p(t),e.checkbox("checked",!1),
r.selected=!1):"recommend_price"==i&&""===r.price?(d(t),e.checkbox("checked",!1),
r.selected=!1):o()):(r.selected=!1,o());
}
});
}
function f(){
a(),b=$("#js_form_action_shop"),j=$("#js_div_shoplist"),k=b.find(".js_frm_msg");
var e=C.getData().base_info.retail_price||"";
R.push({
type:"recommend_price",
title:"建议零售价",
price:e,
selected:""===e?!1:!0
});
var t=wx.cgiData.default_vendorid_list.vendorid_list,i=[];
if(C.getData().storemgrinfo&&C.getData().storemgrinfo.vendorid_list&&(i=C.getData().storemgrinfo.vendorid_list),
t&&t.length>0)for(var n=0;n<t.length;n++){
var o=B[t[n].vendorid];
o.selected=$.inArray(t[n].vendorid,i)>-1?!0:!1,R.push(o);
}
for(var r=C.getActionList("shop")||[],c=[],s=[],n=0;n<r.length;n++)9==r[n].type?c.push(r[n]):14==r[n].type&&s.push(r[n]);
0==c.length&&1==wx.cgiData.can_use_merchant&&R.push({
type:"weshop",
title:"微信小店",
price:"",
extinfo:{},
selected:!1
});
for(var n=0;n<c.length;n++){
var o={
type:"weshop",
title:"微信小店",
price:c[n].extinfo.price||"",
extinfo:c[n].extinfo||{},
selected:!0
};
R.push(o);
}
for(var n=0;n<s.length;n++){
var o={
type:"custom_shop",
title:s[n].name||"",
price:s[n].desc||"",
extinfo:s[n].extinfo,
selected:!0
};
R.push(o);
}
}
function m(){
l();
var e=new z({
dom:b.find(".js_tips"),
content:"1. 购买区不可为空，若无线上购买渠道，请填写建议零售价。%s2. 部分商品会提供对应的电商渠道，数据来自微信，可自行选择。".sprintf("<br>"),
isToggle:!0,
onShow:function(){
this.resetPosition();
}
});
e.hide();
}
function u(){
j.on("click",".js_btn_edit",function(e){
e.preventDefault();
var t=$(this).parents(".js_item"),i=t.data("type");
"weshop"==i?s(t):"recommend_price"==i?d(t):p(t);
}),j.on("click",".js_btn_delete",function(e){
e.preventDefault();
var t=$(this).parents(".js_item"),i=(t.data("type"),t.data("index"));
R.splice(i,1),l(),o();
}),j.on("click",".js_btn_add_custom_shop",function(e){
e.preventDefault();
var t={
type:"custom_shop",
title:"",
price:"",
extinfo:{},
selected:!1
};
R.push(t),l(),p(j.find(".js_item_custom_shop").last());
}),1==wx.cgiData.can_use_merchant&&j.find(".js_item_weshop").length>0&&j.find(".js_item_weshop").each(function(){
var e=1*$(this).data("index"),t=R[e],i=t.extinfo.link||"";
i&&!function(e,t){
var i=r(t);
c(i,function(t){
if(0==t.base_resp.ret){
{
var i=t.ext_info.shop_info.price;
t.ext_info.shop_info.product_id;
}
e.price=i,e.extinfo.price=i,o();
}else q.err("获取商品信息失败");
});
}(t,i);
});
}
function h(){
$.validator.addMethod("isWeShopURL",function(e){
var t=r(e);
return t.pid&&t.biz?!0:!1;
},"请正确填写商品链接");
}
function _(){
n()?b.show():b.hide(),o();
}
function v(e){
var t=!0;
return n()&&(j.find('input[type="checkbox"]').filter(":checked").length>0?(t=!0,
P=""):(t=!1,P="请至少设置一个购买项")),t?k.hide():k.show(),"function"==typeof e&&e.call(void 0,t,P),
t;
}
function x(){
return P;
}
function g(e){
return e&&e.model&&(C=e.model),L?!1:(L=!0,f(),m(),u(),void h());
}
var b,k,j,w=template.render,y=e("common/wx/Cgi.js"),q=e("common/wx/Tips.js"),D=(e("biz_web/ui/checkbox.js"),
e("common/wx/hash.js")),z=(e("common/wx/inputCounter.js"),e("common/wx/popup.js"),
e("common/wx/popover.js")),C=(e("biz_common/jquery.validate.js"),null),P="",L=!1,R=($("#js_input_we_shop"),
$("#js_input_custom_shop"),$("#js_input_recommend_price"),[]),B={};
i.exports={
init:g,
check:v,
getErrMsg:x,
triggerEditMode:_,
initShopMap:a,
shopMap:B
};
});