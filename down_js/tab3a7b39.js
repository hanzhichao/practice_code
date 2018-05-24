define("common/qq/jquery.plugin/tab.js",["tpl/tab.html.js","widget/msg_tab.css"],function(t){
"use strict";
{
var a={
index:0
},n=t("tpl/tab.html.js");
t("widget/msg_tab.css");
}
$.fn.tab=function(t){
if(t&&t.tabs){
this.html(wx.T(n,{
tabs:t.tabs,
token:wx.data.t
}));
var e=this,s=e.find(".tab_navs"),i=s.find(".tab_nav"),d=i.length,c=null,r=null,l=function(a){
var n=a.data("tab"),s=a.data("type");
n&&(c!=a&&(c&&c.removeClass("selected"),r&&r.hide(),c=a,r=e.find(n).parent(),r.show(),
c.addClass("selected")),!!t.select&&t.select(a,r,n,s));
},u=function(a){
var n=a.data("tab"),s=a.data("type");
return t.click?t.click(a,e.find(n),n,s):!0;
};
return t=$.extend(!0,{},a,t),i.each(function(a){
var n=t.index,s=$(this).addClass("width"+d),i=s.data("tab");
a==n?l(s):e.find(i).parent().hide(),a==d-1&&s.addClass("no_extra");
}),s.on("click",".tab_nav",function(){
var t=u($(this));
return 0!=t&&l($(this));
}),{
getLen:function(){
return d;
},
getTabs:function(){
return i;
},
select:function(t){
return l(i.eq(t));
}
};
}
};
});