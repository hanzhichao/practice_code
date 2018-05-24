define("setting/upgradeService.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/dialog.js"],function(o){
"use strict";
var e=o("common/wx/Cgi.js"),i=o("common/wx/Tips.js"),s=o("common/wx/dialog.js");
$("#bt").click(function(){
s.show({
type:"warn",
msg:"操作确认|升级为服务号后，群发次数从每日1条变更为每月4条，且无法撤回，请确认。",
buttons:[{
text:"确定",
click:function(){
e.post({
url:wx.url("/cgi-bin/formbyskey?form=serviceinfoform&f=json"),
data:{
servicetype:2
}
},function(o){
return o&&o.base_resp?void(0==o.base_resp.ret?(i.suc("设置成功"),location.href="/"):i.err()):void i.err();
}),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
});
});