define("biz_common/utils/geolocation.js",[],function(){
function o(o){
switch(o.code){
case o.TIMEOUT:
showError("获取地址信息超时，请稍后再试！");
break;

case o.POSITION_UNAVAILABLE:
showError("对不起，无法获取您的地址信息！");
break;

case o.PERMISSION_DENIED:
showError("请允许浏览器探测您的地址信息！");
break;

case o.UNKNOWN_ERROR:
showError("网络错误！");
}
}
function e(o){
return r={
latitude:o.coords.latitude,
longitude:o.coords.longitude
},console.log(postion),r;
}
function t(t,r){
navigator.geolocation?navigator.geolocation.getCurrentPosition(t?t:e,r?r:o,{
enableHighAcuracy:!0,
timeout:5e3,
maximumAge:3e3
}):alert("浏览器暂不支持获取地址信息!");
}
var r={
latitude:0,
longitude:0
};
return{
getCurrentPosition:t
};
});