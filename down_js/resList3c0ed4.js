define("resource/resList.js",["common/wx/Tips.js"],function(e){
"use strict";
function i(){
l.target=wx.getUrl("target")||"";
var e=window.cgiData;
l.tab=e.tab,l.curId=e.id||"mp1445241432",l.anchor=e.anchor,l.list=e.list&&e.list.list&&e.list.list.length>0?e.list.list:[];
}
function n(){
$("#resMenu").html(template.render("menu_tpl",{
data:l.list,
curid:l.curId
}));
}
function t(){
$("#iframe").on("load",s),$("#resMenu").on("click",'dt[data-leaf="1"]',function(){
var e=$(this),i=e.next();
e.hasClass("closed")?(e.removeClass("closed"),i.is("dd")&&i.show()):(e.addClass("closed"),
i.is("dd")&&i.hide());
}),$("#resMenu").on("click","a.no_sub[data-leaf=1]",function(){
var e=$(this),i=e.data("id");
if(l.curId!=i){
$("#index").hide(),l.curId=i,l.curSelected&&l.curSelected.removeClass&&l.curSelected.removeClass("selected"),
l.curSelected=e,e.addClass("selected");
var n=["/wiki?action=doc&id=",l.curId,"&t=",Math.random()];
l.highline?(n.push("&highline=",encodeURIComponent(l.highline)),l.highline="",$("#clear_search_css").show()):(window.__resFunc.scrollTop(),
$("#clear_search_css").hide());
var t="/wiki?t=resource/res_main&id="+i;
l.anchor&&(t+="&anchor="+l.anchor),window.history&&history.replaceState?(r(n.join("")),
history.replaceState(history.state,document.title,t)):location.href=t;
}
}),$("#search_text").on("keyup",function(e){
var i=$(this),n=i.val().trim();
n?$("#del_btn").show():$("#del_btn").hide(),n.length>30&&i.val(n.substr(0,30)),"13"==e.keyCode&&o();
}),$("#del_btn").on("click",function(){
$("#search_text").val(""),$(this).hide(),-1!=$("#iframe").attr("src").indexOf("readtemplate")&&window.__resFunc.goback();
}),$("#search_btn").on("click",function(){
o();
}),$("#close_highline").on("click",function(){
var e=$("#iframe")[0].contentWindow;
e&&e.__subFunc&&(e.__subFunc.closeHighline(),$("#close_highline").hide(),$("#open_highline").show());
}),$("#open_highline").on("click",function(){
var e=$("#iframe")[0].contentWindow,i=$("body").scrollTop();
e&&e.__subFunc&&(e.__subFunc.openHighline(),$("#open_highline").hide(),$("#close_highline").show(),
setTimeout(function(){
window.__resFunc.scrollHeight(i,!1);
},0));
}),window.addEventListener("popstate",function(e){
console.log(e);
});
}
function o(){
var e=$("#search_text").val().trim();
e&&r("/cgi-bin/readtemplate?t=resource/res_search_tmpl&search_text="+encodeURIComponent(e)+"&t="+Math.random());
}
function c(){
l.curId?(window.cgiData.highline&&(l.highline=window.cgiData.highline),setTimeout(function(){
var e=l.curId;
l.curId="",l.curSelected=$("#resMenu").find("a[data-id='"+e+"']").trigger("click");
var i=l.curSelected.parents("dd").prev();
i.is("dt")&&i.trigger("click");
},0)):$("#iframe").show();
}
function a(e){
$("#resMenu").find("a.no_sub.selected").removeClass("selected"),$("#resMenu").find("a[data-id='"+e+"']").addClass("selected");
}
function r(e){
$("#close_highline").hide(),$("#open_highline").hide(),l.hadHandleLoaded=!1,$("#iframe").show().height(0),
$("#iframe").attr("src",e);
}
function s(){
var e=$("#iframe"),i=e.contents();
if(e.height(Math.max(i.height(),$("#col_side").height())+100),l.curId&&l.anchor){
var n=i.find('a[name="'+l.anchor+'"]').offset();
if(n&&n.top){
var t=e.offset().top,o=n.top;
window.__resFunc.scrollHeight(t+o);
}
}
l.hadHandleLoaded=!0,d();
var c=e.attr("src")&&e.attr("src").match(/&id=([^&]+)/)[1];
l.curId=c?c:"",a(l.curId),l.anchor="";
}
function d(){
for(var e;e=l.handleIframeLoadedQueue.shift();)"function"==typeof e&&e();
}
var l=(e("common/wx/Tips.js"),{
handleIframeLoadedQueue:[]
});
i(),n(),t(),c(),window.__resFunc={
goback:function(){
l.curId&&r("/wiki?action=doc&id="+l.curId+"&t="+Math.random());
},
scrollTop:function(){
this.scrollHeight(0,!1);
},
scrollHeight:function(e,i,n){
function t(e){
setTimeout(function(){
window.scrollTo(0,e);
},n||100);
}
e=e||0,i&&(e+=$("#iframe").offset().top),l.hadHandleLoaded?t(e):l.handleIframeLoadedQueue.push(function(){
t(e);
});
},
showCloseHighlineBtn:function(){
$("#close_highline").show();
},
setIframeH:function(){
s();
}
};
});