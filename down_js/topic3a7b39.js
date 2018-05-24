define("common/wx/mpEditor/plugin/topic.js",["common/wx/popup.js","tpl/mpEditor/plugin/topic.html.js","tpl/mpEditor/plugin/topic_layout.html.js","biz_web/ui/dropdown.js","common/wx/Cgi.js","biz_web/ui/checkbox.js","common/wx/Tips.js"],function(t){
"use strict";
function i(t){
this._o={
container:""
},this.editor=null,this._g={},this._init(t),$(t.container).show();
}
t("common/wx/popup.js");
var o=t("tpl/mpEditor/plugin/topic.html.js"),e=t("tpl/mpEditor/plugin/topic_layout.html.js"),n=t("biz_web/ui/dropdown.js"),c=t("common/wx/Cgi.js"),p=(t("biz_web/ui/checkbox.js"),
t("common/wx/Tips.js")),r=wx.cgiData.can_use_topic;
return i.prototype={
getName:function(){
return"inserttopic";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
console.log("insert topic"),r&&t._initPop();
};
},
getContainer:function(){
return this._o.container;
},
beforeSetContent:function(t){
return t=t.replace(/<wxtopic([^>]*?)js_editor_topic_card([^>]*?)><\/wxtopic>/g,"<iframe $1js_editor_topic_card$2></iframe>");
},
getPluginData:function(t){
var i=t.init();
i.set("content",i.get("content").replace(/<iframe([^>]*?)js_editor_topic_card([^>]*?)><\/iframe>/g,"<wxtopic $1js_editor_topic_card$2></wxtopic>"));
},
addListener:function(t){
var i=this;
t.addListener("beforepaste",function(t,o){
var e=$($.parseHTML(o.html)),n="iframe.js_editor_topic_card",c=e.find(n).length+e.closest(n).length;
if(0!=c)return i._getTopicNum()+c>1?(p.err("每篇图文消息只能插入一个话题，请删除之前的话题后再插入"),o.html="",
!0):void 0;
});
},
check:function(t){
return t.find("wxtopic").length>1?(p.err("每篇图文消息只能插入一个话题，请删除之前的话题后再插入"),!1):!0;
},
_init:function(t){
this._o=$.extend({},this._o,t);
},
_initPop:function(){
function t(){
var t=r._g.topicPop,i=t.find(".js_search_input"),o=t.find(".js_search_del").hide(),n=t.find(".js_search_submit");
i.keydown(function(t){
var i="which"in t?t.which:t.keyCode;
13==i&&n.trigger("click");
}),i.on("input",function(){
""==$(this).val()?o.hide():o.show();
}),o.click(function(){
i.val("").focus(),$(this).hide();
}),n.click(function(){
var t=1==a.topicPopType.value?"导演":"作者",o=i.val();
o.length>0?(r._g.topicPop.find(".js_pop_content").html(wx.T(e,{
loading:!0,
type:t
})),c.post({
url:"/cgi-bin/appmsg",
mask:!1,
data:{
action:"topic_list",
topic_title:o,
topic_type:r._g.topicPopType.value
}
},function(i){
return i&&0==i.base_resp.ret?($.each(i.topic_list,function(t,i){
"Book"==i.category?i.type="书籍":"Vedio"==i.category&&(i.type="影视"),i.author=i.author.replace(/\$\$/g," / ");
}),i.default_img_url=wx.cgiData.topic_default_img,i.type=t,r._g.topicPop.find(".js_pop_content").html(wx.T(e,i)),
void r._g.topicPop.find(".js_pop_content input[type=radio]").checkbox({
multi:!1
})):(p.err("系统错误，请稍后再试"),void r._g.topicPop.find(".js_pop_content").html(wx.T(e,{
loading:!1,
type:t,
topic_list:[]
})));
})):p.err("请输入搜索条件");
});
}
function i(){
var t=$(".js_search_input"),i=$(".js_tips");
a.topicPopType=new n({
container:a.topicPop.find(".js_topic_drop"),
data:[{
name:"影视",
value:1
},{
name:"书籍",
value:0
}],
callback:function(o){
0==o?(t.attr("placeholder","请输入书名或图书ISBN编码").focus(),i.text("书籍数据由亚马逊提供")):(t.attr("placeholder","请输入电影或电视名称").focus(),
i.text("数据由腾讯视频提供"));
}
}),a.topicPopType.selected(0);
}
var r=this,a=this._g,s=this.editor,_=s.ueditor.getContent();
return/<iframe([^>]*?)js_editor_topic_card([^>]*?)><\/iframe>/.test(_)?void p.err("每篇图文消息只能插入一个话题，请删除之前的话题后再插入"):(a.topicPop=$(o).popup({
title:"添加话题",
className:"align_edge topic_dialog media_list_dialog",
width:"960",
buttons:[{
text:"确定",
type:"primary",
click:function(){
var t=r._g.topicPop.find(".js_pop_content input:checked");
if(0===t.length)return void p.err("请选择一个话题卡片");
var i=["img_url","title","type","author","msg_num"],o="/cgi-bin/readtemplate?t=tmpl/topic_tmpl";
$.each(i,function(i,e){
o+="&%s=%s".sprintf(e,encodeURIComponent(t.data(e)));
}),o=wx.url(o);
var e='<iframe frameborder="0" class="js_editor_topic_card topic_iframe" src="%s" data-topic-type="%s" data-topic-id="%s" data-topic-sn="%s"></iframe>'.sprintf(o,a.topicPopType.value,t.val(),t.data("sn"));
r._isbn=t.val(),r._insertTopic(e),this.remove();
}
},{
text:"取消",
click:function(){
a.topicPop=null,this.remove();
}
}],
close:function(){
a.topicPop=null,this.remove();
}
}),i(),void t());
},
_insertTopic:function(t){
var i=this.editor;
i.execCommand("inserthtml",t,!0),i.funcPvUvReport("inserttopic");
},
_getTopicNum:function(t){
if(!t){
var i=this.editor.getUeditor();
t=$(i.body);
}
return t.find("iframe.js_editor_topic_card").length;
}
},i;
});