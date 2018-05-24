define("statistics/article/detail/sortable.js",["statistics/common.js","biz_common/virtual-template.js","tpl/statistics/article-table.html.js"],function(t){
"use strict";
function a(t){
var t=t||{};
this.renderData=$.extend(r,{
article:t
}),this.vt=new i(this.renderData),this.dom=this.vt.dom,this.listen();
}
var s=(t("statistics/common.js"),t("biz_common/virtual-template.js")),e=t("tpl/statistics/article-table.html.js");
template.helper("showifnotempty",function(t){
return"undefined"==typeof t?"-":t;
}),template.helper("getSort",function(t,a,s){
var e='<span class="icon_rank">';
return e+=t==a?s?'<i class="arrow arrow_down"></i>':'<i class="arrow arrow_up"></i>':'<i class="arrow arrow_down"></i><i class="arrow arrow_up"></i>',
e+="</span>";
});
var i=s(template.compile(e)),r={
isShow:!1,
article:{},
data:[],
key:"",
isDesc:!0
};
return a.prototype.listen=function(){
var t=this,a=this.vt.data;
$(this.dom).find(".rank_area").on("click",function(){
var s,e=$(this).attr("data-key");
s=e==a.key?!a.isDesc:!1,a.key=e,a.isDesc=s,a.data.sort(function(t,a){
var i,r;
return"date"==e?(i=+new Date(t.ref_date),r=+new Date(a.ref_date)):(i=t[e],r=a[e]),
s?r-i:i-r;
}),t.vt.setData(a);
});
},a.prototype.show=function(){
this.vt.setData({
isShow:!0
});
},a.prototype.hide=function(){
this.vt.setData({
isShow:!1
});
},a.prototype.set=function(t){
this.vt.setData({
key:"",
isDesc:!1,
article:t,
data:$.extend(!0,[],t.summaryList),
downloadLink:wx.url("/misc/appmsganalysis?action=all&begin_date=%s&end_date=%s&download=1&msgid=%s".sprintf(t.publish_date,t.publish_date,t.msgid))
});
},a;
});