define("shop/feedback.js",["common/wx/tooltips.js","common/wx/Tips.js","common/wx/popup.js","common/wx/Cgi.js","tpl/shop/feedback.html.js","common/qq/jquery.plugin/zclip.js","biz_common/jquery.validate.js","page/shop/shop_feedback.css"],function(e){
"use strict";
var t=e("common/wx/tooltips.js"),o=e("common/wx/Tips.js"),n=(e("common/wx/popup.js"),
e("common/wx/Cgi.js")),s=e("tpl/shop/feedback.html.js");
return e("common/qq/jquery.plugin/zclip.js"),e("biz_common/jquery.validate.js"),
e("page/shop/shop_feedback.css"),function(){
function e(){
if(0==a)return $("#js_div_modify_account").remove(),!1;
$("#js_div_modify_account").show();
var e,t=$("#tpl_account_modification").popup({
title:"修改商户号和商户密钥",
mask:!0,
autoShow:!1,
buttons:[{
text:"确定",
click:function(){
var t=this;
if(e.valid()){
var s=e.serializeObject();
n.post({
url:"/merchant/merchantstat",
data:s,
mask:!1
},function(e){
switch(+e.ret){
case 0:
t.hide(),o.suc("修改商户号和密钥成功"),$("#js_accountFailTips").hide();
break;

case-1:
o.err("系统繁忙，请稍后重试");
break;

case-2:
var s=$("input[name=secret]").parent().parent();
s.find(".fail").remove(),s.find(".frm_tips").before('<p class="frm_msg fail" style="display:block"><span class="frm_msg_content">密钥错误，请重新填写</span></p>');
break;

default:
n.handleRet(e,{
id:64462,
key:95,
url:"/merchant/merchantstat"
});
}
});
}
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}]
});
e=$("#js_form_modify_account"),e.validate({
rules:{
account:"required",
secret:"required"
},
messages:{
account:"商户号不能为空",
secret:"商户密钥不能为空"
},
errorPlacement:function(e,t){
var o=t.parent().parent();
o.find(".fail").remove(),e.insertBefore(o.find(".frm_tips"));
}
}),$(".js_modifyAccountBtn").on("click",function(){
return t.popup("show"),!1;
});
}
function c(){
new t({
container:"#js_feedback",
content:s,
reposition:!0,
type:"hover",
position:{
left:-325,
top:-1
},
parentClass:"pay_tips_popover feedback pos_right",
onshow:function(){
this.show(),0==i&&(i=!0,e()),$(".js_feedback_url").each(function(){
var e=$(this).data("url");
$(this).prop("href",wx.url(e));
});
var t=$("#js_copyEmail");
0==t.parent().find(".zclip").length&&t.zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
return"mpshop@qq.com";
},
afterCopy:function(){
o.suc("复制成功");
}
});
}
});
}
var a=!1,i=!1;
n.get({
url:"/merchant/merchantstat?action=getwxpaytype",
data:{},
mask:!1,
error:function(){
c();
}
},function(e){
e&&0==e.base_resp.ret&&0==e.wxpay_type&&(a=!0),c();
});
};
});