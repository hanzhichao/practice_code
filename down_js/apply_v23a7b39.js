define("scan/apply_v2.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","common/wx/inputCounter.js","biz_web/lib/json.js","common/wx/Tips.js","common/wx/tooltips.js","biz_web/utils/upload.js","common/wx/Step.js","common/wx/popup.js","common/wx/multiSelector.js","biz_common/jquery.validate.js","scan/scan_barcode_batch.js","scan/scan_category.js"],function(s){
"use strict";
function e(s){
for(var e={},i=p.getBarcodes(),n=0;n<i.length;n++)e[i[n].barcode]=i[n];
var t=[],o=[],_=[],a=[];
if(s&&s.length>0)for(var n=0;n<s.length;n++){
var r=s[n];
0==r.ret?t.push(e[r.id]):14152==r.ret?o.push(e[r.id]):14153==r.ret?_.push(e[r.id]):a.push(e[r.id]);
}
var u=c("tpl_result",{
list_ok:t,
list_exist:o,
list_claim:_,
list_fail:a,
num_ok:t.length,
num_exist:o.length,
num_claim:_.length,
num_fail:a.length
});
f.html(u).show(),j.hide();
}
function i(s){
$(".js_div_step").hide(),$("#js_div_step"+s).show(),d.setStep(s);
}
function n(){
j=$("#js_div_form"),f=$("#js_div_result"),p.init("#js_div_firm_info"),m.init("#js_div_category"),
template.helper("$preview",function(s){
var e=l.tmpFileUrl(s);
return e;
});
}
function t(){
j.show(),f.hide(),d=new b({
container:"#stepItems",
selected:1,
names:["1 同意协议","2 经营范围","3 条码权限"]
}),i(1);
}
function o(){
$(".js_div_step").on("click",".js_btn_step",function(){
if($(this).hasClass("btn_disabled"))return!1;
var s=$(this).data("step");
return"3"!=s||m.valid()?void i(s):!1;
}),$("#js_btn_agree").disable(),$("#js_input_agree").checkbox({
onChanged:function(s){
s.is(":checked")?$("#js_btn_agree").enable():$("#js_btn_agree").disable();
}
}),$(".js_input_apply_type").checkbox({
onChanged:function(){
$("#js_input_apply_type2").is(":checked")?$("#js_div_firm_info").show():$("#js_div_firm_info").hide();
}
}),$("#js_input_apply_type2").checkbox("checked",!0),$(".js_div_step").on("click","#js_btn_submit",function(s){
if(s.preventDefault(),h={
using_barcode:1==$("#js_input_apply_type2").is(":checked")?1:0
},1==h.using_barcode&&!p.valid())return i(3),!1;
if(!m.valid())return u.err("请完善经营范围信息"),i(2),!1;
h.business_category=m.getCategories(),1==h.using_barcode&&(h.firm_info=p.getBarcodes());
var n=$("#js_btn_submit");
if(n.hasClass("btn_loading"))return!1;
n.btn(!1);
var t={
business_license_stuff:wx.cgiData.business_license_stuff,
using_barcode:h.using_barcode,
business_category:r.stringify2({
business_category:h.business_category
})
};
1==t.using_barcode&&(t.firm_info=r.stringify2({
firm_info:h.firm_info
})),a.post({
url:"/merchant/scanapply?action=submit",
data:t,
mask:!1
},function(s){
n.btn(!0),0==s.base_resp.ret?e(s.firm_info_add_result):u.err(14150==s.base_resp.ret?"商标名称和厂商信息不吻合":14153==s.base_resp.ret?"厂商信息已被认领，请更换":"提交失败，请重试");
});
});
}
function _(){
n(),t(),o();
}
var a=(wx.T,s("common/wx/Cgi.js")),c=template.render,r=(s("biz_web/ui/checkbox.js"),
s("biz_web/ui/dropdown.js"),s("common/wx/inputCounter.js"),s("biz_web/lib/json.js")),u=s("common/wx/Tips.js"),l=(s("common/wx/tooltips.js"),
s("biz_web/utils/upload.js")),b=s("common/wx/Step.js"),p=(s("common/wx/popup.js"),
s("common/wx/multiSelector.js"),s("biz_common/jquery.validate.js"),s("scan/scan_barcode_batch.js")),m=s("scan/scan_category.js"),d=null,j=null,f=null,h={
using_barcode:1,
firm_info:[],
business_category:[]
};
_();
});