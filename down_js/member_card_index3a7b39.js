define("cardticket/member_card_index.js",["cardticket/sendout.js","cardticket/topmenu.js","cardticket/common_template_helper.js","common/wx/pagebar.js","common/wx/Cgi.js","cardticket/parse_data.js","common/wx/popover.js"],function(e){
"use strict";
function r(){
s.get({
url:"/merchant/electroniccardmgr?action=batch",
data:{
only_need_member_card:1,
sub_merchant_id:0,
begin:_,
count:d
}
},function(e){
if(0==e.base_resp.ret){
a.card_list="string"==typeof e.batch_card?$.parseJSON(e.batch_card):e.batch_card;
var t=o.parse_cardlist(a.card_list.card_list);
m=t.card_list,i=t.card_cache,n=a.card_list.total_num;
}else s.show(e),s.handleRet(e,{
id:64463,
key:30,
showMsg:!1,
url:"/merchant/electroniccardmgr?action=batch"
});
window.member_card_id?$("#js_has_member_card_tips").show():($("#js_hasnot_member_card_tips").show(),
$(".js_hasnot_member_card_tips").show(),n>0&&$("#js_btn_create_member_card").addClass("btn_default").removeClass("btn_primary").find(".add_white").remove()),
$("#js_member_card_list").html(template.render("js_member_card_list_tpl",{
card_list:m
})),n>d?(new c({
container:$("#js_pager"),
perPage:d,
initShowPage:parseInt(_/d)+1,
totalItemsNum:n,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var t=e.currentPage;
_=(t-1)*d,r();
}
}),$("#js_pager").show()):$("#js_pager").hide();
});
}
var t=e("cardticket/sendout.js");
e("cardticket/topmenu.js").selected("cardmgr_member");
var a=(e("cardticket/common_template_helper.js"),wx.cgiData),c=e("common/wx/pagebar.js"),s=e("common/wx/Cgi.js"),o=e("cardticket/parse_data.js"),_=0,d=5,m=[],i={},n=0;
$("#js_member_card_list").on("click",".js_sendout",function(){
var e=$(this).attr("data-cid"),r=i[e];
if(!e||!r)return!1;
var a=t({
data:r,
selectComplete:function(){
a.popup("remove");
}
});
a.popup("show");
});
var l=e("common/wx/popover.js");
$("#js_membercard_demo").hover(function(){
new l({
content:$("#js_membercard_demo_tpl").html(),
dom:$("#js_membercard_demo"),
hover:!0,
addCls:"qr_popover"
}),window.report_click&&window.report_click(6001);
}),r();
});