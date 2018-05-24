define("statistics/menu_stat/summary/version-tab.js",["statistics/components/event-emitter.js","biz_web/ui/dropdown.js","statistics/menu_stat/summary/data-helper.js"],function(e){
"use strict";
function s(){
i.call(this),this.state={
needCompare:!1,
version:null,
menuOne:null,
menuTwo:null
},this.initDOM(),this.listen();
}
function t(e){
var s=[];
for(var t in e.versions)e.versions.hasOwnProperty&&s.push(t);
return s.sort(),s.reverse(),s;
}
var n=jQuery,i=e("statistics/components/event-emitter.js"),r=e("biz_web/ui/dropdown.js"),o=0,a=null,h=e("statistics/menu_stat/summary/data-helper.js"),c=s.prototype;
return c.initDOM=function(){
this.$versionsSingle=n("#js_versions_single"),this.$versionsCompare=n("#js_versions_compare"),
this.$compareBtn=n("#jq_versions_compare_btn");
},c.listen=function(){
this.listenClickCompare(),this.listenSelectVersion();
},c.reset=function(e){
return this.rawData=e,this.versions=t(e),0===this.versions.length?jQuery(".js_versions_and_menus").hide():(jQuery(".js_versions_and_menus").show(),
this.resetState(),this.resetViews(),this.renderVersionsSingle(e),void this.renderVersionsCompare(e));
},c.resetState=function(){
this.state.needCompare=!1,this.resetVersions();
},c.resetVersions=function(){
this.state.version=this.versions[0],this.state.compare_version=this.versions[1]||this.versions[0];
},c.resetViews=function(){
this.state.needCompare?(this.$versionsCompare.show(),this.$versionsSingle.hide()):(this.$versionsSingle.show(),
this.$versionsCompare.hide()),this.resetCompareBtn();
},c.resetCompareBtn=function(){
var e=this.state.needCompare?"取消对比":"按版本对比";
this.$compareBtn.html(e);
},c.disSelectAll=function(){
this.$versionsSingle.find("a.selected").removeClass("selected");
},c.listenClickCompare=function(){
var e=this;
this.$compareBtn.on("click",function(){
e.state.needCompare=!e.state.needCompare;
e.resetAfterClickCompare(),e.resetViews(),e.emitChange();
});
},c.resetAfterClickCompare=function(){
this.resetVersions(),this.state.needCompare?this.renderVersionsCompare():this.renderVersionsSingle();
},c.listenSelectVersion=function(){
var e=this;
n("body").on("click","#js_versions a.btn_default",null,function(){
var s=$(this),t=s.attr("data-version");
e.disSelectAll(),e.state.version=t,s.addClass("selected"),a&&a.reset(),e.emitChange();
});
},c.emitChange=function(){
this.emit("version-change",this.state);
},c.renderVersionsSingle=function(){
var e=this.versions.slice(0,o),s=this.versions.slice(o);
this.renderShowVersions(e),this.renderHideVersions(s);
},c.renderVersionsCompare=function(){
0!==this.versions.length&&(this.renderCompareDropdowns(),this.renderCompareMenusDropdowns());
},c.renderCompareDropdowns=function(){
var e=this;
new r({
container:"#js_version",
label:this.state.version,
data:this.getVersionsDropData(this.versions),
callback:function(s){
e.state.version=s,e.renderCompareMenusFirst(),e.emitChange();
}
}),new r({
container:"#js_version_compare",
label:this.state.compare_version,
data:this.getVersionsDropData(this.versions),
callback:function(s){
e.state.compare_version=s,e.renderCompareMenusSecond(),e.emitChange();
}
});
},c.renderCompareMenusDropdowns=function(){
this.renderCompareMenusFirst(),this.renderCompareMenusSecond();
},c.renderCompareMenusFirst=function(){
var e=this,s=this.rawData.versions[this.state.version],t=h.flattenVersionMenus(s),n=t[0]||{};
this.state.menuOne=n.value,new r({
container:"#js_menu",
label:t[0].name,
data:t,
callback:function(s){
e.state.menuOne=s,e.emitChange();
}
});
},c.renderCompareMenusSecond=function(){
var e=this,s=this.rawData.versions[this.state.compare_version],t=h.flattenVersionMenus(s),n=t[0]||{};
this.state.menuTwo=n.value,new r({
container:"#js_menu_compare",
label:n.name,
data:t,
callback:function(s){
e.state.menuTwo=s,e.emitChange();
}
});
},c.renderShowVersions=function(e){
$("#js_versions").empty(),e.each(function(e,s){
var t=n('<a class="btn btn_default"></a>');
t.text(e),t.attr("data-version",e),0===s&&t.addClass("selected"),$("#js_versions").append(t);
});
},c.renderHideVersions=function(e){
if(0!==e.length){
var s,t=[],n=this.lastestVersion;
e.each(function(e){
s=e===n?"最近版本 ":"",t.push(s+e);
});
var i=this;
a=new r({
container:"#js_versions_drop",
label:t[0],
data:i.getVersionsDropData(t),
callback:function(e){
i.disSelectAll(),i.state.version=e.replace("最近版本 ",""),i.emitChange();
}
});
}
},c.getVersionsDropData=function(e){
var s=[];
return e.each(function(e){
s.push({
value:e,
name:e
});
}),s;
},$.extend(s.prototype,i.prototype),new s;
});