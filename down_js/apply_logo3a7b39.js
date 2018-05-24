define("cardticket/apply_logo.js",["page/cardticket/apply_widget_form.css","cardticket/common_template_helper.js","cardticket/common_validate.js","biz_web/utils/upload.js","common/wx/Tips.js","tpl/cardticket/apply_logo.html.js"],function(t){
"use strict";
function e(t){
$(t.container).on("keyup",function(){
var e=$.trim($(this).val());
$(t.hint).text(Math.round(a.strlen(e)/2)||0);
}).keyup();
}
t("page/cardticket/apply_widget_form.css");
var a=t("cardticket/common_template_helper.js");
t("cardticket/common_validate.js");
var i=t("biz_web/utils/upload.js"),r=t("common/wx/Tips.js"),n=template.compile(t("tpl/cardticket/apply_logo.html.js")),c=function(t){
t.data||(t.data={});
var a=$(t.container);
a.html(n(t.data));
var c=(a.find(".js_logo"),a.find(".js_brand_name"));
e({
container:c,
hint:c.attr("data-hint")
});
var o=function(){
var t=$(this),e=t.attr("id");
$("#"+e+"_preview").text(t.val());
};
$(".js_can_preview",a).keyup(o).blur(o),$(".js_logo_file").each(function(){
var t=$(this),e=t.attr("id"),a=i.uploadCdnFile;
!function(t){
a({
container:"#"+t,
multi:!1,
type:11,
onComplete:function(e,a,i,n){
var c=n.content||"";
0==n.base_resp.ret&&($("#"+t+"_preview").html('<img style="width:200px;" src="%s">'.sprintf((c+"").http2https())),
$("#"+t+"_right_preview").attr("src",(c+"").http2https()),$("#"+t+"_hidden").val(c),
$("#"+t+"_hidden").parent().parent().find(".fail").remove(),$("#js_"+t+"_preview").attr("src",(c+"").http2https()),
r.suc("上传成功"));
}
});
}(e);
});
};
return c;
});