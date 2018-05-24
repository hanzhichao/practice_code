define("cardticket/apply_api_highlevel.js",["common/wx/popup.js","common/wx/dialog.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/stopMultiRequest.js","cardticket/common_init.js"],function(t){
"use strict";
t("common/wx/popup.js");
var o=t("common/wx/dialog.js"),i=t("common/wx/Cgi.js"),e=t("common/wx/Tips.js"),n=t("common/wx/tooltips.js");
t("common/wx/stopMultiRequest.js");
var a=!1;
$("#js_jsapi_open,#js_update_domain").click(function(){
return $("#js_jsapi_result_tpl").popup({
data:{
js_auth_domain:wx.cgiData.domain
},
title:"开通权限",
buttons:[{
text:"配置",
type:"primary",
click:function(){
var t=this;
if(!a){
var o=$("#js_domain").val();
if(!/^[^\s\/\.:]+(\.[^\s\/\.:]+)+$/.test(o))return e.err("域名格式错误, 请重新填写"),$("#js_domain").focus(),
!1;
a=!0,i.post({
url:"/merchant/cardapply",
data:{
action:"configjsapidomain",
js_auth_domain:o
},
error:function(){
a=!1;
}
},function(o){
0==o.base_resp.ret?(e.suc("JSAPI域名配置成功"),t.remove(),setTimeout(function(){
location.reload();
},500)):14005==o.base_resp.ret?(a=!1,e.err("域名格式错误, 请重新填写")):(a=!1,e.err("参数错误"));
});
}
}
},{
text:"取消",
click:function(){
this.hide();
}
}],
autoShow:!0,
onHide:function(){
this.remove();
}
}),!1;
});
var s=!1;
$("#js_sn_open,#js_url_open,#js_paycard_open").click(function(){
var t=$(this).attr("data-action"),n=$(this).attr("data-can");
if(0==n)var a=[{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}];else var a=[{
text:"开通",
click:function(){
var o=this;
s=!0,i.post({
url:"/merchant/cardapply",
data:{
action:t
},
error:function(){
s=!1;
}
},function(t){
0==t.base_resp.ret?(e.suc("已开通权限"),o.remove(),setTimeout(function(){
location.reload();
},500)):14012==t.base_resp.ret?(s=!1,e.err("请先开通微信支付")):(s=!1,i.show(t));
});
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}];
o.show({
title:"提示",
type:"info",
msg:template.render("js_"+t),
buttons:a
});
});
new n({
container:$(".js_audit_prepaid_fail"),
content:wx.cgiData.prepaid_fail_reason,
type:"hover",
parentClass:"pos_right"
});
t("cardticket/common_init.js");
});