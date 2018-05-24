define("cardticket/assistsend_list.js",["common/wx/popup.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/tooltips.js","common/wx/tooltipsManager.js","common/qq/queryString.js","common/wx/pagebar.js","biz_web/ui/dropdown.js","common/wx/dialog.js","cardticket/common_template_helper.js","cardticket/topmenu.js","cardticket/common_init.js"],function(t){
"use strict";
function e(){
var t=$.trim(w.val());
location.href=l.replaceAll({
keyword:t,
offset:0
}).getUrl();
}
var o=(t("common/wx/popup.js"),t("common/wx/Tips.js")),a=t("common/wx/Cgi.js"),n=wx.cgiData,c=t("common/wx/tooltips.js"),s=t("common/wx/tooltipsManager.js"),i=t("common/qq/queryString.js"),r=t("common/wx/pagebar.js"),l=new i,m=t("biz_web/ui/dropdown.js"),u=(t("common/wx/popup.js"),
t("common/wx/dialog.js"),t("cardticket/common_template_helper.js")),d={
0:"审核中",
1:"已通过",
2:"未通过",
3:"已过期"
},p=wx.cgiData.quota,_=u.parse_assistsend_quota(p.quota_list);
$("#js_quota").html(_.max_card>0?'每个子商户每月可制券 <span class="text_nobreak">%s</span> 张，每张券库存不超过 <span class="text_nobreak">%s</span>份。'.sprintf(_.max_card,_.max_sku):"你的账号因违规，暂被关闭制券权限，详请查看通知中心"),
$("#js_search_result").html(template.render("js_result_tpl",{
data:n.list
})),$("#js_add_submerchant").click(function(){
location.href=wx.url("/merchant/cardhelpmakesend?action=addpage");
});
new m({
container:"#js_filter_state",
label:d[n.cond.status_list]||"所有",
data:[{
name:"所有",
value:""
},{
name:"审核中",
value:"0"
},{
name:"已通过",
value:"1"
},{
name:"未通过",
value:"2"
},{
name:"已过期",
value:"3"
}],
callback:function(t){
t!==n.cond.status_list&&(location.href=t?l.replaceAll({
status_list:t,
offset:0
}).getUrl():l.remove("status_list").getUrl());
}
});
if($(".js_delete").on("click",function(t){
var e=$(this).attr("data-id"),n=new c({
container:this,
content:"确定要删除商户？",
type:"click",
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
a.post({
mask:!1,
url:"/merchant/cardhelpmakesend",
data:{
action:"delete",
sub_merchant_id:e
}
},function(t){
"0"==t.base_resp.ret?(o.suc("删除商户成功"),location.reload()):a.show(t);
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
s.removeAll();
}
}]
});
n.show(),s.removeAll(),s.add(n),t.stopPropagation();
}),n.total_count>n.cond.count){
var j=n.cond.offset/n.cond.count;
new r({
container:"#js_pager",
first:!1,
last:!1,
midRange:5,
initShowPage:j+1,
perPage:n.cond.count,
totalItemsNum:n.total_count,
callback:function(t){
var e=t.currentPage;
return e!=n.cond.pageidx+1&&(location.href=l.replaceAll({
offset:n.cond.count*(e-1),
count:n.cond.count
}).getUrl()),!1;
}
});
}
var w=$("#js_search_input").keyup(function(t){
wx.isHotkey(t,"enter")&&e();
}).val(n.cond.keyword.html(!1).html(!1));
$("#js_search_btn").click(function(){
e();
}),t("cardticket/topmenu.js").selected("assistsend"),t("cardticket/common_init.js");
});