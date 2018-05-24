define("cardticket/sendout.js",["cardticket/common_template_helper.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/Tips.js","biz_common/moment.js","cardticket/simple_report.js","tpl/cardticket/sendout.html.js","biz_web/ui/checkbox.js","cardticket/sendout_util.js","page/cardticket/dialog_choose_card.css"],function(t){
"use strict";
function e(t){
var e=t.data,s=(e.id,$.extend(!0,{
wx_is_intercomm_card:window.wx_is_intercomm_card,
view_mode:window.view_mode||1
},e));
s.__code_valid_time=c().add("d",365).format("YYYY年MM月DD日");
var n=$(o(s)).popup({
title:"投放卡券",
autoShow:!1,
buttons:[{
text:e.is_sns_card?"下载":"确定",
type:"primary",
click:function(){
m.send(),this.hide();
}
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}],
onHide:function(){
t&&t.onHide&&t.onHide.call(this);
},
className:"align_edge"
}),d=n.popup("get");
t.container=d;
var m=new i(t);
return n;
}
t("cardticket/common_template_helper.js");
var c=(t("common/wx/popup.js"),t("common/wx/Cgi.js"),t("common/wx/Tips.js"),t("biz_common/moment.js")),o=(t("cardticket/simple_report.js"),
template.compile(t("tpl/cardticket/sendout.html.js")));
t("biz_web/ui/checkbox.js");
var i=t("cardticket/sendout_util.js");
return t("page/cardticket/dialog_choose_card.css"),e;
});