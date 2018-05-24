define("wxopen/wxopen_create_step2.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/dialog.js","biz_web/ui/checkbox.js"],function(e,n,t){
"use strict";
function o(e){
p=e.page;
var n={
0:"个人",
1:"企业",
2:"媒体",
3:"政府",
4:"其他组织",
5:"团队"
};
p.data.realname_info.type_name=n[""+p.data.realname_info.type]||"",r=$(s("tpl_step2",p.data)),
r.hide(),$("#js_div_steps").append(r),r.find(".js_check_ability").checkbox({
onChanged:function(){}
}),r.find(".js_btn_pre").on("click",function(){
return p.showStep(1),!1;
}),r.find(".js_btn_next").on("click",function(){
wx.cgiData.verify_near_expired_time?a.show({
type:"info",
msg:"小程序复用公众号资质认证有效期与公众号认证有效期一致。公众号认证有效期已少于15天，建议先完成公众号微信认证年审再复用资质认证小程序。",
buttons:[{
text:"返回",
click:function(){
this.remove();
}
},{
text:"继续申请",
type:"normal",
click:function(){
this.remove(),i();
}
}]
}):i();
});
}
function i(){
return r.find(".js_check_ability").each(function(){
var e=$(this).prop("checked")?1:0;
p.data[$(this).prop("name")]=e;
}),console.log("page.data:",p.data),p.showStep(3),!1;
}
function c(){
p.showSteper(),p.setSteper(1),r.show();
}
var s=template.render,a=(e("common/wx/Tips.js"),e("common/wx/Cgi.js"),e("common/wx/dialog.js")),p=(e("biz_web/ui/checkbox.js"),
null),r=null;
t.exports={
init:o,
show:c
};
});