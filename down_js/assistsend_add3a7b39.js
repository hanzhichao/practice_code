define("cardticket/assistsend_add.js",["common/wx/popup.js","common/wx/Tips.js","common/wx/Cgi.js","biz_common/moment.js","biz_web/ui/dropdown.js","biz_common/jquery.validate.js","common/wx/media/imageDialog.js","biz_web/ui/dateRange.js","biz_web/ui/checkbox.js","biz_web/utils/upload.js","cardticket/common_validate.js","cardticket/common_template_helper.js","common/wx/stopMultiRequest.js","cardticket/topmenu.js"],function(e){
"use strict";
function t(e){
function t(e){
$(e.container).on("keyup",function(){
var t=$.trim($(this).val());
$(e.hint).text(Math.round(p.strlen(t)/2)||0);
}).keyup();
}
$(e.container||".js_maxlength").each(function(){
var e=$(this).attr("data-maxlength"),a=$(this).attr("target");
e&&t({
container:this,
hint:a,
max:e
});
}).keyup();
}
function a(){
$(".js_upload_dialog").click(function(){
var e=this.id;
return u({
maxSelect:1,
desc:"建议尺寸：300像素 * 300像素",
onOK:function(t){
if(console.log(t),t.length){
var a=t[0].url;
$("#"+e+"_hidden").val(a.https2http()),$("#"+e+"_preview").html("<img src='%s'>".sprintf(a)).closest(".js_control_item").find(".fail").remove(),
d.suc("上传成功"),this.destroy();
}
},
onCancel:function(){
this.destroy();
}
}),!1;
}),$(".js_select_files").each(function(){
var e=$(this),t=e.attr("id"),a=e.attr("inited");
if(!a){
e.attr("inited",1);
var i,n=e.attr("data-type");
i="media"==n?h.uploadTmpFile:h.uploadCdnFile,function(e,t){
i({
container:"#"+e,
multi:!1,
type:2,
onComplete:function(a,i,n,r){
var o,c=r.content||"";
0==r.base_resp.ret&&("media"==t?(o=h.tmpFileUrl(c),c="temp_"+c):(o=c.http2https(),
c=c.https2http()),$("#"+e+"_preview").html('<img style="width:260px;" src="%s">'.sprintf(o)),
$("#"+e+"_hidden").val(c).closest(".js_control_item").find(".fail").remove(),d.suc("上传成功"));
}
});
}(t,n);
}
});
}
function i(){
$("#js_add_form").validate({
rules:{
brand_name:{
required:!0,
utf8byteMaxLength:24
},
logo:{
required:!0
},
protocol:{
required:function(){
return $(".js_has_auth_file_check:checked").length;
}
},
primary_category_id:{
required:!0
},
secondary_category_id:{
required:!0
},
end_time:{
required:!0
},
has_auth_file:{
required:!0
},
agreement_pic:{
required:function(){
return"0"==$(".js_has_auth_file_check:checked").val();
}
},
operator_pic:{
required:function(){
return"0"==$(".js_has_auth_file_check:checked").val();
}
}
},
messages:{
brand_name:"商户名称不能为空且长度不超过12个汉字或24个英文字母",
logo:{
required:"请上传文件"
},
protocol:{
required:"请上传文件"
},
primary_category_id:{
required:"请选择卡券类目"
},
secondary_category_id:{
required:"请选择卡券类目"
},
end_time:{
required:"请选择截止时间"
},
has_auth_file:{
required:"请选择授权函"
},
agreement_pic:{
required:"请上传文件"
},
operator_pic:{
required:"请上传文件"
}
},
errorPlacement:function(e,t){
var a=t.closest(".js_control_item");
a.find(".fail").remove();
var i=a.find(".frm_tips");
t.is(".file_field")?e.insertBefore(a.find(".upload_preview")):i.length?e.insertAfter(i):a.append(e);
},
ignore:[],
submitHandler:function(){
e();
}
});
var e=function(){
var e=$("#js_add_form");
if(!t&&e.valid()){
var a=e.serializeObject();
if(!a.begin_time)return void d.err("请选择时间");
a.end_time=parseInt(a.end_time)+86400-1,t=!0,c.post({
url:"/merchant/cardhelpmakesend",
data:a,
btn:$(this),
complete:function(){
t=!1;
}
},function(e){
0==e.base_resp.ret?(d.suc("已提交审核"),location.href=wx.url("/merchant/cardstat?action=overviewpage")):201005==e.base_resp.ret?d.err("商户名称不能为空且长度不超过12个汉字或24个英文字母"):1009==e.base_resp.ret?d.err("该公众号未认证或不存在"):c.handleRet(e,{
id:64463,
key:43,
url:"/merchant/cardhelpmakesend"
});
});
}
};
$("#js_add_submit").click(e);
var t=!1;
}
function n(e){
function t(e){
return _(e,n).format("YYYY.MM.DD");
}
var a=$("#js_hidden_begintime"),i=$("#js_hidden_endtime"),n="YYYY-MM-DD",r=_().format(n),o=(_().add("d",1).format(n),
_().add("M",1).format(n)),d=e.data.BeginTime?_.unix(e.data.BeginTime).format(n):r,c=e.data.EndTime?_.unix(e.data.EndTime).format(n):o,s=l({
container:"#js_time_container",
stopToday:!1,
isTodayValid:!0,
minValidDate:_().add("d",-1).unix(),
startDate:e.data.EndTime?c:d,
endDate:e.data.EndTime?c:d,
defaultText:"-",
theme:"ta",
monthRangeMax:120,
autoSubmit:!0,
isSingleDay:!0,
success:function(e){
$("#"+s.inputId).html(t(e.endDate)),a.val(_().unix()),i.val(_(e.endDate,n).unix()),
a.closest(".js_control_item").find(".fail").hide();
}
});
e.data.BeginTime?($("#"+s.inputId).html(t(c)),a.val(_(d,n).unix()),i.val(_(c,n).unix())):($("#"+s.inputId).html("请选择时间"),
$("#"+s.nextMonth).click());
}
function r(e){
function t(e){
for(var t=[],n=0;n<e.length;n++)0!=e[n].status&&(t.push({
name:e[n].category_name,
value:e[n].primary_category_id
}),d[e[n].primary_category_id]=e[n]);
i=new m({
container:"#js_primary_category",
data:t,
callback:function(e,t){
$("#js_primary_category_hidden").val(e),a(e,t);
}
}).selected(f?o.PrimaryCategoryId+""||0:0),f=!1;
}
function a(e){
var t=d[e]&&d[e].secondary_category;
t||(t=[]);
for(var a=[],i=0;i<t.length;i++)0!=t[i].status&&(a.push({
name:t[i].category_name,
value:t[i].secondary_category_id
}),c[t[i].secondary_category_id]=t[i]);
n=new m({
container:"#js_secondary_category",
data:a,
callback:function(e){
$("#js_secondary_category_hidden").val(e).closest(".js_category").find(".fail").hide();
}
}).selected(f?o.SecondaryCategoryId+""||0:0);
}
var i,n,r=e.category_info,o=e.data||{},d={},c={};
t(r.primary_category);
}
function o(){
$(".js_has_auth_file_check").checkbox({
onChanged:function(e){
$(".js_auth_file_info").hide(),1==$(e).val()?$(".js_has_auth_file").show():$(".js_no_auth_file").show(),
$("#js_auth_file_container").show();
}
}),$(".js_has_auth_file_check:checked").click();
}
var d=(e("common/wx/popup.js"),e("common/wx/Tips.js")),c=e("common/wx/Cgi.js"),s=wx.cgiData,_=e("biz_common/moment.js"),m=e("biz_web/ui/dropdown.js"),u=(e("biz_common/jquery.validate.js"),
e("common/wx/popup.js"),e("common/wx/media/imageDialog.js")),l=e("biz_web/ui/dateRange.js"),h=(e("biz_web/ui/checkbox.js"),
e("biz_web/utils/upload.js"));
e("cardticket/common_validate.js");
var p=e("cardticket/common_template_helper.js");
e("common/wx/stopMultiRequest.js"),s.data.Id&&(s.data.has_auth_file=s.data.AgreementBizMediaId||s.data.OperatorBizMediaId?!1:!0),
$("#js_add_merchant_container").html(template.render("js_add_merchant_tpl",{
data:s.data
}));
var f=!0;
t({
container:".js_maxlength"
}),a(),o(),i(),n({
data:s.data
}),r({
category_info:s.category_info,
data:s.data
}),e("cardticket/topmenu.js").selected("overviewpage");
});