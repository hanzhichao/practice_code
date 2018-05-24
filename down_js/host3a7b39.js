define("ad_system/host.js",["common/wx/Step.js","biz_web/ui/checkbox.js","common/wx/Cgi.js","common/wx/popup.js","common/wx/Tips.js","ad_system/helper.js","biz_web/utils/upload.js","biz_common/jquery.validate.js","common/wx/multiSelector/industry.js","common/wx/region.js","common/wx/dialog.js","biz_web/ui/dropdown.js","common/wx/autocomplete.js"],function(a){
"use strict";
function e(){
$(".jsUp").hide(),$(".jsUp[data-pType="+wx.cgiData.pType+"][data-type="+wx.cgiData.type+"]").show(),
$(".jsUp[data-pType="+wx.cgiData.pType+"][data-type="+wx.cgiData.type+"][data-init!=0]").each(function(a,e){
var n=$(e).data("init",1).find(".jsUpload");
l({
container:"#"+n.attr("id"),
type:2,
multi:!1,
onComplete:function(a,e,t,i){
switch(+i.base_resp.ret){
case 0:
r.suc("上传成功"),m[n.data("name")]=i.content,n.parent().siblings(".jsView").html('<a href="{href}" target="_blank"><img src="{src}"></a>'.format({
href:i.content,
src:i.content
}));
break;

case 1:
r.err("图片太大");
break;

case 200011:
r.err("请上传合法的图片格式");
break;

default:
r.err("上传图片失败");
}
}
});
});
}
function n(a){
var e=a.biztag_list.split(",");
e[0]&&_.selected(e[0]+""),e[1]&&w.selected(e[1]+""),e[2]&&h.selected(e[2]+""),$("input[type=radio][data-value="+a.new_publisher_type+"]").click(),
$("input[name=bank]").val(a.bank_name),$("input[name=account]").val(a.account),$("input[name=reaccount]").val(a.account),
$("input[name=email]").val(a.email),$("input[name=reemail]").val(a.email),$("input[name=phone]").val(a.phone),
$("input[name=address]").val(a.address),$("input[name=contact]").val(a.contact),
$("input[name=bank_account_name]").val(a.bank_account_name),$("input[name=identity]").val(a.identity_card_num);
var n=["bank_account_stuff","name_change_stuff","tri_agreement","new_identity_image","bank_no_image","orig_authorized_proof","orig_identity_image"];
n.each(function(e){
a[e]&&(m[e]=a[e],$(".jsUp[data-pType="+wx.cgiData.pType+"][data-type="+wx.cgiData.type+"]").find(".jsUpload[data-name="+e+"]").parent().siblings(".jsView").show().html('<a href="{href}" target="_blank"><img src="{src}"></a>'.format({
href:a[e],
src:a[e]
})));
});
}
var t=a("common/wx/Step.js");
a("biz_web/ui/checkbox.js");
var i=a("common/wx/Cgi.js");
a("common/wx/popup.js");
var r=a("common/wx/Tips.js"),c=(a("ad_system/helper.js"),a("biz_web/utils/upload.js"));
a("biz_common/jquery.validate.js");
var o=(a("common/wx/multiSelector/industry.js"),a("common/wx/region.js"));
a("biz_web/ui/checkbox.js");
var s=a("common/wx/dialog.js"),u=a("biz_web/ui/dropdown.js");
a("biz_web/ui/checkbox.js"),a("common/wx/autocomplete.js");
var c=a("biz_web/utils/upload.js"),l=c.uploadCdnFile;
$("input[type=radio]").checkbox({
onChanged:function(a){
wx.cgiData.type=a.data("value"),1==wx.cgiData.pType&&(0!=wx.cgiData.type?($("input[name=bank_account_name]").attr("disabled",!1).val("").parent().removeClass("disabled"),
$("input[name=identity]").attr("disabled",!1).val("").parent().removeClass("disabled")):($("input[name=bank_account_name]").val(wx.cgiData.name).attr("disabled",!0).parent().addClass("disabled"),
$("input[name=identity]").val(wx.cgiData.identity).attr("disabled",!0).parent().addClass("disabled"))),
2==wx.cgiData.pType&&(0==wx.cgiData.type?($("input[name=bank_account_name]").val(wx.cgiData.name).attr("disabled",!0).parent().addClass("disabled"),
$("input[name=identity]").parent().parent().parent().hide()):1==wx.cgiData.type?($("input[name=bank_account_name]").attr("disabled",!1).val("").parent().removeClass("disabled"),
$("input[name=identity]").parent().parent().parent().hide()):2==wx.cgiData.type&&($("input[name=bank_account_name]").attr("disabled",!1).val("").parent().removeClass("disabled"),
$("input[name=identity]").val("").parent().parent().parent().show())),y&&y.form(),
m={},$(".jsView").html(""),e();
}
});
var d,m={};
"undefined"!=typeof _ad_bank_name&&(d=_ad_bank_name,$("input[name=bank]").autocomplete({
appendTo:".jsAutoBankName",
source:d.split(",")
}));
var p=new o({
container:"#area",
data:{
country:"中国",
province:wx.cgiData.info&&wx.cgiData.info.province,
city:wx.cgiData.info&&wx.cgiData.info.city
},
onChange:function(){
$("#area").children().eq(0).hide();
}
}),b=new t({
container:"#step",
names:["1 同意协议","2 选择流量主标签","3 完善财务资料"]
}),v=[{
value:"1",
name:"时事热点"
},{
value:"2",
name:"科技互联网"
},{
value:"3",
name:"企业&职场"
},{
value:"4",
name:"生活科普"
},{
value:"5",
name:"家居装修"
},{
value:"6",
name:"文学艺术"
},{
value:"7",
name:"财经理财"
},{
value:"8",
name:"商务服务&生活服务"
},{
value:"9",
name:"汽车"
},{
value:"10",
name:"房产"
},{
value:"11",
name:"孕产育儿"
},{
value:"12",
name:"影音动漫"
},{
value:"13",
name:"美食攻略"
},{
value:"14",
name:"时尚美容"
},{
value:"15",
name:"健康养生"
},{
value:"16",
name:"旅游攻略"
},{
value:"17",
name:"教育行业"
},{
value:"18",
name:"星座&心理测试"
},{
value:"19",
name:"娱乐笑话"
},{
value:"20",
name:"励志箴言"
},{
value:"21",
name:"人文宗教"
},{
value:"22",
name:"其他"
}],_=new u({
container:"#industry1",
label:"请选择",
data:v,
callback:function(){}
}),w=new u({
container:"#industry2",
label:"请选择",
data:v,
callback:function(){}
}),h=new u({
container:"#industry3",
label:"请选择",
data:v,
callback:function(){}
});
$("#agree").checkbox(),$("#agree").change(function(){
$(this).prop("checked")?$("#agreeBt").addClass("btn_primary").removeClass("btn_disabled"):$("#agreeBt").removeClass("btn_primary").addClass("btn_disabled");
}),$("#agreeBt").click(function(){
if("0"==wx.cgiData.account_version){
if($(this).hasClass("btn_primary")){
s.show({
type:"warn",
msg:"申请流量主功能前请再次确认主体信息，申请流量主功能后将不能修改主体信息。",
mask:!0,
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove(),b.go(2),$("#step2").show().siblings().hide();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
}
}else $(this).hasClass("btn_primary")&&(b.go(2),$("#step2").show().siblings().hide());
}),$("#pre").click(function(){
$("#step2").show().siblings().hide(),b.go(2);
}),$("#back").click(function(){
$("#step1").show().siblings().hide(),b.go(1);
}),$("#next").click(function(){
return _.value?($("#step3").show().siblings().hide(),e(),void b.go(3)):void r.err("请选择公众号主标签");
});
var y=$("#form").validate({
rules:{
bank_account_name:{
required:!0
},
identity:{
required:!0
},
email:{
email:!0,
required:!0
},
reemail:{
equalTo:"input[name='email']"
},
bank:{
required:!0,
bank:!0
},
account:{
required:!0,
number:!0
},
reaccount:{
equalTo:"input[name='account']"
},
phone:{
required:!0,
number:!0
},
address:{
required:!0
},
contract:{
required:!0
}
},
messages:{
bank_account_name:{
required:"请输入开户名称"
},
identity:{
required:"请输入开户人身份证号"
},
email:{
email:"邮箱地址不合法",
required:"请输入邮箱地址"
},
reemail:{
equalTo:"2次输入的邮箱地址不一致"
},
bank:{
required:"请输入开户银行信息",
bank:"所填银行不存在，请重新填写，或发送邮件到wxad@tencent.com申请添加"
},
account:{
required:"请输入开户银行账号",
number:"银行账号必须是纯数字"
},
reaccount:{
equalTo:"2次输入的银行账号不一致"
},
phone:{
required:"联系电话不能为空",
number:"联系电话必须是数字"
},
address:{
required:"联系地址不能为空"
},
contract:{
required:"联系人不能为空"
}
}
});
$.validator.addMethod("bank",function(a){
return(","+d+",").indexOf(","+a.trim()+",")>0;
}),$("#submit").click(function(){
var a="";
a=_.value,w.value&&(a+=","+w.value),h.value&&(a+=","+h.value);
var e=!1;
if($(".jsUp[data-pType="+wx.cgiData.pType+"][data-type="+wx.cgiData.type+"]").each(function(a,n){
return m[$(n).find(".jsUpload").data("name")]?void 0:(e=!0,!1);
}),e)return void r.err("你需要上传的资料不完善，请补齐全部材料后再提交申请");
if(y.form()){
var n=p.getAll(!0);
if(null==n.province||-1==n.province)r.err("请选择省份");else if(null==n.city||-1==n.city)r.err("请选择城市");else{
if((","+d+",").indexOf(","+$(y.currentForm).find("input[name=bank]").val()+",")>0){
var t={
new_publisher_type:wx.cgiData.type,
biztag_list:a,
bank_name:$(y.currentForm).find("input[name=bank]").val(),
account:$(y.currentForm).find("input[name=account]").val(),
email:$(y.currentForm).find("input[name=email]").val(),
phone:$(y.currentForm).find("input[name=phone]").val(),
address:$(y.currentForm).find("input[name=address]").val(),
contact:$(y.currentForm).find("input[name=contact]").val(),
city:n.city,
province:n.province
};
return $.extend(t,m),t.bank_account_name=$("input[name=bank_account_name]").val(),
0!=wx.cgiData.type&&(t.identity_card_num=$("input[name=identity]").val()),void $(template.render("tpl",t)).popup({
buttons:[{
text:"确认",
click:function(){
var a=this;
i.post({
url:"/merchant/ad_host?action=open",
data:t
},function(e){
a.hide(),0==e.base_resp.ret?(window.location=wx.url("/merchant/ad_host_index"),$("#step").hide(),
$("#step4").show().siblings().hide()):r.err();
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
},
type:"default"
}]
});
}
r.err("请输入正确的开户银行名称");
}
}
}),3==wx.cgiData.host_status&&n(wx.cgiData.info);
});