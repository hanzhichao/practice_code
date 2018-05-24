define("ad_system/client_bill.js",["biz_web/ui/dropdown.js","common/wx/Cgi.js","biz_common/jquery.validate.js","biz_web/ui/checkbox.js","common/wx/region.js","common/wx/Tips.js","biz_web/utils/upload.js","common/wx/dialog.js","ad_system/helper.js","common/wx/top.js"],function(e){
"use strict";
function r(){
$("input[type=radio]").checkbox(),p=$(".jsForm1").validate({
rules:{
head:{
required:!0
},
address:{
required:!0
},
contact:{
required:!0,
maxlength:10
},
code:{
required:!0,
number:!0
},
phone:{
required:!0,
number:!0
}
}
}),f=$(".jsForm2").validate({
rules:{
taxpayer_id:{
required:!0
},
corp_addr:{
required:!0
},
corp_tel:{
required:!0
},
bank_name:{
required:!0
},
bank_acct:{
required:!0
}
}
});
}
function t(){
v=new c(wx.cgiData.hasBill?{
container:"#area",
data:{
country:"中国",
province:wx.cgiData.bill.province,
city:wx.cgiData.bill.city
},
onChange:function(){
$("#area").children().eq(0).hide();
}
}:{
container:"#area",
data:{
country:"中国"
},
onChange:function(){
$("#area").children().eq(0).hide();
}
}),Object.each(wx.cgiData.bill,function(e,r){
e&&r&&(e+="",$("form").find("input[name="+r+"]").val(e.html(!1)));
}),1==wx.cgiData.type&&a(),wx.cgiData.bill.permit_acct&&(_=wx.cgiData.bill.permit_acct,
$("#view1").html('<a href="{href}" target="_blank"><img src="{src}"></a>'.format({
href:_,
src:_
}))),wx.cgiData.bill.taxpayer_qual&&(b=wx.cgiData.bill.taxpayer_qual,$("#view2").html('<a href="{href}" target="_blank"><img src="{src}"></a>'.format({
href:b,
src:b
})));
}
function a(){
0==h&&(h=!0,u({
container:"#upload1",
type:2,
multi:!1,
onComplete:function(e,r,t,a){
switch(+a.base_resp.ret){
case 0:
l.suc("上传成功"),_=a.content,$("#view1").html('<a href="{href}" target="_blank"><img src="{src}"></a>'.format({
href:a.content,
src:a.content
}));
break;

case 1:
l.err("图片太大");
break;

case 200011:
l.err("请上传合法的图片格式");
break;

default:
l.err("上传图片失败");
}
}
}),u({
container:"#upload2",
type:2,
multi:!1,
onComplete:function(e,r,t,a){
switch(+a.base_resp.ret){
case 0:
l.suc("上传成功"),b=a.content,$("#view2").html('<a href="{href}" target="_blank"><img src="{src}"></a>'.format({
href:a.content,
src:a.content
}));
break;

case 1:
l.err("图片太大");
break;

case 200011:
l.err("请上传合法的图片格式");
break;

default:
l.err("上传图片失败");
}
}
}));
}
function i(){
$("input[type=radio]").change(function(){
0==$(this).data("value")?$(".jsForm2").hide():($(".jsForm2").show(),a());
}),$("#saveBt").click(function(){
var e=0,r={};
if(1==$("input[type=radio][checked=checked]").data("value")){
if(e=1,!f.form())return void $(window).scrollTop($(f.errorList[0].element).offset().top-10);
if(!_)return $(window).scrollTop($("#upload1").offset().top-10),void l.err("请上传企业开户许可证");
if(!b)return $(window).scrollTop($("#upload2").offset().top-10),void l.err("请上传《税务登记证副本》或《一般纳税人资格证书》");
}
if(!p.form())return void $(window).scrollTop($(p.errorList[0].element).offset().top-10);
var t=v.getAll(!0);
return null==t.province||-1==t.province?($(window).scrollTop($("#area").offset().top-10),
void l.err("请选择省份")):null==t.city||-1==t.city?($(window).scrollTop($("#area").offset().top-10),
void l.err("请选择城市")):(r={
hasBill:1,
head:$(p.currentForm).find("input[name=head]").val(),
contact:$(p.currentForm).find("input[name=contact]").val(),
province:t.province,
city:t.city,
address:$(p.currentForm).find("input[name=address]").val(),
phone:$(p.currentForm).find("input[name=phone]").val(),
code:$(p.currentForm).find("input[name=code]").val()
},void(0==e?n(e,r):s.show({
type:"warn",
msg:"确认提交|确定提交后,我们将对信息进行审核,审核大约需要48小时。请耐心等待",
buttons:[{
text:"确定",
click:function(){
n(e,r,{
taxpayer_id:$(f.currentForm).find("input[name=taxpayer_id]").val(),
corp_addr:$(f.currentForm).find("input[name=corp_addr]").val(),
corp_tel:$(f.currentForm).find("input[name=corp_tel]").val(),
bank_name:$(f.currentForm).find("input[name=bank_name]").val(),
bank_acct:$(f.currentForm).find("input[name=bank_acct]").val(),
permit_acct:_,
taxpayer_qual:b
}),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
})));
});
}
function n(e,r,t){
var a={
need_invoice:r.hasBill,
invoice_title:r.head,
invoice_receiver:r.contact,
invoice_receiver_province:r.province,
invoice_receiver_city:r.city,
invoice_receiver_addr:r.address,
invoice_receiver_mobile:r.phone,
post_code:r.code,
type:e
};
1==e&&$.extend(a,t),w||($("#saveBt").btn(!1),w=!0,o.post({
url:"/merchant/ad_client_pay?action=update_invoice",
data:a
},function(e){
$("#saveBt").btn(!0),w=!1,0==e.base_resp.ret?window.location="/cgi-bin/frame?nav=10026&t=ad_system/host_frame&tab=bill&token="+wx.data.t+"&lang=zh_CN":l.err();
}));
}
var o=(e("biz_web/ui/dropdown.js"),e("common/wx/Cgi.js"));
e("biz_common/jquery.validate.js"),e("biz_web/ui/checkbox.js");
var c=e("common/wx/region.js"),l=e("common/wx/Tips.js"),d=e("biz_web/utils/upload.js"),s=e("common/wx/dialog.js"),u=d.uploadCdnFile,m=(e("ad_system/helper.js"),
e("common/wx/top.js"));
new m("#topTab",m.DATA.adClient).selected("adclientpay");
var p,f,v,_,b,h=!1,w=!1;
!function(){
r(),t(),i();
}();
});