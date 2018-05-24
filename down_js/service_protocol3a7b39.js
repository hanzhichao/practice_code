define("scan/service_protocol.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/dialog.js"],function(i){
"use strict";
var t=i("common/wx/Cgi.js"),n=i("common/wx/Tips.js"),o=i("common/wx/dialog.js"),s=function(i){
function s(){
i.is_sign?(o.show({
title:"提交成功",
msg:"已同意协议|已同意协议，可按流程发送申请邮件开通",
type:"succ",
buttons:[{
text:"关闭",
click:function(){
this.hide();
},
type:"normal"
}]
}),$(".js_submit").text("返回").removeClass("btn_primary").addClass("btn_default").click(function(){
location.href=wx.url("/cgi-bin/plugindetails?t=service/profile&pluginid=10030&action=intro");
})):$(".js_submit").click(function(){
t.get({
url:wx.url("/merchant/expressprotocol?action=sign_express_protocol")
},function(i){
return i&&0==i.base_resp.ret?(o.show({
title:"提交成功",
msg:"已同意协议|已同意协议，可按流程发送申请邮件开通",
type:"succ",
buttons:[{
text:"确定",
click:function(){
location.href=wx.url("/cgi-bin/plugindetails?t=service/profile&pluginid=10030&action=intro");
},
type:"primary"
}],
onHide:function(){
location.href=wx.url("/cgi-bin/plugindetails?t=service/profile&pluginid=10030&action=intro");
}
}),void $(".js_submit").text("返回").removeClass("btn_primary").addClass("btn_default")):void n.err("系统错误，请稍后重试");
});
});
}
return{
init:s
};
}(wx.cgiData);
s.init();
});