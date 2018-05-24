define("business/right.js",["common/wx/popup.js","common/wx/top.js","common/wx/Cgi.js","biz_web/lib/json.js","common/wx/tooltips.js","common/wx/Tips.js"],function(e){
"use strict";
var t=wx.cgiData,r=(e("common/wx/popup.js"),e("common/wx/top.js")),s=e("common/wx/Cgi.js"),a=e("biz_web/lib/json.js"),n=(e("common/wx/tooltips.js"),
t.flag>0?!0:!1),i=n?"&flag=1":"",o=e("common/wx/Tips.js"),l=function(){
function e(){
n||new r("#topTab",r.DATA.business).selected("rights"),d.init(!0),$(".inner_side").on("click","dd",function(){
var e=$(this).attr("_id");
e&&(d.type=e,d.init(!1));
}),$("#js_return").attr("href",wx.url("/merchant/shop_rights?t=business/rights_list&action=batchgetpayfeedback"+i));
}
return{
init:e
};
}(),c={
Add:function(e,t,r){
var a="/merchant/business?op=add_payfeedback_str";
s.post({
url:a,
data:{
type:e,
value:t
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void o.err("系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
o.suc("添加成功");
var s=[{
rid:e.id,
rvalue:t,
num:0
}];
d.add(s),r();
break;

default:
o.err("添加失败，请重试");
}
});
},
Edit:function(e,t,r,a){
var n="/merchant/business?op=update_payfeedback_str";
s.post({
url:n,
data:{
type:e,
id:t,
value:r
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void o.err("系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
o.suc("编辑成功"),a();
break;

default:
o.err("编辑失败，请重试");
}
});
},
Del:function(e,t,r){
var a="/merchant/business?op=delete_payfeedback_str";
s.post({
url:a,
data:{
type:e,
id:t
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void o.err("系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
o.suc("删除成功"),r();
break;

default:
o.err("删除失败，请重试");
}
});
}
},d=function(){
function e(e){
e&&t.data_reason_list.reason_list?l(t.data_reason_list.reason_list):r();
}
function r(){
var e="/merchant/business?action=right&type="+d.type+wx.data.param;
s.get(e,function(e){
if(0==e.base_resp.ret&&e.feedback_data){
var t=a.parse(e.feedback_data);
t&&t.reason_list?l(t.reason_list):t&&t.solution_list?l(t.solution_list):tips.err("系统错误，请重试");
}else tips.err("系统错误，请重试");
});
}
function n(e){
var t=1;
return $.each(e,function(e,r){
r.num=t++;
}),e;
}
function i(e){
var t=1;
return $.each(e,function(e,r){
r.num=t++,r.rid=r.sid,r.rvalue=r.svalue;
}),e;
}
function l(e){
e="reason"==d.type?n(e):i(e),e.length>0?($("#userGroups").html(template.render("tpl",{
data:e
})),$("#userGroups").undelegate().delegate(".js_iconDel","click",f).delegate(".js_iconEdit","click",m).delegate("tr","mouseenter",function(){
$(this).find("a").removeClass("ico_bn");
}).delegate("tr","mouseleave",function(){
$(this).find("a").addClass("ico_bn");
})):$("#userGroups").html('<tr><td colspan="3"><p class="empty_tips">暂无数据</p></td></tr>');
var t='.inner_menu_item[_id="%s"]'.sprintf(d.type);
$(t).addClass("selected").siblings().removeClass("selected"),$(".inner_main .table .js_title").html("reason"==d.type?"设置投诉原因":"设置解决方案"),
p(e.length);
}
function u(e){
$('#userGroups tr[_id="999"]')?$('#userGroups tr[_id="999"]').before(template.render("tpl",{
data:e
})):$("#userGroups").append(template.render("tpl",{
data:e
})),$("#userGroups").undelegate().delegate(".js_iconDel","click",f).delegate(".js_iconEdit","click",m).delegate("tr","mouseenter",function(){
$(this).find("a").removeClass("ico_bn");
}).delegate("tr","mouseleave",function(){
$(this).find("a").addClass("ico_bn");
}),_();
}
function p(e){
var t="reason"==d.type?6-e:7-e;
t=t>0?t:0,$("#leftnum").html(t),t>0?($("#addreason").attr("disable","false"),$("#addreason").removeClass("btn_disabled")):($("#addreason").attr("disable","true"),
$("#addreason").addClass("btn_disabled")),$(".tool_bar").show();
}
function m(){
{
var e=this,t=15,r=$(e).closest("tr").attr("_id"),s=$(e).closest("tr").attr("_value");
$("#rightform").popup({
title:"reason"==d.type?"编辑投诉原因":"编辑解决方案",
data:{
rvalue:s
},
close:function(){
this.remove();
},
buttons:[{
text:"确定",
click:function(){
var s=this,a=$(".dialog_wrp textarea").val().trim();
return a.length>t||a.length<1?(o.err("文字必须为1到%s个字".sprintf(t)),!0):void c.Edit(d.type,r,a,function(){
$(e).closest("tr").attr("_value",a),$(e).parent().parent().prev().children("p").text(a),
s.remove();
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
},
type:"default"
}]
});
}
$(".dialog_wrp .frm_tips").html("还可以输入<em>{l}</em>个字".format({
l:t-s.length
})),$(".dialog_wrp").on("keyup","textarea",function(){
var e=$(this).val().length;
e=t-e,$(".dialog_wrp .frm_tips").html(e>0?"还可以输入<em>{l}</em>个字".format({
l:e
}):0==e?"还可以输入<em{cls}>0</em>个字".format({
cls:' class="warn"'
}):"已超出<em{cls}>{l}</em>个字".format({
l:-e,
cls:' class="warn"'
}));
});
}
function f(){
if(confirm("确定删除吗？")){
var e=$(this);
c.Del(d.type,e.closest("tr").attr("_id"),function(){
e.closest("tr").remove(),_();
});
}
}
function _(){
var e=0;
$("#userGroups tr").each(function(t){
$(this).find("td")[0].innerHTML=t+1,e++;
}),p(e);
}
return{
init:e,
type:"reason",
add:u
};
}();
$("#addreason").on("click",function(){
if("true"!=$(this).attr("disable")){
{
var e=15;
$("#rightform").popup({
title:"reason"==d.type?"添加投诉原因":"添加解决方案",
close:function(){
this.remove();
},
buttons:[{
text:"确定",
click:function(){
var t=this,r=$(".dialog_wrp textarea").val().trim();
return r.length>e||r.length<1?(o.err("文字必须为1到%s个字".sprintf(e)),!0):void c.Add(d.type,r,function(){
t.remove();
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
},
type:"default"
}]
});
}
$(".dialog_wrp .frm_tips").html("还可以输入<em>15</em>个字"),$(".dialog_wrp").on("keyup","textarea",function(){
var t=$(this).val().length;
t=e-t,$(".dialog_wrp .frm_tips").html(t>0?"还可以输入<em>{l}</em>个字".format({
l:t
}):0==t?"还可以输入<em{cls}>0</em>个字".format({
cls:' class="warn"'
}):"已超出<em{cls}>{l}</em>个字".format({
l:-t,
cls:' class="warn"'
}));
});
}
}),l.init();
});