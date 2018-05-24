define("statistics/article/detail/detail/multimedia/stat-block.js",["statistics/components/tab-bar2.js","tpl/statistics/video-stat-block.html.js"],function(t,e,s){
"use strict";
function i(t){
this.$el=$(o(t)),this.$el.find(".js_render_area").css($.extend({
width:760,
height:320,
margin:"30px auto"
},t.size||{})),this.setRenderId(),this.initUesrTypeTabBar(),this.reset(t);
}
function r(t){
return{
"non-fans":2,
fans:1,
all:0
}[t];
}
function a(t){
return t&&t.length>0;
}
var n=t("statistics/components/tab-bar2.js"),o=template.compile(t("tpl/statistics/video-stat-block.html.js")),d=!1;
i.prototype.initUesrTypeTabBar=function(){
this.tabbar=new n({
tabs:[{
text:"全部",
userType:"all"
},{
text:"已关注用户",
userType:"fans"
},{
text:"未关注用户",
userType:"non-fans"
}]
});
var t=this;
this.tabbar.on("tab-selected",function(e,s){
t.setUserType(s.userType),t.render();
}),d&&this.$el.find(".js_user_type_bar").append(this.tabbar.$el);
},i.prototype.render=function(){
this.updateTabBar();
var t=this.data[this.userType];
a(t)?(this.showRenderArea(),this.renderStat(t,this.$el.find(".js_render_area"))):this.hideRenderArea();
},i.prototype.showRenderArea=function(){
this.$el.find(".js_render_area").show(),this.$el.find(".js_empty").hide();
},i.prototype.hideRenderArea=function(){
this.$el.find(".js_render_area").hide(),this.$el.find(".js_empty").show();
},i.prototype.reset=function(t){
this.name=t.name||this.name,this.userType=t.userType||this.userType||"all",this.renderStat=t.renderStat||this.renderStat||$.noop,
this.data=t.data||this.data||{};
},i.prototype.updateTabBar=function(){
this.tabbar.activate(r(this.userType),!0);
},i.prototype.setUserType=function(t){
this.userType=t;
};
var h=0;
i.prototype.setRenderId=function(){
this.$el.find(".js_render_area").attr("id","js_random_id_of_render_"+h++);
},s.exports=i;
});