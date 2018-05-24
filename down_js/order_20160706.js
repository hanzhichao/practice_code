define("service/order_20160706.js",["common/wx/Cgi.js","biz_common/moment.js","common/wx/popover.js"],function(e){
"use strict";
function t(e){
var t=[];
return e.each(function(e){
var i="",r="";
e.invoice&&(i=e.invoice.exp_time?a.unix(e.invoice.exp_time).format("YYYY-MM-DD H:mm:ss"):"",
r=e.invoice.exp_no?e.invoice.exp_no:""),t.push({
id:e.order_id,
data:e.create_time,
order_state:e.order_state,
verify_state:e.verify_state,
invoice_state:e.invoice_state,
makeout_invoice:e.makeout_invoice,
invoice_exp_time:i,
invoice_exp_no:r,
type:e.product_name
});
}),$.map(t,function(e){
e.time=a.unix(e.data).format("YYYY-MM-DD H:mm"),e.name=e.type,e.ops=0==e.order_state||2==e.order_state?[{
url:wx.url(c.pay.verify+"&order_id="+e.id),
name:"支付",
blank:!0
},{
url:wx.url(c.modify.verify),
name:"修改",
blank:!0
}]:3==e.verify_state||4==e.verify_state?[{
url:wx.url(c.rewrite),
name:"重填",
blank:!0
},{
url:wx.url(c.detail)+"&order_id="+e.id,
name:"详情"
}]:[{
url:wx.url(c.detail)+"&order_id="+e.id,
name:"详情"
}],e.order_status=o[e.order_state],e.verify_status=n[e.verify_state],e.invoice_status=s[e.invoice_state],
2!=e.invoice_state||e.invoice_exp_no||(e.invoice_status="财务处理中");
}),{
data:t
};
}
var i=template.render,a=(e("common/wx/Cgi.js"),e("biz_common/moment.js")),r=e("common/wx/popover.js"),o={
0:"待支付",
1:"已支付",
2:"汇款确认中"
},n={
0:"审核中",
1:"审核失败",
2:"审核成功",
3:"补充材料",
4:"审核重填"
},s={
0:"尚未开票",
1:"开票中",
2:"已寄出",
3:"审核中",
4:"重填"
},c={
pay:{
verify:"/acct/wxverify?t=wxverify/index&action=step&step=pay_method",
"package":"/merchant/store?action=pay&t=service/pay&info=package"
},
modify:{
verify:"/acct/wxverify?t=wxverify/index&action=step&step=stuff"
},
detail:"/merchant/order?action=detail&t=service/detail",
rewrite:"/acct/wxverify?action=refill"
};
wx.cgiData.data.order_list.length>0&&($("#orderList").html(template.render("tpl",t(wx.cgiData.data.order_list))),
$(".js_btn_invoice_exp").each(function(){
var e=$(this).data("exptime"),t=$(this).data("expno");
if(!t)return void $(this).hide();
var a=new r({
dom:$(this),
content:i("tpl_exp_tips",{
exp_time:e,
exp_no:t
}),
hover:!1
});
a.hide(),$(this).on("mouseenter",function(){
a.show();
}),$(this).on("mouseout",function(){
a.hide();
});
})),function(){
wx.cgiData.establishment_date&&$("#js_funddate").text("0"==wx.cgiData.establishment_date?"长期":a.unix(wx.cgiData.establishment_date).format("YYYY-MM-DD")||""),
wx.cgiData.expired_date&&$("#js_expdate").text("0"==wx.cgiData.expired_date?"长期":a.unix(wx.cgiData.expired_date).format("YYYY-MM-DD")||"");
}();
});