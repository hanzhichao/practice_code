define("cardticket/overview_new.js",["common/wx/report_util.js","common/wx/Tips.js","common/wx/Cgi.js","biz_common/moment.js","biz_web/ui/dropdown.js","common/wx/tooltips.js","common/wx/top.js","cardticket/overview_enum.js","common/wx/dialog.js","common/wx/pagebar.js","cardticket/topmenu.js","cardticket/common_template_helper.js","cardticket/social_send.js","cardticket/create_card_select.js","cardticket/common_init.js"],function(e){
"use strict";
var t=(e("common/wx/report_util.js"),e("common/wx/Tips.js"),e("common/wx/Cgi.js")),a=e("biz_common/moment.js"),n=e("biz_web/ui/dropdown.js"),s=(wx.cgiData,
e("common/wx/tooltips.js")),r=a().add("d",-7).format("YYYY-MM-DD"),c=a().add("d",-1).format("YYYY-MM-DD"),i=(e("common/wx/top.js"),
e("cardticket/overview_enum.js")),_=(e("common/wx/dialog.js"),e("common/wx/pagebar.js")),o=i.sort_key,d=i.sort_type;
e("cardticket/topmenu.js").selected("overviewpage");
var l=e("cardticket/common_template_helper.js");
!function(){
function e(){
var e=(u-1)*l;
t.get({
url:"/merchant/cardhelpmakesend?action=list",
data:{
offset:e,
limit:l,
keyword:m,
status_list:p
},
mask:!1
},function(e){
if(0==e.base_resp.ret){
var a=$.parseJSON(e.bind_list),n=$.parseJSON(e.sub_merchant_remain_quota);
n=n.list,s(a.List,e.total_count,n);
}else t.handleRet(e,{
id:64463,
key:27,
url:"/merchant/cardhelpmakesend?action=list"
});
});
}
function s(t,a,s){
$("#js_search_merchant_result").html(template.render("js_merchant_list_tpl",{
data:t,
keyword:m,
remain_data:s
}));
if(a>t.length){
new _({
container:"#js_pager",
perPage:l,
initShowPage:u,
totalItemsNum:a,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
u=t.currentPage,e();
}
});
}else $("#js_pager").html("");
new n({
container:"#js_filter_state",
label:j[p]||"所有",
data:[{
name:"所有",
value:""
},{
name:"审核中",
value:"0"
},{
name:"已通过",
value:"1"
},{
name:"未通过",
value:"2"
},{
name:"已过期",
value:"3"
}],
callback:function(t){
t!==p&&(p=t,e());
}
});
}
function i(){
var t=$.trim(w.val());
m=t,e();
}
if(window.is_assistsend){
var l=4,m="",u=1,p="",j={
0:"审核中",
1:"已通过",
2:"未通过",
3:"已过期"
},w=$("#js_search_input").keyup(function(e){
w.val()&&v.show(),wx.isHotkey(e,"enter")&&i();
});
$("#js_search_btn").click(function(){
i();
});
var v=$(".js_clear_keyword").click(function(){
v.hide(),w.val(""),m="",e();
});
e();
}else{
var f=r,h=c,k={},b=window.wx_is_can_use_sns_card,y=parseInt((a(h,"YYYY-MM-DD").unix()-a(f,"YYYY-MM-DD").unix())/86400)+10;
t.get({
url:"/merchant/cardstat?action=get_biz_effect_stat",
data:{
begin_date:f,
end_date:h,
begin:0,
count:y||100,
sort_key:o.time,
sort_type:d.asc
},
mask:!1
},function(e){
if(0==e.base_resp.ret){
{
var a=$.parseJSON(e.data).records;
a.length;
}
k=a[0]||{
receive_cnt:0,
receive_friends_cnt:0,
receive_user:0,
receive_friends_user:0,
verify_cnt:0,
verify_friends_cnt:0,
verify_user:0,
verify_friends_user:0
},k.__datatype=b?2:1,$("#js_yesterday_overview").html(template.render("js_yesterday_tpl",k));
}else t.handleRet(e,{
id:64463,
key:27,
url:"/merchant/cardstat?action=get_biz_effect_stat"
});
}),$("#js_datatype>a").click(function(){
k.__datatype=$(this).attr("data-type"),$("#js_yesterday_overview").html(template.render("js_yesterday_tpl",k)),
$("#js_datatype>a").removeClass("current"),$(this).addClass("current");
}),b||$("#js_datatype").hide();
}
}(),function(){
var a=e("cardticket/social_send.js");
$("#js_sendout").click(function(){
var e=new a({
multi:!1,
param:{
status:"3|6",
is_filter_out_apicard:1
},
sns_card_type:0,
onSendSubmit:function(){}
});
e.show();
});
var n=l.parse_assistsend_quota(wx.cgiData.quota.quota_list),r=e("cardticket/create_card_select.js");
$("#js_add_card_link").click(function(){
new r({
ispay:0,
max_card:n.max_card,
is_sns_card:window.wx_is_can_use_sns_card,
show_all_card:!0
});
}),$("#js_quota").html(n.max_card>0?'每个子商户每月可制券 <span class="text_nobreak">%s</span> 张，每张券库存不超过 <span class="text_nobreak">%s</span> 份。'.sprintf(n.max_card,n.max_sku):"你的账号因违规，暂被关闭制券权限，详请查看通知中心"),
new s({
container:$(".js_overview_ask"),
reposition:!0,
content:template.render("js_overview_ask_tpl"),
type:"hover"
}),window.is_card_money_acct_open&&t.get({
url:"/merchant/cardstat?action=get_coin_balance",
success:function(e){
0==e.base_resp.ret?$(".js_total_balance").text(e.total_coin/100):t.handleRet(e,{
id:64463,
key:27,
url:"/merchant/cardstat?action=get_coin_balance"
});
}
});
var c,i=$("#js_card_banner .card_banner");
i.length>1?($(".card_banner_wrp .card_banner:gt(0)").hide(),c=setInterval(function(){
$(".card_banner_wrp .card_banner:first").fadeOut(1e3).next().fadeIn(1e3).end().appendTo(".card_banner_wrp");
},3e3)):i.length||($("#js_card_banner").hide(),$("#js_close_banner").hide()),$("#js_close_banner").click(function(){
$(this).parent().remove(),c&&clearInterval(c);
});
}(),e("cardticket/common_init.js");
});