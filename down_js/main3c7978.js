define("statistics/article/detail/detail/multimedia/main.js",["statistics/common.js","biz_web/ui/dropdown.js","statistics/article/detail/detail/multimedia/stat-block.js","statistics/article/detail/detail/multimedia/data-process.js","statistics/article/detail/detail/multimedia/video-player.js","statistics/article/detail/detail/multimedia/renderers.js","common/wx/Cgi.js","statistics/article/detail/detail/multimedia/state.js"],function(t){
"use strict";
function e(t){
V.setVid(""),t&&i(t.selectedMediaItem)||(j(t.selectedMediaItem),_(t),p(y(t,t.selectedMediaItem)),
o(t,t.selectedMediaItem));
}
function i(t){
return t===B.selectedMediaItem;
}
function a(){
s(),n();
}
function n(){
B.blocks=D.map(C,function(t){
return d(t.name,t.render,t.size);
}),r(B.blocks);
}
function r(t){
var e=["#js_video_trend","#js_video_duration","#js_watch_time","#js_drap_start","#js_drap_end"];
e.each(function(e,i){
$(e).html(t[i].$el);
});
}
function d(t,e,i){
return new x({
name:t,
renderStat:e,
size:i
});
}
function s(){
l(),u();
}
function l(t,e){
var i=t&&t.length?t[0].name:"视频";
if(e&&e.selectedMediaItem){
var a=e.selectedMediaItem.type;
1!=a&&a?2==a?(i="语音",$("#js_play_video").hide()):(3==a||4==a)&&(i="音乐",$("#js_play_video").hide()):(i="视频",
$("#js_play_video").show());
}
new L({
container:"#js_media_drop",
label:i,
data:t||[{
name:"视频",
value:"1"
}],
callback:function(t){
console.log(t);
var i=null;
if(e.mediaItems&&e.mediaItems.length)for(var a=0;a<e.mediaItems.length;a++)if(e.mediaItems[a].type==t){
i=e.mediaItems[a],o(e,i);
break;
}
u(g(e,t),f(e,t,!0),e,t),1==t?$("#js_play_video").show():$("#js_play_video").hide();
}
});
}
function u(t,e,i){
new L({
container:"#js_media_item_drop",
label:t,
data:e,
callback:function(t){
o(i,t);
}
});
}
function o(t,e){
e&&(p(y(t,e)),V.closeVideo(),e.type===T&&V.setVid(e.id));
}
function m(t){
B.blocks.each(function(e,i){
c(e,t[i]);
});
}
function c(t,e){
t.reset({
userType:"all",
data:e
}),t.render();
}
function p(t){
if(!B.isLoading){
if(!t)return v(null);
I(),M(t,v);
}
}
function _(t,e){
e||(e=1),l(h(t,e),t,e),u(g(t),f(t,e),t,e);
}
function g(t,e){
if(!(e&&t.mediaItems&&t.mediaItems.length))return t.selectedMediaItem?t.selectedMediaItem.name:"";
for(var i=0;i<t.mediaItems.length;i++)if(t.mediaItems[i].type==e)return t.mediaItems[i].name;
}
function h(t,e){
e||(e=1);
for(var i=[],a=[],n=0;n<t.mediaItems.length;n++){
var r=t.mediaItems[n];
i.indexOf(r.type)>-1||(1!=r.type&&r.type?2==r.type?(i.push(2),a.push({
name:"语音",
value:2
})):(3==r.type||4==r.type)&&(i.push(r.type),a.push({
name:"音乐",
value:r.type
})):(i.push(1),a.push({
name:"视频",
value:1
})));
}
return a;
}
function f(t,e,i){
t&&t.selectedMediaItem&&t.selectedMediaItem.type&&!i?e=t.selectedMediaItem.type:e||(e=1);
for(var a=[],n=0;n<t.mediaItems.length;n++){
var r=t.mediaItems[n];
r.type!=e&&r.type||a.push({
name:r.name,
value:r
});
}
return a;
}
function y(t,e){
if(!e)return"";
Y=t.publish_date;
var i=3==e.type||4==e.type?3:e.type,a=e.type;
return D.makeUrl("/misc/appmsganalysis?action=get_media_all_data",{
type:i,
media_type:a,
publish_date:t.publish_date,
msg_id:t.msgid,
id:e.id
});
}
function v(t){
b(),m(F(t));
}
function j(t){
B.selectedMediaItem=t;
}
function I(){
B.isLoading=!0,D.showLoading();
}
function b(){
B.isLoading=!1,D.hideLoading();
}
function M(t,e){
R.get(t,function(t){
t=S(t),t.base_resp&&0==t.base_resp.ret?e({
play_num_trend:t.play_num_trend,
play_duration_distri:t.play_duration_distri,
watch_duration_distri:t.watch_duration_distri,
drag_duration_distri:t.drag_duration_distri
}):(R.handleRet(t,{
id:"64527",
key:"5"
}),b());
});
}
function w(t){
if(!t||!t.length)return t;
for(var e=[],i=0;7>i;i++){
var a=new Date(1e3*(new Date(Y)/1e3+86400*i)),n=a.getFullYear()+"-"+(a.getMonth()+1>=1&&a.getMonth()+1<=9?"0"+(a.getMonth()+1):a.getMonth()+1)+"-"+(a.getDate()>=1&&a.getDate()<=9?"0"+a.getDate():a.getDate()),r=new Date,d=r.getFullYear()+"-"+(r.getMonth()+1>=1&&r.getMonth()+1<=9?"0"+(r.getMonth()+1):r.getMonth()+1)+"-"+(r.getDate()>=1&&r.getDate()<=9?"0"+r.getDate():r.getDate());
if(n==d||a>r)break;
e.push(n);
}
for(var s=t,l=[],i=0;i<e.length;i++){
for(var u=!0,o=0;o<s.length;o++)if(e[i]==s[o].date){
u=!1,l.push(s[o]);
break;
}
u&&l.push({
date:e[i],
pv:0,
uv:0
});
}
return l;
}
function S(t){
var e=t.play_duration_distri;
return t.play_duration_distri=t.watch_duration_distri,t.watch_duration_distri=e,
t.play_num_trend.all&&!t.play_num_trend.all.length&&t.play_num_trend.attention&&!t.play_num_trend.attention.length&&t.play_num_trend.unattention&&!t.play_num_trend.unattention.length?t:(t.play_num_trend.all=w(t.play_num_trend.all),
t.play_num_trend.attention=w(t.play_num_trend.attention),t.play_num_trend.unattention=w(t.play_num_trend.unattention),
t.play_duration_distri&&(t.play_duration_distri=k(t.play_duration_distri,t)),t.drag_duration_distri&&(t.drag_duration_distri=k(t.drag_duration_distri,t)),
t);
}
function k(t,e){
if(!e.split_num)return t;
var i=0,a=!1;
if(t.all.length)for(var n=0;n<t.all.length;n++){
var r=t.all[n].duration;
if(r.split("-").length>2&&(a=!0),r.match("1,")){
i=r.split("1,")[1].split(",")[0].split("-")[1]-r.split("1,")[1].split(",")[0].split("-")[0];
break;
}
if(r.match("-")&&r.match(",")){
i=r.split(",")[1].split("-")[1]-r.split(",")[1].split("-")[0];
break;
}
}
if(!i)return t;
var d=function(t){
if(!t.length)return t;
for(var n=1;n<=e.split_num;n++){
for(var r=!0,d=0;d<t.length;d++){
if(a&&"1,"==t[d].duration.slice(0,2)&&t[d].duration.match(","+n+",")||!a&&t[d].duration.match(n+",")){
r=!1;
break;
}
!t[d].duration.match(/\+/);
}
r&&t.push(a?{
duration:"1,0-"+String(i)+","+String(n)+","+String((n-1)*i)+"-"+String(n*i),
pv:0,
uv:0
}:{
duration:String(n)+","+String((n-1)*i)+"-"+String(n*i),
pv:0,
uv:0
});
}
if(!a||!t[0].duration.split(",").length>2)return t;
for(var n=1;n<=e.split_num;n++){
for(var s=!0,l=!0,d=0;d<t.length;d++)t[d].duration.match(n+",")&&(t[d].duration.match(n+",")&&t[d].duration.match(n+",")[0]==t[d].duration.substring(t[d].duration.match(n+",")[0].length,t[d].duration.length)?s=!1:l=!1),
!t[d].duration.match(/\+/);
s&&t.push({
duration:String(n)+","+String((n-1)*i)+"-"+String(n*i)+","+String(e.split_num)+","+String((e.split_num-1)*i)+"-"+String(e.split_num*i),
pv:0,
uv:0
}),l&&t.push({
duration:"1,0-"+String(i)+","+String(n)+","+String((n-1)*i)+"-"+String(n*i),
pv:0,
uv:0
});
}
return console.log(t),t;
};
return t.all=d(t.all),t.attention=d(t.attention),t.unattention=d(t.unattention),
t;
}
var D=t("statistics/common.js"),L=t("biz_web/ui/dropdown.js"),x=t("statistics/article/detail/detail/multimedia/stat-block.js"),z=t("statistics/article/detail/detail/multimedia/data-process.js"),F=z.getBlocksData,V=(z.constructMediaDataFromRaw,
z.getMeidaItemsDropDownList,t("statistics/article/detail/detail/multimedia/video-player.js")),C=t("statistics/article/detail/detail/multimedia/renderers.js"),R=t("common/wx/Cgi.js"),T=1,Y="",B=$.extend(t("statistics/article/detail/detail/multimedia/state.js"),{
selectedMediaItem:null,
isLoading:!1,
blocks:[],
mediaType:T
});
return a(),{
render:e
};
});