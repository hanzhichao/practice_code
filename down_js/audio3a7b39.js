define("common/wx/mpEditor/plugin/audio.js",["common/wx/popup.js","biz_web/ui/checkbox.js","tpl/media/plugin/audio.html.js","tpl/media/plugin/audioItem.html.js","common/wx/Cgi.js","common/wx/media/audio.js","common/wx/pagebar.js","biz_common/moment.js","common/wx/Tips.js"],function(i){
"use strict";
function e(i){
this.__o={
container:""
},this.editor=null,this.__g={
maxNum:1
},this.__init(i),$(i.container).show();
}
i("common/wx/popup.js"),i("biz_web/ui/checkbox.js");
var t=i("tpl/media/plugin/audio.html.js"),o=i("tpl/media/plugin/audioItem.html.js"),n=i("common/wx/Cgi.js"),a=i("common/wx/media/audio.js"),_=i("common/wx/pagebar.js"),r=i("biz_common/moment.js"),s=i("common/wx/Tips.js");
return e.prototype={
getName:function(){
return"insertaudio";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var i=this,e=this.__g;
return function(){
i.__getAudioNum()>=e.maxNum?s.err("每篇图文消息只能添加一个语音"):i.__openAudioPopup();
};
},
getContainer:function(){
return this.__o.container;
},
addListener:function(i){
var e=this,t=this.__g;
i.addListener("beforepaste",function(i,o){
var n=$("<div>"+o.html+"</div>"),a=n.find("iframe.js_editor_audio").length;
return e.__getAudioNum()+a>t.maxNum?(s.err("每篇图文消息只能添加一个语音"),o.html="",!0):(n=e.__filterData(n),
void(o.html=n.html()));
});
},
beforeSetContent:function(i){
if(!i)return"";
i=i.replace(/<mpvoice([^>]*?)js_editor_audio([^>]*?)><\/mpvoice>/g,"<iframe $1js_editor_audio$2></iframe>");
var e=$("<div>"+i+"</div>");
return e=this.__filterData(e),e.html();
},
getPluginData:function(i){
var e=i.init(),t=e.get("content");
if(t){
var o=$("<div>"+t+"</div>");
o=this.__filterData(o),e.set("content",o.html().replace(/<iframe([^>]*?)js_editor_audio([^>]*?)><\/iframe>/g,"<mpvoice $1js_editor_audio$2></mpvoice>"));
}
},
check:function(i){
return i.find("mpvoice").length>this.__g.maxNum?(s.err("每篇图文消息只能添加一个语音"),!1):!0;
},
__init:function(i){
var e=this.__o;
for(var t in i)e.hasOwnProperty(t)&&(e[t]=i[t]);
},
__getAudioNum:function(i){
if(!i){
var e=this.editor.getUeditor();
i=$(e.body);
}
return i.find("iframe.js_editor_audio").length;
},
__filterData:function(i){
return i.find("mpvoice").remove(),i.find("span.audio_area").remove(),i;
},
__openAudioPopup:function(){
this.__initPopup(),this.__bindPopupEvent();
},
__initPopup:function(){
var i=this,e=this.__g;
e.pageBar=null,e.audioList=[],e.pop=$(t).popup({
className:"align_edge audio_dialog",
width:"960",
title:"请选择语音",
buttons:[{
text:"确定",
click:function(){
var t=e.pop.find(".jsPluginAudioRadio[checked=checked]").data("index");
i.__getAudioHtml(t),e.pop=null,this.remove();
},
type:"primary"
},{
text:"取消",
click:function(){
e.pop=null,this.remove();
}
}],
onHide:function(){
e.pop=null,this.remove();
}
}),this.__send(0,10);
},
__send:function(i,e,t){
var s=this,u=this.__g;
n.get({
url:"/cgi-bin/filepage?action=select",
dataType:"json",
data:{
type:3,
begin:i,
count:e
},
mask:!1
},function(i){
if(u.pop)if(0==i.base_resp.ret){
var e=i.page_info.file_item;
u.audioList=[],e.each(function(i){
if(1==i.trans_state){
var e={
name:i.name,
title:i.title||i.name,
update_time:r.unix(i.update_time).format("YYYY-MM-DD"),
play_length:i.play_length,
file_id:i.file_id,
voice_encode_fileid:i.voice_encode_fileid,
disabled:t&&i.play_length>6e4,
format_play_length:r.unix(i.play_length/1e3).format("mm:ss"),
low_size:1*(1*i.voice_low_media_size/1024).toFixed(2)||0,
high_size:1*(1*i.voice_high_media_size/1024).toFixed(2)||0,
source_size:s.__getSize(i.size)
};
1*e.high_size===0&&1*e.source_size!==0&&(e.high_size=e.source_size),1*e.low_size===0&&1*e.source_size!==0&&(e.low_size=e.source_size),
u.audioList.push(e);
}
});
var d=wx.T(o,{
list:u.audioList
});
u.pop.find(".jsPluginAudioList").html(d),u.pop.find(".jsPluginAudioRadio").checkbox(),
t&&$(".jsAudioTips").show(),u.pop.find(".jsPluginAudioPlay").each(function(i,e){
var t=u.audioList[i];
return t.selector="#"+$(e).attr("id"),t.source="file",new a($.extend({},t,{
qqmusictpl:!0
}));
}),u.pageBar||(u.pageBar=new _({
container:".jsPluginAudioPage",
totalItemsNum:i.page_info.file_cnt.voice_cnt,
callback:function(i){
s.__send(10*(i.currentPage-1),10,t);
}
}));
}else n.show(i);
});
},
__bindPopupEvent:function(){
$(".jsPluginAudioNew").click(function(){
window.open(wx.url("/cgi-bin/operate_voice?oper=voice_get&t=media/audio_add"),"_blank");
});
},
__insertAudio:function(i){
var e=this.editor;
e.execCommand("inserthtml",i,!0),e.funcPvUvReport("insertaudio");
},
__getAudioHtml:function(i){
var e=this.__g.audioList[i];
if(e){
e={
name:encodeURIComponent(e.title),
play_length:encodeURIComponent(e.play_length),
file_id:encodeURIComponent(e.file_id),
voice_encode_fileid:e.voice_encode_fileid,
duration:e.format_play_length,
low_size:e.low_size,
high_size:e.high_size,
source_size:e.source_size
},e.src="/cgi-bin/readtemplate?t=tmpl/audio_tmpl&name={name}&play_length={duration}".format(e);
var t='<p><iframe frameborder="0"  class="res_iframe js_editor_audio audio_iframe" src="{src}" low_size="{low_size}" source_size="{source_size}" high_size="{high_size}" name="{name}" play_length="{play_length}" voice_encode_fileid="{voice_encode_fileid}"></iframe></p>';
t=t.format(e),this.__insertAudio(t);
}
},
__getSize:function(i){
return i?/K$/i.test(i)?1*i.replace(/K$/i,""):/M$/i.test(i)?1024*i.replace(/M$/i,""):/G$/i.test(i)?1024*i.replace(/G$/i,"")*1024:0:0;
}
},e;
});