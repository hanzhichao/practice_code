define("register/base_info.js",["common/wx/Cgi.js","common/wx/Tips.js","tpl/verifycode.html.js","biz_common/jquery.validate.js","common/qq/jquery.plugin/serializeObject.js","common/lib/jquery.md5.js","common/qq/prototype.js","biz_web/ui/checkbox.js","common/wx/verifycode.js"],function(e,r,i){
"use strict";
var a=e("common/wx/Cgi.js"),s=e("common/wx/Tips.js"),t=(e("tpl/verifycode.html.js"),
e("biz_common/jquery.validate.js")),o=(e("common/qq/jquery.plugin/serializeObject.js"),
e("common/lib/jquery.md5.js"),t.rules.email),c=(e("common/qq/prototype.js"),e("biz_web/ui/checkbox.js"),
e("common/wx/verifycode.js"));
$.validator.addMethod("checkpwd",function(e,r){
return this.optional(r)||/^[\x21-\x7e]{6,}$/.test(e);
}),$.validator.addMethod("checkverifycode",function(e,r){
return this.optional(r)||/^[\w\d]{4,4}$/.test(e);
}),i.exports=function(e,r){
var i=$("#js_agree"),t=$("#js_nextBtn"),n=$("#js_email"),d=['<p class="frm_msg fail" style="display: block;">',"<i>●</i>",'<span for="js_email" class="frm_msg_content" style="display: inline;">%s</span>',"</p>"].join("");
n.blur(function(){
var e=$.trim(n.val());
o(e)&&a.post({
url:"/acct/emailregisterpage",
data:{
email:e,
type:"check"
},
mask:!1
},function(e){
var r="";
if(e&&210023==e.base_resp.ret?r=d.sprintf("邮箱已经被注册过，请直接登录"):e&&210022==e.base_resp.ret?r=d.sprintf("此邮箱已绑定客户端微信帐号，不能用于注册公众帐号"):e&&200013==e.base_resp.ret&&(r=d.sprintf("操作过于频繁，请稍后再试")),
""!=r){
var i=n.parent().parent();
i.find("p.fail").remove(),i.find(".frm_tips").before(r);
}
});
});
{
var l=new c("#js_verifycodeImgArea");
i.checkbox();
}
i.click(function(){
i.is(":checked")?t.attr("disabled",!1).removeClass("btn_disabled"):t.attr("disabled",!0).addClass("btn_disabled");
}),"undefined"!=typeof r&&(n.val(r.email),$("#pw1").val(r.pwd),$("#pw2").val(r.pwd)),
$("#js_baseInfoForm").validate({
rules:{
email:{
required:!0,
email:!0
},
pw1:{
required:!0,
checkpwd:!0
},
pw2:{
required:!0,
equalTo:"#pw1"
},
imgcode:{
required:!0,
checkverifycode:!0
}
},
messages:{
email:{
required:"请输入正确的邮箱地址",
email:"请输入正确的邮箱地址"
},
pw1:{
required:"密码长度不足6位，或者使用了非法字符",
checkpwd:"密码长度不足6位，或者使用了非法字符"
},
pw2:{
required:"密码长度不足6位，或者使用了非法字符",
equalTo:"两次输入的密码不一致"
},
imgcode:{
required:"验证码错误，请重新输入",
checkverifycode:"验证码错误，请重新输入"
}
},
errorPlacement:function(e,r){
var i=r.parent(),a=i.parent(),s=a.find(".frm_tips");
a.find("p.fail").remove(),s.length?e.insertBefore(s):e.appendTo(a);
},
submitHandler:function(r){
var i=$(r).serializeObject();
return a.post({
url:"/acct/emailregisterpage",
data:{
email:i.email,
verifycode:l.getCode(),
pwd:$.md5(i.pw1.substr(0,16))
},
mask:!1,
error:function(){
s.err("注册失败");
}
},function(r){
var a=r.base_resp.ret;
if(0==a)e(2,{
email:i.email,
pwd:i.pw1.substr(0,16)
});else switch(a){
case 210022:
s.err("此邮箱已绑定客户端微信帐号，不能用于注册公众帐号");
break;

case 210023:
s.err("邮箱已经被注册过，请从公众平台首页直接登录");
break;

case 200024:
s.err("验证码输入错误"),l.refresh();
break;

case 200013:
s.err("操作过于频繁，请稍后再试");
break;

default:
s.err("注册失败！");
}
}),!1;
}
});
};
});