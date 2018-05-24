define("tmplmsg/tplEdit.js",["biz_common/jquery.validate.js","common/lib/colorpicker.js","widget/colorpicker.css","tmplmsg/tpl_cgi.js","common/wx/dialog.js"],function(t){
"use strict";
t("biz_common/jquery.validate.js"),t("common/lib/colorpicker.js"),t("widget/colorpicker.css");
{
var e={
content:"请遵守开发规范",
titleMsg:"模版标题描述需在2到10个字之间"
},i=t("tmplmsg/tpl_cgi.js"),o="/advanced/tmplmsg?action=list",l=t("common/wx/dialog.js"),r=wx.T,a=$.trim($("#js_editFormScript").html()),n=$("#js_editForm").append(r(a,wx.cgiData.tpl_item)),c=$.trim($("#js_tplHdScript").html());
$(".js_main_hd").html(r(c,wx.cgiData.tpl_item));
}
$("#colorpicker").colorpicker({
showInput:!0,
className:"topcolor-picker",
preferredFormat:"hex",
showPalette:!1,
clickoutFiresChange:!0
}),$.validator.addMethod("templateContent",function(t,e){
var i=!0,o="";
if(this.optional(e)&&(o="请输入模版内容",i=!1),i&&t.replace(/\{\{.*\.DATA\}\}/g,"").len()<=20&&(o="模版中必须有20个以上的固定字符",
i=!1),i&&t.length>600&&(o="模版内容必须短于600个字符",i=!1),i&&/http:\/\/|https"\/\/|ftp:\/\/|weixin:\/\//i.test(t)&&(o="模版内容中不能包含URL链接",
i=!1),i){
for(var l,r=7,a=/(?:(\{\{)|(\.DATA\}\}))/g,n=!0,c=0,s=0,m=c;l=a.exec(t);){
if(m=c,c=l.index,n&&!l[1]||!n&&!l[2]){
n=!1;
break;
}
s>0&&l.index-m==r&&(o="参数与参数之间，必须由固定文字连接",i=!1),n=!n,n&&s++;
}
n?s>10&&(o="模版消息最多10个参数",i=!1):(o="参数必须以{{开头，以.DATA}}结尾",i=!1);
}
return i||($.validator.messages.templateContent=o),i;
},e.content),$.validator.addMethod("titleValidate",function(t){
var t=$.trim(t);
return t.length<=10&&t.length>=2;
},e.titleMsg),n.validate({
rules:{
title:"titleValidate",
color:"required",
usage:"required",
content:"templateContent",
domain:"required"
},
submitHandler:function(t){
l.show({
title:"注意",
msg:"|模版保存之后，可与测试白名单中的用户进行测试。但必须提交审核通过之后，才能对全网用户开放。",
mask:!0,
buttons:[{
text:"确定",
click:function(){
var e=$(t).serializeObject();
i.saveTmpl(e,function(){
location.href=wx.url(o);
}),this.remove();
}
},{
text:"取消",
click:function(){
this.remove();
},
type:"normal"
}]
});
}
});
});