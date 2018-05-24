define("scan/scan_barcode_batch.js",["common/wx/Cgi.js","biz_web/lib/json.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/popup.js","common/wx/pagebar.js","biz_common/jquery.validate.js","tpl/scan/barcode_batch.html.js"],function(e){
"use strict";
function t(){
var e=n(),t=e.length>0?!0:!1,i=$("#js_input_agree_barcode").is(":checked");
return t?i?g.hide():k.err("请同意《条码号段使用协议》"):g.html("请输入你品牌的条码，并点击“识别”按钮").show(),
t&&i;
}
function n(){
for(var e=[],t=0;t<P.length;t++)14153!=P[t].ret&&e.push({
barcode:P[t].barcode,
firm:P[t].firm,
file_id:""
});
return e;
}
function i(e){
e=e.replace(/；/g,";"),S=e.indexOf(";")>-1?";":"\n";
for(var t=e.split(S),n=[],i=0;i<t.length;i++)t[i]=$.trim(t[i]),""!==t[i]&&n.push(t[i]);
return n;
}
function o(e){
for(var t=0;t<e.length;t++)T[e[t].barcode]||(T[e[t].barcode]=!0,14153==e[t].ret?P.push(e[t]):P.unshift(e[t]));
}
function r(){
f.show(),v.html(n().length),a(),0==P.length?m.hide():m.show();
new C({
container:"#js_div_barcode_pagebar",
perPage:O,
initShowPage:M,
totalItemsNum:P.length,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
return M=e.currentPage,a(),!0;
}
});
}
function a(){
for(var e=[],t=(M-1)*O;M*O>t&&t<P.length;t++)e.push(P[t]);
h.html(w("tpl_barcode_list",{
list:e
})),h.find(".js_item").each(function(){
new y({
container:$(this).find(".js_claimed_tooltips"),
content:w("tpl_barcode_claimed_tooltips"),
reposition:!0,
type:"hover",
position:{
left:-138,
top:-2
},
parentClass:"pay_tips_popover"
});
});
}
function s(){
d=$(z).html(q),p=$("#js_form_barcode_search"),u=$("#js_btn_barcode_search"),m=$(".js_btn_remove_page_barcode"),
b=$("#js_input_barcodes"),f=$("#js_div_barcode_result"),h=$("#js_div_barcode_list"),
v=$("#js_div_barcode_count"),g=$("#js_div_barcode_msg");
}
function c(){
m.hide();
var e=d.find(".js_links");
e.length>0&&e.attr("href",e.attr("href").replace("{token}",wx.data.t).replace("{lang}",wx.data.lang)),
new y({
container:"#js_barcode_tooltips",
content:w("tpl_barcode_tooltips"),
reposition:!0,
type:"hover",
position:{
left:-138,
top:-2
},
parentClass:"pay_tips_popover"
});
}
function l(){
$("#js_input_agree_barcode").checkbox({
onChanged:function(e){
e.is(":checked");
}
}),h.on("click",".js_btn_remove_barcode",function(){
for(var e=$(this).data("barcode"),t=0;t<P.length;t++)if(P[t].barcode==e){
P.splice(t,1),T[e]=!1,M=Math.max(1,Math.ceil(P.length/O)),r();
break;
}
}),f.on("click",".js_btn_remove_page_barcode",function(){
for(var e=(M-1)*O;O>=e&&e<P.length;e++)T[P[e].barcode]=!1;
P.splice((M-1)*O,O),M=Math.max(1,M-1),r();
}),b.on("keyup",function(){
$(this).removeClass("warning");
});
}
function _(){
p.on("submit",function(){
if(0==p.valid())return!1;
var e=i(b.val()),t={
barcodelist:x.stringify2({
list:e
})
};
return u.btn(!1),j.post({
url:"/merchant/scanapply?action=batchgetfirminfo",
data:t,
mask:!1
},function(t){
if(u.btn(!0),0==t.base_resp.ret){
if(t.firm_info&&t.firm_info.length>0&&(o(t.firm_info),M=1,r()),t.invalid_num>0&&b.addClass("warning"),
t.invalid_num>0&&t.invalid_list){
var n=wx.url("/cgi-bin/readtemplate?t=scan/code_error_tmpl");
b.val(t.invalid_list.join(S)),g.html("以上无法识别，请核实后重试。%s可能错误原因%s".sprintf('<a href="%s" target="_blank">'.sprintf(n),"</a>")).show();
}else b.val("").blur(),setTimeout(function(){
b.blur(),g.html("");
},100);
{
$("#tpl_barcode_result").popup({
title:"条码号段识别结果",
data:{
succ_num:t.succ_num,
invalid_num:t.invalid_num,
barcode_num:e.length
},
buttons:[{
text:"确定",
click:function(){
this.remove();
},
type:"primary"
}],
mask:!0,
onHide:function(){
this.remove();
}
});
}
}else k.err("系统错误，请重试");
}),!1;
}),$.validator.addMethod("is_barcode_splitable",function(e){
return(e.indexOf(";")>-1||e.indexOf("；")>-1)&&e.indexOf("\n")>-1?!1:!0;
}),p.validate({
ignore:".js_input_ignore",
rules:{
barcodelist:{
required:!0,
is_barcode_splitable:!0
}
},
messages:{
barcodelist:{
required:"请输入条码",
is_barcode_splitable:"格式有误，请以“；”或回车分隔条码，不能混用"
}
},
errorPlacement:function(e){
g.html(e.removeClass()).show();
}
});
}
var d,p,u,m,b,f,h,v,g,j=(wx.T,e("common/wx/Cgi.js")),w=template.render,x=e("biz_web/lib/json.js"),k=e("common/wx/Tips.js"),y=e("common/wx/tooltips.js"),C=(e("common/wx/popup.js"),
e("common/wx/pagebar.js")),q=(e("biz_common/jquery.validate.js"),e("tpl/scan/barcode_batch.html.js")),z=null,M=1,O=10,P=[],T={},S=";";
return{
barcodeList:P,
init:function(e){
z=e,s(),c(),l(),_();
},
valid:function(){
return t();
},
getBarcodes:n
};
});