define("advanced/menuSetting.js",["common/wx/Tips.js","common/wx/tooltip.js","common/wx/simplePopup.js","common/wx/popover.js","common/wx/dialog.js","common/wx/Cgi.js","common/wx/richEditor/msgSender.js","common/wx/media/factory.js","common/qq/mask.js","biz_common/xss.js","biz_common/moment.js","common/wx/inputCounter.js","advanced/menu_link_dialog.js","cardticket/parse_data.js","common/wx/ban.js","common/qq/emoji.js","biz_web/lib/json.js","biz_common/jquery.ui/jquery.ui.sortable.js","tpl/advanced/menu_link_weapp_dialog.html.js"],function(e){
"use strict";
function t(e){
for(var i in e)e.hasOwnProperty(i)&&("string"==typeof e[i]?"value"==i&&1==e.type||(e[i]=e[i].html(!1)):"object"==typeof e[i]&&("txt_data"==i||t(e[i])));
return e;
}
function i(e,t){
for(var i=t.length,s=0;i>s;s++){
var a=!1;
if(t[s].act_list.length){
for(var n=0;n<t[s].act_list.length;n++)if(t[s].act_list[n].retcode==e){
$(".jslevel1").eq(s).children("a").trigger("click"),a=!0;
break;
}
}else for(var n=0;n<t[s].sub_button_list.length;n++)for(var l=0;l<t[s].sub_button_list[n].act_list.length;l++)if(t[s].sub_button_list[n].act_list[l].retcode==e){
$(".jslevel1").eq(s).children("a").trigger("click"),$(".jslevel1").eq(s).find(".jslevel2").eq(n).children("a").trigger("click"),
a=!0;
break;
}
if(a)break;
}
}
function s(e){
this.data=e;
}
function a(e,t){
var i=[],s=0,a=0;
$.each(e,function(e,t){
var n=t.url.html(!1);
if(n.match(/^http(s)?:\/\/mp.weixin.qq.com\/s/))s++,d.get({
url:n.replace(/^http:/,"https:")
},{
done:function(e){
a++,e&&e.title&&i.push({
i:t.i,
j:t.j,
name:"素材库",
title:e.title
});
},
fail:function(){
a++;
}
});else if(n.match(/^http(s)?:\/\/mp.weixin.qq.com\/mp\/profile_ext\?action=home\/\?__biz=([^&#]+)&wechat_redirect$/))i.push({
i:t.i,
j:t.j,
name:"历史消息"
});else if(n.match(/^http(s)?:\/\/mp.weixin.qq.com\/mp\/homepage\?__biz=([^&#]+)&hid=([^&#]+)&sn=([^&#]+)#wechat_redirect/)){
s++;
var l=n.html(!1).match(/[\?&]hid=(\d+)/);
l=l&&l[1],d.get({
url:"/advanced/homepage?t=homepage/edit&action=edit",
data:{
hid:l
},
dataType:"json"
},{
done:function(e){
a++,e&&e.name&&i.push({
i:t.i,
j:t.j,
name:"页面模版",
title:e.name
});
},
fail:function(){
a++;
}
});
}
});
var n=setInterval(function(){
a==s&&(t(i),clearInterval(n));
},500);
}
var n=e("common/wx/Tips.js"),l=(e("common/wx/tooltip.js"),e("common/wx/simplePopup.js"),
e("common/wx/popover.js")),r=e("common/wx/dialog.js"),d=e("common/wx/Cgi.js"),o=e("common/wx/richEditor/msgSender.js"),u=e("common/wx/media/factory.js"),c=e("common/qq/mask.js"),p=(e("biz_common/xss.js"),
e("biz_common/moment.js"),e("common/wx/inputCounter.js"),e("advanced/menu_link_dialog.js")),_=e("cardticket/parse_data.js"),h=e("common/wx/ban.js");
e("common/qq/emoji.js"),e("biz_web/lib/json.js"),e("biz_common/jquery.ui/jquery.ui.sortable.js"),
wx.cgiData.menu=t(wx.cgiData.menu);
var f,v=("1"==wx.cgiData.service_type||"0"==wx.cgiData.service_type)&&"1"!=wx.cgiData.is_wx_verify&&"1"!=wx.cgiData.is_qverify&&"3"!=wx.cgiData.is_wb_verify,m=!0,j="2"==wx.cgiData.service_type||"1"==wx.cgiData.service_type&&!("1"!=wx.cgiData.is_wx_verify&&"1"!=wx.cgiData.is_qverify&&"3"!=wx.cgiData.is_wb_verify),w=0;
s.prototype={
cgi:"/advanced/operselfmenu?op=update&f=json",
get:function(e){
var t;
return this.data.each(function(i){
i.id==e&&(t=i);
}),t;
},
getSub:function(e,t,i){
var s,a;
return i===!0?this.data.each(function(e){
e.subs&&e.subs.each(function(e){
return e.id==t?(a=e,!1):void 0;
});
}):(s=this.get(e),s.subs.each(function(e){
e.id==t&&(a=e);
})),a;
},
add:function(e,t){
var i=(new Date).getTime()+"_menu_"+this.data.length;
this.data.push({
name:e,
id:i,
type:1
}),this.post(t,i);
},
addSub:function(e,t,i){
e.type=0,e.act=null,e.subs||(e.subs=[]);
var s=(new Date).getTime()+"_subMenu_"+e.id+"_"+e.subs.length;
e.subs.push({
name:t,
id:s,
type:1
}),this.post(i,s);
},
del:function(e,t){
var i=this;
$.each(this.data,function(t,s){
return s.id==e?(i.data.splice(t,1),!1):void 0;
}),this.post(t);
},
delSub:function(e,t,i){
var s=this.get(e);
s.subs.each(function(e,i){
return e.id==t?(s.subs.splice(i,1),!1):void 0;
}),0==s.subs.length&&(s.type=1),this.post(i);
},
edit:function(e,t,i){
e.name=t,this.post(i);
},
sort:function(e,t){
var i=this,s=[],a=!1;
e.each(function(e){
var t=[];
e.subs.each(function(s){
t.push(i.getSub(e.id,s,!0));
});
var l=i.get(e.id);
return l=Object.clone(l,!0),l.subs=t,l.subs.length>5?(n.err("同一个一级菜单下最多只能添加五个二级菜单，当前已达设置上限"),
a=!0,!1):void s.push(l);
}),a||(i.data=s,this.post(t));
},
post:function(e,t){
var s=this;
d.post({
url:s.cgi,
data:{
info:s.adapt(s.data)
}
}).success(function(s){
if(0==s.base_resp.ret)e(),t&&$("#"+t).find(".inner_menu_link").trigger("click");else if(1==s.base_resp.ret)n.err("你的帐号尚未通过实名审核或已被警告限制，暂时无法使用该功能;");else if(7==s.base_resp.ret)n.err("保存失败，菜单设置无效，请检查");else if(13==s.base_resp.ret)n.err("保存失败，未认证订阅号的备用链接不可使用非该公众号创建的图文消息");else if(11==s.base_resp.ret)n.err("菜单跳转链接URL可能存在安全风险，请检查");else if(105==s.base_resp.ret)n.err("保存失败，未认证的订阅号不可添加自定义外链");else if(1530501==s.base_resp.ret){
var a=s&&s.invalid_menu_info&&s.invalid_menu_info.button_list||[];
i(1530501,a),$(".js_warn").text("请勿添加其他公众号的主页链接").show();
}else if(1530508==s.base_resp.ret){
var a=s&&s.invalid_menu_info&&s.invalid_menu_info.button_list||[];
i(1530508,a),$("#urlText").focus(),$(".js_warn").text("链接已失效，请在手机端重新复制链接").show();
}else n.err("系统发送异常失败，页面即将重置刷新"),setTimeout(function(){
d.handleRet(s,{
id:"64524",
key:"0",
showMsg:!1
}),location.reload(!0);
},3e3);
});
},
adapt:function(e){
function t(e){
if(e){
var t={};
return $.each(e,function(e,i){
e.endsWith("_data")&&"weapp_data"!==e||("value"==e?t.value=(i+"").html(!1):t[e]=i);
}),[t];
}
return[];
}
var i=[];
return $.each(e,function(e,s){
var a={
name:s.name.html(!1),
type:s.type
};
a.act_list=[],s.subs&&s.subs.length>0?(a.sub_button_list=[],$.each(s.subs,function(e,i){
a.sub_button_list.push({
name:i.name.html(!1),
act_list:t(i.act),
type:i.type,
sub_button_list:[]
});
})):a.act_list=t(s.act),i.push(a);
}),JSON.stringify2({
version:wx.cgiData.menu.version,
name:wx.cgiData.menu.name,
button_list:i
});
},
getExtraInfo:function(e){
var t=this,i=[];
$.each(this.data,function(e,t){
return t.type&&2==t.type&&t.act&&t.act.value?void i.push({
i:e,
url:t.act.value
}):void(t.subs&&$.each(t.subs,function(t,s){
s.type&&2==s.type&&s.act&&s.act.value&&i.push({
i:e,
j:t,
url:s.act.value
});
}));
}),a(i,function(i){
$.each(i,function(e,i){
var s=null;
"undefined"!=typeof i.i&&"undefined"!=typeof i.j?s=t.data[i.i].subs[i.j]:"undefined"!=typeof i.i&&(s=t.data[i.i]),
s.act&&s.act.name&&s.act.title&&(s.act.name=i.name,s.act.title=i.title);
}),i.length&&e();
});
}
};
var g,b=function(){
function e(){
if(h(wx.cgiData.func_ban_info,"menu")){
if(void 0==wx.cgiData.menu)return x.init(),void q();
t(),L.init(),z.init(),x.init(),q();
}
}
function t(){
wx.cgiData.menu=wx.cgiData.menu;
var e=[];
$.each(wx.cgiData.menu&&wx.cgiData.menu.button_list,function(t,i){
var s={
name:i.name,
id:"menu_"+t,
type:i.type
};
if(i.sub_button_list.length>0){
var a=[];
$.each(i.sub_button_list,function(e,t){
a.push({
name:t.name,
act:t.act_list[0],
id:"subMenu_"+s.id+"_"+e,
type:t.type
});
}),s.subs=a;
}else s.act=i.act_list[0];
e.push(s);
}),g=new s(e),window.myMenu=g,g.getExtraInfo(function(){
var e,t=$("#menuList .selected");
t.hasClass("jslevel1")?e=g.get(t.id):t.hasClass("jslevel2")&&(e=g.getSub(t.parents("li.jslevel1").attr("id"),t.get(0).id)),
e&&$("#view").is(":visible")&&S.refresh(e),e&&e.act&&e.act.value&&$("#url").is(":visible")&&S.ui.url(e.act.value,e),
e&&e.act&&e.act.value&&$("#weapp").is(":visible")&&S.refresh(e);
});
}
return{
init:e
};
}(),x=function(){
function e(){
t(),a();
}
function t(){
var e=MenuData;
e.is.isOpen?i(e):($(".js_menuBox").show(),$("#menustatus_5").show(),$("#menu_container").remove(),
$(".js_startMenuBox").remove(),$(".js_editBox").remove(),$("#menustatus_1,#menustatus_2,#menustatus_3,#menustatus_4").remove());
}
function i(e){
!e.is.selfMenu||parseInt(e.selfMenu.lastTime)||parseInt(e.selfMenu.hasButton)?e.is.selfMenu?e.selfMenu.lastTime&&($(".js_menuBox").show(),
$("#menuList").children(".jslevel1").length?(S.ui.none("点击左侧菜单进行编辑操作"),$(".jslevel1").length&&($(".jslevel1").eq(0).children("a").trigger("click"),
$(".jslevel1").eq(0).find(".jslevel2").length&&$(".jslevel1").eq(0).find(".jslevel2").eq(0).children("a").trigger("click")),
"1"==e.selfMenu.useMpOrApi&&"0"==e.selfMenu.usePersonalizedMenu?$("#menustatus_6").show():"1"==e.selfMenu.useMpOrApi&&"1"==e.selfMenu.usePersonalizedMenu?$("#menustatus_7").show():"0"==e.selfMenu.useMpOrApi&&"1"==e.selfMenu.usePersonalizedMenu?"1"==e.selfMenu.status?$("#menustatus_10").show():"2"==e.selfMenu.status?$("#menustatus_9").show():"3"==e.selfMenu.status&&$("#menustatus_8").show().find(".js_waitHour").text(e.selfMenu.leftTime):"1"==e.selfMenu.status?$("#menustatus_1").show():"2"==e.selfMenu.status?$("#menustatus_2").show():"3"==e.selfMenu.status?$("#menustatus_3").show().find(".js_waitHour").text(e.selfMenu.leftTime):$("#menustatus_2").show()):(S.ui.none(""),
"0"==e.selfMenu.useMpOrApi&&"1"==e.selfMenu.usePersonalizedMenu?$("#menustatus_9").show():$("#menustatus_2").show(),
$(".js_menu_setting_tips").hide())):($(".js_menuBox").show(),$("#menustatus_4").show(),
$(".js_editBox").remove()):($(".js_menuBox").show(),$(".js_editBox").hide(),$(".js_startMenuBox").show(),
$(".js_openMenu").on("click",function(){
$(".js_startMenuBox").hide(),$(".js_editBox").show(),S.ui.none("点击左侧的加号，添加菜单。"),
$("#menustatus_2").show(),$(".js_addL1Btn").trigger("click");
}));
}
function s(){
"0"==MenuData.selfMenu.useMpOrApi&&"1"==MenuData.selfMenu.usePersonalizedMenu?($(".js_menustatus").hide(),
$("#menustatus_9").show()):"1"==MenuData.selfMenu.useMpOrApi&&"0"==MenuData.selfMenu.usePersonalizedMenu||"1"==MenuData.selfMenu.useMpOrApi&&"1"==MenuData.selfMenu.usePersonalizedMenu||($(".js_menustatus").hide(),
$("#menustatus_2").show());
}
function a(){
function e(e){
for(var t=0,i=0;i<e.length;i++){
var s=e.charCodeAt(i);
s>=1&&126>=s||s>=65376&&65439>=s?t++:t+=2;
}
return t;
}
$(".js_menu_name").on("blur",function(){
var t=$("#menuList").find(".selected").attr("id"),i=$.trim($(this).val()),s=e($(this).val()),a=function(t){
for(var s=1;t>=s;s++)if(e(i.substring(0,s+1))>t)return s;
};
if($(this).val(i),$(".js_titleEorTips").hide(),$("#"+t).hasClass("jslevel1")){
s>8?(i=i.substring(0,a(8)),$(this).val(i)):0==s&&(i="菜单名称",$(".js_titlenoTips").show().text("请输入菜单名称"));
var n=g.get(t);
g.edit(n,i,function(){
if($(".jslevel1").filter(".selected").attr("id")==t){
$(".js_second_title_bar h4").text(i);
var e=$("#"+t).find(".jslevel2").length;
5>e&&e>0?S.ui.innernone("已添加子菜单，仅可设置菜单名称。"):5==e&&S.ui.innernone("已为“%s”添加了5个子菜单，无法设置其他内容。".sprintf($.trim(i)));
}
$("#"+t).children("a").find(".js_l1Title").text(i),x.refreshTips();
});
}else if($("#"+t).hasClass("jslevel2")){
var l=$(".jslevel2").filter(".selected").parents(".jslevel1").attr("id"),n=g.getSub(l,t);
s>16?(i=i.substring(0,a(16)),$(this).val(i)):0==s&&(i="子菜单名称",$(".js_titlenoTips").show().text("请输入子菜单名称")),
g.edit(n,i,function(){
$(".jslevel2").filter(".selected").attr("id")==t&&$(".js_second_title_bar h4").text(i),
$("#"+t).children("a").find(".js_l2Title").text(i),x.refreshTips();
});
}
}).on("input propertychange",function(){
$(".js_titlenoTips").hide();
var t=e($(this).val()),i=$("#menuList").find(".selected").attr("id");
$("#"+i).hasClass("jslevel1")?t>8?$(".js_titleEorTips").show():$(".js_titleEorTips").hide():$("#"+i).hasClass("jslevel2")&&(t>16?$(".js_titleEorTips").show():$(".js_titleEorTips").hide());
}),$(".js_radio_sendMsg,.js_radio_url,.js_radio_weapp").click(function(){
$(this).hasClass("selected")||($(".js_warn").hide(),$(this).siblings(".selected").removeClass("selected"),
$(this).addClass("selected"),$(this).hasClass("js_radio_sendMsg")?($("#edit").show(),
"0"==$(this).attr("data-editing")&&($(this).attr("data-editing","1"),S.ui.edit()),
$("#url").hide(),$("#weapp").hide()):$(this).hasClass("js_radio_url")?"0"==$(this).attr("data-editing")?(S.ui.url(),
$("#edit").hide(),$("#url").show(),$("#weapp").hide(),$(this).attr("data-editing","1")):($("#edit").hide(),
$("#url").show(),$("#weapp").hide()):$(this).hasClass("js_radio_weapp")&&("0"==$(this).attr("data-editing")?(S.ui.weapp(),
$("#edit").hide(),$("#url").hide(),$("#weapp").show(),$(this).attr("data-editing","1")):($("#edit").hide(),
$("#url").hide(),$("#weapp").show())),x.refreshTips());
}),$(".detail_desc").click(function(){
$("#detail_pop").popup({
buttons:[{
text:"我知道了",
click:function(){
this.hide();
},
type:"primary"
}],
title:"提示"
});
});
var t=function(){
return new p({
can_use_homepage:wx.cgiData.can_use_homepage,
biz:wx.cgiData.biz,
link:1,
onOK:function(e){
if(e){
var t=e,i=t.title,s=t.link;
s&&($("#urlText").val(s).data("url",s).closest(".frm_control_group").show(),$("#js_urlTitle").show().find(".js_name").text(t.name),
i?$("#js_urlTitle").find(".js_title").text(i).parent().show():$("#js_urlTitle").find(".js_title").text("").parent().hide(),
$("#urlUnSelect").hide(),S.autoSaveEdit()),$("#js_appmsgPop").hide(),$("#js_reChangeAppmsg").css({
display:"inline-block"
});
}
}
}),!1;
};
$("#js_appmsgPop,#js_reChangeAppmsg").on("click",t),$("#urlText").on("keyup propertychange",function(){
$(".js_warn").hide();
var e=$(this),t=e.val().trim(),i=e.data("url");
i&&t==i?($("#js_urlTitle").show(),$("#js_reChangeAppmsg").show().css({
display:"inline-block"
}),$("#js_appmsgPop").hide()):($("#js_appmsgPop").show(),$("#js_reChangeAppmsg").hide(),
$("#js_urlTitle").hide(),$("#js_urlTitle").find(".js_name").text(""),$("#js_urlTitle").find(".js_title").text("")),
t&&t.match(/\:\/\/mp\.weixin\.qq\.com\/.*[\?&]tempkey=/)&&new l({
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
this.remove();
}
}]
});
}).on("blur",function(){
S.autoSaveEdit();
}),$(".js_editorArea").on("keyup",function(){
$(".js_warn").hide();
});
}
return{
init:e,
refreshTips:s
};
}(),k=function(){
function e(e,i){
t[e]&&i&&i(t[e]),d.get("/merchant/electroniccardmgr?action=get&card_id="+e,function(s){
if(0==s.base_resp.ret){
if(s.card_detail){
var a=$.parseJSON(s.card_detail);
a=_.parse_cardticket(a),t[e]=a,i&&i(a);
}
}else d.handleRet(s,{
id:"64524",
key:"2",
msg:"系统繁忙"
});
});
}
var t={};
return{
getCardData:e
};
}(),y=e("tpl/advanced/menu_link_weapp_dialog.html.js"),T=null,C=function(e){
for(var t=0;t<T.length;t++)if(T[t].appid===e)return T[t];
return null;
},M=function(e){
$(".js_link_weapp_loading").show(),d.get({
url:"/advanced/operselfmenu?action=get_bind_wxopen_info"
},function(t){
$(".js_link_weapp_loading").hide(),0==t.base_resp.ret&&t.bind_info?(T=JSON.parse(t.bind_info).bind_list,
e()):(d.handleRet(t,{
id:"64524",
key:"2",
msg:"系统繁忙"
}),e(new Error));
});
};
$(".js_weapp_select").click(function(e){
e.preventDefault();
var t=$("#weappSettingsForm"),i=t.find(".js_weapp_appid").val(),s=$(y).popup({
title:"选择小程序",
className:"weapp_select_dialog",
data:{
list:T||[]
},
onOK:function(){
t.find(".js_weapp_appid").val(i),t.find(".js_weapp_select_group").hide(),t.find(".js_weapp_path_group").show(),
t.find(".js_weapp_title").text(C(i).nick_name),t.find(".js_weapp_path").val(C(i).main_page);
var e=C(i);
t.find(".js_weapp_service_type").val(e.service_type),4==e.service_type?t.find(".js_weapp_type4").show():t.find(".js_weapp_type4").hide();
},
onCancel:function(){
this.remove();
}
}),a=s.find(".js_weapplink_item_inner").click(function(){
a.find(".js_weapplink_select_mask").hide(),$(this).find(".js_weapplink_select_mask").show(),
i=$(this).data("appid");
}).each(function(){
i===$(this).data("appid")&&$(this).find(".js_weapplink_select_mask").show();
});
});
var D=function(){
var e=$("#weappSettingsForm"),t=e.find(".js_weapp_appid").val();
return t?{
type:13,
value:e.find(".js_weapp_backup_url").val().trim(),
weapp_data:{
appid:t,
path:e.find(".js_weapp_path").val().trim(),
service_type:e.find(".js_weapp_service_type").val()
}
}:null;
};
$("#js_weapp_appmsgPop, #js_weapp_reChangeAppmsg").click(function(){
var e=$(this);
return new p({
can_use_homepage:wx.cgiData.can_use_homepage,
biz:wx.cgiData.biz,
link:1,
onOK:function(t){
if(t){
var i=t,s=i.title,a=i.link,n=e.closest(".js_weapp_backup_url_input_wrapper");
a&&(n.find(".js_weapp_backup_url").val(a).data("url",a),n.find(".js_weapp_url_title").show().find(".js_name").text(i.name).end().find(".js_title").text(s).end(),
s?n.find(".js_weapp_url_title .js_title").parent().show():n.find(".js_weapp_url_title .js_title").parent().hide(),
$("#js_weapp_appmsgPop").hide(),$("#js_weapp_reChangeAppmsg").css("display","inline-block"),
S.autoSaveEdit());
}
}
}),!1;
});
var B=function(e){
$(".js_weapp_no_binded_hint").hide(),$("#weappSettingsForm").hide();
var t=function(t){
if(!t)if(T&&T.length){
var i=$("#weappSettingsForm").show(),s=null;
e&&e.weapp_data&&(s=C(e.weapp_data.appid)),s?(s.appid?(i.find(".js_weapp_select_group").hide(),
i.find(".js_weapp_path_group").show(),i.find(".js_weapp_appid").val(s.appid),i.find(".js_weapp_title").text(s.nick_name),
i.find(".js_weapp_path").val(e.weapp_data.path),i.find(".js_weapp_service_type").val(s.service_type),
4==s.service_type?i.find(".js_weapp_type4").show():i.find(".js_weapp_type4").hide()):(i.find(".js_weapp_select_group").show(),
i.find(".js_weapp_path_group").hide(),i.find(".js_weapp_appid").val(""),i.find(".js_weapp_title").text(""),
i.find(".js_weapp_path").val("")),i.find(".js_weapp_backup_url").val(e.value)):(i.find(".js_weapp_select_group").show(),
i.find(".js_weapp_path_group").hide(),i.find(".js_weapp_appid").val(""),i.find(".js_weapp_title").text(""),
i.find(".js_weapp_path").val(""),i.find(".js_weapp_backup_url").val("")),j?(i.find(".js_weapp_backup_url_input").removeClass("disabled").find("input").removeAttr("disabled"),
i.find(".js_weapp_backup_url_select").hide()):(i.find(".js_weapp_backup_url_input").addClass("disabled").find("input").attr("disabled","disabled"),
i.find(".js_weapp_backup_url_select").show());
}else $(".js_weapp_no_binded_hint").show();
};
T?t():M(t);
},L=function(){
function e(){
t(),s();
}
function t(){
var e="";
$("#menuList").html(template.render("tpl",g)),$(g.data).each(function(e,t){
t.subs&&t.subs.length?$("#"+t.id).find(".js_icon_menu_dot").show():$("#"+t.id).find(".js_icon_menu_dot").hide();
});
var t=parseInt($("#menuList").children(".jslevel1").length)+1,i=$("#menuList").children(".jslevel1");
i.removeClass("size1of1 size1of2 size1of3"),$("#menuList").children(".js_addMenuBox").removeClass("size1of1 size1of2 size1of3"),
3>=t?(i.addClass("size1of"+t),$("#menuList").children(".js_addMenuBox").addClass("size1of"+t)):i.addClass("size1of"+(t-1)),
$("#menuList").children(".jslevel1").length?($("#menuList").find(".js_addL1Btn").find(".js_addMenuTips").remove(),
$("#orderBt").css({
display:"inline-block"
}),$("#pubBt,#viewBt").show(),$("#menuList").removeClass("no_menu")):($("#menuList").find(".js_addL1Btn").append('<span class="js_addMenuTips">添加菜单</span>').parents("#menuList").addClass("no_menu"),
$("#orderBt,#pubBt,#viewBt,#orderDis").hide()),$(".jslevel1").length>1||$(".jslevel2").length>1?($("#orderBt").css({
display:"inline-block"
}),$("#orderDis").hide()):($("#orderBt").hide(),$(".jslevel1").length>=1&&$("#orderDis").css({
display:"inline-block"
})),e&&($("#"+e).addClass("selected"),e=""),$(".jsMenu").sortable({
items:".jslevel2",
placeholder:"menu_sub_drag_placeholder",
dropOnEmpty:!0,
start:function(e,t){
t.item.addClass("dragging");
},
stop:function(e,t){
t.item.removeClass("hover").removeClass("dragging");
}
}),$(".jsMenu").sortable("disable"),$("#menuList").sortable({
items:".jsMenu",
placeholder:"menu_drag_placeholder",
dropOnEmpty:!0,
start:function(e,t){
t.item.addClass("dragging"),t.item.siblings("li.drag_placeholder").removeClass("size1of1 size1of2 size1of3").addClass("size1of"+(parseInt($("#menuList").children(".jslevel1").length)+1));
},
stop:function(e,t){
t.item.removeClass("dragging");
}
}),$("#menuList").sortable("disable");
}
function i(){
return a;
}
function s(){
var e,i=function(){
return $(this).parent("li").hasClass("selected")?!1:(w>1&&(S.autoSaveEdit(),x.refreshTips()),
w+=$(this).siblings(".js_l2TitleBox").find(".jslevel2").length?1:2,$(".jslevel1,.jslevel2").removeClass("current"),
$(this).parent("li").addClass("current"),$("#js_rightBox").show(),$(".js_titlenoTips").hide(),
$("#js_none").hide(),$("#js_innerNone").hide(),$("#js_innerNone").siblings("div").show(),
$("#js_errTips").hide(),$(".msg_sender:visible").removeClass("error"),$(".js_radio_sendMsg:visible").attr("data-editing","0"),
$(".js_radio_url:visible").attr("data-editing","0"),m?$(".js_radio_weapp").show():$(".js_radio_weapp").hide(),
$(".js_radio_weapp:visible").attr("data-editing","0"),$(".js_titleNolTips").show().text("字数不超过4个汉字或8个字母"),
$(".js_menuTitle").text("菜单名称"),$(".js_menuContent").text("菜单内容"),$("#jsDelBt").text("删除菜单"),
$(".js_l2TitleBox").hide(),$(this).siblings(".js_l2TitleBox").show(),5==$(this).siblings(".js_l2TitleBox").find(".jslevel2").length&&$(this).siblings(".js_l2TitleBox").find(".js_addL2Btn").parent("li.js_addMenuBox").hide(),
$("#menuList").find("li").removeClass("selected"),$(this).parent().addClass("selected"),
$(".js_menu_name").val($.trim($(this).text())),$(".js_second_title_bar h4").text($(this).text()),
a=g.get($(this).parent().eq(0).attr("id")),S.refresh(a),!1);
};
$("#menuList").on("click","li.jslevel1>a",i);
var s=function(){
return $(this).parent().hasClass("selected")?!1:(w>1&&(S.autoSaveEdit(),x.refreshTips()),
w+=1,$(".jslevel1,.jslevel2").removeClass("current"),$(this).parent("li").addClass("current"),
$("#js_rightBox").show(),$("#js_none").hide(),$(".js_titlenoTips").hide(),$("#js_innerNone").hide(),
$("#js_innerNone").siblings("div").show(),$("#js_errTips").hide(),$(".msg_sender:visible").removeClass("error"),
$(".js_radio_sendMsg:visible").attr("data-editing","0"),$(".js_radio_url:visible").attr("data-editing","0"),
$(".js_radio_weapp:visible").attr("data-editing","0"),m?$(".js_radio_weapp").show():$(".js_radio_weapp").hide(),
$(".js_menu_name").val($.trim($(this).text())),$(".js_titleNolTips").show().text("字数不超过8个汉字或16个字母"),
$(".js_menuTitle").text("子菜单名称"),$(".js_menuContent").text("子菜单内容"),$("#jsDelBt").text("删除子菜单"),
$("#menuList").find("li").removeClass("selected"),$(this).parent().addClass("selected"),
$(".js_second_title_bar h4").text($(this).text()),a=g.getSub($(this).parents("li.jslevel1").attr("id"),$(this).parent("li.jslevel2").attr("id")),
S.refresh(a),!1);
};
$("#menuList").on("click","li.jslevel2>a",s);
var l=null,d=null;
$("#orderBt").click(function(){
$(".jslevel2").filter(".selected").length?(d=$(".jslevel2").filter(".selected").attr("id"),
l=$(".jslevel2").filter(".selected").parents(".jslevel1").attr("id")):$(".jslevel1").filter(".selected").length?(d=null,
l=$(".jslevel1").filter(".selected").attr("id")):(d=null,l=null),$(this).hide(),
$("#finishBt").css({
display:"inline-block"
}),$("#menuList").addClass("sorting"),$("#pubBt,#viewBt").hide(),$(".js_addL2Btn").parent("li.js_addMenuBox").hide(),
$(".js_addL1Btn").parent("li.js_addMenuBox").hide();
var t=parseInt($("#menuList").children(".jslevel1").length),i=$("#menuList").children(".jslevel1");
return i.removeClass("size1of1 size1of2 size1of3"),$("#menuList").children(".js_addMenuBox").removeClass("size1of1 size1of2 size1of3"),
3>=t?(i.addClass("size1of"+t),$("#menuList").children(".js_addMenuBox").addClass("size1of"+t),
$(".js_l2TitleBox:visible").find(".jslevel2").length||$(".js_l2TitleBox:visible").hide(),
$("#menuList").find("li.jslevel1>a").unbind("click").click(function(){
return $(".js_l2TitleBox").hide(),$(this).siblings(".js_l2TitleBox").find(".jslevel2").length&&$(this).siblings(".js_l2TitleBox").show(),
!1;
}),$("#menuList").find("li.jslevel2>a").unbind("click").click(function(){
return!1;
}),e=Object.clone(g.data,!0),$("#menuList").sortable("enable"),$(".jsMenu").sortable("enable"),
S.ui.rankTips(1),x.refreshTips(),!1):void 0;
}),$("#finishBt").click(function(){
$(this).hide(),$("#orderBt").css({
display:"inline-block"
}),$(".js_l2TitleBox").hide(),$("#pubBt,#viewBt").show(),$(".js_addL2Btn").parent("li.js_addMenuBox").show(),
$("#menuList").removeClass("sorting"),$("#menuList").find("li.jslevel1>a").unbind("click").click(function(){
return!1;
}),$("#menuList").find("li.jslevel2>a").unbind("click").click(function(){
return!1;
});
var e=[];
return $(".jslevel1").each(function(t,i){
var s={
id:i.id,
subs:[]
};
$(i).find(".jslevel2").each(function(e,t){
s.subs.push(t.id);
}),e.push(s);
}),g.sort(e,function(){
t(),n.suc("菜单排序成功"),$("#menuList").find("li.jslevel1>a").click(i),$("#menuList").find("li.jslevel2>a").click(s),
d&&l?($("#"+l+">a").trigger("click"),$("#"+d+">a").trigger("click")):l&&$("#"+l+">a").trigger("click"),
l=null,d=null;
}),$("#menuList").removeClass("sorting"),$("#menuList").sortable("disable"),x.refreshTips(),
S.ui.rankTips(0),!1;
}),$("#menuList").on("click",".js_addL1Btn",function(){
return $("#menuList").find(".jslevel1").length>=3?(n.err("最多只能添加三个主菜单，当前已达设置上限"),
!1):(g.add("菜单名称",function(){
t(),$(".jslevel1").last().children("a").trigger("click"),$(".jslevel1,.jslevel2").removeClass("current"),
$(".jslevel1").last().addClass("current"),$(this).parent("li").addClass("current"),
$(".js_menu_name").select(),x.refreshTips(),$(".js_menu_setting_tips").show();
}),!1);
}),$("#menuList").on("click",".js_addL2Btn",function(){
if(S.autoSaveEdit(),$(this).parent("li").siblings(".jslevel2").length>=5)return n.err("该菜单最多只能添加5个子菜单，已达到设置上限"),
!1;
var e=$(this).parents(".jslevel1").eq(0).attr("id"),i=g.get(e),s=$(this),a=function(){
g.addSub(i,"子菜单名称",function(){
t(),$("#"+s.parents(".jslevel1").attr("id")).children("a").trigger("click"),$("#"+s.parents(".jslevel1").attr("id")).find(".jslevel2").last().children("a").trigger("click"),
$(".jslevel1,.jslevel2").removeClass("current"),$("#"+s.parents(".jslevel1").attr("id")).find(".jslevel2").last().addClass("current"),
$(".js_menu_name").select();
}),x.refreshTips();
};
return i.act&&!$("#"+e).find(".jslevel2").length?r.show({
type:"warn",
msg:"子菜单确认|添加子菜单后，一级菜单的内容将被清除。确定添加子菜单？",
buttons:[{
text:"确定",
click:function(){
this.hide(),a();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
}):a(),!1;
}),$("#jsDelBt").on("click",function(){
$(".js_titlenoTips").hide();
var e=$("#menuList").find(".selected").attr("id"),i=$("<div>").text("删除确认|删除后“%s”菜单下设置的内容将被删除".sprintf($(".js_menu_name:visible").val())).html();
if($("#"+e).hasClass("jslevel1"))r.show({
type:"warn",
msg:i,
buttons:[{
text:"确定",
click:function(){
g.del(e,function(){
n.suc("成功删除菜单“%s”".sprintf($.trim($(".js_menu_name").val()))),t(),x.refreshTips(),
S.ui.none($("#menuList").children(".jslevel1").length?"点击左侧菜单进行编辑操作":"");
}),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});else if($("#"+e).hasClass("jslevel2")){
var s=$("#"+e).parents("li").eq(0).attr("id");
r.show({
type:"warn",
msg:i,
buttons:[{
text:"确定",
click:function(){
g.delSub(s,e,function(){
n.suc("成功删除子菜单“%s”".sprintf($("#"+e).find("a").text())),S.ui.none("点击左侧菜单进行编辑操作"),
t();
}),x.refreshTips(),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
}
return x.refreshTips(),!1;
});
}
var a;
return{
init:e,
refresh:t,
getData:i
};
}(),S=function(){
function e(){
S.ui.none("点击左侧菜单进行编辑操作"),$("#none .initialCreate").hide(),t();
}
function t(){
var e="disabled";
v&&$("#urlText").attr(e,e).parent().addClass(e),$("#sendMsg").click(function(){
return r.edit(),x.refreshTips(),!1;
}),$("#goPage").click(function(){
return r.url(),x.refreshTips(),!1;
}),$("#urlBack").click(function(){
return r.data.act?r.view():r.index(),!1;
}),$("#editBack").click(function(){
return i(L.getData()),!1;
});
}
function i(e){
if(e)switch($("#weapp").hide(),r.data=e,e&&e.type){
case 0:
var t=$("#"+e.id).find(".jslevel2").length;
5>t&&t>0?r.innernone("已添加子菜单，仅可设置菜单名称。"):5==t&&r.innernone("已为“%s”添加了5个子菜单，无法设置其他内容。".sprintf($.trim($("#"+e.id).children("a").text())));
break;

case 1:
e.act?r.edit():r.index(),$(".js_radio_sendMsg").addClass("selected"),$(".js_radio_url").removeClass("selected"),
$(".js_radio_weapp").removeClass("selected");
break;

case 2:
r.view(),$(".js_radio_sendMsg").removeClass("selected"),$(".js_radio_url").attr("data-editing","1"),
$(".js_radio_url").addClass("selected"),$(".js_radio_weapp").removeClass("selected");
break;

case 3:
e.act&&(e.act.source="file",e.act.id=e.act.file_id);
break;

case 5:
r.weapp(),$(".js_radio_sendMsg").removeClass("selected"),$(".js_radio_url").removeClass("selected"),
$(".js_radio_weapp").attr("data-editing","1"),$(".js_radio_weapp").addClass("selected");
break;

default:
r.none("点击左侧菜单继续编辑");
}
}
function s(e,t){
var i="",s=null;
if($("#edit").is(":visible")&&!$(".jsMsgSendTab:visible").length&&!$(".js_editorArea:visible").length||$(".js_editorArea:visible").length&&!$(".js_editorArea:visible:empty").length){
for(var a=0,l=$(".tab_content");a<l.length;a++)if($(l[a]).is(":visible")&&($($(l[a]).children(".inner").find(".edit_area")[1]).text()||$(l[a]).children(".inner").children("div").length)){
var o=f.getData(!0);
if(!o.error){
if(10==o.data.type?o.data.type=5:11==o.data.type?o.data.type=8:15==o.data.type?o.data.type=9:16==o.data.type?o.data.type=10:21==o.data.type&&(o.data.type=11),
o=o.data,r.data.act={
type:o.type,
value:o.app_id||o.file_id||o.cardid||o.content.html(!0),
_data:o
},r.data.act._data&&r.data.act._data.content&&(r.data.act._data.content=r.data.act._data.content.html(!0)),
e)return g.adapt(g.data);
g.post(function(){
t&&t();
});
}
w>1&&x.refreshTips();
break;
}
}else if($("#url").is(":visible")&&(!v&&$("#urlText").val().length||v&&$("#urlText").val().match(/http/g)))if(s=L.getData(),
i=$("#urlText").val().trim(),""==i&&v)$("#urlUnSelect").show();else{
if($("#urlUnSelect").hide(),i.startsWith("http://")||i.startsWith("https://")||(i="http://"+i),
0==i.indexOf("http://mp.weixin.qq.com/s")&&(i=i.replace(/#rd$/,"#wechat_redirect")),
!$.validator.rules.url(i))return $("#urlFail").show(),n.err("请输入正确的URL"),-1;
if($("#urlFail").hide(),s.type=2,s.act={
type:6,
value:i,
name:$("#js_urlTitle").find(".js_name").text(),
title:$("#js_urlTitle").find(".js_title").text()
},i=encodeURIComponent(i),d.get("/misc/checkurl?url="+i+"&f=json&action=check").success(function(e){
return"10302"==e.base_resp.ret?void n.err("填写url是黑名单地址"):void 0;
}),e)return g.adapt(g.data);
g.post(function(){
$("#urlFail").hide(),t&&t();
}),w>1&&x.refreshTips();
}else if($("#weapp").is(":visible")&&m&&D()){
s=L.getData();
var u=D();
if(i=u.value,4!=u.weapp_data.service_type&&""==u.weapp_data.path)n.err("请输入小程序路径");else if(4==u.weapp_data.service_type&&u.weapp_data.path&&!/^\?/.test(u.weapp_data.path))n.err("小程序路径参数请以?开头");else if(""==i)n.err("请输入正确的备用网页URL");else{
if(i.startsWith("http://")||i.startsWith("https://")||(u.value=i="http://"+i),0==i.indexOf("http://mp.weixin.qq.com/s")&&(i=i.replace(/#rd$/,"#wechat_redirect")),
!$.validator.rules.url(i))return n.err("请输入正确的备用网页URL"),-1;
if(s.type=5,s.act=u,i=encodeURIComponent(i),d.get("/misc/checkurl?url="+i+"&f=json&action=check").success(function(e){
return"10302"==e.base_resp.ret?void n.err("填写url是黑名单地址"):void 0;
}),e)return g.adapt(g.data);
g.post(function(){
t&&t();
}),w>1&&x.refreshTips();
}
}else t&&t();
}
function a(e,t){
function i(){
var i;
if(i=t.act?l(t.act):null,console.log("_data",i),!e)return r.data&&r.data.act&&r.data.act.type&&6==r.data.act.type?r.url(r.data.act.value,r.data):r.edit(),
x.refreshTips(),!1;
i&&u.render("#viewDiv",i),$("#editDiv").html(""),$.support.leadingWhitespace&&document.getSelection().removeAllRanges(),
$("#edit").show();
var s,a=i?{
data:i,
acl:wx.acl.msg_acl
}:{
acl:wx.acl.msg_acl
};
if(v){
var n=$.extend(!0,{},a);
n.acl.can_text_msg=0,s=n;
}else s=a;
f=new o("#editDiv",s),$(".tab_nav").children(1).attr("onclick","return false;"),
$(".js_tab_navs").children(".tab_nav").length<=4&&$(".js_switch_next").hide(),$("a.emotion_switch").on("click",function(){
return!1;
}),$("li.tab_cardmsg").insertAfter("li.tab_img");
var d="-"+$(".js_tab_navs").css("width"),c=function(e){
e?$(".js_tab_navs").animate({
"margin-left":d
},300):$(".js_tab_navs").css({
"margin-left":d
}),$(".js_switch_next").hide(),$(".js_switch_prev").show();
};
$(".tab_nav").each(function(e,t){
return $(t).hasClass("selected")&&e>3?(c(!1),!1):!0;
}),$(".js_switch_next").click(function(){
c(!0);
}),$(".js_switch_prev").click(function(){
$(".js_tab_navs").animate({
"margin-left":"0"
},300),$(".js_switch_next").show(),$(".js_switch_prev").hide();
});
}
if(t.act&&t.act.type&&10==t.act.type&&!t.act._data){
var s=t.act.value;
k.getCardData(s,function(e){
e._className="",t.act._data=e,i();
});
}else t.act&&t.act.type&&10==t.act.type&&(t.act._data._className=""),i();
}
function l(e){
if(!e)return null;
var t=null;
return Object.each(e,function(e,i){
return i.endsWith("_data")?(t=e,!1):void 0;
}),t&&(t.type=e.type,5==t.type?t.type=10:8==t.type?t.type=11:9==t.type?t.type=15:10==t.type?t.type=16:11==t.type&&(t.type=21)),
t;
}
var r={
none:function(e){
this.reset(),$("#js_rightBox").hide(),$("#js_none").show().text(e);
},
innernone:function(e){
$(".js_setNameBox").siblings("div").hide(),$("#js_innerNone").show().html(e);
},
index:function(){
this.reset(),a(!0,this.data),$("#edit").show(),$("#editDiv").children().length||(S.ui.edit(),
x.refreshTips()),$(".js_radio_sendMsg").addClass("selected"),$(".js_radio_url").addClass("selected"),
$(".js_radio_weapp").addClass("selected"),$("#url").hide();
},
url:function(e,t){
this.reset(),$("#js_urlTitle").find(".js_name").text(""),$("#js_urlTitle").find(".js_title").text(""),
v&&$("#urlText").attr("disabled","disabled").parent(".frm_input_box").addClass("disabled"),
!e&&v?$("#urlText").val("认证后才可手动输入地址"):$("#urlText").val(e&&e.html(!1)).focus(),
t&&t.act&&t.act.name?($("#js_urlTitle").show().find(".js_name").text(t.act.name),
t.act.title?$("#js_urlTitle").find(".js_title").text(t.act.title).parent().show():$("#js_urlTitle").find(".js_title").text("").parent().hide(),
$("#js_appmsgPop").hide(),v&&$("#urlText").attr("disabled","disabled").parent(".frm_input_box").addClass("disabled"),
$("#js_reChangeAppmsg").show().css({
display:"inline-block"
})):($("#js_urlTitle").hide(),$("#js_reChangeAppmsg").hide(),$("#js_appmsgPop").show()),
$("#url").show();
},
view:function(){
if(this.reset(),1==this.data.type)switch(this.data.act.type){
case 1:
$("#viewDiv").html(this.data.act.value.emoji());
break;

case 7:
$("#viewDiv").text("发送名片");
break;

default:
a(!1,this.data);
}else 2==this.data.type&&(6==r.data.act.type?r.url(r.data.act.value,r.data):r.edit());
$("#view").show();
},
weapp:function(){
this.reset(),B(this.data.act),$("#weapp").show();
},
initialView:function(){
0==$("#menuList").children(".jsMenu").length?($(".menu_setting_empty_wrp").show(),
$(".menu_setting_area").hide(),$(".js_totaltool_bar").hide()):($(".menu_setting_empty_wrp").hide(),
$(".menu_setting_area").show(),$(".js_totaltool_bar").show());
},
edit:function(){
this.reset(),$("#edit").show(),$(".jsmsgSenderDelBt").each(function(e,t){
$(t).parent().siblings(".jsMsgSendTab").show(),$(t).parent().remove();
}),2==this.data.type&&(this.data.type=1,this.data.act=null),a(!0,this.data);
},
reset:function(){
$(".jsMain").hide(),$("#changeBt").hide(),$("#urlFail").hide(),$("#urlUnSelect").hide();
},
rankTips:function(e){
1==e?(this.none("请通过拖拽左边的菜单进行排序"),$(".initialCreate").hide()):0==e&&this.none("点击左侧菜单进行编辑操作");
}
};
return{
init:e,
refresh:i,
getData:l,
autoSaveEdit:s,
ui:r
};
}(),z=function(){
function e(){
$("#viewBt").click(function(){
var e=$(this);
e.btn(!1);
var t=S.autoSaveEdit(!1,function(){
e.btn(!0),$("#mobileDiv:hidden").length>0&&(c.show({
spin:!1
}),$("#viewList").html(template.render("viewTpl",g)),$(".js_preview_weapp_wrapper").hide(),
$("#mobileDiv").show());
});
return-1==t&&e.btn(!0),!1;
}),$("#viewClose").click(function(){
return c.hide(),$("#mobileDiv").hide(),$("#viewShow").html(""),!1;
}),$("#viewList").on("click",".jsView",function(){
$(this).parent().siblings().find(".jsSubViewDiv").hide();
var e=g.get($(this).parent()[0].id);
return e&&e.act?t(e.act):$(this).parent().find(".jsSubViewDiv").toggle(),!1;
}),$("#viewList").on("click",".jsSubView",function(){
var e=g.getSub($(this).parents(".jsViewLi")[0].id,$(this).parent()[0].id);
return e&&e.act&&t(e.act),$(".jsSubViewDiv").hide(),!1;
});
var e=function(e,t){
switch(e.base_resp.ret){
case 0:
t&&(n.suc("保存并发布成功"),window.onbeforeunload=null,window.scrollTo(0,0),window.location.reload());
break;

case 8:
break;

case 9:
var s,a=e.base_resp.err_msg.split("."),l=a[0];
a[1]?(s=a[1],$(".js_l2TitleBox").hide(),$(".jslevel1").eq(l-1).children("div.js_l2TitleBox").show(),
$(".jslevel1").eq(l-1).children("div.js_l2TitleBox").find(".jslevel2").eq(s-1).children("a").trigger("click")):$(".jslevel1").eq(l-1).children("a").trigger("click"),
t?r.show({
type:"err",
msg:"发布失败|存在还未设置内容的菜单，请检查后重试",
buttons:[{
text:"确定",
click:function(){
this.hide(),$("#js_errTips").show().text("请设置当前菜单内容"),$(".msg_sender:visible").addClass("error"),
$(".media_cover,.tab_nav,.js_radio_sendMsg,.js_radio_url,.js_radio_weapp,.frm_input_box,.jslevel1,.jslevel2").click(function(){
$("#js_errTips").hide(200),$(".js_warn").hide(200),$(".msg_sender").removeClass("error");
});
}
}]
}):($("#js_errTips").show().text("请设置当前菜单内容"),$(".msg_sender:visible").addClass("error"),
$(".media_cover,.tab_nav,.js_radio_sendMsg,.js_radio_url,.js_radio_weapp,.frm_input_box,.jslevel1,.jslevel2").click(function(){
$("#js_errTips").hide(200),$(".js_warn").hide(200),$(".msg_sender").removeClass("error");
}));
break;

case 10:
t?r.show({
type:"err",
msg:"发布失败|自定义菜单功能处于关闭状态，无法发布",
buttons:[{
text:"确定",
click:function(){
this.hide();
}
}]
}):n.err("自定义菜单功能处于关闭状态，无法发布");
break;

case 7:
case 105:
t?r.show({
type:"err",
msg:"发布失败|当前设置无效",
buttons:[{
text:"确定",
click:function(){
this.hide();
}
}]
}):n.err("当前设置无效");
break;

case 13:
t?r.show({
type:"err",
msg:"发布失败|未认证订阅号的备用链接不可使用非该公众号创建的图文消息",
buttons:[{
text:"确定",
click:function(){
this.hide();
}
}]
}):n.err("未认证订阅号的备用链接不可使用非该公众号创建的图文消息");
break;

case 11:
t?r.show({
type:"err",
msg:"发布失败|菜单跳转链接URL可能存在安全风险，请检查",
buttons:[{
text:"确定",
click:function(){
this.hide();
}
}]
}):n.err("菜单跳转链接URL可能存在安全风险，请检查");
break;

case 214001:
n.err("删除成功"),window.onbeforeunload=null,window.location.reload();
break;

case 214002:
n.err("删除失败");
break;

case 1530501:
var o=e&&e.invalid_menu_info&&e.invalid_menu_info.button_list||[];
i(1530501,o),$(".js_warn").text("请勿添加其他公众号的主页链接").show();
break;

case 1530508:
var o=e&&e.invalid_menu_info&&e.invalid_menu_info.button_list||[];
i(1530508,o),$(".js_warn").text("链接已失效，请在手机端重新复制链接").show();
break;

default:
t?r.show({
type:"err",
msg:"发布失败|系统繁忙，请稍后再试",
buttons:[{
text:"确定",
click:function(){
this.hide();
}
}]
}):n.err("系统繁忙，请稍后再试"),d.handleRet(e,{
id:"64524",
key:"1",
showMsg:!1
});
}
};
$("#pubBt").click(function(){
if($(".js_warn").hide(),$("#edit").is(":visible")&&$(".jsMsgSendTab:visible").length&&!$(".js_editorArea:visible").length)$("#js_errTips").show().text("请设置当前菜单内容"),
$(".msg_sender:visible").addClass("error");else if($(".js_editorArea:visible").length&&$(".js_editorArea:visible:empty").length||$(".js_editorTip:visible").find(".warn").length)$("#js_errTips").show().text("文字必须为1到600个字");else if($("#url").is(":visible")&&(!v&&!$("#urlText").val().length||v&&!$("#urlText").val().match(/http/g)))$("#js_errTips").show().text("请输入页面地址");else if(!$("#weapp").is(":visible")||D()&&D().value&&(4==D().weapp_data.service_type||D().weapp_data.path)){
if($("#weapp").is(":visible")&&4==D().weapp_data.service_type&&D().weapp_data.path&&!/^\?/.test(D().weapp_data.path))$("#js_errTips").show().text("小程序路径参数请以?开头");else if(!$("#index").is(":visible")){
var t=function(){
r.show({
type:"warn",
msg:"发布确认|发布成功后会覆盖原版本，且将在24小时内对所有用户生效，确认发布？",
buttons:[{
text:"确定",
click:function(){
var t=S.autoSaveEdit(!0);
t?d.post({
url:"/advanced/operselfmenu?op=update_sync",
data:{
info:t,
Version:wx.cgiData.menu.version
}
},function(t){
e(t,!0);
}):d.post({
url:"/advanced/operselfmenu?op=update_sync",
data:{
info:g.adapt(g.data),
Version:wx.cgiData.menu.version
}
},function(t){
e(t,!0);
}),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
};
if(g.data.length>0){
var i=$(this);
i.btn(!1);
var s=S.autoSaveEdit(!0);
if(-1==s)return void i.btn(!0);
s?d.post({
url:"/advanced/operselfmenu?op=check",
data:{
info:s,
Version:wx.cgiData.menu.version
}
},function(s){
i.btn(!0),e(s,!1),0==s.base_resp.ret?(i.btn(!0),t()):7==s.base_resp.ret||13==s.base_resp.ret||105==s.base_resp.ret?r.show({
type:"warn",
msg:"清空确认|该版本菜单包含无效设置，若要继续使用自定义菜单功能，须清空整个菜单内容，确认清空？",
buttons:[{
text:"确定",
click:function(){
d.post({
url:"/advanced/operselfmenu?op=delete",
data:{
Version:wx.cgiData.menu.version
}
},function(t){
e(t,!1);
}),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
}):11==s.base_resp.ret&&r.show({
type:"warn",
msg:"清空确认|该版本菜单内容含非法URL，若要继续使用自定义菜单功能，须清空整个菜单内容，确认清空？",
buttons:[{
text:"确定",
click:function(){
d.post({
url:"/advanced/operselfmenu?op=delete",
data:{
Version:wx.cgiData.menu.version
}
},function(t){
e(t,!1);
}),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
}):d.post({
url:"/advanced/operselfmenu?op=check",
data:{
info:g.adapt(g.data),
Version:wx.cgiData.menu.version
}
},function(s){
i.btn(!0),e(s,!1),0==s.base_resp.ret?t():7==s.base_resp.ret&&r.show({
type:"warn",
msg:"清空确认|该版本菜单包含无效设置，若要继续使用自定义菜单功能，须清空整个菜单内容，确认清空？",
buttons:[{
text:"确定",
click:function(){
d.post({
url:"/advanced/operselfmenu?op=delete",
data:{
Version:wx.cgiData.menu.version
}
},function(t){
e(t,!1);
}),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
}]
});
});
}
}
}else $("#js_errTips").show().text("请设置当前菜单内容");
return $(".media_cover,.tab_nav,.js_radio_sendMsg,.js_radio_url,.js_radio_weapp,.frm_input_box,.jslevel1,.jslevel2").click(function(){
$("#js_errTips").hide(200),$(".js_warn").hide(200),$(".msg_sender").removeClass("error");
}),!1;
});
}
function t(e){
var t={
src:$(".head .avatar").attr("src"),
id:"_view_"+1*new Date
};
if(e&&e.type&&6==e.type)return void window.open(e.value.html(!1));
var i=$(template.compile(s)(t));
return $("#viewShow").append(i).parent().scrollTop($("#viewShow")[0].scrollHeight),
e&&e.type&&1==e.type?void $("#"+t.id).html(e.value.emoji()):void(e&&e.type&&10==e.type?k.getCardData(e.value,function(i){
i._className="small_card",e._data=i,i&&u.render.defer("#"+t.id,S.getData(e));
}):e&&e.type&&13==e.type?(i.remove(),e.weapp_data&&C(e.weapp_data.appid)&&($(".js_preview_weapp_title").text(C(e.weapp_data.appid).nick_name),
$(".js_preview_weapp_wrapper").show())):u.render.defer("#"+t.id,S.getData(e)));
}
var s='<li class="show_item"><img class="avatar" src="{src}"><div class="show_content" id="{id}"></div></li>';
return $(".js_preview_weapp_close").click(function(){
$(".js_preview_weapp_wrapper").hide();
}),{
init:e
};
}(),q=function(){
var e="";
if("1"==wx.cgiData.authrized){
var t=wx.cgiData.auth_info;
t&&t.length>0?$.each(t,function(t,i){
e.length>0&&(e+="、"),e+=i.component_name;
}):e="未知",$(".js_authorized").show().find(".js_auth_name").text(e);
}
};
b.init(),window.onbeforeunload=function(e){
e=e||window.event;
var t="";
if($.support.leadingWhitespace&&!$("#menustatus_3:visible").length&&!$("#menustatus_10:visible").length&&!$("#menustatus_8:visible").length){
if(S.autoSaveEdit(),$("#edit").is(":visible")){
for(var i=0,e=$(".tab_content");i<e.length;i++)if($(e[i]).is(":visible")){
if($(e[i]).children(".inner").children("div").not(".jsMsgSendTab").length){
t="已自动为你保存“%s”菜单的内容".sprintf($(".js_menu_name:visible").val());
break;
}
t="当前菜单“%s”还未设置内容".sprintf($(".js_menu_name:visible").val());
break;
}
}else if($("#url").is(":visible"))t=$.trim($("#urlText:visible").val())?"已自动为你保存“%s”菜单的内容".sprintf($(".js_menu_name:visible").val()):"当前菜单“%s”还未设置内容".sprintf($(".js_menu_name:visible").val());else if($("#weapp").is(":visible")){
var s=D();
t=s&&s.value&&s.weapp_data.path?"已自动为你保存“%s”菜单的内容".sprintf($(".js_menu_name:visible").val()):"当前菜单“%s”还未设置内容".sprintf($(".js_menu_name:visible").val());
}
if(t)return e&&(e.returnValue=t),t;
}
};
});