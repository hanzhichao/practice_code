define("cardticket/simple_report.js",["common/wx/Cgi.js"],function(t,i,c){
"use strict";
var o={
dispatch:"/merchant/entityshop?action=dispatch_report"
},r=t("common/wx/Cgi.js");
c.exports={
dispatch:function(t,i){
r.post({
mask:!1,
url:wx.url(o.dispatch),
data:{
card_id:t,
type:i
},
error:function(){}
},function(){});
}
};
});