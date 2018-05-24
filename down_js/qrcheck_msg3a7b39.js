define("common/wx/qrcheck_msg.js",["tpl/qrcheck.html.js"],function(r,s,a){
"use strict";
function e(r,s,a,e){
s=s+""||"0",a=a+""||"0",e=e+""||"0";
var l="";
if("0"==s){
var t=c.find(".js_qrcheck_ret_"+a+"_"+e);
if(t&&t.length>0&&(l=t.html()),!l)if("2"==a){
var i=a+"_"+e;
l=_[i];
}else l=_[a];
l||(l=_["2_unknown"]);
}else l=_.sys_error;
return l='<div class="qrcheck_msg">'+l+"</div>",wx.T(l,r);
}
var c=$(r("tpl/qrcheck.html.js")),_={
sys_error:'系统错误 <a href="javascript:;" class="js_qr_reload">刷新二维码</a>',
0:"请使用{name}微信扫描二维码进行验证",
1:'<a href="javascript:;" class="js_qr_reload">返回二维码</a>',
3:'二维码已过期 <a href="javascript:;" class="js_qr_reload">刷新</a>',
4:'<a href="javascript:;" class="js_qr_reload">返回二维码</a>',
"2_unknown":'验证失败 <a href="javascript:;" class="js_qr_reload">刷新二维码</a>'
};
c.hide(),a.exports={
get:e
};
});