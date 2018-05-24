define("cardticket/card_cgi.js",["common/wx/Cgi.js"],function(c){
"use strict";
var n=c("common/wx/Cgi.js");
return{
has_friend_card:function(c){
n.get({
url:"/merchant/electroniccardmgr?action=check_can_use_sns_card"
},function(n){
c(0==n.base_resp.ret?1==n.is_can_use_sns_card?!0:!1:!1);
});
},
has_money_acct:function(c){
n.get({
url:"/merchant/cardmoneymgr?action=check_is_card_money_acct_open"
},function(n){
c(0==n.base_resp.ret?1==n.is_acct_open?!0:!1:!1);
});
},
check_friend_and_money_acct:function(c){
var n=0,e=!1,_=!1;
this.has_money_acct(function(a){
n++,e=a,2==n&&c(_,e);
}),this.has_friend_card(function(a){
n++,_=a,2==n&&c(_,e);
});
}
};
});