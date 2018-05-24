define("device/create.js",["common/wx/Tips.js","common/wx/Cgi.js","biz_web/ui/dropdown.js","biz_web/ui/checkbox.js","biz_web/utils/upload.js","common/wx/Step.js","common/qq/jquery.plugin/zclip.js","biz_common/jquery.validate.js"],function(e){
"use strict";
var a,t=(wx.T,template.render),n=e("common/wx/Tips.js"),s=e("common/wx/Cgi.js"),i=e("biz_web/ui/dropdown.js"),c=(e("biz_web/ui/checkbox.js"),
e("biz_web/utils/upload.js")),l=e("common/wx/Step.js"),d=wx.cgiData||{},r={
view:"",
acct_status:"",
dev_acct_info:{},
data:{}
},o={
firstClassDD:null,
secondClassDD:null,
connect_type:null
},u=$.extend({},r,d);
e("common/qq/jquery.plugin/zclip.js"),e("biz_common/jquery.validate.js"),function(){
function e(){
c.uploadTmpFile({
container:"#js_productfile",
multi:!0,
type:6,
queueSizeLimit:5,
canContinueUpload:function(){
var e=$("#js_productfile_preview"),a=+(e.data("count")||0),t=+(e.data("queue")||0);
return a+t>=5?(n.err("最多可上传5个文件"),!1):(e.data("queue",t+1),!0);
},
onComplete:function(e,a,t,n){
var s=n.content||"";
if(0==n.base_resp.ret&&s){
var i=t.name,l=t.size,d=t.type.indexOf("pdf")>-1?!1:!0,r="KB",o=.01*Math.round(l/1024*100);
o>1e3&&(o=.01*Math.round(.001*o*100),r="MB");
var u=o.toFixed(2)+r,_=c.tmpFileUrl(s),p=$("#js_productfile_preview"),m=$('<li class="upload_file"><strong class="upload_file_name">{name}</strong><span class="upload_file_size">({size})</span><a href="{url}" class="js_file" target="_blank"{download} data-id="{id}">查看</a>&nbsp;<a href="javascript:;" class="js_del">删除</a></li>'.format({
name:i,
size:u,
url:_,
id:s,
download:d?"":" download"
}));
m.find(".js_del").on("click",function(){
$(this).parent().remove();
var e=$("#js_productfile_preview"),a=e.find("li").length;
e.data("count",a).data("queue",0);
}),p.append(m);
}
},
onAllComplete:function(){
var e=$("#js_productfile_preview"),a=e.find("li").length;
e.data("count",a).data("queue",0);
}
});
}
if(u.view||[4,5,6].indexOf(+u.acct_status)>-1?u.type="view":u.dev_acct_info.product_name?u.type="edit":(u.type="create",
u.data.email=u.dev_acct_info.email||""),"create"!=u.type){
u.data=u.dev_acct_info,u.data.product_kind=u.dev_acct_info.primary_class&&u.dev_acct_info.primary_class.desc?u.dev_acct_info.primary_class.desc+"-"+u.dev_acct_info.secondary_class.desc:"";
for(var d=u.dev_acct_info.cert_info&&u.dev_acct_info.cert_info.conn_type?u.dev_acct_info.cert_info.conn_type:[],r=[],_=[],p=0,m=d.length;m>p;p++)r.push(d[p].desc),
_.push(""+d[p].id);
u.data.conns=r.join(","),u.data.connid=_;
for(var f=u.dev_acct_info.product_attachment,v=[],p=0,m=f.length;m>p;p++){
var h=f[p]?c.mediaFileUrl(f[p])+"&attach=1":"";
h&&v.push({
name:"附件"+(p+1),
id:f[p],
href:h
});
}
u.data.attachs=v;
}
if("view"==u.type)$("#js_step0").html(t("tpl_view",u.data)).show();else{
var j=new l({
container:"#js_process",
selected:1,
names:["1 服务协议及资质审核标准","2 填写资料"]
});
$("#js_step1").show(),$("#js_agree").on("click",function(){
if(!$(this).hasClass("btn_disabled")){
$("#js_step1").hide();
var a=$("#js_step2");
a.show(),a.data("bind")||(a.data("bind",!0),e()),j.setStep(2);
}
}),$(".js_step1_check").checkbox({
onChanged:function(e){
e.attr("checked")?$("#js_agree").removeClass("btn_disabled"):$("#js_agree").addClass("btn_disabled");
}
}),$("#js_prev").on("click",function(){
$("#js_step2").hide(),$("#js_step1").show(),j.setStep(1);
});
var b=[{
name:"可穿戴式设备",
value:"100"
},{
name:"智能家居",
value:"200"
},{
name:"智能家电",
value:"300"
},{
name:"智能健康医疗",
value:"400"
},{
name:"智能车载",
value:"500"
},{
name:"智能玩具",
value:"600"
}],w=[[{
name:"智能手环",
value:"101"
},{
name:"智能手表",
value:"102"
},{
name:"智能配式（耳机等）",
value:"103"
},{
name:"运动跟踪器",
value:"104"
},{
name:"智能眼镜",
value:"105"
},{
name:"其他",
value:"1"
}],[{
name:"智能灯泡",
value:"201"
},{
name:"智能插座",
value:"202"
},{
name:"智能开关",
value:"203"
},{
name:"智能安防",
value:"204"
},{
name:"其他",
value:"1"
}],[{
name:"智能电视",
value:"301"
},{
name:"智能空调",
value:"302"
},{
name:"智能微波炉",
value:"303"
},{
name:"其他",
value:"1"
}],[{
name:"电子秤",
value:"401"
},{
name:"血压计",
value:"402"
},{
name:"血糖计",
value:"403"
},{
name:"脂肪秤",
value:"404"
},{
name:"体温计",
value:"405"
},{
name:"其他",
value:"1"
}],[{
name:"OBD",
value:"501"
},{
name:"中控",
value:"502"
},{
name:"其他",
value:"1"
}],[{
name:"智能毛绒布艺",
value:"601"
},{
name:"遥控/电动",
value:"602"
},{
name:"益智/早教",
value:"603"
},{
name:"DIY玩具",
value:"604"
},{
name:"其他",
value:"1"
}]];
if(o.firstClassDD=new i({
container:".js_class1",
label:"请选择",
data:b,
callback:function(e){
var a=+e/100-1;
w[a]&&(o.secondClassDD=new i({
container:".js_class2",
label:"请选择",
data:w[a]
}));
}
}),u.data.product_kind&&"create"!=u.type){
var y=$(".js_hasclass");
y.find("span").text(u.data.product_kind),y.find("a").on("click",function(){
$(".js_hasclass").hide(),$(".js_noclass").show();
}),y.show();
}else $(".js_noclass").show();
if(o.connect_type=$(".js_connect_type").find("input").checkbox({
multi:!0
}),a=$("#js_step2").find("form").validate({
rules:{
product_name:{
required:!0
},
price:{
required:!0,
number:!0
},
sale_url:{
url:!0
},
product_desc:{
required:!0
},
email:{
required:!0,
email:!0
}
},
messages:{
product_name:{
required:"请输入产品名称"
},
price:{
required:"请输入市场售价",
number:"市场售价必须是纯数字"
},
sale_url:{
url:"产品销售链接格式不合法"
},
product_desc:{
required:"请输入产品说明"
},
email:{
required:"请输入联系邮箱",
email:"联系邮箱格式不合法"
}
}
}),"edit"==u.type){
u.data.product_name&&$("input[name=product_name]").val(u.data.product_name.html(!1)),
u.data.price&&$("input[name=price]").val(u.data.price.html(!1)),u.data.sale_url&&$("input[name=sale_url]").val(u.data.sale_url.html(!1)),
u.data.product_desc&&$("textarea[name=product_desc]").val(u.data.product_desc.html(!1)),
u.data.email&&$("input[name=email]").val(u.data.email.html(!1)),u.data.connid.length>0&&o.connect_type.adjust(u.data.connid);
for(var g=$("#js_productfile_preview"),p=0,m=u.data.attachs.length;m>p;p++){
var q=u.data.attachs[p].id,x=u.data.attachs[p].name,k=u.data.attachs[p].href,z=$('<li class="upload_file"><strong class="upload_file_name">{name}</strong><span class="upload_file_size"></span><a href="{url}" class="js_file" target="_blank" data-id="{id}">查看</a>&nbsp;<a href="javascript:;" class="js_del">删除</a></li>'.format({
name:x,
url:k,
id:q
}));
z.find(".js_del").on("click",function(){
$(this).parent().remove();
var e=$("#js_productfile_preview"),a=e.find("li").length;
e.data("count",a).data("queue",0);
}),g.append(z);
}
}
"create"==u.type&&u.data.email&&$("input[name=email]").val(u.data.email),$("#js_submit").on("click",function(){
var e=$(this);
if(e.btn(!1),!a.form())return void e.btn(!0);
var t=[];
if($("#js_productfile_preview").find(".js_file").each(function(){
t.push($(this).data("id"));
}),0==t.length)return $(".js_productfile_fail").show(),void e.btn(!0);
$(".js_productfile_fail").hide();
var i=$("#js_step2").find("form").serialize().param(!0);
if(i.primary_class={},i.secondary_class={},i.product_attachment=t,i.cert_info={
conn_type:[]
},$(".js_hasclass").is(":visible"))i.primary_class.id=u.dev_acct_info.primary_class.id,
i.secondary_class.id=u.dev_acct_info.secondary_class.id;else{
var c=o.firstClassDD?o.firstClassDD.value:"",l=o.secondClassDD?o.secondClassDD.value:"";
if($(".js_class_fail").hide(),!c)return $(".js_class_fail").text("请选择一级类别").show(),
e.btn(!0),!1;
if(i.primary_class.id=c,!l)return $(".js_class_fail").text("请选择二级类别").show(),e.btn(!0),
!1;
i.secondary_class.id=l;
}
var d=o.connect_type.values(),r=d.length,_=[];
if(!(r>0))return $(".js_connect_typefail").show(),e.btn(!0),!1;
$(".js_connect_typefail").hide();
for(var p=0;r>p;p++)_.push({
id:d[p]
});
i.cert_info.conn_type=_,s.post({
url:wx.url("/device/device_func_apply?action=submit_base_info"),
data:{
req_data:JSON.stringify2(i)
},
mask:!1
},function(a){
if(!a||!a.base_resp)return n.err("系统错误，请重试"),void e.btn(!0);
switch(+a.base_resp.ret){
case 0:
n.suc("提交成功"),$("#js_step2").hide(),$("#js_result").show(),$(".js_copy").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
return"广东省 广州市 海珠区 新港中路397号 TIT创意园腾讯自编四号楼 刘东升 （收）";
},
afterCopy:function(){
n.suc("复制成功");
}
}),$(".js_redirect").on("click",function(){
location.href=wx.url("/device/getdeviceinfo?action=detail&t=device/device_func");
}),e.btn(!0);
break;

default:
n.err("提交失败，请重试"),e.btn(!0);
}
});
});
}
}();
});