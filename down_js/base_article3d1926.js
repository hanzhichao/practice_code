define("media/base_article.js",["common/wx/mpEditor/utils.js","media/common.js","biz_common/jquery.validate.js","common/wx/Tips.js","common/wx/mpEditor/plugin/remoteimg.js","common/wx/mpEditor/common/base_class.js","media/article_data_key.js","common/wx/mpEditor/text_editor.js","tpl/media/appmsg_edit/article_list_item.html.js"],function(e){
"use strict";
var i=e("common/wx/mpEditor/utils.js"),t=(e("media/common.js"),e("biz_common/jquery.validate.js")),s=(e("common/wx/Tips.js"),
e("common/wx/mpEditor/plugin/remoteimg.js")),r=t.rules,n=e("common/wx/mpEditor/common/base_class.js"),a=e("media/article_data_key.js"),o=e("common/wx/mpEditor/text_editor.js"),d=e("tpl/media/appmsg_edit/article_list_item.html.js"),_=["一","二","三","四","五","六","七","八","九","十"],c={
submitKey:a.getSubmitKey()
},l=n.inherit({
init:function(e){
this._o={
isNew:!0,
app_id:"",
$infoContainer:null,
$articleList:null,
data:null,
index:0,
ueditor:null,
$freeUEditor:null,
$navigator:null,
cgiData:null
},this._o=this.extend(this._o,e),this.initG(),this.data=this.initData(),this.initDigest(),
this.renderArticleItem();
},
initTextEditorEnv:function(){
o.initEnv({
$dom:$("#guide_words_main")
});
},
initG:function(){
this._g={
undoHistory:null,
$item:null,
isAutoDigest:!0,
scrollTop:this._o.$navigator.offset().top,
maxDigest:120
};
},
initData:function(){
var e=this._o.data,i=this._o.index,t=this._o.cgiData,s={};
return s=$.extend(a.getLocalKey(i),e),s.only_fans_can_comment=1*s.only_fans_can_comment,
s.file_id=1*s.file_id===0?"":s.file_id+"",t&&0==t.can_use_comment&&(s.need_open_comment=0),
0==s.need_open_comment&&(s.only_fans_can_comment=0),s.title_tips="第%s篇图文".sprintf(_[i]),
s.cdn_url_back||(s.cdn_url_back=s.cdn_url),s.cdn_url?s.cover=s.cdn_url=s.cdn_url.nogif():s.file_id&&(t&&t.appmsg_data.multi_item&&$.each(t.appmsg_data.multi_item,function(e,i){
i.file_id==s.file_id&&(s.cover=i.cover);
}),s.cover||(s.cover=wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(s.file_id)))),
s.source_url_checked=s.source_url?1:0,s=this._o.ueditor.initPluginData(s),{
set:function(e,i){
"undefined"!=typeof s[e]&&(s[e]=i);
},
get:function(e){
return s[e];
},
getData:function(){
return s;
},
setData:function(e){
s=e;
}
};
},
renderArticleItem:function(){
var e=$.parseHTML(wx.T(d,this.data.getData()))[0],i=$(e).appendTo(this._o.$articleList);
this._g.$item=i,i.data("article",this),this.changeMoveBtnCss();
},
getListItem:function(){
return this._g.$item;
},
initDigest:function(){
var e=this.data,i=e.get("digest"),t=(e.get("content"),this._o),s=this._g;
return!t.app_id||t.isNew?void(s.isAutoDigest=!0):this.getDigestFromContent()==i?void(s.isAutoDigest=!0):void(s.isAutoDigest=!1);
},
getDigestFromContent:function(){
return"";
},
setAutoDigest:function(e){
this._g.isAutoDigest=!!e;
},
setDigest:function(){
var e=this.data,i=$.trim(e.get("digest"));
this._g.isAutoDigest&&!i?e.set("digest",this.getDigestFromContent()):e.set("digest",i);
},
updateIndex:function(e){
this.data.set("seq",e),this.data.set("msg_index",e),this.data.set("isFirst",0==e),
this.data.set("title_tips","第%s篇图文".sprintf(_[e])),this.changeCoverPreviewCss(),
this.changeArticleItemCss();
},
changeArticleItemCss:function(){
this.data.get("isFirst")?this._g.$item.removeClass("sub_card_media"):this._g.$item.addClass("sub_card_media"),
this.data.get("cover")?this._g.$item.addClass("has_thumb"):this._g.$item.removeClass("has_thumb"),
this.changeMoveBtnCss();
},
changeMoveBtnCss:function(){
var e=this._g.$item.find(".js_down"),i=this._g.$item.find(".js_up"),t=this._g.$item.find(".js_del");
this.data.get("isFirst")?(i.hide(),e.show(),t.hide()):(i.show(),e.show(),t.show()),
this._g.$item.is(":last-child")&&e.hide();
},
getIndex:function(){
return 1*this.data.get("seq");
},
showErrMsg:function(e,i){
this._o.ueditor.fireEvent("showErrMsg",e,i);
},
scrollIntoView:function(e,i){
this._o.ueditor.fireEvent("scrollIntoView",e,i);
},
hideAllErrMsg:function(){
this._o.ueditor.fireEvent("hideAllErrMsg");
},
setHistory:function(e){
this._g.undoHistory=e;
},
getHistory:function(){
return this._g.undoHistory;
},
renderOriginal:function(){
var e=this,i=e.data.getData(),t=e._o.$infoContainer,s=$("#js_original");
if(s.find(".js_original_type").hide().eq(i.copyright_type||0).show(),i.copyright_type){
if(s.find(".js_original_content").show(),s.find(".js_original_publish").val(i.releasefirst),
s.find(".js_reprint_frm").val(i.reprint_permit_type),s.find(".js_url").text(i.source_url).closest("li")[i.source_url?"show":"hide"](),
s.find(".js_author").text(i.author),s.find(".js_platform").text(+i.releasefirst?"微信公众平台":i.platform),
s.find(".js_classify").text(i.original_article_type),t.find(".js_author").closest(".appmsg_edit_item").eq(0).hide(),
t.find(".js_reward").checkbox("disabled",!1),"object"!=typeof i.ori_white_list)try{
i.ori_white_list=$.parseJSON(i.ori_white_list.html(!1)).white_list;
}catch(r){
i.ori_white_list=[];
}
$.each(i.ori_white_list,function(e,t){
t.title=[],1!=i.reprint_permit_type&&t.title.push("可转载"),1*t.can_modify&&t.title.push("可修改文章"),
1*t.can_hide_source&&t.title.push("可不显示转载来源"),t.title=t.title.join("、");
});
var n=template.render("tpl_whitelist",{
list:i.ori_white_list
});
s.find(".js_whitelist").html(n);
}else s.find(".js_original_content").hide(),t.find(".js_author").closest(".appmsg_edit_item").eq(0).show(),
t.find(".js_reward").checkbox("disabled",!0),t.find(".js_reward_div.js_reward_ios_wrap").hide();
},
handlePay:function(){},
renderPay:function(){},
renderAd:function(){
var e=this,i=e.data.getData(),t=e._o.$infoContainer;
if(i.ad_info&&i.ad_info.ad_id){
$("#js_editor_insertad").addClass("disabled"),t.find(".js_ad_preview").empty(),t.find(".js_ad_preview").parent().show(),
i.ad_info.video_info&&(i.ad_info.ad_img=i.ad_info.video_info.thumbUrl);
var s=template.render("js_ad_preview_tpl",{
ad_id:i.ad_info.ad_id,
ad_img:i.ad_info.ad_img,
img:i.ad_info.img,
nick_name:i.ad_info.nick_name,
pt:i.ad_info.pt
});
t.find(".js_ad_preview").html(s),t.find(".js_tag").text(0==i.ad_info.trade_mode?"广告推荐":"内容定制");
}else $("#js_editor_insertad").removeClass("disabled"),t.find(".js_ad_preview").empty(),
t.find(".js_ad_preview").parent().hide();
},
hideErrorTips:function(){
var e=this._o.$infoContainer;
e.find(".js_title_error,.js_author_error,.js_desc_error,.js_tip_mask_msg,.js_cover_error,.js_url_error,.js_content_error,.js_platform_error,.js_ad_error_tips,.js_reward_money_error").hide(),
e.find(".js_tip_mask").removeClass("error_mask");
},
flushGuidWords:function(){
var e=o.getEditor(),i=e.getContent();
this.data.set("guide_words",i||"");
},
flushPay:function(){},
flushField:function(){
var e=this.data,i=this._o.$infoContainer;
i.find(".js_field").each(function(){
var i=$(this),t=i.attr("name"),s=i.attr("type");
"checkbox"==s?e.set(t,i.checkbox("value")?1:0):"checkbox"==i.data("type")?e.set(t,1*i.val()?1:0):"guide_words"==t?e.set(t,i.val()):e.set(t,$.trim(i.val()));
});
},
flushCommon:function(){
var e=this.data,i=this._o.$infoContainer,t=this._o.cgiData;
i.find('.js_desc[name="digest"]').val(e.get("digest")),e.set("source_url",e.get("source_url_checked")?e.get("source_url"):"");
var s=e.get("source_url");
s&&!/:\/\//.test(s)&&e.set("source_url","http://"+s),0==i.find(".js_reward_ios:checked").val()&&e.set("reward_money",0);
var r=i.find("#js_original");
if(e.set("copyright_type",$(".js_original_type:visible").index()),e.set("copyright_type",e.get("copyright_type")<0?0:e.get("copyright_type")),
e.get("copyright_type")){
e.set("releasefirst",r.find(".js_original_publish").val()),e.set("author",r.find(".js_author").text()),
e.set("platform",+e.get("releasefirst")?"":r.find(".js_platform").text()),e.set("reprint_permit_type",r.find(".js_reprint_frm").val()),
e.set("original_article_type",r.find(".js_classify").text());
var n=[];
r.find(".js_whitelist").children().each(function(){
n.push({
nickname:$.trim($(this).text()),
openid:$(this).attr("data-openid"),
can_modify:$(this).attr("data-can_modify"),
can_hide_source:$(this).attr("data-can_hide_source")
});
}),e.set("ori_white_list",JSON.stringify2({
white_list:n
}));
}
var a=$(".js_ad_msg");
if(e.set("ad_info",{
ad_id:a.data("ad_id")||"",
ad_img:a.data("ad_img")||"",
img:a.data("img")||"",
nick_name:a.data("nick_name")||"",
pt:a.data("pt")||"",
trade_mode:a.data("trade_mode")||""
}),0==e.get("need_open_comment")?e.set("only_fans_can_comment",0):e.set("only_fans_can_comment",1*$(".js_comment_setting:checked").val()||0),
1==t.can_use_hyperlink){
var o=e.get("content").match(/<a([^>]*)>(.*?)<\/a>/g);
o&&e.set("link_count",o.length);
}
var d=e.get("cdn_url"),_=e.get("file_id");
if(d)d=d.nogif(),e.set("cdn_url",d),e.set("cover",d);else if(_){
var c,t=this._o.cgiData;
t&&t.appmsg_data&&t.appmsg_data.multi_item&&$.each(t.appmsg_data.multi_item,function(e,i){
i.file_id==_&&(c=i.cover);
}),c||(c=wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(_))),
e.set("cover",c);
}else e.set("cover","");
e.set("isFirst",0==this.getListItem().index()),this.setScrollTop(),this.setHistory(this._o.ueditor.getHistory());
},
setScrollTop:function(){
this._g.scrollTop=Math.max($(window).scrollTop(),this._o.$navigator.offset().top);
},
getScrollTop:function(){
return this._g.scrollTop;
},
flush:function(){
return this;
},
getData:function(e,i){
var t=this,s=t.data.getData(),r={},n=c.submitKey;
$.each(n,function(e,i){
switch(i){
case"fileid":
r.fileid=s.file_id;
break;

case"sourceurl":
r.sourceurl=s.source_url;
break;

case"cdn_url":
r.cdn_url=(s.cdn_url||"").https2http().nogif();
break;

case"cover":
break;

case"ad_info":
r.ad_id=s.ad_info&&s.ad_info.ad_id||"";
break;

case"share_imageinfo":
r.share_imageinfo=JSON.stringify2({
list:s.share_imageinfo
});
break;

default:
r[i]=s[i];
}
});
var a=e?i?t.validateStrictly(r):t.validate(r):$.extend(!0,{},s);
return!!a&&(a.cover=void 0),a;
},
isCurrentArticle:function(){
var e=this._o.ueditor.fireEvent("get_current_article");
return e&&e.data("article")===this?!0:!1;
},
removeCover:function(){
if(this.isCurrentArticle()){
var e=this._o.$infoContainer.find(".js_cover");
e.hide().find("input").val(""),e.find(".js_show_cover_pic").val("0"),this._g.$item.find("div.js_appmsg_thumb").css("backgroundImage",'url("")'),
this._g.$item.removeClass("has_thumb");
}
this.data.set("file_id",""),this.data.set("cdn_url",""),this.data.set("cdn_url_back",""),
this.data.set("show_cover_pic",0);
},
handleEditTips:function(){
this._o.$infoContainer.find(".js_edit_tips").hide();
},
getEditTipsContent:function(){
return"";
},
validateCommon:function(e){
var i=e.$dom,t=e.item,s=this.data.getData();
return s.source_url_checked&&""==t.sourceurl&&(i.find(".js_url_error").text("请输入原文链接").show(),
e.viewClass=e.viewClass||".js_url",e.isValid=!1),t.sourceurl&&!r.url(t.sourceurl)&&(i.find(".js_url_error").text("链接不合法").show(),
e.viewClass=e.viewClass||".js_url",e.isValid=!1),r.rangelength(t.digest,[0,this._g.maxDigest])||(i.find(".js_desc_error").text("摘要长度不能超过%s字".sprintf(this._g.maxDigest)).show(),
e.viewClass=e.viewClass||".js_desc",e.isValid=!1),1==t.can_reward&&t.reward_wording.len()>30&&(e.viewClass=e.viewClass||".js_reward_div",
e.isValid=!1),1==t.can_reward&&t.reward_money>0&&(t.reward_money<1||t.reward_money>256||t.reward_money.toString().indexOf(".")>-1)&&(i.find(".js_reward_money_error").text("赞赏金额范围为1-256，只能是整数").show(),
e.viewClass=e.viewClass||".js_reward_ios_money",e.isValid=!1),e;
},
validateStrictlyCommon:function(e){
var i=e.$dom,t=e.item,s=this.data.getData();
return t.fileid||t.cdn_url||(this.showErrMsg(i.find(".js_cover_error"),"必须插入一张图片"),
e.viewClass=e.viewClass||".js_cover_error",e.isValid=!1),s.source_url_checked&&""==t.sourceurl&&(i.find(".js_url_error").text("请输入原文链接").show(),
e.viewClass=e.viewClass||".js_url",e.isValid=!1),0==t.copyright_type&&t.sourceurl&&!r.url(t.sourceurl)&&(i.find(".js_url_error").text("链接不合法").show(),
e.viewClass=e.viewClass||".js_url",e.isValid=!1),r.rangelength(t.digest,[0,this._g.maxDigest])||(i.find(".js_desc_error").text("摘要长度不能超过%s字".sprintf(this._g.maxDigest)).show(),
e.viewClass=e.viewClass||".js_desc",e.isValid=!1),1==t.can_reward&&t.reward_wording.len()>30&&(e.isValid=!1),
1==t.can_reward&&t.reward_money>0&&(t.reward_money<1||t.reward_money>256||t.reward_money.toString().indexOf(".")>-1)&&(i.find(".js_reward_money_error").text("赞赏金额范围为1-256，只能是整数").show(),
e.viewClass=e.viewClass||".js_reward_ios_money",e.isValid=!1),e;
},
validateGuideWords:function(e){
return r.rangelength(e.item.guide_words,[0,140])||(this.showErrMsg(e.$dom.find(".js_content_error"),"推荐语长度不能超过140字"),
e.viewClass=e.viewClass||".js_content_error",e.isValid=!1),e;
},
handleValidateResult:function(e){
return e.isValid?(this.hideAllErrMsg(),e.item):(e.viewClass&&this.scrollIntoView(e.$dom.find(e.viewClass),250),
null);
},
validate:function(e){
return e;
},
validateStrictly:function(e){
return e;
},
setGuideWordsReadOnly:function(){},
modifyCurrentEditData:function(e){
this.renderFieldData(e);
},
renderFieldData:function(e){
this._o.$infoContainer.find(".js_field").each(function(){
var i=$(this),t=i.attr("name"),s=i.attr("type");
"undefined"!=typeof e[t]&&("checkbox"==s?i.checkbox("checked",!!e[t]):i.val(e[t]||"").trigger("blur keydown "));
});
},
renderGuidWords:function(){
var e=o.getEditor();
e.setContent(this.data.get("guide_words")),$("#guide_words_main").show();
},
renderSharePreview:function(e){
var i=this.data,t=$("#reprint_article_main");
t.html(wx.T(e.tpl,i.getData())),t.show();
},
getArticleType:function(){
return this.data.get("share_page_type");
},
renderSourceUrl:function(){
var e=this._o.$infoContainer,i=this.data.getData();
i.source_url_checked?e.find(".js_url_area .frm_input_box").show():e.find(".js_url_area .frm_input_box").hide();
},
replaceMedia:function(){},
renderCover:function(){
var e=this._o.$infoContainer,t=this.data.getData(),r=t.cover,n=e.find(".js_cover");
if(n.find("img").remove(),r&&(s.isLocalDomain(r)||i.isOuterWhiteDomain(r))){
var a=n.show().find(".js_cover_preview").css("backgroundImage",'url("'+r+'")');
a.find(".js_tip_mask_msg").hide(),a.find(".js_tip_mask").removeClass("error_mask");
}else this._g.$item.removeClass("has_thumb").find(".js_appmsg_thumb").css("backgroundImage",'url("")'),
e.find(".js_cover").hide(),e.find(".js_cdn_url").val(""),e.find(".js_file_id").val(""),
e.find(".js_cdn_url_back").val("");
this.changeCoverPreviewCss(a);
},
changeCoverPreviewCss:function(e){
if(this.isCurrentArticle()){
var i=this.getIndex();
e||(e=this._o.$infoContainer.find(".js_cover").find(".js_cover_preview")),0==i?e.addClass("first_appmsg_cover"):e.removeClass("first_appmsg_cover");
}
},
titleChange:function(e){
this.isCurrentArticle()&&(this._o.$infoContainer.find('.js_field[name="title"]').val(e.title).trigger("blur keydown "),
this._g.$item.find(".js_appmsg_title").text(e.title)),this.data.set("title",e.title);
},
coverChange:function(e){
var i=this._o.$infoContainer,t=e.url,s=e.file_id,r="";
r=t?t.http2https().nogif():wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(s));
var n=e.oriUrl||r;
if(this.isCurrentArticle()){
var a=i.find(".js_cover");
a.find("img").remove(),a.show();
var o=a.find(".js_cover_preview").css("backgroundImage",'url("'+r+'")');
if(o.find(".js_tip_mask_msg").hide(),o.find(".js_tip_mask").addClass("hover_mask").removeClass("error_mask"),
a.find("input.js_file_id").val(s),a.find("input.js_cdn_url").val(r),a.find("input.js_cdn_url_back").val(n),
1*e.coverPic===1&&n){
var d=this._o.ueditor.getUeditor(),_=d.selection.getRange(),c=_.createBookmark(),l=d.body.firstChild;
_.setEndBefore(l),_.setStartBefore(l),d.fireEvent("insertMaterialImg",{
format:e.oriFormat,
src:n
}),_.moveToBookmark(c),_.select(),d.fireEvent("contentchange",!0),d.fireEvent("scrollIntoView",$("#author"),200);
}
i.find(".js_show_cover_pic").val("0"),this._g.$item.find(".js_appmsg_thumb").css("backgroundImage",'url("'+r+'")'),
this._g.$item.addClass("has_thumb"),i.find(".js_cover_error").hide(),this.changeCoverPreviewCss(o);
}
this.data.set("file_id",s),this.data.set("cdn_url",r),this.data.set("cover",r),this.data.set("cdn_url_back",n),
this.data.set("show_cover_pic",0);
},
renderComment:function(){
var e=this._o.$infoContainer,i=this.data.getData();
e.find(".js_comment").checkbox("checked",0==i.need_open_comment?!1:!0),e.find(".js_comment_setting").each(function(e){
e==Number(i.only_fans_can_comment||0)?$(this).checkbox("checked",!0):$(this).checkbox("checked",!1);
}),0==i.need_open_comment?$("#js_comment_setting_wrp").hide():$("#js_comment_setting_wrp").show();
},
renderReward:function(){
var e=this._o.$infoContainer,i=this.data.getData();
i.reward_money?(e.find(".js_reward_ios_money").show().find("input").val(i.reward_money),
e.find(".js_reward_ios").eq(1).checkbox("checked",!0)):(e.find(".js_reward_ios_money").hide(),
e.find(".js_reward_ios").eq(0).checkbox("checked",!0)),1==i.can_reward?(e.find(".js_reward").checkbox("checked",!0),
e.find(".js_reward_div,.js_reward_ios_wrap").show()):(e.find(".js_reward").checkbox("checked",!1),
e.find(".js_reward_div,.js_reward_ios_wrap").hide());
},
triggerInputValidate:function(){
var e=this._o.$infoContainer,i=["input.js_title","input.js_author","input.js_reward_wording","input.js_reward_ios_money.js_desc","textarea.js_desc"];
i=i.join(","),e.find(i).trigger("keydown"),e.find(i).trigger("blur");
},
renderCommon:function(){
var e=this.data.getData();
this.renderFieldData(e),this.triggerInputValidate(),this.renderReward(),this.renderComment(),
this.renderCover(),this.renderSourceUrl(),this.renderOriginal(),this.renderAd();
},
resetBeforeRender:function(){
$("#guide_words_main").hide(),$("#reprint_article_main").hide(),this._o.$infoContainer.find(".js_plublish_style").show(),
this._o.$infoContainer.find(".js_cover_tip").html("").hide(),this.handleEditTips();
},
render:function(){
this.resetBeforeRender(),this.renderCommon();
},
destroy:function(){}
});
return l;
});