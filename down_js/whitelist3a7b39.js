define("cardticket/whitelist.js",["common/wx/Tips.js","common/wx/top.js","common/wx/popup.js","common/wx/RichBuddy.js","common/wx/tooltips.js","common/wx/tooltipsManager.js","common/wx/Cgi.js","common/wx/dialog.js","common/wx/stopMultiRequest.js"],function(e){
"use strict";
var t=e("common/wx/Tips.js"),s=e("common/wx/top.js"),o=(e("common/wx/popup.js"),
wx.cgiData.data),i=e("common/wx/RichBuddy.js"),n=e("common/wx/tooltips.js"),a=e("common/wx/tooltipsManager.js"),r=e("common/wx/Cgi.js"),c=(e("common/wx/dialog.js"),
wx.cgiData.maxnum);
e("common/wx/stopMultiRequest.js"),new s("#topTab",s.DATA.cardticket).selected(5),
function(){
for(var e=o.whitelist,s={},c=0;c<e.length;c++){
var d=e[c];
d.remark_name=d.remark||d.nickname;
for(var l in d)"string"==typeof d[l]&&(d[l]=d[l].replace(/&nbsp;/gi," "));
d.nick_name=d.nickname.emoji(),s[d.openid]=d;
}
$("#js_whitelist").html(template.render("js_whitelist_tpl",{
data:e
}));
var p=new i({
data:s,
hideGroup:!0
});
$(".js_avatar").mouseover(function(){
var e=$(this),t=e.data("openid"),s=e.offset(),o=e.width();
p.show({
fakeId:t,
position:{
left:s.left+o+2,
top:s.top
}
}),$(".js_changeRemark").hide();
}).mouseout(function(){
p.hide();
}),$(".js_delete_user").click(function(e){
var s=$(this).data("openid"),o=new n({
container:this,
content:"确定取消成员权限吗？<br/>取消后，该店员无法接口卡券",
type:"click",
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
r.post({
mask:!1,
url:"/merchant/cardwhitelist?action=delete",
data:{
openid:s
}
},function(e){
if("0"==e.base_resp.ret)t.suc("删除成功"),location.reload();else switch(e.ret){
default:
r.show(e);
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
o.show(),a.removeAll(),a.add(o),e.stopPropagation();
});
}(),function(){
var e;
o.whitelist.length>=c&&$(".js_add_user").addClass("btn_disabled"),$(".js_add_user").click(function(){
if(o.whitelist.length>=c)return!1;
var s=$("#js_add_user_tpl").popup({
width:960,
title:"添加成员",
buttons:[{
text:"添加",
click:function(){
e&&r.post({
url:"/merchant/cardwhitelist",
data:{
action:"add",
openid:e
},
btn:m
},function(e){
if("0"==e.base_resp.ret)t.suc("添加授权测试帐号成功"),location.reload();else switch(e.base_resp.ret){
case-201:
t.err("该用户已经在白名单列表，不可重复添加");
break;

case-202:
t.err("最多只能添加%s个白名单用户".sprintf(c));
break;

default:
e.base_resp||(e.base_resp={
ret:e.ret
}),r.show(e);
}
});
},
type:"disabled"
}],
onHide:function(){
this.remove();
},
className:"adduser_dialog align_edge"
}),i=s.popup("get"),n=!1,a=$(".js_search_loading",i),d=$(".js_no_user",i),l=$(".js_search_result",i),p=$("#js_keyword"),m=i.find(".js_btn_p").first(),u=$(".js_search",i).click(function(){
if(!n){
var o=p.val();
if(!o)return t.err("请输入微信号/QQ号/手机号"),void p.focus();
d.hide(),l.hide(),n=!0;
{
$(this);
}
a.show(),e=null,s.popup("resetPosition"),r.post({
url:"/merchant/cardwhitelist",
data:{
action:"search",
keyword:o
},
complete:function(){
n=!1;
}
},function(o){
if(a.hide(),0==o.base_resp.ret){
if(o.data){
var i=$.parseJSON(o.data);
l.show(),l.find("img").attr("src",wx.url("/misc/getheadimg?openid=%s".sprintf(i.openid))),
l.find(".js_nickname").text(i.nickname),e=i.openid,m.removeClass("btn_disabled").addClass("btn_primary");
}else d.show();
s.popup("resetPosition");
}else switch(o.base_resp.ret){
case-202:
t.err("今天的搜索次数到达上限");
break;

case 200203:
t.err("该用户还没有关注公众号，请通知其关注公众号再添加白名单");
break;

default:
r.show(o);
}
});
}
});
p.on("keyup",function(e){
wx.isHotkey(e,"enter")&&u.click();
}).on("change",function(){
u.click();
}).focus();
});
}();
});