define("tmplmsg/intro.js",["common/wx/dialog.js"],function(i){
"use strict";
function n(){
0==wx.cgiData.isWxVerify&&0==wx.cgiData.isQverify?t('请先通过<a href="'+e+'" target="_blank">微信认证</a>后，再继续申请。'):location.href=a;
}
function t(i){
r.show({
type:"warn",
msg:"|"+i,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
}
var a=wx.url("/cgi-bin/frame?t=tmplmsg/apply_frame"),e=wx.url("/acct/wxverifyorder?action=index"),r=(wx.url("/cgi-bin/frame?nav=10010&t=business/index_frame&iframe=%2Fpaymch%2Fbusiness%3Faction%3Dfirstentry"),
i("common/wx/dialog.js"));
$(".btn_buy").click(function(){
n();
});
});