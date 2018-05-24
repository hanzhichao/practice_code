define("shop/weapp_config.js",["common/wx/Cgi.js","common/wx/top.js","common/wx/Tips.js","common/wx/popover.js","common/wx/Step.js","common/lib/jquery.Jcrop.js","biz_web/ui/dropdown.js","common/wx/popup.js"],function(e){
"use strict";
function t(e){
$("#js_colorpicker .jsBtLabel").addClass("selected_color").css({
"background-color":"rgb("+e.r+","+e.g+","+e.b+")"
});
}
function o(){
s.get({
url:"/wxopen/qrcode?action=suggest_color"
},function(e){
if(console.log(e),0!=e.base_resp.ret);else{
var o=e.color;
_={
r:o.r,
g:o.g,
b:o.b
},m={
r:o.r,
g:o.g,
b:o.b
},t(o);
}
});
}
function i(e){
var o=!/^[0-9a-fA-F]+$/.test(e)||3!=e.length&&6!=e.length;
return o?void n("请输入正确的色值"):(n(""),3==e.length?(_.r=parseInt("0x"+e.slice(0,1)+e.slice(0,1)),
_.g=parseInt("0x"+e.slice(1,2)+e.slice(1,2)),_.b=parseInt("0x"+e.slice(2,3)+e.slice(2,3))):6==e.length&&(_.r=parseInt("0x"+e.slice(0,2)),
_.g=parseInt("0x"+e.slice(2,4)),_.b=parseInt("0x"+e.slice(4,6))),t(_),void s.get({
url:"/wxopen/qrcode?action=is_visible",
data:{
line_r:_.r,
line_g:_.g,
line_b:_.b
}
},function(e){
0!=e.base_resp.ret||e.is_visible||n("使用该颜色的二维码识别效果较差");
}));
}
function n(e){
e?$(".js_color_fail").html(e).show():$(".js_color_fail").html("").hide();
}
var s=e("common/wx/Cgi.js"),r=e("common/wx/top.js"),c=e("common/wx/Tips.js"),a=e("common/wx/popover.js"),l=e("common/wx/Step.js");
e("common/lib/jquery.Jcrop.js");
var p=e("biz_web/ui/dropdown.js");
e("common/wx/popup.js"),function(){
var e=r.DATA.shop;
new r("#topTab",e).selected("weapp_shop_weapp_management");
}();
var u={
intro:function(){
return 0;
}
},d={
submitting:!1,
next:function(e){
if(!$(".userinfo_input").length||0==u.intro()){
$("#error_tip").length&&$("#error_tip").text("").show(),e.setStep(2);
var t=this.get().find(".js_btn_p").hide();
t.eq(2).show(),t.eq(3).show(),$("#step1Desc").hide(),$("#step2Desc").show(),$("#ensure_input").text($.trim($("#modifyInput").val())),
this.resetPosition();
}
},
prev:function(){
var e=this.get().find(".js_btn_p").hide();
e.eq(0).show(),e.eq(1).show(),$("#step1Desc").show(),$("#step2Desc").hide(),this.resetPosition();
},
show:function(e){
var t,o=$(e.tplId).popup({
title:e.title,
width:e.width||960,
className:e.className||"",
buttons:[{
text:"取消",
click:function(){
this.hide();
}
},{
text:"下一步",
click:function(){
d.next.call(this,t);
},
type:"primary"
},{
text:"上一步",
click:function(){
t.setStep(1),d.prev.call(this,t);
},
type:"default"
},{
text:"确定",
click:e.done||$.noop,
type:"primary"
}],
onHide:function(){
this.remove();
}
});
o.popup("show"),t=new l({
container:"#js_stepBar",
names:[e.title,"确认修改"]
}),e.init&&e.init(o);
var i=o.popup("get").find(".js_btn_p").hide();
i.eq(0).show(),i.eq(1).show();
}
},_={},m=null;
$("#js_more_size").click(function(){
var e=$("#tpl_moresize").popup({
title:"更多尺寸",
width:960,
className:"more_size",
data:{
pixSet:[8,12,15,30,50],
dist:[.5,.8,1,1.5,2.5],
qrcode:cgiData.links.qrcode
},
buttons:[{
text:"关闭",
click:function(){
this.hide();
},
type:"default"
}],
onHide:function(){
this.remove();
},
onShow:function(){}
});
e.popup("show"),new a({
dom:$(e.get()[0]).find(".round_tips")[0],
content:$("#tpl_moresize_tips_round").html(),
hover:!1,
defaultOpen:!1,
className:"moresize_pop",
isToggle:!0
}),new p({
container:"#js_colorpicker",
label:"默认",
data:[{
name:"默认",
value:"0"
},{
name:"智能取色",
value:"1"
},{
name:"自定义色值",
value:"2"
}],
callback:function(e){
0==e?($(".js_color_int").hide(),$(".js_color_rgb").hide(),_={
r:0,
g:0,
b:0
},t({
r:0,
g:0,
b:0
})):1==e?(m?(t(m),_={
r:m.r,
g:m.g,
b:m.b
}):o(),$(".js_color_int").show(),$(".js_color_rgb").hide()):2==e&&($(".js_color_int").hide(),
$(".js_color_rgb").show(),$(".js_color_input").trigger("keyup"));
}
}),$(".js_color_input").on("keyup",function(e){
var t=e.target.value;
t&&i(t);
}),t({
r:0,
g:0,
b:0
}),$(".js_down_qr").on("click",function(e){
var t=e.target.dataset.type,o=e.target.dataset.pixsize,i="/misc/wxaqrcode?action=download&fakeid="+cgiData.fakeid+"&token="+wx.data.t+"&type="+t+"&pixsize="+o+"&line_r="+_.r+"&line_g="+_.g+"&line_b="+_.b;
console.log(i),location.href=i;
});
}),$("#js_modify_intro").click(function(){
var e={
title:"修改介绍",
tplId:"#tpl_intro",
width:600,
className:"modify_intro label_block",
init:function(e){
var t=e.popup("get");
t.find("#modifyInput").keyup(function(){
var e=$(this).val(),t=e.replace(/[^\0-\xff]/g,"**").length;
$(this).parent().parent().find("#modifyInputLen").html(t+"/120");
});
},
done:function(){
var e=$.trim($("#modifyInput").val().replace(/\s/g,"")),t=e.replace(/[^\0-\xff]/g,"**").length;
return t>120||4>t?(c.err("用户信息字数不符合规范"),!0):void(d.submitting||(d.submitting=!0,
s.post({
url:"/misc/wxopenbasicprofile?action=intro",
data:{
intro:e
},
mask:!1
},function(e){
if(d.submitting=!1,!e||!e.base_resp)return void c.err("提交失败");
var t=1*e.base_resp.ret;
if(0!=t){
switch(t){
case 62005:
c.err("你已经是认证用户了");
break;

case 62006:
c.err("提交失败");
break;

case 65202:
$("#error_tip").text("不能含有虚假的、冒充、利用他人名义的、容易构成混淆、误认的、法律、法规和政策禁止的内容").show();
break;

case 210042:
c.err("用户信息长度应为4~120个字");
break;

default:
c.err("提交失败"),s.handleRet(e,{
id:64462,
key:95,
url:"/misc/wxopenbasicprofile?action=intro"
});
}
return!0;
}
c.suc("提交成功"),location.reload(!0);
})));
}
};
d.show(e);
});
});