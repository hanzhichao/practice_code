define("cardticket/data/store.js",["common/wx/report_util.js","cardticket/topmenu.js","common/wx/Tips.js","common/wx/Cgi.js","biz_common/moment.js","cardticket/overview_enum.js","biz_web/ui/dropdown.js","cardticket/select_shop_dropdown.js","cardticket/init_card_list.js","cardticket/init_sub_merchant_list.js","common/wx/tooltips.js"],function(t){
"use strict";
function e(){
new j({
has_all_option:!1,
container:"#js_all_card",
need_member_card:1,
sub_merchant_id:z,
callback:function(t,e){
function a(){
R=new w({
container:"#js_chart_type",
label:"",
data:n,
callback:function(t){
D=t,r(),window.report_click&&window.report_click(9013);
}
}).selected(0);
}
C=t,I.url="/merchant/entityshop?action=list_by_card_id&card_id="+t,f(I);
var n;
n=[{
name:"领取次数",
value:"rec_cnt"
},{
name:e&&10==e.type?"积分变动次数":"使用次数",
value:"use_cnt"
},{
name:"买单次数",
value:"pay_cnt"
},{
name:"应收金额",
value:"originalfee"
},{
name:"实收金额",
value:"fee"
},{
name:"优惠额",
value:"discount_fee"
}],Y=e.type,a();
}
}),$("#js_all_store").html(""),$("#js_chart_type").html("");
}
function a(){
$("#js_download").attr("href",wx.url("/merchant/cardstat?action=download_entity_shop_stat&begin_date=%s&end_date=%s&poiid=%s%s&cardid=%s").sprintf(v,g,x,z?"&sub_merchant_id="+z:"",C));
}
function n(){
var t={
begin_date:v,
end_date:g,
begin:0,
count:9999999,
poiid:x,
cardid:C
};
z&&(t.sub_merchant_id=z),a(),_.get({
url:"/merchant/cardstat?action=get_entity_shop_stat",
data:t
},function(t){
if(T=!0,0==t.base_resp.ret){
console.log(e);
var e=$.parseJSON(t.data);
k=e.summary_records;
for(var a=0;a<k.length;a++)k[a].discount_fee=k[a].originalfee-k[a].fee;
var n=e.total_count;
n>u?c.initPager({
total_count:n,
container:"#js_pager",
count:u,
currentPage:y,
callback:function(t){
t!=y&&(y=t,i());
}
}):$("#js_pager").html(""),i(),r();
}else _.handleRet(t,{
id:64463,
key:40,
url:"/merchant/cardstat?action=get_entity_shop_stat"
});
});
}
function i(){
for(var t=(y-1)*b,e=[],a=t,n=b+t;n>a&&a<k.length;a++)e.push(k[a]);
$("#js_overview_data").html(template.render("js_data_overview_tpl",{
list:e,
card_type:Y
}));
}
function o(t){
for(var e=0;e<F.length;e++)if(t==F[e])return!0;
}
function r(){
var t=[],e=k,a=k.length;
if(a>0){
for(var n=0;a>n;n++){
var i=e[a-n-1];
t.push({
y:o(D)?i[D]/100:i[D],
name:i.ref_date,
date:i.ref_date
});
}
c.initChart({
domId:"chartContain",
data:t,
isFee:o(D)
});
}else $("#chartContain").html(s&&s.length||!T?'<p class="empty_tips">暂无数据</p>':'<p class="empty_tips">暂无门店数据。你可以到“%s门店管理%s”功能中添加经营中的门店或检查卡券是否关联了适用门店。</p>'.sprintf("<a href='"+wx.url("/merchant/entityshop?action=list")+"'>","</a>"));
}
var c=t("common/wx/report_util.js");
t("cardticket/topmenu.js").selected("card_data");
var s,_=(t("common/wx/Tips.js"),t("common/wx/Cgi.js")),d=t("biz_common/moment.js"),l=(wx.cgiData,
"YYYY-MM-DD"),m=d().add("d",-7).format(l),p=d().add("d",-1).format(l),u=10,h=t("cardticket/overview_enum.js"),w=t("biz_web/ui/dropdown.js"),f=(h.sort_key,
t("cardticket/select_shop_dropdown.js")),j=t("cardticket/init_card_list.js"),v=(h.sort_type,
m),g=p,k=[],b=u,y=1,x="",C="",D="",z="",Y=0,R=null,T=!1,I={
container:"#js_all_store",
show_all_shop:!1,
callback:function(t){
x=t,n();
},
initComplete:function(t){
s=t.shop_list,s&&s.length||n(),window.report_click&&window.report_click(9012);
}
},M=t("cardticket/init_sub_merchant_list.js"),P=$("#js_select_sub_merchant");
P.length&&new M({
container:P,
selectComplete:function(t){
z=t?t.Id:"",e();
}
}),e(),c.initDateRange({
begintime:v,
endtime:g,
isTodayValid:!1,
dropDom:"#js_date_filter",
dateDom:"#js_dateRange",
showUnlimit:!0,
callback:function(t,e){
v=t,g=e,y=1,n(),window.report_click&&window.report_click(9014);
}
});
var F=["originalfee","fee","discount_fee"],J=t("common/wx/tooltips.js");
new J({
container:$("#js_overview_ask"),
reposition:!0,
content:template.render("js_overview_ask_tpl"),
type:"hover"
});
});