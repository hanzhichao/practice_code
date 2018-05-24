define("advanced/menuApply.js",["common/qq/mask.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/top.js"],function(t){
"use strict";
function s(){
new a("#topTab",a.DATA.advanced).selected(0),"0"==cgiData.status||"3"==cgiData.status?($("#menuForm").show(),
$("#submitDiv").hide()):"1"==cgiData.status&&($("#menuForm").hide(),$("#submitDiv").show()),
$("#menuInput").focusout(function(){
var t=$.trim($(this).val()).length;
20>t||t>500?($("#failSpan").show(),$("#submitBt").attr("class","btn btn_disabled")):($("#failSpan").hide(),
$("#submitBt").attr("class","btn btn_primary"));
}),$("#submitBt").click(function(){
if(!$("#submitBt").hasClass("btn_disabled")){
var t=$.trim($("#menuInput").val()).length;
20>t||t>500?m.err("申请理由需在20到500个字中间"):n.post({
url:"/misc/skeyform?form=menuapplyform",
data:{
reason:$.trim($("#menuInput").val())
}
},function(t){
0==t.base_resp.ret?(m.suc("操作成功"),$("#menuForm").hide(),$("#submitDiv").show()):m.err("系统发生错误，请稍后重试");
});
}
});
}
var m=(t("common/qq/mask.js"),t("common/wx/Tips.js")),n=t("common/wx/Cgi.js"),a=t("common/wx/top.js");
s();
});