define("wifi/device_common.js",[],function(t,e,r){
"use strict";
function i(t,e,r){
var i="";
e?e.length>32?i="输入的SSID过长":t==n.pwd&&(/[\x00-\xff]+$/.test(e)||(i="SSID中有中文或其他字符")):i="请输入SSID";
var d="";
return t==n.pwd&&(r=$(".js_pwd_input").val(),r?(r.length<8||r.length>24)&&(d="输入的密码长度不符规范"):d="请输入密码",
/^WX/.test(e)||/^WX/.test(r)||i||(i="SSID和密码至少要有一个以WX开头")),{
valid:!i&&!d,
ssidErr:i,
pwdErr:d
};
}
var n={
pwd:4,
portal:31,
empty:0
};
r.exports={
DType:n,
checkValid:i
};
});