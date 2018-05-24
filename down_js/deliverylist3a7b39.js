define("shop/deliverylist.js",["biz_common/moment.js","common/wx/tooltips.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/tooltipsManager.js","common/wx/top.js","shop/feedback.js","shop/delivery_common.js"],function(t){
"use strict";
var e,o=wx.cgiData.data,i=(t("biz_common/moment.js"),t("common/wx/tooltips.js")),n=t("common/wx/Tips.js"),s=t("common/wx/Cgi.js"),a=t("common/wx/tooltipsManager.js"),c=t("common/wx/top.js"),r=t("shop/feedback.js");
t("shop/delivery_common.js");
var l=$("#notification").html(template.render("template_area_tpl",o));
l.on("click",".notify_item dt",function(){
var t=$(this).closest("dl"),o=t.find("dd");
e&&e.get(0)!==t.get(0)&&(e.find("dd").hide(),e.removeClass("open")),o.toggle(),t.toggleClass("open").nextAll().css("zoom",0).css("zoom",1),
e=t;
}),new c("#topTab",c.DATA.shop).selected(5),r(),$(".js_delete").on("click",function(t){
var e=$(this).attr("data-id");
if(!e)return void n.err("模板ID为空");
var o=new i({
container:this,
content:"确定要删除该模板吗？",
type:"click",
position:{
left:-121
},
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
s.post({
mask:!1,
url:wx.url("/merchant/delivery?action=del"),
data:{
tid:e
}
},function(t){
if("0"==t.ret)n.suc("删除模板成功"),location.reload();else switch(t.ret){
case"xxx":
break;

default:
t.base_resp||(t.base_resp={
ret:t.ret
}),s.show(t),s.handleRet(t,{
id:64462,
key:95,
url:"/merchant/delivery?action=del"
});
}
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
a.removeAll();
}
}]
});
o.show(),a.removeAll(),a.add(o),t.stopPropagation();
}),new i({
container:"#js_qadelivery",
content:"运费模板就是为一批商品设置同一个运费。当您需要修改运费的时候，这些关联商品的运费将一起被修改。",
type:"hover",
position:{
left:-32
}
}),$(".js_edit").on("click",function(){
var t=$(this).attr("data-id");
return location.href=wx.url("/merchant/delivery?tid=%s&action=editframe&t=shop/delivery_edit".sprintf(t)),
!1;
}),$(".js_setdefault").on("click",function(t){
var e=$(this).attr("data-id"),o=$(this).attr("data-name");
if(!e)return void n.err("模板ID为空");
var c=new i({
container:this,
content:"确定要将模板%s设为默认模板吗？".sprintf((o||"").html()),
type:"click",
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
s.post({
mask:!1,
url:wx.url("/merchant/delivery?action=setdefault"),
data:{
tid:e
}
},function(t){
if("0"==t.ret)n.suc("设置默认模板成功"),location.reload();else switch(t.ret){
case 111:
break;

default:
cgi.show(t);
}
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
a.removeAll();
}
}]
});
c.show(),a.removeAll(),a.add(c),t.stopPropagation();
});
});