define("cardticket/social_sendout.js",["common/wx/dialog.js","cardticket/clickreport.js","cardticket/topmenu.js","cardticket/common_init.js","cardticket/send_card.js"],function(c){
"use strict";
function i(c,i){
var a=new t({
multi:!1,
data:null,
filter_out_expired_card:0,
neednew:!1,
noexpire:!1,
sns_card_type:i||0,
param:{
status:"1|2|3|6|8",
is_filter_out_apicard:1,
flag:wx.cgiData.ispay,
need_member_card:1
},
selectComplete:function(i){
c&&c(i);
}
});
a.show();
}
c("common/wx/dialog.js"),c("cardticket/clickreport.js");
c("cardticket/topmenu.js").selected("cardsend"),c("cardticket/common_init.js");
var t=c("cardticket/send_card.js");
$(".js_card_qrcode").click(function(){
i(function(c){
window.open(wx.url("/merchant/cardqrcode?action=copydownload"+"&cardid=%s&cardquantity=%s&cardlimit=%s".sprintf(c.cardid,0)));
});
}),$(".js_appmsg").click(function(){
i(function(c){
location.href=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&isMul=1&isNew=1&cardid=%s&cardnum=%s".sprintf(c.cardid,0));
},1);
}),$(".js_masssend").click(function(){
i(function(c){
location.href=wx.url("/cgi-bin/masssendpage?t=mass/send&cardid=%s&cardnum=%s".sprintf(c.cardid,0));
},1);
});
});