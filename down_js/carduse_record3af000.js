define("cardticket/carduse_record.js",["common/wx/report_util.js","common/wx/top.js","common/wx/Tips.js","common/wx/Cgi.js","biz_common/moment.js","tpl/cardticket/card_use_record_detail.html.js","cardticket/overview_enum.js","biz_web/ui/dropdown.js","cardticket/select_shop_dropdown.js","cardticket/common_template_helper.js","cardticket/topmenu.js","cardticket/init_sub_merchant_list.js","cardticket/common_init.js"],function(e){
"use strict";
function t(){
$("#js_download").attr("href",wx.url("/merchant/carduserecord?action=download&start_time=%s&end_time=%s&code="+(y||"")+"&card_id="+(h||"")+"&sort_type=%s&sort_key=%s&card_type=%s&wx_poi_uid=%s&is_sns_card=%s%s&use_type=%s&source=%s&record_type=%s").sprintf(o(j,a).unix(),o(k,a).add("d",1).unix()-1,M,T,x,S,2==P?"":D,R?"&sub_merchant_id="+R:"",z,Y,P||1));
}
function c(){
var e={
start_time:o(j,a).unix(),
end_time:o(k,a).add("d",1).unix()-1,
sort_type:M,
sort_key:T,
begin:(b-1)*v,
card_type:x,
card_id:h,
count:v,
code:y,
is_sns_card:2==P?"":D,
wx_poi_uid:S,
use_type:z,
source:Y
};
R&&(e.sub_merchant_id=R),t(),r.get({
url:"/merchant/carduserecord?action=getrecord",
data:e
},function(e){
if(0==e.base_resp.ret){
var t=$.parseJSON(e.record),o=t.record_list,a=t.total_count;
f=o,$("#js_record_list").html(template.render("js_record_tpl",{
list:o,
card_type:x,
view_mode:window.view_mode,
record_type:P
})),i.initPager({
total_count:a,
container:"#js_pager",
count:d,
currentPage:b,
callback:function(e){
e!=b&&(b=e,c());
}
}),10==x?$("#js_delta_bonus").show():$("#js_delta_bonus").hide();
}else r.handleRet(e,{
id:64463,
key:42,
url:"/merchant/carduserecord?action=getrecord"
});
});
}
var i=e("common/wx/report_util.js"),r=(e("common/wx/top.js"),e("common/wx/Tips.js"),
e("common/wx/Cgi.js")),o=e("biz_common/moment.js"),a=(wx.cgiData,"YYYY-MM-DD"),n=o().add("d",-6).format(a),s=o().format(a),d=10,_=e("tpl/cardticket/card_use_record_detail.html.js"),l=e("cardticket/overview_enum.js"),m=e("biz_web/ui/dropdown.js"),p=l.sort_key,u=l.sort_type,w=e("cardticket/select_shop_dropdown.js");
e("cardticket/common_template_helper.js"),e("cardticket/topmenu.js").selected("card_data");
var j=n,k=s,h="",f=[],y="",v=d,b=1,x="10",g=x,C="0|1|2|3|4|10",S="",D=0,R="",z="0|2|3|4|5|6|7",Y="",I=z,P=1,T=p.time,M=u.desc;
new m({
data:[{
name:"全部",
value:0
},{
name:"自助买单",
value:1
},{
name:"激活",
value:4
},{
name:"自助核销",
value:5
},{
name:"手机核销",
value:103
},{
name:"网页核销",
value:101
},{
name:"API核销",
value:102
}],
label:"全部",
container:"#js_filter_usetype",
callback:function(e){
e>100?(z=I,Y=e%100,z="0|3"):e>0?(z=1==e?"6|7":e,Y=""):(z=I,Y=""),b=1,c(),window.report_click&&window.report_click(9023);
}
}),$(".js_typeSelect").click(function(){
var e=$(this).attr("type");
P=e,$(".js_typeSelect").removeClass("selected"),$(this).addClass("selected"),1==P?($("#js_filter_usetype").show(),
$("#js_filter_usetype_title").show(),$("#js_cardtype").show(),$("#js_cardtype_title").show(),
x=g,z=I):($("#js_filter_usetype").hide(),$("#js_filter_usetype_title").hide(),$("#js_cardtype").hide(),
$("#js_cardtype_title").hide(),g=x,x=C,z=1,Y=""),window.report_click&&window.report_click(9020);
});
var O=[];
1==window.view_mode&&window.wx_is_membercard&&O.push({
name:"会员卡",
value:"1"
}),window.wx_is_can_use_sns_card&&O.push({
name:"朋友的券",
value:"2"
}),O.push({
name:"普通券",
value:"3"
}),new m({
data:O,
label:"优惠券",
container:"#js_cardtype",
callback:function(e){
1==e?(x=10,D=0):2==e?(x="0|1|2|3|4",D=1):3==e&&(x="0|1|2|3|4",D=0),y="",$("#js_input").val(y),
b=1,c(),window.report_click&&window.report_click(9020);
}
}).selected(0),$("#js_clear_filter").click(function(){
window.report_click&&window.report_click(9025),location.reload();
}),i.initDateRange({
begintime:j,
endtime:k,
isTodayValid:!0,
dropDom:"#js_date_filter",
dateDom:"#js_dateRange",
showUnlimit:!0,
callback:function(e,t){
j=e,k=t,y="",b=1,$("#js_input").val(y),c();
},
dropSelect:function(){
window.report_click&&window.report_click(9021);
},
dateSelect:function(){
window.report_click&&window.report_click(9022);
}
}),function(){
w({
container:"#js_all_store",
callback:function(e){
S=e,y="",b=1,$("#js_input").val(y),c(),window.report_click&&window.report_click(9024);
}
});
}(),function(){
var t=$("#js_select_sub_merchant"),i=e("cardticket/init_sub_merchant_list.js");
t.length&&new i({
container:t,
selectComplete:function(e){
R=e?e.Id:"",c(),window.report_click&&window.report_click(9028);
}
});
}(),i.initRankOnce({
container:".js_rankFlag",
callback:function(e){
T=e.sortkey,M=e.sorttype,b=1,c();
}
}),$("#js_carduse_detail").on("click",".js_goback",function(){
$("#js_main").show(),$("#js_carduse_detail").hide();
}),$("#js_main").on("click",".js_carduse_detail",function(){
var e=$(this).data("idx"),t=f[e];
t&&($("#js_main").hide(),t.view_mode=window.view_mode,t.record_type=P,t.filter_card_type=x,
$("#js_carduse_detail").html(template.compile(_)(t)).show());
}),$(".js_typeSelect").click(function(){
$(this).attr("type");
$(".js_typeSelect").parent().removeClass("selected"),$(this).parent().addClass("selected"),
b=1,c();
}),$("#js_search").click(function(){
var e=$.trim($("#js_input").val());
y=encodeURIComponent(e.replace(/-/g,"")),c();
}),e("cardticket/common_init.js");
});