define("original/video_list.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_common/moment.js","common/wx/dialog.js","common/wx/pagebar.js"],function(i){
"use strict";
function o(){
for(var i=0;i<g.length;i++)g[i].time=c.unix(g[i].timestamp).format("YYYY-MM-DD");
}
function t(){
if(l.html(template.render("js_list_tmpl",{
list:g
})),wx.cgiData.total_num>0){
var i=window.wx.cgiData,o=i.total_num,t=i.count,n=i.begin/t+1;
new m({
container:".pagination_wrp",
perPage:t,
first:!1,
last:!1,
isSimple:!0,
initShowPage:n,
totalItemsNum:o,
callback:function(i){
var o=i.currentPage;
if(o!=n)return o--,location.href=wx.url("/cgi-bin/ori_video?action=get_ori_video_list&begin=%s&offset=%s".sprintf(t*o,t)),
!1;
}
});
}
}
function n(){
l.on("click",".js_cancel",function(){
var i=$(this).data("vid");
r.show({
title:"温馨提示",
msg:"取消原创后，视频将从原创库中去除，且原创信息不保留。此操作不可逆，请确认。",
mask:!0,
type:"warn",
buttons:[{
text:"确定",
click:function(){
var o=this,t=this.dom.find(".btn_primary");
t.hasClass("btn_loading")||(t.btn(0),a.post({
url:"/cgi-bin/ori_video?action=cancel_ori",
data:{
vid:i
}
},function(i){
if(t.btn(1),i&&i.base_resp&&0==i.base_resp.ret){
s.suc("操作成功"),o.remove();
var n=window.wx.cgiData,e=n.count,c=n.begin;
1==g.length&&0!=c?window.location.href=wx.url("/cgi-bin/ori_video?action=get_ori_video_list&begin=%s&offset=%s".sprintf(c-10,e)):window.location.reload(!0);
}else a.handleRet(i,{
id:64462,
key:43,
url:"/cgi-bin/ori_video?action=cancel_ori"
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
});
}
function e(){
o(),t(),n();
}
var a=i("common/wx/Cgi.js"),s=i("common/wx/Tips.js"),c=i("biz_common/moment.js"),r=i("common/wx/dialog.js"),m=i("common/wx/pagebar.js"),l=$("#js_video_list"),g=wx.cgiData.list;
e();
});