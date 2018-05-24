"use strict";
define("reward/setting.vue.js",["layout/baseui.vue.js","utils/cgi.vue.js","components/tips.vue.js","components/top.vue.js","components/popover.vue.js"],function(e,t,n){
var i=e("layout/baseui.vue.js"),r=e("utils/cgi.vue.js"),o=e("components/tips.vue.js"),s=e("components/top.vue.js");
e("components/popover.vue.js");
var u=new i({
el:"#app",
data:function p(){
var p={
tabs:s.reward,
tab:"setting",
loading:!1,
pricesError:["","","","","",""],
content:"受苹果公司新规定影响，微信 iOS 版的赞赏功能被关闭，文章开启赞赏后，在 iOS上将改为个人转账，仍保持T+7结算到原收款人的微信零钱包，仍可在赞赏功能里查看流水。"
};
return Object.keys(window.cgiData).forEach(function(e){
p[e]=window.cgiData[e];
}),p.prices=p.prices.map(function(e){
return e/100;
}),p.priceTxt=p.prices.map(function(e){
return e+"元";
}).join("、"),p;
},
methods:{
setMoney:function(){
this.$refs.popup.show();
},
popupClose:function(){
this.$refs.popup.hide();
},
priceKeydown:function(e){
var t="which"in e?e.which:e.keyCode;
return 0===e.target.value.length&&[48,96].indexOf(t)>-1?void e.preventDefault():void(t>=48&&57>=t||t>=96&&105>=t||[37,38,39,40,8].indexOf(t)>-1||e.preventDefault());
},
priceInput:function(e,t){
var n=Number(t.target.value);
this.pricesError[e]=n>256||!n?"error":"";
},
submit:function(){
var e=this,t=this.prices.map(function(e){
return 100*e;
}).join("_");
this.loading=!0,r.post({
url:"/merchant/reward?action=rewardsetting",
data:{
setting:t
}
},function(t){
t.base_resp&&0===Number(t.base_resp.ret)&&(e.$refs.popup.hide(),o.suc("设置成功，已生效"),
e.priceTxt=e.prices.map(function(e){
return e+"元";
}).join("、"));
},function(){},function(){
e.loading=!1;
});
}
}
});
n.exports=u;
});