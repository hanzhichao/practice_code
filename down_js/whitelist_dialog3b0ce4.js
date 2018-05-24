define("original/whitelist_dialog.js",["original/MultiStepDialog.js","original/whitepop.js","common/wx/Cgi.js","common/wx/Tips.js","original/tpl/whitelist.html.js","original/tpl/whitelist_record.html.js","original/tpl/whitelist_search.html.js"],function(e){
"use strict";
function t(e){
this.data=e.data||[],this.onOK=e.onOK||function(){},this.opt=e,this.isAllowReprint=e.isAllowReprint,
this.init();
}
var i=e("original/MultiStepDialog.js"),s=e("original/whitepop.js"),a=e("common/wx/Cgi.js"),n=e("common/wx/Tips.js"),c=e("original/tpl/whitelist.html.js"),d=e("original/tpl/whitelist_record.html.js"),r=e("original/tpl/whitelist_search.html.js");
return t.prototype={
construtor:t,
init:function(){
var e=this,t=this.msg=new i({
title:"添加转载帐号",
className:this.opt.className||"account_dialog align_edge"
});
t.register({
stepName:"填写公众号",
init:function(i){
function s(){
var t=$.trim(i.find(".js_input_search").val());
if(!t)return void n.err("请输入公众号/微信名称");
if(!o){
o=!0,i.find(".js_search_msg").text("正在搜索中").show(),i.find(".js_search_item").each(function(){
$(this).data("record",null);
}),i.find(".js_search_list").html("");
var s={
username:t
};
e.data.id&&(s.id=e.data.id),e.data.idx&&(s.idx=e.data.idx),a.post({
url:"/cgi-bin/appmsgcopyright?action=searchacct",
data:s,
complete:function(){
o=!1;
}
},function(e){
if(e.base_resp&&0==e.base_resp.ret&&e.search_list){
var t=e.search_list;
$.each(t,function(e,t){
t.pic_url=t.pic_url?t.pic_url.endsWith("/0")?t.pic_url:t.pic_url+"/0":"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0";
});
var s=template.compile(r)({
list:t
});
i.find(".js_search_list").html(s),0===t.length?i.find(".js_search_msg").text("无搜索结果").show():i.find(".js_search_msg").hide();
}else e.base_resp&&200013==e.base_resp.ret?(i.find(".js_search_fail").text("操作频繁，请稍后重试").show(),
i.find(".js_search_msg").hide()):(i.find(".js_search_fail").text("系统错误，请稍候再试").show(),
i.find(".js_search_msg").hide());
});
}
}
var o=!1;
i.html(c);
var l={};
e.data.id&&(l.id=e.data.id),e.data.idx&&(l.idx=e.data.idx),a.get({
url:"/cgi-bin/appmsgcopyright?action=get_recently_add",
data:l
},function(e){
if(e.base_resp&&0==e.base_resp.ret&&e.white_list){
var t=e.white_list;
$.each(t,function(e,t){
if(t.nickname){
var s=(i.find(".js_record_item"),$($.parseHTML(template.compile(d)(t))));
s.length&&(i.find(".js_record_list").append(s).css("zoom",0).css("zoom",1),i.find(".js_record_list").find(".js_empty").remove(),
i.find(".js_select_all").show()),1==t.status&&s.addClass("disabled");
}
});
}
}),i.on("keypress",".js_input_search ",function(e){
13===e.keyCode&&s();
}),i.on("click",".js_btn_search",s),i.on("click",".js_search_item",function(){
if(!$(this).hasClass("disabled"))if($(this).hasClass("selected"))$(this).removeClass("selected"),
$(this).data("record")&&($(this).data("record").remove(),$(this).data("record",null)),
i.find(".js_record_item.selected").length<=0&&t.disableBtn(0,1);else{
$(this).addClass("selected");
var e=$(this).attr("data-openid"),s=null;
if(i.find(".js_record_item").each(function(){
e===$(this).attr("data-openid")&&(s=$(this));
}),s)s.hasClass("disabled")||(s.find("input").prop("checked")&&n.suc("已存在右侧转载帐号记录中"),
s.find("input").prop("checked",!0).trigger("change"),$(this).data("record",s));else{
var a=template.compile(d)({
selected:!0,
openid:$(this).attr("data-openid"),
nickname:$(this).find(".js_nickname").text()||$(this).find(".js_wx_name").text()
}),c=$($.parseHTML(a));
$(this).data("record",c),i.find(".js_record_list").prepend(c).css("zoom",1).css("zoom",0),
i.find(".js_record_list").find(".js_empty").remove(),i.find(".js_select_all").show();
}
t.enableBtn(0,1);
}
}),i.on("change",".js_record_checkbox",function(){
var e=$(this).closest(".js_record_item");
e.hasClass("disabled")||($(this).prop("checked")?(e.addClass("selected"),t.enableBtn(0,1)):(e.removeClass("selected"),
i.find(".js_record_item.selected").length<=0&&t.disableBtn(0,1)));
}),i.on("click",".js_select_all",function(){
var e=!0;
$(this).text("取消全选"),i.find(".js_record_item").not(".disabled").length===i.find(".js_record_item.selected").not(".disabled").length&&(e=!1,
$(this).text("全选")),i.find(".js_record_checkbox").each(function(){
$(this).closest(".js_record_item").hasClass("disabled")||$(this).prop("checked",e).trigger("change");
});
});
},
buttons:[{
text:"取消",
click:function(){
t.remove();
},
type:"default"
},{
text:"下一步",
click:function(){
var e=this.$btns[1].dom;
return e.hasClass("btn_disabled")?!1:void t.next();
},
type:"disabled"
}]
}),t.register({
stepName:"设置该帐号权限",
init:function(i){
new s({
dom:i,
showAllowRe:!e.isAllowReprint,
done:function(e){
t.can_modify=1*e.can_modify,t.can_hide_source=1*e.can_hide_source,t.enableBtn(1,1);
},
bad:function(){
t.disableBtn(1,1);
}
});
},
buttons:[{
text:"上一步",
click:function(){
t.pre();
},
type:"default"
},{
text:"确定",
type:"disabled",
click:function(){
var i=this.$btns[3].dom;
if(i.hasClass("btn_disabled"))return!1;
var s=[];
t.$stepDom[0].find(".js_record_item.selected").each(function(){
s.push({
nickname:$(this).find(".lbl_content").text(),
openid:$(this).attr("data-openid"),
can_modify:t.can_modify||0,
can_hide_source:t.can_hide_source||0
});
}),e.onOK.call(this,s,i);
}
}]
}),t.show();
},
remove:function(){
this.msg.remove();
}
},t;
});