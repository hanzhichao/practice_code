define("common/wx/qrcode_download.js",["tpl/qrcode_download.html.js","common/wx/popup.js"],function(o){
"use strict";
var t=o("tpl/qrcode_download.html.js");
o("common/wx/popup.js"),$.fn.qrcode_download=function(o){
var n={};
o=$.extend(!0,{},n,o),$(this).each(function(){
var n=$(this),e=n.attr("qrcode_link")||o.qrcode_link,c=template.compile(t)({
pixSet:[8,12,15,30,50],
dist:[.5,.8,1,1.5,2.5],
qrcode:e
});
n.on("click",function(){
$(c).popup({
title:o.title||"更多尺寸",
width:960,
className:"qrcode_download",
buttons:[{
text:"关闭",
click:function(){
this.hide();
},
type:"primary"
}],
onHide:function(){
this.remove();
}
});
});
});
};
});