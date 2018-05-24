define("scan/category_list.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","common/wx/dialog.js","biz_web/ui/dropdown.js","common/wx/Tips.js","common/wx/top.js","common/wx/tooltips.js","biz_web/lib/json.js","biz_web/utils/upload.js","common/wx/pagebar.js","common/wx/popup.js","common/wx/preview.js","common/qq/queryString.js","scan/biz_category.js"],function(t){
"use strict";
function e(){
for(var t=0;t<d.length;t++)d[t].file_category=d[t].file_category.join("、");
console.log("cgiData:",j),console.log("categoryList:",d);
}
function o(){
new l("#js_div_toptab",l.DATA.scan).selected(2),$("#js_section_category_list").html(s("tpl_category_list",{
list:d,
status:j.status
}));
for(var t=0;t<d.length;t++){
var e=[];
if(d[t].file.length>0){
for(var o=0;o<d[t].file.length;o++)e.push(f.mediaFileUrl(d[t].file[o].id));
$("#js_section_category_list").find(".js_category_item").eq(t).data("files",e);
}else $("#js_section_category_list").find(".js_category_item").eq(t).find(".js_btn_preview").hide();
}
new c({
container:"#js_filter_state",
label:b[j.status]||"所有",
data:[{
name:"所有",
value:""
},{
name:"审核中",
value:"1"
},{
name:"未通过",
value:"2"
},{
name:"已通过",
value:"3"
}],
callback:function(t){
t!==j.status&&(location.href=t?p.replaceAll({
status:t,
offset:0
}).getUrl():p.remove("status").replace("offset",0).getUrl());
}
});
{
var n=j.pageInfo.limit,i=j.pageInfo.offset,a=j.categoryList?j.categoryList.total_count:0,r=(i+n)/n;
new g({
container:".js_pagebar",
first:!1,
last:!1,
midRange:5,
initShowPage:r,
perPage:n,
totalItemsNum:a,
callback:function(t){
var e=t.currentPage;
return e!=r&&(location.href=p.replace("offset",(e-1)*n).getUrl()),!1;
}
});
}
}
function n(){
$(document).on("click",".js_btn_preview",function(){
for(var t=$(this).parents(".js_category_item").data("files"),e=[],o=0;o<t.length;o++)e.push({
imgsrc:t[o],
downsrc:t[o]
});
console.log(e),u.show({
imgdata:e,
current:0
});
}),$(document).on("click",".js_button_add",function(){
return!0;
}),$("#js_section_category_list").find(".js_btn_remove").each(function(){
var t=$(this).parents(".js_category_item");
new m({
container:$(this),
content:"确认要删除此资质吗？删除后将无法恢复。",
type:"click",
position:{
top:-5,
left:-128
},
onclose:function(){},
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
var e=this,o=e.$dom.find(".btn_primary");
o.btn(!1),a.post({
url:"/merchant/scanqualification?action=deletebusinesscategory",
data:{
secondary_category_id:t.data("id2")
},
mask:!1
},function(e){
0==e.base_resp.ret?(t.remove(),location.reload()):(r.err("删除失败，请重试"),o.btn(!0));
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
0==this.$dom.find(".btn").eq(1).hasClass("btn_disabled")&&this.hide();
}
}]
});
});
{
var t=j.pageInfo.limit,e=j.pageInfo.offset,o=j.firmInfoList?j.firmInfoList.total_count:0,n=(e+t)/t;
new g({
container:".js_pagebar",
first:!1,
last:!1,
midRange:5,
initShowPage:n,
perPage:t,
totalItemsNum:o,
callback:function(e){
var o=e.currentPage;
return o!=n&&(location.href=p.replace("offset",(o-1)*t).getUrl()),!1;
}
});
}
}
function i(){
e(),o(),n();
}
{
var a=(wx.T,t("common/wx/Cgi.js")),s=template.render,c=(t("biz_web/ui/checkbox.js"),
t("common/wx/dialog.js"),t("biz_web/ui/dropdown.js")),r=t("common/wx/Tips.js"),l=t("common/wx/top.js"),m=t("common/wx/tooltips.js"),f=(t("biz_web/lib/json.js"),
t("biz_web/utils/upload.js")),g=t("common/wx/pagebar.js"),u=(t("common/wx/popup.js"),
t("common/wx/preview.js")),_=t("common/qq/queryString.js"),p=(t("scan/biz_category.js"),
new _),j=wx.cgiData||{},b={
0:"所有",
1:"审核中",
2:"未通过",
3:"已通过"
},d=j.categoryList.business_category;
j.categoryList.total_count;
}
i();
});