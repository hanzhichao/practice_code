define("biz_web/utils/multiupload.js",["common/wx/Tips.js","common/wx/preview.js","biz_web/utils/upload.js","tpl/biz_web/ui/multiupload.html.js"],function(e,i,l){
"use strict";
function t(e,i){
return"bizmedia"==i?u.mediaFileUrl(e):"preview"==i?u.tmpFileUrl(e):"multimedia"==i?u.multimediaFileUrl(e):void 0;
}
function n(e){
var i=$(e.container);
if(i.length<=0)return!1;
for(var l=[],r=0;r<e.files.length;r++)e.files[r].id&&l.push(e.files[r]);
e.files=l,e.maxNum=e.range[1]-e.range[0]+1,e.remainNum=e.maxNum-e.files.length,e.inputs=[];
for(var r=e.range[0];r<=e.range[1];r++){
var p={};
p.name=e.name+(r?r:""),p.value="",p.title="",e.inputs.push(p);
}
for(var r=0;r<e.files.length;r++)e.files[r].id&&(e.inputs[r].value=e.files[r].id,
e.inputs[r].title=e.files[r].title||"");
console.log("multiUpload",e);
var f=$(s(m,e));
return i.html(f),f.on("click",".js_btn_delete",function(){
for(var i=$(this).parent(".js_item"),l=i.data("file"),t=0;t<e.files.length;t++)if(l==e.files[t].id){
e.files.splice(t,1),e.remainNum++;
break;
}
console.log("multiUpload deleted"),n(e);
}),f.on("click",".js_btn_preview",function(){
for(var i=$(this).parent(".js_item"),l=i.data("file"),n="",r=0;r<e.files.length;r++)if(l==e.files[r].id){
n=t(l,e.files[r].preview);
break;
}
n&&o.show({
imgdata:[{
imgsrc:n,
downsrc:n
}],
current:0
});
}),u.uploadTmpFile({
container:f.find(".js_btn_multiupload"),
multi:!1,
type:2,
onSelect:function(){
return console.log("onSelect, remainNum:",e.remainNum),0==e.remainNum?(a.err("最多只能上传%s张".sprintf(e.maxNum)),
!1):void 0;
},
onComplete:function(i,l,t,r){
var s=r.content||"";
0==r.base_resp.ret?(e.files.push({
id:s,
title:t.name,
preview:"preview"
}),e.remainNum--,n(e),a.suc("上传成功")):(a.err("上传失败，请重试"),console.log("upload fail, resp:",r));
}
}),e;
}
function r(e){
return n(e);
}
var s=wx.T,a=e("common/wx/Tips.js"),o=e("common/wx/preview.js"),u=e("biz_web/utils/upload.js"),m=e("tpl/biz_web/ui/multiupload.html.js");
template.helper("$preview",t),l.exports={
init:r
};
});