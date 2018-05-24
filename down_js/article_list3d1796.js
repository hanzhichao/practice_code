define("media/article_list.js",["common/wx/media/previewDialog.js","media/common.js","common/wx/media/shareCopyrightDialog.js","common/wx/media/keywordDialog.js","biz_common/utils/wxgspeedsdk.js","common/qq/events.js","common/wx/mpEditor/common/base_class.js","common/wx/time.js","biz_web/lib/store.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/popover.js","common/wx/mpEditor/plugin/remoteimg.js","common/wx/mpEditor/plugin/filter.js","biz_common/moment.js","media/media_cgi.js","media/article_interface.js","media/draft.js","media/report.js","media/preview.js"],function(e){
"use strict";
function t(){
if("-1"==D.navigatorType)return"";
if(!D.navigatorType){
var e=window.navigator.userAgent;
D.navigatorType=/360se/i.test(e)?"360":/metasr/i.test(e)?"搜狗":/LBBROWSER/i.test(e)?"猎豹":/QQBrowser/i.test(e)?"QQ":/Edge/i.test(e)?"Edge":/Opera/i.test(e)||/Opr\//i.test(e)?"Opera":/chrome/i.test(e)?"Chrome":/Safari/i.test(e)?"Safari":/Firefox/i.test(e)?"Firefox":/MSIE/i.test(e)||/Trident\//i.test(e)?"IE":"-1";
}
return D.navigatorType;
}
function i(e){
var t=e&&e.multi_item;
return t&&t.length?($.each(t,function(e,t){
$.each(t,function(e,i){
i.html&&(t[e]=i.html(!1));
});
}),t):null;
}
function r(e,t,i){
(t||1)>k&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:e,
level:i||"error",
content:"[file=media/appmsg_edit]"
});
}
var a=e("common/wx/media/previewDialog.js"),n=e("media/common.js"),o=(e("common/wx/media/shareCopyrightDialog.js"),
e("common/wx/media/keywordDialog.js")),s=e("biz_common/utils/wxgspeedsdk.js"),c=e("common/qq/events.js")(!0),l=e("common/wx/mpEditor/common/base_class.js"),f=e("common/wx/time.js"),u=e("biz_web/lib/store.js"),m=e("common/wx/Tips.js"),p=e("common/wx/dialog.js"),_=e("common/wx/popover.js"),v=e("common/wx/mpEditor/plugin/remoteimg.js"),g=(e("common/wx/mpEditor/plugin/filter.js"),
e("biz_common/moment.js")),h=e("media/media_cgi.js"),w=e("media/article_interface.js"),y=e("media/draft.js"),x=e("media/report.js"),b=e("media/preview.js"),j=["一","二","三","四","五","六","七","八","九","十"],D={
navigatorType:"",
debug:window.location.href.indexOf("&_debug=1")>0?!0:!1,
draftTipsreportList:["2397429400","3086281409","2398460220"]
},k=Math.random(),E=n.eq,T=l.inherit({
init:function(e){
var t=this;
if($.extend(!0,t,e),t.editor=t.ueditor,t.domUtils=t.editor.getDomUtils(),t._g={
delPopover:null
},t.opt=e,t.data_seq=(e.appmsg_data.data_seq||"0")+"",t.activeData=!1,t.crop_img_ing=!1,
t.$list=$(e.appmsg_selector),t.canAddArticleMoveLog=-1,t.isshare=1!=wx.cgiData.share||e.app_id?0:1,
t.gid=0,t.readOnlyType=0,t.defineEvent(),t.is_illegal)t.draft=null,t.readOnlyType="3_1",
t.list=i(e.appmsg_data);else if(t.is_rumor)t.draft=null,t.readOnlyType="3_2",t.list=i(e.appmsg_data);else if(1==wx.cgiData.conflict){
t.readOnlyType="3_3",t.draft=null,t.list=y.getReadOnlyDraft(e.app_id),y.clearReadOnlyDraft(e.app_id);
var r="65080_99_1";
t.list||(r+=";65080_100_1"),x.logReport(r,"","img");
}else wx.cgiData.bizmediaid?(t.draft=null,t.readOnlyType="1_6",t.list=i(e.appmsg_data)):(t.ueditor.fireEvent("reportAddNum",65080,107,1),
t.draft=new y.constructor(e.app_id,t.data_seq,t.ueditor),e.app_id||t.data_seq&&"0"!=t.data_seq?(t.list=i(e.appmsg_data),
t.draft.seq=t.data_seq,t.conflict_ls_seq=t.conflict_ls_seq):t.list=!1);
t._bindEvent(),t.list?($.each(t.list,function(e,i){
t.add({
data:i,
isNew:!1
}),t.select(e,0,1);
}),wx.cgiData.bizmediaid?(t.select(wx.cgiData.idx,0,1),$("#nav").text(wx.cgiData.appmsg_data.history_time?"正在查看历史版本："+g.unix(wx.cgiData.appmsg_data.update_time).format("YYYY-MM-DD HH:mm:ss")+"由"+(wx.cgiData.appmsg_data.operator_name||"未知")+"保存":"正在查看历史版本")):t.select(0,0,1)):1!=t.isshare?(t.add({
isNew:!0
}),t.select(0,0,1)):t.createArticle({
type:9,
onCancel:function(){
t.add({
isNew:!0
}),t.select(0,0,1);
}
}),t.lastData=t.getData()||!1,t.hasConfirmed=!1,1!=t.isshare&&(t._renderReadOnly(),
t._warnDraft()),t._initDraftSyn(),t.renderCreateBtn();
},
_deserializeReadOnlyType:function(){
var e={
right:0,
index:0
};
if(this.readOnlyType){
var t=this.readOnlyType.split("_");
return e.right=1*t[0],e.index=1*t[1],e;
}
return e;
},
_warnDraft:function(){
var e=this;
if(this.draft&&this.draft.data){
if(E(this.lastData,this.draft.data))return void e.draft.clear();
e.ueditor.fireEvent("reportAddNum",65080,108,1);
var t=!0;
1*!e.app_id&&1*!e.draft.seq&&(t=!1),e.readOnlyType="0_5";
{
y.saveReadOnlyDraft(this.draft.data,e.app_id||0,e.draft.seq||0);
}
e.draft.clear();
var i=e._deserializeReadOnlyType();
e.ueditor.fireEvent("renderReadOnly",{
right:i.right,
type:i.index,
showTips:t
});
try{
var r=window.wx.data.uin;
if(D.debug||50==Math.floor(100*Math.random())||(","+D.draftTipsreportList.join(",")+",").indexOf(","+r+",")>=0){
var a=["draft_tips_",r,";time:",+new Date,";uin:",window.wx.data.uin||"",";app_id:",e.app_id||"",";service_ori:",JSON.stringify(e.list),";service:",JSON.stringify(e.lastData),";draft:",JSON.stringify(d)].join("");
x.logReport("",a,"ajax"),u.set("draft_tips",a),console.log("draft_tips,service:"),
console.log(e.lastData),console.log("draft_tips,draft:"),console.log(d);
}
}catch(n){}
}
},
_initDraftSyn:function(){
function e(){
r.surportFocusReport||(r.ueditor.fireEvent("reportAddNum",65080,95,1),r.surportFocusReport=!0),
r.surportWinFocus=!0,t();
}
function t(){
o&&(clearTimeout(o),o=null),r.draft&&r.draft.active();
}
function i(){
o||(o=setTimeout(function(){
if(o=null,r.draft&&0!=r.draft.activeId&&("function"!=typeof document.hasFocus||document.hasFocus()!==!0&&r.ueditor.getDocument().hasFocus()!==!0)){
var e=r.activeData||!1,t=r.getData()||!1,i=r.ueditor.fireEvent("checkRemoteList"),a=r.ueditor.fireEvent("checkdomAsynList");
if(r._saving===!0||r.crop_img_ing===!0||i!==!0||a!==!0);else if(!E(e,t)){
r.draft.save(t,1);
}
r.draft.silent(),r.activeData=!1;
}
},200));
}
var r=this,a=r.ueditor.getWindow(),o=null;
if(r.draft){
this.ueditor.fireEvent("reportAddNum",65080,94,1),r.ueditor.addListener("syn_draft",function(){
if(r.draft&&r.draft.data){
var e=r.draft.data||!1,t=r.ueditor.fireEvent("checkRemoteList"),i=r.ueditor.fireEvent("checkdomAsynList");
if(!D.debug&&r.draft&&r._saving!==!0&&r.crop_img_ing!==!0&&0!=r.draft.activeId&&t===!0&&i===!0&&!E(r.activeData||!1,e)&&"gt"!=n.dataSeqCompare(r.data_seq,r.draft.seq)){
r.ueditor.fireEvent("reportAddNum",65080,105,1);
var a,o=0;
r.$current&&(o=r.$current.index()||0,a=r.ueditor.getSelectionRange().createDomAddress(!1,!0));
for(var s=r.$list.find(".js_appmsg_item"),d=[],c=[];s.length>0;){
r.select(0,0,1),r.ueditor.fireEvent("saveScene");
var l=r.remove(0,!0);
d.push(l.getHistory()||null),c.push(l.getScrollTop()||0),s=r.$list.find(".js_appmsg_item");
}
r.list=r.draft.data,r.data_seq=r.draft.seq,r.lastData=r.list,$.each(r.list,function(e,t){
var i=r.add({
data:t,
isNew:!1
}),a=i.data("article");
a&&(d&&d[e]&&a.setHistory(d[e]),c&&"undefined"!=typeof c[e]&&a.setScrollTop(c[e])),
i.data("article",a),r.select(e,0,1),r.ueditor.fireEvent("saveScene");
});
var f=r.$list.find(".js_appmsg_item").length;
r.select(Math.min(o,f-1)),r.renderCreateBtn(),setTimeout(function(){
r.activeData=r.getData(),a&&r.ueditor.getSelectionRange().moveToDomAddress(a,!1).select(!0);
},0);
}
}
}),this.ueditor.addListener("active_state_change",function(){
r.draft&&(0==r.draft.activeId?r._clearIntervalSave():r.draft.activeId>0&&(r._activeIntervalSave(),
r.activeData=r.getData()));
});
var s,d;
"undefined"!=typeof document.hidden?(s="hidden",d="visibilitychange"):"undefined"!=typeof document.msHidden?(s="msHidden",
d="msvisibilitychange"):"undefined"!=typeof document.webkitHidden?(s="webkitHidden",
d="webkitvisibilitychange"):"undefined"!=typeof document.mozHidden&&(s="mozHidden",
d="mozvisibilitychange"),s&&r.ueditor.fireEvent("reportAddNum",65080,102,1),$(document).on("visibilitychange",function(){
document[s]&&i();
}),$(window).on("focus",e),$(a).on("focus",e),$(window).on("blur",i),$(a).on("blur",i);
var c="before_add_article before_del_article focus mousedown keydown";
r.ueditor.addListener(c,t),r.ueditor.addListener("blur",i),"function"==typeof document.hasFocus?(r.ueditor.fireEvent("reportAddNum",65080,97,1),
r.surportHasFocus=!0,setTimeout(function(){
try{
(r.draft&&document.hasFocus()===!0||r.ueditor.isReady&&r.ueditor.getDocument().hasFocus()===!0)&&(r.draft.active(!0),
r.activeData=r.getData());
}catch(e){
r.surportHasFocus=!1;
}
},0)):(r.activeData=r.getData(),r.surportHasFocus=!1);
}
},
_renderReadOnly:function(e,t,i){
var r=this,a=r._deserializeReadOnlyType();
if(4==a.index){
var n=r.getData()||!1;
r.draft=null,y.clear(r.app_id),y.saveConflict(n,r.app_id,r.data_seq,r.conflict_ls_seq);
}
1&a.right&&r.ueditor.fireEvent("renderReadOnly",{
right:a.right,
type:a.index,
time:e||"",
name:t||"",
ua:i||""
});
},
_clearIntervalSave:function(){
this.draftSaveId&&clearInterval(this.draftSaveId);
},
_activeIntervalSave:function(){
var e=this;
e._clearIntervalSave(),this.draftSaveId=setInterval(function(){
if(e._clearIntervalSave(),e.draft){
var t=e.getData()||!1;
E(e.lastData,t)||e.draft.save(t);
}
e._activeIntervalSave();
},6e4);
},
defineEvent:function(){
var e=this;
this._g.event={
delPopoverScroll:function(){
e._g.delPopover&&e._g.delPopover.resetPosition();
}
};
},
_bindEvent:function(){
var e=this;
e.$list.on("click",".js_appmsg_item",function(){
var t=$(this).closest(".js_appmsg_item").index();
t!=e.$current.index()&&e.select(t),wx.cgiData.idx=t;
}),e.$list.on("click",".js_del",function(){
if(e._saving!==!0&&e.ueditor.fireEvent("before_del_article")!==!1){
var t=$(this).closest(".js_appmsg_item").index();
return t!=e.$current.index()&&e.select(t),e.remove(t),!1;
}
}),e.$list.on("click",".js_up",function(){
if(e._saving!==!0){
var t=$(this).closest(".js_appmsg_item"),i=t.prev();
t.insertBefore(i),e._updateTitleTips();
}
}),e.$list.on("click",".js_down",function(){
if(e._saving!==!0){
var t=$(this).closest(".js_appmsg_item"),i=t.next();
i.insertBefore(t),e._updateTitleTips();
}
}),$("body").on("click","a",function(t){
var i=$(this).attr("href"),r=$(this).attr("target");
if("_blank"!==r&&"string"==typeof i&&0!==i.indexOf("javascript:")&&0!==i.indexOf("#")){
var a=e.getData()||!1,n=e._deserializeReadOnlyType();
if(2&n.right)return t.preventDefault(),void p.show({
type:"warn",
msg:"如果离开此页面，当前页面数据将丢失！",
buttons:[{
text:"留在此页面",
click:function(){
this.remove();
}
},{
text:"离开此页面",
type:"normal",
click:function(){
window.onbeforeunload=null,4==n.index&&y.saveConflict(a,e.app_id,e.data_seq,e.conflict_ls_seq),
location.href=i,this.remove();
}
}]
});
if(E(a,e.lastData))return void(e.draft&&e.draft.clear());
t.preventDefault();
var o=1==wx.cgiData.isNew?"是否保存当前图文消息内容？":"是否保存此次修改？";
p.show({
type:"info",
msg:o,
buttons:[{
text:"保存",
click:function(){
e.save($("#js_submit"),function(){
window.onbeforeunload=null,m.remove(),$("#js_save_success").show(),location.href=i;
}),this.remove();
}
},{
text:"不保存",
type:"normal",
click:function(){
e.draft&&e.draft.clear(),window.onbeforeunload=null,location.href=i,this.remove();
}
}]
});
}
}),e.ueditor.addListener("can_add_article",function(t,i){
i.on("click",".js_create_article",function(){
if(e._saving!==!0&&e.ueditor.fireEvent("before_add_article")!==!1){
var t=e.$list.children().length;
if(t>=e.maxNum)return void m.err("你最多只可以加入%s条消息".sprintf(e.maxNum));
var i=1*$(this).attr("data-type");
e.createArticle({
type:i,
onOk:function(t){
if(t&&(e.renderCreateBtn(),e.ueditor.fireEvent("after_add_article"),e.app_id)){
var i=new Image;
i.src="/cgi-bin/reportmaterialoper?oper=0&idx="+t.index()+"&msgid="+e.app_id+"&token="+wx.data.t;
}
}
});
}
});
}),e.ueditor.addListener("contentchange",function(){
$("#js_import_tips,#js_draft_tips").hide();
}),e._activeIntervalSave(),window.onbeforeunload=function(t){
var i=e.getData()||!1,r="--------------------------------------------\n如果离开此页面，当前页面数据将丢失！\n--------------------------------------------",a=e._deserializeReadOnlyType();
if(2&a.right){
4==a.index&&y.saveConflict(i,e.app_id,e.data_seq,e.conflict_ls_seq);
try{
t.returnValue=r;
}catch(t){}
return r;
}
if(e.draft){
if(E(i,e.lastData))return void e.draft.clear();
try{
t.returnValue=r;
}catch(t){}
return r;
}
},$(window).on("unload",function(){
e.draft&&e.draft.clear();
}),e.ueditor.addListener("is_article_alive",function(e,t){
return t&&t.data("article")&&t.data("article").data&&"function"==typeof t.data("article").data.getData?!0:!1;
}),e.ueditor.addListener("is_article_editing",function(e,t){
return t.hasClass("current")?!0:!1;
}),e.ueditor.addListener("draft_force_save",function(){
if(e.draft){
var t=e.getData();
e.draft.activeId>0&&(e.activeData=t),e.draft.forceSave(t,e.draft.activeId);
}
}),e.ueditor.addListener("get_current_article",function(){
return e.getCurrentArticle();
}),e.ueditor.addListener("get_current_article_all_img",function(){
var t=e.$current?e.$current.data("article"):null;
return t&&"function"==typeof t.getAllImgData?t.getAllImgData():[];
}),e.ueditor.addListener("article_item_list_scroll",function(){
e._g.event.delPopoverScroll();
}),e.ueditor.addListener("update_remote_img",function(t,i){
e.updateRemoteImg(i);
}),e.ueditor.addListener("end_crop_img",function(){
e.crop_img_ing=!1;
}),e.ueditor.addListener("start_crop_img",function(){
e.crop_img_ing=!0;
}),c.on("_preview",function(){
e._preview();
});
},
renderCreateBtn:function(){
var e=this.$list.children().length;
e>=this.maxNum?$("#add_appmsg_container").hide():$("#add_appmsg_container").show();
},
createArticle:function(e){
var t=this,i=e.type;
w.showDialog({
ueditor:t.ueditor,
can_use_txvideo:wx.cgiData.can_use_txvideo,
type:i,
onOk:function(r){
var a;
a=t.add(0==i?{
isNew:!0
}:{
data:r.data,
isNew:!0
}),t.select(a.index()),"function"==typeof e.onOk&&e.onOk(a);
},
onCancel:function(){
"function"==typeof e.onCancel&&e.onCancel();
}
});
},
_getArticleDiffData:function(){
var e=200,t=this.getData(),i=[],r=null;
if(t){
for(var a=!0,n=0,o=t.length;o>n;n++)i.push({
content:t[n].content.text().substr(0,e),
title:t[n].title
});
for(var n=0,o=i.length;o>n;n++){
var s=i[n];
if(!s.title||!s.content||s.content.length!=e){
a=!1;
break;
}
for(var d=n+1;o>d;d++){
var c=i[d];
if(!c.title||!c.content||c.content.length!=e){
a=!1;
break;
}
if(s.title==c.title||s.content==c.content){
a=!1;
break;
}
}
if(a===!1)break;
}
a===!0&&i.length>0&&(r=i);
}
return r;
},
_getCurrentIndex:function(){
return this.$current&&this.$current.data("article")?this.$current.data("article").getIndex():0;
},
_updateTitleTips:function(){
var e=0;
this.$list.children().each(function(){
var t=$(this);
t.data("msgindex",e),t.children().attr("title","第%s篇图文".sprintf(j[e]));
var i=t.data("article");
i&&i.updateIndex(e),e++;
});
},
_checkHmltDeep:function(e){
function t(e,a){
var n=e.children(),o=n.length;
if(0==o)return void(a>=i&&r.push({
sid:21,
time:a-1
}));
for(var s=0,d=o;d>s;s++)t(n.eq(s),a+1);
}
try{
var i=31,r=[],a=$.map(e,function(e,t){
return 0==t.indexOf("content")?e:void 0;
});
$.each(a,function(e,i){
t($("<div></div>").html(i),1);
}),r.length>0&&(s.saveSpeeds({
uin:window.wx.uin,
pid:34,
speeds:r
}),s.send());
}catch(n){}
},
_checkExternalLink:function(e){
var t=[],i=$.map(e,function(e,t){
return 0==t.indexOf("content")?e:void 0;
});
if($.each(i,function(e,i){
for(var r=/http\:\/\/([\w-]+\.)+[\w-]+(\:\d*)?(\/[\w\- \.\/\?%&=]*)?/gi,a=null,n="";null!=(a=r.exec(i));)n=i.substring(a.index,r.lastIndex),
v.isLocalDomain(n)||t.push(i.substring(Math.max(0,a.index-20),r.lastIndex));
}),t.length){
var r=(t.length,{
lc:t.length
});
$.each(t,function(e,t){
r["log"+e]=encodeURIComponent(t);
}),$.post("//mp.weixin.qq.com/mp/jsmonitor?idkey=28308_7_1",r);
}
},
getCurrentArticle:function(){
return this.$current||null;
},
getCurrentArticleObject:function(){
return this.$current?this.$current.data("article"):null;
},
add:function(e){
var t=this,i=t.$list.children().length;
i==t.maxNum-1&&t.$list.parent().siblings("a").hide();
var r=new w.create({
isNew:e.isNew===!1?!1:!0,
app_id:t.app_id||"",
$infoContainer:$(t.opt.editor_selector),
$articleList:t.$list,
data:e.data,
index:i,
ueditor:t.ueditor,
$freeUEditor:t.freeUEditor,
$navigator:$(".js_main_title"),
cgiData:window.wx.cgiData
});
return $(".js_scrollbar").scrollbar.updateScrollbars(!0),t._updateTitleTips(),r.getListItem();
},
removeDelPopover:function(){
this._g.delPopover&&(this.$list.find(".appmsg_edit_mask").css("display",""),this._g.delPopover.remove(),
this._g.delPopover=null,this.unbindSpecifyEvent({
dom:window,
type:"domUtils",
eventName:"scroll",
fun:this._g.event.delPopoverScroll
}));
},
remove:function(e,t){
var i=this,r=i.$list.children().eq(e);
i.$current&&e!=i.$current.index()&&i.select(e);
var a=r.data("article").flush();
return t===!0?i.drop(e):(this.removeDelPopover(),r.find(".appmsg_edit_mask").css("display","block"),
this._g.delPopover=new _({
dom:r.find(".js_del"),
content:"确定删除此篇图文？",
hideIfBlur:!0,
buttons:[{
text:"确定",
click:function(){
if(i.drop(e),i.renderCreateBtn(),i.app_id){
var t=new Image;
t.src="/cgi-bin/reportmaterialoper?oper=1&idx="+e+"&msgid="+i.app_id+"&token="+wx.data.t;
}
i.removeDelPopover();
},
type:"primary"
},{
text:"取消",
click:function(){
i.removeDelPopover();
}
}]
}),this.bindEventInterface({
dom:window,
type:"domUtils",
eventName:"scroll",
fun:i._g.event.delPopoverScroll
})),a;
},
drop:function(e){
var t=this;
0!=e&&t.select(Math.max(0,e-1));
var i=t.$list.children().eq(e),r=i.data("article");
r&&"function"==typeof r.destroy&&r.destroy(),t.$list.children().eq(e).remove(),t.$list.parent().siblings("a").show(),
$(".js_scrollbar").scrollbar.updateScrollbars(!0),t._updateTitleTips();
},
select:function(e,t,i){
var r=this,a="number"!=typeof e?e:r.$list.find(".js_appmsg_item").eq(e);
a.addClass("current");
var n=null;
if(a.siblings().removeClass("current"),r.$current){
if(e==r.$current.index())return;
n=r.$current.data("article"),n&&(n.flush(),n.destroy()),r._checkRepeat();
}
n=a.data("article"),n&&(!t&&n.hideErrorTips(),r.$current=a,n.render());
var o=$("html"),s=n.getScrollTop(),d=o.scrollTop(),c=Math.max(o.height()-$(window).height(),0);
!i&&s!=d&&c>=s&&setTimeout(function(){
o.animate({
scrollTop:s
}),$("div.appmsg_edit_box").css({
overflow:"hidden"
}),setTimeout(function(){
$("div.appmsg_edit_box").css({
overflow:""
});
},0);
},100),$("#js_appmsg_upload_cover").siblings("ul").hide(),r.removeDelPopover(),r.ueditor.fireEvent("afterArticleSelect",e);
},
updateRemoteImg:function(e){
var t=e.article;
if(this.ueditor.fireEvent("is_article_alive",t)===!0){
var i,r=t.data("article").data,a=t.hasClass("current")?!0:!1,o=$("<div>"),s=(e.type,
e.uid);
if(a)i=$(this.ueditor.getDocument()).find("[data-remoteid="+s+"]");else{
if(this.ueditor.funcPvUvReport("not_cur_img_count"),!r.get("content"))return;
i=o.html(r.get("content")).find("[data-remoteid="+s+"]");
}
if(i){
n.changeRemoteImgUrl({
imgDom:i,
remoteType:e.remoteType,
format:e.format,
img_url:e.img_url,
editor:this.ueditor
});
var d=$("body").find("div.dialog_wrp").find(".js_imgItemSrc[data-remoteid="+s+"]");
d&&d.length>0&&(n.changeRemoteImgUrl({
imgDom:d,
remoteType:e.remoteType,
img_url:e.img_url,
errDefaultStyle:!0,
editor:this.ueditor
}),d.parents(".js_imgItem").removeClass("loading_item"),d.siblings(".js_title_img_mask").remove()),
a||(r.set("content",o.html()),t.data("article").data.setData(r.getData()));
}
}
},
_checkRepeat:function(){
try{
var e=function(e,t,i){
var r={};
return e=$.extend(e,t),$.each(i,function(t,i){
r[i]=e[i];
}),r;
},t=this,i=t.$current.index(),r=t.$current.data("article").data,a=["author","digest","file_id","source_url","title","content"],n=e({},r.getData(),a);
if(""==r.get("content")||""==r.get("title"))return;
var o=!0;
if($.each(a,function(e,t){
n[t]&&(o=!1);
}),o)return;
t.$list.find(".js_appmsg_item").each(function(r){
if(r!=i){
var o=e({},$(this).data("article").data.getData(),a);
E(n,o,null,null,!0)&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=[repeat][appid:%s,idx:%s,bizuin:%s]".sprintf(28308,1,t.app_id||0,r,wx.data.uin));
}
});
}catch(s){}
},
getData:function(e,t){
var i=this,r=[],a=null,n=i.$current;
n&&(a=n.data("article"),a&&a.flush());
var o=!0;
return i.$list.find(".js_appmsg_item").each(function(a){
var n=$(this).data("article");
if(n){
var s=n.getData(e,t);
return null==s?(i.select(a,!0,!0),o=!1,!1):void r.push(s);
}
}),0==r.length?!1:o&&r;
},
getPostData:function(e){
var i=this,r=i.getData(!0,e);
if(!r)return null;
var a={
AppMsgId:i.app_id,
count:r.length,
data_seq:(i.data_seq||"0")+"",
operate_from:t()
};
return $.each(r,function(e,t){
var i={};
$.each(t,function(t,r){
i[t+e]=r;
}),$.extend(a,i);
}),a;
},
_checkSeqError:function(e,t){
try{
if(!t||0==t.length)return;
for(var i=[],r=0;r<e.count;r++){
var a=e["content"+r];
i.push(a?a.text():"");
}
for(var r=0,n=t.length;n>r;r++){
var a=t[r];
if(a&&"undefined"!=typeof a.content){
var o=a.content.text();
if(o&&i[r]&&o!=i[r])for(var s=0,d=i.length;d>s;s++)if(s!=r&&i[s]&&o==i[s]){
var c=new Image,l=["appmsgid:",e.AppMsgId||"",";operate_from:",e.operate_from,";web_index:",s,";cgi_index:",r,";title:",e["title"+s]||""];
c.src=["https://badjs.weixinbridge.com/badjs?level=4&id=114&msg=",encodeURIComponent(l.join("")),"&uin=",window.wx.data.uin||"","&from=1&t=",Math.random()].join("");
}
}
}
}catch(f){}
},
update:function(e){
if(e&&0!=e.length){
var t;
this.$current&&(t=this.$current.index()||0);
for(var i=["content","title","author","digest"],r=0,a=e.length;a>r;r++){
var n=e[r];
if(n){
for(var o=!1,s={},d=0;d<i.length;d++)"undefined"!=typeof n[i[d]]&&(o=!0,s[i[d]]=n[i[d]]);
if(o!==!1)if(this.$current&&this.$current.index()==r){
var c=this.$current.data("article");
c&&c.data&&"function"==typeof c.data.get&&1*c.data.get("is_share_copyright")!=1&&c.modifyCurrentEditData(s);
}else{
var c=this.$list.find(".js_appmsg_item").eq(r).data("article");
if(c&&c.data&&"function"==typeof c.data.set&&1*c.data.get("is_share_copyright")!=1){
for(var l in s)c.data.set(l,s[l]);
this.select(r,0,0);
}
}
}
}
this.$current&&this.$current.index()!=t&&this.select(t,0,0);
}
},
save:function(e,t,i,a,s,d){
var c=this._deserializeReadOnlyType();
if(!(1&c.right||this._saving===!0)){
var l=0,u=this;
try{
l=3;
{
u.getData();
}
l=4;
var _=u.getPostData(i||d);
if(l=5,!_)return;
u.hasConfirmed&&(u.hasConfirmed=!1,_.confirm=1),"undefined"!=typeof u.confirm_treatment&&(_.confirm_treatment=u.confirm_treatment),
"undefined"!=typeof u.cover_word&&(_.cover_word=u.cover_word),"undefined"!=typeof u.hint_word&&(_.hint_word=u.hint_word),
e.btn(!1),u._saving=!0,r(30,.1,"error"),n.waitAsynAction({
editor:u.ueditor,
callback:function(){
var n=u.getPostData(i||d);
return n?(1===_.confirm&&(n.confirm=1),_.confirm_treatment&&(n.confirm_treatment=_.confirm_treatment),
_.cover_word&&(n.cover_word=_.cover_word),_.hint_word&&(n.hint_word=_.hint_word),
n=u.filtercharCode(n),r(31,.1,"error"),u.ueditor.fireEvent("reportAddNum",65080,91,1),
void h.appmsg.save(!0,10,n,function(i){
u.confirm_treatment=void 0,u.cover_word=void 0,u._saving=!1,e.btn(!0),u.app_id=i.appMsgId,
u.data_seq=i.data_seq+"",u.update(i.filter_content_html),u.lastData=u.getData()||!1,
u.draft&&(u.draft.clear(),u.draft._updateAppid(u.app_id,u.data_seq)),t(i,n),u._checkExternalLink(n),
u._checkHmltDeep(n),u._checkSeqError(n,i.filter_content_html);
},function(t,r,n,s){
switch(u._saving=!1,e.btn(!0),0!=t&&u.select(1*t),+r){
case 64515:
u.ueditor.fireEvent("reportAddNum",65080,92,1),u.readOnlyType="3_4",u.conflict_ls_seq=u.data_seq+"",
u.data_seq=s.data_seq+"",u._renderReadOnly(f.timeFormat(s.update_time),s.operator_name,s.operate_from);
break;

case 200041:
m.err(s.myErrMsg),u.draft=null,u.readOnlyType="3_1",u._renderReadOnly();
break;

case 1530503:
$(".frm_msg.js_warn").text(s.myErrMsg).show(),$("input[name='source_url']").focus();
break;

case 1530504:
$(".page_msg.js_warn").show().find(".profile_link_msg_global").text(s.myErrMsg),
$(window).scrollTop(0);
break;

case 1530510:
$(".frm_msg.js_warn").text(s.myErrMsg).show(),$("input[name='source_url']").focus();
break;

case 1530511:
$(".page_msg.js_warn").show().find(".profile_link_msg_global").text(s.myErrMsg),
$(window).scrollTop(0);
break;

case 153007:
case 153008:
case 153009:
case 200042:
case 200043:
case 64601:
case 64602:
case 64603:
case 64604:
case 64605:
case 153010:
p.show({
width:750,
type:"warn",
msg:s.myErrMsg,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
break;

case 10811:
case 10812:
case 10813:
case 10814:
u.hint_word=s.hint_word.join("|"),new o({
hint_word:s.hint_word,
remind_wording:s.remind_wording,
onHide:function(){
u.confirm_treatment=void 0,u.cover_word=void 0;
},
onChange:function(e,t){
e.find(".js_btn_p").eq(0).enable(),u.cover_word=0==t.checkbox("value")?0:1;
},
buttons:[{
text:"继续保存",
type:"primary",
click:function(){
this.remove(),u.confirm_treatment=s.confirm_treatment,e.trigger("click");
}
},{
text:"取消",
click:function(){
u.confirm_treatment=void 0,u.cover_word=void 0,this.remove();
}
}]
});
break;

case 13002:
$(".js_ad_tips_wording").text(s.myErrMsg),$(".js_ad_error_tips").parent().show(),
$(".js_ad_error_tips").show(),a&&a.fireEvent("scrollIntoView",$(".js_ad_preview"),$(window).height()-$(".js_ad_preview").height()-72-30);
break;

case 13003:
var d="/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&lang=zh_CN&token="+wx.data.t+"&type=10&appmsgid="+s.ad_article_msgid+"&isMul=1";
$(".js_ad_tips_wording").html('已有文章<a href="%s" target="_blank">《%s》</a>过该广告卡片，一个广告卡片仅可插入一篇文章'.sprintf(d,s.ad_article_title)),
$(".js_ad_error_tips").parent().show(),$(".js_ad_error_tips").show(),a&&a.fireEvent("scrollIntoView",$(".js_ad_preview"),$(window).height()-$(".js_ad_preview").height()-72-30);
break;

case 13004:
$(".js_ad_tips_wording").text(s.myErrMsg),$(".js_ad_error_tips").parent().show(),
$(".js_ad_error_tips").show(),a&&a.fireEvent("scrollIntoView",$(".js_ad_preview"),$(window).height()-$(".js_ad_preview").height()-72-30);
break;

case 15801:
case 15802:
case 15803:
case 15804:
case 15805:
case 15806:
p.show({
type:"warn",
msg:n||"你所编辑的图文消息可能含有违反微信公众平台平台协议、相关法律法规和政策的内容|你可以继续保存或发布该图文消息，若保存或发布后，经核实涉嫌含有上述相关内容的，将可能被作删除、屏蔽等处理。<br/><a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN&token=2056316619' target='_blank'>对应规则</a>",
buttons:[{
text:i?"继续预览":"继续保存",
click:function(){
this.remove(),u.hasConfirmed=!0,u.confirm_treatment=s.confirm_treatment,e.trigger("click");
}
},{
text:"取消",
type:"normal",
click:function(){
u.confirm_treatment=void 0,u.cover_word=void 0,this.remove();
}
}],
close:function(){
u.confirm_treatment=void 0,u.cover_word=void 0;
}
});
break;

case 153012:
setTimeout(function(){
$("html, body").animate({
scrollTop:$(".origined").offset().top-60
});
},100),$("#original_type_msg").show();
break;

case 64518:
m.err("保存失败，不允许包含多个投票");
break;

case 64519:
m.err("保存失败，包含了不属于该公众号的投票");
break;

case 64520:
m.err("保存失败，包含了未发布的投票");
break;

default:
var t=s&&s.myErrMsg?s.myErrMsg:"保存失败";
m.err(t);
}
})):(u._saving=!1,void e.btn(!0));
}
}),l=6;
}catch(v){
u._saving=!1,e.btn(!0),m.err("保存失败，请稍后再试"),l&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=editor_save_error;errmsg:%s,appid:%s,bizuin:%s".sprintf(28308,l,v.message,u.app_id||0,wx.data.uin)),
window.BJ_REPORT&&"function"==typeof window.BJ_REPORT.report&&v&&v.stack&&(v.stack="editor_save_error|"+v.stack,
window.BJ_REPORT.report(v)),v.stack&&console&&console.error&&console.error("[BJ-REPORT]",v.stack);
}
}
},
filtercharCode:function(e){
var t=!1;
for(var i in e)e.hasOwnProperty(i)&&"function"==typeof e[i].replace&&(e[i]=e[i].replace(/[\ud800-\uDFFF]/g,function(e,i,r){
return/[\ud800-\udbff]/.test(e)&&/[\uDC00-\uDFFF]/.test(r.charAt(i+1)||"")?e:/[\ud800-\udbff]/.test(r.charAt(i-1)||"")&&/[\uDC00-\uDFFF]/.test(e)?e:(t=!0,
"");
}));
return t&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=28308_11_1"),e;
},
preview:function(e,t){
var i=this;
i.save($("#js_preview"),function(r){
for(var a=i.getPostData(),n=i.getData(),o=0;8>o;o++)a["content"+o]&&(a["content"+o]=e.handlerContent(a["content"+o],!0),
a["content"+o]=a["content"+o].replace("/cgi-bin/readtemplate?t=tmpl/cpc_tmpl","/cgi-bin/readtemplate?t=tmpl/cpc_tmpl&preview=1")),
n&&n[o]&&(a["ad_info"+o]=n[o].ad_info);
b.show(a,i.$current.index(),n,e),"function"==typeof t&&t(r);
},!0,e,i.$current.index());
},
_preview:function(){
var e=this,t=e.getPostData();
new a({
AppMsgId:t.AppMsgId,
type:2,
hasConfirmed:e.hasConfirmed,
selectFun:e.select,
uin:wx.data.uin,
token:wx.data.t,
nickname:wx.data.nick_name
});
}
});
return T;
});