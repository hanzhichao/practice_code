define("advanced/dev_new.js",["common/qq/mask.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/top.js","safe/safe_check.js","safe/check_pwd.js","common/wx/popup.js","common/wx/dialog.js","biz_web/ui/checkbox.js","common/wx/tooltips.js","common/wx/simplePopup.js","common/wx/popover.js","common/wx/Step.js","advanced/ip_whitelist.js","common/qq/jquery.plugin/zclip.js"],function(e){
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
}),$("#reset_ask").hover(function(){
new b({
dom:this,
content:$("#reset_desc").html(),
isToggle:!0
});
});
}
function s(){
p(),_(),r(),t();
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
return $(this).hasClass("btn_disabled")?!1:void(1==x.is_biz_menu_open||1==x.is_biz_ivr_open?w.show({
title:"提示",
type:"warn",
msg:"是否确定开启服务器配置？|请注意：开启后，用户发送的消息将自动转发到该配置地址，并且在网站中设置的自动回复和自定义菜单将失效。",
buttons:[{
text:"确定",
click:function(){
l.suc("开启中"),a(1),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
}):(l.suc("开启中"),a(1)));
}),$("#closeBt").click(function(){
w.show({
title:"提示",
type:"warn",
msg:"确定停用服务器配置？|请注意：停用后，消息将不再转发到服务器配置中，可能影响公众号服务。",
buttons:[{
text:"确定",
click:function(){
l.suc("关闭中"),a(0),this.remove();
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
0==e.base_resp.ret&&(l.suc("关闭成功"),wx.cgiData.voice=!1,$("#voiceClose").hide(),$("#voiceOpen").show(),
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
0==e.base_resp.ret&&(l.suc("开启成功"),wx.cgiData.voice=!0,$("#voiceClose").show(),$("#voiceOpen").hide(),
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
return l.suc("安全监测中..."),f.post({
url:"/merchant/myservice?action=set_oauth_domain&f=json",
data:{
domain:e
}
}).success(function(s){
0==s.base_resp.ret?(l.suc("通过安全监测"),wx.cgiData.authUrl=e,$("#authBt").text("修改"),
t.remove()):10302==s.base_resp.ret?l.suc("域名存在安全风险"):200002==s.base_resp.ret?l.err("域名格式不合法"):f.show(s);
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
e(s.values()[0]),wx.cgiData.location=s.values()[0],t(),l.suc("修改成功"),this.remove();
},
type:"primary"
}]
}),s=$(".localRadio").checkbox()):w.show({
type:"warn",
msg:"你确认要关闭获取用户地理功能吗?|关闭后，你将无法获得用户地理位置信息",
buttons:[{
text:"确定",
click:function(){
e(0),wx.cgiData.location=0,t(),l.suc("已关闭"),this.remove();
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
e.default_initdom='<div class="status tips"><p>请用管理员微信%s扫描以上二维码进行验证</p></div>'.sprintf(e.wx_alias);
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
names:["1 解绑确认","2 微信验证","3 帐号密码验证"]
}),n.find(".js_btn_p").eq(0).show().on("click",function(){
t.setStep(2),n.find(".js_btn_p").hide(),n.find(".js_step0").hide(),n.find(".js_step1").show(),
s=h.check(e,function(e){
if(e&&e.code&&"wx.pass"!=e.code&&1==e.type){
t.setStep(3),n.find(".js_step1").hide();
var s=n.find(".js_step2");
s.show(),n.find(".js_btn_p").eq(1).show(),n.find(".js_btn_p").eq(2).show(),m({
container:s,
account:x.bind_email,
confirmBtton:n.find(".js_btn_p").eq(1),
check_url:"/advanced/advanced?action=unbind_open",
afterSubmit:function(e){
var t=+e.base_resp.ret;
if(0==t)l.suc("你已经解绑开放平台帐号"),setTimeout(function(){
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
console.log("unadmin!"),console.log(n),n.find(".js_step1").find(".js_status").html('<div class="status"><i class="icon_qrcode_scan warn"></i><div class="status_txt"><h4>需要使用管理员微信扫码</h4><p>请使用公众号安全助手绑定的管理员%s进行扫码验证。</p></div></div>'.sprintf(e.wx_alias));
}
}),i.resetPosition();
});
});
}
function n(){
$("#js_appkey").text(x.app_key),$("#js_hidekey").show(),$("#js_showkey").hide();
}
function o(){
function e(){
function e(){
$("#copy_check").checkbox(),$("#copy").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
return $("#secret_input").val();
},
afterCopy:function(){
l.suc("复制成功");
}
}),$("#copy_check").on("click",function(){
$(this).is(":checked")?p.find(".js_btn_p").eq(1).removeClass("btn_disabled").attr("disabled",!1):p.find(".js_btn_p").eq(1).addClass("btn_disabled").attr("disabled",!0);
}),p.find(".js_btn_p").eq(1).click(function(){
$(this).hasClass("btn_disabled")||s();
});
}
function t(){
o.setStep(3),p.find(".js_step2").hide(),p.find(".js_btn_p").eq(0).hide(),p.find(".js_btn_p").eq(1).show(),
p.find(".js_step3").show(),p.find(".js_btn_p").eq(1).addClass("btn_disabled").attr("disabled",!0),
e();
}
function s(){
p.find(".js_step3").hide(),p.find(".js_btn_p").eq(1).hide(),p.find(".js_btn_p").eq(3).show(),
p.find(".js_btn_p").eq(4).show(),p.find(".processor_wrp.js_process").hide(),p.find(".js_step4").show();
}
function i(){
o.setStep(2),p.find(".js_step1").hide();
var e=p.find(".js_step2");
e.show(),p.find(".js_btn_p").eq(0).show(),m({
container:e,
account:x.bind_email,
confirmBtton:p.find(".js_btn_p").eq(0),
check_url:"/advanced/advanced?action=reset_appsecret",
afterSubmit:function(s){
var i=+s.base_resp.ret;
if(0==i)l.suc("重置成功"),$("#secret_input").val(s.app_key),$("#js_resetkey").text("重置"),
$("#js_IP_whitelist_wrap").show(),t();else{
var n;
switch(i){
case 200013:
n="累计输入密码错误5次，今日无法重置AppSecret";
break;

default:
n="系统错误，请稍后重试";
}
var o=e.find(".js_pwderror");
o.find("p").text(n),e.find(".js_pwdform").hide(),o.show(),p.find(".js_btn_p").hide(),
p.find(".js_btn_p").eq(3).show(),c.resetPosition();
}
}
}),c.resetPosition();
}
var n=wx.cgiData.strategy_status;
if(n.wx_protect&&n.wx_alias){
n.source="appkey",n.msgid=wx.cgiData.operation_seq,n.distinguish=!0;
var o,a,c,p=$("#js_appkey_step4").popup({
title:"1"==wx.cgiData.has_app_secret?"重置AppSecret":"开发者密码设置",
className:"dialog_wrp align_edge dialog_with_tool_context AppSecret_dialog",
onShow:function(){
c=this;
},
close:function(){
a&&a.destroy(),this.remove();
},
buttons:[{
text:"下一步",
type:"primary"
},{
text:"确定并进行下一步",
type:"primary"
},{
text:"确定",
type:"primary",
click:function(){
this.remove(),location.reload();
}
},{
text:"完成",
type:"primary",
click:function(){
c.remove();
}
},{
text:"去设置IP白名单",
type:"default",
click:function(){
this.remove(),$("#js_show_IP_whitelist").click();
}
}]
});
if(p.find(".js_btn_p").hide(),o=new k({
container:p.find(".js_process"),
selected:1,
names:["1 身份确认","2 密码验证","3 查看开发者密码"]
}),2==x.reset_appsecret_status)return void i();
a=h.check(n,function(e){
e&&e.code&&"wx.pass"!=e.code&&(1==e.type?i():f.post({
url:"/advanced/advanced?action=send_apply&type=reset",
data:{
code:e.code,
operation_seq:wx.cgiData.operation_seq
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret||l.err("系统发生错误， 请稍后重试 ");
}));
},{
dialog:c,
dialogdom:p.find(".js_step1"),
autoClose:!1,
unadminCallback:function(){
p.find(".js_step1").find(".js_wxchecks").html('<div class="page_msg large simple default"><div class="inner group"><span class="msg_icon_wrp"><i class="icon_msg_primary waiting"></i></span><div class="msg_content"><h4>已发送操作申请</h4><p>请等待公众号安全助手绑定的管理员%s验证操作申请，验证通过后系统将会给公众号发送站内信通知。此申请在30分钟后过期，请尽快联系管理员验证。</p></div></div></div>'.sprintf(n.wx_alias)),
p.find(".js_btn_p").eq(3).show();
}
}),c.resetPosition();
}else n.wx_alias?h.off_protect_tip(function(){
h.bind("bind_showas",n,function(){
l.suc("微信保护开启成功"),setTimeout(function(){
location.reload();
},300);
},{
title:"开启微信保护"
});
},{
dom:".js_off_protect1"
}):h.no_helper_tip(function(){
h.bind("bind_showas",n,function(){
l.suc("微信保护开启成功"),setTimeout(function(){
location.reload();
},300);
},{
title:"绑定公众号安全管理员"
});
},{
dom:".js_no_helper1"
});
}
var t=x.reset_appsecret_status||"0",s="1"==t||"2"==t?!0:!1;
switch(x.view_appsecret_status||"0"){
case"1":
var i=new b({
dom:"#js_showkey",
close:!0,
className:"js_popgroup appsecret_popover",
content:'<span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span><div class="msg_content">已发送查看密钥的申请，请等待公众号安全助手绑定的管理员验证操作申请</div>',
margin:"center"
});
s&&i.hide(),$("#js_showkey").on("click",function(){
$(".js_popgroup").hide(),i.show();
});
break;

case"2":
var o=new b({
dom:"#js_showkey",
close:!0,
className:"js_popgroup appsecret_popover",
content:'<span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span><div class="msg_content">管理员已通过查看密钥的申请，请进行%s帐号密码验证%s后即可查看密钥</div>'.sprintf('<a href="javascript:;" class="js_verpwd">',"</a>"),
margin:"center"
});
s&&o.hide(),o.$pop.find(".js_verpwd").on("click",function(){
$(".js_popgroup").hide();
var e,t=$("#js_appkey_step2").popup({
title:"帐号密码验证",
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
m({
container:s,
account:x.bind_email,
confirmBtton:t.find(".js_btn_p").eq(0),
afterSubmit:function(i){
var o=+i.base_resp.ret;
if(0==o)x.app_key=i.app_key,e.remove(),n();else{
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
$(".js_popgroup").hide(),o.show();
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
names:["1 微信验证","2 帐号密码验证"]
}),s=h.check(e,function(e){
if(e&&e.code&&"wx.pass"!=e.code)if(1==e.type){
t.setStep(2),o.find(".js_step1").hide();
var s=o.find(".js_step2");
s.show(),o.find(".js_btn_p").eq(0).show(),o.find(".js_btn_p").eq(1).show(),m({
container:s,
account:x.bind_email,
confirmBtton:o.find(".js_btn_p").eq(0),
afterSubmit:function(e){
var t=+e.base_resp.ret;
if(0==t)x.app_key=e.app_key,i.remove(),n();else{
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
e&&e.base_resp&&0==e.base_resp.ret||l.err("系统发生错误， 请稍后重试 ");
});
},{
dialog:i,
dialogdom:o.find(".js_step1"),
autoClose:!1,
checkdom:".js_wxcheck1",
unadminCallback:function(){
o.find(".js_step1").find(".js_wxchecks").html('<div class="page_msg large simple default"><div class="inner group"><span class="msg_icon_wrp"><i class="icon_msg_primary waiting"></i></span><div class="msg_content"><h4>已发送操作申请</h4><p>请等待公众号安全助手绑定的管理员%s验证操作申请，验证通过后系统将会给公众号发送站内信通知。此申请在30分钟后过期，请尽快联系管理员验证。</p></div></div></div>'.sprintf(e.wx_alias)),
o.find(".js_btn_p").eq(3).show();
}
}),i.resetPosition();
}else e.wx_alias?h.off_protect_tip(function(){
h.bind("bind_showas",e,function(){
l.suc("微信保护开启成功"),setTimeout(function(){
location.reload();
},300);
},{
title:"开启微信保护"
});
},{
dom:".js_off_protect1"
}):h.no_helper_tip(function(){
h.bind("bind_showas",e,function(){
l.suc("微信保护开启成功"),setTimeout(function(){
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
switch(x.reset_appsecret_status||"0"){
case"1":
var a=new b({
dom:"#js_resetkey",
close:!0,
className:"js_popgroup appsecret_popover",
content:'<span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span><div class="msg_content">已发送设置密钥的申请，请等待公众号安全助手绑定的管理员验证操作申请</div>',
margin:"center"
});
$("#js_resetkey").on("click",function(){
$(".js_popgroup").hide(),a.show();
});
break;

case"2":
var c=new b({
dom:"#js_resetkey",
close:!0,
className:"js_popgroup appsecret_popover",
content:'<span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span><div class="msg_content">管理员已通过设置密钥的申请，请进行%s帐号密码验证%s后即可查看密钥</div>'.sprintf('<a href="javascript:;" class="js_resetpwd">',"</a>"),
margin:"center"
});
c.$pop.find(".js_resetpwd").on("click",function(){
$(".js_popgroup").hide(),e();
}),$("#js_resetkey").on("click",function(){
$(".js_popgroup").hide(),c.show();
});
break;

default:
$("#js_resetkey").on("click",function(){
"1"==wx.cgiData.has_app_secret?w.show({
title:"温馨提示",
type:"warn",
msg:"你确定要重置开发者密码(AppSecret)吗？|请注意：重置AppSecret立即生效，所有使用旧AppSecret的接口将立即失效。为确保公众号的正常使用，请尽快更新AppSecret信息。",
buttons:[{
text:"确定重置",
click:function(){
e(),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
}):e();
});
}
g.init("#js_IP_whitelist",wx.cgiData.secret_white_ip_list.white_ip_list,y,wx.cgiData.strategy_status,wx.cgiData.operation_seq),
$("#js_show_IP_whitelist").click(function(){
g.show();
}),$("#js_hidekey").on("click",function(){
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
0==t.base_resp.ret?(l.suc("操作成功 "),x.open=e,location.reload()):200002==t.base_resp.ret?l.err("URL、Token和EncodingAESKey设置错误或者未设置"):f.handleRet(t,{
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
function p(){
var e="#topTab",t=new u(e,u.DATA.advanced);
if(t.selected(0),$("#devDiv").show(),$("#noDevDiv").show(),$("input[type=checkbox]").checkbox(),
$("#js_agreeCheckbox").on("click",function(){
$(this).is(":checked")?$("#js_toBeDeveloper").removeClass("weui-desktop-btn_disabled").attr("disabled",!1):$("#js_toBeDeveloper").addClass("weui-desktop-btn_disabled").attr("disabled",!0);
}),$("#js_toBeDeveloper").on("click",function(){
$(this).attr("disabled")||f.post({
url:"/advanced/advanced?action=agreement",
data:{},
mask:!1
},function(e){
0==e.base_resp.ret?(l.suc("开通成功"),location.href=wx.url("/advanced/advanced?action=dev&t=advanced/dev")):l.err("开通失败");
});
}),x.selfMenu){
switch(x.status){
case"0":
$("#selfMenuTr td:eq(2)").html('<a href="/advanced/advanced?action=menu_apply&t=advanced/menu-apply'+d.data.param+'">申请</a>');
break;

case"1":
$("#selfMenuTr td:eq(2)").html('申请中... <a href="/advanced/advanced?action=menu_apply&t=advanced/menu-apply'+d.data.param+'">查看详情</a>');
}
$("#selfMenuTr").show();
}else $("#selfMenuTr").hide();
$("#mainPage").show();
}
function r(){
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
hasDanger:!!x.exist_appsecret_danger
},s=[0,1,5,8,9],n=wx.cgiData.auth_info,a=n.length,c=0;a>c;c++){
var p=n[c].component_name||"未知",r=n[c].func_category_list||[];
t.nameall=""==t.nameall?p:t.nameall+"、"+p;
for(var _=1;5>_;_++)r.indexOf(s[_])>-1&&(t["name"+_]=""==t["name"+_]?p:t["name"+_]+"、"+p);
}
for(var d=1,_=1;5>_;_++)t["name"+_]&&(t["num"+_]=""+d++,t.has=!0);
t.has&&(e.html(template.render("tpl_auth_wording",t)),e.show()),t.hasDanger&&(e.html(template.render("tpl_auth_wording",t)),
e.show()),i(),o();
}
function _(){
var e=null,t=template.render,s=x.user_api_info,i=x.jsapi_info,n={};
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
var d=wx,l=(e("common/qq/mask.js"),e("common/wx/Tips.js")),f=e("common/wx/Cgi.js"),u=e("common/wx/top.js"),h=e("safe/safe_check.js"),m=e("safe/check_pwd.js"),w=(e("common/wx/popup.js"),
e("common/wx/dialog.js")),v=(e("biz_web/ui/checkbox.js"),e("common/wx/tooltips.js")),j=e("common/wx/simplePopup.js"),b=e("common/wx/popover.js"),k=e("common/wx/Step.js"),g=e("advanced/ip_whitelist.js"),x=wx.cgiData,y=function(e){
$("#js_show_IP_whitelist").text(e.length?"查看":"配置");
};
e("common/qq/jquery.plugin/zclip.js"),new v({
container:"#js_symmetrikey",
content:"消息加解密密钥将用于消息体加解密过程。具体功能请参见%s文档%s".sprintf('<a target="_blank" href="https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319&token=&lang=zh_CN">',"</a>"),
reposition:!0,
position:{
left:-100
}
}),"0"==wx.cgiData.has_app_secret&&$("#js_resetkey").text("启用"),y(wx.cgiData.secret_white_ip_list.white_ip_list),
s();
});