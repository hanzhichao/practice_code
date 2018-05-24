define("cardticket/init_card_list.js",["common/wx/Cgi.js","cardticket/overview_enum.js","biz_web/ui/dropdown.js","cardticket/parse_data.js","cardticket/send_card.js","common/wx/Tips.js"],function(e){
"use strict";
function a(e){
e=$.extend(!0,{
count:10,
card_id:"",
has_all_option:!0,
card_name:"",
initComplete:$.noop,
ispay:2,
need_member_card:0,
sub_merchant_id:void 0
},e);
var a={
begin:0,
count:e.count,
flag:e.ispay,
need_member_card:e.need_member_card
};
1==window.view_mode?a.sub_merchant_id=0:e.sub_merchant_id?a.sub_merchant_id=e.sub_merchant_id:a.tag_filter="sub_merchant,1",
c.get({
url:"/merchant/electroniccardmgr?action=batch",
data:a
},function(a){
if(0==a.base_resp.ret){
var c=$.parseJSON(a.batch_card),i=c.card_list;
e.card_list=n.parse_cardlist(i).card_list||[],e.total_count=c.total_num,t(e);
}else _.err("系统繁忙，请稍后重试");
});
}
function t(e){
var a=e.card_list,t=[];
e.has_all_option&&t.push({
name:"全部卡券",
value:""
});
for(var c=0;c<a.length;c++)t.push({
name:a[c].title,
value:a[c].id
}),o[a[c].id]=a[c];
e.total_count>a.length&&t.push({
name:"更多卡券",
value:s
}),t.length||t.push({
name:"暂无数据",
value:""
});
var i=new d({
container:e.container,
label:e.card_name,
data:t,
callback:function(a){
a&&(a==s||a!=e.card_id&&(e.card_id=a,e.callback&&e.callback(e.card_id,o[a])));
}
}).selected(e.card_id||0);
i.bt.on("click",function(){
$(".ta_calendar").hide();
}),i.dropdown.find(".jsDropdownItem[data-value="+s+"]").click(function(){
new r({
multi:!1,
data:null,
filter_out_expired_card:0,
neednew:!1,
sns_card_type:0,
param:{
status:"1|2|3|6|8",
flag:wx.cgiData&&wx.cgiData.ispay||0,
need_member_card:e.need_member_card
},
view_mode:window.view_mode,
sub_merchant_id:e.sub_merchant_id||void 0,
editquantity:!1,
onHide:function(){
this.__success||i.selected(e.card_id),this.destroy();
},
selectComplete:function(a){
a&&(i.bt.find(".jsBtLabel").html(a.title),this.__success=!0,e.card_id=a.id,e.callback&&e.callback(e.card_id,a));
}
}).show();
}),e.initComplete&&e.initComplete();
}
var c=e("common/wx/Cgi.js"),i=e("cardticket/overview_enum.js"),d=(i.sort_key,e("biz_web/ui/dropdown.js")),n=(i.sort_type,
e("cardticket/parse_data.js")),r=e("cardticket/send_card.js"),_=e("common/wx/Tips.js"),s="-_______more_card__",o={};
return a;
});