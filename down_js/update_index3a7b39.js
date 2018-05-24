define("entityshop/update_index.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js","common/wx/popup.js"],function(n){
"use strict";
function t(){
i.html(c("tpl_step1",u)),$("#js_btn_next").on("click",function(){
o();
});
}
function o(){
i.html(c("tpl_step2",u));
{
var n=$("#js_btn_submit");
$("#js_btn_apply");
}
1==u.contractor_check_status&&0==u.need_upgrade_count?n.enable():n.disable(),$("#js_btn_pre").on("click",function(){
t();
}),n.on("click",function(){
if($(this).hasClass("btn_disabled"))return!1;
var n,t=$("#tpl_confirm").popup({
title:"插件升级须知",
className:"",
width:600,
height:null,
data:{
need_handle_count:u.need_handle_count
},
buttons:[{
text:"确认升级插件",
click:function(){
n.btn(0),s.post({
url:"/merchant/entityshop?action=upgrade_confirm"
},function(t){
n.btn(1),t&&0==t.base_resp.ret?(p.suc("升级成功"),location.href=wx.url("/merchant/newentityshop?action=list")):p.suc("系统错误，请重试");
});
},
type:"primary"
}],
autoShow:!0,
onHide:function(){
this.remove();
},
onShow:function(){
n=this.$dialogWrp.find(".js_btn_p");
}
});
t.popup("show"),t.popup("resetPosition");
});
}
function e(){
i=$("#js_container"),t();
}
var i,c=template.render,s=n("common/wx/Cgi.js"),p=n("common/wx/Tips.js"),u=(n("biz_web/ui/checkbox.js"),
n("common/wx/popup.js"),wx.cgiData);
e();
});