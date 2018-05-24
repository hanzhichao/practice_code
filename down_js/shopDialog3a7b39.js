define("ibeacon/shopDialog.js",["biz_web/ui/checkbox.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/sosomap/city_select.js","biz_web/ui/dropdown.js","common/wx/pagebar.js","common/wx/sosomap/util.js"],function(o){
"use strict";
o("biz_web/ui/checkbox.js"),o("common/wx/popup.js");
var t=o("common/wx/Cgi.js"),e=o("common/wx/sosomap/city_select.js"),i=(o("biz_web/ui/dropdown.js"),
o("common/wx/pagebar.js")),n=o("common/wx/sosomap/util.js"),s=function(o){
this.container=o.container,this.title=o.title,this.className=o.className,this.onShow=o.onShow,
this.onHide=o.onHide,this.buttons=o.buttons,this.width=o.width,this.shopRecords=o.shopRecords,
this.shopCount=o.shopCount,this.getRecord=o.getRecord,this.init();
},c={
province:"",
city:"",
district:"",
key:"",
pageIndex:1,
shopRecords:"",
shopCount:0,
locationName:"",
locationID:""
};
s.prototype.init=function(){
var o=this;
return c.shopRecords=o.shopRecords,c.shopCount=o.shopCount,$(o.container).popup({
title:o.title,
width:o.width,
className:o.className,
buttons:o.buttons,
onShow:function(){
c.$jsStoreTbody=this.$dialogWrp.eq(0).find(".js_store_tbody"),c.$jsHasChoose=this.$dialogWrp.eq(0).find(".js_has_choose"),
c.$jsPagination=this.$dialogWrp.eq(0).find(".pagination_wrp"),c.$jsShopSearch=this.$dialogWrp.eq(0).find(".js_shop_search"),
c.$jsShopSearchInput=this.$dialogWrp.eq(0).find(".js_shop_search_input"),c.$jsLoading=this.$dialogWrp.eq(0).find(".js_loading"),
c.$jsLoading.hide(),c.$citySelector=new e({
container:".js_container",
plsSelect:!0
}),c.$citySelector.on("city:changed",function(){
h();
}),a(),o.getRecord?(c.$jsLoading.show(),t.get({
url:"/merchant/beacongetmplocations?action=list&page_index=1&f=json",
success:function(o){
0==o.base_resp.ret&&(c.$jsLoading.hide(),c.shopRecords=JSON.parse(o.records),c.shopCount=o.record_count,
p(0,10),r());
}
})):(p(0,10),r());
},
onHide:o.onHide
}),o;
},s.prototype.getLocation=function(){
return{
locationName:c.locationName,
locationID:c.locationID
};
};
var a=function(){
c.$jsShopSearch.click(function(){
c.key=c.$jsShopSearchInput.val(),h();
}),c.$jsShopSearchInput.on("keyup",function(){
var o="which"in event?event.which:event.keyCode;
13!=o&&$(this).val()||(c.key=$(this).val(),h());
}),c.$jsShopSearchInput.on("change",function(){
c.key=$(this).val();
});
},r=function(){
c.shopCount>0&&(c.$jsPageBar=new i({
container:c.$jsPagination,
perPage:10,
first:!1,
last:!1,
isSimple:!0,
initShowPage:1,
totalItemsNum:c.shopCount,
callback:function(o){
var t=o.currentPage;
p(10*(t-1),10*t);
}
}),c.$jsPagination.show());
},h=function(){
c.locationID="",c.locationName="";
var o=c.$citySelector.area;
c.province=o[0]&&o[0].data&&o[0].data.fullname||"",c.city=o[1]&&o[1].data&&o[1].data.fullname||"",
c.district=o[2]&&o[2].data&&o[2].data.fullname||"",n.isTerritory(c.province)&&(c.district=c.city,
c.city=c.province,c.province=""),c.province=encodeURIComponent(c.province),c.city=encodeURIComponent(c.city),
c.district=encodeURIComponent(c.district),c.$jsLoading.show(),c.$jsStoreTbody.hide(),
t.get({
url:"/merchant/beacongetmplocations?action=list&f=json&page_index="+c.pageIndex+"&province="+c.province+"&city="+c.city+"&district="+c.district+"&keyword="+c.key,
success:function(o){
0==o.base_resp.ret?(c.$jsLoading.hide(),c.$jsStoreTbody.show(),c.$jsPagination.hide(),
c.$jsPagination.html(""),c.shopRecords=JSON.parse(o.records),c.pageIndex=1,c.shopCount=o.record_count,
p(0,10),r()):Tips.err("系统错误");
}
});
},p=function(o,t){
c.$jsStoreTbody.html(template.render("js_store_list_tpl",{
list:c.shopRecords.slice(o,t)
})),c.$jsStoreTbody.find(".js_checkbox").checkbox({
multi:!1,
onChanged:function(o){
c.locationID=o.data("id"),c.locationName=o.data("name"),c.$jsHasChoose.html("已选门店："+c.locationName);
}
});
};
return s;
});