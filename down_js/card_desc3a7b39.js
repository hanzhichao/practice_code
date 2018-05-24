define("cardticket/add/card_desc.js",["biz_web/utils/upload.js","common/wx/Tips.js","common/wx/media/imageDialog.js","cardticket/common_template_helper.js","cardticket/add/maxlength.js"],function(t){
"use strict";
function e(t){
$("#js_card_desc_fail").text(t).show();
}
function i(){
$("#js_card_desc_fail").hide();
}
function a(t){
function a(t){
t.each(function(){
var t=$(this),e=t.attr("id"),i=t.attr("inited");
i||(t.attr("inited",1),function(t){
r.uploadCdnFile({
container:"#"+t,
multi:!1,
type:2,
onComplete:function(e,i,a,r){
var n=r.content||"";
0==r.base_resp.ret&&($("#"+t+"_preview").html('<img src="%s">'.sprintf(n.http2https())),
$("#"+t+"_hidden").val(""+n.https2http()).closest(".js_card_input_item").find(".fail").remove(),
$("#js_cover_preview").html('<img src="%s">'.sprintf(n.http2https())).closest(".js_cover_preview_container").show(),
_.suc("上传成功"));
}
});
}(e));
});
}
function o(e){
e||(e={}),m.$article_editor_container.html(template.render("js_card_article_editor_tpl",e)),
c({
container:m.$article_editor_container.find(".js_maxlength")
}),$(".js_article_item input,.js_article_item textarea",t.articleDom).focus(),$(".js_add_img",t.articleDom).click(function(){
n({
maxSelect:1,
onOK:function(e){
if(e.length){
var i=e[0].url;
$(".js_img_hidden",t.articleDom).val(i.https2http()),m.$article_editor_container.find(".js_img_preview").attr("src",i.http2https()).show(),
m.$article_editor_container.find(".js_add_img_p").hide(),m.$article_editor_container.find(".card_article_img").addClass("js_img_added"),
this.destroy();
}
},
onCancel:function(){
this.destroy();
}
});
}),$(".js_add_img_p").click(function(){
return!1;
}),e.image_url?m.$article_editor_container.find(".js_img_preview").show():m.$article_editor_container.find(".js_img_preview").hide(),
m.$add_article_container.addClass("editting");
}
function l(t){
if(p){
m.text_image_items[u]=t;
var e=$(template.render("js_ca_preview_tpl",t));
f.replaceWith(e),f=null,p=!1,_.suc("编辑成功");
}else m.$preview_container.append(template.render("js_ca_preview_tpl",t)),m.text_image_items.push(t),
_.suc("添加成功");
}
function d(t,e){
var i=t.index(),a=e.index();
if(m.text_image_items[i]&&m.text_image_items[a]){
var r=m.text_image_items[i];
m.text_image_items[i]=m.text_image_items[a],m.text_image_items[a]=r;
}
p&&(i==u&&(u=a),a==u&&(u=i));
}
a($(t.uploadDom)),this.$add_article_container=$(".js_card_article_add",t.articleDom),
this.$article_editor_container=$(".js_card_article_editor",t.articleDom);
var m=this;
m.$article_editor_container.on("mouseover",".js_img_added",function(){
m.$article_editor_container.find(".js_image_mask").show(),m.$article_editor_container.find(".js_add_img_p").show();
}).on("mouseout",".js_img_added",function(){
m.$article_editor_container.find(".js_image_mask").hide(),m.$article_editor_container.find(".js_add_img_p").hide();
}),this.$add_article_container.on("click",function(){
return $(this).hasClass("editting")?!1:(o(),!1);
}),this.$preview_container=$(".js_card_article_preview",t.articleDom),this.$article_editor_container.on("click",".js_add_confirm",function(){
var t=$(this).closest(".js_article_item").find("textarea"),a=t.val(),r=$(this).closest(".js_article_item").find(".js_img_hidden"),_=r.val();
if(i(),!a||!_)return e("图片和描述都不能为空"),!1;
var n=t.attr("data-maxlength");
return a.len()>2*n?(e("最多输入%s个字".sprintf(n)),!1):(s.check_friend_card_word(a),l({
text:a,
image_url:_
}),t.val("").keyup(),r.val(""),m.$article_editor_container.find(".js_img_preview").attr("src","").hide(),
m.$article_editor_container.find(".js_image_mask").hide(),m.$add_article_container.removeClass("editting"),
m.$article_editor_container.html(""),!1);
}).on("click",".js_add_cancel",function(){
return m.$article_editor_container.html(""),h=null,p=!1,m.$add_article_container.removeClass("editting"),
!1;
}),this.text_image_items=t.data.text_image_list||[],this.$article_toolbar=$(".js_article_toolbar",t.articleDom);
var h=null,p=!1,u=-1,f=null;
this.$preview_container.on("mouseover",".js_ca_preview",function(){
m.$article_toolbar.show();
var t=$(this),e=t.position();
m.$article_toolbar.css({
top:e.top+t.height()/2-m.$article_toolbar.height()/2,
left:e.left+t.width()/2-m.$article_toolbar.width()/2,
zIndex:1
}),h=t;
}),this.$preview_container.parent().on("mouseout",function(t){
var e=t.relatedTarget;
$(e).hasClass("js_article_toolbar")||$(e).closest(".js_article_toolbar").length||m.$article_toolbar.hide();
}).on("click","a",function(){
var t=$(this);
if(h){
if(t.hasClass("js_delete")){
var e=h.index();
e>=0&&m.text_image_items.splice(e,1),h.remove(),h=null,e==u&&m.$article_editor_container.find(".js_add_cancel").click();
}else if(t.hasClass("js_edit")){
p=!0;
var e=h.index();
e>=0&&(u=e,f=h,o(m.text_image_items[e]));
}else if(t.hasClass("js_moveup")){
var i=h.prev();
h.insertBefore(i),d(h,i);
}else if(t.hasClass("js_movedown")){
var a=h.next();
h.insertAfter(a),d(h,a);
}
m.$article_toolbar.hide();
}
}),this.opt=t;
}
var r=t("biz_web/utils/upload.js"),_=t("common/wx/Tips.js"),n=t("common/wx/media/imageDialog.js"),s=t("cardticket/common_template_helper.js"),c=t("cardticket/add/maxlength.js");
return a.prototype.val=function(){
for(var t={
text_image_item_count:this.text_image_items.length
},i=0,a=0;a<this.text_image_items.length;a++){
var r=this.text_image_items[a];
r.image_url&&(t["text_image_item_"+a+"_image_url"]=r.image_url),r.text&&(t["text_image_item_"+a+"_text"]=r.text),
i+=r.text?r.text.len():0;
}
if(i>1e4)return e("图文介绍最多输入5000个字"),!1;
var _=this.opt;
return _.is_sns_card&&!i?(e("请填写图文介绍"),!1):t;
},a;
});