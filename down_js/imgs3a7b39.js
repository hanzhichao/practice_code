define("shop/imgs.js",["biz_web/ui/dropdown.js","common/wx/dropdowns.js","common/wx/editit.js","common/wx/dialog.js","common/wx/tooltips.js","common/wx/pagebar.js","tpl/shop/grouplist.html.js","tpl/shop/igoodlist.html.js","tpl/shop/goodlist.html.js","tpl/shop/minilist.html.js","shop/group_cgi.js","biz_web/ui/checkbox.js","common/wx/popup.js","common/qq/jquery.plugin/zclip.js"],function(t){
"use strict";
var o=wx.T,e=(template.render,t("biz_web/ui/dropdown.js")),n=t("common/wx/dropdowns.js"),i=t("common/wx/editit.js"),s=t("common/wx/dialog.js"),a=t("common/wx/tooltips.js"),c=t("common/wx/pagebar.js"),r=t("tpl/shop/grouplist.html.js"),l=t("tpl/shop/igoodlist.html.js"),d=t("tpl/shop/goodlist.html.js"),p=t("tpl/shop/minilist.html.js"),u=t("shop/group_cgi.js"),g=(t("biz_web/ui/checkbox.js"),
t("common/wx/popup.js"),wx.cgiData||{}),m={
groupId:-1,
groupsList:{},
itemList:{},
goods_count:-1
},f=$.extend({},m,g),h={},_=[];
t("common/qq/jquery.plugin/zclip.js"),function(){
for(var t=0,g=f.groupsList.length;g>t;t++)h[f.groupsList[t].id]=f.groupsList[t].name,
_.push({
name:f.groupsList[t].name,
value:f.groupsList[t].id
});
for(var t=0,g=f.itemList.length;g>t;t++){
var m=f.itemList[t].groups.join(","),j=f.itemList[t].groups_id.join(",");
m=m.length>10?m.substring(0,9)+"...":m,f.itemList[t].groupsname=m,f.itemList[t].groupids=j,
f.itemList[t].icon_url=f.itemList[t].base_attr.img_info[0],f.itemList[t].price=(f.itemList[t].base_attr.ori_price/100).toFixed(2);
}
var b={
ok:"确定",
cancel:"取消",
click:"click",
btn_p:"btn_primary",
btn_d:"btn_default",
btn_no:"btn_disabled",
g_new:"#groupNew"
};
f.groupName=h[f.groupId]||"全部商品",$("#js_groupname").text(f.groupName),$("#groupsList").html(o(r,{
all:{
num:+f.goods_count,
link:wx.url("/merchant/goodsgroup?t=shop/category&type=1&count=5&offset=0")
},
list:f.groupsList,
groupid:f.groupId
})),$("#js_goods").append(o(d,{
list:f.itemList
}));
var v=f.count>0?f.count:5,w=f.itemList.length,k=f.offset;
if(w>v){
var x=k>0?Math.floor(k/v)+1:1;
new c({
container:"#goodpages",
perPage:v,
initShowPage:x,
totalItemsNum:w,
first:!1,
last:!1,
startRange:4,
midRange:0,
endRange:1,
isSimple:!1,
callback:function(t){
var o=""+t.perPage*(t.currentPage-1),e=location.href;
return location.href=/([\?&])offset=\d*/.test(e)?e.replace(/([\?&])offset=\d*/,"$1offset="+o):e+"&offset=%s&count=%s".sprintf(o,t.perPage),
!1;
}
});
}
if(f.groupId>0){
new i({
container:"#js_groupname",
itemid:f.groupId,
limit:9,
normalClass:"show_value",
editClass:"group_name",
callback:function(t,o){
u.edit(t,o,function(){
location.reload();
});
}
}),$("#js_gdel").removeClass(b.btn_no).addClass(b.btn_d),new a({
container:"#js_gdel",
content:"您确定要删除 %s 分组吗？".sprintf(f.groupName),
type:b.click,
buttons:[{
text:b.ok,
type:b.btn_p,
click:function(){
u.del(f.groupId,function(){
location.href=wx.url("/merchant/goodsgroup?t=shop/category&type=1&count=5&offset=0");
});
}
},{
text:b.cancel,
type:b.btn_d,
click:function(){
this.hide();
}
}]
});
var y={
refresh:function(t,e){
var n=5,t=+t>0?t:1,i=(t-1)*n,s=$(".dialog_wrp .js_count");
e&&s.data("gdlist","").html("0"),u.nget(f.groupId,i,n,function(e){
for(var i=e.goods.length,a=e.total||i,r=0;i>r;r++)e.goods[r].icon_url=e.goods[r].base_attr.img_info[0];
$(".dialog_wrp .tbody").html(o(l,e));
$(".dialog_wrp .js_igood").checkbox({
onChanged:function(t){
var o=$(".dialog_wrp .js_count"),e=o.data("gdlist")||"",n=+(o.html()||"0"),i=t.val(),s=e?e.split(","):[];
t.prop("checked")?(s.push(i),n++):(s.indexOf(i)>=0&&s.splice(s.indexOf(i),1),n=n>1?n-1:0),
o.data("gdlist",s.join(",")).html(n);
}
}).adjust(s.data("gdlist"));
a>n&&new c({
container:".dialog_wrp .js_pageNavigator",
perPage:n,
initShowPage:t,
totalItemsNum:a,
first:!1,
last:!1,
startRange:4,
midRange:0,
endRange:1,
isSimple:!1,
callback:function(t){
y.refresh(t.currentPage,!1);
}
});
});
},
Add:function(){
$(o(p,{})).popup({
title:"选择商品加入该分类",
className:"addto_dialog",
close:function(){
location.reload();
},
onShow:function(){
y.refresh(1,!1);
},
buttons:[{
text:"添加",
click:function(){
var t=this.$dialogWrp.find(".js_count").data("gdlist"),o=f.groupId;
u.nadd(o,t,function(){
y.refresh(1,!0);
});
},
type:"primary"
},{
text:"关闭",
click:function(){
location.reload();
},
type:"default"
}]
});
}
};
$("#js_nadd").removeClass(b.btn_no).addClass(b.btn_p).on(b.click,y.Add);
}
$("#js_groupAdd").click(function(){
if($(b.g_new).length)return void $(b.g_new).focus();
var t=$('<div class="inner_menu_item editing"></div>');
t.html('<span class="frm_input_box append"><input type="text" class="frm_input" id="groupNew"><a href="javascript:void(0);" class="frm_input_append icon16_common enter_gray js_enter">确定</a></span>').insertBefore($("#js_groupAdd"));
var o=t.find(".js_enter");
o.click(function(){
var o=$(b.g_new),e=$.trim(o.val());
return""==e?void t.remove():void(e.bytes()>10?s.show({
type:"err",
mask:!1,
msg:"名字过长|分组名字为1~5字符",
buttons:[{
text:b.ok,
click:function(){
o.focus(),this.remove();
}
}]
}):u.add(e,function(){
location.reload();
}));
}),$(b.g_new).focus().keypress(function(t){
return 13==t.keyCode?(o.click(),!1):void 0;
});
}),new a({
container:".js_tips1"
}),new a({
container:".js_tips2"
});
new e({
container:"#js_ddorder",
label:"最新上架排最前",
data:[{
name:"最新上架排最前",
value:1
},{
name:"按销售热度排序",
value:2
},{
name:"按价格从低到高",
value:3
},{
name:"按价格从高到低",
value:4
}],
callback:function(){}
});
var L=new n({
container:"#js_ddadd",
label:"添加到",
disabled:!0,
data:_,
buttons:[{
text:b.ok,
type:b.btn_p,
click:function(){
var t=C.values().join(","),o=this.checkboxes.values().join(",");
u.nadd(o,t,function(){
location.reload();
});
}
},{
text:b.cancel,
type:"normal",
type:b.btn_d,
click:function(){
this.hide();
}
}],
callback:function(){}
});
$("#js_goods .goods_group").each(function(){
var t=$(this),o="#dds-"+t.data("id"),e=t.data("gps"),i=t.data("ids");
new n({
container:o,
label:e,
hasClass:"has_goods_group",
data:_,
values:i,
buttons:[{
text:b.ok,
type:b.btn_p,
click:function(){
var t=this.container.data("id"),o=this.checkboxes.values().join(",");
u.nedit(o,t,function(){
location.reload();
});
}
},{
text:b.cancel,
type:b.btn_d,
click:function(){
this.hide();
}
}],
callback:function(){}
});
}),$("#js_copy").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/ZeroClipboard.swf",
copy:function(){
return"http://devjr.test.com";
},
afterCopy:function(){
alert("复制链接成功");
}
});
var I=new a({
container:"#js_ndel",
type:b.click,
disabled:!0,
buttons:[{
text:b.ok,
type:b.btn_p,
click:function(){
u.ndel(f.groupId,C.values().join(","),function(){
location.reload();
});
}
},{
text:b.cancel,
type:b.btn_d,
click:function(){
this.hide();
}
}],
onshow:function(){
var t="您确定要将这%s款商品移出 %s 分组吗？".sprintf(C.values().length,f.groupName);
this.$dom.find(".popover_content").html(t),this.show();
}
}),C=$("#js_goods .js_good").checkbox();
$("#selectAll").click(function(){
var t=$(this).prop("checked");
$(".js_good").each(function(){
$(this).prop("disabled")||$(this).checkbox().checked(t);
});
}).checkbox(),$("#selectAll, #js_goods .js_good").on(b.click,function(){
var t=C.values();
t.length?(L.enable(),f.groupId>0&&I.enable()):(L.disable(),f.groupId>0&&I.disable());
});
}();
});