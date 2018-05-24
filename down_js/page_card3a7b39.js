define("ibeacon/page_card.js",["common/wx/popup.js","common/wx/Step.js","common/wx/Cgi.js","biz_web/ui/input/lentips.js","ibeacon/cardTable.js","common/wx/time.js","common/wx/Tips.js","biz_common/moment.js"],function(t){
"use strict";
t("common/wx/popup.js");
var e=t("common/wx/Step.js"),i=t("common/wx/Cgi.js"),a=t("biz_web/ui/input/lentips.js"),c=t("ibeacon/cardTable.js"),s=(t("common/wx/time.js"),
t("common/wx/Tips.js")),n=t("biz_common/moment.js"),o=$("#js_title"),_=$("#js_comment"),d=$("#js_title_tips"),l=$("#js_comment_tips"),r=$(".js_img_select"),m=$("#js_title_view"),p=$("#js_img_view"),g=($(".js_prev"),
$(".js_submit")),u=$("#js_choose_cardticket"),j=$("#js_card"),x=$("#js_card_title_view"),w=$("#js_card_valid_view"),f=null,b=wx.cgiData.page.card_list||[],v={
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
},D={
page_id:wx.cgiData.page.page_id||0,
logo:wx.cgiData.page.logo||0,
title:wx.cgiData.page.title||"",
card_id:"",
comment:wx.cgiData.page.comment||""
};
wx.cgiData.page.card_list&&(D.card_id=wx.cgiData.page.card_list[0].card_id);
var Y=function(){
wx.cgiData.page.page_id||new e({
container:"#js_step_bar",
selected:2,
names:["1 选择页面类型","2 编辑页面"]
});
},E=function(){
new a({
input:o,
tip:d,
maxlimit:6,
trim:!0,
callback:function(t,e){
D.title=e.value.substr(0,6),m.html(D.title);
}
}),r.on("click",function(){
var t=$(this);
t.hasClass("mod-edit__img-select_selected")||(D.logo=t.data("logo"),$(".mod-edit__img-select_selected").removeClass("mod-edit__img-select_selected"),
t.addClass("mod-edit__img-select_selected"),p.attr("src",t.find("img").attr("src")));
});
},T=function(){
if(new a({
input:_,
tip:l,
maxlimit:16,
trim:!0,
callback:function(t,e){
D.comment=e.value.substr(0,16);
}
}),b&&b.length){
var t=JSON.parse(b[0].date_info);
"DATE_TYPE_FIX_TIME_RANGE"==t.type?b[0].valid=n.unix(t.begin_timestamp).format("YYYY.MM.DD")+"-"+n.unix(t.end_timestamp).format("YYYY.MM.DD"):"DATE_TYPE_FIX_TERM"==t.type?b[0].valid=n().add("d",parseInt(t.fixed_begin_term)).format("YYYY.MM.DD")+"-"+n().add("d",parseInt(t.fixed_begin_term)+parseInt(t.fixed_term)).format("YYYY.MM.DD"):"DATE_TYPE_PERMANENT"==t.type&&(b[0].valid="永久有效"),
b[0].card_type=v[b[0].card_type],j.html(template.render("js_card_tpl",{
data:b
})),x.text(b[0].title),w.text("有效期："+b[0].valid);
}
u.on("click",function(){
$('<div id="js_table"></div>').popup({
title:"配置卡券",
className:"device_dialog",
buttons:[{
text:"确定",
type:"primary",
click:function(){
b=f.getCardList(),j.html(template.render("js_card_tpl",{
data:b
})),x.text(b[0].title),w.text("有效期："+b[0].valid),u.text("+ 更换卡券"),D.card_id=b[0].card_id,
this.remove();
}
},{
text:"取消",
click:function(){
this.remove();
}
}],
onShow:function(){
f=new c({
container:this.$dialogWrp.eq(0).find("#js_table"),
isMulti:!1,
cardList:b
});
}
});
});
},M=function(){
g.on("click",function(){
return D.title?D.card_id?$(".js_selectable").length?($(".js_selectable td").css({
color:"red"
}),window.scrollTo(0,j.offset().top/2),s.err("部分卡券状态不可用，请删除"),!1):void i.post({
url:wx.url("/merchant/beaconsavepage?action=card"),
data:{
page:JSON.stringify(D)
},
success:function(t){
0==t.base_resp.ret?location.href=wx.url("/merchant/beaconlistpage?action=list&need_dc=1"):s.err("系统错误");
}
}):(s.err("请选择卡券"),!1):(o.focus(),s.err("请输入主标题"),!1);
});
},h=function(){
Y(),E(),T(),M();
};
h();
});