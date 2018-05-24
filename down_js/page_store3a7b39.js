define("ibeacon/page_store.js",["biz_web/ui/checkbox.js","common/wx/popup.js","common/wx/Step.js","common/wx/Cgi.js","biz_web/ui/input/lentips.js","ibeacon/cardTable.js","biz_web/utils/upload.js","common/wx/Tips.js","common/wx/time.js","biz_common/moment.js"],function(e){
"use strict";
e("biz_web/ui/checkbox.js"),e("common/wx/popup.js");
var t=e("common/wx/Step.js"),i=e("common/wx/Cgi.js"),a=e("biz_web/ui/input/lentips.js"),c=e("ibeacon/cardTable.js"),r=e("biz_web/utils/upload.js"),_=e("common/wx/Tips.js"),d=(e("common/wx/time.js"),
e("biz_common/moment.js")),s=$("#js_title"),o=$("#js_comment"),n=$("#js_title_tips"),u=$("#js_comment_tips"),l=$(".js_img_select"),F=$("#js_title_view"),p=$("#js_img_view"),m=($(".js_prev"),
$(".js_submit")),g=$("#js_choose_cardticket"),h=$("#js_add_contact"),w=$("#js_add_contact_view"),D=$(".js_checkbox"),f=$("#js_ad_img"),j=$("#js_ad_img_view"),b=$(".js_checkbox_view"),x=$("#js_choose_img"),v=$("#js_no_pic"),k=$("#js_redirect_url"),C=$("#js_redirect_url_input"),E=$("#js_redirect_url_view"),A=$("#js_redirect_title"),z=$("#js_redirect_title_view"),Y=$("#js_store"),T=$("#js_store_view"),N=$("#js_card"),M=$("#js_cardticket_check"),y=$("#js_no_card_view"),I=$("#js_card_list_view"),O=null,S=wx.cgiData.page.card_list||[],q={
BOARDING_PASS:"飞机票",
CASH:"代金券",
DISCOUNT:"折扣券",
GENERAL_COUPON:"通用券",
GIFT:"礼品券",
GROUPON:"团购券",
LUCKY_MONEY:"红包",
MEMBER_CARD:"会员卡",
MOVIE_TICKET:"电影票",
SCENIC_TICKET:"门票"
},R={
page_id:wx.cgiData.page.page_id||0,
logo:wx.cgiData.page.logo||0,
title:wx.cgiData.page.title||"",
comment:wx.cgiData.page.comment||"",
is_follow:wx.cgiData.page.is_follow||0,
is_adv:wx.cgiData.page.is_adv||0,
is_redirect:wx.cgiData.page.is_redirect||0,
adv_pic_url:wx.cgiData.page.adv_pic_url||"",
url_title_name:wx.cgiData.page.url_title_name||"",
redirect_url:wx.cgiData.page.redirect_url||"",
has_location_info:wx.cgiData.page.has_location_info||0,
card_list:wx.cgiData.page.card_list||[]
},P=0,G=function(){
wx.cgiData.page.page_id||new t({
container:"#js_step_bar",
selected:2,
names:["1 选择页面类型","2 编辑页面"]
});
},L=function(){
new a({
input:s,
tip:n,
maxlimit:6,
trim:!0,
callback:function(e,t){
R.title=t.value.substr(0,6),F.html(R.title);
}
}),l.on("click",function(){
var e=$(this);
e.hasClass("mod-edit__img-select_selected")||(R.logo=e.data("logo"),$(".mod-edit__img-select_selected").removeClass("mod-edit__img-select_selected"),
e.addClass("mod-edit__img-select_selected"),p.attr("src",e.find("img").attr("src")));
}),l.eq(wx.cgiData.page.logo||0).trigger("click");
},U=function(){
if(h.checkbox({
type:"checkbox",
onChanged:function(e){
"checked"==e.attr("checked")?(R.is_follow=1,w.show()):(R.is_follow=0,w.hide());
}
}),Number(wx.cgiData.page.is_follow)&&h.trigger("click"),D.checkbox({
type:"radio",
onChanged:function(e){
var t=e.val();
R.is_adv=t,1==t?f.show():f.hide(),b.hide(),v.hide(),0==t?b.eq(t).show():1!=t||R.adv_pic_url?1==t&&R.adv_pic_url&&b.eq(t).show():v.show();
}
}),Number(wx.cgiData.page.is_adv)?D.eq(wx.cgiData.page.is_adv).trigger("click"):D.eq(0).trigger("click"),
r.uploadCdnFile({
container:x,
multi:!1,
type:2,
onComplete:function(e,t,i,a){
var c=a.content||"";
switch(+a.base_resp.ret){
case 0:
_.suc("上传成功"),x.html("重新选择"),v.hide(),b.eq(1).show(),j.prop("src",c),R.adv_pic_url=c;
break;

case 200034:
_.err("图片尺寸错误");
break;

case 1:
_.err("图片太大");
break;

case 200011:
_.err("请上传合法的图片格式");
break;

default:
_.err("上传失败");
}
}
}),k.checkbox({
type:"checkbox",
onChanged:function(e){
"checked"==e.attr("checked")?(R.is_redirect=1,C.show(),E.show()):(R.is_redirect=0,
C.hide(),E.hide());
}
}),A.on("keyup",function(){
z.text(A.val()),R.url_title_name=A.val();
}),Number(wx.cgiData.page.is_redirect)&&k.trigger("click"),M.checkbox({
type:"checkbox",
onChanged:function(e){
"checked"==e.attr("checked")?(P=1,g.parent().show(),R.card_list&&R.card_list.length?(I.show(),
N.show()):y.show()):(P=0,g.parent().hide(),R.card_list&&R.card_list.length?(I.hide(),
N.hide()):y.hide());
}
}),S&&S.length){
M.trigger("click"),P=1;
for(var e=0;e<S.length;e++){
var t=JSON.parse(S[e].date_info);
"DATE_TYPE_FIX_TIME_RANGE"==t.type?S[e].valid=d.unix(t.begin_timestamp).format("YYYY.MM.DD")+"-"+d.unix(t.end_timestamp).format("YYYY.MM.DD"):"DATE_TYPE_FIX_TERM"==t.type?S[e].valid=d().add("d",parseInt(t.fixed_begin_term)).format("YYYY.MM.DD")+"-"+d().add("d",parseInt(t.fixed_begin_term)+parseInt(t.fixed_term)).format("YYYY.MM.DD"):"DATE_TYPE_PERMANENT"==t.type&&(S[e].valid="永久有效"),
S[e].card_type=q[S[e].card_type];
}
N.html(template.render("js_card_tpl",{
data:S
})),I.html(template.render("js_card_view_tpl",{
data:S
}));
}
g.on("click",function(){
return S&&S.length>=10?(_.err("最多可添加10张卡券"),!1):void $('<div id="js_table"></div>').popup({
title:"配置卡券",
className:"device_dialog",
buttons:[{
text:"确定",
type:"primary",
click:function(){
return S.length+O.getCardList().length>10?(_.err("最多可添加10张卡券"),!1):(S=S.concat(O.getCardList()),
N.html(template.render("js_card_tpl",{
data:S
})),I.html(template.render("js_card_view_tpl",{
data:S
})),I.show(),y.hide(),void this.remove());
}
},{
text:"取消",
click:function(){
this.remove();
}
}],
onShow:function(){
O=new c({
container:this.$dialogWrp.eq(0).find("#js_table"),
isMulti:!0,
cardList:S
});
}
});
}),N.on("click",".js_del_card",function(){
for(var e=0;e<S.length;e++)S[e].card_id==$(this).data("card_id")&&S.splice(e,1);
N.html(template.render("js_card_tpl",{
data:S
})),I.html(template.render("js_card_view_tpl",{
data:S
})),S.length||y.show();
}),Y.checkbox({
type:"checkbox",
onChanged:function(e){
"checked"==e.attr("checked")?(R.has_location_info=1,T.show()):(R.has_location_info=0,
T.hide());
}
}),Number(wx.cgiData.page.has_location_info)&&Y.trigger("click"),new a({
input:o,
tip:u,
maxlimit:16,
trim:!0,
callback:function(e,t){
R.comment=t.value.substr(0,16);
}
});
},K=function(){
m.on("click",function(){
return 1==R.is_redirect&&(R.redirect_url=C.find("input").eq(1).val()),R.title?1!=R.is_redirect||R.url_title_name?1!=R.is_redirect||/^(https?|s?ftp|weixin):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(R.redirect_url)?$(".js_selectable").length?($(".js_selectable td").css({
color:"red"
}),window.scrollTo(0,N.offset().top/2),_.err("部分卡券状态不可用，请删除"),!1):(R.card_list=P?S.map(function(e){
return{
card_id:e.card_id
};
}):[],void i.post({
url:wx.url("/merchant/beaconsavepage?action=store"),
data:{
page:JSON.stringify(R)
},
success:function(e){
0==e.base_resp.ret?location.href=wx.url("/merchant/beaconlistpage?action=list&need_dc=1"):_.err("系统错误");
}
})):(k.focus(),_.err("请输入正确的url格式"),!1):(A.focus(),_.err("请输入链接名称"),!1):(s.focus(),
_.err("请输入标题"),!1);
});
},B=function(){
G(),L(),U(),K();
};
B();
});