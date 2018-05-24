define("media/preview.js",["common/qq/events.js","common/wx/phoneView.js","biz_common/moment.js","tpl/media/preview/audio.html.js","tpl/media/preview/video.html.js","tpl/media/preview/img.html.js","tpl/media/preview/appmsg.html.js","tpl/media/preview/card.html.js","tpl/media/preview/moments.html.js","tpl/media/preview/chat.html.js"],function(e,i){
"use strict";
function a(e,i){
var a=wx.data.time;
wx.cgiData.appmsg_data&&wx.cgiData.appmsg_data.create_time&&(a=wx.cgiData.appmsg_data.create_time);
for(var t=[],s=0;8>s&&e["title"+s];s++)t.push({
copyright_headimg:i[s].copyright_headimg,
copyright_nickname:i[s].copyright_nickname,
title:e["title"+s],
time:d.unix(a).format("YYYY-MM-DD"),
unix:a,
avatar:wx.url("/misc/getheadimg?fakeid="+wx.data.uin),
author:e["author"+s],
nickName:wx.data.nick_name,
content:e["content"+s],
digest:e["digest"+s],
img:e["cdn_url"+s]||e["fileid"+s]&&wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId="+e["fileid"+s])||"",
show_cover:e["show_cover_pic"+s],
sourceurl:e["sourceurl"+s],
ad_info:e["ad_info"+s],
is_share_copyright:e["is_share_copyright"+s],
guide_words:e["guide_words"+s],
share_copyright_url:e["share_copyright_url"+s],
share_page_type:e["share_page_type"+s],
share_imageinfo:i[s].share_imageinfo,
share_videoinfo:i[s].share_videoinfo,
share_voiceinfo:i[s].share_voiceinfo
});
return t;
}
var t=e("common/qq/events.js")(!0),s=e("common/wx/phoneView.js"),d=e("biz_common/moment.js"),m=null,n={
appmsg_audio:e("tpl/media/preview/audio.html.js"),
appmsg_video:e("tpl/media/preview/video.html.js"),
appmsg_img:e("tpl/media/preview/img.html.js"),
appmsg:e("tpl/media/preview/appmsg.html.js"),
card:e("tpl/media/preview/card.html.js"),
moments:e("tpl/media/preview/moments.html.js"),
chat:e("tpl/media/preview/chat.html.js")
};
i.show=function(i,r,o,p){
if(r=r||0,m=a(i,o),m.index=r,0!=m.length){
m[0].date=d.unix(m[0].unix).format("MM月DD日");
{
new s({
html:e("tpl/media/preview/card.html.js"),
data:m.length>1?{
list:m,
nickName:wx.data.nick_name
}:m[0],
todo:function(){
var e=this;
e.$dom.find(".jsPhoneViewPlugin").on("click",".jsPhoneViewLink",function(){
$(this).hasClass("selected")||($(this).addClass("selected").siblings().removeClass("selected"),
"appmsg"==$(this).data("id")?(e.render(n.appmsg,{
data:m[r],
index:r,
length:m.length
}),p.afterSetContent(e.$dom)):"card"==$(this).data("id")?m.length>1?e.render(n.card,{
list:m,
nickName:wx.data.nick_name
}):e.render(n.card,m[0]):"moments"==$(this).data("id")?e.render(n.moments,{
list:m
}):"chat"==$(this).data("id")&&e.render(n.chat,{
list:m
}));
}),e.$dom.on("click",".js_back_btn",function(){
e.$dom.find('.jsPhoneViewLink[data-id="card"]').trigger("click");
}),e.$dom.on("click",".jsPhoneViewCard",function(){
var i=$(this);
if(!i.hasClass("disabled")){
"undefined"!=typeof i.data("index")&&(r=i.data("index"));
var a;
a=5==m[r].share_page_type?n.appmsg_video:7==m[r].share_page_type?n.appmsg_audio:8==m[r].share_page_type?n.appmsg_img:n.appmsg,
e.render(a,{
data:m[r],
index:r,
length:m.length
});
}
}),e.$dom.on("click",".jsPhoneViewPub",function(){
t.trigger("_preview");
});
}
});
}
}
};
});