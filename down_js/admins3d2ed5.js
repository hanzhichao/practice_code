define("safe/admins.js",["biz_common/jquery.validate.js","common/wx/Tips.js","common/wx/popup.js","safe/Scan.js","common/wx/region.js","common/wx/overseasList.js","common/wx/dialog.js","common/wx/Cgi.js","common/wx/Step.js","safe/safe_check.js","common/wx/popover.js"],function(e){
"use strict";
e("biz_common/jquery.validate.js");
var t=e("common/wx/Tips.js"),i=template.render,n=(e("common/wx/popup.js"),e("safe/Scan.js")),a=e("common/wx/region.js"),s=e("common/wx/overseasList.js"),o=(e("common/wx/dialog.js"),
e("common/wx/Cgi.js")),r=(e("common/wx/Step.js"),e("safe/safe_check.js"),e("common/wx/popover.js")),c=wx.cgiData.info||{},d=$("#js_admin_change"),l=$("#js_bind_admin_dialog_tpl"),_=s.mobilePrefix,p=s.countryCode;
if(c.strategy_resp.strategy_status){
var m=c.strategy_resp.strategy_status;
c.protectType=m.wx_protect?1:m.mobile_protect?2:0,c.wxName=m.wx_alias||"",c.mobileName=m.mobile||"",
c.protect_status=0!=c.protectType?c.strategy_resp.strategy_status.protect_status:0,
c.strategy_resp.strategy_status.is_overseas=wx.cgiData.is_overseas;
}
var u=function(){
function e(){
d.click(function(){
var e={
step:null,
o_scan:null,
d_scan:null,
dialog:null,
btns:null,
data:{}
};
l.popup({
title:"修改管理员信息",
width:726,
className:"change_admin_dialog",
onShow:function(){
e.dialog=this.get();
var i=this;
e.o_scan=new n({
container:e.dialog.find(".js_o_scan"),
type:"check",
source:"modify",
wx_name:c.wxName,
onconfirm:function(){
e.data.ticket=this.opt.ticket,e.data.code=this.code,t.suc("已成功验证原微信号"),e.dialog.find(".js_step_1").hide(),
e.dialog.find(".js_step_2").show(),e.dialog.find(".js_step_2").html(template.render("js_bind_admin_step_2_tpl",{
realname_type:wx.cgiData.realname_type,
operator_name:wx.cgiData.operator_name,
operator_id_card:wx.cgiData.operator_id_card,
ticket:e.data.ticket,
is_overseas:wx.cgiData.is_overseas
}));
var s=e.dialog.find(".js_name_input"),r=e.dialog.find(".js_idcard_input"),c=e.dialog.find(".js_mobile_input"),d=e.dialog.find(".js_verifycode_input"),l=e.dialog.find(".js_mobile_button"),m=(e.dialog.find(".js_not_qrcheck_div"),
e.dialog.find(".js_qrcheck_div"),e.dialog.find(".js_scan_tips"),e.dialog.find(".js_scan_area"));
wx.cgiData.is_overseas&&new a({
container:"#js_div_location",
data:{
country:"中国大陆"
},
retain:{
country:p,
province:[-1],
city:[-1]
},
is_overseas:!0,
onChange:function(e,t){
$("#js_input_"+e).val(t);
}
});
var u=0,f=null,h=null,b=!1,w=function(){
var e=(new Date).getTime(),t=Math.floor((e-u)/1e3);
f&&clearTimeout(f),t>=60?(c.prop("readonly",!1),b=!0,l.html("发送验证码").enable()):(c.prop("readonly",!0),
b=!1,l.disable().html("%s秒后可重发".sprintf(60-t)),f=setTimeout(w,1e3));
};
l.on("click",function(){
return l.hasClass("btn_disabled")?!1:c.val()?(u=(new Date).getTime(),h=1==wx.cgiData.is_overseas?_[$("#js_input_country").val()]+$.trim(c.val()):"+86"+$.trim(c.val()),
w(),void o.post({
url:"/cgi-bin/mmbizverifysms",
data:{
action:"get_code_new",
f:"json",
mobile_num:h
},
mask:!1
},function(e){
if(!e)return u=0,void t.err("验证码发送失败");
var i=+e.err_code;
0==i?t.suc("验证码已经发送"):(t.err("验证码发送失败"),u=0);
})):(t.err("请输入手机号码"),!1);
});
var g=function(e){
function t(e){
var t,i=0;
"x"==e[17].toLowerCase()&&(e[17]=10);
for(var s=0;17>s;s++)i+=n[s]*e[s];
return t=i%11,e[17]==a[t]?!0:!1;
}
function i(e){
var t=e.substring(6,10),i=e.substring(10,12),n=e.substring(12,14),a=new Date(t,parseFloat(i)-1,parseFloat(n));
return(new Date).getFullYear()-parseInt(t)<18?!1:a.getFullYear()!=parseFloat(t)||a.getMonth()!=parseFloat(i)-1||a.getDate()!=parseFloat(n)?!1:!0;
}
if(wx.cgiData.is_overseas)return!0;
var n=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1],a=[1,0,10,9,8,7,6,5,4,3,2];
if(e=$.trim(e.replace(/ /g,"")),15==e.length)return!1;
if(18==e.length){
var s=e.split("");
return i(e)&&t(s)?!0:!1;
}
return!1;
},v=function(e){
return wx.cgiData.is_overseas?e.length>0:/^1\d{10}$/.test(e);
},j=function(e){
return/^\d{6}$/.test(e);
},x=function(){
if($(".js_tips").hide(),$(".js_idcard_tips span").text(1==wx.cgiData.is_overseas?"请输入正确的身份证件号码":"请输入正确的身份证号码"),
$(".js_mobile_tips span").text("请输入正确的手机号码"),$(".js_verifycode_tips span").text("请输入短信验证码"),
0!=wx.cgiData.realname_type){
if(!s.val())return $(".js_name_tips").show(),!1;
if(r.val()!=wx.cgiData.operator_id_card&&!g(r.val())||!r.val())return $(".js_idcard_tips").show(),
!1;
}
return v(c.val())&&c.val()?(l.enable(),j(d.val())&&d.val()?!0:($(".js_verifycode_tips").show(),
!1)):($(".js_mobile_tips").show(),l.disable(),!1);
},k=null,y=function(){
k&&clearTimeout(k),k=setTimeout(function(){
if(x()){
var a={
action:"submit_operator",
name:s.val(),
idcardnum:$.trim(r.val()),
mobile:"+86"+$.trim(c.val()),
verifycode:$.trim(d.val()),
ticket:e.data.ticket
};
wx.cgiData.is_overseas&&(a.mobile=_[$("#js_input_country").val()]+$.trim(c.val())),
o.post({
url:"/safe/safeqrconnect",
data:a
},function(a){
0==a.base_resp.ret?(m.show(),e.d_scan=new n({
container:e.dialog.find(".js_d_scan"),
type:"rebind",
code:e.data.code,
onconfirm:function(){
t.suc("已成功绑定管理员微信号"),setTimeout(function(){
location.reload();
},300);
},
onshow:function(){
i.resetPosition(),e.dialog.find(".js_status").html('<p style="color:#8d8d8d">为了验证你的身份，请用绑定了'+s.val()+'本人银行卡的微信扫描二维码。本验证方式不扣除任何费用。</p><br><p style="color:#8d8d8d">若微信没有绑定银行卡，请先绑定。<a href="http://kf.qq.com/faq/120911VrYVrA141111MFVVvU.html" target="_blank">如何绑定</a><p>');
}
})):165002==a.base_resp.ret?$(".js_verifycode_tips").show().find("span").text("手机验证码校验错误"):165003==a.base_resp.ret?$(".js_idcard_tips").show().find("span").text("身份证超过绑定上限"):165004==a.base_resp.ret&&$(".js_mobile_tips").show().find("span").text("手机号超过绑定上限");
});
}else m.hide();
},500);
};
0!=wx.cgiData.realname_type&&(s.on("input propertychange",function(){
y();
}),r.on("input propertychange",function(){
y();
})),c.on("input propertychange",function(){
y();
}),d.on("input propertychange",function(){
y();
});
}
});
},
onHide:function(){
e.o_scan&&e.o_scan.destroy(),e.d_scan&&e.d_scan.destroy();
}
});
});
}
function s(){
$("#js_admin_bind").click(function(){
window.location.href=wx.url("/cgi-bin/contractorverify?action=bind_admin_page");
});
}
function m(e,i){
var a=null,s=null,o=$(".js_dialog").popup({
title:"微信验证",
width:960,
close:function(){
a&&a.destroy(),this.remove();
},
onShow:function(){
s=this;
}
});
o.find(".js_nb_tip").text("你的帐号开启了微信保护功能，绑定运营者微信号需进行微信验证").show(),a=new n({
container:o,
type:"check",
source:"bind_second_admin",
wx_name:c.wxName,
second_openid:e,
auto_msgid:!0,
expire_time_type:i,
onconfirm:function(){
var e=this.code;
e?(t.suc("已邀请绑定"),s.remove(),setTimeout(function(){
location.reload();
},300)):t.err("扫码确认失败，请重试");
}
});
}
function u(e,i){
$("#js_helper_bind").on("click",function(){
var n,a,s,r,c,d,l,_,p=!1,u=$("#js_add_user").popup({
title:"绑定运营者微信号",
width:960,
close:function(){
this.remove();
},
buttons:[{
text:"邀请绑定",
type:"disabled",
click:function(){
return l.hasClass("btn_disabled")?!1:void(n?(a=$(".frm_radio_label.selected input").val(),
this.remove(),m(n,a)):(t.err("没有搜索结果时不能开始邀请绑定"),s.focus()));
}
},{
text:"取消",
type:"default",
click:function(){
this.remove();
}
}]
});
i>=20&&(u.find("#js_radio_temp").css("display","none"),u.find(".frm_radio_label.selected").removeClass("selected"),
u.find("#js_radio_long").addClass("selected")),e>=5&&(u.find("#js_radio_long").css("display","none"),
u.find(".frm_radio_label.selected").removeClass("selected"),u.find("#js_radio_temp").addClass("selected")),
u.find("#js_long_num").text(Math.max(0,5-e)),u.find("#js_temp_num").text(Math.max(0,20-i)),
s=u.find(".js_keyword"),r=u.find(".js_search_loading"),_=u.find(".js_search"),c=u.find(".js_no_user"),
d=u.find(".js_search_result"),l=u.find(".js_btn_p").eq(0),_.click(function(){
if(p)return!1;
c.hide();
var e=s.val();
return e?(d.hide(),p=!0,l.removeClass("btn_primary").addClass("btn_disabled"),r.show(),
n=null,u.popup("resetPosition"),a=$(".frm_radio_label.selected input").val(),void o.post({
url:"/cgi-bin/safecenterstatus",
data:{
action:"check_user",
username:e,
expire_time:a
},
complete:function(){
p=!1;
}
},function(e){
switch(r.hide(),e.base_resp&&"undefined"!=typeof e.base_resp.ret||c.text("系统错误，请稍候再试").show(),
+e.base_resp.ret){
case 0:
if(e.openid){
d.show();
var t=e.headimgurl||"";
t=t?t.endsWith("/0")?t:t+"/0":"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0",
d.find("img").attr("src",t),e.nickname&&d.find(".js_nickname").text(e.nickname),
n=e.openid,l.removeClass("btn_disabled").addClass("btn_primary"),u.popup("resetPosition");
}else c.text("系统错误，请稍候再试").show();
break;

case 200101:
case-101:
c.html('<p style="line-height:1.5;padding:10px 0 0">该微信用户无法绑定该公众号</p><p style="color:red;line-height:1.5;text-align:left;padding:10px 274px">1、该微信号不存在，请先注册微信号。<br>2、若已注册，请打开手机微信中的“我->设置->隐私->添加我的方式”中，将手机号、微信号、QQ号搜索开启，否则无法操作。</p>').show();
break;

case 200102:
case-102:
c.text("该微信号未开通手机保护，无法绑定为运营微信号").show();
break;

case-103:
case 200103:
c.html('<p style="color:red">该微信用户未关注当前公众号，请先关注后再绑定</p>').show();
break;

case 200104:
case-104:
c.text("该公众号已经绑定了25个运营者微信号，无法绑定更多微信号").show();
break;

case 200105:
case-105:
if(c.text("该微信号已经绑定了5个公众平台帐号，不可继续绑定。").show(),e.openid){
d.show();
var t=e.headimgurl||"";
t=t?t.endsWith("/0")?t:t+"/0":"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0",
d.find("img").attr("src",t),e.nickname&&d.find(".js_nickname").text(e.nickname),
n=e.openid,u.popup("resetPosition");
}
break;

case-1051:
if(c.text("该微信号已经绑定了5个公众平台帐号，只有法定代表人才能继续授权，如果要继续申请，将发送法定代表人授权").show(),l.removeClass("btn_disabled").addClass("btn_primary"),
e.openid){
d.show();
var t=e.headimgurl||"";
t=t?t.endsWith("/0")?t:t+"/0":"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0",
d.find("img").attr("src",t),e.nickname&&d.find(".js_nickname").text(e.nickname),
n=e.openid,l.removeClass("btn_disabled").addClass("btn_primary"),u.popup("resetPosition");
}else c.text("系统错误，请稍候再试").show();
break;

case-1052:
if(c.html('该微信号已经绑定了5个公众平台帐号，只有法定代表人才能继续授权，如果要继续申请，请<a href="%s">绑定法定代表人</a>'.sprintf(wx.url("/cgi-bin/settingpage?t=setting/index&action=index"))).show(),
e.openid){
d.show();
var t=e.headimgurl||"";
t=t?t.endsWith("/0")?t:t+"/0":"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0",
d.find("img").attr("src",t),e.nickname&&d.find(".js_nickname").text(e.nickname),
n=e.openid,u.popup("resetPosition");
}
break;

case-1053:
if(e.openid){
d.show();
var t=e.headimgurl||"";
t=t?t.endsWith("/0")?t:t+"/0":"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0",
d.find("img").attr("src",t),e.nickname&&d.find(".js_nickname").text(e.nickname),
n=e.openid,u.popup("resetPosition");
}
c.text("该微信号绑定了50个帐号，不可继续绑定").show();
break;

case-1054:
if(e.openid){
d.show();
var t=e.headimgurl||"";
t=t?t.endsWith("/0")?t:t+"/0":"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0",
d.find("img").attr("src",t),e.nickname&&d.find(".js_nickname").text(e.nickname),
n=e.openid,u.popup("resetPosition");
}
c.text("该微信号已经发送邀请，不能重复发送邀请").show();
break;

case 200106:
case-106:
c.text("该微信号已经成功绑定了该公众号，请勿重复绑定").show();
break;

case 200107:
case-107:
c.text("该公众号还未绑主管理员帐号，请绑定后再添加运营者微信号").show();
break;

case 200108:
case-108:
c.text("该公众号已经绑定或邀请满25个运营者微信号，请尽快联系个人微信号进行确认").show();
break;

case-110:
c.text("操作过于频繁，请稍后重试").show();
break;

case-115:
c.text("该公众号已经绑定或邀请满5个长期运营者微信号，请尽快联系个人微信号进行确认").show();
break;

case-116:
c.text("该公众号已经绑定或邀请满20个短期运营者微信号，请尽快联系个人微信号进行确认").show();
break;

case-118:
c.text("新管理员必须和主体身份一致。").show();
break;

default:
c.text("系统错误，请稍候再试").show(),o.handleRet(e,{
id:64463,
key:20,
showMsg:!1,
url:"/cgi-bin/safecenterstatus"
});
}
})):(c.text("请输入微信号").show(),void s.focus());
}),s.on("keyup",function(e){
wx.isHotkey(e,"enter")&&_.click();
}).on("change",function(){
_.click();
}).focus();
});
}
function f(){
var e=function(){
var e=$(this),i=e.data("id"),a=e.data("status"),s=1==+a?"unbind_second_admin":"cancel_second_admin";
if(i){
var o=null,r=null,d=$(".js_dialog").popup({
title:"微信验证",
width:960,
close:function(){
o&&o.destroy(),this.remove();
},
onShow:function(){
r=this;
}
});
d.find(".js_nb_tip").text("你的帐号开启了微信保护功能，解除绑定运营者微信号需进行微信验证").show(),o=new n({
container:d,
type:s,
second_openid:i,
wx_name:c.wxName,
onconfirm:function(){
var e=this.code;
e?(t.suc("解绑成功"),setTimeout(function(){
location.reload();
},300)):t.err("扫码确认失败，请重试");
}
});
}
};
$(".js_helper_unbind").on("click",e),$(".js_helper_unsent").on("click",e);
}
function h(){
$("#js_helper_list").find(".js_unsent_tip").on("mouseover",function(){
$(".popover").hide();
var e=$(this),t=e.data("nick").html(!0)||"";
j=new r({
dom:e,
content:"已发送绑定邀请，待%s确认后即可绑定，若24小时内未确认，系统将自动撤销邀请。".sprintf(t)
});
}).on("mouseout",function(){
j&&j.remove();
});
}
function b(){
if(c.wxName){
$("#js_admin_change").show();
var t=$(".js_admin_area");
return t.html(template.render("js_admin_area_tpl",{
operator_name:wx.cgiData.operator_name,
operator_id_card:wx.cgiData.operator_id_card,
operator_mobile:wx.cgiData.operator_mobile,
operator_wx:c.wxName,
is_overseas:wx.cgiData.is_overseas
})),$("#js_helper_bind_contain").show(),e(),!0;
}
return $("#js_admin_bind").show(),$(".js_admin_empty").show(),s(),!1;
}
function w(e){
var t=[],n=c.seconde_amin,a=c.item_list.item_list,s=n.length+a.length,o=0,r=0,d=0;
if(s>0){
for(var l=0,_=n.length;_>l;l++){
var p=n[l].expire_time;
"undefined"==typeof p||0==+p?(o=0,++d):+p>=1&&(o=1,++r),t.push({
openid:n[l].openid,
username:n[l].username,
nickname:n[l].nickname,
status:1,
temp:o
});
}
for(var l=0,_=a.length;_>l;l++){
var p=a[l].expire_time;
"undefined"==typeof p||0==+p?(o=0,++d):+p>=1&&(o=1,++r),t.push({
openid:a[l].openid,
username:a[l].username,
nickname:a[l].nickname,
status:0,
temp:o
});
}
$("#js_helper_list").html(i("tpl_helper_tb",{
data:t,
admin:e
})),f(),h();
}else $("#js_helper_list").html(i("tpl_helper_tb",{
data:t,
admin:e
}));
s>=25?$("#js_helper_bind").addClass("btn_disabled").attr("disabled",!0):($("#js_helper_bind").addClass("btn_primary"),
$("#js_helper_left").text(25-s),u(d,r));
}
function g(){
$(document).on("click",".frm_radio_label",function(e){
var t=$(this),i=t.closest(".js_bind");
i.length||(e.preventDefault(),$(".frm_radio_label.selected").removeClass("selected"),
$(this).addClass("selected"));
});
}
function v(){
var e=b();
w(e),g();
}
var j;
return{
init:v
};
}();
u.init();
});