define("cardticket/card_college.js",["common/wx/report_util.js","common/wx/Tips.js","common/wx/Cgi.js","biz_common/moment.js","biz_web/ui/dropdown.js","common/wx/tooltips.js","common/wx/top.js","cardticket/overview_enum.js","common/wx/dialog.js","cardticket/topmenu.js","cardticket/common_template_helper.js","cardticket/fee_account_activate.js","cardticket/common_init.js"],function(o){
"use strict";
{
var t=(o("common/wx/report_util.js"),o("common/wx/Tips.js"),o("common/wx/Cgi.js"),
o("biz_common/moment.js"));
o("biz_web/ui/dropdown.js"),wx.cgiData,o("common/wx/tooltips.js"),t().add("d",-7).format("YYYY-MM-DD"),
t().add("d",-1).format("YYYY-MM-DD"),o("common/wx/top.js"),o("cardticket/overview_enum.js"),
o("common/wx/dialog.js");
}
o("cardticket/topmenu.js").selected("overviewpage"),o("cardticket/common_template_helper.js"),
function(){
var t=o("cardticket/fee_account_activate.js");
new t({
container:".js_activate_fee_acct",
success:function(){
location.href=wx.url("/merchant/cardstat?action=overviewpage");
}
});
}(),o("cardticket/common_init.js");
});