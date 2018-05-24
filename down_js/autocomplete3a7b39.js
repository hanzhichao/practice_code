define("common/wx/autocomplete.js",["common/wx/widgetBridge.js","biz_web/widget/dropdown.css"],function(e){
"use strict";
e("common/wx/widgetBridge.js"),e("biz_web/widget/dropdown.css");
var t={
ENTER:13,
UP:38,
DOWN:40
};
$.widgetBridge("autocomplete",{
options:{
appendTo:null,
delay:300,
disabled:!1,
minLength:1,
source:[]
},
_create:function(){
{
var e=this;
$.extend(!0,{},e.options);
}
e.element.attr("autocomplete","off"),e.menu=$("<ul>").addClass("dropdown_data_list_item").addClass("auto_list").appendTo(e._appendTo()).hide(),
e.element.on({
focus:function(){
e._searchTimeout();
},
blur:function(){},
keyup:function(n){
var s=e.element.val(),o=e.menu;
switch(n.keyCode){
case t.ENTER:
s=o.find(".selected").text(),e.element.val(s),e.menu.hide(),n.preventDefault();
break;

case t.UP:
o.find(".selected").removeClass("selected").prev().addClass("selected"),n.preventDefault();
break;

case t.DOWN:
0==o.find(".selected").length?o.find("li:eq(0)").addClass("selected"):o.find(".selected").removeClass("selected").next().addClass("selected"),
n.preventDefault();
break;

default:
e.term!=e._value()&&e._searchTimeout();
}
}
}),e.menu.on({
scroll:function(){
console.log("scoll");
},
mousedown:function(){
var t=$(this),n=t.text();
e.element.val(n),e.close();
},
mouseenter:function(){
var e=$(this);
e.addClass("selected").siblings().removeClass("selected");
}
},"li"),$(document).on("click",function(t){
t.target!=e.element[0]&&e.close();
});
},
_value:function(){
return this.element.val();
},
_appendTo:function(){
var e=this,t=e.options.appendTo;
return t&&(t=$(t).eq(0)),t&&t.length||(t=e.element.closest(".autocomplete")),t.length||(t=$("body")),
t;
},
disable:function(){
var e=this;
e.options.disabled=!0;
},
enable:function(){
var e=this;
e.options.disabled=!1;
},
search:function(e){
var t=this;
return e=e||t._value(),t.options.disabled?void 0:(t.term=t._value(),e.length<t.options.minLength?this.close():this._search(e));
},
_search:function(e){
var t=this,n="",s='<li class="dropdown_data_item"><a href="javascript:;">%s</a></li>';
t.options.source.each(function(t){
~t.indexOf(e)&&(n+=s.sprintf(t));
}),""!=n?t.menu.empty().html(n).show():t.menu.empty().html(n).hide();
},
_searchTimeout:function(){
var e=this;
clearTimeout(e.searching),e.searching=setTimeout(function(){
e.search();
},e.options.delay);
},
close:function(){
var e=this;
clearTimeout(e.searching),e.menu.hide();
},
show:function(){
this.element.closest(".autocomplete").show();
},
hide:function(){
this.element.closest(".autocomplete").hide();
}
});
});