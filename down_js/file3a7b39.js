define("ad_system/file.js",["biz_common/moment.js","common/wx/top.js","common/wx/popup.js","biz_web/ui/dropdown.js","biz_web/utils/upload.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/dialog.js","ad_system/helper.js","common/wx/popover.js","biz_web/ui/checkbox.js"],function(e){
"use strict";
function t(){
return u.type=$("input[type=radio][checked=checked]").data("value"),$("#name").val()?(u.name=$("#name").val(),
void(u.url?n.post({
url:"/merchant/ad_file_manage?action=submit_file",
data:u
},function(e){
0==e.base_resp.ret?window.location.reload():"4003"==e.base_resp.ret?c.err("资质名称中含有非法字符"):c.err();
}):c.err("请上传资质"))):void c.err("请输入资质名称");
}
var o=e("biz_common/moment.js"),a=e("common/wx/top.js");
new a("#topTab",a.DATA.adClient).selected("adclientmanage"),e("common/wx/popup.js");
{
var s=(e("biz_web/ui/dropdown.js"),e("biz_web/utils/upload.js")),i=s.uploadCdnFile,n=e("common/wx/Cgi.js"),c=e("common/wx/Tips.js"),r=e("common/wx/dialog.js");
e("ad_system/helper.js");
}
e("common/wx/popover.js"),e("biz_web/ui/checkbox.js");
var m,l=e("common/wx/popover.js");
$("#icon").mouseover(function(){
m&&m.show?m.show():m=new l({
dom:$("#icon"),
content:$("#over").html(),
hover:!0
});
});
var d=[],u={},p=0,w=0;
wx.cgiData.list.each(function(e){
"STATUS_NORMAL"==e.status?e.statusName="有效":"STATUS_PENDING"==e.status?e.statusName="审核中":"STATUS_DENIED"==e.status?(e.statusName="未通过",
e.showDel=1):"STATUS_EXPIRED"==e.status?(e.statusName="已过期",e.showDel=1):"STATUS_WILL_EXPIRE"==e.status&&(e.statusName="即将过期"),
0==e.type?p++:(w++,e.showDel=1),d.push({
id:e.id,
type:1==e.type?"投放资质":"行业资质",
name:e.name,
url:e.url,
time:"STATUS_PENDING"==e.status?"审核中":0==e.valid_date?"永久有效":o.unix(e.valid_date).format("YYYY-MM-DD"),
statusName:e.statusName,
showDel:e.showDel
});
}),$("#tips").text("还可添加"+(8-p)+"个行业资质，"+(5-w)+"个投放资质"),0==d.length?$(".jsNo").show():($("#table").html(template.render("tpl",{
list:d
})),$(".jsNo").hide(),p>=8&&w>=5&&$("#add").removeClass("btn_primary").addClass("btn_disabled")),
$("#table").on("click",".jsDel",function(){
var e=$(this).data("id");
r.show({
type:"warn",
msg:"删除确认|确认要删除此资质文件么?删除资质后无法恢复。",
buttons:[{
text:"确认",
click:function(){
var t=this;
n.post({
url:"/merchant/ad_file_manage?action=delete_file",
data:{
id:e
}
},function(e){
0==e.base_resp.ret?window.location.reload():c.err(),t.hide();
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
}),$("#add").click(function(){
if(!(p>=8&&w>=5)){
{
$("#pop").popup({
title:"添加行业资质",
className:"add_qualify",
buttons:[{
text:"提交审核",
click:function(){
t(this);
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}],
close:function(){
this.remove();
}
});
}
$("input[type=radio]").checkbox(),8==p&&($("input[type=radio][data-value=1]").click(),
$("input[type=radio][data-value=0]").checkbox().disabled(!0)),5==w&&$("input[type=radio][data-value=1]").checkbox().disabled(!0),
i({
container:"#upload",
type:2,
multi:!1,
onComplete:function(e,t,o,a){
switch(+a.base_resp.ret){
case 0:
c.suc("上传成功"),u.url=a.content,$("#view").html('<a href="{href}" target="_blank"><img src="{src}"></a>'.format({
href:a.content,
src:a.content
}));
break;

case 1:
c.err("图片太大");
break;

case 200011:
c.err("请上传合法的图片格式");
break;

default:
c.err("上传图片失败");
}
}
});
}
});
});