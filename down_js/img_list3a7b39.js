define("original/img_list.js",["common/wx/Cgi.js","common/wx/pagebar.js","common/wx/dialog.js","biz_common/moment.js","common/wx/Tips.js","common/wx/preview.js"],function(i){
"use strict";
function t(){
$("#list_tmpl").html(template.render("list",{
list:g.data
})),a();
}
function n(){
g.data=wx.cgiData.data.list;
for(var i=0,t=g.data.length;t>i;i++){
var n=g.data[i];
n.encodeurl=window.encodeURIComponent(n.url),n.createTimeStr=m.unix(n.create_time).format("YYYY-MM-DD"),
n.title=n.title.html(!0);
}
}
function o(){
var i=$("#list_tmpl");
i.on("click",".js_cancel",function(){
var i=$(this).data("url");
r.show({
type:"warn",
width:550,
msg:"取消原创后，图片将从原创库中去除，且原创信息不保留。此操作不可逆，请确认。",
buttons:[{
text:"确定",
type:"primary",
click:function(){
var t=this,n=this.dom.find(".btn_primary");
n.hasClass("btn_loading")||(n.btn(0),e.post({
url:"/cgi-bin/imgcopyright?",
data:{
action:"cancel_orginal",
img_url:i
},
mask:!1
},function(i){
if(n.btn(1),i&&i.base_resp&&0==i.base_resp.ret){
s.suc("操作成功"),t.remove();
var o=window.wx.cgiData,a=o.count,c=o.begin;
1==g.data.length&&c>1?window.location.href=wx.url("/cgi-bin/imgcopyright?action=original&begin=%s&count=%s".sprintf(c-1,a)):window.location.reload(!0);
}else e.handleRet(i,{
id:64462,
key:35,
url:"/cgi-bin/imgcopyright?action=cancel_orginal"
}),s.err("操作失败，请重试");
}));
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
}),i.on("click",".js_img_preview",function(){
var i=$(this),t=[],n=0;
$("#list_tmpl").find(".js_img_preview").each(function(o,a){
a===i[0]&&(n=t.length);
var e=$(a).data("url")||"";
e&&t.push({
imgsrc:e
});
}),t.length>0&&l.show({
imgdata:t,
current:n
});
});
}
function a(){
{
var i=window.wx.cgiData,t=i.data.total_num,n=i.count,o=i.begin;
new c({
container:".pagination_wrp",
perPage:n,
first:!1,
last:!1,
isSimple:!0,
initShowPage:o,
totalItemsNum:t,
callback:function(i){
var t=i.currentPage;
if(t!=o)return location.href=wx.url("/cgi-bin/imgcopyright?action=original&begin=%s&count=%s".sprintf(t,n)),
!1;
}
});
}
}
var e=i("common/wx/Cgi.js"),c=i("common/wx/pagebar.js"),r=i("common/wx/dialog.js"),m=i("biz_common/moment.js"),s=i("common/wx/Tips.js"),l=i("common/wx/preview.js"),g={};
n(),t(),o();
});