define("setting/postedit.js",["common/wx/Cgi.js","setting/tpl/postedit.html.js","common/wx/Tips.js"],function(t){
"use strict";
function a(t){
t=$.extend(!0,{},i,t);
var a=this;
a.opt=t,a.container="object"==typeof t.container?t.container:$(t.container),a.name=a.container.data("txt"),
a.param=a.container.data("param"),a.container.html(template.compile(s)({
name:a.name,
content:a.opt.content
})),a.textbox=a.container.find("input"),a.button=a.container.find("a"),a.failtip=a.container.find(".js_fail"),
a.passtip=a.container.find(".js_pass"),a.textbox.on("keyup",function(){
var t="btn_disabled";
""!=$(this).val().trim()?a.button.hasClass(t)&&a.button.removeClass(t):!a.button.hasClass(t)&&a.button.addClass(t);
}),a.button.on("click",function(){
var t=$(this),s="btn_disabled";
if(!t.hasClass(s))if(t.hasClass("js_edit"))t.removeClass("js_edit").text("提交"),a.textbox.attr("disabled",!1).parent().removeClass("disabled"),
a.passtip.hide();else{
t.addClass("btn_disabled").text("提交中"),a.failtip.hide();
var i=wx.url(a.opt.check_url);
e.post({
url:i,
data:{
param1:a.textbox.val().trim(),
param2:a.param
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void n.err("系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
n.suc("提交成功"),a.passtip.show(),a.textbox.attr("disabled",!0).parent().addClass("disabled"),
t.addClass("js_edit").removeClass("btn_disabled").text("修改");
break;

default:
n.err("失败，请重试"),t.removeClass("btn_disabled").text("提交"),a.failtip.show();
}
});
}
}),a.opt.content?(a.textbox.val(a.opt.content).attr("disabled",!0).parent().addClass("disabled"),
a.button.text("修改").addClass("js_edit")):a.button.text("提交").addClass("btn_disabled");
}
var e=t("common/wx/Cgi.js"),s=t("setting/tpl/postedit.html.js"),n=t("common/wx/Tips.js"),i={
container:"",
check_url:"",
content:""
};
return a.prototype={
status:function(){}
},a;
});