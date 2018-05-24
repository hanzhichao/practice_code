define("advanced/menu_link_dialog.js",["common/wx/popup.js","common/wx/top.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/pagebar.js","common/wx/time.js","tpl/advanced/menu_link_dialog.html.js","tpl/advanced/appmsg_list.html.js","biz_web/ui/checkbox.js","tpl/advanced/homepage_list.html.js","homepage/plugins/plugin1.js","homepage/plugins/plugin2.js","homepage/plugins/plugin3.js"],function(e){
"use strict";
function t(e){
this.opt=e,this.biz=e.biz,this.onOK=e.onOK,this.can_use_homepage=e.can_use_homepage,
this.createDialog();
}
e("common/wx/popup.js");
var n=e("common/wx/top.js"),i=e("common/wx/Tips.js"),s=e("common/wx/Cgi.js"),a=e("common/wx/pagebar.js"),o=e("common/wx/time.js"),d=e("tpl/advanced/menu_link_dialog.html.js"),l=e("tpl/advanced/appmsg_list.html.js"),p=(e("biz_web/ui/checkbox.js"),
e("tpl/advanced/homepage_list.html.js")),r=e("homepage/plugins/plugin1.js"),m=e("homepage/plugins/plugin2.js"),c=e("homepage/plugins/plugin3.js"),h={
1:r,
2:m,
3:c
},g=0,u="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=%s#wechat_redirect",_="http://mp.weixin.qq.com/mp/homepage?__biz=%s&hid=%s&sn=%s#wechat_redirect",f={
createDialog:function(){
var e=this,t=$.parseHTML(wx.T(d,{}));
this.dialog&&this.dialog.popup("remove"),this.dialog=$(t[0]).popup({
title:"选择图文消息",
className:"align_edge",
width:720,
onOK:function(){
if(e.$btn.hasClass("btn_disabled"))return i.err("请选择图文消息"),!0;
var t=e.currentTab,n={
type:t,
name:e.topData[t].name
},s=e.$dom.find(".js_content").eq(t);
n.title=s.data("title")||"",n.link=s.data("link"),e.onOK&&e.onOK(n);
},
onCancel:function(){
this.hide(),e.dialog=null;
},
onHide:function(){
e.$dom.off(),this.remove(),e.dialog=null;
}
}),e.$dom=e.dialog.popup("get"),e.$btn=e.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"),
e.init();
},
init:function(){
var e=this;
e.topData=[{
id:"hassent",
name:"已发送"
},{
id:"appmsg",
name:"素材库"
},{
id:"history",
name:"历史消息"
}],e.can_use_homepage&&e.topData.push({
id:"homepage",
name:"页面模版"
}),e.tab=new n(e.$dom.find(".js_tab"),e.topData),e.tab.selected(0),e.currentTab=0,
e.initEvent(),e.initHasSent();
},
initEvent:function(){
var e=this;
e.$dom.on("click",".js_top",function(){
var t=$(this).data("id"),n=$(this).data("index");
if(n!=e.currentTab){
var i=e.$dom.find(".js_content").hide(),s=i.eq(n).show();
switch(s.data("link")?e.$btn.removeClass("btn_disabled"):e.$btn.addClass("btn_disabled"),
t){
case"appmsg":
e.initAppMsg();
break;

case"history":
e.initHistory();
break;

case"homepage":
e.initHomePage();
}
e.tab.selected(e.currentTab=n),e.resetPos();
}
}),e.$dom.on("click","a",function(e){
e.preventDefault();
}),e.$dom.on("mousewheel",".js_hassent_list",function(e){
this.scrollTop-=e.originalEvent.wheelDelta>0?60:-60,e.preventDefault();
}).on("DOMMouseScroll",".js_hassent_list",function(e){
this.scrollTop+=e.originalEvent.detail>0?60:-60,e.preventDefault();
}),e.$dom.on("mousewheel",".js_appmsg_list",function(e){
this.scrollTop-=e.originalEvent.wheelDelta>0?60:-60,e.preventDefault();
}).on("DOMMouseScroll",".js_appmsg_list",function(e){
this.scrollTop+=e.originalEvent.detail>0?60:-60,e.preventDefault();
}),e.$dom.on("mousewheel",".js_content",function(e){
this.scrollTop-=e.originalEvent.wheelDelta>0?60:-60,e.preventDefault();
}).on("DOMMouseScroll",".js_content",function(e){
this.scrollTop+=e.originalEvent.detail>0?60:-60,e.preventDefault();
});
},
initHasSent:function(){
var e=this;
e.appSentInited||(e.getSentList(),e.appSentInited=!0);
},
initAppMsg:function(){
var e=this;
e.appMsgInited||(e.getAppMsgList(),e.$dom.on("click",".js_search_btn",function(){
e.getAppMsgList({
query:e.$dom.find(".js_search").val()
});
}),e.$dom.on("keyup",".js_search",function(t){
wx.isHotkey(t,"enter")&&e.getAppMsgList({
query:e.$dom.find(".js_search").val()
});
}),e.appMsgInited=!0);
},
getSentList:function(e){
var t=this,n=$.extend({
action:"list_ex",
begin:0,
count:10,
query:"",
scene:1,
type:9
},e||{}),a=t.loadingFlag=++g;
t.$dom.find(".js_hassent_list").hide(),t.$dom.find(".js_hassent .js_loading").show(),
t.resetPos(),s.post({
url:"/cgi-bin/appmsg",
data:n,
complete:function(){
t.$dom.find(".js_hassent .js_loading").hide(),t.resetPos();
}
},{
done:function(e){
if(a==t.loadingFlag)if(e&&e.base_resp){
if(0==e.base_resp.ret)return t.renderHasSent(e.app_msg_list),void t.renderPageBar(n.begin,e.app_msg_cnt,9);
s.show(e);
}else i.err("系统错误");
},
fail:function(){
i.err("系统错误");
}
});
},
getAppMsgList:function(e){
var t=this,n=$.extend({
action:"list_ex",
begin:0,
count:10,
query:"",
link:this.opt.link||0,
scene:1
},e||{}),a=t.loadingFlag=++g;
t.$dom.find(".js_appmsg_list").hide(),t.$dom.find(".js_appmsg .js_loading").show(),
t.resetPos(),s.post({
url:"/cgi-bin/appmsg",
data:n,
complete:function(){
t.$dom.find(".js_appmsg .js_loading").hide(),t.resetPos();
}
},{
done:function(e){
if(a==t.loadingFlag)if(e&&e.base_resp){
if(0==e.base_resp.ret)return t.renderAppMsg(e.app_msg_list),void t.renderPageBar(n.begin,e.app_msg_cnt);
s.show(e);
}else i.err("系统错误");
},
fail:function(){
i.err("系统错误");
}
});
},
renderAppMsg:function(e){
var t=this;
$.each(e,function(e,t){
t.date=o.formatDate(new Date(1e3*t.update_time),"YYYY年MM月DD日");
}),t.$dom.find(".js_appmsg_list").show().find("tbody").html(e.length?wx.T(l,{
data:e
}):'<tr class="empty_item"><td colspan="10" class="empty_tips">暂无数据</td></tr>'),
t.$dom.find(".js_appmsg").data("title",null),t.$dom.find(".js_appmsg").data("link",null),
t.$btn.addClass("btn_disabled"),t.$dom.find(".js_appmsg_list input").checkbox({
multi:!1,
onChanged:function(e){
var n=$(e).parents("tr");
if(n){
var i=n.data("title"),s=n.data("link");
t.$dom.find(".js_appmsg").data("title",i),t.$dom.find(".js_appmsg").data("link",s),
t.$btn.removeClass("btn_disabled");
}
}
}),t.resetPos();
},
renderHasSent:function(e){
var t=this;
$.each(e,function(e,t){
t.date=o.formatDate(new Date(1e3*t.update_time),"YYYY年MM月DD日");
}),t.$dom.find(".js_hassent_list").show().find("tbody").html(e.length?wx.T(l,{
data:e
}):'<tr class="empty_item"><td colspan="10" class="empty_tips">暂无数据</td></tr>'),
t.$dom.find(".js_hassent").data("title",null),t.$dom.find(".js_hassent").data("link",null),
t.$btn.addClass("btn_disabled"),t.$dom.find(".js_hassent_list input").checkbox({
multi:!1,
onChanged:function(e){
var n=$(e).parents("tr");
if(n){
var i=n.data("title"),s=n.data("link");
t.$dom.find(".js_hassent").data("title",i),t.$dom.find(".js_hassent").data("link",s),
t.$btn.removeClass("btn_disabled");
}
}
}),t.resetPos();
},
renderPageBar:function(e,t,n){
var i=this;
e=e||0,new a({
container:i.$dom.find(".js_pagebar:visible"),
perPage:10,
initShowPage:(e/10|0)+1,
totalItemsNum:t,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var t=e.currentPage;
9==n?i.getSentList({
begin:10*(t-1),
query:i.$dom.find(".js_search").val()
}):i.getAppMsgList({
begin:10*(t-1),
query:i.$dom.find(".js_search").val()
});
}
});
},
initHistory:function(){
var e=this;
e.historyInited||(e.$dom.find(".js_history").on("change","input",function(){
var t="";
$(this).prop("checked")?($(this).closest("label").addClass("selected"),t=u.sprintf(e.biz),
e.$btn.removeClass("btn_disabled")):($(this).closest("label").removeClass("selected"),
t=null,e.$btn.addClass("btn_disabled")),e.$dom.find(".js_history").data("link",t);
}),e.historyInited=!0);
},
initHomePage:function(){
var e=this;
if(!e.homePageInited){
var t=e.$dom.find(".js_homepage");
t.find(".js_homepage_list").hide(),t.find(".js_loading").show(),s.get({
url:"/advanced/homepage?action=list",
complete:function(){
t.find(".js_loading").hide();
}
},{
done:function(t){
0==t.base_resp.ret?e.renderHomePage(JSON.parse(t.data).list):s.show(t);
},
fail:function(){
i.err("网络错误");
}
}),t.on("click",".js_item",function(){
$(this).addClass("selected").siblings().removeClass("selected"),t.data("link",_.sprintf(e.biz,$(this).data("hid"),$(this).data("sn"))),
t.data("title",$(this).data("name")),e.$btn.removeClass("btn_disabled");
}),e.homePageInited=!0;
}
},
renderHomePage:function(e){
var t=this;
$.each(e,function(e,t){
var n=[];
$.each(t.render_json.plugin_data,function(e,t){
n.push(h[t.pid].getRenderHTML(t));
}),t.subhtml=n.join(""),t.update_time=o.formatDate(new Date(1e3*t.update_time),"YYYY-MM-DD HH:mm:ss");
}),e.length?t.$dom.find(".js_homepage_list").html(wx.T(p,{
list:e,
nick_name:wx.cgiData.nick_name
})).show():t.$dom.find(".js_homepage_list").html('<p class="no_homepage">暂无页面模版</p>').show(),
t.resetPos();
},
resetPos:function(){
this.dialog&&this.dialog.popup("resetPosition");
}
};
return $.extend(t.prototype,f),t;
});