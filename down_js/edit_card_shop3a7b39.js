define("cardticket/edit_card_shop.js",["cardticket/select_shop_popup.js","common/wx/pagebar.js","tpl/cardticket/edit_card_shop.html.js","tpl/cardticket/edit_shoplist.html.js"],function(t){
"use strict";
function e(t){
t=$.extend(!0,{},o,t),this.$dom=$(t.container),this.opt=t,this.init();
}
var a=t("cardticket/select_shop_popup.js"),i=t("common/wx/pagebar.js"),o={
data:{
location_id_list:[]
},
container:null,
readonly:!0,
readonlyValues:[]
},s=template.compile(t("tpl/cardticket/edit_card_shop.html.js")),n=template.compile(t("tpl/cardticket/edit_shoplist.html.js"));
return e.prototype={
init:function(){
function t(){
m.length?$(".js_shop_table",r).show():$(".js_shop_table",r).hide();
}
function e(t,e){
for(var i=[],s=0;s<m.length;s++)i.push(m[s].id);
j=new a({
autoShow:"undefined"!=typeof e?e:!0,
multi:!0,
pageCapacity:5,
selectedValues:i,
help_top:-15,
nostore:!1,
readonly:p.readonly,
audit_state:"2|3",
show_pay:2==p.data.type||4==p.data.type||10==p.data.type,
readonlyValues:p.readonlyValues,
selectComplete:function(t){
v=1,o(t);
},
initComplete:function(){
f=this.getCacheData();
for(var t=p.data.location_id_list||[],e=[],a=0;a<t.length;a++)f[t[a]]&&e.push(f[t[a]]);
g&&(o(e),g=!1);
},
data:t
}),_.shop_select=j;
}
function o(e){
function a(){
for(var t=[],o=(v-1)*w,s=v*w,l=o;l<e.length&&s>l;l++){
if(p.readonly)for(var _=0;_<p.readonlyValues.length;_++)if(e[l].wx_poi_uid==p.readonlyValues[_]){
e[l].__readonly=!0;
break;
}
t.push(e[l]);
}
if(h.html(n({
shop_data:t
})),e.length>w){
new i({
container:$(".js_shop_pager",r),
perPage:w,
initShowPage:v,
totalItemsNum:e.length,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
v=t.currentPage,a();
}
});
}else $(".js_shop_pager",r).html("");
}
e||(e=m);
for(var o=[],s=0;s<e.length;s++)o.push(e[s].wx_poi_uid);
m=e,_.current_shop=e,d.val(o.join("|")),a(),t(),l();
}
function l(){
if(window.wx_is_paycard&&(4==p.data.type||2==p.data.type)){
var t=c.val(),e=!1;
if(2==t){
for(var a=0;a<m.length;a++)if(m[a].card_pay_money){
e=!0;
break;
}
}else if(1==t)for(var i in f)if(f.hasOwnProperty(i)&&f[i].card_pay_money){
e=!0;
break;
}
$(".js_icon_payable").hide(),e&&!p.data.sub_merchant_id?($(".js_card_pay_money_tips").show(),
$("#js_hidden_card_pay_money").val(1),$(".js_icon_payable_"+t).show()):($("#js_hidden_card_pay_money").val(0),
$(".js_card_pay_money_tips").hide());
}
}
var _=this,p=this.opt,r=this.$dom;
p.data.id_list=p.data.location_id_list.join("|"),this.readonlyValues=p.readonlyValues||[],
r.html(s(p));
{
var h=$(".js_shop_list",r),d=$(".js_hidden_shop_id_list",r),c=$(".js_hidden_shop_type",r),u=$(".js_fix_shop",r).hide(),y=$(".js_shop_type",r);
y.checkbox({
onChanged:function(e){
var a=e.val();
c.val(a),2==a?(u.show(),t()):u.hide(),l(),p.onChanged&&p.onChanged(e,a);
}
});
}
h.on("click",".js_delete_shop",function(){
var t=$(this).closest("tr"),e=t.data("id");
if(e){
t.remove();
for(var a=0;a<m.length;a++)if(m[a].wx_poi_uid==e||m[a].id==e){
m.splice(a,1),m.length%w==0&&m.length==a&&v>1&&v--;
break;
}
o();
}
return!1;
});
var f={},m=[],g=!0;
2==p.data.shop_type&&$(y[0]).click();
var j=null,v=1,w=5;
e(null,!1),$(".js_add_shop",r).click(function(){
return e(),!1;
}),this.current_shop=m,this.$shop_type=c;
},
getSelectedValue:function(){
var t=this.$shop_type.val();
return{
shop_type:t,
location_list:this.current_shop
};
},
getidlist:function(){
var t,e=[],a=this.$shop_type.val();
t=1==a?this.shop_select.getData():this.current_shop;
for(var i=0;i<t.length;i++)e.push(t[i].wx_poi_uid);
return{
shop_type:a,
location_id_list:e
};
}
},e;
});