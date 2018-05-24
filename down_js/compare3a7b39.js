define("statistics/article/detail/compare.js",["statistics/article/detail/state.js","statistics/article/detail/article-item.js"],function(e,t){
"use strict";
function i(){
0===s.compareArticles.length?m.show():m.hide();
}
function a(e){
e.on("remove-from-list",function(){
e.$el.remove();
var t=s.compareArticles;
t.each(function(i,a){
i.msgid===e.article.msgid&&t.splice(a,1);
}),i(),c(e);
var a=e.article.msgid;
delete s.compareArticlesMap[a],delete s.compareSummaryData[a];
}),e.on("go-detail",function(){
s.eventBus.emit("go-detail",e.article);
});
}
function c(e){
var t=s.allArticleItems[e.article.msgid];
t&&t.changeToWaitState();
}
var s=e("statistics/article/detail/state.js"),r=e("statistics/article/detail/article-item.js"),n=jQuery,t={},o=n("div.js_tab_content.compare"),l=o.find("div.js_compare_articles"),m=o.find("div.page_msg");
return t.render=function(){
i(),s.isCompareChange&&(l.empty(),s.compareArticles.each(function(e){
var t=1,i=s.compareSummaryData[e.msgid],c=new r(e,t,void 0,i);
a(c),l.append(c.$el),c.init();
}),s.isCompareChange=!1);
},t.show=function(){
o.show();
},t.hide=function(){
o.hide();
},t;
});