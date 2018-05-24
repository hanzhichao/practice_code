define("media/product.js",["biz_web/ui/checkbox.js","common/wx/popup.js","media/product_list.js","common/wx/tooltips.js","common/wx/dialog.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/top.js","biz_web/utils/upload.js","biz_common/jquery.validate.js"],function(t){
"use strict";
function a(){
k.curDataList=window.wx.cgiData.list,k.curDataList.shift();
for(var t=0,a=k.curDataList.length;a>t;t++){
var o=k.curDataList[t];
for(var s in o)o.hasOwnProperty(s)&&"[object String]"==Object.prototype.toString.call(o[s])&&(o[s]=o[s].html(!1));
}
}
function o(){
var t=window.wx.cgiData;
s(),k.productListObj=new b({
selectAllDom:$("#select_all"),
selectedCountDom:$("#selected_count"),
cancelSelectBtn:$("#batch_cancel_select"),
batchDelBtn:$("#batch_del"),
listContainner:$("#list_body"),
categoryContianer:$("#category_main"),
pagebarContainer:$("#pagebar"),
listTpl:$("#list_tpl").html(),
listLoadingTpl:$("#list_loading_tpl").html(),
jumpAnimateDom:$("#btn_box"),
totalCountDom:$("#js_count"),
initData:k.curDataList,
initTotal:t.total,
jumpPageSelect:!1,
canDelCategory:!0,
pageSize:10,
initPageContext:t.page_context,
afterInitCategory:function(){
$("#category_container").show();
}
}),i();
}
function s(){
new v("#topTab",v.DATA.media).selected("product");
}
function e(){
h(),$("#cancel_instock").click(function(){
var t=$(this),a=1*t.attr("data-status");
-1!=a?m():f();
}),n();
}
function n(){
$("#js_shop_sysnc").click(function(){
var t=window.wx.cgiData.shop_status,a="确定";
1==t?a="去开通":2==t&&(a="去升级");
var o=template.render("js_shop_sysnc_tpl",{
status:t
}),s=$("<div>").html(o).children().eq(0).popup({
title:"微信小店商品同步",
buttons:[{
text:a,
type:"primary",
click:function(){
if(1==t)window.open(wx.url("/cgi-bin/plugindetails?t=service/profile&pluginid=10008&action=intro")),
this.remove();else if(2==t)window.open(wx.url("/merchant/merchantentrance?action=updatepage")),
this.remove();else if(this.get().find(".js_checkbox").prop("checked")){
var a,o=this;
3==t||7==t?a=1:5==t&&(a=0),c({
status:a,
$dom:this.get().find(".js_btn").eq(0),
callback:function(){
o.remove();
}
});
}else this.remove();
}
}],
className:"dialog-api-sysnc",
autoShow:!0,
onHide:function(){
this.remove();
}
});
s.find(".js_checkbox").checkbox();
});
}
function i(){
var t=1*window.wx.cgiData.shop_status;
t>0&&$("#js_shop_sysnc").show();
}
function c(t){
k.ShopStatusUpdating!==!0&&(k.ShopStatusUpdating=!0,t.$dom.btn(!1),j.post({
url:"/cgi-bin/productmaterial?action=update_shop_status",
data:{
status:t.status
},
mask:!1
},{
done:function(a){
if(k.ShopStatusUpdating=!1,t.$dom.btn(!0),a&&a.base_resp&&0==a.base_resp.ret){
var o="";
1==t.status?(o="已开启微信小店商品同步",window.wx.cgiData.shop_status=4):(o="正在删除之前同步到这里的微信小店商品",
window.wx.cgiData.shop_status=6),x.suc(o),"function"==typeof t.callback&&t.callback();
}else x.err("系统繁忙，请稍后再试");
},
fail:function(){
k.ShopStatusUpdating=!1,t.$dom.btn(!0),x.err("系统繁忙，请稍后再试");
}
}));
}
function l(){
var t=1*$("#cancel_instock").attr("data-status");
return-1!=t?(g.show({
type:"info",
msg:"正在批量导入商品，无法执行新的导入",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
}),!1):!0;
}
function r(){
setTimeout(function(){
$("#cancel_instock").attr("data-status","-1");
$("#js_batch_import").removeClass("btn_disabled");
return k.myupload&&"function"==typeof k.myupload.enable?void k.myupload.enable():(k.myupload=y.uploadFile({
container:"#js_batch_import",
url:"/cgi-bin/productmaterial?action=upload_product_by_file",
multi:!1,
type:10,
onAllComplete:function(){
k.firstUploadStatusResult=!1;
var t=k.uploadResp;
if(t&&t.base_resp&&0==t.base_resp.ret&&t.upload_status&&0==t.upload_status.fail_cnt){
var a=0,o="";
t&&t.upload_status&&(t.upload_status.total_cnt&&(a=t.upload_status.total_cnt),t.upload_status.err_msg&&(o=t.upload_status.err_msg)),
u({
errMsg:o,
total_cnt:a,
succ_cnt:0,
fail_cnt:0
});
}
},
onComplete:function(t,a,o,s){
if(k.uploadResp=s,s&&s.base_resp&&0==s.base_resp.ret&&s.upload_status&&0==s.upload_status.fail_cnt);else{
{
var e=$("#uploadBox").show();
$("#cancel_instock").hide();
}
e.find(".js_ms_content").hide();
var n=e.find(".js_instock_error").show(),i=n.find(".js_err_product_list").hide(),c=n.find(".js_excel_demo").hide(),l="系统繁忙，请稍后再试";
s&&s.base_resp&&0==s.base_resp.ret&&s.upload_status&&0!=s.upload_status.fail_cnt?(l="有%s个商品格式错误".sprintf(s.upload_status.fail_cnt),
n.find(".js_err_msg").text(l),i.show()):s&&s.base_resp&&0!=s.base_resp.ret?(l=341002==s.base_resp.ret?"文件格式不合法":"表格格式错误",
n.find(".js_err_msg").text(l),c.show()):n.find(".js_err_msg").text(l),x.err(l);
}
},
onSelect:function(){
return l();
}
}),$("#js_batch_import").off("click"),void setTimeout(function(){
k.canUploadTips&&"function"==typeof k.canUploadTips.destroy&&k.canUploadTips.destroy(),
k.canUploadTips=new w({
container:$("#btn_box").find("[id*=rt_]"),
position:{
left:-77
},
reposition:!0,
content:template.render("js_batch_import_pop_tpl"),
type:"hover",
parentClass:"popover_weapppay_demo"
});
},0));
},0);
}
function u(t){
var a=$("#uploadBox").show(),o=$("#cancel_instock").show();
if(a.find(".js_ms_content").hide(),t.errMsg){
o.attr("data-status","3");
var s=a.find(".js_check_error").show();
s.find(".js_err_msg").text(t.errMsg);
}else if(t.total_cnt==t.succ_cnt+t.fail_cnt){
k.batchUploadId&&clearTimeout(k.batchUploadId),k.batchUploadId=null,o.attr("data-status","2");
var s=a.find(".js_instock_complete");
s.show(),s.find(".js_handled").text(t.succ_cnt),s.find(".js_error").text(t.fail_cnt),
t.fail_cnt?s.find(".js_down_fail").show():s.find(".js_down_fail").hide();
}else{
var s=a.find(".js_instock").show();
s.find(".js_total").text(t.total_cnt),s.find(".js_handled").text(t.succ_cnt);
var e=(t.succ_cnt+t.fail_cnt)/t.total_cnt*100;
s.find(".js_progress").css({
width:e+"%"
}),o.attr("data-status","1"),_();
}
p();
}
function p(){
setTimeout(function(){
k.myupload&&"function"==typeof k.myupload.disable&&k.myupload.disable();
var t=$("#js_batch_import").addClass("btn_disabled"),a=$("#cancel_instock").attr("data-status"),o="";
1==a?o="正在批量导入商品，无法执行新的导入":(2==a||3==a)&&(o="请先关闭上次任务结果，再执行新的导入"),k.batchTips&&"function"==typeof k.batchTips.destroy&&k.batchTips.destroy(),
k.batchTips=new w({
container:t,
position:{
left:-77
},
reposition:!0,
content:o,
type:"hover",
parentClass:"popover_weapppay_demo"
});
},0);
}
function d(){
k.batchTime=0,_(),k.batchTime=2e3;
}
function _(){
k.batchUploadId&&clearTimeout(k.batchUploadId),k.batchUploadId=setTimeout(function(){
j.post({
url:"/cgi-bin/productmaterial?action=get_upload_info",
mask:!1
},{
done:function(t){
if(t&&t.base_resp){
k.batchTime=2e3;
var a=1*t.base_resp.ret,o=0,s=0,e=0;
if(341001===a)$("#uploadBox").hide(),r();else if(0===a)t.upload_status&&(o=t.upload_status.total_cnt,
s=t.upload_status.succ_cnt,e=t.upload_status.fail_cnt),u({
total_cnt:o,
succ_cnt:s,
fail_cnt:e
}),0===a&&k.productListObj&&k.firstUploadStatusResult===!1&&0!=o&&o==s+e&&window.location.reload(!0);else{
var n="检查入库任务失败，请稍后再试";
t.upload_status&&t.upload_status.errMsg&&(n=t.upload_status.errMsg),u({
errMsg:n,
total_cnt:o,
succ_cnt:s,
fail_cnt:e
});
}
k.firstUploadStatusResult=!1;
}else k.batchTime=5e3,_();
},
fail:function(){
k.batchTime=5e3,_();
}
});
},k.batchTime);
}
function f(){
$("#uploadBox").hide(),r();
}
function m(){
k.closingBatch!==!0&&(k.closingBatch=!0,j.post({
url:"/cgi-bin/productmaterial?action=delete_upload_file",
mask:!1
},{
done:function(t){
k.closingBatch=!1,t&&t.base_resp&&0==t.base_resp.ret?(x.suc("删除入库任务成功"),f()):x.err("系统繁忙，请稍后再试");
},
fail:function(){
k.closingBatch=!1,x.err("系统繁忙，请稍后再试");
}
}));
}
function h(){
var t=$("#more_product_btn"),a=$("#more_product_list");
t.on("click",function(){
return a.show(),!1;
}),a.on("click",function(){
$(this).hide();
}),$(document).on("click",function(){
a.hide();
});
}
t("biz_web/ui/checkbox.js"),t("common/wx/popup.js");
var b=t("media/product_list.js"),w=t("common/wx/tooltips.js"),g=t("common/wx/dialog.js"),j=t("common/wx/Cgi.js"),x=t("common/wx/Tips.js"),v=t("common/wx/top.js"),y=t("biz_web/utils/upload.js"),k=(t("biz_common/jquery.validate.js"),
{
firstUploadStatusResult:!0,
batchTime:2e3
});
return 1==wx.cgiData.can_not_use_product||wx.acl.product_acl&&1!=wx.acl.product_acl.can_see_product?void s():(a(),
o(),e(),void d());
});