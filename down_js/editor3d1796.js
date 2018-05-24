define("common/wx/mpEditor/editor.js",["widget/ueditor_new/themes/default/ueditor.css","widget/ueditor_new/themes/default/css/ueditor.css","widget/tooltip.css","tpl/mpEditor/layout.html.js","common/wx/mpEditor/plugin/filter.js","common/wx/mpEditor/contextmenu.js","common/wx/mpEditor/editor_options.js","common/wx/mpEditor/plugin/popup.js","common/wx/mpEditor/plugin/remoteimg.js","common/wx/mpEditor/plugin/scaleimg.js","common/wx/mpEditor/plugin/cropimg.js","tpl/tooltip.html.js","media/report.js","biz_common/utils/monitor.js"],function(t){
"use strict";
function e(t){
this.__o={
needPopup:!0,
imgScale:!0,
scaleimgWheelScroll:!1,
cropimgWheelScroll:!1,
plugins:[],
onReady:function(){}
},this.__ueditor_config={
pluginsContainer:{},
debug:0,
layout:"",
is_illegal:0,
contextMenu:r,
UEDITOR_HOME_URL:g.URL,
isShow:!0,
canChangeIframeHeight:!0,
initialContent:"",
autoClearinitialContent:!1,
iframeCssUrl:wx.EditorRes.iframe,
textarea:"editorValue",
focus:!1,
minFrameWidth:800,
minFrameHeight:400,
autoClearEmptyNode:!0,
fullscreen:!1,
readonly:!1,
zIndex:999,
imagePopup:!0,
enterTag:"p",
pageBreakTag:"_baidu_page_break_tag_",
customDomain:!0,
lang:g.LANG,
theme:"default",
allHtmlEnabled:!1,
scaleEnabled:!1,
wordCount:!1,
elementPathEnabled:!1,
autoHeightEnabled:!1,
autoFloatEnabled:!0,
sourceEditor:"textarea",
imageUrl:"/cgi-bin/uploadimg2cdn?t=ajax-editor-upload-img&lang="+g.LANG+"&token="+g.TOKEN,
imagePath:"",
compressSide:1,
catchRemoteImageEnable:!0,
catcherUrl:"/cgi-bin/uploadimg2cdn?lang="+g.LANG+"&token="+g.TOKEN,
separater:"",
toolbars:[["more","|","fontsize","|","blockquote","horizontal","|","removeformat"],["bold","italic","underline","forecolor","backcolor","|","justifyleft","justifycenter","justifyright","justifyindent","|","rowspacingtop","rowspacingbottom","lineheight","letterspacing","|","insertorderedlist","insertunorderedlist","|","imagenone","imageleft","imageright","imagecenter"]],
labelMap:{
anchor:"",
undo:""
},
topOffset:0
},this.__init(t);
}
function n(t){
if(!t)return null;
for(var e=0,n=g.allEditor.length;n>e;e++)if(t===g.allEditor[e].getWindow())return g.allEditor[e];
return null;
}
t("widget/ueditor_new/themes/default/ueditor.css"),t("widget/ueditor_new/themes/default/css/ueditor.css"),
t("widget/tooltip.css");
var i=t("tpl/mpEditor/layout.html.js"),o=t("common/wx/mpEditor/plugin/filter.js"),r=t("common/wx/mpEditor/contextmenu.js"),a=t("common/wx/mpEditor/editor_options.js"),u=t("common/wx/mpEditor/plugin/popup.js"),s=t("common/wx/mpEditor/plugin/remoteimg.js"),l=t("common/wx/mpEditor/plugin/scaleimg.js"),d=t("common/wx/mpEditor/plugin/cropimg.js"),c=t("tpl/tooltip.html.js"),f=t("media/report.js"),m=t("biz_common/utils/monitor.js"),g={
allEditor:[],
LANG:window.wx.data.lang,
TOKEN:window.wx.data.t,
URL:/^dev/.test(location.host)?"/mpres/htmledition/style/widget/ueditor_new/":"//res.wx.qq.com/mpres/htmledition/style/widget/ueditor_new/"
};
return e.prototype={
__init:function(t){
this.__g={
id:+new Date,
asynList:{}
},this.__extend(t),this.__extendPlugins(),this.__registerPlugins(),this.__createEditor(),
this.__initReport(),this.__initPulginEvent(),new s(this),this.__customEventHandle(),
g.allEditor.push(this);
},
__extendPlugins:function(){
var t=this.__o;
t.imgScale&&t.plugins.push(new l({
wheelScroll:t.scaleimgWheelScroll
})),t.needPopup&&t.plugins.push(new d({
coverWheelScroll:t.cropimgWheelScroll
}));
},
__initReport:function(){
var t=this;
this.addListener("funcPvUvReport",function(e,n,i){
t.funcPvUvReport(n,i);
}),this.addListener("reportAddNum",function(t,e,n,i){
f.addNum(e,n,i);
}),this.addListener("getCommonReportIDKey",function(e,n){
if(!n)return null;
var i;
i="[object String]"==Object.prototype.toString.call(n)?[n]:n;
for(var o=t.getUeditor(),r=o.options.commonReportConf,a=r,u=0,s=n.length;s>u&&(a=a[n[u]],
a);u++);
if(a){
var l=a.split("_");
return{
id:l[0],
key:l[1]
};
}
return null;
});
},
__extend:function(t){
var e=this.__ueditor_config,n=this.__o,o=a.getOptions();
for(var r in o)o.hasOwnProperty(r)&&(e[r]=o[r]);
for(var r in t)n.hasOwnProperty(r)?n[r]=t[r]:e.hasOwnProperty(r)&&(e[r]=t[r]);
e.layout||(e.layout=i),e.layout=template.compile(e.layout);
},
__registerPlugins:function(){
for(var t=this,e=this.__o.plugins,n=0,i=e.length;i>n;n++){
var o=e[n];
!function(e){
var n=e.getName();
t.__ueditor_config.pluginsContainer[n]=function(){
var i=this;
"function"==typeof e.beforeDefineCommand&&e.beforeDefineCommand(i,t),"function"==typeof e.getExecCommand&&(i.commands[n]={
execCommand:e.getExecCommand(),
noCommandReprot:"function"==typeof e.noCommandReprot?e.noCommandReprot():!1
}),"function"==typeof e.getQueryCommandState&&(i.commands[n].queryCommandState=e.getQueryCommandState()),
"function"==typeof e.getQueryCommandValue&&(i.commands[n].queryCommandValue=e.getQueryCommandValue());
},t.__setPluginMenu(e),t.__pluginPerformance(e);
}(o);
}
},
__setPluginMenu:function(t){
var e=this.__ueditor_config.contextMenu;
"function"==typeof t.getContextMenu&&e.push("-",t.getContextMenu());
},
__pluginPerformance:function(t){
var e=0;
switch("function"==typeof t.getType&&(e=t.getType()||0),e){
case 0:
this.__ceateDefaultBtn(t);
break;

case 1:
this.__createToolBarBtn(t);
}
},
__ceateDefaultBtn:function(t){
var e=this;
if("function"==typeof t.getContainer){
var n=t.getContainer();
if(n){
var i=$(n),o=t.getName();
i&&i.length>0&&i.click(function(){
e.execCommand(o);
});
}
}
},
__createEditor:function(){
var t=this,e=this.__o,n=this.__ueditor_config;
n.onready=function(){
e.onReady.call(t,t.ueditor);
},this.ueditor=new UE.ui.Editor(n),this.ueditor.ready(function(){
t.__initToolbarTips(),e.needPopup&&(t.__g.editorPopup=new u(t));
});
},
__initToolbarTips:function(){
if(this.__ueditor_config.toolbars&&0!=this.__ueditor_config.toolbars.length){
var t=this.__g;
t.toolbarsTips=$(template.compile(c)({
content:""
})),t.toolbarsTips.hide(),$("body").append(t.toolbarsTips),$(this.ueditor.container).find("[id*=_toolbarboxouter]").on("mouseover",function(e){
var n=$(e.target||e.srcElement),i=n.parents("div[data-tooltip]");
if(1==i.length){
var o=i.data("tooltip");
if(o){
t.toolbarsTips.find(".tooltip_inner").html(o);
var r=i.offset();
t.toolbarsTips.css({
top:r.top-5-t.toolbarsTips.height(),
left:r.left+i.width()/2-t.toolbarsTips.width()/2
}).show();
}
}
}).on("mouseout",function(e){
0==$(e.toElement).parents("div[data-tooltip]").length&&t.toolbarsTips.hide();
});
}
},
__initPulginEvent:function(){
for(var t=this,e=this.__o.plugins,n=0,i=e.length;i>n;n++){
var o=e[n];
o.editor=this,"function"==typeof o.addListener&&o.addListener(t);
}
},
__createToolBarBtn:function(t){
if("function"==typeof t.initToolBar)return void t.initToolBar(this);
var e="";
"function"==typeof t.getTitle&&(e=t.getTitle()||"");
var n=t.getName(),i=this.getUi();
i[n]=function(t){
return function(n){
var o=new i.Button({
className:"edui-for-"+t,
title:e,
onclick:function(){
n.execCommand(t);
},
theme:n.options.theme,
showText:!1
});
return i.buttons[t]=o,n.addListener("selectionchange",function(e,i,r){
var a=n.queryCommandState(t);
-1==a?(o.setDisabled(!0),o.setChecked(!1)):r||(o.setDisabled(!1),o.setChecked(a));
}),o;
};
}(n);
},
__customEventHandle:function(){
var t=this;
t.addListener("focus keyup aftersetcontent",function(e,n){
if(t.getDom("contentplaceholder").style.display="none","keyup"===e){
var i=n.charCode||n.keyCode;
switch(i){
case 13:
case 49:
case 190:
case 191:
m.setSum(59475,4,1),m.send();
}
}
}),t.addListener("blur",function(){
""==t.ueditor.getContent().trim()&&(t.getDom("contentplaceholder").style.display="block");
}),t.addListener("checkdomAsynList",function(){
return t.checkdomAsynList();
}),t.addListener("handleWinScroll",function(t,e){
document.body.style.overflow=document.documentElement.style.overflow=e?"auto":"hidden";
});
},
destory:function(){
for(var t=this.__o.plugins,e=0,n=t.length;n>e;e++)"function"==typeof t[e].beforeEditorDestory&&t[e].beforeEditorDestory();
this.__g.editorPopup&&this.__g.editorPopup.beforeEditorDestory();
for(var e=0,n=g.allEditor.length;n>e;e++)g.allEditor[e]===this&&g.allEditor.splice(e,1);
this.hasDestory=!0;
},
ready:function(t){
if("function"==typeof t){
{
var e=this;
this.__o;
}
this.ueditor.ready(function(){
t.call(e,e.ueditor),""==e.ueditor.getContent().trim()&&(e.getDom("contentplaceholder").style.display="block");
});
}
},
addListener:function(t,e){
this.ueditor.addListener(t,e);
},
handlerContent:function(t,e){
for(var n=this.__o.plugins,i=0,o=n.length;o>i;i++){
var r=n[i];
"function"==typeof r.beforeSetContent&&(t=r.beforeSetContent(t,e));
}
return t=t.replace(/background\-image:\s*url\(https\:\/\/mp\.weixin\.qq\.com\/cgi\-bin\/appmsg(.*?)\)/g,"");
},
insertTemplate:function(t,e){
e!==!0&&(t=this.handlerContent(t,!1)),this.execCommand("insertHtml",t),this.afterSetContent();
},
afterSetContent:function(){
for(var t=this.__o.plugins,e=0,n=t.length;n>e;e++){
var i=t[e];
"function"==typeof i.afterSetContent&&i.afterSetContent();
}
},
setContent:function(t,e,n){
n!==!0&&(t=this.handlerContent(t,!1)),this.ueditor.setContent(t,e),this.afterSetContent();
},
initPluginData:function(t){
t=t||{};
for(var e=this.__o.plugins,n=0,i=e.length;i>n;n++){
var o=e[n];
if("function"==typeof o.initPluginData){
var r=o.initPluginData();
r=r||[],"string"==typeof r&&(r=[r]);
for(var a=0,u=r.length;u>a;a++)"undefined"==typeof t[r[a]]&&(t[r[a]]="");
}
}
return t;
},
getEditorData:function(t,e){
for(var n=this.__o.plugins,i=0,r=n.length;r>i;i++){
var a=n[i];
"function"==typeof a.beforeGetContent&&a.beforeGetContent();
}
t=t||{},t.content=this.ueditor.getContent(void 0,void 0,void 0,void 0,void 0,e);
for(var i=0,r=n.length;r>i;i++){
var a=n[i];
if("function"==typeof a.getPluginData){
var u=this.getPluginDataTmpl(t);
a.getPluginData({
init:u.init
}),this.fillPluginData(u,t);
}
}
return t.content=t.content.replace(/(<\w+[^>]*)\sid=\"([^\">]*)\"([^>]*>)/g,"$1$3"),
t.content=t.content.replace(/(<[^>]+?style=([\'\"]))([^\2]*?text-decoration-line[\s]*:[^\2]*?)(\2)/gi,function(){
return arguments[1]+arguments[3].replace(/text-decoration-line[\s]*:/g,"text-decoration:")+arguments[4];
}),t.content=o.formatStyle(t.content),t.content=o.formatRedundancyStr(t.content),
t;
},
fillPluginData:function(t,e){
var n=t.getData();
for(var i in n)n.hasOwnProperty(i)&&"undefined"!=typeof e[i]&&(e[i]=n[i]);
},
getPluginDataTmpl:function(t){
var e={
content:t.content||""
};
return{
init:function(t){
t=t||[],"string"==typeof t&&(t=[t]);
for(var n=0,i=t.length;i>n;n++)"undefined"==typeof e[t[n]]&&(e[t[n]]="");
return{
set:function(t,n){
"undefined"!=typeof e[t]&&(e[t]=n);
},
get:function(t){
return e[t];
}
};
},
getData:function(){
return e;
}
};
},
queryCommandValue:function(t){
return this.ueditor.queryCommandValue(t);
},
getSelection:function(){
return this.ueditor.selection;
},
getSelectionRange:function(){
return this.getSelection().getRange();
},
getSelectionStart:function(){
return this.getSelection().getStart();
},
render:function(t){
this.ueditor.render(t);
},
getUeditor:function(){
return this.ueditor;
},
getWindow:function(){
return this.ueditor.window;
},
getDocument:function(){
return this.getWindow().document;
},
execCommand:function(){
var t=this.ueditor;
return t.execCommand.apply(t,arguments);
},
fireEvent:function(){
var t=this.ueditor;
return t.fireEvent.apply(t,arguments);
},
removeListener:function(){
var t=this.ueditor;
return t.removeListener.apply(t,arguments);
},
funcPvUvReport:function(t,e){
f.addPvUv(t,e);
},
getUtils:function(){
return UE.utils;
},
getDomUtils:function(){
return UE.dom.domUtils;
},
getBrowser:function(){
return UE.browser;
},
getUi:function(){
return UE.ui;
},
getDom:function(t){
return this.ueditor.ui.getDom(t);
},
enableToolbar:function(){
var t=this.ueditor.ui.getDom("toolbar_mask");
return t&&(t.style.display="none"),t;
},
disableToolbar:function(){
var t=this.ueditor.ui.getDom("toolbar_mask");
return t&&(t.style.display="block"),t;
},
checkPlugins:function(t){
var e=this.__o.plugins,n=!0;
return $.each(e,function(e,i){
return"function"==typeof i.check?n=i.check(t):!0;
}),n;
},
isHighlight:function(){
return this.ueditor.highlight;
},
getuid:function(){
return this.__g.id++;
},
delegateDomAsyn:function(t){
function e(){
var t,e,n={
newDom:null,
tempDoc:null
},r=u.uid;
if(u.article){
var a=u.article;
if(o.fireEvent("is_article_alive",a)!==!0)return n;
var s=a.data("article").data,l=o.fireEvent("is_article_editing",a);
if(l)e=$(i.getDocument()).find("[data-asynid="+r+"]");else{
t=$("<div>");
var d=s.get("content");
if(!d)return n;
e=t.html(d).find("[data-asynid="+r+"]");
}
}else e=$(i.getDocument()).find("[data-asynid="+r+"]");
return e&&0!=e.length?(n.newDom=e,n.tempDoc=t||null,n):n;
}
function n(){
if(u){
var e=u.newDom;
try{
if(!e)return delete i.__g.asynList[u.uid],void(i.checkdomAsynList()===!0&&(o.fireEvent("draft_force_save"),
o.fireEvent("domasyn_all_complete")));
if(e.removeClass("js_asyningdom").removeAttr("data-asynid").data("asynid",""),delete i.__g.asynList[u.uid],
u.tempDoc){
var n=u.tempDoc.html();
if(n){
var r=u.article.data("article").data;
r.set("content",n),r.setData(r.getData());
}
}
i.checkdomAsynList()===!0&&(o.fireEvent("draft_force_save"),o.fireEvent("domasyn_all_complete")),
t.requsetFailFun=null,t.requsetSucFun=null,t.requsetFun=null,u=null;
}catch(a){}
}
}
var i=this,o=i.ueditor;
if(t.dom&&"function"==typeof t.requsetFun){
var r=t.requsetFailFun||function(){},a=t.requsetSucFun||function(){},u=this.setDomAsynTag({
dom:t.dom
});
u&&(t.__hasHandle=!1,t.requsetSucFun=function(){
if(this.__timeoutid&&clearTimeout(this.__timeoutid),this.__hasHandle!==!0){
this.__hasHandle=!0;
try{
var i=Array.prototype.slice.call(arguments),o=e();
u.newDom=o.newDom,u.tempDoc=o.tempDoc,i.unshift(u),a.apply(t,i);
}catch(r){
throw r;
}
n();
}
},t.requsetFailFun=function(){
if(this.__timeoutid&&clearTimeout(this.__timeoutid),this.__hasHandle!==!0){
this.__hasHandle=!0;
try{
var i=Array.prototype.slice.call(arguments),o=e();
u.newDom=o.newDom,u.tempDoc=o.tempDoc,i.unshift(u),r.apply(t,i);
}catch(a){
throw a;
}
n();
}
},t.timeout&&(t.__timeoutid=setTimeout(function(){
"function"==typeof t.requsetFailFun&&t.requsetFailFun();
},1*t.timeout)),t.requsetFun());
}
},
checkdomAsynList:function(){
var t=0;
for(var e in this.__g.asynList)if(this.__g.asynList.hasOwnProperty(e))return t++,
!1;
return t>0?!1:!0;
},
setDomAsynTag:function(t){
var e=this.ueditor,n=this.getuid()+"",i=this.__g.asynList,o=e.fireEvent("get_current_article");
if(!t.dom)return!1;
var r=$(t.dom),a=r.attr("data-asynid")||r.data("asynid")||"";
if(a&&i[a]){
if(t.force!==!0)return!1;
delete i[a];
}
n=a||n;
var u=i[n]={
article:o,
uid:n
};
return r.addClass("js_asyningdom").attr("data-asynid",n),u;
},
setHistory:function(t){
var e=this.getUeditor().undoManger;
if(!e)return!1;
if(!t)return e.reset(),this.fireEvent("saveScene"),!0;
var n=t.list;
if("[object Array]"!==Object.prototype.toString.call(n)||0==n.length)return e.reset(),
!0;
var i=t.index;
return("undefined"==typeof i||0>i||i>n.length-1)&&(i=n.length-1),e.list=n,e.index=i,
e.clearKey(),e.update(),!0;
},
getHistory:function(){
var t=this.getUeditor().undoManger;
return t?{
list:JSON.parse(JSON.stringify2(t.list)),
index:t.index
}:null;
},
changeUeditorConf:function(t){
if(t.key&&t.value&&t.key.length==t.value.length)for(var e=0,n=t.key.length;n>e;e++)"undefined"!=typeof this.ueditor.options[t.key[e]]&&this.ueditor.options[t.key[e]]!==t.value[e]&&("function"==typeof this["beforeUeditorConf_"+t.key[e]+"_change"]&&this["beforeUeditorConf_"+t.key[e]+"_change"](),
this.ueditor.options[t.key[e]]=t.value[e],"function"==typeof this["afterUeditorConf_"+t.key[e]+"_change"]&&this["afterUeditorConf_"+t.key[e]+"_change"]());
},
afterUeditorConf_debug_change:function(){
this.ueditor.eventLog=this.ueditor.eventLog?null:[];
}
},function(t){
t.__editorIframeSelect=function(t){
if(t&&t.parent&&t.parent.window){
var e=n(t.parent.window);
if(e)for(var i=e.getDocument(),o=i.getElementsByTagName("iframe"),r=0,a=o.length;a>r;r++){
var u=o[r];
if(u.contentWindow===t){
var s=new UE.dom.Range(i);
s.selectNode(u).select(),e.fireEvent("iframeSelected"),e.fireEvent("selectionchange",!0);
break;
}
}
}
};
}(window),e;
});