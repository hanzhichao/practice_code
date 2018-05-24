define("ibeacon/cardTable.js",["biz_web/ui/checkbox.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/time.js","biz_common/moment.js","tpl/ibeacon/cardTable.html.js","tpl/ibeacon/cardList.html.js"],function(t){
"use strict";
t("biz_web/ui/checkbox.js");
var a=t("common/wx/Cgi.js"),i=t("common/wx/Tips.js"),e=(t("common/wx/time.js"),t("biz_common/moment.js")),o=t("tpl/ibeacon/cardTable.html.js"),r=t("tpl/ibeacon/cardList.html.js"),d={
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
},n=!1,s=1,c=function(t){
this.container=t.container,this.isMulti=t.isMulti,this.onDataLoad=t.onDataLoad,this.pageIndex=1,
this.cardCount=0,this.totalPage=1,this.cardList=[];
for(var a=0;t.carList&&a<t.cardList.length;a++)this.cardList[a]=t.cardList[a];
this.startList=t.cardList||[];
for(var a=0;t.cardList&&a<this.cardList.length;a++)this.cardList[a].__notChange__=1;
this.init();
};
return c.prototype.init=function(){
n=!1,s=1;
var t=this;
t.container.html(o),t.$jsCardTbody=t.container.find(".js_card_tbody"),t.$jsLoading=t.container.find(".js_loading"),
t.$jsNomore=t.container.find(".js_nomore"),t.$jsContainer=t.container.find(".js_container"),
t.$jsContainer.on("scroll",function(){
return n?void 0:s>t.totalPage?(t.$jsLoading.hide(),void t.$jsNomore.show()):void(t.$jsCardTbody.height()-t.$jsContainer.height()<=$(this).scrollTop()&&t._loadMore());
}),t._loadMore();
},c.prototype._renderPage=function(t){
for(var a=0;a<t.length;a++){
t[a].card_type=d[t[a].card_type];
var i=t[a].date_info;
"DATE_TYPE_FIX_TIME_RANGE"==i.type?t[a].valid=e.unix(i.begin_timestamp).format("YYYY.MM.DD")+"-"+e.unix(i.end_timestamp).format("YYYY.MM.DD"):"DATE_TYPE_FIX_TERM"==i.type?t[a].valid=e().add("d",parseInt(i.fixed_begin_term)).format("YYYY.MM.DD")+"-"+e().add("d",parseInt(i.fixed_begin_term)+parseInt(i.fixed_term)).format("YYYY.MM.DD"):"DATE_TYPE_PERMANENT"==i.type&&(t[a].valid="永久有效");
}
var o=this;
o.$jsLoading.before(wx.T(r,{
list:t,
type:o.isMulti?"checkbox":"radio"
})),o.$jsCardTbody.find(".js_checkbox").not(".js_hasInit").checkbox({
type:o.isMulti?"checkbox":"radio",
multi:o.isMulti,
onChanged:function(t){
if(o.isMulti)if("checked"==t.attr("checked"))o.cardList.push({
card_id:t.data("card_id"),
card_type:t.data("card_type"),
title:t.data("title"),
valid:t.data("valid"),
scope_type:t.data("scope_type"),
quantity:t.data("quantity"),
gift_count:t.data("gift_count"),
probability:t.data("probability"),
gift_recv_count:t.data("gift_recv_count")||0,
selectable:t.data("selectable")||!0
});else for(var a=0;a<o.cardList.length;a++)o.cardList[a].card_id==t.data("card_id")&&o.cardList.splice(a,1);else o.cardList.pop(),
o.cardList.push({
card_id:t.data("card_id"),
card_type:t.data("card_type"),
title:t.data("title"),
valid:t.data("valid"),
scope_type:t.data("scope_type"),
quantity:t.data("quantity"),
gift_count:t.data("gift_count"),
probability:t.data("probability"),
gift_recv_count:t.data("gift_recv_count")||0,
selectable:t.data("selectable")||!0
});
}
}).adjust(o.startList.map(function(t){
return t.card_id.toString();
})).disable(o.startList.map(function(t){
return t.card_id.toString();
})),o.$jsCardTbody.find(".js_checkbox").addClass("js_hasInit");
},c.prototype._loadMore=function(){
var t=this;
return n?!1:(s>t.totalPage&&(t.$jsLoading.hide(),t.$jsNomore.show()),n=!0,void a.get({
url:"/merchant/beacongetcoupons?action=list&f=json",
data:{
page_index:s
},
success:function(a){
if(n=!1,0==a.base_resp.ret)if(t.cardRecords=a.records,t.cardCount=a.record_count,
t.totalPage=Math.ceil(a.record_count/10),s++,a.records.length){
for(var e=0;e<t.cardRecords.length;e++)t.cardRecords[e].date_info=JSON.parse(t.cardRecords[e].date_info);
t._renderPage(t.cardRecords),2==s&&t.onDataLoad&&t.onDataLoad();
}else t._loadMore();else i.err("系统错误");
}
}));
},c.prototype.getCardList=function(){
return this.cardList;
},c;
});