define("cardticket/detail/no_card.js",["common/wx/dialog.js"],function(i){
"use strict";
function n(){
o.show({
msg:"页面不存在|请点击确定返回首页",
buttons:[{
text:"返回首页",
type:"primary",
click:function(){
this.hide();
}
}],
onHide:function(){
location.href=wx.url("/cgi-bin/home?t=home/index");
}
});
}
var o=i("common/wx/dialog.js");
return n;
});