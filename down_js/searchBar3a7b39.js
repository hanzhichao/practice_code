define("tmplmsg/searchBar.js",["common/qq/mask.js","common/wx/Tips.js"],function(s,c,n){
"use strict";
function o(c){
var n=$("#msgSearchInput"),o=$("#msgSearchBtn"),r=(s("common/qq/mask.js"),s("common/wx/Tips.js"));
n.keypress(function(s){
wx.isHotkey(s,"enter")&&o.click();
}),o.click(function(){
var s=$.trim(n.val());
return s&&s!=n.attr("placeholder")?void c(s):(r.err("请输入搜索关键词"),n.focus(),!1);
});
}
n.exports=o;
});