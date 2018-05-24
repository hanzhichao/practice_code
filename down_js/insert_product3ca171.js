define("common/wx/mpEditor/plugin/insert_product.js",["common/wx/dialog.js","common/wx/media/productDialog.js","common/wx/media/productTemplateDialog.js","common/wx/mpEditor/utils.js","tpl/mpEditor/plugin/product_popup.html.js","tpl/mpEditor/plugin/product_popup_icon.html.js","common/wx/Tips.js","biz_web/lib/store.js"],function(e){
"use strict";
function t(){
y.mpproductReg=new RegExp("<mpproduct([^>]*?)"+y.className+"([^>]*?)><\\/mpproduct>","g"),
y.mpproductRegReplace="<iframe $1"+y.className+"$2></iframe>",y.iframeReg=new RegExp("<iframe([^>]*?)"+y.className+"([^>]*?)><\\/iframe>","g"),
y.iframeRegReplace="<mpproduct $1"+y.className+"$2></mpproduct>";
var e=_.get(y.cacheProductKey)||{};
e.templateId&&(y.curTemplateId=e.templateId);
}
function r(e){
return e.find("iframe."+y.className).remove(),e.find("mpproduct").remove(),e.find("."+m.appmsgContainerClass).remove(),
e.find("."+m.appmsgLoopClass).remove(),e.find("."+m.appmsgProductErrClass).remove(),
e.find("section").each(function(){
this.firstChild||this.style.cssText||$(this).remove();
}),e;
}
function i(e){
this._o={
container:null,
clearProduct:!1,
can_see_product:!1,
can_use_smart:!1,
can_use_product:!1,
can_use_wxopen_link:!1
},this._g={
highlineCacheIframe:[],
highlineTarget:null,
highlineTimeoutId:null
},this._extend(e),this._o.container&&this._o.can_see_product===!0&&$(this._o.container).show(),
this._o.can_see_product!==!0||this._o.can_use_product!==!0?this._o.clearProduct=!0:this.initTemplate(),
this.editor=null;
}
function o(e,t,r){
for(var i=window.UE.dom.domUtils,o=e,d=!0;o;){
if(i.isBody(o)){
d=!1;
break;
}
var l=i["find"+r+"Sibling"](o,n(t),!1);
if(l&&!i.isBody(l)){
var s=i["find"+r+"Sibling"](o,c(l),!1);
if(s&&s!==l&&!i.isBody(s)){
d=!1;
break;
}
if(l===t){
d=!0;
break;
}
var u="";
if("Next"==r?u="Previous":"Previous"==r&&(u="Next"),a(t,l,u)){
d=!1;
break;
}
d=!0;
break;
}
if(l=i["find"+r+"Sibling"](o,c(),!1),l&&!i.isBody(l)){
d=!1;
break;
}
o=o.parentNode;
}
return d;
}
function a(e,t,r){
for(var i=window.UE.dom.domUtils,o=e,a=!1;o&&o!==t;){
var n=i["find"+r+"Sibling"](o,c(),!1);
if(n&&!i.isBody(n)){
a=!0;
break;
}
o=o.parentNode;
}
return a;
}
function n(e){
var t=window.UE.dom.domUtils,r=e.getAttribute("data-uid");
return function(i){
if(t.isBody(i))return!0;
if(1==i.nodeType){
if(e===i)return!0;
var o=$(i).find("."+y.className+"[data-uid="+r+"]");
return o&&o.length>0?!0:!1;
}
return!1;
};
}
function c(e){
var t=window.UE.dom.domUtils;
return function(r){
if(t.isBody(r))return!0;
if("undefined"!=typeof e&&r===e)return!0;
if(1==r.nodeType){
if("br"==r.nodeName.toLowerCase())return!1;
var i=r.innerText.replace(/[\r\n\s]/g,"").replace(t.fillCharReg,"");
if(r.style.cssText||i.length>0)return!0;
var o=["p","section","span"],a=","+o.join(",")+",",n=r.nodeName.toLowerCase();
if(a.indexOf(","+n+",")>=0){
if(0==r.childElementCount)return!1;
var c=$(r.cloneNode(!0));
c.find("br").remove();
for(var d=[],l=0,s=o.length;s>l;l++){
var u=o[l];
c.find(u).each(function(){
0!=this.childElementCount||this.style.cssText||d.push(this);
});
}
for(var l=0,s=d.length;s>l;l++)$(d[l]).remove();
return 0===c[0].childElementCount?!1:!0;
}
return!0;
}
if(3==r.nodeType){
var i=r.nodeValue.replace(/[\r\n\s]/g,"").replace(t.fillCharReg,"");
return i.length>0?!0:!1;
}
return!1;
};
}
function d(e,t){
for(var r=window.UE.dom.domUtils,i=e;i&&!r.isBody(i);){
var o=r["find"+t+"Sibling"](i,s,!1);
if(o){
i=o;
break;
}
i=i.parentNode;
}
if(i&&!r.isBody(i)&&1==i.nodeType){
if(l(i)===!0)return i;
var a=$(i).find("."+y.className).eq(0)[0];
if(a){
var n;
"Next"==t?n="Previous":"Previous"==t&&(n="Next");
for(var c=a;c&&!r.isBody(c)&&c!==i;){
var o=r["find"+n+"Sibling"](c,s,!1);
if(o){
c=o;
break;
}
c=c.parentNode;
}
return c&&!r.isBody(c)&&c!==i?null:a;
}
}
return null;
}
function l(e){
return e&&1==e.nodeType&&/^iframe$/i.test(e.nodeName)&&(e.className||"").indexOf(y.className)>=0?!0:!1;
}
function s(e){
var t=window.UE.dom.domUtils;
return t.isBody(e)||3==e.nodeType&&0==(e.nodeValue||"").replace(t.fillCharReg,"").length?!1:!0;
}
var u=e("common/wx/dialog.js"),p=e("common/wx/media/productDialog.js"),m=e("common/wx/media/productTemplateDialog.js"),f=e("common/wx/mpEditor/utils.js"),h=e("tpl/mpEditor/plugin/product_popup.html.js"),g=e("tpl/mpEditor/plugin/product_popup_icon.html.js"),v=e("common/wx/Tips.js"),_=e("biz_web/lib/store.js"),y={
hasTemplateData:!1,
afterTemplateQueue:[],
maxLen:200,
curColor:m.defaultColor,
colorCacheMax:10,
curTemplateId:"",
PopupTplCompile:template.compile(h),
PopupIconTplCompile:template.compile(g),
iframeUid:"insert_product_iframe_ready",
className:"js_editor_product",
cacheProductKey:"editorProductInfo_"+window.wx.data.uin,
defaultColorList:["#fa7834","#09BB07","#D54036","#9058CB"],
productStyleText:"width:100% !important;border:0;"
};
return t(),i.afterSetContent=function(e){
var t=[],r=e.$dom;
r.find("mpproduct").each(function(){
var e=$(this),r=e.attr("data-uid")||"";
r||(r=f.getuid(),e.attr("data-uid",r)),e.attr("src",f.getIframeSrc(r,y.iframeUid)),
t.push(e);
}),f.createAsynRenderIframe(t);
},i.beforeSetContent=function(e){
if(!e.html)return"";
if(e.clearProduct===!0){
var t=$("<div>").html(e.html);
return t=r(t),t.html();
}
if(/<mpproduct\s/.test(e.html)){
var i,t=$("<div>").html(e.html),o=[];
t.find("mpproduct").each(function(){
var t,r=$(this);
e.isPreview===!0?(t=f.getuid(),r.attr("data-uid",t)):i=r.attr("data-color");
var a=r.parents("p");
if(a&&a.length>0)for(var n=0,c=a.length;c>n;n++)o.push(a[n]);
}),i&&m.validColor(i)&&(y.curColor=i);
for(var a=0,n=o.length;n>a;a++){
var c=o[a];
c&&1==c.nodeType&&"p"==c.nodeName.toLowerCase()&&c.parentNode&&$(c).replaceTagName("section");
}
return e.html=t.html(),e.html;
}
return e.html;
},i.prototype={
_extend:function(e){
for(var t in e)this._o[t]=e[t];
},
getName:function(){
return"insertproduct";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
{
var e=this;
this._o;
}
return function(){
var t=e.editor;
if(t){
if(e._o.can_use_product!==!0){
var r="未关联开通微信支付的小程序，暂无法使用商品组件能力%s去关联%s",i="";
return i=e._o.can_use_wxopen_link===!0?"<p style='text-align:center'><a href='"+wx.url("/cgi-bin/wxopen?action=list")+"' target='_blank'>":"<p style='text-align:center'><a href='"+wx.url("/cgi-bin/wxopen?action=apply_page")+"' target='_blank'>",
void u.show({
title:"选择商品",
type:"info",
msg:r.sprintf(i,"</a></p>"),
className:"dialog-product-not-support",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
}
var o=e.getCurProductCount();
return o>=y.maxLen?void v.err("最多插入%s个商品".sprintf(y.maxLen)):void new p({
can_use_smart:e._o.can_use_smart,
maxLen:y.maxLen-o,
editor:t,
callback:function(t){
y.curTemplateId&&m.getTemplateDataById(y.curTemplateId)&&(t.templateId=y.curTemplateId),
e.insertHtml(t);
}
});
}
};
},
initTemplate:function(){
y.hasTemplateData!==!0&&m.getTemplate({
callback:function(){
y.hasTemplateData=!0;
for(var e=0,t=y.afterTemplateQueue.length;t>e;e++){
var r=y.afterTemplateQueue[e];
"function"==typeof r&&r();
}
y.afterTemplateQueue=[];
}
});
},
addListener:function(e){
if(this._o.clearProduct!==!0){
var t=this;
this.domUtils=this.editor.getDomUtils(),this.createIframeReadyFunc(),this.showPopup(e),
e.addListener("beforesavescene",function(e,t){
t&&t.content&&(t.content=t.content.replace(y.iframeReg,y.iframeRegReplace));
}),e.addListener("afterscencerestore",function(){
t.afterSetContent();
}),e.addListener("show_product_template_dialog",function(e,r,i){
$(r).parents(".js_product_popup").find(".js_color_picker").hide(),t.showProductTemplateDialog(i);
}),e.addListener("beforepaste",function(e,r){
var i=$("<div></div>").html(r.html);
i=t.filterData(i),r.html=i.html();
}),e.addListener("toggle_product_color",function(e,t,r){
t=t||window.event;
var i=$(t.target||t.srcElement);
if(i.hasClass("js_toggle")){
var o=$(r).find(".js_color_picker");
o.is(":hidden")?o.show():o.hide();
}
}),e.addListener("templateDialogClosed",function(){
t.createIframeReadyFunc();
}),e.addListener("product_color_pick",function(e,r,i,o){
r=r||window.event;
var a=$(r.target||r.srcElement);
if(a.hasClass("js_color_icon")){
var n=a.attr("data-color"),c=a.parents(".js_color_picker"),d=t.pickColor(c,n,o);
d===!0&&this.fireEvent("hide_common_popup");
}
}),e.addListener("product_color_change",function(e,r,i,o){
var a=$(i),n=a.parents(".js_color_picker"),c=n.find("input.js_color_input").val(),d=n.find(".js_fail");
if(c&&m.validColor(c)){
d.hide(),r=r||window.event;
var l=r.keyCode||r.which||0;
if("click"==r.type||"keyup"==r.type&&13==l){
var s=t.pickColor(n,c,o);
s===!0&&this.fireEvent("hide_common_popup");
}
}else c?d.show().find(".js_fail_msg").text("请输入合法颜色值，如#666666"):d.hide();
}),e.addListener("common_popup_mouseover",function(e,r,i,o){
if(l(o)){
var a=t._g,n=$(i).find(".js_template")[0];
if(n){
var c=n.getBoundingClientRect();
r.clientX<parseInt(c.left)||r.clientX>parseInt(c.right)||r.clientY<parseInt(c.top)||r.clientY>parseInt(c.bottom)?t.cancelHighline():(a.highlineTimeoutId&&(clearTimeout(a.highlineTimeoutId),
a.highlineTimeoutId=null),(0==a.highlineCacheIframe.length||a.highlineTarget!==o)&&(a.highlineTarget=o,
a.highlineCacheIframe=t.getNeighbor(o).iframeList||[],t.highLineIframe(!0)));
}else t.cancelHighline();
}
}),e.addListener("common_popup_mouseout",function(e,r,i,o){
l(o)&&t.cancelHighline();
}),e.addListener("beforekeydown",function(e,r){
if(r=r||window.event,r&&r.type){
var i=r.keyCode||r.which;
if(8==i||46==i){
var o=this.selection.getRange();
if(o.collapsed){
var a;
if(8==i){
if(1==o.startContainer.nodeType)a=o.startContainer.childNodes[o.startOffset-1];else if(3==o.startContainer.nodeType){
var n=o.startContainer.nodeValue.charAt(o.startOffset-1)||"";
n=n.replace(t.domUtils.fillCharReg,""),n&&(a=o.startContainer);
}
a||(a=d(o.startContainer,"Previous"));
}else if(46==i){
if(1==o.startContainer.nodeType)a=o.startContainer.childNodes[o.startOffset];else if(3==o.startContainer.nodeType){
var n=o.startContainer.nodeValue.charAt(o.startOffset)||"";
n=n.replace(t.domUtils.fillCharReg,""),n&&(a=o.startContainer);
}
a||(a=d(o.startContainer,"Next"));
}
if(a&&l(a)===!0)return this.selection.getRange().selectNode(a).select(!0),r.stopPropagation?(r.stopPropagation(),
r.preventDefault()):r.cancelBubble=!0,!1;
}
}
}
});
}
},
cancelHighline:function(){
this._g.highlineTimeoutId&&(clearTimeout(this._g.highlineTimeoutId),this._g.highlineTimeoutId=null);
var e=this;
this._g.highlineTimeoutId=setTimeout(function(){
e.highLineIframe(!1),e._g.highlineTarget=null,e._g.highlineCacheIframe=[];
},100);
},
getContainer:function(){
return this._o.container;
},
getTitle:function(){
return"添加商品";
},
beforeSetContent:function(e,t){
return i.beforeSetContent({
isPreview:t,
html:e,
clearProduct:this._o.clearProduct
});
},
afterSetContent:function(){
i.afterSetContent({
$dom:$(this.editor.getUeditor().body)
});
},
getPluginData:function(e){
var t=e.init(),r=t.get("content");
if(r=r.replace(y.iframeReg,y.iframeRegReplace),this._o.clearProduct===!0){
var i=$("<div>").html(r);
return i=this.filterData(i),r=i.html(),t.set("content",r),t;
}
if(/<mpproduct\s/.test(r)){
var i=$("<div>").html(r),o=[];
i.find("mpproduct").each(function(){
var e=$(this),t=e.parents("p");
if(t&&t.length>0)for(var r=0,i=t.length;i>r;r++)o.push(t[r]);
e.attr("style",y.productStyleText),e.removeAttr("src");
});
for(var a=0,n=o.length;n>a;a++){
var c=o[a];
c&&1==c.nodeType&&"p"==c.nodeName.toLowerCase()&&c.parentNode&&$(c).replaceTagName("section");
}
r=i.html();
}
return t.set("content",r),t;
},
filterData:function(e){
return r(e);
},
highLineIframe:function(e){
var t=this._g.highlineCacheIframe;
if(t){
{
this.initHighlineDom();
}
e?(this.showHighlineDom(),this.attachToHighline(t)):this.hideHighlineDom();
}
},
initHighlineDom:function(){
if(this._g.highlineDom)return this._g.highlineDom;
var e=this.editor.getUeditor(),t=document.createElement("div");
return t.id=e.ui.id+"_product_highline",t.style.cssText="position: absolute;left: 72px;border: 2px solid #43b548;box-sizing: border-box;right: 72px;display:none;z-index:"+e.options.zIndex+";",
e.ui.getDom().appendChild(t),this._g.highlineDom=t,t;
},
showHighlineDom:function(){
this._g.highlineDom.style.display="block";
},
hideHighlineDom:function(){
this._g.highlineDom.style.display="none";
},
attachToHighline:function(e){
if(e&&0!=e.length){
var t=UE.ui.uiUtils,r=this.editor.getUeditor(),i=this.editor.getDomUtils(),o=this._g.highlineDom,a=e[0],n=e[e.length-1],c=i.getXY(a),d=t.getClientRect(a),l=t.getClientRect(n),s=i.getXY(r.iframe),u=i.getXY(this._g.highlineDom.parentNode);
i.setStyles(o,{
height:l.bottom-d.top+"px",
top:s.y+c.y-r.document.body.scrollTop-u.y-parseInt(o.style.borderTopWidth)+"px"
});
}
},
pickColor:function(e,t,r){
if(m.validColor(t)){
e.find("input").val(t),e.find(".js_fail").hide();
var i=_.get(y.cacheProductKey)||{},o=[];
i.color&&(o=i.color||[]);
var a=o.length>0?","+o.join(",")+",":"",n=","+y.defaultColorList.join(",")+",",c=","+t+",";
return-1!=n.indexOf(c)||a&&-1!=a.indexOf(c)||(o.unshift(t),o.length>y.colorCacheMax&&o.splice(y.colorCacheMax),
i.color=o,_.set(y.cacheProductKey,i)),this.changeProductColor(t,r),!0;
}
return!1;
},
changeProductColor:function(e,t){
var r=m.validColor(e);
if(r){
y.curColor=e;
var i=$(this.editor.getUeditor().body),o=0,a=0,n=[];
i.find("."+y.className).each(function(){
var r=$(this);
r.attr("data-color",e),n.push(r),t&&this===t&&(a=o),o++;
});
var c=[];
if(a>0){
c.push(n[a]);
for(var d=a-1,l=a+1;d>=0||l<n.length;)n[d]&&c.push(n[d]),n[l]&&c.push(n[l]),d--,
l++;
}else c=n;
this.editor.fireEvent("saveScene"),f.createAsynIframeReload(c);
}
},
createIframeReadyFunc:function(){
var e=this.editor.getUeditor().uid;
f.createIframeReadyFunc({
uid:y.iframeUid,
force:!0,
editorId:e,
notClear:!0,
iframeSelect:!0,
onIframeReadyFunc:function(e,t,r){
return function(i){
var o=function(){
var o=t(i.iframe);
o&&(i.doc.body.innerHTML=o,r(i.iframe,i.doc.body,e));
};
y.hasTemplateData===!0?o():y.afterTemplateQueue.push(o);
};
}(e,m.getIframeContentByIframe,m.addIframeImgLoadEvent)
});
},
insertHtml:function(e){
var t=m.getTemplateDataById(e.templateId);
if(t&&t.loop){
var r=_.get(y.cacheProductKey)||{};
r.templateId=e.templateId,_.set(y.cacheProductKey,r),y.curTemplateId=e.templateId;
var i=[],o=[],a=[],n=[];
if(2==e.type)i=[].concat(e.productData.splice(0,e.smartNum)),a.push(i),n.push(e.productId);else for(i=[].concat(e.productData),
o=[].concat(e.productId);i.length>0;)a.push(i.splice(0,t.loop)),n.push(o.splice(0,t.loop));
for(var c=[],d=0,l=a.length;l>d;d++){
var s=["<section>","","</section>"];
s[1]=this.createLocalIframe({
type:e.type,
productData:a[d],
templateId:e.templateId,
productId:n[d],
packId:e.packId,
smartNum:e.smartNum,
color:e.color||y.curColor
}),c.push(s.join(""));
}
c=c.join("").replace(/<iframe /g,"<mpproduct ").replace(/<\/iframe>/g,"</mpproduct>");
var u=this.editor.execCommand("insertHtml",c),p=[];
$(u).find("mpproduct").each(function(){
var e=$(this),t=e.attr("data-uid")||"";
t||(t=f.getuid(),e.attr("data-uid",t)),e.attr("src",f.getIframeSrc(t,y.iframeUid)),
p.push(e);
}),f.createAsynRenderIframe(p);
}
},
createLocalIframe:function(e){
return function(e,t,r){
return f.createLocalIframe({
noSrc:!0,
uid:t,
attr:{
" frameborder":"0",
"class":r,
"data-product":encodeURIComponent(JSON.stringify({
productData:e.productData
})),
"data-pid":encodeURIComponent(e.productId.join(m.pidSplitKey)),
"data-type":e.type,
"data-templateid":e.templateId,
"data-packid":e.packId,
"data-smartnum":e.smartNum,
"data-color":e.color,
style:y.productStyleText
}
});
}(e,y.iframeUid,y.className);
},
getCurProductCount:function(){
var e=$(this.editor.getUeditor().body),t=0;
return e.find("."+y.className).each(function(){
var e=$(this),r=e.attr("data-type"),i=1*e.attr("data-smartnum"),o=e.attr("data-pid")||"";
try{
o=decodeURIComponent(o);
}catch(a){}
t+=2==r?i:o.split(m.pidSplitKey).length;
}),t;
},
getNotRenderProductCount:function(){
return $(this.editor.getUeditor().body).find("mpproduct").length;
},
showPopup:function(e){
e.getUeditor();
e.addListener("mouseover_common_popup",function(e,t,r){
var i=r.target||r.srcElement;
if(l(i)===!0){
var o=_.get(y.cacheProductKey)||{};
o=o.color?o.color||[]:[],o=[].concat(o,y.defaultColorList);
var a=y.PopupIconTplCompile({
list:o
});
t.html+=y.PopupTplCompile({
colorList:a
}),t.adjust=!0,t.node=i;
}
});
},
getProductIframeFromRange:function(e,t){
if(e){
var r=e[t+"Container"];
if(r&&1==r.nodeType){
var i=r.childNodes[e[t+"Offset"]];
if(i&&1==i.nodeType){
if(l(i)===!0)return i;
for(var o,a=i.getElementsByTagName("iframe"),n=0,c=a.length;c>n;n++){
var d=a[n];
if(l(d)===!0){
o=d;
break;
}
}
return o;
}
}
}
},
showProductTemplateDialog:function(e){
var t=m.getOptionsFromIframe(e);
if(t&&t.templateId){
var r=t.productData;
if(r&&r.length>0){
{
var i=this;
t.type;
}
new m.myclass({
color:y.curColor||"",
templateId:t.templateId,
productData:r[0],
editor:this.editor,
callback:function(t){
var r=i.editor.getDomUtils(),o=i.getNeighbor(e);
if(o&&o.opts&&o.iframeList&&0!=o.iframeList.length){
o.opts.templateId=t.id;
for(var a=this.editor.getUeditor(),n=o.iframeList.length-1;n>=0;n--){
var d=o.iframeList[n];
if(0==n){
var l=a.selection.getRange().selectNode(d).select();
l&&l.collapse(!0);
}
var s=d.parentNode;
if($(d).remove(),s&&!r.isBody(s)){
var u=c()(s);
if(u===!1){
if(0==n){
var l=a.selection.getRange().selectNode(s).select();
l&&l.collapse(!0);
}
$(s).remove();
}
}
}
i.insertHtml(o.opts);
}
}
});
}
}
},
getNeighbor:function(e){
var t=(this.editor.getDomUtils(),{
iframeList:[],
opts:null
});
if(!e)return t;
var r=e.getAttribute("data-uid"),i=$(this.editor.getUeditor().body);
if(e=i.find("."+y.className+"[data-uid="+r+"]"),!r||!e||0==e.length)return t;
if(e=e[0],t.opts=m.getOptionsFromIframe(e),!t.opts)return t;
var a=1*e.getAttribute("data-type");
if(2===a)return t.iframeList.push(e),t;
var n=0,c=void 0,d=[];
if(i.find("."+y.className).each(function(){
this===e&&(c=n),n++,d.push(this);
}),"undefined"==typeof c)return t;
for(var l=[],s=c-1;s>=0&&1*d[s].getAttribute("data-type")!==2;s--)l.push(d[s]);
l.reverse();
for(var u=[],s=c+1,p=d.length;p>s&&1*d[s].getAttribute("data-type")!==2;s++)u.push(d[s]);
var f=[].concat(l,d[c],u);
c=l.length;
var h={},g={
Previous:{
ratio:-1
},
Next:{
ratio:1
}
};
for(var v in g){
var a=v;
h[a]=[];
for(var _=g[v].ratio,n=c+_,C=f[c],I=f[n];I&&o(C,I,a)===!0;)h[a].push(I),C=I,n+=_,
I=f[n];
}
h.Previous.reverse(),t.iframeList=[].concat(h.Previous,f[c],h.Next),t.opts.productData=this.mergeProduct(t.iframeList);
for(var T=[],s=0,p=t.opts.productData.length;p>s;s++)T.push(t.opts.productData[s].pid);
return t.opts.productId=T,t;
},
mergeProduct:function(e){
for(var t=[],r=0,i=e.length;i>r;r++){
var o=m.getOptionsFromIframe(e[r]);
o&&o.productData&&(t=t.concat(o.productData));
}
return t;
}
},f.initEventInterface(i),i;
});