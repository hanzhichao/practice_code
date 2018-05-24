define("setting/owner-setting-operator.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/phone_validate.js","biz_web/utils/upload.js","biz_common/jquery.validate.js","common/wx/Idcheck.js","common/wx/qrcheck.js","common/wx/top.js"],function(e){
"use strict";
function a(e,a,c){
m&&r(),m=new s({
container:"#js_div_qrcheck",
size:120,
idCard:e,
name:a,
container_class:"qr_pop_check",
extra:{
subject:c
},
renderData:{
name_title:"运营者"
},
askSpeed:5,
askMaxNum:60,
cgiURI:"/acct/slaveqrcheckoper",
onTicketChange:function(e){
$("#js_input_qrcheck_ticket").val(e);
},
onStatusChange:function(e){
$("#js_input_qrcheck_status").val(e);
}
}),$.trim(e)&&$.trim(a)&&m.updateUser(e,a);
}
function r(){
m&&(m.destroy(),$("#js_div_qrcheck").html(""),$("#js_input_qrcheck_ticket").val(""),
$("#js_input_qrcheck_status").val(""));
}
var c=e("common/wx/Tips.js"),t=e("common/wx/Cgi.js"),i=e("common/wx/phone_validate.js"),o=e("biz_web/utils/upload.js"),n=(e("biz_common/jquery.validate.js"),
e("common/wx/Idcheck.js")),s=e("common/wx/qrcheck.js"),l=e("common/wx/top.js"),m=null;
new l("#topTab",l.DATA.setting).selected(0),function(){
(-1006==wx.cgiData.ret||-1005==wx.cgiData.ret)&&new n({
mobile:{
number:wx.cgiData.acl_mobile.replace("+86","")
},
callback:function(){
c.suc("验证成功"),location.reload(!0);
}
}).show();
}(),function(){
new i({
container:"#js_phone",
url:"/cgi-bin/formbyskey?form=mobile&action=set&f=json&check=0",
name:"operator_mobile",
timeout:60,
value:wx.cgiData.operator_mobile,
onfinish:function(){
c.suc("发送成功");
}
});
}(),function(){
$(".js_select_file").each(function(){
var e=$(this),a=e.attr("id"),r=e.attr("data-type")||2;
!function(e,a){
o.uploadTmpFile({
container:"#"+e,
multi:!1,
type:a,
onComplete:function(r,t,i,n){
var s=n.content||"";
if(0==n.base_resp.ret){
var l,m=$("#"+e+"_preview"),_=m.parent().find(".js_select_file");
if(2==a)m.html('<img src="%s">'.sprintf(o.tmpFileUrl(s)));else{
var l=m.parent().find("i.success").show();
l.length?l.html("已上传：{name}".format({
name:i.name
})):l=$('<i class="frm_msg success">已上传：{name}</i>'.format({
name:i.name
})).insertBefore(m).show();
}
_.text("重新上传");
var u=$("#"+e+"_hidden");
u.val(s),$("#"+e+"_file_name_hidden").val(i.name),m.parent().find(".fail").remove(),
c.suc("上传成功");
}
}
});
}(a,r);
});
}(),function(){
var e=new n({
mobile:{
number:wx.cgiData.acl_mobile.replace("+86","")
},
callback:function(){
c.suc("验证成功，请再次提交"),this.hide();
}
});
$.validator.addMethod("qrcheck",function(){
return"1"==$("#js_input_qrcheck_status").val()?!0:!1;
}),$("#operator_form").validate({
rules:{
operator_name:"required",
operator_idcard:"required",
operator_idcard_copy:"required",
operator_mobile:"mobile",
verify_code:"verifycode",
qrcheck_ticket:"required",
qrcheck_status:{
qrcheck:!0
}
},
messages:{
operator_name:"运营者身份证姓名不能为空",
operator_idcard:"运营者身份证号码不能为空",
operator_idcard_copy:"未选择文件",
qrcheck_ticket:"请扫描二维码验证身份",
qrcheck_status:"请扫描二维码验证身份"
},
ignore:[],
errorPlacement:function(e,a){
var r=a.parent().parent();
r.find(".fail").remove(),a.is(":hidden")?c.err(e.text()):e.insertBefore(a.is(".file_field")?r.find(".upload_preview"):r.find(".frm_tips"));
},
submitHandler:function(a){
var r=$(a).serializeObject();
return r.operator_mobile="+86"+r.operator_mobile.replace("+86",""),t.post({
url:"/acct/setoperatorinfo?action=set",
data:r,
mask:!1
},function(a){
switch(+a.base_resp.ret){
case 0:
c.suc("修改成功"),location.href=wx.url("/cgi-bin/settingpage?t=setting/index&action=index");
break;

case 200002:
c.err("参数错误，提交失败");
break;

case 200003:
c.err("登录超时，请重新登录。");
break;

case 210022:
c.err("由于提交多次虚假或违规信息，该身份证号已被禁止注册");
break;

case 200024:
c.err("手机验证码失效！"),$("#verify_code").focus();
break;

case 200034:
c.err("已有5个帐号登记过该身份证，请使用另外一个身份证完成用户信息登记");
break;

case-35:
case 200035:
c.err("该手机已经登记过5次，请使用别的手机号进行用户信息登记");
break;

case 25:
case 200025:
c.err("未满18周岁，不能申请");
break;

case 201005:
case 201006:
e.show();
break;

default:
c.err("系统繁忙，请稍后再试");
}
}),!1;
}
});
}(),function(){
var e=$("#operator_name"),c=$("#operator_idcard"),t=wx.cgiData.subject_name,i=null,o=function(){
console.log(e.val(),c.val()),e.val()&&c.val()?($("#js_div_idverify").show(),$("#js_div_idverify_none").hide(),
a(c.val(),e.val(),t)):($("#js_div_idverify").hide(),$("#js_div_idverify_none").show(),
r());
},n=function(e){
switch(e.which){
case 16:
break;

case 17:
break;

case 18:
break;

case 27:
break;

case 35:
break;

case 36:
break;

case 37:
break;

case 38:
break;

case 39:
break;

case 40:
break;

case 78:
break;

case 110:
break;

case 190:
break;

default:
i&&clearTimeout(i),i=setTimeout(o,500);
}
};
e.on("keyup change",n),c.on("keyup change",n),o();
}();
});