define("service/base.js",["common/wx/dialog.js"],function(t){
"use strict";
var i=t("common/wx/dialog.js"),e=wx.cgiData.msg;
$("#detailBt").click(function(){
var t=$(this).attr("href");
return wx.cgiData.dev?!0:(i.show({
type:"warn",
msg:"系统提示|"+e,
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
});
});