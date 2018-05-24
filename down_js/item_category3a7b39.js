define("scan/item_category.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/dropdown.js","scan/biz_category.js"],function(a,e,t){
"use strict";
function o(a,e){
var t=[];
if(0==a?t=m:e&&(t=b[e.value]||[]),t&&t.length>0)n(a,t);else if(e){
var o=y.getSubCategories(e.value);
o&&o.length>0&&n(a,o);
}
}
function n(a,e){
var t=null;
if(D[a]&&e&&e.length>0)for(var n=0;n<e.length;n++)if(e[n].name==D[a].name){
t=D[a];
break;
}
t?i(a,t):t={
name:"请选择",
value:""
},c(a,t.name,e),t.value&&o(a+1,t);
}
function c(a,e,t){
j[a]=new v({
container:"#js_select_category_"+(a+1),
label:e,
data:t,
disabled:!1,
callback:function(e,t){
i(a,{
value:e
}),x.hide();
for(var n=a+1;5>n;n++)j[n]&&(j[n].destroy(),j[n]=null);
return a>=4?!1:void o(a+1,{
name:t,
value:e
});
}
});
}
function i(a,e){
for(var t=a+1;t<p.length;t++)p[t]=0;
p[a]=1*e.value,w.setData(function(a){
a.base_info.category_id_list=p,a.idx_info.category=1*e.value;
});
}
function r(){
if(19==wx.cgiData.keystandard)m=d,wx.cgiData.chosen_category.value&&(D=[y.getParentCategory(wx.cgiData.chosen_category.value),y.getCategory(wx.cgiData.chosen_category.value)]);else{
for(var a=0;a<wx.cgiData.category.length;a++)b[wx.cgiData.category[a].value]=wx.cgiData.category[a].sub;
if(m=wx.cgiData.category,wx.cgiData.chosen_category.value)for(var e=wx.cgiData.chosen_category.value,a=0;a<wx.cgiData.category.length;a++)for(var t=0;t<wx.cgiData.category[a].sub.length;t++)if(wx.cgiData.category[a].sub[t].value==e){
D=[wx.cgiData.category[a],wx.cgiData.chosen_category];
break;
}
}
o(0,null),h=$("#js_form_category"),x=$("#js_err_category");
}
function l(){
x.hide();
}
function g(){}
function u(){}
function s(a){
for(var e=!0,t=0,o=0;o<j.length;o++)j[o]&&(t++,p[o]||(e=!1));
return 0==t&&(e=!1),0==e?(x.show(),$("html, body").animate({
scrollTop:h.offset().top
},500)):x.hide(),"function"==typeof a&&a.call(void 0,e),e;
}
function f(a){
return a&&a.model&&(w=a.model),_?!1:(_=!0,r(),l(),void g());
}
var v=(template.render,a("common/wx/Cgi.js"),a("common/wx/Tips.js"),a("biz_web/ui/dropdown.js")),y=a("scan/biz_category.js"),d=y.category,w=null,_=!1,h=null,x=null,m=[],b={},D=[],j=[null,null,null,null,null],p=[0,0,0,0,0];
t.exports={
init:f,
check:s,
triggerEditMode:u
};
});