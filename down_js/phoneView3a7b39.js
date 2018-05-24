define("common/wx/phoneView.js",["tpl/media/preview/layout.html.js","widget/wx_phone_preview/wx_phone_preview.css"],function(t,e){
"use strict";
function i(t){
var e=t.html.split("<!--pulgin-->")[0],i=t.html.split("<!--pulgin-->")[1],p=template.compile(n)({
content:e,
plugin:i
});
this.$dom=$(template.compile(p)(t.data)).appendTo("body"),o(),t.todo&&"function"==typeof t.todo&&t.todo.apply(this,[t.data,t.html]);
var l=this;
this.$dom.find(".jsPhoneViewClose").click(function(){
l.remove();
});
}
function o(){
$("img").each(function(){
$(this).data("src")&&$(this).attr("src",$(this).data("src"));
});
}
{
var n=t("tpl/media/preview/layout.html.js");
t("widget/wx_phone_preview/wx_phone_preview.css");
}
return i.prototype.hide=function(){
this.$dom.hide();
},i.prototype.remove=function(){
this.$dom.remove();
},i.prototype.render=function(t,e){
var i=t.split("<!--pulgin-->")[0],o=t.split("<!--pulgin-->")[1];
this.$dom.find(".jsPhoneViewMain").html(template.compile(i)(e)),this.$dom.find(".jsPhoneViewMain").on("click","a.weapp_text_link,a.weapp_image_link",function(){
return alert("将在微信端打开小程序"),!1;
}),o&&this.$dom.find(".jsPhoneViewPlugin").html(template.compile(o)(e)).show();
},e.module=i;
});