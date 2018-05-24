define("register/mod/mod_banklist.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","common/wx/popup.js","common/wx/pagebar.js","tpl/register/bankdialog.html.js","tpl/register/banklist.html.js"],function(t,n,i){
"use strict";
function e(t,n){
w.get({
url:"/cgi-bin/getcmsdata?action=bank_list&f=json",
data:{
key:N,
begin:(t-1)*C,
count:C
}
},function(t){
if(t&&0==t.base_resp.ret){
var i=JSON.parse(t.data);
D=i.total;
for(var e=[],a=0;a<i.key_list.length;a++)e.push(i.key_list[a].name);
n(e);
}else n([]);
});
}
function a(t,n){
g.show(),_.hide(),f.disable(),S="",e(t,function(t){
var i=template.compile(y)({
list:t,
keyword:N
});
g.hide(),_.html(i).show(),_.find("input[type=radio]").checkbox({
onChanged:function(t){
S=t.val(),f.enable();
}
}),k.popup("resetPosition"),""!=N?(b.html("搜索到%s个银行".sprintf(t.length)),p.find(".js_txt_bank_name").each(function(){
var t=$(this).html();
t=t.replace(N,'<span class="highlight">'+N+"</span>"),$(this).html(t);
})):b.html(""),n&&n();
});
}
function o(){
j.html("");
new v({
container:j,
first:!1,
last:!1,
midRange:5,
initShowPage:1,
perPage:C,
totalItemsNum:D,
callback:function(t){
a(t.currentPage);
}
});
}
function s(){
k=$(x).popup({
title:"选择银行",
className:"bank_dialog",
width:786,
autoShow:!1,
data:{},
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.hide(),P.onGettingBank.call(this,S);
}
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}]
}),p=$(k.get()[0]),h=p.find(".js_form_search"),f=p.find(".btn_primary"),m=p.find(".js_btn_search"),
d=p.find(".js_input_search"),b=p.find(".js_div_title"),g=p.find(".js_div_loading"),
_=p.find(".js_div_banklist"),j=p.find(".js_div_pagebar");
}
function c(){
a(1,function(){
o();
}),m.on("click",function(t){
return t.preventDefault(),h.submit(),!1;
}),p.on("click",".js_btn_reset_search",function(t){
t.preventDefault(),N="",d.val(""),b.html(""),a(1,function(){
o();
});
}),h.on("submit",function(t){
return t.preventDefault(),(N=$.trim(d.val()))?(a(1,function(){
o();
}),!1):!1;
});
}
function l(t){
P=$.extend(!0,{},P,t),s(),c();
}
function r(){
k.popup("show");
}
function u(){
k.popup("hide");
}
var p,h,f,m,d,b,g,_,j,k,w=(template.render,t("common/wx/Cgi.js")),v=(t("biz_web/ui/checkbox.js"),
t("common/wx/popup.js"),t("common/wx/pagebar.js")),x=t("tpl/register/bankdialog.html.js"),y=t("tpl/register/banklist.html.js"),P={},C=21,D=0,N="",S="";
i.exports={
init:l,
show:r,
hide:u
};
});