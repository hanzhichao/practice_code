define("safe/safe_check.js",["common/wx/Tips.js","common/wx/popup.js","common/wx/Cgi.js","safe/Scan.js","safe/Mobile.js","biz_web/ui/checkbox.js","common/wx/Step.js","safe/tpl/safe_check.html.js"],function(e,s,t){
"use strict";
var i=e("common/wx/Tips.js"),n=(e("common/wx/popup.js"),e("common/wx/Cgi.js")),a=e("safe/Scan.js"),o=e("safe/Mobile.js"),c=(e("biz_web/ui/checkbox.js"),
e("common/wx/Step.js")),d=e("safe/tpl/safe_check.html.js");
t.exports={
_types:{
send:'_"(群发)"'
},
check:function(e,s,t){
t=t||{},t.onClose&&t.onClose(),"undefined"==typeof t.autoClose&&(t.autoClose=!0);
var i=!0;
switch(e.source){
case"msgs":
i=2==(2&e.protect_status);
break;

case"cburl":
i=4==(4&e.protect_status);
break;

case"appkey":
i=!0;
break;

case"showas":
i=!0;
break;

case"unbindopen":
i=!0;
break;

case"bind_IP":
i=!0;
break;

default:
i=!1;
}
if(i){
var n,o,c={
scaner:null,
destroy:function(){
c.scaner&&c.scaner.destroy();
}
},r=$(d).find(t&&t.checkdom?t.checkdom:".js_wxcheck");
return t.dialog&&t.dialogdom?(n=t.dialog,o=t.dialogdom,o.html(r)):o=r.popup({
title:"微信验证",
width:860,
onShow:function(){
n=this,$(this.$dialogWrp.get(0)).css({
"margin-top":-227
});
},
close:function(){
c&&c.destroy(),t&&t.onClose&&t.onClose(),this.remove();
}
}),c.scaner=new a({
container:o,
type:"check",
source:e.source,
msgid:e.msgid,
distinguish:e.distinguish,
default_initdom:e.default_initdom,
mustAdmin:e.mustAdmin,
wx_name:"wx.pass"==e.wx_alias?"":e.wx_alias,
onconfirm:function(){
var i={
code:this.code
},a=function(){
t.autoClose&&n.remove(),e.unadmin_url?location.href=e.unadmin_url:location.reload();
};
this.isadmin&&!this.issubadmin||!this.distinguish?(i.type=1,t.autoClose&&n.remove()):(i.type=this.issubadmin?2:-1,
"msgs"!=e.source&&"bind_IP"!=e.source||2!=i.type?(this.container.find(".js_wxchecks").html((t&&t.unadmin_html?t.unadmin_html:'<div class="page_msg large simple default"><div class="inner group"><span class="msg_icon_wrp"><i class="icon_msg_primary waiting"></i></span><div class="msg_content"><h4>已发送操作申请</h4><p>请等待管理员(%s)验证操作申请，验证通过后操作将立即进行。此申请在30分钟后过期，请尽快联系管理员验证。</p></div></div><div class="tool_bar tc border"><a href="javascript:;" class="btn btn_primary js_unadminsend">我知道了</a></div></div>').sprintf(this.opt.wx_name)),
this.container.find(".js_wxchecks").find(".js_unadminsend").on("click",a),this.container.find(".pop_closed").on("click",a),
n.resetPosition()):t.autoClose&&n.remove(),t&&t.notadminCallback&&t.notadminCallback()),
"function"==typeof s&&s(i);
}
}),n.resetPosition(),c;
}
return"function"==typeof s&&s("wx.pass"),null;
},
off_protect_tip:function(e,s){
s&&s.onClose&&s.onClose();
$(d).find(s.dom?s.dom:".js_off_protect").popup({
title:"开启微信保护",
width:860,
close:function(){
this.remove();
},
buttons:[{
text:"开始",
click:function(){
this.remove(),"function"==typeof e&&e();
},
type:"primary"
},{
text:"取消",
click:function(){
s&&s.onClose&&s.onClose(),this.remove();
},
type:"default"
}]
});
},
no_helper_tip:function(e,s){
s&&s.onClose&&s.onClose();
$(d).find(s.dom?s.dom:".js_no_helper").popup({
title:"开启微信保护",
width:860,
close:function(){
this.remove();
},
buttons:[{
text:"开始",
click:function(){
this.remove(),"function"==typeof e&&e();
},
type:"primary"
},{
text:"取消",
click:function(){
s&&s.onClose&&s.onClose(),this.remove();
},
type:"default"
}]
});
},
bind:function(e,s,t,r){
function l(){
var i=j.find(".js_step3");
i.show(),m=new a({
container:i,
type:e,
source:s.source,
code:s.code,
auth:s.auth,
dom_init:'<div class="status tips"><p>请使用微信扫描二维码进行验证</p></div>',
onconfirm:function(){
p.remove(),"function"==typeof t&&t({
data:this,
wx_name:"wx.pass"
});
}
});
}
function _(){
var e=j.find(".js_step3"),i=e.find(".js_forget"),n="/acct/findacct?action=scan";
i.find("a").attr("href",wx.url(n+("ticket"==s.auth?"&auth=ticket":""))),i.show(),
e.show(),m=new a({
container:e,
type:f,
source:s.source,
code:s.code,
auth:s.auth,
wx_name:"wx.pass"==s.wx_alias?"":s.wx_alias,
onconfirm:function(){
p.remove(),"function"==typeof t&&t({
data:this,
wx_name:"wx.pass"
});
}
});
}
!s&&(s={}),!r&&(r={});
var f;
switch(e){
case"bind_showas":
f="change_protect_showas";
break;

case"bind_masssend":
f="change_protect_masssend";
break;

case"bind_login":
f="change_protect_login";
break;

default:
f="bind";
}
r&&r.onClose&&r.onClose();
var m,u,p,h=s&&s.wx_alias?!0:!1,b="click",j=$(d).find(".js_bind").popup({
className:"dialog_process",
title:"bind"==e?"绑定公众号安全管理员":"开启微信保护",
width:960,
onShow:function(){
p=this,$(this.$dialogWrp.get(0)).css({
"margin-top":-227
});
},
close:function(){
r&&r.onClose&&r.onClose(),m&&m.destroy(),this.remove();
}
});
n.post({
url:wx.url("/misc/safeassistant?action=checkwx_report")+(s.auth?"&auth=ticket":""),
mask:!1
},$.noop),u=new c({
container:j.find(".js_process"),
selected:1,
names:["1 选择验证方式","2 账号验证",h?"3 开启微信保护":"3 绑定微信号"]
}),j.find(".js_step1_num").text(s&&s.mobile?s.mobile:""),j.find(".js_step1_email").text(s&&s.bind_mail?s.bind_mail:""),
s&&"1"==s.third_status&&j.find(".js_option").show(),j.find(".frm_radio").checkbox({
multi:!1,
onChanged:function(e){
j.find(".js_step1_next").data("type",e.val());
}
}),j.find(".js_step1_next").data("type","1").on(b,function(){
var e=$(this).data("type");
if(!("1"!=e||s&&s.mobile))return void i.err("手机号为空，请选择其他验证方式");
if(!("2"!=e||s&&s.bind_mail))return void i.err("邮箱为空，请选择其他验证方式");
if(u.setStep(2),j.find(".js_step1").hide(),"1"==e){
var t=j.find(".js_setp2_mobile");
t.find(".js_mobile_forget").attr("href",wx.url("/misc/rebindverify?action=mail_get&safeaction=mobile_mail_get&t=setting/safe-rebind"+("ticket"==s.auth?"&auth=ticket":""))),
t.show(),t.find(".js_oldsend").click();
}else if("2"==e){
var t=j.find(".js_step2_mail");
t.show(),t.find(".js_resend_mail").click();
}else j.find(".js_step2_name").show(),s.is_overseas&&(j.find(".js_step2_name").find(".js_cardname_label").text("身份证件姓名"),
j.find(".js_step2_name").find(".js_cardname_tips").text("请填写注册时所登记的身份证件姓名"),j.find(".js_step2_name").find(".js_cardid_label").text("身份证件号码"),
j.find(".js_step2_name").find(".js_cardid_tips").text("请正确填写注册时所登记的身份证件号码"));
}),j.find(".js_step1_cancel").on(b,function(){
p.remove();
}),j.find(".js_step2_prev").on(b,function(){
$(this).parent().parent().hide(),u.setStep(1),j.find(".js_step1").show();
}),s&&s.mobile&&new o({
container:j.find(".js_setp2_mobile"),
mobile_num:s.mobile,
old_submit:".js_step2_mobilecheck",
auth:s.auth,
old_callback:function(e){
j.find(".js_step2_mobilecheck").html("下一步").removeClass("btn_loading").attr("disabled",!1);
var t=e.err_code;
0==t?(j.find(".js_setp2_mobile").hide(),u.setStep(3),s.wx_alias?_():l()):i.err("验证失败");
},
old_checkparam:function(e){
s.code=e,s.source="mobile";
var t={
code_num:e
};
return s.auth&&(t.auth=s.auth),t;
},
before_check:function(){
return $(this).attr("disabled")?!1:($(this).html("验证中<i></i>").addClass("btn_loading").attr("disabled",!0),
!0);
}
}),j.find(".js_resend_mail").on(b,function(){
n.post({
url:wx.url("/misc/rebindverify?action=send_safe_code"),
mask:!1
},function(e){
if(!e&&!e.base_resp)return void i.err("邮件发送失败");
switch(+e.base_resp.ret){
case 0:
i.suc("邮件发送成功");
break;

default:
i.err("邮件发送失败");
}
});
}),j.find(".js_step2_namecheck").on(b,function(){
var e=j.find(".js_cardname"),t=j.find(".js_cardid"),a=e.val().trim(),o=t.val().trim();
if(!a)return i.err(s.is_overseas?"请输入身份证姓名":"请输入身份证件姓名"),!1;
if(!o)return i.err(s.is_overseas?"请输入身份证件号码":"请输入身份证号码"),!1;
$(this).html("验证中<i></i>").addClass("btn_loading").attr("disabled",!0);
var c={
card_name:a,
card_id:o
};
s.auth&&(c.auth=s.auth),n.post({
url:wx.url("/misc/safeassistant?action=check_id"),
data:c,
mask:!1
},function(e){
if(j.find(".js_step2_namecheck").html("下一步").removeClass("btn_loading").attr("disabled",!1),
!e&&!e.check_flag&&!e.code)return void i.err("验证失败");
switch(+e.check_flag){
case 1:
s.code=e.code,s.source="id",j.find(".js_step2_name").hide(),u.setStep(3),s.wx_alias?_():l();
break;

case-5:
case 200005:
i.err("请1分钟后重新尝试");
break;

default:
i.err("验证失败");
}
});
}),j.find(".js_step2_mailcheck").on(b,function(){
var e=j.find(".js_email_code").val().trim();
if(!e)return i.err("请输入邮件验证码"),!1;
$(this).html("验证中<i></i>").addClass("btn_loading").attr("disabled",!0);
var t={
safecode:e
};
s.auth&&(t.auth=s.auth),n.post({
url:wx.url("/misc/safeassistant?action=check_safecode"),
data:t,
mask:!1
},function(e){
if(j.find(".js_step2_mailcheck").html("下一步").removeClass("btn_loading").attr("disabled",!1),
!e&&!e.check_flag&&!e.code)return void i.err("验证失败");
switch(+e.check_flag){
case 1:
s.code=e.code,s.source="safecode",j.find(".js_step2_mail").hide(),u.setStep(3),s.wx_alias?_():l();
break;

default:
i.err("验证失败");
}
});
});
}
};
});