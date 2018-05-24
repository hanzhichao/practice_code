define("ad_system/client_index.js",["common/wx/dialog.js","biz_common/moment.js","ad_system/helper.js"],function(t){
"use strict";
{
var e=t("common/wx/dialog.js"),i=t("biz_common/moment.js");
t("ad_system/helper.js");
}
$("#time").text(i.unix(wx.cgiData.time).format("YYYY年MM月DD日")),0==wx.cgiData.status?$("#word").text("未开通"):1==wx.cgiData.status?$("#word").text("审核中"):2==wx.cgiData.status&&$("#word").text("审核失败"),
$("#open").click(function(){
if(wx.cgiData.wxVerify||wx.cgiData.qVerify){
if(wx.cgiData.orgName)return!0;
e.show({
type:"warn",
msg:"暂时无法申请开通广告主功能|你的微信认证不是在公众平台按正常流程申请的，系统无法拉取到你的认证信息。若需要补充微信认证信息，请申请%s".sprintf("<a href='/merchant/store?action=detail&t=wxverify/detail&info=verify&token="+wx.data.t+"&lang="+wx.data.lang+"' target='_blank'>认证年审</a>。"),
buttons:[{
text:"确定",
click:function(){
this.hide();
}
}]
});
}else e.show({
type:"warn",
msg:"你尚未微信认证|微信认证成功后可申请开通广告主功能",
buttons:[{
text:"去认证",
click:function(){
window.open(wx.url("/merchant/store?action=detail&t=wxverify/detail&info=verify"),"blank"),
this.hide();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
return!1;
});
});