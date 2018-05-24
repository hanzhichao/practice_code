define("setting/owner-setting-owner.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/phone_validate.js","biz_web/utils/upload.js","biz_common/jquery.validate.js","common/wx/popup.js","common/wx/Idcheck.js","common/wx/tooltips.js","common/wx/top.js"],function(e){
"use strict";
var o=e("common/wx/Tips.js"),r=e("common/wx/Cgi.js"),a=e("common/wx/phone_validate.js"),i=e("biz_web/utils/upload.js"),t=(e("biz_common/jquery.validate.js"),
e("common/wx/popup.js"),e("common/wx/Idcheck.js")),n=e("common/wx/tooltips.js"),c=e("common/wx/top.js");
new c("#topTab",c.DATA.setting).selected(0),function(){
(-1006==wx.cgiData.ret||-1005==wx.cgiData.ret)&&new t({
mobile:{
number:wx.cgiData.acl_mobile.replace("+86","")
},
callback:function(){
o.suc("验证成功"),location.reload(!0);
}
}).show();
}(),function(){
new n({
container:"#js_changeTypeTip",
content:"你的主体类型是个人，如需修改为企业/政府/媒体/其他组织类型，请%s申请微信认证%s".sprintf('<a href="'+wx.url("/acct/wxverifyorder?action=index")+'">',"</a>"),
position:{
left:-142,
top:0
}
});
}(),function(){
new a({
container:"#js_phone",
url:"/cgi-bin/formbyskey?form=mobile&action=set&f=json&check=0",
name:"operator_mobile",
timeout:60,
value:wx.cgiData.operator_mobile,
onfinish:function(){
o.suc("发送成功");
}
});
}(),function(){
$(".js_select_file").each(function(){
var e=$(this),r=e.attr("id"),a=e.attr("data-type")||2;
!function(e,r){
i.uploadTmpFile({
container:"#"+e,
multi:!1,
type:r,
onComplete:function(a,t,n,c){
var s=c.content||"";
if(0==c.base_resp.ret){
var m,l=$("#"+e+"_preview"),p=l.parent().find(".js_select_file");
if(2==r)l.html('<img src="%s">'.sprintf(i.tmpFileUrl(s)));else{
var m=l.parent().find("i.success").show();
m.length?m.html("已上传：{name}".format({
name:n.name
})):m=$('<i class="frm_msg success">已上传：{name}</i>'.format({
name:n.name
})).insertBefore(l).show();
}
p.text("重新上传");
var d=$("#"+e+"_hidden");
d.val(s),$("#"+e+"_file_name_hidden").val(n.name),l.parent().find(".fail").remove(),
o.suc("上传成功");
}
}
});
}(r,a);
});
}(),function(){
var e=new t({
mobile:{
number:wx.cgiData.acl_mobile.replace("+86","")
},
callback:function(){
o.suc("验证成功，请再次提交"),this.hide();
}
});
$("#personreg").validate({
rules:{
name:"required",
credential:"required",
idcard_copy_id:"required",
operator_name:"required",
operator_idcard:"required",
operator_idcard_copy:"required",
operator_mobile:"mobile",
verify_code:"verifycode"
},
messages:{
name:"身份证姓名不能为空",
credential:"身份证号码不能为空",
idcard_copy_id:"未选择文件",
operator_name:"运营者身份证姓名不能为空",
operator_idcard:"运营者身份证号码不能为空",
operator_idcard_copy:"未选择文件"
},
ignore:[],
errorPlacement:function(e,o){
var r=o.parent().parent();
r.find(".fail").remove(),e.insertBefore(o.is(".file_field")?r.find(".upload_preview"):r.find(".frm_tips"));
},
submitHandler:function(a){
var i=$(a).serializeObject();
return i.operator_mobile="+86"+i.operator_mobile,$("#confirmPopup").popup({
title:"提示",
className:"",
data:{
name:i.name
},
buttons:[{
text:"确定",
click:function(){
var a=this;
r.post({
url:"/acct/contractormodify?action=personal_contractor_set",
data:i,
mask:!1
},function(r){
switch(+r.base_resp.ret){
case 0:
o.suc("修改成功"),location.href=wx.url("/cgi-bin/frame?t=setting/owner-setting-result_frame");
break;

case 200002:
o.err("参数错误，提交失败");
break;

case 200003:
o.err("登录超时，请重新登录。");
break;

case 210022:
o.err("由于提交多次虚假或违规信息，该身份证号已被禁止注册");
break;

case 200034:
o.err("已有5个账号登记过该身份证，请使用另一个身份证完成用户信息登记");
break;

case 200024:
o.err("验证码不正确，请重新输入"),a.remove(),$("#verify_code").focus();
break;

case-35:
case 200035:
o.err("该手机已经登记过5次，请使用别的手机号进行用户信息登记");
break;

case 25:
case 200025:
o.err("未满18周岁，不能申请");
break;

case 201005:
case 201006:
a.remove(),e.show();
break;

default:
o.err("系统繁忙，请稍后再试");
}
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}],
autoShow:!0
}),!1;
}
});
}();
});