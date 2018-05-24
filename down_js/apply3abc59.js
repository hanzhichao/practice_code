define("tmplmsg/apply.js",["biz_common/jquery.validate.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/trade.js","common/qq/jquery.plugin/serializeObject.js","common/wx/dialog.js"],function(i){
"use strict";
function e(){
return 0==wx.cgiData.isWxVerify&&0==wx.cgiData.isQverify?(n('请先通过<a href="'+d+'" target="_blank">微信认证</a>后，再继续申请。'),
!1):!0;
}
function n(i){
t.show({
type:"warn",
msg:"|"+i,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
}
{
var a=(i("biz_common/jquery.validate.js"),i("common/wx/Cgi.js")),r=i("common/wx/Tips.js"),s=i("common/wx/trade.js"),t=(i("common/qq/jquery.plugin/serializeObject.js"),
i("common/wx/dialog.js")),d=wx.url("/acct/wxverifyorder?action=index");
wx.url("/cgi-bin/frame?nav=10010&t=business/index_frame&iframe=%2Fpaymch%2Fbusiness%3Faction%3Dfirstentry"),
new s({
container:"#js_mainBusiness",
label:{
field1:"未选择",
field2:"未选择"
},
list:{
field1:[{
id:-1,
name:"未选择"
}],
field2:[{
id:-1,
name:"未选择"
}]
},
input:{
field1:$("input[name=mainField1]").get(0),
field2:$("input[name=mainField2]").get(0),
type:"name"
},
onChange:function(i,e){
-1==e&&("field1"==i?$("input[name=mainField1]").val(""):$("input[name=mainField2]").val(""));
}
}),new s({
container:"#js_subsidiaryBusiness",
label:{
field1:"未选择",
field2:"未选择"
},
list:{
field1:[{
id:-1,
name:"未选择"
}],
field2:[{
id:-1,
name:"未选择"
}]
},
input:{
field1:$("input[name=subsidiaryField1]").get(0),
field2:$("input[name=subsidiaryField2]").get(0),
type:"name"
},
onChange:function(i,e){
-1==e&&("field1"==i?$("input[name=subsidiaryField1]").val(""):$("input[name=subsidiaryField2]").val(""));
}
});
}
$("#js_applyTmplmsg").validate({
groups:{
mainField:"mainField1 mainField2",
subsidiaryField:"subsidiaryField1 subsidiaryField2"
},
rules:{
mainField1:{
required:!0
},
mainField2:{
required:!0
},
reason:{
required:!0,
rangelength:[20,500]
}
},
messages:{
mainField1:{
required:"请选择一个主营行业"
},
mainField2:{
required:"请选择一个主营行业"
},
reason:{
required:"申请理由不能为空",
rangelength:$.validator.format("申请理由需要在{0}到{1}个字之间")
}
},
ignore:[],
errorPlacement:function(i,e){
var n=e.parent().parent();
n.find(".fail").remove(),i.insertBefore(n.find(".frm_tips"));
},
submitHandler:function(i){
var n=$(i).serializeObject(),s=e();
return s?void(n.mainField1==n.subsidiaryField1&&n.mainField2==n.subsidiaryField2?t.show({
type:"err",
msg:"主营行业和副营行业不能相同",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
}):a.post({
url:"/advanced/tmplmsgapply",
data:{
reason:n.reason,
primary_industry:n.mainField1+" "+n.mainField2,
secondary_industry:n.subsidiaryField2?n.subsidiaryField1+" "+n.subsidiaryField2:""
},
mask:!1
},function(i){
switch(i.base_resp.ret){
case 0:
r.suc("申请成功"),location.href=wx.url("/cgi-bin/frame?t=tmplmsg/apply_state_frame");
break;

case 10411:
r.err("请先申请认证再申请模版消息");
break;

default:
r.err("申请失败");
}
})):!1;
}
});
});