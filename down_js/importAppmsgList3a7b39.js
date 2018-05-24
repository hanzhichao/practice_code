define("homepage/importAppmsgList.js",["biz_common/jquery.ui/jquery.ui.sortable.js","tpl/homepage/importAppmsgList/layout.html.js","tpl/homepage/importAppmsgList/item.html.js","homepage/appmsgdialog.js"],function(t){
"use strict";
t("biz_common/jquery.ui/jquery.ui.sortable.js");
var s=t("tpl/homepage/importAppmsgList/layout.html.js"),i=t("tpl/homepage/importAppmsgList/item.html.js"),e={},r=t("homepage/appmsgdialog.js"),o=function(t){
if(t&&!(t.length<=0))for(var s=0,i=t.length;i>s;++s){
var r=t[s];
e[r.aid]=r;
}
},n=function(t){
this.opt=t,this.list=t.list||[];
var e=this,n=t.container,a=this.list;
t.maxNum=t.maxNum||5,o(a);
for(var l=0;l<this.list.length;l++)this.list[l].title=this.list[l].title.replace("<em>","").replace("</em>","");
n.html(wx.T(s,{
title:t.title||""
}));
var p=n.find(".js_appmsg_list");
p.html(wx.T(i,{
appmsg_list:this.list
})),p.sortable({
items:".js_article",
placeholder:"drag_placeholder",
dropOnEmpty:!0,
start:function(t,s){
s.item.addClass("dragging");
},
stop:function(t,s){
s.item.removeClass("dragging");
}
}),p.sortable("disable"),n.find(".js_max_num").text(t.maxNum),n.find(".js_import").click(function(){
var s=t.maxNum-e.list.length;
s=Math.max(0,s),new r({
ids:t.selectLast?e._getAidList():[],
maxNum:s,
callback:function(t){
e.list=e.list.concat(t),o(t),e._resetSortState(),e._refreshEditArea(),e.opt.callback&&e.opt.callback(e.list),
n.find(".js_select_num").text(e.list.length);
}
});
}),e._endSort(),n.find(".js_select_num").text(this.list.length),n.find(".js_sort").click(function(){
var t=$(this);
return t.attr("disabled")?void e._endSort():void e._startSort();
}),n.find(".js_sort_sure").click(function(){
e._resetList(),e._endSort();
}),n.find(".js_sort_cancle").click(function(){
e._refreshEditArea(),e._endSort();
}),n.on("click",".js_del",function(){
$(this).parent().remove(),e._resetList(),n.find(".js_select_num").text(e.list.length);
});
};
return n.prototype._getAidList=function(){
for(var t=[],s=this.list,i=0,e=s.length;e>i;++i)t.push(s[i].aid);
return t;
},n.prototype._startSort=function(){
var t=this.opt,s=t.container,i=s.find(".js_appmsg_list");
i.sortable("enable"),s.find(".js_import,.js_sort,.js_del").hide(),s.find(".js_sort_sure,.js_sort_cancle,.js_sort_item").show(),
!!t.startSort&&t.startSort();
},n.prototype._endSort=function(){
var t=this.opt,s=t.container,i=s.find(".js_appmsg_list");
i.sortable("disable"),s.find(".js_sort_sure,.js_sort_cancle,.js_sort_item").hide(),
s.find(".js_import,.js_sort,.js_del").show(),this._resetSortState(),!!t.endSort&&t.endSort();
},n.prototype._resetSortState=function(){
var t=this.opt,s=t.container,i=this._getlist(),e=s.find(".js_sort");
i.length<=0?e.disable():e.enable();
},n.prototype._getSortList=function(){
var t=[],s=this.opt,i=s.container;
return i.find(".js_article").each(function(){
var s=$(this),i=s.data("aid");
e[i]&&t.push(e[i]);
}),t;
},n.prototype._resetList=function(){
var t=this._getSortList(),s=this.opt;
this.list=t,this._resetSortState(),s.callback&&s.callback(t);
},n.prototype._getlist=function(){
var t=this.list||{};
return t;
},n.prototype._refreshEditArea=function(){
var t=this.opt,s=t.container,e=this.list,r=s.find(".js_appmsg_list"),o="";
e&&(o=wx.T(i,{
appmsg_list:e
})),r.html(o);
},n;
});