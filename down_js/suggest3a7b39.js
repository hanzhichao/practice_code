define("tmplmsg/suggest.js",["common/wx/top.js"],function(t){
"use strict";
var n=t("common/wx/top.js");
new n("#topTab",n.DATA.templateMessage).selected(1);
var e=wx.url("/advanced/tmplmsg?action=open_edit"),c=10,o=function(){
return function(t,n){
c>0?"function"==typeof t&&t():"function"==typeof n&&n();
};
}();
if(wx.cgiData.capacity&&0!==parseInt(wx.cgiData.capacity))var a=setInterval(function(){
o(function(){
$("#countdown").html(c--);
},function(){
$("#confirm").removeClass("btn_disabled"),$("#confirm").html("确认"),$("#confirm").attr("href",e),
clearInterval(a);
});
},1e3);else $("#confirm").html("确认"),$(".mass_send_tips").html("本月提交个数已达上限");
});