define("register/type_select.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/dropdown.js"],function(e){
"use strict";
var t=(wx.T,template.render),a=e("common/wx/Cgi.js"),i=e("common/wx/Tips.js"),s=e("biz_web/ui/dropdown.js"),n=wx.cgiData;
$("#register").html(t("type_select"));
var r={
0:$(".js_tips_type[m_type=0]"),
1:$(".js_tips_type[m_type=1]"),
2:$(".js_tips_type[m_type=2]"),
3:$(".js_tips_type[m_type=3]"),
4:$(".js_tips_type[m_type=4]")
},c={
1:[{
name:"中国大陆",
value:{
id:0,
needWxVerify:0
}
},{
name:"港澳台地区",
value:{
id:1,
needWxVerify:1
}
},{
name:"其他海外地区",
value:{
id:2,
needWxVerify:0
}
}],
2:[{
name:"中国大陆",
value:{
id:0,
needWxVerify:1
}
},{
name:"港澳台地区",
value:{
id:1,
needWxVerify:0
}
},{
name:"其他海外地区",
value:{
id:2,
needWxVerify:0
}
}],
3:[{
name:"中国大陆",
value:{
id:0,
needWxVerify:1
}
},{
name:"港澳台地区",
value:{
id:1,
needWxVerify:1
}
},{
name:"其他海外地区",
value:{
id:2,
needWxVerify:0
}
},{
name:"海外政府驻华机构",
value:{
id:3,
needWxVerify:1
}
}],
4:[{
name:"中国大陆",
value:{
id:0,
needWxVerify:0
}
},{
name:"港澳台地区",
value:{
id:1,
needWxVerify:0
}
},{
name:"其他海外地区",
value:{
id:2,
needWxVerify:0
}
},{
name:"海外政府驻华机构",
value:{
id:3,
needWxVerify:1
}
}]
},l=null,_=null;
$(".js_location").each(function(){
var e=$(this),t=e.closest(".js_tips_type"),i=t.find(".js_nextBtn"),r=t.find(".js_overseas"),d=t.find(".js_overseasTip"),o=(t.find(".js_wxVerifyTip"),
parseInt(t.attr("m_type"),10));
if(1==n.is_create_slave){
if(n.realNameType==o){
var p=new s({
container:this,
label:c[o][n.area_type].name,
data:c[o],
disabled:!0
});
switch(n.area_type){
case 0:
i.show(),i.attr("need_info_register",1),r.hide(),d.hide();
break;

case 1:
case 2:
case 3:
i.hide(),r.show(),d.show();
}
i.on("click",function(){
location.href="/acct/realnamesubmit?action=realname_get&t=register/register&lang=zh_CN&step=1";
});
}
}else{
var p=new s({
container:this,
data:c[o],
callback:function(e){
switch(_=e.id,e.id){
case 0:
i.show(),i.attr("need_info_register",1),r.hide(),d.hide();
break;

case 2:
i.hide(),r.show(),d.show();
break;

case 1:
i.hide(),r.show(),d.show();
break;

case 3:
i.hide(),r.show(),d.show();
}
}
});
p.selected(n.realNameType==o?n.area_type:0),i.on("click",function(){
a.post({
url:"/acct/realnamesubmit?action=select_realname_type",
data:{
realname_type:l,
area_type:_
},
mask:!1
},function(e){
if(0==+e.base_resp.ret){
var t=parseInt(i.attr("need_info_register"),10);
location.href=1==t?"/acct/realnamesubmit?action=realname_get&t=register/register&lang=zh_CN&step=1":"/acct/registerpage?action=index&t=register/register&lang=zh_CN&step=1&no_info=1";
}
});
});
}
}),r[0].find(".js_nextBtn").on("click",function(){
var e=$(this);
a.post({
url:"/acct/realnamesubmit?action=select_realname_type",
data:{
realname_type:0,
area_type:0
},
mask:!1
},function(t){
if(0==+t.base_resp.ret){
var a=parseInt(e.attr("need_info_register"),10);
location.href=1==a?"/acct/realnamesubmit?action=realname_get&t=register/register&lang=zh_CN&step=1":"/acct/registerpage?action=index&t=register/register&lang=zh_CN&step=1&no_info=1";
}
});
});
var d=function(){
var e=$(this),t=parseInt(e.attr("m_type"),10);
l!=t&&($(".js_style_type").removeClass("selected"),$(".js_tips_type").hide(),e.addClass("selected"),
r[t].show(),l=parseInt(e.data("type"),10)),1==n.is_create_slave&&$(".js_style_type").unbind("click",d).bind("click",function(){
i.err("帐号已经生成，本页信息不可再修改");
});
};
$(".js_style_type").bind("click",d),$(".js_style_type[m_type="+n.realNameType+"]").click();
});