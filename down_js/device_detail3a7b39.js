define("ibeacon/device_detail.js",["biz_web/ui/checkbox.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/sosomap/city_select.js","common/wx/dialog.js","biz_web/ui/dropdown.js","common/wx/region.js","biz_web/ui/input/lentips.js","common/wx/pagebar.js","common/wx/popover.js","common/wx/time.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/top.js","common/wx/sosomap/util.js","ibeacon/shopDialog.js","ibeacon/pageDialog.js"],function(e){
"use strict";
e("biz_web/ui/checkbox.js"),e("common/wx/popup.js");
var t=e("common/wx/Cgi.js"),i=(e("common/wx/sosomap/city_select.js"),e("common/wx/dialog.js"),
e("biz_web/ui/dropdown.js"),e("common/wx/region.js"),e("biz_web/ui/input/lentips.js")),o=(e("common/wx/pagebar.js"),
e("common/wx/popover.js")),n=e("common/wx/time.js"),c=e("common/wx/Tips.js"),s=(e("common/wx/tooltips.js"),
e("common/wx/top.js")),a=(e("common/wx/sosomap/util.js"),e("ibeacon/shopDialog.js")),r=e("ibeacon/pageDialog.js");
template.helper("timeFormat",function(e){
return n.timeFormat(e);
});
var p=$("#js_copy"),m=$("#js_edit_remark"),d=$("#js_edit_shop"),l=$(".js_unbind_page"),u=$(".js_bind_page"),_=$("#js_device_comment"),b=$(".js_del"),j=$("#js_device_location"),v=$(".js_time"),w=$("#js_device_idcopy_tpl"),g=$("#js_device_edit_remark_tpl"),x=($("#js_edit_shop_tpl"),
$("#js_bind_device_tpl"),[]);
new s("#js_div_toptab",s.DATA.ibeacon).selected("deviceManagement"),v.text(new Date(1e3*v.data("time")).toJSON().substr(0,10).replace(/-/g,".")+"创建"),
p.click(function(){
w.popup({
title:"复制设备ID到手机",
onShow:function(){}
});
}),m.click(function(){
var e="",o="";
g.popup({
title:"编辑备注信息",
buttons:[{
text:"确定",
type:"primary",
click:function(){
var i=this;
o.btn(0),t.post({
url:"/merchant/beaconsavelocandpages?action=setinfo",
data:{
device_id:wx.cgiData.id,
device_comment:e
},
success:function(t){
0==t.base_resp.ret?(i.remove(),_.find("span").html(e)):(i.remove(),c.err("系统错误"));
}
});
}
},{
text:"取消",
click:function(){
this.remove();
}
}],
onShow:function(){
o=this.$dialogWrp.eq(0).find(".btn").eq(0),o.disable();
var t=this;
new i({
input:t.$dialogWrp.eq(0).find(".js_input"),
tip:t.$dialogWrp.eq(0).find(".js_tips"),
maxlimit:15,
trim:!0,
className:"warn",
callback:function(i,n){
i?(t.$dialogWrp.eq(0).find(".js_input").val(n.value.substr(0,15)),t.$dialogWrp.eq(0).find(".js_input").keyup()):n.len>0&&n.len<=15?(e=n.value,
o.enable()):o.disable();
}
});
}
});
}),d.click(function(){
var e=0,i=new a({
container:"#js_edit_shop_tpl",
title:"选择门店",
className:"device_dialog",
width:960,
getRecord:!0,
shopRecords:x,
shopCount:e,
buttons:[{
text:"确定",
type:"primary",
click:function(){
var e=this,o=this.$dialogWrp.eq(0).find(".btn_input").eq(0);
o.btn(0),t.post({
url:"/merchant/beaconsavelocandpages?action=setinfo",
data:{
device_id:wx.cgiData.id,
location_id:i.getLocation().locationID
},
success:function(t){
o.btn(1),0==t.base_resp.ret?(e.remove(),j.text(i.getLocation().locationName)):(e.remove(),
c.err("系统错误"));
}
});
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
}),l.click(function(){
var e=$(this).data("id");
new o({
dom:this,
biddIfBlur:!0,
content:"解绑后设备将自动停用，确定要解绑这个设备的页面吗？",
buttons:[{
text:"解绑",
type:"primary",
click:function(){
var i=this;
t.post({
url:wx.url("/merchant/beaconsavelocandpages?action=unbindpage"),
data:{
device_id:e
},
success:function(e){
0==e.base_resp.ret?(i.hide(),c.suc("已解绑"),location.reload()):c.err("系统错误");
}
});
}
},{
text:"取消",
click:function(){
this.hide();
}
}]
});
}),u.click(function(){
var e=new r({
container:"#js_bind_device_tpl",
title:"绑定页面",
className:"device_dialog",
width:992,
buttons:[{
text:"绑定",
type:"primary",
click:function(){
if(!e.getPageID())return void c.err("请选择需要绑定的页面");
var i=this.$dialogWrp.eq(0).find(".btn_input").eq(0);
i.btn(0),t.post({
url:"/merchant/beaconsavelocandpages?action=bindpage",
data:{
device_id:wx.cgiData.id,
page_id:e.getPageID()
},
success:function(e){
i.btn(1),0==e.base_resp.ret?(c.suc("绑定成功"),location.reload()):c.err("系统错误");
}
});
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
}),b.click(function(){
new o({
dom:this,
hideIfBlur:!0,
content:"确定要删除这个设备吗？",
buttons:[{
type:"primary",
text:"删除",
click:function(){
var e=this;
e.$pop.find(".jsPopoverBt").eq(0).btn(!1),t.post({
url:"/merchant/beaconsavelocandpages?action=remove",
data:{
device_id:wx.cgiData.id
},
success:function(t){
0==t.base_resp.ret?(e.remove(),c.suc("已删除"),location.href=wx.url("/merchant/beacongetdevices?action=list")):(e.remove(),
c.err("系统错误"));
}
});
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
});
});