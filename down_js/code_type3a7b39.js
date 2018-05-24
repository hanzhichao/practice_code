define("cardticket/add/code_type.js",["biz_web/ui/checkbox.js"],function(e){
"use strict";
function t(e){
function t(e){
$("#js_hidden_code_type").val(e),$(".js_destroy_type_preview").hide(),$(".js_code_preview").hide(),
$(".js_code_preview_"+e).show(),"undefined"!=typeof e&&$("#js_destroy_title").hide();
}
{
var d=($("#js_destroy_type_preview"),$("#js_destroy_type input[type=radio]"));
d.checkbox({
onChanged:function(e){
var d=e.val();
t(d);
}
});
}
t(e.data.code_type);
}
e("biz_web/ui/checkbox.js");
return t;
});