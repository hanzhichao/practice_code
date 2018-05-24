define("ibeacon/device_add.js",["biz_web/ui/checkbox.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/sosomap/city_select.js","common/wx/dialog.js","biz_web/ui/dropdown.js","biz_web/ui/input/lentips.js","common/wx/pagebar.js","common/wx/Tips.js","common/wx/sosomap/util.js","ibeacon/shopDialog.js"],function(e){
"use strict";
e("biz_web/ui/checkbox.js"),e("common/wx/popup.js");
var t=e("common/wx/Cgi.js"),o=(e("common/wx/sosomap/city_select.js"),e("common/wx/dialog.js")),i=e("biz_web/ui/dropdown.js"),n=e("biz_web/ui/input/lentips.js"),a=(e("common/wx/pagebar.js"),
e("common/wx/Tips.js")),s=(e("common/wx/sosomap/util.js"),e("ibeacon/shopDialog.js")),c=$("#js_default"),l=$("#js_success"),m=$("#js_message"),r=$("#js_tips"),u=$("#js_submit"),p=$("#js_number"),_=null,d=($("#js_edit_shop_tpl"),
new Date);
$("#js_name").text("设备信息列表-"+d.toJSON().replace(/-/g,"").substr(0,8)+".xls");
var b={
quantity:1
},v=[],w=[{
name:"更多...",
value:"__more__"
}],j=function(e){
var t=e.container,o=$(t).find("input");
o.on("keyup",function(){
o.val(o.val().replace(/[^0-9]/g,"")),Number(o.val())>Number(e.maxlimit)&&o.val(e.maxlimit),
"0"==o.val()&&o.val(1);
}),o.on("blur",function(){
""==o.val()&&o.val(1);
}),$(t).on("click",".js_subtract",function(){
o.val()>1&&o.val(Number(o.val())-1);
}),$(t).on("click",".js_add",function(){
o.val(""==o.val()?1:Number(o.val())+1>e.maxlimit?e.maxlimit:Number(o.val())+1);
});
};
new j({
container:"#js_number",
maxlimit:9999
}),new n({
input:m,
tip:r,
maxlimit:15,
trim:!0,
className:"warn",
callback:function(e,t){
e&&(m.val(t.value.substr(0,15)),m.keyup()),b.device_comment=t.value.substr(0,15);
}
});
var f=0,x=null,h="";
t.get({
url:"/merchant/beacongetmplocations?action=list&page_index=1&f=json",
success:function(e){
if(0==e.base_resp.ret){
v=JSON.parse(e.records),f=e.record_count,v.length<=5&&(w=[]);
for(var t=0;t<v.length&&5>t;t++)w.unshift({
name:v[t].name,
value:v[t].id
});
}
var o=new i({
container:"#js_shop_dropdown",
label:"所在门店",
data:w,
callback:function(e){
if("__more__"==e){
_=$(".jsBtLabel");
var t=new s({
container:"#js_edit_shop_tpl",
title:"选择门店",
className:"device_dialog",
width:960,
shopRecords:v,
shopCount:f,
onHide:function(){
o.reset(),_.text(h?h:"选择门店");
},
buttons:[{
text:"确定",
type:"primary",
click:function(){
o.reset(),_.text(t.getLocation().locationName),h=t.getLocation().locationName,this.remove(),
x=t.getLocation().locationID;
}
},{
text:"取消",
click:function(){
o.reset(),_.text(h?h:"选择门店"),this.remove();
}
}]
});
}else x=e;
}
});
}
}),u.click(function(){
return b.quantity=p.find("input").val(),b.location_id=x,b.device_comment=m.val(),
""==b.device_comment?(a.err("请输入设备备注信息"),!1):Number(b.quantity)>Number(wx.cgiData.limit_cnt)?(a.err("当前申请的设备数已超过上限"),
!1):void t.post({
url:"/merchant/beaconapplydevice?action=create",
data:b,
success:function(e){
if(0==e.base_resp.ret)if(4!=wx.cgiData.service_type)o.show({
type:"succ",
msg:"正在生成设备信息列表，稍后会以系统通知的方式发送给您，请留意查收！",
width:750,
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove(),window.location.href=wx.url("/merchant/beacongetdevices?action=list");
}
}]
});else{
for(var t=0,i=b.quantity,n=[];i>0;)i>2e3?(n.push({
offset:t,
count:2e3
}),t+=2e3):(n.push({
offset:t,
count:i
}),t+=i),i-=2e3;
l.html(template.render("js_download_tpl",{
list:n,
apply_id:e.apply_id
})).show().find("#js_close").on("click",function(){
window.location.href=wx.url("/merchant/beacongetdevices?action=list");
}),c.hide();
}else a.err("系统错误");
}
});
});
});