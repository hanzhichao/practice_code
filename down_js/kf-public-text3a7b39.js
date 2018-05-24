define("services/kf-public-text.js",["common/wx/Cgi.js","common/wx/top.js"],function(t){
"use strict";
function e(){
$("#js_addNewText").click(w("create")),$(document).on("click",".js_addNewText",null,w("create")),
$(document).on("click",".js_edit",null,w("edit")),$(".js_cancelEditing").click(u),
$("#js_saving").click(s),$("#js_textarea").keyup(T),$("#js_popover").mouseover(z).mouseout(q()),
$("#js_cancelDeleting").click(q(1)),$("#js_deleteIt").click(E),$(document).on("click",".js_delete",null,z).on("mouseout",".js_delete",null,q()),
n(),d(l),y(),I();
}
function n(){
new b("#js_tabs",b.DATA.kf).selected(2);
}
function s(){
function t(t){
l(t),$("#js_textarea").val(""),u();
}
var e=o($("#js_textarea").val());
if(i(e))return T();
if("create"===x("editorMode"))v(e,function(n){
var s=x("texts");
s.push({
content:e,
seq:n.seq
}),t(s);
});else{
var n=x("currentIndex"),s=x("texts");
s[n].content=e,p(s[n],function(){
t(s);
});
}
}
function i(t){
return t.length>k||t.length<=0;
}
function o(t){
return t?t.replace(/(^\s+)|(\s+$)/g,""):"";
}
function c(t){
$("#js_wordCount").text(t);
}
function r(t){
$("#js_textError").text(t).show();
}
function a(){
$("#js_textError").text("").hide();
}
function u(){
$("#js_editor").hide(),$("#js_textarea").val(""),T(),a();
}
function l(t){
var e=template.compile($("#js_textTemplate").html()),n=e({
texts:t
});
$("#js_textsBody").html(n);
}
function d(t){
f("texts",cgiTexts),t(x("texts"));
}
function f(t,e){
h[t]=e;
}
function x(t){
return h[t];
}
function _(t){
$("#js_popover").css("top",78+40*t+"px");
}
function j(t,e){
N||(N=!0,D("#js_deleteIt",N),m.post({
url:"/misc/kf?action=bizdelfastreply",
data:{
seq:t
},
success:function(t){
return 0!==t.base_resp.ret?void m.handleRet(t,{
id:64462,
key:16,
url:"/misc/kf?action=bizdelfastreply"
}):void e(t);
},
complete:function(){
N=!1,D("#js_deleteIt",N),I();
}
}));
}
function p(t,e){
R||(R=!0,D("#js_saving",R),m.post({
url:"/misc/kf?action=bizsetfastreply",
data:{
seq:t.seq,
content:t.content
},
success:function(t){
return 0!==t.base_resp.ret?void m.handleRet(t,{
id:64462,
key:17,
url:"/misc/kf?action=bizsetfastreply"
}):void e(t);
},
complete:function(){
R=!1,D("#js_saving",R),I();
}
}));
}
function v(t,e){
A||(A=!0,D("#js_saving",A),m.post({
url:"/misc/kf?action=bizaddfastreply",
data:{
msgtype:1,
content:t
},
success:function(t){
return 0!==t.base_resp.ret?void m.handleRet(t,{
id:64462,
key:18,
url:"/misc/kf?action=bizaddfastreply"
}):void e(t);
},
complete:function(){
A=!1,D("#js_saving",A),I();
}
}));
}
var m=t("common/wx/Cgi.js"),b=t("common/wx/top.js"),h={
texts:[],
showEditor:!1,
currentIndex:null
},g=20,k=100,w=function(t){
return function(){
if("create"!==t||!M(x("texts"),g)){
if("edit"===t){
var e=1*$(this).attr("data-index");
f("currentIndex",e);
var n=x("texts")[e].content;
$("#js_textarea").val(n),T();
}
f("editorMode",t),$("#js_saving span").text("create"===t?"添加":"保存"),$("#js_editor").show();
}
};
},y=function(){
var t=g-x("texts").length;
t=0>=t?0:t,$("#js_bubble").show().find("#js_bubble_count").text(t);
},I=function(){
function t(t){
$("#js_addNewText")[t]("btn_disabled");
}
y(),t(M(x("texts"),g)?"addClass":"removeClass");
},T=function(){
var t=$("#js_textarea").val().length;
c(t),C(t)?r("文字超过%s字".sprintf(k)):a(),0>=t&&r("请输入文字素材");
},C=function(t){
return t>k;
},q=function(t){
return function(){
f("timer",setTimeout(function(){
$("#js_popover").hide();
},t||300));
};
},z=function(){
clearTimeout(x("timer"));
var t=$(this).attr("data-index")||x("currentIndex");
f("currentIndex",t),_(1*t),$("#js_popover").show();
},E=function(){
var t=x("texts"),e=x("currentIndex"),n=t[e];
t.splice(e,1),j(n.seq,function(){
f("texts",t),l(t),q(h,1)(),I();
});
},N=!1,R=!1,A=!1,D=function(t,e){
e?$(t).addClass("btn_loading"):$(t).removeClass("btn_loading");
},M=function(t,e){
return t.length>=e;
};
e();
});