define("safe/protect.js",["common/wx/Tips.js","common/wx/popup.js","biz_web/ui/checkbox.js","safe/Scan.js","safe/Mobile.js","common/wx/Step.js","common/wx/tooltips.js","common/wx/dialog.js","common/wx/Cgi.js"],function(t){
"use strict";
var e=t("common/wx/Tips.js"),o=template.render,n=(t("common/wx/popup.js"),t("biz_web/ui/checkbox.js"),
t("safe/Scan.js")),i=t("safe/Mobile.js"),c=t("common/wx/Step.js"),s=t("common/wx/tooltips.js"),r=t("common/wx/dialog.js"),a=t("common/wx/Cgi.js"),u=wx.cgiData||{},l={
strategy_resp:{},
appid:"",
ticket:""
},_=$.extend({},l,u);
if(_.strategy_resp.strategy_status){
var m=_.strategy_resp.strategy_status;
_.protectType=m.wx_protect?1:m.mobile_protect?2:0,_.wxName=m.wx_alias||"",_.mobileName=m.mobile||"",
_.protect_status=0!=_.protectType?_.strategy_resp.strategy_status.protect_status:0;
}
var p=function(){
function t(){
var t=_.protect_status,e={
login:1==(1&t)?1:0,
send:2==(2&t)?1:0,
callback:4==(4&t)?1:0,
appsecret:1
};
switch(_.protectType){
case 1:
$("#js_sub_protect").html(o("tpl_sub",e)).parent().show(),$(".js_func_has").show(),
$("#js_wx_num").text(_.wxName),u.wx_btn(),$(".js_sub_onprotect").each(function(){
var t=$(this),e=t.data("id");
new s({
container:t,
type:"click",
onclose:function(){},
buttons:[{
text:"开启",
type:"btn_primary",
click:function(){
this.hide(),u.sub_onprotect(e);
}
},{
text:"取消",
type:"btn_default",
click:function(){
this.hide();
}
}]
});
}),$(".js_sub_offprotect").on("click",function(){
u.sub_wx_stop($(this).data("id"));
});
break;

case 2:
$("#js_sub_protect").html(o("tpl_sub",e)).parent().show(),$(".js_mobile_protect").show(),
$(".js_func_has").show(),$("#js_mobile_num").text(_.mobileName),$("#js_mobile_edit").on("click",u.mobile_edit),
$(".js_sub_onprotect").each(function(){
var t=$(this),e=t.data("id");
new s({
container:t,
type:"click",
onclose:function(){},
buttons:[{
text:"开启",
type:"btn_primary",
click:function(){
this.hide(),u.sub_onprotect(e);
}
},{
text:"取消",
type:"btn_default",
click:function(){
this.hide();
}
}]
});
}),$(".js_sub_offprotect").on("click",function(){
u.sub_mobile_stop($(this).data("id"));
}),$("#js_mobileprotect_tip").show();
break;

default:
$(".js_no_protect").show(),u.onprotect();
}
}
var u={
_click:"click",
mobile_stop:function(){
var t,o=$(".js_mobilestop_form").popup({
title:"停用手机保护",
width:960,
close:function(){
this.remove();
},
onShow:function(){
t=this;
}
});
new i({
container:o,
mobile_num:_.mobileName,
old_checkurl:"/cgi-bin/mmbizverifysms?action=set_mobile_protect",
auto_send:!0,
old_callback:function(t){
var o=t.err_code;
0==o?(e.suc("停用成功"),setTimeout(function(){
location.reload();
},300)):e.err("验证失败");
},
old_checkparam:function(t){
return{
code_num:t,
value:"0"
};
}
}),o.find(".js_mobile_cancel").on(u._click,function(){
t&&t.remove();
});
},
sub_mobile_stop:function(t){
var o;
switch(t){
case 1:
o="(登录)";
break;

case 2:
o="(群发消息)";
break;

case 4:
o="(修改服务器配置)";
break;

case 8:
o="(修改appsecret)";
}
var n,c=$(".js_mobilestop_form").popup({
title:"停用手机保护"+o,
width:960,
close:function(){
this.remove();
},
onShow:function(){
n=this;
}
});
new i({
container:c,
mobile_num:_.mobileName,
old_checkurl:"/cgi-bin/mmbizverifysms?action=close_protect_status",
auto_send:!0,
old_callback:function(t){
var o=t.err_code;
0==o?(e.suc("停用成功"),setTimeout(function(){
location.reload();
},300)):e.err("验证失败");
},
old_checkparam:function(e){
return{
code_num:e,
value:"0",
status:t
};
}
}),c.find(".js_mobile_cancel").on(u._click,function(){
n&&n.remove();
});
},
mobile_edit:function(){
var t=null,o=null,s=null,r=$(".js_mobileedit_form").popup({
title:"改用微信保护",
width:960,
className:"dialog_process",
close:function(){
o&&o.destroy(),this.remove();
},
onShow:function(){
t=this;
}
});
s=new c({
container:r.find(".js_process"),
selected:1,
names:["1. 验证手机","2. 绑定微信"]
}),new i({
container:r,
mobile_num:_.mobileName,
auto_send:!0,
old_callback:function(i){
var c=i.err_code;
0==c?(e.suc("验证成功"),s.setStep(2),r.find(".js_step1").hide(),r.find(".js_step2").show(),
_.wxName?(r.find(".js_step2_pass").show(),o=new n({
container:r,
type:"change2_wx_protect",
code:_.code,
wx_name:_.wxName,
onconfirm:function(){
e.suc("修改成功"),setTimeout(function(){
location.reload();
},300);
}
})):r.find(".js_step2_error").show(),t.resetPosition()):e.err("验证失败");
},
old_checkparam:function(t){
return _.code=t,{
code_num:t
};
}
}),r.find(".js_mobile_cancel").on(u._click,function(){
t&&t.remove();
});
},
wx_stop:function(){
var t=null,o=$(".js_wxstop_form").popup({
title:"停用微信保护",
width:960,
close:function(){
t&&t.destroy(),this.remove();
},
buttons:[]
});
t=new n({
container:o,
type:"stop_wx_protect",
wx_name:_.wxName,
onconfirm:function(){
e.suc("已成功停用安全保护"),setTimeout(function(){
location.reload();
},300);
}
});
},
sub_wx_stop:function(t){
if(1==t&&"1"==_.lock_login)r.show({
title:"提示",
type:"info",
msg:"由于系统检测到当前账号存在盗号风险，因此不允许关闭登录保护",
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});else{
var o;
switch(t){
case 1:
o="(登录)";
break;

case 2:
o="(群发消息)";
break;

case 4:
o="(修改服务器配置)";
break;

case 8:
o="(修改appsecret)";
}
var i=null,c=$(".js_wxstop_form").popup({
title:"停用微信保护"+o,
width:960,
close:function(){
i&&i.destroy(),this.remove();
},
onShow:function(){
$(this.$dialogWrp.get(0)).css({
"margin-top":-284
});
},
buttons:[]
});
c.find(".js_nb_tip").text("你确认要关闭%s的安全保护吗？关闭后，账号%s时候不再进行二次验证".sprintf(o,o)).show(),
i=new n({
container:c,
type:"close_protect_status",
wx_name:_.wxName,
source:t,
onconfirm:function(){
e.suc("已成功停用安全保护"+o),setTimeout(function(){
location.reload();
},300);
}
});
}
},
wx_edit:function(){
var t=null,o=null,s=null,r=$(".js_wxedit_form").popup({
title:"修改保护方式",
width:960,
className:"dialog_process",
close:function(){
o&&o.destroy(),this.remove();
},
onShow:function(){
t=this;
}
});
s=new c({
container:r.find(".js_process"),
selected:1,
names:["1. 验证保护","2. 设置新保护方式"]
}),o=new n({
container:r,
type:"check",
source:"change",
wx_name:_.wxName,
onconfirm:function(){
_.code=this.code,s.setStep(2),r.find(".js_step1").hide(),r.find(".js_step2").show();
}
}),new i({
container:r,
mobile_num:_.mobileName,
old_checkurl:"/cgi-bin/mmbizverifysms?action=change2_mobile_protect",
old_callback:function(t){
var o=t.err_code;
0==o?(e.suc("修改成功"),setTimeout(function(){
location.reload();
},300)):e.err("验证失败");
},
old_checkparam:function(t){
return{
mob_code:t,
code:_.code
};
}
});
},
wx_btn:function(){
$("#js_wx_btn").on(u._click,function(){
$(".js_wxbtn_form").popup({
title:"更换微信号",
width:960,
close:function(){
this.remove();
},
buttons:[{
text:"去修改绑定微信号",
click:function(){
location.href=wx.url("/misc/safeassistant?action=view&t=setting/safe-mphelper");
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
},
type:"default"
}]
});
});
},
onprotect:function(){
$("#js_onprotect").on(u._click,function(){
var t=null,o=null,i=null;
_.wxName?(t=$(".js_onprotect_form").popup({
title:"开启安全保护",
width:960,
close:function(){
i&&i.destroy(),this.remove();
},
onShow:function(){
o=this;
}
}),i=new n({
container:t,
type:"bindwx_protect",
wx_name:_.wxName,
onconfirm:function(){
e.suc("已成功启用安全保护"),setTimeout(function(){
location.reload();
},300);
}
}),o.resetPosition()):(t=$(".js_onprotect_noform").popup({
title:"开启安全保护",
width:960,
close:function(){
this.remove();
},
onShow:function(){
o=this;
},
buttons:[{
text:"管理员微信号",
click:function(){
location.href=wx.url("/cgi-bin/safecenterstatus?action=admins&t=setting/safe-admins");
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
},
type:"default"
}]
}),o.resetPosition());
});
},
sub_onprotect:function(t){
var o={
action:"open_status",
status:t
};
if(2==_.protectType&&"1"!=t){
{
$(".js_mobilebtn_form").popup({
title:"开启保护",
width:960,
close:function(){
this.remove();
},
buttons:[{
text:"改用微信保护",
click:function(){
this.remove(),u.mobile_edit();
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
},
type:"default"
}]
});
}
return!1;
}
a.post({
url:wx.url("/cgi-bin/safecenterstatus"),
data:o,
mask:!1
},function(t){
if(!t||!t.base_resp)return void e.err("开启保护失败");
switch(+t.base_resp.ret){
case 0:
e.suc("开启保护成功"),setTimeout(function(){
location.reload();
},300);
break;

default:
a.handleRet(t,{
id:64463,
key:21,
showMsg:!1,
url:"/cgi-bin/safecenterstatus"
}),e.err("开启保护失败");
}
});
}
};
return{
init:t
};
}();
p.init();
});