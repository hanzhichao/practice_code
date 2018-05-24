define("advanced/dev.js",["common/qq/mask.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/top.js","safe/safe_check.js","safe/check_pwd.js","common/wx/popup.js","common/wx/dialog.js","biz_web/ui/checkbox.js","common/wx/tooltips.js","common/wx/simplePopup.js","common/wx/popover.js","common/wx/Step.js"],function(e){
"use strict";
function t(){
var e=null,t={
wxverify:wx.url("/acct/wxverifyorder?action=index"),
wxpay:wx.url("/cgi-bin/frame?t=business/index_frame&iframe=%2Fpaymch%2Fbusiness%3Ft%3Dbusiness%2Finfo%26action%3Doverview&nav=business&hide=0")
};
$(".jsAsk").each(function(){
var e=$(this).data("type"),s=[];
switch(+e){
case 1:
s.push("订阅号必须通过%s微信认证%s".sprintf('<a target="_blank" href="%s">'.sprintf(t.wxverify),"</a>")),
s.push("服务号自动获得");
break;

case 2:
s.push("订阅号无法开通此接口"),s.push("服务号必须通过%s微信认证%s".sprintf('<a target="_blank" href="%s">'.sprintf(t.wxverify),"</a>"));
break;

case 3:
s.push("必须通过微信认证");
break;

case 4:
s.push("必须是服务号"),s.push("必须通过%s微信认证%s".sprintf('<a target="_blank" href="%s">'.sprintf(t.wxverify),"</a>")),
s.push("满足以上条件方可申请");
break;

case 5:
s.push("必须是服务号"),s.push("必须通过%s微信认证%s".sprintf('<a target="_blank" href="%s">'.sprintf(t.wxverify),"</a>")),
s.push("必须获得%s微信支付%s".sprintf('<a target="_blank" href="%s">'.sprintf(t.wxpay),"</a>")),
s.push("满足以上条件方可申请");
break;

case 6:
s.push("必须通过%s微信认证%s".sprintf('<a target="_blank" href="%s">'.sprintf(t.wxverify),"</a>")),
s.push("满足以上条件方可申请");
}
s="<p>获得条件：</p><ul><li>"+s.join("</li><li>")+"</li></ul>",$(this).data("content",s);
}),$("table").on("mouseover",".jsAsk",function(){
var t=$(this);
e&&e.remove(),e=new b({
dom:this,
content:t.data("content"),
margin:"center",
hover:!0
}),e.$pop.offset({
top:e.$pop.offset().top-2,
left:e.$pop.offset().left+23
});
});
}
function s(){
r(),d(),p(),t();
}
function i(){
function e(e){
f.post({
url:"/merchant/myservice?action=set_report_location",
data:{
type:e
}
});
}
function t(){
0==wx.cgiData.location?($("#locationBt").text("开启"),$("#localTxt").text("(已关闭)")):1==wx.cgiData.location?($("#locationBt").text("关闭"),
$("#localTxt").text("(已开启，每次上报)")):2==wx.cgiData.location&&($("#locationBt").text("关闭"),
$("#localTxt").text("(已开启，每隔5s上报)"));
}
c(),$("#openBt").click(function(){
return $(this).hasClass("btn_disabled")?!1:void(1==g.is_biz_menu_open||1==g.is_biz_ivr_open?w.show({
title:"提示",
type:"warn",
msg:"是否确定开启服务器配置？|请注意：开启后，用户发送的消息将自动转发到该配置地址，并且在网站中设置的自动回复和自定义菜单将失效。",
buttons:[{
text:"确定",
click:function(){
_.suc("开启中"),a(1),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
}):(_.suc("开启中"),a(1)));
}),$("#closeBt").click(function(){
w.show({
title:"提示",
type:"warn",
msg:"确定停用服务器配置？|请注意：停用后，消息将不再转发到服务器配置中，可能影响公众号服务。",
buttons:[{
text:"确定",
click:function(){
_.suc("关闭中"),a(0),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
}),$("#voiceClose").click(function(){
w.show({
type:"warn",
msg:"你确认要关闭语音识别吗?|关闭后，用户发送给公众号的语音消息，将不再附带识别结果",
buttons:[{
text:"确定",
click:function(){
f.post({
url:"/merchant/myservice?action=set_voice_reco",
data:{
open:0
}
}).success(function(e){
0==e.base_resp.ret&&(_.suc("关闭成功"),wx.cgiData.voice=!1,$("#voiceClose").hide(),$("#voiceOpen").show(),
$("#voiceTxt").text("(已关闭)"));
}),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
}),$("#voiceOpen").click(function(){
w.show({
type:"warn",
msg:"你确认要开启语音识别吗?|开启后，用户发送给公众号的语音消息，将附带识别结果",
buttons:[{
text:"确定",
click:function(){
f.post({
url:"/merchant/myservice?action=set_voice_reco",
data:{
open:1
}
}).success(function(e){
0==e.base_resp.ret&&(_.suc("开启成功"),wx.cgiData.voice=!0,$("#voiceClose").show(),$("#voiceOpen").hide(),
$("#voiceTxt").text("(已开启)"));
}),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
}),$("#authBt").click(function(){
new j({
title:"OAuth2.0网页授权",
label:"授权回调页面域名:",
value:wx.cgiData.authUrl||"",
rule:function(e){
return/^(\w|-)+(\.(\w|-)+)+(:\d+)?$/g.test(e)&&!/\d{1,3}(\.\d{1,3}){3}/.test(e);
},
tips:"用户在网页授权页同意授权给公众号后，微信会将授权数据传给一个回调页面，回调页面需在此域名下，以确保安全可靠。回调页面域名不支持IP地址。",
msg:"域名格式不合法，请直接填写授权域名。如weixin.qq.com",
callback:function(e){
var t=this;
return _.suc("安全监测中..."),f.post({
url:"/merchant/myservice?action=set_oauth_domain&f=json",
data:{
domain:e
}
}).success(function(s){
0==s.base_resp.ret?(_.suc("通过安全监测"),wx.cgiData.authUrl=e,$("#authBt").text("修改"),
t.remove()):10302==s.base_resp.ret?_.suc("域名存在安全风险"):200002==s.base_resp.ret?_.err("域名格式不合法"):f.show(s);
}),!1;
}
});
}),t();
var s=null;
$("#locationBt").click(function(){
0==wx.cgiData.location?($("#location").popup({
className:"location_select simple",
buttons:[{
text:"确认",
click:function(){
e(s.values()[0]),wx.cgiData.location=s.values()[0],t(),_.suc("修改成功"),this.remove();
},
type:"primary"
}]
}),s=$(".localRadio").checkbox()):w.show({
type:"warn",
msg:"你确认要关闭获取用户地理功能吗?|关闭后，你将无法获得用户地理位置信息",
buttons:[{
text:"确定",
click:function(){
e(0),wx.cgiData.location=0,t(),_.suc("已关闭"),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
}),$("#js_unbindopen").on("click",function(){
var e=wx.cgiData.strategy_status;
e.source="unbindopen",e.msgid=wx.cgiData.operation_seq,e.distinguish=!0,e.mustAdmin=!0,
e.default_initdom='<div class="status tips"><p>请用管理员微信(%s)扫描以上二维码进行验证</p></div>'.sprintf(e.wx_alias);
var t,s,i,n=$("#js_unbind_open").popup({
title:"解绑开放平台帐号",
className:"dialog_wrp align_edge",
onShow:function(){
i=this;
},
close:function(){
s&&s.destroy(),this.remove();
},
buttons:[{
text:"下一步",
type:"primary"
},{
text:"验证",
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
},{
text:"知道了",
click:function(){
this.remove(),location.reload();
}
},{
text:"确定",
type:"primary",
click:function(){
this.remove(),location.reload();
}
}]
});
n.find(".js_btn_p").hide(),t=new k({
container:n.find(".js_process"),
selected:1,
names:["1 解绑确认","2 微信验证","3 账号密码验证"]
}),n.find(".js_btn_p").eq(0).show().on("click",function(){
t.setStep(2),n.find(".js_btn_p").hide(),n.find(".js_step0").hide(),n.find(".js_step1").show(),
s=m.check(e,function(e){
if(e&&e.code&&"wx.pass"!=e.code&&1==e.type){
t.setStep(3),n.find(".js_step1").hide();
var s=n.find(".js_step2");
s.show(),n.find(".js_btn_p").eq(1).show(),n.find(".js_btn_p").eq(2).show(),h({
container:s,
account:g.bind_email,
confirmBtton:n.find(".js_btn_p").eq(1),
check_url:"/advanced/advanced?action=unbind_open",
afterSubmit:function(e){
var t=+e.base_resp.ret;
if(0==t)_.suc("你已经解绑开放平台帐号"),setTimeout(function(){
location.reload();
},1e3);else{
var o;
switch(t){
case 200013:
o="累计输入密码错误5次，今日无法解绑";
break;

default:
o="系统错误，请稍后重试";
}
var a=s.find(".js_pwderror");
a.find("p").text(o),s.find(".js_pwdform").hide(),a.show(),n.find(".js_btn_p").hide(),
n.find(".js_btn_p").eq(3).show(),i.resetPosition();
}
}
}),i.resetPosition();
}
},{
dialog:i,
dialogdom:n.find(".js_step1"),
autoClose:!1,
checkdom:".js_wxcheck2",
notadminCallback:function(){
console.log("unadmin!"),console.log(n),n.find(".js_step1").find(".js_status").html('<div class="status"><i class="icon_qrcode_scan warn"></i><div class="status_txt"><h4>需要使用管理员微信扫码</h4><p>请使用公众号安全助手绑定的管理员(%s)进行扫码验证。</p></div></div>'.sprintf(e.wx_alias));
}
}),i.resetPosition();
});
});
}
function n(){
$("#js_appkey").text(g.app_key),$("#js_hidekey").show(),$("#js_showkey").hide();
}
function o(){
var e=g.reset_appsecret_status||"0",t="1"==e||"2"==e?!0:!1;
switch(g.view_appsecret_status||"0"){
case"1":
var s=new b({
dom:"#js_showkey",
close:!0,
className:"js_popgroup appsecret_popover",
content:'<span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span><div class="msg_content">已发送查看密钥的申请，请等待公众号安全助手绑定的管理员验证操作申请</div>',
margin:"center"
});
t&&s.hide(),$("#js_showkey").on("click",function(){
$(".js_popgroup").hide(),s.show();
});
break;

case"2":
var i=new b({
dom:"#js_showkey",
close:!0,
className:"js_popgroup appsecret_popover",
content:'<span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span><div class="msg_content">管理员已通过查看密钥的申请，请进行%s账号密码验证%s后即可查看密钥</div>'.sprintf('<a href="javascript:;" class="js_verpwd">',"</a>"),
margin:"center"
});
t&&i.hide(),i.$pop.find(".js_verpwd").on("click",function(){
$(".js_popgroup").hide();
var e,t=$("#js_appkey_step2").popup({
title:"账号密码验证",
className:"align_edge",
onShow:function(){
e=this;
},
close:function(){
this.remove();
},
buttons:[{
text:"验证",
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
},{
text:"知道了",
click:function(){
this.remove();
}
}]
});
t.find(".js_btn_p").eq(2).hide();
var s=t.find(".js_step1");
h({
container:s,
account:g.bind_email,
confirmBtton:t.find(".js_btn_p").eq(0),
afterSubmit:function(i){
var o=+i.base_resp.ret;
if(0==o)g.app_key=i.app_key,e.remove(),n();else{
var a;
switch(o){
case 1:
case 1001:
a="AppSecret当前无法查看，请操作重置后再进行查看。注意！重置操作将导致所有使用当前AppSecret的接口立即失效。";
break;

case 2:
case 1002:
a="AppSecret当前无法查看，请操作重置后再进行查看。注意！重置操作将导致所有使用当前AppSecret的接口立即失效。";
break;

case 200013:
a="累计输入密码错误5次，今日无法查看AppSecret";
break;

default:
a="系统错误，请稍后重试";
}
var c=s.find(".js_pwderror");
c.find("p").text(a),s.find(".js_pwdform").hide(),c.show(),t.find(".js_btn_p").hide(),
t.find(".js_btn_p").eq(2).show(),e.resetPosition();
}
}
}),e.resetPosition();
}),$("#js_showkey").on("click",function(){
$(".js_popgroup").hide(),i.show();
});
break;

default:
$("#js_showkey").on("click",function(){
var e=wx.cgiData.strategy_status;
if(e.wx_protect&&e.wx_alias){
e.source="showas",e.msgid=wx.cgiData.operation_seq,e.distinguish=!0;
var t,s,i,o=$("#js_appkey_step2").popup({
title:"安全验证",
className:"dialog_wrp align_edge",
onShow:function(){
i=this;
},
close:function(){
s&&s.destroy(),this.remove();
},
buttons:[{
text:"验证",
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
},{
text:"知道了",
click:function(){
this.remove(),location.reload();
}
},{
text:"确定",
type:"primary",
click:function(){
this.remove(),location.reload();
}
}]
});
o.find(".js_btn_p").hide(),t=new k({
container:o.find(".js_process"),
selected:1,
names:["1 微信验证","2 账号密码验证"]
}),s=m.check(e,function(e){
if(e&&e.code&&"wx.pass"!=e.code)if(1==e.type){
t.setStep(2),o.find(".js_step1").hide();
var s=o.find(".js_step2");
s.show(),o.find(".js_btn_p").eq(0).show(),o.find(".js_btn_p").eq(1).show(),h({
container:s,
account:g.bind_email,
confirmBtton:o.find(".js_btn_p").eq(0),
afterSubmit:function(e){
var t=+e.base_resp.ret;
if(0==t)g.app_key=e.app_key,i.remove(),n();else{
var a;
switch(t){
case 1001:
case 211001:
case 201001:
a="AppSecret当前无法查看，请操作重置后再进行查看。注意！重置操作将导致所有使用当前AppSecret的接口立即失效。";
break;

case 1002:
case 201002:
a="AppSecret当前无法查看，请操作重置后再进行查看。注意！重置操作将导致所有使用当前AppSecret的接口立即失效。";
break;

case-13:
case 200013:
a="累计输入密码错误5次，今日无法查看AppSecret";
break;

default:
a="系统错误，请稍后重试";
}
var c=s.find(".js_pwderror");
c.find("p").text(a),s.find(".js_pwdform").hide(),c.show(),o.find(".js_btn_p").hide(),
o.find(".js_btn_p").eq(2).show(),i.resetPosition();
}
}
}),i.resetPosition();
}else f.post({
url:"/advanced/advanced?action=send_apply&type=view",
data:{
code:e.code,
operation_seq:wx.cgiData.operation_seq
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret||_.err("系统发生错误， 请稍后重试 ");
});
},{
dialog:i,
dialogdom:o.find(".js_step1"),
autoClose:!1,
checkdom:".js_wxcheck1",
unadminCallback:function(){
o.find(".js_step1").find(".js_wxchecks").html('<div class="page_msg large simple default"><div class="inner group"><span class="msg_icon_wrp"><i class="icon_msg_primary waiting"></i></span><div class="msg_content"><h4>已发送操作申请</h4><p>请等待公众号安全助手绑定的管理员(%s)验证操作申请，验证通过后系统将会给公众号发送站内信通知。此申请在30分钟后过期，请尽快联系管理员验证。</p></div></div></div>'.sprintf(e.wx_alias)),
o.find(".js_btn_p").eq(3).show();
}
}),i.resetPosition();
}else e.wx_alias?m.off_protect_tip(function(){
m.bind("bind_showas",e,function(){
_.suc("微信保护开启成功"),setTimeout(function(){
location.reload();
},300);
},{
title:"开启微信保护"
});
},{
dom:".js_off_protect1"
}):m.no_helper_tip(function(){
m.bind("bind_showas",e,function(){
_.suc("微信保护开启成功"),setTimeout(function(){
location.reload();
},300);
},{
title:"绑定公众号安全管理员"
});
},{
dom:".js_no_helper1"
});
});
}
switch(g.reset_appsecret_status||"0"){
case"1":
var o=new b({
dom:"#js_resetkey",
close:!0,
className:"js_popgroup appsecret_popover",
content:'<span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span><div class="msg_content">已发送重置密钥的申请，请等待公众号安全助手绑定的管理员验证操作申请</div>',
margin:"center"
});
$("#js_resetkey").on("click",function(){
$(".js_popgroup").hide(),o.show();
});
break;

case"2":
var a=new b({
dom:"#js_resetkey",
close:!0,
className:"js_popgroup appsecret_popover",
content:'<span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span><div class="msg_content">管理员已通过查看密钥的申请，请进行%s账号密码验证%s后即可查看密钥</div>'.sprintf('<a href="javascript:;" class="js_resetpwd">',"</a>"),
margin:"center"
});
a.$pop.find(".js_resetpwd").on("click",function(){
$(".js_popgroup").hide();
var e,t=$("#js_appkey_step2").popup({
title:"账号密码验证",
className:"align_edge",
onShow:function(){
e=this;
},
close:function(){
this.remove();
},
buttons:[{
text:"验证",
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
t.find(".js_btn_p").eq(2).hide();
var s=t.find(".js_step1");
h({
container:s,
account:g.bind_email,
check_url:"/advanced/advanced?action=reset_appsecret",
confirmBtton:t.find(".js_btn_p").eq(0),
afterSubmit:function(i){
var n=+i.base_resp.ret;
if(0==n)_.suc("重置成功"),setTimeout(function(){
location.reload();
},1e3);else{
var o;
switch(n){
case 1001:
case 211001:
case 201001:
o="AppSecret当前无法查看，请操作重置后再进行查看。注意！重置操作将导致所有使用当前AppSecret的接口立即失效。";
break;

case 1002:
case 201002:
o="AppSecret当前无法查看，请操作重置后再进行查看。注意！重置操作将导致所有使用当前AppSecret的接口立即失效。";
break;

case 200013:
o="累计输入密码错误5次，今日无法查看AppSecret";
break;

default:
o="系统错误，请稍后重试";
}
var a=s.find(".js_pwderror");
a.find("p").text(o),s.find(".js_pwdform").hide(),a.show(),t.find(".js_btn_p").hide(),
t.find(".js_btn_p").eq(2).show(),e.resetPosition();
}
}
}),e.resetPosition();
}),$("#js_resetkey").on("click",function(){
$(".js_popgroup").hide(),a.show();
});
break;

default:
$("#js_resetkey").on("click",function(){
var e=wx.cgiData.strategy_status;
if(e.wx_protect&&e.wx_alias){
e.source="appkey",e.msgid=wx.cgiData.operation_seq,e.distinguish=!0;
var t,s,i,n=$("#js_appkey_step3").popup({
title:"安全验证",
className:"dialog_wrp align_edge",
onShow:function(){
i=this;
},
close:function(){
s&&s.destroy(),this.remove();
},
buttons:[{
text:"下一步",
type:"primary"
},{
text:"验证",
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
},{
text:"知道了",
click:function(){
this.remove(),location.reload();
}
},{
text:"确定",
type:"primary",
click:function(){
this.remove(),location.reload();
}
}]
});
n.find(".js_btn_p").hide(),t=new k({
container:n.find(".js_process"),
selected:1,
names:["1 提醒","2 微信验证","3 账号密码验证"]
}),n.find(".js_btn_p").eq(0).show().on("click",function(){
t.setStep(2),n.find(".js_btn_p").hide(),n.find(".js_step0").hide(),n.find(".js_step1").show(),
s=m.check(e,function(e){
if(e&&e.code&&"wx.pass"!=e.code)if(1==e.type){
t.setStep(3),n.find(".js_step1").hide();
var s=n.find(".js_step2");
s.show(),n.find(".js_btn_p").eq(1).show(),n.find(".js_btn_p").eq(2).show(),h({
container:s,
account:g.bind_email,
confirmBtton:n.find(".js_btn_p").eq(1),
check_url:"/advanced/advanced?action=reset_appsecret",
afterSubmit:function(e){
var t=+e.base_resp.ret;
if(0==t)_.suc("重置成功"),setTimeout(function(){
location.reload();
},1e3);else{
var o;
switch(t){
case 200013:
o="累计输入密码错误5次，今日无法重置AppSecret";
break;

default:
o="系统错误，请稍后重试";
}
var a=s.find(".js_pwderror");
a.find("p").text(o),s.find(".js_pwdform").hide(),a.show(),n.find(".js_btn_p").hide(),
n.find(".js_btn_p").eq(3).show(),i.resetPosition();
}
}
}),i.resetPosition();
}else f.post({
url:"/advanced/advanced?action=send_apply&type=reset",
data:{
code:e.code,
operation_seq:wx.cgiData.operation_seq
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret||_.err("系统发生错误， 请稍后重试 ");
});
},{
dialog:i,
dialogdom:n.find(".js_step1"),
autoClose:!1,
unadminCallback:function(){
n.find(".js_step1").find(".js_wxchecks").html('<div class="page_msg large simple default"><div class="inner group"><span class="msg_icon_wrp"><i class="icon_msg_primary waiting"></i></span><div class="msg_content"><h4>已发送操作申请</h4><p>请等待公众号安全助手绑定的管理员(%s)验证操作申请，验证通过后系统将会给公众号发送站内信通知。此申请在30分钟后过期，请尽快联系管理员验证。</p></div></div></div>'.sprintf(e.wx_alias)),
n.find(".js_btn_p").eq(4).show();
}
}),i.resetPosition();
});
}else e.wx_alias?m.off_protect_tip(function(){
m.bind("bind_showas",e,function(){
_.suc("微信保护开启成功"),setTimeout(function(){
location.reload();
},300);
},{
title:"开启微信保护"
});
},{
dom:".js_off_protect1"
}):m.no_helper_tip(function(){
m.bind("bind_showas",e,function(){
_.suc("微信保护开启成功"),setTimeout(function(){
location.reload();
},300);
},{
title:"绑定公众号安全管理员"
});
},{
dom:".js_no_helper1"
});
});
}
$("#js_hidekey").on("click",function(){
setTimeout(function(){
location.reload();
},200);
}),$(".js_resetkey_class").click(function(){
$("#js_resetkey").trigger("click");
});
}
function a(e){
f.post({
url:"/misc/skeyform?form=advancedswitchform",
data:{
flag:e,
type:2
}
},function(t){
0==t.base_resp.ret?(_.suc("操作成功 "),g.open=e,location.reload()):200002==t.base_resp.ret?_.err("URL、Token和EncodingAESKey设置错误或者未设置"):f.handleRet(t,{
id:64463,
key:0,
url:"/misc/skeyform?form=advancedswitchform"
});
});
}
function c(){
function e(){
window.open(t+"//"+location.host+$(this).data("url"),"_blank");
}
var t=location.protocol.replace("https","http");
$("#wikiDoc,td a[data-url]").click(e);
}
function r(){
var e="#topTab",t=new u(e,u.DATA.advanced);
if(t.selected(0),$("#devDiv").show(),$("#noDevDiv").show(),$("input[type=checkbox]").checkbox(),
$("#js_agreeCheckbox").on("click",function(){
$(this).is(":checked")?$("#js_toBeDeveloper").removeClass("btn_disabled").attr("disabled",!1):$("#js_toBeDeveloper").addClass("btn_disabled").attr("disabled",!0);
}),$("#js_toBeDeveloper").on("click",function(){
$(this).attr("disabled")||f.post({
url:"/advanced/advanced?action=agreement",
data:{},
mask:!1
},function(e){
0==e.base_resp.ret?(_.suc("开通成功"),location.href=wx.url("/advanced/advanced?action=dev&t=advanced/dev")):_.err("开通失败");
});
}),g.selfMenu){
switch(g.status){
case"0":
$("#selfMenuTr td:eq(2)").html('<a href="/advanced/advanced?action=menu_apply&t=advanced/menu-apply'+l.data.param+'">申请</a>');
break;

case"1":
$("#selfMenuTr td:eq(2)").html('申请中... <a href="/advanced/advanced?action=menu_apply&t=advanced/menu-apply'+l.data.param+'">查看详情</a>');
}
$("#selfMenuTr").show();
}else $("#selfMenuTr").hide();
$("#mainPage").show();
}
function p(){
for(var e=$("#js_authrized"),t={
nameall:"",
num1:"",
name1:"",
num2:"",
name2:"",
num3:"",
name3:"",
num4:"",
name4:"",
hasDanger:!!g.exist_appsecret_danger
},s=[0,1,5,8,9],n=wx.cgiData.auth_info,a=n.length,c=0;a>c;c++){
var r=n[c].component_name||"未知",p=n[c].func_category_list||[];
t.nameall=""==t.nameall?r:t.nameall+"、"+r;
for(var d=1;5>d;d++)p.indexOf(s[d])>-1&&(t["name"+d]=""==t["name"+d]?r:t["name"+d]+"、"+r);
}
for(var l=1,d=1;5>d;d++)t["name"+d]&&(t["num"+d]=""+l++,t.has=!0);
t.has&&(e.html(template.render("tpl_auth_wording",t)),e.show()),t.hasDanger&&(e.html(template.render("tpl_auth_wording",t)),
e.show()),i(),o();
}
function d(){
var e=null,t=template.render,s=g.user_api_info,i=g.jsapi_info,n={};
$.each(s.api_group,function(e,t){
var s=t.group_name;
n[s]=t.api_quota_list,$.each(t.api_quota_list.api_quota,function(e,t){
var i="%s_%s".sprintf(s,t.api_name);
n[i]=t.quota;
});
}),$.each(s.temp_group,function(e,t){
var s=t.group_name;
n[s]=t.api_quota_list,$.each(t.api_quota_list.api_quota,function(e,t){
var i="%s_%s".sprintf(s,t.api_name);
n[i]=t.quota;
});
}),$.each(i.jsapi_info_list,function(e,t){
var s=t.jsapi_name.replace(/:/g,"_");
n[s]=t.state;
}),$("#js_api").html(t("tpl_api",n)),$("table").on("mouseover",".js_api_detail",function(){
$(this);
e&&e.remove(),e=new b({
dom:this,
content:t($(this).data("id"),n),
margin:"right",
className:"right_pop",
hover:!0
}),e.$pop.offset({
top:e.$pop.offset().top-2
}),e.$pop.offset({
left:e.$pop.offset().left+19
});
});
}
var l=wx,_=(e("common/qq/mask.js"),e("common/wx/Tips.js")),f=e("common/wx/Cgi.js"),u=e("common/wx/top.js"),m=e("safe/safe_check.js"),h=e("safe/check_pwd.js"),w=(e("common/wx/popup.js"),
e("common/wx/dialog.js")),v=(e("biz_web/ui/checkbox.js"),e("common/wx/tooltips.js")),j=e("common/wx/simplePopup.js"),b=e("common/wx/popover.js"),k=e("common/wx/Step.js"),g=wx.cgiData;
new v({
container:"#js_symmetrikey",
content:"消息加解密密钥将用于消息体加解密过程。具体功能请参见%s文档%s".sprintf('<a target="_blank" href="https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319&token=&lang=zh_CN">',"</a>"),
reposition:!0,
position:{
left:83
}
}),s();
});