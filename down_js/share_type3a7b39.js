define("cardticket/add/share_type.js",["biz_web/ui/checkbox.js"],function(e){
"use strict";
function c(e){
e=$.extend(!0,{
data:{}
},e);
var c=$("#js_active_container"),a=$("#js_share_type input[type=checkbox]").checkbox({
onChanged:function(e){
var a=$(e.attr("target")),t=e.prop("checked");
a.val(t?1:0),e.hasClass("js_active_checkbox")&&(t?c.show():c.hide(),t?$("#js_active_give_bonus").show():$("#js_active_give_bonus").hide());
}
});
return e.data.ispay&&a.disable(["1"]),1==e.data.create_source&&$("#js_share_type .js_active_checkbox").checkbox().disabled(!0),
a;
}
e("biz_web/ui/checkbox.js");
return c;
});