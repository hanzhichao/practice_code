define("cardticket/tmpl_management.js",["common/wx/Tips.js","common/wx/dialog.js","common/wx/Cgi.js","biz_web/ui/checkbox.js","common/wx/wxt.js","biz_web/utils/upload.js","shop/config.js","cardticket/send_card.js","cardticket/common_template_helper.js"],function(o){
"use strict";
function t(o){
var t=[{
name:"全部优惠券",
group_id:9999,
card_cate:0,
id:"0-9999"
},{
name:"折扣券",
group_id:2,
card_cate:0,
id:"0-2"
},{
name:"代金券",
group_id:4,
card_cate:0,
id:"0-4"
},{
name:"兑换券",
group_id:3,
card_cate:0,
id:"0-3"
},{
name:"团购券",
group_id:1,
card_cate:0,
id:"0-1"
},{
name:"通用优惠券",
group_id:0,
card_cate:0,
id:"0-0"
}];
window.wx_is_send_payment_card&&(t=t.concat([{
name:"全部付费券",
group_id:9999,
card_cate:1,
id:"1-9999"
},{
name:"付费优惠券",
group_id:0,
card_cate:1,
id:"1-0"
},{
name:"付费团购券",
group_id:1,
card_cate:1,
id:"1-1"
}])),"function"==typeof o&&o(t);
}
function r(o,t,r){
var e=$("#tmpl"+o).html(),n={};
n[t]=p["tmpl"+o],n.base={
biz:""
},e=e.replace(/<name>/gi,t),$("#js_tmplWrapper").append(i.compile(e)(n).replace(/(\<a[^>]+href=)('[^']*'|"[^"]*")/g,"$1'javascript:;'")),
r[t]=e;
var a=g["getInitData_"+o]();
$(".js_shopModuleWrapper[name="+t+"]").data(_,a);
}
var e=(wx.T,o("common/wx/Tips.js")),n=o("common/wx/dialog.js"),i=(o("common/wx/Cgi.js"),
o("biz_web/ui/checkbox.js"),o("common/wx/wxt.js")),a=o("biz_web/utils/upload.js"),p=o("shop/config.js").defaultData,c=o("cardticket/send_card.js"),s=o("cardticket/common_template_helper.js"),u=template.render,d=wx.cgiData,_="store";
i.helper("count",function(o){
return o.length;
});
var g={
init_tmpl:function(o,t,e){
r(o,t,e);
},
new_tmpl:function(o,t){
var e=$("#js_editForm"),n=$("#js_editFormContent");
n.html(u("new_tmpl"));
var i=n.find(".js_radio"),a=i.checkbox({
multi:!1
});
i.eq(0).checkbox("checked",!0),n.find(".js_confirm").on("click",function(){
var n=a.values()[0];
r(n,o,t),e.hide(),e.data("connect_dom",null);
}),n.find(".js_cancel").on("click",function(){
e.hide(),e.data("connect_dom",null);
});
},
tmpl_property:function(o){
var t=($("#js_editForm"),$("#js_editFormContent"));
t.html(u("tmpl_property_edit"));
var r=t.find("#default_shelf").eq(0);
r.checkbox(),d.default_shelf_id==d.shelf_id&&r.checkbox("checked",!0),r.checkbox({
onChanged:function(o){
d.default_shelf_id!=d.shelf_id&&0!=o.is(":checked")&&n.show({
type:"info",
msg:"确认设置当前货架为默认货架吗？|当前货架将替换原默认货架",
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
r.checkbox("checked",!1),this.remove();
}
}]
});
}
}),t.find(".js_title").on("blur, keyup",function(){
var t=$(this),r=$.trim(t.val()),e=o.data(_)||{};
o.find(".js_title").text(""!=r?r:"货架名称"),e.name=r,o.data(_,e);
});
var e=o.data(_)||{};
t.find(".js_title").val(e.name||"");
},
tmpl_banner:function(o){
var t=($("#js_editForm"),$("#js_editFormContent"));
t.html(u("tmpl_logo_edit")),setTimeout(function(){
a.uploadShopUnsaveFile({
container:"#js_uploadLogo",
multi:!1,
onComplete:function(t,r,e,n){
var i=n.data;
$("#js_banner").attr("src",i),o.data(_,{
banner:i
});
}
});
},500);
},
getInitData_11:function(){
for(var o={
group_infos:{
groups:[],
group_all:!1
}
},t=0;4>t;t++)o.group_infos.groups[t]={
group_id:p.tmpl11.groups[t].group_id,
group_name:p.tmpl11.groups[t].group_name
};
return o;
},
getInitData_12:function(){
var o={
group_info:{
img:p.tmpl12.img,
card_id:p.tmpl12.card_id
}
};
return o;
},
getInitData_13:function(){
for(var o={
group_infos:{
groups:[]
}
},t=0;3>t;t++)o.group_infos.groups[t]={
img:p.tmpl13.groups[t].img,
card_id:p.tmpl13.groups[t].card_id
};
return o;
},
tmpl_11:function(o,r,n){
function a(t){
var a,u;
c.append(template.render("tmpl11_edit",{
groups:t
}));
var d=function(){
var t=u.values().length>0,d=a.values(),m=d.length,l=$(this);
if(m>4)return setTimeout(function(){
l.click();
},0),void e.err("最多只能选择4个分组");
m=m%2==1?m-1:m;
var f=[],h={},j=n[r],v=s();
v.group_infos.groups=[];
for(var k=0;m>k;k++)f.push({
group_id:d[k],
group_name:c.find("label[for=check"+d[k]+"]").find(".js_groupName").text().trim()
}),v.group_infos.groups[k]={
group_id:d[k],
group_name:c.find("label[for=check"+d[k]+"]").find(".js_groupName").text().trim()
};
v.group_infos.group_all=t,h[r]=m>0||t?{
groups:f,
group_all:t
}:p.tmpl2,h.base={
biz:""
},o.html($(i.compile(j)(h).replace(/\n|\r/g,"").trim()).html()),o.find("a").attr("href","javascript:;"),
m>0||t?o.data(_,v):o.data(_,g.getInitData_11());
};
a=c.find(".js_select").on("click",d).checkbox(),u=c.find(".js_selectall").on("click",d).checkbox();
for(var m=s(),l=0;l<m.group_infos.groups.length;l++)c.find(".js_select[value="+m.group_infos.groups[l].group_id+"]").prop("checked",!0).parent().addClass("selected");
m.group_infos.group_all&&c.find(".js_selectall").prop("checked",!0).parent().addClass("selected");
}
var c=($("#js_editForm"),$("#js_editFormContent"));
c.html("");
var s=function(){
var t=o.data(_)||{};
return t.group_infos=t.group_infos||{},t.group_infos.groups=t.group_infos.groups||[],
t;
};
t(a);
},
tmpl_12:function(o){
var t=($("#js_editForm"),$("#js_editFormContent"));
t.html("");
var r=function(){
var t=o.data(_)||{};
return t.group_info=t.group_info||{},t;
},e=r();
e=e||{},e.nocard=!e.group_info.card_name,t.append(template.render("tmpl12_edit",e)),
t.find("#js_selectCard").on("click",function(){
new c({
selectComplete:function(e){
if(e&&e.cardid){
var n=r();
n.group_info.card_id=e.cardid,n.group_info.card_name=e.title,n.group_info.card_type=s.type_map[e.type]||"未知",
t.find(".js_cardtype_12").text(n.group_info.card_type),t.find(".js_cardname_12").text(n.group_info.card_name).closest("tr").siblings(".empty_item").hide(),
o.data(_,n);
}
},
param:{
need_member_card:1
}
}).show();
}),setTimeout(function(){
a.uploadShopUnsaveFile({
container:"#js_uploadImg",
multi:!1,
onComplete:function(t,e,n,i){
var a=i.data;
if(a){
o.find(".js_img").attr("src",a);
var p=r();
p.group_info.img=a,o.data(_,p);
}
}
});
},500);
},
tmpl_13:function(o){
var t=($("#js_editForm"),$("#js_editFormContent"));
t.html("");
var r=function(){
var t=o.data(_)||{};
return t.group_infos=t.group_infos||{},t.group_infos.groups=t.group_infos.groups||[],
t.group_infos.groups[0]=t.group_infos.groups[0]||{},t.group_infos.groups[0].nocard=!t.group_infos.groups[0].card_name,
t.group_infos.groups[1]=t.group_infos.groups[1]||{},t.group_infos.groups[1].nocard=!t.group_infos.groups[1].card_name,
t.group_infos.groups[2]=t.group_infos.groups[2]||{},t.group_infos.groups[2].nocard=!t.group_infos.groups[2].card_name,
t;
},e=r();
t.append(template.render("tmpl13_edit",e)),t.find(".js_selectCard").each(function(e){
$(this).on("click",function(){
new c({
selectComplete:function(n){
if(n&&n.cardid){
var i=r();
i.group_infos.groups[e].card_id=n.cardid,i.group_infos.groups[e].card_name=n.title,
i.group_infos.groups[e].card_type=s.type_map[n.type]||"未知",t.find(".js_cardtype_13_"+e).text(i.group_infos.groups[e].card_type),
t.find(".js_cardname_13_"+e).text(i.group_infos.groups[e].card_name).closest("tr").siblings(".empty_item").hide(),
o.data(_,i);
}
},
param:{
need_member_card:1
}
}).show();
});
}),t.find(".js_uploadImg").each(function(t){
var e=$(this).attr("id");
setTimeout(function(){
a.uploadShopUnsaveFile({
container:"#"+e,
multi:!1,
onComplete:function(e,n,i,a){
var p=a.data;
if(p){
o.find(".js_img").eq(t).attr("src",p);
var c=r();
c.group_infos.groups[t].img=p,o.data(_,c);
}
}
});
},500);
});
},
integrityTest_11:function(o){
for(var t=!0,r=o.group_infos.groups.length,e=o.group_infos.group_all,n=0;r>n;n++)""===o.group_infos.groups[n].group_id&&(t=!1);
return t&&(r>0||e);
},
integrityTest_12:function(o){
return""!==o.group_info.card_id&&o.group_info.img!=p.tmpl12.img;
},
integrityTest_13:function(o){
for(var t=!0,r=o.group_infos.groups,e=r.length,n=0;e>n;n++)(""===r[n].card_id||r[n].img==p.tmpl13.groups[n].img)&&(t=!1);
return t&&e>0;
}
};
return g;
});