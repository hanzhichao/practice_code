define("wxopen/reuse_wxverify.js",["biz_web/ui/checkbox.js","common/wx/Cgi.js","biz_common/moment.js","safe/Scan.js","common/wx/Step.js","common/wx/Tips.js","biz_web/utils/upload.js"],function(e){
"use strict";
e("biz_web/ui/checkbox.js");
var s=e("common/wx/Cgi.js"),t=e("biz_common/moment.js"),i=e("safe/Scan.js"),n=e("common/wx/Step.js"),c=e("common/wx/Tips.js"),o=e("biz_web/utils/upload.js"),_=null,a=new n({
container:".js_div_step",
selected:1,
names:["1.快速认证须知","2.管理员确认","3.确认认证资料"]
}),r=$(".js_step_1"),p=$(".js_step_2"),j=$(".js_step_3"),d=$(".js_wording"),l=null;
$("#js_agree").checkbox({
onChanged:function(e){
e.prop("checked")?$(".js_next_1").removeClass("btn_disabled"):$(".js_next_1").addClass("btn_disabled");
}
}),$(".js_next_1").on("click",function(){
return $(this).hasClass("btn_disabled")?!1:(a.setStep(2),r.hide(),p.show(),void(_=new i({
container:"#js_div_qrcheck",
type:"check",
source:"wxopen_copy_verify",
wx_name:wx.cgiData.wx_alias,
onconfirm:function(){
l=this.code,s.post({
url:"/cgi-bin/wxopen?action=get_verify_stuff",
data:{
qrcheck_ticket:l
}
},function(e){
var s=e.base_resp.ret;
0==s?(a.setStep(3),p.hide(),j.show(),j.find(".js_step_3_container").html(template.render("js_step_3_tpl",e.verify_stuff)),
j.find(".js_img").each(function(){
var e=$(this),s=e.data("mediaid");
e.attr("src",o.mediaFileUrl(s));
})):c.err("系统错误，请稍后重试");
});
}
})));
}),$(".js_prev_2").on("click",function(){
a.setStep(1),p.hide(),r.show(),_&&_.destroy();
}),$(".js_prev_3").on("click",function(){
a.setStep(1),j.hide(),r.show();
}),$(".js_submit").on("click",function(){
var e=$(this);
e.btn(!1),s.post({
url:"/cgi-bin/wxopen?action=copy_verify",
data:{
appid:wx.cgiData.appid,
qrcheck_ticket:l
}
},function(s){
e.btn(!0);
var i=s.base_resp.ret;
if(0==i)$(".js_wxverify_time").html("小程序认证过期时间："+t.unix(s.expire_time).format("YYYY年MM月DD日")),
$(".js_step_container").hide(),$(".js_result").show(),$(".js_success").show();else if(1201==i||1202==i||1203==i||1204==i)switch($(".js_step_container").hide(),
$(".js_result").show(),$(".js_fail").show(),i){
case 1021:
d.text("你的公众帐号未认证，复用资质认证小程序失败。");
break;

case 1202:
d.text("你的小程序已认证，无需重复提交认证。");
break;

case 1203:
d.text("公众号和小程序主体不一致，无法复用资质认证。");
break;

case 1204:
d.text("为保障微信公众平台的信息安全，你的帐号不能复用资质认证小程序。");
}else c.err("系统错误，请稍后重试");
});
}),$(".js_close").on("click",function(){
window.open("about:blank","_self").close();
});
});