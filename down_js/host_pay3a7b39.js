define("ad_system/host_pay.js",["biz_web/ui/dropdown.js","biz_common/moment.js","biz_web/ui/dateRange.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/tooltips.js","common/wx/pagebar.js","ad_system/helper.js","biz_common/jquery.validate.js","common/wx/popup.js","biz_web/ui/checkbox.js","common/wx/top.js"],function(t){
"use strict";
function e(){
var t=n().add("days",-7).format("YYYY-MM-DD"),e=n().format("YYYY-MM-DD");
"income"==(wx.cgiData.type=wx.cgiData.type?wx.cgiData.type:"income")?($("#js_income_form").show(),
_=s({
container:"#dateRangeDetail",
startDate:t,
endDate:e,
theme:"ta",
isTodayValid:!0,
success:function(){
o(0,0);
}
}),o(0,0)):($("#js_withdraw_form").show(),t=n().add("months",-3).format("YYYY-MM-DD"),
_=s({
container:"#dateRangeFlow",
startDate:t,
endDate:e,
theme:"ta",
isTodayValid:!0,
success:function(){
o(0,1);
}
}),o(0,1),$("#js_bank_name").html(wx.cgiData.bank_name),$("#js_account").html(wx.cgiData.account),
$("#js_account_name").html(wx.cgiData.account_name),$("#js_email").html(wx.cgiData.email),
new l({
container:"#js_flow_tip"
}));
}
function a(){
$(".jsDay").click(function(){
$(this).addClass("selected").siblings().removeClass("selected");
});
}
function o(t,e){
var a={};
a.start_date=_.getCurrentDate().startDate,a.end_date=_.getCurrentDate().endDate,
a.cont_type=e||0,a.count=10,a.begin=0+10*t,c.get({
url:"/merchant/ad_host_pay?action=income_info",
data:a
},function(e){
if(!e||!e.base_resp)return void m.err("系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
i(e,t,a.cont_type);
break;

default:
m.err("系统错误，请重试");
}
});
}
function i(t,e,a){
if(0==a)if($("#js_income_today").text(t.income_yesterday&&t.income_yesterday>0?t.income_yesterday/100:"0"),
$("#js_total_income").text(t.income_all&&t.income_all>0?t.income_all/100:"0"),t.total_num>0){
for(var i=[],n=0,s=t.income_list.length;s>n;n++)i.push({
time:t.income_list[n].date,
pay:t.income_list[n].income/100
});
$("#detailList").html(template.render("tpl",{
data:i
})),$("#detailList tr:odd").find("td").addClass("row_hint");
var m=10,c=t.total_num,l=0+10*e;
if(c>m){
var d=l>0?Math.floor(l/m)+1:1;
new r({
container:"#pageBarDetail",
perPage:m,
initShowPage:d,
totalItemsNum:c,
isSimple:!0,
callback:function(t){
return o(t.currentPage-1,0),!1;
}
});
}
$("#noListDetail").hide();
}else $("#detailList").html(""),$("#noListDetail").show();else if(1==a)if($("#js_un_income").text(Math.floor(t.income_all-t.withdraw_all)/100),
$("#js_tdo_income").text(t.withdraw_all/100),t.total_num>0){
for(var i=[],n=0,s=t.income_list.length;s>n;n++)i.push({
time:t.income_list[n].date,
pay:t.income_list[n].withdraw/100
});
$("#flowList").html(template.render("tpl",{
data:i
})),$("#flowList tr:odd").find("td").addClass("row_hint");
var m=10,c=t.total_num,l=0+10*e;
if(c>m){
var d=l>0?Math.floor(l/m)+1:1;
new r({
container:"#pageBarFlow",
perPage:m,
initShowPage:d,
totalItemsNum:c,
isSimple:!0,
callback:function(t){
return o(t.currentPage-1,1),!1;
}
});
}
$("#noListFlow").hide();
}else $("#flowList").html(""),$("#noListFlow").show();
}
{
var n=(t("biz_web/ui/dropdown.js"),t("biz_common/moment.js")),s=t("biz_web/ui/dateRange.js"),m=t("common/wx/Tips.js"),c=t("common/wx/Cgi.js"),l=t("common/wx/tooltips.js"),r=t("common/wx/pagebar.js");
t("ad_system/helper.js");
}
t("biz_common/jquery.validate.js"),t("common/wx/popup.js"),t("biz_web/ui/checkbox.js");
var d=t("common/wx/top.js");
new d("#topTab",d.DATA.adHost).selected("adhostpay");
var _;
!function(){
e(),a();
}();
});