define("ibeacon/device_manage.js",["biz_web/ui/checkbox.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/sosomap/city_select.js","common/wx/dialog.js","biz_web/ui/dropdown.js","common/wx/pagebar.js","common/wx/popover.js","common/wx/time.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/top.js","common/wx/sosomap/util.js","ibeacon/shopDialog.js","ibeacon/pageDialog.js"],function(e){
"use strict";
e("biz_web/ui/checkbox.js"),e("common/wx/popup.js");
var t=e("common/wx/Cgi.js"),i=(e("common/wx/sosomap/city_select.js"),e("common/wx/dialog.js"),
e("biz_web/ui/dropdown.js")),n=e("common/wx/pagebar.js"),o=e("common/wx/popover.js"),c=e("common/wx/time.js"),a=e("common/wx/Tips.js"),s=(e("common/wx/tooltips.js"),
e("common/wx/top.js")),r=(e("common/wx/sosomap/util.js"),e("ibeacon/shopDialog.js")),d=e("ibeacon/pageDialog.js");
template.helper("timeFormat",function(e){
return c.timeFormat(e);
});
var l=function(){
var e=new Array;
return{
addDevice:function(t,i,n,o){
e.push({
device_id:t,
page_id:i,
is_bind:n
}),o(e);
},
addAllDevice:function(t,i){
this.removeAllDevice(function(){}),e=t,i(e);
},
removeDevice:function(t,i){
for(var n=0;n<e.length;n++)e[n].device_id==t&&e.splice(n,1);
i(e);
},
removeAllDevice:function(t){
e=[],t&&t(e);
},
getAllDevice:function(){
return e;
},
getBindedDevice:function(){
for(var t=new Array,i=0;i<e.length;i++)e[i].is_bind&&t.push(e[i]);
return t;
}
};
}(),p=$("#js_tbody"),_=$(".js_tbody_loading");
_.hide(),p.html(template.render("js_tbody_tpl",{
list:wx.cgiData.records
}));
var u=$("#js_batch_operation"),h=$(".js_checkbox"),m=$("#js_bind_page_btn"),v=($(".js_bind_page"),
$("#js_unbind_page_btn")),b=($(".js_unbind_page"),$("#js_del_btn")),g=($(".js_del"),
$("#js_state_dropdown"),$(".js_a_search")),f=$(".js_search"),x=$("#js_download"),j=$(".pagination_wrp"),w=null,k=($("#js_bind_device_tpl"),
$("#js_tbody_tpl"),$("#js_edit_shop_tpl"),$("#js_store_list_tpl"),[]),D=[{
name:"更多...",
value:"__more__"
}],y=wx.cgiData.total_count,A=wx.cgiData.showpage,z=wx.cgiData.count,N=wx.cgiData.key,B=wx.cgiData.id,C=wx.cgiData.filter_type||0,I=wx.cgiData.location_id,P=wx.cgiData.total_download_count,S=function(e){
for(var t=0;t<e.length;t++)e[t].is_bind=e[t].binded_page?1:0;
},J=wx.cgiData.records;
S(J);
var O=function(e){
b.disable(),m.disable(),v.disable();
for(var t=[],i=[],n=0;n<e.length;n++)e[n].is_bind?t.push(e[n]):i.push(e[n]);
0==e.length?(b.disable(),m.disable(),v.disable()):(b.enable(),m.enable(),0!=t.length?v.enable():v.disable());
};
new s("#js_div_toptab",s.DATA.ibeacon).selected("deviceManagement");
var L=function(e,i){
var n=e?"解绑后设备将自动停用，确定要解绑这%s个设备的页面吗？".sprintf(l.getAllDevice().length):"解绑后设备将自动停用，确定要解绑这个设备的页面吗？";
new o({
dom:this,
hideIfBlur:!0,
content:n,
buttons:[{
text:"解绑",
type:"primary",
click:function(){
var n=this,o=wx.url(e?"/merchant/beaconbatchdevice?action=unbind":"/merchant/beaconsavelocandpages?action=unbindpage");
if(e)var c={
devices:i
};else var c={
device_id:i
};
t.post({
url:o,
data:c,
success:function(e){
0==e.base_resp.ret?(n.hide(),a.suc("已解绑"),location.reload()):a.err("系统错误");
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
},T=function(e,i){
var n=wx.url(e?"/merchant/beaconbatchdevice?action=bind":"/merchant/beaconsavelocandpages?action=bindpage"),o=new d({
container:"#js_bind_device_tpl",
title:"绑定页面",
className:"device_dialog",
width:992,
buttons:[{
text:"绑定",
type:"primary",
click:function(){
if(!o.getPageID())return void a.err("请选择需要绑定的页面");
var c={
page_id:o.getPageID()
};
e?c.devices=i:c.device_id=i,t.post({
url:n,
data:c,
success:function(){
a.suc("绑定成功"),location.reload();
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
},q=function(){
v.click(function(){
L.call(this,!0,l.getBindedDevice().map(function(e){
return e.device_id;
}));
}),$("body").on("click",".js_unbind_page",function(){
var e=$(this);
L.call(this,!1,e.data("id"));
}),b.click(function(){
for(var e=l.getAllDevice(),i=[],n="",c=0;c<e.length;c++)1==e[c].is_bind&&i.push(e[c]);
n=i.length?"其中有%s个设备已绑定页面，确定要删除这%s个设备吗？".sprintf(i.length,e.length):"确定要删除这%s个设备吗？".sprintf(e.length),
new o({
dom:this,
hideIfBlur:!0,
content:n,
buttons:[{
type:"primary",
text:"删除",
click:function(){
var i=this;
i.$pop.find(".jsPopoverBt").eq(0).btn(!1),t.post({
url:"/merchant/beaconbatchdevice?action=remove",
data:{
devices:e.map(function(e){
return e.device_id;
})
},
success:function(e){
i.remove(),0==e.base_resp.ret?(a.suc("已删除"),location.reload()):a.err("系统错误");
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
}),$("body").on("click",".js_del",function(){
var e=$(this).data("id"),i=$(this).data("is_bind");
new o({
dom:this,
hideIfBlur:!0,
content:i?"该设备已绑定页面，是否确认要删除?":"确定要删除这个设备吗？",
buttons:[{
type:"primary",
text:"删除",
click:function(){
var i=this;
i.$pop.find(".jsPopoverBt").eq(0).btn(!1),t.post({
url:"/merchant/beaconsavelocandpages?action=remove",
data:{
device_id:e
},
success:function(e){
0==e.base_resp.ret?(i.remove(),a.suc("已删除"),location.reload()):(i.remove(),a.err("系统错误"));
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
}),m.click(function(){
T.call(this,!0,l.getAllDevice().map(function(e){
return e.device_id;
}));
}),$("body").on("click",".js_bind_page",function(){
var e=$(this);
T.call(this,!1,e.data("id"));
}),g.click(function(){
N=f.val(),F(f.val()?"/merchant/beacongetdevices?action=list&f=json&search_txt="+f.val()+"&page_index=1&page_size="+z+"&filter_type="+C+"&location_id="+I+"&search_txt="+N:"/merchant/beacongetdevices?action=list&f=json&page_index=1&page_size="+z+"&filter_type="+C+"&location_id="+I+"&search_txt="+N);
}),f.on("keyup",function(){
var e="which"in event?event.which:event.keyCode;
13!=e&&$(this).val()||(N=f.val(),F("/merchant/beacongetdevices?action=list&f=json&filter_type="+C+"&location_id="+I+"&search_txt="+N));
}),f.on("change",function(){
B="";
});
},F=function(e){
j.html(""),p.hide(),_.show(),l.removeAllDevice(O),u.checkbox("checked",!1),t.get({
url:e,
success:function(e){
0==e.base_resp.ret?(p.html(template.render("js_tbody_tpl",{
list:JSON.parse(e.records)
})),J=JSON.parse(e.records),S(J),$(".js_checkbox").checkbox({
type:"checkbox",
onChanged:function(e){
var t=e.data("id"),i=e.data("is_bind"),n=e.data("page_id");
e.prop("checked")?l.addDevice(t,n,i,O):l.removeDevice(t,O);
}
}),p.show(),_.hide(),E(e.record_count)):a.err("系统错误");
}
});
},H=function(){
var e=0,n="";
t.get({
url:"/merchant/beacongetmplocations?action=list&page_index=1&f=json",
success:function(t){
if(0==t.base_resp.ret){
k=JSON.parse(t.records),e=t.record_count,k.length<=5&&(D=[]);
for(var o=0;o<k.length&&5>o;o++)D.unshift({
name:k[o].name,
value:k[o].id
});
}
D.unshift({
name:"所有门店",
value:0
},{
name:"无门店",
value:-1
});
var c=new i({
container:"#js_shop_dropdown",
label:"所在门店",
data:D,
callback:function(t,i){
if("__more__"==t){
w=$(".jsBtLabel").eq(0),w.text("所有门店");
var o=new r({
container:"#js_edit_shop_tpl",
title:"选择门店",
className:"device_dialog",
width:960,
shopRecords:k,
shopCount:e,
onHide:function(){
c.reset(),w.text(n?n:"选择门店");
},
buttons:[{
text:"确定",
type:"primary",
click:function(){
c.reset(),w.text(o.getLocation().locationName),n=o.getLocation().locationName,this.remove(),
I=o.getLocation().locationID,F("/merchant/beacongetdevices?action=list&f=json&filter_type="+C+"&page_size="+z+"&location_id="+I+"&search_txt="+N+"&id="+B);
}
},{
text:"取消",
click:function(){
c.reset(),w.text(n?n:"选择门店"),this.remove();
}
}]
});
}else I=t,n=i,F("/merchant/beacongetdevices?action=list&f=json&filter_type="+C+"&page_size="+z+"&location_id="+I+"&search_txt="+N+"&id="+B);
}
});
}
}),new i({
container:"#js_state_dropdown",
label:"设备状态",
data:[{
name:"全部状态",
value:0
},{
name:"正常",
value:1
},{
name:"正常 未激活",
value:2
}],
callback:function(e){
C=e,F("/merchant/beacongetdevices?action=list&f=json&filter_type="+C+"&page_size="+z+"&location_id="+I+"&search_txt="+N+"&id="+B);
}
});
},M=function(){
u.checkbox({
type:"checkbox",
onChanged:function(e){
$(".js_checkbox").checkbox("checked",e.prop("checked")),e.prop("checked")?l.addAllDevice(J.map(function(e){
return{
device_id:e.id,
page_id:e.page_id,
is_bind:e.is_bind
};
}),O):l.removeAllDevice(O);
}
}),h.checkbox({
type:"checkbox",
onChanged:function(e){
var t=e.data("id"),i=e.data("is_bind"),n=e.data("page_id");
e.prop("checked")?l.addDevice(t,n,i,O):l.removeDevice(t,O);
}
});
},R=function(){
if(P>2e3){
for(var e=[],t=0;P>0;)P>2e3?(e.push({
offset:t,
count:2e3
}),t+=2e3):(e.push({
offset:t,
count:P
}),t+=P),P-=2e3;
x.click(function(){
$(template.render("js_download_tpl",{
list:e
})).popup({
title:"下载表格"
});
});
}
},E=function(e){
e>0&&new n({
container:".pagination_wrp",
perPage:z,
first:!1,
last:!1,
isSimple:!0,
initShowPage:A,
totalItemsNum:e,
callback:function(e){
var i=e.currentPage;
l.removeAllDevice(O),u.checkbox("checked",!1),window.scrollTo(0,0),p.hide(),_.show(),
t.get({
url:wx.url("/merchant/beacongetdevices?action=list&f=json&page_index="+i+"&filter_type="+C+"&page_size="+z+"&location_id="+I+"&search_txt="+N+"&id="+B),
success:function(e){
0==e.base_resp.ret?(p.html(template.render("js_tbody_tpl",{
list:JSON.parse(e.records)
})),J=JSON.parse(e.records),S(J),$(".js_checkbox").checkbox({
type:"checkbox",
onChanged:function(e){
var t=e.data("id"),i=e.data("is_bind"),n=e.data("page_id");
e.prop("checked")?l.addDevice(t,n,i,O):l.removeDevice(t,O);
}
}),p.show(),_.hide()):a.err("系统错误");
}
});
}
});
},G=function(){
H(),M(),R(),E(y),l.removeAllDevice(O),q();
};
G();
});