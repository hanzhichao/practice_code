define("shop/shopdropdown.js",["biz_web/widget/dropdown.css","tpl/shop/shopdropdown.html.js","common/wx/Tips.js"],function(e){
"use strict";
function n(e){
function n(){
$(".jsDropdownList").hide(),$(".dropdown_menu").each(function(){
!$(this).hasClass("dropdown_checkbox")&&$(this).removeClass("open");
});
}
e.render&&(e.renderHtml="",$.each(e.data,function(n,t){
e.renderHtml+=e.render(t);
})),e=$.extend(!0,{},d,e);
var i=this;
if(i.container=$(e.container),i.container.addClass(e.search?o+" search":o),this.isDisabled=e.disabled,
e.disabled&&i.container.addClass("disabled"),i.opt=e,i.container.html(template.compile(t)(e)).find(".jsDropdownList").hide(),
i.bt=i.container.find(".jsDropdownBt"),i.dropdown=i.container.find(".jsDropdownList"),
$.each(e.data,function(e,n){
$.data(i.dropdown.find(".jsDropdownItem")[e],"value",n.value),$.data(i.dropdown.find(".jsDropdownItem")[e],"name",n.name),
$.data(i.dropdown.find(".jsDropdownItem")[e],"item",n);
}),"undefined"!=typeof e.index&&0!==e.data.length&&(i.bt.find(".jsBtLabel").html(e.data[e.index].name||e.label),
i.value=e.data[e.index].value),i.bt.on("click",function(){
return n(),e.disabled||(i.dropdown.show(),i.container.addClass("open")),!1;
}),e.search&&i.bt.find(".jsBtLabel").on("keyup",function(e){
if(!i.disabled){
var n=$(this);
if(13==e.keyCode)i.value?(n.html(n.data("name")).removeClass("error"),i.dropdown.hide()):n.find("div").remove();else{
var t=n.html().trim(),a=[];
i.value=null,i.dropdown.show().find(".jsDropdownItem").each(function(){
var e=$(this);
e.hasClass("js_empty")||(e.data("name").indexOf(t)>-1?(e.parent().show(),a.push({
name:e.data("name"),
value:e.data("value")
})):e.parent().hide());
}),0==a.length?i.dropdown.find(".js_empty").text("未找到"+t).show():(i.dropdown.find(".js_empty").hide(),
1==a.length&&(a[0].name==t?n.removeClass("error"):n.data("name",a[0].name),i.value=a[0].value));
}
}
}).on("blur",function(){
if(!i.disabled){
var n=$(this);
i.value?$(this).html()!=$(this).data("name")&&(n.addClass("error"),i.value=null):""!=n.html()?n.addClass("error"):(n.html(e.label).removeClass("error"),
i.value=null);
}
}).on("focus",function(){
if(!i.disabled){
var n=$(this),t=$(this).html().trim();
t==e.label&&n.html("").removeClass("error"),""==t&&n.removeClass("error"),i.dropdown.show(),
i.container.addClass("open");
}
}),e.canadd){
var s=i.container.find(".js_addform");
s.find(".js_btn").on("click",function(){
var e=i.container.find(".js_addform");
return e.find(".js_btn").hide(),e.find(".js_additem").show(),e.parent().scrollTop(e.parent().scrollTop()+60),
!1;
}),s.find(".js_cancel").on("click",function(){
var e=i.container.find(".js_addform");
return e.find(".js_additem").hide(),e.find(".js_btn").show(),!1;
}),s.find("input").on("click",function(){
return!1;
}),s.find("input").on("keyup",function(){
var e=$(this),n=e.val().trim(),t=n.bytes(),a=(t+t%2)/2,d=e.siblings(".js_addnum");
d.text(a+"/15"),a>15?!d.hasClass("error")&&d.addClass("error"):d.hasClass("error")&&d.removeClass("error");
}),s.find(".js_sure").on("click",function(){
var n=i.container.find(".js_addform"),t=n.find(".js_addnum");
if(t.hasClass("error"))a.err("超过长度限制");else{
var d=i.container.data("id"),o=n.find("input").val();
e.add(d,o);
}
return!1;
}),i.container.find(".js_del").on("click",function(){
return e.del(i.container.data("id"),$(this).data("value")),!1;
});
}
$(document).on("click",n),i.dropdown.on("click",".jsDropdownItem",function(){
var n=$(this).data("value"),t=$(this).data("name"),a=$(this).data("index");
if((!i.value||i.value&&i.value!=n)&&(i.value=n,i.name=t,e.callback&&"function"==typeof e.callback)){
var d=e.callback(n,t,a,$(this).data("item"))||t;
e.search?i.bt.find(".jsBtLabel").html(d).data("name",d).removeClass("error"):i.bt.find(".jsBtLabel").html(d);
}
i.dropdown.hide();
});
}
e("biz_web/widget/dropdown.css");
var t=e("tpl/shop/shopdropdown.html.js"),a=e("common/wx/Tips.js"),d={
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
return n.prototype={
selected:function(e){
var n=this;
if("number"==typeof e){
if(this.opt.data&&this.opt.data[e]){
var t=this.opt.data[e].name,a=this.opt.data[e].value;
this.dropdown.find(".jsDropdownItem:eq("+e+")").trigger("click",a),this.bt.find(".jsBtLabel").html(t);
}
}else $.each(this.opt.data,function(d,o){
return e==o.value||e==o.name?(n.dropdown.find(".jsDropdownItem:eq("+d+")").trigger("click",a),
n.bt.find(".jsBtLabel").html(t),!1):void 0;
});
return this;
},
reset:function(){
return this.bt.find(".jsBtLabel").html(this.opt.label),this.value=null,this;
},
hidegreater:function(e){
var n=this;
return"number"==typeof e&&n.opt.data&&n.opt.data[e]&&(n.dropdown.find(".jsDropdownItem").show(),
n.dropdown.find(".jsDropdownItem:gt("+e+")").hide()),this;
},
destroy:function(){
return this.isDisabled&&this.container.removeClass("disabled"),this.container.children().remove(),
this.container.off(),this;
},
enable:function(){
return this.opt.disabled=!1,this.container.removeClass("disabled"),this.opt.search&&this.bt.find(".jsBtLabel").attr("contenteditable",!0),
this;
},
disable:function(){
return this.opt.disabled=!0,this.container.addClass("disabled"),this.opt.search&&this.bt.find(".jsBtLabel").attr("contenteditable",!1),
this;
}
},n;
});