define("shop/delivery_global.js",["common/wx/top.js","common/wx/Tips.js","common/wx/tooltipsManager.js","common/wx/multiSelector/shop_city.js","biz_web/ui/checkbox.js","common/wx/popup.js","common/wx/Cgi.js","biz_web/lib/json.js","common/wx/tooltips.js","shop/delivery_common.js"],function(e){
"use strict";
function t(e,t){
for(var s=0;s<e.length;s++)if(e[s].id==t)return e[s];
return null;
}
function s(e,t){
for(var s=0;s<e.length;s++)for(var o=e[s].sub,n=0;n<o.length;n++)if(t==o[n].name||t==o[n].name)return o[n];
return null;
}
function o(){
var e,t,s,o,n,a,r,c,d=[],_={
type:null,
normal:{
fee:{}
},
custom:[]
},p={
fee:{}
},h={
fee:{},
dest:[]
};
return i(),S=[],e=$("#js_delivery_item"),t=e.find(".js_normal_area"),s=e.find(".js_custom_area"),
o=$.extend(!0,{},_),a=$.extend(!0,{},p),r=t.find("input"),r.each(function(){
var e,t=$(this).attr("name"),s=$(this).val();
"startstandards"==t||"addstandards"==t?(e=parseInt(s),(!/^\d+$/.test(s)||0>e||e>99)&&S.push($(this).closest(".tbody").find(".fail"))):(e=parseInt(100*parseFloat(s)),
(!/^(\d|\.)+$/.test(s)||0>e||e>99999)&&S.push($(this).closest(".tbody").find(".fail"))),
a.fee[t]=e;
}),o.normal=a,s.each(function(){
n=$.extend(!0,{},h),r=$(this).find("input"),c=$(this).find(".js_area_item"),r.each(function(){
var e,t=$(this).attr("name"),s=$(this).val();
"startstandards"==t||"addstandards"==t?(e=parseInt(s),(!/^\d+$/.test(s)||0>e||e>99)&&S.push($(this).closest(".tbody").find(".fail"))):(e=parseInt(100*parseFloat(s)),
(!/^(\d|\.)+$/.test(s)||0>e||e>99999)&&S.push($(this).closest(".tbody").find(".fail"))),
n.fee[t]=e;
}),c.length||(S.push($(".js_no_area")),l.err("未选择任何区域")),n.dest=$.makeArray(c.map(function(){
return{
destcountry:$(this).attr("data-destcountry"),
destprovince:$(this).attr("data-destprovince"),
destcity:$(this).attr("data-destcity")
};
})),o.custom.push(n);
}),o.type=u,d=o;
}
function n(){
$(S).each(function(){
this.show();
});
}
function i(){
$(S).each(function(){
this.hide();
});
}
function a(e){
e=$(e);
new f({
container:e,
content:"确定要删除该指定地区的运费设置吗？",
type:"click",
reposition:!0,
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
var e=this.$container.closest(".tbody");
e.remove(),d.removeItem(this);
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
d.hideAll(),this.show();
}
});
}
var r=wx.cgiData,c=e("common/wx/top.js"),l=e("common/wx/Tips.js"),d=e("common/wx/tooltipsManager.js"),_=e("common/wx/multiSelector/shop_city.js"),p=(e("biz_web/ui/checkbox.js"),
e("common/wx/popup.js"),e("common/wx/Cgi.js")),h=e("biz_web/lib/json.js"),f=e("common/wx/tooltips.js");
e("shop/delivery_common.js");
var u=10000028,m={
type:u,
normal:{
fee:{}
},
custom:[]
};
new c("#topTab",c.DATA.shop).selected(5);
var v=r.express_info.express_settle_type;
$("#js_express_type").find(".frm_radio").checkbox({
multi:!1,
onChanged:function(e){
var t=e.val();
v=1*t,1==v?($("#js_global_express").show(),$("#js_delivery_box").hide()):($("#js_global_express").hide(),
$("#js_delivery_box").show());
}
});
var b,y=$("#select_area_dialog_tpl").popup({
title:"选择地区",
className:"area_select_dialog",
mask:!0,
autoShow:!1,
onOK:function(){
var e,s,o,n=j.getValue(),i=j.getData(),a=[];
if(!n.length)return!0;
for(var r=0;r<n.length;r++)e=n[r].id+"",2!=e.length&&(s=e.substr(0,2),o=t(i,s),o&&a.push({
destcountry:"中国",
destprovince:o.name,
destcity:n[r].name,
id:n[r].id
}));
b.html(template.render("fee_dest_tpl",{
data:a
})),this.hide();
},
onCancel:function(){
this.hide();
},
onShow:function(){}
}),j=new _({
container:"#js_area_select",
disableLevel1Select:!0
}),x=j.getData();
if(2==v)try{
if(m=r.express_info.delivery[0].topfee[0])for(var w=m.custom,g=0;g<w.length;g++)for(var k=0;k<w[g].dest.length;k++){
var I=w[g].dest[k],D=s(x,I.destcity);
D&&(I.id=D.id);
}
}catch(A){}
r.express_info.topfee=m,console.log(m),$("#js_delivery").html(template.render("delivery_setting_tpl",{
data:m
})),$("#js_express_show").html(template.render("delivery_show_tpl",r.express_info)),
1==v?($("#js_express_type").find(".frm_radio").eq(0).click(),$("#js_global_express_input").val(r.express_info.global_express_fee/100)):$("#js_express_type").find(".frm_radio").eq(1).click(),
$("#js_show_express_form").click(function(){
$("#js_express_edit_box").show(),$("#js_express_detail_box").hide();
}),$("#js_btn_cancel").click(function(){
location.reload(!0);
});
var S=[],z=$("#js_btn_save").click(function(){
var e={
express_settle_type:v
};
if(1==v)e.global_express_fee=100*$.trim($("#js_global_express_input").val());else{
var t=o();
if(console.log(t),e.delivery=h.stringify(t),S.length)return n(),!1;
}
z.btn(!1),p.post({
url:wx.url("/merchant/delivery?action=edit_globalfee"),
data:e,
complete:function(){
z.btn(!0);
}
},function(e){
e.base_resp&&0==e.base_resp.ret?l.suc("运费保存成功"):(e.base_resp||(e.base_resp={
ret:e.base_resp.ret
}),p.show(e),l.err("运费保存失败"),p.handleRet(e,{
id:64462,
key:95,
url:"/merchant/delivery?action=edit_globalfee"
}));
});
});
$(".js_add_area").click(function(){
var e=template.render("delivery_area_tpl",{
data:{
fee:{}
}
}),t=$(this).closest(".tbody"),s=$(e).insertBefore(t);
s.find(".js_delete_area").each(function(){
a(this);
});
}),$("#js_delivery").on("click",".js_edit_area",function(e){
b=$(this).closest(".tbody").find(".js_area");
var t=[],s=b.find(".js_area_item"),o={},n=b.closest(".table_list").find(".js_area_item"),i=[];
s.each(function(){
var e=$(this).data();
t.push(e.id),o[e.id]=!0;
}),n.each(function(){
var e=$(this).data();
o[e.id]||i.push(e.id);
}),j.setItemsByID(t),j.setDisabledItemsByID(i),y.popup("show"),y.popup("resetPosition"),
e.stopPropagation();
}),$(".js_delete_area").each(function(){
{
var e=$(this);
new f({
container:e,
content:"确定要删除该指定地区的运费设置吗？",
type:"click",
reposition:!0,
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
var e=this.$container.closest(".tbody");
e.remove(),this.hide(),d.removeItem(this);
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
d.hideAll(),this.show();
}
});
}
});
});