define("tmplmsg/payment_detail.js",["common/wx/top.js","common/wx/popup.js","tmplmsg/tpl_cgi.js","common/wx/Tips.js"],function(t){
"use strict";
var a=t("common/wx/top.js"),e=(t("common/wx/popup.js"),t("tmplmsg/tpl_cgi.js")),s=t("common/wx/Tips.js"),p=wx.cgiData;
!function(){
new a("#topTab",a.DATA.templateMessage).selected(2),$("#js_tmplDetail").html(template.render("js_tmplDetailHtml",wx.cgiData.data)),
4==wx.cgiData.data.status&&$("#js_tip").text("该模版已通过审核，点击添加直接使用"),(0==wx.cgiData.data.status||3==wx.cgiData.data.status||4==wx.cgiData.data.status)&&$("#js_addBlock").show();
}(),function(){
for(var t,a=$("#js_addTmplHtml").popup({
title:"提交审核",
data:{},
buttons:[{
text:"提交",
click:function(){
var t=$.trim($("#js_reason").val());
return""==t?(s.err("请填写使用原因"),!0):void e.addPayTmpl({
action:"pay_apply",
store_id:p.data.id,
title:p.data.title,
reason:t,
example:p.data.example,
status:wx.cgiData.data.status,
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
}),i=p.data.example,l=i.split("\n"),o=[],m=0;m<l.length;m++)""!=l[m]&&-1!=l[m].indexOf("：")&&(t=l[m].split("："),
o.push({
label:t[0],
value:t[1]
}));
$("#payment_example").html(template.render("popup_example",{
items:o,
title:p.data.title
})),a.popup("resetPosition"),$("#js_add").on("click",function(){
a.popup("show");
});
}();
});