define("common/wx/mpEditor/plugin/link.js",["common/wx/popup.js","biz_web/ui/checkbox.js","biz_common/jquery.validate.js","common/wx/Cgi.js","tpl/mpEditor/plugin/link_dialog.html.js","tpl/mpEditor/plugin/link_appmsg.html.js","tpl/mpEditor/plugin/link_acc_item.html.js","tpl/mpEditor/plugin/link_popup.html.js","biz_common/moment.js","common/wx/Tips.js","common/wx/popover.js","common/wx/ban.js","common/wx/pagebar.js"],function(e){
"use strict";
function t(e){
this.editor=null,this.__g={
dom:{},
form:{},
canWriteBack:!1,
articlePerPage:5,
accPerPage:5,
can_use_hyperlink:e.can_use_hyperlink,
can_use_appmsg_outer_url:e.can_use_appmsg_outer_url
},i.addMethod("inner_link",function(e){
return/http(s)?:\/\/mp\.weixin\.qq\.com\/(s\?|s\/|mp\/appmsg\/show\?)/.test(e)?!0:!1;
},"请输入公众号文章链接"),i.addMethod("temp_link",function(e){
return/^https?\:\/\/mp\.weixin\.qq\.com\/.*[\?&]tempkey=/.test(e)?!1:!0;
},"不能输入公众号文章的预览链接");
}
e("common/wx/popup.js"),e("biz_web/ui/checkbox.js");
var i=e("biz_common/jquery.validate.js"),a=e("common/wx/Cgi.js"),n=e("tpl/mpEditor/plugin/link_dialog.html.js"),r=e("tpl/mpEditor/plugin/link_appmsg.html.js"),c=e("tpl/mpEditor/plugin/link_acc_item.html.js"),s=e("tpl/mpEditor/plugin/link_popup.html.js"),o=e("biz_common/moment.js"),l=e("common/wx/Tips.js"),_=(e("common/wx/popover.js"),
e("common/wx/ban.js")),d=e("common/wx/pagebar.js"),u={
service_type:{
0:"订阅号",
1:"订阅号",
2:"服务号",
"-1":"服务号"
}
};
return t.beforeSetContent=function(e){
return e.html;
},t.prototype={
getName:function(){
return"link";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var e=this;
return function(){
e.editor&&e.__openDialog();
};
},
addListener:function(e){
var t=this;
e.addListener("link_optimize",function(e,i){
t.__optimize(i);
}),e.addListener("handle_common_popup",function(t,i){
var a,n=e.queryCommandValue("link",i.node||null);
if(n&&(a=n.getAttribute("_href")||n.getAttribute("href",2))){
var r=a;
a.length>30&&(r=a.substring(0,20)+"..."),i.html+=wx.T(s,{
needBreak:i.html?!0:!1,
url:a,
txt:r
}),i.node=n;
}
});
},
beforeSetContent:function(e){
return t.beforeSetContent({
html:e
});
},
getType:function(){
return 1;
},
getTitle:function(){
return"超链接";
},
getQueryCommandState:function(){
var e=this;
return function(){
var t=e.editor;
if(!t)return 0;
var i=t.getSelectionRange().getClosedNode(),a=i&&"edui-faked-video"==i.className;
return a?-1:0;
};
},
getQueryCommandValue:function(){
var e=this;
return function(t,i){
var a=e.editor;
if(a){
var n,r,c=a.getDomUtils();
if(i||(n=a.getSelectionRange()),n&&n.collapsed){
if(r=n.startContainer,r=1==r.nodeType?r:r.parentNode,r&&(r=c.findParentByTagName(r,"a",!0))&&!c.isInNodeEndBoundary(n,r))return r;
}else{
if(n){
n.shrinkBoundary();
var s=3!=n.startContainer.nodeType&&n.startContainer.childNodes[n.startOffset]?n.startContainer.childNodes[n.startOffset]:n.startContainer,o=3==n.endContainer.nodeType||0==n.endOffset?n.endContainer:n.endContainer.childNodes[n.endOffset-1],l=n.getCommonAncestor();
if(r=c.findParentByTagName(l,"a",!0),!r&&1==l.nodeType)for(var _,d,u,p=l.getElementsByTagName("a"),h=0;u=p[h++];)if(_=c.getPosition(u,s),
d=c.getPosition(u,o),(_&c.POSITION_FOLLOWING||_&c.POSITION_CONTAINS)&&(d&c.POSITION_PRECEDING||d&c.POSITION_CONTAINS)){
r=u;
break;
}
return r;
}
if(i){
if(r=c.findParentByTagName(i,"a",!0),!r&&1==i.nodeType){
var p=i.getElementsByTagName("a");
if(p&&p[0])return p[0];
}
return r;
}
}
}
};
},
__openDialog:function(){
this.__DialogInit(),this.__initDialogData(),this.__DialogEvent();
},
__DialogEvent:function(){
{
var e=this,t=this.__g,i=t.dom,a=t._linkDialog;
t._perPage;
}
i.$innerMain.find("input[name=link_type][type=radio]").checkbox({
onChanged:function(e){
var t=e.val();
i.$innerMain.find(".js_link_type").hide(),i.$innerMain.find(".js_link_type_"+t).show(),
a.popup("resetPosition");
}
}),t.form=i.$dialogDom.find("#myform").validate({
rules:{
innerLink:{
required:function(){
return i.$innerTabItem.hasClass("selected")&&i.$innerMain.find("input[name=link_type][type=radio][value=1]").prop("checked")?!0:!1;
},
url:!0,
inner_link:!0,
temp_link:!0
},
outerLink:{
required:function(){
return i.$outerTabItem.hasClass("selected")?!0:!1;
},
url:!0
},
outerTitle:{
required:function(){
return i.$outerTabItem.hasClass("selected")?!0:!1;
}
},
innerTitle:{
required:function(){
return i.$innerTabItem.hasClass("selected")?!0:!1;
}
}
},
messages:{
innerLink:{
required:"链接地址不能为空",
url:"请输入公众号文章链接，且必须以http://或https://开头",
inner_link:"请输入公众号文章链接，且必须以http://或https://开头",
temp_link:"不能输入公众号文章的预览链接"
},
outerLink:{
required:"链接地址不能为空",
url:"请输入有效的链接(必须以http://或https://开头)"
},
outerTitle:{
required:"请输入链接标题"
},
innerTitle:{
required:"请输入链接标题"
}
}
}),i.$tabMain.on("click",".js_tab_item",function(){
var e=$(this),a=e.data("tab");
"inner"==a?(i.$innerTabItem.addClass("selected"),i.$outerTabItem.removeClass("selected"),
i.$innerMain.show(),i.$outerMain.hide(),t._linkDialog.popup("resetPosition")):(i.$innerTabItem.removeClass("selected"),
i.$outerTabItem.addClass("selected"),i.$innerMain.hide(),i.$outerMain.show(),t._linkDialog.popup("resetPosition"));
}),i.$jsSelfAcc.click(function(){
e.__selectAcc({
nickname:wx.data.nick_name||wx.data.user_name||"",
fakeid:""
});
}),i.$dialogDom.find(".js_reset_acc").click(function(){
e.__resetAcc();
}),i.$accSearchDel.click(function(){
$(this).hide(),e.__resetAcc();
}),i.$accSearchInput.keyup(function(t){
i.$accSearchInput.val().trim()?i.$accSearchDel.show():(i.$accSearchDel.hide(),e.__resetAcc());
var a=t.keyCode||t.which||0;
13==a&&i.$accSearchBtn.trigger("click");
}),i.$accSearchBtn.click(function(){
var t=i.$accSearchInput.val().trim();
t&&e.__searchAcc(t);
}),i.$articleSearchDel.click(function(){
$(this).hide(),e.__resetArticle();
}),i.$articleSearchInput.keyup(function(t){
i.$articleSearchInput.val().trim()?i.$articleSearchDel.show():(i.$articleSearchDel.hide(),
e.__resetArticle());
var a=t.keyCode||t.which||0;
13==a&&i.$articleSearchBtn.trigger("click");
}),i.$articleSearchBtn.click(function(){
var t=i.$articleSearchInput.val().trim()||"";
e.__searchArticle(t);
}),i.$accList.on("click",".js_acc_item",function(){
var t=$(this),i=t.data("fakeid"),a=t.data("nickname");
e.__selectAcc({
fakeid:i,
nickname:a
});
});
},
__searchAcc:function(e){
var t=this.__g.dom;
t.$accSearchTips.hide(),t.$jsSelfAcc.parent().hide(),this.__getAccList({
searchKey:e,
page:0
});
},
__searchArticle:function(e){
this.__getArticleList({
searchKey:e,
page:0
});
},
__checkAccLoading:function(e){
return this.__g["getting_"+e+"_data"];
},
__showLoading:function(e){
var t=this.__g,i=t.dom;
t["getting_"+e+"_data"]=!0,i["$"+e+"Content"].show(),i["$"+e+"Loading"].show(),i["$"+e+"List"].hide(),
i["$"+e+"Pagebar"].hide();
},
__hideLoading:function(e){
var t=this.__g,i=t.dom;
t["getting_"+e+"_data"]=!1,i["$"+e+"Loading"].hide();
},
__getArticleList:function(e){
var t=this,i=this.__g;
t.__checkAccLoading("article")!==!0&&(t.__showLoading("article"),e.searchKey=e.searchKey||"",
a.get({
url:"/cgi-bin/appmsg",
data:{
action:"list_ex",
begin:e.page*i.articlePerPage,
count:i.articlePerPage,
query:e.searchKey,
fakeid:i.currentFakeid||"",
type:9
},
mask:!1
},{
done:function(a){
if(i._linkDialog)if(t.__hideLoading("article"),a&&a.base_resp&&0==a.base_resp.ret)t.__renderArticleList({
code:0,
list:a.app_msg_list||[],
total:1*a.app_msg_cnt,
page:e.page,
searchKey:e.searchKey
});else{
var n="";
a&&a.base_resp&&200013==a.base_resp.ret&&(n="操作太频繁，请稍后再试"),t.__renderArticleList({
code:-1,
msg:n,
searchKey:e.searchKey
});
}
},
fail:function(){
i._linkDialog&&(t.__hideLoading("article"),t.__renderArticleList({
code:-1,
searchKey:e.searchKey
}));
}
}));
},
__getAccList:function(e){
var t=this,i=this.__g;
e.searchKey&&t.__checkAccLoading("acc")!==!0&&(t.__showLoading("acc"),a.get({
url:"/cgi-bin/searchbiz?action=search_biz",
data:{
query:e.searchKey,
begin:e.page*i.accPerPage,
count:i.accPerPage
},
mask:!1
},{
done:function(a){
if(i._linkDialog)if(t.__hideLoading("acc"),a&&a.base_resp&&0==a.base_resp.ret)t.__renderAccList({
code:0,
list:a.list||[],
total:1*a.total,
page:e.page,
searchKey:e.searchKey
});else{
var n="";
a&&a.base_resp&&200013==a.base_resp.ret&&(n="操作太频繁，请稍后再试"),t.__renderAccList({
code:-1,
msg:n,
searchKey:e.searchKey
});
}
},
fail:function(){
i._linkDialog&&(t.__hideLoading("acc"),t.__renderAccList({
code:-1,
searchKey:e.searchKey
}));
}
}));
},
__renderArticleList:function(e){
var t=this.__g,i=t.dom;
t._linkDialog&&(0==e.code||e.msg?0!=e.code||e.list&&0!=e.list.length||e.msg||(e.msg="暂无搜索结果"):e.msg="系统繁忙，请稍后再试",
t.curArticleList=e.list||[],t.selectedArticle=void 0,t.curArticleList.each(function(e){
e.update_time_str=o.unix(e.update_time).format("YYYY-MM-DD"),e.link=$.trim(e.link.replace("#rd","&scene=21#wechat_redirect")),
e.title=$.trim(e.title||"无标题");
}),i.$articleList.html(template.compile(r)({
list:t.curArticleList,
service_type:u.service_type,
msg:e.msg
})).show(),i.$articleLoading.hide(),t.curArticleList.length>0&&i.$articleList.on("click",".js_article_i",function(){
var e=$(this);
i.$articleList.find(".js_article_label.selected").removeClass("selected").find("input[type=radio]").attr("checked",!1).prop("checked",!1),
e.parents(".js_article_label").addClass("selected").find("input[type=radio]").attr("checked",!0).prop("checked",!0),
t.selectedArticle=e.data("index");
}),0==e.code&&e.total>0&&"undefined"!=typeof e.page?this.__initPageBar({
type:"article",
curPage:e.page+1,
total:e.total,
searchKey:e.searchKey
}):i.$accPagebar.hide(),t._linkDialog.popup("resetPosition"));
},
__renderAccList:function(e){
var t=this.__g,i=t.dom;
t._linkDialog&&(0==e.code||e.msg?0!=e.code||e.list&&0!=e.list.length||e.msg||(e.msg="不存在该公众号"):e.msg="系统繁忙，请稍后再试",
e.msg?(i.$accSearchTips.show().find("span").text(e.msg),i.$accContent.hide()):(i.$accSearchTips.hide(),
i.$accContent.show(),i.$accList.html(template.compile(c)({
list:e.list,
service_type:u.service_type
})).show()),i.$accLoading.hide(),0==e.code&&e.total>0&&"undefined"!=typeof e.page?this.__initPageBar({
type:"acc",
curPage:e.page+1,
total:e.total,
searchKey:e.searchKey
}):i.$accPagebar.hide(),t._linkDialog.popup("resetPosition"));
},
__initPageBar:function(e){
var t=this,i=this.__g,a=i.dom,n=e.type+"_pagebar";
i[n]&&i[n].destroy(),i[n]=new d({
container:a["$"+e.type+"Pagebar"],
perPage:i[e.type+"PerPage"],
initShowPage:e.curPage,
totalItemsNum:Math.min(e.total,2e3),
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
var a=e.type.substr(0,1).toUpperCase()+e.type.substr(1);
t["__get"+a+"List"]({
searchKey:e.searchKey,
page:1*i.currentPage-1
});
}
});
},
__resetArticle:function(){
var e=this.__g.dom;
e.$articleSearchInput.val("");
},
__resetAcc:function(){
var e=this.__g,t=e.dom;
e.currentFakeid="",e.curArticleList=[],e.selectedArticle=void 0,t.$accText.html(""),
t.$accDesc.hide(),t.$accSearchInput.val(""),t.$accSearchTips.hide().find("span").text(""),
t.$accSearchMain.show().parents(".frm_control_group").removeClass("show_value"),
t.$jsSelfAcc.parent().show(),t.$accContent.hide(),t.$articleContent.hide(),e._linkDialog.popup("resetPosition");
},
__selectAcc:function(e){
this.__g.currentFakeid=e.fakeid||"";
var t=this.__g.dom;
t.$accSearchMain.hide().parents(".frm_control_group").addClass("show_value"),t.$jsSelfAcc.parent().hide(),
t.$accContent.hide(),t.$accText.html((e.nickname||"").html(!0)),t.$accDesc.show(),
t.$articleContent.show(),t.$articleList.hide(),t.$articlePagebar.hide(),this.__resetArticle(),
this.__getArticleList({
searchKey:"",
page:0
});
},
__initDialogData:function(){
var e=this.__g,t=e.dom,i=(e._linkDialog,this.editor),a=i.getDomUtils(),n=i.getSelectionRange(),r=n.collapsed?i.queryCommandValue("link"):i.getSelectionStart();
if(e.tempLinkWarn=!0,e.getting_acc_data=!1,e.getting_article_data=!1,r){
a.findParentByTagName(r,"a",!0)&&(r=a.findParentByTagName(r,"a",!0));
var c=r.text||"你已选中了添加链接的文本内容";
t.$outerTitle.val(c).attr("disabled",!0).parent().addClass("disabled"),t.$innerTitle.val(c).attr("disabled",!0).parent().addClass("disabled"),
t.$outerLinkInput.val(r.href||"http://"),t.$innerLinkInput.val(r.href||"http://"),
e.canWriteBack=!1;
}else e.canWriteBack=!0;
if(window.wx&&window.wx.cgiData&&"undefined"!=typeof window.wx.cgiData.func_ban_info&&!_(wx.cgiData.func_ban_info,"outer-url")){
var s,o=18;
$.each(wx.cgiData.func_ban_info,function(e,t){
return t.func_id==o?(s=t,!1):void 0;
});
var l=_.getReason(s.reason_id),d='你的帐号<a target="_blank" href="'+(l.pc_url?l.pc_url:defaultReason.pc_url)+'">'+l.reason_description+"</a>，",u=new Date(1e3*s.unlock_time);
s.ban_time==s.unlock_time?d+="已被永久屏蔽图文消息外链功能。":(d+="已被屏蔽图文消息外链功能至",d+=u.getFullYear()+"/"+(u.getMonth()+1)+"/"+u.getDate(),
d+="，期间图文消息外链功能将不可用。"),t.$outerLinkInput.attr("disabled",!0).parent().addClass("disabled"),
t.$ok.disable(),t.$warnTips.show().find(".js_tips").html(d);
}
e._linkDialog.popup("show");
},
__destroy:function(){
var e=this.__g;
e._linkDialog&&(e._linkDialog.popup("remove"),e._linkDialog=null),this._popover&&(this._popover.remove(),
this._popover=null),e.acc_pagebar&&(e.acc_pagebar.destroy(),e.acc_pagebar=null),
e.article_pagebar&&(e.article_pagebar.destroy(),e.article_pagebar=null),e.dom={},
e.form={},e.currentFakeid="",e.selectedArticle=void 0,e.curArticleList=[];
},
__DialogInit:function(){
var e=this,t=this.__g,i=wx.T(n,{
flag:t.can_use_hyperlink&&0!=t.can_use_appmsg_outer_url
});
t._linkDialog=$(i).popup({
title:"编辑超链接",
className:"align_edge link_dialog_wrap",
width:"800",
autoShow:!1,
buttons:[{
text:"确定",
type:"primary",
click:function(){
t._linkDialog;
if(e.__checkAccLoading("acc")!==!0&&e.__checkAccLoading("article")!==!0){
if(!t.form.form())return void l.err("请完善表单内容");
if(t.dom.$innerTabItem.hasClass("selected")){
var i;
if(t.dom.$innerMain.find("input[name=link_type][type=radio][value=1]").prop("checked"))i={
href:t.dom.$innerLinkInput.val().trim(),
target:"_blank"
},t.canWriteBack&&(i.textValue=t.dom.$innerTitle.val().trim());else{
if(!t.curArticleList||0==t.curArticleList.length)return void l.err("请搜索公众号文章");
if("undefined"==typeof t.selectedArticle||!t.curArticleList[t.selectedArticle])return void l.err("请选择公众号文章");
var a=t.curArticleList[t.selectedArticle];
i={
href:a.link,
target:"_blank"
},t.canWriteBack&&(i.textValue=a.title.replace(/<em>/g,"").replace(/<\/em>/g,""));
}
i&&e.__insertLink(i);
}else t.dom.$outerTabItem.hasClass("selected")&&(i={
href:t.dom.$outerLinkInput.val().trim(),
target:"_blank"
},t.canWriteBack&&(i.textValue=t.dom.$outerTitle.val().trim()),e.__insertLink(i));
e.__destroy();
}
}
},{
text:"取消",
click:function(){
e.__destroy();
}
}],
onHide:function(){
e.__destroy();
}
});
var a=t._linkDialog.popup("get");
t.dom={
$dialogDom:a,
$ok:a.find(".js_btn").eq(0),
$tabMain:a.find(".js_tab_main"),
$innerTabItem:a.find(".js_tab_item[data-tab=inner]"),
$outerTabItem:a.find(".js_tab_item[data-tab=outer]"),
$innerMain:a.find(".js_inner_main"),
$outerMain:a.find(".js_outer_main"),
$accPagebar:a.find(".js_acc_pagebar"),
$articlePagebar:a.find(".js_article_pagebar"),
$accLoading:a.find(".js_acc_loading"),
$articleLoading:a.find(".js_article_loading"),
$articleContent:a.find(".js_article_content"),
$accContent:a.find(".js_acc_content"),
$articleList:a.find(".js_article_list"),
$accList:a.find(".js_acc_list"),
$warnTips:a.find(".js_warn_tips"),
$outerTitle:a.find(".js_outer_title"),
$innerTitle:a.find(".js_inner_title"),
$innerLinkInput:a.find(".js_inner_link_input"),
$outerLinkInput:a.find(".js_outer_link_input"),
$accSearchMain:a.find(".js_acc_search_main"),
$jsSelfAcc:a.find(".js_self_acc"),
$accSearchBtn:a.find(".js_acc_search_btn"),
$accSearchDel:a.find(".js_acc_search_del"),
$accSearchInput:a.find(".js_acc_search_input"),
$accSearchTips:a.find(".js_acc_search_tips"),
$articleSearchBtn:a.find(".js_article_search_btn"),
$articleSearchDel:a.find(".js_article_search_del"),
$articleSearchInput:a.find(".js_article_search_input"),
$accDesc:a.find(".js_acc_desc"),
$accText:a.find(".js_acc_Text")
};
},
__insertLink:function(e){
var t,i=this.editor,a=i.getUtils();
i.fireEvent("funcPvUvReport","link"),e._href&&(e._href=a.unhtml(e._href,/[<">]/g)),
e.href&&(e.href=a.unhtml(e.href,/[<">]/g)),e.textValue&&(e.textValue=a.unhtml(e.textValue,/[<">]/g)),
this.__doLink(t=i.getSelectionRange(),e),t.collapse().select(!0);
},
__optimize:function(e){
var t=this.editor.getDomUtils(),i=e.startContainer,a=e.endContainer;
(i=t.findParentByTagName(i,"a",!0))&&e.setStartBefore(i),(a=t.findParentByTagName(a,"a",!0))&&e.setEndAfter(a);
},
__doLink:function(e,t){
var i=this.editor,a=e.cloneRange(),n=i.getBrowser(),r=i.getDomUtils(),c=i.queryCommandValue("link"),s=i.getUtils();
this.__optimize(e=e.adjustmentBoundary());
var o=e.startContainer;
if(1==o.nodeType&&c&&(o=o.childNodes[e.startOffset],o&&1==o.nodeType&&"A"==o.tagName&&/^(?:https?|ftp|file)\s*:\s*\/\//.test(o[n.ie?"innerText":"textContent"])&&(o[n.ie?"innerText":"textContent"]=s.html(t.textValue||t.href))),
(!a.collapsed||c)&&(e.removeInlineStyle("a"),a=e.cloneRange()),a.collapsed){
var l=e.document.createElement("a"),_="";
t.textValue?(_=s.html(t.textValue),delete t.textValue):_=s.html(t.href),r.setAttributes(l,t),
o=r.findParentByTagName(a.startContainer,"a",!0),o&&r.isInNodeEndBoundary(a,o)&&e.setStartAfter(o).collapse(!0),
l[n.ie?"innerText":"textContent"]=_,e.insertNode(l).selectNode(l);
}else e.applyInlineStyle("a",t);
}
},t;
});