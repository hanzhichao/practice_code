define("setting/del_acct.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_common/moment.js"],function(t){
"use strict";
var c=t("common/wx/Cgi.js"),e=t("common/wx/Tips.js"),a=t("biz_common/moment.js");
if(1==wx.cgiData.status)$(".js_date").text(a.unix(wx.cgiData.timestamp).format("YYYY年MM月DD日")),
$("#js_cancel").on("click",function(){
var t=$(this);
t.btn(!1),c.post({
url:"/cgi-bin/acctclose",
data:{
action:"cancel",
acct_close_id:wx.cgiData.acct_close_id
}
},function(c){
c&&c.base_resp&&0==c.base_resp.ret?(e.suc("操作成功"),window.location.href=wx.url("/cgi-bin/home?t=home/index")):e.err("系统错误，请稍后重试"),
t.btn(!0);
});
});else if(2==wx.cgiData.status||5==wx.cgiData.status)$(".js_date").text(a.unix(wx.cgiData.timestamp).format("YYYY年MM月DD日"));else var i=0,s=function(){
c.get({
url:"/cgi-bin/acctclose",
data:{
action:"ask",
acct_close_id:wx.cgiData.acct_close_id
}
},function(t){
t&&t.base_resp&&0==t.base_resp.ret&&4==t.base_resp.status?(clearTimeout(o),window.location.href=wx.url("/cgi-bin/home?t=home/index")):(i+=1,
.5*i==1800&&clearTimeout(o));
});
},o=setTimeout(s,500);
});