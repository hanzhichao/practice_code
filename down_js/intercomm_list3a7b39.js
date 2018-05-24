define("cardticket/intercomm_list.js",["common/wx/popup.js","cardticket/send_card.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/pagebar.js","common/qq/queryString.js","cardticket/parse_data.js","cardticket/create_task.js","cardticket/topmenu.js","cardticket/common_init.js"],function(t){
"use strict";
t("common/wx/popup.js");
for(var e=t("cardticket/send_card.js"),a=(t("common/wx/Cgi.js"),t("common/wx/Tips.js"),
t("common/wx/pagebar.js")),i=t("common/qq/queryString.js"),o=new i,c=t("cardticket/parse_data.js"),s=wx.cgiData.data.task_list,r=0;r<s.length;r++)s[r].card=c.parse_cardticket(s[r].card_info);
$("#js_tasklist").html(template.render("js_tasklist_tpl",wx.cgiData.data));
var n=wx.cgiData.pageInfo;
if(n.total=wx.cgiData.data.total_count,n.total>n.count){
n.pageidx=n.begin/n.count;
{
new a({
container:"#js_pager",
first:!1,
last:!1,
midRange:5,
initShowPage:n.pageidx+1,
perPage:n.count,
totalItemsNum:n.total,
callback:function(t){
var e=t.currentPage;
return e!=n.pageidx+1&&(location.href=o.replaceAll({
begin:n.count*(e-1),
count:n.count
}).getUrl()),!1;
}
});
}
}
var d=t("cardticket/create_task.js"),m=function(t){
this.opt=t||{},this.init();
};
m.prototype={
init:function(){
var t=this;
this.import_card=new e({
url:"/merchant/card_intercomm",
param:{
action:"getintercommcard"
},
removeOnHide:!1,
selectComplete:function(e){
t.import_card._hidefrom=1,t.create_task.show(e);
},
onHide:function(){
1!=t.import_card._hidefrom?t.destroy():t.import_card._hidefrom=0;
}
}),this.create_task=new d({
onprev:function(){
t.import_card.show();
},
oncancel:function(){
t.import_card.show();
},
onhide:function(){
t.destroy();
}
}),this.$setting_dialog=this.create_task.$setting_dialog;
},
show:function(){
this.import_card.show(),this.$setting_dialog.popup("resetPosition");
},
hide:function(){},
destroy:function(){
this.create_task.destroy(),this.import_card.destroy();
}
},$(".js_create_task").click(function(){
var t=new m;
t.show();
}),t("cardticket/topmenu.js").selected("cardsend");
var _="open";
$(".js_detail_report").click(function(){
var t=$(this),e=t.closest("tr"),a=e.next("tr"),i=t.hasClass("open");
a.hasClass("js_detail_table")&&(i?(a.removeClass(_).hide(),e.removeClass(_),$(this).removeClass(_)):(a.addClass(_).show(),
e.addClass(_),$(this).addClass(_)));
}),wx.cgiData.to_receive_count>0&&$(".js_intercomm_rec_a").text($(".js_intercomm_rec_a").text()+"(%s)".sprintf(wx.cgiData.to_receive_count)),
t("cardticket/common_init.js");
});