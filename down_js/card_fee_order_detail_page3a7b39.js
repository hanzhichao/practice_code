define("cardticket/card_fee_order_detail_page.js",["cardticket/card_fee_order_detail.js"],function(e){
"use strict";
var a=e("cardticket/card_fee_order_detail.js"),r=null,t=wx.cgiData.data;
t.__page=1;
var n=wx.cgiData.username,c=[];
2==t.order_type&&(c=[{
uin:t.useruin,
username:n
}]),r=new a({
container:"#js_main_content",
data:t,
uin_to_username:c
}),r.show(),$("#js_main_content").on("click",".js_show_feelist",function(){
location.href=wx.url("/merchant/cardmoneymgr?action=get_order_flow");
});
});