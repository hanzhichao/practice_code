define("advanced/maintenance.js",["biz_common/moment.js","common/wx/popover.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/date_hm.js","common/wx/pagebar.js"],function(e){
"use strict";
var t=template.render,n=e("biz_common/moment.js"),a=e("common/wx/popover.js"),i=(e("biz_web/ui/checkbox.js"),
e("biz_web/ui/dropdown.js")),r=e("common/wx/Cgi.js"),s=e("common/wx/Tips.js"),o=e("common/wx/date_hm.js"),d=e("common/wx/pagebar.js"),c=$("#js_mainform"),l=function(e){
function a(e){
for(var t=0,n=e.length;n>t;t++){
var a=e[t];
if(h[a.type]){
var i=h[a.type];
v[i].push({
name:a.name,
value:a.id
});
}else{
var i=j.length+1;
j.push({
name:a.type,
value:i
}),h[a.type]=i,v[i]=[],v[i].push({
name:a.name,
value:a.id
});
}
}
for(var r in v)v.hasOwnProperty(r)&&w.push(r);
}
function r(e,t,n){
f.api_id=n,e&&(p.firstLevelName=e),t&&(p.secondLevelName=t),f.start=0,f.limit=u;
}
function s(){
var e=c.find(".js_api_dd").find(".js_parent");
e.html(t("js_api_ddtpl",{
list:w
})),new i({
container:e.find(".js_first_level"),
data:j,
index:0,
callback:function(t,n){
var a=+t;
if(a>0){
e.find(".js_second_level").hide();
var i=e.find(".js_second_level"+a),s=i.data("name"),o=i.data("value");
r(n,s,o),i.show();
}
}
}),p.firstLevelName=j.length>0?j[0].name:"";
var n=v[1];
n.length>0&&(f.api_id=n[0].value,p.secondLevelName=n[0].name);
for(var a=0,s=w.length;s>a;a++){
var o=w[a];
!function(t){
var n=e.find(".js_second_level"+t),a=v[t],s={
container:n,
data:a,
index:0,
callback:function(e,t){
r("",t,e),n.data("value",e).data("name",t);
}
};
n.data("value",a[0].value).data("name",a[0].name),new i(s);
}(o);
}
}
function o(){
a(e.api_list.list),s();
}
function l(){
c.find(".js_common_type").hide(),c.find(".js_api_type").show();
}
function _(){
var e=c.find("input[name=hint]").val().trim();
return f.hint!=e&&(f.hint=e,f.start=0,f.limit=u),f;
}
function m(e){
for(var a={
list:[],
category_name:p.firstLevelName+"-"+p.secondLevelName
},i=e.list.list,r=0,s=i.length;s>r;r++){
var o,c={};
try{
o=JSON.parse(i[r].response),c.errmsg=o.errmsg;
}catch(l){
c.errmsg="无";
}
c.time_desc=n.unix(i[r].time).format("YYYY-M-D HH:mm:ss"),c.open_id=i[r].open_id,
c.thirddesc=i[r].component_name,c.url=i[r].url,c.postdata=i[r].postdata,c.response=i[r].response,
c.errcode=0==+i[r].errcode?"0（请求成功）":i[r].errcode,c.hint=i[r].UUID,c.report_ip=i[r].report_ip,
a.list.push(c);
}
$("#js_content").html(t("js_api_tpl",a)),$("#js_content").find(".js_detail").on("click",function(){
var e=$(this),t=e.find("i"),n=e.find("span"),a=e.data("idx"),i="详情"==n.text()?!0:!1;
i?($("#js_content").find(".js_child"+a).show(),n.text("收起"),t.removeClass("icon_arrow_down").addClass("icon_arrow_up")):($("#js_content").find(".js_child"+a).hide(),
n.text("详情"),t.removeClass("icon_arrow_up").addClass("icon_arrow_down"));
}),e.count>u&&new d({
container:$("#js_content").find(".js_pager"),
currentPage:Math.floor(f.start/u)+1,
perPage:u,
totalItemsNum:e.count,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var t=Math.floor(e.currentPage)-1;
return f.start=t*u,$("#js_search").click(),!1;
}
});
}
var u=12,p={
firstLevelName:"",
secondLevelName:""
},f={
api_id:null,
hint:null,
start:0,
limit:u
},v={},h={},j=[],w=[];
return{
init:o,
show:l,
get:_,
displayTable:m
};
}(wx.cgiData),_=function(e){
function r(e){
for(var t=0,n=e.length;n>t;t++)0==t&&(h.callback_id=e[t].id,p=e[t].type),v.push({
name:e[t].type,
value:e[t].id
});
}
function s(e,t){
h.callback_id=t,p=e,h.start=0,h.limit=f;
}
function o(){
new i({
container:c.find(".js_reply_dd").find(".js_dd"),
data:v,
index:0,
callback:function(e,t){
s(t,e);
}
});
}
function l(){
r(e.callback_list.list),o();
}
function _(){
c.find(".js_common_type").hide(),c.find(".js_reply_type").show();
}
function m(){
var e=c.find("input[name=openid]").val().trim();
return h.open_id!=e&&(h.open_id=e,h.start=0,h.limit=f),h;
}
function u(e){
for(var i={
list:[],
category_name:p
},r=e.list.list,s=0,o=r.length;o>s;s++){
var c={};
c.server_done=1001==+r[s].errcode?"是":"否",c.msgtype=p,c.time_desc=n.unix(r[s].time).format("YYYY-M-D HH:mm:ss"),
c.open_id=r[s].open_id,c.appname=r[s].component_name,c.url=r[s].url,c.report_ip=r[s].report_ip,
c.postdata=r[s].postdata,c.postdataDe=r[s].postdata_decrypted,c.response=r[s].response,
c.responseDe=r[s].response_decrypted,i.list.push(c);
}
var l=$("#js_content");
l.html(t("js_reply_tpl",i)),l.find(".js_detail").on("click",function(){
var e=$(this),t=e.find("i"),n=e.find("span"),a=e.data("idx"),i="详情"==n.text()?!0:!1;
i?($("#js_content").find(".js_child"+a).show(),n.text("收起"),t.removeClass("icon_arrow_down").addClass("icon_arrow_up")):($("#js_content").find(".js_child"+a).hide(),
n.text("详情"),t.removeClass("icon_arrow_up").addClass("icon_arrow_down"));
}),e.count>f&&new d({
container:$("#js_content").find(".js_pager"),
currentPage:Math.floor(h.start/f)+1,
perPage:f,
totalItemsNum:e.count,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var t=Math.floor(e.currentPage)-1;
return h.start=t*f,$("#js_search").click(),!1;
}
}),new a({
dom:l.find(".js_reply_tip"),
content:"微信服务器将消息发送到开发者服务器后，在五秒内是否收到开发者服务器的响应。",
hideIfBlur:!0,
isToggle:!0,
hover:!0
}).hide();
}
var p="",f=12,v=[],h={
callback_id:null,
open_id:null,
start:0,
limit:f
};
return{
init:l,
show:_,
get:m,
displayTable:u
};
}(wx.cgiData),m=function(e,t){
function a(){
var e=_+" "+u.value().desc,t=m+" "+p.value().desc;
return{
start_time:+new Date(e),
end_time:+new Date(t)
};
}
function d(){
c.find(".js_chooser").find("input").checkbox({
multi:!1,
onChanged:function(e){
var n=1==+e.val().trim()?1:0;
f=n,t[n].show();
}
});
var d=n.unix(e.current_time),l=d.hours(),h=d.minutes(),j=d.add(-1,"hours"),w=j.hours(),g=j.minutes();
u=new o({
container:"#js_hs_start",
defaultHour:w,
defaultMin:g,
span:"时",
span_end:"分"
}),p=new o({
container:"#js_hs_end",
defaultHour:l,
defaultMin:h,
span:"时",
span_end:"分"
}),_=m=d.format("YYYY/M/D"),v.push({
name:d.format("M/D"),
value:d.format("YYYY/M/D")
}),v.push({
name:d.add(-1,"days").format("M/D"),
value:d.format("YYYY/M/D")
}),v.push({
name:d.add(-1,"days").format("M/D"),
value:d.format("YYYY/M/D")
}),new i({
container:"#js_day_start",
index:0,
data:v,
callback:function(e){
_=e;
}
}),new i({
container:"#js_day_end",
index:0,
data:v,
callback:function(e){
m=e;
}
}),c.find("#js_search").on("click",function(){
var e=$(this),n=t[f].get(),i=a();
return n.start_time=(""+i.start_time).substring(0,10),n.end_time=(""+i.end_time).substring(0,10),
e.btn(!1),+n.start_time<+n.end_time?($(".js_tip").hide(),void r.post({
url:wx.url("/advanced/advanced?action=log_query"),
data:n,
mask:!1
},function(n){
if(!n||!n.base_resp)return void r.handleRet(n,{
id:64463,
key:2,
url:"/advanced/advanced?action=log_query"
});
switch(+n.base_resp.ret){
case 0:
var a={};
if(n.clickstream)try{
a.list=JSON.parse(n.clickstream);
}catch(i){
a.list={
list:[]
};
}
a.count=n.total_record,t[f].displayTable(a);
break;

case 212001:
var o="系统超时，请稍后重试";
$(".js_tip").text(o).show(),s.err(o);
break;

case 200013:
var o="操作过于频繁，请稍后再试";
$(".js_tip").text(o).show(),s.err(o);

case 212e3:
$(".js_tip").text("超出可查询时间范围").show();
break;

default:
r.handleRet(n,{
id:64463,
key:2,
url:"/advanced/advanced?action=log_query"
});
}
e.btn(!0);
})):($(".js_tip").text("请输入有效查询时间").show(),!1);
});
}
function l(){
d();
for(var e=0,n=t.length;n>e;e++)t[e].init();
}
var _,m,u,p,f=0,v=[];
return{
init:l
};
}(wx.cgiData,[l,_]);
m.init();
});