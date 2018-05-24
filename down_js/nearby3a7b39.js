define("cardticket/add/nearby.js",["biz_web/ui/checkbox.js","common/wx/media/imageDialog.js"],function(e){
"use strict";
function t(){
{
var e=$("#js_poi_pic_url");
$("#js_nearby").checkbox({
onChanged:function(t){
var i=t.prop("checked");
$("#js_show_in_nearby").val(i?1:"0"),$("#js_near_tips").html(template.render("js_neartips_tpl",{
checked:i
})),i?e.show():e.hide();
}
});
}
$("#js_nearby").prop("checked")?e.show():e.hide(),$("#js_near_tips").html(template.render("js_neartips_tpl",{})),
$(".js_select_file").click(function(){
var e=$(this).attr("id");
return i({
maxSelect:1,
desc:"建议尺寸：640像素 * 340像素",
onOK:function(t){
var i=t[0].url;
$("#"+e+"_hidden").val(i.https2http()),$("#"+e+"_preview").html("<img style='width:200px;height:128px;' src='%s'>".sprintf(i)),
$("#js_preview_logo").html('<img src="%s" style="width:94px;height:60px;">'.sprintf(i)),
this.destroy();
},
onCancel:function(){
this.destroy();
}
}),!1;
});
}
var i=(e("biz_web/ui/checkbox.js"),e("common/wx/media/imageDialog.js"));
return t;
});