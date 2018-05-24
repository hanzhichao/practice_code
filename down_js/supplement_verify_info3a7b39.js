define("wxverify/supplement_verify_info.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_common/jquery.validate.js","biz_web/utils/upload.js","biz_common/moment.js","common/wx/stopMultiRequest.js"],function(e){
"use strict";
function t(e){
1!=e.state?($("#js_supple_reason").hide(),$("#js_submit_force").hide(),$("#js_formArea").html(a("allTypes",e))):($("#js_supple_reason").show(),
$("#js_submit_force").show(),$("#js_formArea").html(a("allTypes",e)));
}
var a=template.render,s=e("common/wx/Cgi.js"),i=e("common/wx/Tips.js"),n=(e("biz_common/jquery.validate.js"),
e("biz_web/utils/upload.js")),r=wx.cgiData,o=e("biz_common/moment.js");
e("common/wx/stopMultiRequest.js"),function(){
if(template.helper("$tmpFileUrl",function(e){
return n.mediaFileUrl(e);
}),""!=r.data.reason){
var e="由于%s，请在%s之前%s，否则过期后不能再使用公众平台",a=[];
$.each(r.data.stuff.item,function(e,t){
a.push(t.filename);
}),$("#js_reason").html(e.sprintf(r.data.remark||r.data.reason,o.unix(r.data.deadline).format("YYYY年MM月DD日"),r.data.remark?"重新提交":"提交"+a.join("、")));
}else $("#js_reason").hide();
for(var s=r.data.stuff.item,i=0;i<s.length;i++)s[i].index=i;
1==r.data.state&&o().unix()>r.data.deadline,t(r.data);
}(),function(){
$(".js_select_file").each(function(){
var e=$(this),t=e.attr("id"),a=e.attr("data-type")||2;
!function(e,t){
n.uploadTmpFile({
container:"#"+e,
multi:!1,
type:t,
onComplete:function(a,s,r,o){
var m=o.content||"";
if(0==o.base_resp.ret){
var l,f=$("#"+e+"_preview"),c=f.parent().find(".js_select_file");
if(2==t)f.html('<img src="%s">'.sprintf(n.tmpFileUrl(m)));else{
var l=f.parent().find("i.success").show();
l.length?l.html("已上传：{name}".format({
name:r.name
})):l=$('<i class="frm_msg success">已上传：{name}</i>'.format({
name:r.name
})).insertBefore(f).show();
}
c.text("重新上传");
var u=$("#"+e+"_hidden");
u.val(m),$("#"+e+"_file_name_hidden").val(r.name),f.parent().parent().find(".fail").remove(),
i.suc("上传成功");
}
}
});
}(t,a);
});
}(),function(){
for(var e={},a={},n=r.data.stuff.item,o=0;o<n.length;o++)e["file_"+o]="required",
a["file_"+o]="必填";
var m=$("#js_submit_force");
$("#js_supplementVerifyInfo").validate({
rules:$.extend(!0,{
appeal:{}
},e),
messages:$.extend(!0,{
appeal:{
required:"请输入申述理由"
}
},a),
ignore:[],
errorPlacement:function(e,t){
var a=t.parent().parent();
a.find(".fail").remove(),a.append(e);
},
submitHandler:function(e){
var a=$(e).serializeObject();
return a.forceid=wx.cgiData.forceid,s.post({
url:"/acct/forceverify",
data:a,
mask:!1,
btn:m
},function(e){
var a=e.base_resp.ret;
if(0==a)i.suc("提交材料成功"),t({
state:2
});else switch(a){
case 200019:
i.err("链接已失效");
break;

default:
s.show(e);
}
}),!1;
}
}),$("#js_submit_state").click(function(){
return r.data.state=1,t(r.data),!1;
});
}();
});