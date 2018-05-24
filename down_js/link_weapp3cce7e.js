define("setting/link_weapp.js",["common/wx/popup.js","common/wx/Step.js","common/wx/Cgi.js","common/wx/top.js","common/wx/Tips.js","biz_web/ui/checkbox.js","common/wx/dialog.js","safe/Scan.js"],function(n){
"use strict";
function o(){
var n=null;
$("#add_weapp_tpl").popup({
title:"关联小程序",
className:"dialog_weapplink_wrp",
width:960,
onHide:function(){
this.remove();
},
onShow:function(){
var o=this;
u=new c({
container:".js_process",
selected:1,
names:["1.验证身份","2.关联小程序"]
}),n=new d({
container:".js_wxopen_qrbox",
type:"check",
source:"bind_weapp",
wx_name:cgiData.wx_alias,
onconfirm:function(){
w=this.code,u.setStep(2),$(".js_wxopen_qrbox").hide(),$(".js_wxopen_searchbox").show();
var n=new l({
container:$("#notify_users"),
label:"关联后给已关注公众号的用户发送通知",
name:"notify",
type:"checkbox"
});
n.checked(),o.resetPosition(),s(),i(!1);
}
});
}
});
}
function e(n){
n?$(".js_fail_msg").html(n).show():$(".js_fail_msg").html(n).hide();
}
function i(n){
n?$(".js_link_btn").removeClass("btn_disabled"):$(".js_link_btn").addClass("btn_disabled");
}
function t(){
var n=$(".dialog_weapplink_wrp .js_dialog_list");
return 0==h.length?void n.html(""):(console.log("a"),n.html(template.render("weapplink_item_tpl",{
data:h
})),void console.log("b"));
}
function s(){
$("#js_search_input").on("keyup",function(n){
e(""),13==n.keyCode&&$(".js_search_btn").click();
});
var n=!1;
$(".js_search_btn").on("click",function(){
var o=$.trim($(".js_wxopen_searchbox").find("#js_search_input").val());
return""==o?void e("请输入要搜索的小程序"):(h=[],t(),n?!1:(n=!0,$(".js_search_loading").show(),
i(!1),void r.post({
url:"/cgi-bin/wxopen?action=search",
data:{
key:o,
qrcheck_ticket:w
},
complete:function(){
n=!1;
}
},function(o){
n=!1,$(".js_search_loading").hide(),e("");
var s=o.base_resp.ret;
if(1e3==s)return void e("请输入小程序的appid");
if(0!=s)return void e("系统错误，请稍后尝试");
var a=o.items[0];
a&&(s=a.wxopen.status,1==s?e("公众号已添加此小程序，请误重复添加。"):2==s?e("该小程序已被邀请，请等待小程序管理员确认。"):5==s?e("该小程序已被其他公众号添加，请与小程序管理员联系。"):6==s?e("该小程序已被其他公众号邀请，请与小程序管理员联系。"):1002==s?e("未找到与当前公众号主体一致的小程序，请确认AppID正确，且与公众号主体一致。"):1001==s?e("该小程序未发布，请发布后重新邀请。"):1e3==s?e("该小程序已被违规封禁，无法邀请。"):1003==s?e("该小程序绑定身份证与公众号不一致，无法邀请。"):1004==s?e("小程序已被3个公众号关联，无法新增关联"):1005==s?e("公众号与小程序主体不同，且已关联3个主体不同的小程序，无法新增关联"):1006==s?e("已关联10个与公众号主体相同的小程序，无法新增关联"):i(!0),
h[0]=a,t());
})));
});
var o=!1;
$(".js_link_btn").on("click",function(){
var n=0;
return $("#notify_users").find("input").prop("checked")&&(n=1),0==h.length?void e("请先搜索小程序"):void(o||(o=!0,
r.post({
url:"/cgi-bin/wxopen?action=link",
data:{
appid:h[0].wxopen.appid,
qrcheck_ticket:w,
notify_users:n
},
complete:function(){
o=!1;
}
},function(n){
o=!1;
var i=n.base_resp.ret;
-1==i&&e("系统错误，请稍后尝试"),0==i?($(".js_wxopen_searchbox").hide(),$(".js_wxopen_succ").show(),
setTimeout(function(){
location.reload();
},1e3)):e(1004==i?"小程序已关联500个公众号，无法新增关联":"该小程序无法关联，请稍后再试");
})));
});
}
var a,c=(n("common/wx/popup.js"),n("common/wx/Step.js")),r=n("common/wx/Cgi.js"),p=n("common/wx/top.js"),_=n("common/wx/Tips.js"),l=n("biz_web/ui/checkbox.js"),d=(n("common/wx/dialog.js"),
n("safe/Scan.js")),u=null,w="",h=[],m=new p("#topTab",p.DATA.setting);
if(m.selected(0),cgiData.wxopens){
for(var j=0,f=0;f<cgiData.wxopens.length;f++)(1==cgiData.wxopens[f].status||2==cgiData.wxopens[f].status)&&j++;
a=cgiData.limit-j||0,(0==a||0==cgiData.quota)&&$("#js_link_wxopen").addClass("btn_disabled"),
a>0&&$("#js_show_quota").show();
}
$(".js_unbind_arrow").on("click",function(){
var n=$(this).attr("data-id");
$(".js_unbind_container_"+n).show();
}),$("body").on("click",function(n){
n.target.className.indexOf&&-1!=n.target.className.indexOf("js_unbind")||$(".js_unbind_container").hide();
}),$(".js_unbind").on("click",function(){
var n=null,o=$(this).attr("data-id");
$(".js_unbind_container").hide(),$("#del_weapp_tpl").popup({
title:"取消展示小程序",
width:960,
onHide:function(){
this.remove();
},
onShow:function(){
return n=new d({
container:".js_wxopen_qrbox",
type:"check",
source:"unbind_weapp",
wx_name:cgiData.wx_alias,
onconfirm:function(){
var n=this.code;
r.post({
url:"/cgi-bin/wxopen?action=unlink",
data:{
appid:o,
qrcheck_ticket:n
}
},function(n){
var o=n.base_resp.ret;
0==o?(_.suc("操作成功"),window.setTimeout(function(){
location.reload();
},1e3)):_.err("系统错误，请稍后尝试");
});
}
}),!1;
}
});
}),$("#js_link_wxopen").on("click",function(){
return 0!=a&&0!=cgiData.quota?(o(),!1):void 0;
});
});