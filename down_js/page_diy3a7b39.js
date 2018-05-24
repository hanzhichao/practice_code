define("ibeacon/page_diy.js",["common/wx/Step.js","common/wx/Cgi.js","biz_web/ui/input/lentips.js","biz_web/utils/upload.js","common/wx/Tips.js"],function(u){
"use strict";
var F=u("common/wx/Step.js"),e=u("common/wx/Cgi.js"),t=u("biz_web/ui/input/lentips.js"),i=u("biz_web/utils/upload.js"),a=u("common/wx/Tips.js"),c=$("#js_title"),s=$("#js_comment"),n=$("#js_desc"),r=$("#js_title_tips"),o=$("#js_comment_tips"),d=$("#js_desc_tips"),p=$("#js_title_view"),l=$("#js_desc_view"),_=$("#js_img_view"),D=$("#js_qrcode_view"),m=($(".js_prev"),
$(".js_submit")),w=$("#js_choose_img"),g=$("#js_url"),f={
page_id:wx.cgiData.page.page_id||0,
pic_url:wx.cgiData.page.pic_url||"",
title:wx.cgiData.page.title||"",
desc:wx.cgiData.page.desc||"",
page_url:wx.cgiData.page.page_url||"",
comment:wx.cgiData.page.comment||""
},b=function(){
wx.cgiData.page.page_id||4==wx.cgiData.service_type||new F({
container:"#js_step_bar",
selected:2,
names:["1 选择页面类型","2 编辑页面"]
});
},j=function(){
new t({
input:c,
tip:r,
maxlimit:6,
trim:!0,
callback:function(u,F){
f.title=F.value.substr(0,6),p.html(f.title);
}
}),new t({
input:n,
tip:d,
maxlimit:7,
trim:!0,
callback:function(u,F){
f.desc=F.value.substr(0,6),l.html(f.desc);
}
});
var u=i.uploadCdnFileWithCheck({
width:200,
height:200
});
u({
container:w,
multi:!1,
type:2,
onComplete:function(u,F,e,t){
var i=t.content||"";
switch(+t.base_resp.ret){
case 0:
a.suc("上传成功"),w.html("重新选择"),_.prop("src",i),f.pic_url=window.encodeURIComponent(i);
break;

case 200034:
a.err("图片尺寸不能大于200*200");
break;

case 1:
a.err("图片太大");
break;

case 200011:
a.err("请上传合法的图片格式");
break;

default:
a.err("上传失败");
}
}
});
},x=function(){
new t({
input:s,
tip:o,
maxlimit:16,
trim:!0,
callback:function(u,F){
f.comment=F.value.substr(0,16);
}
}),g.on("keyup",function(){
D.prop("src",wx.url("/merchant/beacongetqrcode?action=diy&url="+window.encodeURIComponent(g.val()))),
f.page_url=g.val();
});
},C=function(){
m.on("click",function(){
return f.pic_url?f.title?f.desc?f.page_url?/^(https?|s?ftp|weixin):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(f.page_url)?void e.post({
url:wx.url("/merchant/beaconsavepage?action=diy"),
data:{
page:JSON.stringify(f)
},
success:function(u){
0==u.base_resp.ret?location.href=wx.url("/merchant/beaconlistpage?action=list&need_dc=1"):a.err("系统错误");
}
}):(g.focus(),a.err("请输入正确的url格式"),!1):(g.focus(),a.err("请输入跳转URL"),!1):(n.focus(),
a.err("请输入副标题"),!1):(c.focus(),a.err("请输入主标题"),!1):(a.err("请上传logo图片"),!1);
});
},z=function(){
b(),j(),x(),C();
};
z();
});