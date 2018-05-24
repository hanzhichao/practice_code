define("common/wx/mpEditor/plugin/music.js",["biz_common/utils/string/html.js","common/wx/popup.js","tpl/mpEditor/plugin/music.html.js","tpl/media/dialog/audiomsg_layout.html.js","common/wx/media/audio.js","common/wx/pagebar.js","common/wx/Tips.js"],function(e){
"use strict";
function i(e){
this.__o={
container:""
},this.editor=null,this.__g={
qqsearchInfo:{}
},this.__init(e),$(e.container).show();
}
e("biz_common/utils/string/html.js"),e("common/wx/popup.js");
var t=e("tpl/mpEditor/plugin/music.html.js"),n=e("tpl/media/dialog/audiomsg_layout.html.js"),o=e("common/wx/media/audio.js"),r=e("common/wx/pagebar.js"),a=e("common/wx/Tips.js");
return i.prototype={
getName:function(){
return"insertmusic";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var e=this;
return function(){
console.log("insert music "),e.__openMusicPopup();
};
},
getContainer:function(){
return this.__o.container;
},
addListener:function(e){
{
var i=this;
this.__g;
}
e.addListener("beforepaste",function(e,t){
var n=$("<div>"+t.html+"</div>");
n=i.__filterData(n),t.html=n.html().replace(/<qqmusic([^>]*?)js_editor_qqmusic([^>]*?)><\/qqmusic>/g,"<iframe $1js_editor_qqmusic$2></iframe>");
});
},
beforeSetContent:function(e){
if(!e)return"";
var i=$("<div>"+e+"</div>");
return i=this.__filterData(i),e=i.html().replace(/<qqmusic([^>]*?)js_editor_qqmusic([^>]*?)><\/qqmusic>/g,"<iframe $1js_editor_qqmusic$2></iframe>");
},
initPluginData:function(){
return["music_id"];
},
getPluginData:function(e){
var i=e.init(this.initPluginData());
if(i.get("content")){
var t=$("<div>"+i.get("content")+"</div>");
t=this.__filterData(t),i.set("content",t.html().replace(/<iframe([^>]*?)js_editor_qqmusic([^>]*?)><\/iframe>/g,"<qqmusic $1js_editor_qqmusic$2></qqmusic>"));
for(var n=i.get("content"),o=/<qqmusic\s(?:[\s\S]*?)musicid\=[\'\"]([\d]*?)[\'\"](?:[\s\S]*?)>/g,r=[],a="",c=null;null!=(c=o.exec(n));)c[1]&&-1==a.indexOf(c[1]+",")&&(r.push(c[1]),
a+=c[1]+",");
i.set("music_id",r.join(","));
}
},
__init:function(e){
var i=this.__o;
for(var t in e)i.hasOwnProperty(t)&&(i[t]=e[t]);
},
__openMusicPopup:function(){
this.__initPop(),this.__initPopEvt();
},
__initPop:function(){
var e=this,i=this.__g,n=i._oSelectdSong={};
i._oAudioPop=$(t).popup({
title:"添加音乐",
className:"align_edge qqmusic_dialog",
width:"960",
buttons:[{
text:"确定",
type:"primary",
click:function(){
if(console.log("selected music "+n.mid),console.log(wx.url("/cgi-bin/registertopic?id="+n.musicid+"&type=1&src=1")),
"undefined"!=typeof n.musicid){
if(i.curSearchKey){
var t=e.__getSearchInfo(i.curSearchKey);
t&&t.hasReport===!1&&t.hasRetData===!0&&(t.hasSelected=!0);
}
var o=this,r=o.get().find(".js_btn_p").eq(0);
if(r.hasClass("btn_loading"))return;
r.btn(0),$.ajax({
url:wx.url("/cgi-bin/registertopic?id="+n.musicid+"&type=1&src=1"),
type:"post",
dataType:"json",
success:function(t){
i._oAudioPop&&(console.log("success"),console.log(t),r.btn(1),t&&"0"==t.base_resp.ret&&"undefined"!=typeof t.topic_id?(n.commentid=t.topic_id,
e.__insertMusic(e.__getMusicIframe()),console.log(n),i._oAudioPop=null,e.__clearReportInfo(),
o.remove()):a.err("系统繁忙，请稍后再试"));
}
});
}else a.err("请选择要插入的音乐");
}
},{
text:"取消",
click:function(){
n=e.__g._oSelectdSong={},i._oAudioPop=null,e.__clearReportInfo(),this.remove();
}
}],
close:function(){
n=e.__g._oSelectdSong={},i._oAudioPop=null,e.__clearReportInfo(),this.remove();
}
});
},
__clearReportInfo:function(){
var e=this.__g,i=this.__g.qqsearchInfo;
if(!e._oAudioPop){
e.curSearchKey="";
var t=[];
for(var n in i)i[n].hasReport===!0?delete i[n]:i[n].hasRetData===!0&&i[n].hasSelected===!0?(t.push("67292_5_1;67292_8_1"),
i[n].hasReport=!0,delete i[n]):i[n].hasRetData===!0&&i[n].hasSelected===!1&&(t.push("67292_5_1;67292_10_1"),
i[n].hasReport=!0,delete i[n]);
if(t.length>0){
var o=new Image;
o.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+t.join(";")+"&t="+Math.random();
}
}
},
__filterData:function(e){
return e.find("qqmusic").addClass("res_iframe qqmusic_iframe js_editor_qqmusic"),
e.find("span.qqmusic_area").remove(),e;
},
__insertMusic:function(e){
console.log("insertQQMusic");
var i=this.editor;
i.execCommand("inserthtml",e,!0),i.funcPvUvReport("insertmusic"),this.__g._oSelectdSong={};
},
__getMusicIframe:function(){
var e=this.__g._oSelectdSong,i=e.musicid,t=e.mid,n=e.url,o=e.songname,r=e.albumurl,a=e.singername,c=e.play_length,s=e.commentid,u="/cgi-bin/readtemplate?t=tmpl/qqmusic_tmpl&singer="+encodeURIComponent(a)+"&music_name="+encodeURIComponent(o);
return['<iframe class="res_iframe qqmusic_iframe js_editor_qqmusic" scrolling="no" frameborder="0"',' musicid="'+i.html(!0)+'"',' mid="'+t.html(!0)+'"',' albumurl="'+r.html(!0)+'"',' audiourl="'+n.html(!0)+'"',' music_name="'+o.html(!0)+'"',' commentid="'+s+'"',' singer="'+a.html(!0)+'" ',' play_length="'+c+'" ',' src="'+u,'"></iframe>'].join("");
},
__initPopEvt:function(){
this.__initSearch();
},
__initSearch:function(){
var e=this,i=this.__g._oAudioPop;
i.find("#searchDiv").show(),i.find("#keyInput").keydown(function(e){
var t="which"in e?e.which:e.keyCode;
13==t&&i.find("#searchBt").trigger("click");
}),i.find("#searchCloseBt").click(function(){
i.find("#keyInput").val("");
}),i.find("#searchBt").click(function(){
var t=i.find("#keyInput").val();
t.length>0?e.__QQMusicSearch({
keyword:t,
perpage:10,
currentpage:1
}):a.err("请输入搜索条件");
}),i.find("#reload").click(function(){
i.find("#searchCloseBt").trigger("click");
});
},
__initSearchInfo:function(e){
e&&(this.__g.qqsearchInfo[encodeURIComponent(e)]={
hasReport:!1,
hasRetData:!1,
hasSelected:!1
});
},
__getSearchInfo:function(e){
var i=encodeURIComponent(e);
return this.__g.qqsearchInfo[i]?this.__g.qqsearchInfo[i]:null;
},
__delSearchInfo:function(e){
var i=encodeURIComponent(e);
this.__g.qqsearchInfo.hasOwnProperty(i)&&delete this.__g.qqsearchInfo[i];
},
__QQMusicSearch:function(e){
var i=this,t=this.__g;
i.__getSearchInfo(e.keyword)||i.__initSearchInfo(e.keyword),window.MusicJsonCallback=function(o){
var r=new Image;
r.src="//mp.weixin.qq.com/mp/jsmonitor?idkey=67292_1_1&t="+Math.random();
var a=i.__getSearchInfo(e.keyword);
if(a.hasReport===!1)if(o&&0==o.retcode&&o.list&&!!o.list.length>0)a.hasRetData=!0;else{
a.hasRetData=!1,a.hasReport=!0;
var r=new Image;
r.src="//mp.weixin.qq.com/mp/jsmonitor?idkey=67292_5_1;67292_6_1&t="+Math.random(),
delete i.__delSearchInfo(o.keyword);
}
var c=i.__g._oAudioPop;
return c?(t.curSearchKey=o.keyword,o=i.__formatJsonData(o),c.find("#dialog_audio_container").html(wx.T(n,o)),
i.__initMusicfile(),void i.__initPageBar({
totalnum:o.totalnum,
perpage:o.perpage,
currentpage:o.curpage
})):void i.__clearReportInfo();
};
var o=new Image;
o.src="//mp.weixin.qq.com/mp/jsmonitor?idkey=67292_0_1&t="+Math.random();
var r=document.head||document.getElementsByTagName("head")[0]||document.documentElement,a=document.createElement("script"),c=["https://auth-external.music.qq.com/open/fcgi-bin/fcg_weixin_music_search.fcg?remoteplace=txt.weixin.officialaccount&w=",encodeURIComponent(e.keyword),"&platform=weixin&jsonCallback=MusicJsonCallback&perpage=",e.perpage,"&curpage=",e.currentpage].join("");
console.log("src="+c),a.type="text/javascript",a.src=c,r.appendChild(a);
},
__formatJsonData:function(e){
var i=this,t=$.extend({},e);
return t&&t.list&&$.each(t.list,function(e,t){
var n=t.f.split("|"),o=n[7]||0,r=n[12]||0,a=n[0],c=n[n.length-1],s=n[n.length-3],u="/"+c.charAt(c.length-2)+"/"+c.charAt(c.length-1)+"/"+c+".jpg";
$.extend(t,{
songtime:i.__formatTime(o),
songsize:i.__formatSize(r),
songid:a,
mid:s,
albumurl:u,
play_length:1e3*o
});
}),console.log("formatJsonData"),console.log(t),t;
},
__formatTime:function(e){
var i="";
if(60>e)i="00:"+(10>e?"0":"")+e;else{
var t=Math.floor(e/60),n=e-60*t;
i=(10>t?"0":"")+t+":"+(10>n?"0":"")+n;
}
return i;
},
__formatSize:function(e){
var i="";
return i=e>1048576?parseInt(e/1048576)+"M":"1M";
},
__initMusicfile:function(){
var e=this.__g,i=e._oSelectdSong,t=e._oAudioPop;
t.find(".qqmusic_audioplay").each(function(){
var e=$(this),i=e.attr("audioid"),t=e.attr("audiourl"),n={
selector:"#url_"+i,
qqmusicurl:t,
id:i,
qqmusictpl:!0
};
console.log("initMusicfile"),console.log(n);
new o(n);
}),t.find(".frm_radio").checkbox({
multi:!1,
onChanged:function(e){
console.log(e),i.musicid=e.val(),i.songname=(t.find("#songname_"+i.musicid).html()||"").html(!1),
i.singername=(t.find("#singername_"+i.musicid).html()||"").html(!1),i.url=t.find("#url_"+i.musicid).attr("audiourl"),
i.mid=t.find("#url_"+i.musicid).attr("mid"),i.albumurl=t.find("#url_"+i.musicid).attr("albumurl"),
i.play_length=t.find("#url_"+i.musicid).attr("play_length");
}
});
},
__initPageBar:function(e){
{
var i=this,t=this.__g,n=t._oAudioPop,o=n.find("#keyInput").val(),a=e&&e.currentpage,c=e&&e.perpage,s=e&&e.totalnum;
new r({
container:"#js_pagebar",
perPage:c,
initShowPage:a,
totalItemsNum:s,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var t=e.currentPage;
t!=a&&(a=t,i.__QQMusicSearch({
keyword:o,
perpage:c,
currentpage:a
}));
}
});
}
}
},i;
});