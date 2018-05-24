define("original/subscibe.js",["common/wx/Tips.js","biz_web/lib/json.js","common/wx/pagebar.js","common/wx/Cgi.js","common/wx/searchInput.js","common/wx/top.js"],function(e){
"use strict";
var t=wx.cgiData,i=e("common/wx/Tips.js"),n=(e("biz_web/lib/json.js"),e("common/wx/pagebar.js")),s=e("common/wx/Cgi.js"),a=e("common/wx/searchInput.js"),o=e("common/wx/top.js"),l=template.render,r=function(){
function e(){
for(var e=0,t=u.length;t>e;e++){
var i=$("<div></div>").addClass($("#sublist_item_tpl").attr("data-class"));
i.html($("#sublist_item_tpl").html().replace(/\{([^\[\]]*?)\}/gi,function(t,i){
return u[e][i];
})),0==u[e].is_verifyed&&i.find(".sub_verify").remove();
var n="copyrightlib?action=ori_lib_list&begin=1&count=10&lang="+(wx.cgiData.lang||"zh_CN")+"&token="+h+"&ori_biz="+u[e].biz_uin;
i.find("a").attr("href",n),i.find(".sublist_item_btn").attr("data-is_subed",1),(u[e].user_icon_url.length<=1||"/0"==u[e].user_icon_url)&&i.find(".sublist_item_icon").attr("src",m),
b.append(i),d.$node[e]=i,d.display[e]=!0;
}
}
function r(e,t){
var n={
copyrightuin:e.data("uin")
};
0==t?(e.text("取消中").addClass("btn_disabled"),e.btn(!1),s.post({
url:"/cgi-bin/copyrightlib?action=delsubuin",
data:n,
success:function(t){
e.btn(!0),t.base_resp&&0==t.base_resp.ret?(e.text("订阅"),e.removeClass("btn_default btn_disabled").addClass("btn_primary"),
e.unbind("click"),e.click(function(){
r(e,1);
})):(i.err("系统繁忙，请稍后再试"),e.text("已订阅").on("mouseover",function(){
var e=$(this);
e.text("取消订阅").on("mouseleave",function(){
$(this).text("已订阅").unbind("mouseleave");
});
}),s.handleRet(t,{
id:64462,
key:40,
url:"/cgi-bin/copyrightlib?action=delsubuin"
}),e.removeClass("btn_disabled"));
},
error:function(){
e.btn(!0),e.removeClass("btn_disabled").addClass("btn_default"),i.err("系统繁忙，请稍后再试");
}
})):1==t&&(e.text("订阅中"),e.btn(!1),s.post({
url:"/cgi-bin/copyrightlib?action=subuin",
data:n,
success:function(t){
e.btn(!0),t.base_resp&&0==t.base_resp.ret?210001==t.base_resp.ret?(i.err("订阅超过最大数量"),
e.text("订阅")):210002==t.base_resp.ret?(i.err("不能订阅自己"),e.text("订阅")):0==t.base_resp.ret&&(e.text("已订阅"),
e.removeClass("btn_primary").addClass("btn_default"),e.unbind("click"),e.on("mouseover",function(){
var e=$(this);
e.text("取消订阅").on("mouseleave",function(){
$(this).text("已订阅").unbind("mouseleave");
});
}),e.click(function(){
$(this).unbind("mouseover mouseleave"),r(e,0);
}),s.handleRet(t,{
id:64462,
key:41,
url:"/cgi-bin/copyrightlib?action=subuin"
})):(i.err("系统繁忙，请稍后再试"),e.text("订阅"));
},
error:function(){
e.btn(!0),i.err("系统繁忙，请稍后再试");
}
}));
}
function c(){
$(".sublist_item_count").text(u.length),new o("#topTab",o.DATA.media).selected("media16"),
$(".js_highlight_box").html(l("tpl_highlight_box",{
token:t.token,
selected:2
})),e(),$(".sublist_item_btn").on("click",function(){
var e=$(this);
0==e.data("is_subed")?r(e,1):1==e.data("is_subed")&&(e.unbind("mouseover mouseleave"),
r(e,0));
}).on("mouseover",function(){
var e=$(this);
1==e.data("is_subed")&&e.text("取消订阅").on("mouseleave",function(){
$(this).text("已订阅").unbind("mouseleave");
});
}),_.goFirstPage();
}
{
var u=t.subList.copyright_subuin_list,b=$("#sublist"),d={
$node:[],
count:u.length,
display:[]
},h=location.href.match(/token\=\d+/)[0].substring(6),m="https://res.wx.qq.com/mpres/htmledition/images/pic/common/pic_biz_avatar_default25621c.png",p={
container:"#sub_pagebar",
perPage:10,
initShowPage:t.begin,
totalItemsNum:u.length,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var i=e.currentPage,n=e.perPage;
$(".sublist_item").hide();
for(var s=0,a=0,o=d.$node.length;o>a;a++)d.display[a]&&(s++,s>(i-1)*n&&i*n>=s&&d.$node[a].show());
t.begin=i;
}
},_=new n(p);
new a({
id:"#sub_search",
value:t.key,
placeholder:"搜索已订阅的公众号",
click:function(e){
if(e=e.replace(/\s/gi,"").replace(/([\^\$\.\*\+\?\=\!\:\|\\\/\(\)\[\]\{\}])/gi,"\\$1"),
$(".highlight").each(function(){
$(this).replaceWith($(this).html());
}),d.count=0,e.length>0){
for(var n=0,s=d.$node.length;s>n;n++){
var a=new RegExp("("+e+")","gi"),o=d.$node[n].find(".sublist_item_name"),l=d.$node[n].find(".sublist_item_alias"),r=d.$node[n].find(".sublist_item_sig"),c=d.$node[n].find(".sublist_item_des");
if(d.display[n]=!1,-1!=o.text().search(a)&&(o.html(o.html().replace(a,'<span class="highlight">$1</span>')),
d.display[n]=!0),-1!=l.text().search(a)&&(l.html(l.html().replace(a,'<span class="highlight">$1</span>')),
d.display[n]=!0),r.length>0&&-1!=r.text().search(a)){
var u=r.children("i");
u.remove(),r.html(r.html().replace(a,'<span class="highlight">$1</span>')).prepend(u),
d.display[n]=!0;
}
-1!=c.text().search(a)&&(c.html(c.html().replace(a,'<span class="highlight">$1</span>')),
d.display[n]=!0),d.display[n]&&d.count++;
}
t.key=e,t.begin=1,p.initShowPage=1,p.totalItemsNum=0!=d.count?d.count:1,_.init(p),
_.goFirstPage(),0==d.count?$("#search_noresult").show():$("#search_noresult").hide();
}else i.err("请输入关键词");
}
});
}
return{
init:c
};
}();
r.init();
});