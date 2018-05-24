define("shop/precreate.js",["common/wx/Tips.js","shop/create_cgi.js"],function(a){
"use strict";
var t=(wx.T,template.render),s=a("common/wx/Tips.js"),i=a("shop/create_cgi.js"),e=wx.cgiData||{},d={
category_list:[],
pid:"",
last_category:""
},n=$.extend({},d,e);
!function(){
var a={
init:function(){
if(0!=n.category_list.length){
var s=$("#js_cate_container"),i=s.find(".js_catelist0");
i.append(t("tpl_catedlist",{
data:n.category_list,
key:"0",
seq:0
})),i.find(".js_cate0").on("click",e[0]),s.find(".js_search").on("keyup propertychange",a.search);
}
},
search:function(){
var a=$(this),t=a.val().trim(),s=a.closest(".js_catelist");
s.find("li").each(function(){
var a=$(this);
a.find("a").html().trim().indexOf(t)>-1?a.show():a.hide();
});
},
getTxt:function(){
for(var a=[],t=1;5>t;t++){
var s=$(".js_catetxt"+t).find("span").html();
s&&a.push(s);
}
return a.join("&nbsp;&gt;&nbsp;");
},
hideChild:function(a){
for(var t=3;t>=a;t--){
var s=$(".js_catelist"+t);
s.find("ul.show").hide().removeClass("show"),s.find(".search_wrapper").hide();
}
},
setTxt:function(a,t,s,i){
var e=$(".js_catetxt"+a);
e.data("id",s),e.find("span").html(t),e.show();
for(var d=4;d>a;d--){
var o=$(".js_catetxt"+d);
o.find("span").html(""),o.hide();
}
if(i){
$("#js_submit").removeClass("btn_disabled");
for(var l=[],d=1;a>=d;d++)l.push($(".js_catetxt"+d).data("id"));
$("#js_submit").attr("href",wx.url("/merchant/goods?type=9&t=shop/create&cate_ids="+l.join("_")+(n.pid?"&pid="+n.pid:"")));
}else $("#js_submit").addClass("btn_disabled");
},
loadChild:function(d,o){
var l=$("#js_cate_container"),c=l.data("loading");
if(!c){
l.data("loading",!0);
for(var r=d,h=$(".js_catelist"+o),_="show",f=r.hasClass("final"),p=r.data("id"),u=r.data("load"),j=4;j>=o;j--)l.find(".js_catelist"+(j-1)).find("li").removeClass("selected");
if(r.parent().addClass("selected"),a.hideChild(o),f)return a.setTxt(o,r.html(),r.data("id"),!0),
l.data("loading",!1),void(n.stop_autoload=!0);
if(u){
var g=h.find(".js_sec_"+p);
g.hasClass(_)||(g.addClass(_).show(),g.siblings(".search_wrapper").show(),l.data("loading",!1),
a.setTxt(o,r.html(),r.data("id"),f?!0:!1));
}else i.get_subcategory(p,function(i){
if(i.category_list){
h.append(t("tpl_catedlist",{
data:i.category_list,
key:p,
seq:o
}));
var d=h.find(".js_sec_"+p);
3==o&&d.find(".js_cate"+o).addClass("final"),d.find(".js_cate"+o).on("click",e[o]),
d.addClass(_).show(),d.siblings(".search_wrapper").show(),r.data("load",!0),a.setTxt(o,r.html(),r.data("id"),!1);
}else i.base_resp&&"-1"==i.base_resp.ret?(r.addClass("final"),n.stop_autoload=!0,
a.setTxt(o,r.html(),r.data("id"),!0)):s.err("系统错误，请重试");
l.data("loading",!1),a.auto_load(o);
});
}
},
auto_load:function(a){
if(!n.stop_autoload){
var t=n.last_category.split("_"),s=t[a];
s?$(".js_cate"+a).each(function(){
$(this).data("id")==s&&$(this).click();
}):n.stop_autoload=!0;
}
}
},e=[function(){
a.loadChild($(this),1);
},function(){
a.loadChild($(this),2);
},function(){
a.loadChild($(this),3);
},function(){
a.loadChild($(this),4);
}];
a.init(),$("#js_submit").on("click",function(){
return $(this).hasClass("btn_disabled")?!1:void 0;
}),n.last_category&&a.auto_load(0);
}();
});