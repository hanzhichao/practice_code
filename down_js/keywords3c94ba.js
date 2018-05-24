define("ivr/keywords.js",["common/qq/emoji.js","common/wx/popup.js","ivr/ivr_cgi.js","common/wx/Tips.js","common/wx/tooltip.js","common/wx/richEditor/emotionEditor.js","media/media_dialog.js","common/wx/dialog.js","common/wx/media/audio.js","common/wx/preview.js","common/wx/media/img.js","common/wx/media/video.js","common/wx/media/simpleAppmsg.js","common/wx/media/cardmsg.js","tpl/media/cardmsg.html.js","common/wx/Cgi.js","cardticket/parse_data.js","biz_common/utils/load3rdimg.js","common/wx/media/appmsg.js","common/wx/pagebar.js","common/wx/searchInput.js"],function(e){
"use strict";
function t(){
console.log("in initPage"),J.is.autoReply?($("#div_start").show(),$("#div_stop").hide(),
$("#div_replyContent").show()):($("#div_start").hide(),$("#div_stop").show(),$("#div_replyContent").hide()),
J.is.isOpen||($("#div_replyContent").hide(),$("#div_alertTips").show(),$("#btn_start").removeClass("btn_primary").addClass("btn_disabled"),
$("#btn_stop").removeClass("btn_warn").addClass("btn_disabled"));
}
function n(e){
var n,i={
type:"POST",
url:"/misc/skeyform?form=advancedswitchform&lang=zh_CN",
dataType:"json"
},r=e?1:0,o=4,s=["关闭自动回复之后，将立即对所有用户生效。确认关闭？","开启自动回复之后，将立即对所有用户生效。确认开启？"];
c.show({
type:"warn",
msg:"操作确认|"+s[r?1:0],
buttons:[{
text:"确定",
click:function(){
n=$.extend(!0,{},i,{
data:{
flag:r,
type:o,
token:wx.data.t
},
success:function(e){
0==e.base_resp.ret?(a.suc("操作成功"),replyData.is.autoReply=r,t()):a.err("系统发生错误，请稍后重试");
}
}),$.ajax(n),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
}
function i(){
$("#div_stop .btn_primary").click(function(){
n(!0);
}),$("#div_start .btn_warn").click(function(){
n(!1);
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
}
function r(){
t(),i();
}
e("common/qq/emoji.js"),e("common/wx/popup.js");
var o=e("ivr/ivr_cgi.js"),a=e("common/wx/Tips.js"),s=e("common/wx/tooltip.js"),l=e("common/wx/richEditor/emotionEditor.js"),d=e("media/media_dialog.js"),c=e("common/wx/dialog.js"),p=e("common/wx/media/audio.js"),_=e("common/wx/preview.js"),m=e("common/wx/media/img.js"),u=e("common/wx/media/video.js"),f=e("common/wx/media/simpleAppmsg.js"),h=(e("common/wx/media/cardmsg.js"),
e("tpl/media/cardmsg.html.js")),y=e("common/wx/Cgi.js"),v=e("cardticket/parse_data.js"),w=e("biz_common/utils/load3rdimg.js"),g=e("common/wx/media/appmsg.js"),x=e("common/wx/pagebar.js"),k=wx.cgiData,J=replyData||{},j=template.render,C={
10:5,
11:6,
15:7,
16:8,
21:9
};
r();
var b=function(e){
return e=e.replace(/\n|<br[^>]*>/g," "),e.trim();
},I=function(e){
var t,n,i=e.wordlimit||30;
return t=$('<div class="emotion_editor_wrp" id="Js_textEditor"></div>').popup({
title:e.title||"",
width:960,
className:"keywords_edit",
onShow:function(){
$(this.$dialogWrp.get(0)).css({
"margin-top":-264
});
},
onOK:function(){
var t=n.getContent().length;
return e.autoValid!==!1&&1>t||t>i?(a.err("文字必须为1到%s个字".sprintf(i)),!0):(e.onOK&&e.onOK.call(n),
void this.hide());
},
onCancel:function(){
this.hide();
},
onHide:function(){
$("#Js_textEditor").off(),this.remove();
}
}),n=new l($("#Js_textEditor"),{
wordlimit:i,
linebreak:!0
}),n.setContent((e.text||"").html()),e.onEnter&&$("#Js_textEditor").on("keyup",function(t){
13==t.keyCode&&e.onEnter.call(n);
}),t;
},q={
1:function(e,t){
var n=t.content.replace(/\n/g,"<br/>");
return e.html(n.emoji());
},
2:function(e,t){
return $.extend(t,{
container:e,
source:"file",
fakeid:wx.data.uin
}),new m(t);
},
3:function(e,t){
return $.extend(t,{
selector:e,
source:"file"
}),new p(t);
},
4:function(e,t){
return $.extend(t,{
selector:e,
id:t.file_id,
source:"file",
play:function(t){
var n=0;
t.on("fullscreenchange",function(){
n?$(e).closest("li").css("z-index",0):$(e).closest("li").css("z-index",1),n=~n;
});
}
}),new u(t);
},
5:function(e,t,n){
return $.extend(t,{
container:e,
source:"file",
type:10,
useUpdateTime:!0
}),10==n?new g(t):new f(t);
},
6:function(e,t,n){
return $.extend(t,{
container:e,
source:"file",
type:11
}),11==n?new g(t):new f(t);
},
7:function(e,t){
return $.extend(t,{
selector:e,
app_id:t.app_id||t.id,
id:t.id+t.index,
tpl:"videomsg",
play:function(t){
var n=0;
t.on("fullscreenchange",function(){
n?$(e).closest("li").css("z-index",0):$(e).closest("li").css("z-index",1),n=~n;
});
}
}),t.cover&&(t.img_url=t.cover),new u(t);
},
8:function(e,t){
var n=t.content,i=K[n];
if(i){
$(e).html(template.compile(h)(i));
var r=$(e).find(".js_logourl");
r.length&&w({
img:r[0]
});
}else y.get("/merchant/electroniccardmgr?action=get&card_id="+t.content,function(t){
if(0==t.base_resp.ret){
var n=$.parseJSON(t.card_detail);
if(n=v.parse_cardticket(n),!n)return;
$(e).html(template.compile(h)(n));
var i=$(e).find(".js_logourl");
i.length&&w({
img:i[0]
});
}
});
}
};
q[9]=q[7];
var L=/query=([^\&]+)/,E=L.exec(location.search)?L.exec(location.search)[1]:null;
!function(){
var t=e("common/wx/searchInput.js");
new t({
id:"#searchBar",
placeholder:"搜索关键词/规则名称",
value:E?decodeURIComponent(E):"",
click:function(e){
e.length>0?location.href=wx.url("/advanced/autoreply?t=ivr/keywords&action=searchreply&query=%s".sprintf(encodeURIComponent(e))):(a.err("请输入关键词/规则名称"),
$("#searchBar").find(".searchInput").focus());
}
});
}();
var O=$("#Js_ruleList"),S={},K={},A=[];
!function(){
if(template.helper("render_media",function(e){
return S[e.rule_id]=e.reply_list,"";
}),E)var e=decodeURIComponent(E).html();
if(template.helper("render_hl",function(t){
return E&&(t=t.replace(e,"<span class='highlight'>"+e+"</span>")),t;
}),k.list.length){
if(k.list.each(function(e,t){
e.rule_index+=wx.cgiData.total-wx.cgiData.offset-t+":";
for(var n=0;n<e.reply_list.length;n++){
var i=e.reply_list[n];
8==i.reply_type&&A.push(i.content);
}
}),O.html(j("t_ivrrole",{
list:k.list,
n:k.list.length
})),k.list=null,A.length){
for(var t={
cardcnt:A.length
},n=0;n<A.length;n++)t["cardid"+n]=A[n];
y.get({
url:wx.url("/merchant/electroniccardmgr?action=batchgetbyid"),
data:t
},function(e){
0==e.base_resp.ret&&(K=v.parse_cardlist(e.list).card_cache||{});
});
}
}else O.html(E?'<p class="empty_tips">没有匹配结果，请重新输入关键字或<a href="%s">查看全部</a></p>'.sprintf(wx.url("/advanced/autoreply?t=ivr/keywords&action=smartreply")):'<p class="empty_tips">暂无创建规则</p>');
new x({
container:"#pagebar",
perPage:7,
first:!1,
last:!1,
isSimple:!0,
currentPage:wx.cgiData.offset/7+1,
totalItemsNum:wx.cgiData.total,
callback:function(e){
location.href=wx.url(E?"/advanced/autoreply?t=ivr/keywords&action=searchreply&query=%s&count=7&offset=%s".sprintf(E,7*(e.currentPage-1)):"/advanced/autoreply?t=ivr/keywords&action=smartreply&count=7&offset="+7*(e.currentPage-1));
}
}),O.on("click","label",function(){
$(this).find(":checked").length?$(this).addClass("selected"):$(this).removeClass("selected");
});
}(),O.on("selectstart",".Js_detail_switch",function(){
return!1;
}),O.on("click",".Js_detail_switch",function(){
var e=$(this),t=e.data("id"),n=e.data("reply"),i=$("#Js_ruleItem_"+t);
if(i.toggleClass("open").hasClass("open")?e.removeClass("dropdown_closed").addClass("dropdown_opened"):e.removeClass("dropdown_opened").addClass("dropdown_closed"),
"loaded"!=n){
if("empty"==n){
var r=$("#Js_replyList_"+t);
r.find(".Js_media_content").each(function(){
var e=$(this),n=e.data("index"),i=e.data("type"),r=S[t][n];
r.index=n,q[i]&&q[i](e,r);
}),e.data("reply","loaded");
}
$(".media_type_list").find("li").each(function(){
new s({
dom:this,
position:{
x:-2,
y:1
}
});
});
}
}),O.on("click",".Js_keyword_edit",function(){
var e=$(this).parents("li").eq(0),t=e.find(".Js_keyword_val");
I({
title:"修改关键字",
onOK:function(){
t.html(this.getContent().html().emoji()),t.attr("data-content",this.getContent());
},
text:t.attr("data-content")
});
}),O.on("click",".Js_keyword_mode",function(){
{
var e,t=$(this),n="";
t.parents("li").eq(0);
}
e=+t.data("mode"),1==e?(n="未全匹配",e=0):0==e&&(n="已全匹配",e=1),t.text(n),t.data("mode",e);
}),O.on("click",".Js_keyword_del",function(){
$(this).parents("li").eq(0).remove();
}),O.on("click",".Js_keyword_add",function(){
function e(){
var e,t=this,n=b(t.getContent());
""!=n&&n.length>30?a.err("关键字长度不能大于30"):""!=n?(e=j("t_keyword_add_temp_item",{
content:n.html()
}),$("#Js_editorKeywordList").append(e)):a.err("关键字不能为空");
}
var t=$(this).data("id"),n=$("#Js_keywordList_"+t),i=n.children("li").last().data("index");
i=+i+1;
var r=I({
title:"添加关键字",
onOK:function(){
var r=this,o="";
""!=b(r.getContent())&&e.call(this),$("#Js_editorKeywordList").children("li").each(function(){
var e=$(this).attr("data-content").html();
o+=j("t_keyword_item",{
id:t,
index:i,
content:e
});
}),n.append(o);
},
onEnter:function(){
e.call(this),this.setContent("");
},
autoValid:!1
}),o=$("#Js_textEditor");
o.append('<div class="tool_area"><p class="tips">输入回车可添加多个关键字，每个关键字少于30个字符</p></div>'),
o.append('<ul class="overview_keywords_list" id="Js_editorKeywordList"></ul>'),o.on("click",".Js_temp_item_close",function(){
$(this).parents("li").eq(0).remove();
}),r.popup("resetPosition");
}),O.on("click",".Js_reply_edit",function(){
$(this).parents(".keywords_rule_item").find(".js_warn").hide();
var e=$(this).parents("li").eq(0),t=e.find(".Js_media_content");
I({
title:"修改回复文字",
text:e.attr("data-content"),
wordlimit:300,
onOK:function(){
e.attr("data-content",this.getContent()),q[1](t,{
content:this.getContent().html()
});
}
});
}),O.on("click",".Js_reply_del",function(){
$(this).parents(".keywords_rule_item").find(".js_warn").hide();
var e=$(this).parents("li").eq(0),t=e.data("id"),n=e.data("type");
if(7==n&&(n=4),8==n){
var i=$("#Js_ruleItem_"+t).find(".Js_reply_cnt[data-type="+n+"]"),r=$("#Js_ruleItem_"+t).find(".Js_reply_cnt2[data-type="+n+"]");
i.text(+i.text()-1),r.text(+r.text()-1);
}else{
var i=$("#Js_ruleItem_"+t).find(".Js_reply_cnt").eq(+n-1),r=$("#Js_ruleItem_"+t).find(".Js_reply_cnt2").eq(+n-1);
i.text(+i.text()-1),r.text(+r.text()-1);
}
e.remove();
}),O.on("click",".Js_reply_add",function(){
function e(e,t){
t=t.data||t,t.id=i,t.index=+r.children().last().data("index")+1,t.reply_type=C[e]||e,
8==t.reply_type&&(t.content=t.cardid),$(j("t_reply_item",t),r).appendTo(r).find(".Js_media_content").each(function(){
var n=$(this),i=(n.data("id"),n.data("type"));
q[i]&&q[i](n,t,e);
});
var n=+(7==t.reply_type?4:t.reply_type);
if(8==t.reply_type){
var o=$("#Js_ruleItem_"+i).find(".Js_reply_cnt[data-type="+t.reply_type+"]"),a=$("#Js_ruleItem_"+i).find(".Js_reply_cnt2[data-type="+t.reply_type+"]");
o.text(+o.text()+1),a.text(+a.text()+1);
}else{
var o=$("#Js_ruleItem_"+i).find(".Js_reply_cnt").eq(n-1),a=$("#Js_ruleItem_"+i).find(".Js_reply_cnt2").eq(n-1);
o.text(+o.text()+1),a.text(+a.text()+1);
}
}
var t=$(this),n=t.data("type"),i=t.data("id"),r=$("#Js_replyList_"+i);
if(t.parents(".keywords_rule_item").find(".js_warn").hide(),r.children().length>=5)return void a.err("最多5个回复");
switch(+n){
case 1:
I({
title:"添加回复文字",
wordlimit:300,
onOK:function(){
var t=this,i={
content:t.getContent().html()
};
e(n,i);
}
});
break;

case 2:
d.getFile({
type:n,
onSelect:e
});
break;

case 3:
d.getVoice({
onSelect:e
});
break;

case 4:
break;

case 5:
d.getAppmsg({
type:10,
onSelect:e
});
break;

case 6:
d.getAppmsg({
type:11,
onSelect:e
});
break;

case 7:
d.getAppmsg({
type:15,
onSelect:e
});
break;

case 8:
d.getCardList({
type:8,
onSelect:e
});
}
}),O.on("click",".Js_media_content[data-type=2] a",function(){
var e=$(this),t=[],n=0;
return $("#Js_ruleList").find(".Js_media_content[data-type=2] a").each(function(i,r){
r===e[0]&&(n=t.length);
var o=$(r).attr("href")||"";
o&&t.push({
imgsrc:o
});
}),t.length>0&&_.show({
imgdata:t,
current:n
}),!1;
}),$("#Js_rule_add").on("click",function(){
var e=$(this),t={
new_rule:1,
index:-1,
rule_index:"新规则",
rule_id:0,
rule_name:"",
reply_all:0,
reply_cnt:0,
text_reply_cnt:0,
img_reply_cnt:0,
audio_reply_cnt:0,
video_reply_cnt:0,
appmsg_reply_cnt:0,
commodity_reply_cnt:0,
keyword_list:[],
reply_list:[]
};
"not"==e.data("status")?(O.children().length?$(j("t_ivrrole_item",t)).insertBefore(O.children().first()).find(".Js_detail_switch").click():O.html(j("t_ivrrole_item",t)).find(".Js_detail_switch").click(),
e.data("status","added")):(O.children().first().remove(),e.data("status","not")),
$(".media_type_list").find("li").each(function(){
new s({
dom:this,
position:{
x:-2,
y:1
}
});
}),$("#Js_keywordList_0").show(),$("#Js_replyList_0").show();
}),O.on("change",".Js_reply_all",function(){
var e=$(this).attr("id").replace("replyAll","replyAllOverview");
$(this).is(":checked")?$("#"+e).removeClass("dn"):$("#"+e).addClass("dn");
}),O.on("click",".Js_rule_save",function(){
var e=$(this);
if(!e.hasClass("btn_disabled")){
var t=e.data("id"),n=$("#Js_ruleItem_"+t),i=n.find("#Js_replyList_"+t).children(),r=n.find("#Js_keywordList_"+t).children(),s={
replytype:"smartreply",
ruleid:t,
rulename:n.find("#Js_ruleName_"+t).val(),
allreply:n.find("#Js_replyAll_"+t+":checked").length,
replycnt:i.length,
keywordcnt:r.length
};
if(0==s.rulename.length)return void a.err("规则名不能为空");
if(s.rulename.length>60)return void a.err("规则名最多60个字");
if(s.keywordcnt>10)return void a.err("最多10个关键词");
if(0==s.keywordcnt)return void a.err("请至少输入1个关键词");
if(s.replycnt>5)return void a.err("最多5个回复");
if(0==s.replycnt)return void a.err("请至少输入1个回复");
var l=0,d=[];
r.each(function(){
s["keyword"+l]=$(this).find(".Js_keyword_val").attr("data-content"),s["matchmode"+l]=$(this).find(".Js_keyword_mode").data("mode"),
d.push({
content:s["keyword"+l]
}),l++;
}),l=0;
var c=!1;
if(i.each(function(){
var e=$(this).data("type");
4==e&&(c=!0),s["type"+l]=e,s["fileid"+l]=$(this).data(5>e||9==e?"fileid":"appid"),
s["content"+l]=$(this).attr("data-content"),l++;
}),c)return void a.err("请更换新的视频消息");
e.addClass("btn_disabled"),o.replySave(s,function(){
if(0==t)return void(E?location.href=wx.url("/advanced/autoreply?t=ivr/keywords&action=smartreply"):location.reload());
$("#Js_keywordsOverview_"+t).html(j("t_keywords_overview",{
list:d
}));
var e=n.find(".Js_detail_switch").click().offset().top;
$(window).scrollTop(e-20);
},function(){
e.removeClass("btn_disabled");
});
}
}),O.on("click",".Js_rule_del",function(){
if(confirm("确定要删除规则吗？")){
{
var e=$(this),t=e.data("id");
$("#Js_ruleItem_"+t);
}
-1==+t?$("#Js_rule_add").click():o.replyDel(t,"smartreply",function(){
location.reload();
});
}
}),O.on("mouseenter",".Js_videomsg",function(){
""==$(this).find(".title").text().trim()&&$(this).addClass("no_title");
}),O.on("mouseleave",".Js_videomsg",function(){
$(this).removeClass("no_title");
});
});