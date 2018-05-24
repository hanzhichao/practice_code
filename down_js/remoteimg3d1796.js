define("common/wx/mpEditor/plugin/remoteimg.js",["common/wx/Tips.js","media/report.js","common/wx/mpEditor/plugin/filter.js"],function(require,exports,module){
"use strict";
function Remoteimg(e){
this.init(e),this.addEvent();
}
var Tips=require("common/wx/Tips.js"),Report=require("media/report.js"),Filter=require("common/wx/mpEditor/plugin/filter.js"),g={
appmsgTmpImg:"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
defaultRemoteImg:"http://mmbiz.qpic.cn/mmbiz/G1lssUsxJOsVVJNUIuKfUP7bLm5EVWxXl5znicMum6Os0CMJHPdeHicicZ4W5MGOVa8ooSXYuE61Ek/0"
};
return Remoteimg.defaultRemoteImg=g.defaultRemoteImg,Remoteimg.prototype.init=function(e){
var t=this;
this.uploadUrl=(~location.hostname.search(/^mp/)?"https://mp.weixin.qq.com":"")+"/cgi-bin/filetransfer?action=upload_material&f=json&scene=8&writetype=doublewrite&groupid=3&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&svr_time="+wx.data.time,
this.uploadUrl=wx.url(this.uploadUrl),this.mpeditor=e,this.editor=e.getUeditor(),
this.domUtils=UE.dom.domUtils,this.ajax=UE.ajax,this.localDomain=["127.0.0.1","localhost","mmbiz.qpic.cn","mmbiz.qlogo.cn","m.qpic.cn",/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g,"mmsns.qpic.cn"],
this.catcherUrl=this.editor.options.catcherUrl,this.catchFieldName="imgurl",this.separater="ue_separate_ue",
this.id=+new Date,this.remoteList={},this.Blob_obj_support=function(){
try{
return!!window.Blob&&Boolean(new Blob);
}catch(e){
return!1;
}
}(),this.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,
this.dataURLtoBlobSupport=function(){
return(t.BlobBuilder||t.Blob_obj_support)&&window.atob&&window.ArrayBuffer&&window.Uint8Array?!0:!1;
}(),this.Blob_Uint8Array_support=function(){
try{
return!!t.Blob_obj_support&&!!window.Uint8Array&&100===new Blob([new Uint8Array(100)]).size;
}catch(e){
return!1;
}
}();
},Remoteimg.prototype.addEvent=function(){
var _t=this,me=this.editor,mpeditor=this.mpeditor;
me.addListener("onpasting",function(e,t){
var r=null,o=t.clipboardData?t.clipboardData:t.originalEvent&&t.originalEvent.clipboardData?t.originalEvent.clipboardData:{},i=o.items;
if(i&&i.length>0){
Report.addNum(Report.reportId[2],5,1),1==i.length&&/image/i.test(i[0].type)&&(r=i[0].getAsFile());
for(var a=0,n=i.length;n>a;a++)/text\/rtf/i.test(i[a].type)&&Report.addNum(Report.reportId[2],6,100);
}
return _t.catchObjectBlob(r);
}),me.addListener("afterpaste aftersetcontent afterinserthtml",function(e,t,r){
for(var o,i,a,n,m=[],s=0;n=r[s++];)if(n.tagName){
o="img"==n.tagName.toLowerCase()?[n]:_t.domUtils.getElementsByTagName(n,"img");
for(var c,p=0;c=o[p++];){
if(_t.handleDataSrc(c),i=c.getAttribute("style")||c.style.cssText||"",c.getAttribute("src")&&/;?\s*(background|background-image)\s*\:/.test(i)&&($(c).css({
"background-image":"none"
}).removeClass("img_loading"),Filter.filterStyleAttr(c,["background-image"])),c.src===g.appmsgTmpImg){
var d=c.getAttribute("data-src");
d&&_t.isLocalDomain(d)&&(c.src=d,c.removeAttribute("data-src"));
}
_t.http2https("img",c),a=c.getAttribute("_src")||c.src||"",/^(https?|ftp):/i.test(a)&&!_t.isLocalDomain(a)?me.fireEvent("catchRemoteImage",c,"img",a):/^data:image/i.test(a)?_t.catchDataUrl(a,c):/^blob:/i.test(a)?_t.catchObjectUrl(c,a):_t.isLocalDomain(a)||c.parentNode&&c.parentNode.removeChild(c);
}
for("afterpaste"==e&&o.length>0&&me.fireEvent("afterpasteimg","",o),m=[n],m.push.apply(m,_t.domUtils.getElementsByTagName(n,"*")),
p=0;c=m[p++];)if(i=c.getAttribute("style")||c.style.cssText||"",i=i.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/),
i&&i[2]){
a=i[2].replace(/^['"]|['"]$/g,"");
var l=_t.http2https("bg",c,a);
a=l&&l.url?l.url:a,/^(https?|ftp):/i.test(a)&&!_t.isLocalDomain(a)?me.fireEvent("catchRemoteImage",c,"bg",a):/^data:image/i.test(a)?_t.catchDataUrl(a,c):/^blob:/i.test(a)?_t.catchObjectUrl(c,a):_t.isLocalDomain(a)||(c.style.background="");
}
for(p=0;c=m[p++];)c.style&&(c.style.borderImage="",c.style.borderImageSource="");
}
}),me.addListener("catchRemoteImage",function(cmd,ci,type,url){
var remoteObj=_t.setRemoteTag({
dom:ci,
uid:"c"+_t.getuid()
});
if(remoteObj){
var uid=remoteObj.uid;
"bg"==type?me.fireEvent("funcPvUvReport","remoteimg_style"):"img"==type&&me.fireEvent("funcPvUvReport","remoteimg_img"),
_t.catchremoteimage([url],{
success:function(xhr){
!!_t.remoteList[uid]&&delete _t.remoteList[uid];
try{
var info=eval("("+xhr.responseText+")");
}catch(e){
return me.fireEvent("funcPvUvReport","remoteimgerr"),me.fireEvent("catchremoteerror",remoteObj,""),
void _t.checkRemoteList(!0);
}
info&&0==info.errcode&&info.url?(me.fireEvent("funcPvUvReport","remoteimgsuc"),me.fireEvent("catchremotesuccess",remoteObj,info.url,info.img_format)):(me.fireEvent("funcPvUvReport","remoteimgerr"),
me.fireEvent("catchremoteerror",remoteObj,"")),_t.checkRemoteList(!0);
},
error:function(){
!!_t.remoteList[uid]&&delete _t.remoteList[uid],me.fireEvent("funcPvUvReport","remoteimgerr"),
me.fireEvent("catchremoteerror",remoteObj,""),_t.checkRemoteList(!0);
}
});
}
}),me.addListener("checkRemoteList",function(e,t){
return _t.checkRemoteList(t===!0?!0:!1);
}),me.addListener("getRemoteList",function(){
return _t.remoteList;
});
},Remoteimg.prototype.catchObjectBlob=function(e,t){
var r=this,o=this.editor,i=!1;
if(null!==e&&(i=r.filterImgSize(e)),null!==e&&i!==!0)return r.pasteImageError({
msg:i.msg?i.msg:"图片粘贴失败",
dom:t
}),!0;
if(null!==e&&i===!0){
var a,n=e.type.split("/")[1]||"";
if(a=o.window.URL||o.window.webkitURL){
var m=a.createObjectURL(e);
if("string"==typeof m)return t?r.uploadPasteImg({
image:m,
blob:e,
type:n,
dom:t
}):r.pasteImageInserted({
image:m,
blob:e,
type:n
}),!0;
}
if("function"!=typeof FileReader)return!1;
var s=new FileReader;
return s.onload=function(o){
o.target&&2==o.target.readyState&&(t?r.uploadPasteImg({
image:m,
blob:e,
type:n,
dom:t
}):r.pasteImageInserted({
image:o.target.result,
blob:e,
type:n
}));
},s.onerror=function(){
r.pasteImageError({
msg:"图片粘贴失败",
dom:t
});
},s.readAsDataURL(e),!0;
}
},Remoteimg.prototype.catchObjectUrl=function(e,t){
var r=this,o=this.editor,i=r.setRemoteTag({
dom:e,
uid:"p"+r.getuid()
});
if(i){
var a=i.uid,n=new Image;
n.onerror=function(){
!!r.remoteList[a]&&delete r.remoteList[a],o.fireEvent("catchremoteerror",i,""),r.checkRemoteList(!0);
},n.onload=function(){
!!r.remoteList[a]&&delete r.remoteList[a],n.onerror=null,n.onload=null;
var t=n.width||n.naturalWidth,i=n.height||n.naturalHeight,m=o.document.createElement("canvas"),s=m.getContext("2d");
m.width=t,m.height=i,s.drawImage(n,0,0,t,i);
var c=m.toDataURL();
r.catchDataUrl(c,e);
},n.src=t;
}
},Remoteimg.prototype.catchDataUrl=function(e,t){
var r=this,o=r.dataURLtoBlob(e),i=!1;
if(o&&!r.validImg(o)&&(o=null),o)if(i=r.filterImgSize(o),i===!0){
var a=o.type.split("/")[1]||"";
r.uploadPasteImg({
image:e,
blob:o,
dom:t,
type:a
});
}else r.pasteImageError({
msg:i.msg?i.msg:"图片粘贴失败",
dom:t
});else r.pasteImageError({
msg:"图片粘贴失败",
dom:t
});
},Remoteimg.prototype.objectUrl2Blob=function(e,t,r){
var o=new XMLHttpRequest;
o.onerror=function(){
"function"==typeof r&&r();
},o.onreadystatechange=function(){
4===o.readyState&&(o.onreadystatechange=null,o.onerror=null,o.status>=200&&o.status<300?"function"==typeof t&&t(this.response):"function"==typeof r&&r());
},o.responseType="blob",o.open("GET",e,!0),o.send();
},Remoteimg.prototype.pasteImageError=function(e){
var t=this,r=this.editor;
if(!e.dom)return void r.fireEvent("catchremoteerror",null,e.msg||"");
var o=t.setRemoteTag({
dom:e.dom,
force:!0,
uid:"p_"+this.getuid()
});
!!t.remoteList[o.uid]&&delete t.remoteList[o.uid],r.fireEvent("catchremoteerror",o,e.msg||"");
},Remoteimg.prototype.pasteImageInserted=function(e){
for(var t=this,r=this.editor,o=r.fireEvent("insertMaterialImg",[{
format:e.type,
src:e.image
}]),i=0,a=o.length;a>i;i++){
var n=o[i];
if(/^img$/i.test(n.nodeName)){
e.dom=n;
break;
}
var m=n.getElementsByTagName("img");
if(m&&m.length>0){
e.dom=m[0];
break;
}
}
e.dom&&/^img$/i.test(e.dom.nodeName)&&t.uploadPasteImg(e);
},Remoteimg.prototype.dataURLtoBlob=function(e){
if(!this.dataURLtoBlobSupport)return!1;
try{
var t,r=e.split(",");
t=r[0].indexOf("base64")>=0?window.atob(r[1]):decodeURIComponent(r[1]);
for(var o=new ArrayBuffer(t.length),i=new Uint8Array(o),a=0,n=t.length;n>a;a++)i[a]=t.charCodeAt(a);
var m=r[0].split(":")[1].split(";")[0];
if(this.Blob_obj_support)return this.Blob_Uint8Array_support?new Blob([i],{
type:m
}):new Blob([o],{
type:m
});
var s=new BlobBuilder;
return s.append(o),s.getBlob(m);
}catch(c){
return!1;
}
},Remoteimg.prototype.setRemoteTag=function(e){
var t=this,r=this.editor,o=r.fireEvent("get_current_article");
if(!e.dom||!e.uid)return!1;
var i=e.dom.getAttribute("data-remoteid");
if(i&&t.remoteList[i]){
if(e.force!==!0)return!1;
delete t.remoteList[i];
}
i=i||e.uid;
var a=t.remoteList[i]={
article:o,
uid:i,
defaultRemoteImg:g.defaultRemoteImg
};
return t.domUtils.setAttributes(e.dom,{
"data-remoteid":i
}),a;
},Remoteimg.prototype.uploadPasteImg=function(opt){
var _t=this,me=this.editor;
if("function"!=typeof FormData)return _t.pasteImageError({
msg:"粘贴图片失败",
dom:opt.dom
}),!1;
var id=this.getuid(),remoteObj=_t.setRemoteTag({
dom:opt.dom,
uid:"p_"+id
});
if(remoteObj){
var uid=remoteObj.uid,form=new FormData,extensions=opt.blob.type.split("/")[1]||"",url=this.uploadUrl+"&seq="+id,filename="粘贴图片_"+this.formatDate(new Date,"YYYYMMDDHHIISS")+(extensions?"."+extensions:"");
form.append("id",id),form.append("name",filename),form.append("type",opt.blob.type),
form.append("lastModifiedDate",new Date),form.append("size",opt.blob.size),form.append("file",opt.blob,filename);
var xhr=new XMLHttpRequest;
xhr.onerror=function(){
!!_t.remoteList[uid]&&delete _t.remoteList[uid],me.fireEvent("funcPvUvReport","screen_shot_fail"),
me.fireEvent("catchremoteerror",remoteObj,""),_t.checkRemoteList(!0);
},xhr.onreadystatechange=function(error){
if(4===xhr.readyState)if(xhr.upload.onprogress=null,xhr.onreadystatechange=null,
xhr.onerror=null,!!_t.remoteList[uid]&&delete _t.remoteList[uid],xhr.status>=200&&xhr.status<300){
try{
var info=eval("("+xhr.responseText+")");
}catch(e){
return me.fireEvent("funcPvUvReport","screen_shot_fail"),me.fireEvent("catchremoteerror",remoteObj,""),
void _t.checkRemoteList(!0);
}
if(info&&info.base_resp&&0==info.base_resp.ret&&info.cdn_url){
var cdnUrl=info.cdn_url.http2https();
me.fireEvent("funcPvUvReport","screen_shot_suc"),me.fireEvent("catchremotesuccess",remoteObj,cdnUrl,extensions);
}else info&&info.base_resp&&220001==info.base_resp.ret?Tips.err('"素材管理"中的存储数量已达到上限，请删除后再操作。'):info&&info.base_resp&&220002==info.base_resp.ret?Tips.err("你的图片库已达到存储上限，请进行清理。"):(me.fireEvent("funcPvUvReport","screen_shot_fail"),
me.fireEvent("catchremoteerror",remoteObj,""));
_t.checkRemoteList(!0);
}else me.fireEvent("funcPvUvReport","screen_shot_fail"),me.fireEvent("catchremoteerror",remoteObj,""),
_t.checkRemoteList(!0);
},xhr.open("POST",url),xhr.send(form);
}
},Remoteimg.prototype.validImg=function(e){
return e.size<1024?!1:!0;
},Remoteimg.prototype.filterImgSize=function(e){
var t=5242880,r=",bmp,png,jpeg,jpg,gif,",o=","+(e.type.split("/")[1]||"")+",";
return e.size>t?{
type:1,
msg:"截图的图片大小不能超过5M"
}:-1==r.indexOf(o)?{
type:2,
msg:"截图的图片必须为以下格式：bmp,png,jpeg,jpg,gif"
}:!0;
},Remoteimg.prototype.checkRemoteList=function(e){
var t=0;
for(var r in this.remoteList)this.remoteList.hasOwnProperty(r)&&t++;
return t>0?!1:(e===!0&&(this.editor.fireEvent("draft_force_save"),this.editor.fireEvent("remoteimg_all_complete")),
!0);
},Remoteimg.prototype.handleDataSrc=function(e){
var t=e.getAttribute("src")||"",r=e.getAttribute("data-src")||"";
/^data:image/i.test(t)&&(/^http:\/\/mmbiz\.qpic\.cn/.test(r)||/^https:\/\/mmbiz\.qlogo\.cn/.test(r))&&(e.setAttribute("src",r),
e.removeAttribute("data-src"));
},Remoteimg.prototype.http2https=function(e,t,r){
if("img"==e){
var o=t.getAttribute("src")||"";
if(!this.isCdnImg(o))return;
var i=this.formatUrl(o);
return t.setAttribute("src",i.url),!!i.format&&t.setAttribute("data-type",i.format),
t.removeAttribute("_src"),t.removeAttribute("data-src"),i;
}
if("bg"==e&&r&&this.isCdnImg(r)){
var i=this.formatUrl(r);
return t.style.backgroundImage=i.url,i;
}
return null;
},Remoteimg.prototype.formatUrl=function(e){
e=e||"";
var t=e.match(/(?:\?|&)wx_fmt=(.*?)(?:&|$)/)||[];
return t=t[1]||"",e=e.http2https().replace(/\?.*$/,"?"),t&&e&&(e=e+"wx_fmt="+t),
{
url:e,
format:t
};
},Remoteimg.prototype.catchremoteimage=function(e,t){
var r=e.join(this.separater),o=(this.editor,{
timeout:6e4,
onsuccess:function(){
"function"==typeof t.success&&t.success.apply(this,arguments);
},
onerror:function(){
"function"==typeof t.error&&t.error.apply(this,arguments);
}
});
try{
var i=decodeURIComponent(r);
o[this.catchFieldName]=encodeURI(i);
}catch(a){
o[this.catchFieldName]=r;
}
o.t="ajax-editor-upload-img";
var n=this;
setTimeout(function(){
n.ajax.request(n.catcherUrl,o);
},2e3);
},Remoteimg.prototype.getuid=function(){
return this.id++;
},Remoteimg.isCdnImg=Remoteimg.prototype.isCdnImg=function(e){
for(var t,r=[/^http(s)?:\/\/mmbiz\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmbiz\.qlogo\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmsns\.qpic\.cn([\/?].*)*$/i],o=0;t=r[o++];)if(t.test(e))return!0;
return!1;
},Remoteimg.isLocalDomain=Remoteimg.prototype.isLocalDomain=function(e){
for(var t,r=[/^http(s)?:\/\/mmbiz\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmbiz\.qlogo\.cn([\/?].*)*$/i,/^http(s)?:\/\/m\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmsns\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mp\.weixin\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/res\.wx\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/(a|b)(\d)+\.photo\.store\.qq\.com([\/?].*)*$/i],o=0;t=r[o++];)if(t.test(e))return!0;
return!1;
},Remoteimg.prototype.formatDate=function(e,t){
var r=t.replace(/yyyy|YYYY/,e.getFullYear()).replace(/yy|YY/,this.addZero(e.getFullYear()%100,2)).replace(/mm|MM/,this.addZero(e.getMonth()+1,2)).replace(/m|M/g,e.getMonth()+1).replace(/dd|DD/,this.addZero(e.getDate(),2)).replace(/d|D/g,e.getDate()).replace(/hh|HH/,this.addZero(e.getHours(),2)).replace(/h|H/g,e.getHours()).replace(/ii|II/,this.addZero(e.getMinutes(),2)).replace(/i|I/g,e.getMinutes()).replace(/ss|SS/,this.addZero(e.getSeconds(),2)).replace(/s|S/g,e.getSeconds());
return r;
},Remoteimg.prototype.addZero=function(e,t){
for(var r=0,o=t-(e+"").length;o>r;r++)e="0"+e;
return e+"";
},Remoteimg;
});