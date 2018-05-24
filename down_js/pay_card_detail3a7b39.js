define("cardticket/pay_card_detail.js",["biz_common/moment.js","cardticket/common_init.js"],function(t){
"use strict";
var i=(wx.T,template.render),e=t("biz_common/moment.js"),n=wx.cgiData,c=function(){
function t(){
n.create_time=e.unix(n.create_time_ori).format("YYYY-M-D HH:mm"),n.wx_price=""+(Math.round(100*n.wx_price_ori)/100).toFixed(2),
n.total_price=""+(Math.round(100*n.total_price_ori)/100).toFixed(2);
var t={
0:"优惠券",
1:"团购券",
2:"折扣券",
3:"兑换券",
4:"代金券"
};
n.card_type=t[n.card_type_ori]||"未知",n.buyer_nick=n.buyer_nick?(""+n.buyer_nick).html(!1):"",
n.buyer_nick_encode=encodeURIComponent(n.buyer_nick.html(!1)),$("#js_main").html(i("main_tpl",n));
}
function c(){
t();
}
return{
init:c
};
}();
c.init(),t("cardticket/common_init.js");
});