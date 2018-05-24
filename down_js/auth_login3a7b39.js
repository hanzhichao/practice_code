define("authorize/auth_login.js",["common/wx/Cgi.js","biz_common/moment.js","common/wx/Step.js","common/wx/Tips.js","common/wx/popup.js","common/wx/dialog.js","biz_common/jquery.md5.js","common/qq/jquery.plugin/serializeObject.js","biz_web/ui/checkbox.js","biz_common/cookie.js","safe/Scan.js","biz_common/utils/monitor.js","common/wx/popover.js","common/wx/messenger.method.js","common/wx/browserVersion.js","common/wx/checkTenpayCtrl.js"],function(e){
"use strict";
var t=e("common/wx/Cgi.js"),n=template.render,i=e("biz_common/moment.js"),o=e("common/wx/Step.js"),s=e("common/wx/Tips.js"),r=(e("common/wx/popup.js"),
e("common/wx/dialog.js")),a=(e("biz_common/jquery.md5.js"),e("common/qq/jquery.plugin/serializeObject.js"),
e("biz_web/ui/checkbox.js"),e("biz_common/cookie.js"),e("safe/Scan.js")),c=e("biz_common/utils/monitor.js"),_=e("common/wx/popover.js"),n=template.render,p=wx.cgiData||{},u={
userinfo:{},
plugin:{},
appinfo:{}
},m={
begin_time:window._points?window._points[0]:+new Date,
focus_time:0,
login_time:0,
qrcode_time:0,
scann_time:0,
confirm_time:0
},l=$.extend({},u,p),f=e("common/wx/messenger.method.js"),d={
"-1":"系统错误，请稍候再试",
"-100":"CODE不合法",
"-101":"授权已经失效，请关闭本页重新发起授权",
"-102":"授权域名不合法，请确认",
200103:"该公众号已授权给该公众号服务，不能重复授权",
"-104":"授权的权限集不合法",
"-105":"授权Ticket已过期",
"-106":"非法的公众号服务",
"-107":"不能授权给多个同类型的非共享公众号服务",
"-108":"对于未全网发布的公众号服务，非白名单公众号不可授权",
"-109":"不合法的公众号服务类型",
"-110":"预授权码已经被授权过，不能重复使用",
"-111":"未授权",
"-112":"公众号服务已更新，需要重新授权",
"-113":"不合法的权限集列表，请检查",
"-114":"已经超过最大的授权数目",
"-115":"已经超过最大Client Ip个数",
"-116":"已经超过最大公众号白名单个数",
"-201":"该公众号已授权给该公众号服务，不能重复授权",
"-202":"该公众号服务还没有被授权 不能获取queryauthcode",
200203:"扫码code失效",
200204:"获取授权信息失败",
200301:"授权参数错误，请检查",
200302:"请确认授权入口页所在域名，与授权后回调页所在域名相同，并且，此两者都必须与申请第三方平台时填写的网页开发域名相同。授权入口页所在域名：%s，授权后回调页所在域名：%s".sprintf(l.pageinfo.referrer_host||"空",l.pageinfo.redirectinfo_host||"空"),
"-301":"授权参数错误，请检查",
"-302":"请确认授权入口页所在域名，与授权后回调页所在域名相同，并且，此两者都必须与申请第三方平台时填写的网页开发域名相同。授权入口页所在域名：%s，授权后回调页所在域名：%s".sprintf(l.pageinfo.referrer_host||"空",l.pageinfo.redirectinfo_host||"空"),
"-303":"请求过于频繁，请稍后再试",
"-304":"跳转URL命中黑名单限制",
"-305":"ComponentAppID非法",
"-306":"参数缺少componentappid",
"-307":"参数缺少preauthcode",
"-308":"参数缺少redirecturl",
"-309":"已授权，但组件已删除，需解除授权",
"-310":"已经超过最大的授权数目",
"-311":"已授权，但公众号要求变更授权，且权限集存在互斥的情况，无法升级授权",
"-312":"已授权，但公众号要求变更授权",
"-313":"已授权，但服务已被删除，请解除授权",
"-314":"已授权的服务有权限集更新，且权限集存在互斥的情况，无法升级授权",
"-316":"组件已停用",
"-317":"支付系统繁忙，请稍后重试"
};
!function(){
$(window).on("unload",function(){
var e=wx.cgiData.appinfo.component_appid,t=wx.cgiData.plugin_info.name;
if(e){
var n=new Image,i=["/misc/component_report?component_appid=",e,"&component_name=",t,"&focus_time=",m.focus_time,"&login_time=",m.login_time,"&qrcode_time=",m.qrcode_time,"&scann_time=",m.scann_time,"&confirm_time=",m.confirm_time,"&staying_time=",""+(+new Date-m.begin_time)];
n.src=i.join("");
}
});
}(),location.host.indexOf("dev")<0&&location.protocol.indexOf("https")<0&&(location.href=location.href.replace(/http/i,"https")),
function(){
if(l.plugin_info.func){
for(var e=[],t=0,o=l.plugin_info.func.length;o>t;t++)e.push(l.plugin_info.func[t].id);
l.plugin_info.idlist=e.join("-"),!l.plugin_info.primary_industry&&l.component_info&&l.component_info.component&&l.component_info.component.detail&&l.component_info.component.detail.primary_industry_info_list&&l.component_info.component.detail.primary_industry_info_list.length>0&&(l.plugin_info.primary_industry=l.component_info.component.detail.primary_industry_info_list[0].name||""),
!l.plugin_info.secondary_industry&&l.component_info&&l.component_info.component&&l.component_info.component.detail&&l.component_info.component.detail.secondary_industry_info_list&&l.component_info.component.detail.secondary_industry_info_list.length>0&&(l.plugin_info.secondary_industry=l.component_info.component.detail.secondary_industry_info_list[0].name||""),
l.plugin_info.primary_industry==l.plugin_info.secondary_industry&&(l.plugin_info.secondary_industry=""),
$("#js_plugin").html(n("tpl_plugin",l.plugin_info)),console.log(l.plugin_info),l.plugin_info.name&&$("#js_plugin_name").html(l.plugin_info.name),
l.staff_info.wxverify&&"1"!=l.plugin_info.needhide&&(l.staff_info.enterprise_establishment_date&&(l.staff_info.enterprise_establishment_date=i.unix(l.staff_info.enterprise_establishment_date).format("YYYY-M-D HH:mm")),
l.staff_info.enterprise_expired_date&&(l.staff_info.enterprise_expired_date=i.unix(l.staff_info.enterprise_expired_date).format("YYYY-M-D HH:mm")),
$("#js_plugin").find(".js_preview_link").show().on("click",function(){
$(n("tpl_preview",l.staff_info)).popup({
title:"登记信息",
width:765,
close:function(){
this.remove();
},
buttons:[{
text:"关闭",
click:function(){
this.remove();
},
type:"default"
}]
});
})),$("#js_plugin").find(".js_rolelist_exp").on("click",function(){
$("#js_plugin").find(".js_rolelist_hidden").removeClass("dn"),$(this).hide();
});
}
}(),function(){
l.userinfo.sessioned=l.userinfo.faked_token&&""!=l.userinfo.faked_token;
var i,p=function(){
var e=l.userinfo.sessioned?wx.url("/cgi-bin/component_unauthorize?action=list&t=service/auth_plugins"):"/",t=$(n("tpl_mutexed",{
name:l.userinfo.nickname
}));
t.find("a").attr("href",e),t.popup({
title:"公众号安全保护",
className:"simple patch_protect",
close:function(){
this.remove();
},
buttons:[{
text:"授权管理页",
click:function(){
location.href=l.userinfo.sessioned?wx.url("/cgi-bin/component_unauthorize?action=list&t=service/auth_plugins"):"/";
},
type:"primary"
}]
});
},u=function(){
var e=l.userinfo.sessioned?wx.url("/cgi-bin/safecenterstatus?action=admins&t=setting/safe-admins"):"/",t=$(n("tpl_nohelper",{
name:l.userinfo.nickname
}));
t.find("a").attr("href",e),t.popup({
title:"公众号安全保护",
className:"simple patch_protect",
close:function(){
this.remove();
},
buttons:[{
text:"设置安全保护",
click:function(){
location.href=l.userinfo.sessioned?wx.url("/cgi-bin/safecenterstatus?action=view&t=setting/safe-index"):"/";
},
type:"primary"
}]
});
},h=function(e,t){
r.show({
title:"公众号登录授权",
type:"info",
msg:e,
mask:!0,
buttons:[{
text:"继续授权",
click:function(e){
this.remove(e),t();
},
type:"primary"
}]
});
},g=function(e){
r.show({
title:"错误",
type:"err",
hideClose:!0,
msg:e||"未知错误",
mask:!0
});
},w=function(e){
switch(e=""+e){
case"-310":
p();
break;

default:
var t=d[e]||"未知错误";
r.show({
title:"提示",
type:"warn",
hideClose:!0,
msg:t||"授权参数有误，请关闭本页重新发起授权",
mask:!0
});
}
},k=function(e){
var t=$("<div></div>");
return t.html(e),t.text();
},b=function(){
var t=e("common/wx/browserVersion.js"),n=e("common/wx/checkTenpayCtrl.js");
if(n.isInstalled)return!0;
if("Chrome"==t.name&&t.version>"42"){
var i;
switch(t.os){
case"windows":
i="IE";
break;

case"linux":
i="Firefox";
break;

case"mac":
i="Safari";
break;

default:
i="其他";
}
r.show({
title:"请更换浏览器",
msg:"当前浏览器不支持财付通控件|Chrome最新版暂时不支持部分财付通控件，请更换%s或其他浏览器".sprintf(i),
type:"info",
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.hide();
}
}]
});
}else r.show({
title:"下载财付通控件",
msg:"由于当前电脑未安装财付通安全控件无法授权|请下载并安装“财付通安全控件”，然后回到%s重新开始授权。<br>安装后可能需要重新启动浏览器。".sprintf(k(l.plugin_info.name)),
type:"info",
buttons:[{
text:"下载控件",
type:"primary",
click:function(){
window.open(n.downloadPath,"_blank");
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
return!1;
},y=function(e){
switch(+e.auth_flag){
case-315:
var t="由于%s要求的权限集有所改变，需重新授权才能满足要求。".sprintf(k(l.plugin_info.name)),n=function(e){
return function(){
j(e);
};
}(e);
h(t,n);
break;

default:
j(e);
}
},j=function(e){
var t={
0:0,
1:3,
2:4,
3:1,
4:2,
5:5,
7:7,
8:1
},n={
2:"请继续授权|该第三方平台升级了，变更了权限集要求，请确认后继续授权。",
5:"请继续授权|你已授权给该第三方平台，且第三方平台需要的权限集有更新，但存在互斥权限集冲突（你的互斥权限集已授权给其他第三方平台）。你可以继续本次授权，但授权后互斥权限集仍不会授权给该第三方。",
6:"请继续授权|公众号已授权给该第三方平台，但该平台已被删除，已自动解除授权。",
9:"请继续授权|公众号已经授权满第三方平台，需要回到公众平台官网（添加功能插件-授权管理）取消授权后，才可进行新授权。",
10:"请继续授权|该第三方平台已经停止服务，不能授权。"
},i=e.check_result&&e.check_result.check_result?+e.check_result.check_result:0,i=t[i]||i;
if(1==i)e.checkResultType=1,v(e);else if([2,3,4,5,7,8].indexOf(i)>-1){
e.checkResultType=2;
var o=n[i];
if(o){
var s=function(e){
return function(){
v(e);
};
}(e);
h(o,s);
}else v(e);
}else{
e.checkResultType=0;
var o=n[i];
g(o);
}
},v=function(e){
for(var i,c,_,h=e.checkResultType||0,k=e.verify_source&&"1"==e.verify_source,y=e.service_type&&"1"==e.service_type,j=e.wx_protect&&"1"==e.wx_protect,v=e.check_result&&e.check_result.check_detail?e.check_result.check_detail:[],x=[1],z=[5,8,9],A={
othername:"",
warn1:!1,
tip1:!1,
tip5:!1,
tip8:!1,
tip9:!1,
tip0:!0
},q={
container:null,
type:"check",
source:"bind_component",
auto_msgid:!0,
auth:e.auth,
distinguish:!0,
wx_name:l.strategy_status.wx_alias,
dom_init:"&nbsp;",
getUuidExtra:{
component_appid:l.appinfo.component_appid,
component_pre_auth_code:l.appinfo.pre_auth_code,
component_redirect_uri:l.appinfo.redirect_uri
},
scene:wx.cgiData.scene,
onconfirm:function(){
var n=this.msgid,i=this.code,o=this.json.confirm_resp,r=this.opt.uuid,a=this.isadmin&&!this.issubadmin;
if(n&&i){
0==m.scann_time&&(m.scann_time=+new Date-m.begin_time);
var c=function(){
o&&1==+o.component_status&&o.redirect_uri?location.href=decodeURIComponent(o.redirect_uri):s.err(d[+o.component_status]||"系统错误，请稍后再试");
};
if(a)c();else{
s.suc("请等待管理员确认");
var _=null,p=function(){
t.post({
url:wx.url("/misc/safeassistant?action=admin_action"),
data:{
type:"10",
msgid:n,
auth:e.auth,
uuid:r
},
mask:!1
},{
done:function(e){
if(e&&1==e.status){
s.suc("管理员确认成功");
var t=e.confirm_resp;
t&&1==+t.component_status&&t.redirect_uri?location.href=decodeURIComponent(t.redirect_uri):s.err(d[+t.component_status]||"系统错误，请稍后再试");
}else e&&2==e.status?s.err("管理员拒绝了请求"):_=setTimeout(p,1e3);
},
fail:function(){
_=setTimeout(p,1e3);
}
});
};
_=setTimeout(p,1e3);
}
}else s.err("扫码状态获取失败，请关闭后重试");
}
},C=!1,D=function(c){
var p=function(n){
f.init(n);
var o="https://pay.weixin.qq.com/index.php/auth_apply?";
o+="preAuthCode="+c,o+="&platfromMMAppId="+e.component_appid,o+="&platfromMMAppUin="+e.check_result.open_component_uin,
o+="&mpMMAppId="+e.check_result.open_mp_appid,o+="&mpMMAppUin="+e.check_result.open_mp_uin,
o+="&primaryMerchantId="+e.check_result.open_biz_mp_mchid,o+="&mMAppId="+e.check_result.biz_mp_appid,
o+="&mMAppUin="+e.check_result.biz_mp_uin,o+="&sourceMerchantId="+e.check_result.biz_mp_mchid,
n.attr("src",o),n.on("load",function(){
Iframe.init(this.contentWindow);
}),Iframe.on("step1_cancel",function(){
v.popup("hide");
}),Iframe.on("step1_next",function(){
x.setStep(2);
}),Iframe.on("step2_cancel",function(){
v.popup("hide");
}),Iframe.on("step2_next",function(){
t.post({
url:"/cgi-bin/componentloginpage",
data:{
action:"delegation_check",
component_appid:e.component_appid,
pre_auth_code:c,
redirect_uri:l.appinfo.redirect_uri,
open_biz_mp_mchid:e.check_result.open_biz_mp_mchid,
biz_mp_uin:e.check_result.biz_mp_uin
},
mask:!1
},function(e){
var t=e&&e.base_resp?""+e.base_resp.ret:"-999";
if(d[t])v.remove(),w(t);else switch(t){
case"0":
x.setStep(3),$(".js_pay_step1and2").hide(),$(".js_pay_step3").show();
var n=$(".js_pay_step3");
q.container=n,i=new a(q);
break;

default:
s.err("系统错误，请稍后再试");
}
});
}),$(".js_pay_step3").hide(),$(".js_pay_steps_wrp").parent().css("padding",0);
},u=function(){
v=$(n("tpl_steps",{
p:l.plugin_info,
verify_flag:k,
service_flag:y,
protect_flag:j,
allpass:!!j,
r:A
})).popup({
title:"请确认授权",
className:"align_edge",
width:640,
onShow:function(){
_=this;
},
close:function(){
i&&i.destroy(),this.remove();
}
});
var e=v.find(".js_step2");
q.container=e,i=new a(q),0==m.qrcode_time&&(m.qrcode_time=+new Date-m.begin_time);
},h="请继续授权该第三方平台";
if(C||1==e.check_result.pay_info_status)if(1==e.check_result.pay_info_status)g("暂时无法升级授权|由于你对此第三方平台的授权还未彻底完成（新商户号还未复制成功），你暂时无法升级授权");else if(0==e.open_biz_mp_mchid||""==e.open_mp_appid)g("系统错误|未能获取到相应的支付资质参数，请稍后重试");else if(c){
if(b()){
var v=$("#tpl_pay_steps").popup({
title:"微信支付授权",
width:726,
onShow:function(){
_=this;
},
close:function(){
i&&i.destroy(),this.remove();
}
}),x=new o({
container:".js_pay_steps_nav",
selected:1,
names:["1 验证商户身份","2 授权流程确认","3 安全助手验证"]
});
p($("#payIframe")),v.popup("resetPosition"),0==m.qrcode_time&&(m.qrcode_time=+new Date-m.begin_time);
}
}else 0==e.check_result.merchant_total_cnt||0==e.check_result.delegation_status?h="由于当前公众号“%s”未获得微信支付权限，本次授权不涉及微信支付相关业务，请继续授权".sprintf(l.userinfo.nickname):e.check_result.merchant_total_cnt>1?h="由于当前公众号“%s”拥有多个可用商户号，本次授权无法完成微信支付相关业务的授权，请继续授权".sprintf(l.userinfo.nickname):3==e.check_result.delegation_status?h="你此前已发起过授权（包含微信支付权限集），点击“继续授权”进行扫码验证":1==e.is_mult_appid_per_mchid&&(h="由于你当前的商户号被多个公众号绑定，本次授权流程不能授权微信支付业务，但可以继续授权其他业务，请继续授权"),
r.show({
title:"公众号登录授权",
type:"info",
msg:"请继续授权|"+h,
mask:!0,
buttons:[{
text:"继续授权",
click:function(){
u(),this.remove();
},
type:"primary"
}]
}),0==m.qrcode_time&&(m.qrcode_time=+new Date-m.begin_time);else 3==e.check_result.delegation_status&&""==e.check_result.pay_auth_code?(h="此第三方平台变更了权限集要求，需要你进行升级授权。特别地是，它去除了微信支付权限集，但由于你在其他途径也建立过于它的支付授权关系，因此本次升级授权过后，仍将保留你对它的支付授权关系",
r.show({
title:"公众号登录授权",
type:"info",
msg:"请继续授权|"+h,
mask:!0,
buttons:[{
text:"继续授权",
click:function(){
u(),this.remove();
},
type:"primary"
}]
})):u();
},I=0,T=v.length;T>I;I++){
var M=+v[I].funcscope_category_id;
x.indexOf(M)>-1&&(v[I].is_exclusion?(A.warn1=!0,A.tip0=!1,A.othername=v[I].exclusion_component_name||"未知"):(A.tip1=!0,
A.tip0=!1)),z.indexOf(M)>-1&&(A["tip"+M]=!0,A.tip0=!1),14==M&&(C=!0);
}
if(j)if(1==h){
var i,_,c=$(n("tpl_scan",{})).popup({
title:"账号保护验证",
onShow:function(){
_=this;
},
close:function(){
i&&i.destroy(),this.remove();
}
}),S=function(){
i=new a({
container:c,
type:"check",
source:"login",
auto_msgid:!0,
distinguish:!0,
auth:e.auth,
wx_name:l.strategy_status?l.strategy_status.wx_alias:"",
onconfirm:function(){
var n=this.msgid,i=this.code,o=this.isadmin&&!this.issubadminn;
if(n&&i){
0==m.scann_time&&(m.scann_time=+new Date-m.begin_time);
var r=function(){
t.post({
url:"ticket"==e.auth?"/cgi-bin/componentwxverify":"/cgi-bin/componentloginpage",
data:{
component_appid:l.appinfo.component_appid,
pre_auth_code:l.appinfo.pre_auth_code,
redirect_uri:l.appinfo.redirect_uri,
func_scopeid:l.appinfo.func_scopeid,
code:i,
operation_seq:n,
action:"getcode",
type:"1"
},
mask:!1
},function(e){
var t=e&&e.base_resp?""+e.base_resp.ret:"-999";
if(d[t])_.remove(),w(t);else switch(t){
case"0":
e.redirect_uri&&(location.href=decodeURIComponent(e.redirect_uri));
break;

default:
s.err("系统错误，请稍后再试");
}
});
};
if(o)r();else{
s.suc("请等待管理员确认");
var a=null,c=function(){
t.post({
url:wx.url("/misc/safeassistant?action=admin_action"),
data:{
type:"1",
msgid:n,
auth:e.auth
},
mask:!1
},{
done:function(e){
e&&1==e.status?(s.suc("管理员确认成功"),r()):e&&2==e.status?(s.err("管理员拒绝了请求"),S()):a=setTimeout(c,1e3);
},
fail:function(){
a=setTimeout(c,1e3);
}
});
};
a=setTimeout(c,1e3);
}
}else s.err("扫码状态获取失败，请重试");
}
}),0==m.qrcode_time&&(m.qrcode_time=+new Date-m.begin_time);
};
S();
}else 2==h?0==e.check_result.delegation_status||3==e.check_result.delegation_status||1!=e.check_result.merchant_total_cnt?D():D(2==e.check_result.delegation_status&&e.check_result.pay_auth_code&&e.check_result.pay_auth_code.length>0?e.check_result.pay_auth_code:e.pre_auth_code||l.appinfo.pre_auth_code):p();else u();
},x=function(){
$(".js_whattip").on("mouseover",function(){
var e="公众号运营者在面向垂直行业需求的时候，可以通过登录授权给第三方开发者，在开发者的帮助下完成相关业务。";
1==wx.cgiData.scene&&(e="公众帐号授权后，被授权业务可直接将公众帐号的认证状态、认证信息作为RTX帐号的认证结果并加以展示。"),$(".popover").hide(),
i=new _({
dom:$(this),
content:e
}),i.$pop.offset({
top:i.$pop.offset().top,
left:i.$pop.offset().left+3
});
}).on("mouseout",function(){
i&&i.remove();
});
},z=function(){
$("#js_login").show();
var e=$("#js_account"),n=$("#js_password"),i=$("#js_verify"),o=$("#js_imgVerify"),s=$("#js_imgVerifyx"),r=$("#js_verifyArea"),a=($("#js_errArea"),
$("#js_loginButton"));
r.data("isHide",1).hide();
var _=function(){
i.val(""),o.attr("src","/cgi-bin/verifycode?username="+$.trim(e.val())+"&r="+ +new Date),
1==r.data("isHide")&&r.data("isHide",0).show();
};
o.click(_),s.click(_);
var p=function(){
return{
account:$.trim(e.val()),
password:$.trim(n.val()),
verify:$.trim(i.val())
};
},u=function(){
0==m.login_time&&(m.login_time=+new Date-m.begin_time),a.btn(!1);
var o=p(),s="";
if($("#js_err_username").hide(),$("#js_errArea").hide(),$("#js_errArea_code").hide(),
""==o.account?(s="你还没有输入帐号！",$("#js_err_username").html(s).show(),e.focus().select()):""==o.password?(s="你还没有输入密码！",
$("#js_errArea").html(s).show(),n.focus().select()):0==r.data("isHide")&&""==o.verify&&(s="你还没有输入验证码！",
$("#js_errArea").html(s).show(),i.focus().select()),""==s){
var u=$("#js_login").serializeObject(),f={
component_appid:l.appinfo.component_appid,
pre_auth_code:l.appinfo.pre_auth_code,
redirect_uri:l.appinfo.redirect_uri,
component:"open_component"
};
f.username=u.account,f.pwd=$.md5(u.password.substr(0,16)),f.imgcode=r.data("isHide")?"":u.verify,
f.f="json",f.func_scopeid=l.plugin_info.idlist,c.setSum(66811,1,1),c.send(),t.post({
url:"/cgi-bin/login?loginhook=1",
data:f,
mask:!1
},function(e){
var t=e.base_resp?e.base_resp.ret+"":"-1",n=d[t];
if($("#js_err_username").hide(),$("#js_errArea").hide(),$("#js_errArea_code").hide(),
n)w(t),$("#js_errArea").html(n).show();else switch(t){
case"0":
n="成功登录",wx.data.param="",l.userinfo={
nickname:e.nickname,
sessioned:!1
},l.strategy_status={
wx_alias:e.bind_alias
},e.auth="ticket",y(e);
break;

case"-1":
n="系统错误，请稍候再试",$("#js_errArea").html(n).show();
break;

case"200002":
n="参数错误",$("#js_errArea").html(n).show();
break;

case"200003":
n="登录态超时",$("#js_errArea").html(n).show();
break;

case"200004":
n="参数错误",$("#js_errArea").html(n).show();
break;

case"200005":
n="您目前处于访问受限状态",$("#js_err_username").html(n).show();
break;

case"200007":
n="此帐号已绑定私人微信号，不可用于公众平台登录",$("#js_err_username").html(n).show();
break;

case"200008":
n="请输入图中的验证码",$("#js_errArea_code").html(n).show(),i.focus().select(),_();
break;

case"200021":
n="用户不存在",$("#js_err_username").html(n).show();
break;

case"200023":
n='帐号或密码错误，请通过"忘记密码"找回',$("#js_errArea").html(n).show();
break;

case"200024":
n="账号被冻结",$("#js_err_username").html(n).show();
break;

case"200025":
n="海外账号，不能在国内平台登录",$("#js_err_username").html(n).show();
break;

case"200026":
n="会议号过期",$("#js_err_username").html(n).show();
break;

case"200028":
n="需要改密",$("#js_errArea").html(n).show();
break;

case"200027":
n="您输入的验证码不正确，请重新输入",$("#js_errArea_code").html(n).show(),_();
break;

case"-200":
n="因频繁提交虚假资料，该帐号被拒绝登录",$("#js_err_username").html(n).show();
break;

case"-94":
n="请使用邮箱登录",$("#js_err_username").html(n).show();
break;

case"200010":
n="该公众会议号已经过期，无法再登录使用",$("#js_err_username").html(n).show();
break;

case"-100":
n='海外帐号请在公众平台海外版登录,<a href="http://admin.wechat.com/">点击登录</a>',$("#js_err_username").html(n).show();
break;

case"-102":
w("-102");
break;

case"-204":
w("-204");
break;

default:
n="未知的返回",$("#js_err_username").html(n).show();
}
"0"==t||r.data("isHide")||_(),a.btn(!0);
});
}else a.btn(!0);
return!1;
};
a.on("click",function(){
$(this).attr("disabled")||u();
}),e.on("keyup",function(e){
13==e.keyCode&&(u(),this.blur());
}).on("focus",function(){
0==m.focus_time&&(m.focus_time=+new Date-m.begin_time);
}),n.on("keyup",function(e){
13==e.keyCode&&(u(),this.blur());
}).on("focus",function(){
0==m.focus_time&&(m.focus_time=+new Date-m.begin_time);
});
},A=function(){
$("#js_agree3").checkbox({
multi:!0,
onChanged:function(e){
e.prop("checked")?($("#js_loginButton").removeClass("btn_disabled").attr("disabled",!1),
$(".js_biz_login").removeClass("btn_disabled").attr("disabled",!1)):($("#js_loginButton").addClass("btn_disabled").attr("disabled",!0),
$(".js_biz_login").addClass("btn_disabled").attr("disabled",!0));
}
});
};
if("undefined"!=typeof l.ret&&d[""+l.ret]&&w(l.ret),l.userinfo.sessioned){
var q=$("#js_biz");
q.html(n("tpl_biz",{
usr:l.userinfo,
pi:l.plugin_info,
session:l.plugin.check_result&&("3"==l.plugin.check_result||"4"==l.plugin.check_result||"5"==l.plugin.check_result)
})).show(),q.find(".js_biz_login").on("click",function(){
$(this).attr("disabled")||(0==m.login_time&&(m.login_time=+new Date-m.begin_time),
y({
verify_source:l.userinfo.verify_source,
service_type:l.userinfo.service_type,
wx_protect:l.userinfo.wx_protect,
check_result:l.plugin,
auth:"",
auth_flag:l.ret,
component_appid:l.appinfo.component_appid
}));
}),$("#js_switch").on("click",function(){
l.userinfo={
sessioned:!1
},l.strategy_status={},l.plugin.check_result="",wx.data.param="",$(this).hide(),
$("#js_biz").hide(),z();
}).show();
}else z();
x(),A();
}();
});