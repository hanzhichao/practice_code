define("scan/item_tag.js",["common/wx/Tips.js","common/wx/inputCounter.js","biz_common/jquery.validate.js"],function(e,t,n){
"use strict";
function a(e){
var t=m.find(".js_tag"),n=-1,a=t.length;
switch(t.each(function(e){
$(this).hasClass("selected")&&(n=e);
}),e.which){
case 38:
e.preventDefault();
var s=n-1;
0>s&&(s=a-1),t.removeClass("selected"),t.eq(s).addClass("selected");
break;

case 40:
e.preventDefault();
var s=n+1;
s>=a&&(s=0),t.removeClass("selected"),t.eq(s).addClass("selected");
break;

case 13:
e.preventDefault(),d.val(t.filter(".selected").text()),o();
}
}
function s(){
return""==d.val()?(v.html("请填写该商品对应的品牌名称").show(),!1):d.val().length>12?(v.html("品牌名称过长").show(),
!1):(v.hide(),!0);
}
function o(){
j.setData(function(e){
e.base_info.tag=d.val();
});
}
function i(){
h=$("#js_form_tag"),d=h.find('input[name="product_tag"]'),m=$("#js_div_history_tag"),
v=h.find(".js_frm_msg"),wx.cgiData.history_tag&&wx.cgiData.history_tag.history_tag&&(w=wx.cgiData.history_tag.history_tag);
}
function c(){
var e=j.getData().base_info.tag;
if(e&&d.val(e),w){
var t=g("tpl_history_tag",{
list:w
});
m.html(t).hide();
}
}
function r(){
new _(d,{
maxLength:12,
showCounter:!0
}),d.on("focus",function(){
v.hide(),m.show();
}),d.on("blur",function(){
0==m.hasClass("js_hover")&&(m.hide(),s());
}),d.on("keydown",a),d.on("keyup",function(e){
switch(e.which){
case 38:
case 40:
case 13:
e.preventDefault();
break;

default:
w.length||s(),o();
}
}),m.on("mouseenter",function(){
m.addClass("js_hover"),m.find(".js_tag").removeClass("selected");
}),m.on("mouseleave",function(){
m.removeClass("js_hover");
}),m.on("click",".js_tag",function(){
d.val($(this).text()).trigger("keyup"),m.hide(),o();
});
}
function l(){}
function u(e){
var t=!0;
return t=s(),0==t&&$("html, body").animate({
scrollTop:h.offset().top
},500),"function"==typeof e&&e.call(void 0,t),t;
}
function f(e){
return e&&e.model&&(j=e.model),p?!1:(p=!0,i(),c(),r(),void l());
}
var h,d,m,v,g=template.render,_=(e("common/wx/Tips.js"),e("common/wx/inputCounter.js")),j=(e("biz_common/jquery.validate.js"),
null),p=!1,w=[];
n.exports={
init:f,
check:u,
triggerEditMode:l
};
});