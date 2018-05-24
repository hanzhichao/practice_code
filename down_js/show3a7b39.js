define("ad_system/promotion/edit/show.js",["common/qq/events.js","biz_web/ui/input/lentips.js","biz_web/utils/upload.js","material/common_edit.js","common/wx/Tips.js"],function(e){
"use strict";
var _=e("common/qq/events.js")(!0),t=e("biz_web/ui/input/lentips.js"),a=e("biz_web/utils/upload.js"),s=a.uploadCdnFileFromAd({
w:582,
h:166,
size:61440
}),i=a.uploadCdnFileFromAd({
w:900,
h:162,
size:40960
}),r=a.uploadCdnFileFromAd({
w:114,
h:114,
size:40960
}),d=a.uploadCdnFileFromAd({
w:525,
h:315,
size:40960
}),o=(e("material/common_edit.js"),e("common/wx/Tips.js")),l=!1,n=!1,c=!1,p=!1;
_.on("ad_edit:setStep2",function(e){
if(!l){
l=!0;
var a=$("#js_ad_showtype").find(".frm_radio");
a.filter("[value="+e.crt_type+"]").attr("checked",!0),e.image_url&&(1*e.crt_type==1?1*e.pos_type==0||1*e.pos_type==2?($("#js_ad_show_preview_1_1").find("img").attr("src",e.image_url),
$("#js_imageurl_preview_1_1").show().attr("src",e.image_url),$("#js_upload_pic_1").html("重新上传"),
_.trigger("ad_edit:setPostData","image_url_1_1",e.image_url)):($("#js_ad_show_preview_1_2").find("img").attr("src",e.image_url),
$("#js_imageurl_preview_1_2").show().attr("src",e.image_url),$("#js_upload_pic_2").html("重新上传"),
_.trigger("ad_edit:setPostData","image_url_1_2",e.image_url)):1*e.crt_type==2?($("#js_ad_show_preview_2").find("img").attr("src",e.image_url),
$("#js_imageurl_preview_2").show().attr("src",e.image_url),$("#js_upload_2").html("重新上传"),
_.trigger("ad_edit:setPostData","image_url_2",e.image_url)):1*e.crt_type==4&&($("#js_ad_show_preview_4").find("img").attr("src",e.image_url),
$("#js_imageurl_preview_4").show().attr("src",e.image_url),$("#js_upload_pic_4").html("重新上传"),
_.trigger("ad_edit:setPostData","image_url_4",e.image_url)));
var m=a.checkbox({
type:"radio",
initOnChanged:!0,
onChanged:function(){
var t=this.values()[0];
$("#js_click_lable_tip").text(2>=1*t?"点击效果":"点击非按钮区域"),_.trigger("ad_edit:setPostData","crt_type",t),
e.crt_type=1*t,$("#js_ad_showtype_area").find(".js_ad_showtype_area").hide(),$("#js_ad_show_preview").find(".js_ad_show_preview").hide();
var a=t;
$("#js_ad_showtype_area_"+a).show(),1*e.crt_type==1?($("#js_imageurl_preview_1_1").hide(),
$("#js_imageurl_preview_1_2").hide(),(1*e.pos_type==0||1*e.pos_type==2)&&($("#js_imageurl_preview_1_1").attr("src")&&$("#js_imageurl_preview_1_1").show(),
$("#js_ad_show_preview_1_1").show()),1*e.pos_type==1&&($("#js_imageurl_preview_1_2").attr("src")&&$("#js_imageurl_preview_1_2").show(),
$("#js_ad_show_preview_1_2").show())):$("#js_ad_show_preview_"+a).show(),$("#js_ad_show_preview")["0"==t?"addClass":"removeClass"]("bg_near_txt"),
"1"!=t||n||(n=!0,$("#pic_upload_area_1").show(),$("#pic_upload_area_2").show(),s({
multi:!1,
type:2,
container:"#js_upload_pic_1",
onComplete:function(e,t,a,s){
switch(+s.base_resp.ret){
case 0:
var i=s.content;
$("#js_ad_show_preview_1_1").find("img").attr("src",i),$("#js_imageurl_preview_1_2").hide(),
$("#js_imageurl_preview_1_1").show().attr("src",i),_.trigger("ad_edit:setPostData","image_url_1_1",i),
o.suc("上传成功"),$("#js_upload_pic_1").html("重新上传");
break;

case 200034:
o.err("尺寸必须为582像素X166像素，大小不能超过50K。");
break;

case 1:
o.err("图片太大");
break;

case 200011:
o.err("请上传合法的图片格式");
break;

default:
o.err("上传图片失败");
}
}
}),i({
multi:!1,
type:2,
container:"#js_upload_pic_2",
onComplete:function(e,t,a,s){
switch(+s.base_resp.ret){
case 0:
var i=s.content;
$("#js_ad_show_preview_1_2").find("img").attr("src",i),$("#js_imageurl_preview_1_1").hide(),
$("#js_imageurl_preview_1_2").show().attr("src",i),_.trigger("ad_edit:setPostData","image_url_1_2",i),
o.suc("上传成功"),$("#js_upload_pic_2").html("重新上传");
break;

case 200034:
o.err("尺寸必须为900像素X162像素，大小不能超过30K。");
break;

case 1:
o.err("图片太大");
break;

case 200011:
o.err("请上传合法的图片格式");
break;

default:
o.err("上传图片失败");
}
}
}),1*e.pos_type==0||1*e.pos_type==2?($("#pic_upload_area_1").show(),$("#pic_upload_area_2").hide()):($("#pic_upload_area_1").hide(),
$("#pic_upload_area_2").show())),"2"!=t||c||(c=!0,r({
multi:!1,
type:2,
container:"#js_upload_2",
onComplete:function(e,t,a,s){
switch(+s.base_resp.ret){
case 0:
var i=s.content;
$("#js_ad_show_preview_2").find("img").attr("src",i),$("#js_imageurl_preview_2").show().attr("src",i),
_.trigger("ad_edit:setPostData","image_url_2",i),o.suc("上传成功"),$("#js_upload_2").html("重新上传");
break;

case 200034:
o.err("尺寸必须为114*114像素，大小不能超过30K。");
break;

case 1:
o.err("图片太大");
break;

case 200011:
o.err("请上传合法的图片格式");
break;

default:
o.err("上传图片失败");
}
}
})),"4"!=t||p||(p=!0,d({
multi:!1,
type:2,
container:"#js_upload_pic_4",
onComplete:function(e,t,a,s){
switch(+s.base_resp.ret){
case 0:
var i=s.content;
$("#js_ad_show_preview_4").find("img").attr("src",i),$("#js_imageurl_preview_4").show().attr("src",i),
_.trigger("ad_edit:setPostData","image_url_4",i),o.suc("上传成功"),$("#js_upload_pic_4").html("重新上传");
break;

case 200034:
o.err("尺寸必须为525*315像素，大小不能超过30K。");
break;

case 1:
o.err("图片太大");
break;

case 200011:
o.err("请上传合法的图片格式");
break;

default:
o.err("上传图片失败");
}
}
}));
}
});
e.advert_id&&m.disabled(!0);
var u=function(e){
switch(e){
case 3:
$("#js_show_type_4").hide(),$("#js_show_type_3").find(".frm_radio").click();
break;

case 5:
case 6:
$("#js_show_type_3").hide(),$("#js_show_type_4").find(".frm_radio").click();
break;

default:
$("#js_show_type_2").find(".frm_radio").click();
}
};
u(e.ad_goodtype),_.on("ad_edit:showTypeChange",function(e){
{
var e=1*e;
1*m.values()[0];
}
u(e);
});
var w=$("#js_ad_img_desc");
new t({
input:w.val(e.ad_content.html(!1)),
tip:$("#js_ad_img_desc_len_tips"),
maxlimit:15,
trim:!0,
className:"txt_hint",
callback:function(e,t){
e?_.trigger("ad_edit:setPostData","ad_content_1",""):_.trigger("ad_edit:setPostData","ad_content_1",t.value);
}
});
var h=$("#js_ad_app_desc_content");
new t({
input:h.val(e.ad_content.html(!1)),
tip:$("#js_ad_app_desc_content_len_tips"),
maxlimit:18,
trim:!0,
className:"txt_hint",
callback:function(e,t){
e?_.trigger("ad_edit:setPostData","ad_content_301",""):_.trigger("ad_edit:setPostData","ad_content_301",t.value);
}
});
var g="你填写的下载引导文案将会显示在这里";
h.keyup(function(){
$("#js_ad_show_preview_appdesc_3_0").html((h.val().trim()||g).substr(0,18).html(!0));
}),$("#js_ad_show_preview_appdesc_3_0").html(e.ad_content||g);
var v=$("#js_ad_biz_content");
new t({
input:v.val(e.ad_content.html(!1)),
tip:$("#js_ad_biz_content_len_tips"),
maxlimit:18,
trim:!0,
className:"txt_hint",
callback:function(e,t){
e?_.trigger("ad_edit:setPostData","ad_content_3",""):_.trigger("ad_edit:setPostData","ad_content_3",t.value);
}
});
var j="填写的关注引导文案将会显示在这里";
v.keyup(function(){
$("#js_ad_show_preview_title_3_0").html((v.val().trim()||j).substr(0,18).html(!0));
}),$("#js_ad_show_preview_title_3_0").html(e.ad_content||j);
var b=$("#js_ad_appmsg_title");
new t({
input:b.val(e.ad_content.html(!1)),
tip:$("#js_ad_appmsg_title_len_tips"),
maxlimit:14,
trim:!0,
className:"txt_hint",
callback:function(e,t){
e?_.trigger("ad_edit:setPostData","ad_content_2",""):_.trigger("ad_edit:setPostData","ad_content_2",t.value);
}
});
var f=$("#js_ad_appmsg_desc");
new t({
input:f.val(e.ad_desc.html(!1)),
tip:$("#js_ad_appmsg_desc_len_tips"),
maxlimit:28,
trim:!0,
className:"txt_hint",
callback:function(e,t){
e?_.trigger("ad_edit:setPostData","ad_desc",""):_.trigger("ad_edit:setPostData","ad_desc",t.value);
}
});
var y="图文标题";
b.keyup(function(){
$("#js_ad_show_preview_title_2").html((b.val().trim()||y).substr(0,14).html(!0));
}),$("#js_ad_show_preview_title_2").html(e.ad_content||y);
var k="图文描述";
f.keyup(function(){
$("#js_ad_show_preview_desc_2").html((f.val().trim()||k).substr(0,28).html(!0));
}),$("#js_ad_show_preview_desc_2").html(e.ad_desc||k);
var D=$("#js_ad_content");
new t({
input:D.val(e.ad_content.html(!1)),
tip:$("#js_ad_content_len_tips"),
maxlimit:15,
trim:!0,
className:"txt_hint",
callback:function(e,t){
e?_.trigger("ad_edit:setPostData","ad_content_0",""):_.trigger("ad_edit:setPostData","ad_content_0",t.value);
}
});
var P="你填写的广告位文案将出现在这里";
D.keyup(function(){
$("#js_ad_show_preview_0").html((D.val().trim()||P).substr(0,15).html(!0));
}),$("#js_ad_show_preview_0").html(e.ad_content||P);
}
});
});