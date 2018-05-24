define("common/wx/media/imageDialog.js",["biz_web/ui/checkbox.js","common/wx/popover.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","common/wx/pagebar.js","biz_web/utils/upload.js","common/wx/tooltips.js","tpl/media/dialog/image_layout.html.js","tpl/media/dialog/image_list.html.js","tpl/media/dialog/image_group.html.js","common/wx/media/cropimg.js","tpl/media/dialog/add_group.html.js","tpl/media/dialog/image_water.html.js","common/wx/Step.js","page/media/dialog_img_pick.css"],function(e){
"use strict";
var i=(e("biz_web/ui/checkbox.js"),e("common/wx/popover.js")),t=e("common/wx/Cgi.js"),o=e("common/wx/Tips.js"),r=(e("common/wx/popup.js"),
e("common/wx/pagebar.js")),n=e("biz_web/utils/upload.js"),a=e("common/wx/tooltips.js"),s=e("tpl/media/dialog/image_layout.html.js"),p=e("tpl/media/dialog/image_list.html.js"),l=e("tpl/media/dialog/image_group.html.js"),c=e("common/wx/media/cropimg.js"),d=e("tpl/media/dialog/add_group.html.js"),g=e("tpl/media/dialog/image_water.html.js"),u=(template.render,
template.compile(d)),m=template.compile(l),f=template.compile(p),_=e("common/wx/Step.js"),h={
popover:null
};
e("page/media/dialog_img_pick.css");
var v=function(e){
return new j(e);
},j=function(e){
this.options=e,this.events=[],this.imgArr=[],this.converting=0,this.cropObj={},this.fromUpload=[],
b.init.call(this);
},b={
init:function(){
var e=this,i=e.options=$.extend(!0,{
cropImgtips:"",
cropImg:!1,
cropRatio:1,
tpl:s,
title:"选择图片",
scene:"cdn",
maxSelect:1,
perPage:10,
group:0,
uploadGroupId:1,
coverPicCheckbox:!1,
coverPic:0,
onOK:null,
onCancel:null
},e.options);
i.cropImg&&(i.maxSelect=1,e.cropObj.cropRatio=i.cropRatio),i.tpl=template.compile(i.tpl)(i),
e.on("ok",function(e){
!!h.popover&&h.popover.remove(),this.destroy(),"function"==typeof i.onOK&&i.onOK.call(this,e);
}),e.on("cancel",function(){
!!h.popover&&h.popover.remove(),this.destroy(),"function"==typeof i.onCancel?i.onCancel.call(this):"function"==typeof i.onHide&&i.onHide.call(this);
}),e.on("hide",function(){
!!h.popover&&h.popover.remove(),this.destroy(),"function"==typeof i.onHide&&i.onHide.call(this);
});
var t;
t=i.cropImg?[{
text:"下一步",
classWrap:"js_crop_next_btn",
type:"disabled",
click:function(){
return 0!=e.imgArr.length&&e.imgArr[0].url?void b.cropGoStep.call(e,2):void o.err("请选择封面图片");
}
},{
text:"上一步",
type:"default",
isHide:!0,
classWrap:"js_crop_pre_btn",
click:function(){
b.cropGoStep.call(e,1);
}
},{
text:"完成",
classWrap:"js_crop_done_btn",
isHide:!0,
type:"primary",
click:function(){
var i=e.cropObj;
if(!i.croping){
var t=i.$doneBtn;
i.croping=!0,t.btn(!1),i._ImgCropper.getUrl({
onsuccess:function(o){
if(e.dialog){
i.croping=!1,t.btn(!0);
var r="";
e.options.coverPicCheckbox&&(r=e.dialog.find(".js_show_cover_pic").checkbox("value")||"");
var n=e.imgArr[0];
e.trigger("ok",[{
oriUrl:o.oriUrl,
oriFormat:n.format,
url:o.url,
file_id:o.file_id||"",
source:"lib",
coverPic:r
}]);
}
},
onerror:function(r){
e.dialog&&(i.croping=!1,t.btn(!0),o.err(-1==r.retcode?"请选择裁剪区域":"系统繁忙，请稍后再试"));
}
});
}
}
}]:[{
text:"确定",
type:"disabled",
click:function(){
var t=this.get().find(".js_btn").eq(0).parent();
return t.hasClass("btn_disabled")?void o.err("请选择图片"):(e.popup=this,$.each(e.imgArr,function(i,t){
t.source=-1!=e.fromUpload.indexOf(t.file_id+"")?"upload":"lib",e.options.coverPicCheckbox&&(t.coverPic=e.popup.get().find(".js_show_cover_pic").checkbox("value")||"");
}),void("cdn"==i.scene&&e.converting>0?(t.btn(!1),e.on("converted",function(){
0==e.converting&&(e.trigger("ok",[{
url:url
}]),t.btn(!0));
})):e.trigger("ok",e.imgArr||[])));
}
},{
text:"取消",
click:function(){
e.trigger("cancel");
}
}],e.dialog=$(i.tpl.trim()).popup({
title:i.title,
className:"img_dialog_wrp",
width:846,
buttons:t,
onHide:function(){
e.trigger("hide");
}
});
var r=e.dialog.popup("get");
i.cropImg&&(e.cropObj.stepBar=new _({
container:r.find(".js_step_wrp"),
names:["1 从素材库选择封面","2 裁切封面"]
}),e.cropObj.$preBtn=r.find(".js_crop_pre_btn"),e.cropObj.$nextBtn=r.find(".js_crop_next_btn"),
e.cropObj.$doneBtn=r.find(".js_crop_done_btn"),e.cropObj.$selectFrame=r.find(".js_select_frame"),
e.cropObj.$cropFrame=r.find(".js_crop_frame")),r.find(".js_show_cover_pic").checkbox(),
r.find(".js_loading").show(),w.getImagesByGroupId({
group_id:i.group,
count:i.perPage
},function(t){
if(e.dialog){
var o=t.page_info;
o.scene=i.scene,o.group=i.group;
var r=e.dialog.popup("get"),n=m(o);
r.find(".js_loading").hide(),r.find(".js_group").append(n).find(".js_total").text("(%s)".sprintf(o.file_cnt.img_cnt)),
b.renderImageList(r.find(".js_list"),o,e.imgArr),b.initEvent.call(e,t),b.initWater.call(e,o),
b.initPageBar.call(e,o,i.group),e.dialog.popup("resetPosition");
}
}),b.initUpload.call(e,i.group);
},
cropGoStep:function(e){
var i=this.cropObj,t="hide",o="show";
1==e?(i.stepBar.setStep(1),t="hide",o="show"):2==e&&(i.stepBar.setStep(2),t="show",
o="hide"),i.$nextBtn[o](),i.$preBtn[t](),i.$doneBtn[t](),i.$cropFrame[t](),i.$selectFrame[o](),
2==e&&b.initCrop.call(this);
},
initCrop:function(){
var e=this.cropObj;
0!=this.imgArr.length&&this.imgArr[0].url&&(e._ImgCropper=new c({
container:e.$cropFrame,
cropRatio:e.cropRatio,
width:400,
height:400,
url:this.imgArr[0].url,
tips:this.options.cropImgtips
}));
},
initEvent:function(){
var e=this,i=e.dialog.popup("get"),t=e.options;
i.on("click",".js_imageitem",function(){
var r,n=$(this),a=n.find("label"),s=i.find(".js_btn_p").eq(0),p=n.data("url"),l=n.data("id"),c=n.data("oristatus"),d=n.data("format");
a.hasClass("selected")?(p||e.converting--,a.removeClass("selected"),r=x.indexOf(e.imgArr,l),
r>=0&&e.imgArr.splice(r,1),i.find(".js_selected").text(e.imgArr.length)):1==t.maxSelect?(p||(e.converting=1),
a.addClass("selected"),n.siblings().find("label").removeClass("selected"),e.imgArr=[{
url:p,
file_id:l,
format:d,
copyright_status:c
}],i.find(".js_selected").text(e.imgArr.length)):t.maxSelect>e.imgArr.length?(p||e.converting++,
a.addClass("selected"),e.imgArr.push({
url:p,
file_id:l,
format:d,
copyright_status:c
}),i.find(".js_selected").text(e.imgArr.length)):o.err("最多可选%s张".sprintf(t.maxSelect)),
e.imgArr.length>0?s.enable().addClass("btn_primary"):s.disable(),"cdn"==t.scene&&a.hasClass("selected")&&!p&&w.getCdnUrlByFileId({
file_id:l,
group_id:i.find(".js_groupitem.selected").data("groupid")
},function(i){
0==i.errcode?(e.converting--,n.data("url",i.url),r=x.indexOf(e.imgArr,l),r>=0&&(e.imgArr[r].url=i.url),
e.trigger("converted")):(o.err("转存失败"),n.click());
});
}),i.on("click",".js_creategroup",function(){
b.createPopover.call(e,{
dom:this,
content:u({}),
ok:function(){
b.createGroup.call(e);
}
});
}),i.on("click",".js_groupitem",function(o,r){
var n=$(this),a=i.find(".js_list"),s=i.find(".js_loading"),p=i.find(".js_pagebar"),l=n.data("groupid");
n.hasClass("selected")||(n.addClass("selected").siblings(".selected").removeClass("selected"),
$(".js_imageupload").data("groupid",l),a.hide(),p.hide(),s.show(),w.getImagesByGroupId({
group_id:l,
count:t.perPage
},function(o){
if(e.dialog&&l==i.find(".js_groupitem.selected").data("groupid")){
o=o.page_info,o.scene=t.scene,s.hide(),p.show(),b.renderImageList(a,o,e.imgArr),
b.initPageBar.call(e,o,l),b.initUpload.call(e);
for(var n=0;r&&"upload"==r.source&&n<r.count;++n)a.children().eq(n).click();
}
}));
});
},
createPopover:function(e){
!!h.popover&&h.popover.remove(),h.popover=new i({
dom:e.dom,
content:e.content,
margin:"center",
place:"bottom",
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove(),e.ok.call(this);
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
},
createGroup:function(){
var e=this,i=h.popover.$pop,r=i.find(".jsPopoverBt").eq(0),n=i.find("input").val().trim();
return n.length<1||n.length>6?void o.err("分组名字为1-6个字符"):(r.btn(0),void t.post({
url:wx.url("/cgi-bin/filepage"),
data:{
action:"create_group",
name:n
},
mask:!1
},function(i){
var t=i.base_resp.ret;
if(0==t){
var a=e.options;
w.getImagesByGroupId({
group_id:a.group,
count:a.perPage
},function(i){
if(e.dialog){
var t=i.page_info;
t.group=1;
for(var o=0,r=t.file_group_list.file_group.length;r>o;o++){
var a=t.file_group_list.file_group[o];
a.name==n&&(t.group=a.id);
}
var s=e.dialog.popup("get"),p=s.find(".js_list"),l=m(t);
s.find(".js_group").html(l),b.renderImageList(p,{
file_item:[]
},e.imgArr),b.initPageBar.call(e,t,t.group),s.find(".js_imageupload").data("groupid",t.group),
b.initUpload.call(e,t.group);
}
});
}else 15006==t?(o.err("已经超过100个分组，不能再创建新的分组。"),r.btn(!0)):(o.err("创建失败，请重试"),r.btn(!0));
}));
},
initPageBar:function(e,i){
var t=this,o=t.dialog.popup("get"),n=t.options;
b.pagebar&&b.pagebar.destroy();
var a=0;
return 0==i?a=e.file_cnt.img_cnt:e.file_group_list.file_group.each(function(e){
e.id==i&&(a=e.count);
}),n.perPage>=a?void o.find(".js_pagebar").empty():void(b.pagebar=new r({
container:o.find(".js_pagebar"),
perPage:n.perPage,
initShowPage:1,
totalItemsNum:a,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var i=o.find(".js_groupitem.selected").data("groupid"),r=o.find(".js_list"),a=o.find(".js_loading"),s=o.find(".js_pagebar");
r.hide(),s.hide(),a.show(),w.getImagesByGroupId({
group_id:i,
begin:e.perPage*(e.currentPage-1),
count:n.perPage
},function(e){
e=e.page_info,e.scene=n.scene,a.hide(),s.show(),b.renderImageList(r,e,t.imgArr);
});
}
}));
},
initUpload:function(e){
var i=this,t=i.dialog.popup("get"),r=t.find(".js_imageupload"),a="js_imageupload"+Math.random().toString().substr(2),s=i.options,p=t.find(".js_groupitem.selected").data("groupid")||e;
p=p?p:s.uploadGroupId,r.attr("id",a).off().children().remove(),n.uploadImageLibFile({
container:"#"+a,
only_cdn:s.only_cdn,
multi:!0,
type:2,
scene:s.uploadScene,
doublewrite:!0,
groupid:p,
onComplete:function(e,t,r,n){
0==n.base_resp.ret&&o.suc("上传成功"),i.fromUpload.push(n.content);
},
onAllComplete:function(e,i){
var o=t.find(".js_groupitem.selected"),r=t.find(".js_groupitem[data-groupid="+p+"]");
if(i.filesUploaded>0)if(!s.doselected||s.doselected&&i.filesUploaded<=1*s.completeUploadMinSelectNum?o.removeClass("selected").trigger("click",{
source:"upload",
count:i.filesUploaded
}):o.removeClass("selected").trigger("click",{
source:"upload",
count:0
}),r.length>0&&o.length>0&&r[0]===o[0]){
var n=+o.find("span").text();
o.find("span").text(n+i.filesUploaded);
}else{
var n=+o.find("span").text();
o.find("span").text(n+i.filesUploaded);
var a=+r.find("span").text();
r.find("span").text(a+i.filesUploaded);
}
},
showError:!0
});
},
initWater:function(e){
var i=this,t=i.options,o=i.dialog.popup("get"),r=e.watermark_status,n=template.compile(g)({
status:r,
set_water_url:wx.url("/cgi-bin/settingpage?t=setting/function&action=function&set_water=1")
});
o.find(".js_water").text((t.desc?"，":"")+(3==r?"已关闭":"已开启")+"图片水印"),new a({
container:o.find(".js_water_tips"),
content:n,
parentClass:"js_water img_water",
position:{
left:-138,
top:2
},
reposition:!0,
type:"hover"
});
},
renderImageList:function(e,i,t){
i.file_item.each(function(e){
e.img_url=e.cdn_url?e.cdn_url:wx.url("/cgi-bin/getimgdata?mode=small&source=file&fileId=%s".sprintf(e.file_id)),
-1!=x.indexOf(t,e.file_id)&&(e.selected=1);
}),e.html(f(i)).show();
var o=0,r=0,n=28308,a=28308,s=9,p=10,l=0,c=117,d=$(".js_pic"),g=d.length,u="";
d.each(function(){
var e=$(this);
e.on("error",function(){
++o,++l,u=u+e.attr("src")+" ",l===g&&((new Image).src="/mp/jsmonitor?idkey="+n+"_"+s+"_"+o+";"+a+"_"+p+"_"+r+"&lc=1&log0=[errorurl]["+encodeURIComponent(u)+"]");
}),e.on("load",function(){
++r,++l;
var i=parseInt(e.css("width")),t=parseInt(e.css("height"));
if(t>i?e.css("width",c):e.css("height",c),l===g){
var d="/mp/jsmonitor?idkey="+n+"_"+s+"_"+o+";"+a+"_"+p+"_"+r;
o>0&&(d=d+"&lc=1&log0=[errorurl]["+encodeURIComponent(u)+"]"),(new Image).src=d;
}
}),e.attr("src",e.attr("data-src"));
});
}
},w={
getImagesByGroupId:function(e,i){
e=$.extend({
group_id:1,
begin:0,
count:8,
type:2
},e),t.get({
url:wx.url("/cgi-bin/filepage?action=select"),
data:e,
mask:!1
},function(e){
0!=e.base_resp.ret?t.show(e):i(e);
});
},
getCdnUrlByFileId:function(e,i){
e.group_id=e.group_id||1,t.post({
url:wx.url("/cgi-bin/uploadimg2cdn?action=duplicate"),
data:e,
mask:!1
},function(e){
i(e);
});
}
},x={
indexOf:function(e,i){
for(var t=0,o=e.length;o>t;++t)if(e[t].file_id==i)return t;
return-1;
}
},y={
on:function(e,i){
if(i){
var t=this.events;
return t[e]=t[e]||[],t[e].push(i),this;
}
},
trigger:function(e){
var i=this,t=arguments,o=i.events[e];
return o?($.each(o,function(e,o){
o.apply(i,Array.prototype.slice.call(t,1));
}),this):void 0;
},
hide:function(){
return this.dialog.popup("hide"),this;
},
show:function(){
return this.dialog.popup("show"),this;
},
destroy:function(){
!!this.dialog&&this.dialog.popup("remove"),this.dialog=null;
}
};
return $.extend(j.prototype,y),v;
});