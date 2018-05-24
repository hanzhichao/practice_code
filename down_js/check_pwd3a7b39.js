define("safe/check_pwd.js",["common/wx/Cgi.js","safe/tpl/check_pwd.html.js","biz_common/jquery.validate.js","biz_common/jquery.md5.js","common/wx/verifycode.js","common/wx/Tips.js"],function(e,r,t){
"use strict";
function n(e){
function r(e,r){
var t={};
t[e]=r,f&&f.showErrors(t);
}
e=$.extend(!0,{},s,e),e.needButton=e.confirmBtton?!1:!0;
var t=this||{};
t.opts=e,t.container="string"==typeof e.container?$(e.container):e.container,t.container.html(template.compile(o)({
account:e.account||"",
needButton:e.needButton
}));
var n=t.container.find(".js_pwdform");
n.find("input").val("");
var d=new a(n.find(".js_verifycode"));
$.validator.addMethod("checkverifycode",function(e,r){
return this.optional(r)||/^[\w\d]{4,4}$/.test(e);
});
var m,f=n.find("form").validate({
rules:{
pwd:{
required:!0
},
imgcode:{
required:!0,
checkverifycode:!0
}
},
messages:{
pwd:{
required:"请填写登录密码"
},
imgcode:{
required:"请填写验证码",
checkverifycode:"验证码错误，请重新输入"
}
},
errorPlacement:function(e,r){
e.insertAfter(r.parent());
}
});
e.needButton?(n.find(".js_return").on("click",function(){
e.afterCancel&&e.afterCancel();
}),m=n.find(".js_submit")):m=e.confirmBtton,m.on("click",function(){
var t=$(this);
if(!t.attr("disabled")){
if(!f.checkForm())return f.errorList.length>0&&f.errorList[0].element.focus(),i.err("请完善表单"),
!1;
t.btn(!1);
var o=n.find("form").serializeObject(),a={
pwd:$.md5(o.pwd.substr(0,16)),
imgcode:o.imgcode
};
return c.post({
url:e.check_url,
data:a,
mask:!1
},function(n){
if(!n||!n.base_resp)return i.err("系统错误，请稍后重试"),t.btn(!0),void d.refresh();
var c=+n.base_resp.ret,o=-1;
switch(c){
case 0:
o=0;
break;

case 1001:
case 211001:
case 201001:
o=0;
break;

case 1002:
case 211002:
case 201002:
o=0;
break;

case 200013:
o=0;
break;

case 200002:
i.err("参数错误，请稍后重试");
break;

case 200020:
r("pwd","密码长度应最短6位，或者使用了非法字符");
break;

case 200023:
r("pwd","密码错误，请重新输入");
break;

case 200027:
r("imgcode","验证码错误，请重新输入");
break;

default:
i.err("系统错误，请稍后重试");
}
0!=c&&(t.btn(!0),d.refresh()),0==o&&e.afterSubmit&&e.afterSubmit(n);
}),!1;
}
});
}
var c=e("common/wx/Cgi.js"),o=e("safe/tpl/check_pwd.html.js"),a=(e("biz_common/jquery.validate.js"),
e("biz_common/jquery.md5.js"),e("common/wx/verifycode.js")),i=e("common/wx/Tips.js"),s={
check_url:"/advanced/advanced?action=view_appsecret",
account:"",
afterCancel:$.noop,
afterSubmit:$.noop,
confirmBtton:null
};
t.exports=n;
});