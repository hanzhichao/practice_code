define("cardticket/pay_card_record.js",["biz_common/moment.js","common/wx/pagebar.js","common/qq/queryString.js","common/wx/report_util.js","cardticket/topmenu.js","cardticket/common_init.js"],function(t){
"use strict";
var e=(wx.T,template.render),r=t("biz_common/moment.js"),o=t("common/wx/pagebar.js"),n=t("common/qq/queryString.js"),i=t("common/wx/report_util.js"),a=wx.cgiData;
t("cardticket/topmenu.js").selected("cardmgr_pay");
var c=function(){
function t(){
o();
}
function o(){
for(var t=a.data&&a.data.product_order_list?a.data.product_order_list:[],o=t.length,c=0;o>c;c++)n.push({
order_id:t[c].order_id,
create_time:r.unix(t[c].order_create_time).format("YYYY-M-D HH:mm"),
product_name:t[c].product_name,
card_type:i[t[c].card_type]||"未知",
wx_price:""+(Math.round(100*t[c].product_price_float)/100).toFixed(2),
buy_count:t[c].product_count,
total_price:""+(Math.round(100*t[c].order_total_price_float)/100).toFixed(2),
buyer_nick:t[c].buyer_nick,
detail_link:wx.url("/merchant/cardorder?action=getdetail&t=cardticket/pay_card_detail&orderidstr="+t[c].order_id)
});
$("#js_maintable").html(e("js_orderListHtml",{
product_order_list:n
}));
}
var n=[],i={
0:"优惠券",
1:"团购券",
2:"折扣券",
3:"兑换券",
4:"代金券"
};
return{
init:t
};
}(),d=function(){
function t(){
var t="";
for(var e in p)p.hasOwnProperty(e)&&""!==p[e]&&(t+="&"+e+"="+encodeURIComponent((p[e]+"").html(!1).html(!1)));
location.href=wx.url("/merchant/cardorder?action=getlist&t=cardticket/pay_card_record"+t);
}
function e(){
p.orderidstr&&u.val(p.orderidstr.html(!1).html(!1)),p.product&&s.val(p.product.html(!1).html(!1)),
p.nick&&_.val(p.nick.html(!1).html(!1)),$("#js_search").on("click",f),u.on("keyup",f),
_.on("keyup",f),s.on("keyup",f);
}
function c(){
{
var t=Math.floor(a.offset/a.count)+1;
new o({
container:"#js_pageNavigator",
perPage:a.count,
initShowPage:t,
totalItemsNum:a.total_cnt,
isSimple:!0,
first:!1,
last:!1,
callback:function(e){
var r=e.currentPage;
return r!=t&&(location.href=n.replace(location.href,"offset",(r-1)*a.count)),!1;
}
});
}
}
function d(){
i.initDateRange({
begintime:p.begintime,
endtime:p.endtime,
showUnlimit:!0,
dropDom:"#js_chart_date_filter",
dateDom:"#js_dateRange",
callback:function(e,r){
p.begintime=e,p.endtime=r,t();
}
});
}
function m(){
var t="";
for(var e in p)p.hasOwnProperty(e)&&""!==p[e]&&"count"!==e&&(t+="&"+e+"="+encodeURIComponent((p[e]+"").html(!1).html(!1)));
$("#js_downloadExcel").attr("href",wx.url("/merchant/cardorder?action=download&t=cardticket/order_excel"+t));
}
function l(){
e(),c(),d(),m();
}
var u=$("#js_sf_order"),_=$("#js_sf_nick"),s=$("#js_sf_pname"),p={
orderidstr:a.orderidstr,
nick:decodeURIComponent(a.nick),
product:a.product,
begintime:a.begintime,
endtime:a.endtime,
last_days:a.last_days,
count:a.count
};
p.begintime&&p.endtime?p.last_days="":(p.begintime=r().add("d",-p.last_days).format("YYYY-MM-DD"),
p.endtime=r().add("d",-1).format("YYYY-MM-DD"));
var f=function(e){
var r=e?e.keyCode:null;
return"number"==typeof r&&13!=+r?!1:(p.orderidstr=u.val(),p.nick=_.val(),p.product=s.val(),
void t());
};
return{
init:l
};
}();
c.init(),d.init(),t("cardticket/common_init.js");
});