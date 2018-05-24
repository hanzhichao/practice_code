define("scan/firmcat_list.js",["common/wx/Cgi.js","biz_web/ui/dropdown.js","common/wx/Tips.js","common/wx/top.js","common/wx/tooltips.js","biz_web/utils/upload.js","common/wx/preview.js","common/qq/queryString.js","scan/biz_category.js"],function(t){
"use strict";
function i(){
for(var t=0;t<b.length;t++)b[t].cat.file_category=b[t].cat.file_category.join("、");
}
function e(){
new l("#js_div_toptab",l.DATA.scan).selected(2),$("#js_div_firmcat_list").html(s("tpl_firmcat_list",{
list:b,
status:j.status
}));
for(var t=0;t<b.length;t++){
var i=[];
if(b[t].cat.file.length>0){
for(var e=0;e<b[t].cat.file.length;e++)i.push(_.mediaFileUrl(b[t].cat.file[e].id));
$("#js_div_firmcat_list").find(".js_category_item").eq(t).data("files",i);
}else $("#js_div_firmcat_list").find(".js_category_item").eq(t).find(".js_btn_preview").hide();
}
new c({
container:"#js_filter_state",
label:p[j.status]||"所有",
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
t!==j.status&&(location.href=t?u.replaceAll({
status:t
}).getUrl():u.remove("status").getUrl());
}
});
}
function n(){
$(document).on("click",".js_btn_preview",function(){
for(var t=$(this).parents(".js_category_item").data("files"),i=[],e=0;e<t.length;e++)i.push({
imgsrc:t[e],
downsrc:t[e]
});
console.log(i),f.show({
imgdata:i,
current:0
});
}),$("#js_div_firmcat_list").find(".js_btn_remove").each(function(){
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
text:"删除",
type:"btn_primary",
click:function(){
var i=this,e=i.$dom.find(".btn_primary");
e.btn(!1),o.post({
url:"/merchant/scanqualification?action=delbizcat",
data:{
secondary_category_id:t.data("id2"),
firm_name:t.data("firm"),
section_num:t.data("section")
},
mask:!1
},function(i){
0==i.base_resp.ret?(t.remove(),location.reload()):(r.err("删除失败，请重试"),e.btn(!0));
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
function a(){
i(),e(),n();
}
var s=template.render,o=t("common/wx/Cgi.js"),c=t("biz_web/ui/dropdown.js"),r=t("common/wx/Tips.js"),l=t("common/wx/top.js"),m=t("common/wx/tooltips.js"),_=t("biz_web/utils/upload.js"),f=t("common/wx/preview.js"),d=t("common/qq/queryString.js"),u=(t("scan/biz_category.js"),
new d),j=wx.cgiData||{},p={
0:"所有",
1:"审核中",
2:"未通过",
3:"已通过"
},b=j.firmcatList.list||[];
a();
});