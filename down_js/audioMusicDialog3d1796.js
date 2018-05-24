define("common/wx/media/audioMusicDialog.js",["tpl/media/audioMusicDialog.html.js","tpl/media/plugin/audioItem.html.js","tpl/media/dialog/audiomsg_layout.html.js","common/wx/Cgi.js","biz_common/moment.js","common/wx/media/audio.js","common/wx/pagebar.js","common/wx/Tips.js"],function(e,i,a){
"use strict";
var t=e("tpl/media/audioMusicDialog.html.js"),n=e("tpl/media/plugin/audioItem.html.js"),o=e("tpl/media/dialog/audiomsg_layout.html.js"),s=e("common/wx/Cgi.js"),c=e("biz_common/moment.js"),l=e("common/wx/media/audio.js"),u=e("common/wx/pagebar.js"),d=e("common/wx/Tips.js"),r={
qqsearchInfo:{},
curSearchKey:"",
musicLoading:!1,
musicList:[],
musicPerpage:10,
audioObj:null
},_=10,m=null,f=function(e){
$("#audio_music_dialog_content").closest(".dialog").find(".dialog_ft .js_btn_p").eq(0).toggleClass("btn_disabled",e);
},h=[],g=function(e){
return e?/K$/i.test(e)?1*e.replace(/K$/i,""):/M$/i.test(e)?1024*e.replace(/M$/i,""):/G$/i.test(e)?1024*e.replace(/G$/i,"")*1024:0:0;
},p=function(e,i,a,t,o,d){
f(!0),s.get({
url:"/cgi-bin/filepage?action=select",
dataType:"json",
data:{
type:3,
begin:i,
count:a
},
mask:!1
},function(i){
if(0==i.base_resp.ret){
var a=i.page_info.file_item;
h=[],a.each(function(e){
if(1==e.trans_state){
var i={
is_aac:1*e.accept_aac?1:0,
name:e.name,
title:e.title||e.name,
update_time:c.unix(e.update_time).format("YYYY-MM-DD"),
play_length:e.play_length,
file_id:e.file_id,
voice_encode_fileid:e.voice_encode_fileid,
disabled:o||t&&e.play_length>6e4,
format_play_length:c.unix(e.play_length/1e3).format("mm:ss"),
low_size:1*(1*e.voice_low_media_size/1024).toFixed(2)||0,
high_size:1*(1*e.voice_high_media_size/1024).toFixed(2)||0,
source_size:g(e.size)
};
1*i.high_size===0&&1*i.source_size!==0&&(i.high_size=i.source_size),1*i.low_size===0&&1*i.source_size!==0&&(i.low_size=i.source_size),
h.push(i);
}
});
var m=wx.T(n,{
list:h
});
e.find(".jsPluginAudioList").html(m),e.find(".jsPluginAudioRadio").checkbox(),t&&$(".jsAudioTips").show(),
e.find(".jsPluginAudioPlay").each(function(e,i){
var a=h[e];
return a.selector="#"+$(i).attr("id"),a.source="file",r.audioObj=new l($.extend({},a,{
qqmusictpl:!0
})),r.audioObj;
}),d||new u({
container:".jsPluginAudioPage",
totalItemsNum:i.page_info.file_cnt.voice_cnt,
callback:function(i){
p(e,(i.currentPage-1)*_,_,t,o,!0);
}
});
}else s.show(i);
});
},b=null,v=function(e){
var i="";
if(60>e)i="00:"+(10>e?"0":"")+e;else{
var a=Math.floor(e/60),t=e-60*a;
i=(10>a?"0":"")+a+":"+(10>t?"0":"")+t;
}
return i;
},j=function(e){
e.find(".js_qqmusic_audioplay").each(function(){
var e=1*$(this).data("index"),i=r.musicList[e];
r.audioObj=new l({
selector:$(this),
qqmusicurl:i.playurl,
id:i.docID,
qqmusictpl:!0
});
}),e.find(".js_audio_music_item_radio").checkbox({
multi:!1,
onChanged:function(e){
var i=r.musicList[e.val()];
i&&(b={
musictype:i.vendor,
musicid:i.docID,
songname:i.songname,
singername:i.singername,
albumname:i.albumname||"",
url:i.playurl,
mid:1==i.vendor?i.otherID:"",
play_length:i.duration,
albumurl:i.picurl,
albumid:i.albumID||"",
otherid:i.otherID,
jumpurlkey:i.jumpurlkey
});
}
});
},y=function(e){
e&&(r.qqsearchInfo[encodeURIComponent(e)]={
hasReport:!1,
hasRetData:!1,
hasSelected:!1
});
},w=function(e){
var i=encodeURIComponent(e);
return r.qqsearchInfo[i]?r.qqsearchInfo[i]:null;
},k=function(e){
var i=encodeURIComponent(e);
r.qqsearchInfo.hasOwnProperty(i)&&delete r.qqsearchInfo[i];
},x=function(){
var e=r.qqsearchInfo;
if(!m){
r.curSearchKey="",r.musicLoading=!1;
var i=[],a=0,t=0,n=0;
for(var o in e)e[o].hasReport===!0?delete e[o]:e[o].hasRetData===!0&&e[o].hasSelected===!0?(a+=1,
t+=1,e[o].hasReport=!0,delete e[o]):e[o].hasRetData===!0&&e[o].hasSelected===!1&&(a+=1,
n+=1,e[o].hasReport=!0,delete e[o]);
a>0&&i.push("67292_18_"+a),t>0&&i.push("67292_21_"+t),n>0&&i.push("67292_23_"+n),
i&&z(i.join(";"));
}
},C=function(e){
m&&e&&(r.musicLoading=!0,e.find(".js_music_loading").show(),e.find("#dialog_audio_container").hide(),
f(!0),b={});
},I=function(e){
m&&e&&(r.musicLoading=!1,e.find(".js_music_loading").hide(),e.find("#dialog_audio_container").show());
},q=function(){
return r.musicLoading;
},z=function(e){
var i=new Image;
i.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+e+"&t="+Math.random();
},D=function(e){
return 500>=e?"67292_25_1":e>500&&1e3>=e?"67292_27_1":e>1e3&&2e3>=e?"67292_29_1":e>2e3&&5e3>=e?"67292_31_1":e>5e3?"67292_33_1":void 0;
},P=function(e){
r.musicPageBar&&r.musicPageBar.destroy();
var i=e.nextOffset;
r.musicPageBar=new u({
container:e.$dom.find(".js_music_pagebar"),
perPage:r.musicPerpage,
initShowPage:Math.floor(i/r.musicPerpage),
totalItemsNum:e.total,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
R(e.$dom,{
keyword:e.searchKey,
offset:(i.currentPage-1)*r.musicPerpage,
searchId:e.searchId
});
}
});
},K=function(e){
if(!m)return void x();
var i="";
0==e.code||e.msg?0!=e.code||e.list&&0!=e.list.length||e.msg||(i="暂无搜索结果"):i="系统繁忙，请稍后再试",
r.musicList=e.list||[];
for(var a=0,t=r.musicList.length;t>a;a++){
var n=r.musicList[a];
n.duration_str=v(n.duration),n.singername=($("<div>").html(n.singername).html()||"").html(!1),
n.songname=($("<div>").html(n.songname).html()||"").html(!1),n.albumname=($("<div>").html(n.albumname).html()||"").html(!1),
n.albumname&&(n.singername=n.singername+" - "+n.albumname),n.vendor_str=1*n.vendor==2?"酷狗音乐":"QQ音乐";
}
b={},e.$dom.find("#dialog_audio_container").html(wx.T(o,{
list:r.musicList,
msg:i
})),0==e.code&&r.musicList.length>0&&(j(e.$dom),P({
$dom:e.$dom,
total:e.total,
nextOffset:e.nextOffset,
searchKey:e.searchKey,
searchId:e.searchId
}));
},R=function(e,i){
if(!q()){
C(e);
var a=i.keyword||"";
r.curSearchKey=a,w(a)||y(a);
var t=+new Date;
s.get({
url:"/cgi-bin/searchmpmusic?",
dataType:"json",
data:{
query:a,
offset:i.offset||0,
size:r.musicPerpage,
search_id:i.searchId||""
}
},{
done:function(i){
I(e);
var n=new Date-t,o="67292_13_1;67292_14_1;"+D(n),s=w(a);
if(s.hasReport===!1&&(i&&i.base_resp&&0==i.base_resp.ret&&i.count>0?s.hasRetData=!0:(s.hasRetData=!1,
s.hasReport=!0,o+=";67292_18_1;67292_19_1",k(a))),z(o),i&&i.base_resp&&0==i.base_resp.ret)K({
code:0,
list:i.items||[],
total:1*i.total_count,
nextOffset:i.offset,
searchKey:a,
$dom:e,
searchId:i.search_id
});else{
var c="";
i&&i.base_resp&&200013==i.base_resp.ret&&(c="操作太频繁，请稍后再试"),K({
msg:c,
code:-1,
searchKey:a,
$dom:e
});
}
},
fail:function(){
I(e),r.curSearchKey="";
var i=new Date-t,n="67292_13_1;67292_16_1;"+D(i);
z(n),K({
code:-1,
searchKey:a,
$dom:e
});
}
});
}
},O={
show:function(e){
if(!m){
var i=wx.T(t,e);
m=$(i).popup({
className:"align_edge audio_dialog js_audio_music_dialog",
width:"960",
title:"选择音频",
buttons:[{
text:"确定",
click:function(){
var i=this,t=O.getCurrentValue();
if(t){
var n=a.closest(".js_audio_music_dialog").find(".js_btn_p").eq(0);
if(n.hasClass("btn_loading"))return;
if(n.btn(0),"audio"===t.type)e.onOK&&e.onOK.call(m,t),m=null,x(),r.audioObj.stopCur(),
i.remove();else{
if(r.curSearchKey){
var o=w(r.curSearchKey);
o&&o.hasReport===!1&&o.hasRetData===!0&&(o.hasSelected=!0);
}
e.onOK&&e.onOK.call(m,t),m=null,x(),r.audioObj.stopCur(),i.remove();
}
}else d.err("请选择需要插入的语音或音乐");
},
type:"primary"
},{
text:"取消",
click:function(){
m=null,x(),this.remove(),r.audioObj.stopCur(),e.onCancel&&e.onCancel.call(m);
}
}],
onHide:function(){
m=null,x(),this.remove(),r.audioObj.stopCur(),e.onCancel&&e.onCancel.call(m);
}
});
var a=$("#audio_music_dialog_content");
if(f(!0),a.on("change","input.js_audio_music_item_radio",function(){
f(!1);
}),e.allowAudio&&(a.find(".jsPluginAudioNew").click(function(){
window.open(wx.url("/cgi-bin/operate_voice?oper=voice_get&t=media/audio_add"),"_blank");
}),p(a,0,_,e.hasAudioLengthLimit,e.audioDisabled)),e.allowMusic){
b={};
var n=a.find("#searchDiv");
n.find("#keyInput").keydown(function(e){
var i="which"in e?e.which:e.keyCode;
13==i&&n.find("#searchBt").trigger("click");
}),n.find("#searchCloseBt").click(function(){
n.find("#keyInput").val(""),r.curSearchKey="",a.find("#dialog_audio_container").html(""),
I(a),b={},f(!0);
}),n.find("#searchBt").click(function(){
var e=n.find("#keyInput").val();
e.length>0?R(a,{
keyword:e,
offset:0
}):d.err("请输入搜索条件");
}),n.find("#reload").click(function(){
n.find("#searchCloseBt").trigger("click");
});
}
a.find(".js_audio_tab_btn").click(O.selectAudio),a.find(".js_music_tab_btn").click(O.selectMusic),
e.allowAudio?O.selectAudio():e.allowMusic&&O.selectMusic();
}
},
selectAudio:function(){
var e=$("#audio_music_dialog_content");
e.find(".js_audio_block").show(),e.find(".js_music_block").hide(),e.find(".js_audio_tab_btn").addClass("selected"),
e.find(".js_music_tab_btn").removeClass("selected"),f(!O.getCurrentValue());
},
selectMusic:function(){
var e=$("#audio_music_dialog_content");
e.find(".js_music_block").show(),e.find(".js_audio_block").hide(),e.find(".js_music_tab_btn").addClass("selected"),
e.find(".js_audio_tab_btn").removeClass("selected"),f(!O.getCurrentValue());
},
getCurrentValue:function(){
var e=$("#audio_music_dialog_content");
if(e.find(".js_audio_tab_btn").hasClass("selected")){
var i=e.find(".jsPluginAudioRadio[checked=checked]").data("index"),a=h[i];
if(!a)return;
return a={
type:"audio",
is_aac:a.is_aac,
name:a.name,
title:a.title,
update_time:a.update_time,
play_length:a.play_length,
file_id:a.file_id,
voice_encode_fileid:a.voice_encode_fileid,
duration:a.format_play_length,
format_play_length:a.format_play_length,
low_size:a.low_size,
high_size:a.high_size,
source_size:a.source_size
};
}
if(e.find(".js_music_tab_btn").hasClass("selected")){
if("undefined"==typeof b.musicid)return;
return b.type="music",b;
}
}
};
a.exports=O;
});