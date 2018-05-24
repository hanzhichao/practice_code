define("statistics/components/tab-bar.js",["tpl/statistics/tab-bar.html.js","statistics/components/event-emitter.js"],function(t){
"use strict";
function s(t){
e.call(this);
var t=t||{};
this.settings=$.extend({},n,t),this.el=null,this.$el=null,this.render(),this.listenActions(),
this.activate(0);
}
var i=template.compile(t("tpl/statistics/tab-bar.html.js")),e=t("statistics/components/event-emitter.js"),n={
name:"Untitled Tab Bar",
tabs:[{}]
},a=$.extend(s.prototype,e.prototype);
return a.render=function(){
this.el=i(this.settings),this.$el=$(this.el);
},a.listenActions=function(){
var t=this;
this.$el.find("div.tabs a").each(function(s,i){
var e=$(i);
e.on("click",function(i){
i.stopPropagation(),t.activate(s);
});
});
},a.activate=function(t,s){
this.$el.find("div.tabs a.current").removeClass("current"),this.$el.find("div.tabs a").eq(t).addClass("current");
var i=this.settings.tabs[t];
s||this.emit("tab-selected",t,i);
},s;
});