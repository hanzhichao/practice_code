define("wifi/user_connect.js",["wifi/top.js","common/wx/popup.js"],function(i){
"use strict";
i("wifi/top.js"),i("common/wx/popup.js");
var n=$("#js_scan_connect"),t=$("#js_portal_connect"),c=$("#js_scan_connect_tpl"),e=$("#js_portal_connect_tpl"),o=function(i){
var n;
i.on("click",".usr-connect__demo-tab .tab_nav",function(n){
n.preventDefault(),$(this).addClass("selected"),$(this).siblings().removeClass("selected");
var t=$(this).children("a").attr("href");
i.find(".usr-connect__dialog-content-tab").not(t).css("display","none"),i.find(".usr-connect__mask-wrap").show(),
i.find(".usr-connect__placeholder").css("visibility","hidden"),i.find(t).fadeIn();
}),i.on("click",".usr-connect__play-wrap",function(){
clearTimeout(n),$(this).children(".usr-connect__mask-wrap").hide(),$(this).children(".usr-connect__placeholder").css("visibility","visible");
var i=$(this).children(".usr-connect__placeholder").attr("src"),t=1e3*$(this).attr("date-gif-time");
$(this).children(".usr-connect__placeholder").attr("src",i),n=setTimeout(function(){
$(this).children(".usr-connect__mask-wrap").show(),$(this).children(".usr-connect__placeholder").css("visibility","hidden");
},t);
});
};
n.on("click",function(){
c.popup({
title:"扫二维码连网展示",
buttons:[{
text:"关闭",
type:"primary",
click:function(){
this.remove();
}
}],
onShow:function(){
this.$dialogWrp.find(".dialog_bd").css("padding","0px"),o(this.$dialogWrp.find(".dialog_bd")),
this.resetPosition();
},
onHide:function(){
this.remove();
}
});
}),t.on("click",function(){
e.popup({
title:"连网流程视频示例",
buttons:[{
text:"关闭",
type:"primary",
click:function(){
this.remove();
}
}],
onShow:function(){
this.$dialogWrp.find(".dialog_bd").css("padding","0px"),o(this.$dialogWrp.find(".dialog_bd")),
this.resetPosition();
},
onHide:function(){
this.remove();
}
});
});
});