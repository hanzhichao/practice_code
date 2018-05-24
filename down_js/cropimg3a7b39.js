define("common/wx/media/cropimg.js",["common/lib/jquery.Jcrop.js","common/wx/mpEditor/common/cropImgCgi.js","tpl/media/dialog/image_crop.html.js"],function(o){
"use strict";
function r(o){
var r=this;
this.$cotainer=$(o.container),this.url=o.url,this.cropRatio=o.cropRatio||1,this.$cotainer.html(wx.T(i,{
url:o.url,
tips:o.tips||""
})),this.$cropWrp=this.$cotainer.find(".js_crop_wrp"),this.$cropWrp.find("img").Jcrop({
allowSelect:!1,
createHandles:["nw","ne","se","sw"],
aspectRatio:this.cropRatio,
boxWidth:this.$cropWrp.width(),
boxHeight:this.$cropWrp.height()
},function(){
r._ImgCropper=this,$(".jcrop-handle",this.ui.selection).css({
width:"7px",
height:"7px"
}),r._ImgCropper.setImage(r.url,function(){
var o=r._ImgCropper.getBounds();
r._ImgCropper.setSelect([0,0,o[0],o[1]/r.cropRatio]);
});
});
}
o("common/lib/jquery.Jcrop.js");
var t=o("common/wx/mpEditor/common/cropImgCgi.js"),i=o("tpl/media/dialog/image_crop.html.js");
return r.prototype={
getUrl:function(o){
if(!this._ImgCropper)return void("function"==typeof o.onerror&&o.onerror({
retcode:-1
}));
var r=this._ImgCropper.tellSelect(),i=this._ImgCropper.getScaleFactor(),e=this._ImgCropper.ui.botImg.width()*i[0],p=this._ImgCropper.ui.botImg.height()*i[1];
t.getUrl({
imgurl:this.url,
x1:r.x/e,
y1:r.y/p,
x2:r.x2/e,
y2:r.y2/p,
onerror:function(r){
o.onerror(r||{});
},
onsuccess:function(r){
o.onsuccess(r);
}
});
}
},r;
});