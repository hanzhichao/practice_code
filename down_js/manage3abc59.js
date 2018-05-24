define("wxopen/manage.js",["common/wx/popup.js","common/wx/popover.js","common/wx/Step.js","common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js","common/wx/dialog.js","safe/Scan.js"],function(e){
"use strict";
function t(e){
var t=null,n=e;
$("#del_weapp_tpl").popup({
title:"取消关联小程序",
width:960,
onHide:function(){
this.remove();
},
onShow:function(){
return t=new d({
container:".js_wxopen_qrbox",
type:"check",
source:"unbind_weapp",
wx_name:cgiData.wx_alias,
onconfirm:function(){
var e=this.code;
u.post({
url:"/cgi-bin/wxopen?action=unlink",
data:{
appid:n,
qrcheck_ticket:e
}
},function(e){
var t=e.base_resp.ret;
0==t?(f.suc("操作成功"),window.setTimeout(function(){
location.reload();
},1e3)):f.err("系统错误，请稍后尝试");
});
}
}),!1;
}
});
}
function n(){
return 0==v?void f.err("当前关联小程序已达上限, 无法继续关联"):cgiData.diff_realname_quota+cgiData.same_realname_quota==0?void f.err("无法新增关联"):(o(),
!1);
}
function i(){
function e(e){
n||(n=!0,u.post({
url:"/cgi-bin/fastregister?action=del",
data:{},
complete:function(){
n=!1;
}
},function(t){
var n=t.base_resp.ret;
0==n?(f.suc("操作成功"),e&&e()):f.err("系统错误，请稍后尝试");
}));
}
var t={
title:"提示",
className:"",
data:{
msg:""
},
onHide:function(){
this.remove();
},
onShow:function(){},
buttons:[]
};
if(1==cgiData.special_realname_forbid_fastregister)return t.data.msg="由于安全原因，你的帐号暂时无法快速注册小程序。",
t.buttons.push({
text:"前往注册",
type:"primary",
click:function(){
window.location.href="https://mp.weixin.qq.com/wxopen/waregister?action=step1";
}
}),$("#no_register_tpl").popup(t),!1;
if(cgiData.can_fast_register)if(0==cgiData.fast_register_quato_rest)t.data.msg="本月已复用资质创建"+cgiData.fast_register_quato_limit+"个小程序，不可新增。",
t.buttons.push({
text:"确定",
type:"primary",
click:function(){
this.remove();
}
}),$("#no_register_tpl").popup(t);else if(cgiData.fast_register_num_in_process&&cgiData.fast_register_num_in_process>0){
var n=!1;
$($.trim(template.render("js_item_link_mp_tpl",{
data:k
}))).popup(t),$(".js_delete_unlink_wxopen").on("click",function(){
var t=$(this).attr("data-status");
return 8==t?(f.err("此帐号已激活，请完成注册后再解绑删除。"),!1):void e(function(){
location.href=wx.url("/cgi-bin/readtemplate?t=wxopen/wxopen_create_intro_tmpl");
});
});
}else cgiData.reach_same_realname_limit?(t.data.msg="你的帐号已关联10个同主体小程序，快速注册的小程序帐号将不与公众号关联，请在完成注册后自行关联。",
t.buttons.push({
text:"取消",
click:function(){
this.remove();
}
}),t.buttons.push({
text:"下一步",
type:"primary",
click:function(){
location.href=wx.url("/cgi-bin/readtemplate?t=wxopen/wxopen_create_intro_tmpl");
}
}),$("#no_register_tpl").popup(t)):location.href=wx.url("/cgi-bin/readtemplate?t=wxopen/wxopen_create_intro_tmpl");else 0==cgiData.realname_type?(t.data.msg="暂不支持个人类型公众号复用资质创建小程序。请按线上流程完成小程序创建。",
t.buttons.push({
text:"前往注册",
type:"primary",
click:function(){
location.href="https://mp.weixin.qq.com/wxopen/waregister?action=step1";
}
})):(t.data.msg="你的公众号未完成微信认证，无法复用资质申请小程序，请先完成认证。",t.buttons.push({
text:"前往认证",
type:"primary",
click:function(){
location.href=wx.url("/acct/wxverifyorder?action=index");
}
})),$("#no_register_tpl").popup(t);
}
function o(){
var e=null;
$("#add_weapp_tpl").popup({
title:"关联小程序",
className:"dialog_weapplink_wrp",
width:960,
onHide:function(){
this.remove();
},
onShow:function(){
var t=this;
h=new _({
container:".js_process",
selected:1,
names:["1.验证身份","2.关联小程序"]
}),e=new d({
container:".js_wxopen_qrbox",
type:"check",
source:"bind_weapp",
wx_name:cgiData.wx_alias,
onconfirm:function(){
g=this.code,h.setStep(2),$(".js_wxopen_qrbox").hide(),$(".js_wxopen_searchbox").show(),
t.resetPosition(),r(),s(!1);
}
});
}
});
}
function a(e){
e?$(".js_fail_msg").html(e).show():$(".js_fail_msg").html(e).hide();
}
function s(e){
e?$(".js_link_btn").removeClass("btn_disabled"):$(".js_link_btn").addClass("btn_disabled");
}
function c(){
var e=$(".dialog_weapplink_wrp .js_dialog_list");
return 0==x.length?void e.html(""):void e.html(template.render("weapplink_item_tpl",{
data:x
}));
}
function r(){
$("#js_search_input").on("keyup",function(e){
a(""),13==e.keyCode&&$(".js_search_btn").click();
});
var e=!1;
$(".js_search_btn").on("click",function(){
$(".js_show_unreleased").hide(),$("#notify_users").html(""),$("#show_profile").html("");
var t=$.trim($(".js_wxopen_searchbox").find("#js_search_input").val());
return""==t?void a("请输入要搜索的小程序"):(x=[],c(),e?!1:(e=!0,$(".js_search_loading").show(),
s(!1),void u.post({
url:"/cgi-bin/wxopen?action=search",
data:{
key:t,
qrcheck_ticket:g
},
complete:function(){
e=!1;
}
},function(t){
e=!1,$(".js_search_loading").hide(),a("");
var n=t.base_resp.ret;
if(1e3==n)return void a("请输入小程序的appid");
if(1001==n)return void a("你的操作过于频繁，请稍后尝试");
if(1003==n)return void a("二维码失效，请扫码后重试");
if(0!=n)return void a("系统错误，请稍后尝试");
var i=t.items[0];
if(i){
if(n=i.wxopen.status,1==n)a("公众号已添加此小程序，请误重复添加。");else if(2==n)a("该小程序已被邀请，请等待小程序管理员确认。");else if(5==n)a("该小程序已被其他公众号添加，请与小程序管理员联系。");else if(6==n)a("该小程序已被其他公众号邀请，请与小程序管理员联系。");else if(1002==n)a("未找到与当前公众号主体一致的小程序，请确认AppID正确，且与公众号主体一致。");else if(1e3==n)a("该小程序已被违规封禁，无法邀请。");else if(1003==n)a("该小程序绑定身份证与公众号不一致，无法邀请。");else if(1004==n)a("小程序已关联500个公众号，无法新增关联");else if(1005==n)a("公众号与小程序主体不同，且已关联3个主体不同的小程序，无法新增关联");else if(1006==n)a("已关联10个与公众号主体相同的小程序，无法新增关联");else if(1007==n)a("此小程序帐号本月已被关联500次，无法新增关联");else if(1009==n)a("本月已关联10次与公众号同主体的小程序，无法新增关联");else if(1010==n)a("本月已关联3次与公众号主体不同的小程序，无法新增关联");else if(s(!0),
i.wxopen.released){
var o=new w({
container:$("#notify_users"),
label:"关联后给已关注公众号的用户发送通知",
name:"notify",
type:"checkbox"
});
o.checked(!0);
var o=new w({
container:$("#show_profile"),
label:"关联后展示在公众号资料页",
name:"profile",
type:"checkbox"
});
o.checked(!0);
}else $(".js_show_unreleased").show();
x[0]=i,c();
}
})));
});
var t=!1;
$(".js_link_btn").on("click",function(){
var e=0;
$("#notify_users").find("input").prop("checked")&&(e=1);
var n=0;
return $("#show_profile").find("input").prop("checked")&&(n=1),0==x.length?void a("请先搜索小程序"):void(t||(t=!0,
u.post({
url:"/cgi-bin/wxopen?action=link",
data:{
appid:x[0].wxopen.appid,
qrcheck_ticket:g,
notify_users:e,
show_profile:n
},
complete:function(){
t=!1;
}
},function(e){
t=!1;
var n=e.base_resp.ret;
-1==n&&a("系统错误，请稍后尝试"),0==n?($(".js_wxopen_searchbox").hide(),$(".js_wxopen_succ").show(),
setTimeout(function(){
location.reload();
},1e3)):a("该小程序无法关联，请稍后再试");
})));
});
}
function p(){
1==cgiData.show_entityshop?m.show({
type:"info",
msg:"你可以将门店管理插件升级为门店小程序插件。",
buttons:[{
text:"升级",
click:function(){
location.href="/merchant/entityshop?action=upgrade_page&lang=zh_CN&token="+wx.data.t+"&lang=zh_CN";
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
}):2==cgiData.show_entityshop&&(location.href="/cgi-bin/plugindetails?t=service/profile&pluginid=10058&action=intro&token="+wx.data.t+"&lang=zh_CN");
}
var l=(e("common/wx/popup.js"),e("common/wx/popover.js")),_=e("common/wx/Step.js"),u=e("common/wx/Cgi.js"),f=e("common/wx/Tips.js"),w=e("biz_web/ui/checkbox.js"),m=e("common/wx/dialog.js"),d=e("safe/Scan.js"),h=null,g="",x=[],v=0;
cgiData.wxopens.length?$("#app_view").show():$("#noapp_view").show();
var k,b=-1;
if(cgiData.wxopens){
for(var j=0,y=0;y<cgiData.wxopens.length;y++)"SOURCE_NORMAL"==cgiData.wxopens[y].source?(1==cgiData.wxopens[y].status||2==cgiData.wxopens[y].status||3==cgiData.wxopens[y].status||4==cgiData.wxopens[y].status)&&j++:"SOURCE_FASTREGISTER"==cgiData.wxopens[y].source&&(j++,
(7==cgiData.wxopens[y].status||8==cgiData.wxopens[y].status||9==cgiData.wxopens[y].status||12==cgiData.wxopens[y].status)&&(k=cgiData.wxopens[y],
b=y));
b>=0&&k&&k.no_link_mp&&cgiData.wxopens.splice(b,1),v=cgiData.limit-j||0,0>v&&(v=0),
$(".js_same_realname_quota").html(cgiData.same_realname_quota),$(".js_diff_realname_quota").html(cgiData.diff_realname_quota);
}
$(".js_link_wxopen").on("click",function(){
n();
}),$("#js_link_wxopen_btn").on("click",function(){
var e=$("#bind_wxopen_tpl").popup({
title:"添加小程序",
className:"add_weapp_dialog",
width:960,
onHide:function(){
this.remove();
},
onShow:function(){
var e=this;
$(".js_link_wxopen").on("click",function(){
e.remove(),n();
}),$(".js_link_register").on("click",function(){
return e.remove(),i(),!1;
}),$(".js_link_store").on("click",function(){
return e.remove(),p(),!1;
});
}
});
$(".js_same_realname_quota",$(e.get()[0])).html(cgiData.same_realname_quota),$(".js_diff_realname_quota",$(e.get()[0])).html(cgiData.diff_realname_quota);
}),$(".js_link_register").on("click",function(){
return i(),!1;
}),$(".js_link_store").on("click",function(){
return p(),!1;
}),$(".js_item_detail").on("click",function(e){
for(var n=e.currentTarget.getAttribute("data-appid")||"",i=e.currentTarget.getAttribute("data-nearby_display_status")||"",o={},a=0;a<cgiData.wxopens.length;a++)if(cgiData.wxopens[a].appid==n){
o=cgiData.wxopens[a];
break;
}
var s=null;
$(template.render("item_detail_tpl",{
data:o
})).popup({
title:"小程序详情",
onHide:function(){
this.remove(),s&&s.remove(),s=null;
},
onShow:function(){
function e(e){
a||(a=!0,u.post({
url:"/cgi-bin/fastregister?action=del",
data:{},
complete:function(){
a=!1;
}
},function(t){
var n=t.base_resp.ret;
0==n?(f.suc("操作成功"),window.setTimeout(function(){
location.reload();
},1e3),e&&e()):f.err("系统错误，请稍后尝试");
}));
}
var n=this;
$(".js_unbind_wxopen").on("click",function(){
n.remove(),1==i?m.show({
type:"warn",
msg:"无法解除关联|该小程序正在公众号附近地点展示，请先取消展示，再解除关联",
buttons:[{
text:"查看",
click:function(){
this.remove();
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
}):t(o.appid);
});
var a=!1;
$(".js_delete_wxopen").on("click",function(){
var t=$(this).attr("data-status");
return 8==t?(f.err("此帐号已激活，请完成注册后再解绑删除。"),!1):void(7==t?s=new l({
dom:$(this),
content:"此帐号未完成注册，删除后将无法继续激活，需要重新注册。",
buttons:[{
text:"确定",
click:function(){
var t=this;
e(function(){
t.remove();
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}],
onRemove:function(){
s=null;
}
}):e());
}),$(".js_wxverify_reuse").on("click",function(){
var e=$(this).data("copy_verify_status"),t=$(this).data("weappid");
0==e||4==e?window.location.href=wx.url("/cgi-bin/wxopen?action=copy_verify_page&appid="+t):5==e?(n.remove(),
m.show({
type:"info",
msg:"小程序复用公众号资质认证有效期与公众号认证有效期一致。公众号认证有效期已少于15天，建议先完成公众号微信认证年审再复用资质认证小程序。",
buttons:[{
text:"返回",
click:function(){
this.remove();
}
},{
text:"继续申请",
type:"normal",
click:function(){
window.location.href=wx.url("/cgi-bin/wxopen?action=copy_verify_page&appid="+t);
}
}]
})):window.location.href=wx.url("/cgi-bin/wxopen?action=copy_verify_page&appid="+t);
});
}
});
});
});