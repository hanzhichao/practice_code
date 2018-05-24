define("statistics/article/detail/article-item.js",["statistics/chart/jquery-chart.js","statistics/components/trapezoid.js","common/wx/pager.js","statistics/chart/pie.js","tpl/statistics/article-item.html.js","tpl/statistics/article-item-nested-media.html.js","statistics/components/event-emitter.js","biz_web/ui/dropdown.js","biz_common/moment.js","statistics/common.js"],function(t){
"use strict";
function i(t,i,e,s){
m.call(this),this.chartKey="int_page_read_user",this.summary=s||{},this.cid=j++,
this.article=t,this.makeSources(),this.type=i,this.state=e||E,this.$el=p(l(t)),this.d_compare=this.$el.find("a.link_constract"),
this.d_detail=this.$el.find(".link_detail:eq(0)"),this.d_chart=this.$el.find("div.js_chart"),
this.listenEvents();
}
function e(t){
var i=t.article.publish_date,e=f(i).add("d",7),s=[],a=[];
return e=e.format("X")>y.format("X")?y.format(x):e.format(x),g.loopDay(i,e,function(i){
s.push(i);
var e=t.summary[i];
a.push({
name:i,
y:e?e[t.chartKey]:0
});
}),A.categories=s,A.series=[{
data:a,
dataFormat:1,
name:C[t.chartKey],
yAxis:0
}],p.extend({},A);
}
function s(t){
return v(t.mediaItems,function(t,i){
return{
data:t,
index:i
};
});
}
function a(t,i){
return function(e){
return t(i(e));
};
}
function r(t,i){
return function(e){
var s=(e-1)*i,a=s+i;
return t.slice(s,a);
};
}
function n(t,i){
return function(e){
t.html(_({
items:e,
outdate:i
}));
};
}
function o(t){
var i=f(t.publish_date).format("X"),e=f("2016-06-15").format("X");
return e>i;
}
function d(t,i,e,s){
c.init({
total_count:i,
container:t,
count:e,
currentPage:1,
callback:s
});
}
t("statistics/chart/jquery-chart.js"),t("statistics/components/trapezoid.js");
var c=t("common/wx/pager.js"),h=t("statistics/chart/pie.js"),l=template.compile(t("tpl/statistics/article-item.html.js")),_=template.compile(t("tpl/statistics/article-item-nested-media.html.js")),m=t("statistics/components/event-emitter.js"),u=t("biz_web/ui/dropdown.js"),p=jQuery,f=t("biz_common/moment.js"),g=t("statistics/common.js"),v=g.map,j=0,y=f().add("d",-1),w=250,b=467,C={
int_page_read_user:"图文总阅读人数",
ori_page_read_user:"原文页阅读人数",
share_user:"分享转发人数",
add_to_fav_user:"微信收藏人数"
},x="YYYY-MM-DD",k=0,z=1,E=0,W=1,F="加入图文对比",S="立即去图文对比",D="取消图文对比",M=p.extend(i.prototype,m.prototype);
M.makeSources=function(){
this.sources=[];
var t=[["int_page_from_session_read_count","公众号会话"],["int_page_from_friends_read_count","好友转发"],["int_page_from_feed_read_count","朋友圈"],["int_page_from_hist_msg_read_count","历史消息"],["int_page_from_kanyikan_read_count","看一看"],["int_page_from_souyisou_read_count","搜一搜"],["int_page_from_other_read_count","其它"]],i=this,e=this.article;
t.each(function(t){
e[t[0]]&&i.sources.push({
y:e[t[0]],
name:t[1]
});
});
},M.init=function(){
this.initDropdown(),this.initFold(),IS_SHOW_OLD_VERSION?this.$el.find(".js_media_wrap").hide():this.initMedia();
},M.draw=function(){
this.drawWording(),this.drawEmptyPie(),this.drawChart();
},M.drawEmptyPie=function(){
var t=!0;
return this.sources.each(function(i){
i.y&&(t=!1);
}),t?void this.$el.find(".empty-pie").hide():(this.$el.find(".js_no_data").hide(),
this.sources.length>3&&this.$el.find(".empty-pie").css({
height:this.$el.find(".empty-pie").height()+25
}),void h(this.$el.find(".empty-pie").get(0),{
series:[{
name:"人数",
data:this.sources
}],
size:180,
chart:{
backgroundColor:"#f4f5f9"
},
legend:{
itemMarginBottom:10
},
titleText:"<b class='pie-text'>%s次</b><br/><b class='pie-text'>%s人</b><br/><span>阅读总数</span>".sprintf(this.article.int_page_read_count,this.article.int_page_read_user),
plotOptions:{
pie:{
colors:["#3EB642","#237C30","#74C4F1","#468EE5","#E7EC93","#B3B3B3"]
}
}
}));
},M.initDropdown=function(){
var t=this,i="js_dropdown_"+this.cid,e=this.$el.find("div.js_dropdown");
e.attr("id",i).css({
width:"150px"
}),new u({
container:"#"+i,
label:"图文总阅读人数",
data:[{
value:"int_page_read_user",
name:"图文总阅读人数"
},{
value:"ori_page_read_user",
name:"原文页阅读人数"
},{
value:"share_user",
name:"分享转发人数"
},{
value:"add_to_fav_user",
name:"微信收藏人数"
}],
callback:function(i){
t.chartKey=i,t.drawChart();
}
});
},M.initFold=function(){
this.isFolded=!0,this.$info=this.$el.eq(2),this.$tr=this.$el.eq(0);
var t=this;
this.$el.find(".js_fold").on("click",function(){
t.isFolded=!t.isFolded,t.isFolded?(t.$info.hide(),t.$tr.removeClass("tr_chosen")):(t.$info.show(),
t.drawed||(t.draw(),t.drawed=!0),t.$tr.addClass("tr_chosen")),t.emit("folding-change",t.isFolded,t.article);
});
},M.drawWording=function(){
this.type===k?this.changeWording(this.state===E?F:S):this.type===z&&this.changeWording(D);
},M.drawChart=function(){
var t=e(this);
this.d_chart.attr("id","js_chart_"+this.cid),this.d_chart.css({
height:w,
width:b
});
var i=this;
i.d_chart.createChart(t);
};
var q=.3,A={
autoStep:!0,
chartOptions:{
chart:{
backgroundColor:"#f4f5f9"
},
yAxis:{
gridLineColor:"#CCCCCC",
gridLineWidth:q,
lineWidth:q
},
xAxis:{
lineWidth:0
}
},
chartType:"area",
dataFormat:"1",
enableLegend:!1,
height:w,
width:b,
isCompareSeries:0,
labelFormat:0,
theme:"wechat"
};
return M.drawTrapezoid=function(){
var t=[],i=this.d_trapezoid=this.$el.find("div.trapezoid");
i.css({
width:"180px",
height:"132px"
}),i.attr("id","trapezoid"+this.cid),t[0]=this.article.target_user,t[1]=this.article.int_page_read_user,
t[2]=this.article.ori_page_read_user,t[3]=this.article.share_user+this.article.add_to_fav_user,
i.trapezoid(t);
},M.changeWording=function(t){
this.d_compare.text(t);
},M.listenEvents=function(){
var t=this;
this.d_compare.on("click",function(i){
i.preventDefault(),t.changeStateAndEmit();
}),this.d_detail.on("click",function(i){
i.preventDefault(),t.emit("go-detail",t);
});
},M.changeStateAndEmit=function(){
this.type===k?this.state===E?(this.emit("add-to-list"),this.state=W,this.changeWording(S)):this.emit("go-compare"):this.type===z&&this.emit("remove-from-list",this);
},M.changeToWaitState=function(){
this.type===k&&(this.state=E,this.changeWording(F));
},M.initMedia=function(){
this.article.mediaItems=this.article.media_data_list||[];
var t=4,i=s(this.article),e=r(i,t),c=n(this.$el.find(".js_media_table"),o(this.article));
c(e(1)),d(this.$el.find(".js_pager"),i.length,t,a(c,e)),this.listenMediaClick(this.$el,i);
},M.listenMediaClick=function(){
var t=this;
this.$el.on("click",".js_meida_detail",null,function(){
var i=+$(this).attr("data-index");
t.emit("go-video",t.article,t.article.mediaItems[i]);
});
},i;
});