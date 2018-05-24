define("authorize/plugin.js",["common/wx/Cgi.js","common/wx/dialog.js","common/wx/Tips.js"],function(t){
"use strict";
var e=(wx.cgiData,t("common/wx/Cgi.js")),n=t("common/wx/dialog.js"),o=t("common/wx/Tips.js");
!function(){
var t=wx.cgiData||{},i=t.item&&t.item.length>0?t.item[0]:{},r=i.component_appid||"",a=i.component_name||"";
$("#js_info").html(template.render("tpl_info",i)),$("#js_roles").html(template.render("tpl_roles",i));
var s=function(t){
var e=$("<div></div>");
return e.text(t),e.html();
};
$("#js_unauth").on("click",function(){
if(!r||!a)return!1;
var t;
t=1==i.pay_auth_another_way?"请确认是否取消授权|确认提交后，除微信支付权限集之外的其他权限集都将取消授权，但微信支付授权关系由于在其他途径也有建立，此处无法解除授权关系":"取消授权|请确定是否取消授权，确定后，你在%s的业务可能会被影响".sprintf(s(a)),
n.show({
type:"warn",
msg:t,
mask:!0,
buttons:[{
text:"确定",
click:function(){
var t=this;
e.post({
url:"/cgi-bin/component_unauthorize",
data:{
component_appid:r
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void o.err("系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
o.suc("取消授权成功"),setTimeout(function(){
location.href=wx.url("/cgi-bin/component_unauthorize?action=list&t=service/auth_plugins");
},300);
break;

case-318:
t.remove(),n.show({
type:"warn",
msg:"暂时无法取消授权|由于你对此第三方平台的授权还未彻底完成（新商户号还未复制成功），暂时无法取消授权",
mask:!0,
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove();
}
}]
});
break;

default:
o.err("取消授权失败，请重试");
}
});
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
});
}();
});