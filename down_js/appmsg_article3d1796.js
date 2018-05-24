define("media/appmsg_article.js",["media/common.js","media/base_article.js"],function(t){
"use strict";
var e=t("media/common.js"),i=t("media/base_article.js"),r=i.inherit({
init:function(){},
getDigestFromContent:function(){
var t=this.data;
return $.trim(t.get("content").text().html(!1).substr(0,54));
},
setEditorContent:function(){
var t=this;
t._o.ueditor.ready(function(){
var e=t.data.getData(),i=t._o.ueditor;
i.setContent("");
try{
i.setContent(e.content);
}catch(r){
e.content&&""==i.getUeditor().getContent()&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=editor_setcontent_error;errmsg:%s,uin:%s".sprintf(28308,0,r.message,wx.data.uin),
window.BJ_REPORT&&"function"==typeof window.BJ_REPORT.report&&r&&r.stack&&(r.stack="editor_setcontent_error|"+r.stack,
window.BJ_REPORT.report(r)),r.stack&&console&&console.error&&console.error("[BJ-REPORT]",r.stack));
}
i.setHistory(t.getHistory());
});
},
flush:function(){
{
var t=this.data;
this._o.$infoContainer,this._o.cgiData;
}
return this.flushField(),t.setData(this._o.ueditor.getEditorData(t.getData())),this.setDigest(),
this.flushCommon(),this;
},
getAllImgData:function(){
var t=this._o.ueditor,e=t.fireEvent("getRemoteList"),i=[];
for(var r in e){
var o=e[r];
i.push(o.uid);
}
i=0==i.length?"":","+i.join(",")+",";
for(var s=t.getDocument(),n=s.getElementsByTagName("*"),a=",",d=[],r=0,c=n.length;c>r;r++){
var o=n[r];
if(/img/i.test(o.nodeName)){
var l=o.getAttribute("_src")||o.src||"",u=o.getAttribute("data-remoteid")||"";
if($(o).hasClass("js_catchremoteimageerror"))continue;
if(!l)continue;
if(a.indexOf(","+l+",")>=0)continue;
var h=!1;
i&&u&&i.indexOf(","+u+",")>=0&&(h=!0),a+=l+",",d.push({
url:this.git2Img(l),
uid:u,
isRemote:h
});
}else{
var m=o.getAttribute("style")||o.style.cssText||"";
if(m=m.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/),m&&m[2]){
var l=m[2].replace(/^['"]|['"]$/g,""),u=o.getAttribute("data-remoteid")||"";
if($(o).hasClass("js_catchremoteimageerror"))continue;
if(!l)continue;
if(a.indexOf(","+l+",")>=0)continue;
var h=!1;
i&&u&&i.indexOf(","+u+",")>=0&&(h=!0),a+=l+",",d.push({
url:this.git2Img(l),
uid:u,
isRemote:h
});
}
}
}
return d;
},
git2Img:function(t){
return/\/0\?(.*&)?wx_fmt=gif/.test(t)?t.replace(/\/0\?/,"/s640?"):t;
},
validateCatchRemoteImage:function(t){
var e=$("<div>").html(t.content),i=e.find(".js_catchremoteimageerror").length;
if(i){
var r=this._o.$infoContainer.find(".js_catch_tips");
return this.showErrMsg(r,"有%s张图片粘贴失败".sprintf(i)),this.scrollIntoView(r,200),!1;
}
return!0;
},
validateTitle:function(t){
var i=t.item,r=t.$dom,o=e.validate({
key:"title",
content:i.title,
strict:t.strict
});
return o&&o.msg&&(this.showErrMsg(r.find(".js_title_error"),o.msg),t.viewClass=t.viewClass||".js_title_error",
t.isValid=!1,2==o.type&&((new Image).src="https://mp.weixin.qq.com/misc/jslog?id=115&content=badjs&level=error")),
t;
},
validateAuthor:function(t){
var e=t.item,i=t.$dom;
return 0==e.copyright_type&&e.author.len()>16&&(this.showErrMsg(i.find(".js_author_error"),"作者不能超过8个字"),
t.viewClass=t.viewClass||".js_author_error",t.isValid=!1),t;
},
validateEditor:function(t,i){
var r=t.item,o=t.$dom,s=e.validate({
key:"content",
content:r.content,
editor:i,
strict:t.strict
});
return s&&s.msg&&(4==s.errType?t.isValid=!1:(this.showErrMsg(o.find(".js_content_error"),s.msg),
t.viewClass=t.viewClass||".js_content_error",t.isValid=!1)),t;
},
validate:function(t){
if(this.validateCatchRemoteImage(t)===!1)return null;
var e=this._o.$infoContainer,i=this._o.ueditor,r={
isValid:!0,
viewClass:"",
item:t,
$dom:e,
strict:!1
};
return t.title||t.content||t.fileid||(this.showErrMsg(e.find(".js_content_error"),"请先输入一段正文（或者标题），再点击保存按钮。"),
i.getUeditor().focus(),r.viewClass=r.viewClass||".js_content_error",r.isValid=!1),
r=this.validateTitle(r),r=this.validateAuthor(r),r=this.validateEditor(r,i),r=this.validateCommon(r),
this.handleValidateResult(r);
},
validateStrictly:function(t){
if(this.validateCatchRemoteImage(t)===!1)return null;
var e=this._o.ueditor,i={
isValid:!0,
viewClass:"",
item:t,
$dom:this._o.$infoContainer,
strict:!0
};
return i=this.validateTitle(i),i=this.validateAuthor(i),i=this.validateEditor(i,e),
i=this.validateStrictlyCommon(i),this.handleValidateResult(i);
},
modifyCurrentEditData:function(t){
i.prototype.modifyCurrentEditData.call(this,t),"undefined"!=typeof t.content&&this._o.ueditor.setContent(t.content);
},
render:function(){
var t=this._o.ueditor;
i.prototype.render.call(this),this.setEditorContent(),t.getUeditor().focus(),t.fireEvent("renderEditorByType",1);
}
});
return r.showDialog=function(t){
t.onOk();
},r;
});