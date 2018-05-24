define("setting/safehelper.js",["common/wx/Tips.js","common/wx/popup.js","common/wx/Step.js","safe/Scan.js","safe/safe_check.js"],function(n){
"use strict";
var i=template.render,e=n("common/wx/Tips.js"),t=(n("common/wx/popup.js"),n("common/wx/Step.js")),o=n("safe/Scan.js"),s=(n("safe/safe_check.js"),
wx.cgiData||{}),c={
wx_alias:"",
appid:"",
ticket:"",
wxbind_status:-1
},a=$.extend({},c,s),d=function(){
function n(){
$(".js_container").html(i("tpl_main",{
data:a
})),$("#js_bind").click(function(){
window.location.href=wx.url("/cgi-bin/contractorverify?action=bind_admin_page");
}),$("#js_rebind").click(function(){
var n=null,i=null,s=$(".js_dialog").popup({
title:"修改绑定微信号",
width:960,
className:"dialog_process",
close:function(){
n&&n.destroy(),this.remove();
},
buttons:[],
onShow:function(){
i=this,$(this.$dialogWrp.get(0)).css({
"margin-top":-302
});
}
}),c=new t({
container:s.find(".js_head"),
selected:1,
names:["1 验证原微信号","2 绑定新微信号"]
});
s.find(".js_change").show(),n=new o({
container:s,
type:"check",
source:"modify",
wx_name:a.wx_alias,
onconfirm:function(){
e.suc("已成功验证原微信号"),s.find(".js_nb_tip").show(),c.setStep(2);
var i=this.code;
i&&(n=new o({
container:s,
type:"rebind",
code:i,
dom_init:'<div class="status tips"><p>请使用微信扫描二维码进行验证</p></div>',
onconfirm:function(){
e.suc("已成功绑定管理员微信号"),setTimeout(function(){
location.reload();
},300);
}
}));
}
});
});
}
return{
init:n
};
}();
d.init();
});