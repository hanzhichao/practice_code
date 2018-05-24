define("wbverify/step.js",["common/wx/Step.js","biz_common/jquery.validate.js","wbverify/step1.js","wbverify/step2_tx.js","wbverify/step3_tx.js","wbverify/step2_sina.js","wbverify/step3_sina.js"],function(e){
"use strict";
function t(e){
p.setStep(e),$("#wbverify").html(s(r[e],{
data:i
})),"function"==typeof a[e]&&a[e](t),$("#js_nextBtn").click(function(){
t(e+1);
}),$("#js_prevBtn").click(function(){
t(e-1);
});
}
{
var s=(wx.T,template.render),i=wx.cgiData,n=e("common/wx/Step.js");
e("biz_common/jquery.validate.js");
}
if($.extend(i,{
backLink:wx.url("/acct/wbverify"),
qrCode:wx.url("/misc/getqrcode?fakeid=%s&style=1".sprintf(i.fakeId)),
settingUrl:wx.url("/cgi-bin/settingpage?t=setting/index&action=index"),
headImgUrl:i.headImgUrl||"/mpres/htmledition/images/default_avatar_100.png"
}),"tx"==i.wb)var a=["",e("wbverify/step1.js"),e("wbverify/step2_tx.js"),e("wbverify/step3_tx.js")],r=["","step1","step2_tx","step3_tx","step4_tx"],p=new n({
container:"#stepItems",
selected:i.step,
names:["1 同意条款","2 分享内容至微博","3 确认信息","4 完成"]
});else if("sina"==i.wb)var a=["",e("wbverify/step1.js"),e("wbverify/step2_sina.js"),e("wbverify/step3_sina.js")],r=["","step1","step2_sina","step3_sina","step4_sina"],p=new n({
container:"#stepItems",
selected:i.step,
names:["1 同意条款","2 填写新浪微博地址","3 分享内容至微博","4 等待审核"]
});
t(i.step);
});