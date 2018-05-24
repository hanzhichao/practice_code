define("common/wx/mpEditor/plugin/wheelEventAdapter.js",[],function(){
"use strict";
function e(){
if(r.isIe){
var e=window.navigator.userAgent.toLowerCase(),t=e.match(/(?:msie\s([\w.]+))/),o=e.match(/(?:trident.*rv:([\w.]+))/),n=0;
n=t&&o&&t[1]&&o[1]?Math.max(1*t[1],1*o[1]):t&&t[1]?1*t[1]:o&&o[1]?1*o[1]:0,r.ieVersion=n;
}
try{
return new WheelEvent("wheel"),void(r.support="wheel");
}catch(i){}
if(void 0!==document.onmousewheel)return void(r.support="mousewheel");
try{
return document.createEvent("MouseScrollEvents"),void(r.support="DOMMouseScroll");
}catch(i){}
}
function t(e){
var t={
myDeltaY:void 0,
myWheel:void 0
};
return e=e||window.event,"deltaY"in e?(t.myDeltaY=e.deltaY,t.myWheel=e.deltaY/Math.abs(e.deltaY),
t):"wheelDelta"in e?(t.myWheel=-1*e.wheelDelta/Math.abs(e.wheelDelta),(window.opera&&opera.version()<10||r.isIe&&r.ieVersion<=9)&&(t.myWheel=-1*e.myWheel),
t):"detail"in e?(t.myWheel=-1*e.detail/Math.abs(e.detail),t):t;
}
var r={
support:"",
isIe:/(msie\s|trident.*rv:)([\w.]+)/.test(window.navigator.userAgent.toLowerCase()),
ieVersion:0
};
return e(),{
supportEvent:r.support,
eventAdapter:t
};
});