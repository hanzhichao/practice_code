define("cardticket/add/editor_collapse.js",[],function(){
"use strict";
var o=function(o){
function t(o,t,e){
var a=o.closest(t),r=a.find(e);
r.toggle();
var c=o.attr("data-open");
1==c?o.attr("data-open","0").find(".editor_collapsor").text("展开"):o.attr("data-open","1").find(".editor_collapsor").text("收起");
}
o=$.extend(!0,{
collapsorDom:".js_editor_collapsor",
collapseDom:".js_editor_collapse",
parentDom:".js_editor_section"
},o),$(o.collapsorDom).click(function(){
t($(this),o.parentDom,o.collapseDom);
}),$(o.collapsorDom).find("a").click(function(){
return $(this).parent().click(),!1;
});
};
return o;
});