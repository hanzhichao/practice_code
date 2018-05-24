define("tmplmsg/payment.js",["common/wx/top.js","common/wx/dialog.js","tmplmsg/tpl_cgi.js"],function(t){
"use strict";
var e=t("common/wx/top.js"),a=t("common/wx/dialog.js"),n=t("tmplmsg/tpl_cgi.js");
new e("#topTab",e.DATA.templateMessage).selected(2),template.helper("statusConvert",function(t){
switch(t+=""){
case"0":
return"未审核";

case"1":
return"审核中";

case"3":
return"审核失败";

case"2":
return"使用中";

default:
return"未知状态";
}
return"未知状态";
}),function(){
var t=10-wx.cgiData.data.tmpl_msg.length;
$("#js_leftNum").text(t),$("#tpl_container").html(template.render("js_tmplListHtml",wx.cgiData.data)),
t>0&&$("#js_addNewTmpl").attr("href",wx.url("/advanced/tmplmsg?action=pay_lib&t=tmplmsg/payment_lib")).removeClass("btn_disabled").addClass("btn_primary");
}(),function(){
$(".js_edit").on("click",function(){
var t=$(this).data("id");
a.show({
type:"warn",
msg:"你确定要删除模版吗|删除后，模版ID将失效且不可恢复，使用模版ID的程序也将失效。",
buttons:[{
text:"确定",
click:function(){
n.deletePayTmpl(t,function(){
window.location.href=wx.url("/advanced/tmplmsg?action=pay_list&t=tmplmsg/payment");
});
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
}();
});