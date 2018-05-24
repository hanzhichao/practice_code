define("entityshop/appeal_result.js",["biz_common/moment.js","biz_web/utils/upload.js"],function(t){
"use strict";
var a=t("biz_common/moment.js"),e=t("biz_web/utils/upload.js");
wx||(wx={}),wx.data||(wx.data={}),wx.data&&wx.data.user_name||(wx.data.user_name=wx.cgiData.ticket_id),
wx.data&&wx.data.ticket||(wx.data.ticket=wx.cgiData.ticket),template.helper("mediafile",function(t){
var a="";
return a+=wx.cgiData.ticket_id?"&ticket_id="+wx.cgiData.ticket_id:"",a+=wx.cgiData.ticket?"&ticket="+wx.cgiData.ticket:"",
e.mediaFileUrl(t)+a;
}),template.helper("unixformat",function(t){
return a.unix(t).format("YYYY-MM-DD HH:mm:SS");
}),wx.cgiData.data.type=wx.cgiData.type,$("#js_detail").html(template.render("js_detail_tpl",wx.cgiData.data));
});