define("cardticket/overview_batch.js",["common/wx/top.js","common/wx/Tips.js","common/wx/Cgi.js","biz_common/moment.js","biz_web/ui/dropdown.js","cardticket/overview_enum.js","common/wx/report_util.js","cardticket/topmenu.js","cardticket/common_template_helper.js","cardticket/init_sub_merchant_list.js","cardticket/common_init.js"],function(e){
"use strict";
var t=(e("common/wx/top.js"),e("common/wx/Tips.js")),a=e("common/wx/Cgi.js"),n=e("biz_common/moment.js"),r=e("biz_web/ui/dropdown.js"),i=wx.cgiData,c=n().add("d",-7).format("YYYY-MM-DD"),o=n().add("d",-90).unix(),s=n().add("d",-1).format("YYYY-MM-DD"),m=(e("common/wx/top.js"),
e("cardticket/overview_enum.js")),d=e("common/wx/report_util.js"),_=m.sort_key,l=m.sort_type;
e("cardticket/topmenu.js").selected("card_data"),e("cardticket/common_template_helper.js"),
template.helper("$tofix",function(e,t){
if(!e.verify_cnt)return 0;
var a=e.verify_friends_cnt/e.verify_cnt*100,n=new RegExp("\\.[\\d]{"+t+",}");
return n.test(a+"")?a.toFixed(t):a;
}),function(){
function m(){
new r({
container:"#js_filter_type",
label:"全部类型",
data:Y,
callback:function(e){
e!=h&&(h=e,p=1,u());
}
}).selected(h+"");
}
function u(){
$("#js_download").attr("href",wx.url("/merchant/cardstat?action=cardstatdownload&start_time=%s&end_time=%s&sort_key=%s&sort_type=%s&ispay=%s&card_type=%s%s&view_mode=%s").sprintf(b,f,_.time,l.desc,wx.cgiData.ispay,h,D?"&sub_merchant_id="+D:"",y));
var e={
start_time:b,
end_time:f,
begin:(p-1)*k,
count:k,
sort_key:j,
sort_type:g,
card_type:h,
card_status:x,
ispay:wx.cgiData.ispay,
view_mode:y
};
D&&(e.sub_merchant_id=D),a.get({
url:"/merchant/cardstat?action=cardstat",
data:e,
mask:!1
},function(e){
if(0==e.base_resp.ret){
{
var t=$.parseJSON(e.data),n=t.list;
n.length;
}
$("#js_overview_list").html(template.render("js_overview_tpl",{
data:n
})),w=t.total_count,d.initPager({
total_count:w,
container:"#js_pagebar",
count:k,
currentPage:p,
callback:function(e){
e!=p&&(p=e,u());
}
}),m();
}else a.handleRet(e,{
id:64463,
key:41,
url:"/merchant/cardstat?action=cardstat"
});
});
}
function v(){
$("#js_download_membercard").attr("href",wx.url("/merchant/cardstat?action=membercardoverviewstatdownload&begin_date=%s&end_date=%s").sprintf(R,z));
var e={
begin_date:R,
end_date:z,
begin:(p-1)*k,
count:k
};
a.get({
url:"/merchant/cardstat?action=membercardoverviewstat",
data:e,
mask:!1
},function(e){
if(0==e.base_resp.ret){
{
var n=$.parseJSON(e.data),r=n.record;
r.length;
}
$("#js_membercard_overview").html(template.render("js_membercard_overview_tpl",{
data:r
})),w=n.total_count,d.initPager({
total_count:w,
container:"#js_member_pagebar",
count:k,
currentPage:p,
callback:function(e){
e!=p&&(p=e,v());
}
});
}else a.handleRet(e,{
id:64463,
key:41,
url:"/merchant/cardstat?action=membercardoverviewstat"
}),t.err("系统繁忙，请稍后重试");
});
}
var w,p=1,b=c,f=s,j=_.time,g=l.desc,k=10,h="",x="",y=window.view_mode,D="";
if(d.initDateRange({
begintime:b,
endtime:f,
dropDom:"#js_date_filter",
dateDom:"#js_dateRange",
showUnlimit:!0,
callback:function(e,t){
b=e,f=t,u();
},
beforeSelect:function(e){
var a=n(e,"YYYY-MM-DD").unix();
return o>a?(t.err("一次最多可选90天"),!1):void 0;
}
}),d.initRankOnce({
callback:function(e){
j=e.sortkey,g=e.sorttype,p=1,u();
}
}),i.ispay)var Y=[{
name:"全部类型",
value:""
},{
name:"优惠券",
value:"0"
},{
name:"团购券",
value:"1"
}];else var Y=[{
name:"全部类型",
value:""
},{
name:"优惠券",
value:"0"
},{
name:"代金券",
value:"4"
},{
name:"团购券",
value:"1"
},{
name:"折扣券",
value:"2"
},{
name:"兑换券",
value:"3"
}];
u();
var M=e("cardticket/init_sub_merchant_list.js");
if(2==window.view_mode&&new M({
container:"#js_select_sub_merchant",
selectComplete:function(e){
D=e?e.Id:"",u();
},
defaultLabel:"全部子商户"
}),1==window.view_mode&&window.wx_is_membercard){
var R=c,z=s,j=_.time,g=l.desc;
d.initDateRange({
begintime:R,
endtime:z,
dropDom:"#js_member_date_filter",
dateDom:"#js_member_dateRange",
showUnlimit:!0,
callback:function(e,t){
R=e,z=t,v();
},
beforeSelect:function(e){
var a=n(e,"YYYY-MM-DD").unix();
return o>a?(t.err("一次最多可选90天"),!1):void 0;
}
}),v();
}
}(),e("cardticket/common_init.js");
});