define("cardticket/common_init.js",["cardticket/clickreport.js","cardticket/card_cgi.js"],function(c){
"use strict";
var r=c("cardticket/clickreport.js");
r.regreport(),r.regcommonclick();
var t=c("cardticket/card_cgi.js");
t.check_friend_and_money_acct(function(c,r){
r?$("#js_has_money_acct_tips").show():c&&$("#js_has_friend_card_tips").show(),c&&$(".js_has_friend_card_tips").show();
});
});