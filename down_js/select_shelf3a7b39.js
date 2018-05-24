define("cardticket/select_shelf.js",["tpl/cardticket/select_shelf.html.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/pagebar.js","common/wx/Tips.js","biz_web/ui/checkbox.js","cardticket/common_template_helper.js","page/cardticket/dialog_select_goods_shelf.css"],function(t){
"use strict";
function e(t){
{
var e;
t.opt;
}
e=t.$popup.popup("get"),e.find(".dialog_bd").html(s({
loading:!0
})),t.$popup.popup("resetPosition");
}
function o(t,o){
var n=o.opt,i=$.extend(!0,{
action:"get_shelflist",
offset:n.pageInfo.begin,
count:n.pageInfo.count
},n.param);
d=!0,e(o),l.get({
url:n.url||"/merchant/cardshelf",
data:i,
complete:function(){
d=!1;
}
},function(t){
0==t.base_resp.ret||-1==t.base_resp.ret?(t=$.parseJSON(t.data),n.data=t.shelves,
n.pageInfo.total_count=t.total_cnt||0,a(n.pageInfo,o)):l.show(t);
});
}
function n(t,e){
for(var o=0;o<t.length;o++)if(t[o].id==e)return t[o];
return null;
}
function a(t,e){
var o,n=e.opt;
return o=e.$popup.popup("get"),o.find(".dialog_bd").html(s(n)),e.$popup.popup("resetPosition"),
n.data.length?($(o.find(".js_btn_p")[0]).removeClass("btn_disabled"),e.pagebar=null,
p(n.pageInfo,e),void i(e,n.data,o)):($(o.find(".js_btn_p")[0]).addClass("btn_disabled"),
void i(e,n.data,o));
}
function i(t,e,o){
for(var n=t.opt,a=0;a<e.length;a++)!function(t){
var e=$("#js_shelf_item_"+t);
l.get({
url:(n.render_url||"/merchant/cardshelf?action=render&shelf_id=")+t,
mask:!1,
error:function(){}
},function(t){
t.shelf_info&&t.shelf_info.template&&(e.append(t.shelf_info.template.http2https()),
e.find(".shop_modele_mask").remove(),e.find("a").attr("href","javascript:;"));
});
}(e[a].id);
$(".js_add_shelf",o).click(function(){
var e=t.opt;
1==e.shelf_type?window.open(wx.url("/merchant/cardshelf?action=get_shelflist&offset=0&count=5")):2==e.shelf_type&&window.open(wx.url("/merchant/shelf?action=choose"));
}),$(".js_shelf_item_p").click(function(){
$(".js_shelf_item_p").removeClass("selected"),$(this).addClass("selected");
}),t.$popup.popup("resetPosition");
}
function p(t,e){
var n=t.total_count,a=e.$popup.popup("get");
if(t.count&&n>t.count){
var i=t.begin/t.count;
e.pagebar=new c({
container:$(".js_pager",a),
first:!1,
last:!1,
midRange:5,
initShowPage:i+1,
perPage:t.count,
totalItemsNum:n,
callback:function(n){
if(d)return!1;
var a=n.currentPage;
return a!=i+1&&(t.begin=(a-1)*t.count,o(t,e)),!0;
}
});
}
}
{
var s=t("tpl/cardticket/select_shelf.html.js"),l=(t("common/wx/popup.js"),t("common/wx/Cgi.js")),c=t("common/wx/pagebar.js"),r=t("common/wx/Tips.js");
t("biz_web/ui/checkbox.js");
}
t("cardticket/common_template_helper.js"),t("page/cardticket/dialog_select_goods_shelf.css"),
s=template.compile(s);
var u={
multi:!1,
pageInfo:{
begin:0,
count:2,
total_count:0
},
param:{},
url:null,
data:null,
selectComplete:$.noop,
onHide:$.noop,
title:"选择卡券货架"
},f=function(t){
this.opt=$.extend(!0,{},u,t),this.init();
},d=!1;
return f.prototype={
init:function(){
var t=this.opt,e=this;
e.$popup=$(s({
loading:!0
})).popup({
autoShow:!1,
title:t.title,
width:960,
onOK:function(){
if(!t.data||!t.data.length)return!0;
var o=this.get(),a=o.find(".js_shelf_item_p.selected");
if(a=a.find(".js_shelf_item"),!a.length)return r.err("请选择货架"),!0;
var i=a.attr("data-id"),p={},s=n(t.data,i);
s&&(p=s),t.selectComplete.call(e,i,p);
},
onCancel:function(){},
onHide:function(){
this.remove(),t.onHide.call(e);
},
className:"dialog_select_shelf"
}),t.data?a(t.pageInfo,e):o(t.pageInfo,e);
},
show:function(){
this.$popup.popup("show");
},
destroy:function(){
this.$popup.popup("remove");
}
},f;
});