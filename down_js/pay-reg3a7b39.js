define("business/pay-reg.js",["common/wx/iframe.method.js"],function(e){
"use strict";
var t=e("common/wx/iframe.method.js"),n=wx.data.t,r=function(){
var e,t,n;
return{
init:function(r,s,a){
e=r,t=s,n=a;
},
set:function(r){
r=parseInt(r,10),e.removeClass("current prev pprev next nnext"),e.each(function(e){
if(r-2>e)$(this).addClass("pprev");else if(e>r)$(this).addClass("nnext");else switch(e){
case r-2:
$(this).addClass("prev");
break;

case r-1:
$(this).addClass("current");
break;

case r:
$(this).addClass("next");
}
}),t.hide(),t.eq(r-1).show(),n["step"+r]&&n["step"+r]();
}
};
}(),s={
step1:function(){
$("#mpIFrame").remove(),$(".rn-reg-t-wrapper").show(),$("#confirmStep1").off("click").on("click",function(){
return"true"==$(this).attr("disable")?!1:void(location.href=location.href+"&issigned=1");
}),$("#agree").off("change").on("change",function(){
$(this).is(":checked")?$("#confirmStep1").attr("disable",!1).removeClass("btnDisable"):$("#confirmStep1").attr("disable",!0).addClass("btnDisable");
});
},
step5:function(){
$("#mpIFrame").remove(),$(".rn-reg-t-wrapper").show(),$.post("/merchant/business",{
token:n,
op:"setpartner"
},function(){});
}
},a=function(e){
var n=e.num||e.step;
if(2==n){
$(".pay-reg-protocol").hide(),$(".rn-reg-t-wrapper").hide(),$(".containerBox").append($("#tpl_iframe").html());
var a=document.getElementById("mpIFrame");
a&&t.communicateWith(a.contentWindow);
}else r.init($(".rn-reg-t"),$(".rn-box"),s),r.set(n);
},i=location.search.match(/isSigned=([^&]+)/i);
a({
num:1
}),null!=i&&1==parseInt(i[1],10)&&a({
num:2
}),$("#agree").trigger("change"),t.on("setStep",a);
});