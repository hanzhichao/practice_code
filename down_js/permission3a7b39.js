define("cardticket/permission.js",["common/wx/Tips.js","common/wx/top.js","common/wx/popup.js","common/wx/Step.js","common/wx/RichBuddy.js","cardticket/changeRemark.js","common/wx/tooltips.js","common/wx/tooltipsManager.js","common/wx/Cgi.js","common/wx/pagebar.js","common/qq/events.js","cardticket/select_shop.js","common/wx/dialog.js","common/qq/queryString.js","cardticket/store_cgi.js","biz_web/ui/checkbox.js","common/wx/stopMultiRequest.js","cardticket/common_template_helper.js","cardticket/topmenu.js","cardticket/select_shop_dropdown.js","common/wx/searchInput.js","common/qq/jquery.plugin/zclip.js","cardticket/select_shop_popup.js","cardticket/common_init.js"],function(e){
"use strict";
var t=$("#js_checker_json").html();
t=t.replace(/[\u0000-\u001F]/g,""),t||(t='{"card_checker":[]}'),wx.cgiData.data=$.parseJSON(t);
{
var o=e("common/wx/Tips.js"),c=(e("common/wx/top.js"),e("common/wx/popup.js"),e("common/wx/Step.js")),n=wx.cgiData.data,i=e("common/wx/RichBuddy.js"),s=(e("cardticket/changeRemark.js"),
e("common/wx/tooltips.js")),a=e("common/wx/tooltipsManager.js"),r=e("common/wx/Cgi.js"),p=e("common/wx/pagebar.js"),d=e("common/qq/events.js")(!0),l=e("cardticket/select_shop.js"),h=(e("common/wx/dialog.js"),
e("common/qq/queryString.js")),u=new h;
e("cardticket/store_cgi.js");
}
e("biz_web/ui/checkbox.js"),e("common/wx/stopMultiRequest.js"),e("cardticket/common_template_helper.js"),
e("cardticket/topmenu.js").selected("permission"),function(){
for(var t=n.card_checker,c={},l=0;l<t.length;l++){
var h=t[l];
h.remark_name=h.remark||h.nickname;
for(var m in h)"string"==typeof h[m]&&(h[m]=h[m].replace(/&nbsp;/gi," "));
h.nick_name=h.nickname.emoji(),c[h.openid]=h;
}
$("#js_checker_list").html(template.render("js_checker_list_tpl",{
data:t
}));
var _=new i({
data:c,
hideGroup:!0
});
$(".js_avatar").mouseover(function(){
var e=$(this),t=e.data("openid"),o=e.offset(),c=e.width();
_.show({
fakeId:t,
position:{
left:o.left+c+2,
top:o.top
}
});
var n=$(".rich_buddy");
n.find(".sign").hide(),n.find(".location").hide();
}).mouseout(function(){
_.hide();
}),d.on("Remark:changed",function(e,t){
$("#js_user_"+e).find(".remark_name").html(t);
}),$(".js_delete_user").click(function(e){
var t=$(this).data("openid"),c=new s({
container:this,
content:"确定要取消该核销员权限吗？<br/>取消后，该核销员无法进行核销",
position:{
left:-116,
top:0
},
type:"click",
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
r.post({
mask:!1,
url:"/merchant/carduse?action=deletechecker",
data:{
openid:t
}
},function(e){
if("0"==e.base_resp.ret)o.suc("取消核销员权限成功"),location.reload();else switch(e.ret){
default:
r.handleRet(e,{
id:64463,
key:34,
url:"/merchant/carduse?action=deletechecker"
});
}
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
a.removeAll();
}
}]
});
c.show(),a.removeAll(),a.add(c),window.report_click_ele&&window.report_click_ele(this),
e.stopPropagation();
});
var w=e("cardticket/select_shop_dropdown.js");
w({
count:20,
container:"#js_shop_select",
wx_poi_uid:wx.cgiData.shopid,
shop_name:wx.cgiData.shopname||"所在门店",
callback:function(e,t){
e!=wx.cgiData.shopid&&(window.report_click&&window.report_click(8005),location.href=wx.url("/merchant/carduse?action=listchecker&shopid="+e+"&shopname="+encodeURIComponent(t)));
}
});
var f=wx.cgiData.pageInfo;
if(f.total=wx.cgiData.data.total_num,f.count&&f.total>f.count){
f.pageidx=f.begin/f.count;
{
new p({
container:"#js_pager",
first:!1,
last:!1,
midRange:5,
initShowPage:f.pageidx+1,
perPage:f.count,
totalItemsNum:f.total,
callback:function(e){
var t=e.currentPage;
return t!=f.pageidx+1&&(location.href=u.replaceAll({
begin:f.count*(t-1)
}).getUrl()),!1;
}
});
}
}
var k=e("common/wx/searchInput.js");
new k({
id:"#js_search_input",
value:wx.cgiData.keyword.html(!1).html(!1),
placeholder:"请输入核销员名、备注名",
click:function(e){
e.length>0?location.href=wx.url("/merchant/carduse?action=searchbizchecker&keyword="+encodeURIComponent(e)):(o.err("请输入核销员名、备注名"),
$("#searchBar").find(".searchInput").focus()),window.report_click&&window.report_click(8002);
}
});
}(),e("common/qq/jquery.plugin/zclip.js"),$(".js_copy").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
return"http://mp.weixin.qq.com/bizmall/searchcoupon?biz=%s#wechat_redirect".sprintf(wx.cgiData.biz);
},
afterCopy:function(){
o.suc("复制成功");
}
}),function(){
$(".js_add_user").click(function(){
function e(){
this.currentStep=1,this.step=new c({
names:["1 添加核销员","2 选择核销员所在门店"],
container:"#js_step"
}),this.total_length=3,this.$btns=s.find(".js_btn_p"),this.step_btns={
1:$(this.$btns[0]),
2:this.$btns.slice(1)
},this.$contents=s.find(".js_step_content"),this.go(this.currentStep);
}
var t,n,i=$("#js_add_user_tpl").popup({
width:960,
title:"添加核销员",
buttons:[{
text:"下一步",
click:function(){
return t?void a.next():void _.focus();
},
type:"disabled"
},{
text:"上一步",
click:function(){
a.prev();
}
},{
text:"完成",
click:function(){
var e={},c=n.values(e);
return e.nostore||c.length?void r.post({
url:"/merchant/carduse",
data:{
action:"addchecker",
shop_id:c.length?c[0].wx_poi_uid:"",
is_not_appoint_shop:c.length?0:1,
openid:t
},
btn:s.find(".js_btn_p").last()
},function(e){
if("0"==e.base_resp.ret)o.suc("添加核销员权限成功"),location.reload();else switch(e.base_resp.ret){
case-201:
o.err("该核销员已有权限，不可重复添加");
break;

case 14004:
o.err("该用户已在另一个账号拥有核销权限，不可重复添加。请先撤销其他账号的权限，再重试。");
break;

default:
e.base_resp||(e.base_resp={
ret:e.ret
}),r.handleRet(e,{
id:64463,
key:34,
url:"/merchant/carduse?action=addchecker"
});
}
}):void o.err("请选择门店");
},
type:"primary"
}],
onHide:function(){
this.remove();
},
className:"adduser_dialog align_edge"
}),s=i.popup("get");
e.prototype={
prev:function(){
this.go(this.currentStep-1);
},
next:function(){
this.go(this.currentStep+1);
},
go:function(e){
e>=1&&e<=this.total_length&&(this.currentStep=e),this.step.go(this.currentStep),
this.$btns.hide(),this.step_btns[this.currentStep]&&this.step_btns[this.currentStep].show(),
this.$contents.hide(),s.find(".js_step"+this.currentStep).show(),i.popup("resetPosition");
},
last:function(){
this.go(3),this.step.$dom.hide();
}
};
var a=new e,p=!1,d=$(".js_search_loading",s),h=$(".js_no_user",s),u=$(".js_not_follow",s),m=$(".js_search_result",s),_=$("#js_keyword"),w=$(".js_search",s).click(function(){
if(!p){
var e=_.val();
if(!e)return o.err("请输入微信号/QQ号/手机号"),void _.focus();
h.hide(),u.hide(),m.hide(),p=!0;
{
$(this);
}
d.show(),t=null,i.popup("resetPosition"),r.post({
url:"/merchant/carduse",
data:{
action:"searchchecker",
keyword:e
},
complete:function(){
p=!1;
}
},function(e){
if(d.hide(),0==e.base_resp.ret){
if(e.data){
var c=$.parseJSON(e.data);
m.show(),m.find("img").attr("src",wx.url("/misc/getheadimg?openid=%s".sprintf(c.openid))),
m.find(".js_nickname").text(c.nickname),t=c.openid,$(a.$btns[0]).removeClass("btn_disabled").addClass("btn_primary");
}else h.show();
i.popup("resetPosition");
}else switch(e.base_resp.ret){
case-202:
case 200202:
o.err("今天的搜索次数到达上限");
break;

case 200203:
case 213006:
o.err("该用户还没有关注公众号，请通知其关注公众号再添加权限");
break;

case 14014:
u.show();
break;

default:
r.handleRet(e,{
id:64463,
key:34,
url:"/merchant/carduse?action=searchchecker"
});
}
});
}
});
_.on("keyup",function(e){
wx.isHotkey(e,"enter")&&w.click();
}).on("change",function(){
w.click();
}).focus(),n=new l({
pageCapacity:8,
container:$(".js_shoplist",s),
audit_state:"2|3",
pageChange:function(){
i.popup("resetPosition");
}
}),$(".js_close_dialog",s).click(function(){
i.popup("hide");
});
});
var t,n=e("cardticket/select_shop_popup.js");
$(".js_modify_permission").click(function(){
var e=$(this),c="1"==e.data("notpoint"),i=e.data("openid"),s=e.data("shopdelete"),a=e.data("shopid");
t=new n({
autoShow:!0,
multi:!1,
pageCapacity:6,
nostore:!0,
help_top:-5,
audit_state:"2|3",
notpoint:c,
selectedValues:s?[]:[a],
selectComplete:function(e){
r.post({
url:"/merchant/carduse",
data:{
action:"updatechecker",
shop_id:e.length?e[0].wx_poi_uid:"",
is_not_appoint_shop:e.length?0:1,
openid:i
}
},function(e){
if("0"==e.base_resp.ret)o.suc("修改核销员权限成功"),location.reload();else switch(e.base_resp.ret){
default:
e.base_resp||(e.base_resp={
ret:e.ret
}),r.handleRet(e,{
id:64463,
key:34,
url:"/merchant/carduse?action=updatechecker"
});
}
}),t=null;
}
});
});
}(),e("cardticket/common_init.js");
});