define("ibeacon/awardDialog.js",["biz_web/ui/checkbox.js","common/wx/popup.js","common/wx/Step.js","ibeacon/cardTable.js","common/wx/Tips.js"],function(t){
"use strict";
t("biz_web/ui/checkbox.js"),t("common/wx/popup.js");
var i=t("common/wx/Step.js"),e=t("ibeacon/cardTable.js"),a=t("common/wx/Tips.js"),s={
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
},n=function(t){
this.container=t.container,this.cardList=t.cardList,this.awardList=this.cardList||[],
this.title=t.title,this.className=t.className,this.onSubmit=t.onSubmit,this.width=t.width,
this.init();
},r={
awardList:[]
};
return n.prototype.init=function(){
var t=this;
return $(t.container).popup({
title:t.title,
width:t.width,
className:t.className,
onShow:function(){
t.dom=this.$dialogWrp.eq(0),t.dialog=this,t._initStep(),t._initCardTable(this),t._initButton(),
this.resetPosition();
}
}),t;
},n.prototype._initStep=function(){
r._step=new i({
container:this.dom.find(".js_step"),
selected:1,
names:["1 选取卡券","2 设置奖品数量"]
});
},n.prototype._initCardTable=function(t){
r._cardTable=new e({
container:this.dom.find(".js_card_list"),
isMulti:!0,
cardList:this.cardList,
onDataLoad:function(){
t.resetPosition();
}
});
},n.prototype._initButton=function(){
var t=this,i=this.dom;
i.find(".js_cancel").on("click",function(){
t.dialog.remove();
}),i.find(".js_next").on("click",function(){
if(r._cardTable.getCardList().length+t.cardList.length>10)return a.err("最多可添加10张卡券"),
!1;
r.awardList=t.cardList.concat(r._cardTable.getCardList());
for(var e=0;e<r.awardList.length;e++)s[r.awardList[e].card_type]&&(r.awardList[e].card_type=s[r.awardList[e].card_type]);
i.find(".js_step1").hide(),i.find(".js_step2").show(),r._step.setStep(2),i.find(".js_award_list").html(template.render("js_award_list_tpl",{
list:r.awardList
})),i.find(".js_card_selected").on("keyup",function(){
var e=$(this),a=e.parent().prev(),s=e.data("quantity");
if(""==e.val())a.text("0%");else{
if(0==Number(e.val())&&""!=e.val())return e.val(""),!1;
if(/[^0-9]/g.test(e.val()))return e.val(""),!1;
e.val()>s&&e.val(s);
}
var n=0,r=0,d=null;
!function(t){
{
var e=t._getAwardCount();
i.find(".js_card_selected").length;
}
i.find(".js_card_selected").each(function(t,a){
if($(a).val()>0)if($(a).val()/e>1)i.find(".js_rate").eq(t).text("100%");else if($(a).val()/e<.01)i.find(".js_rate").eq(t).text("1%"),
$(a).val()>=r&&(r=1,d=t),n+=1;else{
var s=Math.floor(100*$(a).val()/e);
i.find(".js_rate").eq(t).text(s+"%"),s>=r&&(r=Number(s),d=t),n+=s;
}
});
}(t),100!=n&&i.find(".js_rate").eq(d).text(r+100-n+"%");
});
}),i.find(".js_prev").on("click",function(){
i.find(".js_step1").show(),i.find(".js_step2").hide(),r._step.setStep(1);
}),i.find(".js_submit").on("click",function(){
for(var e=i.find(".js_card_selected").length,s=0;e>s;s++){
if(!i.find(".js_card_selected").eq(s).val()||/[^0-9]/g.test(i.find(".js_card_selected").eq(s).val()))return void a.err("请输入正确的奖品数量");
r.awardList[s].gift_count=i.find(".js_card_selected").eq(s).val(),r.awardList[s].probability=i.find(".js_card_selected").eq(s).parent().prev().text().replace("%","");
}
t.cardList=r.awardList,t.dialog.remove(),t.onSubmit();
});
},n.prototype._getAwardCount=function(){
var t=0;
return this.dom.find(".js_card_selected").each(function(){
t+=Number($(this).val());
}),t;
},n.prototype.getAwardList=function(){
return this.cardList;
},n;
});