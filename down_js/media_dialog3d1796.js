define("media/media_dialog.js",["widget/media/media_dialog.css","widget/media/richvideo.css","common/wx/popup.js","common/wx/Tips.js","media/media_cgi.js","biz_web/utils/upload.js","biz_web/ui/checkbox.js","common/wx/pagebar.js","common/wx/media/imageDialog.js","common/wx/media/videoDialog.js","common/wx/media/audio.js","common/wx/media/img.js","common/wx/media/video.js","common/wx/media/appmsg.js","cardticket/send_card.js","common/wx/time.js","tpl/media/dialog/file_layout.html.js","tpl/media/dialog/appmsg_layout.html.js","tpl/media/dialog/videomsg_layout.html.js","tpl/media/dialog/file.html.js","common/wx/media/audioMusicDialog.js"],function(e){
"use strict";
function i(e,i,t,o,n){
{
var a=e/i+1;
new v({
container:$(".pageNavigator",u.popup("get")),
perPage:i,
first:!1,
last:!1,
isSimple:!0,
initShowPage:a,
totalItemsNum:t,
callback:function(e){
var t=e.currentPage;
t!=a&&(t--,n.begin=i*t,K.key&&(n.key=K.key),o(n));
}
});
}
}
function t(e,i,t,n,a,d){
u&&u.popup("remove"),15==t&&(e="videomsg");
var m=T++;
if(u=$(r(J[e],{
tpl:i,
upload_id:m,
type:t,
token:wx.data.t
}).trim()).popup({
title:"选择素材",
className:g,
width:960,
onOK:function(){
return a&&!a()?(f.err("请选择素材"),!0):(this.remove(),u=null,void(document.body.style.overflow=document.documentElement.style.overflow="auto"));
},
onCancel:function(){
this.remove(),u=null,document.body.style.overflow=document.documentElement.style.overflow="auto";
}
}),p=u.popup("get"),y({
container:"#js_media_dialog_upload"+m,
type:t,
onAllComplete:function(){
f.suc("上传成功"),d.begin=0,s(d);
}
}),n){
if("file"==e&&($(".js_media_list",p).html(r(B,{
list:n
})),$(".frm_radio[type=radio]",p).checkbox(!1),$(".media_content",p).each(function(){
var e=$(this),i=e.data("id"),t=e.data("type"),o=A[i];
o&&t&&F[t]&&F[t](e,o);
})),"appmsg"==e)for(var l=n.length,c=$(".js_appmsg_list .inner",p),h=0;l>h;++h){
var _=n[h],v=c.eq(h%2),w=_.app_id,j=!1;
if(_.multi_item){
for(var x=0;x<_.multi_item.length;x++)(5==_.multi_item[x].share_page_type||7==_.multi_item[x].share_page_type||8==_.multi_item[x].share_page_type)&&(j=!0);
console.log(j);
}
var k=$('<div id="appmsg%s"></div>'.sprintf(w),v).appendTo(v);
new b({
highlight:K.key?!0:!1,
container:k,
data:_,
showMask:!0,
type:t,
isShareMul:j,
isSupportShareMul:d.isSupportShareMul,
useUpdateTime:!0
});
}
if("videomsg"==e){
var S=p.find("#js_videomsg_list").find(".inner");
n.each(function(e,i){
var o=S.eq(i%2),n=$('<div id="appmsg%s"></div>'.sprintf(e.app_id),o).appendTo(o);
F[t]&&F[t](n,e);
});
}
u.popup("resetPosition"),o();
}
}
function o(){
(10==K.type||11==K.type)&&($("#msgSearchInput").on("input",function(){
0==$(this).val().length?$("#searchCloseBt").hide():$("#searchCloseBt").show();
}),$("#searchCloseBt").click(function(){
$("#msgSearchInput").val(""),$(this).hide();
}),$("#msgSearchBtn").click(function(){
return $("#msgSearchInput").val().length>0?(K.key=$("#msgSearchInput").val(),void m(K)):void f.err("请输入搜索关键词");
}),$("#msgSearchInput").keydown(function(e){
var i="which"in e?e.which:e.keyCode;
13==i&&$("#msgSearchBtn").trigger("click");
}));
}
function n(e){
w({
scene:"biz",
uploadScene:6,
maxSelect:1,
desc:"大小不超过5M",
onOK:function(i){
var t={
file_id:i[0].file_id,
copyright_status:i[0].copyright_status,
source:"file"
};
e.onSelect&&e.onSelect(e.type,t),this.destroy();
},
onHide:function(){
this.destroy();
}
});
}
function a(e){
new j({
scene:e.scene,
onOK:function(i,t){
var o=$.extend({},t);
return o?(e.onSelect&&e.onSelect(i,o),!0):!1;
}
});
}
function s(e){
var o=e.type,d=e.onSelect,m=e.count||10,l=e.begin||0;
return 2==o?void n(e):21==o?void a(e):(t("file","loading",o),void h.getList(o,l,m,function(n){
if(u){
var a={
2:"img_cnt",
3:"voice_cnt",
4:"video_cnt"
},c=n.file_item,r=n.file_cnt[a[o]];
c.length<=0?t("file","no-media",o,c,null,e):(t("file","files",o,c,function(){
var e=p.find('[name="media"]:checked').val(),i=$("#fileItem"+e).data("opt");
return i?(d(o,i),!0):!1;
},e),i(l,m,r,s,e));
}
}));
}
function d(e){
return e.find(".appmsg.selected,.Js_videomsg.selected");
}
function m(e){
var o=e.type,n=e.onSelect,s=e.count||10,l=e.key||"",c=e.begin||0;
return K=$.extend(!0,{},e),15==o?void a(e):(t("appmsg","loading",o),void h.appmsg.getList(o,c,s,function(a){
if(u){
var l={
10:"app_msg_cnt",
11:"commondity_msg_cnt",
15:"video_msg_cnt"
},r=a.item,g=a.file_cnt[l[o]];
K.key&&(g=a.search_cnt),r.length<=0?t("appmsg","no-media",o,r,null,e):(t("appmsg","files",o,r,function(){
var e=d(p).parent().data("opt");
return e?(n(o,e),!0):!1;
},e),i(c,s,g,m,e),15==o?(p.on("click",".Js_videomsg",function(){
$(this).find(".loading_tips").length?f.err("视频在转码中，不能选择"):""!=$(this).find(".title").text().trim()&&(p.find(".Js_videomsg").removeClass("selected"),
$(this).addClass("selected"));
}),p.on("mouseenter",".Js_videomsg",function(){
""==$(this).find(".title").text().trim()&&$(this).addClass("no_title");
}),p.on("mouseleave",".Js_videomsg",function(){
$(this).removeClass("no_title");
})):p.on("click",".appmsg",function(){
("1"==$(this).data("completed")&&"2"==$(this).data("issharemul")||"1"==$(this).data("completed")&&"1"==$(this).data("issharemul")&&"1"==$(this).data("issupportsharemul"))&&(d(p).removeClass("selected"),
$(this).addClass("selected"));
}));
}
},l));
}
function l(e){
var i=e.onSelect,t=e.type,o=new C({
multi:!1,
selectComplete:function(e){
return e?(i(t,e),void(o=null)):void f.err("请选择卡券");
},
param:{
need_member_card:1
},
source:"直接群发卡券"
});
o.show();
}
function c(i){
var t=e("common/wx/media/audioMusicDialog.js"),o=!0;
0==i.hasAudioLengthLimit&&(o=!1),t.show({
allowAudio:!0,
hasAudioLengthLimit:o,
onOK:function(e){
i.onSelect(3,e);
}
});
}
e("widget/media/media_dialog.css"),e("widget/media/richvideo.css"),e("common/wx/popup.js");
var r=wx.T,u=null,p=null,g="media align_edge",f=e("common/wx/Tips.js"),h=e("media/media_cgi.js"),_=e("biz_web/utils/upload.js"),v=(e("biz_web/ui/checkbox.js"),
e("common/wx/pagebar.js")),w=e("common/wx/media/imageDialog.js"),j=e("common/wx/media/videoDialog.js"),y=_.uploadBizFile,x=(template.render,
e("common/wx/media/audio.js")),k=e("common/wx/media/img.js"),S=e("common/wx/media/video.js"),b=e("common/wx/media/appmsg.js"),C=e("cardticket/send_card.js"),D=e("common/wx/time.js"),I=D.timeFormat,L=e("tpl/media/dialog/file_layout.html.js"),M=e("tpl/media/dialog/appmsg_layout.html.js"),z=e("tpl/media/dialog/videomsg_layout.html.js"),B=e("tpl/media/dialog/file.html.js"),T=1,A={},J={
appmsg:M,
videomsg:z,
file:L
};
template.helper("mediaDialogtimeFormat",function(e){
return I(e);
}),template.helper("mediaDialogInit",function(e){
return e.file_id?(A[e.file_id]=e,""):"";
});
var F={
2:function(e,i){
return new k({
container:$("#"+e.attr("id")),
file_id:i.file_id,
source:"file",
fakeid:i.fakeid
});
},
3:function(e,i){
var t=i;
return t.selector="#"+e.attr("id"),t.source="file",new x(t);
},
4:function(e,i){
var t=i;
return t.selector="#"+e.attr("id"),t.id=t.file_id,t.source="file",new S(t);
},
15:function(e,i){
var t=i;
return t.selector=e,t.id=t.app_id,t.tpl="videomsg",t.for_selection=!0,t.for_transfer=!!t.content,
t.hide_transfer=!!t.content,t.video_id=t.content,new S(t);
}
},K={};
return{
getFile:s,
getVoice:c,
getAppmsg:m,
getCardList:l
};
});