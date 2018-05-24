define("cardticket/apply_grade.js",["common/wx/Step.js","common/wx/Cgi.js","biz_web/utils/upload.js","cardticket/area_selector.js","biz_web/ui/dropdown.js","common/wx/Tips.js","common/wx/sosomap/citydata.js","common/wx/sosomap/util.js","cardticket/common_template_helper.js","biz_common/jquery.validate.js","common/wx/stopMultiRequest.js"],function(e){
"use strict";
function t(e){
e.each(function(){
var e=$(this),t=e.attr("id");
!function(t){
_.uploadTmpFile({
container:"#"+t,
multi:!1,
type:2,
onComplete:function(t,i,s,n){
var a=n.content||"",o=e.closest(".js_upload_box");
if(0==n.base_resp.ret){
$(".js_upload_preview",o).html('<img style="width:200px;" src="%s">'.sprintf(_.tmpFileUrl(a)));
var r=$(".js_input_field",o).val("temp_"+a);
r.parent().parent().find(".fail").remove(),c.suc("上传成功");
}
}
});
}(t);
});
}
function i(e){
b.go(e),$(".js_step_content").hide(),$("#js_step"+e+"_content").show();
}
var s,n=e("common/wx/Step.js"),a=e("common/wx/Cgi.js"),_=e("biz_web/utils/upload.js"),o=e("cardticket/area_selector.js"),r=e("biz_web/ui/dropdown.js"),c=e("common/wx/Tips.js"),l=$("#js_apply_form"),u=20,d=e("common/wx/sosomap/citydata.js"),p=e("common/wx/sosomap/util.js"),m=(e("cardticket/common_template_helper.js"),
wx.cgiData),j=m.rating_stuff;
e("biz_common/jquery.validate.js"),e("common/wx/stopMultiRequest.js");
var b=new n({
container:"#stepItems",
selected:1,
names:["1 填写信息","2 资料预览","3 提交成功"]
});
$("#js_step1_content").html(template.render("js_step1_tpl",{
data:j
})),function(){
i(1),$("#js_next_step2").click(function(){
l.submit();
}),t($(".js_select_file"));
var e=$("#js_audit_report_container"),n=$("#js_business_volumn_hidden");
j.is_travel_category||(new r({
container:"#js_business_volumn",
data:[{
name:"50万以下",
value:"1"
},{
name:"50-100万",
value:"2"
},{
name:"100-500万",
value:"3"
},{
name:"500-1000万",
value:"4"
},{
name:"1000万以上",
value:"5"
}],
callback:function(t){
n.val(t),t>=3?e.show():e.hide();
}
}).selected(0),d.loadData(function(e){
function t(){
this.is_big_city=!1;
for(var e=this.getValue()||[],t=0;t<e.length;t++)if(a.indexOf(e[t].name+",")>=0){
this.is_big_city=!0;
break;
}
this.is_big_city?$("#js_entity_shop_container").show():$("#js_entity_shop_container").hide();
}
e=e.sub;
for(var i=0;i<e.length;i++)if(p.isTerritory(e[i].name)){
e[i].sub=[$.extend({},e[i])];
var n=parseInt(e[i].sub[0].id);
e[i].sub[0].id=n+1;
}
var a="北京市,广州市,深圳市,上海市,";
s=new o({
container:"#js_area_select",
disableLevel1Select:!0,
min:0,
max:u,
data:e,
onchanged:t
});
var _=m.rating_stuff.entity_shop_city_id?m.rating_stuff.entity_shop_city_id.split("|"):[];
_&&s.setItemsByID(_),t.call(s);
}));
}(),function(){
l.validate({
rules:{
audit_report_bizmedia_id:{
required:function(){
return $("#js_business_volumn_hidden").val()>="3";
}
},
entity_shop_business_license_bizmedia_id:{
required:function(){
return s&&s.is_big_city;
}
},
registered_capital:{
required:!0,
digits:!0
},
scenic_spot_quality_evaluation_id:{
required:!0
},
scenic_spot_quality_evaluation_bizmedia_id:{
required:!0
},
entity_shop_num:{
digits:!0
}
},
messages:{
audit_report_bizmedia_id:{
required:"请上传文件"
},
entity_shop_business_license_bizmedia_id:{
required:"请上传文件"
},
scenic_spot_quality_evaluation_id:{
required:"等级证明编号不能为空"
},
scenic_spot_quality_evaluation_bizmedia_id:{
required:"请上传文件"
},
registered_capital:{
required:"公司注册资本只能是数字",
digits:"公司注册资本只能是数字"
},
entity_shop_num:{
digits:"门店总量只能是整数"
}
},
ignore:[],
errorPlacement:function(e,t){
"registered_capital"==t.attr("name")?t.closest(".input_supply").append(e):t.parent().after(e);
},
submitHandler:function(e){
var t=$(e).serializeObject(),n=s?s.getValue():[];
if(!t.entity_shop_num||t.entity_shop_num>0&&!n.length)return void c.err("门店数量不为空, 请至少选择一家门店");
i(2),$("#js_step2_content").html(template.render("js_step2_tpl",{
data:t,
citys:n,
is_travel_category:j.is_travel_category,
is_big_city:s&&s.is_big_city
}));
for(var _=[],o=[],r=0;r<n.length;r++)_.push(n[r].id),o.push(n[r].name);
$("#js_prev_step1").click(function(){
i(1);
}),$("#js_submit_btn").click(function(){
var e=l.serializeObject();
a.post({
url:"/merchant/cardapply?action=applyrating",
data:e,
btn:this
},function(e){
0==e.base_resp.ret?(c.suc("申请商户评级成功"),i(3)):a.show(e);
});
}),$("#js_entity_shop_city_id").val(_.join("|")),$("#js_entity_shop_city").val(o.join("|"));
}
});
}();
});