define("shop/apply.js",["common/wx/upload.js","common/wx/Tips.js","common/wx/Cgi.js","config/manage_category.js","common/wx/qrcheck_weapp.js","common/wx/Step.js","common/wx/dialog.js","common/wx/popup.js"],function(e){
"use strict";
var i=e("common/wx/upload.js"),n=e("common/wx/Tips.js"),a=e("common/wx/Cgi.js"),t=e("config/manage_category.js"),r=e("common/wx/qrcheck_weapp.js"),s=e("common/wx/Step.js"),o=e("common/wx/dialog.js");
e("common/wx/popup.js");
var c;
c=new s(2==wx.cgiData.service_type?{
container:"#step",
selected:2,
names:["绑定微信支付商户号","编辑小店信息"]
}:{
container:"#step",
selected:1,
names:["编辑小店信息","绑定微信支付商户号"]
});
var _=$(".js_app_info_form"),p=null,d=!1,m=function(e){
return e.replace(/[^\0-\xff]/g,"**").length;
};
_.on("input",".js_input_length_limit_target",function(){
"text"==this.type&&(d=!1);
var e=$(this).closest(".js_input_length_limit_wrapper"),i=e.find(".js_input_length_limit_hint");
_.find(".js_input_nickname_err").text("").hide(),e.find(".js_input_length_limit_err").text("").hide(),
e.find(".js_input_nickname_checked, #additional_credentials_wrapper").hide();
var n=m(this.value),a=$(this).data("maxlength"),t=$(this).data("minlength");
i.text(n+"/"+a),e.find(".js_input_length_limit_count").toggleClass("warn",n>a||t>n);
}),_.find(".js_check_name_available").on("click",function(){
var e=_.find(".js_input_data_field[name=nickname]").val();
d=!1,a.post({
url:wx.url("/merchant/merchantentrance?action=check_nickname"),
data:{
nickname:e
}
},{
done:function(i){
var n=_.find(".js_input_nickname_err");
if(!i||!i.base_resp)return void n.text("系统错误，请稍后再试").show();
var t=i.base_resp.ret,r=function(e){
n.html(e).show();
};
switch(t){
case 0:
_.find(".js_input_nickname_checked").show(),_.find(".js_input_nickname_err").html(""),
d=!0;
break;

case 210047:
r("该名称需要提交相应资料进行审核");
var s=$("#additional_credentials_wrapper").html(wx.T($("#additional_credentials_tpl").html(),{
type:"add",
name:"&nbsp;",
description:i.wording,
multi:!0
}));
d=!0,f(s);
break;

case 65201:
r("不能使用该名称");
break;

case 210050:
case 210044:
r("名称不能与已有公众帐号的微信号重复");
break;

case 210046:
r("该名称在侵权投诉保护期，暂不支持申请，请重新提交一个新的名称");
break;

case 200013:
r("提交次数过于频繁，请稍后再试");
break;

case 210041:
r("名称长度为4-30个字符，不能含有特殊字符及“微信”等保留字");
break;

case 211003:
r("名称正在2天保护期中，暂不能申请使用；你可在保护期满后重新申请使用该名称");
break;

case 290001:
r("简介不符合规范，请更换简介");
break;

case 260003:
r('该名称与已有小程序名称重复，请重新提交一个新的名称，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="http://kf.qq.com/faq/170216iuM7JF170216MVFZRz.html">侵权投诉</a>。'.sprintf("<a href='javascript:;' id='js_viewsameaccount'>","</a>")),
$("#js_viewsameaccount").click(function(){
window.open(wx.url("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(e)));
});
break;

case 260004:
r("订阅号不能开通尚未授权的小店父商户号");
break;

case 290005:
r("公众号主体与商户名称不匹配");
break;

case 290006:
r("创建商户关系失败，服务商不能绑定为小店的子商户");
break;

case 290007:
r("认证已过期");
break;

case 290009:
r("已配置subappid个数已达上限");
break;

case 290010:
r("获取物流信息失败");
break;

case 290011:
r("没有设置全局运费");
break;

case 260007:
var o=e.replace("+","");
o==e&&(o+="+"),r('小程序已有“%s”时，需与该帐号相同主体才可申请，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="http://kf.qq.com/faq/170216iuM7JF170216MVFZRz.html">侵权投诉</a>'.sprintf(o,"<a href='javascript:;' id='js_viewsameaccount'>","</a>")),
$("#js_viewsameaccount").click(function(){
window.open(wx.url("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(o)));
});
break;

case 260008:
r('该名称与已有公众号名称重复，需与该小程序帐号相同主体才可申请，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="http://kf.qq.com/faq/170216iuM7JF170216MVFZRz.html">侵权投诉</a>。'.sprintf("<a href='javascript:;' id='js_viewsameaccount'>","</a>")),
$("#js_viewsameaccount").click(function(){
window.open(wx.url("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(e)));
});
break;

case 260009:
r('该名称与已有多个公众号名称重复，暂不支持申请，请重新提交一个新的名称，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="http://kf.qq.com/faq/170216iuM7JF170216MVFZRz.html">侵权投诉</a>。'.sprintf("<a href='javascript:;' id='js_viewsameaccount'>","</a>")),
$("#js_viewsameaccount").click(function(){
window.open(wx.url("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(e)));
});
break;

case 260010:
var o=e.replace("+","");
o==e&&(o+="+"),r('公众号已有“%s”时，需与该帐号相同主体才可申请，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="http://kf.qq.com/faq/170216iuM7JF170216MVFZRz.html">侵权投诉</a>'.sprintf(o,"<a href='javascript:;' id='js_viewsameaccount'>","</a>")),
$("#js_viewsameaccount").click(function(){
window.open(wx.url("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(o)));
});
break;

default:
a.handleRet(i,{
id:64462,
key:95,
url:"/merchant/merchantentrance?action=check_nickname"
}),r("系统错误，请稍后再试");
}
},
fail:function(){
n.err("请求失败，请检查网络连接");
}
});
}),a.get(wx.url("/merchant/merchantentrance?action=categorylist"),function(e){
return e&&e.base_resp&&!e.base_resp.ret?(t.initCategory(e.categories),void(p=new t.classFn({
type:"add",
container:$(".js_service_categories")
}))):void n.err("系统错误，请稍后再试");
});
var f=function(e){
e.find(".js_select_file").each(function(){
var e=$(this).attr("id"),a=Number($(this).data("multi")),t=i.uploadTmpFileWithCheck({}),r=$("#"+e).closest(".frm_controls");
r.find(".js_upload_preview").html(""),t({
container:"#"+e,
multi:a>1,
type:2,
accept:{
extensions:"bmp,jpeg,jpg,png",
mimeTypes:"image/*"
},
width:106,
onComplete:function(e,t,s,o){
var c=o.content||"",_=c,p=r.find('input[type="hidden"].js_input_data_field');
a>1&&c.split(";").length>a?n.err("上传的图片不多于"+a+"张"):0==o.base_resp.ret?(p.val(c),
r.find(".js_upload_preview").html("").append($('<img style="width:140px;" src="%s">'.sprintf(i.tmpFileUrl(_)))).show(),
r.find(".js_input_headimg_err").html("").hide()):n.err(200010==o.base_resp.ret?"图片太大":200011==o.base_resp.ret?"请上传合法的图片格式":200034==o.base_resp.ret?"图片尺寸错误":"上传失败");
}
});
});
};
f(_);
var h=function(e){
var i;
2==wx.cgiData.service_type&&(i=new r.initPopup({
size:165,
data:{
data:"",
extra:"",
typeid:5
},
msgData:{
name:"管理员"
},
showImgInfo:!0,
cgiURI:"/cgi-bin/safeqrcode",
onSuccess:function(n){
i.popup.popup("remove"),e(n);
},
onMsgUpdate:function(){}
})),i.load();
},l={};
_.find(".js_app_info_form_submit").click(function(){
function e(e,i){
i&&l&&(l.mid=i),l.qrcheck_ticket=e,a.post({
url:wx.url("/merchant/merchantentrance?action=open_wxopenmall"),
data:l
},{
done:function(e){
if(!e||!e.base_resp)return void n.err("系统错误，请稍后再试");
var a=e.base_resp.ret;
return 290001==a?void n.err("简介不符合规范，请更换简介"):290003==a?void n.err("订阅号检验商户号非法"):290004==a?void n.err("订阅号不能开通尚未授权的小店父商户号"):290005==a?void n.err("公众号主体与商户名称不匹配"):290006==a?void n.err("创建商户关系失败，服务商不能绑定为小店的子商户"):290007==a?void n.err("认证已过期"):290009==a?void n.err("已配置subappid个数已达上限"):290010==a?void n.err("获取物流信息失败"):290011==a?void n.err("没有设置全局运费"):210042===a?void n.err("小程序介绍不合法，请填写完善"):[210041,210043,210044,210045,210046,210050,260003,260007,260008,260009,260010].indexOf(a)>=0?void n.err("小程序名称不合法，请先检测名称是否可用"):a?void n.err("系统错误，请稍后再试"):void(0==a&&2==wx.cgiData.service_type?($(".js_app_info_form").hide(),
$("#finish").show()):0==a&&(i?($(".js_app_info_form").hide(),$("#bind_pay").show()):($("#qrcode").hide(),
u.setStep(2),$("#band_step2").show())));
},
fail:function(){
n.err("系统错误，请稍后再试");
}
});
}
l={},_.find(".js_input_data_field").each(function(){
l[$(this).attr("name")]=$(this).val();
}),(m(l.nickname)<4||m(l.nickname)>30)&&_.find(".js_input_nickname_err").text("请填写完善小程序名称").show(),
""===l.nickname_file&&_.find(".js_input_nickname_err").text("请上传相关补充材料").show(),
""===l.credentials_ids&&_.find(".js_input_nickname_err").text("请上传相关补充材料").show(),
(m(l.intro)<4||m(l.intro)>120)&&_.find(".js_input_intro_err").text("请填写完善小程序介绍").show(),
l.headimg_mediaid||_.find(".js_input_headimg_err").text("请上传小程序头像").show(),void 0!==l.credentials_ids&&(l.nickname_other_files=JSON.stringify({
media_ids:l.credentials_ids.split(";")
}),delete l.credential_ids);
var i=p.getFormData();
if(i){
if(!l.nickname||!l.intro||!l.headimg_mediaid)return n.err("请完善表单数据");
if(i=i.data[0],l.first_catid=i.first,l.second_catid=i.second,i.fileid){
var t=i.fileid.split(";"),o=[];
t.forEach(function(e){
var i=e.split(",");
o.push({
key:i[0],
value:i[1]
});
}),l.certicates=JSON.stringify({
certicates:o
});
}
if(0==d)return _.find(".js_input_nickname_err").html("请先通过小程序名称合法校验后再点击提交").show(),
void $("html, body").animate({
scrollTop:_.find(".js_input_nickname_err").offset().top-100
});
if(2==wx.cgiData.service_type)h(e);else{
c.setStep(2);
var f=$("#bind_wxpay_dialog").popup({
title:"绑定微信支付商户号",
className:"bind_wxpay_dialog",
onClose:function(){
f.remove(),$(".mask").hide();
},
buttons:[{
text:"确定",
click:function(){
this.remove(),$(".js_app_info_form").hide(),$("#bind_pay").show();
},
type:"primary"
}]
});
f.find(".btn_primary").hide();
var u=new s({
container:"#pop_step",
selected:1,
names:["验证管理员微信","验证微信支付商户号"]
}),w=new r.init({
container:"#qrcode",
size:165,
data:{
data:"",
extra:"",
typeid:5
},
msgData:{
name:"管理员"
},
showImgInfo:!0,
cgiURI:"/cgi-bin/safeqrcode",
onSuccess:function(i){
e(i,null,w);
},
onMsgUpdate:function(){}
});
w.load();
}
}
}),$("body").on("click","#verify_bt",function(){
$("#mid").val()?a.post({
url:"/merchant/merchantentrance?action=check_submchid",
data:{
sub_mch_id:$("#mid").val().trim()
}
},{
done:function(e){
0==e.base_resp.ret?($("#verify_ok").show(),$("#verify_bt").hide(),$("#mid").attr("disabled",!0),
$("#verify_ok").parents(".dialog_wrp").find(".btn_primary").show(),l.sub_mch_id=$("#mid").val().trim()):1==e.base_resp.ret?($("#verify_fail").show(),
$("#verify_bt").hide(),$("#verify_fail_text").show()):290003==e.base_resp.ret&&n.err("商户号不合法，请核对后再试");
}
}):n.err("商户id不能为空");
}),$("body").on("focus","#mid",function(){
$("#verify_bt").show(),$("#verify_ok").hide(),$("#verify_fail").hide();
}),$("#go_band").click(function(){
window.open("https://pay.weixin.qq.com/index.php/public/product/detail?pid=62&productType=0","_blank"),
o.show({
type:"info",
title:"提示",
msg:"绑定确认|是否确认已在商户平台绑定成功？",
buttons:[{
text:"确定",
click:function(){
var e=this;
a.post({
url:"/merchant/merchantentrance?action=subs_open_mch",
data:l
}).callback(function(i){
var a=i.base_resp.ret;
return 290001==a?(n.err("简介不符合规范，请更换简介"),$(".js_app_info_form").hide(),void $("#bind_pay").show()):290003==a?(n.err("商户号不合法，请核对后再试"),
$(".js_app_info_form").hide(),void $("#bind_pay").show()):290004==a?(n.err("订阅号不能开通尚未授权的小店父商户号"),
$(".js_app_info_form").hide(),void $("#bind_pay").show()):290005==a?(n.err("公众号主体与商户名称不匹配"),
$(".js_app_info_form").hide(),void $("#bind_pay").show()):290006==a?(n.err("创建商户关系失败，服务商不能绑定为小店的子商户"),
$(".js_app_info_form").hide(),void $("#bind_pay").show()):290007==a?(n.err("认证已过期"),
$(".js_app_info_form").hide(),void $("#bind_pay").show()):290009==a?(n.err("已配置subappid个数已达上限"),
$(".js_app_info_form").hide(),void $("#bind_pay").show()):290010==a?(n.err("获取物流信息失败"),
$(".js_app_info_form").hide(),void $("#bind_pay").show()):290011==a?(n.err("没有设置全局运费"),
$(".js_app_info_form").hide(),void $("#bind_pay").show()):void(0==i.base_resp.ret?(e.remove(),
$("#bind_pay").hide(),$("#finish").show()):(n.err(),$(".js_app_info_form").hide(),
$("#bind_pay").show()));
});
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
});
});