define("device/datachart.js",["common/wx/iframe.method.js"],function(t){
"use strict";
{
var e=wx.cgiData;
t("common/wx/iframe.method.js");
}
e.jsurl="https://res.wx.qq.com/mpres/zh_CN/htmledition/js/common/wx/iframe.js";
var m=e.appid&&e.plugin_token?"https://mta.qq.com/mta/wechat/ctr_device_summary?appid=%s&pluginid=luopan&token=%s&devtype=0&jsurl=%s&version=2".sprintf(e.appid,e.plugin_token,e.jsurl):"";
m&&$("#mpIFrame").attr("src",m);
});