define("common/wx/media/shareCopyrightDialog.js",["biz_web/ui/checkbox.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","tpl/media/sharecopyright_dialog.html.js","tpl/media/sharecopyright_item.html.js","common/wx/tooltips.js","common/wx/pagebar.js"],function(t){
"use strict";
t("biz_web/ui/checkbox.js");
var e=t("common/wx/Cgi.js"),i=t("common/wx/Tips.js"),a=(t("common/wx/popup.js"),
t("tpl/media/sharecopyright_dialog.html.js")),o=t("tpl/media/sharecopyright_item.html.js"),n=t("common/wx/tooltips.js"),s=t("common/wx/pagebar.js"),r=(template.render,
function(t){
return new l(t);
}),l=function(t){
this.options=t,this._g={
perPage:3
},this.events=[],this.curData=[],this.seletedIndex=void 0,c.init.call(this);
},c={
init:function(){
var t=this,e=t.options=$.extend(!0,{
dialogTpl:a,
itemTpl:o,
className:"share_article_dialog",
title:"分享图文消息",
onOK:null,
onCancel:null
},t.options);
e.dialogTpl=template.compile(e.dialogTpl)(e),t.on("ok",function(){
return t.curData&&0!=t.curData.length?"undefined"!=typeof t.seletedIndex&&t.curData[t.seletedIndex]?("function"==typeof e.onOK&&e.onOK.call(this,t.curData[t.seletedIndex]),
this.destroy(),void(this.dialog=null)):void i.err("请选择原创文章"):void i.err("请搜索原创文章");
}),t.on("cancel",function(){
this.destroy(),"function"==typeof e.onCancel&&e.onCancel.call(this),this.dialog=null;
}),t.dialog=$(e.dialogTpl.trim()).popup({
title:e.title,
className:"share_article_dialog",
width:760,
autoShow:!0,
buttons:[{
text:"确定",
type:"disabled",
click:function(){
t._g.dom.$ok.hasClass("btn_disabled")||t.trigger("ok");
}
},{
text:"取消",
click:function(){
t.trigger("cancel");
}
}],
onHide:function(){
t.trigger("cancel");
}
});
var n=t._g,s=t.dialog.popup("get");
n.dom={
$dialogDom:s,
$ok:s.find(".js_btn_p").eq(0),
$searchInput:s.find(".js_search_input"),
$searchBtn:s.find(".js_search_btn"),
$searchDel:s.find(".js_search_del"),
$searchTips:s.find(".js_search_tips"),
$tipsMain:s.find(".js_tips_main"),
$articleContent:s.find(".js_article_content"),
$loading:s.find(".js_loading"),
$pageBar:s.find(".js_pagebar")
},n.dom.$ok.addClass("btn_primary"),c.initEvent.call(t);
},
initEvent:function(){
{
var t=this,e=this._g,i=e.dom;
this.options;
}
i.$searchBtn.click(function(){
var e=i.$searchInput.val().trim();
e&&(i.$searchTips.text(""),c.getSearchData.call(t,{
val:e,
page:0
}));
}),i.$searchInput.keyup(function(e){
var a=i.$searchInput.val().trim();
a?(i.$searchDel.show(),i.$searchTips.text(""),i.$tipsMain.hide()):c.resetSearch.call(t);
var o=e.keyCode||e.which||0;
13==o&&a&&c.getSearchData.call(t,{
val:a,
page:0
});
}),i.$searchDel.click(function(){
c.resetSearch.call(t);
}),i.$dialogDom.find(".js_tooltips").each(function(){
t._tooltips&&t._tooltips.show()||(t._tooltips=new n({
container:this,
reposition:!0,
parentClass:"tc",
position:{
left:-134
}
}));
});
},
resetSearch:function(){
var t=this._g,e=t.dom;
e.$searchInput.val(""),e.$searchDel.hide(),e.$searchTips.text(""),e.$tipsMain.hide();
},
checkLoading:function(){
return this._g.gettingData;
},
showLoading:function(){
var t=this._g,e=t.dom;
t.gettingData=!0,e.$loading.show(),e.$articleContent.hide();
},
hideLoading:function(){
var t=this._g,e=t.dom;
t.gettingData=!1,e.$loading.hide(),e.$articleContent.show();
},
getSearchData:function(t){
var i=this,a=(this.options,this._g);
c.checkLoading.call(this)!==!0&&(c.showLoading.call(this),e.post({
url:"/cgi-bin/operate_appmsg?sub=check_appmsg_copyright_stat",
data:{
url:t.val,
begin:t.page*a.perPage,
count:a.perPage
},
mask:!1
},{
done:function(e){
c.hideLoading.call(i);
var a="";
if(e&&e.base_resp){
if(0==e.base_resp.ret)return void c.renderArticle.call(i,{
code:0,
list:e.list||[],
total:1*e.total,
page:t.page,
searchKey:t.val
});
switch(1*e.base_resp.ret){
case 64701:
a="不是有效的公众号原创文章链接";
break;

case 200013:
a="你的操作太频繁，请稍后再试";
break;

default:
a="系统繁忙，请稍后再试";
}
return void c.renderArticle.call(i,{
code:-1,
msg:a
});
}
return void c.renderArticle.call(i,{
code:-1
});
},
fail:function(){
c.hideLoading.call(i),c.renderArticle.call(i,{
code:-1
});
}
}));
},
renderArticle:function(t){
if(this.dialog){
var e=this,i=this._g,a=i.dom,o=t.msg||"";
if(0==t.code||t.msg?0!=t.code||t.list&&0!=t.list.length||t.msg||(o="暂无搜索结果"):o="系统繁忙，请稍后再试",
this.curData=t.list||[],this.seletedIndex=void 0,a.$ok.disable(),a.$loading.hide(),
o?(a.$searchTips.text(o),a.$tipsMain.show(),a.$articleContent.hide()):(a.$articleContent.show(),
a.$articleContent.html(template.compile(this.options.itemTpl)({
data:this.curData
}).trim())),this.curData.length>0){
var n=a.$articleContent.find("input[type=radio][name=ori_article_item]");
n.checkbox({
onChanged:function(t){
e.seletedIndex=1*t.data("index"),a.$ok.enable();
}
}),n&&1==n.length&&n.trigger("click");
}
0==t.code&&t.total>0&&"undefined"!=typeof t.page?c.initPageBar.call(e,{
curPage:t.page+1,
total:t.total,
searchKey:t.searchKey
}):a.$pageBar.hide(),this.dialog.popup("resetPosition");
}
},
initPageBar:function(t){
var e=this,i=this._g,a=i.dom;
e.pageBar&&e.pageBar.destroy(),e.pageBar=new s({
container:a.$pageBar,
perPage:i.perPage,
initShowPage:t.curPage,
totalItemsNum:Math.min(t.total,2e3),
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
c.getSearchData.call(e,{
val:t.searchKey,
page:1*i.currentPage-1
});
}
});
}
},h={
on:function(t,e){
if(e){
var i=this.events;
return i[t]=i[t]||[],i[t].push(e),this;
}
},
trigger:function(t){
var e=this,i=arguments,a=e.events[t];
return a?($.each(a,function(t,a){
a.apply(e,Array.prototype.slice.call(i,1));
}),this):void 0;
},
hide:function(){
return this.dialog.popup("hide"),this;
},
show:function(){
return this.dialog.popup("show"),this;
},
destroy:function(){
!!this.dialog&&this.dialog.popup("remove"),this.dialog=null,this._tooltips&&this._tooltips.$dom&&(this._tooltips.$dom.remove(),
this._tooltips=null),this.pageBar&&this.pageBar.destroy(),this.curData=[],this.seletedIndex=void 0,
this._g.dom={};
}
};
return $.extend(l.prototype,h),r;
});