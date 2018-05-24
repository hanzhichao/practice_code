define("wxverify/refill.js",["common/wx/Step.js","biz_common/jquery.validate.js","wxverify/validateExtend.js","common/wx/dialog.js","biz_web/utils/upload.js","common/wx/qrcheck_weapp.js","common/wx/Cgi.js","common/wx/Tips.js","wxverify/step1.js","wxverify/step2.js","wxverify/step3.js","wxverify/step4.js","wxverify/step5.js"],function(e){
"use strict";
{
var i=(wx.T,wx.cgiData),t=e("common/wx/Step.js"),a=(e("biz_common/jquery.validate.js"),
e("wxverify/validateExtend.js"),e("common/wx/dialog.js"),e("biz_web/utils/upload.js")),s=e("common/wx/qrcheck_weapp.js"),n=e("common/wx/Cgi.js"),o=e("common/wx/Tips.js"),p=["","proto","stuff","naming","invoice","pay_method"],c={
proto:e("wxverify/step1.js"),
stuff:e("wxverify/step2.js"),
naming:e("wxverify/step3.js"),
invoice:e("wxverify/step4.js"),
pay_method:e("wxverify/step5.js")
},r=3==i.type&&1!=i.subtype||4==i.type||"undefined"!=typeof i.refill_type?"4. 信息核对":"4. 填写发票";
new t({
container:"#stepItems",
selected:p.indexOf(i.step),
names:["1. 同意协议","2. 填写资料","3. 确认名称",r]
});
}
template.helper("$include",function(e){
for(var i=[].slice.call(arguments,1),t=0;t<i.length;t++)"string"==typeof i[t]&&(i[t]=i[t].replace(",class="," class="));
return template.render(e,{
data:i,
baseData:wx.data
});
}),template.helper("$preview",function(e,i){
return"bizmedia"==i?a.mediaFileUrl(e):"preview"==i?a.tmpFileUrl(e):"multimedia"==i?a.multimediaFileUrl(e):void 0;
});
for(var m in i.data)i.data[m]=(i.data[m]+"").html(!1);
var l="";
0==wx.cgiData.is_overseas?l=wx.cgiData.operator_mobile.replace("+86",""):1==wx.cgiData.is_overseas&&(l=wx.cgiData.operator_mobile),
wx.cgiData.checkAdminPopup={
instance:null,
init:function(){
wx.cgiData.checkAdminPopup.instance=s.initPopup({
data:{
typeid:14,
extra:JSON.stringify({
nick_name:wx.cgiData.nick_name
})
},
size:165,
cgiURI:"/cgi-bin/safeqrcode",
showImgInfo:!1,
popupTitle:"验证管理员",
popupWidth:600,
popupTips:"请使用管理员微信号扫码",
onPopupShow:function(){
this.popup.find(".js_div_qrcheck_msg").html("如果没有绑定管理员，请到%s安全中心%s进行绑定。".sprintf("<a href='"+wx.url("/cgi-bin/safecenterstatus?action=view&t=setting/safe-index")+"'>","</a>"));
},
onSuccess:function(e){
n.post({
url:"/acct/wxverify",
data:{
action:"report_admin_scan",
ticket:e
}
},function(e){
0==e.base_resp.ret?o.suc("验证成功，请继续下一步"):o.err("系统错误，请稍候重试"),wx.cgiData.checkAdminPopup.instance.popup.popup("remove");
});
}
}),wx.cgiData.checkAdminPopup.instance.load();
},
load:function(){
wx.cgiData.checkAdminPopup.init();
}
},"function"==typeof c[i.step]&&c[i.step]();
});