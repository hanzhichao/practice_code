define("shop/shelf_management.js",["common/wx/top.js","shop/tmpl_management.js","common/wx/Tips.js","biz_web/lib/json.js","common/wx/Cgi.js","shop/shelf_cgi.js","shop/wrapper_move.js","common/wx/tooltips.js","shop/feedback.js","common/wx/dialog.js"],function(e){
"use strict";
var t,s=e("common/wx/top.js"),n=e("shop/tmpl_management.js"),a=e("common/wx/Tips.js"),i=e("biz_web/lib/json.js"),o=e("common/wx/Cgi.js"),r=(e("shop/shelf_cgi.js"),
e("shop/wrapper_move.js")),p=e("common/wx/tooltips.js"),l=e("shop/feedback.js"),d=(e("common/wx/dialog.js"),
wx.cgiData),m="store",f=0,h={};
!function(){
new s("#topTab",s.DATA.shop).selected(3),l();
}(),function(){
function e(e){
var t=e.position().top+e.height()/2-349;
0>t?(l.css({
top:30+t+"px"
}),t=0):l.css({
top:"30px"
}),p.find(".js_pos").css("marginTop",t+"px"),p.show();
}
function s(){
t=new r({
container:"#js_tmplWrapper",
afterMove:function(){
$("#js_editForm").hide();
}
});
}
var p=$("#js_editForm"),l=p.find(".js_arrow");
if(p.find(".js_pos").on("click",function(e){
e.stopPropagation();
}),0==d.shelf_id){
for(var _={
1:[1],
2:[5],
3:[3,3,3],
4:[2,3,1]
}[d.shelf],c=0;c<_.length;c++){
var u="name_"+d.fakeid+"_"+f++;
n.init_tmpl(_[c],u,h);
}
s();
}else o.get({
url:"/merchant/rendershelf?shelf_id="+d.shelf_id,
mask:!1
},function(e){
var t,n=i.parse(e.shelf_info.data.http2https()).module_infos;
if($("#js_tmplWrapper").append(e.shelf_info.template.http2https()).find(".more_link").remove(),
"2"==wx.cgiData.wxa_mall_status&&($("#js_tmplWrapper").find(".banner_bg").siblings(".shop_modele_mask").remove(),
$("#js_tmplWrapper").find(".banner_bg").remove()),$("#js_tmplWrapper").find("img").each(function(){
var e=$(this),t=1*e.data("ratio");
t&&e.height(e.width()*t);
}),$("#js_tmplWrapper").find("a").attr("href","javascript:;"),e.shelf_info.name){
var a=$(".js_shopModuleWrapper[name=property]");
a.find(".js_title").text(e.shelf_info.name.html(!1)),a.data(m,{
name:e.shelf_info.name.html(!1)
}),d.default_shelf_id==d.shelf_id&&a.find(".js_default_shelf_title").show();
}
$("#js_banner").length&&($("#js_banner").attr("src",e.shelf_info.banner.http2https()),
$(".js_shopModuleWrapper[name=banner]").data(m,{
banner:e.shelf_info.banner
}));
for(var o=0,r=n.length;r>o;o++)t=n[o].namespace,h[t]=$("#tmpl"+n[o].eid).html().replace(/<name>/gi,t),
5==n[o].eid&&$("#js_newTmpl").remove(),delete n[o].eid,delete n[o].namespace,$(".js_shopModuleWrapper").filter("[name="+t+"]").data(m,n[o]),
f=Math.max(f,1*t.split("_")[2]);
f++,s();
});
$("#js_newTmpl").on("click",function(s){
if(s.stopPropagation(),$("#js_tmplWrapper").find(".js_shopModuleWrapper").length>10)return a.err("只能创建10个自定义模块"),
!1;
var i=$(this),o="name_"+d.fakeid+"_"+f++;
n.new_tmpl(o,h,function(){
t&&t.refresh();
}),e(i);
}),$("#js_tmplWrapper, #js_shopWraperProperty").delegate(".js_edit","click",function(s){
s.stopPropagation();
var a=$(this),i=a.closest(".js_shopModuleWrapper"),o=i.data("moduletype"),r=i.attr("name");
8==o?n["tmpl_"+o](i,r,h,{
appid:wx.cgiData.appid,
list:wx.cgiData.page_list,
callback:function(){
t&&t.refresh();
}
}):n["tmpl_"+o](i,r,h,{
callback:function(){
t&&t.refresh();
}
}),p.data("connect_dom",i),e(i);
}),$("#js_tmplWrapper").delegate(".js_delete","click",function(s){
s.stopPropagation();
var n=$(this),a=n.closest(".js_shopModuleWrapper"),i=a.attr("name"),o=p.data("connect_dom"),r=o?o.attr("name"):"";
delete h[i],a.remove(),i==r?(p.hide(),p.data("connect_dom",null)):o&&e(o),t&&t.refresh();
});
}(),function(){
function e(){
var e=[],t={
hasFinished:!0
},a=0;
return t.data={},t.data.module_infos=[],$(".js_shopModuleWrapper").each(function(){
var i=$(this),o=i.attr("name"),r=i.data("moduletype"),p=i.data(m)||{};
switch(o){
case"property":
t.name=p.name||"新建货架";
break;

case"banner":
t.banner=p.banner||"/mpres/htmledition/images/shop/bg_goods_img_default.png","/mpres/htmledition/images/shop/bg_goods_img_default.png"==t.banner&&2!=wx.cgiData.wxa_mall_status&&(t.hasFinished=!1);
break;

default:
p.eid=r,p.namespace="name_"+d.fakeid+"_"+a++,e.push(r),8==r?p.gift_info.page_id&&p.gift_info.pic_url&&p.gift_info.appid?t.data.module_infos.push(p):t.hasFinished=!1:(t.data.module_infos.push(p),
n["integrityTest_"+r](p)||(t.hasFinished=!1));
}
return t.hasFinished===!1?(i.find(".js_edit").click(),setTimeout(function(){
$("#js_editFormContent").find(".js_emptyTips").remove(),$("#js_editFormContent").prepend(s),
$("html, body").animate({
scrollTop:$("#js_editFormContent").offset().top-100
},300);
},100),!1):void 0;
}),0==e.length&&t.hasFinished?!1:(t.h5=i.stringify2({
id:e
}),t.data=i.stringify2(t.data),t);
}
function t(){
if($("#js_tmplWrapper").find(".js_shopModuleWrapper").length>10)return a.err("只能创建10个自定义模块"),
!1;
var t=$("#js_submit");
if(!t.attr("disabled")){
t.btn(!1);
var s=e();
if(s&&!s.hasFinished)return void t.btn(!0);
if(!s)return t.btn(!0),void a.err("此货架没有模块，不能保存");
var n,r,p=i.stringify2(s).https2http();
d.shelf_id?(n="mod_shelf",r={
shelf_info:p,
shelf_id:d.shelf_id
}):(n="add_shelf",r={
shelf_info:p
}),o.post({
url:"/merchant/shelf?action="+n,
data:r,
mask:!1
},function(e){
0==parseInt(e.base_resp.ret,10)?location.href=wx.url("/merchant/shelf?status=0&action=get_shelflist&t=shop/myshelf&offset=0&count=5"):(a.err("系统错误，请稍后重试"),
o.handleRet(e,{
id:64462,
key:95,
url:"/merchant/shelf?action="+n
}));
});
}
}
var s=['<div class="page_msg mini shelf_release_tips js_emptyTips">','<div class="inner">','<span class="msg_icon_wrp"><i class="icon18_msg warn"></i></span>','<div class="msg_content">',"<p>","该模块尚未编辑完成，完成后才可保存","</p>","</div>","</div>","</div>"].join("");
0==d.shelf_id?$("#js_submit").on("click",function(){
t();
}):new p({
container:"#js_submit",
content:"你确定要保存此次编辑吗，保存后原货架将会被覆盖",
type:"click",
reposition:!0,
position:{
left:-78,
top:3
},
onshow:function(){
$("#js_submit").attr("disabled")||this.show();
},
buttons:[{
text:"保存",
type:"btn_primary",
click:function(){
t();
}
},{
text:"取消",
type:"btn_default",
click:function(){
this.hide();
}
}]
});
}();
});