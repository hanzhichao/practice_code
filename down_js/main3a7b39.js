define("statistics/article/detail/main.js",["statistics/components/tab-bar.js","statistics/components/event-emitter.js","statistics/article/detail/state.js","statistics/article/detail/all.js","statistics/article/detail/compare.js","statistics/article/detail/detail/main.js","statistics/common.js","statistics/article/detail/click-report.js","statistics/article/top.js"],function(t){
"use strict";
function i(){
s(),a(),_.init(),w.init(),_.render(),_.show(),d(),e(),j();
}
function e(){
E.help("#js_ask_icon","#js_pop_items_info");
}
function s(){
h.extend(!0,p,{
filters:{},
articles:window.cgiData.list||[],
detailArticle:null,
currentTab:"all",
tabBar:null,
compareArticles:[],
isCompareChange:!0,
compareArticlesMap:{},
allArticleItems:{},
summaryData:{},
compareSummaryData:{},
eventBus:new f
});
}
function a(){
c();
}
function c(){
p.eventBus.on("go-detail",T(r,l(0),n("detail"),m)),p.eventBus.on("go-video",function(t,i){
T(r,o(i),n("video"),m)(t);
});
}
function n(t){
return function(){
w.activate(t);
};
}
function o(t){
return function(i){
i.selectedMediaItem=t;
};
}
function l(t){
return function(i){
i.selectedMediaItem=i.mediaItems[t];
};
}
function r(t){
p.detailArticle=t;
}
function d(){
h("#js_back").on("click",function(){
h(".wrp_overview").removeClass("wrp_overview_detial"),u(),delete p.tableArticle,
_.updateTable();
});
}
function u(){
w.hide(),v.hide(),_.show();
}
function m(){
h(".wrp_overview").addClass("wrp_overview_detial"),_.hide(),v.hide(),w.show();
}
function j(){
"0"===window.cgiData.load_done?$(".js_delay_info").show():$(".js_delay_info").hide();
}
var f=(t("statistics/components/tab-bar.js"),t("statistics/components/event-emitter.js")),p=t("statistics/article/detail/state.js"),_=t("statistics/article/detail/all.js"),v=t("statistics/article/detail/compare.js"),w=t("statistics/article/detail/detail/main.js"),h=jQuery,A={},E=t("statistics/common.js"),I=t("statistics/article/detail/click-report.js"),T=E.seqRun,b=t("statistics/article/top.js");
b.selected("article_detail"),A.compare=function(){
v.render(),_.hide(),w.hide(),v.show();
},i(),I.init(),seajs.use("statistics/report.js",function(t){
t(E.logKeys.ARTICLE_DETAIL_NETWORK_OVERTIME,E.logKeys.ARTICLE_DETAIL_JS_OVERTIME,E.reportKeys.ARTICLE_DETAIL_PAGE);
});
});