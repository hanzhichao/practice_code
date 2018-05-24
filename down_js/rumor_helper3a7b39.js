define("rumor/rumor_helper.js",["common/wx/popup.js","common/wx/Step.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/pagebar.js","biz_web/ui/checkbox.js","rumor/tpl/rumor_helper.html.js"],function(e,t,i){
"use strict";
function n(e,t){
var i=e.page||1,n=e.count||d.pager_count,s=(i-1)*n,r=wx.url("/misc/rumor?action=search&type=10&f=json");
o.get({
url:r,
mask:!1,
data:{
query:e.query||"",
begin:s,
count:n
}
},function(e){
e&&e.base_resp&&e.app_msg_info&&0==e.base_resp.ret?"function"==typeof t&&t(e.app_msg_info):l.err("系统错误，请重试");
});
}
function s(e,t){
t.find(".js_list").hide(),t.find(".js_loading").show(),n(e,function(i){
var n=t.find(".js_list"),r=i.file_cnt&&i.file_cnt.app_msg_cnt?i.file_cnt.app_msg_cnt:0,a=i.item,o=a.length;
t.find(".js_loading").hide();
var l=template.compile('<ul class="rumor_list">    		{each data as item i}            <li class="rumor_item">            {each item.multi_item as itemlist idx}            <label class="frm_radio_label">                <i class="icon_radio"></i>                <span class="rumor_title lbl_content"><a href="{itemlist.content_url}" target="_blank" title="{itemlist.title}">{itemlist.title}</a></span>                <input type="radio" name="hello" class="frm_radio" value="{itemlist.content_url}">        	</label>{/each}</li>{/each}</ul>');
o>0?n.html(l({
data:a
})).show():n.html("<p class='empty_tips'>暂无数据</p>").show();
var u=e.count||d.pager_count;
r>u&&new c({
container:t.find(".js_pager"),
currentPage:e.page||1,
perPage:u,
totalItemsNum:r,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
return s({
query:e.query,
page:i.currentPage,
count:i.perPage,
next2:e.next2
},t),!1;
}
}),n.find(".frm_radio").checkbox({
multi:!1,
onChanged:function(i){
var n=i.val();
e.next2?t.find(".js_step2_finish").removeClass("btn_disabled").addClass("btn_primary").attr("disabled",!1).data("url",n):t.find(".js_step2_finish").data("url",n);
}
});
});
}
function r(e,t){
t.find(".js_newarticle").attr("href",wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&isMul=1&isNew=1")),
s({
next2:e.next2
},t);
var i=t.find(".js_input");
t.find(".js_del").on("click",function(){
i.val(""),s({
next2:e.next2
},t);
}),t.find(".js_search").on("click",function(){
s({
next2:e.next2,
query:i.val().trim()
},t);
}),t.data("inited",!0);
}
var a=(e("common/wx/popup.js"),template.render,e("common/wx/Step.js")),o=e("common/wx/Cgi.js"),l=e("common/wx/Tips.js"),c=e("common/wx/pagebar.js"),u=(e("biz_web/ui/checkbox.js"),
e("rumor/tpl/rumor_helper.html.js")),d={
pager_count:5
};
i.exports={
rum:function(e,t){
var i,n,s="click",c=$(u).find(".js_rumortpl").popup({
className:"align_edge rumor_edit_dialog",
title:"对谣言进行科普",
width:960,
onShow:function(){
n=this;
},
close:function(){
this.remove();
}
});
i=new a({
container:c.find(".js_process"),
selected:1,
names:["1 输入简要科普结论","2 选择科普文章（选填）"]
});
var d=c.find(".js_step1_next"),m=c.find(".js_refute"),p=c.find(".js_refutecount");
m.on("keyup propertychange",function(){
var e=$(this),t=e.val().trim().length,i=t>150?!0:!1;
p.text(t),i?p.parent().addClass("error"):p.parent().removeClass("error"),i||0==t?d.removeClass("btn_primary").addClass("btn_disabled").attr("disabled",!0):d.addClass("btn_primary").removeClass("btn_disabled").attr("disabled",!1);
}),d.on(s,function(){
var e=$(this);
if(!e.attr("disabled")&&m.val().trim()){
i.setStep(2);
var t=c.find(".js_step1").hide().siblings(".js_step2").show();
t.data("inited")||r({},t);
}
}),c.find(".js_step2_prev").on(s,function(){
i.setStep(1),c.find(".js_step2").hide().siblings(".js_step1").show();
});
var _=c.find(".js_step2_finish");
_.on(s,function(){
var i=$(this),n=m.val().trim();
if(n&&!i.attr("disabled")){
var s={
rumor_url:e.id,
refute_url:i.data("url")||"",
refute_view:n
};
i.btn(!1),o.post({
url:wx.url("/misc/rumor?action=checkrumor"),
data:s,
mask:!1
},function(e){
if(!e||!e.base_resp)return void l.err("系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
l.suc("辟谣成功"),"function"==typeof t.suc&&t.suc(e);
break;

default:
l.err("辟谣失败，请重试");
}
i.btn(!0);
});
}
});
},
add:function(e,t){
var i,n="click",s=$(u).find(".js_addition").popup({
className:"align_edge rumor_edit_dialog",
title:"添加参考文章",
width:960,
onShow:function(){
i=this;
},
close:function(){
this.remove();
}
}),a=s.find(".js_step2");
a.data("inited")||r({
next2:!0
},a),s.find(".js_step2_finish").on(n,function(){
var i=$(this),n=i.data("url");
if(!i.attr("disabled")&&n){
var s={
rumor_url:e.id,
refute_url:n,
refute_view:""
};
i.btn(!1),o.post({
url:wx.url("/misc/rumor?action=checkrumor"),
data:s,
mask:!1
},function(e){
if(!e||!e.base_resp)return void l.err("系统错误，请重试");
switch(+e.base_resp.ret){
case 0:
l.suc("添加参考文章成功"),"function"==typeof t.suc&&t.suc(e);
break;

default:
l.err("添加参考文章失败，请重试");
}
i.btn(!0);
});
}
});
}
};
});