var createLoginForm=function(e){
var n=jQuery,r=function(){
var e=!1;
switch(inputs=v.getVal(),!1){
case!!inputs.account:
i.trigger("Warning",[a,"你还没有输入帐号！"]);
break;

case!!inputs.password:
i.trigger("Warning",[u,"你还没有输入密码！"]);
break;

case!!inputs.verify||!!s.data("isHide"):
i.trigger("Warning",[f,"你还没有输入验证码！"]),t();
break;

default:
e=!0;
}
return e;
},t=function(){
d.attr("src","/cgi-bin/verifycode?username="+v.getVal().account+"&r="+ +new Date);
},o=e.selector,i=n(e.target).html(e.html),c=n(o.isRegiser,i),a=n(o.account,i).keydown(function(e){
13==e.keyCode&&u.focus().select();
}),u=n(o.password,i).keydown(function(e){
13==e.keyCode&&g.click();
}),s=n(o.verifyArea,i).data("isHide",1).hide(),f=n(o.verify,i).keydown(function(e){
13==e.keyCode&&(u.val()?g.click():u.focus().select());
}),d=n(o.verifyImg,i).click(t),g=n(o.loginBtn,i),l=n(o.gpBtn,i),p=n(o.gpAccount,i).keydown(function(e){
13==e.keyCode&&l.click();
}),m=function(e,n){
return;
};
d.bind({
load:function(){
m([a,u]),s.show().data("isHide",0),f.focus().select();
},
error:function(){
i.trigger("Response",["-2","帐号或密码错误。"]);
}
}),i.bind("Response",function(e,n){
switch(s.hide().data("isHide",1),m([a,u],"N"),n){
case"-3":
u.focus().select();
break;

case"-6":
s.data("isHide")||t(),f.focus().select();
break;

default:
a.focus().select();
}
u.val("");
});
var v={
jqObj:i,
showVerifyImg:t,
submit:function(){
if(i.trigger("BeforeSubmit"),r()){
var e=v.getVal();
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=66811_5_1",
n.post("/cgi-bin/login?loginhook=5&lang=zh_CN",{
username:e.account,
pwd:n.md5(e.password.substr(0,16)),
imgcode:s.data("isHide")?"":e.verify,
register:e.isRegister,
f:"json"
},function(e){
var n,r=e.base_resp.ret+"";
switch(r){
case"-1":
n="系统错误。";
break;

case"200021":
n="不存在该帐户。";
break;

case"200023":
n="帐号或密码错误。";
break;

case"200003":
n="密码错误。";
break;

case"200004":
n="不存在该帐户。";
break;

case"200007":
n="访问受限。";
break;

case"200008":
return n="需要输入验证码",void t();

case"200027":
n="您输入的验证码不正确，请重新输入",t();
break;

case"200024":
n="因频繁提交虚假资料，该帐号被拒绝登录。";
break;

case"200026":
n="该公众会议号已经过期，无法再登录使用。";
break;

case"0":
return n="成功登陆，正在跳转...",void(location.href=e.redirect_url);

case"200025":
n="Visit mp.weixin.qq.com to sign up";
break;

default:
return void(n="未知的返回。");
}
i.trigger("Response",[r,n]);
},"json");
}
},
getVal:function(){
return{
account:n.trim(a.val()),
password:n.trim(u.val()),
verify:n.trim(f.val()),
isRegiser:c.val()
};
},
setVal:function(e,r){
return n(o,i).val(r).length;
},
getUT:function(){
var e=n.trim(p.val());
return e.length<=0?void n("#gotpwd_error").show():(n("#gotpwd_error").hide(),void n.post("/cgi-bin/forgotpwdpage?lang=zh_CN",{
account:e,
f:"json"
},function(e){
if("unknown"==e.AccType)n("#gotpwd_error").show();else{
var r=e.Acc302URL||"admin.wechat.com";
window.location.href=r;
}
},"json"));
}
};
return g.click(v.submit),l.click(v.getUT),a.focus(),v;
};
!function(e){
"use strict";
function n(e,n){
var r=(65535&e)+(65535&n),t=(e>>16)+(n>>16)+(r>>16);
return t<<16|65535&r;
}
function r(e,n){
return e<<n|e>>>32-n;
}
function t(e,t,o,i,c,a){
return n(r(n(n(t,e),n(i,a)),c),o);
}
function o(e,n,r,o,i,c,a){
return t(n&r|~n&o,e,n,i,c,a);
}
function i(e,n,r,o,i,c,a){
return t(n&o|r&~o,e,n,i,c,a);
}
function c(e,n,r,o,i,c,a){
return t(n^r^o,e,n,i,c,a);
}
function a(e,n,r,o,i,c,a){
return t(r^(n|~o),e,n,i,c,a);
}
function u(e,r){
e[r>>5]|=128<<r%32,e[(r+64>>>9<<4)+14]=r;
var t,u,s,f,d,g=1732584193,l=-271733879,p=-1732584194,m=271733878;
for(t=0;t<e.length;t+=16)u=g,s=l,f=p,d=m,g=o(g,l,p,m,e[t],7,-680876936),m=o(m,g,l,p,e[t+1],12,-389564586),
p=o(p,m,g,l,e[t+2],17,606105819),l=o(l,p,m,g,e[t+3],22,-1044525330),g=o(g,l,p,m,e[t+4],7,-176418897),
m=o(m,g,l,p,e[t+5],12,1200080426),p=o(p,m,g,l,e[t+6],17,-1473231341),l=o(l,p,m,g,e[t+7],22,-45705983),
g=o(g,l,p,m,e[t+8],7,1770035416),m=o(m,g,l,p,e[t+9],12,-1958414417),p=o(p,m,g,l,e[t+10],17,-42063),
l=o(l,p,m,g,e[t+11],22,-1990404162),g=o(g,l,p,m,e[t+12],7,1804603682),m=o(m,g,l,p,e[t+13],12,-40341101),
p=o(p,m,g,l,e[t+14],17,-1502002290),l=o(l,p,m,g,e[t+15],22,1236535329),g=i(g,l,p,m,e[t+1],5,-165796510),
m=i(m,g,l,p,e[t+6],9,-1069501632),p=i(p,m,g,l,e[t+11],14,643717713),l=i(l,p,m,g,e[t],20,-373897302),
g=i(g,l,p,m,e[t+5],5,-701558691),m=i(m,g,l,p,e[t+10],9,38016083),p=i(p,m,g,l,e[t+15],14,-660478335),
l=i(l,p,m,g,e[t+4],20,-405537848),g=i(g,l,p,m,e[t+9],5,568446438),m=i(m,g,l,p,e[t+14],9,-1019803690),
p=i(p,m,g,l,e[t+3],14,-187363961),l=i(l,p,m,g,e[t+8],20,1163531501),g=i(g,l,p,m,e[t+13],5,-1444681467),
m=i(m,g,l,p,e[t+2],9,-51403784),p=i(p,m,g,l,e[t+7],14,1735328473),l=i(l,p,m,g,e[t+12],20,-1926607734),
g=c(g,l,p,m,e[t+5],4,-378558),m=c(m,g,l,p,e[t+8],11,-2022574463),p=c(p,m,g,l,e[t+11],16,1839030562),
l=c(l,p,m,g,e[t+14],23,-35309556),g=c(g,l,p,m,e[t+1],4,-1530992060),m=c(m,g,l,p,e[t+4],11,1272893353),
p=c(p,m,g,l,e[t+7],16,-155497632),l=c(l,p,m,g,e[t+10],23,-1094730640),g=c(g,l,p,m,e[t+13],4,681279174),
m=c(m,g,l,p,e[t],11,-358537222),p=c(p,m,g,l,e[t+3],16,-722521979),l=c(l,p,m,g,e[t+6],23,76029189),
g=c(g,l,p,m,e[t+9],4,-640364487),m=c(m,g,l,p,e[t+12],11,-421815835),p=c(p,m,g,l,e[t+15],16,530742520),
l=c(l,p,m,g,e[t+2],23,-995338651),g=a(g,l,p,m,e[t],6,-198630844),m=a(m,g,l,p,e[t+7],10,1126891415),
p=a(p,m,g,l,e[t+14],15,-1416354905),l=a(l,p,m,g,e[t+5],21,-57434055),g=a(g,l,p,m,e[t+12],6,1700485571),
m=a(m,g,l,p,e[t+3],10,-1894986606),p=a(p,m,g,l,e[t+10],15,-1051523),l=a(l,p,m,g,e[t+1],21,-2054922799),
g=a(g,l,p,m,e[t+8],6,1873313359),m=a(m,g,l,p,e[t+15],10,-30611744),p=a(p,m,g,l,e[t+6],15,-1560198380),
l=a(l,p,m,g,e[t+13],21,1309151649),g=a(g,l,p,m,e[t+4],6,-145523070),m=a(m,g,l,p,e[t+11],10,-1120210379),
p=a(p,m,g,l,e[t+2],15,718787259),l=a(l,p,m,g,e[t+9],21,-343485551),g=n(g,u),l=n(l,s),
p=n(p,f),m=n(m,d);
return[g,l,p,m];
}
function s(e){
var n,r="";
for(n=0;n<32*e.length;n+=8)r+=String.fromCharCode(e[n>>5]>>>n%32&255);
return r;
}
function f(e){
var n,r=[];
for(r[(e.length>>2)-1]=void 0,n=0;n<r.length;n+=1)r[n]=0;
for(n=0;n<8*e.length;n+=8)r[n>>5]|=(255&e.charCodeAt(n/8))<<n%32;
return r;
}
function d(e){
return s(u(f(e),8*e.length));
}
function g(e,n){
var r,t,o=f(e),i=[],c=[];
for(i[15]=c[15]=void 0,o.length>16&&(o=u(o,8*e.length)),r=0;16>r;r+=1)i[r]=909522486^o[r],
c[r]=1549556828^o[r];
return t=u(i.concat(f(n)),512+8*n.length),s(u(c.concat(t),640));
}
function l(e){
var n,r,t="0123456789abcdef",o="";
for(r=0;r<e.length;r+=1)n=e.charCodeAt(r),o+=t.charAt(n>>>4&15)+t.charAt(15&n);
return o;
}
function p(e){
return unescape(encodeURIComponent(e));
}
function m(e){
return d(p(e));
}
function v(e){
return l(m(e));
}
function h(e,n){
return g(p(e),p(n));
}
function k(e,n){
return l(h(e,n));
}
e.md5=function(e,n,r){
return n?r?h(n,e):k(n,e):r?m(e):v(e);
};
}("function"==typeof jQuery?jQuery:this),function(e){
"function"==typeof define&&define.amd?define("ibg_en/wxm-loginform.js",["jquery.js"],["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery.js")):e(jQuery);
}(function(e){
function n(e){
return a.raw?e:encodeURIComponent(e);
}
function r(e){
return a.raw?e:decodeURIComponent(e);
}
function t(e){
return n(a.json?JSON.stringify(e):String(e));
}
function o(e){
0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));
try{
return e=decodeURIComponent(e.replace(c," ")),a.json?JSON.parse(e):e;
}catch(n){}
}
function i(n,r){
var t=a.raw?n:o(n);
return e.isFunction(r)?r(t):t;
}
var c=/\+/g,a=e.cookie=function(o,c,u){
if(arguments.length>1&&!e.isFunction(c)){
if(u=e.extend({},a.defaults,u),"number"==typeof u.expires){
var s=u.expires,f=u.expires=new Date;
f.setMilliseconds(f.getMilliseconds()+864e5*s);
}
return document.cookie=[n(o),"=",t(c),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join("");
}
for(var d=o?void 0:{},g=document.cookie?document.cookie.split("; "):[],l=0,p=g.length;p>l;l++){
var m=g[l].split("="),v=r(m.shift()),h=m.join("=");
if(o===v){
d=i(h,c);
break;
}
o||void 0===(h=i(h))||(d[v]=h);
}
return d;
};
a.defaults={},e.removeCookie=function(n,r){
return e.cookie(n,"",e.extend({},r,{
expires:-1
})),!e.cookie(n);
};
});