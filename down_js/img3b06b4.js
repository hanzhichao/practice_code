define("common/wx/mpEditor/plugin/img.js",["tpl/mpEditor/plugin/img_popup.html.js","common/wx/media/imageDialog.js","common/wx/mpEditor/plugin/remoteimg.js"],function(t){
"use strict";
var e=t("tpl/mpEditor/plugin/img_popup.html.js"),i=t("common/wx/media/imageDialog.js"),o=t("common/wx/mpEditor/plugin/remoteimg.js"),n=function(t){
t&&t.container&&(this.domid=t.container,this.container=$(t.container).show());
};
return n.beforeSetContent=function(t){
var e=t.html.replace(/<img(.*?)\s+data\-src="/g,'<img$1 src="').replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qlogo.cn/")||"";
return e;
},n.formatHTML=function(t){
var e="300,640";
if(t=UE.utils.isArray(t)?t:[t],t.length){
var i,o=[],n="";
if(i=t[0],1==t.length){
var r=i.format||"";
"gif"==r&&(i.src+="/mmbizgif");
var a=' data-s="'+e+'" ';
i.src&&/\/mmbizgif$/.test(i.src)&&(i.src=i.src.replace(/\/mmbizgif$/,""),a=" "),
a+=r?' data-type="'+r+'" ':"",n="<img "+a+' src="'+i.src+'"'+("undefined"!=typeof i.copyright_status?' data-copyright="'+i.copyright_status+'"':"")+(i.title&&""!=i.title?' title="'+i.title+'"':"")+(i.border&&"0"!=i.border?' border="'+i.border+'"':"")+(i.alt&&""!=i.alt?' alt="'+i.alt+'"':"")+(i.hspace&&"0"!=i.hspace?' hspace = "'+i.hspace+'"':"")+(i.vspace&&"0"!=i.vspace?' vspace = "'+i.vspace+'"':"")+' style="'+(i.width?"width:"+i.width+"px;":"")+(i.height?" height:"+i.height+"px;":"")+("left"==i.floatStyle||"right"==i.floatStyle?"float:"+i.floatStyle+";":"")+'" />',
n="center"==i.floatStyle?'<p style="text-align: center">'+n+"</p>":"<p>"+n+"</p>",
o.push(n);
}else for(var s=0;i=t[s++];){
"gif"==i.format&&(i.src+="/mmbizgif");
var a=' data-s="'+e+'" ';
i.src&&/\/mmbizgif$/.test(i.src)&&(i.src=i.src.replace(/\/mmbizgif$/,""),a=" "),
a+=i.format?' data-type="'+i.format+'" ':"",n="<p "+("center"==i.floatStyle?'style="text-align: center" ':"")+"><img "+a+' src="'+i.src+'" '+("undefined"!=typeof i.copyright_status?' data-copyright="'+i.copyright_status+'"':"")+(i.title&&""!=i.title?' title="'+i.title+'"':"")+(i.border&&"0"!=i.border?' border="'+i.border+'"':"")+(i.alt&&""!=i.alt?' alt="'+i.alt+'"':"")+(i.hspace&&"0"!=i.hspace?' hspace = "'+i.hspace+'"':"")+(i.vspace&&"0"!=i.vspace?' vspace = "'+i.vspace+'"':"")+' style="'+(i.width?"width:"+i.width+"px;":"")+(i.height?" height:"+i.height+"px;":"")+("left"==i.floatStyle||"right"==i.floatStyle?"float:"+i.floatStyle+";":"")+'" /></p>',
o.push(n);
}
return o;
}
},n.prototype={
getName:function(){
return"insertimage";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
var e=this,o=t.editor;
o&&i({
maxSelect:100,
doselected:!0,
uploadGroupId:3,
completeUploadMinSelectNum:1,
onOK:function(i){
t.doCommand(e,"insertimage",i.map(function(t){
return t.src=t.url,t;
}));
var n=0,r=0;
$.each(i,function(t,e){
"upload"==e.source?n++:r++;
}),n>0&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:39,
val:n,
level:"trace",
content:"[file=media/appmsg_edit]"
}),r>0&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:40,
val:r,
level:"trace",
content:"[file=media/appmsg_edit]"
});
var a=i.length;
a>0&&o.funcPvUvReport("insertimage",a),this.destroy(),document.body.style.overflow=document.documentElement.style.overflow="auto";
},
onHide:function(){
this.destroy(),document.body.style.overflow=document.documentElement.style.overflow="auto";
}
});
};
},
doCommand:function(t,e,i){
if(i){
console.log("insert image");
var o=t,r=n.formatHTML(i);
return o.execCommand("insertHtml",r.join(""));
}
},
getContainer:function(){
return this.domid;
},
getPluginData:function(t){
var e=t.init(),i=e.get("content");
e.set("content",i.replace(/<img(.*?)\s+src="/g,'<img$1 data-src="').replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/"));
},
addListener:function(t){
var e=this,i=t.getUeditor();
t.getBrowser().ie?this._showPopup(t):t.addListener("click",function(e,o){
var n=o.target||o.srcElement;
if(n&&"IMG"==n.tagName&&"false"!=i.body.contentEditable){
var r=new UE.dom.Range(i.document);
r.selectNode(o.target).select(),t.fireEvent("img_selected",o,n);
}
}),t.addListener("get_img_popup_html",function(t,i){
return e._getImgPopupHtml(i);
}),t.addListener("afterpaste",function(t,e,i){
$(i).find(".gif_bg_tips_wrp").each(function(){
$(this).remove();
}),$(i).find(".gif_img_tips_group").each(function(){
$(this).remove();
}),$(i).find(".gif_img_tips").each(function(){
$(this).remove();
}),$(i).find(".load_img_tips").each(function(){
$(this).remove();
}),$(i).find(".load_img_wrp").each(function(){
$(this).remove();
}),$(i).find(".js_img_tips").each(function(){
$(this).remove();
}),$.each(i,function(){
$(this).find("img").each(function(){
var t=$(this).attr("src")||"";
t.indexOf("/s640?")>-1&&t.indexOf("wx_fmt=gif")>-1&&$(this).parent().hasClass("gif_img_wrp")&&$(this).parent().before(this).remove(),
$(this).removeAttr("data-forceheight").removeAttr("data-nopreviewclick");
}),$(this).hasClass("js_img_tips")&&$(this).remove();
});
}),t.addListener("insertMaterialImg",function(t,o){
return e.doCommand(i,"insertimage",o);
}),t.addListener("afterpasteimg aftersetcontent afterinserthtml afterCropImg",function(e,i,o){
var n=$(t.getDocument()).find("body").width(),r=$(o),a=r.filter("img").add(r.find("img"));
a.each(function(){
var e=$(this);
e.attr("data-ratio")&&e.attr("data-w")||!function(t,e){
var i=new Image,o=t.attr("src");
e.delegateDomAsyn({
dom:t,
timeout:1e4,
requsetFun:function(){
i.onload=this.requsetSucFun,i.onerror=this.requsetFailFun,i.src=o;
},
requsetSucFun:function(t){
if(i){
if(t&&t.newDom){
var e=i.naturalWidth||i.width||0,o=i.naturalHeight||i.height||0;
0!=e&&0!=o&&(t.newDom.attr("data-ratio",o/e),t.newDom.attr("data-w",n==e?"":e));
}
i.onload=null,i.onerror=null,i=null;
}
},
requsetFailFun:function(t){
i&&(t&&t.newDom&&t.newDom.removeAttr("data-ratio").removeAttr("data-w"),i.onload=null,
i.onerror=null,i=null);
}
});
}(e,t);
});
});
},
beforeSetContent:function(t){
return n.beforeSetContent({
html:t
});
},
_showPopup:function(t){
var e=this,i=t.getUeditor();
t.addListener("handle_common_popup",function(t,o){
var n=i.selection.getRange().getClosedNode(),r=e._getImgPopupHtml(n,o);
r&&(o.html+=r,o.node=n);
});
},
_getImgPopupHtml:function(t,i){
var n=$(t),r="";
if(t&&/^img$/i.test(t.tagName)&&!n.hasClass("js_noimgpopup")&&!this._filterPopup(t)){
var a=!1;
"100%"==t.style.width&&"auto"==t.style.height&&(a=!0);
var s=!0,m=o.defaultRemoteImg.replace("http://","").replace("https://","");
(!o.isCdnImg(t.src)||t.src.indexOf(m)>0)&&(s=!1),r=wx.T(e,{
hasCropimg:s,
needBreak:i&&i.html?!0:!1,
hasadapt:a
});
}
return r;
},
_filterPopup:function(t){
if(!t)return!1;
var e=t.src||"";
return/^http(s)?:\/\/res\.wx\.qq\.com\/mpres\/htmledition\/images\/icon\/common\/emotion_panel/.test(e)?!0:/http(s)?:\/\/res\.wx\.qq\.com\/mpres\/zh_CN\/htmledition\/comm_htmledition\/images\/pic\/common\/pic_blank\.gif/.test(e)?!0:void 0;
}
},n;
});