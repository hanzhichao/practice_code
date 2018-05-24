define("cardticket/intercomm_reclist.js",["common/wx/popup.js","cardticket/send_card.js","cardticket/common_template_helper.js","common/wx/Cgi.js","common/wx/dialog.js","common/wx/Tips.js","biz_web/ui/checkbox.js","biz_common/moment.js","common/wx/pagebar.js","common/qq/queryString.js","cardticket/parse_data.js","cardticket/topmenu.js","cardticket/common_init.js"],function(t){
"use strict";
t("common/wx/popup.js");
var a=(t("cardticket/send_card.js"),t("cardticket/common_template_helper.js"),t("common/wx/Cgi.js")),e=t("common/wx/dialog.js"),c=t("common/wx/Tips.js"),i=(t("biz_web/ui/checkbox.js"),
t("biz_common/moment.js")),o=t("common/wx/pagebar.js"),n=t("common/qq/queryString.js"),r=new n,s=t("cardticket/parse_data.js");
wx.cgiData.data.tasklist=wx.cgiData.data.task_list;
for(var d=wx.cgiData.data.tasklist,m={},p=0;p<d.length;p++){
d[p].card=s.parse_cardticket(d[p].card_info);
var l=d[p].card;
m[l.id]=l;
}
$("#js_tasklist").html(template.render("js_tasklist_tpl",wx.cgiData.data));
var u=wx.cgiData.pageInfo;
if(u.total=wx.cgiData.data.total_count,u.total>u.count){
u.pageidx=u.begin/u.count;
{
new o({
container:"#js_pager",
first:!1,
last:!1,
midRange:5,
initShowPage:u.pageidx+1,
perPage:u.count,
totalItemsNum:u.total,
callback:function(t){
var a=t.currentPage;
return a!=u.pageidx+1&&(location.href=r.replaceAll({
begin:u.count*(a-1),
count:u.count
}).getUrl()),!1;
}
});
}
}
var _=!1;
$("#js_tasklist").on("click",".js_accept,.js_reject,.js_delete",function(){
var t=$(this),i=t.attr("data-action"),o=t.attr("data-taskid"),n=t.attr("data-customcode");
n&&!wx.cgiData.is_can_customcode&&"accept_task"==i,_=!0,a.post({
url:"/merchant/card_intercomm",
data:{
action:i,
task_id:o
},
complete:function(){
_=!1;
}
},function(t){
if(0==t.ret)"accept_task"==i?c.suc("已接受"):"delete_task"==i?c.suc("已删除"):"reject_task"==i&&c.suc("已拒绝"),
location.reload();else{
if("accept_task"==i&&14023==t.ret)return void e.show({
msg:"该卡券为自定义SN的卡券，需要具备开发者权限才能使用。请前往开通权限。",
type:"info",
buttons:[{
text:"开通开发者权限",
click:function(){
window.open(wx.url("/merchant/cardapply?action=listapplyapihighlevel&t=cardticket/apply_api_highlevel")),
this.remove();
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
},
type:"normal"
}]
});
if("accept_task"==i&&14027==t.ret)return void e.show({
msg:"该卡券已过期，接收互通任务失败，请联系卡券提供方。",
type:"info",
close:function(){
return location.reload(),!0;
},
buttons:[{
text:"确定",
click:function(){
location.reload(),this.remove();
},
type:"primary"
}]
});
t.base_resp||(t.base_resp={
ret:t.ret
}),a.handleRet(t,{
id:64463,
key:38,
url:"/merchant/card_intercomm?action="+i
});
}
});
}),$(".js_sendout").click(function(){
var t=$(this),a=(t.attr("data-action"),t.attr("data-taskid"),t.attr("data-customcode")),e=$(this).attr("data-cardid"),o=m[e];
if(!e||!o)return!1;
if(0==o.quantity)return c.err("库存为0，请先设置库存"),!1;
o.__code_valid_time=i().add("d",365).format("YYYY年MM月DD日");
var n=$(template.render("js_sendout_tpl",o)).popup({
title:"投放卡券",
autoShow:!1,
buttons:[{
text:"确定",
type:"primary",
click:function(){
var t=s.values()[0];
1==t?location.href=wx.url("/cgi-bin/masssendpage?t=mass/send&cardid=%s&cardnum=%s".sprintf(e,0)):2==t?location.href=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&isMul=1&isNew=1&cardid=%s&cardnum=%s".sprintf(e,0)):3==t&&window.open(wx.url("/merchant/cardqrcode?action=copydownload"+"&cardid=%s&cardquantity=%s&cardlimit=%s".sprintf(e,0))),
this.hide();
}
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}],
onHide:function(){
this.remove();
},
className:"align_edge"
}),r=n.popup("get"),s=r.find(".js_send_type").checkbox();
a&&$("#js_download_qrcode").hide(),n.popup("show");
}),t("cardticket/topmenu.js").selected("cardsend"),wx.cgiData.to_receive_count>0&&$(".js_intercomm_rec_a").text($(".js_intercomm_rec_a").text()+"(%s)".sprintf(wx.cgiData.to_receive_count)),
t("cardticket/common_init.js");
});