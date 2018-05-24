define("common/wx/multiDropdown.js",["widget/dropdown.css","tpl/multi_dropdown.html.js","tpl/multi_ddchild.html.js","common/wx/Cgi.js"],function(t){
"use strict";
function e(t){
function e(){
$(".jsDropdownList").hide(),$(".dropdown_menu").removeClass("open");
}
var i=this;
i.container=$(t.container),i.container.addClass(o),t.render&&"function"==typeof t.render&&(t.renderHtml="",
$.each(t.data,function(e,d){
t.renderHtml+=t.render(d);
})),t=$.extend(!0,{},a,t),this.isDisabled=t.disabled,t.disabled&&i.container.addClass("disabled"),
i.opt=t,i.container.html(template.compile(d)(t)).find(".jsDropdownList").hide(),
i.bt=i.container.find(".jsDropdownBt"),i.dropdown=i.container.find(".jsDropdownList"),
$.each(t.data,function(t,e){
e.value&&$.isPlainObject(e.value)&&$.data(i.dropdown.find(".jsDropdownItem")[t],"value",e.value);
}),i.bt.on("click",function(){
return e(),t.disabled||(i.dropdown.show(),i.container.addClass("open")),!1;
}),$(document).on("click",e),i.dropdown.on("click",".jsDropdownItemlevel4",function(){
var e=$(this),d=e.data("value"),n=e.data("name"),o=e.data("index");
(!i.value||i.value&&i.value!=d)&&(i.value=d,i.name=n,t.callback&&"function"==typeof t.callback&&i.bt.find(".jsBtLabel").text(t.callback(d,n,o)||n)),
i.dropdown.hide();
}),i.dropdown.on("mouseover1",".jsDropdownItem",function(){
var e=$(this),d=e.siblings("ul"),o=e.data("value");
$("jsDropdownList open").removeClass("open").hide(),!d.hasClass("js_mddl_loaded")&&t.loadchild&&"function"==typeof t.loadchild&&t.loadchild(o,function(t){
d.html(template.compile(n)({
data:t
})).addClass("js_mddl_loaded"),d.addClass("js_mddl_loaded"),e.hasClass("open")&&d.addClass("open").show();
}),e.addClass("open");
}).on("mouseout1",".jsDropdownItem",function(){});
}
t("widget/dropdown.css");
var d=t("tpl/multi_dropdown.html.js"),n=t("tpl/multi_ddchild.html.js"),o=(t("common/wx/Cgi.js"),
"dropdown_menu"),a={
label:"请选择",
data:[],
level:1,
callback:$.noop,
loadchild:$.noop,
render:$.noop,
delay:500,
disabled:!1
};
return e.prototype={
selected:function(t){
var e=this;
if("number"==typeof t){
if(this.opt.data&&this.opt.data[t]){
var d=this.opt.data[t].name,n=this.opt.data[t].value;
this.dropdown.find(".jsDropdownItem:eq("+t+")").trigger("click",n),this.bt.find(".jsBtLabel").text(d);
}
}else $.each(this.opt.data,function(o,a){
return t==a.value||t==a.name?(e.dropdown.find(".jsDropdownItem:eq("+o+")").trigger("click",n),
e.bt.find(".jsBtLabel").text(d),!1):void 0;
});
return this;
},
reset:function(){
return this.bt.find(".jsBtLabel").text(this.opt.label),this.value=null,this;
},
destroy:function(){
return this.isDisabled&&this.container.removeClass("disabled"),this.container.children().remove(),
this.container.off(),this;
},
enable:function(){
return this.opt.disabled=!1,this.container.removeClass("disabled"),this;
},
disable:function(){
return this.opt.disabled=!0,this.container.addClass("disabled"),this;
}
},e;
});