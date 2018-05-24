define("ibeacon/data_device.js",["common/wx/popup.js","common/wx/Cgi.js","biz_web/ui/dropdown.js","biz_common/moment.js","common/wx/pagebar.js","ibeacon/shopDialog.js","common/wx/Tips.js","common/wx/top.js","common/wx/popover.js"],function(e){
"use strict";
e("common/wx/popup.js");
var t=e("common/wx/Cgi.js"),o=e("biz_web/ui/dropdown.js"),a=e("biz_common/moment.js"),n=e("common/wx/pagebar.js"),i=e("ibeacon/shopDialog.js"),c=e("common/wx/Tips.js"),s=e("common/wx/top.js"),r=e("common/wx/popover.js"),d=$(".js_a_search"),l=$(".js_search"),p=$("#js_tbody"),_=$(".js_tbody_loading"),m=$(".pagination_wrp"),u=$("#js_download"),h=null,g={
1:"/merchant/beacongetpage?action=diy",
10:"/merchant/beacongetpage?action=card",
11:"/merchant/beacongetpage?action=store",
14:"/merchant/beacongetpage?action=draw"
};
new s("#js_div_toptab",s.DATA.ibeacon).selected("dataReport");
var w={
date:"",
page_index:1,
page_size:15,
search_txt:"",
page_id:"",
location_id:0
},f=[{
name:"更多...",
value:"__more__"
}],v=function(){
var e="";
for(var t in w)e+="&"+t+"="+w[t];
return e;
},x=function(){
m.html(""),p.hide(),_.show(),t.get({
url:wx.url("/merchant/beaconstatdevicelist?action=list&f=json"+v()),
success:function(e){
0==e.base_resp.ret?(p.html(template.render("js_tbody_tpl",{
list:JSON.parse(e.records)
})),p.show(),_.hide(),wx.cgiData.total_count=e.record_count,k(e.record_count)):c.err("系统错误");
}
});
},b=function(){
d.click(function(){
w.search_txt=l.val(),w.page_index=1,x();
}),l.on("keyup",function(){
var e="which"in event?event.which:event.keyCode;
13!=e&&$(this).val()||(w.search_txt=l.val(),w.page_index=1,x());
});
},j=function(){
for(var e=[],t=1;30>=t;t++)e.push({
name:a().subtract(t,"days").format("YYYY-MM-DD"),
value:a().subtract(t,"days").format("YYYYMMDD")
});
new o({
container:"#js_date_dropdown",
label:e[0].name,
data:e,
callback:function(e){
w.date=e,w.page_index=1,x();
}
}),w.date=e[0].value;
},y=function(){
var e=0,a=[],n="";
t.get({
url:"/merchant/beacongetmplocations?action=list&page_index=1&f=json",
success:function(t){
if(0==t.base_resp.ret){
a=JSON.parse(t.records),e=t.record_count,a.length<=5&&(f=[]);
for(var c=0;c<a.length&&5>c;c++)f.unshift({
name:a[c].name,
value:a[c].id
});
}
f.unshift({
name:"所有门店",
value:0
},{
name:"无门店",
value:-1
});
var s=new o({
container:"#js_shop_dropdown",
label:"所在门店",
data:f,
callback:function(t,o){
if("__more__"==t){
h=$(".jsBtLabel").eq(0),h.text("所有门店");
var c=new i({
container:"#js_edit_shop_tpl",
title:"选择门店",
className:"device_dialog",
width:960,
shopRecords:a,
shopCount:e,
onHide:function(){
s.reset(),h.text(n?n:"选择门店");
},
buttons:[{
text:"确定",
type:"primary",
click:function(){
s.reset(),h.text(c.getLocation().locationName),n=c.getLocation().locationName,this.remove(),
w.location_id=c.getLocation().locationID,w.page_index=1,x();
}
},{
text:"取消",
click:function(){
s.reset(),h.text(n?n:"选择门店"),this.remove();
}
}]
});
}else w.location_id=t,w.page_index=1,n=o,x();
}
});
}
});
},k=function(e){
e>0&&new n({
container:".pagination_wrp",
perPage:w.page_size,
first:!1,
last:!1,
isSimple:!0,
initShowPage:w.page_index,
totalItemsNum:e,
callback:function(e){
w.page_index=e.currentPage,window.scrollTo(0,0),p.hide(),_.show(),t.get({
url:wx.url("/merchant/beaconstatdevicelist?action=list&f=json"+v()),
success:function(e){
0==e.base_resp.ret?(p.html(template.render("js_tbody_tpl",{
list:JSON.parse(e.records)
})),p.show(),_.hide()):c.err("系统错误");
}
});
}
});
},D=function(){
u.on("click",function(){
var e=[],t=wx.cgiData.total_count;
if(0==t)return void c.err("暂无数据");
for(var o=0,a=1;t>0;)t>2e3?(e.push({
offset:o,
count:2e3,
index:a
}),o+=2e3):e.push({
offset:o,
count:2e3,
index:a
}),t-=2e3,a++;
$("#js_download_tpl").popup({
title:"下载设备数据",
onShow:function(){
var t=this.$dialogWrp.eq(0).find(".js_tbody"),o=this.$dialogWrp.eq(0).find(".pagination_wrp");
t.html(template.render("js_download_tbody_tpl",{
list:e.slice(0,15),
date:w.date,
search_txt:w.search_txt,
location_id:w.location_id
})),e.length>15&&new n({
container:o,
perPage:15,
first:!1,
last:!1,
isSimple:!0,
initShowPage:1,
totalItemsNum:e.length,
callback:function(o){
t.html(template.render("js_download_tbody_tpl",{
list:e.slice(15*(o.currentPage-1),15*o.currentPage),
date:w.date,
search_txt:w.search_txt,
location_id:w.location_id
}));
}
});
}
});
});
},N=function(){
$("body").on("click",".js_page",function(){
var e=$(this),t=e.data("delete"),o=e.data("id"),a=e.data("type");
return 1==t?void c.err("该页面已删除"):void window.open(g[a]+"&page_id="+o+"&lang="+wx.data.lang+"&token="+wx.data.t);
}),$("body").on("mousemove",".js_page_popover",function(){
var e=$(this);
new r({
dom:this,
content:e.find(".js_popover").html(),
hover:!0,
addCls:"data__list-popover"
});
});
},S=function(){
_.hide(),p.html(template.render("js_tbody_tpl",{
list:wx.cgiData.records
})),b(),j(),y(),k(wx.cgiData.total_count),D(),N();
};
S();
});