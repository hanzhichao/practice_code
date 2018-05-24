define("original/g_detail.js",["biz_common/moment.js","common/wx/popover.js","common/wx/Cgi.js","biz_web/ui/checkbox.js","common/wx/Tips.js","common/wx/pagebar.js"],function(e){
"use strict";
var i=e("biz_common/moment.js"),t=e("common/wx/popover.js"),a=e("common/wx/Cgi.js"),n=(e("biz_web/ui/checkbox.js"),
e("common/wx/Tips.js")),o=e("common/wx/pagebar.js"),s="";
wx.cgiData.data.bizinfo.can_modify&&(s+="可修改"),wx.cgiData.data.bizinfo.can_hide_source&&(s+="，不显示来源"),
$("#info").html(template.render("card_tpl",{
icon:wx.cgiData.data.bizinfo.headimgurl,
name:wx.cgiData.data.bizinfo.nickname||wx.cgiData.data.bizinfo.username,
time:i.unix(wx.cgiData.data.bizinfo.create_time).format("YYYY-MM-DD"),
username:wx.cgiData.data.bizinfo.username,
can_modify:wx.cgiData.data.bizinfo.can_modify,
can_hide_source:wx.cgiData.data.bizinfo.can_hide_source,
status:s
}));
var c=[];
wx.cgiData.data.art_list.each(function(e){
var t="";
1==e.white_status?t="可修改":2==e.white_status?t="不显示来源":3==e.white_status&&(t="可修改，不显示来源"),
c.push({
title:e.title,
time:i.unix(e.create_time).format("YYYY-MM-DD"),
status:t,
url:e.url||""
});
}),$("#list").html(template.render("list_tpl",{
list:c
})),new o({
container:$("#pagebar"),
currentPage:wx.cgiData.begin/10+1,
perPage:10,
totalItemsNum:wx.cgiData.data.total_num,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var i=location.href,t=10*(e.currentPage-1);
return/&begin=/.test(location.href)?location.href=i.replace(/([\?&])begin=\d*/,"$1begin="+t):location.href+="&begin="+t,
!1;
}
}),$("#edit").click(function(){
var e=$(this),i=e.data("username"),o=e.data("can_modify"),s=e.data("can_hide_source");
if(!i)return!1;
$(".popover").hide();
var c,r,d=new t({
dom:e,
content:template.render("js_editpop",{
showAllowRe:!1,
showModify:o,
showHideSor:s
}),
buttons:[{
text:"确定",
click:function(){
if(c.hasClass("btn_disabled"))return!1;
c.btn(!1);
var e=r.values()||[],t=e.indexOf("md")>-1?"1":"0",o=Number(t)&&e.indexOf("hs")>-1?"1":"0";
a.post({
url:wx.url("/cgi-bin/appmsgcopyright?action=global_upd_ori_whitelist"),
data:{
username:i,
can_modify:t,
can_hide_source:o
},
mask:!1
},function(e){
if(!e||!e.base_resp)return n.err("系统错误，请重试"),void c.btn(!0);
switch(+e.base_resp.ret){
case 0:
n.suc("修改成功"),location.reload();
break;

default:
n.err("修改失败，请重试"),c.btn(!0);
}
});
},
type:"1"!=o&&"1"!=s&&isAllowRepArtical?"disabled":"primary"
},{
text:"取消",
click:function(){
this.remove();
},
type:"default"
}]
});
return c=d.$pop.find(".jsPopoverBt").eq(0),r=d.$pop.find(".js_popinput").checkbox({
multi:!0,
onChanged:function(){
var e=d.$pop;
if(this.values().length>0){
c.removeClass("btn_disabled").addClass("btn_primary");
var i=this.values().indexOf("md")>-1;
Number(i)?e.find(".js_popinput").eq(1).checkbox("disabled",!1):(e.find(".js_popinput").eq(1).checkbox("disabled",!0),
e.find(".js_popinput").eq(1).checkbox("checked",!1),c.removeClass("btn_primary").addClass("btn_disabled"));
}else 0==this.values().length&&(e.find(".js_popinput").eq(1).checkbox("disabled",!0),
e.find(".js_popinput").eq(1).checkbox("checked",!1)),c.removeClass("btn_primary").addClass("btn_disabled");
}
}),0==o&&(d.$pop.find(".js_popinput").eq(1).checkbox("disabled",!0),d.$pop.find(".js_popinput").eq(1).checkbox("checked",!1)),
!1;
}),$("#move").click(function(){
var e=$(this),i=e.data("username");
if(!i)return!1;
$(".popover").hide();
new t({
dom:e,
content:"移出后，你无法再查看该公众号的转载详情。且该公众号不再具有长期转载权限，但不会影响历史已转载的文章和已添加的单篇转载权限。同时系统会给该公众号发送一条通知。确认移出？",
buttons:[{
text:"移出",
click:function(){
a.post({
url:wx.url("/cgi-bin/appmsgcopyright?action=global_del_ori_whitelist"),
data:{
username:i
},
mask:!1
},function(e){
if(!e||!e.base_resp)return n.err("系统错误，请重试"),void $submitBtn.btn(!0);
switch(+e.base_resp.ret){
case 0:
n.suc("移出转载帐号成功"),location.href=wx.url("/cgi-bin/appmsgcopyright?t=original/g_whitelist&action=global_ori_whitelist");
break;

default:
n.err("移出转载帐号失败，请重试"),$submitBtn.btn(!0);
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
});