define("service/package.js",["common/wx/dialog.js"],function(t){
"use strict";
var i=t("common/wx/dialog.js");
wx.cgiData.package?$("#openDiv").show():($("#js_tool_bar").show(),$("#applyBt").addClass("btn_primary").text("申请").show()),
$("#detailBt").click(function(){
var t=$(this).attr("href");
return wx.cgiData.dev?!0:(i.show({
type:"warn",
msg:"系统提示|你还没有成为开发者，请先成为开发者才能使用高级接口。",
buttons:[{
text:"成为开发者",
type:"primary",
click:function(){
this.remove(),window.location=t;
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
}),!1);
}),$("#applyBt").click(function(){
return $(this).hasClass("btn_disabled")?!1:wx.cgiData.verify?void 0:(i.show({
type:"warn",
msg:"请先申请微信认证，获得微信认证后将自动开通所有高级接口。",
buttons:[{
text:"去认证",
type:"primary",
click:function(){
this.remove(),window.location=wx.url("/acct/wxverifyorder?action=index");
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
}),!1);
});
});