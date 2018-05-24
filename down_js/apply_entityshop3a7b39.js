define("cardticket/apply_entityshop.js",["common/wx/dialog.js","common/wx/Tips.js","common/wx/Cgi.js"],function(i){
"use strict";
var o=i("common/wx/dialog.js"),n=i("common/wx/Tips.js"),t=i("common/wx/Cgi.js"),c=function(){
o.show({
type:"succ",
msg:"恭喜您，开通成功|开通成功，点击回到首页后您可以点击左侧导航使用该功能。",
buttons:[{
text:"回到首页",
click:function(){
location.href=wx.url("/cgi-bin/home");
}
}]
});
};
$("#js_apply_entityshop").click(function(){
return wx.cgiData.pluginid?void t.post({
url:"/merchant/entityshopapply?action=apply",
data:{
pluginid:wx.cgiData.pluginid
},
mask:!1
},function(){
c();
}):(n.err("参数错误"),!1);
});
});