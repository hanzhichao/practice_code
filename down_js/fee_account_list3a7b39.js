define("cardticket/fee_account_list.js",["common/qq/queryString.js","biz_common/moment.js","biz_web/ui/dropdown.js","cardticket/common_template_helper.js","common/wx/report_util.js","cardticket/fee_recharge.js","cardticket/card_fee_order_detail.js","common/wx/tooltips.js","cardticket/create_card_select.js"],function(e){
"use strict";
function t(e){
for(var t=0;t<x.length;t++)if(x[t].order_id==e)return w[e]=x[t],x[t];
return null;
}
function r(e){
e.__page=1,v=new b({
container:"#js_orderdetail",
data:e,
uin_to_username:wx.cgiData.uin_to_username
}),$("#js_feelist").hide(),v.show();
}
$(".js_freefee_account").text(wx.cgiData.free_coin/100),$(".js_payfee_account").text(wx.cgiData.pay_coin/100),
wx.cgiData.pay_coin/100<100&&$(".js_payfee_account").addClass("balance_warn");
var a=e("common/qq/queryString.js"),i=e("biz_common/moment.js"),o=wx.cgiData.filter,n="YYYY-MM-DD",c=e("biz_web/ui/dropdown.js"),_=i().add("d",-6).unix(),l=i().unix(),s=new a;
e("cardticket/common_template_helper.js"),$(".js_typeSelect").click(function(){
var e=$(this).attr("type");
location.href=s.remove("offset").replace("coin_type",e).getUrl();
});
var d=wx.cgiData.data;
wx.cgiData.data.filter=wx.cgiData.filter;
for(var m=0;m<d.order_list.length;m++){
var f=d.order_list[m].buf;
if(f)try{
d.order_list[m].buf=$.parseJSON(d.order_list[m].buf);
}catch(u){
d.order_list[m].buf={};
}else d.order_list[m].buf={};
}
$("#js_orderlist").html(template.render("js_orderlist_tpl",wx.cgiData.data));
var p=e("common/wx/report_util.js");
if(wx.cgiData.total_order_count>o.count&&p.initPager({
total_count:wx.cgiData.total_order_count,
count:o.count,
currentPage:o.offset/o.count+1,
callback:function(e){
location.href=s.replace("offset",(e-1)*o.count).getUrl();
}
}),o.begin_time&&o.end_time){
o.end_time-o.begin_time+1;
}
o.begin_time=o.begin_time?o.begin_time:_,o.end_time=o.end_time?o.end_time:l,p.initDateRange({
begintime:i.unix(o.begin_time).format(n),
endtime:i.unix(o.end_time).format(n),
isTodayValid:!0,
dropDom:"#js_date_filter",
dateDom:"#js_dateRange",
showUnlimit:!0,
callback:function(e,t){
location.href=s.replaceAll({
begin_time:i(e,n).unix(),
end_time:i(t,n).add("d",1).unix()-1
}).remove("offset").getUrl();
}
}),p.initRankOnce({
container:".js_rankFlag",
sortkey:2,
sorttype:1==o.sort_type?1:0,
callback:function(e){
var t=e.sortkey,r=e.sorttype;
2==t&&(location.href=s.remove("offset").replace("sort_type",1==r?1:2).getUrl());
}
});
var g=[{
name:"全部类型",
value:""
},{
name:"平台赠送",
value:"1"
},{
name:"充值",
value:"2"
},{
name:"退还券点",
value:"3"
},{
name:"支出",
value:"4"
},{
name:"平台扣减",
value:"5"
}];
new c({
container:"#js_filter_order_type",
label:"订单类型",
data:g,
callback:function(e){
e!=o.order_type&&(location.href=s.remove("offset").replace("order_type",e).getUrl());
}
}).selected(o.order_type+"");
var j=e("cardticket/fee_recharge.js");
$("#js_feerecharge").click(function(){
new j;
});
var w={},x=wx.cgiData.data.order_list;
$(".js_show_detail").click(function(){
var e=$(this).attr("orderid"),a=t(e);
r(a);
});
var b=e("cardticket/card_fee_order_detail.js"),v=null;
$("#js_orderdetail").on("click",".js_show_feelist",function(){
$("#js_feelist").show(),v&&v.destroy();
}),$(".js_free_coin_count").text(wx.cgiData.reward/100),$("#js_download").attr("href",(new a).remove("offset").remove("count").replaceAll({
action:"download_order_flow",
begin_time:i(i.unix(o.begin_time).format(n),n).unix(),
end_time:o.end_time
}).getUrl());
var h=e("common/wx/tooltips.js"),y=(new h({
container:$(".js_howto_tips"),
reposition:!0,
content:template.render("js_howto_tips_tpl"),
type:"hover"
}),e("cardticket/create_card_select.js"));
$("#js_add_card_link").click(function(){
return new y({
ispay:0,
is_sns_card:1
}),!1;
});
});