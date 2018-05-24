define("register/upgrade.js",["biz_common/jquery.validate.js","wxverify/validateExtend.js","register/step3.js","common/wx/Cgi.js"],function(e){
"use strict";
{
var t=(wx.T,template.render),s=wx.cgiData,a=(e("biz_common/jquery.validate.js"),
e("wxverify/validateExtend.js"),e("register/step3.js")),i="step3";
e("common/wx/Cgi.js");
}
s.data.upgrade=1,s.data.op_subject=1,$("#register").html(t(i,s)),a(s);
});