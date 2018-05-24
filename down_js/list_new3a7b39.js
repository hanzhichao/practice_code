define("infringement/list_new.js",["common/wx/top.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/popover.js","common/wx/dialog.js","common/wx/pagebar.js"],function(e){
"use strict";
var t=(e("common/wx/top.js"),e("common/wx/Cgi.js")),n=e("common/wx/Tips.js"),i=e("common/wx/popover.js"),a=(e("common/wx/dialog.js"),
e("common/wx/pagebar.js")),o=template.render;
!function(){
var e=(wx.cgiData.identity,wx.cgiData.list),t=e.page?e.page.tital:0,n=wx.cgiData.count,i=wx.cgiData.begin,o=parseInt(i/n)+1;
t>0&&new a({
container:".pageNavigator",
perPage:n,
first:!1,
last:!1,
isSimple:!0,
initShowPage:o,
totalItemsNum:t,
callback:function(e){
var t=e.currentPage;
if(t!=o)return location.href=wx.url("/acct/infringement?action=getlist&t=infringement/ingringement_list&begin="+(t-1)*n+"&count="+n+"&type="+type+"&second_type="+second_type),
!1;
}
});
}(),template.helper("datestring",function(e){
var t=new Date(e),n="%s-%s-%s".sprintf(t.getFullYear(),t.getMonth()+1,t.getDate());
return n;
}),template.helper("bizlist",function(e){
if(!e)return"";
var t=e.data[0],n=t.nickname;
return n?n+="（"+(t.alias||t.username)+"）":n=t.alias||t.username,n;
}),template.helper("titlelist",function(e){
if(!e)return"";
for(var t=[],n="",i=0,a=e.length;a>i;i++){
var o=e[i];
n=o.nickname,n?n+="（"+(o.alias||o.username)+"）":n=o.alias||o.username,t.push(o.title);
}
return n+=" "+t.join("，");
}),$("#js_list").html(o("tpl_list",wx.cgiData)),$("body").on("click","#js_del",function(){
var e=$(this);
new i({
dom:this,
content:"确定删除该投诉单吗？删除后不可恢复",
buttons:[{
text:"确定",
type:"primary",
click:function(){
var i=this,a=i.$pop.find(".jsPopoverBt").eq(0);
a.hasClass("btn_disabled")||(a.disable(),t.post({
url:"/acct/infringement",
data:{
action:"deltemp"
},
mask:!1
},function(t){
a.enable(),t&&t.base_resp&&0==t.base_resp.ret?(n.suc("删除成功"),i.remove(),e.closest("tr").remove()):n.err("删除失败，请重试");
}));
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
});
});