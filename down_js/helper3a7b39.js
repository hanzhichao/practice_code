define("ad_system/helper.js",["tpl/ad_system/helper.html.js","common/wx/tooltips.js"],function(e){
"use strict";
var t=e("tpl/ad_system/helper.html.js"),s=e("common/wx/tooltips.js"),o=$("#js_ad_helper").data("flag");
new s({
container:"#js_ad_helper",
content:wx.T(t,{
flag:o,
right:"}",
left:"{"
}),
position:{
left:-138
},
width:332,
delay:500,
reposition:!0,
type:"hover",
parentClass:"pop_ad_helper",
onshow:function(){
this.show();
}
});
});