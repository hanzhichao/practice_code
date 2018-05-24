define("entityshop/edit_biz.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_common/jquery.validate.js","biz_web/utils/upload.js","common/wx/popup.js","common/wx/qrcheck_weapp.js","common/wx/inputCounter.js","tpl/entityshop/name_auth.html.js"],function(e){
"use strict";
function n(){
_=$("#js_container"),_.html(c("tpl_form",u)),i=$("#js_form"),r=$("#js_btn_submit"),
template.helper("$preview",function(e,n){
return"bizmedia"==n?l.mediaFileUrl(e):"preview"==n?l.tmpFileUrl(e):"multimedia"==n?l.multimediaFileUrl(e):void 0;
});
}
function t(){
function n(e){
e?$("#js_nickname_fail").html(e).show():$("#js_nickname_fail").hide();
}
function t(e){
$("#auth_frame_container").html(""),$("#auth_frame_container").html(wx.T(k,{
wording:e
})),$(".shop_rename_context").addClass("show_extra"),$("#auth_frame_container").find(".js_select_file").each(function(){
var e=$(this).attr("id"),n="othersFile"==e?!0:!1,t=$("#"+e+"_preview");
l.uploadTmpFile({
container:"#"+e,
multi:n,
type:2,
queueSizeLimit:5,
canContinueUpload:function(){
if(n){
var a=+(t.data("queue")||0),i=$("#"+e+"_hidden").val()||"",r=""==i?0:i.split(",").length;
if(a+r>=5)return s.err("最多可以上传5个"),!1;
t.data("queue",a+1);
}
return!0;
},
onComplete:function(a,i,r,c){
var o=$("#"+e+"_hidden").val()||"";
if(o=o.split(","),!(o.length>=5)&&0==c.base_resp.ret){
var s="";
s='<p class="upload_preview_file">'+r.name+'<a content="'+c.content+","+e+'" class="global_link_opr js_file_up_del" >删除</a></p>',
1==n?t.append(s):t.html(s);
var l=+(t.data("queue")||0),m=t.find(".js_file_up_del").length;
t.data("count",m).data("queue",l-1);
var p=$("#"+e+"_hidden").val();
p=n&&p?p+","+c.content:c.content,$("#"+e+"_hidden").val(p).parent().parent().find(".fail").remove();
}
},
onAllComplete:function(){
var e=t.find(".js_file_up_del").length;
t.data("count",e).data("queue",0);
}
});
}),$("#auth_frame_container").on("click",".js_file_up_del",function(){
var e=$(this).attr("content").split(",")[0],n=$(this).attr("content").split(",")[1],t=$("#"+n+"_hidden").val()||"";
t=t.split(",");
var a=t.indexOf(e);
t.splice(a,1),$("#"+n+"_hidden").val(t.join(",")),$(this).parent().remove();
});
}
function a(){
function e(e){
return e.len()<=30&&e.len()>=4;
}
var a=!1;
g=!1;
var i=$("#tpl_rename").popup({
autoShow:!0,
title:"修改门店名称",
className:"shop_rename_dialog",
onHide:function(){
v&&location.reload(),this.remove();
},
data:{
nickname:wx.cgiData.nickname
},
buttons:[{
type:"default",
text:"取消",
click:function(){
this.hide();
}
},{
text:"确定",
click:function(){
var c=$.trim($("#js_edit_nickname_input").val()),l=$(r[1]);
if(!l.hasClass("btn_disabled")){
if(c==wx.cgiData.nickname)return void n("修改后的昵称和原昵称不能一样");
if(!e(c))return void n("名称长度为4-30个字符，不能含有特殊字符及“微信”等保留字");
if(!a){
a=!0;
var m={
nick_name:c,
wxopen_appid:wx.cgiData.appid
};
if(g){
if(m.license=$("#organizeFile_hidden").val(),!m.license)return s.err("请上传营业执照或组织代码证"),
!1;
var p=$("#othersFile_hidden").val();
if(p)for(var _=p.split(","),u=0;u<_.length;u++)m["naming_other_stuff_"+(u+1)]=_[u];
}
m.qrcheck_ticket=h,o.post({
url:"/misc/storewxanickname?action=setnickname",
data:m,
complete:function(){
a=!1;
}
},function(e){
if(!e||!e.base_resp)return n("系统错误，请稍后重试"),!1;
switch(e.base_resp.ret){
case 0:
return void(g?($(r[0]).hide(),$(r[1]).hide(),$(r[2]).show(),v=!0,$("#js_name_auditting").show(),
$("#js_nickname_edit_container").hide(),i.popup("resetPosition")):(s.suc("名称修改成功"),
i.popup("hide"),location.reload()));

case 210047:
t(e.wording),n("该名称需要提交相应资料进行审核"),i.popup("resetPosition"),g=!0;
break;

case 1:
n("不能使用该名称注册");
break;

case 1004:
n("名称与已有帐号名称重复。请提交与订阅号、服务号、小程序不重复的帐号名称。");
break;

case 260003:
n('该名称与已有小程序名称重复，请重新提交一个新的名称，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="/acct/newinfringement?action=get_agreement&t=infringement/manual&type=1&lang=zh_CN&token=%s&fescene=1">侵权投诉</a>。'.sprintf("<a href='javascript:;' id='js_viewsameaccount'>","</a>",wx.data.t)),
$("#js_viewsameaccount").click(function(){
window.open(wx.url("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(m.nick_name)));
});
break;

case 260007:
var a=m.nick_name.replace("+","");
a==m.nick_name&&(a+="+"),n('小程序已有“%s”时，需与该帐号相同主体才可申请，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="http://kf.qq.com/faq/170216iuM7JF170216MVFZRz.html">侵权投诉</a>'.sprintf(a,"<a href='javascript:;' id='js_viewsameaccount'>","</a>")),
$("#js_viewsameaccount").click(function(){
window.open(wx.url("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(a)));
});
break;

case 260008:
n('该名称与已有公众号名称重复，需与该小程序帐号相同主体才可申请，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="/acct/newinfringement?action=get_agreement&t=infringement/manual&type=1&lang=zh_CN&token=%s&fescene=1">侵权投诉</a>。'.sprintf("<a href='javascript:;' id='js_viewsameaccount'>","</a>",wx.data.t)),
$("#js_viewsameaccount").click(function(){
window.open(wx.url("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(m.nick_name)));
});
break;

case 260009:
n('该名称与已有多个公众号名称重复，暂不支持申请，请重新提交一个新的名称，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="/acct/newinfringement?action=get_agreement&t=infringement/manual&type=1&lang=zh_CN&token=%s&fescene=1">侵权投诉</a>。'.sprintf("<a href='javascript:;' id='js_viewsameaccount'>","</a>",wx.data.t)),
$("#js_viewsameaccount").click(function(){
window.open(wx.url("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(m.nick_name)));
});
break;

case 260010:
var a=m.nick_name.replace("+","");
a==m.nick_name&&(a+="+"),n('公众号已有“%s”时，需与该帐号相同主体才可申请，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="http://kf.qq.com/faq/170216iuM7JF170216MVFZRz.html">侵权投诉</a>'.sprintf(a,"<a href='javascript:;' id='js_viewsameaccount'>","</a>")),
$("#js_viewsameaccount").click(function(){
window.open(wx.url("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(a)));
});
break;

case 200013:
n("提交次数过于频繁，请稍后再试");
break;

case 210041:
n("名称长度为4-30个字符，不能含有特殊字符及“微信”等保留字");
break;

case 210050:
case 210044:
n("名称不能与已有公众帐号的微信号重复");
break;

case 210046:
n("该名称在侵权投诉保护期，暂不支持申请，请重新提交一个新的名称");
break;

case 65201:
n("不能使用该名称");
break;

case 211003:
n("名称正在2天保护期中，暂不能申请使用；你可在保护期满后重新申请使用该名称");
break;

case 200002:
n("参数错误，请稍后重试");
break;

case 200035:
s.err("扫码已失效，请返回重新扫码");
break;

default:
n("系统错误，请稍后重试"),s.err("系统错误，请稍后重试");
}
});
}
}
},
type:"primary"
},{
type:"default",
text:"关闭",
click:function(){
this.hide();
}
}]
}),r=i.find(".js_btn_p");
$(r[2]).hide(),new p("#js_edit_nickname_input",{
minLength:4,
maxLength:30,
showCounter:!0,
useGBKLength:!0
}),$("#js_edit_nickname_input").keyup(function(){
var t=$(r[1]);
e($.trim($(this).val()))?(n(),t.removeClass("btn_disabled")):(n("名称长度为4-30个字符，不能含有特殊字符及“微信”等保留字"),
t.addClass("btn_disabled")),$("#auth_frame_container").html(""),$(".shop_rename_context").removeClass("show_extra"),
g=!1,i.popup("resetPosition");
});
}
function d(){
var e={
container_class:"qrcheck_box",
cgiURI:"/cgi-bin/safeqrcode",
showImgInfo:!1,
typeid:29,
onSuccess:function(e){
h=e,console.log("qrcheckTicket",e),w.destroy(),a();
}
};
w=m.initPopup(e),w.load();
}
new p('textarea[name="intro"]',{
minLength:1,
maxLength:120,
showCounter:!0,
useGBKLength:!1
});
var f=!1;
i.find(".js_select_file").each(function(){
var e=$(this).attr("id"),n=l.uploadTmpFileWithCheck({});
!function(e){
n({
container:"#"+e,
multi:!1,
type:2,
accept:{
extensions:"bmp,jpeg,jpg,png",
mimeTypes:"image/*"
},
width:106,
onComplete:function(n,t,a,i){
var r=i.content||"",c=$("#"+e).parents(".frm_controls");
0==i.base_resp.ret?(c.find(".upload_preview").html('<img style="width:200px;" src="%s">'.sprintf(l.tmpFileUrl(r))).show(),
c.find('input[type="hidden"]').val(r),f=!0,c.find(".fail").remove(),s.suc("上传成功")):s.err(200010==i.base_resp.ret?"图片太大":200011==i.base_resp.ret?"请上传合法的图片格式":200034==i.base_resp.ret?"图片尺寸错误":"上传失败");
}
});
}(e);
}),r.on("click",function(){
return $(this).hasClass("btn_disabled")?!1:void i.submit();
}),i.validate({
ignore:"",
rules:{
intro:{
required:!0,
rangelength:[1,120]
}
},
messages:{
intro:{
required:"请填写商家介绍",
rangelength:$.validator.format("商家介绍为{0}到{1}个中英文")
}
},
errorPlacement:function(e,n){
var t=n.parent().parent(),a=t.find(".frm_tips");
t.find(".fail").remove(),a.length?e.insertBefore(a):t.append(e);
}
}),i.on("submit",function(){
if(!i.valid())return!1;
var e={
intro:$('textarea[name="intro"]').val()
};
return e.intro==wx.cgiData.intro&&delete e.intro,$('input[name="headimg"]').val()&&(e.headimg_mediaid=$('input[name="headimg"]').val()),
f||delete e.headimg_mediaid,e.headimg_mediaid||e.intro?(r.btn(!1),console.log("postData:",e),
o.post({
url:"/merchant/newentityshop?action=modify_storeinfo",
data:e
},function(e){
r.btn(!0),e&&0==e.base_resp.ret?_.html(c("tpl_result",u)):s.err(e&&10012==e.base_resp.ret?wx.cgiData.headimg_quota<=0?"本月已不可修改头像":"本月已不可修改描述":"系统错误，请重试");
}),!1):(s.err("请先修改头像或商家介绍再提交"),!1);
});
var h,w,g=!1,v=!1;
$("#js_edit_nickname").click(function(){
d();
});
var k=e("tpl/entityshop/name_auth.html.js");
}
function a(){
n(),t();
}
var i,r,c=template.render,o=e("common/wx/Cgi.js"),s=e("common/wx/Tips.js"),l=(e("biz_common/jquery.validate.js"),
e("biz_web/utils/upload.js")),m=(e("common/wx/popup.js"),e("common/wx/qrcheck_weapp.js")),p=e("common/wx/inputCounter.js"),_=null,u=wx.cgiData;
a();
});