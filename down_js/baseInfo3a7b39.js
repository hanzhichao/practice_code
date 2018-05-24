define("payApply/baseInfo.js",["biz_web/lib/json.js","biz_web/ui/checkbox.js","biz_common/jquery.validate.js","biz_web/ui/dropdown.js","biz_web/utils/upload.js","common/wx/Step.js","common/wx/Tips.js","common/wx/Cgi.js"],function(e){
"use strict";
e("biz_web/lib/json.js"),e("biz_web/ui/checkbox.js"),e("biz_common/jquery.validate.js");
var a=e("biz_web/ui/dropdown.js"),i=e("biz_web/utils/upload.js"),t=e("common/wx/Step.js"),s=e("common/wx/Tips.js"),_=e("common/wx/Cgi.js"),n={
processName:["1. 资料准备","2. 资料填写","3. 预览并提交"],
appIdCheck:{
status:-2,
code:{
"-2":"请验证APP ID",
"-1":"验证失败，请重新验证",
10500:"验证失败，APP ID未在开放平台注册",
10501:"验证失败，APP ID未通过审核"
}
},
classMenukeyConf:["","class_menu_first","class_menu_sec","class_menu_third"],
classMenuNameConf:["","一","二","三"],
data:{
js_pay:"0",
native_pay:"0",
app_pay:"0",
biz_pay:"1"
},
tempData:{
over5_million:"-1",
class_menu_first:"",
class_index_first:-1,
class_menu_sec:"",
class_index_sec:-1,
class_menu_third:"",
class_index_third:-1,
class_menu:null,
q_file:{
file_list:null
},
auth_dir_menu_data:"http://"
},
proto:!1,
hasInit:!0,
func:{}
};
!function(){
function e(){
var e=window.baseInfo.status;
n.action=wx.getUrl("type")||"",1*e===0?(n.action="create",n.hasInit=!0):1*e===1||1*e===2&&"check"==n.action?(n.hasInit=!1,
n.action="check"):1*e===3?(n.hasInit=!1,n.action="modify"):1*e===2&&(n.hasInit=!1,
n.action="check"),u(),"create"==n.action?l(1):"check"==n.action?r():("modify"==n.action||"modify_suc"==n.action)&&l(2);
}
function l(e){
A(e||1),C(),j(),z(),I(),N();
}
function r(){
f(),c(),$("#step3").show(),n.hasInit=!0;
}
function d(){
"check"!=n.action&&($("#baseInfo").on("click","a[data-step]",E),n.dom.auth_dir.on("keyup",P),
$("#stock_code").keyup(S),$("#baseInfo").on("click",".jsSubmitInfo",O),"modify_suc"==n.action&&$("#baseInfo").on("click",".modifySucSubmit",R));
}
function u(){
if(n.hasInit!==!0){
n.data=window.baseInfo,window.baseInfo=null;
var e=n.tempData;
n.data.biz_scope=$("#biz_scope").val().trim(),n.appIdCheck.status=0,e.over5_million=1*n.data.over5_million===0&&""==n.data.stock_code?"-1":n.data.over5_million,
-1!=n.data.auth_dir.indexOf("https://")&&(e.auth_dir_menu_data="https://"),$("#auth_dir").val(n.data.auth_dir.replace("https://","").replace("http://","").html(!1)),
$("#req_inst_b").val(n.data.req_inst.replace(n.data.auth_dir,"").html(!1));
var a=n.data.biz_class.split("|");
e.class_menu_first=a[0],e.class_menu_sec=a[1],e.class_menu_third=a[2];
}
}
function c(){
$("#step3").html(template.render("step3_info_tpl",{
data:n.data,
tempData:n.tempData,
action:n.action
}));
}
function o(){
if(/^(check|modify_suc)$/.test(n.action)||n.tempData.class_menu)return!0;
var e=!1;
return"modify"==n.action&&(e={
spin:!0
}),_.get({
url:"/merchant/bizpayinitcheck?action=index",
dataType:"json",
mask:e
},function(e){
if(!e.base_resp||0!=e.base_resp.ret||!e.class_info)return void s.err("拉取类目信息失败，请刷新页面");
switch(+e.base_resp.ret){
case 0:
g(window.JSON.parse(e.class_info)),n.hasInit!==!0&&m();
break;

default:
s.err("系统错误，请重试");
}
}),!0;
}
function f(){
var e=null,a=n.tempData,t=[],s=[],_=[];
a.addition_seleced="",a.q_file.file_list=[],a.q_file_url=[];
try{
e=a.class_menu[a.class_index_first].sub_class[a.class_index_sec].sub_class[a.class_index_third];
}catch(l){}
if(e){
a.addition_seleced_array=[],a.add_q_file=[];
for(var r=0,d=e.addtional_info.length;d>r;r++){
var u=e.addtional_info[r],c=u.file_list.length;
a.add_q_file.push({
list:new Array(c),
url:new Array(c)
});
}
var d=e.file_list.length;
a.q_file_url=new Array(d),a.q_file.file_list=new Array(d);
for(var r=0,d=e.addtional_info.length;d>r;r++){
var u=e.addtional_info[r];
-1!=("|"+n.data.addition+"|").indexOf("|"+u.name+"|")&&(s.push(r),t.push(u.name),
_.push(u.file_list.join("|")));
}
a.addition_seleced=s.join("|");
for(var o=window.JSON.parse(n.data.q_file).file_list,r=0,d=o.length;d>r;r++){
var u=o[r];
if(u.type){
for(var f=0,m=t.length;m>f;f++)if(t[f]==u.type)for(var p=_[f].split("|"),h=0,F=p.length;F>h;h++)p[h]==u.name&&(a.add_q_file[s[f]].list[h]=u,
a.add_q_file[s[f]].url[h]=i.multimediaFileUrl(u.file_id),-1==("|"+a.addition_seleced_array.join("|")+"|").indexOf("|"+s[f]+"|")&&a.addition_seleced_array.push(s[f]));
}else for(var f=0,m=e.file_list.length;m>f;f++)u.name==e.file_list[f]&&(a.q_file.file_list[f]=u,
a.q_file_url[f]=i.multimediaFileUrl(u.file_id));
}
}else if("check"==n.action){
a.add_q_file=[{
url:[],
list:[]
}],a.addition_seleced_array=[];
for(var o=window.JSON.parse(n.data.q_file).file_list,r=0,d=o.length;d>r;r++){
var u=o[r];
u.type?(a.add_q_file[0].list.push(u),a.add_q_file[0].url.push(i.multimediaFileUrl(u.file_id)),
a.addition_seleced_array[0]=0):(a.q_file.file_list.push(u),a.q_file_url.push(i.multimediaFileUrl(u.file_id)));
}
}
}
function m(){
f();
var e=n.tempData.class_menu_third,a=n.tempData.class_index_third;
n.func.class_menu_third_back(e,e,a);
}
function p(){
var e=n.tempData,a=[e.class_menu_sec?e.class_menu_first+"-":e.class_menu_first,e.class_menu_third?e.class_menu_sec+"-":e.class_menu_sec,e.class_menu_third+"，"];
e.class_menu_first?$("#selected_text").show():$("#selected_text").hide(),$("#selected_class").html(a.join(""));
}
function h(e){
$("#rate").html(e?e.rate||"-":"-"),$("#money").html(e?(e.money/100).toFixed(2)||"-":"-"),
$("#cycle").html(e?e.cycle||"-":"-");
}
function F(e){
$("#common_q_file").html(template.render("q_file_tpl",{
data:e.file_list,
sample:e.file_sample,
url:n.tempData.q_file_url||[]
}));
}
function v(e){
$("#addition_info").html(template.render("addition_info_tpl",{
data:e,
selected:"|"+n.tempData.addition_seleced+"|"
}));
}
function b(e){
var a=e.length,i=new Array(a);
if(n.hasInit!==!0&&n.tempData.addition_seleced)for(var t=n.tempData.addition_seleced.split("|"),s=0,_=t.length;_>s;s++){
var l=n.tempData.add_q_file[t[s]];
if(l){
i[t[s]]=template.render("q_file_tpl",{
key:t[s],
data:e[t[s]].file_list,
sample:e[t[s]].file_sample,
url:l.url?l.url:[]
});
for(var r=e[t[s]].file_list.length,d=0;r>d;d++)setTimeout(function(){
var a=e[t[s]].file_list,i=e[t[s]].name,_=t[s],n=d;
return function(){
y(_,n,a,i);
};
}(),0);
}
}
$("#common_q_file").after(template.render("add_file_frame_tpl",{
data:new Array(a),
list:i
}));
}
function y(e,a,t,_){
i.uploadTmpFile({
container:"#q_file_"+e+"_"+a,
multi:!1,
type:2,
onComplete:function(l,r,d,u){
var c=n.tempData,o=c.add_q_file;
o[e]||(o[e]={
url:new Array(t.length),
list:new Array(t.length)
}),o[e].list[a]||(o[e].list[a]={
name:t[a],
file_id:"",
type:_
});
var f=$("#q_file_preview_"+e+"_"+a);
0==u.base_resp.ret?($("#q_file_err_"+e+"_"+a).hide(),f.addClass("upload_preview_loaded"),
s.suc("上传成功"),o[e].list[a].file_id=u.content,o[e].url[a]=i.tmpFileUrl(u.content),
f.html('<a href="'+o[e].url[a]+'" target="_blank"><img src="'+o[e].url[a]+'" ></a>').show()):(f.removeClass("upload_preview_loaded"),
o[e].url[a]=null,o[e].list[a]=null,f.html(""),s.err());
}
});
}
function D(e){
q(e),k(e),w(e),n.hasInit=!0;
}
function q(e){
var a=$("#addition"),i=$("#addition_info"),t=$("#q_file_div");
if(t.html('<div id="common_q_file"></div>'),!e||!e.addtional_info||0==e.addtional_info.length)return a.hide(),
i.html(""),n.tempData.addition_seleced="",n.tempData.addition_seleced_array=[],void(n.tempData.add_q_file=[]);
if(n.hasInit===!0){
a.hide(),i.html(""),n.tempData.addition_seleced="",n.tempData.addition_seleced_array=[],
n.tempData.add_q_file=[];
for(var s=0,_=e.addtional_info.length;_>s;s++){
var l=e.addtional_info[s],r=l.file_list.length;
n.tempData.add_q_file.push({
list:new Array(r),
url:new Array(r)
});
}
}
v(e.addtional_info),a.show(),b(e.addtional_info),setTimeout(function(){
$("#addition_info").find("input[type=checkbox]").checkbox({
onChanged:M
});
},0);
}
function w(e){
var a=$("#q_file");
if(!e)return void a.hide();
var i=e.file_list.length,t=0,s=[];
n.tempData.addition_seleced&&(s=n.tempData.addition_seleced.split("|"));
for(var _=0,l=s.length;l>_;_++)t+=e.addtional_info[s[_]].file_list.length;
i+t==0?a.hide():a.show();
}
function k(e){
if(!e||0==e.file_list.length)return n.tempData.q_file.file_list=null,void(n.tempData.q_file_url=null);
if(n.hasInit===!0){
var a=e.file_list.length;
n.tempData.q_file.file_list=new Array(a),n.tempData.q_file_url=new Array(a);
}
F(e);
for(var t=0,_=e.file_list.length;_>t;t++)setTimeout(function(){
var a=e,_=t;
return function(){
$("#q_file_preview_"+_).removeClass("upload_preview_loaded"),i.uploadTmpFile({
container:"#q_file_"+_,
multi:!1,
type:2,
onComplete:function(e,t,l,r){
var d=n.tempData,u=d.q_file.file_list;
u[_]||(u[_]={
name:a.file_list[_],
file_id:"",
type:""
});
var c=$("#q_file_preview_"+_);
0==r.base_resp.ret?($("#q_file_err_"+_).hide(),c.addClass("upload_preview_loaded"),
s.suc("上传成功"),u[_].file_id=r.content,d.q_file_url[_]=i.tmpFileUrl(r.content),c.html('<a href="'+d.q_file_url[_]+'" target="_blank"><img src="'+d.q_file_url[_]+'" ></a>').show()):(c.removeClass("upload_preview_loaded"),
d.q_file_url[_]=null,u[_]=null,c.html(""),s.err());
}
});
};
}(),0);
}
function g(e){
if(!e.sub_class||0==e.sub_class.length)return void(n.tempData.class_menu=null);
var a=n.tempData;
n.hasInit!==!0&&(a.class_index_first=!1,a.class_index_sec=!1,a.class_index_third=!1);
for(var i=a.class_menu=e.sub_class,t=0,s=i.length;s>t;t++){
var _=i[t];
if(_.is_opened&&1*_.is_opened===1){
_.value=_.name,a.class_index_first===!1&&_.name==a.class_menu_first&&(a.class_index_first=t);
for(var l=0,r=_.sub_class.length;r>l;l++){
var d=_.sub_class[l];
if(d.is_opened&&1*d.is_opened===1){
d.value=d.name,a.class_index_sec===!1&&d.name==a.class_menu_sec&&(a.class_index_sec=l);
for(var u=0,c=d.sub_class.length;c>u;u++){
var o=d.sub_class[u];
o.is_opened&&1*o.is_opened===1&&1*o.money!==-1&&1*o.cycle!==-1&&1*o.rate!==-1?(o.value=o.name,
a.class_index_third===!1&&o.name==a.class_menu_third&&(a.class_index_third=u)):(d.sub_class.splice(u,1),
c=d.sub_class.length,u--);
}
}else _.sub_class.splice(l,1),r=_.sub_class.length,l--;
}
}else i.splice(t,1),s=i.length,t--;
}
a.class_index_first===!1&&(a.class_menu_first="",a.class_index_first=-1),a.class_index_sec===!1&&(a.class_menu_sec="",
a.class_index_sec=-1),a.class_index_third===!1&&(a.class_menu_third="",a.class_index_third=-1),
x(1,i),n.hasInit!==!0?(a.class_index_first!==!1&&x(2,i[a.class_index_first].sub_class),
a.class_index_sec!==!1&&x(3,i[a.class_index_first].sub_class[a.class_index_sec].sub_class)):(x(2,[]),
x(3,[]));
}
function x(e,i){
if(!(1>1*e||1*e>3)){
var t=n.tempData,s=n.classMenuNameConf[e],_=n.classMenukeyConf[e];
n[_]&&"function"==typeof n[_].destroy&&n[_].destroy(),n[_]=new a({
container:"#"+_,
label:t[_]?t[_]:"请选择",
data:i,
callback:n.func[_+"_back"]
}),setTimeout(function(){
var e=template.render("class_menu_err_tpl",{
name:s,
key:_
});
n.dom[_].find(".jsDropdownBt").after(e);
},0);
}
}
function z(){
n.auth_dir_menu=new a({
container:"#auth_dir_menu",
label:n.tempData.auth_dir_menu_data,
data:[{
name:"http://",
value:"http://"
},{
name:"https://",
value:"https://"
}],
callback:U
});
}
function C(){
$("#baseInfo").find("input[type=checkbox]").checkbox({
onChanged:T
});
}
function j(){
var e=$("#baseInfo");
e.find("input[type=radio][name=over5_million]").checkbox({
multi:!1,
onChanged:T
}),e.find("input[type=radio][name=shared_addr]").checkbox({
multi:!1,
onChanged:T
});
}
function A(e){
n.step=new t({
container:"#processBar",
selected:e,
names:n.processName
}),$("#step"+e).show();
}
function I(){
n.dom={
rights_url:$("#rights_url"),
alarm_url:$("#alarm_url"),
auth_dir:$("#auth_dir"),
req_inst_a:$("#req_inst_a"),
req_inst_b:$("#req_inst_b"),
callback_url:$("#callback_url"),
stock_code:$("#stock_code"),
stock_code_err:$("#stock_code_err"),
class_menu_first:$("#class_menu_first"),
class_menu_sec:$("#class_menu_sec"),
class_menu_third:$("#class_menu_third")
};
}
function E(){
var e=$(this),a=1*e.data("step"),i=e.data("func"),t=e.data("funcafter");
i&&"function"==typeof n.func[i]&&n.func[i](e)===!1||(n.step.go(a),$("#step"+a).show().siblings().filter("[data-type=step]").hide(),
t&&"function"==typeof n.func[t]&&n.func[t](e),$(window).scrollTop(1));
}
function T(e){
var a=e.data("func");
"function"==typeof n.func[a]&&n.func[a](e);
}
function M(e){
var a=[],i=n.tempData;
i.addition_seleced_array=[],$("#addition_info").find("input[type=checkbox]:checked").each(function(){
var e=$(this).data("index"),t=i.class_menu[i.class_index_first].sub_class[i.class_index_sec].sub_class[i.class_index_third].addtional_info[e];
a.push(e),t.file_list.length>0&&i.addition_seleced_array.push(e);
}),i.addition_seleced=a.join("|"),i.addition_seleced?$("#addition_err").hide():$("#addition_err").show().find(":hidden").show();
var t=1*e.data("index"),s=$("#add_file_"+t),_=i.class_menu[i.class_index_first].sub_class[i.class_index_sec].sub_class[i.class_index_third];
if(e.prop("checked")){
if(s.show(),!s.html().trim()){
var l=_.addtional_info[t],r=l.file_list.length;
if(n.tempData.add_q_file[t]={
url:new Array(r),
list:new Array(r)
},r>0){
var d=template.render("q_file_tpl",{
key:t,
data:l.file_list,
sample:l.file_sample,
url:[]
});
s.html(d);
for(var u=0;r>u;u++)setTimeout(function(){
var e=t,a=u,i=l.file_list,s=l.name;
return function(){
y(e,a,i,s);
};
}(),0);
}
}
}else s.hide();
w(_);
}
function P(){
var e=n.dom;
n.data.auth_dir=n.tempData.auth_dir_menu_data+e.auth_dir.val().trim(),e.req_inst_a.val(n.data.auth_dir);
}
function S(){
$(this).val().trim()?$("#stock_code_err").hide():$("#stock_code_err").show();
}
function U(e){
var a=n.dom;
n.tempData.auth_dir_menu_data=e,n.data.auth_dir=e+a.auth_dir.val().trim(),a.req_inst_a.val(n.data.auth_dir);
}
function N(){
$.validator.addMethod("auth_dir_validate",function(e,a){
var i=!!this.optional(a);
return/\/$/.test(e)&&/^(https?|s?ftp|weixin):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test("http://"+e)?i||!0:i||!1;
},"请填写正确的支付授权目录"),$.validator.addMethod("req_inst_validate",function(e,a){
var i=!!this.optional(a),t=n.data.auth_dir+n.dom.req_inst_b.val().trim();
return/^(https?|s?ftp|weixin):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)?(n.data.req_inst=t,
i||!0):(n.data.req_inst="",i||!1);
},"请填写合法网址");
var e=n.data,a=n.dom;
n.form2=$("#form2").validate({
rules:{
biz_scope:{
required:!0,
maxlength:140
},
customer_service_phone:{
required:!0
},
rights_url:{
required:function(){
return 1*e.biz_pay===1&&!a.rights_url.val().trim();
},
url:!0
},
alarm_url:{
required:function(){
return 1*e.biz_pay===1&&!a.alarm_url.val().trim();
},
url:!0
},
native_pay:{
required:function(){
return 1*e.js_pay===0&&1*e.native_pay===0&&1*e.biz_pay===1;
}
},
auth_dir:{
required:function(){
return 1*e.js_pay===1&&!a.auth_dir.val().trim();
},
auth_dir_validate:!0
},
req_inst_b:{
required:function(){
return 1*e.js_pay===1&&!a.req_inst_b.val().trim();
},
req_inst_validate:!0
},
callback_url:{
required:function(){
return 1*e.native_pay===1&&!a.callback_url.val().trim();
},
url:!0
}
},
messages:{
biz_scope:{
required:"请简述售卖的商品",
maxlength:"不能超过140个字"
},
customer_service_phone:{
required:"请输入客服电话"
},
rights_url:{
required:"请填写支付维权通知URL",
url:"请填写合法网址"
},
alarm_url:{
required:"请填写告警通知URL",
url:"请填写合法网址"
},
native_pay:{
required:"请至少选择一种支付方式"
},
auth_dir:{
required:"请填写支付授权目录",
auth_dir_validate:"请填写正确的支付授权目录"
},
req_inst_b:{
required:"请填写支付请求实例",
req_inst_validate:"请填写合法网址"
},
callback_url:{
required:"请填写支付回调URL",
url:"请填写合法网址"
}
},
errorPlacement:function(e,a){
var i=a.data("err");
i=i?$("#"+i):a.parent(),e.appendTo(i);
}
});
}
function O(){
var e={
biz_class:n.data.biz_class,
addition:n.data.addition,
over5_million:n.tempData.over5_million,
stock_code:n.data.stock_code,
customer_service_phone:n.data.customer_service_phone,
biz_scope:n.data.biz_scope,
biz_pay:n.data.biz_pay,
js_pay:n.data.js_pay,
native_pay:n.data.native_pay,
auth_dir:n.data.auth_dir,
req_inst:n.data.req_inst,
shared_addr:n.data.shared_addr,
callback_url:n.data.callback_url,
rights_url:n.data.rights_url,
alarm_url:n.data.alarm_url
};
1*e.biz_pay!==1&&(e.rights_url="",e.js_pay="0",e.native_pay="0"),(1*e.biz_pay!==1||1*e.js_pay!==1)&&(e.auth_dir="",
e.req_inst="",e.shared_addr="1"),(1*e.biz_pay!==1||1*e.native_pay!==1)&&(e.callback_url=""),
1*e.over5_million===-1&&(e.over5_million="0");
var a=n.tempData,i={
file_list:a.q_file.file_list?a.q_file.file_list.concat([]):[]
};
if(a.addition_seleced_array)for(var t=0,l=a.addition_seleced_array.length;l>t;t++){
var r=a.addition_seleced_array[t];
a.add_q_file[r]&&(i.file_list=i.file_list.concat(a.add_q_file[r].list));
}
e.q_file=window.JSON.stringify2(i);
var d=$(this);
d.btn(0),_.post({
url:"/merchant/businessaccess?action=bizpaybaseinfo",
dataType:"json",
data:e,
mask:!1
},function(e){
return d.btn(1),e.base_resp?1*e.base_resp.ret===10500?void s.err(n.appIdCheck.code[10500]):1*e.base_resp.ret===10501?void s.err(n.appIdCheck.code[10501]):1*e.base_resp.ret!==0?void s.err():($("#success").show(),
void $("#baseInfo").hide()):void s.err();
});
}
function R(){
var e=(n.data,n.tempData,!1);
return n.form2.form()||(e=!0),e===!0?(s.err("请完善表单信息"),!1):void 0;
}
e(),d(),o(),n.func.agreeProto=function(e){
e.prop("checked")?(n.proto=!0,$("#infoReady").addClass("btn_primary").removeClass("btn_disabled")):(n.proto=!1,
$("#infoReady").addClass("btn_disabled").removeClass("btn_primary"));
},n.func.checkProto=function(){
return n.proto?!0:!1;
},n.func.validateForm=function(){
if(!n.tempData.class_menu)return s.err("拉取类目信息失败，请刷新页面"),!1;
var e=n.data,a=n.tempData,i=!1;
n.form2.form()||(i=!0);
var t=n.dom;
1*a.over5_million!==0||t.stock_code.val().trim()?t.stock_code_err[0].style.display="none":(t.stock_code_err[0].style.display="inline",
i=!0);
for(var _=1,l=n.classMenukeyConf.length;l>_;_++)$("#"+n.classMenukeyConf[_]+"_err").hide();
for(var _=1,l=n.classMenukeyConf.length;l>_;_++){
var r=n.classMenukeyConf[_],t=$("#"+r+"_err");
if(!a[r]){
t.show(),t.find(":hidden").css("display","block"),$("#class_status_div").addClass("wrp_pay_hint_warn"),
i=!0;
break;
}
$("#class_status_div").removeClass("wrp_pay_hint_warn");
}
$("#q_file_div").find("[id^=q_file_err]").hide();
for(var d=a.q_file.file_list||[],_=0,l=d.length;l>_;_++){
var t=$("#q_file_err_"+_);
d[_]||(t.show(),i=!0);
}
if(a.add_q_file&&a.add_q_file.length>0&&!a.addition_seleced)$("#addition_err").show().find(":hidden").show(),
i=!0;else if(a.add_q_file&&a.add_q_file.length>0&&a.addition_seleced)for(var u=a.addition_seleced.split("|"),_=0,l=u.length;l>_;_++)for(var o=u[_],f=0,m=a.add_q_file[o].list.length;m>f;f++){
var p=a.add_q_file[o].list[f];
p&&p.file_id||($("#q_file_err_"+o+"_"+f).show(),i=!0);
}
return i===!0?(s.err("请完善表单信息"),!1):(e.addition=[],$("#addition_info").find("input[type=checkbox]:checked").each(function(){
e.addition.push($(this).data("label"));
}),e.addition=e.addition.join("|"),e.stock_code=1*a.over5_million===0?$("#stock_code").val().trim():"",
e.biz_scope=$("#biz_scope").val().trim(),e.customer_service_phone=$("#customer_service_phone").val().trim(),
e.shared_addr=1*e.biz_pay===1&&1*e.js_pay===1?$("#baseInfo").find("input[type=radio][name=shared_addr]:checked").val():"1",
e.callback_url=1*e.biz_pay===1&&1*e.native_pay===1?$("#callback_url").val().trim():"",
e.rights_url=1*e.biz_pay===1?$("#rights_url").val().trim():"",e.alarm_url=$("#alarm_url").val().trim(),
c(),!0);
},n.func.publicPaySetE=function(e){
var a=$("#"+e.data("show"));
e.prop("checked")?a.show():a.hide();
var i=n.data;
i.js_pay=$("#js_pay").prop("checked")?1:0,i.native_pay=$("#native_pay").prop("checked")?1:0,
"modify_suc"==n.action&&(i.biz_pay=1*i.js_pay===1||1*i.native_pay===1?"1":"0");
},n.func.over5millionE=function(e){
var a=n.tempData;
a.over5_million=e.val().trim(),1*a.over5_million===0?$("#stock_code_div").show():$("#stock_code_div").hide();
},n.func.class_menu_first_back=function(e,a,i){
a&&$(this.container+"_err").hide();
var t=n.tempData;
t.class_menu_first=e,t.class_index_first=i,t.class_menu_sec="",t.class_index_sec=-1,
t.class_menu_third="",t.class_index_third=-1,p(),h(),D(),x(2,t.class_menu[i].sub_class),
x(3,[]),setTimeout(function(){
n.dom.class_menu_sec.find(".jsDropdownBt").trigger("click");
},0);
},n.func.class_menu_sec_back=function(e,a,i){
a&&$(this.container+"_err").hide();
var t=n.tempData;
t.class_menu_sec=e,t.class_index_sec=i,t.class_menu_third="",t.class_index_third=-1,
p(),h(),D(),x(3,t.class_menu[t.class_index_first].sub_class[i].sub_class),setTimeout(function(){
n.dom.class_menu_third.find(".jsDropdownBt").trigger("click");
},0);
},n.func.class_menu_third_back=function(e,a,i){
a&&$(this.container+"_err").hide();
var t=n.tempData;
t.class_menu_third=e,t.class_index_third=i,n.data.biz_class=t.class_menu_first+"|"+t.class_menu_sec+"|"+t.class_menu_third;
var s=t.class_menu[t.class_index_first].sub_class[t.class_index_sec].sub_class[i];
p(),h(s),D(s);
},n.func.modifyLink=function(e){
setTimeout(function(){
var a=$("#"+e.data("anchor")).offset();
a&&a.top&&$(window).scrollTop(a.top);
},0);
};
}();
});