define("cardticket/store_list.js",["common/wx/popup.js","common/wx/dialog.js","common/wx/Tips.js","common/wx/Cgi.js","common/qq/queryString.js","common/wx/pagebar.js","common/wx/tooltips.js","biz_web/utils/upload.js","biz_web/ui/dropdown.js","cardticket/store_cgi.js","biz_web/ui/checkbox.js","common/wx/stopMultiRequest.js","cardticket/common_template_helper.js","common/wx/sosomap/city_select.js","common/wx/sosomap/util.js","cardticket/card_cgi.js"],function(t){
"use strict";
function o(){
var t=$.trim($("#js_keyword").val()),o=j.area,e=o[0]&&o[0].data&&o[0].data.fullname||"",n=o[1]&&o[1].data&&o[1].data.fullname||"",i=o[2]&&o[2].data&&o[2].data.fullname||"";
_.isTerritory(e)&&(i=n,n=e,e="");
var c=encodeURIComponent(i.replace(/(区)$/,"")),a=encodeURIComponent(n.replace(/(市)$/,"")),s=encodeURIComponent(e.replace(/(省|回族自治区|特别行政区|维吾尔族自治区|自治区|壮族自治区)$/,""));
e=encodeURIComponent(e),n=encodeURIComponent(n),i=encodeURIComponent(i),t=encodeURIComponent(t),
location.href=wx.url("/merchant/entityshop?action=list&province=%s&city=%s&district=%s&keyword=%s&op=%s&oc=%s&od=%s".sprintf(s,a,c,t,e,n,i));
}
function e(){
setTimeout(function(){
h.city&&(_.isTerritory(h.city)&&(h.province=h.city,h.city=h.district,h.district=""),
j.update(h.province,h.city,h.district));
},100);
}
var n=(t("common/wx/popup.js"),t("common/wx/dialog.js")),i=(t("common/wx/Tips.js"),
t("common/wx/Cgi.js"),wx.cgiData),c=(t("common/wx/popup.js"),t("common/qq/queryString.js")),a=t("common/wx/pagebar.js"),s=new c,r=t("common/wx/tooltips.js"),l=(t("biz_web/utils/upload.js"),
t("biz_web/ui/dropdown.js")),m=t("cardticket/store_cgi.js");
t("biz_web/ui/checkbox.js"),t("common/wx/stopMultiRequest.js");
var d=t("cardticket/common_template_helper.js"),u=i.data;
$("#js_search_result").html(template.render("js_result_tpl",{
data:u
})),$(".js_delete").on("click",function(t){
var o=$(this).data("storeid"),e=$(this).data("state"),i=$(this).data("us");
return 2==i||3==i?(n.show({
msg:"门店迁移中，无法删除",
buttons:[{
text:"关闭",
click:function(){
this.remove();
}
}]
}),t.stopPropagation(),!1):(m.deleteWithConfirm({
container:this,
store_id:o,
state:e,
success:function(){
setTimeout(function(){
location.reload();
},300);
}
}),void t.stopPropagation());
}),$("#js_add_store").click(function(){
return wx.cgiData.is_upgrading?(n.show({
msg:"门店升级中，需要将全部门店迁移成功后才可添加新门店",
buttons:[{
text:"关闭",
click:function(){
this.remove();
}
}]
}),!1):(location.href=wx.url("/merchant/entityshop?action=edit"),!1);
});
var p=wx.cgiData.pageInfo;
if(p.total=wx.cgiData.total_count,p.count&&p.total>p.count){
p.pageidx=p.begin/p.count;
{
new a({
container:"#js_pager",
first:!1,
last:!1,
midRange:5,
initShowPage:p.pageidx+1,
perPage:p.count,
totalItemsNum:p.total,
callback:function(t){
var o=t.currentPage;
return o!=p.pageidx+1&&(location.href=s.replaceAll({
begin:p.count*(o-1),
count:p.count,
action:"list"
}).getUrl()),!1;
}
});
}
}
var w=(new l({
container:"#js_filter_state",
label:d.store_status[i.cond.audit_state]||"全部",
data:[{
name:"全部",
value:""
},{
name:"已提交",
value:"2"
},{
name:"生效",
value:"3"
},{
name:"不通过",
value:"4"
}],
callback:function(t){
t!=i.cond.audit_state&&(location.href=wx.url(t?"/merchant/entityshop?action=list&audit_state="+t:"/merchant/entityshop?action=list"));
}
}),t("common/wx/sosomap/city_select.js")),_=t("common/wx/sosomap/util.js"),j=new w({
container:"#CitySelectContainer",
plsSelect:!1
});
$("#js_search").click(o),$("#js_keyword").keydown(function(t){
return wx.isHotkey(t,"enter")?(o(),!1):void 0;
});
var h=wx.cgiData.cond;
for(var g in h)h[g]=decodeURIComponent(h[g].html(!1));
j.inited?e():j.on("city:datainit",function(){
e();
}),$("#js_keyword").val(i.keyword.html(!1).html(!1)),$("#js_download").click(function(){
return window.open(s.replaceAll({
action:"download",
begin:0,
count:1e10
}).getUrl()),!1;
}),new r({
container:$(".js_validity_faq"),
content:"完善字段成为优质门店，将有机会在“附近的人”展示，具体查看右上角《公众平台门店信息填写规范》",
position:{
left:-64,
top:-6
},
type:"hover"
}),$(".js_validity_flag").each(function(){
new r({
container:$(this),
content:"该门店为优质门店，有机会被推荐至“附近的人”。",
type:"hover"
});
});
var f=t("cardticket/card_cgi.js");
f.check_friend_and_money_acct(function(t,o){
o?$("#js_has_money_acct_tips").show():t&&$("#js_has_friend_card_tips").show();
});
});