define("rumor/bindlink.js",["common/wx/popup.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/pagebar.js","biz_web/ui/checkbox.js","rumor/tpl/rumor_addarticle.html.js","safe/Scan.js","common/wx/dialog.js"],function(t){
"use strict";
function e(t,e){
var i=t.page||1,r=t.count||c.pager_count,n=(i-1)*r,o=wx.url("/misc/rumor?action=search&type=10&f=json");
s.get({
url:o,
mask:!1,
data:{
query:t.query||"",
begin:n,
count:r
}
},function(t){
t&&t.base_resp&&t.app_msg_info&&0==t.base_resp.ret?"function"==typeof e&&e(t.app_msg_info):a.err("系统错误，请重试");
});
}
function i(t,r){
r.find(".js_list").hide(),r.find(".js_loading").show(),e(t,function(e){
var s=r.find(".js_list"),a=e.file_cnt&&e.file_cnt.app_msg_cnt?e.file_cnt.app_msg_cnt:0,o=e.item,l=o.length;
r.find(".js_loading").hide();
var u=template.compile('<ul class="rumor_list">    		{each data as item i}            <li class="rumor_item">            {each item.multi_item as itemlist idx}            <label class="frm_radio_label">                <i class="icon_radio"></i>                <span class="rumor_title lbl_content"><a href="{itemlist.content_url}" target="_blank" title="{itemlist.title}">{itemlist.title}</a></span>                <input type="radio" name="hello" class="frm_radio" value="{itemlist.content_url}">        	</label>{/each}</li>{/each}</ul>');
l>0?s.html(u({
data:o
})).show():s.html("<p class='empty_tips'>暂无数据</p>").show();
var _=t.count||c.pager_count;
a>_&&new n({
container:r.find(".js_pager"),
currentPage:t.page||1,
perPage:_,
totalItemsNum:a,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
return i({
query:t.query,
page:e.currentPage,
count:e.perPage,
next2:t.next2
},r),!1;
}
}),s.find(".frm_radio").checkbox({
multi:!1,
onChanged:function(t){
var e=t.val();
r.find(".js_addarticle_finish").removeClass("btn_disabled").addClass("btn_primary").attr("disabled",!1).data("url",e).data("title",t.siblings("span").children("a").attr("title"));
}
});
});
}
function r(t,e){
e.find(".js_newarticle").attr("href",wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&isMul=1&isNew=1")),
i({
next2:t.next2
},e);
var r=e.find(".js_input");
e.find(".js_del").on("click",function(){
r.val(""),i({
next2:t.next2
},e);
}),e.find(".js_search").on("click",function(){
i({
next2:t.next2,
query:r.val().trim()
},e);
}),e.data("inited",!0);
}
var s=(t("common/wx/popup.js"),template.render,t("common/wx/Cgi.js")),a=t("common/wx/Tips.js"),n=t("common/wx/pagebar.js"),o=(t("biz_web/ui/checkbox.js"),
t("rumor/tpl/rumor_addarticle.html.js")),l=t("safe/Scan.js"),u=t("common/wx/dialog.js"),c={
pager_count:5
};
$(".js_addArticle_btn").on("click",function(){
var t=$(o).popup({
className:"align_edge rumor_edit_dialog",
title:"选择科普文章",
width:960,
onShow:function(){},
close:function(){
this.remove();
}
}),e=t.find(".js_addarticle");
r({
next2:!0
},e),e.find(".js_addarticle_finish").on("click",function(){
$(this).data("url")&&($(".js_checkArticle").show().find("a.js_refute_url").attr("href",$(this).data("url")).text($(this).data("title")),
t.popup("hide"),$(".js_addArticle_btn").text("重新选择"),$(".js_hasart").show());
}),e.find(".js_addarticle_cancel").on("click",function(){
t.popup("hide");
});
});
var _=function d(t){
var e=$(t),i=d,r=$.trim(e.val())||wx.cgiData.rumorurl;
return $.trim(e.val())||$(".js_link_ipt").val(decodeURIComponent(wx.cgiData.rumorurl)),
r?(s.get({
url:"/misc/rumor?action=check_rumor_url",
mask:!1,
data:{
url:r
}
},function(t){
if(!t||!t.ret&&0!=t.ret)return a.err("系统错误，请重试"),i;
switch(t.ret){
case 0:
$(".js_err_1").hide(),$(".js_err_2").hide(),t.title?$(".js_rumor_artitle").text(t.title):"",
t.title?$(".js_arttitle").show().find("a").text(t.title):"",t.url?$(".js_arttitle").find("a").attr("href",t.url):"",
t.rumor_nickname?$(".js_rumor_uname").text(t.rumor_nickname):"",t.rumor_headimg?$(".js_rumor_headimg").attr("src",t.rumor_headimg):"",
t.refute_nickname?$(".js_derumor_uname").text(t.refute_nickname):"",t.refute_headimg?$(".js_derumor_headimg").attr("src",t.refute_headimg):"";
break;

case 1:
$(".js_err_1").show(),$(".js_err_2").hide(),$(".js_arttitle").hide();
break;

case 2:
$(".js_err_1").hide(),$(".js_err_2").show(),$(".js_arttitle").hide();
break;

default:
a.err("未知参数，请稍候重试");
}
}),d):($(".js_err_1").hide(),$(".js_err_2").hide(),i);
}();
$(".js_link_ipt").on("blur",function(){
_(this);
}),$(".js_refuteview_txa").on("input",function(){
var t=$(this);
$(".js_rumor_desctext").text($.trim(t.val()));
});
var m=function(t,e,i){
var r=$.trim($(".js_link_ipt").val()),n=$.trim($(".js_refuteview_txa").val()),o=$(".js_refute_url:visible").attr("href");
if(!r)return void a.err("请输入谣言文章链接");
if(!n)return void a.err("请输入科普结论");
var l={
rumor_url:r,
refute_url:o,
refute_view:n
};
e&&(l.uuid=e),i&&(l.msgid=i),l.action="refute",l.type="refute_rumor",s.post({
url:wx.url("/misc/rumor"),
data:l,
mask:!1
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?t():a.err("系统错误，请重试");
});
};
$(".js_submit").on("click",function(){
{
var t=$.trim($(".js_link_ipt").val()),e=$.trim($(".js_refuteview_txa").val());
$(".js_refute_url:visible").attr("href");
}
if(!t||$(".js_err_1").is(":visible")||$(".js_err_2").is(":visible"))return void a.err("请输入有效的谣言文章链接");
if(!e)return void a.err("请输入科普结论");
{
var i=null;
$(".js_scan").popup({
title:"验证管理员身份",
width:860,
onShow:function(){
var t=this;
i=new l({
container:$(".js_scan"),
type:"check",
source:"refute_rumor",
status_container:".status_container",
distinguish:!0,
auto_msgid:!0,
wx_name:wx.cgiData.wx_alias,
onconfirm:function(){
t.remove();
var e=this;
if(this&&(this.isadmin||this.issubadmin)){
var i=u.show({
title:"提示",
hideClose:!0,
type:"succ",
msg:"正在提交中|请不要关闭本页面。",
buttons:[]
});
m(function(){
i.remove(),$("#js_div_page").hide(),$(".js_submitsuc_tips").show(),window.scrollTo(0,0);
},this.opt.uuid,this.opt.msgid);
}else{
var r,a=u.show({
title:"提示",
hideClose:!0,
type:"info",
msg:"请不要关闭页面，操作管理员确认中|请等待公众号管理员微信号（%s）验证操作申请，验证通过后操作将立即执行。此申请在30分钟后过期，请尽快联系管理员验证。若关闭页面，本次提交将中断。".sprintf(wx.cgiData.wx_alias),
buttons:[]
}),n=this,o=!1,l=function(){
var t={
action:"admin_action",
token:wx.cgiData.token,
type:"16",
msgid:n.opt.msgid
};
s.post({
url:wx.url("/misc/safeassistant?lang=%s".sprintf(wx.cgiData.lang||"zh_CN")),
data:t
},{
done:function(t){
if(t&&0==t.status?o=!1:t&&1==t.status?o=!0:t&&2==t.status&&(o=!0),o)if(window.clearInterval(r),
1==t.status){
a.remove();
var i=u.show({
title:"提示",
hideClose:!0,
type:"succ",
msg:"管理员已通过操作申请，正在提交中|请不要关闭本页面。",
buttons:[]
});
m(function(){
i.remove(),$("#js_div_page").hide(),$(".js_submitsuc_tips").show(),window.scrollTo(0,0);
},e.opt.uuid,e.opt.msgid);
}else if(2==t.status){
a.remove();
var i=u.show({
title:"提示",
type:"err",
msg:"管理员已拒绝操作申请|公众号管理员（%s）已拒绝该次辟谣操作。".sprintf(wx.cgiData.wx_alias),
buttons:[{
text:"关闭",
type:"normal",
click:function(){
this.remove();
}
}]
});
}
},
fail:function(){
setTimeout(l,300);
}
});
};
r=setInterval(l,5e3);
}
}
});
},
close:function(){
i&&i.destroy(),this.remove();
}
});
}
});
});