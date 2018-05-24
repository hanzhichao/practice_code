define("common/wx/media/videoUtils.js",["common/wx/popup.js"],function(e){
"use strict";
function i(e){
e=parseInt(e,10);
var i="";
if(60>e)10>e&&(e="0"+e),i="00:"+e;else if(e>=60){
var t=Math.floor(e/60),o=(e-60*t)%60;
10>t&&(t="0"+t),10>o&&(o="0"+o),i=t+":"+o;
}
return i;
}
function t(e){
if(!e)return 0;
e=e.replace(/：/g,":");
for(var i=e.split(":"),t=0,o=1,r=i.length-1;r>=0;r--)t+=i[r]*o,o*=60;
return t;
}
function o(e){
var i;
i=$(r({
vid:e.vid,
editFrame:!1,
ratio:e.ratio||n.ratio
})).popup({
title:"预览视频",
className:e.className||"align_edge wx_video_dialog",
width:"960",
buttons:[{
text:"关闭",
click:function(){
this.remove(),"function"==typeof e.onClose&&e.onClose();
}
}],
onClose:function(){
i.popup("remove"),i=null,"function"==typeof e.onClose&&e.onClose();
}
});
}
function r(e){
if(e.editFrame)return['<iframe class="video_iframe wx_video_iframe',e.className?" "+e.className+'"':'"',e.attr?" "+e.attr+" ":"",' allowfullscreen frameborder=0 style="position:relative; z-index:1;" '," height=",e.height," width=",e.width,'  src="/cgi-bin/readtemplate?t=tmpl/video_tmpl&vid=',e.vid,'"'," ></iframe><br/>"].join("");
var i=e.width||500,t=Math.round(i/(e.ratio||n.ratio));
return['<iframe class="wx_video_iframe ',e.className?" "+e.className+'"':'"'," frameborder=0 "," height=",t," width=",i,'  src="https://v.qq.com/iframe/preview.html?vid='+e.vid+"&width="+i+"&height="+t+'&auto=1"'," ></iframe>"].join("");
}
function a(){
return 267;
}
e("common/wx/popup.js");
var n={
ratio:16/9
};
return{
changeTime:i,
durationStr2Sec:t,
showVideoPreviewDialog:o,
creatInsertStr:r,
getPreviewPhoneWidth:a
};
});