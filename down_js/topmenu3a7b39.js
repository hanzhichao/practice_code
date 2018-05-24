define("cardticket/topmenu.js",["biz_common/moment.js","common/wx/top.js","biz_web/ui/dropdown.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/popup.js","cardticket/common_init.js"],function(e){
"use strict";
function t(e){
for(var t=0;t<_.length;t++)if(_[t].id==e)return _.splice(t,1);
}
function a(e,t){
this.menudata=t,this.top=new r(e,t),$(".js_top[data-id=cardsend] a").append('<i class="icon_common new"></i>'),
$(".js_top[data-id=cardtools] a").append('<i class="icon_common new"></i>');
}
function i(e){
e=e.replace(/^https?:\/\/[^\/]+/,""),/(.+?)(\?|$)/.test(e);
var t=RegExp.$1;
/action=([^&]+)(&|$)/i.test(e);
var a=RegExp.$1||"";
return{
cgi:t.replace(/\/$/,""),
action:a
};
}
{
var c=e("biz_common/moment.js"),r=e("common/wx/top.js"),n=e("biz_web/ui/dropdown.js"),s=e("common/wx/Tips.js"),o=template.compile('<div class="page_msg small default tl">                <div class="inner group">                    <span class="msg_icon_wrp">                        <i class="icon_msg info"></i>                    </span>                    <div class="msg_content">                        <h4>{if mode==1}注意：你将切换到自制模式{else}注意：你将切换到代制模式{/if}</h4>                        <p>&nbsp;</p>                        {if mode==1}                        <p>切换后将以『%s』商户名称制卡券，卡券提供的优惠商品和服务，必须由该第三方公众号直接提供。</p>                        <p>自制模式下，将不能看到代制模式的子商户数据。若需进行子商户管理，请在卡券功能右上角点击切换到代制模式。</p>                        {else}                        <p>切换后可为该账号名下已授权的子商户制、发券，也可接入更多子商户。</p>                        <p>代制模式下，将不能看到自制模式的数据。若第三方公众号直接提供自己的卡券商品和服务，请在卡券功能右上角点击切换到自制模式。</p>                        {/if}                    </div>                </div>            </div>'.sprintf("{brand_name}")),d=e("common/wx/Cgi.js"),m=d,l="YYYY-MM-DD";
c(c().add("d",-7).format(l),l).unix(),c(c().format(l),l).add("d",1).unix()-1;
}
e("common/wx/popup.js"),$(".js_helplink_tips").html('<div class="js_view_mode_switch"></div>&nbsp;&nbsp;<a data-actionid="1002" href="'+wx.url("/merchant/cardmerchantprofile?action=list&lang=zh_CN")+'">商户信息</a><i class="icon_common js_has_friend_card_tips" style="display:none;"></i><span class="mini_tips weak_text">&nbsp;|&nbsp;</span> <a href="'+wx.url("/cgi-bin/readtemplate?t=cardticket/faq_tmpl&type=info")+'" target="_blank" data-actionid="1003">微信卡券相关文档 </a><span class="mini_tips weak_text">&nbsp;|&nbsp;</span> <a target="_blank" href="http://support.qq.com/discuss/1161_1.shtml" data-actionid="1004">意见反馈</a>');
var _=[{
id:"overviewpage",
name:"卡券概况",
url:"/merchant/cardstat?action=overviewpage&t=cardticket/overviewpage"
},{
id:"cardmgr",
name:"优惠券",
url:"/merchant/electroniccardmgr?action=batch&t=cardticket/batch_card&flag=0"+(2==window.view_mode?"&tag_filter=sub_merchant,1":"&sub_merchant_id=0")
},{
id:"cardmgr_pay",
name:"付费券",
url:"/merchant/electroniccardmgr?action=batch&t=cardticket/batch_card&flag=1",
sub:[{
name:"付费券管理",
url:"/merchant/electroniccardmgr?action=batch&t=cardticket/batch_card&flag=1",
reg:/action=(batch|detail|addpage)/
},{
name:"交易记录",
url:"/merchant/cardorder?action=getlist&t=cardticket/pay_card_record&last_days=30&count=10&offset=0",
reg:/action=(getlist|getdetail)/
}]
},{
id:"cardmgr_member",
name:"会员卡",
url:"/merchant/membercardmgr?action=overview&t=cardticket/member_card_index",
sub:[{
name:"会员卡管理",
url:"/merchant/membercardmgr?action=overview&t=cardticket/member_card_index",
reg:/action=(member_detail|member_add|overview)/
},{
name:"会员管理",
url:"/merchant/membercardmgr?action=user_list&t=cardticket/member_manage",
reg:/action=(user_list|search_user|user_detail)/
}]
},{
id:"cardsend",
name:"卡券投放",
url:"/merchant/cardsend?action=list&t=cardticket/social_sendout"
},{
id:"permission",
name:"卡券核销",
url:"/merchant/carduse?action=listchecker&t=cardticket/permission",
sub:[{
name:"手机核销",
url:"/merchant/carduse?action=listchecker&t=cardticket/permission"
},{
name:"网页核销",
url:"/merchant/carduse?action=listcarduse&t=cardticket/destroy_ticket",
target:"_blank"
},{
name:"自助核销配置",
url:"/merchant/cardsecuritycodemgr?action=list",
target:"_blank"
}]
},{
id:"cardtools",
name:"经营工具",
url:"/merchant/cardoptools?action=overview&t=cardticket/tools_index"
},{
id:"card_data",
name:"数据与对账",
url:"/merchant/cardstat?action=biz_effect_page&t=cardticket/data_overview",
sub:[{
name:"经营概况",
url:"/merchant/cardstat?action=biz_effect_page&t=cardticket/data_overview",
reg:/action=(biz_effect_page|entity_shop_page)/
},{
name:"卡券数据",
url:"/merchant/cardstat?action=cardstatpage&t=cardticket/overview_batch&ispay=0",
reg:/action=(cardstatpage|carddetailstatpage)/
},{
name:"核销记录",
url:"/merchant/carduserecord?action=listrecord&t=cardticket/carduse_record",
reg:/\/merchant\/carduserecord\?action=listrecord/
}]
}],p={
cardintercomm:window.wx_is_intercomm_card,
assistsend:!1,
cardmgr_member:window.wx_is_membercard&&!window.is_assistsend,
cardmgr_pay:window.wx_is_send_payment_card&&!window.is_assistsend
};
for(var u in p)p[u]||t(u);
var w=template.compile('<ul class="links">             {each sub as item i}            <li class="links_item {if item.selected}selected{/if}"><a {if item.target}target="{item.target}"{/if} href="{item.url}">{item.name}</a></li>            {/each}</ul>'),h=$(".js_helplink_tips .js_view_mode_switch");
if(window.wx_is_can_use_help_make_and_send&&h.length)var g=new n({
container:h,
label:window.is_assistsend?"代制模式":"自制模式",
data:[{
name:"自制模式",
value:1
},{
name:"代制模式",
value:2
}],
callback:function(e){
var t=!1,a=e;
$(o({
mode:e,
brand_name:window.merchant_brand_name
})).popup({
title:"切换模式",
buttons:[{
text:"确定",
type:"primary",
click:function(){
t||(window.report_click&&window.report_click(1001),t=!0,2==a?m.post({
url:"/merchant/cardapply",
data:{
action:"switch_view_mode",
view_mode:a
},
complete:function(){
t=!1;
}
},function(e){
0==e.base_resp.ret?(s.suc("已切换到代制模式"),location.href=wx.url("/merchant/cardstat?action=overviewpage"),
m.handleRet(e,{
id:64463,
key:25,
showMsg:!1,
url:"/merchant/cardapply?action=switch_view_mode"
})):m.show(e);
}):m.post({
url:"/merchant/cardapply",
data:{
action:"switch_view_mode",
view_mode:a
},
complete:function(){
t=!1;
}
},function(e){
0==e.base_resp.ret?(s.suc("已切换到自制模式"),location.href=wx.url("/merchant/cardstat?action=overviewpage")):(m.handleRet(e,{
id:64463,
key:25,
showMsg:!1,
url:"/merchant/cardapply?action=switch_view_mode"
}),m.show(e));
}));
}
}],
autoShow:!0,
onHide:function(){
t=!1,g.value=window.view_mode,$(".js_helplink_tips .js_view_mode_switch .jsBtLabel").text(window.is_assistsend?"代制模式":"自制模式"),
this.remove();
}
});
}
});
return a.prototype.selected=function(e){
var t=[],a=this.menudata;
if("number"==typeof e)t=_[e]||[];else{
/(ispay|flag)=1/.test(location.href)&&!/_pay$/.test(e)&&(e+="_pay");
for(var c=0;c<a.length;c++)if(a[c].id==e){
t=a[c];
break;
}
}
if(this.top.selected(e),t.sub){
for(var c=0;c<t.sub.length;c++){
var r=t.sub[c];
if(r.reg)r.reg.test(location.href)&&(r.selected=!0);else{
var n=r.url,s=location.href,o=i(n),d=i(s);
o.cgi&&o.action&&o.cgi==d.cgi&&o.action==d.action&&(r.selected=!0);
}
r.url=wx.url(r.url);
}
$("#js_sub_menu").html(w(t));
}
},e("cardticket/common_init.js"),new a("#topTab",_);
});