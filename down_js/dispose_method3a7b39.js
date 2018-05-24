define("cardticket/add/dispose_method.js",["common/qq/events.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/dialog.js","biz_web/ui/dropdown.js","cardticket/tools/tools_cgi.js","cardticket/tools_add_dispel_code.js"],function(e){
"use strict";
function t(e){
var t=[];
return e.each(function(){
$(this).prop("checked")&&t.push($(this).val());
}),t;
}
function i(t){
function i(e){
var t=e.values()[0];
$("#js_hidden_code_type").val(t);
}
function c(e){
$("#js_hidden_swipe_card").val(0),$("#js_hidden_card_pay_money").val(0),2==e?($(".js_use_card_button").text("立即使用"),
$("#js_hidden_code_type").val(1e4),$("#js_hidden_dispose_method").val(1)):($("#js_hidden_dispose_method").val(0),
1==e?($("#js_hidden_card_pay_money").val(1),$("#js_hidden_code_type").val(2),$(".js_use_card_button").text("快速买单"),
$("#js_wepay_item").show(),window.report_click&&window.report_click(9030)):4==e?($(".js_use_card_button").text("刷卡买单"),
$("#js_wepay_item").show(),$("#js_hidden_code_type").val(1e4),$("#js_hidden_swipe_card").val(1)):(i(x),
$("#js_hidden_card_pay_money").val(0),$(".js_use_card_button").text("使用"),$("#js_wepay_item").hide())),
e||$(".js_dispose_method_tips",g).hide(),e&&e!=j.dispose_method&&($(".js_dispose_method_tips",g).hide(),
$(".js_dispose_method_tips_"+e,g).show(),$(".js_dispose_method_sub",g).hide(),$(".js_dispose_method_sub_"+e,g).show(),
n.trigger("dispose_method:change",e)),j.dispose_method=e;
}
function _(){
g.find(".js_self_consume_need_security_code_show").html(p(t.data));
}
function o(e){
var t=$(template.compile(F)({
mch_list:[{
checked:!0,
code:e
}]
}));
g.find(".js_mch_code_list").append(t),t.find("input[type=checkbox]").checkbox(),
O.push({
name:e,
value:e
}),$(".js_create_card_mch_list").html(""),T&&T.destroy(),T=new h({
container:g.find(".js_create_card_mch_list"),
data:O,
callback:function(e){
g.find(".js_create_card_mch_list_hidden").val(e),j.create_mid=e;
}
}),T.selected(j.create_mid||0);
}
function a(){
L.show(),I.hide(),U.hide(),N.hide();
}
function u(){
L.hide(),I.show(),U.show(),N.hide();
}
function f(){
L.hide(),I.hide(),U.hide(),N.show();
}
function v(e){
e?(P.hide(),B.show(),E.val("").focus(),H.hide(),u()):(P.show(),B.hide());
}
var b=t.data,j=(b._can_use_self_consume,!!t.data.sub_merchant_id,b._is_create,this),g=$("#js_adv_dispose_method"),y=(g.find(".js_consume_type_container_1"),
$("#js_adv_dispose_method .js_consume_type")),w=y.checkbox({
onChanged:function(e){
var t=e.val();
1==t&&(window.wx_is_paycard||j.showOpenPaycard()),c(t);
}
}),k=g.find(".js_consume_type_4").checkbox(),x=$(".js_dispose_method_sub_3 input",g).checkbox({
onChanged:function(){
i(x);
}
});
c(b.dispose_method),n.on("use_condition:use_condition_least_cost_checked_changed",function(e){
k.disabled(!$("#js_use_condition_least_cost_checkbox").is(":checked")||2==$(".js_validtime:checked").val()),
$(".js_dispose_method_tips_5").toggle(!e);
}),n.on("validtime:valid_time_changed",function(e){
k.disabled(!$("#js_use_condition_least_cost_checkbox").is(":checked")||2==$(".js_validtime:checked").val()),
$(".js_dispose_method_tips_6").toggle(2==e);
});
var q=g.find(".js_self_consume_need_security_code"),C=q.checkbox({
onChanged:function(e){
$(e).prop("checked")?(g.find(".js_self_consume_need_security_code_hidden").val(1),
g.find(".js_self_consume_need_security_code_show").show()):(g.find(".js_self_consume_need_security_code_hidden").val(0),
g.find(".js_self_consume_need_security_code_show").hide());
}
});
b.is_sns_card&&C.disabled(!0);
var M=g.find(".js_self_consume_need_fee_comment"),z=(M.checkbox({
onChanged:function(e){
$(e).prop("checked")?g.find(".js_self_consume_need_fee_comment_show").show():g.find(".js_self_consume_need_fee_comment_show").hide();
}
}),e("cardticket/tools_add_dispel_code.js"));
g.on("click",".js_add_disple_code",function(){
return new z({
success:function(e){
t.data.consume_validate_code.push({
code:e
}),_();
}
}),!1;
}),t.data._can_use_self_consume&&_(),g.on("click",".js_dispel_code_mgr",function(){
r.show({
title:"提示",
msg:"验证码更新后，请点刷新按钮",
buttons:[{
text:"刷新",
click:function(){
var e=this;
d.get({
url:"/merchant/cardsecuritycodemgr?action=list",
complete:function(){
e.hide();
},
success:function(e){
if(0==e.base_resp.ret){
var i=e.list_resp.security_code_list,s=[];
"string"==typeof i&&(i=[i]);
for(var c=0;c<i.length;c++)s.push({
code:i[c]
});
t.data.consume_validate_code=s,_();
}
}
});
},
type:"primary"
}],
type:"info"
});
}).on("click",".js_open_wxpay",function(){
r.show({
title:"提示",
msg:"开通功能后，请刷新页面",
buttons:[{
text:"刷新",
click:function(){
var e=this;
d.get({
url:"/merchant/electroniccardmgr?action=addsnspage&type=4",
complete:function(){
e.hide();
},
success:function(e){
e.card_access_info&&1==e.card_access_info.is_wxpay_open&&(g.find(".js_consume_type_container_4,.js_consume_type_container_1").show(),
g.find(".js_consume_type_container_5").hide());
}
});
},
type:"primary"
}],
type:"info"
});
});
var F='{each mch_list as item}<label class="frm_checkbox_label widget-textList__item">                                    <i class="icon_checkbox"></i>                                    <span class="lbl_content">{item.code}</span>                                    <input type="checkbox" {if item.checked}checked {/if}value="{item.code}" class="frm_checkbox">                                </label>{/each}';
if(t.data._can_use_swipe_card){
var T,D=[],O=[];
d.get({
url:"/merchant/cardmerchantprofile?action=get_mch_code_list",
data:{
only_need_normal_mch:1,
ver:1
}
},function(e){
var t=e.mch_list;
if(m=t,0!=e.base_resp.ret||0==t.length)return void $(".js_consume_type_container_4",g).remove();
g.find(".js_dispose_method_tips_4.frm_tips").text("“刷卡买单”需配合机具使用实现微信支付。消费者结账时点击“快速买单”进入付款页面，商户扫描后即可完成支付并使用优惠。请选择制券商户号及适用商户号，提交卡券审核通过后，添加库存，并分别用制券号和适用号登录支付平台完成券的审核和激活。");
for(var i=[],s=0;s<t.length;s++){
var c=!1;
if(D.push(t[s].mch_code_list),b.pay_info&&b.pay_info.use_mid_list)for(var _=0;_<b.pay_info.use_mid_list.length;_++)if(t[s].mch_code_list==b.pay_info.use_mid_list[_]){
c=!0;
break;
}
b._is_global_editting||(c=!0),i.push({
checked:c,
code:t[s].mch_code_list
});
}
var o=g.find(".js_mch_code_list").html(template.compile(F)({
mch_list:i,
pay_info:b.pay_info
})),n=o.find("input[type=checkbox]");
n.checkbox({
onChanged:function(){}
});
for(var d=[],s=0;s<t.length;s++)d.push({
name:t[s].mch_code_list,
value:t[s].mch_code_list
});
T=new h({
container:g.find(".js_create_card_mch_list"),
data:d,
callback:function(e){
g.find(".js_create_card_mch_list_hidden").val(e),j.create_mid=e;
}
}),O=d,T.selected(b.pay_info&&b.pay_info.create_mid||0),b._is_global_editting&&4==b.dispose_method&&(n.checkbox().disabled(!0),
T.disable(),$(".js_mchid_bind_wrap",g).hide(),$(".js_mchid_bind",g).hide()),i.length>1&&$("#is_multi_code_hidden").val(1);
});
var B=$(".js_mchid_bind_wrap",g),E=$(".js_mchid_bind_input",g),P=$(".js_mchid_bind",g),I=$(".js_mchid_bind_add",g),U=$(".js_mchid_bind_cancel",g),H=$(".js_mchid_bind_err",g),L=$(".js_mchid_bind_loading",g),N=$(".js_mchid_bind_success",g);
P.click(function(){
v(!0);
}),U.click(function(){
v(!1);
}),I.click(function(){
var e=E.val();
return 0===e.length?void H.text("请输入商户号").show():-1!==D.indexOf(e)?void H.text("请勿添加重复商户号").show():/^\d+$/.test(e)?(a(),
void l.addMchid({
mchid:e,
success:function(){
f(),setTimeout(function(){
N.fadeOut(300,function(){
o(e),v(!1);
});
},700);
},
error:function(){
u();
}
})):void H.text("请输入正确格式").show();
}),E.on("input",function(){
H.hide();
});
}
this.$container=g,b._is_global_editting&&(4==b.dispose_method?(w.disabled(!0),k.disabled(!1)):k.disabled(!0)),
s(g);
}
function s(e){
e.find(".js_dispose_method_tips_1").html(window.wx_is_paycard?"“自助买单”无需开发即可接入微信支付，消费者结账时点击“快速买单”输入金额，即可确认完成支付并使用优惠。当前收款商户号为“%s”，".sprintf(window.card_pay_mch_id)+'登录<a href="https://pay.weixin.qq.com" target="_blank">支付平台</a>可查询收入明细，详情参照<a href="/cgi-bin/announce?action=getannouncement&key=1461861451&version=1&lang=zh_CN&platform=2" target="_blank">指引</a>':"“自助买单”无需开发即可接入微信支付，消费者结账时点击“快速买单”输入金额，即可确认完成支付并使用优惠。");
}
function c(e){
var t=e.offset();
window.scrollTo(0,t.top);
}
function _(e,t){
for(var i=0;i<e.length;i++)if(2==e[i].state&&t==e[i].mch_code_list)return!0;
return!1;
}
var o=e("common/qq/events.js"),n=o(!0),d=e("common/wx/Cgi.js"),a=e("common/wx/Tips.js"),r=e("common/wx/dialog.js"),h=e("biz_web/ui/dropdown.js"),l=e("cardticket/tools/tools_cgi.js"),p=template.compile('{if consume_validate_code && consume_validate_code.length}                    <p class="frm_tips">消费者持券到店，须输入验证码                         {each consume_validate_code as code i}                        {if i < 3}                        『<span class="dispel_code">{code.code}</span> 』                        {/if}                        {/each}                        {if consume_validate_code.length> 3}『…』{/if}才能核销卡券，保证核销准确。验证码由商户设置，点击 <a target="_blank" class="js_dispel_code_mgr" href="{addtoken \'/merchant/cardsecuritycodemgr?action=list\'}">管理验证码</a>                    </p>                    {else}                    <p class="frm_tips">消费者持券到店，须输入验证码才能核销卡券。你还没设置验证码，点击<a target="_blank" class="js_dispel_code_mgr" href="{addtoken \'/merchant/cardsecuritycodemgr?action=list\'}">管理验证码</a></p>                    </p>{/if}                    {if !consume_validate_code || !consume_validate_code.length}                    <a href="javascript:void(0);" class="btn btn_default js_add_disple_code">添加验证码</a>                    {/if}'),m=[];
i.prototype.val=function(){
var e=this.$container,i=e.find(".js_mch_code_list"),s=i.find("input[type=checkbox]"),o=t(s),n=1==wx.cgiData.data.create_source&&wx.cgiData.data.type==wx.cgiData.data.MEMBER_TYPE;
if(4==this.dispose_method&&!o.length&&!n)return a.err("请选择商户号"),c(this.$container),
!1;
if(4==this.dispose_method&&!$("#js_use_condition_least_cost_checkbox").prop("checked")&&!n)return a.err("必须选择最低消费才能使用刷卡支付方式"),
c(this.$container),!1;
if(4==this.dispose_method&&2==$(".js_validtime:checked").val()&&!n)return a.err("仅支持固定日期有效期类型"),
c(this.$container),!1;
if(4==this.dispose_method&&!n){
var d=$(".js_create_card_mch_list_hidden").val();
if(_(m,d))return r.show({
msg:"使用本功能需将商户号%s升级，详情<a href='http://kf.qq.com/faq/140225MveaUz150123BbIFvM.html' target='_blank'>咨询客服</a>".sprintf(d),
buttons:[{
text:"确定",
click:function(e){
this.remove(e);
}
}]
}),!1;
for(var h=[],l=0;l<o.length;l++)_(m,o[l])&&h.push(o[l]);
if(h.length)return r.show({
msg:"使用本功能需将商户号%s升级，详情<a href='http://kf.qq.com/faq/140225MveaUz150123BbIFvM.html' target='_blank'>咨询客服</a>".sprintf(h.join("、")),
buttons:[{
text:"确定",
click:function(e){
this.remove(e);
}
}]
}),!1;
}
for(var p={
use_mid_count:o.length
},l=0;l<o.length;l++)p["use_mid_"+l]=o[l];
return p;
};
var u="<div class='tl'>            <p>&nbsp;</p>            <p>使用自助买单功能，无需开发即可接入微信支付。消费者结账时点击“快速买单”输入金额，即可确认完成支付并使用优惠。所收款项将打入以下账号：</p>                <div><p>&nbsp;</p><span class='js_select_appoint_mch_code'>                </span> &nbsp; &nbsp;<a href='https://pay.weixin.qq.com' target='_blank'>查看帐号</a></div>                <p>&nbsp;</p>                <label class='frm_checkbox_label'>                 <i class='icon_checkbox'></i>                 <input type='checkbox' class='frm_checkbox' id='js_agree_paycard'>我同意并遵守<a href=\""+wx.url("/cgi-bin/frame?t=cardticket/faq_apply_card_pay_frame&amp;type=info")+"\" target='_blank'>《微信公众平台卡券买单功能服务协议》</a></label></div>";
return i.prototype.showOpenPaycard=function(){
var e=!1,t="",i=this,c=$(u).popup({
title:"提示",
autoShow:!0,
buttons:[{
type:"primary",
text:"确定",
click:function(){
if(!e&&$("#js_agree_paycard").prop("checked")){
if(!t)return void a.err("请选择商户号");
if(_(m,t))return void a.err("使用本功能需升级微信支付商户号，详情咨询客服");
e=!0;
var c=this;
d.post({
url:"/merchant/cardmerchantprofile?action=setcardpaymoney",
data:{
appoint_v3_mch_id:t
}
},function(e){
return 14013==e.base_resp.ret?(c.remove(),void r.show({
type:"info",
msg:"你的支付商户号目前为旧商户号，需要升级新权限才可开通买单，"+"<a href='%s' target=\"_blank\">现在去升级</a>".sprintf(wx.url("/cgi-bin/frame?nav=10010&t=business/index_frame&iframe=%2Fpaymch%2Fbusiness%3Faction%3Dfirstentry")),
buttons:[{
text:"取消",
click:function(){
this.remove();
},
type:"normal"
}]
})):213002==e.base_resp.ret||213003==e.base_resp.ret?(c.remove(),void r.show({
type:"info",
msg:213002==e.base_resp.ret?"微信支付服务商户号不支持开通自助买单|请更改其它核销方式":"当前微信支付商户号不支持开通自助买单|请更改其它核销方式",
buttons:[{
text:"取消",
click:function(){
this.remove();
},
type:"normal"
}]
})):0!=e.base_resp.ret?void d.show(e):(a.suc("开通成功"),window.wx_is_paycard=!0,window.card_pay_mch_id=t,
s(i.$container),void c.remove());
});
}
}
}],
onHide:function(){
this.remove();
}
});
$("#js_agree_paycard").checkbox(),d.get({
url:"/merchant/cardmerchantprofile?action=get_mch_code_list",
data:{
ver:1
}
},function(e){
if(0==e.base_resp.ret){
var i=[],s=e.mch_list;
m=s;
for(var _=0;_<s.length;_++)i.push({
name:s[_].mch_code_list,
value:s[_].mch_code_list
});
new h({
container:c.popup("get").find(".js_select_appoint_mch_code"),
data:i,
callback:function(e){
t=e;
}
}).selected(0);
}else d.show(e);
});
},i;
});