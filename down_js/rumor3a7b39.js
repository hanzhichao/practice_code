define("operation/rumor.js",["common/wx/pagebar.js","common/wx/Cgi.js","biz_common/moment.js","common/wx/Tips.js"],function(t){
"use strict";
function i(){
cgiData.dispel_uin_list=dispel_org_list.list,cgiData.top_rumor_list=hot_rumor_list.item;
for(var t=0,i=cgiData.top_rumor_list.length;i>t;t++)cgiData.top_rumor_list[t].urled=encodeURIComponent(cgiData.top_rumor_list[t].url);
cgiData.begin=Number(cgiData.begin),cgiData.total=Number(cgiData.total);
}
function o(){
$("#js_total_dispel").html(cgiData.total_dispel),$("#js_total_view").html(cgiData.total_view),
$("#js_rumor_list").html(template.render("js_rumou_list_tpl",{
list:cgiData.top_rumor_list
}));
var t={
begin:1,
count:9
};
cgiData.total>t.count&&(s=new e({
container:"#js_rumor_list_pagewrp",
perPage:t.count,
initShowPage:1,
totalItemsNum:cgiData.total,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
var o=i.currentPage;
o!==t.begin?(t.begin=o,a(t)):n.err("输入的页码为当前页");
}
})),$("#js_account_list").html(template.render("js_account_list_tpl",{
list:cgiData.dispel_uin_list
}));
}
function a(t){
r.get({
url:"/cgi-bin/opshowpage?action=hotrumor",
data:t
},{
done:function(t){
t&&t.base_resp&&0==t.base_resp.ret?$("#js_rumor_list").html(template.render("js_rumou_list_tpl",{
list:JSON.parse(t.hot_rumor_list).item
})):n.err("系统错误");
},
fail:function(){
n.err("系统错误");
}
});
}
var e=t("common/wx/pagebar.js"),r=t("common/wx/Cgi.js"),l=t("biz_common/moment.js"),n=t("common/wx/Tips.js"),s=null;
template.helper("unixFormat",function(t,i){
return i&&(i=i.replace(","," ")),l.unix(t).format(i);
}),i(),o();
});