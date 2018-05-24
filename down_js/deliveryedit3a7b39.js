define("shop/deliveryedit.js",["biz_common/moment.js","common/wx/tooltips.js","common/wx/Tips.js","common/wx/Cgi.js","biz_web/ui/checkbox.js","common/wx/multiSelector/shop_city.js","common/wx/popup.js","common/wx/tooltipsManager.js","biz_web/lib/json.js","shop/feedback.js","common/wx/top.js","shop/delivery_common.js"],function(e){
"use strict";
function t(){
function e(e,t){
for(var i=0;i<e.length;i++)if(e[i].id==t)return e[i];
return null;
}
function t(e,t){
for(var i=0;i<e.length;i++)for(var n=e[i].sub,s=0;s<n.length;s++)if(t==n[s].name||t==n[s].name)return n[s];
return null;
}
function l(e){
e=$(e);
var t=new a({
container:e,
content:"确定要删除该指定地区的运费设置吗？",
type:"click",
reposition:!0,
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
var e=this.$container.closest(".tbody");
e.remove(),c.removeItem(this);
}
},{
text:"取消",
type:"btn_default",
click:function(){
this.hide();
}
}],
onbeforeclick:function(){
var e=this.$container.closest(".tbody"),t=e.find(".js_no_area").length;
return t?(e.remove(),!1):void 0;
},
onshow:function(){
c.hideAll(),this.show();
}
});
return t.hide(),c.add(t),t;
}
function m(){
$(A).each(function(){
this.show();
});
}
function _(){
$(A).each(function(){
this.hide();
});
}
function v(){
var e,t,i,s,a,r,l,d,c={
id:wx.cgiData.tid,
name:T.val(),
assumer:0,
valuation:0,
topfee:[]
},p={
type:null,
normal:{
fee:{}
},
custom:[]
},h={
fee:{}
},f={
fee:{},
dest:[]
},u=n.values();
_(),A=[],(c.name.len()>40||c.name.len()<=0)&&A.push(T.closest(".frm_control_group").find(".fail")),
u.length||A.push($(".js_delivery_type").closest(".frm_control_group").find(".fail"));
for(var m=0;m<u.length;m++)e=$("#js_delivery_item_"+u[m]),t=e.find(".js_normal_area"),
i=e.find(".js_custom_area"),s=$.extend(!0,{},p),r=$.extend(!0,{},h),l=t.find("input"),
l.each(function(){
var e,t=$(this).attr("name"),i=$(this).val();
"startstandards"==t||"addstandards"==t?(e=parseInt(i),(!/^\d+$/.test(i)||0>e||e>99)&&A.push($(this).closest(".tbody").find(".fail"))):(e=parseInt(100*parseFloat(i)),
(!/^(\d|\.)+$/.test(i)||0>e||e>99999)&&A.push($(this).closest(".tbody").find(".fail"))),
r.fee[t]=e;
}),s.normal=r,i.each(function(){
a=$.extend(!0,{},f),l=$(this).find("input"),d=$(this).find(".js_area_item"),l.each(function(){
var e,t=$(this).attr("name"),i=$(this).val();
"startstandards"==t||"addstandards"==t?(e=parseInt(i),(!/^\d+$/.test(i)||0>e||e>99)&&A.push($(this).closest(".tbody").find(".fail"))):(e=parseInt(100*parseFloat(i)),
(!/^(\d|\.)+$/.test(i)||0>e||e>99999)&&A.push($(this).closest(".tbody").find(".fail"))),
a.fee[t]=e;
}),d.length||(A.push($(".js_no_area")),o.err("未选择任何区域")),a.dest=$.makeArray(d.map(function(){
return{
destcountry:$(this).attr("data-destcountry"),
destprovince:$(this).attr("data-destprovince"),
destcity:$(this).attr("data-destcity")
};
})),s.custom.push(a);
}),s.type=parseInt(u[m]),c.topfee.push(s);
return c;
}
var y,j=$("#select_area_dialog_tpl").popup({
title:"选择地区",
className:"area_select_dialog",
mask:!0,
autoShow:!1,
onOK:function(){
var t,i,n,s=b.getValue(),a=b.getData(),o=[];
if(!s.length)return!0;
for(var r=0;r<s.length;r++)t=s[r].id+"",2!=t.length&&(i=t.substr(0,2),n=e(a,i),n&&o.push({
destcountry:"中国",
destprovince:n.name,
destcity:s[r].name,
id:s[r].id
}));
y.html(template.render("fee_dest_tpl",{
data:o
})),this.hide();
},
onCancel:function(){
this.hide();
},
onShow:function(){}
}),b=new d({
container:"#js_area_select",
disableLevel1Select:!0
}),g=b.getData(),w=s.delivery.topfee;
if(w)for(var x=0;x<w.length;x++)for(var k=w[x].custom,D=0;D<k.length;D++)for(var I=0;I<k[D].dest.length;I++){
var z=k[D].dest[I],S=t(g,z.destcity);
S&&(z.id=S.id);
}
i=$("#js_delivery_container").append(template.render("delivery_tpl",s)),new u("#topTab",u.DATA.shop).selected(5),
f(),n=$(".js_delivery_type").checkbox({
onChanged:function(e){
var t=e.prop("checked"),i=e.attr("value");
if(t)$("#js_delivery_item_"+i).show(),$(".js_delivery_type_fail").hide();else{
var t=n.values();
t.length||$(".js_delivery_type_fail").show(),$("#js_delivery_item_"+i).hide();
}
}
}),$(".js_add_area").click(function(){
var e=template.render("delivery_area_tpl",{
data:{
fee:{}
}
}),t=$(this).closest(".tbody"),i=$(e).insertBefore(t);
i.find(".js_delete_area").each(function(){
l(this);
});
}),$(".js_delete_area").each(function(){
l(this);
}),$("#js_delivery_setting").on("click",".js_edit_area",function(e){
y=$(this).closest(".tbody").find(".js_area");
var t=[],i=y.find(".js_area_item"),n={},s=y.closest(".table_list").find(".js_area_item"),a=[];
i.each(function(){
var e=$(this).data();
t.push(e.id),n[e.id]=!0;
}),s.each(function(){
var e=$(this).data();
n[e.id]||a.push(e.id);
}),b.setItemsByID(t),b.setDisabledItemsByID(a),j.popup("show"),j.popup("resetPosition"),
e.stopPropagation();
});
var T=$("#name"),A=[],C=$("#js_btn_save").click(function(){
var e,t=v();
return A.length?(m(),!1):(e=p?"update":"add",C.btn(!1),void r.post({
url:wx.url("/merchant/delivery?action=%s".sprintf(e)),
data:{
tid:wx.cgiData.tid,
delivery:h.stringify2(t)
},
complete:function(){
C.btn(!0);
}
},function(t){
0==t.ret?(o.suc(p?"编辑模板成功":"新建模板成功"),location.href=wx.url("/merchant/delivery?action=getlist&t=shop/delivery_list")):(t.base_resp||(t.base_resp={
ret:t.ret
}),r.show(t),r.handleRet(t,{
id:64462,
key:95,
url:"/merchant/delivery?action=%s".sprintf(e)
}));
}));
});
$("#js_btn_cancel").click(function(){
return location.href=wx.url("/merchant/delivery?action=getlist&t=shop/delivery_list"),
!1;
});
}
var i,n,s=wx.cgiData.data,a=(e("biz_common/moment.js"),e("common/wx/tooltips.js")),o=e("common/wx/Tips.js"),r=e("common/wx/Cgi.js"),l={},d=(s.delivery,
e("biz_web/ui/checkbox.js"),e("common/wx/multiSelector/shop_city.js")),c=(e("common/wx/popup.js"),
e("common/wx/tooltipsManager.js")),p=!1,h=e("biz_web/lib/json.js"),f=e("shop/feedback.js"),u=e("common/wx/top.js");
e("shop/delivery_common.js"),template.helper("$initSetting",function(e,t){
for(var i=e.topfee||[],n={
type:t,
normal:{
fee:{}
},
custom:[],
notexist:!0
},s=0;s<i.length;s++)if(i[s].type==t){
n=i[s];
break;
}
return template.render("delivery_setting_tpl",{
data:n
});
}),s.currentType=l,wx.cgiData.tid?r.get({
url:wx.url("/merchant/delivery?action=get&tid=%s".sprintf(wx.cgiData.tid)),
data:{}
},function(e){
if(e.delivery_template){
s.delivery=e.delivery_template;
for(var i in s.deliveryType)for(var n=s.delivery&&s.delivery.topfee||[],a=0;a<n.length;a++)if(n[a].type==i){
l[i]=!0;
break;
}
p=!0;
}
t();
}):t();
});