define("dispute/record.js",["common/wx/top.js","common/wx/Cgi.js","common/wx/pagebar.js","common/wx/popup.js","common/wx/Tips.js"],function(t){
"use strict";
{
var e=t("common/wx/top.js"),i=(t("common/wx/Cgi.js"),t("common/wx/pagebar.js")),a=template.render;
t("common/wx/popup.js"),t("common/wx/Tips.js");
}
template.helper("datestring",function(t){
var e=new Date(1e3*t),i="%s-%s-%s".sprintf(e.getFullYear(),e.getMonth()+1,e.getDate());
return i;
}),new e("#topTab",e.DATA.infringement).selected("list"),function(){
var t=wx.cgiData.list.total_count,e=wx.cgiData.page,a=e;
t>0&&new i({
container:".pageNavigator",
perPage:wx.cgiData.count,
first:!1,
last:!1,
isSimple:!0,
initShowPage:a,
totalItemsNum:t,
callback:function(t){
var e=t.currentPage;
if(e!=a)return location.href=wx.url("/acct/dispute?action=get_declare_list&page="+e),
!1;
}
});
}();
for(var l=wx.cgiData.list,s=[],c=0;c<l.declare_list.length;c++)s.push({
dispute_article_list:l.dispute_list[c].article_list,
create_time:l.declare_list[c].create_time,
id:l.dispute_list[c].id,
declare_id:l.declare_list[c].id,
title:l.declare_list[c].article.title,
url:l.declare_list[c].article.url,
pic_cdn_url:l.declare_list[c].article.pic_cdn_url
});
$("#js_list").html(a("tpl_list",{
list:s
})),$(".js_view_dispute_article").click(function(){
{
var t=$(this).attr("data-idx"),e=s[t];
e.dispute_article_list;
}
$("#js_multi_article_tpl").popup({
data:{
dispute_article_list:e.dispute_article_list
},
title:"声明对象(共%s篇文章)".sprintf(e.dispute_article_list.length),
autoShow:!0,
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove();
}
}]
});
});
});