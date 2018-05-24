define("wifi/homemanager_modify/welcome.js",["wifi/homemanager_modify/utils.js","biz_web/ui/checkbox.js"],function(e,i,t){
"use strict";
var r=e("wifi/homemanager_modify/utils.js"),a=(e("biz_web/ui/checkbox.js"),{}),n=wx.cgiData,c=n.welcomeType;
a._getWording=function(){
switch(c){
case 0:
return"欢迎光临%s".sprintf(n.appName);

case 1:
return"欢迎光临%s".sprintf(n.shopName);

case 2:
return"已连接%sWi-Fi".sprintf(n.appName);

case 3:
return"已连接%sWi-Fi".sprintf(n.shopName);

default:
return"欢迎光临%s".sprintf(n.appName);
}
},a._renderPreview=function(){
var e=this._getWording();
$(".js_view_welcome").text(e);
},a._renderEdit=function(){
for(var e=$("#tpl_welcome").html(),i={},t=this,r=0;3>=r;r++)i["wording"+r]=this._getWording(r);
i["check"+c]=!0,$(".js_edit_welcome").html(wx.T(e,i));
var a=$(".js_edit_welcome").find("input[type=radio]");
a.on("click",function(){
c=$(this).data("type"),t._renderPreview();
}),a.checkbox({
multi:!1
}),a.eq(c).trigger("click").checkbox("checked",!0),n.auditState||(a.eq(1).disable().checkbox("disabled"),
a.eq(3).disable().checkbox("disabled"));
},a.getData=function(){
return r.makeData({
bar_head:{
bar_type:c
}
});
},a.init=function(){
this._renderEdit(),this._renderPreview();
},t.exports=a;
});