define("common/wx/media/imgsDialogByUrls.js",["common/wx/popup.js","tpl/media/imgsDialogByUrls.html.js","common/wx/Step.js","common/wx/media/cropimg.js","common/wx/Tips.js"],function(t){
"use strict";
t("common/wx/popup.js");
var i=t("tpl/media/imgsDialogByUrls.html.js"),o=t("common/wx/Step.js"),s=t("common/wx/media/cropimg.js"),e=t("common/wx/Tips.js");
"function"!=typeof window.__titleImgLoaded&&(window.__titleImgLoaded=function(t){
var i=$(t),o=new window.Image;
o.onload=function(){
o.onload=null,this.width>=200&&this.height>=200?i.parents(".js_imgItem").show():i.parents(".js_imgItem").remove();
},o.src=t.src;
});
var n=function(t){
this.opt=t,this.hasInitCrop=!1,this.cropRatio=t.cropRatio||1.8,this.selectUrls=[],
this._initDialog(),this._initImg(),this._initEvent();
};
return n.prototype={
_initDialog:function(){
var t=this;
this.$dialog=$(wx.T(i,t.opt)).popup({
width:800,
title:"选择封面",
autoShow:!1,
className:"appmsg_content_img_dialog",
buttons:[{
text:"下一步",
type:"primary",
isHide:!0,
classWrap:"js_crop_next_btn",
click:function(){
return 0==t.selectUrls.length?void e.err("请选择封面图片"):void t._cropGoStep(2);
}
},{
text:"上一步",
type:"default",
isHide:!0,
classWrap:"js_crop_pre_btn",
click:function(){
t._cropGoStep(1);
}
},{
text:"完成",
type:"primary",
classWrap:"js_crop_done_btn",
isHide:!0,
click:function(){
if(!t.croping){
var i=this,o=t.$doneBtn;
t.croping=!0,o.btn(!1),t._ImgCropper.getUrl({
onsuccess:function(s){
t.$dialog&&(t.croping=!1,o.btn(!0),i.remove(),t.opt.onOk&&t.opt.onOk([{
oriUrl:s.oriUrl,
file_id:s.file_id||"",
url:s.url
}]));
},
onerror:function(i){
t.$dialog&&(t.croping=!1,o.btn(!0),e.err(-1==i.retcode?"请选择裁剪区域":"系统繁忙，请稍后再试"));
}
});
}
}
}],
onHide:function(){
this.remove(),"function"==typeof t.opt.onHide&&(t.opt.onHide(),t.$dialog=null);
}
}),t.$preBtn=t.$dialog.find(".js_crop_pre_btn"),t.$nextBtn=t.$dialog.find(".js_crop_next_btn"),
t.$doneBtn=t.$dialog.find(".js_crop_done_btn"),t.$step1=t.$dialog.find(".js_step1"),
t.$step2=t.$dialog.find(".js_step2"),t.stepBar=new o({
container:t.$dialog.find(".js_step_wrp"),
names:["1 从正文选择封面","2 裁切封面"]
}),t.$dialog.popup("show"),t.$dialog.popup("resetPosition");
},
_cropGoStep:function(t){
var i="hide",o="show";
1==t?(this.stepBar.setStep(1),i="hide",o="show"):2==t&&(this.stepBar.setStep(2),
i="show",o="hide"),this.$nextBtn[o](),this.$preBtn[i](),this.$doneBtn[i](),this.$step2[i](),
this.$step1[o](),2==t&&this._initCrop();
},
_initCrop:function(){
var t=this,i=this.selectUrls[0];
t._ImgCropper=new s({
container:t.$step2,
cropRatio:t.cropRatio,
url:i.url,
tips:this.opt.cropImgtips
});
},
_initImg:function(){
for(var t=this,i=0,o=t.opt.urls.length;o>i;i++){
var s=t.opt.urls[i],e=new window.Image;
e.onload=function(){
if(this.onload=null,t.$dialog){
var i=t.$dialog.find('.js_imgItem[data-src="'+this.src+'"]');
this.width>=200&&this.height>=200?(i.show().find(".js_imgItemSrc").css({
"background-image":"url("+this.src+")"
}).attr({
"data-width":this.width,
"data-ratio":this.width/this.height
}),t.$nextBtn.show()):i.remove();
}
},e.src=s.url;
}
},
_initEvent:function(){
var t=this;
this.$dialog.on("click",".js_imgItem",function(){
var i=$(this),o=i.find(".js_imgItemSrc");
o.data("remoteid")||o.hasClass("js_catchremoteimageerror")||(t.$dialog.find(".js_imgItem").removeClass("selected"),
i.addClass("selected"),t.selectUrls=[{
url:o.css("background-image").replace(/url\([\"\']?([^\)\'\"]+)[\"\']?\)/,"$1"),
width:o.attr("data-width")||"",
ratio:o.attr("data-ratio")||""
}]);
});
}
},n;
});