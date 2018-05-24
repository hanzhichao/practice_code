define("cardticket/simple_search_map.js",["common/wx/sosomap/event.js","common/wx/sosomap/city_select.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/sosomap/util.js","cardticket/marker_mgr.js","cardticket/searchResult.js"],function(t){
"use strict";
var e=t("common/wx/sosomap/event.js"),s=t("common/wx/sosomap/city_select.js"),i=t("common/wx/Cgi.js"),a=t("common/wx/Tips.js"),c=(t("common/wx/sosomap/util.js"),
t("cardticket/marker_mgr.js"),t("cardticket/searchResult.js")),n={
CitySelectContainer:"",
searchInput:"",
map:null,
pageCapacity:10,
iconpath:{},
constants:{
big_size:new soso.maps.Size(26,26),
small_size:new soso.maps.Size(14,14),
big_offset:36,
small_offset:24
},
maxresult:5
},r=function(t){
var t=$.extend(!0,{},n,t);
this.opt=t,this.$cityContainer=$(t.CitySelectContainer),this.$searchInput=$(t.searchInput),
this.map=t.map,this.init();
};
return r.prototype=new soso.maps.MVCObject,$.extend(r.prototype,e),$.extend(r.prototype,{
init:function(){
var t=this,e=this.opt;
this.citySelect=new s({
container:this.$cityContainer,
area:e.area
}),this.$searchInput.keydown(function(e){
return wx.isHotkey(e,"enter")?(t.search(),$(this).blur(),!1):void 0;
}),this.searchResult=new c({
container:".resultPanel",
map:this.map,
showInfoTpl:e.showInfoTpl,
submitcheck:e.submitcheck,
submitcancel:e.submitcancel
});
},
search:function(){
if(!this.imported){
var t=this,e=(this.opt,this.map),s=this.$searchInput,c=this.citySelect;
if(e.inited){
var n=$.trim(s.val()),r=$.trim($("#js_business_name").val());
if(n||r){
var o=c.area,h=o[o.length-1]?o[o.length-1].data.id:o[o.length-2]&&o[o.length-2].data.id;
if(!h)return void a.err("请先选择省市区");
t.searching=!0,this.searchResult.clear(),i.post({
url:"/merchant/entityshop",
data:{
action:"search",
districtid:h,
keyword:n
},
complete:function(){},
error:function(){
t.searching=!1;
}
},function(e){
if(0==e.base_resp.ret){
var s=$.parseJSON(e.data);
t.updateSearchResult(s);
}else t.searching=!1,i.show(e);
});
}
}
}
},
updateSearchResult:function(t){
if(this.cancel_search)return void(this.cancel_search=!1);
this.cancel_search=!1;
{
var e=this,s=this.opt;
s.constants;
}
this.result=t;
for(var t=this.result.item,s=this.opt,e=this,i=(s.iconpath,this.selectIndex||100,
this.pageIndex||0),a=i*(s.pageCapacity||10),c=(a+s.pageCapacity,[]),n=0;n<t.length;n++)if(void 0===t[n].audit_state){
for(var r=e.citySelect.area,o="",h=0;h<r.length;h++)r[h]&&(o+=r[h].data.fullname);
o!=$.trim(t[n].address)&&c.push(t[n]);
}
t=[];
for(var n=0;n<s.maxresult&&n<c.length;n++)t.push(c[n]);
return this.searchResult.updateResult({
item:t
}),this.searching=!1,s.onsearch?void s.onsearch.call(this,t):this;
},
clear:function(){
this.searchResult.clear();
}
}),r;
});