define("cardticket/intercomm_noauth.js",["common/wx/dialog.js"],function(o){
"use strict";
var t=o("common/wx/dialog.js");
t.show({
msg:"您没有互通卡券的权限，无法打开此链接。",
type:"info",
buttons:[{
text:"回到首页",
click:function(){
location.href=wx.url("/cgi-bin/home");
},
type:"primary"
}]
});
});