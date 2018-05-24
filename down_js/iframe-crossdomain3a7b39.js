define("advanced/iframe-crossdomain.js",[],function(){
"use strict";
function e(){
window.frames.mpIFrame.keepPopUpFix&&window.frames.mpIFrame.keepPopUpFix();
}
if("undefined"==typeof WXM&&(WXM={}),document.domain="qq.com",jQuery.uaMatch=function(e){
e=e.toLowerCase();
var o=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];
return{
browser:o[1]||"",
version:o[2]||"0"
};
},!jQuery.browser){
var o=jQuery.uaMatch(navigator.userAgent),s={};
o.browser&&(s[o.browser]=!0,s.version=o.version),s.chrome?s.webkit=!0:s.webkit&&(s.safari=!0),
jQuery.browser=s;
}
var s=$.browser;
WXM.setIFrameHeight=function(e){
var o=$("#mpIFrame");
o.css("height",parseInt(e,10)+"px");
},WXM.showMask=function(){
var e=$("#maskShadow"),o=($("#mpIFrame"),$(".wkd_content"));
e.length<1&&(e=$('<div id="maskShadow" class="mask"></div>').appendTo("body"),e.css({
opacity:.5,
"z-index":2
})),o.css("position","relative"),o.css("z-index",3),e.show(),s.msie&&$("html").css({
paddingRight:"17px",
overflow:"hidden"
});
},WXM.hideMask=function(){
var e=$("#maskShadow"),o=$("#mpIFrame");
e.length>=1&&(e.hide(),o.css("position","static"),s.msie&&$("html").attr("style",""));
},window.frames.mpIFrame&&(document.addEventListener?(document.addEventListener("mousewheel",e,!1),
document.addEventListener("DomMouseScroll",e,!1),document.addEventListener("scroll",e,!1)):(document.onmousewheel=e,
document.onscroll=e));
});