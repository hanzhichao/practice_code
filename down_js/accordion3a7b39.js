define("common/wx/accordion.js",["tpl/accordion.html.js"],function(t,n,i){
"use strict";
var e=wx.T,s={},o=t("tpl/accordion.html.js"),c=Class.declare({
init:function(t){
var n=this;
t=$.extend(!0,{},s,t),this.$dom=$(e(o,t)).appendTo(t.container),this.$headers=this.$dom.find(".header"),
this.$contents=this.$dom.find(".content"),this.$headers.click(function(){
var t=$(this),i=parseInt(t.attr("idx")),e=t.attr("open");
isNaN(i)||(e?$(n.$contents[i]).slideDown():$(n.$contents[i]).slideUp(),t.attr("open",!e));
});
}
});
i.exports=c;
});