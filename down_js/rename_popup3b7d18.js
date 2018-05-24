define("setting/rename_popup.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","common/wx/tooltips.js","common/wx/Step.js","biz_common/jquery.validate.js","wxverify/validateExtend.js","common/wx/inputCounter.js","common/wx/qrcheck.js","tpl/setting/rename_popup.html.js","tpl/setting/rename_qrcheck.html.js","tpl/setting/rename_agree.html.js","tpl/setting/rename_form.html.js","tpl/setting/rename_confirm.html.js","tpl/setting/rename_result.html.js","tpl/setting/rename_cancel_result.html.js"],function(e,n,a){
"use strict";
function t(){
var e=$(b),n=e.find(".js_btn_next");
D.html(e);
var a={
container:"#js_div_rename_qrcheck",
container_class:"qr_pop_check",
cgiURI:"/acct/findacct",
size:280,
idCard:null,
name:null,
scene:7,
extra:{
fakeid:cgiData.fakeid_base64,
nickname:U
},
renderData:{
name:cgiData.operator_name||"运营者",
name_title:"运营者"
},
askSpeed:5,
askMaxNum:60,
onTicketChange:function(e){
S=e;
},
onStatusChange:function(e){
z=e,"1"==z&&n.enable();
},
onTipsChange:function(e,n){
var a="";
if("1"==e){
var t=$("#js_div_rename_qrcheck .js_qrcheck_ret_1");
t.find("p").html(""),t.show(),a=t.get(0).outerHTML;
}else{
var t=wx.T($("#js_div_rename_qrcheck .js_qrcheck_ret_"+e)[0].outerHTML,n);
t=$(a),t.show(),a=t.outerHTML;
}
return a;
}
};
n.on("click",function(){
"1"==z&&(T++,i());
}),N=new k(a),N.updateUser(null,null),n.disable(),C.setStep(T),q.resetPosition();
}
function i(){
var e=$(w),n=e.find(".js_btn_next");
D.html(e),n.on("click",function(){
T++,c();
}),C.setStep(T),q.resetPosition();
}
function c(){
function e(e){
var a=n.validate();
a.showErrors({
name:e
});
}
var n=$(wx.T(j,{
name:L
})),a=n.find(".js_btn_pre"),t=n.find(".js_btn_next"),c=n.find('input[name="name"]');
D.html(n),n.validate({
ignore:"",
rules:{
name:{
required:!0,
rangelen:[4,30]
}
},
messages:{
name:{
required:"请填写名称",
rangelen:$.validator.format("帐号名称为{0}到{1}个字符")
}
}
}),a.on("click",function(){
T--,i();
}),t.on("click",function(a){
return a.preventDefault(),t.hasClass("btn_loading")?!1:0==n.valid()?!1:(t.btn(!1),
void p.post({
url:"/cgi-bin/setuserinfo?action=check_nickname",
data:{
nick_name:L
}
},function(n){
if(t.btn(!0),!n||!n.base_resp)return void u.err("系统错误，请稍后重试");
switch(n.base_resp.ret){
case 0:
T++,P=0,r();
break;

case 210047:
case 20:
P=1,r();
break;

case 1:
e("不能使用该名称注册");
break;

case-41:
e("公众账号名称只允许含有中文、英文大小写、数字，长度为4-30个字符");
break;

case 1004:
e('名称与平台内已有名称重复。基于帐号名称唯一原则，请重新提交一个新名称。如果你认为已有名称侵犯了你的合法权益，可以进行<a target="_blank" href="/acct/newinfringement?action=get_agreement&t=infringement/manual&type=1&fescene=1%s">侵权投诉</a>。<a href="http://kf.qq.com/faq/120911VrYVrA160331BzmE7z.html" target="_blank">了解更多</a>'.sprintf("<a href='javascript:;' id='js_viewsameaccount'>","</a>",wx.data.param));
break;

case 260003:
e('该名称与已有公众号名称重复，请重新提交一个新的名称，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="/acct/newinfringement?action=get_agreement&t=infringement/manual&type=1&fescene=1%s">侵权投诉</a>。'.sprintf("<a href='javascript:;' id='js_viewsameaccount'>","</a>",wx.data.param)),
$("#js_viewsameaccount").click(function(){
window.open("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(L)+wx.data.param);
});
break;

case 260007:
var a=L.replace("+","");
a==L&&(a+="+"),e('公众号已有“%s”时，需与该帐号相同主体才可申请，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="/acct/infringement?action=getmanual&t=infringement/manual&type=1%s">侵权投诉</a>'.sprintf(a,"<a href='javascript:;' id='js_viewsameaccount'>","</a>",wx.data.param)),
$("#js_viewsameaccount").click(function(){
window.open("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(a)+wx.data.param);
});
break;

case 260008:
e('该名称与已有小程序名称重复，需与该小程序帐号相同主体才可申请，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="/acct/newinfringement?action=get_agreement&t=infringement/manual&type=1&fescene=1%s">侵权投诉</a>。'.sprintf("<a href='javascript:;' id='js_viewsameaccount'>","</a>",wx.data.param)),
$("#js_viewsameaccount").click(function(){
window.open("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(L)+wx.data.param);
});
break;

case 260009:
e('该名称与已有多个小程序名称重复，暂不支持申请，请重新提交一个新的名称，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="/acct/newinfringement?action=get_agreement&t=infringement/manual&type=1&fescene=1%s">侵权投诉</a>。'.sprintf("<a href='javascript:;' id='js_viewsameaccount'>","</a>",wx.data.param)),
$("#js_viewsameaccount").click(function(){
window.open("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(L)+wx.data.param);
});
break;

case 260010:
var a=L.replace("+","");
a==L&&(a+="+"),e('小程序已有“%s”时，需与该帐号相同主体才可申请，%s查看同名帐号%s。如果你认为已有名称侵犯了你的合法权益，可进行<a target="_blank" href="/acct/infringement?action=getmanual&t=infringement/manual&type=1%s">侵权投诉</a>'.sprintf(a,"<a href='javascript:;' id='js_viewsameaccount'>","</a>",wx.data.param)),
$("#js_viewsameaccount").click(function(){
window.open("/acct/newinfringement?action=search_biz_list&search_type=1&complain_type=11&begin=0&nickname="+encodeURIComponent(a)+wx.data.param);
});
break;

case 65201:
e("不能使用该名称");
break;

case 210050:
case 210044:
e("名称不能与已有公众帐号的微信号重复");
break;

case 210046:
e("该名称在侵权投诉保护期，暂不支持申请，请重新提交一个新的名称");
break;

case 200013:
e("提交次数过于频繁，请稍后再试");
break;

case 210041:
e("名称长度为4-30个字符，不能含有特殊字符及“微信”等保留字");
break;

case 211003:
e("名称正在2天保护期中，暂不能申请使用；你可在保护期满后重新申请使用该名称");
break;

default:
u.err("系统错误，请稍后重试");
}
}));
}),c.on("keyup change blur",function(){
L=$.trim($(this).val());
}),new g(c,{
minLength:3,
maxLength:30,
showCounter:!0,
useGBKLength:!0
}),C.setStep(T),q.resetPosition();
}
function r(){
function e(e){
var n=$(wx.T(v,{
newName:L,
oldName:U,
deadline:I,
reuse_deadline:R,
invadeType:P,
isLoading:e,
multiple_account_occupancy_nickname:E
})),a=n.find(".js_btn_pre"),t=n.find(".js_btn_next");
D.html(n),q.resetPosition(),a.on("click",function(){
c();
}),t.on("click",function(e){
return e.preventDefault(),t.hasClass("btn_loading")?!1:(t.btn(!1),0!=P?void(location.href=wx.url("/cgi-bin/settingpage?action=add_nickname_audit_page&nickname="+encodeURIComponent(L))):void p.post({
url:"/cgi-bin/setuserinfo?action=nickname",
data:{
nick_name:L,
invade_type:0,
qrcheck_ticket:S
}
},function(e){
if(t.btn(!0),!e||!e.base_resp)return void u.err("系统错误，请稍后重试");
switch(e.base_resp.ret){
case 0:
T++,H=e.set_nickname_resp?e.set_nickname_resp.can_cancel:0,I=e.set_nickname_resp?e.set_nickname_resp.cancel_deadline:"",
s();
break;

case 1004:
u.err("名称与平台内已有名称重复，请重新设置");
break;

case 260003:
u.err("该名称与已有公众号名称重复，请重新提交一个新的名称");
break;

case 260007:
var n=L.replace("+","");
u.err("公众号已有“%s”时，需与该帐号相同主体才可申请".sprintf(n));
break;

case 260008:
u.err("该名称与已有小程序名称重复，需与该小程序帐号相同主体才可申请");
break;

case 260009:
u.err("该名称与已有多个小程序名称重复，暂不支持申请");
break;

case 260010:
var n=L.replace("+","");
u.err("小程序已有“%s”时，需与该帐号相同主体才可申请".sprintf(n));
break;

case 200013:
u.err("提交次数过于频繁，请稍后再试");
break;

case 210041:
u.err("名称长度为3-30个字符，不能含有特殊字符及“微信”等保留字");
break;

case 210050:
case 210044:
u.err("名称不能与已有公众帐号的微信号重复");
break;

case 210046:
u.err("该名称在侵权投诉保护期，暂不支持申请，请重新提交一个新的名称");
break;

case 65201:
u.err("不能使用该名称");
break;

case 211003:
u.err("名称正在2天保护期中，暂不能申请使用；你可在保护期满后重新申请使用该名称");
break;

default:
u.err("系统错误，请稍后重试");
}
}));
});
}
C.setStep(T),0!=P?(e(!0),p.post({
url:wx.url("/cgi-bin/setuserinfo?action=check_current_nickname")
},function(n){
var a=new Date;
a.setDate(a.getDate()+3),E=1*n.multiple_account_occupancy_nickname,R="%s年%s月%s日%s点".sprintf(a.getFullYear(),a.getMonth()+1,a.getDate(),a.getHours()),
e(!1);
})):e(!1);
}
function s(){
function e(e){
var n=$(wx.T(x,{
newName:L,
oldName:U,
deadline:I,
reuse_deadline:R,
canCancel:H,
isLoading:e,
multiple_account_occupancy_nickname:E
})),a=n.find(".js_btn_close"),t=n.find(".js_btn_cancel");
if(D.html(n),q.resetPosition(),!e){
a.on("click",function(){
location.reload(!0);
});
var i="撤销改名后，申请名称“{newName}”将释放给其他帐号可使用。是否立即撤销？";
new d({
container:t,
content:wx.T(i,{
newName:L
}),
type:"click",
position:{
top:-5,
left:-145+t.width()/2
},
onclose:function(){},
buttons:[{
text:"撤销修改",
type:"btn_primary",
click:function(){
var e=this.$dom.find(".btn").eq(0),n=this;
return e.hasClass("btn_loading")?!1:(e.btn(!1),void p.post({
url:"/cgi-bin/setuserinfo?action=cancel_setnickname",
data:{}
},function(a){
return e.btn(!0),a&&a.base_resp?void(0==a.base_resp.ret?(n.hide(),o()):u.err("系统错误，请稍后重试")):void u.err("系统错误，请稍后重试");
}));
}
},{
text:"取消",
type:"btn_default",
click:function(){
0==this.$dom.find(".btn").eq(0).hasClass("btn_loading")&&this.hide();
}
}]
});
}
}
q.get().find("#js_div_rename_step").hide(),H?(e(!0),p.post({
url:wx.url("/cgi-bin/setuserinfo?action=check_current_nickname")
},function(n){
var a=new Date;
a.setDate(a.getDate()+3),E=1*n.multiple_account_occupancy_nickname,R=a.getFullYear()+"年"+(a.getMonth()+1)+"月"+a.getDate()+"日"+a.getHours()+"点",
e(!1);
})):e(!1);
}
function o(){
var e=$(wx.T(y,{
newName:L,
oldName:U
})),n=e.find(".js_btn_close");
q.get().find("#js_div_rename_step").hide(),D.html(e),n.on("click",function(){
location.reload(!0);
});
}
function m(){
q&&(q.remove(),q=null);
}
function l(e){
q=null,N=null,D=null,P=0,$(h).eq(0).popup({
title:"修改名称",
data:{},
buttons:[],
mask:!0,
className:"align_edge",
onHide:function(){
m();
},
onShow:function(){
q=this,D=q.get().find("#js_div_rename_content"),T=1;
var n=["1 同意协议","2 修改名称","3 确定修改"];
switch(0==M&&(n=["1 验证身份","2 同意协议","3 修改名称","4 确定修改"]),C=new f({
container:"#js_div_rename_step",
selected:1,
names:n
}),e){
case"result":
s();
break;

default:
0==M?t():i();
}
}
});
}
function _(e){
L=e.newName||"",U=e.oldName||"",I=e.deadline||"",M=e.realnameType||0;
}
var p=(template.render,e("common/wx/Cgi.js")),u=e("common/wx/Tips.js"),d=(e("common/wx/popup.js"),
e("common/wx/tooltips.js")),f=e("common/wx/Step.js"),g=(e("biz_common/jquery.validate.js"),
e("wxverify/validateExtend.js"),e("common/wx/inputCounter.js")),k=e("common/wx/qrcheck.js"),h=e("tpl/setting/rename_popup.html.js"),b=e("tpl/setting/rename_qrcheck.html.js"),w=e("tpl/setting/rename_agree.html.js"),j=e("tpl/setting/rename_form.html.js"),v=e("tpl/setting/rename_confirm.html.js"),x=e("tpl/setting/rename_result.html.js"),y=e("tpl/setting/rename_cancel_result.html.js"),q=null,C=null,T=0,D=null,N=null,z="",S="",L="",U="",I="",R="",H=!0,M=0,P=0,E=0;
a.exports={
show:l,
setData:_
};
});