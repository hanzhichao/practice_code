define("cardticket/searchResult.js",["common/wx/Tips.js","common/wx/sosomap/event.js","cardticket/store_marker.js","tpl/cardticket/search_result.html.js","biz_web/ui/dropdown.js","common/wx/sosomap/util.js","cardticket/marker_mgr.js","page/cardticket/store_map.css"],function(e){
"use strict";
function t(e){
this.opt=$.extend(!0,{},r,e),this._init();
}
function s(e,t){
e.css("background-color",t?"#EEEEEE":"#FFFFFF"),t?e.addClass("selected"):e.removeClass("selected");
}
var a=(e("common/wx/Tips.js"),e("common/wx/sosomap/event.js")),i=(e("cardticket/store_marker.js"),
e("tpl/cardticket/search_result.html.js")),n=(e("biz_web/ui/dropdown.js"),e("common/wx/sosomap/util.js"),
e("cardticket/marker_mgr.js"));
e("page/cardticket/store_map.css"),template.helper("$num2char",function(e){
return e+="",String.fromCharCode(e.charCodeAt(0)+17);
});
var o={
selector_page:"*[pageIndex]",
selectol_item:"li[item]"
},r={
container:null,
showPageCount:5,
pageCapacity:10,
map:null
},p=wx.cgiData.iconpath,d={
big_size:new soso.maps.Size(26,26),
small_size:new soso.maps.Size(14,14),
big_offset:36,
small_offset:24
};
return t.prototype=new soso.maps.MVCObject,$.extend(t.prototype,a),$.extend(t.prototype,{
_init_events:!1,
_init:function(){
var e=this.opt;
this.$dom=$(e.container),this.sosomap=e.map,this.mgr=new n;
},
updateResult:function(e){
{
var t=this;
this.opt;
}
e&&(t.result=e),t.result&&(t._initDom(t.result),t.selectIndex||(t.selectIndex=0),
t.updateIndexStyle(),t._bindEvents(),t._updateMarker(),t.showCurrent());
},
showCurrent:function(){
var e=this.opt,t=this.selectIndex||0,s=(e.pageCapacity*this.result.pageIndex,this.pagedata[t]);
if(s){
var a=this.mgr.find(s.latitude,s.longitude),i=a.getData();
this.sosomap.map.setCenter(i.latLng),a.loading||(a.delayOpenWindow=!0,a.openWindow());
}
},
findMarker:function(e,t){
var s=this.mgr.find(e,t);
return s;
},
_updateMarker:function(){
var e=[],t=this.result.state,s=this.result.item,a=this.opt,i=this,n=this.selectIndex||0,o=this.result.pageIndex*a.pageCapacity,r=o+a.pageCapacity;
if(t)for(var c=0;c<s.length;c++)s[c].audit_state==t&&e.push(s[c]);else e=s;
this.mgr.clear(),s=e;
for(var c=0;c<s.length;c++)!function(e){
var t,c,l,h=null,u=e%a.pageCapacity,m=1e3;
e>=o&&r>e?(c=d.big_size,l=new soso.maps.Point(0,d.big_offset*u),s[e].audit_state&&u==n&&(t=p.page_used_selected,
m=1001),s[e].audit_state&&u!=n&&(t=p.page_used_unselected),s[e].audit_state||u!=n||(t=p.page_unused_selected,
m=1001),s[e].audit_state||u==n||(t=p.page_unused_unselected),h=new soso.maps.MarkerImage(t,c,l)):(t=p.other_page,
c=d.small_size,h=s[e].audit_state?new soso.maps.MarkerImage(t,c,new soso.maps.Point(0,0)):new soso.maps.MarkerImage(t,c,new soso.maps.Point(0,d.small_offset)));
var g=i.mgr.add({
sosomap:i.sosomap,
data:s[e],
icon:h,
zIndex:m,
showInfoTpl:a.showInfoTpl,
submitcheck:a.submitcheck,
submitcancel:a.submitcancel
});
g.on("marker:datachanged",function(){
var e=i.mgr.indexOf(this);
i.isCurrentPage(e)&&i.updateResult();
}),g.on("marker:delete",function(e){
i.deleteData(e);
}),g.on("marker:updateidx",function(){
var e=i.opt,t=i.result.pageIndex*e.pageCapacity,s=t+e.pageCapacity,a=i.mgr.indexOf(this);
a>=t&&s>a&&(i.selectIndex=a%e.pageCapacity,i.updateIndexStyle());
});
}(c);
return this;
},
_initDom:function(e){
var t,s=[],a=(e.pageIndex||0)+1,n=this,o=this.opt,r=e.item.length,p=e.state,d=[];
if(p)for(var c=0;r>c;c++)e.item[c].audit_state==p&&s.push(e.item[c]);else s=e.item;
if(r=s.length,t=Math.ceil(r/o.pageCapacity),e.pageIndex||(e.pageIndex=0),t>1){
a>t&&(a=t);
var l=o.showPageCount;
1!==a&&l--,a!==t&&l--;
var h=1;
if(t>l)for(d.push(a);d.length<l;)a-h>0&&d.unshift(a-h),t>=a+h&&d.push(a+h),h++;else for(;t>=h;)d.push(h++);
}
for(var u=o.pageCapacity*e.pageIndex,m=u+o.pageCapacity,g=[],c=u;c<s.length&&m>c;c++)s[c].index=c+1,
s[c].telephone=$.trim(s[c].telephone),g.push(s[c]);
this.show(),this.$dom.find(".js_result_content").remove(),this.$dom.html(template.compile(i)({
data:g,
page:d,
totalNum:r,
currentPage:a,
pageIndex:e.pageIndex||0,
totalPage:t,
pageCapacity:o.pageCapacity
})),this.$dom.find(".js_create_shop").click(function(){
n.trigger("result:create");
}),this.pagedata=g;
var f,p=e.state;
f=2==p?"审核中":3==p?"审核通过":4==p?"审核失败":"所有门店",this.pageClick===!0&&(this.pageClick=!1,
this.scrollToBottom());
},
setPageIndex:function(e){
var t=self.result;
t&&(t.pageIndex=e);
},
setSelectedIndex:function(e){
this.selectIndex=e;
},
scrollToBottom:function(){
var e=this;
setTimeout(function(){
var t=e.$dom.height(),s=e.$dom.find("ol").height(),a=e.$dom.find("[class=page]").height();
e.$dom.scrollTop(s-t+a+20);
},100);
},
_bindEvents:function(){
if(!this._init_events){
this._init_events=!0;
{
var e=this;
e.opt;
}
this.$dom.delegate(o.selector_page,"click",function(){
e.pageClick=!0;
var t=1*this.getAttribute("pageIndex")-1;
e.result.pageIndex=t,e.selectIndex=0,e.updateResult(e.result);
}),this.$dom.delegate(o.selectol_item,"click",function(){
var t=e.result,s=e.pagedata,a=(t.pageIndex,this.getAttribute("item")),i=parseInt(a)-1,n=s[i];
e.selectIndex=a-1,e.mgr.hideAll(),e.updateIndexStyle();
var o=e.sosomap;
o.map.setCenter(new soso.maps.LatLng(n.latitude,n.longitude)),o.map.getZoom()<13&&o.map.zoomTo(13),
e._updateMarker(),e.showCurrent();
});
}
},
updateIndexStyle:function(){
var e=(this.result,this.selectIndex);
"undefined"==typeof e&&(e=-1);
var t=this.lastIndex;
t>=0&&s(this.$dom.find("ol li:nth-child("+(t+1)+")"),!1),s(this.$dom.find("ol li:nth-child("+(e+1)+")"),!0),
this.lastIndex=e;
},
appendData:function(e){
var t=this.result;
t.item.length%this.opt.pageCapacity==0?(t.pageIndex++,this.selectIndex=0):this.selectIndex=t.item.length%this.opt.pageCapacity,
t.item.push(e),this.updateResult();
},
isCurrentPage:function(e){
var t=this.opt,s=this.result.pageIndex*t.pageCapacity,a=s+t.pageCapacity;
return e>=s&&a>e;
},
deleteData:function(e){
for(var t=this.result.item,s=0;s<t.length;s++)if(t[s].wx_poi_uid==e.wx_poi_uid){
t.splice(s,1);
var a=this.mgr.findByIndex(s);
a&&a.destroy(),this.isCurrentPage(s)&&(this.selectIndex=0);
break;
}
this.updateResult();
},
show:function(){
this.$dom.show(),this.sosomap.$mapDiv.css("margin-left","267px");
},
hide:function(){
this.$dom.hide(),this.sosomap.$mapDiv.css("margin-left","0");
},
clear:function(){
this.mgr.clear(),this.$dom.children().remove(),this.hide();
},
destroy:function(){
this.off(),this.mgr.clear();
},
clearMarker:function(){
this.mgr.clear();
}
}),t;
});