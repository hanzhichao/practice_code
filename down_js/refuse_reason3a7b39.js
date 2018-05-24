define("cardticket/detail/refuse_reason.js",["cardticket/common_template_helper.js","common/wx/tooltips.js"],function(e){
"use strict";
function t(e){
{
var t=e.data;
new n({
container:$(".js_refuse_reason"),
content:o.nl2br(t.refuse_reason||"")||"无",
type:"hover"
});
}
}
var o=e("cardticket/common_template_helper.js"),n=e("common/wx/tooltips.js");
return t;
});