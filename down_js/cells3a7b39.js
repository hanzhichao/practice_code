define("wifi/homemanager_modify/cells.js",["biz_common/jquery.ui/jquery.ui.sortable.js","wifi/homemanager_modify/utils.js","biz_web/ui/checkbox.js","common/wx/inputCounter.js","common/wx/popover.js","cardticket/send_card.js"],function(t,e,i){
"use strict";
t("biz_common/jquery.ui/jquery.ui.sortable.js");
var s=t("wifi/homemanager_modify/utils.js"),n=(t("biz_web/ui/checkbox.js"),t("common/wx/inputCounter.js")),r=t("common/wx/popover.js"),l=t("cardticket/send_card.js"),_=wx.cgiData,o={},a={
cells:$(".js_edit_cells"),
items:$(".js_edit_cells .js_item"),
item:{
1:$('.js_edit_cells .js_item[data-type="1"]'),
2:$('.js_edit_cells .js_item[data-type="2"]'),
3:$('.js_edit_cells .js_item[data-type="3"]')
},
sortBtn:$(".js_sort_btn"),
sortOKBtn:$(".js_sort_ok_btn"),
sortCancelBtn:$(".js_sort_cancel_btn"),
viewCells:$(".js_view_cells"),
viewItems:$(".js_view_cells .js_view_item"),
viewItem:{
1:$('.js_view_cells .js_view_item[data-type="1"]'),
2:$('.js_view_cells .js_view_item[data-type="2"]'),
3:$('.js_view_cells .js_view_item[data-type="3"]')
}
};
o._initData=function(){
template.helper("dateToString",function(t){
var e=new Date(t),i="%s年%s月%s日".sprintf(e.getFullYear(),e.getMonth()+1,e.getDate());
return i;
});
},o._fixLastItemClass=function(){
a.items.removeClass("no_ext").eq(-1).addClass("no_ext");
},o._setOrder=function(t){
var e=a.cells.children().clone(!0);
a.cells.empty(),$.each(t,function(t,i){
e.filter('div[data-type="%s"]'.sprintf(i)).appendTo(a.cells);
}),o._fixLastItemClass();
},o._startSort=function(){
var t=this;
this.__oldOrder=[],a.cells.children().each(function(e,i){
t.__oldOrder.push($(i).data("type"));
}),a.cells.find(".js_item").addClass("sortable"),a.cells.sortable({
items:".js_item",
axis:"y",
cursor:"move",
handle:".js_item_sort_btn",
opacity:.6,
revert:100,
tolerance:"pointer",
update:function(){
o._fixLastItemClass(),t._renderView();
}
}).sortable("enable");
},o._endSort=function(t){
!t&&this.__oldOrder&&this._setOrder(this.__oldOrder),a.cells.find(".js_item").removeClass("sortable"),
a.cells.sortable("disable"),this._renderView();
},o._renderView=function(){
var t=a.cells.children(),e=a.viewItems.clone(!0);
a.viewCells.empty(),$.each(t,function(t,i){
i=$(i);
var s=i.data("type"),n=e.filter('.js_view_item[data-type="%s"]'.sprintf(s)).appendTo(a.viewCells);
i.find(".js_item_checkbox").is(":checked")?n.show():n.hide(),3==s&&n.find("a").text(i.find(".js_item_custom_title").text());
});
},o._renderEdit=function(){
var t=3,e=[];
$.each(_.cells,function(t,i){
e.push(i.type),a.item[i.type].find(".js_item_checkbox").attr("checked",!0),2==i.type?$(".js_item_card_wrap").html(template.render("tpl_edit_card",{
data:i.data
})):3==i.type&&(a.item[i.type].find(".js_item_custom_title").text(s.htmlDecode(i.data.title)),
a.item[i.type].find(".js_edit_custom_url_input").val(s.htmlDecode(i.data.url)));
});
for(var i=1;t>=i;i++)-1===e.indexOf(i)&&e.push(i);
this._setOrder(e),a.cells.show(),this._fixLastItemClass();
},o._bindCardEvent=function(){
$(".js_item_card_btn").click(function(t){
t.preventDefault();
var e=new l({
multi:!1,
selectComplete:function(t){
$(".js_item_card_wrap").html(template.render("tpl_edit_card",{
data:t
}));
},
source:"直接群发卡券"
});
e.show();
});
},o._bindCustomEvent=function(){
var t=this;
a.cells.find('.js_item[data-type="3"] .js_edit_custom_btn').click(function(){
{
var e,i=a.cells.find(".js_item_custom_title").text(),s=10;
new r({
dom:a.cells.find(".js_edit_custom_btn"),
content:$("#tpl_edit").html(),
hideIfBlur:!0,
onShow:function(){
var t=this;
e=new n(t.$pop.find(".js_title"),{
maxLength:s,
showCounter:!0,
useGBKLength:!0,
GBKBased:!0
}),t.$pop.find(".js_title").focus().val(i).on("input blur keyup",function(){
t.$pop.find(".js_tips").hide();
}).trigger("keyup");
},
buttons:[{
text:"确定",
click:function(){
if(e.count>s)return void this.$pop.find(".js_tips").text("名称最长不能超过%s个字".sprintf(s)).show();
var i=this.$pop.find(".js_title").val();
a.cells.find(".js_item_custom_title").text(i),this.remove(),t._renderView();
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
}).show();
}
}),a.cells.find('.js_item[data-type="3"] .js_edit_custom_url_input').on("blur",function(){
var t=$(this).val(),e=a.cells.find('.js_item[data-type="3"] .js_frm_msg');
s.isValidUrl(t)?e.hide():e.text("请输入正确的url").show();
});
},o._bindEvent=function(){
var t=this;
!function(){
var e=a.cells.find(".js_item_checkbox");
e.checkbox(),e.on("change",function(){
t._renderView();
});
}(),a.sortBtn.click(function(){
a.sortBtn.hide(),a.sortOKBtn.show(),a.sortCancelBtn.show(),t._startSort();
}),a.sortOKBtn.click(function(){
a.sortOKBtn.hide(),a.sortCancelBtn.hide(),a.sortBtn.show(),t._endSort(!0);
}),a.sortCancelBtn.click(function(){
a.sortOKBtn.hide(),a.sortCancelBtn.hide(),a.sortBtn.show(),t._endSort(!1);
}),a.cells.find(".js_item_open_btn").click(function(){
$(this).parent().parent().toggleClass("open");
}),this._bindCardEvent(),this._bindCustomEvent();
},o.getData=function(){
for(var t={
service_items:[]
},e=a.cells.find(".js_item"),i=0;i<e.length;i++){
var n=$(e[i]),r={};
if(n.find(".js_item_checkbox").is(":checked")){
if(r.type=parseInt(n.data("type")),2==r.type){
var l=$(".js_edit_card").data("id");
if(!l)return s.makeData("请选择一张优惠券");
r.card={
card_tp_id:l
};
}
if(3==r.type){
var _=a.cells.find(".js_edit_custom_url_input").val();
if(!s.isValidUrl(_))return s.makeData("请输入正确的url");
r.custom_url={
title:a.cells.find(".js_item_custom_title").text(),
url:_
};
}
t.service_items.push(r);
}
}
return s.makeData(t);
},o.init=function(){
this._initData(),this._renderEdit(),this._renderView(),this._bindEvent();
},i.exports=o;
});