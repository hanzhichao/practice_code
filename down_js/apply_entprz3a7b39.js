define("reward/apply_entprz.js",["biz_web/ui/checkbox.js","common/qq/jquery.plugin/Cookie.js","common/wx/Step.js"],function(e){
"use strict";
function s(e){
$(".js_div_step").hide(),$("#js_div_step"+e).show(),i.setStep(e);
}
e("biz_web/ui/checkbox.js"),e("common/qq/jquery.plugin/Cookie.js");
var n=e("common/wx/Step.js"),i=new n({
container:"#stepItems",
selected:1,
names:["1 同意协议","2 重要提示"]
});
$(".js_div_step").on("click",".js_btn_step",function(){
return $(this).hasClass("btn_disabled")?!1:void s($(this).data("step"));
}),$("#js_btn_agree").disable(),$("#js_input_agree").checkbox({
onChanged:function(e){
e.is(":checked")?$("#js_btn_agree").enable():$("#js_btn_agree").disable();
}
}),$("#js_btn_agree").on("click",function(){
return $(this).hasClass("btn_disabled")?!1:void $.cookie("reward_has_agreed","1",{
path:"/cgi-bin/",
expires:30
});
});
});