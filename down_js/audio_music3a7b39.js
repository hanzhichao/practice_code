define("common/wx/mpEditor/plugin/audio_music.js",["common/wx/popup.js","biz_web/ui/checkbox.js","common/wx/media/audioMusicDialog.js","common/wx/Tips.js"],function(i){
"use strict";
function e(i,e){
if(!e){
var t=i.getUeditor();
e=$(t.body);
}
return e.find("iframe.js_editor_audio").length;
}
function t(i){
return i.find("iframe.js_editor_audio").removeAttr("isaac"),i.find("mpvoice").remove(),
i.find(".js_audio_frame").remove(),i.find("qqmusic").addClass("res_iframe qqmusic_iframe js_editor_qqmusic"),
i.find("span.qqmusic_area").remove(),i;
}
function n(i){
this.__o={
container:"",
allowAudio:!1,
allowMusic:!1
},this.editor=null,this.__init(i||{}),i&&i.container&&$(i.container).show();
}
i("common/wx/popup.js"),i("biz_web/ui/checkbox.js");
var o=i("common/wx/media/audioMusicDialog.js"),r=i("common/wx/Tips.js"),m=1;
return n.beforeSetContent=function(i){
if(!i.html)return"";
var e=$("<div>").html(i.html);
return e.find("mpvoice.js_editor_audio").replaceTagName("iframe"),e=t(e),e.find("qqmusic.js_editor_qqmusic").replaceTagName("iframe"),
e.html();
},n.prototype={
getName:function(){
return"insertaudio";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var i=this;
return function(){
var t=i.__o.allowAudio,n=i.__o.allowMusic,a=!1;
if(t&&e(i.editor)>=m){
if(!n)return void r.err("每篇图文消息只能添加一个语音");
a=!0;
}
o.show({
allowAudio:t,
allowMusic:n,
audioDisabled:a,
onOK:function(e){
i.__insert(e);
},
onCancel:function(){}
});
};
},
getContainer:function(){
return this.__o.container;
},
addListener:function(i){
var n=this;
i.addListener("beforepaste",function(i,o){
var a=$("<div></div>").html(o.html),u=a.find("iframe.js_editor_audio").length;
return e(n.editor)+u>m?(r.err("每篇图文消息只能添加一个语音"),o.html="",!0):(a=t(a),a.find("qqmusic.js_editor_qqmusic").replaceTagName("iframe"),
void(o.html=a.html()));
});
},
beforeSetContent:function(i){
return n.beforeSetContent({
html:i
});
},
initPluginData:function(){
return["music_id"];
},
getPluginData:function(i){
var e=i.init(this.initPluginData()),n=e.get("content");
if(n){
var o=$("<div></div>").html(n);
o=t(o),o.find("iframe.js_editor_audio").replaceTagName("mpvoice"),o.find("iframe.js_editor_qqmusic").replaceTagName("qqmusic"),
n=o.html(),e.set("content",n),n=e.get("content");
for(var r=/<qqmusic\s(?:[\s\S]*?)musicid=['"]([\d]*?)['"](?:[\s\S]*?)>/g,m=[],a="",u=null;null!=(u=r.exec(n));)u[1]&&-1==a.indexOf(u[1]+",")&&(m.push(u[1]),
a+=u[1]+",");
return e.set("music_id",m.join(",")),e;
}
},
check:function(i){
return i.find("mpvoice").length>m?(r.err("每篇图文消息只能添加一个语音"),!1):!0;
},
__init:function(i){
var e=this.__o;
for(var t in i)Object.prototype.hasOwnProperty.call(e,t)&&(e[t]=i[t]);
},
__insertAudio:function(i){
i.uri_encoded_name=encodeURIComponent(i.name),i.uri_encoded_title=encodeURIComponent(i.title),
i.title_encode=i.title.html(!0),i.src="/cgi-bin/readtemplate?t=tmpl/audio_tmpl&name={uri_encoded_title}&play_length={duration}".format(i);
var e='<p><iframe frameborder="0" class="res_iframe js_editor_audio audio_iframe" src="{src}" isaac2={is_aac} low_size="{low_size}" source_size="{source_size}" high_size="{high_size}" name="{title_encode}" play_length="{play_length}" voice_encode_fileid="{voice_encode_fileid}"></iframe></p>';
e=e.format(i);
var t=this.editor;
t.execCommand("inserthtml",e,!0),t.funcPvUvReport("insertaudio");
},
__insertMusic:function(i){
var e=i.musicid,t=i.mid,n=i.url,o=i.songname,r=i.albumurl,m=i.singername,a=i.play_length,u=(i.commentid||"",
"/cgi-bin/readtemplate?t=tmpl/qqmusic_tmpl&singer="+encodeURIComponent(m)+"&music_name="+encodeURIComponent(o)+"&albumurl="+encodeURIComponent(r)+"&musictype="+encodeURIComponent(i.musictype)),c=['<iframe class="res_iframe qqmusic_iframe js_editor_qqmusic" scrolling="no" frameborder="0"',' musicid="'+e.html(!0)+'"',' mid="'+t.html(!0)+'"',' albumurl="'+r.html(!0)+'"',' audiourl="'+n.html(!0)+'"',' music_name="'+o.html(!0)+'"',' singer="'+m.html(!0)+'"',' play_length="'+a+'"',' src="'+u+'"',' musictype="'+i.musictype+'"',' otherid="'+i.otherid+'"',' albumid="'+i.albumid+'"',' jumpurlkey="'+i.jumpurlkey+'"',"></iframe>"].join(""),s=this.editor;
s.execCommand("inserthtml",c,!0),s.funcPvUvReport("insertmusic");
},
__insert:function(i){
"audio"===i.type?this.__insertAudio(i):this.__insertMusic(i);
}
},n;
});