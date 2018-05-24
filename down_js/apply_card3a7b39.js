define("cardticket/apply_card.js",["common/wx/Step.js","common/wx/Cgi.js","biz_web/ui/checkbox.js","biz_web/utils/upload.js","biz_web/ui/dropdown.js","common/wx/Tips.js","cardticket/clickreport.js","common/wx/stopMultiRequest.js","cardticket/common_template_helper.js","biz_common/jquery.validate.js","tpl/cardticket/apply_card_deal.html.js","cardticket/apply_logo.js","cardticket/common_init.js"],function(e){
"use strict";
function i(e){
$(e.container).on("keyup",function(){
var i=$.trim($(this).val());
$(e.hint).text(i.length||0);
}).keyup();
}
function _(e){
e.each(function(){
var e=$(this),i=e.attr("id"),_=e.attr("inited");
_||(e.attr("inited",!0),function(i){
c.uploadTmpFile({
container:"#"+i,
multi:!1,
type:2,
onComplete:function(i,_,n,s){
var t=s.content||"",a=e.closest(".js_upload_box");
if(0==s.base_resp.ret){
$(".js_upload_preview",a).html('<img style="width:260px;" src="%s">'.sprintf(c.tmpFileUrl(t)));
var d=$(".js_input_field",a).val("temp_"+t);
d.parent().parent().find(".fail").remove(),b.suc("上传成功");
}
}
});
}(i));
});
}
function n(){
var e=$("#js_files_title");
m||p&&!l?e.show():e.hide();
}
function s(e,i){
j.go(e),$(".js_step_content").hide(),$("#js_step"+e+"_content").show(),(!g[e-1]||i)&&(v[e-1]&&v[e-1](),
g[e-1]=!0);
}
var t=e("common/wx/Step.js"),a=e("common/wx/Cgi.js"),c=(e("biz_web/ui/checkbox.js"),
e("biz_web/utils/upload.js")),d=e("biz_web/ui/dropdown.js"),r=wx.cgiData,o=r.category_info,l=r.is_wx_pay,p=0,m=!1,u=[],b=e("common/wx/Tips.js"),f=e("cardticket/clickreport.js"),y=r.refill_data,h=!0;
$.extend(y,r.stuffs),"undefined"==typeof y.primary_category_id&&(y.primary_category_id=""),
"undefined"==typeof y.secondary_category_id&&(y.secondary_category_id=""),e("common/wx/stopMultiRequest.js"),
e("cardticket/common_template_helper.js"),e("biz_common/jquery.validate.js");
var j=new t({
container:"#stepItems",
selected:1,
names:["1 查看服务协议","2 填写信息","3 资料预览","4 提交成功"]
}),g=[],v=[],z=e("tpl/cardticket/apply_card_deal.html.js");
v.push(function(){
$("#js_agree_container").html(z),$("#js_agree").click(function(){
s(2);
});
}),v.push(function(){
function t(e){
for(var i=[],_=0;_<e.length;_++)0!=e[_].status&&(i.push({
name:e[_].category_name,
value:e[_].primary_category_id
}),w[e[_].primary_category_id]=e[_]);
v=new d({
container:"#js_primary_category",
data:i,
callback:function(e,i){
$("#js_primary_category_hidden").val(e),$("#js_primary_category_str").val(i),y.selected_pid=e,
c(e,i);
}
}).selected(h?y.primary_category_id+""||0:0),h=!1;
}
function a(e){
return 305==e||818==e||812==e||819==e;
}
function c(e){
var i=w[e]&&w[e].secondary_category;
i||(i=[]);
for(var s=[],t=0;t<i.length;t++)0!=i[t].status&&(s.push({
name:i[t].category_name,
value:i[t].secondary_category_id
}),k[i[t].secondary_category_id]=i[t]);
z=new d({
container:"#js_secondary_category",
data:s,
callback:function(e,i){
if(y.sid=e,$("#js_secondary_category_hidden").val(e),$("#js_secondary_category_str").val(i),
e){
var s=k[e];
if(s){
if(0==s.can_choose_prepaid_card?(f.prop("checked")&&f.click(),r.disabled(!0)):r.disabled(!1),
0==s.can_choose_payment_card?(j.prop("checked")&&j.click(),b.disabled(!0)):b.disabled(!1),
p=0,!l){
var t=s.need_qualification_stuffs,c=$("#js_apply_files").html("");
u=t;
for(var d=0;d<t.length;d++){
var e=t[d],o=e+"_tpl";
e&&$("#"+o).length&&(p++,y.edit_business_license=a(y.sid),c.append(template.render(o,{
data:y
})));
}
_($(".js_select_file",c));
}
n(),"10"==$("#js_primary_category_hidden").val()?$("#js_other_cat").show():$("#js_other_cat").hide();
}
}
}
}).selected(h?y.secondary_category_id+""||0:0);
}
$("#js_step2_content").html(template.render("js_step2_tpl",{
data:y
}));
var r,b,f=$("#js_prepaycard_checkbox"),j=$(".js_paycard"),g=$("#js_prepay_files");
r=f.checkbox({
onChanged:function(e){
var i=e.prop("checked");
i?(g.html(template.render("js_prepay_tpl",{
data:y
})),_(g.find(".js_select_file")),m=!0):(m=!1,g.html("")),n();
}
}),y.is_send_prepaid_card&&f.click(),b=j.checkbox(),$("#js_freecard").checkbox().disabled(!0),
_($(".js_select_file")),i({
container:".js_maxlength",
max:30,
hint:".js_hint"
});
var v,z,w={},k={};
t(o),$("#js_prev_step1").click(function(){
s(1);
}),$("#js_next_step3").click(function(){
$("#js_apply_form").submit();
}),n();
for(var x=["business_license_id","business_license_bizmedia_id","hygienic_license_id","hygienic_license_bizmedia_id","food_hygienic_license_id","food_hygienic_license_bizmedia_id","entertainment_business_license_id","entertainment_business_license_bizmedia_id","intermediary_license_id","intermediary_license_bizmedia_id","property_manage_certificate_id","property_manage_certificate_bizmedia_id","travel_business_license_id","travel_business_license_bizmedia_id","hotel_business_license_id","hotel_business_license_bizmedia_id","civil_airtransport_certificate_id","civil_airtransport_certificate_bizmedia_id","cosmetics_license_id","cosmetics_license_bizmedia_id","circulation_license_id","circulation_license_bizmedia_id","inspecting_certificate_id","inspecting_certificate_bizmedia_id","industrial_production_license_id","industrial_production_license_bizmedia_id","publication_business_license_id","publication_business_license_bizmedia_id","prepaid_card_record_id","prepaid_card_record_bizmedia_id","bank_custody_agreement_bizmedia_id","food_service_license_id","food_service_license_bizmedia_id","special_business_license_id","special_business_license_bizmedia_id","fire_safety_license_id","fire_safety_license_bizmedia_id","medical_institution_license_id","medical_institution_license_bizmedia_id","express_business_license_id","express_business_license_bizmedia_id","health_food_enterprises_hygiene_license_id","health_food_enterprises_hygiene_license_bizmedia_id","health_food_approval_certificate_id","health_food_approval_certificate_bizmedia_id","food_production_licence_id","food_production_licence_bizmedia_id","wine_production_license_id","wine_production_license_bizmedia_id","wine_retail_license_id","wine_retail_license_bizmedia_id","tele_business_license_id","tele_business_license_bizmedia_id","food_hygiene_licence_id","food_hygiene_licence_id_bizmedia_id","animal_medical_license_id","animal_medical_license_bizmedia_id","open_school_license_id","open_school_license_bizmedia_id","drug_business_license_id","drug_business_license_bizmedia_id","food_circulation_license_id","food_circulation_license_bizmedia_id","wine_circulation_license_id","wine_circulation_license_bizmedia_id","value_added_tele_business_license_id","value_added_tele_business_license_bizmedia_id","authorization_grant_license_id","authorization_grant_license_bizmedia_id","transport_business_licenses_id","transport_business_licenses_bizmedia_id","financial_business_licenses_id","financial_business_licenses_bizmedia_id","insurance_operational_licenses_id","insurance_operational_licenses_bizmedia_id"],q=["营业执照编号","","卫生许可证编号","","餐饮生许可证编号","","娱乐经营许可证编号","","职业中介许可证编号","","物业管理企业资质证书编号","","旅行社业务经营许可证编号","","旅馆业特种行业许可证编号","","经营民用航空旅客运输和货物运输销售代理资格编号","","化妆品卫生许可证编号","","流通许可证编号","","出入境检疫证书编号","","工业品生产许可证编号","","出版物经营许可证编号","","预付卡备案编号","","","餐饮服务许可证","","特种经营许可证","","消防安全许可证","","医疗机构执业许可证","","快递业务经营许可证","","保健食品经营企业卫生许可证","","保健食品批准证书","","食品生产许可证","","酒类生产许可证","","酒类零售许可证","","电信业务经营许可证","","食品卫生许可证","","动物诊疗许可证","","办学许可证","","药品经营许可证","","食品流通许可证","","酒类流通备案登记证编号","","增值电信业务经营许可证编号","","授权许可文件编号","","运输经营许可证编号","","金融许可证编号","","经营保险业务许可证编号",""],C={},M={},T=0;T<x.length;T++){
var B=x[T],D=q[T];
C[B]={
required:!0
},M[B]={
required:D?D+"不能为空":"请选择文件"
};
}
y.view_mode=wx.cgiData.view_mode;
var F=e("cardticket/apply_logo.js");
F({
container:$("#js_logo_container"),
data:y
}),$("#js_apply_form").validate({
rules:$.extend(!0,C,{
logo:{
required:!0
},
brand_name:{
required:!0,
utf8byteMaxLength:24
},
agree:{
required:!0
},
primary_category_id:{
required:!0
},
secondary_category_id:{
required:!0
},
service_content:{
required:!0,
maxlength:30
}
}),
messages:$.extend(!0,M,{
brand_name:"商户名称不能为空且长度不超过12个汉字或24个英文字母",
logo:{
required:"请上传文件"
},
agree:{
required:"请先同意协议"
},
primary_category_id:{
required:"请选择一级类目"
},
secondary_category_id:{
required:"请选择二级类目"
},
service_content:{
required:"请提供服务或商品说明",
maxlength:"商品或服务说明最多30个字"
}
}),
errorPlacement:function(e,i){
var _=i.closest(".frm_controls");
_.find(".fail").remove();
var n=_.find(".frm_tips");
i.is(".file_field")?e.insertBefore(_.find(".upload_preview")):n.length?e.insertBefore(n):_.append(e);
},
ignore:[],
submitHandler:function(){
s(3,!0);
}
});
}),v.push(function(){
var e=$("#js_apply_form").serializeObject();
e.stuffs=u,$("#js_step3_content").html(template.render("js_step3_preview",{
data:e
})),$("#js_prev_step2").click(function(){
s(2);
}),$("#js_submit_btn").click(function(){
var e=$("#js_apply_form").serializeObject();
a.post({
url:"/merchant/cardapply?action=applycardfunc",
data:e,
btn:this
},function(e){
0==e.base_resp.ret?(b.suc("提交成功"),f.timeonpage({
actionid:16
}),s(4)):a.show(e);
});
});
}),v.push(function(){
$("#js_body_content").html(template.render("js_finish_tpl"));
}),function(){
v[1](),g[1]=!0,s(1);
}(),e("cardticket/common_init.js");
});