define("common/wx/mpEditor/plugin/adv.js",["common/wx/media/adDialog.js","common/wx/Tips.js"],function(e){
"use strict";
var t=e("common/wx/media/adDialog.js"),i=e("common/wx/Tips.js"),a=function(e){
e&&e.container&&(this.domid=e.container,this.container=$(e.container).show()),0==e.has_ad&&this.container&&this.container.length>0&&this.container.addClass("disabled"),
this.can_see_ad=e.can_see_ad||!1;
var t=this;
document.addEventListener("EditorCpcEdit",function(){
console.log("触发iframe EditorCpcEdit"),t._editCpc();
}),document.addEventListener("EditorCpcDel",function(){
console.log("触发iframe EditorCpcDel"),t._delCpc();
});
};
return a.beforeSetContent=function(e){
if(!e.html)return"";
var t=e.html.replace(/<mpcpc([^>]*?)js_editor_cpcad([^>]*?)><\/mpcpc>/g,"<iframe $1js_editor_cpcad$2></iframe>"),i=$("<div>"+t+"</div>");
return e.can_see_ad||(i=a.filterData(i)),i.html();
},a.filterData=function(e){
return e.find("mpcpc").remove(),e.find("iframe.js_cpc_area").remove(),e;
},a.prototype={
getName:function(){
return"insertad";
},
getContainer:function(){
return this.domid;
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var e=this;
return function(){
console.log("insert ad");
var a=e.editor,r=this;
return a?$(a.ueditor.getContent()).find("iframe.js_cpc_area").length>0||"block"==$(".appmsg_edit_ad_preview").css("display")?(i.err("每篇图文消息只可插入一个广告卡片"),
!1):wx.cgiData.has_ad?void new t({
idx:$(".js_appmsg_item.current").data("msgindex"),
onOK:function(t){
e.doCommand(r,t);
}
}):(i.err("暂无可插入的广告卡片"),!1):!1;
};
},
doCommand:function(e,t){
var i=this;
t.ad_id?i._insertSponsor(e,t):0==t.ad_type?this._insertCpcCatsItems(e,t.category_id_list):1==t.ad_type&&this._insertCpcSingleItem(e,t);
},
initPluginData:function(){},
beforeSetContent:function(e){
return a.beforeSetContent({
html:e,
can_see_ad:this.can_see_ad
});
},
addListener:function(e){
var t=this;
e.addListener("beforepaste",function(e,i){
var a=$("<div>"+i.html+"</div>");
a=t._filterData(a),i.html=a.html();
});
},
getPluginData:function(e){
var t=e.init(this.initPluginData()),i=t.get("content");
if(i){
var a=$("<div>"+i+"</div>");
this.can_see_ad||(a=this._filterData(a)),t.set("content",a.html().replace(/<iframe([^>]*?)js_editor_cpcad([^>]*?)><\/iframe>/g,"<mpcpc $1js_editor_cpcad$2></mpcpc>"));
}
},
check:function(e){
if(-1==e.html().indexOf("js_editor_cpcad"))return!0;
var t=e.html().split("js_editor_cpcad")[0]+">",i="<"+e.html().split("js_editor_cpcad")[1];
return t.replace(/<[^>]*>/g,"").replace(/ /g,"").length<300?(this._showErrMsg("文中广告卡片前未满300个字符"),
!1):i.replace(/<[^>]*>/g,"").replace(/ /g,"").length<300?(this._showErrMsg("文中广告卡片后未满300个字符"),
!1):!0;
},
_showErrMsg:function(e){
var t=$(this.editor.getDom()).find(".js_content_error");
this.editor.fireEvent("showErrMsg",t,e),this.editor.fireEvent("scrollIntoView",t,200);
},
_editCpc:function(){
var e=this,i=(e.editor.getDom(),$(this.editor.getDocument()).find("iframe.js_cpc_area").attr("data-category_id_list")||""),a=$(this.editor.getDocument()).find("iframe.js_cpc_area").attr("data-single_category_id")||"",r=$(this.editor.getDocument()).find("iframe.js_cpc_area").attr("data-single_aids")||"";
new t({
idx:$(".js_appmsg_item.current").data("msgindex"),
cpc_edit_data:{
category_id_list:i,
single_category_id:a,
single_aids:r
},
onOK:function(t){
$(e.editor.getDocument()).find("iframe.js_cpc_area").removeAttr("data-category_id_list"),
$(e.editor.getDocument()).find("iframe.js_cpc_area").removeAttr("data-single_category_id"),
$(e.editor.getDocument()).find("iframe.js_cpc_area").removeAttr("data-single_aids");
var i="/cgi-bin/readtemplate?t=tmpl/cpc_tmpl";
if($(e.editor.getDocument()).find("iframe.js_cpc_area").attr("src",i),0==t.ad_type)$(e.editor.getDocument()).find("iframe.js_cpc_area").attr("data-category_id_list",t.category_id_list.join("|"));else{
$(e.editor.getDocument()).find("iframe.js_cpc_area").attr("data-single_category_id",t.single_category_id),
$(e.editor.getDocument()).find("iframe.js_cpc_area").attr("data-single_aids",t.single_aids);
var i="/cgi-bin/readtemplate?t=tmpl/cpc_tmpl&image_url="+encodeURIComponent(t.image_url)+"&aids_length="+t.single_aids_length;
$(e.editor.getDocument()).find("iframe.js_cpc_area").attr("src",i);
}
}
}),console.log("_editCpc");
},
_delCpc:function(){
$(this.editor.getDocument()).find("iframe.js_cpc_area").remove(),console.log("_delCpc");
},
_filterData:function(e){
return a.filterData(e);
},
_insertCpcCatsItems:function(e,t){
var i=e,a="/cgi-bin/readtemplate?t=tmpl/cpc_tmpl",r=t.join("|"),n='<iframe js_editor_cpcad class="js_cpc_area res_iframe cpc_iframe" data-category_id_list="'+r+'" src="'+a+'"></iframe>';
i.execCommand("insertHtml",n);
},
_insertCpcSingleItem:function(e,t){
var i=e,a="/cgi-bin/readtemplate?t=tmpl/cpc_tmpl&image_url="+encodeURIComponent(t.image_url)+"&aids_length="+t.single_aids_length,r='<iframe js_editor_cpcad class="js_cpc_area res_iframe cpc_iframe" data-single_category_id="'+t.single_category_id+'" data-single_aids="'+t.single_aids+'"  src="'+a+'"></iframe>';
i.execCommand("insertHtml",r);
},
_insertSponsor:function(e,t){
var i=e,a=$(".js_ad_preview");
a.html(template.render("js_ad_preview_tpl",t)).parent().show(),a.parent().find(".js_tag").text(0==t.trade_mode?"广告推荐":"内容定制");
var r=new UE.dom.Range(i.document);
r.selectNode(i.body.childNodes[i.body.childNodes.length-1]).select().setCursor(!0,!1);
for(var n=$(i.body),c=n.height()-16,o="",d=0;d<n.children().length;d++)c-=n.children().eq(d).outerHeight(!0);
if(c>=0)for(var d=0;d<Math.floor(c/25);d++)o+="<br/>";
0==t.trade_mode&&i.execCommand("inserthtml","<p>"+o+t.ad_tips+"</p>",!0),i.fireEvent("scrollIntoView",a,$(window).height()-a.height()-72-30);
}
},a;
});