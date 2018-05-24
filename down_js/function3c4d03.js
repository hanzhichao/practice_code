define("setting/function.js",["common/wx/Tips.js","common/wx/dialog.js","common/qq/queryString.js","common/wx/top.js","common/wx/Cgi.js","common/wx/simplePopup.js","common/wx/popup.js","biz_web/ui/checkbox.js"],function(e){
"use strict";
function t(e,t,n){
if(e.val().trim())if("2"==t||"1"==t)e.parent().siblings(".js_fail").html("域名或路径格式不正确，请参考注意事项").show();else if("3"==t){
var i="";
1==n?i="未查询到ICP备案，若网站刚刚完成备案，请等待3个工作日再开始填写业务域名。如有疑问请致电ICP服务热线：010-66411166":2==n&&(i="未查询到ICP备案，若网站刚刚完成备案，请等待3个工作日再开始填写JS接口安全域名。如有疑问请致电ICP服务热线：010-66411166"),
e.parent().siblings(".js_fail").html(i).show();
}else e.parent().siblings(".js_pass").show();
}
function n(e,t){
var n=!0,a=e.length,s=t.length,r=!0,o=!0;
if(a!=s)return!1;
for(var c=0;a>c;c++){
var d=e[c],u=d.val().trim(),f=t[c];
u!==f&&(o=!1),u&&(r=!1,/^([A-Za-z0-9\-]{1,63}\.)*[A-Za-z0-9\-]{1,63}\.[A-Za-z0-9\-\/]{1,63}$/.test(u)?/\/{2,}/.test(u)?(d.parent().siblings(".js_fail").html("域名或路径格式不正确，请参考注意事项").show(),
n=!1):/(\/.*){4,}/.test(u)&&(d.parent().siblings(".js_fail").html("提交的路径长度超过最长限制").show(),
n=!1):(d.parent().siblings(".js_fail").html("域名或路径格式不正确，请参考注意事项").show(),n=!1));
}
return r===!0?(i.err("请至少填写一个域名"),!1):o===!0?(i.err("域名未修改"),!1):n;
}
var i=e("common/wx/Tips.js"),a=(e("common/wx/dialog.js"),e("common/qq/queryString.js")),s=e("common/wx/top.js"),r=e("common/wx/Cgi.js"),o=(wx.data.t,
wx.data.lang,wx.cgiData),c=e("common/wx/simplePopup.js");
e("common/wx/popup.js"),e("biz_web/ui/checkbox.js");
var d=new s("#topTab",s.DATA.setting);
d.selected(1);
var u=wx.cgiData.temp;
$("#tempBt").click(function(){
$("#tpl_tempsession").popup({
title:"临时会话消息",
buttons:[{
text:"确定",
click:function(){
var e=this;
r.post({
url:"/cgi-bin/setuserinfo?action=tempsession",
data:{
blocked:u
}
},function(t){
e.remove(),0==t.base_resp.ret?(i.suc(0==u?"接收设置成功，半小时后生效":"屏蔽设置成功，半小时后生效"),window.location.reload()):r.handleRet(t,{
id:64463,
key:16,
url:"/cgi-bin/setuserinfo?action=tempsession"
});
});
},
type:"primary"
}],
close:function(){
this.remove();
}
}),$(".jsTempCheck").checkbox({
onChanged:function(e){
u=$(e).data("value");
}
}),1==wx.cgiData.temp?$(".jsTempCheck[data-value=1]").click():$(".jsTempCheck[data-value=0]").click();
});
var f=function(e){
var t=arguments[1]||window.location.search,n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),i=t.substr(t.indexOf("?")+1).match(n);
return null!=i?i[2]:"";
},p=function(e){
var t=[wx.url("/misc/watermark?"),"&action=select&type=",e,"&random=",Math.random()];
return t.join("");
},l=function(){
var e=[];
return{
register:function(t,n){
e.push({
name:t,
init:n.init
});
},
init:function(){
$.each(e,function(){
this.init();
});
}
};
}();
if(l.register("privacy",{
init:function(){
var e=o.searchOpen;
$("#Js_privacy").on("click",function(){
var t=$("#tpl_privacy").popup({
title:"隐私设置",
onOK:function(){
var t=this,n=t.get().find(".btn").eq(0);
return-1==e?(i.err("请选择其中一项"),!0):(r.post({
url:"/cgi-bin/setuserinfo?t=ajax-response",
data:{
action:"search",
open:e
},
beforeSend:function(){
n.btn(0);
},
error:function(){
i.err("系统错误，请重试"),n.btn(1);
}
},function(e){
return n.btn(1),e&&e.base_resp?void(0==e.base_resp.ret?(i.suc("设置成功，半小时后即可生效"),setTimeout(function(){
location.reload();
},500)):r.handleRet(e,{
id:64463,
key:16,
url:"/cgi-bin/setuserinfo?t=ajax-response"
})):void i.err("设置失败");
}),!0);
},
onCancel:function(){
this.hide();
},
onHide:function(){
this.remove();
}
});
$(".Js_privacyRadio").checkbox({
multi:!1,
onChanged:function(n){
var i=+n.val();
e=i,1==i?t.find(".js_optiontxt").show():t.find(".js_optiontxt").hide();
}
});
});
}
}),l.register("water",{
init:function(){
$("#changeWaterMark").on("click",function(){
var e=$("#tpl_watermark").popup({
title:"图片水印设置",
onOK:function(){
var e=$("#waterRadioDiv").find("input[dt='waterRadio']:checked").val(),t=this.get().find(".js_btn").eq(0);
return r.get({
url:wx.url("/misc/watermark"),
data:{
action:"confirm",
type:e
},
beforeSend:function(){
t.btn(0);
},
error:function(){
i.err("系统错误，请重试"),t.btn(1);
}
},function(e){
if(e&&0==e.base_resp.ret){
i.suc("设置成功");
var n=new a;
n.remove("set_water"),window.location.href=n.getUrl();
}else r.handleRet(e,{
id:64463,
key:17,
url:"/misc/watermark?action=confirm"
}),t.btn(1);
}),!0;
},
onCancel:function(){
this.hide();
},
onHide:function(){
this.remove();
}
});
$("#waterRadioDiv").find("input[dt='waterRadio']").checkbox({
multi:!1,
onChanged:function(t){
var n=t.val(),i=e.popup("get").find(".js_btn").eq(0),a=$("#topWaterImg");
3==n?a.attr("src",a.attr("backSrc")):(i.btn(0),a.load(function(){
i.btn(1);
}),a.attr("src",p(n)));
}
});
}),"1"==f("set_water")&&$(document).ready(function(){
$("#changeWaterMark").trigger("click");
});
}
}),l.register("domain",{
init:function(){
var e=$(".js_domains"),a=wx.cgiData.trust_domain_left,s=wx.cgiData.mp_verify_txt;
if(e){
var c=e.find(".js_container"),d=0,u=[];
u.push(o.domain1?o.domain1:""),u.push(o.domain2?o.domain2:""),u.push(o.domain3?o.domain3:"");
for(var f=0,p=u.length;p>f;f++)u[f]&&(c.append("<p>%s</p>".sprintf(u[f])),d++);
0==d&&c.append("<p>未设置</p><p>设置业务域名后，在微信内访问该域名下页面时，不会被重新排版。</p>"),$("#trustedDomain").on("click",function(){
var e=$(template.render("tpl_domain",{
left:a,
mp_verify_txt:s
})).popup({
title:"业务域名",
width:850,
className:"function_url_dialog",
onCancel:function(){
this.hide();
},
onHide:function(){
this.remove();
},
buttons:[{
text:"保存",
click:function(){
var o=e.find(".js_btn").eq(0);
if(!(0>=a||o.parents("span.js_btn_p").hasClass("btn_loading"))){
var c=e.find(".js_domain1"),d=e.find(".js_domain2"),f=e.find(".js_domain3");
if(e.find(".js_fail").hide(),e.find(".js_pass").hide(),n([c,d,f],u)){
o.btn(0);
var p={
d1:c.val().trim(),
d2:d.val().trim(),
d3:f.val().trim()
},l="/cgi-bin/setuserinfo?action=trustdomain&t=ajax-response";
r.post({
url:l,
data:p,
mask:!1
},function(n){
if(o.btn(1),!n||!n.base_resp)return void i.err("系统错误，请重试");
var a=1*n.base_resp.ret;
switch(a){
case 0:
i.suc("提交成功"),setTimeout(function(){
location.reload();
},300);
break;

case 153002:
i.err("本月已修改三个业务域名，暂不支持修改。");
break;

case 153011:
for(var c=1*n.check_domain_res,d=1;3>=d;d++)t(e.find(".js_domain"+d),c%10,1),c=parseInt(c/10);
break;

case 216001:
i.err("请填写%s的二级域名".sprintf(p.d1));
break;

case 216002:
i.err("请填写%s的二级域名".sprintf(p.d2));
break;

case 216003:
i.err("请填写%s的二级域名".sprintf(p.d3));
break;

case 216101:
i.err("不允许使用短链域名%s".sprintf(p.d1));
break;

case 216102:
i.err("不允许使用短链域名%s".sprintf(p.d2));
break;

case 216103:
i.err("不允许使用短链域名%s".sprintf(p.d3));
break;

case 216201:
i.err("请将文件%s上传至%s指向的web服务器（或虚拟主机）的目录".sprintf(s,p.d1),5);
break;

case 216202:
i.err("请将文件%s上传至%s指向的web服务器（或虚拟主机）的目录".sprintf(s,p.d2),5);
break;

case 216203:
i.err("请将文件%s上传至%s指向的web服务器（或虚拟主机）的目录".sprintf(s,p.d3),5);
break;

case 216301:
i.err("访问到%s/%s内容与下载文件不符，请检查文件内容或重新上传原始文件".sprintf(p.d1,s),5);
break;

case 216302:
i.err("访问到%s/%s内容与下载文件不符，请检查文件内容或重新上传原始文件".sprintf(p.d2,s),5);
break;

case 216303:
i.err("访问到%s/%s内容与下载文件不符，请检查文件内容或重新上传原始文件".sprintf(p.d3,s),5);
break;

case 216401:
i.err("无法访问%s指向的web服务器（或虚拟主机）的目录，请检查网络设置".sprintf(p.d1),5);
break;

case 216402:
i.err("无法访问%s指向的web服务器（或虚拟主机）的目录，请检查网络设置".sprintf(p.d2),5);
break;

case 216403:
i.err("无法访问%s指向的web服务器（或虚拟主机）的目录，请检查网络设置".sprintf(p.d3),5);
break;

default:
r.handleRet(n,{
id:64463,
key:18,
url:"/cgi-bin/setuserinfo?action=trustdomain&t=ajax-response"
});
}
});
}
}
},
type:0>=a?"disabled":"primary"
},{
text:"关闭",
click:function(){
this.remove();
},
type:"default"
}]
}),o=e.find(".js_domain1"),c=e.find(".js_domain2"),d=e.find(".js_domain3");
u[0]&&o.val(u[0].html(!1)),u[1]&&c.val(u[1].html(!1)),u[2]&&d.val(u[2].html(!1));
});
}
}
}),l.register("authentication",{
init:function(){
var e=26,t=o.isNeedVerify;
$("#Js_authentication").on("click",function(){
$("#tpl_authentication").popup({
title:"设置关注验证",
onOK:function(){
var e=this.get().find(".js_btn_p").eq(0),n=$.trim($("#Js_question").find("input").val());
return-1==t?(i.err("请选择一项"),!0):1==t&&""==n?(i.err("验证问题不能为空"),!0):n.length>26?(i.err("验证问题不能超过26个字"),
!0):(r.post({
url:wx.url("/cgi-bin/setuserinfo?t=ajax-response"),
data:{
action:"meetingsettings",
need_verify:t,
verify_question:$("#Js_question").find("input").val()
},
beforeSend:function(){
e.btn(0);
},
error:function(){
i.err("系统错误，请重试"),e.btn(1);
}
},function(t){
return e.btn(1),t&&t.base_resp?void(0==t.base_resp.ret?(i.suc("设置成功"),location.reload()):i.err("设置失败")):void i.err("设置失败");
}),!0);
},
onCancel:function(){
this.hide();
},
onHide:function(){
$("#Js_question").remove(),this.remove();
}
}),$("#Js_question").find("input").val(o.question.html(!1)),$(".Js_authenticationRadio").checkbox({
multi:!1,
onChanged:function(e){
t=e.val(),"Js_needAuth"==e.attr("id")?$("#Js_question").show():$("#Js_question").hide();
}
}),$("#Js_question").find("i").on("click",function(){
var e=$("#Js_question").find("ul");
return e.hasClass("dn")?e.show(100).toggleClass("dn"):e.hide(100).toggleClass("dn"),
$(this).toggleClass("select_icon_up").toggleClass("select_icon_down"),!1;
}),$(document).on("click",function(){
$("#Js_question").find("ul").hide(100).addClass("dn"),$("#Js_question").find("i").removeClass("select_icon_up").addClass("select_icon_down");
}),$("#Js_question").on("click","li",function(){
var e=$(this).text();
$("#Js_question").find("input").val(e).focus();
}),$("#Js_question").find("input").on("focus",function(){
$("#Js_wordNum").show().text(26-$(this).val().length);
}).on("blur",function(){
$("#Js_wordNum").hide();
}).on("keyup",function(){
$("#Js_wordNum").text(26-$(this).val().length);
}).on("keydown",function(t){
if(!t.ctrlKey)switch(t.keyCode){
case 8:
case 13:
case 37:
case 38:
case 39:
case 40:
case 46:
break;

default:
$(this).val().length>=e&&t.preventDefault();
}
}).on("paste",function(e){
var t="";
return window.clipboardData&&clipboardData.getData?t=clipboardData.getData("Text"):e.originalEvent.clipboardData&&(t=e.originalEvent.clipboardData.getData("text/plain")),
$(this).val(($(this).val()+t).substr(0,26)),!t;
});
});
}
}),l.register("jssdk",{
init:function(){
var e=$(".js_jssdk"),a=wx.cgiData.jsapi_domain_left,s=wx.cgiData.mp_verify_txt;
if(e){
var c=e.find(".js_container"),d=0,u=[];
u.push(o.js_domain1?o.js_domain1:""),u.push(o.js_domain2?o.js_domain2:""),u.push(o.js_domain3?o.js_domain3:"");
for(var f=0,p=u.length;p>f;f++)u[f]&&(c.append("<p>%s</p>".sprintf(u[f])),d++);
0==d&&c.append("<p>未设置</p><p>设置JS接口安全域名后，公众号开发者可在该域名下调用微信开放的JS接口</p>"),e.show(),
$("#jssdkSet").on("click",function(){
var e=$(template.render("tpl_jssdk",{
left:a,
mp_verify_txt:s
})).popup({
title:"JS接口安全域名",
width:850,
className:"function_url_dialog",
onCancel:function(){
this.hide();
},
onHide:function(){
this.remove();
},
buttons:[{
text:"保存",
click:function(){
var o=e.find(".js_btn").eq(0);
if(!(0>=a||o.parents("span.js_btn_p").hasClass("btn_loading"))){
var c=e.find(".js_domain1"),d=e.find(".js_domain2"),f=e.find(".js_domain3");
if(e.find(".js_fail").hide(),e.find(".js_pass").hide(),n([c,d,f],u)){
o.btn(0);
var p={
d1:c.val().trim(),
d2:d.val().trim(),
d3:f.val().trim()
},l="/cgi-bin/setuserinfo?action=jsapidomain&t=ajax-response";
r.post({
url:l,
data:p,
mask:!1
},function(n){
if(o.btn(1),!n)return void i.err("系统错误，请重试");
switch(+n.base_resp.ret){
case 0:
i.suc("提交成功"),setTimeout(function(){
location.reload();
},300);
break;

case 153002:
i.err("本月已修改三个安全域名，暂不支持修改。");
break;

case 153011:
for(var a=1*n.check_domain_res,c=1;3>=c;c++)t(e.find(".js_domain"+c),a%10,2),a=parseInt(a/10);
break;

case 216001:
i.err("请填写%s的二级域名".sprintf(p.d1));
break;

case 216002:
i.err("请填写%s的二级域名".sprintf(p.d2));
break;

case 216003:
i.err("请填写%s的二级域名".sprintf(p.d3));
break;

case 216101:
i.err("不允许使用短链域名%s".sprintf(p.d1));
break;

case 216102:
i.err("不允许使用短链域名%s".sprintf(p.d2));
break;

case 216103:
i.err("不允许使用短链域名%s".sprintf(p.d3));
break;

case 216201:
i.err("请将文件%s上传至%s指向的web服务器（或虚拟主机）的目录".sprintf(s,p.d1),5);
break;

case 216202:
i.err("请将文件%s上传至%s指向的web服务器（或虚拟主机）的目录".sprintf(s,p.d2),5);
break;

case 216203:
i.err("请将文件%s上传至%s指向的web服务器（或虚拟主机）的目录".sprintf(s,p.d3),5);
break;

case 216301:
i.err("访问到%s/%s内容与下载文件不符，请检查文件内容或重新上传原始文件".sprintf(p.d1,s),5);
break;

case 216302:
i.err("访问到%s/%s内容与下载文件不符，请检查文件内容或重新上传原始文件".sprintf(p.d2,s),5);
break;

case 216303:
i.err("访问到%s/%s内容与下载文件不符，请检查文件内容或重新上传原始文件".sprintf(p.d3,s),5);
break;

case 216401:
i.err("无法访问%s指向的web服务器（或虚拟主机）的目录，请检查网络设置".sprintf(p.d1),5);
break;

case 216402:
i.err("无法访问%s指向的web服务器（或虚拟主机）的目录，请检查网络设置".sprintf(p.d2),5);
break;

case 216403:
i.err("无法访问%s指向的web服务器（或虚拟主机）的目录，请检查网络设置".sprintf(p.d3),5);
break;

default:
r.handleRet(n,{
id:64463,
key:19,
url:"/cgi-bin/setuserinfo?action=jsapidomain&t=ajax-response"
});
}
});
}
}
},
type:0>=a?"disabled":"primary"
},{
text:"关闭",
click:function(){
this.remove();
},
type:"default"
}]
}),o=e.find(".js_domain1"),c=e.find(".js_domain2"),d=e.find(".js_domain3");
u[0]&&o.val(u[0].html(!1)),u[1]&&c.val(u[1].html(!1)),u[2]&&d.val(u[2].html(!1));
});
}
}
}),wx.cgiData.has_oauth){
var m="用户在网页授权页同意授权给公众号后，微信会将授权数据传给一个回调页面，回调页面需在此域名下，以确保安全可靠。<br />注意事项：<br />1、回调页面域名或路径需使用字母、数字及“-”的组合（例：wx.qq.com或wx.qq.com/mp），不支持IP地址、端口号及短链域名。填写的域名或路径需与实际回调URL中的域名或路径相同。<br />",_=2;
1!=wx.cgiData.is_oversea_acct&&(m+="2、填写的域名须通过ICP备案的验证。<br />",_++),m+="%s、将文件<a href='/cgi-bin/mpverifytxt?lang=zh_CN&token=%s'>%s（点击下载）</a>上传至填写域名或路径指向的web服务器（或虚拟主机）的目录（若填写域名，将文件放置在域名根目录下，例如wx.qq.com/%s；若填写路径，将文件放置在路径目录下，例如wx.qq.com/mp/%s），并确保可以访问。".sprintf(_,wx.cgiData.token,wx.cgiData.mp_verify_txt,wx.cgiData.mp_verify_txt,wx.cgiData.mp_verify_txt),
$("#oauthSet").click(function(){
new c({
title:"网页授权域名",
label:"授权回调页面域名:",
value:wx.cgiData.authUrl||"",
validator:[{
rule:function(e){
return/^([A-Za-z0-9\-]{1,63}\.)*[A-Za-z0-9\-]{1,63}\.[A-Za-z0-9\-\/]{1,63}$/.test(e)&&!/\/{2,}/.test(e);
},
msg:"域名或路径格式不正确，请参考注意事项"
},{
rule:function(e){
return!/(\/.*){4,}/.test(e);
},
msg:"提交的路径长度超过最长限制"
}],
tips:m,
callback:function(e){
var t=this,n=t.get(),a=n.find(".js_btn").eq(0);
if(!a.parents("span.js_btn_p").hasClass("btn_loading"))return a.btn(0),r.post({
url:"/merchant/myservice?action=set_oauth_domain&f=json",
data:{
domain:e
}
},function(n){
a.btn(1);
var s=n.base_resp.ret;
0==s?(i.suc("通过安全监测"),wx.cgiData.authUrl=e,$(".account_setting_item.js_oauth .meta_content.js_container p").text(e),
t.remove()):10302==s?i.err("域名存在安全风险"):1==s||2==n.base_resp.ret?i.err("域名或路径格式不正确，请参考注意事项"):3==s?i.err("未查询到ICP备案，若网站刚刚完成备案，请等待3个工作日再开始填写授权回调页面域名。如有疑问请致电ICP服务热线：010-66411166"):216001==s?i.err("请填写%s的二级域名".sprintf(e)):216101==s?i.err("不允许使用短链域名"):216201==s?i.err("请将文件%s上传至%s指向的web服务器（或虚拟主机）的目录".sprintf(wx.cgiData.mp_verify_txt,e),5):216301==s?i.err("访问到%s/%s内容与下载文件不符，请检查文件内容或重新上传原始文件".sprintf(e,wx.cgiData.mp_verify_txt),5):216401==s?i.err("无法访问%s指向的web服务器（或虚拟主机）的目录，请检查网络设置".sprintf(e),5):(r.show(n),
r.handleRet(n,{
id:64463,
key:5,
url:"/merchant/myservice?action=set_oauth_domain"
}));
}),!1;
}
});
});
}
l.init();
});