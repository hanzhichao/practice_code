define("common/wx/media/weappDialog.js",["common/wx/popup.js","biz_web/ui/checkbox.js","common/lib/jquery.Jcrop.js","tpl/media/weapp_dialog.html.js","tpl/media/weapp_dialog_content.html.js","common/wx/Cgi.js","common/wx/mpEditor/common/cropImgCgi.js","common/wx/upload.js","common/wx/Step.js","common/wx/Tips.js"],function(e){
"use strict";
e("common/wx/popup.js"),e("biz_web/ui/checkbox.js"),e("common/lib/jquery.Jcrop.js");
var i=e("tpl/media/weapp_dialog.html.js"),t=e("tpl/media/weapp_dialog_content.html.js"),n=e("common/wx/Cgi.js"),s=e("common/wx/mpEditor/common/cropImgCgi.js"),a=e("common/wx/upload.js"),_=e("common/wx/Step.js"),p=e("common/wx/Tips.js"),l=function(e,l){
var r=void 0,c=null,o={
appid:e.appid,
main_page:e.main_page,
nick_name:e.nick_name,
content:e.content,
image:e.image
};
void 0!==e.selected&&(r=e.selected);
var d=$(i).popup({
title:"选择小程序",
width:960,
className:"weapp_select_dialog",
buttons:[],
onOK:function(){},
onCancel:function(){
this.remove();
},
onHide:function(){
this.remove();
}
}),w=new _({
container:".js_weapp_select_step",
selected:e.step||1,
names:["选择小程序","填写详细信息"]
});
d.find(".dialog_ft").hide(),d.find(".js_weapp_select_cancel").click(function(){
d.find(".pop_closed").click(),l();
});
var m,f,h,g=function(e){
if(parseInt(e.w)>0){
j.c=e;
var i=$(".js_after_preview").width()/e.w,t=$(".js_after_preview").height()/e.h;
console.log(e.w,e.h),$(".js_after_preview_img").css({
width:Math.round(i*m)+"px",
height:Math.round(t*f)+"px",
marginLeft:"-"+Math.round(i*e.x)+"px",
marginTop:"-"+Math.round(t*e.y)+"px"
});
}
},j={
fid:null,
share:null,
c:{},
lar:{}
};
a.uploadCdnFile({
container:"#weapp_select_upload_reset",
multi:!1,
type:2,
fileSingleSizeLimit:2097152,
imageSize:!0,
onComplete:function(e,i,t,n){
var s=n.content,a=new Image;
a.onload=function(){
h&&h.destroy(),d.find("[name=imageUrl]").val(s),d.find(".js_weapp_select_step4").find(".js_weapp_select_cover").show(),
d.find(".js_weapp_select_step4").find(".js_weapp_select_cover_preview").css("background-image",'url("'+s+'")'),
d.find(".js_review-image-url").removeAttr("style"),d.find(".js_review-image-url").attr("src",s),
d.find(".js_after_preview_img").attr("src",s),d.find(".js_js_review-box").show();
var e,i,t,n,a,_,p,l=$(".js_review-image-url").width()/5*4;
e=l>$(".js_review-image-url").height()?$(".js_review-image-url").height()/4*5:$(".js_review-image-url").width(),
_=($(".js_review-image-url").width()-e)/2,p=($(".js_review-image-url").height()-l)/2,
i=_,t=p,n=$(".js_review-image-url").width()-_,a=$(".js_review-image-url").height()-p,
console.log(i,t,n,a),$(".js_review-image-url").Jcrop({
onChange:g,
onSelect:g,
setSelect:[i,t,n,a],
createHandles:["nw","ne","se","sw"],
aspectRatio:1.25,
boxWidth:$(".js_review-image-url").width(),
boxHeight:$(".js_review-image-url").height(),
allowSelect:!1,
allowResize:!0,
shade:!0,
bgOpacity:.5,
bgColor:"black"
},function(){
var e=this.getBounds();
m=e[0],f=e[1],h=this,$(".js_before_preview").hide(),$(".js_after_preview").show(),
console.log(h.tellSelect()),console.log(h.tellScaled());
var i=$(".js_after_preview").width()/h.tellSelect().w,t=$(".js_after_preview").height()/h.tellSelect().h;
$(".js_after_preview_img").css({
width:Math.round(i*m)+"px",
height:Math.round(t*f)+"px",
marginLeft:"-"+Math.round(i*h.tellSelect().x)+"px",
marginTop:"-"+Math.round(t*h.tellSelect().y)+"px"
}),$(".jcrop-handle",this.ui.selection).css({
width:"7px",
height:"7px"
});
});
},a.onerror=function(){
p.err("图片上传失败");
},a.src=s;
}
});
var u=function(){
a.uploadCdnFile({
container:"#weapp_select_upload",
multi:!1,
type:2,
fileSingleSizeLimit:2097152,
imageSize:!0,
onComplete:function(e,i,t,n){
var s=n.content,a=new Image;
a.onload=function(){
h&&h.destroy(),d.find("[name=imageUrl]").val(s),d.find(".js_weapp_select_step4").find(".js_weapp_select_cover").show(),
d.find(".js_weapp_select_step4").find(".js_weapp_select_cover_preview").css("background-image",'url("'+s+'")'),
d.find(".js_review-image-url").removeAttr("style"),d.find(".js_review-image-url").attr("src",s),
d.find(".js_after_preview_img").attr("src",s),d.find(".js_js_review-box").show();
var e,i,t,n,a,_,p,l=$(".js_review-image-url").width()/5*4;
e=l>$(".js_review-image-url").height()?$(".js_review-image-url").height()/4*5:$(".js_review-image-url").width(),
_=($(".js_review-image-url").width()-e)/2,p=($(".js_review-image-url").height()-l)/2,
i=_,t=p,n=$(".js_review-image-url").width()-_,a=$(".js_review-image-url").height()-p,
console.log(i,t,n,a),$(".js_review-image-url").Jcrop({
onChange:g,
onSelect:g,
setSelect:[i,t,n,a],
createHandles:["nw","ne","se","sw"],
aspectRatio:1.25,
boxWidth:$(".js_review-image-url").width(),
boxHeight:$(".js_review-image-url").height(),
allowSelect:!1,
allowResize:!0,
shade:!0,
bgOpacity:.5,
bgColor:"black"
},function(){
var e=this.getBounds();
m=e[0],f=e[1],h=this,$(".js_before_preview").hide(),$(".js_after_preview").show(),
console.log(h.tellSelect()),console.log(h.tellScaled());
var i=$(".js_after_preview").width()/h.tellSelect().w,t=$(".js_after_preview").height()/h.tellSelect().h;
$(".js_after_preview_img").css({
width:Math.round(i*m)+"px",
height:Math.round(t*f)+"px",
marginLeft:"-"+Math.round(i*h.tellSelect().x)+"px",
marginTop:"-"+Math.round(t*h.tellSelect().y)+"px"
}),$(".jcrop-handle",this.ui.selection).css({
width:"7px",
height:"7px"
});
});
},a.onerror=function(){
p.err("图片上传失败");
},a.src=s;
}
});
},v=function(){
a.uploadCdnFile({
container:"#js_weapp_link_image_upload",
multi:!1,
type:2,
fileSingleSizeLimit:2097152,
imageSize:!0,
onComplete:function(e,i,t,n){
var s=n.content;
d.find("[name=image]").val(s),d.find(".js_weapp_select_step4").find(".js_weapp_link_image_cover").show(),
d.find(".js_weapp_select_step4").find(".js_weapp_link_image_preview").css("background-image",'url("'+s+'")');
}
});
},x=function(){
d.find(".js_weapp_select_step1").show(),d.find(".js_weapp_select_step2").hide(),
d.find(".js_weapp_select_step4").hide(),w.setStep(1);
var e=d.find(".js_weapp_select_step1");
r||e.find(".js_weapp_select_next_step").addClass("btn_disabled");
var i=function(e){
if(e.find(".js_weapplink_loading").hide(),c.length){
$.each(c,function(e,i){
i.pic_url=i.pic_url||"http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
}),e.find(".js_weapplink_hint_select").show(),e.find(".js_weapplink_list").html(wx.T(t,{
list:c
})).show();
var i=e.find(".js_weapplink_item_inner").click(function(){
i.find(".js_weapplink_select_mask").hide(),$(this).find(".js_weapplink_select_mask").show(),
r=$(this).data("appid");
for(var t=0;t<c.length;t++)c[t].appid===r&&(o=c[t]);
4==o.service_type?d.find(".js_weapp_select_step4 .js_weapp_type4").show():d.find(".js_weapp_select_step4 .js_weapp_type4").hide(),
e.find(".js_weapp_select_next_step").removeClass("btn_disabled");
}).each(function(){
r===$(this).data("appid")&&$(this).find(".js_weapplink_select_mask").show();
});
}else e.find(".js_weapplink_hint_none").show();
};
c?i(e,l):n.get({
url:"/advanced/operselfmenu?action=get_bind_wxopen_info"
},function(t){
return 0==t.base_resp.ret&&t.bind_info?(c=JSON.parse(t.bind_info).bind_list,void i(e,l)):(n.handleRet(t,{
id:"64524",
key:"2",
msg:"系统繁忙"
}),l());
});
},k=function(){
d.find(".js_weapp_select_step1").hide(),d.find(".js_weapp_select_step2").hide(),
d.find(".js_weapp_select_step4").show(),w.setStep(2);
var e=d.find(".js_weapp_select_step4");
console.log(o),e.find('[name="path"]').val(o.main_page),e.find(".js_name").text(o.nick_name),
o.image?(e.find(".js_weapp_display_way").eq(1).click(),e.find("[name=image]").val(o.image),
e.find(".js_weapp_link_image_cover").show(),e.find(".js_weapp_link_image_preview").css("background-image",'url("'+o.image+'")')):e.find("[name=content]").val(o.content||""),
d.find(".js_weapp_icon").attr("src",o.pic_url),d.find(".js_weapp_name").text(o.nick_name),
d.find(".js_weapp_card_title").text("");
};
d.find(".js_weapp_select_step4").find(".js_weapp_select_cover_remove").click(function(){
d.find("[name=imageUrl]").val(""),d.find(".js_weapp_select_step4").find(".js_weapp_select_cover").hide(),
d.find(".js_weapp_select_step4").find(".js_weapp_select_cover_preview").css("background-image","");
}),d.find(".js_weapp_select_step4").find(".js_weapp_select_cover").hide(),d.find(".js_weapp_select_step4").find(".js_weapp_link_image_remove").click(function(){
d.find("[name=image]").val(""),d.find(".js_weapp_select_step4").find(".js_weapp_link_image_cover").hide(),
d.find(".js_weapp_select_step4").find(".js_weapp_link_image_preview").css("background-image","");
}),d.find(".js_weapp_select_step4").find(".js_weapp_link_image_cover").hide(),d.find(".js_weapp_select_step1").find(".js_weapp_select_next_step").click(function(){
$(this).hasClass("btn_disabled")||k();
}),d.find("#js_weapp_card_title_input").keyup(function(){
$(".js_weapp_card_title").text($(this).val());
}),d.find(".js_weapp_select_step2").find(".js_weapp_select_prev_step").click(x),
d.find(".js_weapp_select_step2").find(".js_weapp_select_next_step").click(k),d.find(".js_weapp_select_step4").find(".js_weapp_select_prev_step").click(x),
d.find(".js_weapp_select_step4").find(".js_weapp_select_confirm").click(function(){
var e=d.find(".js_weapp_display_way:checked").val(),i=d.find("[name=path]").val(),t=this;
if("card"==e){
var n=d.find("[name=title]").val(),a=d.find("[name=imageUrl]").val();
if(!n)return p.err("标题不能为空");
if(n.length>35)return p.err("标题不能多于35个字");
if(!a)return p.err("请上传卡片图片");
}else if("text"==e){
var _=$.trim(d.find("[name=content]").val());
if(!_)return p.err("文字内容不能为空");
}else if("image"==e){
var c=d.find("[name=image]").val();
if(!c)return p.err("请上传图片");
}
return i||4==o.service_type?4==o.service_type&&i&&!/^\?/.test(i)?p.err("小程序路径参数请以?开头"):i.length>1024?p.err("小程序路径长度不能大于1024字符"):void("card"==e?($(t).btn(!1),
s.getUrl({
imgurl:a,
x1:j.c.x/$(".js_review-image-url").width(),
y1:j.c.y/$(".js_review-image-url").height(),
x2:j.c.x2/$(".js_review-image-url").width(),
y2:j.c.y2/$(".js_review-image-url").height(),
onerror:function(e){
$(t).btn(!0),console.error(e);
},
onsuccess:function(s){
console.info(s),$(t).btn(!0),d.popup("hide"),l(o.appid||r,o,{
title:n,
description:"",
path:i,
imageUrl:s.url,
image:c,
content:_,
type:e
});
}
})):(d.popup("hide"),l(o.appid||r,o,{
title:n,
description:"",
path:i,
imageUrl:a,
image:c,
content:_,
type:e
}))):p.err("小程序路径不能为空");
}),d.find(".js_weapp_select_step4").find(".js_weapp_display_way").checkbox({
multi:!1,
onChanged:function(e){
var i=d.find(".js_weapp_select_step4"),t=e.val();
i.find(".js_weapp_way").hide(),i.find(".js_weapp_"+t+"_way").show(),"image"==t?setTimeout(function(){
v(),v=function(){};
},100):"card"==t&&setTimeout(function(){
u(),u=function(){};
},100);
}
}),4==e.step?k():x();
};
return{
show:l
};
});