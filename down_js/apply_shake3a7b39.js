define("cardticket/apply_shake.js",["common/wx/Tips.js","biz_web/ui/checkbox.js","common/wx/Cgi.js","common/wx/dialog.js"],function(e){
"use strict";
function s(){
i.prop("checked")&&n.prop("checked")?t.removeClass("btn_disabled"):t.addClass("btn_disabled");
}
var c=e("common/wx/Tips.js"),a=(e("biz_web/ui/checkbox.js"),e("common/wx/Cgi.js")),o=e("common/wx/dialog.js"),i=$("#js_agree_secret"),n=$("#js_agree_func"),t=$("#js_agree"),d=i.checkbox({
onChanged:function(){
s();
}
}),r=n.checkbox({
onChanged:function(){
s();
}
});
wx.cgiData.is_can_shake_card||s();
var b=!1;
t.click(function(){
return t.hasClass("btn_disabled")||b?!1:wx.cgiData.is_expired?(o.show({
msg:"报名已截止，很遗憾，你不能参加此活动。",
buttons:[{
text:"关闭",
click:function(){
this.remove();
}
}]
}),!1):(b=!0,void a.post({
url:"/merchant/cardapply?action=applyshake",
data:{
agree:1
},
error:function(){
b=!1;
}
},function(e){
b=!1,0==e.base_resp.ret?(c.suc("您已参加活动"),t.addClass("btn_disabled").text("已参加"),
r.disable("1"),d.disable("1")):a.show(e);
}));
});
});