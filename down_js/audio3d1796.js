define("common/wx/media/audio.js",["biz_web/lib/soundmanager2.js","tpl/media/audio.html.js","tpl/media/appmsg_edit/voice_article_content.html.js","tpl/media/qqmusicaudio.html.js","widget/media.css","common/qq/Class.js","biz_common/moment.js"],function(i,t,s){
"use strict";
var e=wx.T,o=i("biz_web/lib/soundmanager2.js"),n=i("tpl/media/audio.html.js"),l=i("tpl/media/appmsg_edit/voice_article_content.html.js"),d=i("tpl/media/qqmusicaudio.html.js"),a=(i("widget/media.css"),
i("common/qq/Class.js")),u=i("biz_common/moment.js"),m=null,c=null,h="wxAudioPlaying",r=function(){
c=o,c.setup({
url:"/mpres/zh_CN/htmledition/plprecorder/biz_web/",
preferFlash:!1,
debugMode:!1
});
};
$(window).load(function(){
r();
});
var p={
id:"",
source:"",
file_id:""
},f=a.declare({
init:function(i){
var t=this;
$.extend(!0,t,p,i),this.soundId=this.id||this.file_id,this.title=this.title||this.name,
this.play_length="undefined"==typeof this.play_length||0==this.play_length?"未知时长":u.unix(this.play_length/1e3).format("mm:ss");
var s;
this.qqmusictpl?s=$(e(d,t)):this.shareTpl?(t.share_voiceinfo=[{
title:t.title,
duration:t.play_length
}],h="preview_audio_playing",s=$('<div data-type="3" class="js_previe_media_box"></div>').html(e(l,t))):s=$(e(n,t)),
t.dom=$(i.selector).append(s).data("opt",i),s.click(function(i){
i.target.className.indexOf("js_replace_media")<0&&t.toggle();
});
},
getAudioURL:function(){
if(this.qqmusicurl)return this.qqmusicurl;
var i=this.source,t=this.id,s=this.file_id;
return i&&(i="&source="+i),wx.url(this.voice_encode_fileid?"https://res.wx.qq.com/voice/getvoice?mediaid="+this.voice_encode_fileid:"/cgi-bin/getvoicedata?msgid={id}&fileid={fileid}{source}".format({
id:t,
fileid:s,
source:i
}));
},
isPlaying:function(){
return null!=m&&this==m;
},
toggle:function(){
this.isPlaying()?this.stop():(m&&m.stop(),this.play());
},
play:function(i){
var t=this;
this.isPlaying()||(this.dom.addClass(h),!!m&&m.dom.removeClass(h),m=this,this.sound||(!c&&r(),
this.sound=c.createSound({
id:t.soundId,
url:t.getAudioURL(),
onfinish:function(){
m&&(m.dom.removeClass(h),m=null);
},
onload:function(i){
i||c.unload(t.soundId),!i&&m&&(m.dom.removeClass(h),m.sound=null,m=null);
},
onstop:function(){
t.dom.removeClass(h);
}
})),c.play(this.soundId),i&&i(this));
},
stop:function(i){
this.isPlaying()&&(m=null,this.dom.removeClass(h),c.stop(this.soundId),i&&i(this));
},
stopAll:function(i){
m=null,c.stopAll(),i&&i(this);
},
stopCur:function(i){
m&&m.soundId&&c.stop(m.soundId),m=null,i&&i(this);
}
});
s.exports=f;
});