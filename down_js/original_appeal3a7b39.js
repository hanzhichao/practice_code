define("home/original_appeal.js",["biz_web/utils/upload.js","common/wx/Cgi.js","common/wx/Tips.js","biz_common/moment.js"],function(e){
"use strict";
var i=e("biz_web/utils/upload.js"),a=i.uploadTmpFile,t=e("common/wx/Cgi.js"),r=e("common/wx/Tips.js"),o=e("biz_common/moment.js");
$("#time").text(o.unix(wx.cgiData.submit_time).format("YYYY年MM月DD日")),wx.cgiData.appeal_proof&&$("#stuffList").append('<a href="{href}" target="_blank"><img src="{src}" class="pic_preview"></a>'.format({
href:i.mediaFileUrl(wx.cgiData.appeal_proof),
src:i.mediaFileUrl(wx.cgiData.appeal_proof)
})),$(".js_input").keyup(function(){
var e=$(this);
e.next(".js_inputLen").text(e.val().length+"/200");
});
var n=[],l=0;
a({
container:"#upload",
type:2,
multi:!1,
onAllComplete:function(){
l=1,$("#upload").text("重新上传");
},
onComplete:function(e,a,t,o){
switch(l&&(n=[],$("#picView").hide().children().remove(),l=0),+o.base_resp.ret){
case 0:
r.suc("上传成功"),n.url=o.content,$("#picView").show().append('<a href="{href}" target="_blank"><img class="upload_preview_pic" src="{src}"></a>'.format({
href:i.tmpFileUrl(o.content),
src:i.tmpFileUrl(o.content)
})),n.push(o.content);
break;

case 1:
r.err("图片太大");
break;

case-11:
r.err("请上传合法的图片格式");
}
}
}),$("#bt").click(function(){
var e=$("#js_input"),i=$(this);
if(!i.hasClass("btn_disabled")){
if(i.addClass("btn_disabled"),0==e.val().length)return r.err("申诉原因不能为空"),void i.removeClass("btn_disabled");
if(e.val().length>200)return r.err("申诉原因长度超限"),void i.removeClass("btn_disabled");
if(n.length>0){
if(1!=n.length)return r.err("只能上传一张图片"),void i.removeClass("btn_disabled");
var a="/cgi-bin/appmsgcopyright?action=submit_appeal&token="+wx.data.t,o=$("#original_link").val()||"";
t.post({
url:a,
data:{
article_url:encodeURIComponent(wx.cgiData.article_url),
original_url:encodeURIComponent(wx.cgiData.original_url),
original_type:wx.cgiData.original_type,
appeal_reason:e.val().trim(),
appeal_proof:n.join(","),
user_original_url:encodeURIComponent(o)
}
}).success(function(e){
console.log(e),0==e.base_resp.ret?$("#okDiv").show().siblings().hide():r.err();
});
}else r.err("申诉材料不能为空"),i.removeClass("btn_disabled");
}
});
});