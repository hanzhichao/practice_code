define("payApply/earnest.js",["common/wx/dialog.js"],function(o){
"use strict";
var n=o("common/wx/dialog.js"),t="http://mch.tenpay.com/";
$("#go").click(function(){
n.show({
type:"warn",
msg:"请您在新打开的财付通账号页面完成保障金支付|完成支付流程前请不要关闭此窗口",
buttons:[{
text:"返回",
type:"normal",
click:function(){
this.remove();
}
},{
text:"已完成",
click:function(){
window.location.reload();
}
}]
}),window.open(t,"_blank");
}),$("#money").html((wx.cgiData.money/100).toFixed(2));
});