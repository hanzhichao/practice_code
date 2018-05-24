define("ad_system/host_index.js",["common/wx/dialog.js","ad_system/helper.js"],function(t){
"use strict";
{
var a=t("common/wx/dialog.js");
t("ad_system/helper.js");
}
$("#open").click(function(){
var t=2e4;
if("1"==wx.cgiData.can_use_copyright&&(t=1e4),wx.cgiData.fansNum<t||wx.cgiData.ad_host_num>=20)a.show({
type:"warn",
msg:"您未达到相关要求，暂时无法申请开通流量主功能|目前流量主功能正在公测中，公测期间开通规则如下：<br/>1. 开通原创功能的公众帐号达到1万关注用户才能申请开通；<br/>2. 未开通原创功能的公众帐号达到2万关注用户才能申请开通；<br/>3. 同一主体最多只允许20个公众帐号申请开通流量主",
buttons:[{
text:"确定",
click:function(){
this.hide();
}
}]
});else{
if(wx.cgiData.orgName)return!0;
a.show({
type:"warn",
msg:"暂时无法申请开通流量主功能|可能由于以下原因：<br/>1. 已微信认证的公众号，你的微信认证不是在公众平台按正常流程申请的，系统无法拉取到你的认证信息。请申请%s。<br/>2. 未微信认证的公众号，信息登记类型为政府和媒体暂时无法申请，或系统无法拉取到你的信息登记内容。<br/>如需帮助，发送邮件至wxtuiguang@qq.com，查看%s".sprintf("<a href='/merchant/store?action=detail&t=wxverify/detail&info=verify&token="+wx.data.t+"&lang="+wx.data.lang+"' target='_blank'>认证年审</a>","<a href='http://kf.qq.com/faq/120911VrYVrA140702imAfUv.html' target='_blank'>邮件示例</a>。"),
buttons:[{
text:"确定",
click:function(){
this.hide();
}
}]
});
}
return!1;
});
});