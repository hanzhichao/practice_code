define("mass/experiment.js",["common/wx/popup.js","biz_common/jquery.validate.js","common/wx/Cgi.js","common/wx/popover.js","common/wx/Tips.js","biz_web/utils/upload.js","biz_web/ui/checkbox.js"],function(e){
"use strict";
function t(e){
var t='<div class="upload_preview_item">                 <img src="%s" style="width:200px;">             </div>';
return t.sprintf(e);
}
function i(e,i){
e.each(function(){
var e=$(this),n=e.attr("id"),s=e.attr("data-max")||1,a=e.attr("data-type")||2;
!function(e,n){
c.uploadCdnFile({
container:"#"+e,
multi:s>1?!0:!1,
type:n,
onSelect:function(){},
onError:function(){},
onCancel:function(){},
onComplete:function(n,c,a,r){
var l=r.content||"";
if(0==r.base_resp.ret){
var u=$("#"+e+"_preview");
1>=s?u.html(t(l,"preview")):u.append(t(l,"preview")),u.parent().find(".fail").remove(),
$("#"+e+"_hidden").val(l),i&&i(l),o.suc("上传成功");
}
}
});
}(n,a);
});
}
e("common/wx/popup.js");
e("biz_common/jquery.validate.js");
{
var n=e("common/wx/Cgi.js"),s=e("common/wx/popover.js"),o=e("common/wx/Tips.js"),c=e("biz_web/utils/upload.js");
e("biz_web/ui/checkbox.js");
}
$.validator.addMethod("link",function(e,t){
return this.optional(t)||/^https?:\/\//.test(e);
}),$("#js_search_result").html(template.render("js_list_tpl",{
data:wx.cgiData.material_list
})),$("#js_btn_add").click(function(){
var e=!1,t=$("#js_add_tpl").popup({
title:"添加素材",
onHide:function(){
this.remove();
},
buttons:[{
text:"确定",
type:"primary",
click:function(){
if(s.valid()||e){
e=!0;
var t=s.serializeObject();
n.post({
url:"/cgi-bin/masssendexperiment?action=add",
data:t,
complete:function(){
e=!1;
}
},function(e){
0==e.base_resp.ret?(o.suc("添加成功"),location.reload()):n.show(e);
});
}
}
},{
text:"取消",
click:function(){
this.hide();
}
}]
}),s=$("#js_mass_build");
s.validate({
rules:{
url:{
required:!0,
link:!0
},
title:{
required:!0
},
big_pic:{
required:!0
}
},
ignore:[],
messages:{
url:{
required:"请输入链接",
link:"链接必须以http开头"
},
title:"标题不能为空",
big_pic:{
required:"请上传封面大图"
}
},
errorPlacement:function(e,t){
var i=t.parent(),n=i.parent(),s=n.find(".frm_tips");
n.find("p.fail").remove(),s.length?e.insertBefore(s):e.appendTo(n);
},
submitHandler:function(e){
callback&&callback(e);
},
invalidHandler:function(e,t){
var i=$(t.errorList[0].element);
i.focus();
}
}),i(s.find(".js_select_file"),function(){
t.popup("resetPosition");
});
});
var a=!1;
$("#js_search_result").on("click",".js_delete",function(){
if(a)return!1;
var e=$(this).attr("data-mid");
return a=!0,n.post({
url:"/cgi-bin/masssendexperiment?action=del",
data:{
material_id:e
},
success:function(e){
0==e.base_resp.ret?(o.suc("删除成功"),location.reload()):n.show(e);
},
complete:function(){
a=!1;
}
}),!1;
}).on("click",".js_detail",function(){
var e=$(this).attr("data-idx");
e=parseInt(e);
var t=wx.cgiData.material_list[e];
return console.log(t),$("#js_detail_tpl").popup({
data:t,
title:"详情",
onHide:function(){
this.remove();
},
buttons:[{
text:"关闭",
click:function(){
this.hide();
}
}]
}),!1;
}),$("#js_search_result").find(".js_select_all").checkbox({
onChanged:function(e){
$("#js_search_result .js_select").checkbox().checked($(e).prop("checked")?!0:!1);
}
}),$("#js_search_result .js_select").checkbox({
onChanged:function(){}
});
$("#js_btn_send").click(function(){
var e=$("#js_search_result .js_select"),t=[];
return e.each(function(){
$(this).prop("checked")&&t.push($(this).attr("data-mid"));
}),t.length?(console.log("selected_ids",t),new s({
dom:$(this),
content:template.render("js_send_tpl",{
select_count:t.length
}),
hideIfBlur:!0,
className:"popover_batch",
buttons:[{
text:"确认群发",
type:"primary",
click:function(){
a=!0;
var e=parseInt($("#js_maxcount").val());
return isNaN(e)||0>=e?void $("#js_maxcount_fail").show():e>t.length?void o.err("超出已选素材数量"):e>8?void o.err("最多只能选择8条素材"):$(".js_send_time_type").prop("checked")?(n.post({
url:"/cgi-bin/masssendexperiment?action=send",
data:{
material_id_list:t.join("|"),
max_count:e,
is_set_time:$(".js_send_time_type").prop("checked")?1:0
},
success:function(e){
0==e.base_resp.ret?(o.suc("发送成功"),location.reload()):n.show(e);
},
complete:function(){
a=!1;
}
}),!1):void o.err("请勾选使用默认的发送时间策略");
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
}),$("#js_maxcount").keyup(function(){
var e=parseInt($(this).val());
isNaN(e)?$("#js_maxcount_fail").show():$("#js_maxcount_fail").hide();
}),void $(".js_send_time_type").checkbox()):(o.err("请选择素材"),!1);
});
});