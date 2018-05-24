define("tmplmsg/payment_lib.js",["common/wx/top.js","common/wx/dialog.js","tmplmsg/tpl_cgi.js"],function(t){
"use strict";
{
var m=t("common/wx/top.js");
t("common/wx/dialog.js"),t("tmplmsg/tpl_cgi.js");
}
new m("#topTab",m.DATA.templateMessage).selected(2),$("#tpl_container").html(template.render("js_tmplListHtml",wx.cgiData.data.store_tmpl_info));
});