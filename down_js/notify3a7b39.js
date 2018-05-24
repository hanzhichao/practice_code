define("safe/notify.js",["common/wx/Tips.js","common/wx/popup.js","biz_web/ui/checkbox.js","safe/Scan.js","safe/Mobile.js","common/wx/Step.js"],function(t){
"use strict";
var o=t("common/wx/Tips.js"),e=(t("common/wx/popup.js"),t("biz_web/ui/checkbox.js"),
t("safe/Scan.js")),n=t("safe/Mobile.js"),i=t("common/wx/Step.js"),c=wx.cgiData||{},s={
strategy_resp:{}
},r=$.extend({},s,c);
if(r.strategy_resp.strategy_status){
var a=r.strategy_resp.strategy_status;
r.protectType=a.wx_notify?1:0,r.wxName=a.wx_alias||"";
}
var u=function(){
function t(){
switch(r.protectType){
case 1:
$(".js_wx_protect").show(),$("#js_wx_num").text(r.wxName),c.wx_edit(),c.wx_stop(),
c.wx_btn();
break;

default:
$(".js_no_protect").show(),c.onprotect();
}
}
var c={
_click:"click",
wx_stop:function(){
var t=null,n=null;
$("#js_wx_stop").on(c._click,function(){
t=$(".js_wxstop_form").popup({
title:"停用微信提醒",
width:960,
close:function(){
n&&n.destroy(),this.remove();
},
buttons:[]
}),n=new e({
container:t,
type:"stop_wx_notify",
wx_name:r.wxName,
onconfirm:function(){
o.suc("已成功停用安全提醒"),setTimeout(function(){
location.reload();
},300);
}
});
});
},
wx_edit:function(){
var t=null,s=null,a=null,u=null;
$("#js_wx_edit").on(c._click,function(){
s=$(".js_wxedit_form").popup({
title:"修改提醒方式",
width:960,
className:"dialog_process",
close:function(){
a&&a.destroy(),this.remove();
},
onShow:function(){
t=this;
}
}),u=new i({
container:s.find(".js_process"),
selected:1,
names:["1. 验证提醒","2. 设置新提醒方式"]
}),a=new e({
container:s,
type:"check",
source:"change",
wx_name:r.wxName,
onconfirm:function(){
r.code=this.code,u.setStep(2),s.find(".js_step1").hide(),s.find(".js_step2").show();
}
}),new n({
container:s,
mobile_num:r.mobileName,
old_checkurl:"/cgi-bin/mmbizverifysms?action=change2_mobile_notify",
old_callback:function(t){
var e=t.err_code;
0==e?(o.suc("修改成功"),setTimeout(function(){
location.reload();
},300)):o.err("验证失败");
},
old_checkparam:function(t){
return{
mob_code:t,
code:r.code
};
}
});
});
},
wx_btn:function(){
$("#js_wx_btn").on(c._click,function(){
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
$("#js_onprotect").on(c._click,function(){
var t=null,n=null,i=null;
r.wxName?(t=$(".js_onprotect_form").popup({
title:"开启安全提醒",
width:960,
close:function(){
i&&i.destroy(),this.remove();
},
onShow:function(){
n=this;
}
}),i=new e({
container:t,
type:"bindwx_notify",
wx_name:r.wxName,
onconfirm:function(){
o.suc("已成功启用安全提醒"),setTimeout(function(){
location.reload();
},300);
}
}),n.resetPosition()):(t=$(".js_onprotect_noform").popup({
title:"开启安全提醒",
width:960,
close:function(){
this.remove();
},
onShow:function(){
n=this;
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
}),n.resetPosition());
});
}
};
return{
init:t
};
}();
u.init();
});