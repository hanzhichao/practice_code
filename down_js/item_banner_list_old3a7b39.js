define("scan/item_banner_list_old.js",["common/wx/Tips.js","biz_web/utils/upload.js"],function(e,n,i){
"use strict";
function t(e,n){
var i=j.uploadCdnFileWithCheck(n);
i({
container:e,
multi:!1,
type:2,
onComplete:function(e,n,i,t){
var s=t.content||"";
switch(+t.base_resp.ret){
case 0:
k.push({
link:s
}),r(),o(),f.hide(),m.suc("上传成功");
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
function o(){
v.setData(function(e){
e.detail_info||(e.detail_info={}),e.detail_info.banner_list=k;
});
}
function r(){
var e=b("tpl_product_banner_list",{
list:k
});
p.find(".js_item").remove(),h.before(e),k.length>=6?h.hide():h.show();
}
function s(){
k=v.getData().detail_info.banner_list||[],d=$("#form_banner_list"),f=d.find(".js_frm_msg"),
p=d.find(".js_preview_box"),h=$("#js_btn_upload_banner").parent();
}
function a(){
k&&k.length>0&&r(),f.hide();
}
function l(){
t("#js_btn_upload_banner",{
width:0,
min_width:0,
height:0,
min_height:0,
size:204800,
min_size:0
}),p.on("click",".js_btn_delete",function(e){
e.preventDefault(),$(this).parents(".js_item").remove(),k=[],p.find(".js_input_link").each(function(){
var e=$(this).val()||"";
e&&k.push({
link:e
});
}),h.show(),o();
});
}
function _(){}
function c(e){
var n=!0;
return f.hide(),k&&0!=k.length||(n=!1,f.show()),"function"==typeof e&&e.call(void 0,n),
n;
}
function u(e){
return e&&e.model&&(v=e.model),w?!1:(w=!0,s(),a(),void l());
}
var d,f,h,p,b=template.render,m=e("common/wx/Tips.js"),j=e("biz_web/utils/upload.js"),v=null,w=!1,k=[];
i.exports={
init:u,
check:c,
triggerEditMode:_
};
});