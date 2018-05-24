define("register/overseas_step3.js",["biz_web/ui/checkbox.js","common/wx/Step.js","common/wx/Tips.js","common/wx/Cgi.js"],function(e){
"use strict";
function n(){
i=new r({
container:"#stepItems",
selected:2,
names:["1 基本信息","2 选择类型","3 信息登记","4 公众号信息"]
});
}
function o(){}
function t(){
$("input[type=radio]").checkbox({
type:"radio",
onChanged:function(){
s=this.values()[0];
}
}),$("#js_submit").click(function(){
return s?void u.post({
url:"registerpage?action=savecountry",
data:{
country:s
},
mask:!1
},function(e){
var n=+e.base_resp.ret;
0==n?window.location.href="/acct/contractorpage?action=showreg&step=3&lang="+window.wx.data.lang:a.err(200003==n?"登录超时，请重新登录":"系统错误，请重试");
}):(a.err("请选择一个地区"),!1);
});
}
function c(){
n(),o(),t();
}
e("biz_web/ui/checkbox.js");
var i,s,r=(wx.T,template.render,e("common/wx/Step.js")),a=e("common/wx/Tips.js"),u=e("common/wx/Cgi.js");
c();
});