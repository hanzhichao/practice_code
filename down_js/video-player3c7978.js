define("statistics/article/detail/detail/multimedia/video-player.js",[],function(e,i){
"use strict";
function t(){
f.on("click",function(e){
e.preventDefault();
var i=a.sprintf(r),t=$('<iframe src="%s"></iframe>'.sprintf(i));
s.find("iframe").remove(),s.append(t),o.show();
}),l.on("click",function(e){
e.preventDefault(),n();
});
}
function n(){
s.find("iframe").remove(),o.hide();
}
var r=null,a="https://v.qq.com/iframe/preview.html?vid=%s&width=500&height=375&auto=0",o=$("#js_video_player_wrapper"),s=$("#js_video_player"),f=$("#js_play_video"),l=$("#js_close_player");
t(),i.closeVideo=n,i.setVid=function(e){
r=e;
};
});