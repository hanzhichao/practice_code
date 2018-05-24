define("payApply/release.js",["common/wx/Step.js","biz_web/ui/checkbox.js","common/wx/Cgi.js"],function(e){
"use strict";
var s=e("common/wx/Step.js");
e("biz_web/ui/checkbox.js");
var n=e("common/wx/Cgi.js"),i=new s({
container:"#step",
names:["1. 发布细则","2. 检测发布"]
});
$("input[type=checkbox]").checkbox(),$("#next1").click(function(){
$(this).hasClass("btn_disabled")||($("#step2").show().siblings(".rn-box").hide(),
i.go(2));
}),$("#back").click(function(){
i.go(1),$("#step1").show().siblings(".rn-box").hide();
}),$("input[type=checkbox]").change(function(){
$("#next1").setClass($(this).prop("checked")?"btn btn_primary":"btn btn_disabled");
}),$("#send").click(function(){
wx.cgiData.right&&wx.cgiData.send&&($("#send").btn(!1),n.post({
url:"/merchant/businessaccess?action=bizpayrelease",
callback:function(e){
$("#send").btn(!0),0==e.base_resp.ret?$("#step3").show().siblings().hide():Tips.err();
}
}));
});
});