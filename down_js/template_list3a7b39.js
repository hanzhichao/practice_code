define("mall/template_list.js",["mall/template_cgi.js","common/wx/Tips.js","common/wx/pagebar.js","common/wx/richEditor/emotionEditor.js"],function(t){
"use strict";
var i=wx.cgiData,e={},n=2e4,o=0,l=t("mall/template_cgi.js"),a=t("common/wx/Tips.js"),m=t("common/wx/pagebar.js"),s=t("common/wx/richEditor/emotionEditor.js"),r=function(t){
for(var i=0;i<t.length;++i){
var n=t[i];
e[n.id]=n;
}
{
var o=$(template.render("t_tmpl",{
list:t
}).trim());
$("#js_mall_tmpl_list").append(o);
}
};
!function(){
var t={
begin:i.begin,
count:i.count
};
l.getlist(t,function(t){
{
var e=t.list_info,n=e.total,o=i.begin/i.count+1;
new m({
container:".pageNavigator",
perPage:i.count,
first:!1,
last:!1,
isSimple:!0,
initShowPage:o,
totalItemsNum:n,
callback:function(t){
var e=t.currentPage;
if(e!=o)return e--,location.href=wx.url("/cgi-bin/frame?t=mall/template_list_frame&begin=%s&count=%s".sprintf(e*i.count,i.count)),
!1;
}
});
}
r(e.item);
},function(){});
}(),function(){
e[0]={
id:o,
css:"",
template:"",
name:""
};
var t=$(template.render("t_tmpl",{
list:e,
type:"new"
}).trim()),i=$("#js_mall_tmpl_list").append(t.hide()),m=$("#mall_tmpl_item"+o);
i.on("click",".js_open",function(){
var t=$(this),i=t.data("id"),o=e[i],l=$("#mall_tmpl_item"+i).addClass("open");
l.find(".js_open").hide(),l.find(".js_close").show(),e[i].css_editor||(e[i].css_editor=new s(l.find(".js_css_editor"),{
wordlimit:n,
hideEmotion:!0,
hideUpload:!1,
text:o.css.html(!0)
})),e[i].tmpl_editor||(e[i].tmpl_editor=new s(l.find(".js_tmpl_editor"),{
wordlimit:n,
hideEmotion:!0,
hideUpload:!1,
text:o.template.html(!0)
}));
}),i.on("click",".js_close",function(){
var t=$(this),i=t.data("id"),e=$("#mall_tmpl_item"+i).removeClass("open");
e.find(".js_open").show(),e.find(".js_close").hide();
}),i.on("click",".js_del",function(){
var t=$(this),i=t.data("id");
t.btn(!1),l.del(i,function(){
$("#mall_tmpl_item"+i).remove();
},function(){
t.btn(!0);
});
}),i.on("click",".js_save",function(){
var t=$(this),i=t.data("id"),n=e[i],o=$("#mall_tmpl_item"+i),m=n.css_editor,s=n.tmpl_editor;
if(!m||!s)return void a.err("发生异常，请刷新页面重试！");
var r=$.trim(o.find(".js_name").val()),c=m.getContent(),d=s.getContent();
return""==r?void a.err("素材名字不能为空"):""==d?void a.err("模版不能为空"):""==c?void a.err("CSS不能为空"):(t.btn(!1),
void l.save({
id:i,
name:r,
template:d,
css:c
},function(){
i?(t.btn(!0),o.find(".js_tmpl_name").html(r)):location.href=wx.url("/cgi-bin/frame?t=mall/template_list_frame&begin=0&count=10");
},function(){
t.btn(!0);
}));
}),$("#js_create").click(function(){
m.fadeIn(),m.find(".js_open").click();
});
}();
});