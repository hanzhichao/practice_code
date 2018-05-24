define("cardticket/apply_detail.js",["cardticket/common_template_helper.js","biz_web/ui/dropdown.js","common/wx/Tips.js","biz_common/jquery.validate.js","biz_common/moment.js","cardticket/apply_logo.js","common/wx/Cgi.js","cardticket/common_init.js"],function(e){
"use strict";
function a(){
function e(e){
for(var r=[],o=0;o<e.length;o++)0!=e[o].status&&(r.push({
name:e[o].category_name,
value:e[o].primary_category_id
}),_[e[o].primary_category_id]=e[o]);
n=new t({
container:"#js_primary_category",
data:r,
callback:function(e,t){
a(e,t);
}
}).selected(s.primary_category_id+""||0);
}
function a(e){
var a=_[e]&&_[e].secondary_category;
a||(a=[]);
for(var r=[],o=0;o<a.length;o++)0!=a[o].status&&(r.push({
name:a[o].category_name,
value:a[o].secondary_category_id
}),d[a[o].secondary_category_id]=a[o]);
c=new t({
container:"#js_secondary_category",
data:r,
callback:function(){}
}).selected(s.secondary_category_id+""||0);
}
var n,c,s=o,_={},d={};
e(i),n&&n.disable(),c&&c.disable(),s.default_logo=wx.cgiData.logo_url,s.tips="每次修改30天后方可再次修改，请谨慎修改",
l({
container:$("#js_logo_container"),
data:s
}),$("#js_apply_form").validate({
rules:{
logo:{
required:!0
},
brand_name:{
required:!0,
utf8byteMaxLength:24
}
},
messages:{
brand_name:"商户名称不能为空且长度不超过12个汉字或24个英文字母",
logo:{
required:"请上传文件"
}
},
errorPlacement:function(e,a){
var t=a.closest(".frm_controls");
t.find(".fail").remove();
var r=t.find(".frm_tips");
a.is(".file_field")?e.insertBefore(t.find(".upload_preview")):r.length?e.insertBefore(r):t.append(e);
},
ignore:[],
submitHandler:function(){}
});
var m=$("#js_apply_form").on("submit",function(){
return!1;
});
$("#js_update_submit").click(function(){
if(m.valid()){
var e=m.serializeObject();
$(this).btn(!1),p.post({
url:"/merchant/cardapply",
data:{
action:"updatemerchantinfo",
logo:e.logo,
brand_name:e.brand_name
},
btn:this,
complete:function(){
$(this).btn(!0);
},
success:function(e){
0==e.base_resp.ret?(r.suc("修改成功"),location.reload()):p.show(e);
}
});
}
});
}
e("cardticket/common_template_helper.js");
for(var t=e("biz_web/ui/dropdown.js"),r=e("common/wx/Tips.js"),o=(e("biz_common/jquery.validate.js"),
e("biz_common/moment.js"),wx.cgiData.refill_data),i=wx.cgiData.category_info,n=!1,c=[],s=0;s<i.length;s++){
if(i[s].primary_category_id==o.primary_category_id)for(var _=i[s].secondary_category,d=0;d<_.length;d++)if(_[d].secondary_category_id==o.secondary_category_id){
o.primary_category_str=i[s].category_name,o.secondary_category_str=_[d].category_name,
c=_[d].need_qualification_stuffs,n=!0;
break;
}
if(n)break;
}
o.stuffs=c,o.status=wx.cgiData.status,$.extend(o,wx.cgiData.stuffs);
var m=+new Date/1e3;
o.can_modify=o.next_modify_time&&o.next_modify_time>m?!1:!0,$("#js_preview_section").html(template.render("js_apply_preview",{
data:o
}));
var l=e("cardticket/apply_logo.js"),p=e("common/wx/Cgi.js");
$("#js_update").click(function(){
$("#js_preview_section").html(template.render("js_update_tpl",{
data:o
})),a();
}),e("cardticket/common_init.js");
});