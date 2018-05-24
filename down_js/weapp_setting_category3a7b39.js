define("shop/weapp_setting_category.js",["biz_web/lib/json.js","common/wx/Cgi.js","common/wx/qrcheck_weapp.js","common/wx/Tips.js","common/wx/top.js","common/wx/dialog.js","common/wx/popover.js","config/manage_category.js"],function(t){
"use strict";
function o(){
var t=window.cgiData;
b.num_limit=t.num_limit,b.quota=t.quota,t.list.splice(0,1),b.list=t.list;
}
function i(){
e(),n(),s(),c();
}
function e(){
var t=new f("#topTab",f.DATA.setting);
t.selected("info");
}
function n(){
$("#quota").text("本月可添加%s次".sprintf(b.quota)),b.quota<=0||b.list.length>=b.num_limit?$("#add_category").addClass("btn_disabled"):$("#add_category").removeClass("btn_disabled"),
$("#add_control").show();
}
function s(){
$("#category_desc").text("已添加%s个，最多%s个".sprintf(b.list.length,b.num_limit));
}
function c(){
$("#tbody_list").html(template.render("list_tpl",{
desc:b.desc,
list:b.list
}));
}
function a(){
$("#tbody_list").on("click",".js_del_category",function(){
var t=$(this),o=t.data("firstid")||"",i=t.data("secondid")||"";
o&&i&&d({
qrType:"popup",
type:"del",
auth_type:36,
onSuccess:function(e){
p(o,i,t.parents("tr"),e);
}
});
}),$("#tbody_list").on("click",".js_modify_category",function(){
for(var t,o=$(this),i=o.data("firstid"),e=o.data("secondid"),n=0,s=b.list.length;s>n;n++){
var c=b.list[n];
if(c.first==i&&c.second==e){
t=c;
break;
}
}
r("modify",t);
}),b.quota>0&&b.list.length<b.num_limit&&$("#add_category").click(function(){
var t=$(this);
t.btn(!1),h.getCategoryList(function(){
t.btn(!0),r("add");
},function(){
t.btn(!0);
});
}),$("#tbody_list").find(".js_tips_err").each(function(){
var t=b.list[1*$(this).data("idx")];
t.err_msg&&new y({
dom:$(this),
content:t.err_msg||"",
addCls:"",
isToggle:!0,
defaultOpen:!1
});
});
}
function r(t,o){
b.dialog=$("<div class=''><div id='qrcheck_box_category' class='qrcheck_box'></div><form id='category_form'></form></div>").popup({
title:"添加服务类目",
autoShow:!1,
width:960,
className:"qrcheck_dialog",
buttons:[{
text:"提交",
click:function(){
if(b.submiting)return void g.err("您的操作过于频繁，请稍后再试");
var o=this.get().find(".js_btn").eq(0),i=b.categoryObj.getFormData();
if(i!==!1){
var e=i.qrcheckTicket,i=i.data;
b.submiting=!0,o.btn(!1);
for(var n=[],s=0,c=i.length;c>s;s++){
var a=i[s],r=[];
if(a.fileid)for(var d=a.fileid.split(";"),l=0,p=d.length;p>l;l++){
var u=d[l].split(",");
r.push({
key:u[0],
value:u[1]
});
}
n.push({
first:1*a.first,
second:1*a.second,
certicates:r
});
}
var i;
i="modify"==t?{
action:t,
category:JSON.stringify(n[0])
}:{
qrcheck_ticket:e,
action:t,
categories:JSON.stringify({
categories:n
})
},m.post({
url:"/wxopen/category?",
data:i
},{
done:function(i){
if(b.submiting=!1,o.btn(!0),!i||!i.base_resp)return void g.err("系统错误，请稍后再试");
if(0==i.base_resp.ret)g.suc("数据提交成功"),setTimeout(function(){
window.location.reload();
},0),"add"==t&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=65427_3_1");else if(1008==i.base_resp.ret){
for(var e=$("#category_form").find(".js_credentials"),n=0;n<e.length;n++)e[n].innerHTML&&$(e[n]).parent().find(".js_icperror").show();
$(".js_godomain").on("click",function(){
window.open("/wxopen/devprofile?action=get_profile&token="+wx.data.t+"&lang=zh_CN");
}),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=65427_10_1";
}else g.err("系统错误，请稍后再试"),"add"==t&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=65427_4_1"),
m.handleRet(i,{
id:64462,
key:95,
url:"/wxopen/category"
});
},
fail:function(){
b.submiting=!1,o.btn(!0);
}
});
}
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}],
onHide:function(){
this.remove();
}
}),b.dialog.popup("get").find(".js_btn_p").hide(),b.dialog.css({
"margin-top":-350
}),b.dialog.popup("show"),d({
containerStr:"#qrcheck_box_category",
type:t,
auth_type:35,
onSuccess:function(i){
$("#qrcheck_box_category").remove(),b.dialog.popup("get").find(".js_btn_p").show();
var e={
type:t,
container:$("#category_form"),
previewImg:!1,
qrcheckTicket:i,
curCategorList:b.list,
limit:b.num_limit-b.list.length
};
"modify"==t&&(e.data={
err_msg:o.err_msg,
firstid:o.first,
first_name:o.first_name,
secondid:o.second,
second_name:o.second_name
}),b.categoryObj=new h.classFn(e);
}
});
}
function d(t){
if("modify"==t.type)return void t.onSuccess("");
var o;
o="popup"==t.qrType?u.initPopup({
popupTitle:"验证管理员",
popupWidth:600,
popupClassName:"qrcheck_dialog_simple",
popupTips:"请扫码",
onPopupShow:function(){},
scene:11,
data:{
auth_type:t.auth_type
},
cgiURI:"/wxopen/waqrcode",
showImgInfo:!0,
onSuccess:function(i){
o.popup.popup("remove"),o.destroy(),t.onSuccess(i);
}
}):u.init({
container:t.containerStr,
container_class:"",
scene:11,
data:{
auth_type:t.auth_type
},
size:165,
cgiURI:"/wxopen/waqrcode",
showImgInfo:!0,
onSuccess:function(i){
console.log("onSuccess"),o.destroy(),t.onSuccess(i);
},
onFail:function(t,o,i){
console.log("onFail",t,o,i);
},
onMsgUpdate:function(){
console.log("onMsgUpdate");
}
}),o.load();
}
function l(t,o){
for(var i=0,e=b.list.length;e>i;i++){
var n=b.list[i];
if(n.first==t&&n.second==o){
b.list.splice(i,1);
break;
}
}
s();
}
function p(t,o,i,e){
b.submiting||(b.submiting=!0,_.show({
title:"系统提示",
type:"warn",
msg:"确定删除服务类目？",
width:600,
className:"short_del_dialog",
buttons:[{
text:"删除",
click:function(){
var n=this,s=this.dom.find(".js_btn").eq(0);
b.submiting=!1,s.btn(!1),m.post({
url:"/wxopen/category?",
data:{
qrcheck_ticket:e,
action:"delete",
first:t,
second:o
}
},{
done:function(e){
return b.submiting=!1,s.btn(!0),e&&e.base_resp?void(0==e.base_resp.ret?(g.suc("删除成功"),
n.remove(),i.remove(),l(t,o)):g.err("系统错误，请稍后再试")):void g.err("系统错误，请稍后再试");
},
fail:function(){
b.submiting=!1,s.btn(!0);
}
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
},
type:"normal"
}]
}));
}
t("biz_web/lib/json.js");
var m=t("common/wx/Cgi.js"),u=t("common/wx/qrcheck_weapp.js"),g=t("common/wx/Tips.js"),f=t("common/wx/top.js"),_=t("common/wx/dialog.js"),y=t("common/wx/popover.js"),h=t("config/manage_category.js"),b={
desc:{
1:"审核中",
2:"未通过",
3:"已通过"
},
categoryList:null,
getCategoryCallback:null,
submiting:!1
};
o(),i(),a(),setTimeout(function(){
h.getCategoryList();
},0);
});