define("common/wx/media/img.js",["widget/media.css","tpl/media/img.html.js","tpl/media/appmsg_edit/image_article_content.html.js","common/qq/Class.js"],function(i){
"use strict";
var t=(wx.T,i("widget/media.css"),i("tpl/media/img.html.js")),e=i("tpl/media/appmsg_edit/image_article_content.html.js"),a=i("common/qq/Class.js"),d=a.declare({
init:function(i){
if(i&&i.container){
var a,d=i,m="/cgi-bin/getimgdata?token="+wx.data.t+"&msgid="+i.msgid+"&mode=small&source="+i.source+"&fileId="+i.file_id+"&ow="+~i.fakeid;
console.log("img init",i),i.append?($(i.container).append('<div data-type="2" class="js_previe_media_box">'+wx.T(e,{
share_imageinfo:[{
cdn_url:m
}]
})+"</div>").data("opt",i),a=new Image,a.onload=function(){
i.imgWidth=a.width,i.imgHeight=a.height,a=null;
},a.src=m):$(i.container).html(t.format({
token:wx.data.t,
id:i.file_id,
msgid:i.msgid||"",
source:i.source||"",
ow:~i.fakeid
})).data("opt",i),this.data=d;
}
},
getData:function(){
return console.log(this),this.data;
}
});
return d;
});