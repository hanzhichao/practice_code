define("vote/new.js",["common/wx/popup.js","tpl/vote/vote.html.js","tpl/vote/vote_question.html.js","tpl/vote/vote_item.html.js","biz_web/ui/checkbox.js","common/lib/datepicker.js","biz_web/ui/dateRange.js","biz_web/ui/dropdown.js","common/wx/preview.js","common/wx/upload.js","common/wx/media/imageDialog.js","biz_common/moment.js","common/qq/mask.js","common/wx/Tips.js","biz_common/jquery.validate.js","common/wx/dialog.js","common/wx/Cgi.js","common/wx/inputCounter.js","common/wx/tooltip.js","biz_web/lib/json.js"],function(e){
"use strict";
function t(){
$(".js_new_vote").html(""),$(".js_new_vote").html(template.compile(l)({})),h=$(".js_question_container"),
n(),b=[],0==b.length&&b.push(new a({})),a.refresh(),i();
}
function n(){
var e=$(".vote_container");
e.find(".js_vote_auth .vote_radio").checkbox({
multi:!1
});
var t=e.find("#jsVoteDate").datepicker();
t.datepicker("setDate",3),t.parent().find(".icon_datepicker").click(function(){
t.datepicker("show");
});
var n=new d({
container:e.find("#jsVoteHour"),
data:$.map("00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23".split(","),function(e){
return{
name:e,
value:e
};
}),
callback:function(e){
this.container.data("val",e);
},
search:!1
});
n.selected(0);
var r=new d({
container:e.find("#jsVoteMin"),
data:$.map("00,05,10,15,20,25,30,35,40,45,50,55".split(","),function(e){
return{
name:e,
value:e
};
}),
callback:function(e){
this.container.data("val",e);
},
search:!1
});
r.selected(0);
}
function r(){
var e=$(".js_question_container");
$("#js_add_question").on("click",function(){
var e=$(".js_question").size();
if(e>=_)return c.err("最多只能添加%s个问题".sprintf(_)),!1;
if(!f.form())return!1;
for(var t=0;t<x.length;t++)if(x[t]){
var n=$(".js_question").eq(t);
if(!x[t].form())return n.find(".vote_warn").show(),$("#js_error").show(),!1;
n.find(".vote_warn").hide(),$("#js_error").hide();
}
return a.fold(),b.push(new a({})),b[b.length-1].init(),i(),!1;
}),e.delegate(".js_add_item","click",function(e){
var t=$(e.target),n=t.data("tag");
return b[n].save(),b[n].add(),b[n].refresh(),i(),!1;
}),e.delegate(".js_delete_item","click",function(e){
var t=$(e.target),n=t.data("tag"),r=t.data("item");
return b[n].save(),b[n].remove(n,r),b[n].refresh(),i(),!1;
}),e.delegate(".js_question_edit","click",function(e){
var t=$(e.target),n=t.data("tag");
return"编辑"==t.html()?(t.html("收起"),$(".js_question").eq(n).removeClass("close_vote"),
b[n].open()):(t.html("编辑"),$(".js_question").eq(n).addClass("close_vote"),b[n].fold()),
!1;
}),e.delegate(".js_question_delete","click",function(e){
var t=$(e.target),n=t.data("tag");
return a.save(),b.splice(n,1),a.turn(),a.refresh(),a.fold(),i(),!1;
}),$(".js_complete_bnt").click(function(){
var e=o();
return"disabled"==$(".js_complete_bnt").attr("disabled")?!1:void(e&&($(".js_complete_bnt").btn(!1),
m.post({
url:wx.url("/cgi-bin/newoperatevote?action=create"),
dataType:"json",
data:{
action:"create",
json:e
},
mask:!1
},function(e){
0==e.base_resp.ret?(c.suc("操作成功"),location.href=wx.url("/cgi-bin/newoperatevote?action=list")):($(".js_complete_bnt").btn(!0),
c.err(e.base_resp.err_msg));
})));
}),e.delegate(".link_dele","click",function(e){
var t=$(e.target).parents(".img_container"),n=$(e.target).attr("id"),r=n.replace(/delete/gi,"upload");
return t.hide(),t.find(".preview").data("src","").css({
backgroundImage:""
}),$("#"+r).html("上传图片"),!1;
}),e.on("click",".js_img_preview",function(){
var e=$(this),t=e.parents(".js_img_container"),n=[],r=0;
$(".js_question_container").find(".js_img_container").each(function(e,o){
o===t[0]&&(r=n.length);
var i=$(o).find(".js_img_preview").data("src");
i&&n.push({
imgsrc:i
});
}),n.length>0&&p.show({
imgdata:n,
current:r
});
});
}
function o(){
a.save();
var e=$("#jsVoteDate").datepicker("getDate");
e.setHours(1*$("#jsVoteHour").data("val")),e.setMinutes(1*$("#jsVoteMin").data("val")),
e=parseInt(e.getTime()/1e3);
var t=window.wx.data.time;
if(e-t>15811200||0>e-t)return c.err("投票截止时间只能在当前时间之后，半年之内"),!1;
if(!f.form())return!1;
for(var n=0;n<x.length;n++)if(x[n]){
var r=$(".js_question").eq(n);
if(!x[n].form())return r.find(".vote_warn").show(),!1;
r.find(".vote_warn").hide();
}
for(var o={
title:$("input[name=vote_title]").val(),
vote_permission:"1",
expire_time:e,
vote_subject:[]
},n=0;n<b.length;n++)o.vote_subject[n]={},o.vote_subject[n].title=b[n].title,o.vote_subject[n].type=b[n].type,
o.vote_subject[n].options=b[n].options;
return JSON.stringify2(o);
}
function i(){
f=$("#voteForm").validate({
rules:{
vote_title:{
required:!0,
rangelength:[1,35]
}
},
messages:{
vote_title:{
required:"请填写投票名称",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
}
},
ignore:[],
errorPlacement:function(e,t){
var n=t.parent().parent();
e.insertBefore(n.find(".frm_tips"));
}
}),x=[];
for(var e=0;_>e;e++)x.push($("#question_"+e).validate({
rules:{
question_title:{
required:!0,
rangelength:[1,35]
},
option0:{
required:!0,
rangelength:[1,35]
},
option1:{
required:!0,
rangelength:[1,35]
},
option2:{
required:!0,
rangelength:[1,35]
},
option3:{
required:!0,
rangelength:[1,35]
},
option4:{
required:!0,
rangelength:[1,35]
},
option5:{
required:!0,
rangelength:[1,35]
},
option6:{
required:!0,
rangelength:[1,35]
},
option7:{
required:!0,
rangelength:[1,35]
},
option8:{
required:!0,
rangelength:[1,35]
},
option9:{
required:!0,
rangelength:[1,35]
},
option10:{
required:!0,
rangelength:[1,35]
},
option11:{
required:!0,
rangelength:[1,35]
},
option12:{
required:!0,
rangelength:[1,35]
},
option13:{
required:!0,
rangelength:[1,35]
},
option14:{
required:!0,
rangelength:[1,35]
},
option15:{
required:!0,
rangelength:[1,35]
},
option16:{
required:!0,
rangelength:[1,35]
},
option17:{
required:!0,
rangelength:[1,35]
},
option18:{
required:!0,
rangelength:[1,35]
},
option19:{
required:!0,
rangelength:[1,35]
},
option20:{
required:!0,
rangelength:[1,35]
},
option21:{
required:!0,
rangelength:[1,35]
},
option22:{
required:!0,
rangelength:[1,35]
},
option23:{
required:!0,
rangelength:[1,35]
},
option24:{
required:!0,
rangelength:[1,35]
},
option25:{
required:!0,
rangelength:[1,35]
},
option26:{
required:!0,
rangelength:[1,35]
},
option27:{
required:!0,
rangelength:[1,35]
},
option28:{
required:!0,
rangelength:[1,35]
},
option29:{
required:!0,
rangelength:[1,35]
}
},
messages:{
question_title:{
required:"请填写问题的标题",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option0:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option1:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option2:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option3:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option4:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option5:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option6:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option7:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option8:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option9:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option10:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option11:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option12:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option13:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option14:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option15:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option16:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option17:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option18:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option19:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option20:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option21:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option22:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option23:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option24:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option25:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option26:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option27:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option28:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
},
option29:{
required:"请填写问题的选项",
rangelength:$.validator.format("需要在{0}到{1}个字之间")
}
},
ignore:[],
errorPlacement:function(e,t){
var n=t.parent().parent();
e.insertBefore(n.find(".frm_tips"));
}
}));
for(var t=$(".js_vote_upload_btn"),n=t.length,e=0;n>e;e++){
var r=t.eq(e).attr("id");
!function(e){
g.uploadCdnFile({
container:"#"+e,
url:wx.url("/cgi-bin/filetransfer?action=upload_material"),
multi:!1,
type:2,
accept:{
extensions:"png,jpeg,jpg,gif",
mimeType:"image/png,image/jpeg,image/jpg,image/gif"
},
fileSingleSizeLimit:1048576,
imageSize:!1,
onAllComplete:function(){},
onComplete:function(t,n,r,o,i){
return function(e,t){
switch(+t.base_resp.ret){
case 0:
var n=t.content;
c.suc("上传成功");
var r=(e.replace(/upload/gi,"delete"),$("#"+e).parent().parent().siblings(".img_container"));
r.show(),$("#"+e).html("重新上传"),r.find(".preview").data("src",n).css({
backgroundImage:"url("+n+")"
});
break;

case 200034:
c.err("尺寸建议为300*300像素，大小不能超过1M。");
break;

case 1:
c.err("图片太大");
break;

case 200011:
c.err("请上传合法的图片格式");
break;

case 220001:
c.err('"素材管理"中的存储数量已达到上限，请删除后再操作。');
break;

case 220002:
c.err("你的图片库已达到存储上限，请进行清理。");
break;

default:
c.err("上传图片失败");
}
}(e,o,i);
},
onProgress:function(){},
onSelect:function(){},
canContinueUpload:function(){
return!0/!1;
}
});
}(r);
}
s($("input[type=text][name=vote_title]"),35);
var o=$("input[type=text]");
o.each(function(){
$(this).hasClass("js_option_input")&&s($(this),35);
});
}
function a(e){
this.index=e.index||$(".js_question").size(),this.title=e.title||"",this.type=e.type||1,
this.options=e.options||[{
name:"",
url:""
},{
name:"",
url:""
},{
name:"",
url:""
}];
var t=this.index+1,n=t%10,r=(t-t%10)/10;
this.size=w[r]+j[n],this.show=!0,a.prototype.init=function(){
var e=this.index;
h.append(template.compile('<div class="vote_meta option_setting js_question">'+u+"</div>")(b[e]));
var t=$(".js_question").eq(e);
t.find(".js_vote_type .vote_radio").checkbox({
multi:!1
});
},a.prototype.check=function(){},a.prototype.add=function(){
var e=this.index,t=b[e].options.length;
q>t?b[e].options.push({
name:"",
url:""
}):c.err("最多只能添加%s个选项".sprintf(q));
},a.prototype.remove=function(e,t){
b[e].options.splice(t,1);
},a.prototype.turn=function(){},a.prototype.refresh=function(){
var e=this.index;
$(".js_question").eq(e).html(template.compile(u)(b[e]));
var t=$(".js_question").eq(e);
t.find(".js_vote_type .vote_radio").checkbox({
multi:!1
});
},a.prototype.save=function(){
var e=this.index;
b[e].title=$(".js_question").eq(e).find("input[name=question_title]").val(),b[e].type=$(".js_question").eq(e).find("input[name=isMlt][checked]").val();
var t=$(".js_question").eq(e).find(".js_vote_option"),n=t.find(".frm_input"),r=[];
n.each(function(e,n){
r.push({
name:n.value,
url:t.eq(e).find(".preview").data("src")
});
}),b[e].options=r;
},a.prototype.fold=function(){
var e=this.index,t=$(".js_question").eq(e);
t.find(".js_item_container").slideUp(),t.find(".js_vote_question").text(t.find("input[name=question_title]").val());
},a.prototype.open=function(){
var e=this.index,t=$(".js_question").eq(e);
t.find(".js_item_container").slideDown(),t.find(".js_vote_question").text("");
},a.refresh=function(){
h.html(""),$(b).each(function(e,t){
t.init();
});
},a.fold=function(){
h.find(".js_question_edit").html("编辑"),$(".js_question").addClass("close_vote");
for(var e=b.length,t=0;e>t;t++)b[t].fold();
},a.save=function(){
for(var e=b.length,t=0;e>t;t++)b[t].save();
},a.turn=function(){
for(var e=b.length,t=0;e>t;t++){
b[t].index=t;
var n=t+1,r=n%10,o=(n-n%10)/10;
b[t].size=w[o]+j[r],b[t].show=!1;
}
};
}
function s(e,t){
return new v(e,{
maxLength:t,
showCounter:!0
});
}
e("common/wx/popup.js");
{
var l=e("tpl/vote/vote.html.js"),u=e("tpl/vote/vote_question.html.js"),d=(e("tpl/vote/vote_item.html.js"),
e("biz_web/ui/checkbox.js"),e("common/lib/datepicker.js"),e("biz_web/ui/dateRange.js"),
e("biz_web/ui/dropdown.js")),p=e("common/wx/preview.js"),g=e("common/wx/upload.js"),c=(e("common/wx/media/imageDialog.js"),
e("biz_common/moment.js"),e("common/qq/mask.js"),e("common/wx/Tips.js")),m=(e("biz_common/jquery.validate.js"),
e("common/wx/dialog.js"),e("common/wx/Cgi.js")),v=e("common/wx/inputCounter.js");
e("common/wx/tooltip.js");
}
e("biz_web/lib/json.js");
var f,h,_=10,q=30,j=["","一","二","三","四","五","六","七","八","九"],w=["","十","二十","三十","四十","五十"],b=[],x=[];
return template&&template.helper("formartNum",function(e){
var t=e%10,n=(e-e%10)/10;
return w[n]+j[t];
}),{
initPage:t,
eventBind:r,
getFullData:o
};
});