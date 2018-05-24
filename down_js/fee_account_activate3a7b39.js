define("cardticket/fee_account_activate.js",["common/wx/dialog.js","common/wx/popup.js","tpl/cardticket/card_fee_open_tips.html.js","common/wx/Cgi.js"],function(t){
"use strict";
function c(t){
var c=!1;
$(t.container).click(function(){
$(template.compile(e)({
token:wx.data.t
})).popup({
title:"使用须知",
buttons:[{
text:"确认开通",
type:"primary",
click:function(){
c||(c=!0,o.post({
url:"/merchant/cardmoneymgr?action=activate_acct",
complete:function(){
c=!1;
},
success:function(c){
0==c.base_resp.ret?t.success&&t.success(c.reward):o.show(c);
}
}));
}
}]
});
});
}
var e=(t("common/wx/dialog.js"),t("common/wx/popup.js"),t("tpl/cardticket/card_fee_open_tips.html.js")),o=t("common/wx/Cgi.js");
return c;
});