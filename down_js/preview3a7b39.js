define("cardticket/add/preview.js",["common/wx/preview.js"],function(e){
"use strict";
function t(t){
$(".js_can_preview").on("keyup",function(){
var e=$(this).attr("name");
e&&($("#js_"+e+"_preview").text($(this).val()),$(".js_"+e+"_preview").text($(this).val()));
}).on("blur",function(){
var e=$(this).attr("name");
e&&($("#js_"+e+"_preview").text($(this).val()),$(".js_"+e+"_preview").text($(this).val()));
});
var s=e("common/wx/preview.js");
if($(".js_img_wrap_preview").click(function(){
var e=$(this).attr("bigsrc");
return e&&(s.show({
imgdata:[{
imgsrc:e,
downsrc:e
}]
}),$("#btndown").hide()),!1;
}),10==t.data.type){
var i=$("#js_prerogative_rule");
i.length&&setInterval(function(){
var e=$("#js_editform_step1").serializeObject();
e.type=t.data.type;
var s="";
e.init_bonus&&(s="激活成功即赠送%s积分".sprintf(e.init_bonus)),e.cost_money_unit&&e.increase_bonus&&(s&&(s+="<br>"),
s+="每消费%s元，赠送%s积分".sprintf(e.cost_money_unit,e.increase_bonus)),e.max_increase_bonus&&(s&&(s+="<br>"),
s+="单次赠送上限%s积分".sprintf(e.max_increase_bonus)),e.cost_bonus_unit&&e.reduce_money&&(s&&(s+="<br>"),
s+="每使用%s积分，抵扣%s元".sprintf(e.cost_bonus_unit,e.reduce_money),e.max_reduce_bonus&&(s+="，单笔使用上限%s积分".sprintf(e.max_reduce_bonus))),
i.html(s);
},1e3);
}else 4==t.data.type&&setInterval(function(){
var e=$("#js_editform_step1").serializeObject();
if(e.reduce_cost){
var t=e.use_condition_least_cost?"满%s减%s代金券".sprintf(e.use_condition_least_cost,e.reduce_cost):"%s元代金券".sprintf(e.reduce_cost);
$("#js_title_preview").text(t);
}else $("#js_title_preview").text("代金券标题");
},500);
}
return t;
});