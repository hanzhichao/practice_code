define("common/wx/messenger.method.js",["common/wx/messenger.js","common/wx/Tips.js"],function(o,e){
"use strict";
function i(o){
var e=27826;
if(-1!=o.indexOf("wifi.weixin.qq.com")){
var i=1,n=new Image;
n.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+e+"_"+i+"_1";
}else if(-1!=o.indexOf("city.weixin.qq.com")){
var i=3,n=new Image;
n.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+e+"_"+i+"_1";
}else if(-1!=o.indexOf("hw.weixin.qq.com")){
var i=2,n=new Image;
n.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+e+"_"+i+"_1";
}
}
o("common/wx/messenger.js");
var n=o("common/wx/Tips.js");
(""==wx.cgiData.appid||""==wx.cgiData.pluginToken)&&wx.jslog({
src:"common/iframe"
},{
message:"no appid or pluginToken"
},5);
var t=function(o){
var e=$(o),t=!1;
Iframe.on("setHeight",function(o){
var e=$("#mpIFrame");
e.css("height",parseInt(o.height,10)+"px"),t||(i(e.attr("src")),t=!0);
}),Iframe.on("setWH",function(o){
var n={
height:"",
width:""
};
for(var s in n)"undefined"!=typeof o[s]?n[s]=parseInt(o[s],10)+"px":delete n[s];
e.css(n),t||(i(e.attr("src")),t=!0);
}),Iframe.on("showMask",function(){
var o=$("#maskShadow"),e=$("#mpIFrame"),i=$(".wkd_content");
o.length<1&&(o=$('<div id="maskShadow"></div>'),o.attr("style","background:#000;filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity: 0.5;width:100%;height:100%;left:0;position:fixed;top:0;width:100%;z-index:2"),
$("body").append(o)),i.length?(i.css("position","relative"),i.css("z-index",3)):e.css("position","relative").css("z-index",3),
o.show(),$(".js_wifi_nav_fix").hide(),$("html").css({
paddingRight:"17px",
overflow:"hidden"
});
}),Iframe.on("hideMask",function(){
var o=$("#maskShadow"),e=$("#mpIFrame");
o.length>=1&&(o.hide(),$(".js_wifi_nav_fix").show(),e.css("position","static")),
$("html").attr("style","");
}),Iframe.on("expire",function(){
$.get("/cgi-bin/modifycontacts?t=ajax-meeting-verify&token=0",function(){
location.reload(!0);
});
}),Iframe.on("reload",function(){
location.reload();
}),Iframe.on("setScrollTop",function(o){
$(document).scrollTop(o.scrollTop);
}),Iframe.on("getScrollTop",function(){
Iframe.post({
type:"scrollTop",
scrollTop:$(window).scrollTop()
});
}),Iframe.on("setScrollTop",function(o){
$(document).scrollTop(o.scrollTop);
}),Iframe.on("getSize",function(){
Iframe.post({
type:"size",
scrollTop:$(window).scrollTop(),
windowHeight:$(window).height(),
windowWidth:$(window).width(),
offsetTop:$("#mpIFrame").offset().top,
offsetLeft:$("#mpIFrame").offset().left
});
}),Iframe.on("showTips",function(o){
var e=o.tipsType||"suc";
"function"==typeof n[e]&&n[e](o.msg);
});
};
$("#mpIFrame").length&&t("#mpIFrame"),e.on=Iframe.on,e.post=Iframe.post,e.communicateWith=Iframe.init,
e.init=t;
});