define("payApply/businessInfo.js",["widget/date_select.css","biz_web/lib/json.js","biz_common/jquery.validate.js","common/lib/datepicker.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","biz_web/utils/upload.js","common/wx/Step.js","common/wx/Tips.js","common/wx/Cgi.js","payApply/businessMenu.js"],function(e){
"use strict";
e("widget/date_select.css"),e("biz_web/lib/json.js"),e("biz_common/jquery.validate.js"),
e("common/lib/datepicker.js"),e("biz_web/ui/checkbox.js");
var a=e("biz_web/ui/dropdown.js"),t=e("biz_web/utils/upload.js"),i=e("common/wx/Step.js"),n=e("common/wx/Tips.js"),r=e("common/wx/Cgi.js"),o={
processName:["1. 资料准备","2. 资料填写","3. 预览并提交"],
data:{},
tempData:{
card_scan:{
file_list:[{
name:"",
file_id:""
}]
},
license_scan:{
file_list:[{
name:"",
file_id:""
}]
},
org_scan:{
file_list:[{
name:"",
file_id:""
}]
},
tax_scan:{
file_list:[{
name:"",
file_id:""
}]
},
card_scan_url:"",
license_scan_url:"",
org_scan_url:"",
tax_scan_url:""
},
menu:e("payApply/businessMenu.js"),
hasInit:!0,
func:{}
};
!function(){
function e(){
var e=window.baseInfo.status;
o.action=wx.getUrl("type")||"",1*e===0?(o.action="create",o.hasInit=!1):1*e===1||1*e===2?(o.hasInit=!1,
o.action="check"):1*e===3&&(o.hasInit=!1,o.action="modify"),_(),"create"==o.action?(d(1),
setTimeout(s,0),o.hasInit=!0):"check"==o.action?(c(),o.hasInit=!0):"modify"==o.action&&(d(2),
D(),setTimeout(function(){
w();
},0),setTimeout(s,0),setTimeout(function(){
o.func.initUpload();
},0),o.hasInit=!0);
}
function d(e){
y(),v(e||1),f(),h(),k(),q();
}
function c(){
p(),$("#step3").show();
}
function m(){
if("check"!=o.action){
var e=o.dom;
e.baseInfo.on("click","a[data-step]",b),e.baseInfo.on("click",".datepicker_switch",g),
e.baseInfo.on("click",".jsSubmitInfo",j);
}
}
function _(){
if(o.hasInit!==!0){
o.data=window.baseInfo,window.baseInfo=null;
var e=o.tempData;
o.data.biz_scope=$("#biz_scope").val().trim();
for(var a in e)if(-1!=a.indexOf("_scan_url")){
var i=a.replace("_url","");
o.data[i]?(e[i]=window.JSON.parse(o.data[i]),e[a]=e[i].file_list&&e[i].file_list[0]&&e[i].file_list[0].file_id?t.multimediaFileUrl(e[i].file_list[0].file_id):""):e[a]="";
}
for(var a in o.menu)for(var n=0,r=o.menu[a].length;r>n;n++){
var d=o.menu[a][n];
if(o.data[a]==d.value){
e[a]=d.name;
break;
}
}
}
}
function s(){
var e=o.tempData;
for(var a in e)if(-1!=a.indexOf("_scan_url")&&e[a]){
var t=a.replace("_url","");
$("#"+t+"_preview").addClass("upload_preview_loaded").html('<a href="'+e[a]+'" target="_blank"><img src="'+e[a]+'" ></a>').show();
}
}
function l(e,a){
var t=o.data,i=!1;
return a=a&&1*t[a]===1?!1:!0,t[e+"_start_time"]=$("#"+e+"_start_time").val().trim()||"",
t[e+"_end_time"]=$("#"+e+"_end_time").val().trim()||"",!t[e+"_start_time"]||a&&!t[e+"_end_time"]?($("#"+e+"_err").show().find("span").show().html("请选择日期"),
i=!0):!u(t[e+"_start_time"])||a&&!u(t[e+"_end_time"])?($("#"+e+"_err").show().find("span").show().html("请输入合法日期"),
i=!0):$("#"+e+"_err").hide(),i;
}
function u(e){
var a=e.match(/^(\d{4})-(\d{2})-(\d{2})/)||[],t=Number(a[1]||0),i=Number(a[2]||0),n=Number(a[3]||0);
return t&&i&&13>i&&n&&32>n;
}
function p(){
$("#step3").html(template.render("step3_tpl",{
data:o.data,
tempData:o.tempData,
action:o.action
}));
}
function f(){
o.dom.form2.find("input[type=checkbox]").checkbox({
onChanged:x
});
}
function b(){
var e=$(this),a=1*e.data("step"),t=e.data("func"),i=e.data("funcafter");
t&&"function"==typeof o.func[t]&&o.func[t](e)===!1||(o.step.go(a),$("#step"+a).show().siblings().filter("[data-type=step]").hide(),
i&&"function"==typeof o.func[i]&&o.func[i](e),$(window).scrollTop(1));
}
function v(e){
o.step=new i({
container:"#processBar",
selected:e,
names:o.processName
}),$("#step"+e).show();
}
function h(){
for(var e in o.menu)o.func[e+"_back"]=function(){
var a=e;
return setTimeout(function(){
var e=template.render("dropdown_err_tpl",{
key:a
});
$("#"+a).append(e);
},0),function(e,t){
t&&$(this.container+"_err").hide(),o.data[a]=e,o.tempData[a]=t;
};
}(),o[e]=new a({
container:"#"+e,
label:"请选择",
data:o.menu[e],
callback:o.func[e+"_back"]
});
}
function w(){
for(var e in o.menu)o[e].selected(o.tempData[e]);
}
function k(){
o.dom.form2.find(".jsDatapicker").datepicker({
format:"YYYY-MM-DD",
yearRange:"c-80:c+50",
changeYear:!0,
onClose:function(e,a){
var t=$("#"+a.input.data("link")),i=a.input.data("longterm"),n=a.id.replace("_start_time","").replace("_end_time","");
l(n,i||""),o.data[a.id]=e||"",o.tempData[a.id]=e||"",a.input.hasClass("jsDatapickerStart")?1*o.data[i]!==1&&t.datepicker("option","minDate",e):t.datepicker("option","maxDate",e);
}
});
}
function g(){
var e=$(this);
e.find(".jsDatapicker").datepicker("show");
}
function x(e){
var a=e.data("key"),t=e.data("calender"),i=$("#"+t),n=$("#"+e.data("startcalender"));
e.prop("checked")?(o.data[a]="1",i.datepicker("disable").datepicker("setDate",""),
o.data[t]=""):(o.data[a]="0",i.datepicker("enable").datepicker("setDate",o.tempData[t]||"").datepicker("option","minDate",n.val()),
o.data[t]=o.tempData[t]),setTimeout(function(){
l(t.replace("_end_time","").replace("_start_time",""),a);
},0);
}
function D(){
var e=$("#card_valid_start_time"),a=$("#card_valid_end_time"),t=$("#org_valid_start_time"),i=$("#org_valid_end_time"),n=$("#license_valid_start_time"),r=$("#license_valid_end_time"),d=$("#tax_valid_start_time"),c=$("#tax_valid_end_time");
setTimeout(function(){
e.datepicker("option","maxDate",o.data.card_valid_end_time),a.datepicker("option","minDate",o.data.card_valid_start_time),
t.datepicker("option","maxDate",o.data.org_valid_end_time),i.datepicker("option","minDate",o.data.org_valid_start_time),
n.datepicker("option","maxDate",o.data.license_valid_end_time),r.datepicker("option","minDate",o.data.license_valid_start_time),
d.datepicker("option","maxDate",o.data.tax_valid_end_time),c.datepicker("option","minDate",o.data.tax_valid_start_time);
},0),1*o.data.long_term_valid===1&&setTimeout(function(){
r.datepicker("disable");
},0),1*o.data.tax_long_term_valid===1&&setTimeout(function(){
c.datepicker("disable");
},0);
}
function y(){
o.dom={
form2:$("#form2"),
baseInfo:$("#baseInfo")
};
}
function j(){
1*o.data.tax_long_term_valid===1&&(o.data.tax_valid_end_time=""),1*o.data.long_term_valid===1&&(o.data.license_valid_end_time="");
var e=$(this);
e.btn(0),r.post({
url:"/merchant/businessaccess?action=bizpayprofession",
dataType:"json",
data:o.data,
mask:!1
},function(a){
return e.btn(1),a.base_resp&&1*a.base_resp.ret===0?($("#success").show(),void $("#baseInfo").hide()):void n.err();
});
}
function q(){
var e=(o.data,o.dom);
o.form2=e.form2.validate({
rules:{
name:{
required:!0
},
contact_number:{
required:!0
},
email:{
required:!0,
email:!0
},
company_name:{
required:!0
},
company_website:{
url:!0
},
biz_name:{
required:!0
},
company_addr:{
required:!0
},
post_code:{
required:!0,
maxlength:10,
number:!0
},
card_number:{
required:!0
},
card_holder_name:{
required:!0
},
license_number:{
required:!0
},
biz_scope:{
required:!0,
maxlength:140
},
org_code:{
required:!0
},
tax_number:{
required:!0
}
},
messages:{
name:{
required:"请填写"
},
contact_number:{
required:"请填写"
},
email:{
required:"请填写",
email:"请填写合法的邮箱地址"
},
company_name:{
required:"请填写"
},
company_website:{
url:"请填写合法的网站地址"
},
biz_name:{
required:"请填写"
},
company_addr:{
required:"请填写"
},
post_code:{
required:"请填写",
maxlength:"不能超过10字",
number:"请输入合法的邮政编码"
},
card_number:{
required:"请填写"
},
card_holder_name:{
required:"请填写"
},
license_number:{
required:"请填写"
},
biz_scope:{
required:"请填写",
maxlength:"不能超过140字"
},
org_code:{
required:"请填写"
},
tax_number:{
required:"请填写"
}
},
errorPlacement:function(e,a){
var t=a.data("err");
t=t?$("#"+t):a.parent(),e.appendTo(t);
}
});
}
e(),m(),o.func.validateForm=function(){
var e=!1,a=o.data;
o.form2.form()||(e=!0);
for(var t in o.menu)1*o.data[t]===0||o.data[t]||(e=!0,$("#"+t+"_err").show().find(":hidden").show());
l("card_valid")===!0&&(e=!0),l("license_valid","long_term_valid")===!0&&(e=!0),l("org_valid")===!0&&(e=!0),
l("tax_valid","tax_long_term_valid")===!0&&(e=!0);
for(var i in o.tempData)if(-1!=i.indexOf("_scan_url")){
var r=i.replace("_url","");
o.tempData[r].file_list[0].file_id?($("#"+r+"_err").hide(),a[r]=window.JSON.stringify2(o.tempData[r])):($("#"+r+"_err").show(),
a[r]="",e=!0);
}
return e===!0?(n.err("请完善表单信息"),!1):(a.name=$("#name").val().trim(),a.contact_number=$("#contact_number").val().trim(),
a.email=$("#email").val().trim(),a.company_name=$("#company_name").val().trim(),
a.company_website=$("#company_website").val().trim(),a.biz_name=$("#biz_name").val().trim(),
a.company_addr=$("#company_addr").val().trim()||"",a.post_code=$("#post_code").val().trim(),
a.card_number=$("#card_number").val().trim(),a.card_holder_name=$("#card_holder_name").val().trim(),
a.license_number=$("#license_number").val().trim(),a.biz_scope=$("#biz_scope").val().trim(),
a.org_code=$("#org_code").val().trim(),a.tax_number=$("#tax_number").val().trim(),
p(),!0);
},o.func.initUpload=function(){
setTimeout(function(){
o.dom.form2.find(".jsUpload").each(function(){
var e=$(this).attr("id");
t.uploadTmpFile({
container:"#"+e,
multi:!1,
type:2,
onSelect:function(){
o.tempData[e].file_list=[{
name:"",
file_id:""
}],o.tempData[e+"_url"]="";
},
onComplete:function(a,i,r,d){
var c=o.tempData[e].file_list[0],m=$("#"+e+"_preview");
if(0==d.base_resp.ret){
$("#"+e+"_err").hide(),m.addClass("upload_preview_loaded"),n.suc("上传成功"),c.file_id=d.content,
c.name=r.name;
var _=t.tmpFileUrl(d.content);
o.tempData[e+"_url"]=_,m.html('<a href="'+_+'" target="_blank"><img src="'+_+'" ></a>').show();
}else m.removeClass("upload_preview_loaded"),o.tempData[e+"_url"]="",o.data[e]={
name:"",
file_id:""
},m.html("").show(),n.err();
}
});
});
},0);
},o.func.modifyLink=function(e){
setTimeout(function(){
var a=$("#"+e.data("anchor")).offset();
a&&a.top&&$(window).scrollTop(a.top);
},0);
};
}();
});