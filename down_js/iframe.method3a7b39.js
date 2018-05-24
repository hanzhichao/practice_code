define("common/wx/iframe.method.js",["common/wx/iframe.js"],function(o,t){
"use strict";
function e(o){
var t=27826;
if(-1!=o.indexOf("mta.qq.com")){
var e=2,i=new Image;
i.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+t+"_"+e+"_1";
}
}
o("common/wx/iframe.js");
var i=!1;
(""==wx.cgiData.appid||""==wx.cgiData.pluginToken)&&wx.jslog({
src:"common/iframe"
},{
message:"no appid or pluginToken"
},5);
var n=document.getElementById("mpIFrame");
n&&Iframe.communicateWith(n.contentWindow),Iframe.on("setHeight",function(o){
var t=$("#mpIFrame");
t.css("height",parseInt(o.height,10)+"px"),i||(e(t.attr("src")),i=!0);
}),Iframe.on("showMask",function(){
var o=$("#maskShadow"),t=$("#mpIFrame"),e=$(".wkd_content");
o.length<1&&(o=$('<div id="maskShadow"></div>'),o.attr("style","background:#000;filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity: 0.5;width:100%;height:100%;left:0;position:fixed;top:0;width:100%;z-index:2"),
$("body").append(o)),e.length?(e.css("position","relative"),e.css("z-index",3)):t.css("position","relative"),
o.show(),$("html").css({
paddingRight:"17px",
overflow:"hidden"
});
}),Iframe.on("hideMask",function(){
var o=$("#maskShadow"),t=$("#mpIFrame");
o.length>=1&&(o.hide(),t.css("position","static")),$("html").attr("style","");
}),Iframe.on("expire",function(){
$.get("/cgi-bin/modifycontacts?t=ajax-meeting-verify&token=0",function(){
location.reload(!0);
});
}),Iframe.on("reload",function(){
location.reload();
}),Iframe.on("getScrollTop",function(){
Iframe.post({
type:"scrollTop",
scrollTop:$(window).scrollTop()
});
}),Iframe.on("getSize",function(){
Iframe.post({
type:"size",
scrollTop:$(window).scrollTop(),
windowHeight:$(window).height(),
windowWidth:$(window).width(),
offsetTop:$("#mpIFrame").offset().top,
offsetLeft:$("#mpIFrame").offset().left
});
}),t.on=Iframe.on,t.post=Iframe.post,t.communicateWith=Iframe.communicateWith;
});