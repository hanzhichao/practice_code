define("wifi/monitor.js",["common/wx/messenger.method.js","biz_common/utils/url/parse.js","wifi/top.js","common/wx/popup.js"],function(t){
"use strict";
function a(t){
var a;
return i.jsurl="/"==i.jsurl.substring(0,1)?"https://res.wx.qq.com/mpres/zh_CN/htmledition/js/common/wx/messenger.js":i.jsurl,
i.jsurl=encodeURIComponent(i.jsurl),t=location.hostname.startsWith("dev")?t.replace(/^https/,"http"):t,
a=o.addParam(t,"appid",i.appid),a=o.addParam(a,"token",i.pluginToken),a=o.addParam(a,"jsurl",i.jsurl),
i.data_ticket&&(a=o.addParam(a,"data_ticket",encodeURIComponent(i.data_ticket))),
i.data_bizuin&&(a=o.addParam(a,"data_bizuin",encodeURIComponent(i.data_bizuin))),
a;
}
var n=t("common/wx/messenger.method.js"),o=t("biz_common/utils/url/parse.js");
t("wifi/top.js");
var i=wx.cgiData,s=$("#mpIFrame");
t("common/wx/popup.js"),i.cgi=$(".js_top[data-index=%s]".sprintf(i.tab?i.tab:0)).find("a").data("url"),
s.length&&(n.init(s),s.on("load",function(){
Iframe.init(this.contentWindow);
}),s.attr("src",a(i.cgi)));
});