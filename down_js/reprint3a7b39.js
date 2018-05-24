define("original/reprint.js",["common/wx/Cgi.js","common/wx/dialog.js","common/wx/Tips.js","common/wx/pagebar.js","common/wx/popup.js","common/wx/popover.js","biz_web/ui/checkbox.js","biz_common/moment.js"],function(t){
"use strict";
function a(){
var t=wx.cgiData.org_info;
m.complaint_type=t.complaint_type,m.total_count={
0:t.unauth_count||t.totolcount,
1:t.auth_count||t.totolcount
},m.currentPage[m.complaint_type]=t.begin,m.ajaxDataUrl="/cgi-bin/appmsgcopyright?action=reprint&complaint_type=#complaint_type#&begin=#begin#&count=#count#&id="+t.id+"&idx="+t.idx;
}
function n(){
wx.cgiData.list.each(function(t){
t.nick_name=t.nick_name||t.username;
}),e(wx.cgiData.list);
}
function e(t){
for(var a=!(1!=+wx.cgiData.org_info.auth_type),n=0,e=t.length;e>n;n++){
var i=t[n],o=[];
!a&&o.push("可转载"),i.can_modify&&o.push("可修改"),i.can_hide_source&&o.push("不显示来源"),
i.statusDesc=o.join("，");
}
$("#list_data_"+m.complaint_type).html(template.render("list_tmpl_"+m.complaint_type,{
list:t,
authType:wx.cgiData.org_info.auth_type
}));
}
function i(t,a){
m.loadingData!==!0&&(m.loadingData=!0,$("#list_data_"+m.complaint_type).html(template.render("table_loading_tpl")),
t=t||0,a=a||wx.cgiData.org_info.count,l.get({
url:m.ajaxDataUrl.replace("#complaint_type#",m.complaint_type).replace("#begin#",t).replace("#count#",a),
dataType:"json",
type:"GET",
success:function(t){
if(m.loadingData=!1,!t.base_resp||0!=t.base_resp.ret)return p.err("系统繁忙，请稍后再试"),
void l.handleRet(t,{
id:64462,
key:36,
url:"/cgi-bin/appmsgcopyright?action=reprint"
});
try{
var a=JSON.parse(t.data);
a=a.list,e(a);
}catch(n){
p.err("系统繁忙，请稍后再试");
}
},
error:function(){
m.loadingData=!1,p.err("系统繁忙，请稍后再试");
}
}));
}
function o(t,a,n){
var e=wx.cgiData.org_info,o=m.total_count[t],n=n||e.count,s=a||e.begin;
if(o>0){
new d({
container:"#pagination_"+t,
perPage:n,
first:!1,
last:!1,
isSimple:!0,
initShowPage:s+1,
totalItemsNum:o,
callback:function(t){
var a=t.currentPage;
a--,a!=m.currentPage[m.complaint_type]&&(m.currentPage[m.complaint_type]=a,i(a,n));
}
});
}
}
function s(){
$(".jsOver").hover(function(){
$(".jsPop").show();
},function(){
$(".jsPop").hide();
}),3==$(".popTxt").data("type")?$(".popTxt").text("文章于%s被删除".sprintf(g.unix(wx.cgiData.org_info.update_time).format("YYYY-MM-DD"))):4==$(".popTxt").data("type")&&$(".popTxt").text("文章于%s被取消".sprintf(g.unix(wx.cgiData.org_info.update_time).format("YYYY-MM-DD"))),
$("#tab_ul").on("click",function(t){
if(1!=m.loadingData){
var a=t.target||t.srcElement;
if(!/li/i.test(a.nodeName)){
if(a=$(a).parents("li[data-index]"),!a||0==a.length)return;
a=a[0];
}
var n=$(a).data("index");
n!=m.complaint_type&&($("#tab_ul").find("li").removeClass("selected"),$("#tab_ul").find("li[data-index="+n+"]").addClass("selected"),
$("#data_main_"+m.complaint_type).hide(),$("#data_main_"+n).show(),m.complaint_type=n,
""==$("#list_data_"+n).html().trim()&&(m.currentPage[m.complaint_type]=0,i(0,0),
o(n,0,0)));
}
}),$("#list_data_2").on("mouseover",".js_lb_content",c),$("#list_data_1").on("mouseover",".js_lb_content",c),
$("#list_data_0").on("mouseover",".js_lb_content",c);
$("input[name=ckitem]").checkbox({
multi:!0,
onChanged:function(){
var t=$("input[name=ckitem]").checkbox().values();
t.length>0?($("#selected_count").html("(已选中%s个)".sprintf(t.length)),$("#report_btn").removeClass("btn_disabled")):($("#selected_count").html(""),
$("#report_btn").addClass("btn_disabled"));
}
});
$("input[id=ck_all]").checkbox({
onChanged:function(t){
$("input[name=ckitem]").checkbox().checked($(t)[0].checked);
var a=$("input[name=ckitem]").checkbox().values();
a.length>0?($("#selected_count").html("(已选中%s个)".sprintf(a.length)),$("#report_btn").removeClass("btn_disabled")):($("#selected_count").html(""),
$("#report_btn").addClass("btn_disabled"));
}
}),$(".js_report").on("click",function(){
var t=[{
url:$(this).attr("reporturl")
}];
m._oPop&&m._oPop.remove(),m._oPop=new h({
dom:this,
content:"如发现举报者文章违规原创声明或非独家授权，将认为是恶意举报，会对公众号进行封号处罚。确认是否举报？",
hover:!0,
hideIfBlur:!1,
buttons:[{
type:"primary",
text:"确定",
click:function(){
r(t,this.$pop.find(".btn_primary"));
}
},{
type:"default",
text:"取消",
click:function(){
this.remove();
}
}]
});
}),$("#report_btn").on("click",function(){
if(""!=$("input[name=ckitem]").checkbox().values()){
var t=$("input[name=ckitem]").checkbox("values"),a=[];
$.each(t,function(n){
var e=t[n].split("|");
if(e.length>1)var i={
url:e[0]
};
a.push(i);
}),_.show({
title:"文章举报",
msg:"|如发现举报者文章违规原创声明或非独家授权，将认为是恶意举报，会对公众号进行封号处罚。确认是否举报？",
mask:!0,
type:"warn",
buttons:[{
text:"确定",
click:function(){
r(a,this.dom.find(".btn_primary"));
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
}),$(".dialog_bd").children(".page_msg").removeClass("single_line");
}else p.err("请选择要举报的文章");
});
}
function c(){
var t={
uin:$(this).attr("uin"),
nick_name:$(this).attr("nick_name"),
signature:$(this).attr("signature"),
alias:$(this).attr("alias"),
authorized_status:$(this).attr("authorized_status")
};
m._oPop&&m._oPop.remove(),m._oPop=new h({
className:"popover_biz_account",
dom:this,
content:template.render("popupdesc",t),
hover:!0,
hideIfBlur:!0,
margin:"left"
}),m._oPop.$pop.css({
left:parseInt(m._oPop.$pop.css("left"))-20+"px",
top:parseInt(m._oPop.$pop.css("top"))-10+"px"
});
}
function r(t,a){
var n=wx.cgiData.org_info,e={
list:t
};
a.hasClass("btn_loading")||(a.btn(!1),e="undefined"!=typeof JSON.stringify?JSON.stringify(e):JSON.stringify2(e),
l.post({
url:"/cgi-bin/appmsgcopyright?action=add_complaint",
data:{
list:e,
ori_mid:n.mid,
ori_idx:n.idx
},
success:function(t){
a.btn(!0),t.base_resp&&0==t.base_resp.ret?(p.suc("举报成功"),location.reload()):(p.err("系统繁忙，请稍后再试"),
l.handleRet(t,{
id:64462,
key:37,
url:"/cgi-bin/appmsgcopyright?action=add_complaint"
}));
},
error:function(){
a.btn(!0),p.err("系统繁忙，请稍后再试");
}
}));
}
function u(t,a){
l.post({
url:"/cgi-bin/appmsgcopyright?",
data:t,
success:function(n){
a.hide(),n.base_resp&&0==n.base_resp.ret?(1==t.authorized_stat?p.suc("授权成功"):2==t.authorized_stat&&p.suc("驳回成功"),
location.reload()):(p.err("系统繁忙，请稍后再试"),l.handleRet(n,{
id:64462,
key:38,
url:"/cgi-bin/appmsgcopyright?action=set_auth"
}));
},
error:function(){
a.hide(),p.err("系统繁忙，请稍后再试");
}
});
}
var l=t("common/wx/Cgi.js"),_=t("common/wx/dialog.js"),p=t("common/wx/Tips.js"),d=t("common/wx/pagebar.js"),h=(t("common/wx/popup.js"),
t("common/wx/popover.js")),m=(t("biz_web/ui/checkbox.js"),wx.T,{
_oPop:null,
currentPage:{
0:null,
1:null
}
}),g=t("biz_common/moment.js");
a(),n(),s(),o(m.complaint_type),function(){
if(wx.cgiData.org_info.auth_status&&(0==wx.cgiData.org_info.auth_status||1==wx.cgiData.org_info.auth_status)){
$("#list_data_2").html(template.render("list_tmpl_2",{
list:wx.cgiData.list,
auth_status:wx.cgiData.org_info.auth_status
}));
{
$("input[name=authitem]").checkbox({
multi:!0,
onChanged:function(){
var t=$("input[name=authitem]").checkbox().values();
t.length>0?($("#auth_selected_count").html("(已选中%s个)".sprintf(t.length)),$("#auth_btn").removeClass("btn_disabled"),
$("#unauth_btn").removeClass("btn_disabled")):($("#auth_selected_count").html(""),
$("#auth_btn").addClass("btn_disabled"),$("#unauth_btn").addClass("btn_disabled"));
}
});
}
$("input[id=auth_all]").checkbox({
onChanged:function(t){
$("input[name=authitem]").checkbox().checked($(t)[0].checked);
var a=$("input[name=authitem]").checkbox().values();
a.length>0?($("#auth_selected_count").html("(已选中%s个)".sprintf(a.length)),$("#auth_btn").removeClass("btn_disabled"),
$("#unauth_btn").removeClass("btn_disabled")):($("#auth_selected_count").html(""),
$("#auth_btn").addClass("btn_disabled"),$("#unauth_btn").addClass("btn_disabled"));
}
}),$(".js_authLink").on("click",function(){
var t=[{
fakeuin:$(this).data("fakeuin"),
msgid:parseInt($(this).data("msgid")),
index:parseInt($(this).data("index"))
}],a=$(this).data("authorized_stat"),n={
ori_bizuin:parseInt(wx.cgiData.org_info.biz_uin),
ori_msgid:parseInt(wx.cgiData.org_info.id),
ori_index:parseInt(wx.cgiData.org_info.idx),
authorized_stat:parseInt(a),
list:t
},e={
token:wx.cgiData.org_info.token,
action:"set_auth",
authorized_stat:a,
auth_data:JSON.stringify(n)
},i=($(this),"");
"1"==a?i="授权该帐号吗？操作后将无法更改。":"2"==a&&(i="驳回该帐号吗？操作后将无法更改。"),m._oPop&&m._oPop.remove(),
m._oPop=new h({
dom:this,
content:i,
hover:!0,
hideIfBlur:!1,
buttons:[{
type:"primary",
text:"确定",
click:function(){
u(e,this.$pop);
}
},{
type:"default",
text:"取消",
click:function(){
this.remove();
}
}]
});
}),$(".js_auth_btn").on("click",function(){
if($("input.js_auth_checkBox:checked").length){
var t=$("input.js_auth_checkBox:checked"),a=[];
$.each(t,function(n){
var e={
fakeuin:$(t[n]).data("fakeuin"),
msgid:parseInt($(t[n]).data("msgid")),
index:parseInt($(t[n]).data("index"))
};
a.push(e);
});
var n=$(this).data("authorized_stat"),e={
ori_bizuin:parseInt(wx.cgiData.org_info.biz_uin),
ori_msgid:parseInt(wx.cgiData.org_info.id),
ori_index:parseInt(wx.cgiData.org_info.idx),
authorized_stat:parseInt(n),
list:a
},i={
token:wx.cgiData.org_info.token,
action:"set_auth",
authorized_stat:n,
auth_data:JSON.stringify(e)
},o="";
1==n?o="确定授权给所选的%s个帐号吗？|授权后将无法更改，所选的帐号可以转载该篇文章，转载时无法修改文章内容，且系统将会自动为文章注明转载来源。".sprintf(a.length):2==n&&(o="确定驳回所选的%s个帐号吗？|驳回后将无法更改，所选的帐号无法转载该篇文章。".sprintf(a.length));
var s=_.show({
title:"文章批量操作",
msg:o,
mask:!0,
type:"warn",
buttons:[{
text:"确定",
click:function(){
u(i,s);
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
$(".dialog_bd").children(".page_msg").removeClass("single_line");
}else $(this).hasClass("btn_disabled")||p.err("请选择要授权或驳回的请求");
}),(0==wx.cgiData.org_info.auth_status&&wx.cgiData.org_info.unauth_num>0||1==wx.cgiData.org_info.auth_status&&wx.cgiData.org_info.authed_num>0)&&new d({
container:"#pagination_2",
perPage:wx.cgiData.org_info.count,
initShowPage:parseInt(wx.cgiData.org_info.begin)+1,
totalItemsNum:0==wx.cgiData.org_info.auth_status?wx.cgiData.org_info.unauth_num:wx.cgiData.org_info.authed_num,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var a=t.currentPage-1;
return a!=wx.cgiData.org_info.begin?location.href=location.href.replace(/([\?&])begin=\d*/,"$1begin="+a):p.err("输入的页码为当前页"),
!1;
}
});
}
}();
});