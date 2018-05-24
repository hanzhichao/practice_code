define("discuss/list_latest.js",["common/wx/Cgi.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","common/wx/pagebar.js","common/wx/popover.js","common/wx/Tips.js","common/wx/top.js","biz_common/utils/string/html.js","common/wx/searchInput.js","biz_common/moment.js","common/qq/emoji.js","discuss/opt.js","common/wx/RichBuddy_tag.js","common/wx/reply.js"],function(e){
"use strict";
function t(e){
return e=e||"",e.emoji();
}
function n(e){
var t=e.page||1,n=e.filtertype||wx.cgiData.filtertype,a=e.day||wx.cgiData.day,i=wx.url("/misc/appmsgcomment?action=list_latest_comment&begin=%s&count=%s&filtertype=%s&day=%s".sprintf((t-1)*q,q,n,a));
wx.cgiData.search_key&&(i+="&search_key="+wx.cgiData.search_key),location.href=i;
}
function a(e){
var t=$("#js_item_"+e.id+"_"+e.comment_id);
t.find(".js_btn").hide(),1==e.del_flag?t.find(".js_btn_has_deleted").show():1==e.is_elected?t.find(".js_btn_has_elected").show():(t.find(".js_btn_delete").show(),
0==e.status&&t.find(".js_btn_elect").show());
}
function i(){
setInterval(function(){
g.get({
url:wx.url("/misc/appmsgcomment?action=poll_biz_new_comment_cnt")
},function(e){
0==e.base_resp.ret&&e.new_num>0?(u.show(),d.html(e.new_num)):(g.handleRet(e,{
id:64462,
key:26,
url:"/misc/appmsgcomment?action=poll_biz_new_comment_cnt"
}),u.hide());
});
},1e4);
}
function c(){
_=$("#js_div_list"),u=$("#js_div_newnum"),d=$("#js_txt_num"),p=$("#js_btn_elect_all"),
f=$("#js_btn_delete_all"),q=wx.cgiData.perpage,T=Math.floor(wx.cgiData.begin/q)+1,
z=wx.cgiData.list.total_count,D=wx.cgiData.list.comment,1!=wx.cgiData.can_use_reward&&1!=wx.cgiData.can_use_comment?(E=[],
C="",wx.cgiData.filtertype=0):(wx.cgiData.can_use_reward>0&&(E.push({
name:"赞赏总额排序",
value:"1"
}),R[1]="赞赏%s元"),wx.cgiData.can_use_comment>0&&(E.push({
name:"留言总数排序",
value:"2"
},{
name:"精选留言总数排序",
value:"3"
}),R[2]="留言%s条",R[3]="精选留言%s条"),C=R[wx.cgiData.filtertype]||""),I=E.length;
for(var e=wx.cgiData.filtertype,n=0;n<D.length;n++){
var a=D[n];
k[a.id+"_"+a.comment_id]=a,"undefined"!=typeof a.busi_filter_value&&1==e&&(a.busi_filter_value=(a.busi_filter_value/100).toFixed(2)),
C&&"undefined"!=typeof a.busi_filter_value&&(a.busi_filter_value_str=C.sprintf(a.busi_filter_value)),
a.content=t(a.content),a.comment_nickname=a.nick_name==a.comment_nickname?"":a.comment_nickname,
a.nick_name=a.nick_name.replace(/&lt;em class=&quot;keyword&quot;&gt;/g,'<em class="keyword">').replace(/&lt;\/em&gt;/g,"</em>"),
a.comment_nickname=(a.comment_nickname||"").replace(/&lt;em class=&quot;keyword&quot;&gt;/g,'<em class="keyword">').replace(/&lt;\/em&gt;/g,"</em>"),
a.content=a.content.replace(/&lt;em class=&quot;keyword&quot;&gt;/g,'<em class="keyword">').replace(/&lt;\/em&gt;/g,"</em>");
}
template.helper("datestring",function(e){
return S.unix(e/1e3).format("YYYY-MM-DD HH:mm:ss");
});
}
function s(){
new b("#js_div_toptab",b.DATA.discuss).selected(0);
var e=[{
name:"不限时间",
value:"0"
},{
name:"最近五天",
value:"5"
},{
name:"今天",
value:"1"
},{
name:"昨天",
value:"2"
},{
name:"前天",
value:"3"
}];
if($("#dayselect").length){
new h({
container:"#dayselect",
label:"不限时间",
data:e,
callback:function(e){
n({
day:e
});
}
}).selected(o(e,wx.cgiData.day),!1);
}
if(I>0&&$("#filterTypeSelect").length){
new h({
container:"#filterTypeSelect",
label:"时间排序",
data:E,
callback:function(e){
var t=wx.cgiData.day;
1*e>0&&(t=5),n({
day:t,
filtertype:e
});
}
}).selected(o(E,wx.cgiData.filtertype),!1);
}else $("#filterTypeSelect").remove();
z>=1e4&&(wx.cgiData.filtertype>0&&I>0?$("#filterTips").text("仅显示最近10000条留言的排序结果").show():$("#filterTips").text("仅显示最近10000条留言").show()),
_.html(x("tpl_list",{
list:D
})),$(".jsElect").remove(),$("#js_div_list").find(".js_top").remove();
for(var t in k)a(k[t]);
B.init({
id:"#js_div_list"
});
var i=new P;
$("#js_div_list").find(".avatar").mouseover(function(){
var e=$(this),t=e.data("id"),n=e.offset(),a=e.width();
i.show({
id:t,
autoRefresh:!0,
position:{
left:n.left+a+2,
top:n.top
},
isUserIndex:!0
});
}).mouseout(function(){
i.hide();
}),$("#js_div_list").find(".avatar").click(function(){
window.open(wx.url("/cgi-bin/singlesendpage?tofakeid=%s&t=message/send&action=index".sprintf($(this).data("id"))));
}),w=_.find('input[type="checkbox"]'),w.checkbox({
multi:!0,
onChanged:function(){
w.filter(":checked").length>0?(p.enable(),f.enable()):(p.disable(),f.disable());
}
}),new j({
container:"#js_pagebar",
perPage:q,
first:!1,
last:!1,
isSimple:!0,
initShowPage:T,
totalItemsNum:z,
callback:function(e){
var t=e.currentPage;
return t==T?!1:(n({
page:t
}),!1);
}
});
}
function o(e,t){
var n=-1;
return $.each(e,function(e,a){
return a.value==t?(n=e,!1):void 0;
}),n;
}
function m(){
function t(e,t){
e.html(t?$("#electTpl").html():'<a href="javascript:;" class="jsNewElect">移入精选</a>');
}
i(),p.on("click",function(){}),f.on("click",function(){});
var n=e("common/wx/reply.js");
_.on("click",".jsPageReplyDel",function(){
var e=$(this),t=e.data("replyid"),a=e.data("commentid"),i=e.data("contentid");
n.replyDel({
reply_id:t,
comment_id:a,
content_id:i
},e);
}),$(".jsElectDiv").on("click",".jsElectedCancel",function(){
var e=$(this).parents(".jsElectDiv");
g.post({
url:"/misc/appmsgcomment",
data:{
comment_id:e.data("commentid"),
action:"remove_good_comment",
user_comment_id_count:1,
user_comment_id_0:e.data("id")
}
},function(n){
0==n.base_resp.ret?(v.suc("操作成功"),t(e,!1)):200007==n.base_resp.ret?v.err("该留言因违反相关规定被删除"):16e3==n.base_resp.ret&&v.err("超出精选留言数量限制，请重新选择");
});
}),$(".jsElectDiv").on("click",".jsNewElect",function(){
var e=$(this).parents(".jsElectDiv");
g.post({
url:"/misc/appmsgcomment",
data:{
comment_id:e.data("commentid"),
action:"set_good_comment",
user_comment_id_count:1,
user_comment_id_0:e.data("id")
}
},function(n){
0==n.base_resp.ret?(v.suc("操作成功"),t(e,!0)):200007==n.base_resp.ret?v.err("该留言因违反相关规定被删除"):16e3==n.base_resp.ret&&v.err("超出精选留言数量限制，请重新选择");
});
});
}
function l(){
c(),s(),m(),r();
}
function r(){
new y({
id:"#searchBar",
value:wx.cgiData.search_key.html(!1).html(!1),
placeholder:"留言内容/昵称",
click:function(e){
e.length>0?location.href=wx.url("/misc/appmsgcomment?t=discuss/list_latest&action=list_latest_comment&search_key=%s&count=%s".sprintf(encodeURIComponent(e),wx.cgiData.perpage)):(v.err("请输入搜索关键词"),
$("#searchBar").find(".searchInput").focus());
}
});
}
var _,u,d,p,f,w,g=e("common/wx/Cgi.js"),h=(e("biz_web/ui/checkbox.js"),e("biz_web/ui/dropdown.js")),x=template.render,j=e("common/wx/pagebar.js"),v=(e("common/wx/popover.js"),
e("common/wx/Tips.js")),b=e("common/wx/top.js"),y=(e("biz_common/utils/string/html.js"),
e("common/wx/searchInput.js")),D=[],k={},T=1,q=10,z=0,E=[{
name:"时间排序",
value:"0"
}],I=0,R={},C="",S=e("biz_common/moment.js");
e("common/qq/emoji.js");
var B=e("discuss/opt.js"),P=e("common/wx/RichBuddy_tag.js");
if(1e4==wx.cgiData.list.total_count&&9990==wx.cgiData.begin&&$("#max").show(),wx.cgiData.lastTime>0&&!wx.cgiData.search_key){
var Y=-1;
wx.cgiData.list.comment.each(function(e,t){
e.post_time>wx.cgiData.lastTime&&(Y=t+1);
}),Y>0&&Y<wx.cgiData.list.comment.length&&(wx.cgiData.list.comment[Y].isLast=1);
}
l();
});