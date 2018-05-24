define("advanced/privilege.js",["common/qq/mask.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/top.js","common/wx/popup.js","common/wx/dialog.js","biz_web/ui/checkbox.js","common/wx/tooltips.js","common/wx/simplePopup.js","common/wx/popover.js","common/wx/Step.js","common/wx/inputCounter.js"],function(e){
"use strict";
function t(){
var e=null,t={
wxverify:wx.url("/acct/wxverifyorder?action=index"),
wxpay:wx.url("/cgi-bin/frame?t=business/index_frame&iframe=%2Fpaymch%2Fbusiness%3Ft%3Dbusiness%2Finfo%26action%3Doverview&nav=business&hide=0")
};
$(".jsAsk").each(function(){
var e=$(this).data("type"),a=[];
switch(+e){
case 1:
a.push("订阅号必须通过%s微信认证%s".sprintf('<a target="_blank" href="%s">'.sprintf(t.wxverify),"</a>")),
a.push("服务号自动获得");
break;

case 2:
a.push("订阅号无法开通此接口"),a.push("服务号必须通过%s微信认证%s".sprintf('<a target="_blank" href="%s">'.sprintf(t.wxverify),"</a>"));
break;

case 3:
a.push("必须通过微信认证");
break;

case 4:
a.push("必须是服务号"),a.push("必须通过%s微信认证%s".sprintf('<a target="_blank" href="%s">'.sprintf(t.wxverify),"</a>")),
a.push("满足以上条件方可申请");
break;

case 5:
a.push("必须是服务号"),a.push("必须通过%s微信认证%s".sprintf('<a target="_blank" href="%s">'.sprintf(t.wxverify),"</a>")),
a.push("必须获得%s微信支付%s".sprintf('<a target="_blank" href="%s">'.sprintf(t.wxpay),"</a>")),
a.push("满足以上条件方可申请");
break;

case 6:
a.push("必须通过%s微信认证%s".sprintf('<a target="_blank" href="%s">'.sprintf(t.wxverify),"</a>")),
a.push("满足以上条件方可申请");
}
a="<p>获得条件：</p><ul><li>"+a.join("</li><li>")+"</li></ul>",$(this).data("content",a);
}),$("table").on("mouseover",".jsAsk",function(){
var t=$(this);
e&&e.remove(),e=new d({
dom:this,
content:t.data("content"),
margin:"center",
hover:!0
}),e.$pop.offset({
top:e.$pop.offset().top-2,
left:e.$pop.offset().left+23
});
});
}
function a(){
function e(e){
l.post({
url:"/merchant/myservice?action=set_report_location",
data:{
type:e
}
});
}
function t(){
0==wx.cgiData.location?($("#locationBt").text("开启"),$("#localTxt").text("(已关闭)")):1==wx.cgiData.location?($("#locationBt").text("关闭"),
$("#localTxt").text("(已开启，每次上报)")):2==wx.cgiData.location&&($("#locationBt").text("关闭"),
$("#localTxt").text("(已开启，每隔5s上报)"));
}
n(),$("#tpl_id_bt").click(function(){
$("#id_tpl").popup({
title:"一次性订阅消息",
buttons:[{
text:"确定",
click:function(){
this.hide();
},
type:"primary"
}]
});
}),$("#openBt").click(function(){
return $(this).hasClass("btn_disabled")?!1:void(1==_.is_biz_menu_open||1==_.is_biz_ivr_open?m.show({
title:"提示",
type:"warn",
msg:"是否确定开启服务器配置？|请注意：开启后，用户发送的消息将自动转发到该配置地址，并且在网站中设置的自动回复和自定义菜单将失效。",
buttons:[{
text:"确定",
click:function(){
p.suc("开启中"),o(1),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
}):(p.suc("开启中"),o(1)));
}),$("#closeBt").click(function(){
m.show({
title:"提示",
type:"warn",
msg:"确定停用服务器配置？|请注意：停用后，消息将不再转发到服务器配置中，可能影响公众号服务。",
buttons:[{
text:"确定",
click:function(){
p.suc("关闭中"),o(0),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
}),$("#voiceClose").click(function(){
m.show({
type:"warn",
msg:"你确认要关闭语音识别吗?|关闭后，用户发送给公众号的语音消息，将不再附带识别结果",
buttons:[{
text:"确定",
click:function(){
l.post({
url:"/merchant/myservice?action=set_voice_reco",
data:{
open:0
}
}).success(function(e){
0==e.base_resp.ret?(p.suc("关闭成功"),wx.cgiData.voice=!1,$("#voiceClose").hide(),$("#voiceOpen").show(),
$("#voiceTxt").text("(已关闭)")):l.handleRet(e,{
id:64463,
key:4,
url:"/merchant/myservice?action=set_voice_reco"
});
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
m.show({
type:"warn",
msg:"你确认要开启语音识别吗?|开启后，用户发送给公众号的语音消息，将附带识别结果",
buttons:[{
text:"确定",
click:function(){
l.post({
url:"/merchant/myservice?action=set_voice_reco",
data:{
open:1
}
}).success(function(e){
0==e.base_resp.ret?(p.suc("开启成功"),wx.cgiData.voice=!0,$("#voiceClose").show(),$("#voiceOpen").hide(),
$("#voiceTxt").text("(已开启)")):l.handleRet(e,{
id:64463,
key:4,
url:"/merchant/myservice?action=set_voice_reco"
});
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
}),t();
var a=null;
$("#locationBt").click(function(){
0==wx.cgiData.location?($("#location").popup({
className:"location_select simple",
buttons:[{
text:"确认",
click:function(){
e(a.values()[0]),wx.cgiData.location=a.values()[0],t(),p.suc("修改成功"),this.remove();
},
type:"primary"
}]
}),a=$(".localRadio").checkbox()):m.show({
type:"warn",
msg:"你确认要关闭获取用户地理功能吗?|关闭后，你将无法获得用户地理位置信息",
buttons:[{
text:"确定",
click:function(){
e(0),wx.cgiData.location=0,t(),p.suc("已关闭"),this.remove();
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
function o(e){
l.post({
url:"/misc/skeyform?form=advancedswitchform",
data:{
flag:e,
type:2
}
},function(t){
0==t.base_resp.ret?(p.suc("操作成功 "),_.open=e,location.reload()):200002==t.base_resp.ret?p.err("URL、Token和EncodingAESKey设置错误或者未设置"):l.handleRet(t,{
id:64463,
key:6,
url:"/misc/skeyform?form=advancedswitchform"
});
});
}
function n(){
function e(){
window.open(t+"//"+location.host+$(this).data("url"),"_blank");
}
var t=location.protocol.replace("https","http");
$("#wikiDoc,td a[data-url]").click(e);
}
function s(){
var e="#topTab",t=new u(e,u.DATA.advanced);
if(t.selected(0),$("#devDiv").show(),$("#noDevDiv").show(),$("input[type=checkbox]").checkbox(),
$("#js_agreeCheckbox").on("click",function(){
$(this).is(":checked")?$("#js_toBeDeveloper").removeClass("btn_disabled").attr("disabled",!1):$("#js_toBeDeveloper").addClass("btn_disabled").attr("disabled",!0);
}),$("#js_toBeDeveloper").on("click",function(){
$(this).attr("disabled")||l.post({
url:"/advanced/advanced?action=agreement",
data:{},
mask:!1
},function(e){
0==e.base_resp.ret?(p.suc("开通成功"),location.href=wx.url("/advanced/advanced?action=dev&t=advanced/dev")):p.err("开通失败");
});
}),_.selfMenu){
switch(_.status){
case"0":
$("#selfMenuTr td:eq(2)").html('<a href="/advanced/advanced?action=menu_apply&t=advanced/menu-apply'+r.data.param+'">申请</a>');
break;

case"1":
$("#selfMenuTr td:eq(2)").html('申请中... <a href="/advanced/advanced?action=menu_apply&t=advanced/menu-apply'+r.data.param+'">查看详情</a>');
}
$("#selfMenuTr").show();
}else $("#selfMenuTr").hide();
$("#mainPage").show();
}
function i(){
var e=null,t=template.render,a=_.user_api_info,o=_.jsapi_info,n={};
console.log(a),$.each(a.api_group,function(e,t){
var a=t.group_name;
n[a]=t.api_quota_list,$.each(t.api_quota_list.api_quota,function(e,t){
var o="%s_%s".sprintf(a,t.api_name);
parseInt(t.used_quota)>parseInt(t.quota)&&(t.used_quota=t.quota),n[o]=t.used_quota+"/"+t.quota;
});
}),$.each(o.jsapi_info_list,function(e,t){
var a=t.jsapi_name.replace(/:/g,"_");
n[a]=t.state;
}),$("#js_api").html(t("tpl_api",n)),$("table").on("mouseover",".js_api_detail",function(){
$(this);
e&&e.remove(),e=new d({
dom:this,
content:t($(this).data("id"),n),
margin:"right",
className:"right_pop",
hover:!0
}),e.$pop.offset({
top:e.$pop.offset().top-2
}),e.$pop.offset({
left:e.$pop.offset().left+19
});
}),function(){
var e,t=function(e){
var t=new Date(1e3*e);
return t.getFullYear()+"年"+(t.getMonth()+1)+"月"+t.getDate()+"日";
},a=function(e){
m.show({
title:e.title||"提示",
type:e.type||"info",
msg:e.msg,
buttons:[{
text:e.btn||"我知道了",
click:function(){
this.remove();
}
}]
});
};
$(".js_tips").hover(function(){
var o=function(){
$("#js_apply").off().on("click",function(){
$(".dialog_wrp, .mask").remove(),l.post({
url:"/advanced/apilevel?token="+wx.cgiData.token+"&lang=zh_CN",
data:{
action:"check"
},
mask:!1
},function(e){
if(!e||!e.base_resp||void 0===e.base_resp.ret)return void v.err("系统错误，请稍后重试");
var o=1*e.base_resp.ret;
switch(o){
case 0:
$("#tpl_apply_dialog").popup({
title:"临时提高每日调用上限申请",
className:"apply_dialog",
buttons:[],
onShow:function(){
var e=this;
$(".js_apply_next").click(function(){
n.go(2),$(".js_apply_step1").hide(),$(".js_apply_step2").show();
}),$(".js_apply_prev").click(function(){
n.go(1),$(".js_apply_step1").show(),$(".js_apply_step2").hide();
});
var o=$(".js_reason"),s=new h(o,{
maxLength:30
});
$(".js_apply_submit").click(function(){
var n=s.getCount(),i=$(".js_apply_reason_tip");
0==n?(i.text("请填写申请理由"),o.focus()):n>30?(i.text("申请理由不能超过30字"),o.focus()):(i.text(""),
l.post({
url:"/advanced/apilevel",
data:{
action:"tempraise",
reason:o.val()
},
mask:!1
},function(o){
if(!o||!o.base_resp||void 0===o.base_resp.ret)return void v.err("系统错误，请稍后重试");
var n=1*o.base_resp.ret;
switch(n){
case 0:
a({
title:"临时提高每日调用上限申请",
msg:"申请提交成功|临时提高接口调用上限的申请正在审核中，结果将在1个工作日内通过站内信的方式告知，请留意站内信通知。",
type:"succ",
btn:"关闭"
});
break;

case 200600:
a({
msg:"该账号未达到再次申请条件，目前无法申请该功能|该账号已于%s通过临时提高接口调用上限审核，下次可再次申请的时间为%s。".sprintf(t(o.last_raise_time),t(o.next_can_apply_time))
});
break;

case 200601:
a({
msg:"正在审核中|你的申请在审核中，审核结果将在一个工作日内通过站内信通知，请留意查收。"
});
break;

case 200602:
a({
msg:"该账号未达到申请条件，目前无法申请该功能|该账号的接口调用上限已是最大值，无法继续申请临时提高调用上限。"
});
break;

case 200603:
a({
msg:"暂时无法申请|当前申请账号数较多，请于明天再来尝试申请。"
});
break;

default:
l.handleRet(o,{
id:64463,
key:7,
url:"/advanced/apilevel?action=tempraise"
});
}
e.remove();
}));
}),o.on("keyup",function(){
var e=s.getCount();
e>0&&30>=e&&$(".js_apply_reason_tip").text("");
});
},
onHide:function(){
this.remove();
}
});
var n=new f({
container:".js_apply_step_nav",
selected:1,
names:["1 注意事项","2 申请理由"]
});
break;

case 200600:
a({
msg:"该账号未达到再次申请条件，目前无法申请该功能|该账号已于%s通过临时提高接口调用上限审核，下次可再次申请的时间为%s。".sprintf(t(e.last_raise_time),t(e.next_can_apply_time))
});
break;

case 200601:
a({
msg:"正在审核中|你的申请在审核中，审核结果将在一个工作日内通过站内信通知，请留意查收。"
});
break;

case 200602:
a({
msg:"该账号未达到申请条件，目前无法申请该功能|该账号的接口调用上限已是最大值，无法继续申请临时提高调用上限。"
});
break;

case 200603:
a({
msg:"暂时无法申请|当前申请账号数较多，请于明天再来尝试申请。"
});
break;

default:
l.handleRet(e,{
id:64463,
key:7,
url:"/advanced/apilevel?action=tempraise"
});
}
});
});
};
e=new d({
dom:$(this),
content:$("#tpl_tips").html(),
hover:!0,
isToggle:!0,
onShow:o,
onHide:function(){
$(this).remove();
}
});
});
}(),function(){
var e=$(".js_reset");
e.each(function(){
var e=.6,a=$(this),o=a.data("name"),s=[],i={
action:"del_api_quota"
},c=!1;
a.data("group")?($("<div></div>").html(t(a.data("group"),n)).find(".js_quota").each(function(){
s.push($(this).text());
}),i.api_group=o):(s.push(a.data("quota")),i.api=o),$.each(s,function(t,a){
var o=a.split("/");
2==o.length&&o[0]/o[1]>e&&(c=!0);
}),_.can_del_api_used_quota&&_.del_api_used_quota_left>0&&c&&a.show().click(function(){
var e=new d({
dom:this,
content:t("tpl_reset",{
name:a.parent().parent().find("td.js_interface > a").text()
}),
hideIfBlur:!0,
buttons:[{
text:"确定",
click:function(){
e.$pop.find(".jsPopoverBt").eq(0).btn(!1),l.post({
url:"/advanced/advanced",
data:i,
mask:!1
},function(t){
if(t&&t.base_resp){
var a=1*t.base_resp.ret;
0==a?(v.suc("重置成功"),setTimeout(function(){
location.reload();
},300)):v.err(200002==a?"参数错误":212100==a?"清零超过本月次数限制":"系统错误，请稍后重试");
}else l.handleRet(t,{
id:64463,
key:8,
url:"/advanced/advanced"
});
e.remove();
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
});
});
}();
}
function c(){
s(),i(),a(),t();
}
var r=wx,p=(e("common/qq/mask.js"),e("common/wx/Tips.js")),l=e("common/wx/Cgi.js"),u=e("common/wx/top.js"),m=(e("common/wx/popup.js"),
e("common/wx/dialog.js")),d=(e("biz_web/ui/checkbox.js"),e("common/wx/tooltips.js"),
e("common/wx/simplePopup.js"),e("common/wx/popover.js")),f=e("common/wx/Step.js"),h=e("common/wx/inputCounter.js"),v=e("common/wx/Tips.js"),_=wx.cgiData;
c();
});