define("media/origin.js",["common/wx/top.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/popover.js","common/wx/pagebar.js","biz_common/moment.js","biz_web/ui/dropdown.js","common/wx/searchInput.js"],function(t){
"use strict";
function e(){
if(new c("#topTab",c.DATA.media).selected("media16"),$(".js_highlight_box").html(h("tpl_highlight_box",{
token:cgiData.token,
selected:1
})),cgiData.list){
var t=JSON.parse(cgiData.list.html(!1)).list;
if(t&&t.length){
for(var e=0;t[e];e++)t[e].creat_time=m.unix(t[e].creat_time).format("YYYY-MM-DD HH:mm");
cgiData.ori_biz&&cgiData.ori_user_info?s(t,cgiData.ori_user_info):cgiData.query?n(t,0):a(t,2);
}else(t=JSON.parse(cgiData.list.html(!1)).copyright_subuin_list)?t&&t.length?n(t,1):(i(),
$("#js_search_area").find(".jsDropdownItem[data-value=1]").trigger("click"),cgiData.query&&$("#js_search_empty").text("找不到相关公众号，请重新输入。").show()):($("#js_search_area").find(".jsDropdownItem[data-value=0]").trigger("click"),
i(),cgiData.query&&$("#js_search_empty").text("找不到相关文章，请重新输入。").show());
}
}
function i(){
new g({
id:"#js_search_area",
value:cgiData.key,
placeholder:"文章标题",
classify:!0,
dropsort:[{
name:"文章",
value:"0",
tips:"文章标题"
},{
name:"公众号",
value:"1",
tips:"搜索公众号"
}],
click:function(t){
t.length>0?window.location=wx.url(0==$("#js_search_area").find("#js_searchDrop").data("value")?"/cgi-bin/copyrightlib?begin=1&count=10&t=media/appmsg_list&action=ori_lib&query="+encodeURIComponent(t):"/cgi-bin/copyrightlib?begin=1&count=10&action=searchuin&query="+encodeURIComponent(t)):u.err("请输入搜索关键字");
}
}),new d({
container:"#js_artwrp",
label:"文章从新到旧",
data:[{
name:"文章从新到旧",
value:"0"
},{
name:"文章从旧到新",
value:"1"
}],
callback:function(){}
});
}
function a(t,e){
i(),o(t,e);
}
function n(t,e){
i(),o(t,e);
}
function s(t,e){
var i=$("#js_profile_card"),a=JSON.parse(cgiData.list.html(!1)).list[0].bizuin;
i.html(h("tpl_profile_card",{
list:JSON.parse(e.html(!1)),
biz_uin:a
})),o(t,0),$(".js_info_hd").text("该公众号的原创文章（%s篇）".sprintf(cgiData.total));
}
function o(t,e){
var i=$("#js_subscribe_list");
0==e?(i.html(h("tpl_list",{
list:t,
token:cgiData.token
})),$(".js_info_hd").text("找到%s篇原创文章，作者允许被转载".sprintf(cgiData.total)),$("#js_search_area").find(".jsDropdownItem[data-value=0]").trigger("click")):1==e?(i.html(h("tpl_user_list",{
list:t,
token:cgiData.token
})),$(".js_info_hd").text("为你找到%s个符合条件的公众号".sprintf(cgiData.total)),$("#js_search_area").find(".jsDropdownItem[data-value=1]").trigger("click"),
$(".js_subscribe_item").on("click",function(t){
$(t.target).hasClass("js_subscribe_btn")||(location.href=wx.url("/cgi-bin/copyrightlib?action=ori_lib_list&begin=1&count=10&lang=zh_CN&token="+cgiData.token+"&ori_biz="+$(this).data("biz_uin")));
})):2==e&&(i.html(h("tpl_list",{
list:t,
token:cgiData.token
})),$(".js_info_hd").text("我的订阅列表"),$("#js_search_area").find(".jsDropdownItem[data-value=0]").trigger("click")),
$("#js_search_area").find(".jsSearchInput").val(cgiData.key),cgiData.key&&$(".js_search_result_title").each(function(t,e){
if(!$(e).text().match(/<script>/g)){
var i=$(e).html().replace(new RegExp(cgiData.key,"g"),'<span class="highlight">'+cgiData.key+"</span>")+"";
$(e).html(i);
}
}),$(".js_search_result_digest").length&&$(".js_search_result_digest").each(function(t,e){
if($(e).text()){
var i=$(e).text().html(!1);
if($(e).text().match(/<script>/g)){
var a=i.replace(new RegExp("<script>","g"),"&lt;script&gt;");
$(e).html(a);
}else $(e).html(i);
var n=i.replace(new RegExp("<span>","g"),'<span class="highlight">');
$(e).html(n);
}
});
new b({
container:".js_pageNavigator",
perPage:10,
initShowPage:parseInt(cgiData.begin),
totalItemsNum:cgiData.total,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var e=t.currentPage;
return e!=cgiData.begin?location.href=location.href.replace(/([\?&])begin=\d*/,"$1begin="+e):u.err("输入的页码为当前页"),
!1;
}
});
$("#js_subscribe_list").on("mouseover",".js_app_name",function(){
var t=$(this),e=new p({
dom:t,
content:h("tpl_wait",{
list:null
}),
place:"bottom",
margin:"center",
hover:!0,
hideIfBlur:!0,
addCls:"app_profile_wrp"
}),i=t.attr("data-bizuin");
l.get("/cgi-bin/copyrightlib?&action=ori_bizinfo&ori_bizuin="+i,function(t){
e.$pop.find(".popover_inner").html(h("tpl_app_profile",{
list:JSON.parse(t.ori_user_info),
biz_uin:i
})),e.$pop.find(".js_subscribe_btn").on("click",function(t){
var e=$(this);
0==e.data("is_subed")?r(e,1):1==e.data("is_subed")&&r(e,0),t.stopPropagation();
}),e.$pop.find(".js_subscribe_btn").on("mouseover",function(){
var t=$(this);
return 1!=t.data("is_subed")?!1:void t.text("取消订阅").on("mouseleave",function(){
$(this).text("已订阅").unbind("mouseleave");
});
});
});
}),$(".js_reprint_btn").on("click",function(){
var t=$(this).attr("data-bizuin"),e=$(this).attr("data-msgid"),i=$(this).attr("data-idx"),a=$(this).data("auth_status");
if(0==a)_.show({
title:"提交授权申请",
msg:"提交授权申请|作者设置该篇文章为需要经过授权才可以转载。提交授权申请并获得作者授权后即可转载。转载时无法修改文章内容，且系统将会自动为文章注明转载来源。当作者删除了原文章后，转载的文章也会一并删除。",
mask:!0,
type:"info",
buttons:[{
text:"提交申请",
type:"primary",
click:function(){
l.get("/cgi-bin/copyrightlib?action=lib_reprint&ori_biz="+t+"&ori_mid="+e+"&ori_idx="+i+"&type=1&lang=zh_CN",function(t){
154010==t.base_resp.ret?(u.err("不能申请转载自己的文章"),this.hide()):t.base_resp&&0==t.base_resp.ret?0==t.base_resp.ret&&(location.href=wx.url("/cgi-bin/copyrightlib?action=reprint_article&begin=0&count=10&auth_status=0&token="+cgiData.token+"&lang=zh_CN")):(u.err("系统繁忙，请稍后再试"),
this.hide());
});
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});else{
if(1==a)return!1;
_.show({
title:"署名转载申明",
msg:"署名转载该篇文章|作者允许该篇文章被转载，通过该方式进行转载的文章默认为获得了作者授权，不会受到抄袭举报。转载时无法修改文章内容，且系统将会自动为文章注明转载来源。当作者删除了原文章后，转载的文章也会一并删除。",
mask:!0,
type:"info",
buttons:[{
text:"下一步",
click:function(){
location.href=wx.url("/cgi-bin/masssendpage?t=mass/send&lang=zh_CN&ori_biz="+t+"&ori_mid="+e+"&ori_idx="+i);
}
}]
});
}
});
}
function r(t,e){
var i={
copyrightuin:t.data("biz_uin")
};
0==e?(t.text("取消中").addClass("btn_disabled"),t.btn(!1),l.post({
url:"/cgi-bin/copyrightlib?action=delsubuin",
data:i,
success:function(e){
t.btn(!0),e.base_resp&&0==e.base_resp.ret?(t.text("订阅"),t.removeClass("btn_default btn_disabled").addClass("btn_primary"),
t.unbind("click"),t.click(function(){
r(t,1);
})):(u.err("系统繁忙，请稍后再试"),t.text("已订阅").on("mouseover",function(){
var t=$(this);
t.text("取消订阅").on("mouseleave",function(){
$(this).text("已订阅").unbind("mouseleave");
});
}),t.removeClass("btn_disabled"));
},
error:function(){
t.btn(!0),t.removeClass("btn_disabled").addClass("btn_default"),u.err("系统繁忙，请稍后再试");
}
})):1==e&&(t.text("订阅中"),t.btn(!1),l.post({
url:"/cgi-bin/copyrightlib?action=subuin",
data:i,
success:function(e){
t.btn(!0),-10002==e.base_resp.ret?(u.err("不能订阅自己"),t.text("订阅")):-10001==e.base_resp.ret?(u.err("最多只能订阅50个公众号"),
t.text("订阅")):e.base_resp&&0==e.base_resp.ret?0==e.base_resp.ret&&(t.text("已订阅"),
t.removeClass("btn_primary").addClass("btn_default"),t.unbind("click"),t.on("mouseover",function(){
var t=$(this);
t.text("取消订阅").on("mouseleave",function(){
$(this).text("已订阅").unbind("mouseleave");
});
}),t.click(function(){
$(this).unbind("mouseover mouseleave"),r(t,0);
})):(u.err("系统繁忙，请稍后再试"),t.text("订阅"));
},
error:function(){
t.btn(!0),u.err("系统繁忙，请稍后再试");
}
}));
}
var c=t("common/wx/top.js"),l=t("common/wx/Cgi.js"),u=t("common/wx/Tips.js"),_=t("common/wx/dialog.js"),p=t("common/wx/popover.js"),b=t("common/wx/pagebar.js"),m=t("biz_common/moment.js"),d=t("biz_web/ui/dropdown.js"),g=t("common/wx/searchInput.js"),u=t("common/wx/Tips.js"),h=template.render;
e(),$(".js_subscribe_btn").on("click",function(){
var t=$(this);
0==t.data("is_subed")?r(t,1):1==t.data("is_subed")&&(t.unbind("mouseover mouseleave"),
r(t,0));
}).on("mouseover",function(){
var t=$(this);
1==t.data("is_subed")&&t.text("取消订阅").on("mouseleave",function(){
$(this).text("已订阅").unbind("mouseleave");
});
});
});