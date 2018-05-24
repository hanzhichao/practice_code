define("scan/add_business_category.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","common/wx/Tips.js","biz_web/lib/json.js","biz_web/utils/upload.js","common/qq/queryString.js","scan/scan_category.js"],function(s){
"use strict";
function i(s){
for(var i={},n=b.getCategories(),e=0;e<n.length;e++)i[n[e].cat2.id]=n[e];
var t=[],o=[],r=[];
if(s&&s.length>0)for(var e=0;e<s.length;e++){
var c=s[e];
0==c.ret?t.push(i[c.id]):14152==c.ret?o.push(i[c.id]):r.push(i[c.id]);
}
var u=a("tpl_result",{
list_ok:t,
list_exist:o,
list_fail:r,
num_ok:t.length,
num_exist:o.length,
num_fail:r.length
});
$("#js_div_result").html(u).show(),$("#js_div_form").hide();
}
function n(){
b.init("#js_div_category");
}
function e(){}
function t(){
$("#js_btn_submit").on("click",function(){
var s=$(this);
if(s.hasClass("btn_loading"))return!1;
if(0==b.valid())return c.err("请完善经营类目信息"),!1;
s.btn(0);
var n=b.getCategories();
n=u.stringify2({
business_category:n
}),r.post({
url:"/merchant/scanqualification?action=addbusinesscategory",
data:{
business_license_stuff:wx.cgiData.business_license_stuff,
business_category:n
}
},function(n){
0==n.base_resp.ret?i(n.add_result):(c.err("提交失败，请重试"),s.btn(1));
});
});
}
function o(){
n(),e(),t();
}
{
var r=(wx.T,s("common/wx/Cgi.js")),a=template.render,c=(s("biz_web/ui/checkbox.js"),
s("biz_web/ui/dropdown.js"),s("common/wx/Tips.js")),u=s("biz_web/lib/json.js"),_=(s("biz_web/utils/upload.js"),
s("common/qq/queryString.js")),b=s("scan/scan_category.js");
new _;
}
o();
});