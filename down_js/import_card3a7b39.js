define("cardticket/import_card.js",["tpl/cardticket/import_card.html.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/pagebar.js","common/wx/Tips.js","biz_web/ui/checkbox.js","cardticket/parse_data.js","page/cardticket/dialog_choose_card.css","cardticket/common_template_helper.js"],function(t){
"use strict";
function o(t){
{
var o;
t.opt;
}
o=t.$popup.popup("get"),o.find(".dialog_bd").html(p({
loading:!0
}));
}
function e(t,e){
var a=e.opt,c=$.extend(!0,a.param,{
action:"batch",
begin:t.begin,
count:t.count
});
m=!0,o(e),r.get({
url:a.url||"/merchant/electroniccardmgr",
data:c,
complete:function(){
m=!1;
}
},function(t){
if(0==t.base_resp.ret){
t=$.parseJSON(t.batch_card||t.data),a.data=t.card_list||t.list;
var o=a.parser?a.parser(a.data):a.data;
a.data=o.card_list,a.pageInfo.total_count=t.total_num||t.total_count,n(a.pageInfo,e);
}else r.show(t);
});
}
function a(t,o){
for(var e=0;e<t.length;e++)if(t[e].id==o)return t[e];
return null;
}
function n(t,o){
var e,a=o.opt;
e=o.$popup.popup("get"),e.find(".dialog_bd").html(p(a)),o.$popup.popup("resetPosition"),
o.select_card_checkbox=e.find(".js_select_card_input").checkbox(),o.pagebar=null,
c(a.pageInfo,o);
}
function c(t,o){
var a=t.total_count,n=o.$popup.popup("get");
if(t.count&&a>t.count){
var c=t.begin/t.count;
o.pagebar=new i({
container:$(".js_pager",n),
first:!1,
last:!1,
midRange:5,
initShowPage:c+1,
perPage:t.count,
totalItemsNum:a,
callback:function(a){
if(m)return!1;
var n=a.currentPage;
return n!=c+1&&(t.begin=(n-1)*t.count,e(t,o)),!0;
}
});
}
}
var p=t("tpl/cardticket/import_card.html.js"),r=(t("common/wx/popup.js"),t("common/wx/Cgi.js")),i=t("common/wx/pagebar.js"),u=t("common/wx/Tips.js"),s=(t("biz_web/ui/checkbox.js"),
t("cardticket/parse_data.js"));
t("page/cardticket/dialog_choose_card.css"),t("cardticket/common_template_helper.js"),
p=template.compile(p);
var l={
multi:!1,
pageInfo:{
begin:0,
count:5,
total_count:0
},
param:{},
parser:s.parse_cardlist,
url:null,
data:null,
selectComplete:$.noop,
onHide:$.noop
},d=function(t){
this.opt=$.extend(!0,{},l,t),this.init();
},m=!1;
return d.prototype={
init:function(){
var t=this.opt,o=this;
o.$popup=$(p({
loading:!0
})).popup({
autoShow:!1,
title:"选择卡券",
onOK:function(){
var e=o.select_card_checkbox.values();
if(!e.length)return u.err("请选择卡券"),!0;
for(var n={},c=0;c<e.length;c++){
var p=a(t.data,e[c]);
p&&(n[e[c]]=p);
}
t.selectComplete.call(o,e,n);
},
onCancel:function(){},
onHide:function(){
t.onHide.call(o);
}
}),t.data?n(t.pageInfo,o):e(t.pageInfo,o);
},
show:function(){
this.$popup.popup("show");
},
destroy:function(){
this.$popup.popup("remove");
}
},d;
});