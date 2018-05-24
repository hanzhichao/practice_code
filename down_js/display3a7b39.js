define("wxopen/display.js",["biz_web/ui/checkbox.js","common/wx/Cgi.js","common/wx/pagebar.js","common/wx/Tips.js","biz_common/jquery.ui/jquery.ui.sortable.js"],function(e){
"use strict";
function t(){
console.log("show_list:",i),$("#hide_list_container").html(template.render("item_tpl",{
type:"hide",
data:a
})),$("#show_list_container").html(template.render("item_tpl",{
type:"show",
data:i
})),$("#profile_container").html(template.render("profile_tpl",{
data:i
})),$("#show_count").html(i.length),$("input[type=checkbox]").checkbox({
onChanged:function(e){
var a=e[0].checked,n=1*e[0].dataset.idx,l=e[0].dataset.appid,c=n+10*(s-1);
if(a){
var r=o.slice(c,c+1)[0];
r&&(r.selected=1),i.push(r);
}else{
for(var p=0;p<o.length;p++)if(l==o[p].appid){
c=p;
break;
}
var r=o.slice(c,c+1)[0];
r&&(r.selected=0);
for(var d=[],h=0;h<i.length;h++)i[h].appid!=r.appid&&d.push(i[h]);
i=d,console.log(a,r);
}
t();
}
}),$("#show_list_container").sortable({
items:".js_item",
placeholder:"drag_placeholder",
dropOnEmpty:!0,
start:function(e,t){
t.item.addClass("dragging");
},
stop:function(e,a){
a.item.removeClass("dragging");
var s=[];
$("#show_list_container .js_item").each(function(){
for(var e=$(this).find(".js_check_ability").data("appid"),t=(1*$(this).find(".js_check_ability").data("idx"),
0);t<o.length;t++)e==o[t].appid&&s.push(o[t]);
}),i=s,console.log("show_list_new",s),t();
}
}),$("#show_list_container").sortable("enable");
}
var i=[],a=[],o=[],s=1,n=(e("biz_web/ui/checkbox.js"),e("common/wx/Cgi.js")),l=e("common/wx/pagebar.js"),c=e("common/wx/Tips.js");
e("biz_common/jquery.ui/jquery.ui.sortable.js"),cgiData.wxopens=cgiData.wxopens.sort(function(e,t){
return t.released-e.released;
});
for(var r=0;r<cgiData.wxopens.length;r++)1==cgiData.wxopens[r].status&&(1==cgiData.wxopens[r].selected&&i.push(cgiData.wxopens[r]),
o.push(cgiData.wxopens[r]));
o.length>10?(a=o.slice(0,10),new l({
container:".pagination_wrp",
perPage:10,
first:!1,
last:!1,
isSimple:!0,
initShowPage:s,
totalItemsNum:o.length,
callback:function(e){
var i=e.currentPage;
console.log(i,s),i!=s&&(s=i,i--,a=o.slice(10*i,10*i+10),t());
}
}),$(".pagination_wrp").show()):a=o;
var p=!1;
$("#js_add").on("click",function(){
if(i.length>cgiData.display_limit)return void c.err("最多只能展示%s个小程序".sprintf(cgiData.display_limit));
if(!p){
p=!0,$(this).addClass("btn_loading");
for(var e="",t=0;t<i.length;t++)e+=i[t].appid+"#";
e=e.substring(0,e.length-1),n.post({
url:"/cgi-bin/wxopen?action=display_submit",
data:{
list:e
},
complete:function(){
p=!1,$(this).remove("btn_loading");
}
},function(e){
console.log(e),0==e.base_resp.ret?(c.suc("发布成功"),location.reload()):c.err("提交失败，稍后再试");
});
}
}),t();
});