define("statistics/article/detail/all.js",["biz_common/moment.js","statistics/article/detail/state.js","statistics/article/detail/filters-menu.js","common/wx/Cgi.js","statistics/article/detail/article-item.js","statistics/common.js","common/wx/pager.js","statistics/article/detail/sortable.js"],function(t,e){
"use strict";
function a(){
J.filters.pageNum=1,J.currentUnfoldedItemCount=0,W=J.articles,V=window.cgiData2||{
list:[]
},k(),v(),h();
}
function i(t){
var e,t=t.list||[],a=J.summaryData;
t.each(function(t){
var i=a[t.msgid]||{
sources:{}
};
if(i[t.ref_date]){
var o=i[t.ref_date];
s(o,t);
}else var o=i[t.ref_date]=$.extend(!0,{
sources:{
99999999:{
int_page_read_count:0,
int_page_read_user:0
}
}
},t);
o.sources[t.user_source]=t,o.sources[99999999].int_page_read_count+=t.int_page_read_count,
o.sources[99999999].int_page_read_user+=t.int_page_read_user,r(i,t),a[t.msgid]=i,
n(t)&&(e=!0);
});
}
function n(t){
return 0!=t.user_source?!0:void 0;
}
function r(t,e){
var a=e.user_source;
t.sources[a]?(t.sources[a].y+=e.int_page_read_count,t.sources[a].y2+=e.int_page_read_user):t.sources[a]={
y:e.int_page_read_count,
y2:e.int_page_read_user,
name:ie[e.user_source]
};
}
function s(t,e){
var a=["add_to_fav_count","add_to_fav_user","add_to_fav_user","int_page_read_user","ori_page_read_count","ori_page_read_user","share_count","share_user"];
a.each(function(a){
t[a]+=e[a];
});
}
function o(){
c(),u(),_();
}
function c(){
S=new L;
}
function u(){
U.extend(J.filters,{
beginDate:queryDates.beginDate||z.days.sixDaysAgo,
endDate:queryDates.endDate||z.days.yesterday,
sortKey:"1",
sortType:"2",
searchTitle:""
}),S.dateRange.setDate({
startDate:J.filters.beginDate,
endDate:J.filters.endDate
});
}
function l(){
U(".js_sort").on("click",function(){
var t=$(this).attr("data-sortKey");
q=t,J.currentPage=1,g(),d(),I(),m(),d(),ae={},D();
});
}
function d(){
U(".js_sort").removeClass("rank_down rank_up"),U(".js_sort_"+Y.key).addClass(Y.isDesc?"rank_down":"rank_up");
}
function _(){
S.on("filter-change",function(){
J.filters;
f();
});
}
function f(){
K(),A();
var t=+new Date;
O.get({
url:x(),
success:function(e){
var a=X.reportKeys.LOAD_ARTICLE_ITEM_AJAX_KEY,i=+new Date-t;
X.ajaxReport(a,i,wx.data.uin),T(e);
}
});
}
function m(t){
var e=U("#js_articles_items");
t||e.empty(),j();
var a=J.currentArticles;
if(!a||0===a.length)return e.html('<tr class="empty_item" ><td class="empty_tips" colspan="6">暂无数据</td></tr>'),
void jQuery("#js_articles_table").css("border-bottom","none");
jQuery("#js_articles_table").css("border-bottom","1px solid #e7e7eb;");
for(var i=0,n=a.length;n>i;i++){
var r=a[i],s=0,o=1,c=J.compareArticlesMap[r.msgid]?o:void 0,u=J.summaryData[r.msgid]||{};
r.title=z.htmldecode(r.title),r.summary=u,r.summaryList=p(u,r.publish_date);
var l=new Q(r,s,c,u);
b(l),J.allArticleItems[r.msgid]=l,e.append(l.$el),l.init();
}
}
function g(){
z.sort(J.articles,Y,q);
}
function p(t,e){
var a=[],i=e,n=E(i).add("d",7);
return n=n.format("X")>G.format("X")?G.format(F):n.format(F),z.loopDay(i,n,function(e){
t[e]&&a.push(t[e]);
},!0),a;
}
function v(t){
t?J.articles.push.apply(J.articles,W):(J.articles=W,J.allArticleItems={},J.summaryData={}),
i(V);
}
function h(){
q="timestamp",Y={
key:q,
isDesc:!1
},d(),g();
}
function y(){
J.tableArticle=null,ae={},D();
}
function j(){
0===J.articles.length?(ne.show(),re.hide()):(ne.hide(),re.show());
}
function b(t){
t.on("go-detail",function(){
J.tableArticle=t.article,D(),J.eventBus.emit("go-detail",t.article);
}),t.on("go-video",function(t,e){
J.tableArticle=e.article,D(),J.eventBus.emit("go-video",t,e);
}),t.on("folding-change",function(t,e){
t?delete ae[e.title]:ae[e.title]=e,D();
});
}
function D(){
var t=w();
t?(te.set(t),te.show()):te.hide();
}
function w(){
if(J.tableArticle)return J.tableArticle;
var t=0;
for(var e in ae)if(t++,t>1)return!1;
for(var e in ae)return ae[e];
}
function A(){
J.filters.pageNum=1;
}
function x(t,e){
var t="/misc/appmsganalysis?action=all",a=J.filters,e={
begin_date:a.beginDate,
end_date:a.endDate,
order_by:a.sortKey,
order_direction:a.sortType,
search_title:a.searchTitle
};
for(var i in e)e[i]&&(t+="&"+i+"="+encodeURI(e[i]));
return t;
}
function T(t,e){
return 0!==t.base_resp.ret?(O.handleRet(t,{
id:"64527",
key:"3"
}),e&&J.filters.pageNum--,void N()):(V=U.parseJSON(t.article_summary_data)||{
list:[]
},W=U.parseJSON(t.total_article_data).list||[],W.length<B?P():R(),k(),v(e),h(),y(),
I(),m(e),void N());
}
function k(){
W.each(function(t){
t.timestamp=+new Date(t.publish_date),t.mediaItems=[];
});
}
function I(){
J.currentPage=1,M(),Z.init({
total_count:W.length,
container:"#js_all_pager",
count:B,
currentPage:1,
callback:function(t){
t=Math.round(t),t!=J.currentPage&&(J.currentPage=t,M(),m(),ae={},D());
}
});
}
function C(){
te=new ee,te.hide(),J.vtTable=te,$("#js_all_table").html(te.dom);
}
function M(){
var t=J.currentPage,e=(t-1)*B,a=e+B;
J.currentArticles=J.articles.slice(e,a);
}
function P(){
setTimeout(function(){
U("#js_load_more").hide();
});
}
function R(){
setTimeout(function(){
U("#js_load_more").show();
});
}
function K(){
U("div.wrp_loading:eq(0)").show();
}
function N(){
U("div.wrp_loading:eq(0)").hide();
}
var Y,q,E=t("biz_common/moment.js"),J=t("statistics/article/detail/state.js"),L=t("statistics/article/detail/filters-menu.js"),O=t("common/wx/Cgi.js"),Q=t("statistics/article/detail/article-item.js"),X=t("statistics/common.js"),z=t("statistics/common.js"),e={},B=10,S=null,U=jQuery,F="YYYY-MM-DD",G=E().add("d",-1).format(F),H=(E(G).subtract(1,"months").format(F),
E().add("d",-30).format(F),U("div.js_tab_content.all")),V=null,W=null,Z=t("common/wx/pager.js"),te=null,ee=t("statistics/article/detail/sortable.js"),ae={},ie=z.sourceMap;
e.init=function(){
a(),o(),l(),C();
};
var ne=H.find("div.no_data"),re=U("#js_load_more");
return e.render=function(){
I(),m();
},e.show=function(){
H.show();
},e.hide=function(){
H.hide();
},e.closeDateRange=function(){
U("div.ta_calendar").hide();
},e.updateTable=D,e;
});