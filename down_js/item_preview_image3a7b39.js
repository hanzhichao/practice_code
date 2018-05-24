define("scan/item_preview_image.js",["common/wx/Tips.js","biz_web/utils/upload.js"],function(e,i,t){
"use strict";
function n(e,i){
var t=p.uploadCdnFileWithCheck(i);
t({
container:e,
multi:!1,
type:2,
onComplete:function(i,t,n,r){
var a=r.content||"";
switch(+r.base_resp.ret){
case 0:
o(e,a,n.name),m.suc("上传成功");
break;

case 200034:
m.err("图片尺寸错误");
break;

case 1:
m.err("图片太大");
break;

case 200011:
m.err("请上传合法的图片格式");
break;

default:
m.err("上传失败");
}
}
});
}
function o(e,i,t){
var n=$(e),o=n.parents(".upload_box"),r=(o.find(".js_uploaded_msg"),o.find(".upload_preview"));
r.find("img").prop("src",i),r.show(),l.hide(),n.html("重新上传"),f.setData(function(e){
e.base_info.thumb_url=i;
}),b.itemColor.loadColorByThumb();
}
function r(){
d=$("#js_form_preview_image"),l=d.find(".js_frm_msg");
}
function a(){
f.getData().base_info.thumb_url&&o("#js_btn_upload_product_preview",f.getData().base_info.thumb_url,"");
}
function s(){
n("#js_btn_upload_product_preview",{
width:0,
min_width:0,
height:0,
min_height:0,
size:204800,
min_size:0
});
}
function u(){}
function _(e){
var i=!0;
return f.getData().base_info.thumb_url?l.hide():(i=!1,l.show().html("请上传预览图")),"function"==typeof e&&e.call(void 0,i),
i;
}
function c(e){
return e&&(f=e.model,b=e.items),h?!1:(h=!0,r(),a(),void s());
}
var d,l,m=(template.render,e("common/wx/Tips.js")),p=e("biz_web/utils/upload.js"),f=null,b=[],h=!1;
t.exports={
init:c,
check:_,
triggerEditMode:u
};
});