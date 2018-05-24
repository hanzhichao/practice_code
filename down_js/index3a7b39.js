define("statistics/index.js",["common/wx/top.js","common/wx/iframe.method.js"],function(t){
"use strict";
var s,e,a,r=t("common/wx/top.js"),c=(t("common/wx/iframe.method.js"),wx.cgiData);
switch(c.action){
case"stat_user_summary":
s="ctr_user_summary",a=new r("#topTab",r.DATA.statistics.user),e=0;
break;

case"stat_user_attr":
s="ctr_user_attr",a=new r("#topTab",r.DATA.statistics.user),e=1;
break;

case"stat_article_detail":
s="ctr_article_detail",a=new r("#topTab",r.DATA.statistics.article),e=0;
break;

case"stat_article_analyse":
s="ctr_article_analyse",a=new r("#topTab",r.DATA.statistics.article),e=1;
break;

case"stat_message":
s="ctr_message",a=new r("#topTab",r.DATA.statistics.message),e=0;
break;

case"ctr_keyword":
s="ctr_keyword",a=new r("#topTab",r.DATA.statistics.message),e=1;
break;

case"stat_interface":
s="ctr_interface",a=new r("#topTab",r.DATA.statistics.interface),e=0;
}
a.selected(e),"/"==c.jsurl.substring(0,1)&&(c.jsurl="https://res.wx.qq.com/mpres/zh_CN/htmledition/js/common/wx/iframe.js");
var i="https://mta.qq.com/mta/wechat/%s?appid=%s&pluginid=luopan&token=%s&devtype=%s&jsurl=%s&version=2".sprintf(s,c.appid,c.pluginToken,c.devtype,c.jsurl);
$("#mpIFrame").attr("src",i);
});