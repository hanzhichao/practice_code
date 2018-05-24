define("advanced/web_debugger.js",["common/wx/bindWeChat.js","common/wx/popover.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/Cgi.js","common/wx/popup.js"],function(e){
"use strict";
var n=e("common/wx/bindWeChat.js"),o=(wx.T,e("common/wx/popover.js")),t=e("common/wx/Tips.js"),s=template.render,i=(e("common/wx/dialog.js"),
e("common/wx/Cgi.js")),c=(e("common/wx/popup.js"),154013),a=154014,r=154015,m=154016,d=-2,u=-1,p=0,l=function(e){
var n=$("<div></div>");
return n.text(e),n.html();
},j=function(){
$("#js_bind_list").html(s("tpl_helper_tb",{
lists:wx.cgiData.dev_list.list,
num:wx.cgiData.dev_num
}));
var e;
$("#js_bind_list").find(".js_tip").on("mouseover",function(){
$(".popover").hide();
var n=$(this),t=n.data("nick")||"";
t=l(t),e=new o({
dom:n,
content:"已发送绑定邀请，待%s确认后即可绑定，若24小时内未确认，系统将自动撤销邀请。".sprintf(t)
});
}).on("mouseout",function(){
e&&e.remove();
});
},_=function(){
{
var e=$(this),n=e.data("id");
e.data("status");
}
n&&i.post({
url:"/cgi-bin/safecenterstatus",
data:{
action:"devunbind",
openid:n
}
},function(e){
switch(+e.base_resp.ret){
case c:
t.err("该公众号已经绑定了10个开发者微信号，无法绑定更多微信号");
break;

case a:
t.err("该微信号已经绑定了5个公众号，无法绑定成为开发者");
break;

case r:
t.err("该微信号已经成功绑定了该公众号，请勿重复绑定");
break;

case m:
t.err("该公众号当天进行了20次邀请绑定操作，无法进行操作");
break;

case u:
case d:
t.err("系统错误，请稍候再试");
break;

case p:
t.suc("解绑成功"),setTimeout(function(){
location.reload();
},300);
}
});
};
j(),n.init({
container:"#js_helper_bind",
title:"绑定开发者微信号"
}),$(".js_helper_unbind").on("click",_),$(".js_helper_unsent").on("click",_),setTimeout(function(){
$("#js_faqscene_tpl").html("");
},0);
});