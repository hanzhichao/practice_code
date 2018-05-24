define("service/myService.js",["biz_common/moment.js","common/wx/Cgi.js","common/wx/dialog.js","common/wx/Tips.js","common/wx/simplePopup.js","common/wx/popup.js","biz_web/ui/checkbox.js"],function(t){
"use strict";
function e(){
function t(t){
i.post({
url:"/merchant/myservice?action=set_report_location",
data:{
type:t
}
});
}
function e(){
0==wx.cgiData.location?($("#locationBt").text("开启"),$("#localTxt").text("(已关闭)")):1==wx.cgiData.location?($("#locationBt").text("关闭"),
$("#localTxt").text("(已开启，每次上报)")):2==wx.cgiData.location&&($("#locationBt").text("关闭"),
$("#localTxt").text("(已开启，每隔5s上报)"));
}
_cgiData.products.each(function(t){
t&&3==t.status&&(t.start=t.active_begin_time||c().unix(),t.end=t.start+t.expire,
wx.cgiData[t.name]=c.unix(t.end).format("YYYY-MM-DD"));
}),wx.cgiData.verify=wx.cgiData.advance_interface_begin_time?c.unix(wx.cgiData.advance_interface_begin_time+_cgiData.products[0].expire).format("YYYY-MM-DD"):_cgiData.products[0].active_begin_time?c.unix(_cgiData.products[0].active_begin_time+_cgiData.products[0].expire).format("YYYY-MM-DD"):0,
wx.cgiData.wxverify_begin_time&&(wx.cgiData.wxverify=c.unix(wx.cgiData.wxverify_begin_time+_cgiData.products[0].expire).format("YYYY-MM-DD")),
$("#list").html(template.render("tpl",wx.cgiData)),$("#list tr:last").addClass("last_tr"),
$("#list tr:last td:last").addClass("last_td"),$("#voiceClose").click(function(){
o.show({
type:"warn",
msg:"你确认要关闭语音识别吗?|关闭后，用户发送给公众号的语音消息，将不再附带识别结果",
buttons:[{
text:"确定",
click:function(){
i.post({
url:"/merchant/myservice?action=set_voice_reco",
data:{
open:0
}
}).success(function(t){
0==t.base_resp.ret&&(a.suc("关闭成功"),wx.cgiData.voice=!1,$("#voiceClose").hide(),$("#voiceOpen").show(),
$("#voiceTxt").text("(已关闭)"));
}),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
}),$("#voiceOpen").click(function(){
o.show({
type:"warn",
msg:"你确认要开启语音识别吗?|开启后，用户发送给公众号的语音消息，将附带识别结果",
buttons:[{
text:"确定",
click:function(){
i.post({
url:"/merchant/myservice?action=set_voice_reco",
data:{
open:1
}
}).success(function(t){
0==t.base_resp.ret&&(a.suc("开启成功"),wx.cgiData.voice=!0,$("#voiceClose").show(),$("#voiceOpen").hide(),
$("#voiceTxt").text("(已开启)"));
}),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
}),$("#authBt").click(function(){
new n({
title:"OAuth2.0网页授权",
label:"授权回调页面域名:",
value:wx.cgiData.authUrl||"",
rule:function(t){
return/^(\w|-)+(\.(\w|-)+)+(:\d+)?$/g.test(t);
},
tips:"用户在网页授权页同意授权给公众号后，微信会将授权数据传给一个回调页面，回调页面需在此域名下，以确保安全可靠。",
msg:"域名格式不合法，请直接填写授权域名。如weixin.qq.com",
callback:function(t){
var e=this;
return a.suc("安全监测中。。。"),i.post({
url:"/merchant/myservice?action=set_oauth_domain&f=json",
data:{
domain:t
}
}).success(function(c){
0==c.base_resp.ret?(a.suc("通过安全监测"),wx.cgiData.authUrl=t,$("#authBt").text("修改"),
e.remove()):10302==c.base_resp.ret&&a.suc("域名存在安全风险");
}),!1;
}
});
}),e();
var s=null;
$("#locationBt").click(function(){
0==wx.cgiData.location?($("#location").popup({
className:"location_select simple",
buttons:[{
text:"确认",
click:function(){
t(s.values()[0]),wx.cgiData.location=s.values()[0],e(),a.suc("修改成功"),this.remove();
},
type:"primary"
}]
}),s=$(".localRadio").checkbox()):o.show({
type:"warn",
msg:"你确认要关闭获取用户地理功能吗?|关闭后，你将无法获得用户地理位置信息",
buttons:[{
text:"确定",
click:function(){
t(0),wx.cgiData.location=0,e(),a.suc("已关闭"),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
});
}
var c=t("biz_common/moment.js"),i=t("common/wx/Cgi.js"),o=t("common/wx/dialog.js"),a=t("common/wx/Tips.js"),n=t("common/wx/simplePopup.js");
t("common/wx/popup.js"),t("biz_web/ui/checkbox.js"),e();
});