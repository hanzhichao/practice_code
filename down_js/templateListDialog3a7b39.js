define("common/wx/media/templateListDialog.js",["common/wx/popup.js","media/template_common.js","common/wx/Tips.js","common/wx/Cgi.js","tpl/media/templateListDialog.html.js","tpl/media/templateListContent.html.js","common/wx/pagebar.js"],function(t){
"use strict";
function e(t){
this._o={
token:"",
onSuccess:function(){}
},this._g={
perPage:4,
dom:{}
},this._extend(t),this.initDialog();
}
t("common/wx/popup.js");
var o=t("media/template_common.js"),i=t("common/wx/Tips.js"),a=(t("common/wx/Cgi.js"),
t("tpl/media/templateListDialog.html.js")),n=t("tpl/media/templateListContent.html.js"),s=t("common/wx/pagebar.js");
return e.prototype={
_extend:function(t){
if(t)for(var e in t)this._o[e]=t[e];
},
initDialog:function(){
var t=this,e=this._o,o=this._g,n=o.dom;
document.body.style.overflow=document.documentElement.style.overflow="hidden",n.$dialog=$(wx.T(a,{
token:e.token||""
})).popup({
width:680,
title:"图文模版",
autoShow:!0,
className:"align_edge weui-desktop-appmsg-dialog appmsg_tmpl_select_dialog",
buttons:[{
text:"添加到正文",
type:"primary",
classWrap:"js_save_btn",
click:function(){
if(!o.selectedId)return void i.err("请选择图文模版");
var a=t.getSelectData();
e.onSuccess({
content:a?a.content:""
}),t.destory(this);
}
},{
text:"取消",
type:"default",
click:function(){
t.destory(this);
}
}],
onHide:function(){
t.destory(this);
}
}),n.$js_loading=n.$dialog.find(".js_loading"),n.$js_content=n.$dialog.find(".js_content"),
n.$js_pagebar=n.$dialog.find(".js_pagebar"),this.getList({
page:0
});
},
showLoading:function(){
var t=this._g,e=t.dom;
t.gettingData=!0,e.$js_loading.show(),e.$js_content.hide(),e.$js_pagebar.hide();
},
checkDialogAlive:function(){
var t=this._g.dom;
return t&&t.$dialog?!0:!1;
},
hideLoading:function(){
var t=this._g,e=t.dom;
t.gettingData=!1,e.$js_loading.hide();
},
checkAccLoading:function(){
return this._g.gettingData;
},
getList:function(t){
var e=this,i=this._g;
e.checkAccLoading()!==!0&&(e.showLoading(),o.getTemplateList({
page:t.page,
perPage:i.perPage,
callback:function(t){
e.checkDialogAlive()&&(e.hideLoading(),e.renderContent(t));
}
}));
},
getSelectData:function(){
var t=this._g;
if(!t.selectedId)return null;
for(var e=0,o=t.curData.length;o>e;e++){
var i=t.curData[e];
if(i.appmsgid==t.selectedId)return i;
}
return null;
},
renderContent:function(t){
var e=this._g,i=e.dom;
i&&i.$dialog&&(0==t.code||t.msg?0!=t.code||t.list&&0!=t.list.length||t.msg||(t.msg="暂无数据"):t.msg="系统繁忙，请稍后再试",
e.curData=t.list||[],e.selectedId=void 0,o.formatTemplateData(e.curData,{
canPreview:!1,
showUpdateTime:!0,
showEdit:!1,
highLine:!1
}),i.$js_content.html(template.compile(n)({
list:e.curData,
msg:t.msg
})).show(),i.$js_loading.hide(),0==t.code&&t.total>0&&"undefined"!=typeof t.page?(this.initPageBar({
curPage:t.page+1,
total:t.total
}),i.$js_content.on("click",".js_appmsg",function(){
var t=$(this);
e.selectedId=t.data("id"),i.$js_content.find(".js_appmsg").removeClass("selected"),
t.addClass("selected");
})):i.$js_pagebar.hide(),i.$dialog.popup("resetPosition"));
},
initPageBar:function(t){
var e=this,o=this._g,i=o.dom;
o.myPagebar&&o.myPagebar.destroy(),o.myPagebar=new s({
container:i.$js_pagebar,
perPage:o.perPage,
initShowPage:t.curPage,
totalItemsNum:t.total,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
e.getList({
page:1*t.currentPage-1
});
}
});
},
destory:function(t){
t&&t.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto",
this._g.dom=null;
}
},e;
});