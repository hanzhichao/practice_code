define("media/appmsg_edit_v2.js",["biz_web/ui/jquery.scrollbar.js","common/wx/media/cropimg.js","common/qq/Class.js","biz_web/utils/upload.js","biz_web/ui/checkbox.js","common/wx/inputCounter.js","common/wx/Step.js","biz_web/ui/dropdown.js","common/wx/tooltips.js","biz_common/jquery.validate.js","common/wx/Tips.js","biz_common/moment.js","common/wx/media/imageDialog.js","common/wx/preview.js","common/wx/dialog.js","common/wx/popover.js","common/wx/media/imgsDialogByUrls.js","common/wx/ban.js","common/wx/Cgi.js","original/whitelist_dialog.js","common/wx/pagebar.js","common/wx/mpEditor/plugin/vote.js","common/wx/mpEditor/plugin/card.js","common/wx/mpEditor/plugin/shop.js","common/wx/mpEditor/plugin/link.js","common/wx/mpEditor/plugin/unlink.js","common/wx/mpEditor/plugin/emotion.js","common/wx/mpEditor/plugin/insertTemplate.js","common/wx/mpEditor/plugin/insert_product.js","common/wx/mpEditor/plugin/templateList.js","common/wx/mpEditor/plugin/audio_music.js","common/wx/mpEditor/plugin/weapp.js","common/wx/mpEditor/plugin/img.js","common/wx/mpEditor/plugin/video.js","common/wx/mpEditor/plugin/adv.js","common/wx/mpEditor/editor.js","tpl/media/appmsg_edit/article.html.js","media/article_list.js","media/media_static_data.js","media/report.js","biz_common/utils/wxgspeedsdk.js"],function(e){
"use strict";
function i(e,i,t){
(i||1)>H&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:e,
val:1,
level:t||"error",
content:"[file=media/appmsg_edit]"
});
}
e("biz_web/ui/jquery.scrollbar.js");
var t,n=e("common/wx/media/cropimg.js"),o=e("common/qq/Class.js"),s=(e("biz_web/utils/upload.js"),
e("biz_web/ui/checkbox.js"),e("common/wx/inputCounter.js")),a=e("common/wx/Step.js"),r=e("biz_web/ui/dropdown.js"),d=e("common/wx/tooltips.js"),c=e("biz_common/jquery.validate.js").rules,_=e("common/wx/Tips.js"),l=e("biz_common/moment.js"),p=e("common/wx/media/imageDialog.js"),u=e("common/wx/preview.js"),m=e("common/wx/dialog.js"),h=e("common/wx/popover.js"),f=e("common/wx/media/imgsDialogByUrls.js"),g=e("common/wx/ban.js"),w=e("common/wx/Cgi.js"),j=e("original/whitelist_dialog.js"),v=e("common/wx/pagebar.js"),b=e("common/wx/mpEditor/plugin/vote.js"),x=e("common/wx/mpEditor/plugin/card.js"),y=(e("common/wx/mpEditor/plugin/shop.js"),
e("common/wx/mpEditor/plugin/link.js")),k=e("common/wx/mpEditor/plugin/unlink.js"),C=e("common/wx/mpEditor/plugin/emotion.js"),E=e("common/wx/mpEditor/plugin/insertTemplate.js"),D=e("common/wx/mpEditor/plugin/insert_product.js"),P=e("common/wx/mpEditor/plugin/templateList.js"),T=e("common/wx/mpEditor/plugin/audio_music.js"),L=e("common/wx/mpEditor/plugin/weapp.js"),q=e("common/wx/mpEditor/plugin/img.js"),I=e("common/wx/mpEditor/plugin/video.js"),A=e("common/wx/mpEditor/plugin/adv.js"),R=e("common/wx/mpEditor/editor.js"),z=e("tpl/media/appmsg_edit/article.html.js"),O=e("media/article_list.js"),S=e("media/media_static_data.js"),U=e("media/report.js"),B=(S.URL_PLATFORM_MAP,
S.article_type),M=wx.cgiData,N=document.referrer,Y={
curRenderType:1,
$addPanel:null,
hideAddPanelId:null,
canShowAddPanel:!0
};
!function(e){
e.fn.placeholder2=function(){
if(!("placeholder"in document.createElement("input"))){
var i=e(this).siblings(".tips_global");
e(this).on("focus",function(){
i.hide();
}).on("blur",function(){
""===this.value?i.show():i.hide();
}).trigger("blur");
}
},e.extend(e.easing,{
easeOutCubic:function(e,i,t,n,o){
return n*((i=i/o-1)*i*i+1)+t;
}
});
}(jQuery);
var H=Math.random(),F=o.declare({
init:function(e){
var i=this;
i.opt=e,$.extend(!0,i,e),i.$editor=$(i.editor_selector).html(wx.T(z,{
can_use_copyright:M.can_use_copyright,
can_use_reward:M.can_use_reward,
can_use_payforread:M.can_use_payforread,
can_use_comment:M.can_use_comment,
can_use_appmsg_source_url:M.can_use_appmsg_source_url,
is_ios_reward_open:M.is_ios_reward_open,
has_invited_original:M.has_invited_original,
orginal_apply_stat:M.orginal_apply_stat,
token:wx.data.t,
is_illegal:1*i.appmsg_data.is_illegal||0
})),i._initUEditor(),$("#media_item_list_scrollbar").scrollbar({
autoUpdate:!1
}),$("#article_item_list_scrollbar").scrollbar({
autoUpdate:!1,
onScroll:function(){
i.ueditor.fireEvent("article_item_list_scroll");
}
});
},
_renderReadOnly:function(e){
var i=e.type,n=e.time,o=e.name,s=e.ua,a=$("#read_only_container"),r=a.find(".js_close");
if(5==i){
var d=location.href+"&conflict=1",c="你有未保存的草稿，%s点击查看%s".sprintf("<a href='javascript:;'>","</a>");
return a.find("p").html(c),a.find("a").click(function(){
a.hide(),window.open(d);
}),e.showTips===!0&&m.show({
type:"warn",
msg:"你有未保存的草稿",
buttons:[{
text:"查看草稿",
click:function(){
a.hide(),window.open(d),this.remove();
}
},{
text:"编辑当前内容",
type:"normal",
click:function(){
this.remove();
}
}]
}),a.show(),void r.show();
}
if(1==i||2==i)a.find("p").text("此素材有文章存在违规，无法编辑"),a.show(),r.hide();else if(4==i){
var c="当前素材并非最新内容，你可以%s打开最新素材%s".sprintf("<a target='_blank' href='"+location.href+"'>","</a>");
a.find("p").html(c);
var _="当前素材非最新内容，是否打开重新编辑？";
n&&(_+="<br />最新素材更新时间：%s".sprintf(n)),o&&(_+="<br />操作人：%s".sprintf(o.html(!0))),
s&&(_+="<br />保存于：%s".sprintf((s+"浏览器").html(!0))),m.show({
type:"warn",
msg:_,
buttons:[{
text:"编辑新内容",
click:function(){
window.open(location.href),this.remove();
}
},{
text:"查看当前内容",
type:"normal",
click:function(){
this.remove();
}
}]
}),a.show(),r.hide();
}else(3==i||6==i)&&(a.hide(),r.hide());
t.fireEvent("stop_toolbar_float");
var l=$(this.editor_selector);
if(l.find(".js_title_main").addClass("without_margin"),l.find(".js_readonly").hide(),
$(this.appmsg_selector).find(".js_readonly").hide(),$("#editor_pannel").addClass("appmsg_input_area_pull_right"),
$("#js_add_appmsg").hide(),$("#bottom_main").hide(),$("#right_pannel").hide(),this.articleList){
var p=this.articleList.getCurrentArticle();
if(p){
var u=p.data("article");
u&&"function"==typeof u.setGuideWordsReadOnly&&u.setGuideWordsReadOnly();
}
}
this.ueditor&&this.ueditor.fireEvent("scrollIntoView",$("#read_only_container"),150);
},
_renderEditorByType:function(e){
function i(){
_.err("分享图文中不能插入多媒体素材");
}
{
var t=this.ueditor;
t.getUeditor();
}
if(2==e){
Y.curRenderType=2,t.fireEvent("stop_toolbar_float");
var n=$(this.editor_selector);
n.find(".js_title_main").addClass("without_margin"),n.find(".js_reprint_hide").hide(),
$(this.appmsg_selector).find(".js_reprint_hide").hide(),$("#bottom_main").find(".js_reprint_hide").hide(),
$("#title").attr("readonly","true"),$("#js_media_list").find("li").addClass("disabled"),
$("#media_list_mask").show().on("click",i),$("#js_cover_mask").removeClass("hover_mask");
}else if(1==e){
Y.curRenderType=1;
var n=$(this.editor_selector);
n.find(".js_title_main").removeClass("without_margin"),n.find(".js_reprint_hide").show(),
t.fireEvent("star_toolbar_float"),$(this.appmsg_selector).find(".js_reprint_hide").show(),
$("#bottom_main").find(".js_reprint_hide").show(),$("#title").removeAttr("readonly"),
$("#js_media_list").find("li").removeClass("disabled"),$("#media_list_mask").hide().off("click",i),
$("#js_cover_mask").addClass("hover_mask");
}
},
_initEditArea:function(){
var e=this,i=e.$editor;
i.find(".js_field").each(function(){
{
var e=$(this).attr("name");
$(this).attr("keyup");
}
$(this).on("keyup",function(){
i.find(".js_%s_error".sprintf(e)).hide();
});
}),i.find(".js_url").on("change",function(){
$(".js_warn.frm_msg").hide();
}),i.find(".js_title").on("keyup",function(){
var t=$.trim($(this).val()).html(!0),n=e.articleList.getCurrentArticle();
n&&n.find(".js_appmsg_title").html(t||"标题"),i.find(".js_title_error").hide(),$("#js_draft_tips").hide();
}).on("focus",function(){
e.ueditor.fireEvent("title_focus"),e.ueditor.disableToolbar(),$(this).siblings("em").show();
}).on("blur",function(){
$(this).parent().hasClass("warn")||$(this).siblings("em").hide();
}).placeholder2(),i.find(".js_author").on("focus",function(){
e.ueditor.fireEvent("author_focus"),e.ueditor.disableToolbar(),$(this).siblings("em").show();
}).on("blur",function(){
$(this).parent().hasClass("warn")||$(this).siblings("em").hide();
}).on("keyup",function(){
$("#js_draft_tips").hide();
}).placeholder2(),i.find(".js_desc").on("keyup",function(){
var t=$.trim($(this).val()).html(!0),n=e.articleList.getCurrentArticle();
n&&n.find(".appmsg_desc").html(t),i.find(".js_desc_error").hide();
}),i.find("textarea.js_desc[name='digest']").on("change",function(){
var i,t=e.articleList.getCurrentArticle();
t&&(i=t.data("article"))&&i.setAutoDigest(!1);
}),i.find(".js_comment").checkbox({
multi:!0,
initOnChanged:!0,
onChanged:function(e){
e.checkbox("value")?$("#js_comment_setting_wrp").show():$("#js_comment_setting_wrp").hide();
}
}),i.find(".js_comment_setting").checkbox({
multi:!1
}),i.find(".js_url_checkbox").checkbox({
multi:!0,
onChanged:function(t){
t.checkbox("value")?(i.find(".js_url_area .frm_input_box").show(),e.ueditor.funcPvUvReport("showlink")):(i.find(".js_url_area .frm_input_box").hide(),
e.ueditor.funcPvUvReport("hidelink")),i.find(".js_url_error").hide(),i.find(".frm_msg.js_warn").hide();
}
}),i.find(".js_url").on("input change",function(){
var e=$(this),i=e.val();
i.match(/\:\/\/mp\.weixin\.qq\.com\/.*[\?&]tempkey=/)&&new h({
dom:this,
content:"检测到此链接为预览链接，将在短期内失效，是否仍然使用此链接？",
hideIfBlur:!0,
buttons:[{
text:"仍然使用",
type:"primary",
click:function(){
this.remove();
}
},{
text:"取消",
type:"default",
click:function(){
e.val(""),this.remove();
}
}]
});
}),i.find(".js_reward").checkbox({
multi:!0,
onChanged:function(e){
e.checkbox("value")?(e.checkbox("checked",!1),$("#tpl_reward_statement").popup({
title:"文章赞赏须知",
width:960,
className:"reward_qrcode_dialog",
buttons:[{
text:"确定",
type:"primary",
click:function(){
e.checkbox("checked",!0),i.find(".js_reward_div,.js_reward_ios_wrap").show(),this.remove();
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
})):i.find(".js_reward_div,.js_reward_ios_wrap").hide();
}
}),i.find(".js_reward_ios").checkbox({
multi:!1,
onChanged:function(e){
1==e.checkbox("value")?i.find(".js_reward_ios_money").show():i.find(".js_reward_ios_money").hide();
}
}),i.find(".js_reward_notice").on("click",function(){
$("#tpl_reward_statement").popup({
title:"文章赞赏须知",
width:960,
className:"reward_qrcode_dialog",
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove();
}
}]
});
}),e._initUploadCover(),i.find(".js_counter").each(function(){
$(this).hasClass("js_author")||$(this).hasClass("js_reward_wording")?new s(this,{
maxLength:$(this).attr("max-length"),
useGBKLength:!0,
GBKBased:!0
}):new s(this,{
maxLength:$(this).attr("max-length")
});
}),e._initOriginal(),e.freeUEditor=i.find(".js_fp_editor_empty_none"),e._initBan(),
e._initAd();
},
_initUploadCover:function(){
var e=this,t=e.$editor;
$("#js_selectCoverFromContent").on("click",function(){
var t=e.ueditor.fireEvent("get_current_article_all_img")||[];
document.body.style.overflow=document.documentElement.style.overflow="hidden";
var n=e.articleList._getCurrentIndex();
new f({
cropImgtips:e._getCropImgTips(n),
cropRatio:e._getCropImgRatio(n),
urls:t,
onOk:function(t){
document.body.style.overflow=document.documentElement.style.overflow="auto";
var n=t.length>0?t[0]:"";
n&&(e._coverChange(n),U.addNum(U.reportId[2],0,1),U.addNum(U.reportId[2],1,100)),
i(38,1,"trace");
},
onHide:function(){
document.body.style.overflow=document.documentElement.style.overflow="auto";
}
});
}),$("#js_imagedialog").on("click",function(){
document.body.style.overflow=document.documentElement.style.overflow="hidden";
var n=e.articleList._getCurrentIndex();
p({
cropImg:!0,
cropImgtips:e._getCropImgTips(n),
cropRatio:e._getCropImgRatio(n),
coverPicCheckbox:!0,
coverPic:1*t.find(".js_show_cover_pic").val()||0,
scene:"biz",
only_cdn:!1,
maxSelect:1,
desc:"建议尺寸：900像素 * 500像素",
onOK:function(t){
var n=t[0];
e._coverChange(n),U.addNum(U.reportId[2],0,1),U.addNum(U.reportId[2],2,100),i(38,1,"trace"),
this.destroy(),document.body.style.overflow=document.documentElement.style.overflow="auto";
},
onHide:function(){
document.body.style.overflow=document.documentElement.style.overflow="auto";
}
});
}),t.on("click",".js_removeCover",function(){
var i=e.articleList.getCurrentArticleObject();
i&&i.removeCover();
}),t.on("click",".js_modifyCover",function(){
var i,o,s=!1,a=!0,r=$('<div class="js_main">').popup({
width:800,
title:"选择封面",
autoShow:!1,
className:"appmsg_content_img_dialog",
onHide:function(){
this.remove(),a=!1;
},
buttons:[{
text:"完成",
type:"primary",
classWrap:"js_crop_done_btn",
click:function(){
if(!s){
var t=this;
s=!0,o.btn(!1),i.getUrl({
onsuccess:function(i){
a&&(s=!1,o.btn(!0),t.remove(),e._coverChange({
oriUrl:i.oriUrl,
file_id:i.file_id||"",
url:i.url
}));
},
onerror:function(e){
a&&(s=!1,o.btn(!0),_.err(-1==e.retcode?"请选择裁剪区域":"系统繁忙，请稍后再试"));
}
});
}
}
},{
text:"取消",
type:"default",
click:function(){
this.remove(),a=!1;
}
}]
});
o=r.find(".js_crop_done_btn");
var d=e.articleList._getCurrentIndex(),c=t.find(".js_cover"),l=c.find("input.js_cdn_url").val(),p=c.find("input.js_cdn_url_back").val();
p||(p=l),i=new n({
container:r.find(".js_main"),
cropRatio:e._getCropImgRatio(d),
url:p,
tips:e._getCropImgTips(d)
}),r.popup("show"),r.popup("resetPosition");
});
},
_getCropImgRatio:function(e){
return 0==e?16/9:1;
},
_coverChange:function(e){
var i=this.articleList.getCurrentArticleObject();
i&&i.coverChange(e);
},
_getCropImgTips:function(e){
return 0==e?"首篇图文封面图片长宽比只能为16：9，拖拽裁剪框调整展示区域":"次篇图文封面图片长宽比只能为1：1，拖拽裁剪框调整展示区域";
},
_initUEditor:function(){
var e=this,i=[],n=["undo","redo","|","fontsize","|","blockquote","horizontal","|","removeformat","formatmatch","inserttemplate","templatelist","|","link","unlink","mpemotion"],o=["bold","italic","underline","forecolor","backcolor","|","indent","|","justifyleft","justifycenter","justifyright","justifyjustify","justifyindent","|","rowspacingtop","rowspacingbottom","lineheight","letterspacing","|","insertorderedlist","insertunorderedlist","|","imagenone","imageleft","imageright","imagecenter"];
i.push(new q({
container:"#js_editor_insertimage"
})),i.push(new I({
container:"#js_editor_insertvideo",
can_use_txvideo:wx.cgiData.can_use_txvideo,
show_share_dialog:wx.cgiData.can_pub_video
})),i.push(new b({
container:wx.cgiData.can_use_vote?"#js_editor_insertvote":"",
can_use_vote:wx.cgiData.can_use_vote
})),i.push(new x({
container:wx.cgiData.can_use_card?"#js_editor_insertcard":"",
biz_uin:M.biz_uin,
can_use_card:wx.cgiData.can_use_card
})),i.push(new A({
container:wx.cgiData.can_see_ad?"#js_editor_insertad":"",
has_ad:wx.cgiData.has_ad,
can_see_ad:wx.cgiData.can_see_ad
})),i.push(new T({
container:wx.cgiData.can_use_voice||wx.cgiData.qqmusic_flag?"#audio_music_plugin_btn":"",
allowAudio:wx.cgiData.can_use_voice,
allowMusic:wx.cgiData.qqmusic_flag
})),i.push(new L({
container:wx.cgiData.can_use_weapp_card?"#js_editor_insertweapp":"",
can_use_weapp_card:wx.cgiData.can_use_weapp_card
})),i.push(new y({
can_use_hyperlink:wx.cgiData.can_use_hyperlink,
can_use_appmsg_outer_url:wx.cgiData.can_use_appmsg_outer_url
})),i.push(new k),i.push(new C),i.push(new E({
token:wx.data.t,
appmsg_template_cnt:wx.cgiData.appmsg_template_cnt,
can_use_vote:wx.cgiData.can_use_vote,
can_use_card:wx.cgiData.can_use_card,
biz_uin:M.biz_uin,
can_use_voice:wx.cgiData.can_use_voice,
qqmusic_flag:wx.cgiData.qqmusic_flag,
can_use_weapp_card:wx.cgiData.can_use_weapp_card,
can_use_txvideo:wx.cgiData.can_use_txvideo,
can_use_hyperlink:wx.cgiData.can_use_hyperlink,
can_use_appmsg_outer_url:wx.cgiData.can_use_appmsg_outer_url,
can_see_ad:!1
})),i.push(new P({
token:wx.data.t
})),i.push(new D({
container:$("#editor_insertproduct"),
can_see_product:1===wx.cgiData.can_see_product?!0:!1,
can_use_smart:1===wx.cgiData.can_use_smart?!0:!1,
can_use_product:1===wx.cgiData.can_use_product?!0:!1,
can_use_wxopen_link:1===wx.cgiData.can_use_wxopen_link?!0:!1
})),t=e.ueditor=new R({
plugins:i,
autoHeightEnabled:!0,
topOffset:62,
is_illegal:1*e.appmsg_data.is_illegal||0,
toolbars:[n,o],
onReady:function(){
e._initEditArea(),e.articleList=new O($.extend({
maxNum:8,
ueditor:e.ueditor,
freeUEditor:e.freeUEditor,
is_illegal:1*e.appmsg_data.is_illegal||0,
is_rumor:1*e.appmsg_data.is_rumor||0
},e.opt)),e._bindEvent();
}
}),t.render("js_editor"),t.addListener("begincatchimage",function(){
_.suc("内容已上传完成");
}),t.addListener("after_add_article",function(){
Y.canShowAddPanel=!1,Y.$addPanel&&Y.$addPanel.hide(),setTimeout(function(){
Y.canShowAddPanel=!0;
},500);
}),t.addListener("showEditorMsgTips",function(i,t){
$(".js_catch_tips",e.$editor).show().find(".js_msg_content").text(t.msg);
}),t.addListener("catchremotesuccess",function(i,n,o,s){
t.fireEvent("update_remote_img",{
article:n.article,
remoteType:"success",
uid:n.uid,
format:s,
img_url:o
});
var a=$(t.getDocument()).find(".js_catchremoteimageerror").length;
0==a?$(".js_catch_tips",e.$editor).hide():$(".js_catch_tips",e.$editor).show().find(".js_msg_content").text("有%s张图片粘贴失败".sprintf(a));
}),t.addListener("catchremoteerror",function(i,n,o){
if(n&&t.fireEvent("update_remote_img",{
article:n.article,
remoteType:"error",
uid:n.uid,
img_url:n.defaultRemoteImg
}),o)$(".js_catch_tips",e.$editor).show().find(".js_msg_content").text(o);else{
var s=$(t.getDocument()).find(".js_catchremoteimageerror").length;
0==s?$(".js_catch_tips",e.$editor).hide():$(".js_catch_tips",e.$editor).show().find(".js_msg_content").text("有%s张图片粘贴失败".sprintf(s));
}
}),t.addListener("scrollIntoView",function(e,i,t){
setTimeout(function(){
$("html, body").animate({
scrollTop:$(i).offset().top-(t||50)
});
},100);
}),t.addListener("showErrMsg",function(e,i,t){
$(i).show().find(".js_msg_content").text(t);
}),t.addListener("hideAllErrMsg",function(){
e.$editor.find(".js_error_msg,.js_tip_mask_msg").hide(),e.$editor.find(".js_tip_mask").removeClass("error_mask"),
$("#js_labels_error").hide();
}),t.addListener("keyup aftersetcontent",function(){
var i=t.getDocument(),n=$(i).find(".js_catchremoteimageerror").length;
n>0?$(".js_catch_tips",e.$editor).show().find(".js_msg_content").text("有%s张图片粘贴失败".sprintf(n)):$(".js_catch_tips",e.$editor).hide();
}),t.addListener("keyup",function(){
$(".js_content_error",e.$editor).hide(),$(".page_msg.js_warn").hide(),$("#js_draft_tips").hide();
}),t.addListener("heightChanged",function(){
$(window).trigger("scroll",!1);
}),t.addListener("focus",function(){
$(".page_msg.js_warn").hide(),t.enableToolbar();
}),t.addListener("renderReadOnly",function(i,t){
e._renderReadOnly(t);
}),t.addListener("renderEditorByType",function(i,t){
e._renderEditorByType(t);
}),t.addListener("afterArticleSelect",function(){
$(window).trigger("scroll",!1);
});
},
_initOriginal:function(){
var e=this,i=e.$editor;
$(document).on("click",".js_original_apply",function(){
var t=$("#js_original"),n=$("#tpl_original").popup({
title:"声明原创",
width:960,
className:"simple align_edge original_dialog",
data:{
author:t.find(".js_author").text()||i.find(".js_author").val(),
frm:t.find(".js_reprint_frm").val()||1,
can_use_appmsg_source_url:M.can_use_appmsg_source_url
},
buttons:[{
text:"下一步",
type:"primary",
click:function(){
o.find(".js_step_panel").hide().eq(1).show();
var e=new r({
container:"#js_original_article_type",
label:"请选择",
data:B
});
e.selected(t.find(".js_classify").text()),o.find(".js_btn_p").eq(0).hide(),o.find(".js_btn_p").eq(1).show(),
o.find(".js_btn_p").eq(2).show(),d.setStep(2);
}
},{
text:"上一步",
click:function(){
o.find(".js_step_panel").hide().eq(0).show(),o.find(".js_btn_p").eq(0).show(),o.find(".js_btn_p").eq(1).hide(),
o.find(".js_btn_p").eq(2).hide(),d.setStep(1);
}
},{
text:"确定",
type:"primary",
click:function(){
e._checkOriginal(o)&&($(".js_original_type").hide().eq(1).show(),$(".js_original_content").show(),
i.find(".js_author").closest(".appmsg_edit_item").eq(0).hide(),i.find(".js_reward").checkbox("disabled",!1).checkbox("checked",!1),
"checked"==o.find(".js_forIEbug_frm").attr("checked")?($("#js_pay").checkbox("disabled",!0),
$("#js_pay").checkbox("checked",!1),i.find(".js_pay_tips").show().text("（只有“禁止转载”的原创文章才可以设置付费阅读）"),
i.find(".js_pay_setting").hide()):($("#js_pay").checkbox("disabled",!1),i.find(".js_pay_tips").show().text("（每月可群发10篇付费阅读文章）")),
this.remove());
}
}],
onHide:function(){
this.remove();
}
}),o=n.popup("get");
o.find(".js_btn_p").eq(1).hide(),o.find(".js_btn_p").eq(2).hide();
var d=new a({
container:o.find(".js_step"),
selected:1,
names:["1 须知","2 原创声明信息"]
});
o.find("#js_copyright_agree").checkbox({
onChanged:function(e){
e.prop("checked")?o.find(".js_btn_p").enable():o.find(".js_btn_p").disable();
}
}),o.find(".js_reprint_frm").checkbox({
multi:!1
}),$($(".popover")[$(".popover").length-1]).css("z-index","9999"),$($(".popover")[$(".popover").length-1]).children(".popover_arrow").css("left","8%"),
o.find(".js_counter").each(function(){
$(this).hasClass("js_author")?new s($(this),{
maxLength:8,
useGBKLength:!0,
GBKBased:!0
}):new s($(this),{
maxLength:10
});
}),o.on("keyup",".js_platform,.js_url,.js_author",function(){
$(this).closest(".frm_controls").find(".fail").hide();
});
}),$(".js_original_cancel").on("click",function(){
$("#js_original");
i.find(".js_original_type").hide().eq(0).show(),i.find(".js_original_content").hide(),
i.find(".js_author").closest(".appmsg_edit_item").eq(0).show(),i.find(".js_reward").checkbox("disabled",!0),
i.find(".js_reward").checkbox("checked",!1),i.find(".js_reward_div,.js_reward_ios_wrap").hide(),
i.find(".js_reward_wording").val(),$("#js_pay",i).checkbox("disabled",!0),$("#js_pay",i).checkbox("checked",!1),
$(".js_pay_tips",e.$editor).show().text("（只有“禁止转载”的原创文章才可以设置付费阅读）"),$(".js_pay_setting",i).hide();
}),$("#js_original").on("click",".js_add_whitelist,.js_edit_whitelist",function(){
var e=$("#js_original").find(".js_whitelist").children(),i=[];
e.each(function(){
i.push($(this).attr("data-openid"));
}),new j({
data:i,
isAllowReprint:!0,
onOK:function(e){
w.post({
url:"/cgi-bin/appmsgcopyright?action=appmsg_add_ori_whitelist",
data:{
whitelist:JSON.stringify2({
white_list:e
})
}
},function(){}),$.each(e,function(e,i){
i.title=[],i.can_modify&&i.title.push("可修改文章"),i.can_hide_source&&i.title.push("可不显示转载来源"),
i.title=i.title.join("、");
});
var i=template.render("tpl_whitelist",{
list:e
});
$("#js_original").find(".js_whitelist").append(i),this.remove();
}
});
}),$("#js_original").find(".js_whitelist_tips").length&&new h({
dom:$("#js_original").find(".js_whitelist_tips"),
content:"<p>通过添加白名单，授予某些公众帐号对该篇文章具有可修改，或不显示转载来源的转载权限。在文章群发后生效</p>",
isToggle:!0,
onShow:function(){
this.resetPosition();
}
}).hide(),$(".js_reward_ios_tips").length&&new h({
dom:$(".js_reward_ios_tips"),
content:"<p>赞赏功能在iOS上将改为转账，iOS用户可以向你转账任意金额或你设置的固定金额，固定金额只对此篇图文生效。仍保持T+7结算到原收款人的微信零钱包，仍可在赞赏功能里查看流水。</p>",
isToggle:!0,
onShow:function(){
this.resetPosition();
}
}).hide(),$("#js_original").on("click",".js_del_whitelist",function(){
$(this).parent().remove();
}),$("#js_original_detail").on("click",function(){
$(this).parent().toggleClass("open"),$(this).siblings("ul").toggle();
});
var t=!0,n=M.orginal_apply_stat,o=1==M.has_invited_original?"/acct/copyrightapply?action=apply":"/acct/selfapply?action=apply";
o=wx.url(o);
var d=$("#js_original_func_open").closest(".js_original_type"),c=function(){
w.post({
url:"/cgi-bin/appmsg?action=get_original_stat"
},function(e){
if(e.base_resp&&0==e.base_resp.ret){
var i="";
switch(+e.orginal_apply_stat){
case 0:
i="原创声明：未开通";
break;

case 1:
i="原创声明：审核中",d.find(".opt").hide();
break;

case 2:
i="原创声明：申请失败",d.find(".opt").hide();
break;

case 3:
i="原创：未声明",d.find(".opt").html('<a href="javascript:;" onclick="return false;" class="btn btn_default js_original_apply">声明原创</a>').show();
}
d.find(".subtitle").text(i),n=e.orginal_apply_stat;
}
3!=e.orginal_apply_stat&&setTimeout(c,2e3);
});
};
$("#js_original_func_open").on("click",function(){
0==n&&window.open(o),t&&(t=!1,setTimeout(c,2e3));
});
},
_initPay:function(){
var e=this,i=e.$editor,t=e._createPayDialog();
$("#js_pay",i).checkbox({
multi:!0,
onChanged:function(n){
n.checkbox("value")?e._showPayDialog(t):(t.popup("hide"),$(".js_pay_setting",i).hide());
}
}),$(".js_pay_edit",i).on("click",function(){
e._showPayDialog(t);
});
},
_initBan:function(){
var e=this.$editor,i=e.find(".js_url_area"),t=17,n=function(){
var e;
$.each(M.func_ban_info,function(i,n){
n.func_id==t&&(e=n);
});
var n=g.getReason(e.reason_id),o='你的帐号<a href="'+(n.pc_url?n.pc_url:defaultReason.pc_url)+'">'+n.reason_description+"</a>，",s=new Date(1e3*e.unlock_time);
e.ban_time==e.unlock_time?o+="已被永久屏蔽阅读原文功能。":(o+="已被屏蔽阅读原文功能至",o+=s.getFullYear()+"/"+(s.getMonth()+1)+"/"+s.getDate(),
o+="，期间阅读原文将不可用。"),i.find(".js_url_checkbox").attr("disabled",!0).attr("checked",!1).parent().addClass("disabled"),
i.find(".js_url").attr("disabled",!0).parent().addClass("disabled"),i.find(".js_url_ban_wording").html(o);
};
g(M.func_ban_info,"source-url")?M.can_use_appmsg_source_url||i.hide():n();
},
_initAd:function(){
var e=this.$editor;
e.on("click",".js_del_ad",function(){
e.find(".js_ad_preview").html(""),e.find(".js_ad_preview").parent().hide(),$("#js_editor_insertad").removeClass("disabled");
});
},
_showPayDialog:function(e){
var i=this,t=i.$editor,n=e.popup("get");
n.find(".js_fee").val($(".js_fee",t).text()),n.find(".js_step_panel").hide().eq(0).show(),
n.find(".js_btn_p").hide(),n.find(".js_btn_p").eq(0).show(),n.find(".js_btn_p").eq(1).show(),
e._step.setStep(1),e.popup("show");
},
_createPayDialog:function(){
var e=this,i=e.$editor,t=$("#tpl_pay").popup({
title:"付费阅读设置",
width:960,
className:"simple align_edge pay_dialog",
autoShow:!1,
data:{},
buttons:[{
text:"取消",
click:function(){
$(".js_pay_setting",i).is(":visible")||$("#js_pay",i).checkbox("checked",!1),this.hide();
}
},{
text:"下一步",
type:"primary",
click:function(){
var t=e.freeUEditor.val(),s=n.find(".js_fee").val();
return""==t?void _.err("免费区域不能为空"):c.rangelength(t,[20,200])?!s||!/^\d*(\.\d+)?$/.test(s)||s.toString().match(/\.\d{3,}/)||.01>s?void _.err("请输入正确的金额"):.01>s?void _.err("金额必须大于零"):s>200?void _.err("金额不能超过200元"):(n.find(".js_content").html(t),
n.find(".js_content_count").text(e.ueditor.getUeditor().getContent().text().length),
n.find(".js_fee_preview").text(parseFloat(s).toFixed(2)),n.find(".js_nickname").text(wx.data.nick_name),
n.find(".js_title").text($.trim($(".js_title",i).val())),n.find(".js_author").text($.trim($(".js_author",i).val())),
n.find(".js_date").text(l().format("YYYY-MM-DD")),n.find(".js_step_panel").hide().eq(1).show(),
n.find(".js_btn_p").hide(),n.find(".js_btn_p").eq(2).show(),n.find(".js_btn_p").eq(3).show(),
n.find(".js_preview").scrollTop(1e8),o.setStep(2),void this.resetPosition()):void _.err("正文字数要多于20字且不能超过200字");
}
},{
text:"上一步",
click:function(){
n.find(".js_step_panel").hide().eq(0).show(),n.find(".js_btn_p").hide(),n.find(".js_btn_p").eq(0).show(),
n.find(".js_btn_p").eq(1).show(),o.setStep(1),this.resetPosition();
}
},{
text:"确定",
type:"primary",
click:function(){
$(".js_pay_setting",i).show().find(".js_fee").text((+n.find(".js_fee").val()).toFixed(2)),
$(".js_pay_tips",i).hide(),this.hide();
}
}],
onClose:function(){
$(".js_pay_setting",i).is(":visible")||$("#js_pay",i).checkbox("checked",!1),t.popup("hide");
},
onShow:function(){
this.resetPosition();
}
}),n=t.popup("get");
n.find(".js_btn_p").eq(2).hide(),n.find(".js_btn_p").eq(3).hide();
var o=new a({
container:n.find(".js_step"),
selected:1,
names:["设置","预览并确认"]
});
return e.freeUEditor=n.find(".js_editor"),new s(e.freeUEditor,{
minLength:20,
maxLength:200
}),n.find(".js_fee").on("input propertychange",function(){
var e=$(this).val();
e&&/^\d*(\.\d+)?$/.test(e)&&!e.toString().match(/\.\d{3,}/)?.01>e?$(this).parent().addClass("error"):e>200?$(this).parent().addClass("error"):$(this).parent().removeClass("error"):$(this).parent().addClass("error");
}),t.popup("resetPosition"),t._step=o,t;
},
_checkOriginal:function(e){
var i=!0,t="checked"==e.find(".js_forIEbug_frm").attr("checked")?1:e.find(".js_reprint_frm:checked").val(),n=e.find(".js_author").val(),o=e.find("#js_original_article_type .dropdown_switch label").text();
n.len()>16||n.len()<=0?(e.find(".js_author_error").show(),i=!1):e.find(".js_author_error").hide();
for(var s=!1,a=0;a<B.length;a++)o==B[a].name&&(s=!0);
if(0==s?(e.find(".js_article_type_error").show(),i=!1):e.find(".js_article_type_error").hide(),
i){
var r=$("#js_original");
r.find(".js_author").text(n),r.find(".js_reprint_frm").val(t),$("#original_type_msg").hide(),
r.find(".js_classify").text(o),this._updateWhitelist(t);
}
return i;
},
_updateWhitelist:function(e){
$("#js_original").find(".js_whitelist").children().each(function(){
var i=1*$(this).attr("data-can_modify"),t=1*$(this).attr("data-can_hide_source");
1==e&&(i||t||$(this).remove());
});
},
_updateCurUrl:function(e){
if(e){
wx.cgiData.app_id=e,window.history&&history.replaceState?history.replaceState(history.state,document.title,wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid=%s".sprintf(e))):1==M.isNew&&(location.href=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid=%s".sprintf(e)));
var i=new RegExp("^"+location.protocol+"//"+location.hostname+"(:8080)?"+location.pathname+"?.*action=(list_card|list_list)");
N.match(i)&&window.opener&&opener.location&&(opener.location=N);
}
},
_bindEvent:function(){
function e(i,t,n){
w.post({
url:"/cgi-bin/appmsg?action=get_appmsg_update_history&appmsgid="+wx.cgiData.app_id+"&offset="+i+"&limit="+t
},function(i){
if(0==i.base_resp.ret){
var t=i.list;
t.each(function(e){
e.time=l.unix(e.update_time).format("YYYY-MM-DD HH:mm:ss"),e.action=0==e.operate_type?"保存":"群发",
""==e.operator_name&&(e.operator_name="未知"),wx.cgiData.bizmediaid&&wx.cgiData.bizmediaid==e.bizmediaid&&(e.current=!0),
e.url=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=get_history_appmsg&bizmediaid="+e.bizmediaid+"&type="+wx.cgiData.type+"&appmsgid="+wx.cgiData.app_id);
}),$("#history_list").html(template.render("history_tpl",{
list:t
})),n&&new v({
container:"#history_page",
perPage:4,
first:!1,
last:!1,
isSimple:!0,
totalItemsNum:i.total,
callback:function(i){
e(4*(i.currentPage-1),4);
}
}),$("#history_bt").addClass("appmsg_history_active"),$("#history_pop").show();
}
});
}
var i=this,n=function(){
Y.hideAddPanelId&&(clearTimeout(Y.hideAddPanelId),Y.hideAddPanelId=null),Y.hideAddPanelId=setTimeout(function(){
Y.$addPanel&&Y.$addPanel.hide(),Y.hideAddPanelId=null;
},300);
},o=function(e){
var i=$(e.target||e.srcElement),t=$("#js_add_appmsg");
!Y.$addPanel||$.contains(Y.$addPanel,i)||$.contains(t,i)||n();
},s=function(){
Y.canShowAddPanel&&(Y.hideAddPanelId&&(clearTimeout(Y.hideAddPanelId),Y.hideAddPanelId=null),
Y.$addPanel||(Y.$addPanel=$(template.render("tpl_add_panel",{})).appendTo($("body")),
Y.$addPanel.hover(function(){
Y.hideAddPanelId&&(clearTimeout(Y.hideAddPanelId),Y.hideAddPanelId=null);
},o),i.ueditor&&i.ueditor.fireEvent("can_add_article",Y.$addPanel)),Y.$addPanel.show(),
a());
},a=function(){
var e=$("#js_add_appmsg")[0].getBoundingClientRect(),i=$(window).height(),t=Y.$addPanel.height(),n=10,o=e.bottom-n;
o+t>i?Y.$addPanel.css({
top:e.top-t+$(window).scrollTop()-30,
left:e.left+e.width/2
}).addClass("preview_media_add_panel_up"):Y.$addPanel.css({
top:o+$(window).scrollTop(),
left:e.left+e.width/2
}).removeClass("preview_media_add_panel_up");
},r=function(){
if(Y.$addPanel){
var e=$("#js_add_appmsg")[0].getBoundingClientRect(),i=$("#article_item_list")[0].getBoundingClientRect();
i.top+i.height<e.top?n():Y.$addPanel.is(":hidden")||a();
}
};
$("#js_add_appmsg").click(s).hover(s,o),$(window).on("scroll",function(){
r();
}),i.ueditor.addListener("article_item_list_scroll",function(){
r();
}),$("#history_bt").click(function(){
$(this).hasClass("appmsg_history_active")?($(this).removeClass("appmsg_history_active"),
$("#history_pop").hide()):e(0,4,!0);
}),$("#history_list").on("click",".js_history_link",function(){
wx.cgiData.bizmediaid?window.location=$(this).data("url")+"&idx"+wx.cgiData.idx:window.open($(this).data("url")+"&idx"+wx.cgiData.idx);
}),$(document).on("click",function(e){
var i=e.target;
$.contains($("#history_bt")[0],i)||$.contains($("#history_pop")[0],i)?($("#history_pop").show(),
$("#history_bt").addClass("appmsg_history_active")):($("#history_pop").hide(),$("#history_bt").removeClass("appmsg_history_active"));
}),$("#read_only_container").find(".js_close").click(function(){
$("#read_only_container").hide();
}),i.$editor.on("click",".js_msg_close",function(){
$(this).closest(".page_msg").hide();
}),i.$editor.find(".js_cover").on("click","img",function(){
var e=$(this).attr("src");
e&&u.show({
imgdata:[{
imgsrc:e
}]
});
});
var c=!1;
$("#js_fold").on("click",function(){
i.ueditor.fireEvent(c?"adjustheight":"foldcontentarea");
}),i.$editor.on("click",".js_unfold_editor",function(){
i.ueditor.fireEvent("adjustheight");
}),i.ueditor.addListener("heightChanged",function(e,t){
60==t?($("#js_fold").children("span").text("展开正文"),i.$editor.find(".js_unfold_editor").show(),
c=!0,$(window).scrollTop($(".js_title").parent().offset().top-$(".js_main_title").height()-$(".edui-editor-toolbarbox").height())):($("#js_fold").children("span").text("收起正文"),
i.$editor.find(".js_unfold_editor").hide(),c=!1);
});
var p=$("#reprint_article_main");
p.on("click",".js_replace_media",function(){
var e=i.articleList.getCurrentArticleObject();
e&&"function"==typeof e.replaceMedia&&e.replaceMedia();
}),p.on("click",".js_preview_hd",function(){
var e=i.articleList.getCurrentArticleObject();
e&&"function"==typeof e.previewVideoPlay&&e.previewVideoPlay();
}),new d({
container:i.$editor.find(".js_edit_tips"),
content:"",
parentClass:"",
position:{
left:-136
},
reposition:!0,
onshow:function(){
var e=i.articleList.getCurrentArticleObject();
e&&"function"==typeof e.getEditTipsContent&&(this.changeContent(e.getEditTipsContent()),
this.show());
},
type:"hover"
}),$("#js_submit").on("click",function(){
if(1*i.appmsg_data.is_illegal!=1){
var e=$(this);
$("#js_import_tips,#js_draft_tips").hide(),$(".js_warn").hide(),$(".js_ad_error_tips").hide(),
i.articleList.save(e,function(t,n){
for(var o=0,s=0;s<n.count;s++)if(n["ad_id"+s]){
o=1;
break;
}
e.btn(!0),_.remove(),t.is_ad_optioal?$("#js_save_success_with_ad_op").show().delay(2e3).fadeOut(300):o?$("#js_save_success_with_ad").show().delay(2e3).fadeOut(300):$("#js_save_success").show().delay(2e3).fadeOut(300),
i._updateCurUrl(t.appMsgId);
},!1,t);
}
}),$("#js_submit_close").on("click",function(){
var e=$(this);
i.articleList.save(e,function(){
_.suc("保存成功"),window.close();
},!1,t);
}),$("#js_send").on("click",function(){
if(1*i.appmsg_data.is_illegal!=1){
var e=$(this);
$("#js_import_tips,#js_draft_tips").hide(),$(".js_warn").hide(),i.articleList.save(e,function(e){
i.articleList.draft.isDropped=!0,i._updateCurUrl(e.appMsgId),location.href=wx.url("/cgi-bin/masssendpage?t=mass/send&type=10&appmsgid=%s".sprintf(e.appMsgId));
},!1,t,void 0,!0);
}
}),$("#js_preview").on("click",function(){
if(1*i.appmsg_data.is_illegal!=1&&($("#js_import_tips,#js_draft_tips").hide(),$(".js_warn").hide(),
g(M.func_ban_info,"preview"))){
{
$(this);
}
i.articleList.preview(t,function(e){
i._updateCurUrl(e.appMsgId);
});
}
}),i.$editor.on("click",".js_jumpToOrder",function(){
m.show({
type:"info",
msg:"是否保存文章并跳转至广告订单页面？",
buttons:[{
text:"确定",
click:function(){
$("#js_import_tips,#js_draft_tips").hide(),$(".js_warn").hide(),$(".js_ad_error_tips").hide();
var e=$("#js_submit"),n=this,o=$(".js_ad_msg").data("ad_id");
n.remove(),i.articleList.save(e,function(e){
i._updateCurUrl(e.appMsgId),window.location.href=wx.url("/cgi-bin/frame?t=ad_system/common_simple_frame&t1=publisher/freetrade_item_detail&aid="+o);
},!1,t);
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
});
var h,f,j=$(".main_bd"),b=$(".js_aside"),x=$(".js_main_title"),y=x.offset().top,k=$(".js_main_inner"),C=$("body"),E="edit_fixed";
$(window).on("scroll",function(){
f&&(clearTimeout(f),f=null),h&&(clearTimeout(h),h=null);
var e,t,n=!0,o=i.articleList.getCurrentArticle();
if(o){
var s=o.data("article");
s&&s.getArticleType&&(t=s.getArticleType());
}
0==t?(e=y,n=!0):n=!1;
var a,r=$(window).scrollTop(),d=j[0].getBoundingClientRect();
n&&r>e?(C.addClass(E),x.width(k.width()),a=d.bottom-x.outerHeight()):(C.removeClass(E),
a=d.height),b.height(a).find(".js_scrollbar").css("max-height",a),n&&(f=setTimeout(function(){
i.ueditor&&i.ueditor.fireEvent("toolbar_fixed_change");
},100)),setTimeout(function(){
$(".js_scrollbar").scrollbar.updateScrollbars(!0);
});
}).trigger("scroll",!1);
var D=$(window).width();
1200>D&&$("#body").width(D),$(window).on("resize",function(){
var e=$(window).width();
1200>e?$("#body").width(e).find(".js_main_title").width(e):$("#body").width(1200).css({
"margin-left":"auto",
"margin-right":"auto"
}).find(".js_main_title").width(1200),1==Y.curRenderType&&i.ueditor.fireEvent("star_toolbar_float"),
$(window).trigger("scroll",!1);
}),$(window).on("unload",function(){
U.setData(1),U.send(1);
});
}
}),G=(new F({
app_id:M.app_id,
editor_selector:"#js_appmsg_editor",
appmsg_selector:"#js_appmsg_preview",
appmsg_data:M.appmsg_data
}),e("biz_common/utils/wxgspeedsdk.js"));
G.setBasicTime({
uin:wx&&wx.data&&wx.data.uin||0,
pid:34
}),G.send();
});