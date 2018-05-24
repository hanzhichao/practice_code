define("tmplmsg/payment_apply_detail.js",["common/wx/top.js","common/wx/popup.js","tmplmsg/tpl_cgi.js","common/wx/Tips.js"],function(t){
"use strict";
var a=t("common/wx/top.js"),e=(t("common/wx/popup.js"),t("tmplmsg/tpl_cgi.js")),p=t("common/wx/Tips.js"),o=wx.cgiData,s={
VERIFYING:1,
SUCCESS:2,
FAILED:3,
DELETED:4
};
!function(){
new a("#topTab",a.DATA.templateMessage).selected(2),$("#js_tmplDetail").html(template.render("js_tmplDetailHtml",wx.cgiData.data)),
o.data.status==s.FAILED&&($("#js_addBlock").show(),o.data.memo&&$("#js_failReason").text(o.data.memo).parent().show());
}(),function(){
if(o.data.status==s.FAILED){
for(var t,a=$("#js_addTmplHtml").popup({
title:"提交审核",
data:{},
buttons:[{
text:"提交",
click:function(){
var t=$.trim($("#js_reason").val());
return""==t?(p.err("请填写使用原因"),!0):void e.addPayTmpl({
action:"pay_apply",
store_id:o.data.store_id,
title:o.data.title,
reason:t,
example:o.data.example,
f:"json"
},function(){
location.href=wx.url("/advanced/tmplmsg?action=pay_list&t=tmplmsg/payment");
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}],
mask:!0,
autoShow:!1
}),l=o.data.example,m=l.split("\n"),i=[],n=0;n<m.length;n++)""!=m[n]&&-1!=m[n].indexOf("：")&&(t=m[n].split("："),
i.push({
label:t[0],
value:t[1]
}));
$("#payment_example").html(template.render("popup_example",{
items:i,
title:o.data.title
})),a.popup("resetPosition"),$("#js_add").on("click",function(){
a.popup("show");
});
}
}();
});