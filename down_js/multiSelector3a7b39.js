define("common/wx/multiSelector.js",["widget/areaselector.css","tpl/multiSelector/list.html.js","tpl/multiSelector/list_item.html.js","tpl/multiSelector/item.html.js","common/wx/Tips.js"],function(t){
"use strict";
function e(t){
"1"==t.data("expend")?(t.find("i").text("+").removeClass("hide_sub_icon"),t.data("expend","0"),
t.siblings().hide()):(t.find("i").text("-").addClass("hide_sub_icon"),t.data("expend","1"),
t.siblings().show());
}
t("widget/areaselector.css");
var s=t("tpl/multiSelector/list.html.js"),i=t("tpl/multiSelector/list_item.html.js"),a=t("tpl/multiSelector/item.html.js"),n=t("common/wx/Tips.js"),l={
data:[],
disableLevel1Select:!1,
disableMax:!1,
enableSelectAll:!1,
min:1,
emptyTip:""
},d=function(t){
o.call(this,t),c.call(this,t);
},o=function(t){
this.opt=t=$.extend(!0,{},l,t);
var e=this.container=$(t.container);
this.hasSelect=0,e.html(template.compile(s)(this.opt)),this.setData(t.data);
},c=function(){
var t=this,s=this.container,i=s.find(".jsFromList"),a=(s.find(".jsToList"),s.find(".jsFail"));
i.on("click",".jsLevel1",function(s){
var i=$(this);
return $(s.target).is("i")||t.opt.disableLevel1Select?(e(i),!1):void(i.hasClass("disabled")||i.toggleClass("selected"));
}),i.on("click",".jsLevel2",function(){
var t=$(this);
t.hasClass("disabled")||t.toggleClass("selected");
}),s.on("click",".jsAll",function(){
return 0==i.find(".jsLevel").length?!1:("全选"==$(this).html()?(i.find(".jsLevel").not(".disabled").addClass("selected"),
$(this).html("取消全选")):(i.find(".jsLevel.selected").removeClass("selected"),$(this).html("全选")),
!1);
}),s.on("click",".jsAdd",function(){
var e=i.find(".selected"),l=[];
return e.length>0&&a.hide(),$.each(e,function(){
var t=$(this);
l.push({
id:t.data("id"),
name:t.data("name"),
desc:t.data("desc")
});
}),t.canSelect(l.length)?(e.addClass("disabled").removeClass("selected"),s.find(".jsAll").html("全选"),
void t.addSelectedItems(l)):(n.err((t.opt.tip_msg||"最多还能选择%s个选项").sprintf(Math.max(t.opt.currentMax-t.getSelectedCount(),0))),
!1);
}),s.on("click",".jsClose",function(){
var e=$(this);
e.parent().remove(),$(".disabled[data-id='"+e.data("id")+"']",i).removeClass("disabled"),
t.setHasSelect(-1),t.opt.onchanged&&t.opt.onchanged.call(t),t.opt.onDeleted&&t.opt.onDeleted.call(t,{
id:e.data("id"),
name:e.data("name"),
desc:e.data("desc")
});
});
};
return d.prototype={
canSelect:function(t){
return 1==this.opt.disableMax?!0:this.getSelectedCount()+t<=this.opt.currentMax;
},
setHasSelect:function(t){
var e=this.container;
this.hasSelect+=t;
var s=Math.max(this.opt.currentMax-this.getSelectedCount(),0);
$(".js_hasSelect",e).html(this.getSelectedCount()),$(".js_leaveSelect",e).html(s);
},
getValue:function(){
var t=this.container,e=t.find(".jsToList .jsItem"),s=[];
$.each(e,function(){
var t=$(this);
s.push({
id:t.data("id"),
name:t.data("name"),
desc:t.data("desc")
});
});
var i=s.length<this.opt.min?"show":"hide";
return t.find(".jsFail")[i]().find(".frm_msg_content")[i](),s;
},
getDataCount:function(){
for(var t=0,e=0,s=this.opt.data.length;s>e;++e)if(t++,this.opt.data[e].sub)for(var i=0,a=this.opt.data[e].sub.length;a>i;++i)t++;
return t;
},
getData:function(){
return this.opt.data;
},
setData:function(t){
this.opt.data=t;
var e=this.getDataCount();
this.opt.currentMax=this.opt.max?Math.min(e,this.opt.max):e,this.listMax=e,this.container.find(".js_dd_list").html(template.compile(i)(this.opt)),
this.setHasSelect(0),t&&0!=t.length||!this.opt.emptyTip?this.container.find(".jsEmptyTip").hide():this.container.find(".jsEmptyTip").show();
},
getCanSelectCount:function(){
return this.getDataCount()-this.getDisabledCount();
},
getDisabledCount:function(){
return this.container.find(".jsFromList a.disabled").length;
},
getSelectedCount:function(){
return this.container.find(".jsToList .jsItem").length;
},
addSelectedItems:function(t){
$(".jsToList",this.container).append(template.compile(a)({
list:t
})),this.setHasSelect(t.length),this.opt.onchanged&&this.opt.onchanged.call(this),
this.opt.onAdded&&this.opt.onAdded.call(this,t);
},
isVaild:function(){
return this.getValue().length>=this.opt.min;
},
setItemsByKey:function(t,e){
var s=this.container,i=s.find(".jsFromList"),a=s.find(".jsToList");
i.find(".selected").removeClass("selected"),i.find(".disabled").removeClass("disabled");
for(var n=0;n<t.length;n++)$("a[data-"+e+"='"+t[n]+"']",i).addClass("selected");
a.html(""),this.hasSelect=0,$(".js_leaveSelect",s).html(this.opt.max),s.find(".jsAdd").click();
},
setDisabledItemsByKey:function(t,e){
for(var s=this.container,i=s.find(".jsFromList"),a=0;a<t.length;a++)$("a[data-"+e+"='"+t[a]+"']",i).addClass("disabled");
this.setHasSelect(0),this.opt.max-=t.length;
},
setItemsByID:function(t){
this.setItemsByKey(t,"id");
},
setItemsByName:function(t){
this.setItemsByKey(t,"name");
},
setDisabledItemsByID:function(t){
this.setDisabledItemsByKey(t,"id");
},
setDisabledItemsByName:function(t){
this.setDisabledItemsByKey(t,"name");
}
},d;
});