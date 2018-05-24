define("original/g_whitelist.js",["biz_common/moment.js","common/wx/popover.js","biz_web/ui/checkbox.js","common/wx/Cgi.js","common/wx/Tips.js","original/MultiStepDialog.js","original/SearchAppId.js","original/whitepop.js","original/common/BindAppCard.js","common/wx/pagebar.js","original/whitelist_dialog.js"],function(i){
"use strict";
var e=template.render,t=i("biz_common/moment.js"),a=i("common/wx/popover.js"),n=(i("biz_web/ui/checkbox.js"),
i("common/wx/Cgi.js")),s=i("common/wx/Tips.js"),o=(i("original/MultiStepDialog.js"),
i("original/SearchAppId.js"),i("original/whitepop.js"),i("original/common/BindAppCard.js")),l=i("common/wx/pagebar.js"),r=i("original/whitelist_dialog.js"),c=function(i){
function c(){
$("#js_addbtn").on("click",function(){
if(!$(this).hasClass("btn_disabled")){
new r({
className:"align_edge whitelist_dialog account_dialog",
isAllowReprint:f,
onOK:function(i,e){
e.btn(!1),n.post({
url:wx.url("/cgi-bin/appmsgcopyright?action=global_add_ori_whitelist"),
data:{
whitelist:JSON.stringify2({
white_list:i
})
},
complete:function(){
e.btn(!0);
}
},function(i){
if(!i||!i.base_resp)return s.err("系统错误，请重试"),void $me.btn(!0);
switch(+i.base_resp.ret){
case 0:
s.suc("添加成功"),location.reload();
break;

default:
s.err("添加失败，请重试");
}
});
}
});
}
});
}
function d(){
new o({
dom:$("#js_tablecontent").find(".js_bizcard"),
data:i.list.list,
token:wx.data.t
}),new o({
dom:$("#js_tablecontent_all").find(".js_bizcard"),
data:i.list.list,
token:wx.data.t
});
}
function p(i){
for(var e=0,a=i.length;a>e;e++){
var n=i[e];
!n.headimgurl&&(n.headimgurl="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0"),
n.create_time_desc=n.create_time?t.unix(n.create_time).format("YYYY-M-D"):"";
var s=[];
!f&&s.push("可转载"),n.can_modify&&s.push("可修改"),n.can_hide_source&&s.push("不显示来源"),
n.statusDesc=s.join("，");
}
}
function u(e,t){
new l({
container:e,
currentPage:i.begin/h+1,
perPage:h,
totalItemsNum:t,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
var e=location.href,t=(i.currentPage-1)*h;
return location.href=/([\?&])begin=\d*/.test(e)?e.replace(/([\?&])begin=\d*/,"$1begin="+t):e+"&begin=%s&count=%s".sprintf(t,i.perPage),
!1;
}
});
}
function m(){
p(i.list.list);
var t=$("#js_tablecontent");
t.html(e("js_listtpl",{
list:i.list.list,
delete_flag:i.list.delete_flag
})),i.list.total_num>h&&u($("#js_pager"),i.list.total_num),t.find(".js_item").on("click",function(){
var i=$(this),e=i.parent(".js_itemparent"),t=e.hasClass("expand"),a=i.siblings(".js_childlist");
t?(e.removeClass("expand"),a.hide()):(e.addClass("expand"),a.show());
}),t.find(".js_edit").on("click",function(){
var i=$(this),t=i.data("username"),o=i.data("canmodify"),l=i.data("cansor");
if(!t)return!1;
$(".popover").hide();
var r,c,d=new a({
dom:i,
content:e("js_editpop",{
showAllowRe:!1,
showModify:o,
showHideSor:l
}),
buttons:[{
text:"确定",
click:function(){
if(r.hasClass("btn_disabled"))return!1;
r.btn(!1);
var i=c.values()||[],e=i.indexOf("md")>-1?"1":"0",a=Number(e)&&i.indexOf("hs")>-1?"1":"0";
n.post({
url:wx.url("/cgi-bin/appmsgcopyright?action=global_upd_ori_whitelist"),
data:{
username:t,
can_modify:e,
can_hide_source:a
},
mask:!1
},function(i){
if(!i||!i.base_resp)return s.err("系统错误，请重试"),void r.btn(!0);
switch(+i.base_resp.ret){
case 0:
s.suc("修改成功"),location.reload();
break;

default:
s.err("修改失败，请重试"),r.btn(!0);
}
});
},
type:"1"!=o&&"1"!=l&&f?"disabled":"primary"
},{
text:"取消",
click:function(){
this.remove();
},
type:"default"
}]
});
return r=d.$pop.find(".jsPopoverBt").eq(0),c=d.$pop.find(".js_popinput").checkbox({
multi:!0,
onChanged:function(){
var i=d.$pop;
if(this.values().length>0||!f){
r.removeClass("btn_disabled").addClass("btn_primary");
var e=this.values().indexOf("md")>-1;
Number(e)?i.find(".js_popinput").eq(1).checkbox("disabled",!1):(i.find(".js_popinput").eq(1).checkbox("disabled",!0),
i.find(".js_popinput").eq(1).checkbox("checked",!1),r.removeClass("btn_primary").addClass("btn_disabled"));
}else 0==this.values().length&&(i.find(".js_popinput").eq(1).checkbox("disabled",!0),
i.find(".js_popinput").eq(1).checkbox("checked",!1)),r.removeClass("btn_primary").addClass("btn_disabled");
}
}),0==o&&(d.$pop.find(".js_popinput").eq(1).checkbox("disabled",!0),d.$pop.find(".js_popinput").eq(1).checkbox("checked",!1)),
!1;
}),t.find(".js_remove").on("click",function(){
var i=$(this),e=i.data("username");
if(!e)return!1;
$(".popover").hide();
new a({
dom:i,
content:"移出后，你无法再查看该公众号的转载详情。且该公众号不再具有长期转载权限，但不会影响历史已转载的文章和已添加的单篇转载权限。同时系统会给该公众号发送一条通知。确认移出？",
buttons:[{
text:"移出",
click:function(){
n.post({
url:wx.url("/cgi-bin/appmsgcopyright?action=global_del_ori_whitelist"),
data:{
username:e
},
mask:!1
},function(i){
if(!i||!i.base_resp)return s.err("系统错误，请重试"),void $submitBtn.btn(!0);
switch(+i.base_resp.ret){
case 0:
s.suc("移出转载帐号成功"),location.reload();
break;

default:
s.err("移出转载帐号失败，请重试"),$submitBtn.btn(!0);
}
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
},
type:"default"
}]
});
return!1;
});
}
function b(){
m(),c(),d(),_();
}
function _(){
3==wx.cgiData.list.delete_flag||4==wx.cgiData.list.delete_flag||5==wx.cgiData.list.delete_flag?(3==wx.cgiData.list.delete_flag||4==wx.cgiData.list.delete_flag?$("#word").html("该篇文章已被删除，以下转载帐号授权等信息均已失效，仅作为删除前原有数据的展示。"):5==wx.cgiData.list.delete_flag&&$("#word").html("该篇文章已被取消原创标示，以下转载帐号授权等信息均已失效，仅作为取消原创标示前原有数据的展示。"),
$("#js_addbtn").addClass("btn_disabled").removeClass("btn_primary"),$(".js_edit").remove(),
$("#op_li").prev().addClass("last_child"),$("#op_li").remove()):$("#word").html("通过添加长期转载帐号，授予指定公众号对全部文章具有可修改或不显示转载来源的转载权限。");
}
var f=!("1"!=i.ori_reprint_permission),h=i.count||10;
return{
init:b
};
}(wx.cgiData);
c.init();
});