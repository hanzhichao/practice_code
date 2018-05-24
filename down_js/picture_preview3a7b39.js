define("media/picture_preview.js",[],function(){
"use strict";
function i(){
n(),e(),t(),o(),f(),u(),l();
}
function n(){
$.each(A,function(i,n){
E[""+n.file_id]=i;
});
}
function e(){
z.click(w),O.click(g);
}
function t(){
$(document).on("keydown",function(i){
i.keyCode===L&&r(),G&&!H&&(i.keyCode===J&&(i.preventDefault(),w()),i.keyCode===K&&(i.preventDefault(),
g()));
});
}
function o(){
$(document).on("click","a.media_img",null,function(i){
i.preventDefault();
var n=$(i.currentTarget).attr("href");
F=n.match(/fileId=\d+/)[0].replace("fileId=","");
var e=E[F];
v(e),c(n);
});
}
function c(i){
a(i),d();
}
function f(){
q.on("click",function(i){
$(i.target).hasClass("picture_preview_mask")&&r();
});
}
function a(i){
i&&(D.attr("src")!=i?(D.attr("src",i),s(),H=!0):x.show());
}
function d(){
G=!0,q.fadeIn(T);
}
function r(){
G=!1,H=!1,b.hide(),q.fadeOut(T,function(){
x.hide();
});
}
function u(){
D.on("load",function(){
H=!1,h();
for(var i=$(window),n=80,e=i.width()-n,t=i.height()-n,o=D[0].width,c=D[0].height,f=1,a=D.attr("src");o*f>=e||c*f>=t;)f-=.1;
b.width(o*f),b.height(c*f),b.fadeIn(T),x.attr("src",a),x.show(),y.attr("href","/cgi-bin/downloadfile?token="+B+"&fileid="+F),
I.attr("href",a);
});
}
function l(){
console.log("auto resize");
}
function s(){
j.show();
}
function h(){
j.hide();
}
function w(){
if(!H){
var i=E[F];
if(0!==i){
i--,v(i),F=A[i].file_id;
var n=C(F);
a(n);
}
}
}
function g(){
if(!H){
var i=E[F];
if(i!==A.length-1){
i++,v(i),F=A[i].file_id;
var n=C(F);
a(n);
}
}
}
function v(i){
0===i?m():k(),i===A.length-1?p():_();
}
function m(){
z.addClass("disable");
}
function p(){
O.addClass("disable");
}
function k(){
z.removeClass("disable");
}
function _(){
O.removeClass("disable");
}
function C(i){
return"/cgi-bin/getimgdata?token="+B+"&msgid=&mode=large&source=file&fileId="+i+"&ow=-1";
}
var q=$("div.picture_preview_mask:eq(0)"),b=q.find("div.picture_preview_container:eq(0)"),I=b.find("a.check_origin:eq(0)"),y=b.find("a.download:eq(0)"),D=$(new Image),x=b.find("img.preview"),j=q.find("img.loading:eq(0)"),z=b.find(".switch-up:eq(0)"),O=b.find(".switch-down:eq(0)"),T=300,A=wx.cgiData.file_item,B=wx.data.t,E={},F=null,G=!1,H=!1,J=37,K=39,L=27;
i();
});