define("news/authorization.js",["common/wx/dialog.js","common/wx/Tips.js","common/wx/Cgi.js"],function(o){
"use strict";
var s=o("common/wx/dialog.js"),n=o("common/wx/Tips.js"),i=o("common/wx/Cgi.js");
$("#js_agree").click(function(){
i.post({
url:"/misc/skeyform",
data:{
form:"txnewapplyform",
apply:"1"
}
},function(o){
if(0==parseInt(o.base_resp.ret,10)){
s.show({
type:"succ",
msg:"接受协议|你已同意协议，此后你可以在群发时选择同步到腾讯新闻",
buttons:[{
text:"返回首页",
click:function(){
location.href=wx.url("/cgi-bin/home?t=home/index");
}
}]
});
}else n.err("授权失败");
});
});
});