define("scan/item_action_cell.js",["common/wx/Tips.js","common/wx/inputCounter.js","common/wx/popover.js","biz_common/jquery.validate.js","cardticket/send_card.js","biz_common/jquery.ui/jquery.ui.sortable.js"],function(e,t,n){
"use strict";
function i(){
var e=[];
j.find(".js_item").each(function(){
if(1==$(this).find(".js_chexkbox_action_cell").is(":checked")){
var t={
type:1*$(this).find(".js_chexkbox_action_cell").val(),
name:$(this).find(".js_txt_title").text(),
desc:"",
showtype:0,
extinfo:{}
},n=$(this).data("cellData");
n&&(t=$.extend(!0,t,n)),1==t.type&&(t.extinfo.link=$(this).find('input[name="cell_url"]').val()),
2==t.type&&(t.extinfo.appid=$(this).find('input[name="appid"]').val()),8==t.type&&(t.extinfo.cardid=$(this).find('input[name="coupon_name"]').val()),
e.push(t);
}
}),C=e,k.setActionList("cell",e);
}
function a(e,t){
t.type=e;
var n=$(u("tpl_action_cell_"+e,t)),a=n.find(".js_chexkbox_action_cell"),o=$.extend(!0,o,t);
o.showed=void 0,o.selected=void 0,n.data("cellData",o),a.checkbox({
multi:!0,
onChanged:function(e){
if(j.find(".js_chexkbox_action_cell:checked").length>y)return p.err("服务栏最多配置%s项".sprintf(y)),
void e.checkbox("checked",!1);
var t=e.parents(".js_item");
e.is(":checked")?(t.addClass("open"),t.find(".js_btn_edit").show()):(t.removeClass("open"),
t.find(".js_btn_edit").hide()),i();
}
}),j.append(n),s(),1==t.selected?a.click():n.find(".js_btn_edit").hide();
}
function s(){
j.find(".js_item").removeClass("no_ext"),j.find(".js_item:last").addClass("no_ext");
}
function o(){
v=$("#js_form_action_cell"),j=$("#js_div_action_cell_list"),x=v.find(".js_btn_sort"),
b=v.find(".js_btn_sort_ok"),g=v.find(".js_btn_sort_cancel"),C=k.getActionList("cell"),
y=2==k.getEditMode()?2:3,template.helper("dateToString",function(e){
var t=new Date(e),n="%s年%s月%s日".sprintf(t.getFullYear(),t.getMonth()+1,t.getDate());
return n;
});
}
function c(){
var e=[],t=0;
if(C)for(var n=0;n<C.length;n++){
var i=C[n];
(8!=i.type||0!=wx.cgiData.can_use_card)&&(i.selected=!1,y>t&&(t++,i.selected=!0),
e.push(i),D[i.type].showed=!0);
}
for(var s in D)(8!=s||0!=wx.cgiData.can_use_card)&&(D[s].showed||e.push({
type:s,
name:D[s].name,
selected:!1
}));
for(var n=0;n<e.length;n++)a(e[n].type,e[n]);
}
function l(){
var e;
v.on("keyup","input",function(){
i();
}),v.on("blur",'input[name="cell_url"]',function(){
var e=$.trim($(this).val());
""!=e&&-1==e.indexOf("http")&&(e="http://"+e,$(this).val(e),i());
}),j.sortable({
items:".js_item",
placeholder:"drag_placeholder",
dropOnEmpty:!0,
start:function(e,t){
t.item.addClass("dragging");
},
stop:function(e,t){
t.item.removeClass("dragging");
}
}),j.sortable("disable"),x.on("click",function(t){
t.preventDefault(),x.hide(),b.show(),g.show(),e=j.find(".js_item").clone(!0),j.find(".js_item").addClass("sortable"),
j.sortable("enable");
}),b.on("click",function(t){
t.preventDefault(),x.show(),b.hide(),g.hide(),j.find(".js_item").removeClass("sortable"),
j.sortable("disable"),e=null,s(),i();
}),g.on("click",function(t){
t.preventDefault(),x.show(),b.hide(),g.hide(),j.sortable("disable"),j.html(e),e=null,
i();
}),j.on("click",".js_btn_open",function(e){
e.preventDefault();
var t=$(this).parents(".js_item");
t.hasClass("open")?t.removeClass("open"):t.addClass("open");
}),j.on("click",".js_btn_add_cell",function(e){
e.preventDefault();
var t=$(this).data("type");
if(j.find('.js_chexkbox_action_cell[value="'+t+'"]').length>=3)return p.err("服务栏最多3项同类项目"),
!1;
var n={
type:t,
selected:!1,
canDelete:!0
};
j.find(".js_chexkbox_action_cell:checked").length<y&&(n.selected=!0),a(n.type,n);
}),j.on("click",".js_btn_delete_cell",function(e){
e.preventDefault();
$(this).data("type");
$(this).parents(".js_item").remove(),i();
}),j.on("click",".js_btn_edit",function(e){
e.preventDefault();
var t,n,a,s=$(this).parents(".js_item"),o=s.data("type"),c=s.data("cellData"),l=new m({
dom:$(this),
addCls:"popover-cell-edit",
content:u("tpl_action_cell_edit",{
item:c
}),
buttons:[{
text:"确定",
type:"primary",
click:function(){
return t.valid()?(c.name=n.val(),c.desc=a.val(),s.data("cellData",c),s.find(".js_txt_title").text(c.name),
i(),void this.remove()):!1;
}
},{
text:"取消",
type:"default",
click:function(){
this.remove();
}
}]
});
return t=l.$pop.find("form"),n=t.find(".js_input_name"),a=t.find(".js_input_desc"),
new f(n,{
maxLength:12
}),new f(a,{
maxLength:5
}),1!=o&&(n.prop("disabled","disabled"),n.parent().addClass("disabled")),t.validate({
ignore:".js_input_ignore",
rules:{
name:{
required:!0,
maxlength:12
},
desc:{
maxlength:5
}
},
messages:{
name:{
required:"请填入口名称",
maxlength:"入口名称过长"
},
desc:{
maxlength:"引导语过长"
}
},
errorPlacement:function(e,t){
var n=t.parent().parent();
n.find(".js_frm_msg").length>0?n.find(".js_frm_msg").html(e.html()).show():n.append(e);
}
}),!1;
}),j.on("click",".js_btn_focus",function(e){
e.preventDefault(),$(this).parent().find("input.js_txt_title").focus();
}),v.on("click",".js_btn_import_coupon",function(e){
e.preventDefault();
var t=new h({
multi:!1,
selectComplete:function(e){
return e?(v.find("input[name='coupon_name']").val(e.id),$("#js_div_action_cell_coupon").html(u("tpl_action_cell_coupon",{
data:e
})),void i()):void p.err("请选择卡券");
},
source:"直接群发卡券"
});
t.show();
});
var t=function(e){
return $(e).parents(".js_item").hasClass("open")?!0:!1;
};
v.validate({
ignore:".js_input_ignore",
rules:{
cell_name:{
required:t
},
cell_url:{
required:t,
url:!0
},
coupon_name:{
required:t
}
},
messages:{
cell_name:{
required:"请填自定义网页名称"
},
cell_url:{
required:"请填写网址",
url:"请填写正确的网址"
},
coupon_name:{
required:"请选择卡券"
}
},
errorPlacement:function(e,t){
var n=t.parent().parent();
n.find(".js_frm_msg").length>0?n.find(".js_frm_msg").html(e.html()).show():(p.err(e.text()),
setTimeout(function(){
t.focus();
},10));
}
});
}
function r(){
{
var e=k.getEditMode();
C.length;
}
2==e?(y=2,$(j.find(".js_item").get().reverse()).each(function(){
var e=$(this).data("type"),t=$(this).find(".js_chexkbox_action_cell");
1==e||2==e?$(this).show():(t.is(":checked")&&t.click(),$(this).hide()),t.is(":checked")&&j.find(".js_chexkbox_action_cell:checked").length>y&&t.click();
})):(y=3,j.find(".js_item").each(function(){
$(this).data("type"),$(this).find(".js_chexkbox_action_cell");
$(this).show();
}));
}
function d(e){
var t=!0;
return"function"==typeof e&&e.call(void 0,t),t;
}
function _(e){
return e&&e.model&&(k=e.model),w?!1:(w=!0,o(),c(),void l());
}
var u=template.render,p=e("common/wx/Tips.js"),f=e("common/wx/inputCounter.js"),m=e("common/wx/popover.js"),h=(e("biz_common/jquery.validate.js"),
e("cardticket/send_card.js"));
e("biz_common/jquery.ui/jquery.ui.sortable.js");
var v,j,x,b,g,k=null,w=!1,y=3,C=[],D={
2:{
name:"查看公众号",
showed:!1
},
8:{
name:"领取卡券",
showed:!1
},
1:{
name:"自定义网页",
showed:!1
}
};
n.exports={
init:_,
check:d,
triggerEditMode:r
};
});