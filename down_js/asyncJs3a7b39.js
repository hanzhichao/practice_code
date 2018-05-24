define("biz_common/utils/asyncJs.js",[],function(){
function e(e){
e.baseJS&&(c=e.baseJS);
}
function o(e){
var o=document.createElement("script");
o.src=location.protocol+"//"+n+c+e.url,o.type="text/javascript",o.async=!0,t.appendChild(o);
}
var t=document.head||document.getElementsByTagName("head")[0],n="mp.weixin.qq.com"==location.host?"res.wx.qq.com":location.host,c="";
return{
loadJS:o,
config:e
};
});