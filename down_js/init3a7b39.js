define("cardticket/add/init.js",["common/wx/Cgi.js","cardticket/clickreport.js","cardticket/parse_data.js"],function(a){
"use strict";
function i(a){
if(wx.cgiData.brand_name=wx.cgiData.data.brand_name=wx.cgiData.brand_name.html(!1),
a.cardid)t.get({
url:"/merchant/electroniccardmgr?action=get&card_id=%s".sprintf(a.cardid),
error:function(){
a.init&&a.init();
}
},function(i){
if(0==i.base_resp.ret){
var t=$.parseJSON(i.card_detail);
t=r.parse_cardticket(t),window.wx_is_can_use_help_make_and_send||(t.brand_name=wx.cgiData.brand_name,
t.logo_url=wx.cgiData.logo),t.brand_name=t.brand_name.html(!1),a.init&&a.init(t);
}else a.init&&a.init();
var c=$(".js_addtypeclickreport").get(0);
c&&e.clickele(c,!0);
});else{
a.init&&a.init();
var i=$(".js_addtypeclickreport").get(0);
i&&e.clickele(i,!0);
}
}
var t=a("common/wx/Cgi.js"),e=a("cardticket/clickreport.js"),r=a("cardticket/parse_data.js");
return i;
});