define("statistics/components/tab-bar2.js",["tpl/statistics/tab-bar2.html.js","statistics/components/event-emitter.js"],function(t){
"use strict";
function e(t){
i.call(this);
var t=t||{};
this.settings=$.extend({},n,t),this.el=null,this.$el=null,this.render(),this.listenActions(),
this.activate(0);
}
var s=template.compile(t("tpl/statistics/tab-bar2.html.js")),i=t("statistics/components/event-emitter.js"),n={
name:"Untitled Tab Bar",
tabs:[{}]
},a=$.extend(e.prototype,i.prototype);
return a.render=function(){
this.el=s(this.settings),this.$el=$(this.el);
},a.listenActions=function(){
var t=this;
this.$el.find("li a").each(function(e,s){
var i=$(s);
i.on("click",function(s){
s.stopPropagation(),t.activate(e);
});
});
},a.activate=function(t,e){
this.$el.find("li.selected").removeClass("selected"),this.$el.find("li").eq(t).addClass("selected");
var s=this.settings.tabs[t];
e||this.emit("tab-selected",t,s);
},e;
});