define("cardticket/shelf_management.js",["cardticket/tmpl_management.js","common/wx/Tips.js","biz_web/lib/json.js","common/wx/Cgi.js","common/wx/tooltips.js","common/wx/dialog.js","cardticket/shelf/shelf_helper.js","cardticket/topmenu.js","biz_common/utils/load3rdimg.js","cardticket/common_init.js"],function(e){
"use strict";
var t=e("cardticket/tmpl_management.js"),a=e("common/wx/Tips.js"),s=e("biz_web/lib/json.js"),n=e("common/wx/Cgi.js"),i=e("common/wx/tooltips.js"),o=(e("common/wx/dialog.js"),
e("cardticket/shelf/shelf_helper.js")),r=wx.cgiData,p="store",d=0,l={};
!function(){
e("cardticket/topmenu.js").selected("cardshelf");
}();
var c=e("biz_common/utils/load3rdimg.js");
!function(){
function e(e){
var t=e.position().top+e.height()/2-349;
0>t?(i.css({
top:30+t+"px"
}),t=0):i.css({
top:"30px"
}),a.find(".js_pos").css("marginTop",t+"px"),a.show();
}
var a=$("#js_editForm"),i=a.find(".js_arrow");
if(a.find(".js_pos").on("click",function(e){
e.stopPropagation();
}),0==r.shelf_id){
for(var m={
1:[],
2:[5],
3:[3,3,3],
4:[2,3,1]
}[r.shelf],_=0;_<m.length;_++){
var f="name_"+r.fakeid+"_"+d++;
t.init_tmpl(m[_],f,l);
}
$("#js_submenu_slide").append("新建货架");
}else $("#js_submenu_slide").append("编辑货架"),n.get({
url:"/merchant/cardshelf?action=render&shelf_id="+r.shelf_id,
mask:!1
},function(e){
var t,a=s.parse(e.shelf_info.data.http2https()).module_infos,n=a.length;
if($("#js_tmplWrapper").append(e.shelf_info.template.http2https()),$("#js_tmplWrapper").find(".js_shopModuleWrapper").each(function(){
var e=$(this),t=e.data("moduletype");
t={
1:"11",
2:"12",
3:"13",
4:"11"
}[t]||t,e.attr("data-moduletype",t);
}),$("#js_tmplWrapper").find("a").attr("href","javascript:;"),e.shelf_info.name){
var i=$(".js_shopModuleWrapper[name=property]");
i.find(".js_title").text(e.shelf_info.name.html(!1)),i.data(p,{
name:e.shelf_info.name.html(!1)
}),r.default_shelf_id==r.shelf_id&&i.find(".js_default_shelf_title").show();
}
$("#js_banner").length&&($("#js_banner").attr("src",e.shelf_info.banner.http2https()),
$(".js_shopModuleWrapper[name=banner]").data(p,{
banner:e.shelf_info.banner
}));
for(var m=0,_=n;_>m;m++)if(!a[m].merged){
t=a[m].namespace;
var f=o.convertToType(a[m].eid);
l[t]=$("#tmpl"+f).html().replace(/<name>/gi,t);
var h=o.convertDataToTmpl[f],u=h?h(a[m]):a[m];
delete a[m].eid,delete a[m].namespace,$(".js_shopModuleWrapper").filter("[name="+t+"]").data(p,u),
d=Math.max(d,1*t.split("_")[2]);
}
d++,o.getCardDetail(function(e){
$(".js_shopModuleWrapper").each(function(){
var t=$(this),a=+t.data("moduletype");
if([2,3,12,13].indexOf(a)>-1){
var s=t.data(p),n=2==a||12==a?"2":"3",i=o.EnhanceData[n];
if(s&&i){
var r=i(s,e);
t.data(p,r);
}
}
});
}),$(".js_norefer_img").each(function(){
var e=this.getAttribute("data-src")||"";
c({
img:this,
imgurl:e.replace(/^\s|\s$/,"")
});
});
});
$("#js_newTmpl").on("click",function(a){
a.stopPropagation();
var s=$(this),n="name_"+r.fakeid+"_"+d++;
t.new_tmpl(n,l),e(s);
}),$("#js_tmplWrapper, #js_shopWraperProperty").delegate(".js_edit","click",function(s){
s.stopPropagation();
var n=$(this),i=n.closest(".js_shopModuleWrapper"),o=i.data("moduletype"),r={
1:"11",
2:"12",
3:"13",
4:"11"
}[""+o]||o,p=i.attr("name");
t["tmpl_"+r](i,p,l),a.data("connect_dom",i),e(i);
}),$("#js_tmplWrapper").delegate(".js_delete","click",function(t){
t.stopPropagation();
var s=$(this),n=s.closest(".js_shopModuleWrapper"),i=n.attr("name"),o=a.data("connect_dom"),r=o?o.attr("name"):"";
delete l[i],n.remove(),i==r?(a.hide(),a.data("connect_dom",null)):o&&e(o);
});
}(),function(){
function e(){
var e=[],a={
hasFinished:!0
},n=0;
return a.data={},a.data.module_infos=[],$(".js_shopModuleWrapper").each(function(){
var s=$(this),i=s.attr("name"),d=s.data("moduletype"),c=s.data(p)||{};
switch(d={
1:11,
2:12,
3:13,
4:11
}[d]||d,i){
case"property":
a.name=c.name||"新建货架";
break;

case"banner":
a.banner=c.banner||"/mpres/htmledition/images/shop/bg_goods_img_default.png","/mpres/htmledition/images/shop/bg_goods_img_default.png"==a.banner&&(a.hasFinished=!1);
break;

default:
var m={
11:1,
12:2,
13:3
}[d]||d;
if(1==m){
for(var _=c.group_infos.groups.length,f={
group_infos:{
groups:[],
group_all:!1
}
},h=0;_>h;h++){
var u=c.group_infos.groups[h].group_name,g=c.group_infos.groups[h].group_id,j=g.split("-");
f.group_infos.groups.push({
group_id:j[1],
card_cate:j[0],
group_name:u
});
}
f.group_infos.group_all=c.group_infos.group_all?1:0,e.push(1),f.eid=1,f.namespace="name_"+r.fakeid+"_"+n++,
a.data.module_infos.push(f);
}else{
var v=o.convertTmplToData[m];
if(v){
var b=v(c);
b.eid=m,b.namespace="name_"+r.fakeid+"_"+n++,e.push(m),a.data.module_infos.push(b);
}
}
t["integrityTest_"+d](c)||(a.hasFinished=!1);
}
return a.hasFinished===!1?(s.find(".js_edit").click(),setTimeout(function(){
$("#js_editFormContent").find(".js_emptyTips").remove(),$("#js_editFormContent").prepend(l),
$("html, body").animate({
scrollTop:$("#js_editFormContent").offset().top-100
},300);
},100),!1):void 0;
}),0==e.length&&a.hasFinished?!1:(a.h5=s.stringify2({
id:e
}),a.data=s.stringify2(a.data),a);
}
function d(){
var t=$("#js_submit");
if(!t.attr("disabled")){
t.btn(!1);
var i=e();
if(i&&!i.hasFinished)return void t.btn(!0);
if(!i)return t.btn(!0),void a.err("此货架没有模块，不能保存");
var o,p,d=s.stringify2(i).https2http();
r.shelf_id?(o="mod_shelf",p={
shelf_info:d,
shelf_id:r.shelf_id
}):(o="add_shelf",p={
shelf_info:d
}),n.post({
url:"/merchant/cardshelf?action="+o,
data:p,
mask:!1
},function(e){
0==parseInt(e.base_resp.ret,10)?location.href=wx.url("/merchant/cardshelf?action=get_shelflist&t=cardticket/myshelf&offset=0&count=5"):n.handleRet(e,{
id:64463,
key:44,
url:"/merchant/cardshelf?action="+o
});
});
}
}
var l=['<div class="page_msg mini shelf_release_tips js_emptyTips">','<div class="inner">','<span class="msg_icon_wrp"><i class="icon18_msg warn"></i></span>','<div class="msg_content">',"<p>","该模块尚未编辑完成，完成后才可保存","</p>","</div>","</div>","</div>"].join("");
0==r.shelf_id?$("#js_submit").on("click",function(){
d();
}):new i({
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
d();
}
},{
text:"取消",
type:"btn_default",
click:function(){
this.hide();
}
}]
});
}(),e("cardticket/common_init.js");
});