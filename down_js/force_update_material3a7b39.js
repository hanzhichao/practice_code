define("setting/force_update_material.js",["biz_web/utils/upload.js","common/wx/Cgi.js","biz_web/lib/json.js","common/wx/Tips.js","biz_common/moment.js"],function(t){
"use strict";
function i(t,i){
var e='<div class="upload_preview_item">                 <img src="%s" style="width:200px;">             </div>';
if("bizmedia"==i)var a=s.mediaFileUrl(t);else if("preview"==i)var a=s.tmpFileUrl(t);else if("multimedia"==i)var a=s.multimediaFileUrl(t);
return e.sprintf(a);
}
function e(t){
$(".js_select_file").each(function(){
var e=$(this),r=e.attr("id"),n=e.attr("data-max")||1,o=e.attr("data-idx"),c=e.attr("data-type")||2;
!function(e,r,o){
s.uploadTmpFile({
container:"#"+e,
multi:n>1?!0:!1,
type:r,
onComplete:function(s,r,n,c){
var m=c.content||"";
if(0==c.base_resp.ret){
var u=$("#"+e+"_preview");
u.html(i(m,"preview")),f[o]=m,a(),t&&t(m),l.suc("上传成功");
}
}
});
}(r,c,o);
});
}
function a(){
for(var t=!0,i=0;i<_.length;i++){
var e=_[i].id;
f[e]?$(".js_upload_fail_"+e).hide():($(".js_upload_fail_"+e).show(),t=!1);
}
return t?$("#js_submit").removeClass("btn_disabled"):$("#js_submit").addClass("btn_disabled"),
t;
}
for(var s=t("biz_web/utils/upload.js"),r=wx.cgiData,n=t("common/wx/Cgi.js"),o=t("biz_web/lib/json.js"),l=t("common/wx/Tips.js"),c=t("biz_common/moment.js"),m=["一","二","三","四","五","六","七","八","九"],u=wx.cgiData.material_list,_=[],d=0;d<u.length;d++)u[d].cn_index=m[d],
(1==u[d].status||5==u[d].status||3==u[d].status)&&_.push(u[d]);
var f={};
$("#js_material_list").html(template.render("js_material_list_tpl",{
material_list:_
})),e();
var p=c.unix(r.expire_time).format("YYYY年MM月DD日");
$(".js_force_update_material_func_expired").text(p),$("#js_submit").click(function(){
var t=[];
for(var i in f)t.push({
material_id:i,
media_id:f[i]
});
return a()&&n.post({
url:"/acct/contractorinfo?action=addcheck",
data:{
result:o.stringify(t)
},
success:function(t){
0==t.base_resp.ret?(l.suc("提交成功"),location.href=wx.url("/acct/contractorinfo?t=setting/owner-setting&action=info")):n.show(t);
}
}),!1;
});
});