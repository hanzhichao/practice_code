define("cardticket/add/config_url.js",["biz_web/ui/checkbox.js","common/wx/Tips.js","cardticket/add/maxlength.js","tpl/cardticket/config_url.html.js","homepage/appmsgdialog.js","cardticket/select_shelf.js","tpl/cardticket/config_url_item.html.js","cardticket/parse_data.js","media/appmsg_temp_url.js"],function(t){
"use strict";
function e(t){
t.$err_msg&&t.$err_msg.hide();
}
function i(t,e){
if(t)if(t.$err_msg)t.$err_msg.find(".frm_msg_content").text(e).show(),t.$err_msg.show();else{
var i=$(t).parent().parent();
t.$err_msg=$('<p class="frm_msg fail"><span class="frm_msg_content">%s</span></p>'.sprintf(e)).appendTo(i),
t.$err_msg.show();
}
}
function s(t,s,r){
return t.val().len()<=s?(e(t[0]),!0):(i(t[0],r),!1);
}
function r(t,s){
return $.trim(t.val())?(e(t[0]),!0):(i(t[0],s),!1);
}
function n(t){
var e=!0;
return e=r(t,x),e&&(e=s(t,10,w)),e;
}
function a(t){
var e=!0;
return e=s(t,12,b);
}
function l(t){
this.opt=t;
var e=$(t.container);
if(this.$dom=e,this.cur_len=0,t.data&&t.data.config_url&&t.data.config_url.length)for(var i=0;i<t.data.config_url.length;i++)t.can_merchant||3!=t.data.config_url[i].url_type||(t.data.config_url[i].url_type=4);
t.data.config_url&&this.add(t.data.config_url),e.on("click",".js_delete_item",function(){
var e=$(this);
e.closest(".js_appmsg_url_item").remove(),s.cur_len--,s.init_title();
var i=s.check(!1,1);
return s.init_preview(i),t.onchanged&&t.onchanged(),!1;
}),e.on("click",".js_select_appmsg",function(){
var t=$(this);
return new h({
ids:[],
multi:!1,
maxNum:1,
link:1,
callback:function(e){
e.length>0&&o(t,s.config_url,e[0],1);
}
}),!1;
}),e.on("click",".js_select_card_shelf,.js_select_shop_shelf",function(){
var e=$(this),i=e.attr("shelf_type")||1,s=new f({
shelf_type:i,
url:2==i?"/merchant/shelf?status=0&action=get_shelflist":"",
render_url:2==i?"/merchant/rendershelf?shelf_id=":"",
title:2==i?"选择小店货架":void 0,
selectComplete:function(s){
var r,n=e.closest(".js_appmsg_url_item"),a=n.find(".js_link_url");
1==i?r="http://mp.weixin.qq.com/bizmall/cardshelf?shelf_id=%s&showwxpaytitle=1&biz=%s&scene=1000007#wechat_redirect".sprintf(s,t.biz):2==i&&(r="http://mp.weixin.qq.com/bizmall/mallshelf?biz=%s&shelf_id=%s&showwxpaytitle=1#wechat_redirect".sprintf(t.biz,s)),
a.attr("href",r).text(r);
}
});
return s.show(),!1;
});
var s=this;
$("#js_add_config_url").click(function(){
return s.is_max()?(p.err("最多只能添加%s个自定义入口".sprintf(t.max)),!1):(s.add(),!1);
}),this.init_preview();
}
function _(t){
return 1==t?"一":2==t?"二":3==t?"三":void 0;
}
function c(t,e){
for(var i=0;i<t.length;i++)if(t[i].idx==e)return t[i];
return null;
}
function o(t,e,i,s){
var r=t.attr("data-v"),n=t.closest(".js_appmsg_url_item"),a=n.attr("data-idx"),l=n.find(".js_appmsg_edit_item_p"),_=c(e,a);
_.appmsg=i?i:null,_.url_type=r||s,_.url_match_type=_.url_type==j.url_type(_.appmsg&&_.appmsg.link||_.url),
l.html(d({
item:_
}));
}
t("biz_web/ui/checkbox.js");
var p=t("common/wx/Tips.js"),u=t("cardticket/add/maxlength.js"),m=template.compile(t("tpl/cardticket/config_url.html.js")),h=t("homepage/appmsgdialog.js"),f=t("cardticket/select_shelf.js"),d=template.compile(t("tpl/cardticket/config_url_item.html.js")),g=template.compile('<li class="msg_card_section{if showmask} js_preview{/if}{if is_last} last_li{/if}">        <div class="li_panel"><div class="li_content"><p><span class="supply_area"><span class="js_custom_url_tips_pre">{tips}</span><span class="ic ic_go"></span></span><span class="js_custom_url_name_pre">{name}</span></p></div>                  </div>         {if showmask}<div class="msg_card_mask"> <span class="vm_box"></span>         <a href="javascript:;" class="js_edit_icon edit_oper"><i class="icon18_common edit_gray"></i></a></div>{/if}         </li>'),v=0,j=t("cardticket/parse_data.js"),k=function(t,e){
if(!t||"string"!=typeof t)return t;
var i=/[^\x00-\xff]/g;
if(t.replace(i,"mm").length<=e)return t;
for(var s=Math.floor(e/2),r=s;r<t.length;r++)if(t.substr(0,r).replace(i,"mm").length>=e)return t.substr(0,r);
return t;
},x="自定义入口名称不能为空",w="自定义入口名称最多只能输入5个中文",b="自定义入口引导语最多只能输入6个中文";
l.prototype.init_title=function(){
this.$dom.find(".js_appmsg_url_intro").each(function(t){
$(this).text("入口"+_(t+1));
});
};
var y="自定义入口(选填)";
l.prototype.init_preview=function(t){
var e=this.opt,i=e.data;
this.$pre_dom=$("#js_custom_url_preview"),this.$pre_dom.html(""),t||(t=i.config_url),
t&&t.length?$("#js_config_url_toolbar").addClass("border"):$("#js_config_url_toolbar").removeClass("border"),
t&&t.length||(t=[{
name:y
}]);
for(var s=0;s<t.length;s++){
var r=$.extend(!0,{},t[s]);
r.is_last=s==t.length-1,r.showmask=!1,r.name||(r.name=y),r.name!==y&&(r.name=k(r.name,10)),
r.tips=k(r.tips,12),this.$pre_dom.append(g(r));
}
},l.prototype.add=function(e){
if(this.is_max())return!1;
var i=this.opt,s=$(i.container);
e||(e=[{
url_type:1
}]);
for(var r=0;r<e.length;r++)e[r].idx=v++,e[r].cur_idx=++this.cur_len;
var l=this;
this.config_url=this.config_url?this.config_url.concat(e):e;
var _=$(m({
data:{
config_url:e
},
can_merchant:i.can_merchant
}));
s.append(_),u({
container:_.find(".js_maxlength")
}),_.each(function(){
if($(this).hasClass("js_appmsg_url_item")){
var t=$(this).find(".js_jump_url_p input[type=radio]");
t.checkbox({
onChanged:function(t){
o(t,l.config_url);
}
}),o(t.filter("input:checked"),l.config_url);
}
}),_.find("input.js_custom_url_name").keyup(function(){
var t=$(this).closest(".js_appmsg_url_item"),e=t.index(),i=l.$pre_dom,s=k($(this).val(),12);
s||(s=y),$(i.find(".js_custom_url_name_pre")[e]).text(s),n($(this));
}).blur(function(){
n($(this));
}),_.find("input.js_custom_url_desc").keyup(function(){
var t=$(this).closest(".js_appmsg_url_item"),e=t.index(),i=l.$pre_dom,s=k($(this).val(),12);
$(i.find(".js_custom_url_tips_pre")[e]).text(s),a($(this));
}).blur(function(){
a($(this));
});
var c=t("media/appmsg_temp_url.js");
c(s,".js_preview"),this._init&&i.onchanged&&i.onchanged(),this._init=!0;
var p=this.check(!1,1);
return this.init_preview(p),!0;
},l.prototype.is_max=function(){
var t=this.$dom;
return t.find(".js_appmsg_url_item").length>=this.opt.max;
};
var z=/^http(s)?:\/\//;
return l.prototype.check=function(t,e){
var i=this.$dom,s=i.find(".js_appmsg_url_item");
if(s.length>3)return p.err("最多只能添加3个自定义入口"),!1;
var r=!0,l={
custom_cell_size:s.length
};
return 1==e&&(l=[]),s.each(function(i){
var s=$(this),_=s.find(".js_custom_url_name"),c=s.find(".js_custom_url_desc"),o=$.trim(_.val()),u=$.trim(c.val()),m=$.trim(s.find(".js_link_url").attr("href"));
return t?(r=n(_),r&&(r=a(c)),m||(m=$.trim(s.find(".js_link_url").val())),r&&!m&&(p.err("自定义入口跳转链接不能为空"),
r=!1),r&&!z.test(m)&&(m="http://"+m),r?void(1==e?l.push({
name:o,
tips:u,
url:m
}):(l["custom_cell_name_"+i]=o,l["custom_cell_tips_"+i]=u,l["custom_cell_url_"+i]=m)):!1):void(1==e?l.push({
name:o,
tips:u,
url:m
}):(l["custom_cell_name_"+i]=o,l["custom_cell_tips_"+i]=u,l["custom_cell_url_"+i]=m));
}),r?l:r;
},l.prototype.val=function(){
return this.check(!0);
},l;
});