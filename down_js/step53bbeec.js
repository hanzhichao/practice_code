define("register/step5.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/inputCounter.js","common/wx/popup.js","common/wx/region.js","common/wx/upload.js","biz_web/utils/multiupload.js","biz_common/jquery.validate.js","biz_common/moment.js"],function(e,t,n){
"use strict";
function i(){
var e=h.serializeObject(),t={};
for(var n in e)t[n]=$.trim(e[n]);
return t;
}
function a(){
for(var e,t=[],n=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),i=0;i<n.length;i++)e=n[i].split("="),
t.push(e[0]),t[e[0]]=e[1];
return t;
}
function r(e){
return a()[e];
}
function o(e){
function t(e,t){
var n={};
n[e.attr("name")]=t,v=h.validate(),setTimeout(function(){
v.showErrors(n);
},1);
}
var n=null;
if(e&&e.base_resp&&(n=e.base_resp.ret),-1==n)N.err("系统错误，请重试");else if(200002==n)N.err("参数错误，请重新输入");else if(200003==n)N.err("登陆超时，请重新登录");else if(210041==n)c(),
t(y,"帐号名称只允许含有中文、英文大小写、数字，长度为4-30个字符");else if(210042==n)t(D,"功能介绍长度应为4~120个字");else if(65201==n)c(),
t(y,"不能使用该名称注册");else if(65202==n)t(D,"不能含有虚假的、冒充、利用他人名义的、容易构成混淆、误认的、法律、法规和政策禁止的内容");else if(201e3==n)N.err("二维码身份验证失败，请返回上一步重新扫描二维码");else if(200013==n)c(),
t(y,"提交次数过于频繁，请稍后再试");else if(210050==n||210044==n)c(),t(y,"名称不能与已有公众帐号的微信号重复");else if(210046==n)c(),
t(y,"该名称在侵权投诉保护期，暂不支持申请，请重新提交一个新的名称");else if(211001==n)c(),4==g.getData().service_type?t(y,"名称与平台内已认证企业号重复。基于帐号名称唯一原则，请重新提交一个新名称。如果你认为已有名称侵犯了你的合法权益，可以申请找回。%s了解详情%s".sprintf('<a href="http://kf.qq.com/faq/120911VrYVrA160920URVrEn.html" target="_blank">',"</a>")):t(y,"名称与平台内已有名称重复。基于帐号名称唯一原则，请重新提交一个新名称。如果你认为已有名称侵犯了你的合法权益，可以进行%s侵权投诉%s。%s查看详情%s".sprintf('<a target="_blank" href="/acct/newinfringement?action=get_agreement&t=infringement/manual&type=1&lang=zh_CN&fescene=1&feregister=1&token='+(wx.cgiData.token||r("token"))+'">',"</a>",'<a href="http://kf.qq.com/faq/120911VrYVrA160331BzmE7z.html" target="_blank">',"</a>"));else if(65204==n)4!=g.getData().service_type&&l(e);else if(211003==n)c(),
t(y,"名称正在2天保护期中，暂不能申请使用；你可在保护期满后重新申请使用该名称");else if(260003==n)c(),t(y,"该名称与已有公众号名称重复，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行%s侵权投诉%s".sprintf("<a href='javascript:;' id='js_viewsameaccount'>","</a>",'<a target="_blank" href="/acct/newinfringement?action=get_agreement&t=infringement/manual&type=1&lang=zh_CN&fescene=1&feregister=1&token='+(wx.cgiData.token||r("token"))+'">',"</a>")),
setTimeout(function(){
var e=wx.cgiData.token||r("token");
$("#js_viewsameaccount").click(function(){
window.open("/acct/newinfringement?action=search_biz_list&search_type=1&feregister=1&complain_type=11&begin=0&nickname="+encodeURIComponent(y.val())+"&token="+e);
});
},100);else if(260007==n){
var i=y.val().replace("+","");
i==y.val()&&(i+="+"),c(),t(y,"公众号已有“%s”时，需与该帐号相同主体才可申请，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行%s侵权投诉%s".sprintf(i,"<a href='javascript:;' id='js_viewsameaccount'>","</a>",'<a target="_blank" href="/acct/infringementlogin?action=getkey&lang=zh_CN">',"</a>")),
setTimeout(function(){
var e=wx.cgiData.token||r("token");
$("#js_viewsameaccount").click(function(){
window.open("/acct/newinfringement?action=search_biz_list&search_type=1&feregister=1&complain_type=11&begin=0&nickname="+encodeURIComponent(i)+"&token="+e);
});
},100);
}else if(260008==n)c(),t(y,"该名称与已有小程序名称重复，需与该小程序帐号相同主体才可申请，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行%s侵权投诉%s".sprintf("<a href='javascript:;' id='js_viewsameaccount'>","</a>",'<a target="_blank" href="/acct/newinfringement?action=get_agreement&t=infringement/manual&type=1&lang=zh_CN&fescene=1&feregister=1&token='+(wx.cgiData.token||r("token"))+'">',"</a>")),
setTimeout(function(){
var e=wx.cgiData.token||r("token");
$("#js_viewsameaccount").click(function(){
window.open("/acct/newinfringement?action=search_biz_list&search_type=1&feregister=1&complain_type=11&begin=0&nickname="+encodeURIComponent(y.val())+"&token="+e);
});
},100);else if(260009==n)c(),t(y,"该名称与已有多个小程序名称重复，暂不支持申请，请重新提交一个新的名称，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行%s侵权投诉%s",sprintf("<a href='javascript:;' id='js_viewsameaccount'>","</a>",'<a target="_blank" href="/acct/newinfringement?action=get_agreement&t=infringement/manual&type=1&lang=zh_CN&fescene=1&feregister=1&token='+(wx.cgiData.token||r("token"))+'">',"</a>")),
setTimeout(function(){
var e=wx.cgiData.token||r("token");
$("#js_viewsameaccount").click(function(){
window.open("/acct/newinfringement?action=search_biz_list&search_type=1&feregister=1&complain_type=11&begin=0&nickname="+encodeURIComponent(y.val())+"&token="+e);
});
},100);else if(260010==n){
var i=y.val().replace("+","");
i==y.val()&&(i+="+"),c(),t(y,"小程序已有“%s”时，需与该帐号相同主体才可申请，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行%s侵权投诉%s".sprintf(i,"<a href='javascript:;' id='js_viewsameaccount'>","</a>",'<a target="_blank" href="/acct/infringementlogin?action=getkey&lang=zh_CN">',"</a>")),
setTimeout(function(){
var e=wx.cgiData.token||r("token");
$("#js_viewsameaccount").click(function(){
window.open("/acct/newinfringement?action=search_biz_list&search_type=1&feregister=1&complain_type=11&begin=0&nickname="+encodeURIComponent(i)+"&token="+e);
});
},100);
}else 211e3==n?N.err("扫码校验失败，需要返回上一步重新扫码"):210009==n?N.err("该身份证注册数已达上限，请返回上一步使用另外一个身份证完成用户信息登记"):210010==n?N.err("该手机号注册数已达上限，请返回上一步使用别的手机号进行用户信息登记"):210013==n?N.err("该主体已达到注册上限，请返回上一步重新填写表单"):U.handleRet(e,{
id:"64430",
key:"6",
msg:"系统繁忙，请重试"
});
}
function s(){
var e=$("#js_div_invade_file"),t=$("#js_btn_invade_upload"),n=[];
for(var i in B)if(B[i].filename)n.push(B[i].filename);else for(var a=0;a<B[i].length;a++)n.push(B[i][a].filename);
n.length>0&&t.hide(),e.html(Y("tpl_step5_invade_file",{
list:n
})).show(),e.find(".js_btn_delete_invade").on("click",function(){
return B={},e.html("").hide(),t.show(),!1;
});
}
function c(){
b.hide(),B={};
}
function l(e){
v=h.validate(),v.errorsFor(y).remove(),b.show(),console.log("refresh invade file",e),
B={},b.html(Y("tpl_step5_invade",{
invade_file:B,
register_type:g.getData().register_type
})),1!=g.getData().register_type&&$("#js_btn_invade_upload").on("click",function(){
var t;
$("#tpl_step5_invade_upload").popup({
title:"上传证明材料",
width:800,
className:"upload_dialog_wrp",
data:{
invade_file:B,
other_file_wording:e.wording,
contractor_type:g.getData().contractor_type
},
buttons:[{
text:"确定",
type:"primary",
click:function(){
if(0==t.valid())return!1;
var e=this;
B={},e.get().find(".js_select_file").each(function(){
{
var e=$(this).data("file"),t=$(this).data("name");
1*$(this).data("multi");
}
e&&(B[t]=e);
}),e.get().find(".js_input_multiupload").each(function(){
$(this).val()&&(B[$(this).attr("name")]={
file:$(this).val(),
filename:$(this).data("filename")
});
}),console.log(B),s(),this.hide();
}
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}],
onHide:function(){
this.remove();
},
onShow:function(){
t=this.get().find(".js_form"),t.validate({
ignore:"",
rules:{
id_card:{
required:!0
},
license:{
required:!0
}
},
messages:{
id_card:{
required:"请上传文件"
},
license:{
required:"请上传文件"
}
},
errorPlacement:function(e,t){
var n=t.parent().parent(),i=n.find(".upload_tips");
n.find(".fail").remove(),e.insertBefore(i);
}
}),this.get().find(".js_select_file").each(function(){
var e=$(this).parents(".js_div_upload"),t=$(this),n=e.find(".js_div_preview"),i=e.find(".js_input_invade_file"),a=1*t.data("multi")?!0:!1,r=!0;
A.uploadTmpFile({
container:$(this),
multi:a,
type:2,
accept:{
extensions:"bmp,jpeg,jpg,png,gif",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif"
},
canContinueUpload:function(){
var e=!0,n=t.data("file");
return a&&n&&n.length>=5?!1:(console.log("canContinueUpload",e),e);
},
onAllComplete:function(e,t){
console.log("onAllComplete",t),r=!0;
},
onComplete:function(o,s,c,l){
var f=l.content||"";
if(0==l.base_resp.ret){
var p=t.data("file");
t.html("重新上传"),i.val(f),e.find(".fail").remove(),r&&n.html(""),n.append("<p>"+c.name+"</p>"),
a?(p=p||[],r&&(p=[]),p.push({
filename:c.name,
file:f
})):p={
filename:c.name,
file:f
},t.data("file",p),r=!1,N.suc("上传成功");
}else N.err(1==l.base_resp.ret?"图片太大":-11==l.base_resp.ret?"请上传合法的图片格式":-34==l.base_resp.ret?"图片尺寸错误":"上传失败");
}
});
}),I.init({
container:$("#js_div_other_file"),
title:"补充材料",
desc:e.wording,
name:"naming_other_stuff_",
range:[1,5],
minUploadNum:0,
noPreview:!0,
files:[]
});
}
}).popup("resetPosition");
});
}
function f(e){
if(!z.hasClass("btn_loading")&&e.valid()){
var t=e.data("checktype");
U.post({
url:"/acct/registerpage",
data:{
action:"check",
type:t,
value:$.trim(e.val())
}
},function(n){
n&&0==n.base_resp.ret?(v=h.validate(),v.errorsFor(e).remove(),"1"==t&&c()):o(n);
});
}
}
function p(){
h=$("#js_form_step5"),w=$("#js_txt_account"),k=$("#js_txt_intro"),j=h.find("#js_div_location"),
b=h.find("#js_div_invade"),y=h.find('input[name="nick_name"]'),D=h.find('textarea[name="intro"]'),
x=h.find('input[name="country"]'),q=h.find('input[name="province"]'),C=h.find('input[name="city"]'),
z=$("#js_btn_submit"),T=$("#js_btn_back"),P=[4,30],4==g.getData().service_type&&(P=[3,20]);
}
function u(){
4!=g.getData().service_type&&new L({
container:"#js_div_location",
data:{
country:"国家",
province:"省份",
city:"城市"
},
onChange:function(e,t,n){
$("#js_input_"+e).val(n),$("#js_input_"+e).valid(),"country"==e?(q.val(""),C.val("")):"province"==e&&C.val("");
}
});
}
function m(){
y.on("blur",function(){
var e=$(this).val();
""===e?E=e:E!=e&&(f($(this)),E=e);
}),y.on("keyup",function(){
w.html($(this).val());
}),new R(y,{
maxLength:P[1],
showCounter:!0,
useGBKLength:!0
}),D.on("blur",function(){
var e=$(this).val();
""===e?F=e:F!=e&&(f($(this)),F=e);
}),D.on("keyup",function(){
k.html($(this).val());
}),new R(D,{
maxLength:120,
showCounter:!0
}),T.on("click",function(e){
return e.preventDefault(),window.location.href="/acct/contractorpage?action=showreg&step=3&lang="+window.wx.data.lang,
!1;
}),z.on("click",function(e){
return e.preventDefault(),$(this).hasClass("btn_loading")?!1:(h.submit(),!1);
}),h.on("submit",function(e){
if(e.preventDefault(),0==h.valid())return!1;
z.btn(!1);
var t=i();
t.invade_check=0;
for(var n in B){
if(B[n].file)t[n]=B[n].file;else{
t[n]=[];
for(var a=0;a<B[n].length;a++)t[n].push(B[n][a].file);
}
t.invade_check=1;
}
return console.log(t),U.post({
url:"/acct/registerpage",
data:t,
complete:function(){
z.btn(!0);
}
},function(e){
var n=e.redirect_url;
if(z.btn(!0),e&&0==e.base_resp.ret)if(4==g.getData().service_type)window.location=n;else{
g.setData(function(i){
i.url=n,i.token=e.token,i.account=t.account,i.checkStartDate=V().format("YYYY年MM月DD日"),
i.checkOverDate=V().add("d",9).format("YYYY年MM月DD日"),i.invade_type=e.invade_type;
});
var i="#tpl_step5_submit_normal";
4==g.getData().service_type?i="#tpl_step5_submit_enterprise":0==g.getData().contractor_type&&(i="#tpl_step5_submit_person");
var a="前往微信公众平台";
1==g.getData().register_type?a="微信认证":2==g.getData().register_type&&0!=g.getData().contractor_type&&(a="前往获取打款信息"),
$(i).popup({
title:"提示",
data:g.getData(),
buttons:[{
text:a,
type:"primary",
click:function(){
location.href=n;
}
}],
onHide:function(){
location.href=n;
},
onShow:function(){}
});
}else o(e);
}),!1;
});
}
function _(){
v=h.validate({
ignore:"",
rules:{
nick_name:{
required:!0,
rangelen:P
},
intro:{
required:!0,
rangelength:[4,120]
},
country:{
required:!0
},
province:{
required:{
depends:function(){
var e=j.find(".dropdown_menu");
return e.length>1&&e.eq(1).find(".jsDropdownList li").length>0&&e.eq(1).is(":visible");
}
}
},
city:{
required:{
depends:function(){
var e=j.find(".dropdown_menu");
return e.length>2&&e.eq(1).find(".jsDropdownList li").length>0&&e.eq(1).is(":visible")&&e.eq(2).find(".jsDropdownList li").length>0&&e.eq(2).is(":visible");
}
}
}
},
messages:{
nick_name:{
required:"请填写名称",
rangelen:$.validator.format("名称为{0}到{1}个字符")
},
intro:{
required:"请填写功能介绍",
rangelength:$.validator.format("功能介绍为{0}到{1}个字")
},
country:{
required:"请选择国家"
},
province:{
required:"请选择省份"
},
city:{
required:"请选择城市"
}
},
errorPlacement:function(e,t){
var n=t.parent().parent(),i=t.parent();
n.find(".fail").remove(),e.insertAfter(i),"nick_name"==t.attr("name")&&c();
}
});
}
function d(e){
M||(g=e.model,M=!0,p(),u(),m(),_());
}
var g,v,h,w,k,j,b,y,D,x,q,C,z,T,Y=template.render,U=e("common/wx/Cgi.js"),N=e("common/wx/Tips.js"),R=(e("common/wx/tooltips.js"),
e("common/wx/inputCounter.js")),L=(e("common/wx/popup.js"),e("common/wx/region.js")),A=e("common/wx/upload.js"),I=e("biz_web/utils/multiupload.js"),V=(e("biz_common/jquery.validate.js"),
e("biz_common/moment.js")),M=!1,P=[4,30],B={},E="",F="";
n.exports={
init:d
};
});