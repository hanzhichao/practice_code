define("cardticket/select_shop.js",["biz_web/ui/checkbox.js","page/cardticket/dialog_select_shop.css","common/wx/Cgi.js","common/wx/pagebar.js","common/wx/Tips.js","common/wx/tooltips.js","tpl/cardticket/select_shop.html.js","cardticket/store_cgi.js","cardticket/common_template_helper.js"],function(t){
"use strict";
function e(t){
this.opt=$.extend(!0,{},i,t),this.$dom=$(this.opt.container),this.init();
}
var i={
multi:!1,
container:null,
data:null,
initComplete:$.noop,
pageCapacity:10,
pageChange:$.noop,
selectedValues:[],
selectAll:$.noop,
nostore:!0,
notpoint:!1,
readonly:!1,
readonlyValues:[]
};
t("biz_web/ui/checkbox.js"),t("page/cardticket/dialog_select_shop.css");
var s=t("common/wx/Cgi.js"),a=(t("biz_web/ui/checkbox.js"),t("common/wx/pagebar.js")),o=t("common/wx/Tips.js"),n=t("common/wx/tooltips.js"),c=t("tpl/cardticket/select_shop.html.js"),l=t("cardticket/store_cgi.js");
return t("cardticket/common_template_helper.js"),e.prototype={
_currentPage:1,
init:function(){
var t=this,e=t.opt;
if(e.data)t.getDataComplete();else if(e.loading=!0,this.$dom.html(template.compile(c)(e)),
void 0===e.url)l.listStore({
keyword:e.keyword,
audit_state:e.audit_state,
is_validity:e.is_validity,
success:function(i){
e.data=i.shop_list,e.is_from_wxapoi=i.is_from_wxapoi,e.access_deny=i.access_deny,
e.loading=!1,t.getDataComplete();
}
});else{
var i=$.extend({},{
begin:0,
count:9999999,
keyword:e.keyword,
task_id:e.task_id,
audit_state:e.audit_state||3
},e.getDataExtra);
console.log(e.url),s.get({
url:e.url,
data:i
},function(i){
var a=i?1*i.base_resp.ret:-1;
if(0==a){
console.log("success");
var o=$.parseJSON(i.data),n=o.store_location;
e.data=n,e.is_from_wxapoi=i.is_from_wxapoi,e.loading=!1,t.getDataComplete();
}else-7==a||200007==a?(console.log("access deny"),e.data=[],e.access_deny=!0,e.loading=!1,
t.getDataComplete()):(console.log(i),s.show(i));
});
}
},
reinit:function(){
var t=this.opt;
t.data=null,this._currentPage=1,this.init();
},
select:function(){
if(!this.loading){
var t=this.opt,e=(this.$container,this.inputs.values());
return 0===e.length?void o.err("请选择门店！"):t.selectLimit&&e.length>+t.selectLimit?void o.err("超过选择的数量限制："+t.selectLimit):(t.selectComplete(e,1),
!0);
}
},
getDataComplete:function(){
function t(){
var t=s.values(),e=s.$dom;
e.find(".js_selected_count").text(t.length||0),s.no_store&&s.no_store.checked(!1);
}
function e(){
o.readonly&&s.readonlyInputs.checked(!0);
}
function i(){
var t=$.trim(v.val());
return o.keyword=t,s.reinit(),!1;
}
var s=this,o=s.opt;
if(!o.multi&&o.selectedValues&&o.selectedValues.length)for(var l=o.selectedValues[0],r=0;r<o.data.length;r++){
var p=o.data[r];
if(p.wx_poi_uid==l){
this._currentPage=parseInt((r+1)/o.pageCapacity)+((r+1)%o.pageCapacity>0?1:0);
break;
}
}
for(var h=o.data,d=o.pageCapacity,u=(this._currentPage-1)*d,_=this._currentPage*d,g=[],r=0;r<o.data.length;r++){
h[r].iscurrent=r>=u&&_>r?!0:!1;
for(var m=0;m<o.selectedValues.length;m++)if((h[r].wx_poi_uid==o.readonlyValues[m]||h[r].id==o.readonlyValues[m])&&g.push(r),
h[r].wx_poi_uid==o.selectedValues[m]||h[r].id==o.selectedValues[m]){
h[r].selected=!0;
break;
}
}
if(this.$dom.html(template.compile(c)({
multi:o.multi,
data:h,
nostore:o.nostore,
notpoint:o.notpoint,
total_count:o.data.length,
showSelectTips:o.showSelectTips,
is_from_wxapoi:o.is_from_wxapoi,
access_deny:o.access_deny
})),this.$list=this.$dom.find(".js_shop_body tr"),o.data.length>o.pageCapacity){
new a({
container:this.$dom.find(".js_pagebar"),
perPage:o.pageCapacity,
initShowPage:this._currentPage,
totalItemsNum:o.data.length,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var e=t.currentPage;
s._currentPage=e;
var i=o.pageCapacity,a=(e-1)*i,n=e*i,c=0;
s.$list.each(function(t){
t>=a&&n>t?($(this).show(),$(s.$inputs[t]).prop("checked")&&c++):$(this).hide();
}),o.pageChange(),o.pageChange.call(s);
}
});
}else this.$dom.find(".js_pagebar").html(""),o.pageChange();
this._init=!0,o.multi?(this.$inputs=this.$dom.find("tbody input[type=checkbox]"),
this.inputs=this.$inputs.checkbox({
onChanged:t
},o.max_select_num)):(this.$inputs=this.$dom.find("tbody input[type=radio]"),this.inputs=this.$inputs.checkbox({
onChanged:t
})),this.pageInputs=[];
var f=$("");
if(this.$inputs.each(function(e){
e>0&&e%o.pageCapacity==0&&(s.pageInputs.push(f.checkbox({
onChanged:t
})),f=$("")),f[f.length||0]=this,f.length++;
}),f.length&&this.pageInputs.push(f.checkbox({
onChanged:t
})),o.readonly){
for(var y=[],r=0;r<g.length;r++)y.push(this.$inputs[g[r]]);
this.$readonlyInputs=$(y).prop("readonly",!0),this.readonlyInputs=this.$readonlyInputs.checkbox(),
this.readonlyInputs.disabled(!0);
}
this.select_all=this.$dom.find(".js_select_all").checkbox({
onChanged:function(i){
{
var a=$(i).is("input[type=checkbox]"),o=$(i).prop("checked");
s._currentPage;
}
a&&s.inputs.checked(o),e(),t();
}
}),this.cache_data={};
for(var r=0;r<o.data.length;r++){
var k=o.data[r];
this.cache_data[k.id]=k,k.wx_poi_uid&&(this.cache_data[k.wx_poi_uid]=k);
}
o.nostore&&(this.no_store=$(".js_no_store",this.$dom).checkbox({
onChanged:function(t){
t.prop("checked")&&s.inputs.checked(!1);
}
}));
var v=this.$dom.find(".js_keyword"),w=this.$dom.find(".js_search");
w.click(i),v.keydown(function(t){
return wx.isHotkey(t,"enter")?(i(),!1):void 0;
}),v.val(o.keyword),t(),$(".js_all_shop",this.$dom).click(function(){
s.inputs.checked(!0),o.selectAll&&o.selectAll.call(s);
}),$(".js_help_tips",this.$dom).each(function(){
new n({
container:this,
content:template.render("js_select_shop_tips"),
type:"hover",
position:{
left:o.help_left||-106,
top:o.help_top||15
},
reposition:!0
});
$(".popover").css("z-index","10000");
}),window.wx_is_paycard&&$(".js_shopname_tips",this.$dom).each(function(){
new n({
container:this,
content:template.render("js_select_shop_shopnametips"),
type:"hover",
position:{
left:-138
},
reposition:!0
});
$(".popover").css("z-index","10000");
}).show(),"function"==typeof o.initComplete&&o.initComplete.call(this),this.opt.pageChange();
},
values:function(t){
var e=this,i=e.opt;
if(!e._init)return!1;
if(i.nostore){
var s=this.no_store.value();
if(s)return t&&(t.nostore=!0),[];
}
for(var a=this.inputs.values(),o=[],n=0;n<a.length;n++)this.cache_data[a[n]]&&(o.push(this.cache_data[a[n]]),
t&&this.cache_data[a[n]].card_pay_money&&(t.card_pay_money=!0));
return o;
}
},e;
});