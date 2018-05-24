define("common/wx/media/productTemplateDialog.js",["common/wx/popup.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/mpEditor/utils.js","tpl/media/product_style_dialog_list.html.js","tpl/media/product_style_dialog_content.html.js","tpl/media/product_highline_style.html.js","tpl/media/product_iframe_smart_tips.html.js"],function(t){
"use strict";
function e(t){
this._o={
color:g.defaultColor,
templateId:"",
productData:null,
editor:null
},this._g={
dom:{}
},this._extend(t),this.initDialog();
}
function a(t){
return t=t||{},g.templateData&&"function"==typeof t.callback?void t.callback(g.templateData):void c.post({
url:"/cgi-bin/productmaterial?action=get_template_list",
mask:!1
},{
done:function(e){
if(e&&e.base_resp&&0==e.base_resp.ret&&e.template_info_list&&e.template_info_list.template_list&&e.template_info_list.template_list.length>0){
g.templateData=e.template_info_list,g.templateData.default_template_id||(g.templateData.default_template_id=g.templateData.template_list[0].template_id),
g.templateData.default_color||(g.templateData.default_color=g.defaultColor);
var a=!1;
0==location.href.indexOf("http://dev")&&(a=!0);
for(var o=0,i=g.templateData.template_list.length;i>o;o++){
var l=g.templateData.template_list[o];
l.name||(l.name="模板"+(o+1)),l.color=g.defaultColor,l.pic_cover_url=l.pic_cover_url||"",
0==l.pic_cover_url.indexOf("http")||a||(l.pic_cover_url="https://res.wx.qq.com"+l.pic_cover_url);
}
"function"==typeof t.callback&&t.callback(g.templateData);
}
},
fail:function(){
"function"==typeof t.onError&&t.onError();
}
});
}
function o(t){
if(!t)return null;
var e=t.getAttribute("data-product")||"";
try{
e=decodeURIComponent(e),e=JSON.parse(e);
}catch(a){
e=null;
}
if(e&&e.productData){
e.type=t.getAttribute("data-type"),e.color=t.getAttribute("data-color"),e.smartNum=t.getAttribute("data-smartnum"),
e.packId=t.getAttribute("data-packid"),e.productId=t.getAttribute("data-pid");
try{
e.productId=decodeURIComponent(e.productId).split(g.pidSplitKey);
}catch(a){
e.productId=e.productId.split(g.pidSplitKey);
}
e.templateId=t.getAttribute("data-templateid");
}
return e;
}
function i(t){
if(!t)return"";
var e=o(t),a="";
if(e&&e.templateId){
var i=e.productData;
if(i&&i.length>0)if(2==e.type){
var l=s(e.templateId);
if(l){
var r=[];
for(i=[].concat(e.productData);i.length>0;)r.push(i.splice(0,l.loop));
for(var p=0,d=r.length;d>p;p++){
var c="";
c=g.smartTipsCompile({
smart_num:e.smartNum
}),a+=c,a+=n(r[p],e.templateId,e.color);
}
}
}else a=n(i,e.templateId,e.color);
}
return f+a;
}
function l(t,e,a){
$(e).find("img").each(function(){
this.onload=r(t,e,a),this.onerror=r(t,e,a);
var o=this.getAttribute("data-src");
this.src=o;
});
}
function r(t,e,a){
return function(){
var o=this;
o.onload=null,o.onerror=null,setTimeout(function(){
var o=e.ownerDocument,i=o?o.defaultView||o.parentWindow:null;
if(i&&t&&t.contentWindow===i){
var l=$(e).outerHeight();
if($(t).css({
height:l+"px"
}),"undefined"!=typeof a){
var r=window.UE.instants["ueditorInstant"+a];
r&&(g.adjustheightId&&(clearTimeout(g.adjustheightId),g.adjustheightId=null),g.adjustheightId=setTimeout(function(){
r.fireEvent("adjustheight");
},50));
}
}
},0);
};
}
function n(t,e,a){
var o=s(e);
if(!o)return"";
for(var i=o.template_xml,l=Math.min(o.loop,t.length),r={
url:"url",
title:"title",
img_url:"img_url",
str_price:"str_price",
str_original_price:"str_original_price",
sub_title:"sub_title",
color:a||g.defaultColor
},n=0;l>n;n++){
var p=t[n];
for(var d in r){
var c=new RegExp("\\{\\{"+d+(n+1)+"\\}\\}","g"),m="";
m="undefined"!=typeof p[r[d]]?p[r[d]]:r[d],"str_original_price"==d&&1*m===0?m="<span class='js_delparent'></span>":"[object String]"==Object.prototype.toString.call(m)&&(m=m.html(!0)),
i=i.replace(c,m);
}
}
var u=$("<div>").html(i),_=1;
return u.find("."+g.appmsgLoopClass).each(function(){
_>l&&$(this).remove(),_++;
}),u.find(".js_delparent").parent().remove(),u.html();
}
function s(t){
var e=g.templateData||null;
if(!e||!e.template_list)return null;
for(var a=null,o=0,i=e.template_list.length;i>o;o++)if(e.template_list[o].template_id==t){
a=e.template_list[o];
break;
}
return a&&a.loop&&a.template_xml?a:null;
}
function p(t){
return t=(t||"").toLowerCase(),/^#[0-9a-f]{6}$/.test(t)?!0:!1;
}
t("common/wx/popup.js");
var d=t("common/wx/Tips.js"),c=t("common/wx/Cgi.js"),m=t("common/wx/mpEditor/utils.js"),u=t("tpl/media/product_style_dialog_list.html.js"),_=t("tpl/media/product_style_dialog_content.html.js"),f=t("tpl/media/product_highline_style.html.js"),h=t("tpl/media/product_iframe_smart_tips.html.js"),g={
smartTipsCompile:template.compile(h),
appmsgContainerClass:"js_product_container",
appmsgLoopClass:"js_product_loop_content",
appmsgProductErrClass:"js_product_err_container",
defaultColor:"#fa7834",
pidSplitKey:",#%$&",
templateData:null,
adjustheightId:null
};
return e.prototype={
_extend:function(t){
for(var e in t)this._o[e]=t[e];
},
renderList:function(){
for(var t=[],e=0,a=g.templateData.template_list.length;a>e;e++){
for(var o=g.templateData.template_list[e],i=o.template_id,r=o.loop,s=[],p=0;r>p;p++)s.push(this._o.productData);
t.push({
name:o.name,
id:i,
cover:o.pic_cover_url||"",
html:function(t,e,a){
return m.createLocalIframe({
attr:{
style:"width:100%"
},
$dom:e,
onIframeReadyFunc:function(e){
e.doc.body.innerHTML=t,a(e.iframe,e.doc.body);
}
});
}(n(s,i,this._o.color),this._g.dom.$content,l)
});
}
this._g.dom.$content.html(wx.T(u,{
list:t
})),this.bindEvent();
},
initDialog:function(){
var t=this,e=this._o,o=this._g,i=o.dom;
e.editor&&e.editor.fireEvent("handleWinScroll",!1),i.$dialog=$(wx.T(_,{})).popup({
width:960,
title:"选择卡片模板",
autoShow:!0,
className:"dialog_product_template",
buttons:[{
text:"确定",
type:"primary",
classWrap:"js_save_btn",
click:function(){
if(!t._g.selected)return void d.err("请选择卡片模板");
var e=this;
t.destory(e),t._o.callback({
id:t._g.selected
});
}
},{
text:"取消",
type:"default",
classWrap:"js_cancel_btn",
click:function(){
t.destory(this);
}
}],
onHide:function(){
t.destory(this);
}
}),i.$saveBtn=i.$dialog.find(".js_save_btn"),i.$cancelBtn=i.$dialog.find(".js_cancel_btn"),
i.$content=i.$dialog.find(".js_content"),a({
callback:function(){
t.hasLive&&t.renderList();
}
});
},
bindEvent:function(){
var t=this;
this._g.dom.$content.on("click","input[type=radio]",function(){
t._g.dom.$content.find(".js_checkbox_parent").parents().closest(".product-style").removeClass("selected");
var e=$(this);
if(e.prop("checked")){
e.parents().closest(".product-style").addClass("selected");
var a=e.attr("data-id");
t.select(a);
}
}),setTimeout(function(){
var e=t._g.dom.$content.find('input[type=radio][data-id="'+t._o.templateId+'"]');
e&&1==e.length||(e=t._g.dom.$content.find("input[type=radio]").eq(0)),e.prop("checked",!0).trigger("click");
},0);
},
select:function(t){
this._g.selected=t;
},
hasLive:function(){
return this._g.dom&&this._g.dom.$dialog?!0:!1;
},
destory:function(t){
t&&t.remove(),this._g.dom=null,this._g.productListObj=null,this._o.editor&&this._o.editor.fireEvent("handleWinScroll",!0);
}
},{
appmsgContainerClass:g.appmsgContainerClass,
appmsgLoopClass:g.appmsgLoopClass,
appmsgProductErrClass:g.appmsgProductErrClass,
myclass:e,
getTemplate:a,
getIframeContentByIframe:i,
getOptionsFromIframe:o,
addIframeImgLoadEvent:l,
validColor:p,
defaultColor:g.defaultColor,
getTemplateDataById:s,
pidSplitKey:g.pidSplitKey
};
});