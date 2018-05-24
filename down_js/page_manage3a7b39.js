define("ibeacon/page_manage.js",["common/wx/Cgi.js","biz_web/ui/dropdown.js","common/wx/popover.js","common/wx/time.js","common/wx/Tips.js","common/wx/top.js","common/wx/pagebar.js"],function(e){
"use strict";
var t=e("common/wx/Cgi.js"),a=e("biz_web/ui/dropdown.js"),o=e("common/wx/popover.js"),n=e("common/wx/time.js"),c=e("common/wx/Tips.js"),s=e("common/wx/top.js"),i=e("common/wx/pagebar.js");
template.helper("timeFormat",function(e){
return n.timeFormat(e);
}),new s("#js_div_toptab",s.DATA.ibeacon).selected("pageManagement");
var r=$("#js_tbody"),p=$(".js_tbody_loading"),l=($("#js_page_dropdown"),$(".pagination_wrp")),m=$(".js_a_search"),d=$(".js_search"),u={
showpage:wx.cgiData.showpage,
count:wx.cgiData.count,
key:wx.cgiData.key,
page_type:wx.cgiData.page_type||0,
total_count:wx.cgiData.total_count
},w=(new a({
container:"#js_page_dropdown",
label:"页面类型",
data:[{
name:"全部",
value:0
},{
name:"自定义链接",
value:1
},{
name:"卡券发放页面",
value:10
},{
name:"商户主页",
value:13
},{
name:"抽奖页面",
value:14
}],
callback:function(e){
u.page_type=e,w();
}
}),function(){
l.html(""),r.hide(),p.show(),u.showpage=1,t.post({
url:wx.url("/merchant/beaconlistpage?action=list&need_dc=1"),
data:{
search_txt:u.key,
page_index:u.showpage,
page_type:u.page_type
},
success:function(e){
0==e.base_resp.ret?(u.total_count=e.page_count,r.html(template.render("js_tbody_tpl",{
list:e.records
})),r.show(),p.hide(),_(e.page_count)):c.err("系统错误");
}
});
}),_=function(e){
e>0&&new i({
container:".pagination_wrp",
perPage:u.count,
first:!1,
last:!1,
isSimple:!0,
initShowPage:u.showpage,
totalItemsNum:u.total_count,
callback:function(e){
u.showpage=e.currentPage,window.scrollTo(0,0),r.hide(),p.show(),t.post({
url:wx.url("/merchant/beaconlistpage?action=list&need_dc=1"),
data:{
search_txt:u.key,
page_index:u.showpage,
page_type:u.page_type
},
success:function(e){
0==e.base_resp.ret?(r.html(template.render("js_tbody_tpl",{
list:e.records
})),r.show(),p.hide()):c.err("系统错误");
}
});
}
});
};
p.hide(),r.html(template.render("js_tbody_tpl",{
list:wx.cgiData.records
})),_(u.total_count),r.on("click",".js_del",function(){
var e=$(this).data("count"),a=$(this).data("id");
new o({
dom:this,
hideIfBlur:!0,
content:e?"删除页面后，将有%s个设备无法摇出页面，确定要删除该页面吗？".sprintf(e):"确定要删除该页面？",
buttons:[{
text:"删除",
type:"primary",
click:function(){
var e=this;
t.post({
url:wx.url("/merchant/beacondeletepage?action=delete"),
data:{
page_id:a
},
success:function(t){
0==t.base_resp.ret?(e.remove(),c.suc("已删除"),location.reload()):(e.remove(),c.err("系统错误"));
}
});
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
}),m.click(function(){
u.key=d.val(),w();
}),d.on("keyup",function(){
var e="which"in event?event.which:event.keyCode;
13!=e&&$(this).val()||(u.key=d.val(),w());
});
});