define("cardticket/batch_card.js",["common/wx/popup.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/tooltips.js","common/wx/tooltipsManager.js","common/qq/queryString.js","common/wx/pagebar.js","common/wx/Step.js","biz_web/ui/dropdown.js","cardticket/parse_data.js","common/wx/top.js","cardticket/store_cgi.js","common/wx/dialog.js","biz_web/ui/checkbox.js","common/wx/stopMultiRequest.js","cardticket/common_template_helper.js","cardticket/sendout.js","cardticket/create_task.js","cardticket/create_card_select.js","cardticket/send_card.js","cardticket/card_quantity.js","cardticket/social_send.js","cardticket/init_sub_merchant_list.js","cardticket/topmenu.js","cardticket/common_init.js"],function(t){
"use strict";
function e(t,e,a){
if(!t.isnew&&e){
var n=$("#js_old_quantity_tpl").popup({
title:"提示",
buttons:[{
text:"确定",
type:"primary",
click:function(){
var e=this.get().find(".js_quantity"),n=$.trim(e.val());
if(!/^[0-9]+$/.test(n)||parseInt(n)<=0)return c.err("库存必须是大于0的整数"),e.focus(),!1;
var i=1e9;
return parseInt(n)>=i?(c.err("库存不能大于10亿"),e.focus(),!1):void r.post({
url:"/merchant/electroniccardmgr",
data:{
action:"setquantity",
card_id:t.id,
value:n
}
},function(e){
0==e.base_resp.ret?(c.suc("设置库存成功"),a&&a(t),this.remove()):10037==e.base_resp.ret?c.err("子商户每张券累计只可发放2000份"):1e4==e.base_resp.ret?c.err("库存不能少于0"):r.handleRet(e,{
id:64463,
key:28,
url:"/merchant/electroniccardmgr?action=setquantity"
});
});
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
n.popup("get").find(".js_quantity").focus();
}
return t.isnew;
}
function a(){
w.show({
title:"提示",
type:"warn",
msg:"你的公众号还没有设置商户名称、商户Logo|点击“填写商户信息”进入修改页面。",
buttons:[{
text:"填写商户信息",
click:function(){
location.href=wx.url("/merchant/cardapply?action=listmerchantinfo&t=cardticket/apply_detail");
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
}
function n(t){
var e=$.trim($("#js_keyword").val());
(!t||t&&wx.isHotkey(t,"enter"))&&(location.href=e?l.replaceAll({
keyword:e
}).getUrl():l.remove("keyword").getUrl());
}
var c=(t("common/wx/popup.js"),t("common/wx/Tips.js")),r=t("common/wx/Cgi.js"),i=wx.cgiData,s=t("common/wx/tooltips.js"),o=t("common/wx/tooltipsManager.js"),_=t("common/qq/queryString.js"),d=t("common/wx/pagebar.js"),l=new _,u=(t("common/wx/Step.js"),
t("biz_web/ui/dropdown.js")),m=t("cardticket/parse_data.js"),p=(t("common/wx/top.js"),
t("cardticket/store_cgi.js")),w=(t("common/wx/popup.js"),t("common/wx/dialog.js"));
t("biz_web/ui/checkbox.js"),t("common/wx/stopMultiRequest.js");
for(var f=t("cardticket/common_template_helper.js"),h=f,g=m.parse_cardlist(i.data.card_list),j=g.card_cache,k=g.card_list,x=h.parse_assistsend_quota(wx.cgiData.quota.quota_list),v=[],b=wx.cgiData.card_dispatching_list&&wx.cgiData.card_dispatching_list.card_dispatching_list?wx.cgiData.card_dispatching_list.card_dispatching_list:[],y=0;y<b.length;y++)!!b[y].is_dispatching&&v.push(b[y].card_id);
for(var q=0;q<k.length;q++){
var D=k[q].id;
k[q].cansend=-1==v.indexOf(D)?1:0;
}
for(var U in j)j[U].cansend=-1==v.indexOf(U)?1:0;
$("#js_search_result").html(template.render("js_result_tpl",{
data:k,
state:i.cond.status,
view_mode:window.view_mode
}));
{
var A=t("cardticket/sendout.js");
t("cardticket/create_task.js");
}
$("#js_search_result").on("click",".js_sendout",function(){
var t=$(this).attr("data-cid"),a=j[t];
if(!t||!a)return!1;
if(!e(a,!0,function(){
location.href=l.replace("nodelay",1).getUrl();
}))return!1;
if(0==a.quantity)return $(this).closest("tr").find(".js_modify_quantity").click(),
!1;
var n=A({
data:a,
selectComplete:function(t){
4==t||3==t&&n.popup("remove");
}
});
p.canSendCard({
card_id:t,
success:function(t){
t===!1?(c.err("没有“审核通过”的门店。确认有至少一个“审核通过”的门店后可进行投放。"),n.popup("destroy")):t===!0&&n.popup("show");
}
});
}),$(".js_delete_card").on("click",function(t){
var e=$(this).data("cid"),a=new s({
container:this,
content:"确定要删除此卡券吗？",
type:"click",
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
r.post({
mask:!1,
url:"/merchant/electroniccardmgr",
data:{
action:"delete",
card_id:e
}
},function(t){
if("0"==t.base_resp.ret)c.suc("删除卡券成功"),location.reload();else switch(t.base_resp.ret){
default:
r.handleRet(t,{
id:64463,
key:28,
url:"/merchant/electroniccardmgr?action=delete"
});
}
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
o.removeAll();
}
}]
});
a.show(),o.removeAll(),o.add(a),window.report_click_ele(this),t.stopPropagation();
});
var C=wx.cgiData.pageInfo;
if(C.total=wx.cgiData.data.total_num,C.count&&C.total>C.count){
C.pageidx=C.begin/C.count;
{
new d({
container:"#js_pager",
first:!1,
last:!1,
midRange:5,
initShowPage:C.pageidx+1,
perPage:C.count,
totalItemsNum:C.total,
callback:function(t){
var e=t.currentPage;
return e!=C.pageidx+1&&(location.href=l.replaceAll({
begin:C.count*(e-1),
count:C.count
}).getUrl()),!1;
}
});
}
}
var I=(new u({
container:"#js_filter_state",
label:f.status_map[i.cond.status]||"全部状态",
data:[{
name:"全部状态",
value:""
},{
name:"审核中",
value:"1"
},{
name:"未通过",
value:"2"
},{
name:"待投放",
value:"3"
},{
name:"已投放",
value:"6"
},{
name:"违规下架",
value:"7"
}],
callback:function(t){
t!==i.cond.status&&(window.report_click&&window.report_click(3016),location.href=t?l.replaceAll({
status:t,
begin:0
}).getUrl():l.remove("status").getUrl());
}
}),[{
name:"全部卡券",
value:""
}]);
window.wx_is_can_use_sns_card&&I.push({
name:"朋友的券",
value:"friends,1"
}),window.wx_is_can_shake&&I.push({
name:"摇一摇",
value:"shake,1"
}),window.wx_is_intercomm_card;
var S="";
2==window.view_mode&&(S="sub_merchant,1");
var R=S?"|":"",z={};
if(z[S+R+"task,1"]="互通",z[S+R+"shake,1"]="摇一摇",z[S+R+"friends,1"]="朋友的券",I.length>1){
new u({
container:"#js_filter_tag",
label:z[i.cond.tag_filter]||"全部卡券",
data:I,
callback:function(t){
var e=S+(S&&t?"|"+t:t);
e!==i.cond.tag_filter&&(window.report_click&&window.report_click(3015),location.href=e?l.replaceAll({
tag_filter:e,
begin:0
}).getUrl():l.remove("tag_filter").getUrl());
}
});
}else $("#js_filter_tag").removeClass("dropdown_menu");
var M=t("cardticket/create_card_select.js");
$("#js_add_card,#js_add_card_link").click(function(){
return wx.cgiData.logo?void new M({
max_card:x.max_card,
ispay:wx.cgiData.ispay,
is_sns_card:window.wx_is_can_use_sns_card,
show_all_card:!0
}):(a(),!1);
});
var P=t("cardticket/send_card.js");
$("#js_import_card").click(function(){
if(!wx.cgiData.logo)return a(),!1;
var t=new P({
multi:!1,
data:null,
filter_out_expired_card:0,
neednew:!1,
noexpire:!1,
sns_card_type:0,
param:{
status:"1|2|3|6|8",
is_filter_out_apicard:1,
flag:wx.cgiData.ispay
},
selectComplete:function(t){
var e=t.id;
return!window.wx_is_can_use_sns_card&&t.is_sns_card?(c.err("暂无朋友的券的权限，导入失败"),!1):void(e&&window.open(wx.url("/merchant/electroniccardmgr?action=%s&cardid=%s&flag=%s%s".sprintf(t.is_sns_card?"addsnspage":"addpage",e,wx.cgiData.ispay,t.is_sns_card?"&is_sns_card=1":""))));
}
});
t.show();
}),$("#js_keyword").keyup(function(t){
n(t);
}).val(wx.cgiData.cond.keyword.html(!1)),$("#js_search").click(function(){
n();
});
var T={};
if(i.refuse_reasons&&i.refuse_reasons.refuse_reasons)for(var N=i.refuse_reasons.refuse_reasons,y=0;y<N.length;y++){
var O=N[y];
T[O.card_id]=O.refuse_reason;
}
var B=t("cardticket/card_quantity.js");
new B({
container:".js_modify_quantity",
cache_card:j,
max_sku_for_eachcard:x&&x.max_sku||1e4,
quantityChange:function(){
setTimeout(function(){
location.href=l.replace("nodelay",1).getUrl();
},3e3);
},
before:function(t){
var a=j[t];
return e(a,!0,function(){
location.href=l.replace("nodelay",1).getUrl();
});
}
});
var s=t("common/wx/tooltips.js");
$(".js_refuse_reason").each(function(){
{
var t=$(this).data("cid");
new s({
container:this,
reposition:!0,
content:h.nl2br(T[t]||"")||"无",
type:"hover"
});
}
}),$(".js_swipe_card_ask").each(function(){
var t=$(this).data("status"),e="",a=$(this).data("cid");
if(1==t){
var n=j[a];
e=n.pay_info.use_mid_list.length<=1?"请点击自审，前往微信支付平台登录制券商户号提交本商户审核":"请点击自审，前往微信支付平台登录制券商户号提交本商户审核，并根据可用商户号审核进度提示，完成所有审核任务";
}else if(2==t){
for(var n=j[a],c=[],r=n.pay_info.last_audit_item,i=0;i<r.mid_list.length;i++)r.mid_list[i].use_mid!=n.pay_info.create_mid&&c.push("商户号(%s)  %s".sprintf(r.mid_list[i].use_mid,1!=r.mid_list[i].state?"驳回":"通过"));
e="%s<br>请重新添加库存并发起审核流程".sprintf(c.join("<br>"));
}else 3==t?e="请点击激活，前往微信支付平台登录制券商户号激活本代金券":4==t&&(e="请先添加库存，添加后将发起微信支付平台商户审核");
new s({
container:this,
reposition:!0,
content:e,
type:"hover"
});
}),$("#js_left_money_quota").text(parseInt(wx.cgiData.left_money_quota/100)),$("#js_money_quota_permonth").text(parseInt(wx.cgiData.money_quota_permonth/100)),
function(){
var e=t("cardticket/social_send.js");
$("#js_sendout").click(function(){
var t=new e({
multi:!1,
param:{
status:"3|6",
is_filter_out_apicard:1
},
sns_card_type:0,
onSendSubmit:function(){}
});
t.show();
}),$("#js_quota").html(x.max_card>0?'每个子商户每月可制券 <span class="text_nobreak">%s</span> 张，每张券库存不超过 <span class="text_nobreak">%s</span> 份。'.sprintf(x.max_card,x.max_sku):"你的账号因违规，暂被关闭制券权限，详请查看通知中心"),
window.is_card_money_acct_open&&r.get({
url:"/merchant/cardstat?action=get_coin_balance",
success:function(t){
0==t.base_resp.ret?$(".js_total_balance").text(t.total_coin/100):r.handleRet(t,{
id:64463,
key:28,
url:"/merchant/cardstat?action=get_coin_balance"
});
}
});
}();
var H=$("#js_filter_merchant"),L=t("cardticket/init_sub_merchant_list.js");
H.length&&new L({
container:H,
sub_merchant_brand_name:i.cond.sub_merchant_name,
sub_merchant_id:i.cond.sub_merchant_id,
selectComplete:function(t){
window.report_click&&window.report_click(3017),t?t.Id!=i.cond.sub_merchant_id&&(location.href=l.replaceAll({
sub_merchant_id:t.Id,
sub_merchant_name:t.BrandName
}).remove("tag_filter").getUrl()):location.href=l.remove("sub_merchant_id").remove("sub_merchant_name").replaceAll({
tag_filter:"sub_merchant,1"
}).getUrl();
}
}),t("cardticket/topmenu.js").selected("cardmgr"),t("cardticket/common_init.js");
});