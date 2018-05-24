define("register/banklist.js",["biz_web/ui/checkbox.js","common/wx/popup.js","common/wx/pagebar.js","register/data_banks.js","tpl/register/bankdialog.html.js","tpl/register/banklist.html.js"],function(t){
"use strict";
function n(t,n){
if((n-1)*x>=t.length)return[];
for(var i=[],e=(n-1)*x,s=Math.min(n*x,t.length),a=e;s>a;a++)i.push(t[a]);
return i;
}
function i(t){
f.show();
var i=n(z,t),e=template.compile(w)({
list:i,
keyword:y
});
f.hide(),m.html(e).show(),m.find("input[type=radio]").checkbox({
onChanged:function(t){
P=t.val(),h.enable();
}
}),P="",h.disable(),b.popup("resetPosition"),""!=y&&c.find(".js_txt_bank_name").each(function(){
var t=$(this).html();
t=t.replace(y,'<span class="highlight">'+y+"</span>"),$(this).html(t);
});
}
function e(){
g.html("");
new _({
container:g,
first:!1,
last:!1,
midRange:5,
initShowPage:1,
perPage:x,
totalItemsNum:z.length,
callback:function(t){
i(t.currentPage);
}
});
}
function s(){
b=$(k).popup({
title:"选择银行",
className:"bank_dialog",
width:786,
data:{},
buttons:[{
text:"确定",
click:function(){
this.hide(),v.onGettingBank.call(this,P);
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
},
type:"default"
}]
}),c=$(b.get()[0]),h=c.find(".btn_primary"),p=c.find(".js_btn_search"),u=c.find(".js_input_search"),
d=c.find(".js_div_title"),f=c.find(".js_div_loading"),m=c.find(".js_div_banklist"),
g=c.find(".js_div_pagebar"),z=j;
}
function a(){
i(1),e(),p.on("click",function(){
if(y=$.trim(u.val()),!y)return!1;
for(var t=[],n=0;n<j.length;n++)j[n].indexOf(y)>-1&&t.push(j[n]);
return d.html("搜索到%s个银行".sprintf(t.length)),z=t,i(1),e(),!1;
}),c.on("click",".js_btn_reset_search",function(){
y="",u.val(""),d.html(""),z=j,i(1),e();
});
}
function o(t){
v=$.extend(!0,{},v,t),s(),a();
}
function r(){
b.popup("show");
}
function l(){
b.popup("hide");
}
var c,h,p,u,d,f,m,g,b,_=(template.render,t("biz_web/ui/checkbox.js"),t("common/wx/popup.js"),
t("common/wx/pagebar.js")),j=t("register/data_banks.js"),k=t("tpl/register/bankdialog.html.js"),w=t("tpl/register/banklist.html.js"),v={},x=21,y="",P="",z=[];
return{
init:o,
show:r,
hide:l
};
});