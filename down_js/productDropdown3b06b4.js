define("media/productDropdown.js",["biz_web/widget/dropdown.css","tpl/media/product_dropdown.html.js","tpl/media/product_dropdown_item.html.js","common/wx/Tips.js"],function(e){
"use strict";
function t(e){
e.render&&(e.renderHtml="",$.each(e.data,function(t,a){
e.renderHtml+=e.render(a);
})),e=$.extend(!0,{},d,e);
var t=this;
if(t.container=$(e.container),t.container.addClass(e.search?o+" search":o),this.isDisabled=e.disabled,
e.disabled&&t.container.addClass("disabled"),t.opt=e,e.itemHtml=template.compile(n)(e),
t.container.html(template.compile(a)(e)),t.bt=t.container.find(".jsDropdownBt"),
t.dropdown=t.container.find(".jsDropdownList"),t.addform=t.container.find(".js_addform"),
$.each(e.data,function(e,a){
$.data(t.dropdown.find(".jsDropdownItem")[e],"value",a.value),$.data(t.dropdown.find(".jsDropdownItem")[e],"name",a.name),
$.data(t.dropdown.find(".jsDropdownItem")[e],"item",a);
}),"undefined"!=typeof e.index&&0!==e.data.length&&(t.bt.find(".jsBtLabel").text(e.data[e.index].name||e.label),
t.value=e.data[e.index].value),t.hideDropdowns=function(e){
t.container.find(e.target).length||t.hideMenu();
},t.bt.on("click",function(){
t.hideMenu(),t.isDisabled||t.showMenu();
}),e.search&&t.bt.find(".jsBtLabel").on("keyup",function(a){
if(!t.isDisabled){
var n=$(this);
if(13==a.keyCode)if(t.value){
var i=n.data("name"),d=n.data("index");
if(n.removeClass("error"),t.hideMenu(),n.find("div").remove(),e.callback&&"function"==typeof e.callback){
var o=t.value;
e.callback(o,i,d);
}
}else n.find("div").remove();else{
var s=n.text().trim(),r=[];
t.value=null,n.data("name",""),n.data("index",""),t.dropdown.show().find(".jsDropdownItem").each(function(){
var e=$(this);
e.hasClass("js_empty")||(e.data("name").indexOf(s)>-1?(e.parent().show(),r.push({
name:e.data("name"),
value:e.data("value"),
index:e.data("index")
})):e.parent().hide());
}),0==r.length?(t.dropdown.find(".js_empty").text("未找到"+s).show(),n.addClass("error")):(t.dropdown.find(".js_empty").hide(),
n.removeClass("error"),1==r.length&&r[0].name==s&&(n.data("name",r[0].name),n.data("index",r[0].index),
t.value=r[0].value));
}
}
}).on("blur",function(){
if(!t.isDisabled){
var a=$(this);
t.value?$(this).html()!=$(this).data("name")&&($(this).data("name",""),$(this).data("index",""),
a.addClass("error"),t.value=null):""!=a.html()?a.addClass("error"):a.html(e.label).removeClass("error");
}
}).on("focus",function(){
if(!t.isDisabled){
var a=$(this),n=$(this).html().trim();
n==e.label&&a.html("").removeClass("error"),""==n&&a.removeClass("error"),t.showMenu();
}
}),e.canadd){
var s=t.addform;
s.find(".js_btn").on("click",function(){
if(!t.isDisabled){
var e=t.container.find(".js_addform");
e.find(".js_btn").hide(),e.find(".js_additem").show(),e.parent().scrollTop(e.parent().scrollTop()+60);
}
}),s.find(".js_cancel").on("click",function(){
if(!t.isDisabled){
var e=t.container.find(".js_addform");
e.find(".js_additem").hide(),e.find(".js_btn").show();
}
}),s.find("input").on("click",function(){}),s.find("input").on("keyup",function(e){
var a=$(this),n=a.val().trim(),i=n.bytes(),d=(i+i%2)/2,o=a.siblings(".js_addnum");
o.text(d+"/15"),d>15?!o.hasClass("error")&&o.addClass("error"):(o.hasClass("error")&&o.removeClass("error"),
13==e.keyCode&&t.addform.find(".js_sure").trigger("click"));
}),s.find(".js_sure").on("click",function(){
if(!t.isDisabled){
var a=t.container.find(".js_addform"),n=a.find(".js_addnum");
if(n.hasClass("error"))i.err("超过长度限制");else{
var d=a.find("input").val();
d||i.err("类目不能为空");
var o=e.add(d,t);
o===!0&&t.addform.find(".js_cancel").trigger("click");
}
}
});
}
t.container.on("click",".js_del",function(a){
if(!t.isDisabled){
var n=$(this);
e.del(n.attr("data-value"),n.attr("data-name"),n.attr("data-index"),n);
}
return a.stopPropagation(),a.preventDefault(),!1;
}),$(document).on("click",t.hideDropdowns),t.dropdown.on("click",".jsDropdownItem",function(a){
if(!t.isDisabled&&!$(a.target).hasClass("js_empty")&&!$(a.target).hasClass("js_del")){
var n=$(this).data("value")+"",i=$(this).data("name")+"",d=$(this).data("index");
if((!t.value||t.value&&t.value!=n)&&(t.value=n,t.name=i,e.callback&&"function"==typeof e.callback)){
var o=e.callback(n,i,d,$(this).data("item"))||i;
e.search?t.bt.find(".jsBtLabel").text(o).data("name",i).data("index",d).removeClass("error"):t.bt.find(".jsBtLabel").text(o);
}
t.hideMenu();
}
});
}
e("biz_web/widget/dropdown.css");
var a=e("tpl/media/product_dropdown.html.js"),n=e("tpl/media/product_dropdown_item.html.js"),i=e("common/wx/Tips.js"),d={
label:"请选择",
data:[],
callback:$.noop,
render:$.noop,
delay:500,
disabled:!1,
search:!1,
canadd:!1,
add:$.noop,
del:$.noop
},o="dropdown_menu";
return t.prototype={
selected:function(e){
var t=this;
if("number"==typeof e){
if(this.opt.data&&this.opt.data[e]){
var a=this.opt.data[e].name,n=this.opt.data[e].value;
this.dropdown.find(".jsDropdownItem:eq("+e+")").trigger("click",n),this.bt.find(".jsBtLabel").text(a);
}
}else $.each(this.opt.data,function(i,d){
return e==d.value||e==d.name?(t.dropdown.find(".jsDropdownItem:eq("+i+")").trigger("click",n),
t.bt.find(".jsBtLabel").text(a),!1):void 0;
});
return this;
},
hideMenu:function(){
this.dropdown.hide(),this.container.removeClass("open");
},
showMenu:function(){
this.dropdown.show(),this.container.addClass("open");
},
hide:function(){
this.container.hide();
},
show:function(){
this.container.show();
},
reset:function(){
return this.bt.find(".jsBtLabel").text(this.opt.label),this.value=null,this;
},
add:function(e){
this.opt.data.push(e);
var t=template.compile(n)({
data:[e],
loading_img:this.opt.loading_img
});
this.container.find(".js_empty").before(t);
},
hidegreater:function(e){
var t=this;
return"number"==typeof e&&t.opt.data&&t.opt.data[e]&&(t.dropdown.find(".jsDropdownItem").show(),
t.dropdown.find(".jsDropdownItem:gt("+e+")").hide()),this;
},
destroy:function(){
return $(document).off("click",this.hideDropdowns),this.isDisabled&&this.container.removeClass("disabled"),
this.container.children().remove(),this.container.off(),this;
},
enable:function(){
return this.hideMenu(),this.isDisabled=!1,this.container.removeClass("disabled"),
this.opt.search&&this.bt.find(".jsBtLabel").attr("contenteditable",!0),this;
},
disable:function(){
return this.isDisabled=!0,this.container.addClass("disabled"),this.opt.search&&this.bt.find(".jsBtLabel").attr("contenteditable",!1),
this;
}
},t;
});