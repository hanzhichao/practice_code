define("home/appeal_ban.js",["biz_web/utils/upload.js","common/wx/Cgi.js","common/wx/Tips.js","biz_common/moment.js"],function(e){
"use strict";
var t=e("biz_web/utils/upload.js"),a=t.uploadTmpFile,n=e("common/wx/Cgi.js"),i=e("common/wx/Tips.js"),c=e("biz_common/moment.js"),r=wx.cgiData.illegal_record,s=wx.cgiData.appeal_material,l=wx.cgiData.check_status,o={
1:"审核中",
2:"未通过",
3:"已通过"
},p={
1:"",
2:"warn",
3:"success"
};
if($("#time").text(c.unix(wx.cgiData.check_create_time).format("YYYY年MM月DD日")),$(".js_content")){
var _=[];
wx.cgiData.illegal_record.each(function(e){
_.push(e.content_url?"<a href='{content_url}' target='_blank'>{content}</a>".format({
content_url:e.content_url,
content:e.content
}):"{content}".format({
content:e.content
}));
}),$(".js_content").html(_.join("；"));
}
if(r){
var u="",m="";
if(1==l)for(var d=0;d<s.length;d++)wx.cgiData.appeal_status[d]=1;else if(3==l&&0==wx.cgiData.appeal_status.length)for(var d=0;d<s.length;d++)wx.cgiData.appeal_status[d]=3;
for(var d=0;d<r.length;d++)u+=template.render("js_appeal_form",{
index:d,
content:r[d].content,
content_url:r[d].content_url
});
$("#js_form").prepend(u);
for(var d=0;d<s.length;d++)m+=template.render("js_readonly_content",{
content:r[d].content,
content_url:r[d].content_url,
reason:s[d].reason,
href:t.mediaFileUrl(s[d].data),
src:t.mediaFileUrl(s[d].data),
status:o[wx.cgiData.appeal_status[d]],
status_class:p[wx.cgiData.appeal_status[d]]
});
$("#js_appeal").after(m);
}
if($(".js_input").keyup(function(){
var e=$(this);
e.next(".js_inputLen").text(e.val().length+"/200");
}),r[0]){
for(var f=r.length,h=[],g=[],w=0,d=0;f>d;d++)!function(){
var e=d;
a({
container:"#upload_"+e,
type:2,
multi:!1,
onAllComplete:function(){
$("#picView_"+e).data("file","1"),$("#upload_"+e).text("重新上传");
},
onComplete:function(a,n,c,r){
switch(+$("#picView_"+e).data("file")&&($("#picView_"+e).hide().children().remove(),
$("#picView_"+e).data("file","0")),+r.base_resp.ret){
case 0:
i.suc("上传成功"),$("#picView_"+e).show().append('<a href="{href}" target="_blank"><img class="upload_preview_pic" src="{src}"></a>'.format({
href:t.tmpFileUrl(r.content),
src:t.tmpFileUrl(r.content)
})),h[e]=r.content;
break;

case 1:
i.err("图片太大");
break;

case-11:
i.err("请上传合法的图片格式");
break;

default:
i.err("上传图片失败");
}
}
});
}();
$("#bt").click(function(){
for(var e=$(this),t={
id:"",
appeal_materials:{},
punish_type:""
},a=[],c=0,r=0;r<h.length;r++)void 0!==h[r]&&c++;
if($(".js_input").each(function(t,a){
return 0==$(a).val().length?(i.err("申诉原因不能为空"),e.removeClass("btn_disabled"),w=0,
!1):$(a).val().length>200?(i.err("申诉原因长度超限"),e.removeClass("btn_disabled"),w=0,!1):(g[t]=$(a).val(),
void(w=1));
}),0!=w)if(c==f){
if(e.hasClass("btn_disabled"))return;
e.addClass("btn_disabled"),t.id=wx.cgiData.id,t.punish_type=wx.cgiData.punish_type;
for(var r=0;f>r;r++)a.push({
reason:g[r],
data:h[r]
});
t.appeal_materials={
appeal_material:a
},t.appeal_materials=JSON.stringify(t.appeal_materials);
var s="/misc/appealban?action=submit&ticket_id="+wx.cgiData.ticket_id+"&ticket="+wx.cgiData.ticket;
(185==wx.cgiData.check_type||137==wx.cgiData.check_type)&&(s+="&auth=ticket"),n.post({
url:s,
data:t,
check_type:wx.cgiData.check_type
}).success(function(e){
console.log(e),0==e.base_resp.ret?$("#okDiv").show().siblings().hide():i.err();
});
}else i.err("申诉材料不能为空"),e.removeClass("btn_disabled");
});
}
});