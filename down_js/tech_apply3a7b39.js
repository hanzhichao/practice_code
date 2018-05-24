define("device/tech_apply.js",["common/wx/Tips.js","common/wx/Cgi.js","biz_web/ui/checkbox.js","biz_web/utils/upload.js","common/wx/dialog.js","biz_web/lib/json.js","common/qq/jquery.plugin/zclip.js"],function(n){
"use strict";
var e=(wx.T,template.render,n("common/wx/Tips.js")),i=n("common/wx/Cgi.js"),s=(n("biz_web/ui/checkbox.js"),
n("biz_web/utils/upload.js"),n("common/wx/dialog.js")),t=n("biz_web/lib/json.js"),c=wx.cgiData||{},o={
acct_status:"",
dev_acct_info:{},
data:{}
},_={
connect_type:null
},r=$.extend({},o,c);
n("common/qq/jquery.plugin/zclip.js"),function(){
if(_.connect_type=$(".js_connect_type").find("input").checkbox({
multi:!0,
onChanged:function(){
$(".js_connect_typefail").hide();
var n=_.connect_type.values();
n.indexOf("1")>=0||n.indexOf("2")>=0?$(".js_airsync").show():$(".js_airsync").hide(),
n.indexOf("4")>=0?$(".js_gprss").show():$(".js_gprss").hide(),n.indexOf("0")>=0||n.indexOf("3")>=0?$(".js_wording").show():$(".js_wording").hide();
}
}),$("#js_submit").on("click",function(){
var n=$(this);
n.btn(!1);
var s={},c=_.connect_type.values(),o=c.length;
if(!(o>0))return $(".js_connect_typefail").show(),n.btn(!0),!1;
$(".js_connect_typefail").hide(),s.conn_type=[];
for(var r=0;o>r;r++)s.conn_type.push({
id:c[r]
});
if(c.indexOf("4")>=0){
var a=$(".js_gprs").val().trim();
if(!a)return $(".js_gprsfail").show(),n.btn(!0),!1;
$(".js_gprsfail").hide(),s.gps_license=a;
}
if(c.indexOf("1")>=0||c.indexOf("2")>=0){
var d=$(".js_sn").val().trim();
if(!d)return $(".js_snfail").show(),n.btn(!0),!1;
$(".js_snfail").hide(),s.air_syns_num=d;
}
!s.air_syns_num&&(s.air_syns_num="NULL"),i.post({
url:wx.url("/device/device_func_apply?action=submit_tech_cert"),
data:{
req_data:t.stringify2(s)
},
mask:!1
},function(i){
if(!i||!i.base_resp)return e.err("系统错误，请重试"),void n.btn(!0);
switch(+i.base_resp.ret){
case 0:
e.suc("提交成功"),$("#js_form").hide();
var s=$("#js_result");
s.show(),s.find(".js_redirect").on("click",function(){
location.href=wx.url("/device/device_func_detail?action=list_order&t=device/order_list");
}),s.find(".js_resultcopy").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
return"广东省广州市海珠区新港中路397号TIT创意园腾讯自编四号楼 刘东升 （收）";
},
afterCopy:function(){
e.suc("复制成功");
}
});
break;

default:
e.err("提交失败，请重试"),n.btn(!0);
}
});
}),-1==[8,5].indexOf(+r.acct_status)&&s.show({
title:"提示",
type:"warn",
msg:"当前不允许提交技术测试、体验认证",
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
}),r.dev_acct_info.conn_type){
for(var n=r.dev_acct_info.conn_type,c=[],o=0,a=n.length;a>o;o++)c.push(""+n[o].id);
r.data.connid=c,(c.indexOf("1")>=0||c.indexOf("2")>=0)&&$(".js_airsync").show(),
c.indexOf("4")>=0&&$(".js_gprss").show(),(c.indexOf("0")>=0||c.indexOf("3")>=0)&&$(".js_wording").show(),
c.length>0&&_.connect_type.adjust(c);
}
r.dev_acct_info.air_syns_num&&"NULL"!=r.dev_acct_info.air_syns_num&&$(".js_sn").val(r.dev_acct_info.air_syns_num.html(!1)),
r.dev_acct_info.gps_license&&$(".js_gprs").val(r.dev_acct_info.gps_license.html(!1));
}();
});