define("scan/item_color.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_common/utils/monitor.js","biz_web/ui/dropdown.js"],function(e,o,n){
"use strict";
function t(e){
return!/^[0-9a-fA-F]+$/.test(e)||3!=e.length&&6!=e.length;
}
function r(e,o){
j.get({
url:"/merchant/scanproductinfo?action=defualt_color",
data:{
img_url:e
}
},function(e){
e&&0==e.base_resp.ret?k.setSum(29085,27,1).send():k.setSum(29085,28,1).send(),o&&o(e);
});
}
function a(){
C.getData().base_info.thumb_url&&r(C.getData().base_info.thumb_url,function(e){
z=e&&0==e.base_resp.ret?e.color:"",s();
});
}
function l(){
C.setTmpData(function(e){
e.header_mask="default"==B?z:D?"#FF"+D:"",e.header_mask||(e.header_mask=I);
}),C.setData(function(e){
e.base_info.header_mask="default"==B?"":"#FF"+D;
});
}
function s(){
var e;
if(e="default"==B?z:D,e||(e=I),C.isIE()){
var o=c(e);
$("#js_colorpicker .jsBtLabel").addClass("selected_color").css({
"background-color":o.color
});
}else{
var n=i(e);
$("#js_colorpicker .jsBtLabel").addClass("selected_color").css({
"background-color":n.color
});
}
l();
}
function c(e){
var o=e.replace("#",""),n={
color:"#"+o.slice(-6),
red:o.slice(-6).substr(0,2),
green:o.slice(-4).substr(0,2),
blue:o.slice(-2).substr(0,2),
alpha:""
};
return n.alpha="FF",n;
}
function i(e){
var o=c(e),n={
color:"",
red:parseInt(o.red,16),
green:parseInt(o.green,16),
blue:parseInt(o.blue,16),
alpha:1
};
return n.color="rgba("+n.red+", "+n.green+", "+n.blue+", "+n.alpha+")",n;
}
function u(){
z="",D=C.getData().base_info.header_mask||"",D&&(D=c(D).color.replace("#","")),B=""==D?"default":"custom",
p=$("#js_form_color"),h=p.find(".js_frm_msg"),g=p.find(".js_div_color"),v=p.find('input[name="color"]');
}
function d(){
y=new w({
container:"#js_colorpicker",
label:"default"==B?"默认取色":"自定义色值",
data:[{
name:"默认取色",
value:"default"
},{
name:"自定义色值",
value:"custom"
}],
callback:function(e){
B=e,"default"==B?g.hide():g.show(),s();
}
}),"default"==B?g.hide():g.show();
var e=c(D);
v.val(e.color.replace("#","")),s();
}
function f(){
v.on("keyup",function(){
var e=$(this).val();
t(e)?h.show():(h.hide(),D=e,D=D,s());
}).on("blur",function(){
var e=$(this).val();
if(t(e))h.show();else{
if(3==e.length){
var o=e.split("");
D="";
for(var n=0;n<o.length;n++)D+=o[n]+o[n];
v.val(D);
}
D=D,s();
}
});
}
function m(){}
function _(e){
var o=!0;
return"function"==typeof e&&e.call(void 0,o),o;
}
function b(e){
return e&&(C=e.model,F=e.items),x?!1:(x=!0,u(),d(),void f());
}
var p,h,g,v,j=(template.render,e("common/wx/Cgi.js")),k=(e("common/wx/Tips.js"),
e("biz_common/utils/monitor.js")),w=e("biz_web/ui/dropdown.js"),C=null,F=[],x=!1,y=null,B="default",D="",z="",I="#E6979797";
n.exports={
init:b,
check:_,
triggerEditMode:m,
loadColorByURL:r,
loadColorByThumb:a,
spliteColorAlpha:c,
getRGBA:i,
emptyColor:I
};
});