define("scan/scan_barcode.js",["common/wx/Cgi.js","common/wx/inputCounter.js","common/wx/Tips.js","common/wx/tooltips.js","biz_web/utils/upload.js","common/wx/popup.js","common/wx/multiSelector.js","biz_common/jquery.validate.js","tpl/scan/barcode.html.js"],function(e){
"use strict";
function i(e){
var i=$(e),n=i.parents(".js_select_file_group"),r=i.data("type")||2,t=n.find(".upload_preview"),o=n.find(".upload_tips"),a=n.find(".upload_msg");
t.hide(),o.hide(),a.hide(),b.uploadTmpFile({
container:i,
multi:!1,
type:r,
onComplete:function(e,d,s,m){
var l=m.content||"";
0==m.base_resp.ret?(2==r&&t.show().find("img").prop("src",b.tmpFileUrl(l)),o.show().html("已上传：{name}".format({
name:s.name
})),a.hide(),i.html("重新上传"),n.find(".js_input_file_id").val(l),h.suc("上传成功")):h.err("上传失败");
}
});
}
function n(e){
$(e).find(".js_select_file").each(function(){
i($(this));
});
}
function r(){
var e=t();
return e.length<=0?(c.html("未添加厂商信息").show(),!1):x.find("input[name=js_file]").length>0&&""==x.find("input[name=js_file]").val()?(x.find(".js_frm_msg").html("请上传商户条码号段使用责任书").show(),
!1):(c.hide(),!0);
}
function t(){
var e=[],i="";
""!=x.find("input[name=js_file]").val()&&(i=x.find("input[name=js_file]").val());
for(var n in q)void 0!=q[n]&&e.push(i?{
barcode:q[n].barcode,
firm:q[n].firm,
file_id:i
}:q[n]);
for(var n in D)void 0!=D[n]&&e.push(D[n]);
return e;
}
function o(){
var e=[];
for(var i in q)void 0!=q[i]&&e.push(i);
for(var i in D)void 0!=D[i]&&e.push(i);
return e;
}
function a(){
var e=0;
for(var i in q)void 0!=q[i]&&e++;
0==e?x.empty():x.find("input").length<=0&&(x.html(_("tpl_barcode_file")),n(x));
}
function d(){}
function s(){
$(w).html(template.compile(g)()),x=$("#js_form_barcode_file"),c=$("#js_div_barcode_msg"),
f=$("#js_div_barcode_claim"),f.hide(),new v({
container:"#js_barcode_tooltips",
content:_("tpl_barcode_tooltips"),
reposition:!0,
type:"hover",
position:{
left:-138,
top:-2
},
parentClass:"pay_tips_popover"
}),y=new j({
container:"#js_div_barcode_selector",
data:[],
title:"条形码号段",
disableLevel1Select:!1,
tip:"请选择至少%s个条形码号段",
emptyTip:"你可以在上方搜索相关条形码号段",
enableSelectAll:!0,
min:1,
disableMax:!0,
onAdded:function(e){
for(var i=0;i<e.length;i++)void 0==D[e[i].id]&&(q[e[i].id]={
barcode:e[i].id,
firm:e[i].desc
});
r(),a();
},
onDeleted:function(e){
q[e.id]&&(q[e.id]=void 0),D[e.id]&&(D[e.id]=void 0),r(),a();
}
});
}
function m(){
$("#js_btn_search").on("click",function(){
return 0==$("#js_form_search").valid()?!1:void $("#js_form_search").submit();
}),$("#js_form_search").on("submit",function(){
var e=$("#js_input_search"),i=$.trim(e.val());
if(""==i)return!1;
c.hide(),f.hide();
var n={};
return i.match(/^\d+$/g)?n.barcode=i:n.firm=i,u.get({
url:"/merchant/scanapply?action=getfirminfo",
data:n,
mask:!1
},function(e){
if(0==e.base_resp.ret)if(e.firm_info&&e.firm_info.length>0){
for(var i=[],n=[],r=0;r<e.firm_info.length;r++){
var t={
id:e.firm_info[r].barcode,
name:e.firm_info[r].barcode,
desc:e.firm_info[r].firm,
ret:e.firm_info[r].ret
};
14153==e.firm_info[r].ret&&(t.name+="(已被认领)",n.push(e.firm_info[r].barcode)),i.push(t);
}
y.setData(i),y.setDisabledItemsByID(o()),y.setDisabledItemsByID(n),n.length>0&&f.show();
}else y.container.find(".jsEmptyTip").html("没有相关的条码号段，请手动添加"),y.setData([]);else h.err(14151==e.base_resp.ret?"请输入完整的商标名称，当前商标名称不符合查询规范":"提交失败，请重试");
}),!1;
}),$(".js_btn_add_barcode").on("click",function(){
$("#tpl_add_barcode").popup({
width:960,
title:"手动添加条形码号段信息",
buttons:[{
text:"添加",
type:"primary",
click:function(){
var e=$("#js_form_add_barcode");
if(0==e.valid())return void h.err("请完善条形码号段信息");
var i={
barcode:e.find("input[name=barcode]").val(),
firm:e.find("input[name=firm]").val(),
file_id:e.find("input[name=file]").val()
};
D[i.barcode]=i,y.addSelectedItems([{
id:i.barcode,
name:i.barcode+"(手动添加)",
desc:i.firm
}]),h.suc("添加成功"),this.remove();
}
},{
text:"取消",
click:function(){
this.remove();
}
}],
onShow:function(){
this.get();
new p("#js_input_firm",{
maxlength:20
}),n("#js_form_add_barcode"),$("#js_form_add_barcode").validate({
ignore:".js_input_ignore",
rules:{
barcode:{
required:!0,
number:!0,
minlength:7,
maxlength:10,
barcode_exist:!0
},
firm:{
required:!0,
maxlength:20
},
js_file:{
required:!0
}
},
messages:{
barcode:{
required:"请填写识别代码",
number:"识别代码应为数字",
minlength:"识别代码不能少于7位",
maxlength:"识别代码不能多于10位",
barcode_exist:"识别代码已添加"
},
firm:{
required:"请填写厂商名称",
maxlength:"厂商名称不能超过20个字"
},
js_file:{
required:"请上传文件"
}
},
errorPlacement:function(e,i){
var n=i.parent().parent();
n.find(".js_frm_msg").html(e.html()).show();
}
});
},
onHide:function(){
this.remove();
},
className:""
});
});
}
function l(){
function e(e,i){
var n=i.parent().parent();
n.find(".js_frm_msg").html(e.html()).show();
}
$.validator.addMethod("barcode_exist",function(e){
for(var i=t(),n=0,r=0;r<i.length;r++)i[r].barcode==e&&n++;
return 0==n?!0:!1;
}),$.validator.addMethod("barcode_valid",function(e){
return e.match(/^\d+$/g)?e.match(/^69[2-9]/g)?e.length>=8?!0:!1:e.length>=7?!0:!1:!0;
}),$("#js_form_search").validate({
rules:{
search:{
required:!0,
barcode_valid:!0
}
},
messages:{
search:{
required:"请输入条码号段、条形码或商标名称",
barcode_valid:"请输入正确的条码号段、条形码或商标名称"
}
},
errorPlacement:e
}),x.validate({
rules:{
js_file:{
required:!0
}
},
messages:{
js_file:{
required:"请上传文件"
}
},
errorPlacement:function(e,i){
$(i).parent().find(".js_frm_msg").html(e);
}
});
}
var c,f,u=(wx.T,e("common/wx/Cgi.js")),_=template.render,p=e("common/wx/inputCounter.js"),h=e("common/wx/Tips.js"),v=e("common/wx/tooltips.js"),b=e("biz_web/utils/upload.js"),j=(e("common/wx/popup.js"),
e("common/wx/multiSelector.js")),g=(e("biz_common/jquery.validate.js"),e("tpl/scan/barcode.html.js")),w=null,x=null,y=null,q={},D={};
return{
barcodeList:q,
barcodeAddList:D,
init:function(e){
w=e,d(),s(),m(),l();
},
valid:function(){
return r();
},
getBarcodes:t
};
});