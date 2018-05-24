define("media/appmsg_edit.js",["widget/media/appmsg_editor.css","page/vote/dialog_vote_table.css","widget/date_select.css","common/wx/popup.js","biz_web/lib/json.js","common/wx/ban.js","media/media_static_data.js","media/report.js","media/plugin/audio.js","common/wx/time.js","common/qq/Class.js","media/media_cgi.js","biz_web/lib/store.js","common/wx/Tips.js","common/wx/tooltips.js","biz_common/moment.js","biz_web/utils/upload.js","biz_common/jquery.validate.js","common/wx/top.js","biz_web/ui/checkbox.js","common/lib/datepicker.js","biz_web/ui/dropdown.js","common/wx/media/imageDialog.js","common/wx/media/videoDialog.js","common/qq/mask.js","common/wx/pagebar.js","common/wx/tooltip.js","common/wx/inputCounter.js","common/wx/popover.js","common/wx/media/audio.js","tpl/vote/vote.html.js","tpl/simplePopup.html.js","tpl/media/appmsg_edit/first_appmsg.html.js","tpl/media/appmsg_edit/small_appmsg.html.js","tpl/media/dialog/audiomsg_layout.html.js","tpl/media/appmsg_edit/editor.html.js","common/wx/dialog.js","common/wx/Step.js","common/wx/Cgi.js","common/wx/verifycode.js","vote/new.js","tpl/vote/vote_table.html.js","cardticket/send_card.js","cardticket/parse_data.js"],function(require,exports,module){
"use strict";
function iframeUrlSwitcher(e){
for(var t=e.content,i=e.returnValue||"content",r=e.wrapper||"add",a=t.split(/<\/?iframe/),o="",s=" TMP_NAME=",n=[],c=[],d=[],l=0;l<a.length;l++){
if(-1!==a[l].indexOf("js_editor_vote_card")||-1!==a[l].indexOf("js_editor_card")){
a[l]=a[l].replace(" src=",s).replace(" data-display-src="," src=").replace(s," data-display-src="),
a[l]=a[l].replace(" style=",s).replace(" data-display-style="," style=").replace(s," data-display-style=");
var p=a[l].match(/data-voteid=\"([^\"]*)/);
p&&p[1]&&n.push(p[1]);
var _=a[l].match(/isMlt=(\d)/);
_&&_[1]&&c.push(_[1]),a[l]=a[l].replace(/token=(\d+)&/gi,"token="+wx.getUrl("token")+"&");
var m=a[l].match(/data-supervoteid=\"([^\"]*)/);
m&&m[1]&&d.push(m[1]);
}
o+=a[l],l<a.length-1&&(o+=(l%2?"</":"<")+"iframe");
}
switch(o="add"===r?o.replace(/(<iframe[\s\S]*js_editor_vote_card[\s\S]*<\/iframe>)/gi,function(e){
return['<span class="vote_area">',e,'<span class="vote_box skin_help po_left"></span>','<span class="vote_box skin_help po_right"></span>',"</span>"].join("");
}):o.replace('<span class="vote_area">',"").replace('<span class="vote_box skin_help po_left"></span><span class="vote_box skin_help po_right"></span></span>',""),
i){
case"voteid":
return n;

case"isMlt":
return c;

case"supervoteid":
return d;

case"content":
default:
return o;
}
}
function _formatData(e){
var t=e&&e.multi_item;
if(!t)return!1;
t[0].create_time=Time.getFullTime(e.create_time)||moment().format("YYYY-MM-DD HH:mm:ss");
for(var i=0;i<t.length;++i)for(var r in t[i])t[i][r].html&&(t[i][r]=t[i][r].html(!1));
return t?t:!1;
}
function setIframeHeight(){
setTimeout(function(){
var e=$("#ueditor_0").get(0).contentWindow.document.getElementsByTagName("iframe");
if(e&&e.length>0)for(var t=0;t<e.length;t++)if($(e[t]).hasClass("js_editor_vote_card")){
var i=e[t],r=$(i).height();
i.contentDocument&&i.contentDocument.body.offsetHeight?r=i.contentDocument.body.offsetHeight:i.Document&&i.Document.body&&i.Document.body.scrollHeight?r=i.Document.body.scrollHeight:i.document&&i.document.body&&i.document.body.scrollHeight&&(r=i.document.body.scrollHeight),
i.style.height=r+"px";
}
},5e3);
}
function funcPvUvReport(e,t){
Report.addPv(e,t),Report.addUv(e);
}
require("widget/media/appmsg_editor.css"),require("page/vote/dialog_vote_table.css"),
require("widget/date_select.css"),require("common/wx/popup.js"),require("biz_web/lib/json.js");
var Ban=require("common/wx/ban.js"),mediaStaticData=require("media/media_static_data.js"),Report=require("media/report.js"),pluginAudio=require("media/plugin/audio.js");
pluginAudio.registerCb(function(e){
if(e){
e={
name:encodeURIComponent(e.title),
play_length:encodeURIComponent(e.play_length),
file_id:encodeURIComponent(e.file_id),
voice_encode_fileid:e.voice_encode_fileid,
duration:e.format_play_length
},e.src="/cgi-bin/readtemplate?t=tmpl/audio_tmpl&name={name}&play_length={duration}".format(e);
var t='<p><iframe class="res_iframe js_editor_audio audio_iframe" frameborder="0" src="{src}" name="{name}" play_length="{play_length}" voice_encode_fileid="{voice_encode_fileid}"></iframe></p>';
t=t.format(e),window.insertMusic(t,"insertaudio");
}
});
var T=wx.T,cgiData=wx.cgiData,type=cgiData.type,app_id=cgiData.app_id,appmsg_data=cgiData.appmsg_data,can_use_vote=cgiData.can_use_vote,can_use_hyperlink=cgiData.can_use_hyperlink,render=template.render,Time=require("common/wx/time.js"),Clazz=require("common/qq/Class.js"),mediaCgi=require("media/media_cgi.js"),store=require("biz_web/lib/store.js"),Tips=require("common/wx/Tips.js"),Tooltips=require("common/wx/tooltips.js"),moment=require("biz_common/moment.js"),Upload=require("biz_web/utils/upload.js"),uploadBizFile=Upload.uploadImageLibFile,Validate=require("biz_common/jquery.validate.js"),validator=Validate.rules,Top=require("common/wx/top.js"),Checkbox=require("biz_web/ui/checkbox.js"),datepicker=require("common/lib/datepicker.js"),Dropdown=require("biz_web/ui/dropdown.js"),ImageDialog=require("common/wx/media/imageDialog.js"),VideoDialog=require("common/wx/media/videoDialog.js"),Mask=require("common/qq/mask.js"),PageBar=require("common/wx/pagebar.js"),Tooltip=require("common/wx/tooltip.js"),Pagebar=require("common/wx/pagebar.js"),InputCounter=require("common/wx/inputCounter.js"),Popover=require("common/wx/popover.js"),Audio=require("common/wx/media/audio.js"),_vote_pop_html=require("tpl/vote/vote.html.js"),_simple_popup_tpl=require("tpl/simplePopup.html.js"),_first_appmsg_html=require("tpl/media/appmsg_edit/first_appmsg.html.js"),_small_appmsg_html=require("tpl/media/appmsg_edit/small_appmsg.html.js"),_audio_appmsg_html=require("tpl/media/dialog/audiomsg_layout.html.js"),_editor_html=require("tpl/media/appmsg_edit/editor.html.js"),Dialog=require("common/wx/dialog.js"),Step=require("common/wx/Step.js"),Cgi=require("common/wx/Cgi.js");
new Top("#topTab",Top.DATA.media).selected("media"+type);
var itemID="#appmsgItem",itemClassName=".js_appmsg_item",dataID="appmsg",_defaultOpt={
maxNum:8
},currentMsgId=0;
template.helper("datestring",function(e){
function t(e,t){
for(var i=0,r=t-(e+"").length;r>i;i++)e="0"+e;
return e+"";
}
var i=new Date(e),r=["日","一","二","三","四","五","六"],a="yyyy年mm月dd日".replace(/yyyy|YYYY/,i.getFullYear()).replace(/yy|YY/,t(i.getFullYear()%100,2)).replace(/mm|MM/,t(i.getMonth()+1,2)).replace(/m|M/g,i.getMonth()+1).replace(/dd|DD/,t(i.getDate(),2)).replace(/d|D/g,i.getDate()).replace(/hh|HH/,t(i.getHours(),2)).replace(/h|H/g,i.getHours()).replace(/ii|II/,t(i.getMinutes(),2)).replace(/i|I/g,i.getMinutes()).replace(/ss|SS/,t(i.getSeconds(),2)).replace(/s|S/g,i.getSeconds()).replace(/w/g,i.getDay()).replace(/W/g,r[i.getDay()]);
return a;
});
var URL_PLATFORM_MAP=mediaStaticData.URL_PLATFORM_MAP,_Draft=Clazz.declare({
init:function(e,t,i){
var r=this;
if(!r._supportUserData()&&"undefined"==typeof localStorage)return!1;
r.isMul=e,r.app_id=t,r.draftId=wx.data.uin+(t?t:"")+(e?"m":"")+i,r.timeKey="Time"+r.draftId,
r.appKey="App"+r.draftId,r.isDropped=!1,store.get(r.timeKey)&&(r._showTips("（已载入"+r._getSaveTime()+"的草稿）"),
$("#js_cancle").show(),funcPvUvReport("usecache"));
var a=Math.floor(wx.cgiData.svr_time-new Date/1e3);
store.get(r.timeKey)&&Number(wx.cgiData.updateTime)>moment(store.get(r.timeKey),"YYYY-MM-DD HH:mm:ss").unix()+a&&confirm("当前图文消息本地草稿保存后，服务器图文消息有更新。请确认是否放弃保存本地草稿？")&&(store.remove(r.timeKey),
store.remove(r.appKey));
},
_supportUserData:function(){
try{
var e=document.createElement("input");
e.addBehavior("#default#userData");
}catch(t){
return!1;
}
return!0;
},
_getSaveTime:function(){
return store.get(this.timeKey);
},
_showTips:function(e){
$("#js_auto_tips").html(e).show();
},
clear:function(){
store.remove(this.timeKey),store.remove(this.appKey);
},
save:function(e){
var t=this;
t.clear(),store.set(t.timeKey,moment().format("YYYY-MM-DD HH:mm:ss")),store.set(t.appKey,e),
t._showTips("（自动保存："+store.get(t.timeKey)+"）"),$("#js_cancle").hide();
},
get:function(){
var e=store.get(this.appKey);
return e?e:!1;
}
}),article_type=mediaStaticData.article_type,report_vid_type=[],_Appmsg=Clazz.declare({
init:function(e){
var t=this;
if(t.gid=1,$.extend(!0,t,_defaultOpt,e),t.maxNum=t.isMul?t.maxNum:1,t.editor$=$(t.editor_selector).html(T(_editor_html,{
can_use_copyright:cgiData.can_use_copyright,
can_use_reward:cgiData.can_use_reward,
can_use_payforread:cgiData.can_use_payforread,
can_use_comment:cgiData.can_use_comment,
has_invited_original:cgiData.has_invited_original,
orginal_apply_stat:cgiData.orginal_apply_stat,
isMul:t.isMul,
token:wx.data.t,
type:type
})),t._initEditor(),t.appmsg$=$(t.appmsg_selector),t.nowitem$=null,t.uploadImgItem$=null,
t.isNew=!0,t.isFirst=!0,t.unHandleCatches={},t.list=_formatData(t.appmsg_data),window.Draft=t.draft=new _Draft(t.isMul,t.app_id,type),
10==type){
var i=t.get_draft();
if(i){
for(var r,a=0;r=i[a];++a)r.content=r.content.replace(/\\{64,}/g,"\\");
t.list=i;
}
}
if(t.list)for(var o=t.list,a=0;a<o.length;++a)t.add(o[a]);else t.add();
t._refreshUI(0),t.appmsg$.on("click",".js_edit",function(){
var e=$(this),i=e.data("id");
currentMsgId=i,t.nowitem$&&i!=t.nowitem$.data("id")&&(t._refreshUI($(itemID+i)),
t._hideErrorTips());
}),t.appmsg$.on("click",".js_del",function(){
var e=$(this),i=e.data("id");
t.remove($(itemID+i));
}),t.isMul?$("#js_add_appmsg").click(function(){
t.add();
}):$("#js_add_appmsg").addClass("dn"),10==type&&(setInterval(function(){
t.auto_save();
},12e4),window.onbeforeunload=function(){
var e=!0,i=t._getEditData();
for(var r in i)if(i[r]){
e=!1;
break;
}
if(!e&&!t.draft.isDropped){
t.auto_save();
{
store.get(t.draft.timeKey);
}
return'已自动保存" + time + "时的内容。';
}
t.draft.clear();
}),$(window).on("unload",function(){
Report.send();
});
},
_initEditor:function(){
var e=this,t=e.editor$;
if($(".js_title",t).keyup(function(){
var t=$(this).val().trim().html(!0);
e.nowitem$&&e.nowitem$.find(".appmsg_title a").html(t||"标题"),$(".js_title_error",this.editor$).hide();
}),$(".js_author",t).keyup(function(){
$(".js_author_error",this.editor$).hide();
}),$(".js_desc",t).keyup(function(){
var i=$(this).val().trim().html(!0);
e.nowitem$&&e.nowitem$.find(".appmsg_desc").html(i),$(".js_desc_error",t).hide();
}),$(".js_addURL",t).click(function(){
$(this).hide(),$(".js_url_area",t).show();
}),$(".js_url",t).keyup(function(){
$(".js_url_error",this.editor$).hide(),$(".js_profile_error",this.editor$).hide();
}),$(".js_show_cover_pic",t).on("click",function(){
var e=$(this).find("input");
e.is(":checked")?(e.prop("checked",!1),$(this).removeClass("selected")):(e.prop("checked",!0),
$(this).addClass("selected"));
}),$(".js_comment",t).checkbox({
multi:!0
}),$("#js_url_checkbox").checkbox({
multi:!0,
onChanged:function(e){
e.checkbox("value")?($(".js_url_area",t).find(".frm_input_box").show(),funcPvUvReport("showlink")):($(".js_url_area",t).find(".frm_input_box").hide(),
funcPvUvReport("hidelink"));
}
}),$(".js_reward",t).checkbox({
multi:!0,
onChanged:function(e){
e.checkbox("value")?(e.checkbox("checked",!1),$("#tpl_reward_statement").popup({
title:"文章赞赏须知",
width:960,
buttons:[{
text:"确定",
type:"primary",
click:function(){
$(".js_reward_div",t).show(),e.checkbox("checked",!0),this.remove();
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
})):$(".js_reward_div",t).hide();
}
}),e._initPay(),$(".js_addDesc",t).show().click(e.isMul?function(){
$(this).hide(),$(".js_desc_area",t).show(),$(".js_desc_error",t).hide();
}:function(){
$(this).hide(),$(".js_desc_area",t).show(),$(".js_desc_error",t).hide();
}),$(".js_removeCover",t).click(function(){
$(".js_cover",t).data("file_id",!1).hide().find("img").remove(),e.nowitem$&&e.nowitem$.removeClass("has_thumb");
}),uploadBizFile({
multi:!1,
type:2,
scene:7,
doublewrite:!0,
container:"#js_appmsg_upload_cover",
onSelect:function(){
e.uploadImgItem$=e.nowitem$,$.post("/misc/jslog?1=1"+wx.data.param,{
id:37,
val:1,
level:"trace",
content:"[file=media/appmsg_edit]"
});
},
onComplete:function(i,r,a,o){
if(0==o.base_resp.ret){
var s=o.content,n=wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(s));
$(".js_cover",t).find("img").remove(),$(".js_cover",t).show().prepend('<img src="%s">'.sprintf(n)).data("file_id",s),
e.nowitem$&&(e.nowitem$.find("img.js_appmsg_thumb").attr("src",n),e.nowitem$.find("div.js_appmsg_thumb").css("backgroundImage",'url("'+n+'")'),
e.nowitem$.addClass("has_thumb")),$(".js_cover_error",t).hide();
}
}
}),$("#js_imagedialog").on("click",function(){
document.body.style.overflow=document.documentElement.style.overflow="hidden",ImageDialog({
scene:"biz",
uploadScene:2,
maxSelect:1,
desc:"建议尺寸：900像素 * 500像素",
onOK:function(i){
var r=i[0].file_id,a=wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(r));
$(".js_cover",t).find("img").remove(),$(".js_cover",t).show().prepend('<img src="%s">'.sprintf(a)).data("file_id",r),
e.nowitem$&&(e.nowitem$.find("img.js_appmsg_thumb").attr("src",a),e.nowitem$.find("div.js_appmsg_thumb").css("backgroundImage",'url("'+a+'")'),
e.nowitem$.addClass("has_thumb")),$(".js_cover_error",t).hide(),$.post("/misc/jslog?1=1"+wx.data.param,{
id:38,
val:1,
level:"trace",
content:"[file=media/appmsg_edit]"
}),this.destroy(),document.body.style.overflow=document.documentElement.style.overflow="auto";
},
onCancel:function(){
this.destroy(),document.body.style.overflow=document.documentElement.style.overflow="auto";
}
});
}),$(".js_counter",t).each(function(){
new InputCounter(this,{
maxLength:$(this).attr("max-length")
});
}),document.domain="qq.com",10==type){
UEDITOR_CONFIG.toolbars[0].splice(8,0,"|"),UEDITOR_CONFIG.toolbarsPermission.insertmusic=wx.cgiData.qqmusic_flag;
var i=new baidu.editor.ui.Editor({
wordCount:!1,
elementPathEnabled:!1,
customDomain:!0
});
i.render("js_editor"),e.ueditor=i,window._ueditor=i,i.addListener("funcPvUvReport",function(e,t,i){
funcPvUvReport(t,i);
}),i.addListener("begincatchimage",function(){
Tips.suc("内容已上传完成");
}),i.addListener("catchremotesuccess",function(t,r,a,o,s,n){
var c=i.window.document,d=c.getElementById(r);
if(null==d)return void(e.unHandleCatches[r]={
ret:0,
src:a,
url:o,
format:s,
type:n
});
var l={
src:o
};
s&&(l["data-type"]=s),"img"==n?$(d).attr(l).removeAttr("_src").removeAttr("data-src").removeClass("js_catchingremoteimage").trigger("catchremotesuccess",{
source:a,
type:n
}):$(d).css({
"background-image":o?"url("+o+")":"none"
}).removeClass("js_catchingremoteimage").trigger("catchremotesuccess",{
source:a,
type:n
});
var p=$(c).find(".js_catchremoteimageerror").length;
0==p?$(".js_catch_tips",e.editor$).hide():$(".js_catch_tips",e.editor$).text("有%s张图片粘贴失败".sprintf(p)).show();
}),i.addListener("catchremoteerror",function(t,r,a){
var o=i.window.document,s=o.getElementById(r);
if(null==s)return void(e.unHandleCatches[r]={
ret:-1
});
"img"==a?$(s).css({
width:"497px",
height:"auto"
}).attr({
src:"http://mmbiz.qpic.cn/mmbiz/G1lssUsxJOsVVJNUIuKfUP7bLm5EVWxXl5znicMum6Os0CMJHPdeHicicZ4W5MGOVa8ooSXYuE61Ek/0"
}).removeAttr("_src").removeAttr("data-src").addClass("js_catchremoteimageerror").trigger("catchremoteerror",s):$(s).css({
width:"497px",
height:"auto",
"background-image":"url(http://mmbiz.qpic.cn/mmbiz/G1lssUsxJOsVVJNUIuKfUP7bLm5EVWxXl5znicMum6Os0CMJHPdeHicicZ4W5MGOVa8ooSXYuE61Ek/0)"
}).addClass("js_catchremoteimageerror").trigger("catchremoteerror",s);
var n=$(o).find(".js_catchremoteimageerror").length;
$(".js_catch_tips",e.editor$).text("有%s张图片粘贴失败".sprintf(n)).show(),$(".js_content_error",e.editor$).hide();
}),i.addListener("keyup aftersetcontent",function(){
var t=i.window.document;
$.each(e.unHandleCatches,function(r,a){
var o=t.getElementById(r);
null!=o&&(delete e.unHandleCatches[r],0==a.ret?i.fireEvent("catchremotesuccess",r,a.src,a.url,a.format,a.type):i.fireEvent("catchremoteerror",r));
});
var r=$(t).find(".js_catchremoteimageerror").length;
r>0?$(".js_catch_tips",e.editor$).text("有%s张图片粘贴失败".sprintf(r)).show():$(".js_catch_tips",e.editor$).hide();
}),i.addListener("keyup",function(){
$(".js_content_error",e.editor$).hide();
}),i.addListener("openimagedialog",function(){
document.body.style.overflow=document.documentElement.style.overflow="hidden",ImageDialog({
uploadScene:3,
maxSelect:100,
doselected:!0,
completeUploadMinSelectNum:1,
onOK:function(e){
i.execCommand("insertimage",e.map(function(e){
return e.src=e._src=e.url,e;
}));
var t=0,r=0;
$.each(e,function(e,i){
"upload"==i.source?t++:r++;
}),t>0&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:39,
val:t,
level:"trace",
content:"[file=media/appmsg_edit]"
}),r>0&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:40,
val:r,
level:"trace",
content:"[file=media/appmsg_edit]"
});
var a=e.length;
a>0&&funcPvUvReport("insertimage",a),this.destroy(),document.body.style.overflow=document.documentElement.style.overflow="auto";
},
onHide:function(){
this.destroy(),document.body.style.overflow=document.documentElement.style.overflow="auto";
}
});
}),i.addListener("openvideodialog",function(){
var e=i.window.document;
$(e).find("iframe.video_iframe").length<3?new VideoDialog({
can_use_shortvideo:!!(wx&&wx.acl&&wx.acl.msg_acl&&wx.acl.msg_acl.can_use_shortvideo),
can_use_txvideo:wx.cgiData.can_use_txvideo,
scene:"ueditor",
onOK:function(e,t){
if(report_vid_type.push(15==e||21==e?"1":"0"),21==e){
var r="//mp.weixin.qq.com/mp/getcdnvideourl?__biz=%s&cdn_videoid=%s&thumb=%s".sprintf(cgiData.biz_uin,encodeURIComponent(t.video_cdn_id),encodeURIComponent(t.video_thumb_cdn_url)),a=r+"&shortvideo_sn="+cgiData.shortvideo_sn,o='<iframe data-shortvideofileid="%s" class="video_iframe video_small_iframe" style="height:240px;width:320px !important;" frameborder=0 scrolling="no" src="%s" data-src="%s" allowfullscreen></iframe><br/>'.sprintf(t.file_id,a,r);
i.execCommand("inserthtml",o,!0),funcPvUvReport("wxvideo");
}else 15==e?(t.height=375,t.width=500,t.vid=t.content,t.url="https://v.qq.com/iframe/preview.html?vid="+t.vid+"&width=500&height=375&auto=0",
i.execCommand("insertvideo",t),funcPvUvReport("mpvideo")):(i.execCommand("insertvideo",t),
funcPvUvReport("qqvideo"));
return!0;
}
}):Tips.err("最多添加3个小视频、腾讯视频或微视频");
});
var r=function(){
var e=$(".edui-for-insertvote");
e.length?e.remove():setTimeout(r,100);
};
if(!can_use_vote&&r(),!wx.cgiData.can_use_card){
var a=function(){
var e=$(".edui-for-insertcard");
e.length?e.remove():setTimeout(a,100);
};
a();
}
UEDITOR_CONFIG.toolbarsPermission&&(UEDITOR_CONFIG.toolbarsPermission.link=UEDITOR_CONFIG.toolbarsPermission.unlink=wx.cgiData.can_use_copyright||can_use_hyperlink,
"1"==wx.cgiData.is_link_white&&(UEDITOR_CONFIG.toolbarsPermission.link=UEDITOR_CONFIG.toolbarsPermission.unlink=1)),
UEDITOR_CONFIG.toolbarsPermission.insertaudio=wx.cgiData.can_use_voice,e._initOriginal();
}
},
_initOriginal:function(){
var e=this,t=e.editor$;
$(document).on("click",".js_original_apply",function(){
var i=$("#js_original"),r=$("#tpl_original").popup({
title:"声明原创",
width:960,
className:"simple align_edge original_dialog",
data:{
first:i.find(".js_original_publish").val()||1,
url:i.find(".js_url").text()||$(".js_url",e.editor$).val(),
author:i.find(".js_author").text()||$(".js_author",e.editor$).val(),
platform:i.find(".js_platform").text()||"",
frm:i.find(".js_reprint_frm").val()||1
},
buttons:[{
text:"下一步",
type:"primary",
click:function(){
a.find(".js_step_panel").hide().eq(1).show();
var e=new Dropdown({
container:"#js_original_article_type",
label:"请选择",
data:article_type
});
e.selected(i.find(".js_classify").text()),a.find(".js_btn_p").eq(0).hide(),a.find(".js_btn_p").eq(1).show(),
a.find(".js_btn_p").eq(2).show(),o.setStep(2);
}
},{
text:"上一步",
click:function(){
a.find(".js_step_panel").hide().eq(0).show(),a.find(".js_btn_p").eq(0).show(),a.find(".js_btn_p").eq(1).hide(),
a.find(".js_btn_p").eq(2).hide(),o.setStep(1);
}
},{
text:"确定",
type:"primary",
click:function(){
e._checkOriginal(a)&&($(".js_original_type").hide().eq(1).show(),$(".js_original_content").show(),
$(".js_author",t).closest(".appmsg_edit_item").eq(0).hide(),$(".js_url_area",t).hide(),
$(".js_reward",t).checkbox("disabled",!1).checkbox("checked",!0),$(".js_reward_div",t).show(),
"checked"==a.find(".js_forIEbug_frm").attr("checked")?($("#js_pay",t).checkbox("disabled",!0),
$("#js_pay",t).checkbox("checked",!1),$(".js_pay_tips",e.editor$).show().text("（只有“禁止转载”的原创文章才可以设置付费阅读）"),
$(".js_pay_setting",t).hide()):($("#js_pay",t).checkbox("disabled",!1),$(".js_pay_tips",e.editor$).show().text("（每月可群发10篇付费阅读文章）")),
this.remove());
}
}],
onHide:function(){
this.remove();
}
}),a=r.popup("get");
a.find(".js_btn_p").eq(1).hide(),a.find(".js_btn_p").eq(2).hide();
var o=new Step({
container:a.find(".js_step"),
selected:1,
names:["1 须知","2 原创声明信息"]
});
a.find(".js_original_publish").checkbox({
multi:!1,
onChanged:function(e){
a.find(".js_platform").parent().hide().eq(e.val()).show(),a.find(".js_url").attr("placeholder",+e.val()?"选填":"该原创文章在其他网站的地址").trigger("blur");
}
}),$(".js_forIEbug_selectedTure").hasClass("selected")||$(".js_forIEbug_selectedFalse").hasClass("selected")||$(".js_forIEbug_selectedTure").addClass("selected"),
a.find(".js_reprint_frm").checkbox({
multi:!1
}),new Tooltips({
container:"#js_frmtips",
content:$("#frm_tips").html(),
position:{
left:-30,
top:0
},
reposition:!0,
type:"hover",
parentClass:"reprinted_tips"
}),$($(".popover")[$(".popover").length-1]).css("z-index","9999"),$($(".popover")[$(".popover").length-1]).children(".popover_arrow").css("left","8%"),
a.find(".js_counter").each(function(){
$(this).hasClass("js_author")?new InputCounter($(this),{
maxLength:8
}):new InputCounter($(this),{
maxLength:10
});
}),a.on("input propertychange blur",".js_url",function(){
if(1!=a.find(".js_original_publish:checked").val()){
var e=$.trim($(this).val()),t=e.match(/^(https?:\/\/)?((([\da-z]+\.)+)?(([\da-z]+)\.[\da-z]+))/),i="";
t&&(i=i||URL_PLATFORM_MAP[t[5]],i=i||URL_PLATFORM_MAP[t[2]],i=i||t[6]),i&&$(this).closest(".js_step_panel").find(".js_platform").eq(0).val(i).trigger("keyup");
}
}),a.on("keyup",".js_platform,.js_url,.js_author",function(){
$(this).closest(".frm_controls").find(".fail").hide();
});
}),$dom.find("#js_copyright_agree").checkbox({
onChanged:function(e){
e.prop("checked")?$dom.find(".js_btn_p").enable():$dom.find(".js_btn_p").disable();
}
}),$(".js_original_cancel").on("click",function(){
$(".js_original_type").hide().eq(0).show(),$(".js_original_content").hide(),$(".js_author",t).closest(".frm_control_group").eq(0).show(),
$(".js_url_area",t).show(),$(".js_reward",t).checkbox("disabled",!0),$(".js_reward",t).checkbox("checked",!1),
$(".js_reward_div",this.editor$).hide(),$(".js_reward_wording",t).val(),$("#js_pay",t).checkbox("disabled",!0),
$("#js_pay",t).checkbox("checked",!1),$(".js_pay_tips",e.editor$).show().text("（只有“禁止转载”的原创文章才可以设置付费阅读）"),
$(".js_pay_setting",t).hide();
}),$("#js_original_detail").on("click",function(){
$(this).parent().toggleClass("open"),$(this).siblings("ul").toggle();
});
var i=!0,r=cgiData.orginal_apply_stat,a=1==cgiData.has_invited_original?"/acct/copyrightapply?action=apply":"/acct/selfapply?action=apply";
a=wx.url(a);
var o=$("#js_original_func_open").closest(".js_original_type"),s=function(){
Cgi.post({
url:"/cgi-bin/appmsg?action=get_original_stat"
},function(e){
if(e.base_resp&&0==e.base_resp.ret){
var t="";
switch(+e.orginal_apply_stat){
case 0:
t="原创声明：未开通";
break;

case 1:
t="原创声明：审核中",o.find(".opt").hide();
break;

case 2:
t="原创声明：申请失败",o.find(".opt").hide();
break;

case 3:
t="原创：未声明",o.find(".opt").html('<a href="javascript:;" onclick="return false;" class="btn btn_default js_original_apply">声明原创</a>').show();
}
o.find(".subtitle").text(t),r=e.orginal_apply_stat;
}
3!=e.orginal_apply_stat&&setTimeout(s,2e3);
});
};
$("#js_original_func_open").on("click",function(){
0==r&&window.open(a),i&&(i=!1,setTimeout(s,2e3));
});
},
_initPay:function(){
var e=this,t=e.editor$,i=e._createPayDialog();
$("#js_pay",t).checkbox({
multi:!0,
onChanged:function(r){
r.checkbox("value")?e._showPayDialog(i):(i.popup("hide"),$(".js_pay_setting",t).hide());
}
}),$(".js_pay_edit",t).on("click",function(){
e._showPayDialog(i);
});
},
_showPayDialog:function(e){
var t=this,i=t.editor$,r=e.popup("get");
r.find(".js_fee").val($(".js_fee",i).text()),r.find(".js_step_panel").hide().eq(0).show(),
r.find(".js_btn_p").hide(),r.find(".js_btn_p").eq(0).show(),r.find(".js_btn_p").eq(1).show(),
e._step.setStep(1),e.popup("show");
},
_createPayDialog:function(){
var e=this,t=e.editor$,i=$("#tpl_pay").popup({
title:"付费阅读设置",
width:960,
className:"simple align_edge pay_dialog",
autoShow:!1,
data:{},
buttons:[{
text:"取消",
click:function(){
$(".js_pay_setting",t).is(":visible")||$("#js_pay",t).checkbox("checked",!1),this.hide();
}
},{
text:"下一步",
type:"primary",
click:function(){
var i=e.freeUEditor.val(),o=r.find(".js_fee").val();
return""==i?void Tips.err("免费区域不能为空"):validator.rangelength(i,[20,200])?!o||!/^\d*(\.\d+)?$/.test(o)||o.toString().match(/\.\d{3,}/)||.01>o?void Tips.err("请输入正确的金额"):.01>o?void Tips.err("金额必须大于零"):o>200?void Tips.err("金额不能超过200元"):(r.find(".js_content").html(i),
r.find(".js_content_count").text(e.ueditor.getContent().text().length),r.find(".js_fee_preview").text(parseFloat(o).toFixed(2)),
r.find(".js_nickname").text(wx.data.nick_name),r.find(".js_title").text($.trim($(".js_title",t).val())),
r.find(".js_author").text($.trim($(".js_author",t).val())),r.find(".js_date").text(moment().format("YYYY-MM-DD")),
r.find(".js_step_panel").hide().eq(1).show(),r.find(".js_btn_p").hide(),r.find(".js_btn_p").eq(2).show(),
r.find(".js_btn_p").eq(3).show(),r.find(".js_preview").scrollTop(1e8),a.setStep(2),
void this.resetPosition()):void Tips.err("正文字数要多于20字且不能超过200字");
}
},{
text:"上一步",
click:function(){
r.find(".js_step_panel").hide().eq(0).show(),r.find(".js_btn_p").hide(),r.find(".js_btn_p").eq(0).show(),
r.find(".js_btn_p").eq(1).show(),a.setStep(1),this.resetPosition();
}
},{
text:"确定",
type:"primary",
click:function(){
$(".js_pay_setting",t).show().find(".js_fee").text((+r.find(".js_fee").val()).toFixed(2)),
$(".js_pay_tips",this.editor$).hide(),this.hide();
}
}],
onClose:function(){
$(".js_pay_setting",t).is(":visible")||$("#js_pay",t).checkbox("checked",!1),i.popup("hide");
},
onShow:function(){
this.resetPosition();
}
}),r=i.popup("get");
r.find(".js_btn_p").eq(2).hide(),r.find(".js_btn_p").eq(3).hide();
var a=new Step({
container:r.find(".js_step"),
selected:1,
names:["设置","预览并确认"]
});
return e.freeUEditor=r.find(".js_editor"),new InputCounter(e.freeUEditor,{
minLength:20,
maxLength:200
}),r.find(".js_fee").on("input propertychange",function(){
var e=$(this).val();
e&&/^\d*(\.\d+)?$/.test(e)&&!e.toString().match(/\.\d{3,}/)?.01>e?$(this).parent().addClass("error"):e>200?$(this).parent().addClass("error"):$(this).parent().removeClass("error"):$(this).parent().addClass("error");
}),i.popup("resetPosition"),i._step=a,i;
},
_checkOriginal:function(e){
var t=!0,i="checked"==e.find(".js_forIEbug_frm").attr("checked")?1:e.find(".js_reprint_frm:checked").val(),r="checked"==e.find(".js_forIEbug_original").attr("checked")?1:0,a=e.find(".js_url").val(),o=e.find(".js_platform").eq(r).val(),s=e.find(".js_author").val(),n=e.find("#js_original_article_type .dropdown_switch label").text();
a&&!/https?\:\/\//.test(a)&&(a="http://"+a),validator.rangelength(s,[1,8])?e.find(".js_author_error").hide():(e.find(".js_author_error").show(),
t=!1),0!=r&&!a||validator.url(a)||$(".js_forIEbug_selectedTure").hasClass("selected")?e.find(".js_url_error").hide():(e.find(".js_url_error").show(),
t=!1),$(".js_forIEbug_selectedTure").hasClass("selected")&&!$(".js_forIEbug_selectedFalse").hasClass("selected")&&(o="微信公众平台"),
validator.rangelength(o,[1,10])||$(".js_forIEbug_selectedTure").hasClass("selected")||!$(".js_forIEbug_selectedFalse").hasClass("selected")?e.find(".js_platform_error").hide():(e.find(".js_platform_error").show(),
t=!1);
for(var c=!1,d=0;d<article_type.length;d++)n==article_type[d].name&&(c=!0);
if(0==c?(e.find(".js_article_type_error").show(),t=!1):e.find(".js_article_type_error").hide(),
t){
var l=$("#js_original");
l.find(".js_original_publish").val(r),l.find(".js_url").text(a).closest("li")[a?"show":"hide"](),
l.find(".js_platform").text(o),l.find(".js_author").text(s),l.find(".js_reprint_frm").val(i),
l.find(".js_frm").text(1==i?"允许转载":2==i?"授权转载":"禁止转载"),l.find(".js_classify").text(n);
}
return t;
},
_getItem$:function(e){
var t=this,i=null;
return i=$.isNumeric(e)?t.appmsg$.find(itemClassName).eq(e):$(e);
},
_getNextItem$:function(e){
for(var t=this,i=t.appmsg$.find(itemClassName),r=i.length,a=0;r>a&&i.eq(a).data("id")!=e.data("id");++a);
return r>a?(a=(a+1)%r,i.eq(a)):null;
},
_getItemIdx:function(e){
for(var t=this,i=t.appmsg$.find(itemClassName),r=i.length,a=0;r>a;++a)if(i.eq(a).data("id")==e.data("id"))return a;
return-1;
},
_getEditData:function(){
var e=this.editor$,t={};
if(t.title=$(".js_title",e).val().trim(),t.author=$(".js_author",e).val().trim(),
t.file_id=$(".js_cover",e).data("file_id"),t.show_cover_pic=$(".js_show_cover_pic",e).hasClass("selected")?1:0,
10==type?t.source_url=$(".js_url",e).val().trim():t.content_url=$(".js_url",e).val().trim(),
t.digest=$(".js_desc",e).val().trim(),10==type){
!function(){
var e=$("#js_editor").find("iframe")[0];
if(e){
var t=$(e.contentDocument||e.document),i=t.find("body").width(),r=t.find("img");
r.each(function(){
var e=$(this),t=e.width(),r=e.height();
e.attr("data-ratio",r/t),e.attr("data-w",i==t?"":t);
});
}
}();
for(var i=t.content=this.ueditor.getContent().replace(/<img(.*?)\s+src="/g,'<img$1 data-src="').replace(/&nbsp;/g," ").replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/"),r=/<iframe\s(?:[\s\S]*?)musicid\=[\'\"]([\d]*?)[\'\"](?:[\s\S]*?)>/g,a=[],o="",s=null;null!=(s=r.exec(i));)s[1]&&-1==o.indexOf(s[1]+",")&&(a.push(s[1]),
o+=s[1]+",");
t.music_id=a.join(",");
for(var n=/src\=(\'|\")https\:\/\/v\.qq\.com\/iframe\/preview\.html\?(.*?)vid\=([^&]+)/g,c=[],d="",l=null;null!=(l=n.exec(i));)l[3]&&-1==d.indexOf(l[3]+",")&&(c.push(l[3]),
d+=l[3]+",");
if(t.video_id=c.join(","),t.content=t.content.replace(/<iframe([^>]*?)(\s)+src=\"https:\/\/v\.qq\.com\/iframe/g,'<iframe$1data-src="https://v.qq.com/iframe'),
t.content=t.content.replace(/<iframe([^>]*?)(\s)+src=\"http:\/\/z\.weishi\.com\/weixin\/player\.html/g,'<iframe$1data-src="http://z.weishi.com/weixin/player.html'),
t.content=t.content.replace(/(<\w+[^>]*)\sid=\"([^\">]*)\"([^>]*>)/g,"$1$3"),t.content=t.content.replace(/<iframe([^>]*?)js_editor_qqmusic([^>]*?)><\/iframe>/g,"<qqmusic $1js_editor_qqmusic$2></qqmusic>"),
t.content=t.content.replace(/<iframe([^>]*?)js_editor_audio([^>]*?)><\/iframe>/g,"<mpvoice $1js_editor_audio$2></mpvoice>"),
t.content=t.content.replace(/<iframe (data-shortvideofileid[^>]*?)\ssrc=\"([^\"]+)\"([^>]*)>/g,"<iframe $1$3>"),
t.content=t.content.replace(/<iframe ([^>]*)\ssrc=\"([^\"]+)\"([^>]*data-shortvideofileid[^>]*)>/g,"<iframe $1$3>"),
t.content=iframeUrlSwitcher({
content:t.content,
wrapper:"add"
}),1==can_use_hyperlink){
var p=t.content.match(/<a([^>]*)>(.*?)<\/a>/g);
p&&(t.link_count=p.length);
}
t.can_reward=$(".js_reward",e).checkbox("value")?1:0,t.reward_wording=$.trim($(".js_reward_wording",e).val()),
t.need_open_comment=$(".js_comment",e).checkbox("value")?1:0,t.payforread_enabled=$("#js_pay",e).checkbox("value")?1:0,
t.free_content=this.freeUEditor.val(),t.fee=100*$(".js_fee",e).text();
}
return this.nowitem$.is("#appmsgItem1")&&(t.isFirst=!0),10==type&&(t.digest=t.isFirst?t.digest||t.content.text().html(!1).substr(0,54):t.content.text().html(!1).substr(0,54)),
t.copyright_type=$(".js_original_type:visible").index(),t.copyright_type=t.copyright_type<0?0:t.copyright_type,
t.copyright_type&&(t.releasefirst=$("#js_original").find(".js_original_publish").val(),
t.author=$("#js_original").find(".js_author").text(),t.source_url=$("#js_original").find(".js_url").text(),
t.platform=+t.releasefirst?"":$("#js_original").find(".js_platform").text(),t.reprint_permit_type=$("#js_original").find(".js_reprint_frm").val(),
t.original_article_type=$("#js_original").find(".js_classify").text()),t;
},
_fillEditArea:function(e){
var t=this,i=t.editor$;
if(e){
if(console.log(e),i.find(".js_cover_tip").html(e.isFirst?"（大图片建议尺寸：900像素 * 500像素）":"（小图片建议尺寸：200像素 * 200像素）"),
$(".js_title",i).val(e.title).trigger("keydown"),$(".js_author",i).val(e.author).trigger("keydown"),
0==e.show_cover_pic?$(".js_show_cover_pic",i).removeClass("selected").find("input").prop("checked",!1):$(".js_show_cover_pic",i).addClass("selected").find("input").prop("checked",!0),
1==e.can_reward?($(".js_reward",i).checkbox("checked",!0),$(".js_reward_div",i).show()):($(".js_reward",i).checkbox("checked",!1),
$(".js_reward_div",i).hide()),$(".js_comment",i).checkbox("checked",0==e.need_open_comment?!1:!0),
$(".js_reward_wording",i).val(e.reward_wording).trigger("keydown"),$(".js_cover",i).find("img").remove(),
e.file_id){
var r=e.cover||wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s>".sprintf(e.file_id));
$(".js_cover",i).show().prepend('<img src="%s">'.sprintf(r)).data("file_id",e.file_id);
}else $(".js_cover",i).data("file_id",!1).hide();
$(".js_desc",i).val(e.digest).trigger("keydown"),!t.isMul&&10==type,10==type?($(".js_url",i).val(e.source_url||""),
e.source_url&&($("#js_url_checkbox").checkbox("checked",!0),$(".js_url_area",i).find(".frm_input_box").show())):$(".js_url",i).val(e.content_url||""),
10==type&&(t._setEditorContent(e.content),t._setOriginal(e),t._setPay(e));
}
},
_setEditorContent:function(e){
var t=this;
t.ueditor.ready(function(){
var i=iframeUrlSwitcher({
content:e,
wrapper:"remove"
});
if(i=i.replace(/<img(.*?)\s+data\-src="/g,'<img$1 src="').replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qlogo.cn/")||"",
i=i.replace(/background\-image:\s*url\(https\:\/\/mp\.weixin\.qq\.com\/cgi\-bin\/appmsg(.*?)\)/g,""),
i=i.replace(/<iframe (data-shortvideofileid[^>]*?data\-src=\")([^\"]+)(\")([^>]*)>/g,'<iframe $1$2$3 src="%s" $4>'.sprintf("%s&shortvideo_sn=%s".sprintf("$2",wx.cgiData.shortvideo_sn))),
i=i.replace(/<iframe ([^>]*data\-src=\")([^\"]+)(\")([^>]*data-shortvideofileid[^>]*)>/g,'<iframe $1$2$3 src="%s" $4>'.sprintf("%s&shortvideo_sn=%s".sprintf("$2",wx.cgiData.shortvideo_sn))),
i=i.replace(/<iframe([^>]*?)data\-src=\"https:\/\/v\.qq\.com\/iframe/g,'<iframe$1src="https://v.qq.com/iframe'),
i=i.replace(/<iframe([^>]*?)data\-src=\"http:\/\/z\.weishi\.com\/weixin\/player\.html/g,'<iframe$1src="http://z.weishi.com/weixin/player.html'),
i=i.replace(/<qqmusic([^>]*?)js_editor_qqmusic([^>]*?)><\/qqmusic>/g,"<iframe $1js_editor_qqmusic$2></iframe>"),
i=i.replace(/<mpvoice([^>]*?)js_editor_audio([^>]*?)><\/mpvoice>/g,"<iframe $1js_editor_audio$2></iframe>"),
t.ueditor.setContent(i),cgiData.ueditorReady=!0,window.initCard(),setIframeHeight(),
!t.initZoomArea){
var r='<a id="js_zoomout" href="javascript:;" onclick="return false;" class="icon_edui_zoom zoom_out_switch js_tooltip" data-tooltip="全屏模式">全屏</a>';
r+='<a id="js_zoomin"  href="javascript:;" onclick="return false;" class="icon_edui_zoom zoom_in_switch  js_tooltip" data-tooltip="缩小">还原</a>',
$("#js_toolbar_0").append(r);
var a=$("#js_ueditor"),o=Mask.show({
parent:$("#js_appmsg_editor .appmsg_editor"),
spin:!1
});
o.hide(),$("#js_zoomout").click(function(){
funcPvUvReport("fullscreen"),a.addClass("zoom_edit").css({
marginTop:-(a.outerHeight()/2),
marginLeft:-(a.outerWidth()/2)
}),o.show(),document.body.style.overflow=document.documentElement.style.overflow="hidden";
}),$("#js_zoomin,#js_finish_zoom,.jsClose").click(function(){
a.removeClass("zoom_edit").css({
marginTop:0,
marginLeft:0
}),o.hide(),document.body.style.overflow=document.documentElement.style.overflow="auto";
}),t.initZoomArea=!0;
}
new Tooltip({
dom:$(this.container).find(".js_tooltip"),
position:{
x:0,
y:5
}
});
});
},
_setOriginal:function(e){
var t=$("#js_original");
$(".js_original_type").hide().eq(e.copyright_type||0).show(),e.copyright_type?(t.find(".js_original_content").show(),
t.find(".js_original_publish").val(e.releasefirst),t.find(".js_reprint_frm").val(e.reprint_permit_type),
t.find(".js_url").text(e.source_url).closest("li")[e.source_url?"show":"hide"](),
t.find(".js_author").text(e.author),t.find(".js_platform").text(+e.releasefirst?"微信公众平台":e.platform),
$(".js_author",this.editor$).closest(".frm_control_group").eq(0).hide(),$(".js_url_area",this.editor$).hide(),
$(".js_reward",this.editor$).checkbox("disabled",!1),t.find(".js_frm").text(1==+e.reprint_permit_type?"允许转载":2==e.reprint_permit_type?"授权转载":"禁止转载"),
t.find(".js_classify").text(e.original_article_type),$("#js_pay",this.editor$).checkbox("disabled",1==e.reprint_permit_type),
1==e.reprint_permit_type?$(".js_pay_tips",this.editor$).text("（只有“禁止转载”的原创文章才可以设置付费阅读）").show():$(".js_pay_tips",this.editor$).text("（每月可群发10篇付费阅读文章）")):(t.find(".js_original_content").hide(),
$(".js_author",this.editor$).closest(".frm_control_group").eq(0).show(),$(".js_url_area",this.editor$).show(),
$(".js_reward",this.editor$).checkbox("disabled",!0),$(".js_reward_div",this.editor$).hide(),
$("#js_pay",this.editor$).checkbox("disabled",!0),$(".js_pay_tips",this.editor$).show().text("（只有“禁止转载”的原创文章才可以设置付费阅读）"),
$(".js_pay_setting",this.editor$).hide());
},
_setPay:function(e){
var t=this;
$("#js_pay",t.editor$).checkbox("checked",!!e.payforread_enabled),$(".js_pay_setting",t.editor$)[e.payforread_enabled?"show":"hide"]().find(".js_fee").text(e.fee?(e.fee/100).toFixed(2):""),
$(".js_pay_tips",t.editor$)[e.payforread_enabled?"hide":"show"](),t.freeUEditor.val(e.free_content||"").trigger("keydown");
},
_flush:function(){
var e=this;
e.nowitem$&&e._setData(e.nowitem$,e._getEditData());
},
_refreshUI:function(e){
var t=this,i=t._getItem$(e),r=t._getData(i);
t._flush(),t.nowitem$=i,function(){
e=t._getItemIdx(i);
var r,a=i.offset(),o=(t.editor$.offset(),10==type?580:390),s=i.outerHeight(),n=t.appmsg$.offset();
a&&(r=a.top-n.top),e>=t.maxNum/2?(t.editor$.find(".arrow").css({
marginTop:o-s
}),t.editor$.find(".appmsg_editor").css({
marginTop:r+s-o
})):(t.editor$.find(".arrow").css({
marginTop:0
}),t.editor$.find(".appmsg_editor").css({
marginTop:0==e?0:r
})),t.editor$.find(".appmsg_editor").append($("#js_editor_extra_info"));
}(),0==t.nowitem$.index()?($(".js_desc_area",t.editor$).show(),t.isFirst=!0):(10==type?$(".js_desc_area",t.editor$).hide():$(".js_desc_area",t.editor$).show(),
t.isFirst=!1),t._fillEditArea(r);
},
_setData:function(e,t){
var i=this,r=i._getItem$(e);
return r.data(dataID,t);
},
_getData:function(e){
var t=this,i=t._getItem$(e);
return i.data(dataID);
},
_getDatalist:function(){
this._flush();
for(var e=this,t=[],i=e.appmsg$.find(itemClassName),r=0;r<i.length;++r)t.push(e._getData(i[r]));
return t;
},
_validate:function(e){
return""==e.title?!1:""==e.content?!1:""==e.app_id?!1:!0;
},
_validateList:function(e){
for(var t=this,i=0;i<e.length;++i)if(!t._validate(e[i]))return _refreshUI(i),!1;
return!0;
},
_initData:function(e){
return e.file_id&&!e.cover&&(e.cover=wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(e.file_id))),
$.extend({
author:"",
file_id:"",
content:"",
content_url:"",
source_url:"",
digest:"",
title:""
},e);
},
_hideErrorTips:function(){
$(".js_title_error",this.editor$).hide(),$(".js_author_error",this.editor$).hide(),
$(".js_desc_error",this.editor$).hide(),$(".js_cover_error",this.editor$).hide(),
$(".js_url_error",this.editor$).hide(),$(".js_content_error",this.editor$).hide(),
$(".js_platform_error",this.editor$).hide();
},
add:function(e){
var t=this,i=(t._getDatalist().length,t.maxNum);
if(t._getDatalist().length>=i)return void Tips.err("你最多只可以加入%s条图文消息".sprintf(i));
var e=t._initData(e||{});
e.id=t.gid++,e.isMul=t.isMul,e.isFirst=t.isFirst,$(".js_appmsg_item").length>0&&(t.isFirst=!1);
var r=t.isFirst?_first_appmsg_html:_small_appmsg_html,a=$(T(r,e).trim()).appendTo(t.appmsg$);
t._setData(a,e),a.find(".js_edit").length>0&&a.find(".js_edit").trigger("click"),
1==t.isFirst&&(t.isFirst=!1);
},
remove:function(e){
var t=this,i=(t._getDatalist().length,t._getItem$(e)),r=t._getNextItem$(i);
i.remove(),r&&(t._refreshUI(r),t._hideErrorTips());
},
preview:function(){
var e=this,t=e._getDatalist();
return e._validateList(t)?void appmsgCgi.preview(t,fakeID,function(){}):!1;
},
auto_save:function(){
var e=this._getDatalist();
return this.draft.save(e);
},
get_draft:function(){
return this.draft.get();
},
_getItemDataAndValid:function(e,t){
var i=this,r={};
r["title"+t]=e.title,r["content"+t]=e.content,r["digest"+t]=e.digest,r["author"+t]=e.author,
r["fileid"+t]=e.file_id,r["music_id"+t]=e.music_id,r["video_id"+t]=e.video_id,r["show_cover_pic"+t]=e.show_cover_pic;
for(var a=/<iframe data-shortvideofileid="(\d+)"[^>]+><\/iframe>/g,o=[],s=null;s=a.exec(e.content);)o.push(s[1]);
if(r["shortvideofileid"+t]=o.join("|"),report_vid_type.length){
var n=r["content"+t].split("</iframe>").length-1;
r["vid_type"+t]=report_vid_type.join(",").substr(0,2*n-1),report_vid_type=report_vid_type.join(",").substr(2*n).split(",");
}
r["copyright_type"+t]=e.copyright_type,r["releasefirst"+t]=e.releasefirst,r["platform"+t]=e.platform,
r["can_reward"+t]=e.can_reward,r["reward_wording"+t]=e.reward_wording,r["reprint_permit_type"+t]=e.reprint_permit_type,
r["original_article_type"+t]=e.original_article_type,r["need_open_comment"+t]=e.need_open_comment,
r["payforread_enabled"+t]=e.payforread_enabled,r["free_content"+t]=e.free_content,
r["fee"+t]=e.fee;
var c=/:\/\//,d=10==type?e.source_url:e.content_url;
if(d&&!c.test(d)&&(d="http://"+d),11==type)r["contenturl"+t]=d;else{
r["sourceurl"+t]=d;
var l=iframeUrlSwitcher({
content:e.content,
returnValue:"voteid"
})[0],p=iframeUrlSwitcher({
content:e.content,
returnValue:"isMlt"
})[0],_=iframeUrlSwitcher({
content:e.content,
returnValue:"supervoteid"
});
l&&"undefined"!=typeof p&&(r["voteid"+t]=l,r["voteismlt"+t]=p||store.get("appmsg_vote_"+l)),
_&&(r["supervoteid"+t]=_[0]);
var m=this.getIframeData({
content:e.content,
key:"cardid",
ifrmName:"js_editor_card"
});
if(m){
var u=this.getIframeData({
content:e.content,
key:"num",
ifrmName:"js_editor_card"
});
r["cardid"+t]=m,r["cardquantity"+t]=u,r["cardlimit"+t]=0==u?0:1;
}
}
var f=!0,h=null,g="";
if(10==type&&$(i.ueditor.window.document).find(".js_catchremoteimageerror").length){
var v=$(i.ueditor.window.document).find(".js_catchremoteimageerror").length;
return Tips.err("保存失败，%s".sprintf("正文有%s张图片粘贴失败".sprintf(v))),setTimeout(function(){
$("html, body").animate({
scrollTop:$("#js_ueditor").offset().top-50
});
}),null;
}
if(validator.rangelength(e.title,[1,64])||($(".js_title_error",this.editor$).show(),
h=h||$(".js_title",this.editor$),g=g||"标题不能为空且长度不能超过64字",f=null),0!=e.copyright_type||validator.maxlength(e.author,8)||($(".js_author_error",this.editor$).show(),
h=h||$(".js_author",this.editor$),g=g||"作者不能超过8个字",f=null),e.file_id||(11==type||"1675779340"!=wx.data.uin&&"3080043700"!=wx.data.uin)&&($(".js_cover_error",this.editor$).show(),
h=h||$(".js_cover_error",this.editor$),g=g||"必须插入一张图片",f=null),10!=type||validator.rangelength(e.content,[1,1e7])||($(".js_content_error",this.editor$).html("正文总大小不得超过10M字节").show(),
h=h||$(".js_content_error",this.editor$),g=g||"正文总大小不得超过10M字节",f=null),10!=type||validator.rangelength(e.content.text(),[1,2e4])||($(".js_content_error",this.editor$).html("正文不能为空且长度不能超过20000字").show(),
h=h||$(".js_content_error",this.editor$),g="正文总大小不得超过10M字节"==g?"正文不能为空且长度不能超过20000字":g||"正文不能为空且长度不能超过20000字",
f=null),i.isMul||validator.rangelength(e.digest,[1,120])||($(".js_desc_error",this.editor$).text("%s长度不能超过%s字".sprintf(10==type?"摘要":"描述不能为空且",120)).show(),
h=h||$(".js_desc",this.editor$),g=g||"%s长度不能超过%s字".sprintf(10==type?"摘要":"描述不能为空且",120),
f=null),(11==type||0==e.copyright_type&&d)&&!validator.url(d)&&($(".js_url_error",this.editor$).text("链接不合法").show(),
h=h||$(".js_url",this.editor$),g=g||"链接不合法",f=null),1!=e.can_reward||validator.maxlength(e.reward_wording,15)||(g=g||"赞赏引导语不能超过15个字",
f=null),!f)return Tips.err("保存失败"+(g?"，"+g:"")),setTimeout(function(){
$("html, body").animate({
scrollTop:h.offset().top-100
});
}),null;
if(1==e.copyright_type&&e.content.text().replace(/\s/g,"").length<300)return Dialog.show({
type:"warn",
msg:"很抱歉，原创声明不成功|你的文章内容少于300字，未达到申请原创内容声明的字数要求。",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
}),null;
if(e.payforread_enabled){
if(!/\d+(\.\d+)?/.test(e.fee))return Tips.err("请输入正确的付费金额"),null;
if(""==e.free_content)return Tips.err("请输入免费区域内容"),null;
}
if(10==type){
var w=i.checkIframe(e);
if(!w)return null;
}
return i.checkCard(e)?r:null;
},
checkIframe:function(e,t){
var i=$($.parseHTML(e.content)).find("iframe"),r=0,a=0;
return $.each(i,function(e,t){
$(t).hasClass("video_iframe")&&r++,$(t).hasClass("js_editor_vote_card")&&a++;
}),r>3?(Tips.err("最多添加3个小视频、腾讯视频或微视频"),!1):a>1||t&&a>=1?(Tips.err("正文只能包含%s个投票".sprintf(1)),
!1):!0;
},
checkCard:function(e,t){
var i=$($.parseHTML(e.content)).find("iframe"),r=0,a=5;
return $.each(i,function(e,t){
$(t).hasClass("js_editor_card")&&r++;
}),r>a||t&&r>=a?(Tips.err("正文只能包含%s个卡券".sprintf(a)),!1):!0;
},
checkRemoteImage:function(e,t,i){
if(10!=type)return void i();
var r=this,a=r.ueditor.window.document,o=$(a).find(".js_catchingremoteimage"),s=o.length;
return 0==s?void i():void o.on("catchremotesuccess",function(e,a){
$(this).off("catchremotesuccess").off("catchremoteerror");
var o=a.source,n=a.type,c=r._getItemIdx(r.nowitem$),d="img"==n?$(this).attr("src"):$(this).css("background-image").replace(/^(url\()|(\))$/g,"");
d=d.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
var l=new RegExp("img"==n?'<img[^>]*?\\s+data-src="%s"[^>]*\\/?>'.sprintf(o):'<\\w([^>]*?)\\s+style="[^"]*?;?\\s*(background|background-image)\\s*\\:[^;]*?url\\([\'"]?%s[\'"]?\\)[^"]*?"([^>]*?)>'.sprintf(o)),p=t["content"+c].match(l);
p=p&&p[0]||"",p=p.replace(o,d).replace("js_catchingremoteimage",""),t["content"+c]=t["content"+c].replace(l,p),
0==--s&&i();
}).on("catchremoteerror",function(){
o.off("catchremotesuccess").off("catchremoteerror"),e.btn(!0);
});
},
getIframeData:function(e){
var t=e.key,i=e.content,r=(e.ifrmName,new RegExp("<iframe[^>]*?"+e.ifrmName+"[^>]*?data-"+t+"=('|\")(.*?)('|\").*?>","g"));
return r.test(i)?RegExp.$2:null;
},
getData:function(){
var e=this,t={},i=[],r=e._getDatalist();
t.AppMsgId=e.app_id,t.count=r.length;
for(var a=0;a<r.length;++a){
var o=r[a];
if(o=e._getItemDataAndValid(o,a),!o)return e._refreshUI(a),null;
$.extend(t,o);
}
return $(".js_vid").each(function(){
var e=$(this).attr("name");
e&&i.indexOf(e)<0&&i.push(e);
}),t.vid=i.length>0?i.join(","):"",t;
}
});
_Appmsg.formatData=_formatData,function(){
function appmsgSubmit(e,t,i){
t.btn(!1);
var r=Math.random();
.1>r&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:30,
level:"error",
content:"[file=media/appmsg_edit]"
}),appmsg.checkRemoteImage(t,e,function(){
.1>r&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:31,
level:"error",
content:"[file=media/appmsg_edit]"
}),mediaCgi.appmsg.save(!!cgiData.isMul,type,e,function(t){
Draft.clear(),Draft.isDropped=!0,i(type,t,e);
},function(e,i){
if(t.btn(!0),0!=e){
var r=1*e;
appmsg._refreshUI(r);
}
if("412"==i)return void Tips.err("图文中含非法外链");
if("15801"==i||"15802"==i||"15803"==i||"15804"==i||"15805"==i||"15806"==i)Dialog.show({
type:"warn",
msg:"图文消息中含有诱导分享内容|为保证用户体验，微信公众平台禁止发布各种诱导分享行为。你所编辑的图文消息可能涉及诱导分享内容。<br/>                            你可以继续保存和发布该图文消息，若发布后被举报并核实确有诱导分享行为，公众平台将根据规定进行处理。<br/>                            <a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3' target='_blank'>诱导分享违规行为说明</a>",
buttons:[{
text:"继续保存",
click:function(){
this.remove(),confirm=!0,t.trigger("click");
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});else{
if("1530506"==i)return void $(".js_profile_error").text("请勿添加其他公众号的主页链接").show();
if("1530513"==i)return void $(".js_profile_error").text("链接已失效，请在手机端重新复制链接").show();
}
});
});
}
function _send(e,t){
var i=appmsg.getData();
i&&(confirm&&(i.confirm=1,confirm=!1),e.btn(!1),!appmsg.isNew&&appmsg.isOriginal?Dialog.show({
title:"文章内容已变更",
msg:"该文章内容已变更是否继续申请原创?",
buttons:[{
text:"确定",
click:function(){
this.remove(),appmsgSubmit(i,e,t);
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
}):appmsgSubmit(i,e,t));
}
function appmsgPreview(){
var e=appmsg.getData();
if(e&&Ban(cgiData.func_ban_info,"preview")){
e.vid="";
for(var t=0,i=0;i<e.count;i++)if(e["copyright_type"+i]){
t=1;
break;
}
var r=null,a=null,o=[];
if(store.get(wx.data.uin+"previewAccounts"))try{
o=store.get(wx.data.uin+"previewAccounts").split("|");
}catch(s){
o=[];
}
var n=$(template.render("previewTpl",{
label:"请输入微信号，此图文消息将发送至该微信号预览。",
tips:1==t?"本文申请的原创声明还未经平台审核，故预览不会出现原创标识。":"",
value:appMsgPreviewName,
accounts:o
})).popup({
title:"发送预览",
className:"simple label_block",
onOK:function(){
var t=this,i=t.get(),s=i.find(".frm_input"),n=s.val().trim();
if(e.preusername=n,0==n.length)return $(".jsAccountFail").text("请输入预览的账号").show(),
!0;
if(null!=r&&r.getCode().trim().length<=0)return Tips.err("请输入验证码"),r.focus(),!0;
var c=i.find(".btn_primary").btn(!1);
return e.imgcode=r&&r.getCode().trim(),confirm&&(e.confirm=1,confirm=!1),mediaCgi.appmsg.preview(!!cgiData.isMul,type,e,function(i){
appmsg.app_id=i.appMsgId,t.hide(),setTimeout(function(){
c.btn(!0);
},500);
var r=[];
o.each(function(t){
t!=e.preusername&&r.push(t);
}),o=r,o.length<3?o.push(e.preusername):(o.shift(),o[2]=e.preusername),store.set(wx.data.uin+"previewAccounts",o.join("|"));
},function(e){
if($(".jsAccountFail").html(e.word).show(),c.btn(!0),s.focus(),e){
if(!e||"-6"!=e.ret&&"-8"!=e.ret||(a=i.find(".js_verifycode"),r=a.html("").removeClass("dn").verifycode().data("verifycode"),
r.focus()),e&&e.antispam){
var o=1*e.msg;
appmsg._refreshUI(o);
}
return"412"==e.ret?void $(".jsAccountFail").text("图文中含非法外链").show():void(("15801"==e.ret||"15802"==e.ret||"15803"==e.ret||"15804"==e.ret||"15805"==e.ret||"15806"==e.ret)&&(t.hide(),
Dialog.show({
type:"warn",
msg:"图文消息中含有诱导分享内容|为保证用户体验，微信公众平台禁止发布各种诱导分享行为。你所编辑的图文消息可能涉及诱导分享内容。<br/>                                你可以继续保存和发布该图文消息，若发布后被举报并核实确有诱导分享行为，公众平台将根据规定进行处理。<br/>                                <a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3' target='_blank'>诱导分享违规行为说明</a>",
buttons:[{
text:"继续发送",
click:function(){
this.remove(),confirm=!0,c.trigger("click");
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove(),t.show();
}
}]
})));
}
}),!0;
}
});
$(".jsAccount").click(function(){
$(this).hasClass("selected")?($(this).removeClass("selected"),$(".jsAccountInput").val("")):($(this).addClass("selected"),
$(".jsAccountInput").val($(this).data("value")));
}),$(".jsAccountInput").keyup(function(e){
$(".jsAccountFail").hide(),$(".jsAccount").removeClass("selected");
var t="which"in e?e.which:e.keyCode;
13==t&&$(this).parents(".dialog").find("button:eq(0)").trigger("click");
}).placeholder(),$(".jsAccountDel").click(function(){
var e=$(this).data("index");
return o.length>e&&o.splice(e,1),$(this).parent().remove(),store.set(wx.data.uin+"previewAccounts",o.join("|")),
!1;
}),$(".frm_input",n).focus(),o.length>0&&$(".jsAccount:last").click();
}
}
function insertQQMusic(e){
console.log("insertQQMusic"),console.log(getMusicIframe(e)),window.insertMusic(getMusicIframe(e),"insertmusic");
}
function _makeMusicTmpl(e){
var t="";
return e&&e.music_name&&e.singer&&(t+="<html>",t+="    <head>",t+="    <meta charset=UTF-8>",
t+="    <link rel=stylesheet href=/htmledition/style/widgets/pages/music.css?"+Math.random()+">",
t+="    <title></title>",t+="    </head>",t+="    <body>",t+="    <div class=qqmusic_wrp>",
t+="    <i class=icon_qqmusic_switch></i>",t+="    <div class=qqmusic_content>",
t+="    <strong class=qqmusic_title>"+e.music_name+"</strong>",t+="    <p class=qqmusic_desc>"+e.singer+"</p>",
t+="    </div>",t+="    </div></body></html>"),t;
}
function getMusicIframe(e){
var t=e&&e.musicid,i=e.mid,r=e&&e.url,a=e&&e.songname,o=e&&e.albumurl,s=e&&e.singername,n=e&&e.play_length,c=e&&e.commentid,d="/cgi-bin/readtemplate?t=tmpl/qqmusic_tmpl&singer="+encodeURIComponent(s)+"&music_name="+encodeURIComponent(a);
return['<iframe class="res_iframe qqmusic_iframe js_editor_qqmusic" ',' musicid="'+t+'"',' mid="'+i+'"',' albumurl="'+o+'"',' audiourl="'+r+'"',' music_name="'+a+'"',' commentid="'+c+'"',' singer="'+s+'" ',' play_length="'+n+'" ',' src="'+d,'"></iframe>'].join("");
}
function insertCard(e,t){
window.insertCard(getCardIframe(e,t));
}
function getCardIframe(e,t){
return['<iframe class="res_iframe card_iframe js_editor_card" ','data-cardid="%s" data-num="%s" '.sprintf(e.id,t),'src="/cgi-bin/readtemplate?t=cardticket/card_preview_tmpl&logo_url=%s&brand_name=%s&title=%s&color=%s&lang=zh_CN"'.sprintf(encodeURIComponent(e.logo_url),encodeURIComponent(e.brand_name),encodeURIComponent(e.title),encodeURIComponent(e.color)),' data-src="http://mp.weixin.qq.com/bizmall/appmsgcard?action=show&biz=%s&cardid=%s&wechat_card_js=1#wechat_redirect" '.sprintf(cgiData.biz_uin,e.id),"></iframe>"].join("");
}
var editor_selector="#js_appmsg_editor",appmsg_selector="#js_appmsg_preview",appmsg=new _Appmsg({
app_id:app_id,
editor_selector:editor_selector,
appmsg_selector:appmsg_selector,
isMul:!!cgiData.isMul,
appmsg_data:appmsg_data
});
$("#js_cancle").click(function(){
return Draft.clear(),Draft.isDropped=!0,funcPvUvReport("cacelcache"),window.location.reload(),
!1;
});
var confirm=!1;
$("#js_submit").click(function(){
_send($(this),function(e){
var t=10==e?"media/appmsg_list2":"media/appmsg_list",i=10==e?"list_"+wx.cgiData.fromview:"list";
location.href=wx.url("/cgi-bin/appmsg?begin=0&count=10&t=%s&type=%s&action=%s".sprintf(t,e,i));
});
}),$("#js_send").click(function(){
_send($(this),function(e,t){
location.href=wx.url("/cgi-bin/masssendpage?t=mass/send&type=10&appmsgid=%s".sprintf(t.appMsgId));
});
});
var appMsgPreviewName=store.get("appMsgPreviewName"),VerifyCode=require("common/wx/verifycode.js");
$("#js_preview").click(function(){
var e=$(this);
_send(e,function(){
e.btn(!0),Tips.remove(),appmsgPreview();
});
}),window.openVotePopup=function(){
function renderList(begin){
$.ajax({
url:wx.url("/cgi-bin/newoperatevote?action=list&vote_status=1&f=json&count=6&begin="+begin),
type:"get",
dataType:"json",
success:function(data){
if(data.data){
for(var voteData=eval("("+data.data+")"),iframeH=0,i=0;i<voteData.super_vote_info.length;i++)voteData.super_vote_info[i].height=150*voteData.super_vote_info[i].vote_id_list.vote_id.length,
voteData.super_vote_info[i].title=voteData.super_vote_info[i].title.html(!1);
$(".js_vote_list").html(compile_html({
loading:!1,
data:voteData,
iframeH:iframeH,
biz:data.bizuin,
token:wx.data.param
})),$(".js_select").checkbox({
multi:!1
});
var total_count=voteData.total_count,count=6,showpage=begin/count+1,pagebar=new Pagebar({
container:".js_pager",
perPage:count,
first:!1,
last:!1,
isSimple:!0,
initShowPage:showpage,
totalItemsNum:total_count,
callback:function(e){
var t=e.currentPage;
if(t!=showpage)return t--,renderList(t*count),!1;
}
});
}else $(".js_vote_list").html(compile_html({
loading:!1,
data:{
super_vote_info:[]
}
}));
},
error:function(){}
});
}
var currentMsgContent=appmsg._getEditData();
if(!appmsg.checkIframe(currentMsgContent,!0))return null;
document.body.style.overflow=document.documentElement.style.overflow="hidden";
var pop=$("<div class='' id='js_vote_menu'> <div class='title_tab'> <ul class='tab_navs title_tab' data-index='0'> <li data-index='0' class='tab_nav first selected'><a href='#none' id='js_new_vote'>新投票</a></li> <li data-index='1' class='tab_nav'><a href='#none' id='js_vote_list'>已有投票</a></li> </ul> </div> <div class='new_vote js_new_vote'>'+_vote_pop_html+'</div> <div class='vote_list js_vote_list' style='display:none'></div> </div>").popup({
title:"发起投票",
className:"vote_edit tc_dialog dialog_normal_form",
buttons:[{
text:"确定",
click:function(){},
type:"primary"
}],
close:function(){
this.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto";
}
}),vote=require("vote/new.js");
vote.initPage(),vote.eventBind();
var _vote_list_tpl=require("tpl/vote/vote_table.html.js"),compile_html=template.compile(_vote_list_tpl);
$(".js_vote_list").html(compile_html({
loading:!0
})),$("#js_new_vote").click(function(){
$(".js_new_vote").show(),$("#js_new_vote").parent().addClass("selected"),$(".js_vote_list").hide(),
$("#js_vote_list").parent().removeClass("selected");
}),$("#js_vote_list").click(function(){
$(".js_new_vote").hide(),$("#js_new_vote").parent().removeClass("selected"),$(".js_vote_list").show(),
$("#js_vote_list").parent().addClass("selected");
}),renderList(0),$(".vote_edit button").click(function(){
var iframeH=0,saveBtn=pop.find(":button").last();
saveBtn.removeClass("btn_loading");
var supervoteid=0,biz=0;
if("none"==$(".js_vote_list").css("display")){
var data=vote.getFullData();
if(data){
var tempData=eval("("+data+")"),optionL=0;
iframeH+=70*tempData.vote_subject.length;
for(var i=0;i<tempData.vote_subject.length;i++)optionL+=tempData.vote_subject[i].options.length;
iframeH+=30*optionL,saveBtn.btn(!1),Cgi.post({
url:wx.url("/cgi-bin/newoperatevote?action=create"),
dataType:"json",
data:{
action:"create",
json:data
},
mask:!1
},function(e){
0==e.base_resp.ret?(Tips.suc("操作成功"),supervoteid=e.super_vote_id,biz=e.bizuin,window.insertVoteIframe(['<iframe scrolling="no" frameborder="0" class="vote_iframe js_editor_vote_card" style="height:0px;" ','src="',wx.url("/cgi-bin/readtemplate?t=vote/vote-new_tmpl&__biz="+biz+"&supervoteid=%s".sprintf(supervoteid)),'"','data-src="',"/mp/newappmsgvote?action=show&__biz=",biz,"&supervoteid=%s#wechat_redirect".sprintf(supervoteid),'"','data-supervoteid="%s"'.sprintf(supervoteid)," allowfullscreen >","</iframe>"]),
setIframeHeight(),pop.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto",
$(".mask").hide()):(Tips.err(e.base_resp.err_msg),saveBtn.btn(!0));
});
}
}else saveBtn.btn(!1),1==$(".js_select:checked").length?(supervoteid=$(".js_select:checked").val(),
biz=$(".js_select:checked").data("biz"),iframeH=$(".js_select:checked").data("height"),
window.insertVoteIframe(['<iframe scrolling="no" frameborder="0" class="vote_iframe js_editor_vote_card" style="height:0px;" ','src="',wx.url("/cgi-bin/readtemplate?t=vote/vote-new_tmpl&__biz="+biz+"&supervoteid=%s".sprintf(supervoteid)),'"','data-src="',"/mp/newappmsgvote?action=show&__biz=",biz,"&supervoteid=%s#wechat_redirect".sprintf(supervoteid),'"','data-supervoteid="%s"'.sprintf(supervoteid)," allowfullscreen >","</iframe>"]),
setIframeHeight(),pop.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto",
saveBtn.btn(!0),$(".mask").hide()):(Tips.err("请选择投票"),saveBtn.btn(!0));
});
};
var SendCard=require("cardticket/send_card.js"),Cgi=require("common/wx/Cgi.js"),parser=require("cardticket/parse_data.js"),card_data=!1;
cgiData.cardid&&Cgi.get({
url:"/merchant/electroniccardmgr?action=get&card_id=%s".sprintf(cgiData.cardid)
},function(e){
0==e.base_resp.ret&&(card_data=$.parseJSON(e.card_detail),card_data=parser.parse_cardticket(card_data),
window.initCard());
}),window.initCard=function(){
if(cgiData.ueditorReady&&card_data){
cgiData.ueditorReady=!0;
var e=appmsg._getEditData(),t=e.content,i=/<iframe class=\"res_iframe card_iframe js_editor_card\".*?><\/iframe>/gi;
i.test(t)?(t=t.replace(i,getCardIframe(card_data,cgiData.cardnum)),appmsg.ueditor.setContent(t)):insertCard(card_data,cgiData.cardnum);
}
},window.openCardSelect=function(){
var e=appmsg._getEditData();
if(appmsg.checkCard(e,!0)){
var t=new SendCard({
multi:!1,
param:{
need_member_card:1
},
selectComplete:insertCard,
source:"嵌入图文消息素材"
});
t.show();
}
},window.openMusicPopup=function(){
function e(e){
t(e);
}
function t(e){
e.find("#searchDiv").show(),e.find("#keyInput").keydown(function(t){
var i="which"in t?t.which:t.keyCode;
13==i&&e.find("#searchBt").trigger("click");
}),e.find("#searchCloseBt").click(function(){
e.find("#keyInput").val("");
}),e.find("#searchBt").click(function(){
var t=e.find("#keyInput").val();
t.length>0?r({
keyword:encodeURIComponent(t),
perpage:10,
currentpage:1
}):alert("请输入搜索条件");
}),e.find("#reload").click(function(){
e.find("#searchCloseBt").trigger("click");
});
}
function i(e){
{
var t=d.find("#keyInput").val(),i=e&&e.currentpage,a=e&&e.perpage,o=e&&e.totalnum;
new PageBar({
container:"#js_pagebar",
perPage:a,
initShowPage:i,
totalItemsNum:o,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var o=e.currentPage;
o!=i&&(i=o,r({
keyword:t,
perpage:a,
currentpage:i
}));
}
});
}
}
function r(e){
var t=document.head||document.getElementsByTagName("head")[0]||document.documentElement,i=document.createElement("script"),r=["https://auth-external.music.qq.com/open/fcgi-bin/fcg_weixin_music_search.fcg?remoteplace=txt.weixin.officialaccount&w=",e.keyword,"&platform=weixin&jsonCallback=MusicJsonCallback&perpage=",e.perpage,"&curpage=",e.currentpage].join("");
console.log("src="+r),i.type="text/javascript",i.src=r,t.appendChild(i);
}
function a(e){
var t=$.extend({},e);
return t&&t.list&&$.each(t.list,function(e,t){
var i=t.f.split("|"),r=i[7]||0,a=i[12]||0,n=i[0],c=i[i.length-1],d=i[i.length-3],l="/"+c.charAt(c.length-2)+"/"+c.charAt(c.length-1)+"/"+c+".jpg";
$.extend(t,{
songtime:o(r),
songsize:s(a),
songid:n,
mid:d,
albumurl:l,
play_length:1e3*r
});
}),console.log("formatJsonData"),console.log(t),t;
}
function o(e){
var t="";
if(60>e)t="00:"+(10>e?"0":"")+e;else{
var i=Math.floor(e/60),r=e-60*i;
t=(10>i?"0":"")+i+":"+(10>r?"0":"")+r;
}
return t;
}
function s(e){
var t="";
return t=e>1048576?parseInt(e/1048576)+"M":"1M";
}
function n(){
d.find(".qqmusic_audioplay").each(function(){
var e=$(this),t=e.attr("audioid"),i=e.attr("audiourl"),r={
selector:"#url_"+t,
qqmusicurl:i,
id:t,
qqmusictpl:!0
};
console.log("initMusicfile"),console.log(r);
new Audio(r);
}),d.find(".frm_radio").checkbox({
multi:!1,
onChanged:function(e){
console.log(e),c.musicid=e.val(),c.songname=d.find("#songname_"+c.musicid).html(),
c.singername=d.find("#singername_"+c.musicid).html(),c.url=d.find("#url_"+c.musicid).attr("audiourl"),
c.mid=d.find("#url_"+c.musicid).attr("mid"),c.albumurl=d.find("#url_"+c.musicid).attr("albumurl"),
c.play_length=d.find("#url_"+c.musicid).attr("play_length");
}
});
}
var c={},d=$("#audioPop").popup({
title:"添加音乐",
className:"align_edge qqmusic_dialog",
width:"960",
buttons:[{
text:"确定",
type:"primary",
click:function(){
console.log("selected music "+c.mid);
var e=this;
console.log(wx.url("/cgi-bin/registertopic?id="+c.musicid+"&type=1&src=1")),"undefined"!=typeof c.musicid?$.ajax({
url:wx.url("/cgi-bin/registertopic?id="+c.musicid+"&type=1&src=1"),
type:"post",
dataType:"json",
success:function(t){
console.log("success"),console.log(t),t&&"0"==t.base_resp.ret&&"undefined"!=typeof t.topic_id?(c.commentid=t.topic_id,
insertQQMusic(c),console.log(c),c={},e.remove()):alert("系统繁忙，请稍后再试");
}
}):alert("请选择要插入的音乐");
}
},{
text:"取消",
click:function(){
c={},this.remove();
}
}],
close:function(){
c={},this.remove();
}
});
e(d),window.MusicJsonCallback=function(e){
var t=_audio_appmsg_html;
a(e),d.find("#dialog_audio_container").html(T(t,e)),n(),i({
totalnum:e.totalnum,
perpage:e.perpage,
currentpage:e.curpage
});
};
};
}(),window.openLink=function(){
$("#linkPop").show(),$("#mask").show(),LinkPop.init();
};
var LinkPop=function(){
function e(t,r,a,s){
o.post({
url:"/cgi-bin/appmsg",
data:{
action:"list_ex",
begin:t,
count:p,
query:a,
type:9
}
},function(t){
"0"==t.base_resp.ret?(i(t.app_msg_list),s&&($("#pageBar").html(""),new n({
container:"#pageBar",
perPage:p,
totalItemsNum:t.app_msg_cnt,
isSimple:!0,
callback:function(t){
e((t.currentPage-1)*p,p,$("#keyInput").val().trim(),!1);
}
}))):Tips.err();
});
}
function t(){
_=!0,c=$("#linkForm").validate({
rules:{
title:{
required:!0
},
href:{
required:!0,
url:!0
}
},
messages:{
title:{
required:"文章标题不能为空"
},
href:{
required:"链接地址不能为空",
url:"链接地址不合法(必须以http://或https://开头)"
}
}
}),$("#keyInput").keydown(function(e){
var t="which"in e?e.which:e.keyCode;
13==t&&$("#searchBt").trigger("click");
}),$("#searchCloseBt").click(function(){
$("#keyInput").val(""),e(0,p,"",!0);
}),$("#searchBt").click(function(){
e(0,p,$("#keyInput").val().trim(),!0);
}),$(".jsLinkClose").click(function(){
$("#linkPop").hide(),$("#mask").hide(),$("#txtHref").val("http://"),$("#txtTitle").val(""),
$("#keyInput").val(""),$("#linkList").html(""),"1"==can_use_hyperlink?($("#hrefDiv").show(),
$("#linkChoose").hide(),$("#linkArrow").find(".arrow").setClass("arrow down")):($("#hrefDiv").hide(),
$("#linkChoose").show(),$("#linkArrow").find(".arrow").setClass("arrow up"));
}),$("#linkArrow").click(function(){
$(this).find(".arrow").hasClass("down")?($(this).find(".arrow").setClass("arrow up"),
$("#linkChoose").show(),$("#linkPop").center()):($(this).find(".arrow").setClass("arrow down"),
$("#linkChoose").hide(),$("#linkPop").center());
}),$("#linkOk").click(function(){
if(c.form()){
var e={
href:$("#txtHref").val().replace(/^\s+|\s+$/g,""),
target:"_blank",
data_ue_src:$("#txtHref").val().replace(/^\s+|\s+$/g,"")
};
m&&(e.textValue=$("#txtTitle").val().replace(/^\s+|\s+$/g,"")),_ueditor.execCommand("link",e),
$(".jsLinkClose").trigger("click");
}
});
}
function i(e){
var t=[];
e.each(function(e){
t.push({
title:e.title,
time:s.unix(e.update_time).format("YYYY-MM-DD"),
href:e.link.replace("#rd","&scene=21#wechat_redirect"),
aid:e.aid
});
}),t.length>0?($("#linkList").html(template.render("tplMsg",{
data:t
})),$("#linkPop").center(),$("input[type=radio]").checkbox({
onChanged:function(e){
1==m&&$("#txtTitle").val($(e).data("title")),$("#txtHref").val($(e).data("href")),
c.form();
}
})):$("#linkList").html('<li class="empty_tips">暂无数据</li>');
}
function r(){
d=_ueditor.selection.getRange(),l=d.collapsed?_ueditor.queryCommandValue("link"):_ueditor.selection.getStart(),
l?(UE.dom.domUtils.findParentByTagName(l,"a",!0)&&(l=UE.dom.domUtils.findParentByTagName(l,"a",!0)),
$("#txtTitle").val(l.text||"你已选中了添加链接的文本内容").attr("disabled",!0).parent().addClass("disabled"),
$("#txtHref").val(l.href||"http://"),m=!1):($("#txtTitle").attr("disabled",!1).parent().removeClass("disabled"),
m=!0);
}
function a(){
r(),e(0,p,"",!0),0==_&&t(),"1"==can_use_hyperlink?($("#hrefDiv").show(),$("#linkChoose").hide(),
$("#linkArrow").find(".arrow").setClass("arrow down"),$("#linkPop").center()):($("#hrefDiv").hide(),
$("#linkChoose").show(),$("#linkArrow").find(".arrow").setClass("arrow up"),$("#linkPop").center());
}
var o=require("common/wx/Cgi.js"),s=require("biz_common/moment.js"),n=require("common/wx/pagebar.js");
require("biz_common/jquery.validate.js");
var c,d,l,p=5,_=!1,m=!1;
return{
init:a
};
}();
});