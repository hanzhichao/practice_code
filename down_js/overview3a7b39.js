define("statistics/article/detail/detail/overview.js",[],function(e,r){
"use strict";
var a,t,s=jQuery,r={},i={
autoStep:!1,
chartType:"bar",
height:300,
width:"100%",
dataFormat:"1",
theme:"wechat",
chartOptions:{
chart:{
events:{
load:function(){
function e(e,a,t,s){
{
var n=i+(a.height+(e.height-a.height)/2);
r.renderer.text((100*s).toFixed(2)+"%",n,t).attr({
zIndex:5
}).css({
color:"rgba(68, 181, 73, 0.8)",
fontSize:"15px",
zIndex:999
}).add();
}
}
var r=this,s=this.series[2].segments[0],i=150;
e(s[0].graphic,s[1].graphic,68,a),e(s[1].graphic,s[2].graphic,115,t);
}
}
},
plotOptions:{
series:{
marker:{
enabled:!1
},
fillColor:"rgba(68, 181, 73, 0.2)",
lineWidth:0
}
}
}
};
return r.render=function(e){
a=0===e.target_user?0:e.int_page_from_session_read_user/e.target_user,t=0===e.int_page_from_session_read_user?0:e.feed_share_from_session_user/e.int_page_from_session_read_user,
i.categories=["送达","公众号会话阅读","从公众号分享到朋友圈","在朋友圈再次分享","在朋友圈阅读"];
var r=[{
y:e.target_user
},{
y:e.int_page_from_session_read_user
},{
y:e.feed_share_from_session_user
},{
y:null
},{
y:null
}];
i.series=[{
type:"area",
data:r,
color:"rgba(68, 181, 73, 0.2)",
showInLegend:!1,
enableMouseTracking:!1
},{
data:[{
y:null
},{
y:null
},{
y:null
},{
y:e.feed_share_from_feed_user
},{
y:e.int_page_from_feed_read_user
}],
name:"二次传播",
color:"rgb(74, 144, 226)",
legendIndex:1
},{
data:r,
color:"rgb(68, 181, 73)",
name:"一次传播",
legendIndex:0
}],s("#js_overview_chart").createChart(i);
},r;
});