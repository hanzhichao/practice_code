define("discuss/apply.js",["discuss/category.js","common/wx/Tips.js","common/wx/Cgi.js"],function(s){
"use strict";
function n(){
var s=500,n=20,e=$("#reason").val().length;
$("#counter").html(e),e>=n&&s>=e?$("#js_btn_apply").removeClass("btn_disabled"):$("#js_btn_apply").addClass("btn_disabled");
}
function e(){
$("#reason").keyup(function(){
n();
}),$("#reason").keydown(function(){
n();
}),$("#js_btn_apply").click(function(){
if($(this).hasClass("btn_disabled"))return!1;
var s={
firstProfession:$(".js_category_container .jsBtLabel").eq(0).html(),
secondProfession:$(".js_category_container .jsBtLabel").eq(1).html(),
reason:$("#reason").val()
};
$.post(wx.url("/misc/appmsgcommentapply?action=submit"),s,function(s){
s.base_resp&&0==s.base_resp.ret?($("#apply_container").hide(),$("#success_container").show()):(t.handleRet(s,{
id:64462,
key:23,
url:"/misc/appmsgcommentapply?action=submit"
}),o.err("网络错误，请稍后再试"));
});
});
}
{
var a=s("discuss/category.js"),o=s("common/wx/Tips.js"),t=s("common/wx/Cgi.js");
new a({
container:"#js_category_dom .js_category_container",
callback:function(){
var s=this.getNames(),n=s.join(",");
$("#js_category_dom .js_category_value").val(n);
}
});
}
!function(){
e();
}();
});