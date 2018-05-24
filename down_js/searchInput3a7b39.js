define("common/wx/searchInput.js",["tpl/searchInput.html.js","biz_web/ui/dropdown.js","tpl/searchClassifyInput.html.js"],function(t){
"use strict";
function e(e){
e.classify&&(a=t("tpl/searchClassifyInput.html.js"));
var l=$(e.id).html(a),n=l.find(".jsSearchInput"),c=l.find(".jsSearchInputBt"),o=l.find(".jsSearchInputClose");
if(e.dropsort){
var i=new r({
container:l.find("#js_searchDrop"),
label:e.dropsort[0].name,
data:e.dropsort,
callback:function(t){
$.each(e.dropsort,function(a,r){
return r.value==t?($(".jsSearchInput").attr("placeholder",e.dropsort[a].tips),!1):void 0;
}),this.container.attr("data-value",t);
}
});
i.container.attr("data-value",e.dropsort[0].value);
}
e.value&&n.val(e.value)&&o.show(),e.placeholder&&(n.attr("placeholder",e.placeholder),
$.fn.placeholder&&n.placeholder(e.placeholder)),c.click(function(){
e.click&&e.click(n.val());
}),n.keydown(function(t){
var e="which"in t?t.which:t.keyCode;
13==e&&c.trigger("click");
}),n.keyup(function(){
0==n.val().trim().length?o.hide():o.show();
}),o.click(function(){
n.val(""),o.hide();
});
}
var a=t("tpl/searchInput.html.js"),r=t("biz_web/ui/dropdown.js");
return e;
});