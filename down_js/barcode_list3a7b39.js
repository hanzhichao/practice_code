define("scan/barcode_list.js",["common/wx/Cgi.js","common/wx/dialog.js","biz_web/ui/dropdown.js","common/wx/Tips.js","common/wx/top.js","common/wx/tooltips.js","biz_web/lib/json.js","biz_web/utils/upload.js","biz_common/jquery.validate.js","common/wx/pagebar.js","common/wx/popup.js","common/wx/preview.js","common/qq/queryString.js","scan/biz_category.js"],function(t){
"use strict";
function o(){
console.log("cgiData:",p);
for(var t=0;t<w.length;t++)w[t].file_id=w[t].file_id?w[t].file_id:"";
}
function e(){
new l("#js_div_toptab",l.DATA.scan).selected(2),$("#js_section_code_list").html(a("tpl_code_list",{
list:w,
status:p.status
}));
for(var t=0;t<w.length;t++)if(""!=w[t].file_id){
var o=[];
o.push(f.mediaFileUrl(w[t].file_id)),$("#js_section_code_list").find(".js_code_item").eq(t).data("files",o);
}
new c({
container:"#js_filter_state",
label:b[p.status]||"所有",
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
t!==p.status&&(location.href=t?j.replaceAll({
status:t,
offset:0
}).getUrl():j.remove("status").replace("offset",0).getUrl());
}
});
{
var e=p.pageInfo.limit,i=p.pageInfo.offset,n=p.firmInfoList?p.firmInfoList.total_count:0,s=(i+e)/e;
new d({
container:".js_pagebar",
first:!1,
last:!1,
midRange:5,
initShowPage:s,
perPage:e,
totalItemsNum:n,
callback:function(t){
var o=t.currentPage;
return o!=s&&(location.href=j.replace("offset",(o-1)*e).getUrl()),!1;
}
});
}
}
function i(){
$(document).on("click",".js_btn_preview",function(){
for(var t=$(this).parents(".js_code_item").data("files"),o=[],e=0;e<t.length;e++)o.push({
imgsrc:t[e],
downsrc:t[e]
});
console.log(o),u.show({
imgdata:o,
current:0
});
}),$("#js_section_code_list").find(".js_button_remove").each(function(){
var t=$(this).parents(".js_code_item");
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
var o=this,e=o.$dom.find(".btn_primary");
e.btn(!1),s.post({
url:"/merchant/scanqualification?action=deletefirminfo",
data:{
barcode:t.data("barcode")
},
mask:!1
},function(o){
0==o.base_resp.ret?(t.remove(),location.reload()):(r.err("删除失败，请重试"),e.btn(!0));
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
}
function n(){
o(),e(),i();
}
{
var s=(wx.T,t("common/wx/Cgi.js")),a=template.render,c=(t("common/wx/dialog.js"),
t("biz_web/ui/dropdown.js")),r=t("common/wx/Tips.js"),l=t("common/wx/top.js"),m=t("common/wx/tooltips.js"),f=(t("biz_web/lib/json.js"),
t("biz_web/utils/upload.js")),d=(t("biz_common/jquery.validate.js"),t("common/wx/pagebar.js")),u=(t("common/wx/popup.js"),
t("common/wx/preview.js")),_=t("common/qq/queryString.js"),j=(t("scan/biz_category.js"),
new _),p=wx.cgiData||{},b={
0:"所有",
1:"审核中",
2:"未通过",
3:"已通过"
},w=p.firmInfoList.firm_info;
p.firmInfoList.total_count;
}
n();
});