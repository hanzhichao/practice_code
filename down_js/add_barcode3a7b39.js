define("scan/add_barcode.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","common/wx/Tips.js","biz_web/lib/json.js","biz_web/utils/upload.js","common/qq/queryString.js","scan/scan_barcode_batch.js"],function(i){
"use strict";
function n(i){
for(var n={},s=u.getBarcodes(),t=0;t<s.length;t++)n[s[t].barcode]=s[t];
var e=[],o=[],r=[],c=[];
if(i&&i.length>0)for(var t=0;t<i.length;t++){
var _=i[t];
0==_.ret?e.push(n[_.id]):14152==_.ret?o.push(n[_.id]):14153==_.ret?r.push(n[_.id]):c.push(n[_.id]);
}
var b=a("tpl_result",{
list_ok:e,
list_exist:o,
list_claim:r,
list_fail:c,
num_ok:e.length,
num_exist:o.length,
num_claim:r.length,
num_fail:c.length
});
$("#js_div_result").html(b).show(),$("#js_div_form").hide();
}
function s(){
u.init("#js_div_barcode");
}
function t(){}
function e(){
$("#js_btn_submit").on("click",function(){
var i=$(this);
if(i.hasClass("btn_loading"))return!1;
if(0==u.valid())return!1;
i.btn(0);
var s=u.getBarcodes();
s=_.stringify2({
firm_info:s
}),r.post({
url:"/merchant/scanqualification?action=addfirminfo",
data:{
firm_info:s
}
},function(s){
0==s.base_resp.ret?n(s.add_result):14153==s.base_resp.ret?(c.err("厂商信息已被认领，请更换"),
i.btn(1)):(c.err("提交失败，请重试"),i.btn(1));
});
});
}
function o(){
s(),t(),e();
}
{
var r=(wx.T,i("common/wx/Cgi.js")),a=template.render,c=(i("biz_web/ui/checkbox.js"),
i("biz_web/ui/dropdown.js"),i("common/wx/Tips.js")),_=i("biz_web/lib/json.js"),b=(i("biz_web/utils/upload.js"),
i("common/qq/queryString.js")),u=i("scan/scan_barcode_batch.js");
new b;
}
o();
});